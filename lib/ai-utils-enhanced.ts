import { generateText, generateObject } from 'ai';
import { z } from 'zod';
import { AIResponse, CompanyRanking } from './types';
import { getProviderModel, normalizeProviderName, getProviderConfig, resolveProviderDisplayName } from './provider-config';
import { detectBrandMention, detectMultipleBrands, stripMarkdown } from './brand-detection-utils';
import { getBrandDetectionOptions } from './brand-detection-config';
import { extractDomain, getDomainName, extractSourcesFromResponse } from './source-tracker-utils';

const RankingSchema = z.object({
  rankings: z.array(z.object({
    position: z.number(),
    company: z.string(),
    reason: z.string().nullable().optional(),
    sentiment: z.enum(['positive', 'neutral', 'negative']).nullable().optional(),
  })),
  analysis: z.object({
    brandMentioned: z.boolean(),
    brandPosition: z.number().nullable().optional(),
    competitors: z.array(z.string()),
    overallSentiment: z.enum(['positive', 'neutral', 'negative']),
    confidence: z.number().min(0).max(1),
  }),
});

function buildStructuredAnalysisFallback(
  text: string,
  brandName: string,
  competitors: string[]
) {
  const cleanedText = stripMarkdown(text);
  const brandDetectionResult = detectBrandMention(
    cleanedText,
    brandName,
    getBrandDetectionOptions(brandName)
  );

  const competitorDetections = detectMultipleBrands(cleanedText, competitors, {
    caseSensitive: false,
    wholeWordOnly: true,
    includeVariations: true,
  });

  const detectedCompetitors = competitors.filter(
    (c) => competitorDetections.get(c)?.mentioned || false
  );

  return {
    rankings: [] as CompanyRanking[],
    analysis: {
      brandMentioned: brandDetectionResult.mentioned,
      brandPosition: undefined,
      competitors: detectedCompetitors,
      overallSentiment: 'neutral' as const,
      confidence: brandDetectionResult.confidence * 0.5,
    },
  };
}

