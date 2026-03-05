import type { Metadata } from 'next';
import Link from 'next/link';
import { getPosts } from '@/lib/blog-posts';
import { Calendar, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog - AI Brand Track',
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
    title: 'Blog - AI Brand Track',
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

      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-zinc-600">
              <li>
                <Link href="/" className="hover:text-zinc-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-zinc-900">Blog</li>
            </ol>
          </nav>

          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-zinc-900 mb-4">
              Blog
            </h1>
            <p className="text-xl text-zinc-600">
              Insights, tips, and updates about AI brand visibility
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-16 border border-zinc-200 rounded-xl bg-zinc-50/50">
              <p className="text-lg text-zinc-600 mb-8">
                We&apos;re working on creating valuable content for you. Check back soon for blog posts about{' '}
                <Link href="/" className="text-zinc-900 font-medium hover:underline">
                  AI brand tracking
                </Link>
                ,{' '}
                <Link href="/about" className="text-zinc-900 font-medium hover:underline">
                  SEO strategies
                </Link>
                , and industry insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/blog/preview"
                  className="inline-flex items-center justify-center rounded-[10px] text-base font-medium bg-zinc-900 text-white h-12 px-8 hover:bg-zinc-800 transition-colors"
                >
                  Preview Latest Blog Post
                </Link>
                <Link
                  href="/brand-monitor"
                  className="inline-flex items-center justify-center rounded-[10px] text-base font-medium border border-zinc-300 text-zinc-900 h-12 px-8 hover:bg-zinc-100 transition-colors"
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
                    className="block group border border-zinc-200 rounded-xl p-6 sm:p-8 hover:border-zinc-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <time
                        dateTime={post.date}
                        className="flex items-center gap-1.5 text-sm text-zinc-500"
                      >
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900 mb-2 group-hover:text-zinc-700 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-zinc-600 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 group-hover:gap-2 transition-all">
                      Read article
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-16 pt-8 border-t border-zinc-200">
            <h2 className="text-2xl font-bold text-zinc-900 mb-6">Explore More</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/"
                className="p-4 border border-zinc-200 rounded-lg hover:border-zinc-300 hover:bg-zinc-50/50 transition-colors"
              >
                <h3 className="font-semibold text-zinc-900 mb-2">Home</h3>
                <p className="text-sm text-zinc-600">Learn about AI brand tracking</p>
              </Link>
              <Link
                href="/about"
                className="p-4 border border-zinc-200 rounded-lg hover:border-zinc-300 hover:bg-zinc-50/50 transition-colors"
              >
                <h3 className="font-semibold text-zinc-900 mb-2">About Us</h3>
                <p className="text-sm text-zinc-600">Our mission and values</p>
              </Link>
              <Link
                href="/brand-monitor"
                className="p-4 border border-zinc-200 rounded-lg hover:border-zinc-300 hover:bg-zinc-50/50 transition-colors"
              >
                <h3 className="font-semibold text-zinc-900 mb-2">Brand Monitor</h3>
                <p className="text-sm text-zinc-600">Start tracking your brand</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
