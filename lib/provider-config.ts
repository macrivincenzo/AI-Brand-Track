/**
 * Centralized AI Provider Configuration
 * This file serves as the single source of truth for all AI provider configurations
 * 
 * To enable/disable providers:
 * 1. Update PROVIDER_ENABLED_CONFIG below
 * 2. Set to true to enable a provider, false to disable it
 * 3. Even if enabled, providers still require valid API keys to function
 * 
 * Provider availability is determined by:
 * - enabled: true in PROVIDER_ENABLED_CONFIG
 * - Valid API key in environment variables
 */

import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';
import { perplexity } from '@ai-sdk/perplexity';
import { LanguageModelV1 } from 'ai';

export interface ProviderModel {
  id: string;
  name: string;
  maxTokens?: number;
  supportsFunctionCalling?: boolean;
  supportsStructuredOutput?: boolean;
  supportsWebSearch?: boolean;
}

export interface ProviderCapabilities {
  webSearch: boolean;
  functionCalling: boolean;
  structuredOutput: boolean;
  streamingResponse: boolean;
  maxRequestsPerMinute?: number;
}

export interface ProviderConfig {
  id: string;
  name: string;
  icon: string;
  envKey: string;
  models: ProviderModel[];
  defaultModel: string;
  /**
   * Ordered model fallback chain (single source of truth). The analysis pipeline
   * tries these in order and advances to the next ONLY when a model is retired
   * (404 / NOT_FOUND / "no longer available"). Swapping a retired model is a
   * one-line edit here. The first entry should match defaultModel.
   */
  fallbackModels?: string[];
  capabilities: ProviderCapabilities;
  getModel: (modelId?: string, options?: any) => LanguageModelV1 | null;
  isConfigured: () => boolean;
  enabled: boolean; // New field to control provider availability
}

/**
 * Provider Enable/Disable Configuration
 * Set to true to enable a provider, false to disable it
 * Even if enabled, the provider must have a valid API key to be used
 */
export const PROVIDER_ENABLED_CONFIG: Record<string, boolean> = {
  openai: true,      // OpenAI is enabled
  anthropic: true,   // Anthropic is enabled
  google: true,      // Google Gemini is enabled
  perplexity: true,  // Perplexity is enabled
};

/**
 * Provider Configuration Registry
 * Add new providers here to make them available throughout the system
 */
