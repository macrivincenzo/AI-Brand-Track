'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setShowBanner(false);
    
    // Here you can initialize analytics/tracking cookies
    // Example: gtag('consent', 'update', { analytics_storage: 'granted' });
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setShowBanner(false);
    
    // Here you can disable analytics/tracking cookies
    // Example: gtag('consent', 'update', { analytics_storage: 'denied' });
  };

  const handleClose = () => {
    // Just close without saving preference (user can see it again)
    setShowBanner(false);
  };

  if (!showBanner) return null;

  // Slim bottom bar: small on mobile so it never covers the page or becomes the LCP element
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="mx-auto max-w-5xl px-3 pb-3">
        <div className="relative flex flex-col gap-3 rounded-abt-tile border border-abt-line bg-abt-surface px-5 py-4 font-abt-sans shadow-[var(--abt-shadow-pop)] sm:flex-row sm:items-center">
          <p className="flex-1 pr-6 text-[16px] text-abt-ink-2 sm:pr-0">
            We use cookies to improve your experience and analyze traffic. See our{' '}
            <Link href="/privacy-policy" className="font-medium text-abt-ink underline underline-offset-4">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex gap-2 shrink-0">
            <Button onClick={handleReject} variant="outline" size="sm" className="flex-1 sm:flex-none">
              Reject non-essential
            </Button>
            <Button onClick={handleAccept} size="sm" className="flex-1 sm:flex-none bg-abt-accent hover:bg-abt-accent/90 text-abt-on-accent">
              Accept all
            </Button>
          </div>
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 sm:static text-abt-ink-2 hover:text-abt-ink transition-colors"
            aria-label="Close cookie banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
