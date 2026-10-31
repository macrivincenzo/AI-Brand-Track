import Link from "next/link";
import { HeroForm } from "@/components/home/hero-form";
import { RotatingWord } from "@/components/home/rotating-word";
import { LogoLockup } from "@/components/brand/logo";
import { abtButton } from "@/components/abt/button";
import { Page, Card, StatusDot } from "@/components/abt/layout";
import { Eyebrow, Title, ItemTitle, Body } from "@/components/abt/text";
import { reviews, averageRating, ALTERNATIVETO_URL } from "@/lib/reviews";

const faqs = [
  {
    q: "How does the check work?",
    a: "You type your website. AI Brand Track finds your brand, industry and competitors (1 credit), then asks ChatGPT, Claude, Perplexity, and Google Gemini the questions your customers ask and counts how often each one names you compared with your competitors (10 credits). You get a report with a visibility score from 0 to 100, how you rank against competitors, every answer word for word, the websites the assistants quoted, and Boost actions: fixes such as FAQ, comparison and page content, written for you. Turn on weekly checks and it runs the same check every week by itself and emails you your score and what changed. A complete analysis uses 11 credits; a weekly check uses 10."
  },
  {
    q: "Do I need any technical knowledge?",
    a: "No. You type your website and read the report in plain words. Every fix comes written, ready to copy into your website or to hand to whoever looks after it."
  },
  {
    q: "What do I get for $9?",
    a: "The Starter plan begins with a 14-day trial for $9 (card required). It includes 1 full analysis across ChatGPT, Claude, Perplexity and Gemini, automatic weekly checks of 1 brand with a weekly email, and Boost actions (done-for-you fixes) using the remaining trial credits. After 14 days it continues at $39/month unless you cancel."
  },
  {
    q: "What if I am not happy?",
    a: "Not happy during your 14 days? We refund your $9 (one refund per customer). You can cancel any time, and you won't be charged the $39 if you cancel within the 14 days."
  },
  {
    q: "Can my agency send reports with its own logo?",
    a: "Not yet. We are building it now with a few agencies: every client checked each week and sent a report with your logo, and prospect reports you order in one sentence. Its prices will be public like all our others. Email support@aibrandtrack.com if you want to be one of the agencies shaping it."
  },
  {
    q: "What is AI brand visibility monitoring?",
    a: "AI brand visibility monitoring is the process of tracking how AI platforms like ChatGPT, Claude, Perplexity, and Google Gemini mention, rank, and recommend your brand in their answers. More and more buyers ask AI assistants for recommendations before they buy, and the answer usually names only a handful of brands. Unlike traditional SEO, which focuses on Google search rankings, AI brand monitoring tracks your presence in generative AI responses, and improving it is called AEO (Answer Engine Optimization) or GEO (Generative Engine Optimization)."
  },
  {
    q: "What is the difference between SEO and AEO?",
    a: "SEO (Search Engine Optimization) focuses on ranking in traditional search engines like Google through keywords, backlinks, and technical improvements. AEO (Answer Engine Optimization) focuses on being mentioned and recommended in AI answers from platforms like ChatGPT, Claude, and Perplexity, through clear, authoritative content and well-defined entities. SEO targets positions in search results; AEO targets how often and how favorably AI assistants mention you. Both matter, and they reinforce each other."
  },
  {
    q: "How much does AI Brand Track cost?",
    a: "Every price is public. Starter begins with a 14-day trial for $9, then costs $39/month with 53 credits/month. Pro costs $69/month with 154 credits/month. Pay-as-you-go: Single Analysis ($49) provides 53 credits for about 4 analyses, and the Credit Pack ($149) includes 220 credits for 20 analyses; these credits never expire. Each analysis uses 11 credits (1 for extraction + 10 for AI analysis), a weekly check uses 10, and competitor scraping costs 0 credits."
  }
];

// The three things the assistant does (also the HowTo schema steps)
const steps = [
  {
    title: "All four assistants",
    text: "Each check asks ChatGPT, Claude, Perplexity and Gemini the questions your customers really ask."
  },
  {
    title: "Fixes, already written",
    text: "Each problem comes with the fix written for you: an FAQ, a comparison or page text, ready to use."
  },
  {
    title: "Works while you're away",
    text: "Weekly checks run on their own. Every week a short report lands in your inbox."
  }
];

