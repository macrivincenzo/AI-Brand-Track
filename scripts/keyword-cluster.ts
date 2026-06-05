/**
 * KEYWORD CLUSTERING + LANDING-PAGE BLUEPRINT — AI Brand Track
 *
 * Reads keyword-research/raw-keywords.json (produced by keyword-research.ts)
 * and turns it into an actionable programmatic-SEO plan.
 *
 * Two classification dimensions:
 *   topic  -> the subject (GEO, AEO, ChatGPT, Perplexity, Gemini, LLM SEO,
 *             brand monitoring, citations/SoV, rank tracking, AI search...)
 *   format -> the page archetype implied by modifiers + search intent
 *             (definition / how-to / comparison / tool / segment / commercial
 *             / informational)
 *
 * A landing page = one (topic × format) cell. The highest-volume keyword in
 * the cell is the primary target; the rest become supporting keywords.
 *
 * Outputs (all under keyword-research/):
 *   master-keywords.csv        every keyword, enriched + tagged
 *   keyword-clusters.md        topic clusters with metrics
 *   landing-page-blueprint.md  prioritised list of pages to build
 *   page-blueprint.json        machine-readable page specs
 *   SUMMARY.md                 executive summary + quick wins
 *
 * Run (free, no API):  npx tsx scripts/keyword-cluster.ts
 */

import { promises as fs } from "fs";
import path from "path";

interface KeywordRecord {
  keyword: string;
  search_volume: number;
  cpc: number | null;
  competition: number | null;
  competition_level: string | null;
  keyword_difficulty: number | null;
  main_intent: string | null;
  foreign_intents: string[];
  sources: string[];
  seeds: string[];
}

type Tagged = KeywordRecord & {
  topic: string;
  format: string;
  opportunity: number; // volume weighted by inverse difficulty
  relevant: boolean; // passes the niche relevance gate
};

// ---------------------------------------------------------------------------
// Topic rules — first match wins. Order = priority.
// Platform-specific topics rank high (they make excellent dedicated pages).
// ---------------------------------------------------------------------------
const TOPIC_RULES: { topic: string; re: RegExp }[] = [
  { topic: "ChatGPT Visibility", re: /\bchat\s?gpt\b|\bgpt-?\d|\bopenai\b/ },
  { topic: "Perplexity Visibility", re: /\bperplexity\b/ },
  { topic: "Google AI Overviews / Gemini / AI Mode", re: /\bai overview|\bsge\b|\bgemini\b|google ai mode|search generative|google ai search/ },
  { topic: "Claude Visibility", re: /\bclaude\b|anthropic/ },
  { topic: "Generative Engine Optimization (GEO)", re: /\bgeo\b|generative engine optimi|generative search optimi/ },
  { topic: "Answer Engine Optimization (AEO)", re: /\baeo\b|answer engine optimi|ai engine optimi|answer engine\b/ },
  { topic: "LLM SEO / Optimization", re: /\bllm\b|large language model|language model optimi/ },
  { topic: "AI Mentions / Citations / Share of Voice", re: /mention|citation|cited|share of voice|sov\b/ },
  { topic: "AI Rank / Prompt Tracking", re: /rank track|rank check|prompt track|prompt monitor|keyword track|position track/ },
  { topic: "AI Brand Monitoring / Visibility", re: /brand (monitor|track|visib|reputation|analytic|audit)|brand in ai|ai brand|visibility (tool|track|monitor|score|audit)/ },
  { topic: "AI SEO Tools & Agencies", re: /\bai\b[\s-]?\w*\s?seo|\bseo\b\s?\w*\s?\bai\b|ai[\s-]powered seo|ai\s\w*\s?marketing|marketing\s\w*\s?ai|seo (ai )?(agent|automation|copilot)|\bai\b.{0,8}\b(agenc|agent)/ },
  { topic: "AI Search Optimization (general)", re: /ai search|ai seo|search engine optimi|optimi[sz]e for ai|generative ai|answer engine|conversational search|ai content optimi|search everywhere/ },
];

function classifyTopic(k: string): string {
  for (const r of TOPIC_RULES) if (r.re.test(k)) return r.topic;
  return "Other / Adjacent";
}

