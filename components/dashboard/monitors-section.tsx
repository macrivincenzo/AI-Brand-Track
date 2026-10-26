'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface HistoryPoint {
  analysisId: string;
  date: string;
  visibilityScore: number | null;
}

interface Monitor {
  id: string;
  url: string;
  companyName: string | null;
  active: boolean;
  pausedReason: string | null;
  nextRunAt: string;
  history: HistoryPoint[];
}

const PAUSED_TEXT: Record<string, string> = {
  insufficient_credits: 'Waiting for credits. It starts again automatically when you add credits.',
  repeated_failures: 'Paused after repeated errors. Press Resume to try again.',
  paused_by_user: 'Paused.',
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/** Weekly monitors with a simple score trend. Kept deliberately plain until the redesign. */
export function MonitorsSection() {
  const [monitors, setMonitors] = useState<Monitor[] | null>(null);

  const load = useCallback(() => {
    fetch('/api/monitors')
      .then((res) => (res.ok ? res.json() : []))
      .then(setMonitors)
      .catch(() => setMonitors([]));
  }, []);

  useEffect(load, [load]);

  const update = async (id: string, action: 'pause' | 'resume' | 'delete') => {
    await fetch(`/api/monitors/${id}`, action === 'delete'
      ? { method: 'DELETE' }
      : { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ active: action === 'resume' }) });
    load();
  };

  if (monitors === null) return null;

  return (
    <div className="bg-white border border-gray-200 p-6 mb-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Weekly checks</h2>
      {monitors.length === 0 ? (
        <p className="text-lg text-gray-600">
          No brands are being checked yet. Run an analysis and press <strong>Check this every week</strong>.{' '}
          <Link href="/brand-monitor" className="text-blue-600 underline">Start an analysis</Link>
        </p>
      ) : (
        <div className="space-y-8">
          {monitors.map((m) => {
            const points = m.history.filter((h) => h.visibilityScore != null);
            const latest = points.at(-1)?.visibilityScore;
            const previous = points.at(-2)?.visibilityScore;
            const delta = latest != null && previous != null ? latest - previous : null;
            const paused = !m.active || m.pausedReason;
            return (
              <div key={m.id} className="border-t border-gray-100 pt-6 first:border-0 first:pt-0">
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <div>
                    <p className="text-xl font-semibold text-gray-900">{m.companyName || m.url}</p>
                    <p className="text-gray-500">{m.url}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold text-gray-900">{latest ?? '–'}<span className="text-lg text-gray-500">/100</span></p>
                    {delta != null && (
                      <p className="text-lg text-gray-600">
                        {Math.abs(delta) < 3 ? 'About the same as last week' : delta > 0 ? `Up ${delta} since last check` : `Down ${Math.abs(delta)} since last check`}
                      </p>
                    )}
                  </div>
                </div>

                {points.length >= 2 && (
                  <div className="h-48 mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={points.map((p) => ({ date: formatDate(p.date), score: p.visibilityScore }))}>
                        <XAxis dataKey="date" tick={{ fontSize: 14 }} />
                        <YAxis domain={[0, 100]} tick={{ fontSize: 14 }} width={36} />
                        <Tooltip />
                        <Line type="monotone" dataKey="score" stroke="#111827" strokeWidth={3} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4 mt-4 text-base">
                  <span className="text-gray-700">
                    {paused ? PAUSED_TEXT[m.pausedReason ?? 'paused_by_user'] ?? 'Paused.' : `Next check: ${formatDate(m.nextRunAt)}`}
                  </span>
                  {m.active ? (
                    <button onClick={() => update(m.id, 'pause')} className="underline text-gray-600">Pause</button>
                  ) : (
                    <button onClick={() => update(m.id, 'resume')} className="underline text-blue-600">Resume</button>
                  )}
                  <button onClick={() => update(m.id, 'delete')} className="underline text-gray-400">Stop checking</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
