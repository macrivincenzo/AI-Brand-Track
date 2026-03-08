import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import fs from 'fs/promises';
import path from 'path';
import { getBatchDataForSEOMetrics, DataForSEOResult } from '../lib/dataforseo-utils';
import { generateContentForAction } from '../lib/content-generator';
import { ActionItem } from '../lib/strategic-insights';
import { CompetitorRanking } from '../lib/types';

const BRAND_NAME = 'AI Brand Track';
const BRAND_URL = 'https://www.aibrandtrack.com';

const SEED_KEYWORDS = [
  'ai brand visibility',
  'chatgpt brand tracking',
  'perplexity brand monitoring',
  'generative engine optimization',
  'AI brand monitoring',
  'brand visibility in AI search',
  'optimize for AI search',
];

const MIN_SEARCH_VOLUME = 500;
const MAX_DIFFICULTY = 55;

const USED_KEYWORDS_FILE = path.join(process.cwd(), 'content', 'posts', '.used-keywords.json');
const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

const brandData: CompetitorRanking = {
  name: BRAND_NAME,
  visibilityScore: 60,
  sentimentScore: 70,
  mentions: 0,
  averagePosition: 0,
  shareOfVoice: 0,
  isOwn: true,
};

const competitors: CompetitorRanking[] = [];

// ─── Keyword rotation ────────────────────────────────────────────────────────

async function loadUsedKeywords(): Promise<string[]> {
  try {
    const raw = await fs.readFile(USED_KEYWORDS_FILE, 'utf-8');
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

async function saveUsedKeyword(keyword: string): Promise<void> {
  const used = await loadUsedKeywords();
  if (!used.includes(keyword)) {
    used.push(keyword);
    await fs.mkdir(POSTS_DIR, { recursive: true });
    await fs.writeFile(USED_KEYWORDS_FILE, JSON.stringify(used, null, 2), 'utf-8');
  }
}

// ─── Duplicate detection ─────────────────────────────────────────────────────

async function postExistsForKeyword(keyword: string): Promise<boolean> {
  try {
    const files = await fs.readdir(POSTS_DIR);
    const keywordSlug = slugify(keyword);
    return files.some((f) => f !== '.used-keywords.json' && f.includes(keywordSlug));
  } catch {
    return false;
  }
}

// ─── Scoring ─────────────────────────────────────────────────────────────────

function scoreKeyword(r: DataForSEOResult): number {
  if (!r.metrics) return -Infinity;
  const { searchVolume, keywordDifficulty } = r.metrics;
  if (searchVolume < MIN_SEARCH_VOLUME) return -Infinity;
  // Only filter by difficulty if the API actually returned it (non-zero)
  if (keywordDifficulty > 0 && keywordDifficulty > MAX_DIFFICULTY) return -Infinity;
  return searchVolume - keywordDifficulty * 50;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function run() {
  // Fail fast if credentials are missing
  if (!process.env.DATAFORSEO_LOGIN || !process.env.DATAFORSEO_PASSWORD) {
    console.error('❌ DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD must be set in .env');
    process.exit(1);
  }

  const usedKeywords = await loadUsedKeywords();

  // Filter out already-used keywords so we rotate topics each week
  const freshKeywords = SEED_KEYWORDS.filter((k) => !usedKeywords.includes(k));

  if (freshKeywords.length === 0) {
    console.log('♻️  All seed keywords have been used. Resetting rotation.');
    await fs.writeFile(USED_KEYWORDS_FILE, JSON.stringify([], null, 2), 'utf-8');
    // Re-run after reset would pick from the full list — exit gracefully here
    // so the operator can re-trigger; avoids an infinite loop risk.
    console.log('   Run the agent again to start fresh with the seed list.');
    return;
  }

  console.log(`📡 Fetching keyword metrics (${freshKeywords.length} fresh keywords)...`);
  const results = await getBatchDataForSEOMetrics(freshKeywords);

  const sorted = results.slice().sort((a, b) => scoreKeyword(b) - scoreKeyword(a));
  const best = sorted[0];

  if (!best || !best.metrics || scoreKeyword(best) === -Infinity) {
    console.error('❌ No suitable keyword found. Check thresholds or seed keywords.');
    console.table(results.map((r) => ({ keyword: r.keyword, ...r.metrics, error: r.error })));
    return;
  }

  const mainKeyword = best.keyword;
  console.log(`✅ Selected keyword: "${mainKeyword}"`, best.metrics);

  // Skip if a post for this keyword already exists on disk
  if (await postExistsForKeyword(mainKeyword)) {
    console.log(`⏭️  A post for "${mainKeyword}" already exists. Marking as used and exiting.`);
    await saveUsedKeyword(mainKeyword);
    return;
  }

  const action: ActionItem = {
    id: `blog-${Date.now()}`,
    priority: 'high',
    category: 'content',
    title: `Create Comprehensive Blog Post About ${mainKeyword}`,
    description: `Write a deep, practical blog post for ${BRAND_NAME} about "${mainKeyword}". Use real search intent and explain how AI brand tracking and GEO relate to this topic.`,
    impact: `High-value keyword with ${best.metrics.searchVolume} monthly searches and ${best.metrics.keywordDifficulty} difficulty score.`,
    effort: 'medium',
  };

  console.log('✍️  Generating blog post...');
  const generated = await generateContentForAction({
    action,
    brandName: BRAND_NAME,
    brandData,
    competitors,
    brandUrl: BRAND_URL,
    seoData: {
      keywords: [
        {
          keyword: mainKeyword,
          searchVolume: best.metrics.searchVolume,
          difficulty: best.metrics.keywordDifficulty,
        },
      ],
    },
  });

  const blog = generated.find((g) => g.type === 'blog');
  if (!blog) {
    console.error('❌ No blog content returned from generator.');
    return;
  }

  // Validate word count before saving
  if (!blog.content || blog.wordCount < 300) {
    console.error(
      `❌ Generated content is too short (${blog.wordCount} words). Minimum is 300. Aborting.`
    );
    return;
  }

  const today = new Date().toISOString().split('T')[0];
  const slug = slugify(mainKeyword);

  const output = {
    slug,
    title: blog.title,
    excerpt: blog.metaDescription ?? blog.content.slice(0, 220),
    date: today,
    keywords: [mainKeyword, ...(blog.keywords ?? [])],
    author: `${BRAND_NAME} Team`,
    content: blog.content,
  };

  await fs.mkdir(POSTS_DIR, { recursive: true });
  const filePath = path.join(POSTS_DIR, `${slug}.json`);
  await fs.writeFile(filePath, JSON.stringify(output, null, 2), 'utf-8');

  // Mark keyword as used so next week picks a different one
  await saveUsedKeyword(mainKeyword);

  console.log(`✅ Blog post saved to: ${filePath}`);
  console.log(`   Title    : ${blog.title}`);
  console.log(`   Words    : ${blog.wordCount}`);
  console.log(`   Slug     : ${slug}`);
  console.log(`   Keywords : ${output.keywords.join(', ')}`);
}

run().catch((err) => {
  console.error('Agent failed:', err);
  process.exit(1);
});
