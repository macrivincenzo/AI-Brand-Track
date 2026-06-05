import Link from "next/link";

/**
 * Shared, fully server-rendered SEO landing page.
 *
 * Renders in the exact homepage visual language (white bg, blue-600 accent,
 * rounded-none, border-2, gray type scale) and emits Article + FAQPage +
 * BreadcrumbList JSON-LD. FAQs use native <details> so the page stays a
 * server component (best for crawlability + AI answer engines).
 */

const SITE = "https://www.aibrandtrack.com";

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
            image: `${SITE}/og-image.png`,
            datePublished: published,
            dateModified: modified,
            author: { "@type": "Organization", name: "AI Brand Track", url: SITE },
            publisher: {
              "@type": "Organization",
              name: "AI Brand Track",
              logo: { "@type": "ImageObject", url: `${SITE}/ai-brand-track-logo.jpeg` },
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
              {
                "@type": "ListItem",
                position: 2,
                name: "AI Search Visibility",
                item: `${SITE}/ai-search-visibility`,
              },
              { "@type": "ListItem", position: 3, name: data.breadcrumb, item: url },
            ],
          }),
        }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-gray-500">
                <li>
                  <Link href="/" className="hover:text-gray-900 transition-colors">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/ai-search-visibility" className="hover:text-gray-900 transition-colors">
                    AI Search Visibility
                  </Link>
                </li>
                <li>/</li>
                <li className="text-gray-900">{data.breadcrumb}</li>
              </ol>
            </nav>

            <div className="inline-block mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-none border border-blue-200">
                {data.eyebrow}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              {data.h1}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mb-10">{data.subhead}</p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/login?from=/brand-monitor"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-none border-2 border-blue-600 hover:border-blue-700 transition-colors"
              >
                Start Free Analysis
              </Link>
              <Link
                href="/plans"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-gray-900 bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-none transition-colors"
              >
                View Pricing
              </Link>
            </div>

            <div className="prose prose-lg max-w-none">
              {data.intro.map((p, i) => (
                <p key={i} className="text-lg text-gray-600 leading-relaxed mb-4">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Sections */}
        {data.sections.map((s, i) => (
          <section
            key={i}
            className={`py-16 px-4 sm:px-6 lg:px-8 ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
          >
            <div className="max-w-4xl mx-auto">
              <h2
                id={s.id}
                className="text-3xl font-bold text-gray-900 mb-6 tracking-tight scroll-mt-24"
              >
                {s.heading}
              </h2>
              {s.body?.map((p, j) => (
                <p key={j} className="text-lg text-gray-600 leading-relaxed mb-4">
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul className="mt-4 space-y-3">
                  {s.bullets.map((b, j) => (
                    <li key={j} className="flex items-start text-gray-700">
                      <svg
                        className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-lg leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}

        {/* FAQ */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {data.faqs.map((f, i) => (
                <details
                  key={i}
                  className="bg-white border-2 border-gray-200 rounded-none group"
                >
                  <summary className="px-6 py-4 cursor-pointer list-none flex justify-between items-center text-base font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                    {f.q}
                    <span className="ml-4 text-gray-400 group-open:rotate-180 transition-transform">
                      ▾
                    </span>
                  </summary>
                  <div className="px-6 py-4 border-t border-gray-200 text-gray-600 leading-relaxed">
                    {f.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related (internal links) */}
        {data.related.length > 0 && (
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">
                Keep exploring
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {data.related.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="block p-6 bg-white border-2 border-gray-200 hover:border-blue-600 rounded-none transition-colors"
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{r.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{r.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              {data.cta.heading}
            </h2>
            <p className="text-lg text-gray-600 mb-10">{data.cta.sub}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login?from=/brand-monitor"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-none border-2 border-blue-600 hover:border-blue-700 transition-colors"
              >
                Start Free Analysis
              </Link>
              <Link
                href="/plans"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-gray-900 bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-none transition-colors"
              >
                View Pricing
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              ✓ No credit card &nbsp;·&nbsp; ✓ Results in 60 seconds &nbsp;·&nbsp; ✓ 11 free credits
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
