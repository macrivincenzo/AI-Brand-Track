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
  geoVsSeo: { href: '/blog/geo-vs-seo-vs-aeo', title: 'GEO vs SEO vs AEO', desc: 'How the three disciplines differ and overlap.' },
  bestVisibilityTools: { href: '/blog/best-ai-visibility-tools', title: 'Best AI Visibility Tools', desc: '10 AI visibility platforms compared.' },
  bestAeoGeoTools: { href: '/blog/best-aeo-geo-tools', title: 'Best AEO & GEO Tools', desc: 'The optimization toolkit, by category.' },
  aiOverviews: { href: '/blog/how-to-rank-in-google-ai-overviews', title: 'How to Rank in Google AI Overviews', desc: 'Get cited in Google AI Overviews and AI Mode.' },
  chatgptSources: { href: '/blog/where-does-chatgpt-get-its-information', title: 'Where Does ChatGPT Get Its Information?', desc: 'Training data, live search and citations.' },
  sameAnswer: { href: '/blog/does-chatgpt-give-the-same-answer-to-everyone', title: 'Does ChatGPT Give Everyone the Same Answer?', desc: 'Why answers vary, and what it means for brands.' },
  shareOfVoice: { href: '/blog/ai-share-of-voice', title: 'AI Share of Voice', desc: 'How to calculate and improve it.' },
  brandMonitoring: { href: '/blog/ai-brand-monitoring', title: 'AI Brand Monitoring', desc: 'Monitoring your brand inside AI assistants.' },
  toolPricing: { href: '/blog/ai-visibility-tool-pricing', title: 'AI Visibility Tool Pricing', desc: 'Every plan, limit and hidden cost compared.' },
  profoundAlternatives: { href: '/blog/profound-alternatives', title: 'Profound Alternatives', desc: '10 tools with published prices.' },
  peecAlternatives: { href: '/blog/peec-ai-alternatives', title: 'Peec AI Alternatives', desc: '10 tools compared on price and engines.' },
} satisfies Record<string, InternalLink>;

/** Supporting blog guides shown on each landing page. */
export const LANDING_GUIDES: Record<string, InternalLink[]> = {
  'ai-search-visibility': [B.trackAi, B.bestVisibilityTools, B.aiOverviews],
  'generative-engine-optimization': [B.geoVsSeo, B.bestAeoGeoTools, B.aiOverviews],
  'answer-engine-optimization': [B.geoVsSeo, B.bestAeoGeoTools, B.aiOverviews],
  'llm-seo': [B.geoVsSeo, B.aiSeo, B.howAiAnswers],
  'how-to-rank-on-chatgpt': [B.getMentioned, B.chatgptSources, B.trackChatgpt],
  'perplexity-seo': [B.trackAi, B.aiSeo, B.recommendProducts],
  'ai-rank-tracker': [B.bestVisibilityTools, B.toolPricing, B.shareOfVoice],
  'ai-visibility-checker': [B.visibilityGuide, B.bestVisibilityTools, B.toolPricing],
};

/** Related pages (landing pages first, then posts) shown under each blog post. */
const POST_RELATED: Record<string, InternalLink[]> = {
  'how-to-track-brand-visibility-in-ai-platforms': [L.aiRankTracker, B.bestVisibilityTools, B.shareOfVoice],
  'how-to-track-chatgpt-brand-mentions': [L.rankOnChatgpt, B.chatgptSources, B.sameAnswer],
  'ai-brand-visibility-guide': [L.aiSearchVisibility, B.trackAi, B.aiSeo],
  'ai-search-engine-optimization': [B.geoVsSeo, L.geo, L.aeo],
  'geo-vs-seo-vs-aeo': [L.geo, L.aeo, B.bestAeoGeoTools],
  'best-ai-visibility-tools': [L.aiRankTracker, B.shareOfVoice, B.trackAi],
  'best-aeo-geo-tools': [B.bestVisibilityTools, B.geoVsSeo, L.aeo],
  'how-to-rank-in-google-ai-overviews': [B.geoVsSeo, B.aiSeo, L.aeo],
  'where-does-chatgpt-get-its-information': [B.sameAnswer, L.rankOnChatgpt, B.trackChatgpt],
  'does-chatgpt-give-the-same-answer-to-everyone': [B.chatgptSources, B.trackChatgpt, B.shareOfVoice],
  'ai-share-of-voice': [L.aiRankTracker, B.bestVisibilityTools, B.trackAi],
  'how-to-get-your-brand-mentioned-in-chatgpt': [L.rankOnChatgpt, B.trackChatgpt, B.aiSeo],
  'ai-brand-visibility-tracker': [B.bestVisibilityTools, L.aiRankTracker, B.trackAi],
  'how-ai-search-engines-recommend-products': [L.geo, B.aiSeo, B.getMentioned],
  'how-ai-answers-questions': [L.aeo, B.aiSeo, B.visibilityGuide],
  'ai-model-drift-detection': [L.aiRankTracker, B.trackAi, L.llmSeo],
  'how-do-ai-search-engines-impact-seo': [B.geoVsSeo, L.llmSeo, B.aiSeo],
  'ai-brand-monitoring': [L.aiRankTracker, B.trackAi, B.visibilityGuide],
  'ai-visibility-tool-pricing': [L.aiRankTracker, B.bestVisibilityTools, B.profoundAlternatives],
  'profound-alternatives': [B.toolPricing, B.peecAlternatives, B.bestVisibilityTools],
  'peec-ai-alternatives': [B.toolPricing, B.profoundAlternatives, B.bestVisibilityTools],
};

const DEFAULT_RELATED: InternalLink[] = [L.aiSearchVisibility, B.trackAi, B.aiSeo];

export function getPostRelated(slug: string): InternalLink[] {
  return POST_RELATED[slug] ?? DEFAULT_RELATED;
}
