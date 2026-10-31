import Link from "next/link";
import { LogoLockup } from '@/components/brand/logo';

const columns = [
  {
    title: 'Product',
    links: [
      { href: '/plans', label: 'Prices' },
      { href: '/brand-monitor', label: 'Brand Monitor' },
      { href: '/ai-rank-tracker', label: 'AI Rank Tracker' },
      { href: '/ai-visibility-checker', label: 'AI Visibility Checker' },
      { href: '/methodology', label: 'Our methodology' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { href: '/ai-search-visibility', label: 'AI Search Visibility' },
      { href: '/generative-engine-optimization', label: 'Generative Engine Optimization' },
      { href: '/answer-engine-optimization', label: 'Answer Engine Optimization' },
      { href: '/llm-seo', label: 'LLM SEO' },
      { href: '/how-to-rank-on-chatgpt', label: 'How to Rank on ChatGPT' },
      { href: '/perplexity-seo', label: 'Perplexity SEO' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/blog', label: 'Blog' },
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms-of-service', label: 'Terms of Service' },
    ],
  },
];

export function Footer() {
  const currentYear = 2026;

  return (
    <>
      {/* Structured Data for Footer - Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "AI Brand Track",
            "url": "https://www.aibrandtrack.com",
            "logo": "https://www.aibrandtrack.com/logo-512.png",
            "description": "AI Brand Track helps businesses monitor their brand visibility across AI platforms like ChatGPT, Claude, Perplexity, and Gemini. Track AI brand rankings, competitor analysis, and get actionable insights for AI search optimization.",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "US"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Customer Support",
              "email": "support@aibrandtrack.com"
            }
          })
        }}
      />

      <footer className="border-t border-abt-divider bg-abt-bg font-abt-sans text-abt-ink-2">
        <div className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <LogoLockup fontSize={20} />
              <p className="mt-5 max-w-[380px] text-[16px] leading-[1.5]">
                Checks whether ChatGPT, Claude, Perplexity and Gemini recommend your business, every week, and writes the fixes when they don&apos;t.
              </p>
            </div>

            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 text-[16px] font-semibold text-abt-ink">{col.title}</h3>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[16px] transition-colors hover:text-abt-ink">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-2 border-t border-abt-divider pt-8 text-[16px] sm:flex-row sm:justify-between">
            <p>© {currentYear} AI Brand Track</p>
            <p>
              Every price is public.{' '}
              <Link href="/plans" className="underline underline-offset-4 hover:text-abt-ink">
                See them all
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
