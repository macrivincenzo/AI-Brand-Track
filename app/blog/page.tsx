import type { Metadata } from 'next';
import Link from 'next/link';
import { getPosts } from '@/lib/blog-posts';
import { Calendar, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Search Visibility & GEO Blog',
  description:
    'Insights, tips, and updates about AI brand visibility, ChatGPT SEO, Claude optimization, Perplexity tracking, and AI search engine optimization strategies.',
  keywords: [
    'AI brand tracking blog',
    'AI SEO tips',
    'ChatGPT optimization',
    'AI search visibility',
    'brand monitoring insights',
    'GEO optimization strategies',
  ],
  openGraph: {
    title: 'AI Search Visibility & GEO Blog | AI Brand Track',
    description:
      'Insights, tips, and updates about AI brand visibility, ChatGPT SEO, Claude optimization, and AI search engine optimization.',
    url: 'https://www.aibrandtrack.com/blog',
  },
  alternates: {
    canonical: 'https://www.aibrandtrack.com/blog',
  },
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.aibrandtrack.com' },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.aibrandtrack.com/blog' },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'AI Brand Track Blog',
            url: 'https://www.aibrandtrack.com/blog',
            itemListElement: posts.map((post, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              name: post.title,
              url: `https://www.aibrandtrack.com/blog/${post.slug}`,
              description: post.excerpt,
            })),
          }),
        }}
      />

      <div className="abt-page min-h-screen">
        <div className="mx-auto max-w-[760px] px-4 pb-24 pt-12 sm:px-6 sm:pt-20">
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[16px] text-abt-ink-2">
              <li>
                <Link href="/" className="underline-offset-4 hover:text-abt-ink hover:underline">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-abt-ink">Blog</li>
            </ol>
          </nav>

          <div className="mb-12">
            <h1 className="font-abt-serif text-[length:clamp(38px,6cqi,56px)] font-semibold leading-[1.08] tracking-[-0.025em] text-abt-ink mb-5">
              Blog
            </h1>
            <p className="text-[length:var(--abt-text-lead)] leading-[1.4] text-abt-ink-2">
              Insights, tips, and updates about AI brand visibility
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="rounded-abt-card border border-abt-line bg-abt-surface py-16 text-center">
              <p className="text-[19px] text-abt-ink-2 mb-8">
                We&apos;re working on creating valuable content for you. Check back soon for blog posts about{' '}
                <Link href="/" className="font-medium text-abt-ink underline underline-offset-4 hover:text-abt-accent">
                  AI brand tracking
                </Link>
                ,{' '}
                <Link href="/about" className="font-medium text-abt-ink underline underline-offset-4 hover:text-abt-accent">
                  SEO strategies
                </Link>
                , and industry insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/blog/preview"
                  className="inline-flex h-14 items-center justify-center rounded-abt-button bg-abt-accent px-7 text-[18px] font-semibold text-abt-on-accent transition-colors hover:bg-[color-mix(in_oklch,var(--abt-accent)_86%,black)]"
                >
                  Preview Latest Blog Post
                </Link>
                <Link
                  href="/brand-monitor"
                  className="inline-flex h-14 items-center justify-center rounded-abt-button border border-abt-line-strong bg-abt-surface px-7 text-[18px] font-semibold text-abt-ink transition-colors hover:bg-abt-sunk"
                >
                  Start Monitoring Your Brand
                </Link>
              </div>
            </div>
          ) : (
            <ul className="space-y-8">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block group rounded-abt-card border border-abt-line bg-abt-surface p-6 sm:p-8 transition-colors hover:border-abt-accent"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <time
                        dateTime={post.date}
                        className="flex items-center gap-1.5 text-[16px] text-abt-ink-2"
                      >
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                    <h2 className="font-abt-serif text-[26px] font-semibold leading-[1.2] text-abt-ink mb-2 transition-colors group-hover:text-abt-accent">
                      {post.title}
                    </h2>
                    <p className="text-[18px] leading-[1.6] text-abt-ink-2 mb-4">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[16px] font-semibold text-abt-ink transition-all group-hover:gap-2">
                      Read article
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-16 pt-8 border-t border-abt-divider">
            <h2 className="font-abt-serif text-[length:clamp(26px,3.4cqi,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink mb-6">Explore More</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/"
                className="block rounded-abt-tile border border-abt-line bg-abt-surface p-5 transition-colors hover:border-abt-accent"
              >
                <h3 className="text-[19px] font-bold text-abt-ink mb-2">Home</h3>
                <p className="text-[16px] text-abt-ink-2">Learn about AI brand tracking</p>
              </Link>
              <Link
                href="/about"
                className="block rounded-abt-tile border border-abt-line bg-abt-surface p-5 transition-colors hover:border-abt-accent"
              >
                <h3 className="text-[19px] font-bold text-abt-ink mb-2">About Us</h3>
                <p className="text-[16px] text-abt-ink-2">Our mission and values</p>
              </Link>
              <Link
                href="/brand-monitor"
                className="block rounded-abt-tile border border-abt-line bg-abt-surface p-5 transition-colors hover:border-abt-accent"
              >
                <h3 className="text-[19px] font-bold text-abt-ink mb-2">Brand Monitor</h3>
                <p className="text-[16px] text-abt-ink-2">Start tracking your brand</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
