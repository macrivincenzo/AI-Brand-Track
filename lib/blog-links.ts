/**
 * Internal linking between blog posts and SEO landing pages.
 * Every blog post links to the money pages, and every landing page links to
 * its supporting guides, so no page is orphaned and link equity flows both ways.
 */

export interface InternalLink {
  href: string;
  title: string;
  desc: string;
}

const L = {
  aiSearchVisibility: { href: '/ai-search-visibility', title: 'AI Search Visibility', desc: 'How to get found by ChatGPT, Perplexity and Gemini.' },
  aiRankTracker: { href: '/ai-rank-tracker', title: 'AI Rank Tracker', desc: 'Track how AI assistants rank your brand vs competitors.' },
  geo: { href: '/generative-engine-optimization', title: 'Generative Engine Optimization', desc: 'Get cited inside AI-generated answers.' },
  aeo: { href: '/answer-engine-optimization', title: 'Answer Engine Optimization', desc: 'Structure content to become the direct answer.' },
  llmSeo: { href: '/llm-seo', title: 'LLM SEO', desc: 'Make your brand legible to large language models.' },
  rankOnChatgpt: { href: '/how-to-rank-on-chatgpt', title: 'How to Rank on ChatGPT', desc: 'Tactics for the largest AI assistant.' },
  perplexitySeo: { href: '/perplexity-seo', title: 'Perplexity SEO', desc: 'Win citations in Perplexity answers.' },
} satisfies Record<string, InternalLink>;

const B = {
  trackAi: { href: '/blog/how-to-track-brand-visibility-in-ai-platforms', title: 'How to Track Brand Visibility in AI Search', desc: 'Step-by-step tracking across ChatGPT, Claude, Perplexity and Gemini.' },
  trackChatgpt: { href: '/blog/how-to-track-chatgpt-brand-mentions', title: 'How to Track Brand Mentions in ChatGPT', desc: 'Prompts, metrics and cadence for ChatGPT tracking.' },
  visibilityGuide: { href: '/blog/ai-brand-visibility-guide', title: 'What Is AI Brand Visibility?', desc: 'Definition, scoring and a quick audit checklist.' },
  aiSeo: { href: '/blog/ai-search-engine-optimization', title: 'AI Search Engine Optimization', desc: 'The playbook for ranking in AI search.' },
  getMentioned: { href: '/blog/how-to-get-your-brand-mentioned-in-chatgpt', title: 'How to Get Mentioned in ChatGPT', desc: 'Steps that make ChatGPT recommend your brand.' },
  bestTracker: { href: '/blog/ai-brand-visibility-tracker', title: 'Choosing an AI Visibility Tracker', desc: 'What to look for in an AI brand visibility tool.' },
  recommendProducts: { href: '/blog/how-ai-search-engines-recommend-products', title: 'How AI Search Engines Recommend Products', desc: 'What drives product recommendations in AI answers.' },
  howAiAnswers: { href: '/blog/how-ai-answers-questions', title: 'How AI Answers Questions', desc: 'Why some brands make it into AI answers.' },
  drift: { href: '/blog/ai-model-drift-detection', title: 'Detecting AI Model Drift', desc: 'Spot when AI recommendations about you change.' },
  impactSeo: { href: '/blog/how-do-ai-search-engines-impact-seo', title: 'How AI Search Impacts SEO', desc: 'What changes for SEO as AI answers grow.' },
  brandMonitoring: { href: '/blog/ai-brand-monitoring', title: 'AI Brand Monitoring', desc: 'Monitoring your brand inside AI assistants.' },
} satisfies Record<string, InternalLink>;

/** Supporting blog guides shown on each landing page. */
export const LANDING_GUIDES: Record<string, InternalLink[]> = {
  'ai-search-visibility': [B.trackAi, B.visibilityGuide, B.aiSeo],
  'generative-engine-optimization': [B.aiSeo, B.recommendProducts, B.visibilityGuide],
  'answer-engine-optimization': [B.aiSeo, B.howAiAnswers, B.recommendProducts],
  'llm-seo': [B.aiSeo, B.howAiAnswers, B.drift],
  'how-to-rank-on-chatgpt': [B.getMentioned, B.trackChatgpt, B.aiSeo],
  'perplexity-seo': [B.trackAi, B.aiSeo, B.recommendProducts],
  'ai-rank-tracker': [B.trackAi, B.trackChatgpt, B.bestTracker],
};

/** Related pages (landing pages first, then posts) shown under each blog post. */
const POST_RELATED: Record<string, InternalLink[]> = {
  'how-to-track-brand-visibility-in-ai-platforms': [L.aiRankTracker, B.trackChatgpt, B.visibilityGuide],
  'how-to-track-chatgpt-brand-mentions': [L.rankOnChatgpt, B.getMentioned, B.trackAi],
  'ai-brand-visibility-guide': [L.aiSearchVisibility, B.trackAi, B.aiSeo],
  'ai-search-engine-optimization': [L.geo, L.aeo, B.trackAi],
  'how-to-get-your-brand-mentioned-in-chatgpt': [L.rankOnChatgpt, B.trackChatgpt, B.aiSeo],
  'ai-brand-visibility-tracker': [L.aiRankTracker, B.trackAi, B.visibilityGuide],
  'how-ai-search-engines-recommend-products': [L.geo, B.aiSeo, B.getMentioned],
  'how-ai-answers-questions': [L.aeo, B.aiSeo, B.visibilityGuide],
  'ai-model-drift-detection': [L.aiRankTracker, B.trackAi, L.llmSeo],
  'how-do-ai-search-engines-impact-seo': [L.llmSeo, B.aiSeo, L.geo],
  'ai-brand-monitoring': [L.aiRankTracker, B.trackAi, B.visibilityGuide],
};

const DEFAULT_RELATED: InternalLink[] = [L.aiSearchVisibility, B.trackAi, B.aiSeo];

export function getPostRelated(slug: string): InternalLink[] {
  return POST_RELATED[slug] ?? DEFAULT_RELATED;
}