// Example report: made-up business and numbers, labelled as sample data on the page
const sampleAssistants = [
  { name: "ChatGPT", tone: "good", verdict: "Recommends you", named: 17 },
  { name: "Perplexity", tone: "mid", verdict: "Sometimes", named: 9 },
  { name: "Claude", tone: "bad", verdict: "Doesn't mention you", named: 0 },
  { name: "Gemini", tone: "bad", verdict: "Doesn't mention you", named: 0 }
] as const;

export default function Home() {
  return (
    <>
      {/* SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "AI Brand Track",
            "applicationCategory": "BusinessApplication",
            "applicationSubCategory": "Brand Monitoring Software",
            "operatingSystem": "Web Browser",
            "url": "https://www.aibrandtrack.com",
            "offers": [
              {
                "@type": "Offer",
                "name": "Starter 14-Day Trial",
                "description": "14 days for $9 including 1 full analysis, weekly checks of 1 brand and Boost actions, then $39/month unless cancelled. Not happy during your 14 days? We refund your $9.",
                "price": "9",
                "priceCurrency": "USD",
                "priceValidUntil": "2026-12-31",
                "availability": "https://schema.org/InStock",
                "url": "https://www.aibrandtrack.com/plans"
              },
              {
                "@type": "Offer",
                "name": "Pro",
                "price": "69",
                "priceCurrency": "USD",
                "priceValidUntil": "2026-12-31",
                "availability": "https://schema.org/InStock",
                "url": "https://www.aibrandtrack.com/plans"
              },
              {
                "@type": "Offer",
                "name": "Single Analysis Pack",
                "price": "49",
                "priceCurrency": "USD",
                "priceValidUntil": "2026-12-31",
                "availability": "https://schema.org/InStock",
                "url": "https://www.aibrandtrack.com/plans"
              },
              {
                "@type": "Offer",
                "name": "Credit Pack",
                "price": "149",
                "priceCurrency": "USD",
                "priceValidUntil": "2026-12-31",
                "availability": "https://schema.org/InStock",
                "url": "https://www.aibrandtrack.com/plans"
              }
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": averageRating,
              "reviewCount": reviews.length,
              "bestRating": "5",
              "worstRating": "1"
            },
            "review": reviews.map((r) => ({
              "@type": "Review",
              "author": { "@type": "Person", "name": r.author },
              "datePublished": r.date,
              "reviewRating": { "@type": "Rating", "ratingValue": r.rating, "bestRating": 5 },
              "reviewBody": r.quote
            })),
            "description": "AI Brand Track is an AI visibility platform. It asks ChatGPT, Claude, Perplexity, and Google Gemini the questions your customers ask, shows how they rank your brand against competitors with a 0-100 visibility score, writes the fixes, and re-checks every week with an email report.",
            "featureList": [
              "AI brand visibility analysis across ChatGPT, Claude, Perplexity, and Google Gemini",
              "Weekly automatic checks with an email report",
              "Competitor analysis and ranking comparison",
              "Every AI answer word for word, with the sources it cited",
              "Done-for-you fixes (Boost actions): FAQ, comparison and page content",
              "AI search optimization (AEO) and generative engine optimization (GEO) guidance"
            ],
            "screenshot": "https://www.aibrandtrack.com/opengraph-image",
            "softwareVersion": "2.0",
            "datePublished": "2025-01-01",
            "dateModified": "2026-10-29",
            "author": {
              "@type": "Organization",
              "name": "AI Brand Track"
            },
            "provider": {
              "@type": "Organization",
              "name": "AI Brand Track",
              "url": "https://www.aibrandtrack.com"
            },
            "softwareHelp": {
              "@type": "CreativeWork",
              "url": "https://www.aibrandtrack.com/blog"
            },
            "discussionUrl": "https://www.aibrandtrack.com/about",
            "potentialAction": {
              "@type": "UseAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.aibrandtrack.com/brand-monitor",
                "actionPlatform": [
                  "http://schema.org/DesktopWebPlatform",
                  "http://schema.org/MobileWebPlatform"
                ]
              }
            }
          })
        }}
      />

      {/* Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "AI Brand Track",
            "alternateName": "AI Brand Track - Brand Visibility Monitoring",
            "url": "https://www.aibrandtrack.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.aibrandtrack.com/logo-512.png",
              "width": 512,
              "height": 512
            },
            "description": "AI Brand Track is an AI brand visibility platform that helps businesses measure and improve their presence across ChatGPT, Claude, Perplexity, and Google Gemini. Founded in 2025, it provides visibility scores, competitor comparisons, weekly monitoring and done-for-you fixes for AI search optimization (AEO) and generative engine optimization (GEO).",
            "foundingDate": "2025",
            "areaServed": {
              "@type": "Place",
              "name": "Global"
            },
            "sameAs": [
              "https://twitter.com/aibrandtrack",
              "https://linkedin.com/company/aibrandtrack",
              "https://alternativeto.net/software/ai-brand-track/about/"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Customer Support",
              "email": "support@aibrandtrack.com",
              "availableLanguage": ["English"],
              "areaServed": "Global"
            },
            "knowsAbout": [
              "AI Brand Monitoring",
              "Artificial Intelligence",
              "Brand Visibility",
              "Search Engine Optimization",
              "AI Search Optimization",
              "Generative Engine Optimization",
              "Competitor Analysis",
              "Brand Analytics",
              "ChatGPT",
              "Claude",
              "Perplexity",
              "Google Gemini"
            ]
          })
        }}
      />

      {/* FAQPage (same questions as the visible FAQ) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })
        }}
      />

      {/* HowTo (same steps as the visible "What your assistant does") */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How AI Brand Track checks and improves your AI visibility",
            "description": "Check whether ChatGPT, Claude, Perplexity, and Google Gemini recommend your business, and fix it, with AI Brand Track",
            "image": "https://www.aibrandtrack.com/opengraph-image",
            "tool": [
              {
                "@type": "HowToTool",
                "name": "AI Brand Track Platform"
              }
            ],
            "step": steps.map((s, i) => ({
              "@type": "HowToStep",
              "position": i + 1,
              "name": s.title,
              "text": s.text,
              "url": "https://www.aibrandtrack.com/#how-it-works"
            }))
          })
        }}
      />

      {/* WebSite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "AI Brand Track",
            "alternateName": ["AI Brand Monitoring", "AI Brand Visibility Tracker"],
            "url": "https://www.aibrandtrack.com"
          })
        }}
      />

      <Page>
        {/* Hero: one headline, one box, one button */}
        <section className="px-4 sm:px-6">
          <div className="mx-auto flex max-w-[960px] flex-col items-center pb-20 pt-16 text-center sm:pt-28">
            <p className="text-[16px] font-medium text-abt-ink-2">
              AI Visibility Platform for ChatGPT, Claude, Perplexity &amp; Gemini
            </p>
            <h1 className="mt-5 font-abt-serif text-[length:var(--abt-text-display)] font-semibold leading-[1.04] tracking-[-0.03em] text-abt-ink">
              Find out if <RotatingWord />
              <br />
              recommends your business
            </h1>
            <p className="mt-7 max-w-[640px] text-[length:var(--abt-text-lead)] leading-[1.4] text-abt-ink-2">
              <strong className="font-semibold text-abt-ink">An AI employee for your brand.</strong> It checks ChatGPT,
              Claude, Perplexity and Gemini, writes the fixes and keeps watch every week.
            </p>
            <HeroForm className="mt-10 w-full max-w-[600px]" />
            <p className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-1 text-[16px] text-abt-ink-2">
              <span>
                <strong className="font-semibold text-abt-ink">Start for $9</strong> · 14 days, then $39/month
              </span>
              <span>Not happy? Get your $9 back</span>
              <Link href="/plans" className="font-semibold text-abt-ink underline underline-offset-4 hover:text-abt-accent">
                All prices are public
              </Link>
            </p>
          </div>
        </section>

        {/* Example report (sample data) */}
        <section className="px-4 sm:px-6" aria-labelledby="sample-heading">
          <figure className="mx-auto max-w-[960px]">
            <div className="overflow-hidden rounded-abt-panel border border-abt-line bg-abt-sunk shadow-[var(--abt-shadow-pop)]">
              <div className="flex items-center justify-between border-b border-abt-line bg-abt-surface px-5 py-4 sm:px-9">
                <LogoLockup fontSize={18} />
              </div>
              <div className="px-5 pb-6 pt-8 sm:px-9 sm:pb-9">
                <p className="text-[16px] text-abt-ink-2">Bellmont Furniture · bellmont.example · Example check</p>
                <h2 id="sample-heading" className="mt-2 font-abt-serif text-[length:var(--abt-text-title)] font-semibold leading-[1.1] tracking-[-0.02em] text-abt-ink">
                  Do AI assistants recommend you?
                </h2>

                <Card className="mt-6 grid gap-8 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-12 sm:p-10">
                  <div>
                    <p className="text-[16px] font-semibold uppercase tracking-[var(--abt-eyebrow-tracking)] text-abt-ink-2">
                      AI brand strength
                    </p>
                    <p className="mt-2 flex items-baseline gap-2">
                      <span className="font-abt-serif text-[length:var(--abt-text-score)] font-medium leading-[0.9] tracking-[-0.04em] text-abt-ink">
                        58
                      </span>
                      <span className="text-[18px] text-abt-ink-2">out of 100</span>
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-[18px] text-abt-ink-2">
                      <StatusDot tone="mid" />
                      <span className="text-[21px] font-bold text-abt-ink">OK</span> Up 6 points in 6 weeks
                    </p>
                    <p className="mt-4 text-[21px] leading-[1.45] text-abt-ink">
                      ChatGPT and Perplexity mention you; Claude and Gemini don&apos;t.
                    </p>
                    <div className="mt-5 flex h-2.5 gap-1 overflow-hidden" aria-hidden>
                      <span className="w-1/3 rounded-l-full bg-abt-accent" />
                      <span className="relative w-1/3 bg-abt-track">
                        <span className="absolute inset-y-0 left-0 w-[58%] bg-abt-accent" />
                      </span>
                      <span className="w-1/3 rounded-r-full bg-abt-track" />
                    </div>
                    <div className="mt-2 grid grid-cols-3 text-[16px] text-abt-ink-2">
                      <span>Weak</span>
                      <span className="font-semibold text-abt-ink">OK</span>
                      <span>Strong</span>
                    </div>
                    <Link href="/methodology" className={abtButton({ variant: "link", className: "mt-5 text-[16px]" })}>
                      How we measure
                    </Link>
                  </div>
                </Card>

                <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {sampleAssistants.map((a) => (
                    <li key={a.name} className="rounded-abt-tile border border-abt-line bg-abt-surface p-5">
                      <p className="text-[19px] font-bold text-abt-ink">{a.name}</p>
                      <p className="mt-2 flex items-center gap-2 text-[17px] text-abt-ink">
                        <StatusDot tone={a.tone} />
                        {a.verdict}
                      </p>
                      <p className="mt-2 text-[16px] text-abt-ink-2">Named in {a.named} of 24 answers</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <figcaption className="mt-4 text-center text-[16px] text-abt-ink-2">Example report (sample data)</figcaption>
          </figure>
        </section>

        {/* Price + how we measure */}
        <section className="px-4 pt-24 sm:px-6">
          <div className="mx-auto grid max-w-[960px] gap-4 md:grid-cols-2">
            <Card className="sm:p-10">
              <Eyebrow className="text-abt-ink-2">Price</Eyebrow>
              <Title className="mt-4 text-[length:clamp(30px,4cqi,44px)] leading-[1.12]">Start for $9</Title>
              <Body className="mt-4 text-[19px] text-abt-ink">14 days, then $39/month.</Body>
              <Body className="mt-2">Not happy? Get your $9 back.</Body>
              <Link href="/plans" className={abtButton({ variant: "link", className: "mt-6 text-[18px]" })}>
                All prices are public
              </Link>
            </Card>
            <Card className="sm:p-10">
              <Eyebrow className="text-abt-ink-2">How we measure</Eyebrow>
              <Title className="mt-4 text-[length:clamp(30px,4cqi,44px)] leading-[1.12]">Nothing hidden. Every step is written down.</Title>
              <Body className="mt-4">
                The questions we ask, how often we ask them, and how the 0 to 100 score is worked out are all public. You
                can check our work.
              </Body>
              <Link href="/methodology" className={abtButton({ variant: "link", className: "mt-6 text-[18px]" })}>
                Read the methodology
              </Link>
            </Card>
          </div>
        </section>

        {/* What the assistant does (HowTo) */}
        <section id="how-it-works" className="px-4 pt-24 sm:px-6" aria-label="What your AI employee does">
          <ul className="mx-auto grid max-w-[960px] gap-10 md:grid-cols-3 md:gap-12">
            {steps.map((s) => (
              <li key={s.title}>
                <ItemTitle>{s.title}</ItemTitle>
                <Body className="mt-3">{s.text}</Body>
              </li>
            ))}
          </ul>
        </section>

        {/* Reviews we can verify */}
        <section className="px-4 pt-24 sm:px-6" aria-labelledby="reviews-heading">
          <div className="mx-auto max-w-[960px]">
            <Title id="reviews-heading" className="text-[length:clamp(30px,4cqi,44px)] leading-[1.12]">What customers say</Title>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {reviews.map((r) => (
                <Card as="figure" key={r.author}>
                  <blockquote className="font-abt-serif text-[23px] font-medium leading-[1.35] text-abt-ink">
                    &ldquo;{r.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 text-[16px] text-abt-ink-2">
                    <span className="font-semibold text-abt-ink">{r.author}</span> · {r.rating} out of 5 ·{" "}
                    <a href={ALTERNATIVETO_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-abt-ink">
                      on AlternativeTo
                    </a>
                  </figcaption>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Agencies: honest, coming soon */}
        <section id="agencies" className="scroll-mt-8 px-4 pt-24 sm:px-6" aria-labelledby="agencies-heading">
          <div className="mx-auto grid max-w-[960px] gap-6 border-t border-abt-divider pt-16 md:grid-cols-2 md:gap-16">
            <div>
              <Eyebrow className="text-abt-ink-2">Coming soon</Eyebrow>
              <Title id="agencies-heading" className="mt-4 text-[length:clamp(30px,4cqi,44px)] leading-[1.12]">
                For agencies: your logo, your clients, reports sent for you
              </Title>
            </div>
            <div className="md:pt-10">
              <Body>
                We&apos;re building it now with a few agencies: every client checked each week and sent a report with your
                logo, and prospect reports you order in one sentence, like &ldquo;Check inkpath.example and send it to
                anna@inkpath.example with our logo&rdquo;.
              </Body>
              <a
                href="mailto:support@aibrandtrack.com?subject=Agency%20design%20partner"
                className={abtButton({ variant: "link", className: "mt-6 text-[18px]" })}
              >
                Shape it with us
              </a>
            </div>
          </div>
        </section>

        {/* FAQ: answers stay in the HTML for crawlers; <details> opens them */}
        <section className="px-4 pb-24 pt-24 sm:px-6" aria-labelledby="faq-heading">
          <div className="mx-auto max-w-[720px]">
            <Title id="faq-heading" className="text-[length:clamp(30px,4cqi,44px)] leading-[1.12]">Questions</Title>
            <div className="mt-8 border-t border-abt-divider">
              {faqs.map((faq, i) => (
                <details key={faq.q} open={i === 0} className="group border-b border-abt-divider">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[19px] font-semibold text-abt-ink [&::-webkit-details-marker]:hidden">
                    <h3>{faq.q}</h3>
                    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-abt-ink transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </summary>
                  <p className="pb-6 text-[18px] leading-[1.6] text-abt-ink-2">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </Page>
    </>
  );
}
