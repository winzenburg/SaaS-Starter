/**
 * Shared types for AI tool integrations
 */

export interface AIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  fallback?: string;
  metadata?: {
    tokensUsed?: number;
    cost?: number;
    model?: string;
    timestamp: string;
  };
}

export interface RateLimitInfo {
  remaining: number;
  resetAt: Date;
  limit: number;
}

export interface RetryOptions {
  maxRetries?: number;
  backoffMs?: number;
  retryableErrors?: string[];
}

/**
 * Manus.im types
 */
export interface ManusNarrativeRequest {
  product: string;
  niche: string;
  painPoint: string;
  context?: string;
}

export interface ManusPersonaRequest {
  product: string;
  niche: string;
  narrative?: string;
}

export interface ManusCompetitorRequest {
  product: string;
  niche: string;
  competitors?: string[];
}

export interface SourceCitation {
  type: string;
  name: string;
  date: string;
  findings: string;
  url?: string;
}

export interface ManusResponse {
  narrative?: string;
  narrativeSources?: SourceCitation[];
  persona?: {
    name: string;
    role: string;
    identity: string;
    painPoints: string[];
    emotionalDrivers: string[];
    jtbd: string[];
  };
  personaSources?: SourceCitation[];
  competitors?: Array<{
    name: string;
    positioning: string;
    gaps: string[];
    sources?: SourceCitation[];
  }>;
  hooks?: string[];
  pricingExpectations?: string[];
  pricingSources?: SourceCitation[];
  distributionSources?: SourceCitation[];
}

/**
 * OpenAI (ChatGPT) types
 */
export interface ChatGPTRequest {
  prompt: string;
  context?: string;
  systemPrompt?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface ChatGPTResponse {
  content: string;
  reasoning?: string;
  alternatives?: string[];
}

/**
 * Anthropic (Claude) types
 */
export interface ClaudeRequest {
  prompt: string;
  context?: string;
  systemPrompt?: string;
  model?: string;
  maxTokens?: number;
}

export interface ClaudeResponse {
  content: string;
  critique?: string;
  alternatives?: string[];
  risks?: string[];
}

/**
 * ElevenLabs types
 */
export interface ElevenLabsRequest {
  script: string;
  voiceId?: string;
  stability?: number;
  similarityBoost?: number;
  style?: number;
}

export interface ElevenLabsResponse {
  audioUrl: string;
  audioData?: ArrayBuffer;
  duration?: number;
}

/**
 * Visual tools types
 */
export interface VisualRequest {
  prompt: string;
  style?: string;
  aspectRatio?: string;
  negativePrompt?: string;
}

export interface VisualResponse {
  imageUrl: string;
  imageData?: ArrayBuffer;
  prompt?: string;
}

