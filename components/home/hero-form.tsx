'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { abtButton } from '@/components/abt/button';
import { savePendingUrl } from '@/lib/pending-url';
import { cn } from '@/lib/utils';

/**
 * One box, one button. Logged in: straight to the check with the website filled in.
 * Logged out: the website is kept while they register and pay, then prefilled.
 */
export function HeroForm({ className, id = 'hero-url' }: { className?: string; id?: string }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [url, setUrl] = useState('');
  const [error, setError] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const site = url.trim();
    if (!site.includes('.')) {
      setError(true);
      return;
    }
    if (session?.user) {
      router.push(`/brand-monitor?url=${encodeURIComponent(site)}`);
    } else {
      savePendingUrl(site);
      router.push('/plans?checkout=starter-monthly');
    }
  };

  return (
    <form onSubmit={onSubmit} className={className} noValidate>
      <label htmlFor={id} className="sr-only">
        Your website
      </label>
      <div
        className={cn(
          'flex flex-col gap-2 rounded-abt-input border bg-abt-surface p-2 sm:flex-row',
          'focus-within:border-abt-accent focus-within:shadow-[var(--abt-focus-ring)]',
          error ? 'border-abt-bad' : 'border-abt-line',
        )}
      >
        <input
          id={id}
          type="text"
          inputMode="url"
          autoComplete="url"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="yourbusiness.com"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            if (error) setError(false);
          }}
          aria-invalid={error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="h-14 min-w-0 flex-1 bg-transparent px-4 text-[19px] text-abt-ink placeholder:text-abt-placeholder focus:outline-none"
        />
        <button type="submit" className={abtButton({ className: 'px-10 text-[18px]' })}>
          Check my website
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-3 text-left text-[16px] text-abt-bad">
          Type your website address, like yourbusiness.com
        </p>
      )}
    </form>
  );
}