export const PROVIDER_CONFIGS: Record<string, ProviderConfig> = {
  openai: {
    id: 'openai',
    name: 'OpenAI',
    icon: '🤖',
    envKey: 'OPENAI_API_KEY',
    enabled: PROVIDER_ENABLED_CONFIG.openai,
    models: [
      {
        id: 'gpt-4o',
        name: 'GPT-4 Optimized',
        maxTokens: 128000,
        supportsFunctionCalling: true,
        supportsStructuredOutput: true,
        supportsWebSearch: false,
      },
      {
        id: 'gpt-4o-mini',
        name: 'GPT-4 Mini',
        maxTokens: 128000,
        supportsFunctionCalling: true,
        supportsStructuredOutput: true,
        supportsWebSearch: true, // Via responses API
      },
      {
        id: 'gpt-4-turbo',
        name: 'GPT-4 Turbo',
        maxTokens: 128000,
        supportsFunctionCalling: true,
        supportsStructuredOutput: true,
        supportsWebSearch: false,
      },
    ],
    defaultModel: 'gpt-4o',
    fallbackModels: ['gpt-4o', 'gpt-4o-mini'],
    capabilities: {
      webSearch: true, // Via responses API with specific models
      functionCalling: true,
      structuredOutput: true,
      streamingResponse: true,
      maxRequestsPerMinute: 500,
    },
    getModel: (modelId?: string, options?: any) => {
      if (!process.env.OPENAI_API_KEY) return null;
      const model = modelId || PROVIDER_CONFIGS.openai.defaultModel;
      
      // Use responses API for web search if requested
      if (options?.useWebSearch && model === 'gpt-4o-mini') {
        return openai.responses(model);
      }
      
      return openai(model);
    },
    isConfigured: () => !!process.env.OPENAI_API_KEY,
  },

  anthropic: {
    id: 'anthropic',
    name: 'Anthropic',
    icon: '🧠',
    envKey: 'ANTHROPIC_API_KEY',
    enabled: PROVIDER_ENABLED_CONFIG.anthropic,
    models: [
      {
        id: 'claude-4-sonnet-20250514',
        name: 'Claude 4 Sonnet',
        maxTokens: 200000,
        supportsFunctionCalling: true,
        supportsStructuredOutput: true,
        supportsWebSearch: false,
      },
      {
        id: 'claude-3-5-sonnet-20241022',
        name: 'Claude 3.5 Sonnet',
        maxTokens: 200000,
        supportsFunctionCalling: true,
        supportsStructuredOutput: true,
        supportsWebSearch: false,
      },
      {
        id: 'claude-3-opus-20240229',
        name: 'Claude 3 Opus',
        maxTokens: 200000,
        supportsFunctionCalling: true,
        supportsStructuredOutput: true,
        supportsWebSearch: false,
      },
    ],
    defaultModel: 'claude-4-sonnet-20250514',
    fallbackModels: ['claude-4-sonnet-20250514', 'claude-3-5-sonnet-20241022'],
    capabilities: {
      webSearch: false,
      functionCalling: true,
      structuredOutput: true,
      streamingResponse: true,
      maxRequestsPerMinute: 50,
    },
    getModel: (modelId?: string) => {
      if (!process.env.ANTHROPIC_API_KEY) return null;
      return anthropic(modelId || PROVIDER_CONFIGS.anthropic.defaultModel);
    },
    isConfigured: () => !!process.env.ANTHROPIC_API_KEY,
  },

  google: {
    id: 'google',
    name: 'Google',
    icon: '🌟',
    envKey: 'GOOGLE_GENERATIVE_AI_API_KEY',
    enabled: PROVIDER_ENABLED_CONFIG.google,
    models: [
      {
        id: 'gemini-2.5-flash',
        name: 'Gemini 2.5 Flash',
        maxTokens: 1000000,
        supportsFunctionCalling: true,
        supportsStructuredOutput: true,
        supportsWebSearch: true,
      },
      {
        id: 'gemini-2.5-pro',
        name: 'Gemini 2.5 Pro',
        maxTokens: 1000000,
        supportsFunctionCalling: true,
        supportsStructuredOutput: true,
        supportsWebSearch: true,
      },
    ],
    defaultModel: 'gemini-2.5-flash',
    fallbackModels: ['gemini-2.5-flash', 'gemini-2.5-flash-lite'],
    capabilities: {
      webSearch: true, // Native search grounding
      functionCalling: true,
      structuredOutput: true,
      streamingResponse: true,
      maxRequestsPerMinute: 60,
    },
    getModel: (modelId?: string, options?: any) => {
      if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) return null;
      return google(modelId || PROVIDER_CONFIGS.google.defaultModel, {
        useSearchGrounding: options?.useWebSearch || false,
      });
    },
    isConfigured: () => !!process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  },

  perplexity: {
    id: 'perplexity',
    name: 'Perplexity',
    icon: '🔍',
    envKey: 'PERPLEXITY_API_KEY',
    enabled: PROVIDER_ENABLED_CONFIG.perplexity,
    models: [
      {
        id: 'sonar-pro',
        name: 'Sonar Pro',
        maxTokens: 127000,
        supportsFunctionCalling: false,
        supportsStructuredOutput: false,
        supportsWebSearch: true, // Built-in web search
      },
      {
        id: 'sonar',
        name: 'Sonar',
        maxTokens: 127000,
        supportsFunctionCalling: false,
        supportsStructuredOutput: false,
        supportsWebSearch: true,
      },
    ],
    defaultModel: 'sonar-pro',
    fallbackModels: ['sonar-pro', 'sonar'],
    capabilities: {
      webSearch: true, // All models have built-in web search
      functionCalling: false,
      structuredOutput: false,
      streamingResponse: true,
      maxRequestsPerMinute: 20,
    },
    getModel: (modelId?: string) => {
      if (!process.env.PERPLEXITY_API_KEY) return null;
      return perplexity(modelId || PROVIDER_CONFIGS.perplexity.defaultModel);
    },
    isConfigured: () => !!process.env.PERPLEXITY_API_KEY,
  },
};