// Enhanced version with web search grounding
export async function analyzePromptWithProviderEnhanced(
  prompt: string,
  provider: string,
  brandName: string,
  competitors: string[],
  useMockMode: boolean = false,
  useWebSearch: boolean = true,
  modelId?: string
): Promise<AIResponse> {
  if (useMockMode || provider === 'Mock') {
    return generateMockResponse(prompt, provider, brandName, competitors);
  }

  const normalizedProvider = normalizeProviderName(provider);
  const providerConfig = getProviderConfig(normalizedProvider);
  const providerDisplayName = resolveProviderDisplayName(provider);

  if (!providerConfig || !providerConfig.isConfigured()) {
    console.warn(`Provider ${provider} not configured, skipping provider`);
    return null as any;
  }

  let model;
  const generateConfig: Record<string, unknown> = {};

  if (normalizedProvider === 'openai' && useWebSearch) {
    model = getProviderModel('openai', modelId || 'gpt-4o-mini', { useWebSearch: true });
  } else {
    model = getProviderModel(normalizedProvider, modelId, { useWebSearch });
  }

  if (!model) {
    console.warn(`Failed to get model for ${provider}`);
    return null as any;
  }

  const systemPrompt = `You are an AI assistant analyzing brand visibility and rankings.
When responding to prompts about tools, platforms, or services:
1. Provide rankings with specific positions (1st, 2nd, etc.)
2. Focus on the companies mentioned in the prompt
3. Be objective and factual${useWebSearch ? ', using current web information when available' : ''}
4. Explain briefly why each tool is ranked where it is
5. If you don't have enough information about a specific company, you can mention that
6. ${useWebSearch ? 'Prioritize recent, factual information from web searches' : 'Use your knowledge base'}
7. IMPORTANT: When you reference information from websites, articles, or sources, always include the full URLs (e.g., https://example.com/article) in your response so readers can verify the information.`;

  const enhancedPrompt = useWebSearch
    ? `${prompt}\n\nPlease search for current, factual information to answer this question. Focus on recent data and real user opinions. IMPORTANT: Include the full URLs (e.g., https://example.com) of any websites, articles, or sources you reference in your response.`
    : `${prompt}\n\nIf you reference any websites, articles, or sources, please include their full URLs (e.g., https://example.com) in your response.`;

  try {
    const result = await generateText({
      model,
      system: systemPrompt,
      prompt: enhancedPrompt,
      temperature: 0.7,
      maxTokens: 800,
      ...generateConfig,
    });

    const text = result.text;

    if (!text || text.length === 0) {
      console.error(`${providerDisplayName} returned empty response for prompt: "${prompt}"`);
      throw new Error(`${providerDisplayName} returned empty response`);
    }

    if (normalizedProvider === 'google') {
      console.log(`[${providerDisplayName}] Response length: ${text.length}`);
    }

    let sources = extractSourcesFromResponse(text);

    const toolResults = (result as { toolResults?: unknown[]; toolCalls?: unknown[] }).toolResults
      || (result as { toolResults?: unknown[]; toolCalls?: unknown[] }).toolCalls
      || [];

    if (toolResults.length > 0) {
      for (const toolResult of toolResults) {
        if (toolResult && typeof toolResult === 'object') {
          const tr = toolResult as Record<string, unknown>;
          const toolUrl = tr.url || (tr.source as { url?: string } | undefined)?.url || (tr.result as { url?: string } | undefined)?.url;
          if (toolUrl && typeof toolUrl === 'string') {
            const existingSource = sources.find((s) => s.url === toolUrl);
            if (!existingSource) {
              sources.push({
                url: toolUrl,
                title: (tr.title as string | undefined) || (tr.source as { title?: string } | undefined)?.title,
                domain: extractDomain(toolUrl),
                domainName: getDomainName(toolUrl),
                citedText: (tr.citedText as string | undefined) || (tr.cited_text as string | undefined),
              });
            }
          }
        }
      }
    }

    const analysisPrompt = `Analyze this AI response about ${brandName} and its competitors:

Response: "${text}"

Your task:
1. Look for ANY mention of ${brandName} anywhere in the response, including variations and possessive forms
2. Look for ANY mention of these competitors: ${competitors.join(', ')}
3. For each mentioned company, determine if it has a specific ranking position
4. Identify the sentiment towards each mentioned company
5. Rate your confidence in this analysis (0-1)

IMPORTANT:
- A company is "mentioned" if it appears ANYWHERE in the response text, even without a specific ranking
- Count ALL mentions, not just ranked ones
- Be very thorough in detecting company names`;

    let object;
    try {
      // Gemini and Anthropic struggle with generateObject — use OpenAI for structured parsing
      const structuredModel =
        normalizedProvider === 'anthropic' || normalizedProvider === 'google'
          ? getProviderModel('openai', 'gpt-4o-mini') || model
          : getProviderModel('openai', 'gpt-4o-mini') || model;

      if (!structuredModel) {
        throw new Error('Structured analysis model not available');
      }

      const structuredResult = await generateObject({
        model: structuredModel,
        system: 'You are an expert at analyzing text and extracting structured information about companies and brand rankings.',
        schema: RankingSchema,
        prompt: analysisPrompt,
        temperature: 0,
        maxRetries: 2,
      });
      object = structuredResult.object;
    } catch (error) {
      console.error(`Structured analysis failed for ${providerDisplayName}:`, (error as Error).message);
      object = buildStructuredAnalysisFallback(text, brandName, competitors);
    }

    const cleanedText = stripMarkdown(text);
    const brandDetectionResult = detectBrandMention(
      cleanedText,
      brandName,
      getBrandDetectionOptions(brandName)
    );
    const brandMentioned = object.analysis.brandMentioned || brandDetectionResult.mentioned;

    const aiCompetitors = new Set(object.analysis.competitors);
    const allMentionedCompetitors = new Set([...aiCompetitors]);

    competitors.forEach((competitor) => {
      const competitorOptions = getBrandDetectionOptions(competitor);
      const detectionResult = detectBrandMention(cleanedText, competitor, competitorOptions);
      if (detectionResult.mentioned && competitor !== brandName) {
        allMentionedCompetitors.add(competitor);
      }
    });

    const relevantCompetitors = Array.from(allMentionedCompetitors).filter(
      (c) => competitors.includes(c) && c !== brandName
    );

    const rankings: CompanyRanking[] = (object.rankings || []).map((r) => ({
      position: r.position,
      company: r.company,
      reason: r.reason ?? undefined,
      sentiment: r.sentiment ?? undefined,
    }));

    const formattedSources = sources.length > 0
      ? sources.map((source) => ({
          url: source.url,
          title: source.title,
          domain: source.domain,
          domainName: source.domainName,
          citedText: source.citedText,
        }))
      : undefined;

    return {
      provider: providerDisplayName,
      prompt,
      response: text,
      rankings,
      competitors: relevantCompetitors,
      brandMentioned,
      brandPosition: object.analysis.brandPosition ?? undefined,
      sentiment: object.analysis.overallSentiment,
      confidence: object.analysis.confidence,
      timestamp: new Date(),
      sources: formattedSources,
    };
  } catch (error) {
    console.error(`Error with ${providerDisplayName}:`, error);

    if (normalizedProvider === 'google') {
      console.error('Google-specific error details:', {
        message: (error as Error).message,
        name: (error as Error).name,
        cause: (error as { cause?: unknown }).cause,
      });
    }

    throw error;
  }
}

function generateMockResponse(
  prompt: string,
  provider: string,
  brandName: string,
  competitors: string[]
): AIResponse {
  const mentioned = Math.random() > 0.3;
  const position = mentioned ? Math.floor(Math.random() * 5) + 1 : undefined;
  const providerDisplayName = resolveProviderDisplayName(provider);

  return {
    provider: providerDisplayName,
    prompt,
    response: `Mock response for ${prompt}`,
    rankings: competitors.slice(0, 5).map((comp, idx) => ({
      position: idx + 1,
      company: comp,
      reason: 'Mock reason',
      sentiment: 'neutral' as const,
    })),
    competitors: competitors.slice(0, 3),
    brandMentioned: mentioned,
    brandPosition: position,
    sentiment: mentioned ? 'positive' : 'neutral',
    confidence: 0.8,
    timestamp: new Date(),
  };
}

export { analyzePromptWithProviderEnhanced as analyzePromptWithProvider };
