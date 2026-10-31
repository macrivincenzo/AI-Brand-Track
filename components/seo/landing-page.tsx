import Link from "next/link";
import { LANDING_GUIDES } from "@/lib/blog-links";
import { Page } from "@/components/abt/layout";
import { Eyebrow, Lead, Body } from "@/components/abt/text";
import { abtButton } from "@/components/abt/button";
import { HeroForm } from "@/components/home/hero-form";

/**
 * Shared, fully server-rendered SEO landing page.
 *
 * Renders in the homepage's design system (components/abt, --abt-* tokens) and
 * emits Article + FAQPage + BreadcrumbList JSON-LD. FAQs use native <details> so the page stays a
 * server component (best for crawlability + AI answer engines).
 */

const SITE = "https://www.aibrandtrack.com";

const sectionTitle =
  "font-abt-serif text-[length:clamp(28px,3.4cqi,34px)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink";

export interface LPSection {
  id?: string;
  heading: string;
  body?: string[];
  bullets?: string[];
}
export interface LPFaq {
  q: string;
  a: string;
}
export interface LPRelated {
  href: string;
  title: string;
  desc: string;
}
export interface LandingPageData {
  slug: string; // e.g. "generative-engine-optimization"
  breadcrumb: string; // e.g. "Generative Engine Optimization"
  eyebrow: string;
  h1: string;
  subhead: string;
  intro: string[];
  sections: LPSection[];
  faqs: LPFaq[];
  related: LPRelated[];
  cta: { heading: string; sub: string };
  datePublished?: string;
  dateModified?: string;
}

export function LandingPage({ data }: { data: LandingPageData }) {
  const url = `${SITE}/${data.slug}`;
  const published = data.datePublished ?? "2026-05-17";
  const modified = data.dateModified ?? "2026-05-17";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: data.h1,
            description: data.subhead,
            image: `${SITE}/opengraph-image`,
            datePublished: published,
            dateModified: modified,
            author: { "@type": "Organization", name: "AI Brand Track", url: SITE },
            publisher: {
              "@type": "Organization",
              name: "AI Brand Track",
              logo: { "@type": "ImageObject", url: `${SITE}/logo-512.png` },
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            url,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: data.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE },
              ...(url === `${SITE}/ai-search-visibility`
                ? []
                : [
                    {
                      "@type": "ListItem",
                      position: 2,
                      name: "AI Search Visibility",
                      item: `${SITE}/ai-search-visibility`,
                    },
                  ]),
              {
                "@type": "ListItem",
                position: url === `${SITE}/ai-search-visibility` ? 2 : 3,
                name: data.breadcrumb,
                item: url,
              },
            ],
          }),
        }}
      />

      <Page>
        <article>
          {/* Hero */}
          <header className="px-4 sm:px-6">
            <div className="mx-auto max-w-[760px] pb-12 pt-12 sm:pt-20">
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-2 text-[16px] text-abt-ink-2">
                  <li>
                    <Link href="/" className="underline-offset-4 hover:text-abt-ink hover:underline">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li>
                    <Link href="/ai-search-visibility" className="underline-offset-4 hover:text-abt-ink hover:underline">
                      AI Search Visibility
                    </Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li className="text-abt-ink">{data.breadcrumb}</li>
                </ol>
              </nav>

              <Eyebrow className="mt-10">{data.eyebrow}</Eyebrow>
              <h1 className="mt-4 font-abt-serif text-[length:clamp(38px,6cqi,60px)] font-semibold leading-[1.08] tracking-[-0.025em] text-abt-ink">
                {data.h1}
              </h1>
              <Lead className="mt-6">{data.subhead}</Lead>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Link href="/plans?checkout=starter-monthly" className={abtButton()}>
                  Start for $9
                </Link>
                <Link href="/plans" className={abtButton({ variant: "link", className: "text-[18px]" })}>
                  All prices are public
                </Link>
              </div>

              <div className="mt-12 space-y-5">
                {data.intro.map((p, i) => (
                  <Body key={i} className="text-[19px] leading-[1.65]">
                    {p}
                  </Body>
                ))}
              </div>
            </div>
          </header>

          {/* Sections */}
          {data.sections.map((s, i) => (
            <section key={i} className="px-4 sm:px-6">
              <div className="mx-auto max-w-[760px] border-t border-abt-divider py-12">
                <h2 id={s.id} className={`scroll-mt-24 ${sectionTitle}`}>
                  {s.heading}
                </h2>
                <div className="mt-5 space-y-4">
                  {s.body?.map((p, j) => (
                    <Body key={j} className="text-[19px] leading-[1.65]">
                      {p}
                    </Body>
                  ))}
                </div>
                {s.bullets && (
                  <ul className="mt-5 space-y-3">
                    {s.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-[19px] leading-[1.6] text-abt-ink">
                        <span aria-hidden className="mt-[11px] h-2.5 w-2.5 shrink-0 rounded-full bg-abt-accent" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </article>

        {/* FAQ */}
        <section className="px-4 sm:px-6" aria-labelledby="faq-heading">
          <div className="mx-auto max-w-[760px] border-t border-abt-divider py-12">
            <h2 id="faq-heading" className={sectionTitle}>
              Questions
            </h2>
            <div className="mt-6 border-t border-abt-divider">
              {data.faqs.map((f, i) => (
                <details key={i} className="group border-b border-abt-divider">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[19px] font-semibold text-abt-ink [&::-webkit-details-marker]:hidden">
                    <h3>{f.q}</h3>
                    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </summary>
                  <p className="pb-6 text-[18px] leading-[1.6] text-abt-ink-2">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related pages and supporting guides from the blog (internal links) */}
        {[
          { title: "Keep exploring", items: data.related },
          { title: "In-depth guides", items: LANDING_GUIDES[data.slug] ?? [] },
        ]
          .filter((group) => group.items.length > 0)
          .map((group) => (
            <section key={group.title} className="px-4 sm:px-6">
              <div className="mx-auto max-w-[960px] py-12">
                <h2 className={sectionTitle}>{group.title}</h2>
                <ul className="mt-6 grid gap-4 md:grid-cols-3">
                  {group.items.map((r) => (
                    <li key={r.href}>
                      <Link
                        href={r.href}
                        className="block h-full rounded-abt-card border border-abt-line bg-abt-surface p-6 transition-colors hover:border-abt-accent"
                      >
                        <h3 className="text-[19px] font-bold leading-[1.3] text-abt-ink">{r.title}</h3>
                        <p className="mt-2 text-[16px] leading-[1.5] text-abt-ink-2">{r.desc}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}

        {/* CTA: the same one box as the homepage */}
        <section className="px-4 pb-24 pt-12 sm:px-6" aria-labelledby="cta-heading">
          <div className="mx-auto flex max-w-[760px] flex-col items-center rounded-abt-panel border border-abt-line bg-abt-surface px-6 py-12 text-center sm:px-12">
            <h2 id="cta-heading" className="font-abt-serif text-[length:clamp(28px,4cqi,40px)] font-semibold leading-[1.15] tracking-[-0.02em] text-abt-ink">
              {data.cta.heading}
            </h2>
            <Body className="mt-4 max-w-[560px]">{data.cta.sub}</Body>
            <HeroForm id="lp-cta-url" className="mt-8 w-full max-w-[600px]" />
            <p className="mt-5 text-[16px] text-abt-ink-2">
              <strong className="font-semibold text-abt-ink">Start for $9</strong> · 14 days, then $39/month · Not happy? Get your $9 back
            </p>
          </div>
        </section>
      </Page>
    </>
  );
}