// ---------------------------------------------------------------------------
// Format rules — page archetype. Order = priority.
// ---------------------------------------------------------------------------
function classifyFormat(k: string, intent: string | null): string {
  if (/\b(what is|what are|what's|meaning|definition|defined|explained|explain)\b/.test(k)) return "Definition / What-is";
  if (/\b(how to|how do|how can|guide|tutorial|steps|ways to|tips|strategy|strategies|checklist|framework|best practices)\b/.test(k)) return "How-to / Guide";
  if (/\b(vs|versus|alternative|alternatives|comparison|compare|review|reviews)\b/.test(k)) return "Comparison / Alternatives";
  if (/\b(best|top \d+|top ten|leading)\b/.test(k)) return "Best-of / Listicle";
  if (/\b(tool|tools|software|platform|app|apps|tracker|checker|monitor|dashboard|api|free|online|generator)\b/.test(k)) return "Tool / Software";
  if (/\b(agency|agencies|enterprise|saas|ecommerce|e-commerce|b2b|b2c|startup|startups|for (agencies|brands|business|businesses|marketers|seo|ecommerce|saas)|consultant|consulting|services|service)\b/.test(k)) return "Segment / Service";
  if (/\b(pricing|cost|price|cheap|free)\b/.test(k)) return "Pricing / Commercial";
  if (intent === "transactional" || intent === "commercial") return "Commercial";
  return "Informational";
}

// ---------------------------------------------------------------------------
// Relevance engine — keep only keywords that belong to AI Brand Track's niche
// (optimising / tracking / monitoring brand presence in AI & answer engines).
// keyword_ideas casts a wide net into the whole "AI tools" space, so we gate.
// ---------------------------------------------------------------------------

// An AI / engine surface
const AI_TOKEN =
  /\b(ai|a\.i\.|llm|llms|genai|gen ai|generative|chatgpt|chat gpt|gpt|openai|perplexity|gemini|google ai|claude|copilot|grok|deepseek|sge|ai overview|ai overviews|ai mode|answer engine|conversational (ai|search)|generative (ai|engine|search)|ai search)\b/;

// A visibility / SEO / marketing action
const INTENT_TOKEN =
  /\b(seo|geo|aeo|gso|optimi|visib|monitor|track|tracker|rank|cite|citation|cited|mention|share of voice|\bsov\b|presence|audit|analytic|strateg|marketing|appear|show up|discoverab|recommended|prompt (track|monitor|analy)|brand|reputation)\b/;

// Always-relevant core niche phrases
const CORE_TOKEN =
  /\b(generative engine optimi|answer engine optimi|ai engine optimi|geo (seo|optimi|tool|strateg|agenc|service|rank|checker|guide)|aeo (seo|optimi|tool|strateg|agenc|service|guide)|llm seo|llm optimi|llm visib|ai seo|ai search optimi|ai visib|ai brand|brand visib|share of voice|ai citation|ai mention|ai overview|chatgpt seo|perplexity seo|gemini seo|llm rank|ai rank track|prompt (monitor|track))\b/;

// Clearly off-topic generic-AI / tooling noise. Stems are intentionally NOT
// trailing-boundary-anchored (so "humaniz" also catches "humanizer").
const NOISE_TOKEN =
  /(detector|detection|humaniz|paraphras|\bessay|homework|clothing remover|undress|nsfw|spicy|\bnude|\bporn|girlfriend|boyfriend|waifu|people search|background check|deepfake|face swap|headshot|\bavatar|image generator|photo generator|picture generator|video generator|art generator|voice generator|music generator|song generator|story generator|\bresume\b|cover letter|citation machine|citation generator|\bapa\b|\bmla\b|bibliography|chatgpt login|chatgpt free|chatgpt app|chatgpt plus|chatgpt com|chatgpt online|character ai|\bcolab\b|word search|\bjobs\b|\bsalary\b|stock price|\bstocks?\b|\betf\b|spreadsheet|\bexcel\b|coupon|promo code|crypto|\bnft\b)/;

// Conversational / complaint / chit-chat queries aimed AT the AI, not at SEO
const JUNK_TOKEN =
  /\b(i hate|i love|i like|hello|\bhi\b|\bhey\b|how are you|are you (ok|real|alive|conscious|sentient|human|an ai)|good morning|good night|thank you|thanks|condescending|annoying|stupid|useless|sucks|funny|weird|creepy|wrong answer|lying|joke|jokes|meme|memes|song|poem|story about|talk to|chat with|girlfriend|tell me a)\b/;

function isRelevant(k: string): boolean {
  if (NOISE_TOKEN.test(k)) return false;
  if (JUNK_TOKEN.test(k)) return false;
  // "turn on/off / disable" an AI overview/mode in either word order
  if (/(turn (on|off)|turning (on|off)|disable|deactivate|get rid of|opt[- ]?out|how to stop|stop showing)/.test(k) && /\bai (overview|overviews|mode)\b/.test(k)) {
    return false;
  }
  if (CORE_TOKEN.test(k)) return true;
  return AI_TOKEN.test(k) && INTENT_TOKEN.test(k);
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);

const ACRONYMS: Record<string, string> = {
  ai: "AI",
  seo: "SEO",
  geo: "GEO",
  aeo: "AEO",
  gso: "GSO",
  llm: "LLM",
  llms: "LLMs",
  gpt: "GPT",
  chatgpt: "ChatGPT",
  sge: "SGE",
  faq: "FAQ",
  api: "API",
  saas: "SaaS",
  b2b: "B2B",
  b2c: "B2C",
  roi: "ROI",
  serp: "SERP",
  sov: "SoV",
  vs: "vs",
};
const LOWER_WORDS = new Set(["and", "or", "for", "the", "a", "an", "in", "to", "of", "on", "with", "your", "is"]);

const titleCase = (s: string) =>
  s
    .split(/\s+/)
    .map((w, i) => {
      const lower = w.toLowerCase();
      if (ACRONYMS[lower]) return ACRONYMS[lower];
      if (i > 0 && LOWER_WORDS.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");

function csvEscape(v: unknown): string {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

async function main() {
  const dir = path.join(process.cwd(), "keyword-research");
  const raw: KeywordRecord[] = JSON.parse(await fs.readFile(path.join(dir, "raw-keywords.json"), "utf8"));

  // Tag every keyword
  const taggedAll: Tagged[] = raw.map((r) => {
    const topic = classifyTopic(r.keyword);
    const format = classifyFormat(r.keyword, r.main_intent);
    const kd = r.keyword_difficulty ?? 50;
    const opportunity = Math.round((r.search_volume / (kd + 10)) * 100) / 100;
    return { ...r, topic, format, opportunity, relevant: isRelevant(r.keyword) };
  });

  // Refined = on-niche only. Clusters / blueprint / summary use THIS set.
  const tagged = taggedAll.filter((t) => t.relevant);
  const noise = taggedAll.filter((t) => !t.relevant);

  // Noise file for transparency (what was excluded and why it was off-niche)
  const noiseRows = ["keyword,search_volume,keyword_difficulty,main_intent,topic"];
  for (const n of [...noise].sort((a, b) => b.search_volume - a.search_volume)) {
    noiseRows.push(
      [csvEscape(n.keyword), n.search_volume, n.keyword_difficulty ?? "", csvEscape(n.main_intent ?? ""), csvEscape(n.topic)].join(",")
    );
  }
  await fs.writeFile(path.join(dir, "excluded-noise-keywords.csv"), noiseRows.join("\n"));

  // ---- master CSV ----
  const header = [
    "keyword",
    "search_volume",
    "keyword_difficulty",
    "cpc",
    "competition_level",
    "main_intent",
    "topic",
    "format",
    "opportunity_score",
    "relevant",
    "sources",
    "seeds",
  ];
  const rowOf = (t: Tagged) =>
    [
      csvEscape(t.keyword),
      t.search_volume,
      t.keyword_difficulty ?? "",
      t.cpc ?? "",
      csvEscape(t.competition_level ?? ""),
      csvEscape(t.main_intent ?? ""),
      csvEscape(t.topic),
      csvEscape(t.format),
      t.opportunity,
      t.relevant ? "yes" : "no",
      csvEscape(t.sources.join("+")),
      csvEscape(t.seeds.slice(0, 3).join(" | ")),
    ].join(",");

  const sortedAll = [...taggedAll].sort((a, b) => b.search_volume - a.search_volume);
  await fs.writeFile(
    path.join(dir, "master-keywords.csv"),
    [header.join(","), ...sortedAll.map(rowOf)].join("\n")
  );
  // On-niche only export (the keyword list you actually build pages from)
  await fs.writeFile(
    path.join(dir, "refined-keywords.csv"),
    [header.join(","), ...sortedAll.filter((t) => t.relevant).map(rowOf)].join("\n")
  );

  // ---- topic cluster rollup ----
  const byTopic = new Map<string, Tagged[]>();
  for (const t of tagged) {
    if (!byTopic.has(t.topic)) byTopic.set(t.topic, []);
    byTopic.get(t.topic)!.push(t);
  }
  const topicStats = [...byTopic.entries()]
    .map(([topic, ks]) => {
      const vol = ks.reduce((s, k) => s + k.search_volume, 0);
      const kds = ks.filter((k) => k.keyword_difficulty != null).map((k) => k.keyword_difficulty!);
      const avgKd = kds.length ? Math.round(kds.reduce((s, v) => s + v, 0) / kds.length) : null;
      return { topic, count: ks.length, vol, avgKd, ks };
    })
    .sort((a, b) => b.vol - a.vol);

  let clustersMd = `# Keyword Clusters — AI Brand Track\n\n`;
  clustersMd += `Source: DataForSEO Labs (US / English). Generated ${new Date().toISOString().slice(0, 10)}.\n\n`;
  clustersMd += `| Topic | Keywords | Monthly Volume | Avg KD |\n|---|--:|--:|--:|\n`;
  for (const s of topicStats) {
    clustersMd += `| ${s.topic} | ${s.count} | ${s.vol.toLocaleString()} | ${s.avgKd ?? "-"} |\n`;
  }
  clustersMd += `\n---\n\n`;
  for (const s of topicStats) {
    clustersMd += `## ${s.topic}\n\n`;
    clustersMd += `**${s.count} keywords · ${s.vol.toLocaleString()} monthly searches · avg KD ${s.avgKd ?? "-"}**\n\n`;
    clustersMd += `| Keyword | Vol | KD | Intent | CPC | Format |\n|---|--:|--:|---|--:|---|\n`;
    for (const k of s.ks.sort((a, b) => b.search_volume - a.search_volume).slice(0, 30)) {
      clustersMd += `| ${k.keyword} | ${k.search_volume} | ${k.keyword_difficulty ?? "-"} | ${k.main_intent ?? "-"} | ${k.cpc != null ? "$" + k.cpc : "-"} | ${k.format} |\n`;
    }
    clustersMd += `\n`;
  }
  await fs.writeFile(path.join(dir, "keyword-clusters.md"), clustersMd);

  // ---- landing-page blueprint: one page per (topic × format) cell ----
  const cells = new Map<string, Tagged[]>();
  for (const t of tagged) {
    const key = `${t.topic}||${t.format}`;
    if (!cells.has(key)) cells.set(key, []);
    cells.get(key)!.push(t);
  }

  // Normalised signature: collapses word-order / stopword variants so
  // "ai seo" = "seo ai" = "ai and seo" = "ai in seo" -> ONE page (no doorway pages)
  const sigOf = (kw: string) =>
    kw
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, " ")
      .split(/\s+/)
      .filter((w) => w && !LOWER_WORDS.has(w))
      .sort()
      .join(" ");

  const buildPage = (topic: string, format: string, ks: Tagged[]) => {
    const sorted = [...ks].sort((a, b) => b.search_volume - a.search_volume || b.opportunity - a.opportunity);
    const vol = ks.reduce((s, k) => s + k.search_volume, 0);
    const kds = ks.filter((k) => k.keyword_difficulty != null).map((k) => k.keyword_difficulty!);
    const avgKd = kds.length ? Math.round(kds.reduce((s, v) => s + v, 0) / kds.length) : 50;
    return {
      topic,
      format,
      primary: sorted[0],
      supporting: sorted.slice(1, 26),
      allKs: sorted,
      totalKeywords: ks.length,
      vol,
      avgKd,
      clusterOpportunity: Math.round((vol / (avgKd + 10)) * 100) / 100,
    };
  };

  const rawPages = [...cells.entries()]
    .map(([key, ks]) => {
      const [topic, format] = key.split("||");
      return buildPage(topic, format, ks);
    })
    .filter((p) => p.totalKeywords >= 3 && p.vol >= 30)
    .sort((a, b) => b.clusterOpportunity - a.clusterOpportunity);

  // Fold near-duplicate pages (same topic + same primary signature) together
  const folded = new Map<string, ReturnType<typeof buildPage>>();
  for (const p of rawPages) {
    const dedupeKey = `${p.topic}||${sigOf(p.primary.keyword)}`;
    const existing = folded.get(dedupeKey);
    if (!existing) {
      folded.set(dedupeKey, p);
    } else {
      const union = new Map<string, Tagged>();
      for (const k of [...existing.allKs, ...p.allKs]) union.set(k.keyword, k);
      folded.set(dedupeKey, buildPage(existing.topic, existing.format, [...union.values()]));
    }
  }
  const pages = [...folded.values()].sort((a, b) => b.clusterOpportunity - a.clusterOpportunity);

  let bp = `# Landing Page Blueprint — AI Brand Track\n\n`;
  bp += `Programmatic-SEO plan. **${pages.length} pages** ranked by opportunity (aggregate volume ÷ difficulty). `;
  bp += `Each page = one topic × intent cell. Build them as templated landing pages off the homepage pattern.\n\n`;
  bp += `Source: DataForSEO Labs · US/English · generated ${new Date().toISOString().slice(0, 10)}.\n\n`;
  bp += `> Suggested URL structure: \`/ai-visibility/<slug>\` (or \`/geo/\`, \`/aeo/\` hubs). Map each page to one primary keyword in the H1 + title, weave supporting keywords into H2s/FAQ.\n\n`;

  let idx = 1;
  for (const p of pages) {
    const primaryKw = p.primary.keyword;
    const slug = slugify(primaryKw);
    bp += `## ${idx}. ${titleCase(primaryKw)}\n\n`;
    bp += `- **Topic cluster:** ${p.topic}\n`;
    bp += `- **Page type:** ${p.format}\n`;
    bp += `- **Primary keyword:** \`${primaryKw}\` — ${p.primary.search_volume}/mo · KD ${p.primary.keyword_difficulty ?? "-"} · ${p.primary.main_intent ?? "-"}${p.primary.cpc != null ? ` · CPC $${p.primary.cpc}` : ""}\n`;
    bp += `- **Cluster reach:** ${p.totalKeywords} keywords · **${p.vol.toLocaleString()} total monthly searches** · avg KD ${p.avgKd} · opportunity ${p.clusterOpportunity}\n`;
    bp += `- **Suggested URL:** \`/${slug}\`\n`;
    bp += `- **Title tag:** ${titleCase(primaryKw)} | AI Brand Track\n`;
    bp += `- **H1:** ${titleCase(primaryKw)}\n`;
    if (p.supporting.length) {
      bp += `- **Supporting keywords (H2s / FAQ / body):**\n`;
      for (const s of p.supporting) {
        bp += `  - ${s.keyword} (${s.search_volume}/mo, KD ${s.keyword_difficulty ?? "-"})\n`;
      }
    }
    bp += `\n`;
    idx++;
  }
  await fs.writeFile(path.join(dir, "landing-page-blueprint.md"), bp);

  // ---- machine-readable page specs ----
  const pageJson = pages.map((p) => ({
    topic: p.topic,
    format: p.format,
    slug: slugify(p.primary.keyword),
    primary_keyword: p.primary.keyword,
    primary_volume: p.primary.search_volume,
    primary_kd: p.primary.keyword_difficulty,
    primary_intent: p.primary.main_intent,
    cluster_keywords: p.totalKeywords,
    cluster_volume: p.vol,
    cluster_avg_kd: p.avgKd,
    opportunity: p.clusterOpportunity,
    title_tag: `${titleCase(p.primary.keyword)} | AI Brand Track`,
    h1: titleCase(p.primary.keyword),
    supporting_keywords: p.supporting.map((s) => ({
      keyword: s.keyword,
      volume: s.search_volume,
      kd: s.keyword_difficulty,
      intent: s.main_intent,
    })),
  }));
  await fs.writeFile(path.join(dir, "page-blueprint.json"), JSON.stringify(pageJson, null, 2));

  // ---- executive summary + quick wins ----
  const withVol = tagged.filter((t) => t.search_volume > 0);
  const totalVol = withVol.reduce((s, t) => s + t.search_volume, 0);
  const quickWins = tagged
    .filter((t) => t.search_volume >= 40 && (t.keyword_difficulty ?? 100) <= 30)
    .sort((a, b) => b.search_volume - a.search_volume)
    .slice(0, 40);
  const topCommercial = tagged
    .filter((t) => (t.main_intent === "commercial" || t.main_intent === "transactional") && t.search_volume >= 40)
    .sort((a, b) => b.opportunity - a.opportunity)
    .slice(0, 40);
  const topVolume = [...tagged].sort((a, b) => b.search_volume - a.search_volume).slice(0, 40);

  let sum = `# Keyword Research Summary — AI Brand Track\n\n`;
  sum += `Generated ${new Date().toISOString().slice(0, 10)} · DataForSEO Labs · US / English.\n\n`;
  sum += `## Totals\n\n`;
  sum += `- **${taggedAll.length.toLocaleString()}** raw keywords discovered across the niche\n`;
  sum += `- **${tagged.length.toLocaleString()}** on-niche keywords after relevance filtering (${noise.length.toLocaleString()} generic-AI/off-topic excluded → excluded-noise-keywords.csv)\n`;
  sum += `- **${withVol.length.toLocaleString()}** on-niche keywords with measurable monthly search volume\n`;
  sum += `- **${totalVol.toLocaleString()}** total addressable monthly searches (on-niche only)\n`;
  sum += `- **${pages.length}** recommended landing pages (see landing-page-blueprint.md)\n`;
  sum += `- **${topicStats.length}** topic clusters (see keyword-clusters.md)\n\n`;
  sum += `> Filtering keeps keywords that pair an AI/answer-engine surface (ChatGPT, Perplexity, Gemini, LLM, generative/answer engine, "AI search") with a visibility/SEO/monitoring intent — plus core niche terms (GEO, AEO, LLM SEO, AI brand visibility). Raw set retained in master-keywords.csv (\`relevant\` column).\n\n`;
  sum += `## Topic clusters by volume\n\n| Topic | Keywords | Monthly Volume | Avg KD |\n|---|--:|--:|--:|\n`;
  for (const s of topicStats) sum += `| ${s.topic} | ${s.count} | ${s.vol.toLocaleString()} | ${s.avgKd ?? "-"} |\n`;
  sum += `\n## Quick wins (vol ≥ 40, KD ≤ 30)\n\n| Keyword | Vol | KD | Intent | Topic |\n|---|--:|--:|---|---|\n`;
  for (const q of quickWins) sum += `| ${q.keyword} | ${q.search_volume} | ${q.keyword_difficulty ?? "-"} | ${q.main_intent ?? "-"} | ${q.topic} |\n`;
  sum += `\n## Top commercial/transactional terms\n\n| Keyword | Vol | KD | CPC | Topic |\n|---|--:|--:|--:|---|\n`;
  for (const c of topCommercial) sum += `| ${c.keyword} | ${c.search_volume} | ${c.keyword_difficulty ?? "-"} | ${c.cpc != null ? "$" + c.cpc : "-"} | ${c.topic} |\n`;
  sum += `\n## Highest volume terms\n\n| Keyword | Vol | KD | Intent | Topic |\n|---|--:|--:|---|---|\n`;
  for (const v of topVolume) sum += `| ${v.keyword} | ${v.search_volume} | ${v.keyword_difficulty ?? "-"} | ${v.main_intent ?? "-"} | ${v.topic} |\n`;
  await fs.writeFile(path.join(dir, "SUMMARY.md"), sum);

  console.log("=== CLUSTERING DONE ===");
  console.log(`Raw discovered:   ${taggedAll.length}`);
  console.log(`On-niche kept:    ${tagged.length}  (excluded ${noise.length})`);
  console.log(`With volume:      ${withVol.length}`);
  console.log(`Total volume:     ${totalVol.toLocaleString()}/mo (on-niche)`);
  console.log(`Topic clusters:   ${topicStats.length}`);
  console.log(`Landing pages:    ${pages.length}`);
  console.log(`\nDeliverables in keyword-research/:`);
  console.log(`  - SUMMARY.md                  (start here)`);
  console.log(`  - landing-page-blueprint.md   (pages to build)`);
  console.log(`  - keyword-clusters.md         (clusters + metrics)`);
  console.log(`  - page-blueprint.json         (machine-readable)`);
  console.log(`  - refined-keywords.csv        (on-niche keywords)`);
  console.log(`  - master-keywords.csv         (all + 'relevant' flag)`);
  console.log(`  - excluded-noise-keywords.csv (what was filtered out)`);
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