/**
 * Get all configured providers (must be both enabled and have API key)
 */
export function getConfiguredProviders(): ProviderConfig[] {
  return Object.values(PROVIDER_CONFIGS).filter(provider => provider.enabled && provider.isConfigured());
}

/**
 * Get providers that support a specific capability
 */
export function getProvidersWithCapability(capability: keyof ProviderCapabilities): ProviderConfig[] {
  return Object.values(PROVIDER_CONFIGS).filter(
    provider => provider.enabled && provider.isConfigured() && provider.capabilities[capability]
  );
}

/**
 * Get a specific provider configuration
 */
export function getProviderConfig(providerId: string): ProviderConfig | undefined {
  return PROVIDER_CONFIGS[providerId.toLowerCase()];
}

/**
 * Check if a provider is configured and enabled
 */
export function isProviderConfigured(providerId: string): boolean {
  const provider = getProviderConfig(providerId);
  return (provider?.enabled && provider?.isConfigured()) || false;
}

/**
 * Get provider model instance
 */
export function getProviderModel(
  providerId: string,
  modelId?: string,
  options?: any
): LanguageModelV1 | null {
  const provider = getProviderConfig(providerId);
  if (!provider || !provider.enabled || !provider.isConfigured()) {
    return null;
  }
  return provider.getModel(modelId, options);
}

/**
 * Get the ordered model fallback chain for a provider (single source of truth).
 * Falls back to [defaultModel] when no explicit chain is configured. Accepts a
 * provider id or display name (case-insensitive).
 */
export function getModelChain(providerId: string): string[] {
  const provider = getProviderConfig(providerId);
  if (!provider) return [];
  return provider.fallbackModels && provider.fallbackModels.length > 0
    ? provider.fallbackModels
    : [provider.defaultModel];
}

/**
 * Get provider display info for UI
 */
export function getProviderDisplayInfo(providerId: string): { name: string; icon: string } | null {
  const provider = getProviderConfig(providerId);
  if (!provider) return null;
  return {
    name: provider.name,
    icon: provider.icon,
  };
}

/**
 * Provider name mapping for backward compatibility
 */
export const PROVIDER_NAME_MAP: Record<string, string> = {
  'OpenAI': 'openai',
  'Anthropic': 'anthropic',
  'Google': 'google',
  'Perplexity': 'perplexity',
  // Add more mappings as needed
};

/**
 * Normalize provider name for consistency
 */
export function normalizeProviderName(name: string): string {
  return PROVIDER_NAME_MAP[name] || name.toLowerCase();
}

/**
 * Resolve any provider label to the canonical display name used in the UI and matrix (e.g. "google" → "Google").
 */
export function resolveProviderDisplayName(provider: string): string {
  const trimmed = (provider || '').trim();
  if (!trimmed) return trimmed;

  const normalized = normalizeProviderName(trimmed);
  const config = getProviderConfig(normalized);
  if (config) return config.name;

  for (const p of Object.values(PROVIDER_CONFIGS)) {
    if (p.name.toLowerCase() === trimmed.toLowerCase()) return p.name;
    if (p.id.toLowerCase() === trimmed.toLowerCase()) return p.name;
  }

  const aliases: Record<string, string> = {
    gemini: 'Google',
    'google gemini': 'Google',
    chatgpt: 'OpenAI',
    gpt: 'OpenAI',
    claude: 'Anthropic',
  };
  const aliasMatch = aliases[trimmed.toLowerCase()];
  if (aliasMatch) return aliasMatch;

  return trimmed;
}

/**
 * Check if a provider is enabled (regardless of API key configuration)
 */
export function isProviderEnabled(providerId: string): boolean {
  const provider = getProviderConfig(providerId);
  return provider?.enabled || false;
}

/**
 * Get all enabled providers (may or may not have API keys)
 */
export function getEnabledProviders(): ProviderConfig[] {
  return Object.values(PROVIDER_CONFIGS).filter(provider => provider.enabled);
}