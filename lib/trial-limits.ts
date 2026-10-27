import { Autumn } from 'autumn-js';
import { and, count, eq, gte, isNull } from 'drizzle-orm';
import { db } from '@/lib/db';
import { brandAnalyses, brandMonitors } from '@/lib/db/schema';

/**
 * The $9 Starter trial includes 1 full analysis + weekly checks of 1 brand.
 * Credits alone (53) would allow ~4 manual analyses, so these caps keep the
 * trial's worst-case API cost (~$2) below what it earns.
 */
export const TRIAL_LIMITS = { manualAnalyses: 1, monitors: 1 };

export const TRIAL_ANALYSIS_LIMIT_MESSAGE =
  'Your trial includes 1 full analysis, and your weekly checks keep running automatically. Upgrade to Starter to run more analyses.';
export const TRIAL_MONITOR_LIMIT_MESSAGE =
  'Your trial includes weekly checks for 1 brand. Upgrade to Starter to monitor more brands.';

const autumn = new Autumn({ secretKey: process.env.AUTUMN_SECRET_KEY! });

/** Returns when the customer's current trial started, or null if they aren't trialing. */
async function getTrialStart(customerId: string): Promise<Date | null> {
  const { data } = await autumn.customers.get(customerId);
  const trial = data?.products.find((p) => p.status === 'trialing');
  if (!trial) return null;
  // Autumn timestamps are milliseconds; guard against seconds just in case.
  return new Date(trial.started_at < 1e12 ? trial.started_at * 1000 : trial.started_at);
}

export async function isTrialAnalysisLimitReached(userId: string): Promise<boolean> {
  const startedAt = await getTrialStart(userId);
  if (!startedAt) return false;
  const [{ n }] = await db.select({ n: count() }).from(brandAnalyses).where(and(
    eq(brandAnalyses.userId, userId),
    isNull(brandAnalyses.monitorId),
    gte(brandAnalyses.createdAt, startedAt),
  ));
  return n >= TRIAL_LIMITS.manualAnalyses;
}

export async function isTrialMonitorLimitReached(userId: string): Promise<boolean> {
  const startedAt = await getTrialStart(userId);
  if (!startedAt) return false;
  const [{ n }] = await db.select({ n: count() }).from(brandMonitors).where(eq(brandMonitors.userId, userId));
  return n >= TRIAL_LIMITS.monitors;
}
