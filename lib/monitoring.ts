import { Autumn } from 'autumn-js';
import { and, asc, eq, lte } from 'drizzle-orm';
import { db, pool } from '@/lib/db';
import { brandAnalyses, brandMonitors, type BrandMonitor } from '@/lib/db/schema';
import { performAnalysis } from '@/lib/analyze-common';
import { extractSnapshotMetrics, type SnapshotMetrics } from '@/lib/historical-tracking';
import { saveBrandAnalysis } from '@/lib/save-analysis';
import { sendMonitorPausedEmail, sendWeeklyReportEmail } from '@/lib/monitor-email';
import { CREDITS_PER_BRAND_ANALYSIS, FEATURE_ID_MESSAGES, ONE_DAY } from '@/config/constants';

/** Weekly runs use at most this many prompts (cost: ~$0.03 per prompt across 4 engines). */
export const MONITOR_PROMPT_LIMIT = 15;
const MONITOR_INTERVAL_MS = 7 * ONE_DAY;
const RETRY_DELAY_MS = ONE_DAY;
const MAX_CONSECUTIVE_FAILURES = 3;

const autumn = new Autumn({ secretKey: process.env.AUTUMN_SECRET_KEY! });

/** Saved prompts are strings or { prompt } objects; monitors store plain strings. */
function toPromptStrings(prompts: unknown): string[] {
  if (!Array.isArray(prompts)) return [];
  return prompts
    .map((p) => (typeof p === 'string' ? p : p?.prompt))
    .filter((p): p is string => typeof p === 'string' && p.trim().length > 0)
    .slice(0, MONITOR_PROMPT_LIMIT);
}

function toCompetitorList(competitors: unknown): { name: string; url?: string }[] {
  if (!Array.isArray(competitors)) return [];
  return competitors
    .map((c) => (typeof c === 'string' ? { name: c } : { name: c?.name, url: c?.url }))
    .filter((c): c is { name: string; url?: string } => typeof c.name === 'string' && c.name.length > 0);
}

/**
 * Start weekly monitoring from an analysis the user already ran (and paid for).
 * Reuses its company, competitors and prompts so every week is comparable.
 * Returns the existing monitor if this URL is already monitored.
 */
export async function createMonitorFromAnalysis(userId: string, analysisId: string): Promise<BrandMonitor> {
  const analysis = await db.query.brandAnalyses.findFirst({
    where: and(eq(brandAnalyses.id, analysisId), eq(brandAnalyses.userId, userId)),
  });
  if (!analysis) throw new Error('Analysis not found');

  const company = (analysis.analysisData as any)?.company;
  if (!company?.name) throw new Error('Analysis has no company data');

  const existing = await db.query.brandMonitors.findFirst({
    where: and(eq(brandMonitors.userId, userId), eq(brandMonitors.url, analysis.url)),
  });
  if (existing) {
    if (existing.active) return existing;
    const [reactivated] = await db.update(brandMonitors)
      .set({ active: true, pausedReason: null, failureCount: 0, nextRunAt: new Date(Date.now() + MONITOR_INTERVAL_MS) })
      .where(eq(brandMonitors.id, existing.id))
      .returning();
    return reactivated;
  }

  const [monitor] = await db.insert(brandMonitors).values({
    userId,
    url: analysis.url,
    companyName: analysis.companyName ?? company.name,
    company,
    competitors: toCompetitorList(analysis.competitors),
    prompts: toPromptStrings(analysis.prompts ?? (analysis.analysisData as any)?.prompts),
    nextRunAt: new Date(Date.now() + MONITOR_INTERVAL_MS),
    lastRunAt: analysis.createdAt ?? new Date(),
    lastAnalysisId: analysis.id,
  }).returning();
  return monitor;
}

async function getUserContact(userId: string): Promise<{ email: string; name: string | null } | null> {
  const { rows } = await pool.query('SELECT email, name FROM "user" WHERE id = $1', [userId]);
  return rows[0] ?? null;
}

async function getMetrics(analysisId: string | null, companyName: string): Promise<SnapshotMetrics | null> {
  if (!analysisId) return null;
  const analysis = await db.query.brandAnalyses.findFirst({ where: eq(brandAnalyses.id, analysisId) });
  if (!analysis?.analysisData) return null;
  try {
    return extractSnapshotMetrics(analysis.analysisData as any, companyName);
  } catch {
    return null;
  }
}

