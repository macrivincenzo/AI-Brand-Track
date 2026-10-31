'use client';

import Link from 'next/link';
import { useSession } from '@/lib/auth-client';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { attachBodyOptions } from '@/lib/autumn-checkout';
import { readPendingUrl } from '@/lib/pending-url';
import { PlanCheckoutLink } from '@/components/plans/plan-checkout-link';
import { abtButton } from '@/components/abt/button';
import { Page, Card } from '@/components/abt/layout';
import { Eyebrow, Lead, Body } from '@/components/abt/text';

const CHECKOUT_PRODUCT_IDS = new Set(['single-analysis', 'credit-pack', 'starter-monthly', 'pro-monthly']);

// Handles ?checkout=productId (e.g. from home or after login) by going straight to
// Stripe checkout. Kept in its own Suspense boundary so useSearchParams doesn't
// force the whole pricing page to render client-side only.
function CheckoutRedirect() {
  const { data: session, isPending } = useSession();
  const searchParams = useSearchParams();
  const hasRedirected = useRef(false);

  // Logged-out visitors arriving from a "Start for $9" link create an account
  // first; registration sends them back here to finish checkout.
  useEffect(() => {
    const checkoutProductId = searchParams.get('checkout');
    if (isPending || session?.user || !checkoutProductId || !CHECKOUT_PRODUCT_IDS.has(checkoutProductId)) return;
    window.location.href = `/register?redirect=${encodeURIComponent(`/plans?checkout=${checkoutProductId}`)}`;
  }, [isPending, session?.user, searchParams]);

  // When user lands with ?checkout=productId (e.g. from home or after login), go straight to Stripe checkout
  useEffect(() => {
    const checkoutProductId = searchParams.get('checkout');
    if (!checkoutProductId || !CHECKOUT_PRODUCT_IDS.has(checkoutProductId) || !session?.user || hasRedirected.current) return;

    hasRedirected.current = true;

    (async () => {
      try {
        const response = await fetch('/api/autumn/attach', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            product_id: checkoutProductId,
            ...attachBodyOptions(checkoutProductId),
            return_url: window.location.origin + '/plans',
            // Came from the homepage box? Land on the check with their website filled in.
            success_url: window.location.origin + (readPendingUrl() ? '/brand-monitor' : '/dashboard'),
            cancel_url: window.location.origin + '/plans',
          }),
        });
        if (!response.ok) {
          hasRedirected.current = false;
          return;
        }
        const result = await response.json();
        const checkoutUrl = result?.data?.checkout_url || result?.checkout_url;
        if (checkoutUrl) {
          window.location.href = checkoutUrl;
        } else {
          hasRedirected.current = false;
        }
      } catch {
        hasRedirected.current = false;
      }
    })();
  }, [searchParams, session?.user]);

  const checkoutProductId = searchParams.get('checkout');
  const isRedirectingToCheckout = session?.user && checkoutProductId && CHECKOUT_PRODUCT_IDS.has(checkoutProductId);

  if (!isRedirectingToCheckout) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-abt-bg">
      <div className="text-center">
        <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin text-abt-accent" />
        <p className="text-[18px] text-abt-ink-2">Taking you to checkout…</p>
      </div>
    </div>
  );
}

const plans = [
  {
    id: 'starter-monthly',
    name: 'Starter',
    price: '$39',
    unit: 'a month, after your 14 days',
    features: ['1 brand', 'Weekly checks with an email', 'Fixes written for you', '53 credits a month'],
    cta: 'Start with Starter',
  },
  {
    id: 'pro-monthly',
    name: 'Pro',
    price: '$69',
    unit: 'a month',
    features: ['Unlimited brands', 'Weekly checks with an email', 'Fixes written for you', '154 credits a month', 'Keyword data from DataForSEO'],
    cta: 'Start with Pro',
  },
];

const packs = [
  { id: 'single-analysis', name: 'Single Analysis', price: '$49', detail: '53 credits, about 4 full checks' },
  { id: 'credit-pack', name: 'Credit Pack', price: '$149', detail: '220 credits, 20 full checks' },
];

const creditCosts = [
  { action: 'Full check', detail: 'All four assistants, a complete new report', credits: 11 },
  { action: 'Weekly check', detail: 'The automatic check every week', credits: 10 },
  { action: 'Write a fix', detail: 'An FAQ, comparison or page text, written for you', credits: 5 },
  { action: 'Finding competitors', detail: 'Included in every check', credits: 0 },
];

function Check() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="mt-1 h-5 w-5 shrink-0 text-abt-accent" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

const sectionTitle = 'font-abt-serif text-[length:clamp(30px,4cqi,44px)] font-semibold leading-[1.12] tracking-[-0.02em] text-abt-ink';

