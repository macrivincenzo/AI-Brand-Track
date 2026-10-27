import type { Metadata } from 'next';
import Link from 'next/link';

// Every number on this page mirrors the code: models in lib/provider-config.ts,
// metric formulas in lib/ai-utils.ts (analyzeCompetitors) and lib/ai-brand-strength.ts,
// weekly checks in lib/monitoring.ts. Update this page when those change.
const LAST_UPDATED = 'October 27, 2026';

export const metadata: Metadata = {
  title: 'Our Methodology: How AI Visibility Is Measured',
  description:
    'Exactly how AI Brand Track measures AI visibility: which models we query, how prompts are built, the formulas behind every score, and the limits of the data.',
  alternates: { canonical: 'https://www.aibrandtrack.com/methodology' },
  openGraph: {
    title: 'Our Methodology | AI Brand Track',
    description: 'The models, prompts, formulas and limitations behind every AI Brand Track score.',
    url: 'https://www.aibrandtrack.com/methodology',
  },
};

const engines = [
  { assistant: 'ChatGPT', model: 'OpenAI gpt-4o', web: 'No (answers from the model)' },
  { assistant: 'Claude', model: 'Anthropic Claude Sonnet 5.5', web: 'No (answers from the model)' },
  { assistant: 'Gemini', model: 'Google Gemini 3.8 Flash', web: 'No (answers from the model)' },
  { assistant: 'Perplexity', model: 'Perplexity Sonar', web: 'Yes (Perplexity always searches the web)' },
];

const metrics = [
  {
    name: 'Visibility score',
    formula: 'Answers that mention your brand ÷ all answers × 100',
    plain: 'Out of every answer we collected, how many named you.',
  },
  {
    name: 'Share of voice',
    formula: 'Your mentions ÷ mentions of all tracked brands × 100',
    plain: 'Your slice of all brand mentions, compared with your competitors.',
  },
  {
    name: 'Sentiment score',
    formula: 'Average of each mention: positive = 100, neutral = 50, negative = 0',
    plain: 'How favorably the assistants describe you when they do mention you.',
  },
  {
    name: 'Average position',
    formula: 'Mean rank where the answer lists brands in order',
    plain: 'When an assistant ranks options, where you usually land.',
  },
  {
    name: 'AI Brand Strength',
    formula: '35% visibility + 25% sentiment + 20% share of voice + 20% ranking score',
    plain:
      'One summary number. Ranking score: position 1 = 100, 2–3 = 80, 4–5 = 60, 6–10 = 40, lower = 20, not ranked = 50.',
  },
];

