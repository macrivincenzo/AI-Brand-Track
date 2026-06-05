/**
 * DEEP KEYWORD RESEARCH ENGINE — AI Brand Track
 *
 * Pulls the full keyword universe around the product's niche (AI brand
 * monitoring, GEO, AEO, LLM SEO, ChatGPT/Perplexity/Gemini visibility, AI
 * search optimization) from the DataForSEO Labs API.
 *
 * Strategy:
 *   1. keyword_suggestions/live  -> long-tail phrases CONTAINING each seed
 *   2. keyword_ideas/live        -> semantically related keywords (broad net)
 *   3. related_keywords/live     -> "searches related to" graph expansion
 *
 * Every Labs item already carries search_volume, CPC, competition, keyword
 * difficulty and search intent, so NO separate enrichment calls are needed.
 *
 * Output: keyword-research/raw-keywords.json  (one merged, deduped dataset)
 *         keyword-research/run-log.json        (cost + coverage summary)
 *
 * Run:  npx tsx scripts/keyword-research.ts
 */

import { promises as fs } from "fs";
import path from "path";

// ---------------------------------------------------------------------------
// Env loading (self-contained — reads .env directly)
// ---------------------------------------------------------------------------
async function loadEnv() {
  const envPath = path.join(process.cwd(), ".env");
  const raw = await fs.readFile(envPath, "utf8");
  const env: Record<string, string> = {};
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return env;
}

// ---------------------------------------------------------------------------
// Seed keywords — the niche, grouped so we cover the whole space
// ---------------------------------------------------------------------------
const SEEDS: string[] = [
  // Brand visibility / monitoring core
  "ai brand monitoring",
  "ai brand tracking",
  "ai brand visibility",
  "ai visibility",
  "brand visibility ai",
  "ai brand analytics",
  "ai brand reputation",
  "monitor brand in ai",
  "track brand in ai search",
  // GEO
  "generative engine optimization",
  "geo optimization",
  "generative engine optimization tools",
  "geo seo",
  // AEO / answer engine
  "answer engine optimization",
  "ai engine optimization",
  "aeo optimization",
  "answer engine optimization tools",
  // LLM SEO
  "llm seo",
  "llm optimization",
  "llm visibility",
  "llm seo tools",
  "large language model seo",
  // AI search optimization
  "ai search optimization",
  "ai search visibility",
  "ai seo",
  "ai seo tools",
  "ai seo software",
  "optimize for ai search",
  "ai content optimization",
  // ChatGPT
  "chatgpt seo",
  "chatgpt visibility",
  "rank on chatgpt",
  "brand monitoring chatgpt",
  "how to rank in chatgpt",
  "get cited by chatgpt",
  "chatgpt marketing",
  "track brand on chatgpt",
  // Perplexity
  "perplexity seo",
  "perplexity ai seo",
  "rank on perplexity",
  "perplexity visibility",
  // Google AI Overviews / Gemini / SGE
  "google ai overviews",
  "ai overviews tracking",
  "ai overview optimization",
  "rank in ai overviews",
  "google sge",
  "gemini seo",
  "google ai mode seo",
  // Mentions / citations / share of voice
  "ai mentions",
  "brand mentions ai",
  "ai citations",
  "share of voice ai",
  "ai citation tracking",
  // Rank / prompt tracking
  "ai rank tracker",
  "llm rank tracker",
  "prompt monitoring",
  "ai search rank tracking",
  "ai keyword tracking",
  // Generative / answer search general
  "generative ai search",
  "ai search engine optimization",
  "conversational search optimization",
  "answer engine",
  "ai search marketing",
];

// Core seeds get deeper pagination + related-keyword graph expansion
const CORE_SEEDS = new Set<string>([
  "ai brand monitoring",
  "ai brand visibility",
  "generative engine optimization",
  "answer engine optimization",
  "llm seo",
  "ai seo",
  "ai search optimization",
  "chatgpt seo",
  "perplexity seo",
  "google ai overviews",
  "ai mentions",
  "ai rank tracker",
]);

const LOCATION_CODE = 2840; // United States
const LANGUAGE_CODE = "en";
const BASE = "https://api.dataforseo.com/v3";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface KeywordRecord {
  keyword: string;
  search_volume: number;
  cpc: number | null;
  competition: number | null; // 0-1
  competition_level: string | null;
  keyword_difficulty: number | null; // 0-100
  main_intent: string | null;
  foreign_intents: string[];
  sources: string[]; // which endpoint(s) found it
  seeds: string[]; // which seed(s) surfaced it
}

