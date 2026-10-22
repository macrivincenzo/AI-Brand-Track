import { MetadataRoute } from 'next'
import { getPosts } from '@/lib/blog-posts'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.aibrandtrack.com'
  const posts = await getPosts()
  const blogPostUrls = posts.map((post) => {
    const date = new Date(post.date)
    const lastModified = Number.isNaN(date.getTime()) ? new Date() : date
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    }
  })

  return [
    {
      url: baseUrl,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/plans`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ai-search-visibility`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...[
      'generative-engine-optimization',
      'answer-engine-optimization',
      'llm-seo',
      'how-to-rank-on-chatgpt',
      'perplexity-seo',
      'ai-rank-tracker',
    ].map((slug) => ({
      url: `${baseUrl}/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
    {
      url: `${baseUrl}/blog`,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...blogPostUrls,
    {
      url: `${baseUrl}/privacy-policy`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}

