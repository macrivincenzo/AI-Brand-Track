import { getPosts } from '@/lib/blog-posts'

export const dynamic = 'force-static'

const SITE = 'https://www.aibrandtrack.com'

// llms.txt (https://llmstxt.org): a markdown map of the site for AI assistants.
// Generated so new blog posts are listed automatically.
export async function GET() {
  const posts = await getPosts()

  const body = `# AI Brand Track

> AI Brand Track monitors how ChatGPT, Claude, Perplexity and Google Gemini mention, rank and describe your brand compared with competitors, and gives recommendations for AI search optimization (GEO/AEO).

- Starter trial: 14 days for $9 (card required), includes 1 full analysis across ChatGPT, Claude, Perplexity and Gemini, automatic weekly checks of 1 brand with a weekly email, and Boost actions (done-for-you fixes) using the remaining trial credits, then $39/month unless cancelled. Trial guarantee: not happy during your 14 days? We refund your $9 (one per customer, via support@aibrandtrack.com; the monthly subscription is not covered). Start at ${SITE}/plans
- Pay-as-you-go: Single Analysis $49 (53 credits), Credit Pack $149 (220 credits). Credits never expire.
- Subscriptions: Starter $39/month (53 credits), Pro $69/month (154 credits). Enterprise: custom pricing.
- One complete brand analysis uses 11 credits (1 for website extraction, 10 for scanning ChatGPT, Claude, Perplexity and Gemini). Competitor scraping costs 0 credits.

## Product
- [Home](${SITE}/): Overview, features, reviews and FAQ
- [Pricing](${SITE}/plans): Plans and credit packs
- [AI Visibility Checker](${SITE}/ai-visibility-checker): Check how ChatGPT, Claude, Perplexity and Gemini see your brand
- [AI Rank Tracker](${SITE}/ai-rank-tracker): Track brand rankings across AI assistants
- [AI Search Visibility](${SITE}/ai-search-visibility): How to get found by ChatGPT, Perplexity and Gemini
- [About](${SITE}/about): Company background

## Guides
- [Generative Engine Optimization (GEO)](${SITE}/generative-engine-optimization)
- [Answer Engine Optimization (AEO)](${SITE}/answer-engine-optimization)
- [LLM SEO](${SITE}/llm-seo)
- [How to rank on ChatGPT](${SITE}/how-to-rank-on-chatgpt)
- [Perplexity SEO](${SITE}/perplexity-seo)

## Blog
${posts.map((post) => `- [${post.title}](${SITE}/blog/${post.slug})${post.excerpt ? `: ${post.excerpt.replace(/\s+/g, ' ').trim()}` : ''}`).join('\n')}

## Optional
- [Privacy policy](${SITE}/privacy-policy)
- [Terms of service](${SITE}/terms-of-service)
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