export default function MethodologyPage() {
  return (
    <main className="bg-white">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-zinc-800 text-lg leading-relaxed">
        <p className="text-sm uppercase tracking-wide text-zinc-500 mb-3">Methodology · Last updated {LAST_UPDATED}</p>
        <h1 className="text-4xl font-bold text-zinc-900 mb-6">How we measure AI visibility</h1>
        <p className="mb-10">
          Most AI visibility tools show a score without explaining it. We publish exactly how ours works: which models we
          ask, which questions we ask them, how each answer is read, the formula behind every number, and what the data
          can&apos;t tell you.
        </p>

        <h2 className="text-2xl font-semibold text-zinc-900 mt-12 mb-4">1. Which AI assistants we ask</h2>
        <p className="mb-4">
          Every analysis asks all four assistants through their official APIs. All four are included in every plan; none
          is a paid add-on.
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-left text-base border-collapse">
            <thead>
              <tr className="border-b border-zinc-300">
                <th className="py-2 pr-4">Assistant</th>
                <th className="py-2 pr-4">Model we query</th>
                <th className="py-2">Live web search</th>
              </tr>
            </thead>
            <tbody>
              {engines.map((e) => (
                <tr key={e.assistant} className="border-b border-zinc-100">
                  <td className="py-2 pr-4 font-medium">{e.assistant}</td>
                  <td className="py-2 pr-4">{e.model}</td>
                  <td className="py-2">{e.web}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mb-4">
          We don&apos;t track Google AI Overviews, Google AI Mode, Microsoft Copilot, Grok, DeepSeek or Meta AI.
        </p>

        <h2 className="text-2xl font-semibold text-zinc-900 mt-12 mb-4">2. Which questions we ask</h2>
        <p className="mb-4">
          We read your website, then generate 22–25 questions a real buyer in your category would ask, such as
          &ldquo;What are the best tools for X?&rdquo; or &ldquo;How does your brand compare to a competitor?&rdquo;. You
          see every question before the analysis runs and can edit, remove or add your own.
        </p>
        <p className="mb-4">
          Weekly checks reuse the same questions (up to 15) and the same competitors every week, so a change in your
          score reflects a change in the AI answers, not a change in what we asked.
        </p>

        <h2 className="text-2xl font-semibold text-zinc-900 mt-12 mb-4">3. How each answer is read</h2>
        <p className="mb-4">
          Each assistant answers each question once. We then read every answer in two ways: text matching that recognizes
          your brand and competitors (including common spelling variants), and a small AI model (OpenAI gpt-4o-mini) that
          extracts which brands are mentioned, the order they&apos;re ranked in, and whether each mention is positive,
          neutral or negative. You can open every original answer in the report and check it yourself.
        </p>

        <h2 className="text-2xl font-semibold text-zinc-900 mt-12 mb-4">4. The formulas behind every score</h2>
        <div className="space-y-6 mb-4">
          {metrics.map((m) => (
            <div key={m.name} className="border-l-4 border-zinc-900 pl-4">
              <p className="font-semibold text-zinc-900">{m.name}</p>
              <p className="font-mono text-base text-zinc-700">{m.formula}</p>
              <p className="text-zinc-600">{m.plain}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold text-zinc-900 mt-12 mb-4">5. Weekly checks</h2>
        <p className="mb-4">
          When you turn on weekly checks, the same analysis runs automatically once a week and you get an email with your
          visibility score and how it moved. AI answers vary from run to run, so a move of less than 3 points is reported
          as &ldquo;about the same&rdquo; rather than as a real change. A failed run costs nothing and is retried the
          next day.
        </p>

        <h2 className="text-2xl font-semibold text-zinc-900 mt-12 mb-4">6. What the data can&apos;t tell you</h2>
        <ul className="list-disc pl-6 space-y-3 mb-4">
          <li>
            <strong>API answers are close to, but not identical with, the chat apps.</strong> The apps can add web search,
            memory and personalization that an API call doesn&apos;t have.
          </li>
          <li>
            <strong>One answer per question per assistant.</strong> We don&apos;t sample each question several times, so a
            single analysis is a snapshot. Trends over several weeks are more reliable than any one score.
          </li>
          <li>
            <strong>No location or account simulation.</strong> Answers aren&apos;t localized to a city or tailored to a
            user profile.
          </li>
          <li>
            <strong>ChatGPT, Claude and Gemini answer from what the model knows.</strong> Only Perplexity searches the web
            live in our checks, so very recent changes to your site may show up there first.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-zinc-900 mt-12 mb-4">7. What it costs</h2>
        <p className="mb-4">
          One full analysis uses 11 credits: 1 to read your website and 10 to ask all four assistants. Reading competitor
          websites uses 0 credits. A weekly check uses 10 credits and is only charged when it succeeds. Every price and
          plan limit is public on our <Link href="/plans" className="text-blue-600 underline">pricing page</Link>, and we
          compare ourselves with other tools in{' '}
          <Link href="/blog/ai-visibility-tool-pricing" className="text-blue-600 underline">AI visibility tool pricing</Link>.
        </p>

        <p className="mt-12 text-base text-zinc-500">
          Questions about our method? Email{' '}
          <a href="mailto:support@aibrandtrack.com" className="underline">support@aibrandtrack.com</a>.
        </p>
      </article>
    </main>
  );
}
