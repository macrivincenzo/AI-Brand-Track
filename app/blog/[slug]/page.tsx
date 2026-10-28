import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getAllSlugs } from '@/lib/blog-posts';
import { getPostRelated } from '@/lib/blog-links';
import { Calendar, ArrowLeft } from 'lucide-react';

function generateHeadingId(text: string): string {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: 'Post not found' };
  }
  // The root template appends " | AI Brand Track" (17 chars). Drop it when the
  // result would pass ~70 chars, the point where Bing/Google truncate titles.
  const title = `${post.title} | AI Brand Track`.length > 70 ? { absolute: post.title } : post.title;
  return {
    title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://www.aibrandtrack.com/blog/${post.slug}`,
    },
    alternates: {
      canonical: `https://www.aibrandtrack.com/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const publishDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            dateModified: post.date,
            keywords: Array.isArray(post.keywords) ? post.keywords.join(', ') : post.keywords,
            image: {
              '@type': 'ImageObject',
              url: 'https://www.aibrandtrack.com/opengraph-image',
              width: 1200,
              height: 630,
            },
            author: {
              '@type': 'Organization',
              name: post.author ?? 'AI Brand Track Team',
              url: 'https://www.aibrandtrack.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'AI Brand Track',
              url: 'https://www.aibrandtrack.com',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.aibrandtrack.com/logo-512.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://www.aibrandtrack.com/blog/${post.slug}`,
            },
            url: `https://www.aibrandtrack.com/blog/${post.slug}`,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.aibrandtrack.com' },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.aibrandtrack.com/blog' },
              { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.aibrandtrack.com/blog/${post.slug}` },
            ],
          }),
        }}
      />

      <div className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-zinc-600">
              <li>
                <Link href="/" className="hover:text-zinc-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/blog" className="hover:text-zinc-900 transition-colors">
                  Blog
                </Link>
              </li>
              <li>/</li>
              <li className="text-zinc-900 truncate max-w-[180px]" title={post.title}>
                {post.title}
              </li>
            </ol>
          </nav>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <article>
            <header className="mb-10 pb-8 border-b border-zinc-200">
              <h1 className="text-4xl lg:text-5xl font-bold text-zinc-900 mb-4 leading-tight">
                {post.title}
              </h1>
              <p className="text-xl text-zinc-600 mb-6 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                {post.author && (
                  <span className="font-medium text-zinc-700">{post.author}</span>
                )}
                <time dateTime={post.date} className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {publishDate}
                </time>
              </div>
            </header>

            <div className="prose prose-lg prose-zinc max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ node, children, ...props }) => {
                    const text = typeof children === 'string' ? children : String(children);
                    return (
                      <h2
                        id={generateHeadingId(text)}
                        className="text-3xl font-bold text-zinc-900 mt-12 mb-4 first:mt-0 scroll-mt-24"
                        {...props}
                      >
                        {children}
                      </h2>
                    );
                  },
                  h2: ({ node, children, ...props }) => {
                    const text = typeof children === 'string' ? children : String(children);
                    return (
                      <h2
                        id={generateHeadingId(text)}
                        className="text-2xl font-bold text-zinc-900 mt-10 mb-4 scroll-mt-24"
                        {...props}
                      >
                        {children}
                      </h2>
                    );
                  },
                  h3: ({ node, children, ...props }) => {
                    const text = typeof children === 'string' ? children : String(children);
                    return (
                      <h3
                        id={generateHeadingId(text)}
                        className="text-xl font-semibold text-zinc-900 mt-8 mb-3 scroll-mt-24"
                        {...props}
                      >
                        {children}
                      </h3>
                    );
                  },
                  p: ({ node, children, ...props }) => (
                    <p className="text-zinc-700 leading-relaxed mb-4" {...props}>
                      {children}
                    </p>
                  ),
                  ul: ({ node, children, ...props }) => (
                    <ul className="list-disc pl-6 mb-4 space-y-2 text-zinc-700" {...props}>
                      {children}
                    </ul>
                  ),
                  ol: ({ node, children, ...props }) => (
                    <ol className="list-decimal pl-6 mb-4 space-y-2 text-zinc-700" {...props}>
                      {children}
                    </ol>
                  ),
                  li: ({ node, children, ...props }) => (
                    <li className="leading-relaxed" {...props}>
                      {children}
                    </li>
                  ),
                  strong: ({ node, children, ...props }) => (
                    <strong className="font-semibold text-zinc-900" {...props}>
                      {children}
                    </strong>
                  ),
                  a: ({ href, children, ...props }) => (
                    <a
                      href={href}
                      className="text-zinc-900 font-medium underline hover:no-underline"
                      target={href?.startsWith('http') ? '_blank' : undefined}
                      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      {...props}
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {post.content.replace(/^\s*(---\s*)?# .*(\r?\n)+/, '')}
              </ReactMarkdown>
            </div>
          </article>

          {/* CTA */}
          <aside className="mt-16 p-8 bg-zinc-50 border border-zinc-200 rounded-xl">
            <h2 className="text-2xl font-bold text-zinc-900 mb-3">
              See how AI assistants talk about your brand
            </h2>
            <p className="text-zinc-600 mb-6">
              AI Brand Track checks ChatGPT, Claude, Perplexity and Gemini and shows your visibility
              score, competitor rankings and what to fix. Start a 14-day trial for $9 (1 full analysis plus weekly checks of 1 brand), then $39/month, cancel anytime. Not happy? Get your $9 back.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/plans?checkout=starter-monthly"
                className="inline-flex items-center justify-center rounded-[10px] text-base font-medium bg-zinc-900 text-white h-12 px-6 hover:bg-zinc-800 transition-colors"
              >
                Start for $9
              </Link>
              <Link
                href="/plans"
                className="inline-flex items-center justify-center rounded-[10px] text-base font-medium border border-zinc-300 text-zinc-900 h-12 px-6 hover:bg-zinc-100 transition-colors"
              >
                See pricing
              </Link>
            </div>
          </aside>

          {/* Related guides */}
          <nav className="mt-12" aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-xl font-bold text-zinc-900 mb-4">
              Related guides
            </h2>
            <ul className="grid sm:grid-cols-3 gap-4">
              {getPostRelated(post.slug).map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="block h-full p-4 border border-zinc-200 rounded-xl hover:border-zinc-400 transition-colors"
                  >
                    <span className="block font-semibold text-zinc-900 mb-1">{r.title}</span>
                    <span className="block text-sm text-zinc-600">{r.desc}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-16 pt-8 border-t border-zinc-200">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All blog posts
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
