import type { LandingPageData } from "@/components/seo/landing-page";

/**
 * Content for the Phase-1 programmatic-SEO pages.
 * Keyword targets are derived from keyword-research/landing-page-blueprint.md
 * (DataForSEO Labs, US/English). One pillar hub + 6 low-difficulty money pages.
 * Edit copy here; routes stay thin.
 */

const HUB: LandingPageData = {
  slug: "ai-search-visibility",
  breadcrumb: "Overview",
  eyebrow: "AI Search Visibility",
  h1: "AI Search Visibility: Get Your Brand Found by ChatGPT, Perplexity & Gemini",
  subhead:
    "AI search visibility is how often AI assistants name and recommend your brand. This is the hub for everything that drives it — GEO, AEO, LLM SEO, and platform-specific tactics.",
  intro: [
    "Search is splitting in two. People still type queries into Google, but a fast-growing share now ask ChatGPT, Perplexity, Google's AI Overviews, and Gemini instead — and those assistants answer with a short list of brands, not ten blue links. If your brand is not on that list, the customer never learns you exist.",
    "AI search optimization is the practice of earning a place on that list. It spans several disciplines, each with its own tactics and search behavior. The pages below break them down. AI Brand Track measures where you stand today across every major assistant and shows exactly what to fix.",
  ],
  sections: [
    {
      heading: "The disciplines of AI search optimization",
      body: [
        "\"AI SEO\" is an umbrella term. Underneath it sit a handful of distinct practices that overlap but are searched, measured, and optimized differently. Understanding the map is the first step to ranking on it.",
      ],
      bullets: [
        "Generative Engine Optimization (GEO) — optimizing to be cited inside generative answers.",
        "Answer Engine Optimization (AEO) — structuring content to become the direct answer.",
        "LLM SEO — making your brand and entities legible to large language models.",
        "Platform tactics — what specifically moves the needle on ChatGPT, Perplexity, and Google AI Overviews.",
        "AI rank tracking — measuring your share of voice over time so you know what works.",
      ],
    },
    {
      heading: "Why AI visibility is now a growth channel, not a science project",
      body: [
        "Buyers increasingly shortlist vendors by asking an assistant \"what are the best tools for X?\" The model typically names three to five. Those mentions carry the trust of a recommendation, not an ad — and they happen before the prospect ever reaches a search engine or your site.",
        "Unlike classic SEO, you cannot see this in Google Analytics. The conversation happens off your property. The only way to manage it is to measure what the assistants actually say about you and your competitors, then optimize the sources they read.",
      ],
    },
    {
      heading: "How AI Brand Track fits in",
      body: [
        "AI Brand Track queries ChatGPT, Claude, Perplexity, and Google Gemini with the prompts your buyers use, then scores how often you appear, in what position, with what sentiment, and how you compare to competitors. You get a visibility score, a competitive gap analysis, and concrete recommendations — in about 60 seconds.",
        "Use the guides below to understand each discipline, then run a free analysis to see where you actually stand.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is AI search visibility?",
      a: "AI search visibility is how frequently and prominently AI assistants — ChatGPT, Perplexity, Google AI Overviews, Gemini, Claude — mention and recommend your brand when users ask relevant questions. It is the AI-era equivalent of ranking on page one, except the 'page' is a conversational answer that typically names only a few brands.",
    },
    {
      q: "Is AI search optimization different from SEO?",
      a: "It is related but distinct. Traditional SEO targets ranking positions in a list of links. AI search optimization targets being named inside a generated answer, which depends on how authoritative, clearly structured, and well-cited your content and brand entity are across the web — not just on-page keywords and backlinks.",
    },
    {
      q: "Which AI platforms should I optimize for?",
      a: "Start with the ones your buyers actually use: ChatGPT (largest reach), Google AI Overviews and Gemini (default for Google users), and Perplexity (popular for research and comparisons). AI Brand Track monitors all of these plus Claude so you can prioritize by where you are weakest.",
    },
    {
      q: "How do I measure AI visibility?",
      a: "You can't see it in standard analytics because the answer is generated off-site. You measure it by systematically prompting each assistant with buyer questions and recording whether, where, and how your brand appears versus competitors. AI Brand Track automates this across all major platforms.",
    },
  ],
  related: [
    {
      href: "/generative-engine-optimization",
      title: "Generative Engine Optimization (GEO)",
      desc: "How to get cited inside AI-generated answers.",
    },
    {
      href: "/answer-engine-optimization",
      title: "Answer Engine Optimization (AEO)",
      desc: "Structure content to become the direct answer.",
    },
    {
      href: "/llm-seo",
      title: "LLM SEO",
      desc: "Make your brand legible to large language models.",
    },
    {
      href: "/how-to-rank-on-chatgpt",
      title: "How to Rank on ChatGPT",
      desc: "Tactics specific to the largest AI assistant.",
    },
    {
      href: "/perplexity-seo",
      title: "Perplexity SEO",
      desc: "Win the citation-heavy research engine.",
    },
    {
      href: "/ai-rank-tracker",
      title: "AI Rank Tracker",
      desc: "Track your share of voice over time.",
    },
  ],
  cta: {
    heading: "See where your brand stands in AI search",
    sub: "Run a free analysis across ChatGPT, Claude, Perplexity, and Gemini in 60 seconds.",
  },
};

const GEO: LandingPageData = {
  slug: "generative-engine-optimization",
  breadcrumb: "Generative Engine Optimization",
  eyebrow: "GEO Guide",
  h1: "Generative Engine Optimization (GEO)",
  subhead:
    "GEO is the practice of optimizing your brand and content to be cited inside AI-generated answers. Here's how it works, how it differs from SEO, and how to start.",
  intro: [
    "Generative Engine Optimization (GEO) — sometimes searched as \"GEO SEO\" — is the discipline of getting referenced and recommended inside the answers produced by generative engines like ChatGPT, Perplexity, Google AI Overviews, and Gemini. Where SEO competes for a ranking position, GEO competes to be one of the few sources the model synthesizes into its reply.",
    "The shift matters because generative answers compress a whole results page into a few sentences and a handful of named brands. Being technically rank-able is no longer enough; you have to be the kind of source these systems trust enough to quote.",
  ],
  sections: [
    {
      heading: "GEO vs SEO: what actually changes",
      body: [
        "Traditional SEO optimizes a page to rank in a list a human then scans. GEO optimizes your overall web presence so a model selects you when it composes an answer. The inputs overlap — authority, clarity, freshness — but the success metric is completely different: frequency and quality of mentions, not position.",
      ],
      bullets: [
        "SEO measures success by ranking position; GEO by how often you're cited and recommended.",
        "SEO is mostly on-page and links; GEO adds entity clarity, consistent third-party coverage, and quotable structure.",
        "SEO traffic is visible in analytics; GEO influence happens off-site and must be actively measured.",
      ],
    },
    {
      heading: "What generative engines reward",
      body: [
        "Models favor sources that are unambiguous, well-structured, corroborated elsewhere, and current. In practice that means clear definitional content, specific data and examples, consistent descriptions of who you are across the web, and structured markup that makes your claims machine-readable.",
      ],
      bullets: [
        "Clear, self-contained answers near the top of the page (the model can lift them directly).",
        "A consistent brand entity — same description, category, and facts everywhere it appears.",
        "Third-party validation: reviews, listicles, and mentions the model already trusts.",
        "Structured data and clean headings so claims are easy to extract.",
      ],
    },
    {
      heading: "A practical GEO starting point",
      body: [
        "GEO work is only as good as your baseline. Before changing content, find out which prompts already trigger competitor mentions instead of yours, on which engines, and why. Then prioritize the gaps with the most commercial intent.",
        "AI Brand Track runs that diagnostic across ChatGPT, Claude, Perplexity, and Gemini, shows your share of voice versus competitors, and returns specific, prioritized recommendations rather than generic advice.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is generative engine optimization (GEO)?",
      a: "GEO is the practice of optimizing your brand, content, and web presence so that generative AI engines — ChatGPT, Perplexity, Google AI Overviews, Gemini — cite and recommend you inside their answers. It focuses on being a trusted, quotable source rather than ranking in a list of links.",
    },
    {
      q: "Is GEO the same as SEO?",
      a: "No. SEO optimizes for ranking positions in search results. GEO optimizes for inclusion in AI-generated answers. They share foundations like authority and clear content, but GEO success is measured by how often and how favorably AI systems mention you, not by where you sit on a results page.",
    },
    {
      q: "What is the difference between GEO and AEO?",
      a: "GEO is about being cited inside generative, synthesized answers across AI engines. AEO (Answer Engine Optimization) is about structuring content so it becomes the direct, extracted answer to a specific question. In practice they are complementary: AEO formatting often improves GEO outcomes.",
    },
    {
      q: "How do I measure GEO performance?",
      a: "Track how frequently your brand is mentioned and recommended across AI assistants for your target prompts, in what position, with what sentiment, and relative to competitors. AI Brand Track automates this measurement and trends it over time.",
    },
    {
      q: "How quickly does GEO work?",
      a: "Because models periodically refresh what they know and weigh corroborating sources, improvements typically show over weeks rather than days. The fastest gains usually come from fixing entity inconsistencies and earning credible third-party coverage, then re-measuring.",
    },
  ],
  related: [
    {
      href: "/answer-engine-optimization",
      title: "Answer Engine Optimization",
      desc: "The complementary discipline to GEO.",
    },
    { href: "/llm-seo", title: "LLM SEO", desc: "Make your entity legible to language models." },
    {
      href: "/ai-search-visibility",
      title: "AI Search Visibility Hub",
      desc: "How all the AI search disciplines fit together.",
    },
  ],
  cta: {
    heading: "Is your brand getting cited — or skipped?",
    sub: "Run a free GEO baseline across the major generative engines in 60 seconds.",
  },
};

const AEO: LandingPageData = {
  slug: "answer-engine-optimization",
  breadcrumb: "Answer Engine Optimization",
  eyebrow: "AEO Guide",
  h1: "Answer Engine Optimization (AEO)",
  subhead:
    "AEO is structuring your content so answer engines extract it directly as the answer. Learn what it is, how it differs from SEO and GEO, and where to start.",
  intro: [
    "Answer Engine Optimization (AEO) is the practice of formatting and structuring content so that answer engines — AI assistants, AI Overviews, and voice assistants — lift it directly as the response to a user's question. Instead of competing for a click, you are competing to be the sentence the engine reads back.",
    "AEO has become critical because a large and growing share of questions are now answered without a single click. If the engine can extract a clean answer from your page, you earn the mention and the authority. If it can't, a competitor does.",
  ],
  sections: [
    {
      heading: "What AEO actually requires",
      body: [
        "Answer engines reward content that directly and unambiguously answers a specific question, high on the page, in language a model can extract without guesswork. The skill is anticipating the exact question and answering it cleanly before elaborating.",
      ],
      bullets: [
        "A concise, direct answer in the first sentence or two of the relevant section.",
        "Question-shaped headings that match how people actually ask.",
        "Structured data (FAQ, How-To, Article) so answers are machine-readable.",
        "Specifics — numbers, steps, definitions — rather than vague marketing language.",
      ],
    },
    {
      heading: "AEO vs SEO vs GEO",
      body: [
        "SEO gets you ranked. AEO gets your content chosen as the answer. GEO gets your brand cited across synthesized, generative responses. They reinforce each other: clean AEO structure makes content easier for generative engines to quote, which improves GEO, while strong SEO authority makes engines more willing to trust either.",
      ],
    },
    {
      heading: "Start by finding your answer gaps",
      body: [
        "The highest-leverage AEO work is on questions where an assistant currently answers with a competitor. You need to know which buyer questions trigger which brand, on which engine, before you rewrite anything.",
        "AI Brand Track surfaces exactly those gaps across ChatGPT, Claude, Perplexity, and Gemini and tells you which to prioritize by commercial intent.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is answer engine optimization (AEO)?",
      a: "AEO is the practice of structuring content so answer engines and AI assistants extract it directly as the answer to a question. It emphasizes concise, direct, well-structured responses and machine-readable markup so the engine can lift your content with confidence.",
    },
    {
      q: "What is the difference between AEO and SEO?",
      a: "SEO optimizes to rank a page in a list of results. AEO optimizes the content itself to be selected and read back as the direct answer, often without a click. SEO authority still helps, but AEO is about answer clarity and structure.",
    },
    {
      q: "Is AEO the same as GEO?",
      a: "They are closely related. AEO focuses on becoming the extracted direct answer to a specific question. GEO focuses on being cited and recommended inside broader generative answers. Good AEO structure typically improves GEO results, so most brands pursue both together.",
    },
    {
      q: "How do I do AEO in practice?",
      a: "Identify the exact questions buyers ask, answer each one directly and concisely near the top of the relevant section, use question-shaped headings, and add FAQ/How-To structured data. Then measure which assistants now return your answer versus a competitor's.",
    },
    {
      q: "How is AEO performance measured?",
      a: "By whether AI assistants and answer engines return your content as the answer for target questions, and how that compares to competitors over time. AI Brand Track tracks this across all major AI platforms.",
    },
  ],
  related: [
    {
      href: "/generative-engine-optimization",
      title: "Generative Engine Optimization",
      desc: "Get cited inside generative answers.",
    },
    {
      href: "/how-to-rank-on-chatgpt",
      title: "How to Rank on ChatGPT",
      desc: "Apply AEO to the largest assistant.",
    },
    {
      href: "/ai-search-visibility",
      title: "AI Search Visibility Hub",
      desc: "The full map of AI search optimization.",
    },
  ],
  cta: {
    heading: "Find the questions where competitors win",
    sub: "Run a free analysis to see which buyer questions return a competitor instead of you.",
  },
};

const LLM_SEO: LandingPageData = {
  slug: "llm-seo",
  breadcrumb: "LLM SEO",
  eyebrow: "LLM SEO Guide",
  h1: "LLM SEO: Optimizing for Large Language Models",
  subhead:
    "LLM SEO is making your brand and content legible to the language models behind ChatGPT, Gemini, Claude, and Perplexity. Here's what it means and how to start.",
  intro: [
    "LLM SEO (also searched as \"SEO for LLM\") is the practice of optimizing how large language models understand and represent your brand. The models behind ChatGPT, Gemini, Claude, and Perplexity build an internal picture of who you are, what you do, and whether you're worth recommending — LLM SEO is the work of making that picture accurate, consistent, and favorable.",
    "It is the foundation beneath GEO and AEO. If a model is unsure what category you belong to or has conflicting information about you, no amount of answer formatting will get you recommended.",
  ],
  sections: [
    {
      heading: "How language models 'see' your brand",
      body: [
        "An LLM doesn't store your website; it stores patterns learned from many sources that mention you. Consistent, corroborated signals across reputable sites become the model's confident understanding of your brand. Sparse or contradictory signals become uncertainty — and uncertain brands don't get recommended.",
      ],
      bullets: [
        "Entity consistency: the same name, category, and description everywhere you appear.",
        "Corroboration: multiple credible third-party sources saying the same thing.",
        "Specificity: concrete facts the model can attach to your entity.",
        "Recency: current information so the model isn't relying on stale data.",
      ],
    },
    {
      heading: "LLM SEO vs traditional SEO",
      body: [
        "Traditional SEO optimizes pages for a ranking algorithm. LLM SEO optimizes the broader information environment so a model forms an accurate, recommendable understanding of your brand. Backlinks and content still matter, but so does how you're described in reviews, directories, comparisons, and press the model has likely ingested.",
      ],
    },
    {
      heading: "Where to begin with LLM SEO tools",
      body: [
        "You can't fix what you can't see. The starting point is auditing what the major models currently believe about your brand and where that diverges from reality or from competitors.",
        "AI Brand Track is an LLM SEO tool that probes ChatGPT, Claude, Perplexity, and Gemini with real buyer prompts, measures how each represents and ranks you, and pinpoints the inconsistencies and gaps to fix first.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is LLM SEO?",
      a: "LLM SEO is the practice of optimizing how large language models perceive and represent your brand, so that assistants like ChatGPT, Gemini, Claude, and Perplexity describe and recommend you accurately. It underpins GEO and AEO.",
    },
    {
      q: "How is LLM SEO different from regular SEO?",
      a: "Regular SEO targets a search ranking algorithm and on-page signals. LLM SEO targets the model's learned understanding of your brand, which depends on consistent, corroborated information across many sources — not just your own site.",
    },
    {
      q: "What are LLM SEO tools?",
      a: "LLM SEO tools probe AI assistants with real prompts and measure how your brand is described, ranked, and recommended versus competitors. AI Brand Track is one such tool, covering ChatGPT, Claude, Perplexity, and Gemini with prioritized recommendations.",
    },
    {
      q: "Can you really optimize for an LLM?",
      a: "You can't edit a model, but you strongly influence what it learns about you by making your brand entity consistent, well-corroborated, specific, and current across the sources it ingests. Measuring before and after is how you confirm impact.",
    },
    {
      q: "Does LLM SEO replace SEO?",
      a: "No — it complements it. Strong traditional SEO builds the authority and content that models also rely on. LLM SEO adds the entity-clarity and measurement layer needed for AI assistants specifically.",
    },
  ],
  related: [
    {
      href: "/generative-engine-optimization",
      title: "Generative Engine Optimization",
      desc: "Turn LLM understanding into citations.",
    },
    {
      href: "/answer-engine-optimization",
      title: "Answer Engine Optimization",
      desc: "Become the extracted answer.",
    },
    {
      href: "/ai-rank-tracker",
      title: "AI Rank Tracker",
      desc: "Measure LLM perception over time.",
    },
  ],
  cta: {
    heading: "What do the models actually think of your brand?",
    sub: "Run a free LLM audit across ChatGPT, Claude, Perplexity, and Gemini.",
  },
};

const CHATGPT: LandingPageData = {
  slug: "how-to-rank-on-chatgpt",
  breadcrumb: "How to Rank on ChatGPT",
  eyebrow: "ChatGPT Visibility",
  h1: "How to Rank on ChatGPT",
  subhead:
    "ChatGPT recommends only a few brands per answer. Here's how ChatGPT chooses them and what you can do to be one — practical SEO for ChatGPT.",
  intro: [
    "ChatGPT is the largest AI assistant, and when someone asks it to recommend tools or vendors, it typically names just three to five. \"Ranking\" on ChatGPT means being one of those names. There is no submission form and no ad slot — inclusion is earned through how ChatGPT's model and its browsing sources understand your brand.",
    "This guide covers what actually influences ChatGPT recommendations and how to do practical SEO for ChatGPT, including ChatGPT for marketing use cases.",
  ],
  sections: [
    {
      heading: "How ChatGPT decides which brands to name",
      body: [
        "ChatGPT draws on patterns from its training data and, when browsing, on current high-authority sources. Brands that appear consistently across trusted comparisons, reviews, and reference content — described the same way each time — become the safe, confident picks the model returns.",
      ],
      bullets: [
        "Consistent presence in the listicles and comparisons ChatGPT is likely to read.",
        "A clear, unambiguous brand entity and category.",
        "Credible third-party validation, not just your own marketing pages.",
        "Content that directly answers the buyer's question without fluff.",
      ],
    },
    {
      heading: "Practical SEO for ChatGPT",
      body: [
        "Treat ChatGPT visibility as an authority-and-clarity problem. Earn mentions in the sources it trusts, make your brand description consistent everywhere, and structure your own content so it's easy to quote.",
      ],
      bullets: [
        "Get listed and accurately described in the top comparison and review content for your category.",
        "Unify your brand's name, category, and one-line description across the web.",
        "Publish clear, specific answers to the exact questions buyers ask.",
        "Re-measure after changes — ChatGPT's answers shift as sources update.",
      ],
    },
    {
      heading: "Measure your ChatGPT visibility first",
      body: [
        "Before optimizing, find out which buyer prompts ChatGPT answers with a competitor instead of you, and how you're described when you do appear. That baseline tells you exactly where to focus.",
        "AI Brand Track runs your real prompts through ChatGPT (and Claude, Perplexity, Gemini), scores your visibility and sentiment, compares you to competitors, and returns prioritized fixes.",
      ],
    },
  ],
  faqs: [
    {
      q: "How do I rank on ChatGPT?",
      a: "Be one of the few brands ChatGPT names by earning consistent, credible presence in the sources it trusts, keeping your brand entity unambiguous, and answering buyer questions clearly. There's no ad slot — visibility is earned through authority and clarity, then verified by measurement.",
    },
    {
      q: "Can you do SEO for ChatGPT?",
      a: "Yes, in the sense of optimizing the signals ChatGPT relies on: third-party comparisons and reviews, entity consistency, and clear answer content. You can't directly edit the model, but you strongly influence what it recommends.",
    },
    {
      q: "Why doesn't ChatGPT mention my brand?",
      a: "Usually because your brand is absent or inconsistently described in the comparison and reference sources ChatGPT draws on, or a competitor dominates those sources. An AI visibility audit shows precisely which prompts and sources are the problem.",
    },
    {
      q: "How can I use ChatGPT for marketing?",
      a: "Beyond content creation, the high-leverage use is monitoring and improving how ChatGPT represents your brand to buyers — tracking mentions, sentiment, and competitive share of voice, then optimizing the sources behind them.",
    },
    {
      q: "How often does ChatGPT visibility change?",
      a: "It shifts as the underlying sources and the model's information update. Brands actively optimizing should re-measure regularly — weekly or after major content, PR, or competitor moves.",
    },
  ],
  related: [
    {
      href: "/perplexity-seo",
      title: "Perplexity SEO",
      desc: "The other assistant buyers use to compare.",
    },
    {
      href: "/generative-engine-optimization",
      title: "Generative Engine Optimization",
      desc: "The discipline behind ChatGPT citations.",
    },
    {
      href: "/ai-rank-tracker",
      title: "AI Rank Tracker",
      desc: "Track ChatGPT visibility over time.",
    },
  ],
  cta: {
    heading: "See if ChatGPT recommends you or your competitor",
    sub: "Run a free ChatGPT visibility analysis in 60 seconds.",
  },
};

const PERPLEXITY: LandingPageData = {
  slug: "perplexity-seo",
  breadcrumb: "Perplexity SEO",
  eyebrow: "Perplexity Visibility",
  h1: "Perplexity SEO: How to Rank on Perplexity AI",
  subhead:
    "Perplexity cites its sources on every answer. That makes it one of the most winnable AI engines — if you understand how it picks them.",
  intro: [
    "Perplexity AI is a research-oriented answer engine that explicitly cites the sources behind every response. Buyers use it heavily for comparisons and due diligence, which makes Perplexity SEO especially valuable: the engine tells you, transparently, which sources earned the citation — and those are the sources you need to win.",
    "Because Perplexity leans on current, citable web content, it is often one of the faster AI engines to influence once you know where you stand.",
  ],
  sections: [
    {
      heading: "How Perplexity selects and cites sources",
      body: [
        "Perplexity retrieves relevant, credible pages, synthesizes them, and links the citations inline. It favors content that is current, specifically on-topic, and authoritative enough to trust for a factual answer. Winning means being among those cited pages for your buyer's questions.",
      ],
      bullets: [
        "Up-to-date content that directly addresses the query.",
        "Topical authority on the specific subject, not just the broad category.",
        "Clear structure that's easy to extract a citable claim from.",
        "Presence in the comparisons and reviews Perplexity tends to retrieve.",
      ],
    },
    {
      heading: "Why Perplexity is a high-leverage target",
      body: [
        "Its citation transparency removes the guesswork: you can see which competitor sources are being cited instead of yours and work directly on closing that gap. For many brands, Perplexity is a lower-difficulty, faster-feedback engine than the larger assistants.",
      ],
    },
    {
      heading: "Baseline your Perplexity visibility",
      body: [
        "Start by measuring which buyer prompts Perplexity answers with competitors, which sources it cites, and how you're characterized when you appear.",
        "AI Brand Track tracks Perplexity alongside ChatGPT, Claude, and Gemini, scoring your share of voice and returning specific, prioritized recommendations.",
      ],
    },
  ],
  faqs: [
    {
      q: "How do I rank on Perplexity AI?",
      a: "Earn citations by having current, authoritative, clearly structured content on the specific topics buyers ask about, and by being present in the comparison and review sources Perplexity retrieves. Its inline citations make it clear which sources to target.",
    },
    {
      q: "Is Perplexity SEO different from Google SEO?",
      a: "It overlaps but is more citation-driven and recency-sensitive. Perplexity rewards content that is specifically on-topic and trustworthy enough to cite for a factual answer, and it shows you exactly which sources won — feedback Google never gives directly.",
    },
    {
      q: "Why is Perplexity considered easier to influence?",
      a: "Because it transparently cites sources, you can see precisely which competitor pages are being used instead of yours and act on that. The feedback loop is shorter than with assistants that don't reveal their sources.",
    },
    {
      q: "How do I measure Perplexity visibility?",
      a: "Prompt Perplexity with your buyers' real questions and record whether you're mentioned and cited, in what position, and versus which competitors. AI Brand Track automates this and trends it over time.",
    },
    {
      q: "How often should I check Perplexity rankings?",
      a: "Because Perplexity is recency-sensitive, re-measure regularly — at least monthly, and after publishing new content or notable competitor or PR activity.",
    },
  ],
  related: [
    {
      href: "/how-to-rank-on-chatgpt",
      title: "How to Rank on ChatGPT",
      desc: "The largest assistant buyers use.",
    },
    {
      href: "/answer-engine-optimization",
      title: "Answer Engine Optimization",
      desc: "Structure content to get cited.",
    },
    {
      href: "/ai-search-visibility",
      title: "AI Search Visibility Hub",
      desc: "How every AI engine fits together.",
    },
  ],
  cta: {
    heading: "Which sources is Perplexity citing — yours or theirs?",
    sub: "Run a free Perplexity visibility analysis in 60 seconds.",
  },
};

const RANK_TRACKER: LandingPageData = {
  slug: "ai-rank-tracker",
  breadcrumb: "AI Rank Tracker",
  eyebrow: "AI Rank Tracking",
  h1: "AI Rank Tracker: Monitor Your Brand Across AI Assistants",
  subhead:
    "An AI rank tracker measures how often AI assistants mention and recommend your brand over time — the share-of-voice metric classic rank trackers can't see.",
  intro: [
    "Classic rank trackers watch Google positions. An AI rank tracker watches something Google Analytics never shows: how often ChatGPT, Perplexity, Gemini, and Claude name and recommend your brand when buyers ask, and how that changes over time. It is prompt-level monitoring for the AI era — sometimes searched as LLM rank tracking or AI keyword tracking.",
    "Without it, AI search optimization is guesswork. With it, every GEO, AEO, and content change becomes measurable.",
  ],
  sections: [
    {
      heading: "What an AI rank tracker measures",
      body: [
        "Instead of a position in a list, an AI rank tracker measures presence and quality inside generated answers, across engines and over time.",
      ],
      bullets: [
        "Visibility score — how often you appear for tracked buyer prompts.",
        "Share of voice — your mentions versus each competitor.",
        "Position and sentiment — where and how favorably you're described.",
        "Trend — whether optimization work is actually moving the numbers.",
      ],
    },
    {
      heading: "Why prompt monitoring beats one-off checks",
      body: [
        "AI answers vary by phrasing and shift as sources and models update. A single manual check is a snapshot, not a trend. Systematic prompt monitoring across engines turns AI visibility from anecdote into a managed metric you can report on.",
      ],
    },
    {
      heading: "Track it with AI Brand Track",
      body: [
        "AI Brand Track is an AI rank tracker for ChatGPT, Claude, Perplexity, and Gemini. It runs your buyer prompts on each engine, scores visibility, share of voice, position, and sentiment, compares you to competitors, and trends everything so you can prove ROI from AEO and GEO work.",
        "Each analysis takes about 60 seconds, and you can re-run it as often as your optimization cadence requires.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is an AI rank tracker?",
      a: "An AI rank tracker measures how often and how prominently AI assistants — ChatGPT, Perplexity, Gemini, Claude — mention and recommend your brand for buyer prompts, and how that changes over time. It's the AI-era equivalent of a search rank tracker, focused on share of voice inside generated answers.",
    },
    {
      q: "How is AI rank tracking different from keyword rank tracking?",
      a: "Keyword rank tracking records your position in a list of links. AI rank tracking records whether you're named in a generated answer, where, with what sentiment, and versus which competitors — because AI answers don't have fixed positions and aren't visible in analytics.",
    },
    {
      q: "Can you track ChatGPT or Perplexity rankings?",
      a: "Not as fixed positions, but you can systematically track whether and how each assistant mentions you for target prompts over time. AI Brand Track does this across ChatGPT, Claude, Perplexity, and Gemini.",
    },
    {
      q: "Why do I need AI rank tracking?",
      a: "Because AI visibility is invisible in standard analytics and changes as models and sources update. Without tracking, you can't tell whether GEO/AEO work is helping. With it, every change is measurable and reportable.",
    },
    {
      q: "How often should I track AI rankings?",
      a: "Weekly for brands actively optimizing or running campaigns, monthly for stable monitoring, and immediately after major content, PR, or competitor moves.",
    },
  ],
  related: [
    {
      href: "/llm-seo",
      title: "LLM SEO",
      desc: "Improve what the tracker measures.",
    },
    {
      href: "/generative-engine-optimization",
      title: "Generative Engine Optimization",
      desc: "Turn tracking insight into citations.",
    },
    {
      href: "/ai-search-visibility",
      title: "AI Search Visibility Hub",
      desc: "The full AI search optimization map.",
    },
  ],
  cta: {
    heading: "Start tracking your AI share of voice",
    sub: "Run a free baseline across ChatGPT, Claude, Perplexity, and Gemini in 60 seconds.",
  },
};

export const SEO_PAGES: Record<string, LandingPageData> = {
  "ai-search-visibility": HUB,
  "generative-engine-optimization": GEO,
  "answer-engine-optimization": AEO,
  "llm-seo": LLM_SEO,
  "how-to-rank-on-chatgpt": CHATGPT,
  "perplexity-seo": PERPLEXITY,
  "ai-rank-tracker": RANK_TRACKER,
};

export const SEO_PAGE_META: Record<string, { title: string; description: string }> = {
  "ai-search-visibility": {
    title: "AI Search Visibility: Get Found by ChatGPT, Perplexity & Gemini",
    description:
      "AI search visibility hub: GEO, AEO, LLM SEO and platform tactics to get your brand cited and recommended by ChatGPT, Perplexity, Google AI Overviews and Gemini.",
  },
  "generative-engine-optimization": {
    title: "Generative Engine Optimization (GEO): The 2026 Guide",
    description:
      "What generative engine optimization (GEO) is, how GEO differs from SEO and AEO, what generative engines reward, and how to get your brand cited in AI answers.",
  },
  "answer-engine-optimization": {
    title: "Answer Engine Optimization (AEO): The 2026 Guide",
    description:
      "What answer engine optimization (AEO) is, how it differs from SEO and GEO, and how to structure content so AI answer engines extract it as the direct answer.",
  },
  "llm-seo": {
    title: "LLM SEO: How to Optimize for Large Language Models",
    description:
      "LLM SEO explained: how large language models perceive your brand, how it differs from traditional SEO, LLM SEO tools, and how to start optimizing.",
  },
  "how-to-rank-on-chatgpt": {
    title: "How to Rank on ChatGPT: SEO for ChatGPT Visibility",
    description:
      "How ChatGPT chooses which brands to recommend and practical SEO for ChatGPT — including ChatGPT for marketing — so your brand gets named, not skipped.",
  },
  "perplexity-seo": {
    title: "Perplexity SEO: How to Rank on Perplexity AI",
    description:
      "How Perplexity AI selects and cites sources, why it's a high-leverage AI engine, and how to measure and improve your Perplexity visibility.",
  },
  "ai-rank-tracker": {
    title: "AI Rank Tracker: Monitor Brand Visibility Across AI Assistants",
    description:
      "An AI rank tracker measures how often ChatGPT, Perplexity, Gemini and Claude mention and recommend your brand over time — the share of voice analytics can't see.",
  },
};
