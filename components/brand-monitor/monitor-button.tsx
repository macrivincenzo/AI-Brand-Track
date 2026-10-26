'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

/** Starts weekly monitoring from the analysis on screen, or shows that it's already on. */
export function MonitorButton({ analysisId, url }: { analysisId: string | null; url?: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'monitoring' | 'error'>('idle');

  useEffect(() => {
    if (!url) return;
    fetch('/api/monitors')
      .then((res) => (res.ok ? res.json() : []))
      .then((monitors: { url: string; active: boolean }[]) => {
        if (monitors.some((m) => m.url === url && m.active)) setStatus('monitoring');
      })
      .catch(() => {});
  }, [url]);

  if (!analysisId) return null;

  if (status === 'monitoring') {
    return (
      <Link href="/dashboard" className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-700 border border-green-200 bg-green-50">
        Checked every week · View trend
      </Link>
    );
  }

  const start = async () => {
    setStatus('loading');
    try {
      const res = await fetch('/api/monitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analysisId }),
      });
      setStatus(res.ok ? 'monitoring' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="flex items-center gap-3">
      {status === 'error' && <span className="text-sm text-red-600">Couldn't start monitoring. Try again.</span>}
      <Button onClick={start} disabled={status === 'loading'} className="px-4 py-2 text-sm">
        {status === 'loading' ? 'Starting…' : 'Check this every week'}
      </Button>
    </div>
  );
}
