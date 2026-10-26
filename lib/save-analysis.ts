import { db } from '@/lib/db';
import { brandAnalyses, type BrandAnalysis } from '@/lib/db/schema';
import { extractSnapshotMetrics, saveAnalysisSnapshot } from '@/lib/historical-tracking';
import { saveSourcesToDatabase } from '@/lib/save-sources';

export interface SaveAnalysisInput {
  url: string;
  companyName?: string | null;
  industry?: string | null;
  analysisData: any;
  competitors?: any;
  prompts?: any;
  creditsUsed?: number;
  monitorId?: string | null;
}

/**
 * Persist a finished analysis: the brand_analyses row, its historical snapshot
 * and the cited sources. Snapshot and sources are best-effort and never fail the save.
 * Used by the browser flow (POST /api/brand-monitor/analyses) and by scheduled monitors.
 */
export async function saveBrandAnalysis(userId: string, input: SaveAnalysisInput): Promise<BrandAnalysis> {
  const [analysis] = await db.insert(brandAnalyses).values({
    userId,
    url: input.url,
    companyName: input.companyName,
    industry: input.industry,
    analysisData: input.analysisData,
    competitors: input.competitors,
    prompts: input.prompts,
    creditsUsed: input.creditsUsed || 10,
    monitorId: input.monitorId ?? null,
  }).returning();

  if (input.analysisData && input.companyName) {
    try {
      const metrics = extractSnapshotMetrics(input.analysisData, input.companyName);
      await saveAnalysisSnapshot(analysis.id, metrics);
    } catch (snapshotError) {
      console.error('[Historical Tracking] Failed to save snapshot (non-blocking):', snapshotError);
    }
  }

  if (Array.isArray(input.analysisData?.responses)) {
    try {
      const competitorUrls: string[] = [];
      if (Array.isArray(input.competitors)) {
        const { assignUrlToCompetitor } = await import('@/lib/brand-monitor-utils');
        for (const comp of input.competitors) {
          const name = typeof comp === 'string' ? comp : comp?.name;
          const url = (typeof comp === 'object' && comp?.url) || (name ? assignUrlToCompetitor(name) : undefined);
          if (url) competitorUrls.push(url);
        }
      }
      await saveSourcesToDatabase(analysis.id, input.analysisData.responses, {
        brandUrl: input.url,
        competitorUrls,
      });
    } catch (sourceError) {
      console.error('[Source Tracker] Failed to save sources (non-blocking):', sourceError);
    }
  }

  return analysis;
}