export type MonitorRunResult = 'completed' | 'paused_no_credits' | 'failed';

/**
 * Run one scheduled analysis for a monitor. Credits are checked first and only
 * deducted after the analysis succeeds, so a failed run never costs the user.
 */
export async function runMonitor(monitor: BrandMonitor): Promise<MonitorRunResult> {
  const companyName = monitor.companyName ?? (monitor.company as any).name;

  const access = await autumn.check({ customer_id: monitor.userId, feature_id: FEATURE_ID_MESSAGES });
  const balance = access.data?.balance ?? 0;
  if (!access.data?.allowed || balance < CREDITS_PER_BRAND_ANALYSIS) {
    // Stay active and re-check daily, so monitoring resumes on its own once credits are added.
    await db.update(brandMonitors)
      .set({ pausedReason: 'insufficient_credits', nextRunAt: new Date(Date.now() + RETRY_DELAY_MS) })
      .where(eq(brandMonitors.id, monitor.id));
    if (monitor.pausedReason !== 'insufficient_credits') {
      const contact = await getUserContact(monitor.userId);
      if (contact) await sendMonitorPausedEmail(contact, companyName).catch((e) => console.error('[Monitor] paused email failed', e));
    }
    return 'paused_no_credits';
  }

  try {
    const prompts = toPromptStrings(monitor.prompts);
    const competitors = toCompetitorList(monitor.competitors);
    const result = await performAnalysis({
      company: monitor.company as any,
      customPrompts: prompts.length > 0 ? prompts : undefined,
      userSelectedCompetitors: competitors.length > 0 ? competitors : undefined,
      sendEvent: async () => {},
    });

    await autumn.track({ customer_id: monitor.userId, feature_id: FEATURE_ID_MESSAGES, value: CREDITS_PER_BRAND_ANALYSIS });

    const previous = await getMetrics(monitor.lastAnalysisId, companyName);
    const saved = await saveBrandAnalysis(monitor.userId, {
      url: monitor.url,
      companyName,
      industry: (monitor.company as any).industry,
      analysisData: result,
      competitors,
      prompts,
      creditsUsed: CREDITS_PER_BRAND_ANALYSIS,
      monitorId: monitor.id,
    });

    await db.update(brandMonitors).set({
      lastRunAt: new Date(),
      nextRunAt: new Date(Date.now() + MONITOR_INTERVAL_MS),
      lastAnalysisId: saved.id,
      failureCount: 0,
      pausedReason: null,
    }).where(eq(brandMonitors.id, monitor.id));

    const current = extractSnapshotMetrics(result as any, companyName);
    const contact = await getUserContact(monitor.userId);
    if (contact) {
      await sendWeeklyReportEmail(contact, { companyName, current, previous, analysis: result as any })
        .catch((e) => console.error('[Monitor] weekly email failed', e));
    }
    return 'completed';
  } catch (error) {
    console.error(`[Monitor] run failed for ${monitor.id}:`, error);
    const failureCount = monitor.failureCount + 1;
    await db.update(brandMonitors).set({
      failureCount,
      nextRunAt: new Date(Date.now() + RETRY_DELAY_MS),
      ...(failureCount >= MAX_CONSECUTIVE_FAILURES ? { active: false, pausedReason: 'repeated_failures' } : {}),
    }).where(eq(brandMonitors.id, monitor.id));
    return 'failed';
  }
}

/** Run every active monitor that is due, a few at a time. Called by the daily cron. */
export async function runDueMonitors({ limit = 20, concurrency = 3 } = {}) {
  const due = await db.query.brandMonitors.findMany({
    where: and(eq(brandMonitors.active, true), lte(brandMonitors.nextRunAt, new Date())),
    orderBy: asc(brandMonitors.nextRunAt),
    limit,
  });

  const summary: Record<MonitorRunResult, number> = { completed: 0, paused_no_credits: 0, failed: 0 };
  for (let i = 0; i < due.length; i += concurrency) {
    const results = await Promise.all(due.slice(i, i + concurrency).map(runMonitor));
    for (const r of results) summary[r]++;
  }
  return { due: due.length, ...summary };
}
