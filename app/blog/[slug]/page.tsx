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

      <div className="abt-page min-h-screen">
        <div className="mx-auto max-w-[760px] px-4 pb-24 pt-12 sm:px-6 sm:pt-16">
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[16px] text-abt-ink-2">
              <li>
                <Link href="/" className="underline-offset-4 hover:text-abt-ink hover:underline">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/blog" className="underline-offset-4 hover:text-abt-ink hover:underline">
                  Blog
                </Link>
              </li>
              <li>/</li>
              <li className="max-w-[180px] truncate text-abt-ink" title={post.title}>
                {post.title}
              </li>
            </ol>
          </nav>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[16px] font-medium text-abt-ink-2 mb-8 transition-colors hover:text-abt-ink"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <article>
            <header className="mb-10 pb-8 border-b border-abt-divider">
              <h1 className="font-abt-serif text-[length:clamp(38px,6cqi,56px)] font-semibold leading-[1.08] tracking-[-0.025em] text-abt-ink mb-5">
                {post.title}
              </h1>
              <p className="text-[length:var(--abt-text-lead)] leading-[1.4] text-abt-ink-2 mb-6">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-[16px] text-abt-ink-2">
                {post.author && (
                  <span className="font-medium text-zinc-700">{post.author}</span>
                )}
                <time dateTime={post.date} className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {publishDate}
                </time>
              </div>
            </header>

            <div className="max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ node, children, ...props }) => {
                    const text = typeof children === 'string' ? children : String(children);
                    return (
                      <h2
                        id={generateHeadingId(text)}
                        className="font-abt-serif text-[length:clamp(26px,3.4cqi,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink mt-12 mb-4 first:mt-0 scroll-mt-24"
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
                        className="font-abt-serif text-[length:clamp(26px,3.4cqi,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink mt-10 mb-4 scroll-mt-24"
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
                        className="text-[21px] font-bold leading-[1.3] text-abt-ink mt-8 mb-3 scroll-mt-24"
                        {...props}
                      >
                        {children}
                      </h3>
                    );
                  },
                  p: ({ node, children, ...props }) => (
                    <p className="text-[19px] leading-[1.7] text-abt-ink-2 mb-5" {...props}>
                      {children}
                    </p>
                  ),
                  ul: ({ node, children, ...props }) => (
                    <ul className="list-disc pl-6 mb-5 space-y-2 text-[19px] leading-[1.6] text-abt-ink-2 marker:text-abt-accent" {...props}>
                      {children}
                    </ul>
                  ),
                  ol: ({ node, children, ...props }) => (
                    <ol className="list-decimal pl-6 mb-5 space-y-2 text-[19px] leading-[1.6] text-abt-ink-2 marker:text-abt-accent" {...props}>
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
                      className="font-medium text-abt-ink underline underline-offset-4 hover:text-abt-accent"
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
          <aside className="mt-16 rounded-abt-card border border-abt-line bg-abt-surface p-8">
            <h2 className="font-abt-serif text-[length:clamp(26px,3.4cqi,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink mb-3">
              See how AI assistants talk about your brand
            </h2>
            <p className="text-[18px] text-abt-ink-2 mb-6">
              AI Brand Track checks ChatGPT, Claude, Perplexity and Gemini and shows your visibility
              score, competitor rankings and what to fix. Start a 14-day trial for $9 (1 full analysis plus weekly checks of 1 brand), then $39/month, cancel anytime. Not happy? Get your $9 back.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/plans?checkout=starter-monthly"
                className="inline-flex h-14 items-center justify-center rounded-abt-button bg-abt-accent px-7 text-[18px] font-semibold text-abt-on-accent transition-colors hover:bg-[color-mix(in_oklch,var(--abt-accent)_86%,black)]"
              >
                Start for $9
              </Link>
              <Link
                href="/plans"
                className="inline-flex h-14 items-center justify-center rounded-abt-button border border-abt-line-strong bg-abt-surface px-7 text-[18px] font-semibold text-abt-ink transition-colors hover:bg-abt-sunk"
              >
                See pricing
              </Link>
            </div>
          </aside>

          {/* Related guides */}
          <nav className="mt-12" aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-[21px] font-bold text-abt-ink mb-4">
              Related guides
            </h2>
            <ul className="grid sm:grid-cols-3 gap-4">
              {getPostRelated(post.slug).map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="block h-full rounded-abt-tile border border-abt-line bg-abt-surface p-5 transition-colors hover:border-abt-accent"
                  >
                    <span className="block font-semibold text-abt-ink mb-1">{r.title}</span>
                    <span className="block text-[16px] text-abt-ink-2">{r.desc}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-16 pt-8 border-t border-abt-divider">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[16px] font-medium text-abt-ink-2 transition-colors hover:text-abt-ink"
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
