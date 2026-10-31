import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about AI Brand Track and our mission to help businesses understand and improve their presence in AI-powered search. Empowering brands with AI visibility insights.',
  keywords: [
    'about AI brand tracking',
    'AI brand monitoring company',
    'AI search optimization',
    'brand visibility tools',
    'AI platform monitoring'
  ],
  openGraph: {
    title: 'About Us | AI Brand Track',
    description: 'Learn about AI Brand Track and our mission to help businesses understand and improve their presence in AI-powered search.',
    url: 'https://www.aibrandtrack.com/about',
  },
  alternates: {
    canonical: 'https://www.aibrandtrack.com/about',
  },
};

import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.aibrandtrack.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "About",
                "item": "https://www.aibrandtrack.com/about"
              }
            ]
          })
        }}
      />
      
      <div className="abt-page min-h-screen">
        <div className="mx-auto max-w-[760px] px-4 pb-24 pt-12 sm:px-6 sm:pt-20">
          {/* Breadcrumb Navigation */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[16px] text-abt-ink-2">
              <li>
                <Link href="/" className="underline-offset-4 hover:text-abt-ink hover:underline">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-abt-ink">About</li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <h1 className="font-abt-serif text-[length:clamp(38px,6cqi,56px)] font-semibold leading-[1.08] tracking-[-0.025em] text-abt-ink mb-5">
              About AI Brand Track
            </h1>
            <p className="text-[length:var(--abt-text-lead)] leading-[1.4] text-abt-ink-2">
              Our mission is to help businesses understand and improve their presence in AI-powered search
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="space-y-8 text-[18px] leading-[1.65] text-abt-ink-2">
              <p className="text-[19px] leading-[1.6]">
                At AI Brand Track, our main mission is to empower businesses to take control of how AI models present their brand to the world. As AI-powered search becomes increasingly prevalent, understanding your brand's visibility across platforms like <Link href="/" className="text-abt-ink underline underline-offset-4 hover:text-abt-accent">ChatGPT, Claude, Perplexity, and Google Gemini</Link> is crucial for maintaining a competitive edge.
              </p>

              <p className="text-[19px] leading-[1.6]">
                We believe that every business deserves transparency into how AI models rank and mention their brand. Our <Link href="/brand-monitor" className="text-abt-ink underline underline-offset-4 hover:text-abt-accent">brand monitoring platform</Link> queries ChatGPT, Claude, Perplexity, and Google Gemini on demand and gives you a visibility score, competitor analysis, sentiment, and actionable recommendations to help you optimize your AI presence and make sure your brand is accurately represented.
              </p>

              <p className="text-[19px] leading-[1.6]">
                Whether you're a startup looking to establish your brand in AI search results or an established company monitoring your competitive position, AI Brand Track gives you the tools and insights you need to succeed in the age of AI-powered discovery. <Link href="/plans" className="text-abt-ink underline underline-offset-4 hover:text-abt-accent">Explore our pricing plans</Link> to get started with comprehensive AI brand visibility monitoring.
              </p>
            </div>
          </div>

          {/* Related Links Section */}
          <div className="mt-16 pt-8 border-t border-abt-divider">
            <h2 className="font-abt-serif text-[length:clamp(26px,3.4cqi,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink mb-6">Related Resources</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/brand-monitor" className="block rounded-abt-tile border border-abt-line bg-abt-surface p-5 transition-colors hover:border-abt-accent">
                <h3 className="text-[19px] font-bold text-abt-ink mb-2">Start Brand Monitoring</h3>
                <p className="text-[16px] text-abt-ink-2">Track your brand visibility across AI platforms</p>
              </Link>
              <Link href="/plans" className="block rounded-abt-tile border border-abt-line bg-abt-surface p-5 transition-colors hover:border-abt-accent">
                <h3 className="text-[19px] font-bold text-abt-ink mb-2">View Pricing</h3>
                <p className="text-[16px] text-abt-ink-2">Simple pay-as-you-go pricing plans</p>
              </Link>
              <Link href="/blog" className="block rounded-abt-tile border border-abt-line bg-abt-surface p-5 transition-colors hover:border-abt-accent">
                <h3 className="text-[19px] font-bold text-abt-ink mb-2">Read Our Blog</h3>
                <p className="text-[16px] text-abt-ink-2">AI brand tracking insights and tips</p>
              </Link>
              <Link href="/" className="block rounded-abt-tile border border-abt-line bg-abt-surface p-5 transition-colors hover:border-abt-accent">
                <h3 className="text-[19px] font-bold text-abt-ink mb-2">Learn More</h3>
                <p className="text-[16px] text-abt-ink-2">Discover how AI Brand Track works</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

