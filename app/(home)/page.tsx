'use client';

import Link from "next/link";
import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { PlanCheckoutLink } from "@/components/plans/plan-checkout-link";
import { ReviewsSection, reviews, averageRating } from "@/components/reviews-section";

const faqs = [
  {
    q: "What is AI brand visibility monitoring?",
    a: "AI brand visibility monitoring is the process of tracking how AI platforms like ChatGPT, Claude, Perplexity, and Google Gemini mention, rank, and recommend your brand in their answers. Unlike traditional SEO, which focuses on Google search rankings, AI brand monitoring tracks your presence in generative AI responses. AI Brand Track analyzes your visibility across the major AI platforms, compares you against competitors, and gives actionable recommendations to improve your presence through AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization)."
  },
  {
    q: "How does AI Brand Track work?",
    a: "AI Brand Track works in three steps. First, you enter your website URL and we automatically extract your brand information, industry, and keywords (1 credit). Second, we query ChatGPT, Claude, Perplexity, and Google Gemini with industry-relevant prompts to see how they rank your brand against competitors (10 credits). Third, you get a report with your brand visibility score (0-100), competitor rankings, which prompts mention your brand, sentiment, and specific recommendations. A complete analysis takes about 60 seconds and uses 11 credits. Competitor scraping is included at 0 credits."
  },
  {
    q: "Which AI platforms does AI Brand Track monitor?",
    a: "AI Brand Track monitors OpenAI ChatGPT, Anthropic Claude, Perplexity, and Google Gemini. All platforms are queried during each analysis, so you get visibility scores for each one side by side. This matters because different AI models use different data sources and rank brands differently."
  },
  {
    q: "What is the difference between SEO and AEO?",
    a: "SEO (Search Engine Optimization) focuses on ranking in traditional search engines like Google through keywords, backlinks, and technical improvements. AEO (Answer Engine Optimization) focuses on being mentioned and recommended in AI answers from platforms like ChatGPT, Claude, and Perplexity, through clear, authoritative content and well-defined entities. SEO targets positions in search results; AEO targets how often and how favorably AI assistants mention you. Both matter, and they reinforce each other."
  },
  {
    q: "How much does AI Brand Track cost?",
    a: "AI Brand Track offers flexible pricing. The Starter plan begins with a 14-day trial for $9 (card required) that includes 1 full analysis across ChatGPT, Claude, Perplexity and Gemini, automatic weekly checks of 1 brand with a weekly email, and Boost actions (done-for-you fixes) using the remaining trial credits; after 14 days it continues at $39/month unless you cancel. Not happy during your 14 days? We refund your $9 (one per customer). Single Analysis ($49) provides 53 credits for ~4 analyses. Credit Pack ($149) includes 220 credits for 20 analyses. Monthly subscriptions: Starter ($39/month) with 53 credits/month and Pro ($69/month) with 154 credits/month. Each analysis uses 11 credits (1 for extraction + 10 for AI analysis). Competitor scraping costs 0 credits. Pay-as-you-go credits never expire."
  },
  {
    q: "How often should I monitor my AI brand visibility?",
    a: "We recommend re-running your analysis weekly if you are actively optimizing your AI presence, monthly if you are tracking long-term trends, and after major changes like product launches, rebrands, or competitor moves. Analyses are run on demand (there is no automatic scheduling) and saved, so you can compare results over time. AI answers change as new content is indexed and competitors publish, so regular checks show the impact of your optimization work and surface new opportunities."
  }
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { data: session } = useSession();

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      {/* Enhanced Structured Data - SoftwareApplication with RICHER context */}
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
              "datePublished": new Date(r.date).toISOString().slice(0, 10),
              "reviewRating": { "@type": "Rating", "ratingValue": r.rating, "bestRating": 5 },
              "reviewBody": r.quote
            })),
            "description": "AI Brand Track is an AI brand visibility tool. It queries ChatGPT, Claude, Perplexity, and Google Gemini with industry prompts and shows how they rank your brand against competitors, with a 0-100 visibility score, sentiment, share of voice, and actionable recommendations in about 60 seconds.",
            "featureList": [
              "On-demand AI brand visibility analysis across ChatGPT, Claude, Perplexity, and Google Gemini",
              "Competitor analysis and ranking comparison",
              "Strategic insights and actionable recommendations",
              "AI search optimization (AEO) guidance",
              "Generative engine optimization (GEO) tools",
              "Brand health scoring and trend tracking",
              "Multi-platform AI monitoring dashboard",
              "Prompt response analysis and quality scoring"
            ],
            "screenshot": "https://www.aibrandtrack.com/opengraph-image",
            "softwareVersion": "2.0",
            "datePublished": "2025-01-01",
            "dateModified": "2026-10-24",
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

      {/* Enhanced Organization Schema with MORE authority signals */}
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
              "width": 250,
              "height": 60
            },
            "description": "AI Brand Track is an AI brand visibility monitoring tool that helps businesses measure their presence across ChatGPT, Claude, Perplexity, and Google Gemini. Founded in 2025, it provides visibility scores, competitor comparisons, and strategic recommendations for AI search optimization (AEO) and generative engine optimization (GEO).",
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

      {/* FAQPage Schema (same questions as the visible FAQ) */}
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

      {/* NEW: HowTo Schema for "How to track AI brand visibility" */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Track Your Brand Visibility Across AI Platforms",
            "description": "Learn how to monitor your brand presence on ChatGPT, Claude, Perplexity, and Google Gemini with AI Brand Track",
            "image": "https://www.aibrandtrack.com/opengraph-image",
            "totalTime": "PT1M",
            "estimatedCost": {
              "@type": "MonetaryAmount",
              "currency": "USD",
              "value": "0"
            },
            "tool": [
              {
                "@type": "HowToTool",
                "name": "AI Brand Track Platform"
              }
            ],
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "Enter Your Website URL",
                "text": "Visit AI Brand Track and enter your website URL in the analysis form. The system will automatically extract your brand information, industry keywords, and relevant data.",
                "url": "https://www.aibrandtrack.com/brand-monitor"
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "AI Platforms Analyze Your Brand",
                "text": "AI Brand Track simultaneously queries ChatGPT, Claude, Perplexity, and Google Gemini with industry-relevant prompts to see how each platform ranks and mentions your brand.",
                "url": "https://www.aibrandtrack.com/brand-monitor"
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "Review Your Results",
                "text": "Access your comprehensive AI brand visibility report showing your score (0-100), competitor rankings, strategic insights, and specific recommendations to improve your AI presence.",
                "url": "https://www.aibrandtrack.com/brand-monitor"
              }
            ]
          })
        }}
      />

      {/* WebSite Schema */}
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

    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="inline-block mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-none border border-blue-200">
                Track ChatGPT, Claude, Perplexity & Gemini
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
              AI Brand Visibility
              <br />
              <span className="text-blue-600">Monitoring</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Track how AI platforms rank your brand. Get actionable insights in 60 seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {session ? (
                <Link
                  href="/brand-monitor"
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-none border-2 border-blue-600 hover:border-blue-700 transition-colors"
                >
                  Start Analysis
                </Link>
              ) : (
                <PlanCheckoutLink
                  productId="starter-monthly"
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-none border-2 border-blue-600 hover:border-blue-700 transition-colors"
                  returnUrl="/"
                >
                  Start 14-day trial for $9
                </PlanCheckoutLink>
              )}
              <Link
                href="/plans"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-gray-900 bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-none transition-colors"
              >
                View Pricing
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <span>✓ 14 days for $9</span>
              <span>✓ 1 full analysis + weekly checks</span>
              <span>✓ Then $39/month · cancel anytime</span>
            </div>
            <p className="mt-3 text-sm text-gray-500">Not happy? Get your $9 back.</p>
          </div>

          {/* Stats */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">4</div>
              <div className="text-sm text-gray-600">AI Platforms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">60s</div>
              <div className="text-sm text-gray-600">Analysis Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">6</div>
              <div className="text-sm text-gray-600">Competitors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">0-100</div>
              <div className="text-sm text-gray-600">Visibility Score</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Three simple steps to track your AI brand visibility
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-none flex items-center justify-center text-xl font-bold mx-auto mb-4 border-2 border-blue-600">1</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Enter Your URL</h3>
              <p className="text-gray-600">
                We automatically extract your brand and industry keywords
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-none flex items-center justify-center text-xl font-bold mx-auto mb-4 border-2 border-blue-600">2</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">AI Analysis</h3>
              <p className="text-gray-600">
                We query ChatGPT, Claude, Perplexity, and Gemini simultaneously
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-none flex items-center justify-center text-xl font-bold mx-auto mb-4 border-2 border-blue-600">3</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Get Insights</h3>
              <p className="text-gray-600">
                Receive visibility scores, rankings, and strategic recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why AI Brand Visibility Matters in 2026
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            More and more buyers ask AI assistants like ChatGPT, Claude, Perplexity, and Google Gemini for recommendations before they buy. When someone asks "What are the best [your category] tools?", the answer usually names only a handful of brands. If you're not one of them, that buyer may never hear of you.
          </p>
          <p className="text-lg text-gray-600">
            AI Brand Track helps you monitor your visibility across ChatGPT (OpenAI), Claude (Anthropic), Perplexity AI, and Google Gemini. Track your rankings, compare against competitors, and get strategic recommendations to improve your AI search presence through AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization).
          </p>
        </div>
      </section>

      {/* Customer reviews from AlternativeTo */}
      <ReviewsSection />

      {/* Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gray-900">
              Choose Your Pricing Plan
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Flexible pricing options to fit your needs. Pay-as-you-go credits or monthly subscriptions.
            </p>
          </div>

          {/* One-Time Credit Plans Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">
                Pay-As-You-Go Plans
              </h3>
              <p className="text-lg text-gray-600">
                One-time purchases. Credits never expire. No subscriptions.
              </p>
            </div>

            <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
              {/* Single Analysis */}
              <div className="bg-white p-8 border-2 border-blue-600 relative rounded-none">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1.5 text-sm font-semibold rounded-none border-2 border-blue-600">
                  Most Popular
                </div>
                <h4 className="text-2xl font-bold mb-2 text-gray-900">Single Analysis</h4>
                <p className="text-gray-600 mb-6">One-time purchase</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">$49</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    53 credits (~4 full analyses)
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Credits never expire
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Competitor scraping included (0 credits)
                  </li>
                </ul>
                <PlanCheckoutLink
                  productId="single-analysis"
                  className="w-full inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-none border-2 border-blue-600 hover:border-blue-700"
                  returnUrl="/"
                >
                  Buy Now
                </PlanCheckoutLink>
              </div>

              {/* Credit Pack */}
              <div className="bg-white p-8 border-2 border-gray-200 transition-colors hover:border-gray-300 rounded-none">
                <h4 className="text-2xl font-bold mb-2 text-gray-900">Credit Pack</h4>
                <p className="text-gray-600 mb-6">Best value</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">$149</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    220 credits (20 full analyses)
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save 25% vs Single Analysis
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Priority support
                  </li>
                </ul>
                <PlanCheckoutLink
                  productId="credit-pack"
                  className="w-full inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-gray-900 bg-white border-2 border-gray-300 hover:bg-gray-50 transition-colors rounded-none"
                  returnUrl="/"
                >
                  Buy Now
                </PlanCheckoutLink>
              </div>
            </div>
          </div>

          {/* Monthly Subscription Plans Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">
                Monthly Subscription Plans
              </h3>
              <p className="text-lg text-gray-600">
                Recurring monthly plans with automatic credit allocation and advanced features.
              </p>
            </div>

            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
              {/* Starter Plan */}
              <div className="bg-white p-8 border-2 border-gray-200 transition-colors hover:border-gray-300 rounded-none">
                <h4 className="text-2xl font-bold mb-2 text-gray-900">Starter</h4>
                <p className="text-gray-600 mb-6">Perfect for individuals</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">$9</span>
                  <span className="text-gray-600 text-lg ml-2">for 14 days</span>
                  <p className="text-sm text-gray-600 mt-2">Trial: 1 full analysis + weekly checks of 1 brand</p>
                  <p className="text-sm text-gray-600 mt-1">Then $39/month · cancel anytime</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    53 credits/month (~4 analyses)
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    1 project & 1 brand
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Competitor scraping included (0 credits)
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Basic tracking features
                  </li>
                </ul>
                <PlanCheckoutLink
                  productId="starter-monthly"
                  className="w-full inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-gray-900 bg-white border-2 border-gray-300 hover:bg-gray-50 transition-colors rounded-none"
                  returnUrl="/"
                >
                  Start 14-day trial for $9
                </PlanCheckoutLink>
                <p className="text-xs text-gray-500 mt-3 text-center">Not happy? Get your $9 back.</p>
              </div>

              {/* Pro Plan */}
              <div className="bg-white p-8 border-2 border-blue-600 relative rounded-none">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1.5 text-sm font-semibold rounded-none border-2 border-blue-600">
                  Recommended
                </div>
                <h4 className="text-2xl font-bold mb-2 text-gray-900">Pro</h4>
                <p className="text-gray-600 mb-6">For growing businesses</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">$69</span>
                  <span className="text-gray-600 text-lg ml-2">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    154 credits/month (~14 analyses)
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited projects & brands
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Competitor scraping included (0 credits)
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Advanced tracking features
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Keyword data via DataForSEO
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Priority support
                  </li>
                </ul>
                <PlanCheckoutLink
                  productId="pro-monthly"
                  className="w-full inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-none border-2 border-blue-600 hover:border-blue-700"
                  returnUrl="/"
                >
                  Subscribe
                </PlanCheckoutLink>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-white p-8 border-2 border-gray-200 transition-colors hover:border-gray-300 rounded-none">
                <h4 className="text-2xl font-bold mb-2 text-gray-900">Enterprise</h4>
                <p className="text-gray-600 mb-6">For large organizations</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">Custom</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited credits
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited projects & brands
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    All tracking features
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Custom prompt sets
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Saved analysis history
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Dedicated support
                  </li>
                </ul>
                <Link
                  href="mailto:support@aibrandtrack.com?subject=Enterprise%20Plan%20Inquiry"
                  className="w-full inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-gray-900 bg-white border-2 border-gray-300 hover:bg-gray-50 transition-colors rounded-none"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">How Credits Work</h3>
            <div className="bg-white rounded-none p-6 mb-6 border-2 border-gray-200">
              <div className="grid md:grid-cols-3 gap-4 text-left">
                <div className="text-center p-4">
                  <div className="text-2xl font-bold text-blue-600 mb-1">1 credit</div>
                  <div className="text-sm text-gray-600">Website extraction</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-2xl font-bold text-green-600 mb-1">0 credits</div>
                  <div className="text-sm text-gray-600">Competitor scraping</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-2xl font-bold text-blue-600 mb-1">10 credits</div>
                  <div className="text-sm text-gray-600">Full AI analysis</div>
                </div>
              </div>
              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="text-lg font-semibold text-gray-900">
                  Total: 11 credits per complete brand analysis
                </div>
              </div>
            </div>
            <p className="text-gray-600">
              Pay-as-you-go credits never expire. Buy once, use anytime. No hidden fees.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              FAQ
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border-2 border-gray-200 rounded-none overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-base font-semibold text-gray-900 pr-4">
                    {faq.q}
                  </h3>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {/* Always in the HTML so crawlers can read every answer; hidden until opened */}
                <div className={`px-6 py-4 border-t border-gray-200 ${openFaq === index ? '' : 'hidden'}`}>
                  <p className="text-sm text-gray-600">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
