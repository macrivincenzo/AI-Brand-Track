# Keyword Research — AI Brand Track

Deep keyword research for the AI brand visibility / GEO / AEO / AI-search-optimization
niche, pulled live from the **DataForSEO Labs API** (US / English).

## How it was built

```
scripts/keyword-research.ts   # PAID: pulls the raw keyword universe from DataForSEO
                              #   - keyword_suggestions (long-tail, contains seed)
                              #   - keyword_ideas       (semantic expansion)
                              #   - related_keywords    (graph expansion)
                              #   63 seed keywords, ~$1.65 spend, ~6,300 keywords
                              #   -> raw-keywords.json

scripts/keyword-cluster.ts    # FREE: re-runnable. Filters to on-niche keywords,
                              #   classifies topic + intent, dedupes near-duplicate
                              #   pages, builds the blueprint. Edit + re-run anytime.
```

Re-run clustering after editing rules (no API cost):

```
npx tsx scripts/keyword-cluster.ts
```

Re-pull fresh data (costs ~$2, updates volumes/difficulty):

```
npx tsx scripts/keyword-research.ts && npx tsx scripts/keyword-cluster.ts
```

## Files (read in this order)

| File | What it is |
|---|---|
| **SUMMARY.md** | Start here. Totals, cluster table, quick wins, top commercial terms |
| **landing-page-blueprint.md** | 44 pages to build, ranked by opportunity. Primary + supporting keywords, title/H1/URL per page |
| **keyword-clusters.md** | Every topic cluster with the top 30 keywords + metrics |
| **page-blueprint.json** | Machine-readable page specs — feed this into a page generator |
| **refined-keywords.csv** | The ~2,000 on-niche keywords (the list you build pages from) |
| **master-keywords.csv** | All ~6,300 keywords with a `relevant` flag (raw set, nothing lost) |
| **excluded-noise-keywords.csv** | What the relevance filter removed (generic-AI noise) for transparency |

## Metrics glossary

- **Vol** — average monthly US search volume (Google).
- **KD** — keyword difficulty 0–100 (lower = easier to rank). `-` = no SERP data yet (usually a brand-new term = opportunity).
- **Intent** — DataForSEO classification: informational / commercial / transactional / navigational.
- **CPC** — advertiser cost-per-click. High CPC = high commercial value of the term.
- **Opportunity** — aggregate cluster volume ÷ (avg KD + 10). Used to rank pages.

## Strategic notes

1. **This is an emerging niche.** The exact product category ("ai brand monitoring"
   = 210/mo, "ai brand visibility" tiny) has low volume but **low difficulty** —
   you can own it before competitors. GEO/AEO/LLM-SEO terms are KD 13–30.
2. **Volume lives in the adjacent "AI + SEO" space** ("ai overview" 74k, the "ai seo"
   family 8k×4, "ai marketing tools" 5.4k). These bring traffic; convert it with
   the brand-visibility angle.
3. **Do not publish 44 thin doorway pages.** Google penalises that. Build
   substantial, genuinely useful pages for the top ~15–20 clusters first
   (pillar + supporting), then expand. The blueprint is ordered for exactly this.
4. **Lowest-hanging fruit (high intent, KD ≤ ~10):** `ai seo services` (KD 3),
   `llm seo tools` (KD 2), `ai seo company/companies` (KD 10), `seo ai agents`
   (KD 2), `chatgpt for marketing` (KD 7), `perplexity seo` (KD 7),
   `what is llm seo` (KD 1), GEO/AEO "services" terms (KD 0).