export default function PricingPage() {
  return (
    <Page>
      <Suspense fallback={null}>
        <CheckoutRedirect />
      </Suspense>

      <div className="mx-auto max-w-[960px] px-4 pb-24 sm:px-6">
        {/* Hero: one offer */}
        <section className="pt-12 sm:pt-20">
          <h1 className="font-abt-serif text-[length:var(--abt-text-display)] font-semibold leading-[1.04] tracking-[-0.03em] text-abt-ink">
            Start for $9
          </h1>
          <Lead className="mt-5 max-w-[640px]">
            Use everything for 14 days. Then it continues at $39 a month, or you cancel. Not happy during your 14 days? We
            refund your $9.
          </Lead>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <PlanCheckoutLink productId="starter-monthly" returnUrl="/plans" className={abtButton()}>
              Start for $9
            </PlanCheckoutLink>
            <p className="text-[17px] text-abt-ink-2">Every price is public. No sales call needed.</p>
          </div>
        </section>

        {/* Monthly plans */}
        <section aria-label="Monthly plans" className="mt-12 grid gap-4 md:grid-cols-2">
          {plans.map((plan) => (
            <Card key={plan.id} className="flex flex-col sm:p-9">
              <h2 className="font-abt-sans text-[22px] font-bold tracking-normal text-abt-ink">{plan.name}</h2>
              <p className="mt-3 flex flex-wrap items-baseline gap-2">
                <span className="font-abt-serif text-[56px] font-medium leading-none tracking-[-0.03em] text-abt-ink">{plan.price}</span>
                <span className="text-[17px] text-abt-ink-2">{plan.unit}</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3 text-[18px] text-abt-ink">
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>
              <PlanCheckoutLink productId={plan.id} returnUrl="/plans" className={abtButton({ variant: 'secondary', full: true, className: 'mt-8 border-abt-ink' })}>
                {plan.cta}
              </PlanCheckoutLink>
            </Card>
          ))}
        </section>

        {/* Pay as you go */}
        <section aria-labelledby="packs-heading" className="mt-24">
          <Eyebrow className="text-abt-ink-2">No subscription</Eyebrow>
          <h2 id="packs-heading" className={`mt-4 ${sectionTitle}`}>
            Or buy credits once
          </h2>
          <Body className="mt-4 max-w-[560px]">Credits you buy once never expire.</Body>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {packs.map((pack) => (
              <Card key={pack.id} className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-[20px] font-bold text-abt-ink">{pack.name}</h3>
                  <p className="mt-1 text-[17px] text-abt-ink-2">
                    <span className="font-semibold text-abt-ink">{pack.price}</span> · {pack.detail}
                  </p>
                </div>
                <PlanCheckoutLink productId={pack.id} returnUrl="/plans" className={abtButton({ variant: 'secondary', size: 'md', className: 'border-abt-ink' })}>
                  Buy
                </PlanCheckoutLink>
              </Card>
            ))}
          </div>
        </section>

        {/* Agencies: honest, coming soon */}
        <section aria-labelledby="agencies-heading" className="mt-24 border-t border-abt-divider pt-16">
          <Eyebrow className="text-abt-ink-2">For agencies · Coming soon</Eyebrow>
          <h2 id="agencies-heading" className={`mt-4 max-w-[640px] ${sectionTitle}`}>
            Your logo, your clients, reports sent for you
          </h2>
          <Body className="mt-4 max-w-[640px]">
            We&apos;re building it now with a few agencies. When it opens, its prices will be public here like all our
            others.
          </Body>
          <a href="mailto:support@aibrandtrack.com?subject=Agency%20design%20partner" className={abtButton({ variant: 'link', className: 'mt-6 text-[18px]' })}>
            Shape it with us
          </a>
        </section>

        {/* What each action costs */}
        <section aria-labelledby="credits-heading" className="mt-24 grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 id="credits-heading" className={sectionTitle}>
              What each action costs in credits
            </h2>
            <Body className="mt-4">Some work uses credits. You always see the cost before you start it.</Body>
          </div>
          <div className="overflow-hidden rounded-abt-card border border-abt-line bg-abt-surface">
            <div className="flex justify-between border-b border-abt-divider px-6 py-4 text-[16px] font-semibold text-abt-ink-2">
              <span>Action</span>
              <span>Credits</span>
            </div>
            <ul>
              {creditCosts.map((c) => (
                <li key={c.action} className="flex items-center justify-between gap-6 border-b border-abt-divider px-6 py-5 last:border-b-0">
                  <div>
                    <p className="text-[19px] font-bold text-abt-ink">{c.action}</p>
                    <p className="mt-1 text-[16px] text-abt-ink-2">{c.detail}</p>
                  </div>
                  <span className="text-[24px] font-bold text-abt-ink">{c.credits}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Refund + transparency */}
        <section className="mt-24 grid gap-10 border-t border-abt-divider pt-16 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-abt-sans text-[22px] font-bold tracking-normal text-abt-ink">Not happy during your 14 days?</h2>
            <Body className="mt-3">We refund your $9. Just tell us.</Body>
          </div>
          <div>
            <h2 className="font-abt-sans text-[22px] font-bold tracking-normal text-abt-ink">Every price is public. No sales call needed.</h2>
            <Body className="mt-3">What you see here is what everyone pays. How we measure is public too.</Body>
            <Link href="/methodology" className={abtButton({ variant: 'link', className: 'mt-5 text-[18px]' })}>
              Read the methodology
            </Link>
          </div>
        </section>
      </div>
    </Page>
  );
}
