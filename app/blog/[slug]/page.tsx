import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getAllSlugs } from '@/lib/blog-posts';
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
  return {
    title: post.title,
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
            author: {
              '@type': 'Organization',
              name: post.author ?? 'AI Brand Track Team',
            },
            publisher: {
              '@type': 'Organization',
              name: 'AI Brand Track',
              url: 'https://www.aibrandtrack.com',
            },
            url: `https://www.aibrandtrack.com/blog/${post.slug}`,
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
                  h1: ({ children, ...props }) => {
                    const text = typeof children === 'string' ? children : String(children);
                    return (
                      <h1
                        id={generateHeadingId(text)}
                        className="text-3xl font-bold text-zinc-900 mt-12 mb-4 first:mt-0 scroll-mt-24"
                        {...props}
                      >
                        {children}
                      </h1>
                    );
                  },
                  h2: ({ children, ...props }) => {
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
                  h3: ({ children, ...props }) => {
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
                  p: ({ children, ...props }) => (
                    <p className="text-zinc-700 leading-relaxed mb-4" {...props}>
                      {children}
                    </p>
                  ),
                  ul: ({ children, ...props }) => (
                    <ul className="list-disc pl-6 mb-4 space-y-2 text-zinc-700" {...props}>
                      {children}
                    </ul>
                  ),
                  ol: ({ children, ...props }) => (
                    <ol className="list-decimal pl-6 mb-4 space-y-2 text-zinc-700" {...props}>
                      {children}
                    </ol>
                  ),
                  li: ({ children, ...props }) => (
                    <li className="leading-relaxed" {...props}>
                      {children}
                    </li>
                  ),
                  strong: ({ children, ...props }) => (
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
                {post.content}
              </ReactMarkdown>
            </div>
          </article>

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
