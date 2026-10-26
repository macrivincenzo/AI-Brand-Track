import { NextRequest, NextResponse } from 'next/server';
import { desc, eq, inArray } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { brandAnalyses, brandAnalysisSnapshots, brandMonitors } from '@/lib/db/schema';
import { handleApiError, AuthenticationError, ValidationError } from '@/lib/api-errors';
import { createMonitorFromAnalysis } from '@/lib/monitoring';

// GET /api/monitors - the user's monitors, each with its weekly score history
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) throw new AuthenticationError('Please log in to view your monitors');

    const monitors = await db.query.brandMonitors.findMany({
      where: eq(brandMonitors.userId, session.user.id),
      orderBy: desc(brandMonitors.createdAt),
    });
    if (monitors.length === 0) return NextResponse.json([]);

    // History = every analysis of the monitored URL, manual or scheduled.
    const runs = await db.query.brandAnalyses.findMany({
      where: eq(brandAnalyses.userId, session.user.id),
      columns: { id: true, url: true, monitorId: true, createdAt: true },
      orderBy: desc(brandAnalyses.createdAt),
    });
    const snapshots = runs.length
      ? await db.query.brandAnalysisSnapshots.findMany({
          where: inArray(brandAnalysisSnapshots.brandAnalysisId, runs.map((r) => r.id)),
        })
      : [];
    const snapshotByAnalysis = new Map(snapshots.map((s) => [s.brandAnalysisId, s]));

    return NextResponse.json(
      monitors.map((m) => ({
        ...m,
        history: runs
          .filter((r) => r.monitorId === m.id || r.url === m.url)
          .map((r) => ({ analysisId: r.id, date: r.createdAt, ...pickMetrics(snapshotByAnalysis.get(r.id)) }))
          .filter((h) => h.visibilityScore != null)
          .reverse(),
      })),
    );
  } catch (error) {
    return handleApiError(error);
  }
}

function pickMetrics(s?: typeof brandAnalysisSnapshots.$inferSelect) {
  return {
    visibilityScore: s?.visibilityScore ?? null,
    shareOfVoice: s?.shareOfVoice ?? null,
    rank: s?.rank ?? null,
  };
}

// POST /api/monitors { analysisId } - start weekly monitoring from an existing analysis
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) throw new AuthenticationError('Please log in to start monitoring');

    const { analysisId } = await request.json();
    if (!analysisId) throw new ValidationError('analysisId is required', { analysisId: 'Required' });

    const monitor = await createMonitorFromAnalysis(session.user.id, analysisId);
    return NextResponse.json(monitor);
  } catch (error) {
    return handleApiError(error);
  }
}
