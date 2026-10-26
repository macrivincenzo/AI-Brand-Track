import { NextRequest, NextResponse } from 'next/server';
import { runDueMonitors } from '@/lib/monitoring';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// One analysis takes 1-2 minutes; 20 monitors at 3 in parallel fit in ~13 minutes.
export const maxDuration = 800;

// Daily Vercel Cron (see vercel.json). Vercel sends `Authorization: Bearer $CRON_SECRET`.
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const summary = await runDueMonitors();
  console.log('[Cron] run-monitors', summary);
  return NextResponse.json(summary);
}
