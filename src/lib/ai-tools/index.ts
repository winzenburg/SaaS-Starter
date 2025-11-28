/**
 * AI Tools Integration Library
 * 
 * Centralized exports for all AI tool integrations
 */

// Manus.im
export {
  generateNarrative,
  createPersona,
  analyzeCompetitors,
  extractPainLanguage,
  extractJTBD,
} from "./manus";

// OpenAI (ChatGPT)
export { reason, refine, cluster, ideate } from "./chatgpt";

// Anthropic (Claude)
export { analyze, redTeam, auditConsistency } from "./claude";

// ElevenLabs
export {
  generateVoice,
  generatePersonaVoice,
  generateFounderIntro,
} from "./elevenlabs";

// Visual tools
export {
  generateVisual,
  generateMidjourneyPrompt,
  createCanvaDesign,
} from "./visual";

// Types
export type {
  AIResponse,
  ManusNarrativeRequest,
  ManusPersonaRequest,
  ManusCompetitorRequest,
  ManusResponse,
  ChatGPTRequest,
  ChatGPTResponse,
  ClaudeRequest,
  ClaudeResponse,
  ElevenLabsRequest,
  ElevenLabsResponse,
  VisualRequest,
  VisualResponse,
} from "./types";

// Utils
export {
  withRetry,
  createErrorResponse,
  createSuccessResponse,
  requireEnv,
  estimateTokens,
  estimateCost,
  rateLimiter,
} from "./utils";