let API_CALLS = 0;
let RESULTS_RETURNED = 0;

// ---------------------------------------------------------------------------
// Low-level POST with retry
// ---------------------------------------------------------------------------
async function dfsPost(authHeader: string, endpoint: string, body: unknown[]): Promise<any> {
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(`${BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: authHeader },
        body: JSON.stringify(body),
      });
      API_CALLS++;
      const json = await res.json();
      if (!res.ok || json.status_code >= 40000) {
        const msg = json.status_message || `${res.status} ${res.statusText}`;
        if (attempt < 4 && (res.status === 429 || res.status >= 500)) {
          await sleep(1500 * attempt);
          continue;
        }
        throw new Error(`DataForSEO ${endpoint}: ${msg}`);
      }
      return json;
    } catch (err) {
      if (attempt === 4) throw err;
      await sleep(1500 * attempt);
    }
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ---------------------------------------------------------------------------
// Normalizers (Labs items share keyword_info / keyword_properties / intent)
// ---------------------------------------------------------------------------
function pushItem(
  map: Map<string, KeywordRecord>,
  rawKeyword: string,
  info: any,
  props: any,
  intent: any,
  source: string,
  seed: string
) {
  const keyword = (rawKeyword || "").trim().toLowerCase();
  if (!keyword || keyword.length < 3) return;
  RESULTS_RETURNED++;

  const existing = map.get(keyword);
  const rec: KeywordRecord = existing || {
    keyword,
    search_volume: 0,
    cpc: null,
    competition: null,
    competition_level: null,
    keyword_difficulty: null,
    main_intent: null,
    foreign_intents: [],
    sources: [],
    seeds: [],
  };

  if (info) {
    rec.search_volume = Math.max(rec.search_volume, info.search_volume || 0);
    if (info.cpc != null) rec.cpc = info.cpc;
    if (info.competition != null) rec.competition = info.competition;
    if (info.competition_level) rec.competition_level = info.competition_level;
  }
  if (props && props.keyword_difficulty != null) {
    rec.keyword_difficulty = props.keyword_difficulty;
  }
  if (intent) {
    if (intent.main_intent) rec.main_intent = intent.main_intent;
    if (Array.isArray(intent.foreign_intent)) {
      for (const fi of intent.foreign_intent) {
        if (fi && !rec.foreign_intents.includes(fi)) rec.foreign_intents.push(fi);
      }
    }
  }
  if (!rec.sources.includes(source)) rec.sources.push(source);
  if (!rec.seeds.includes(seed)) rec.seeds.push(seed);

  map.set(keyword, rec);
}

// ---------------------------------------------------------------------------
// Endpoint wrappers
// ---------------------------------------------------------------------------
async function keywordSuggestions(
  auth: string,
  map: Map<string, KeywordRecord>,
  seed: string,
  pages: number
) {
  for (let page = 0; page < pages; page++) {
    const body = [
      {
        keyword: seed,
        location_code: LOCATION_CODE,
        language_code: LANGUAGE_CODE,
        include_serp_info: false,
        include_seed_keyword: true,
        limit: 1000,
        offset: page * 1000,
        order_by: ["keyword_info.search_volume,desc"],
      },
    ];
    const json = await dfsPost(auth, "/dataforseo_labs/google/keyword_suggestions/live", body);
    const result = json.tasks?.[0]?.result?.[0];
    const items = result?.items || [];
    for (const it of items) {
      pushItem(map, it.keyword, it.keyword_info, it.keyword_properties, it.search_intent_info, "suggestion", seed);
    }
    process.stdout.write(`  suggestions "${seed}" p${page}: +${items.length}\n`);
    if (items.length < 1000) break; // no more pages
  }
}

async function keywordIdeas(auth: string, map: Map<string, KeywordRecord>, seedGroup: string[]) {
  const body = [
    {
      keywords: seedGroup,
      location_code: LOCATION_CODE,
      language_code: LANGUAGE_CODE,
      limit: 1000,
      order_by: ["keyword_info.search_volume,desc"],
    },
  ];
  const json = await dfsPost(auth, "/dataforseo_labs/google/keyword_ideas/live", body);
  const items = json.tasks?.[0]?.result?.[0]?.items || [];
  for (const it of items) {
    pushItem(
      map,
      it.keyword,
      it.keyword_info,
      it.keyword_properties,
      it.search_intent_info,
      "idea",
      seedGroup.join(" | ")
    );
  }
  process.stdout.write(`  ideas [${seedGroup.length} seeds]: +${items.length}\n`);
}

async function relatedKeywords(auth: string, map: Map<string, KeywordRecord>, seed: string) {
  const body = [
    {
      keyword: seed,
      location_code: LOCATION_CODE,
      language_code: LANGUAGE_CODE,
      depth: 3,
      include_seed_keyword: true,
      limit: 1000,
    },
  ];
  const json = await dfsPost(auth, "/dataforseo_labs/google/related_keywords/live", body);
  const items = json.tasks?.[0]?.result?.[0]?.items || [];
  for (const it of items) {
    const kd = it.keyword_data;
    if (!kd) continue;
    pushItem(
      map,
      kd.keyword,
      kd.keyword_info,
      kd.keyword_properties,
      kd.search_intent_info,
      "related",
      seed
    );
  }
  process.stdout.write(`  related "${seed}": +${items.length}\n`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const env = await loadEnv();
  const login = env.DATAFORSEO_LOGIN;
  const password = env.DATAFORSEO_PASSWORD;
  if (!login || !password) throw new Error("Missing DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD in .env");
  const auth = "Basic " + Buffer.from(`${login}:${password}`).toString("base64");

  const outDir = path.join(process.cwd(), "keyword-research");
  await fs.mkdir(outDir, { recursive: true });

  const map = new Map<string, KeywordRecord>();
  const started = Date.now();

  console.log(`\n=== DEEP KEYWORD RESEARCH — ${SEEDS.length} seeds ===\n`);

  // 1) keyword_suggestions for every seed (long-tail, contains seed)
  console.log("[1/3] keyword_suggestions (long-tail)...");
  for (const seed of SEEDS) {
    try {
      await keywordSuggestions(auth, map, seed, CORE_SEEDS.has(seed) ? 2 : 1);
    } catch (e) {
      console.warn(`  ! suggestions failed for "${seed}": ${(e as Error).message}`);
    }
  }

  // 2) keyword_ideas in seed groups of 20 (semantically related, broad)
  console.log("\n[2/3] keyword_ideas (semantic expansion)...");
  for (let i = 0; i < SEEDS.length; i += 20) {
    const group = SEEDS.slice(i, i + 20);
    try {
      await keywordIdeas(auth, map, group);
    } catch (e) {
      console.warn(`  ! ideas failed for group ${i}: ${(e as Error).message}`);
    }
  }

  // 3) related_keywords graph expansion for core seeds
  console.log("\n[3/3] related_keywords (graph expansion, core seeds)...");
  for (const seed of CORE_SEEDS) {
    try {
      await relatedKeywords(auth, map, seed);
    } catch (e) {
      console.warn(`  ! related failed for "${seed}": ${(e as Error).message}`);
    }
  }

  const records = Array.from(map.values()).sort((a, b) => b.search_volume - a.search_volume);

  await fs.writeFile(path.join(outDir, "raw-keywords.json"), JSON.stringify(records, null, 2));

  const withVolume = records.filter((r) => r.search_volume > 0);
  const log = {
    generated_at: new Date().toISOString(),
    location_code: LOCATION_CODE,
    language_code: LANGUAGE_CODE,
    seeds: SEEDS.length,
    core_seeds: CORE_SEEDS.size,
    api_calls: API_CALLS,
    results_returned_raw: RESULTS_RETURNED,
    unique_keywords: records.length,
    keywords_with_search_volume: withVolume.length,
    total_monthly_search_volume: withVolume.reduce((s, r) => s + r.search_volume, 0),
    duration_seconds: Math.round((Date.now() - started) / 1000),
  };
  await fs.writeFile(path.join(outDir, "run-log.json"), JSON.stringify(log, null, 2));

  console.log("\n=== DONE ===");
  console.table(log);
  console.log(`\nRaw dataset: keyword-research/raw-keywords.json (${records.length} unique keywords)`);
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
