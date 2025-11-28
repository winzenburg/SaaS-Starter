/**
 * Anthropic Claude integration
 * 
 * Used for: Red-team critique, depth analysis, editorial polish
 * API Docs: https://docs.anthropic.com/claude/reference
 */

import { requireEnv, withRetry, createErrorResponse, createSuccessResponse, estimateTokens, estimateCost } from "./utils";
import type { AIResponse } from "./types";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";

export interface ClaudeRequest {
  prompt: string;
  systemPrompt?: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface ClaudeResponse {
  content: string;
  reasoning?: string;
}

/**
 * Perform red-team critique or deep analysis using Claude
 */
export async function critique(
  request: ClaudeRequest
): Promise<AIResponse<ClaudeResponse>> {
  const apiKey = requireEnv("ANTHROPIC_API_KEY");
  // Use claude-3-opus-20240229 (most reliable), with fallback to claude-3-sonnet-20240229
  // Note: claude-3-5-sonnet-20241022 may not be available via API yet
  let model = request.model || process.env.CLAUDE_MODEL || "claude-3-opus-20240229";
  
  try {

    const response = await withRetry(async () => {
      const res = await fetch(ANTHROPIC_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model,
          max_tokens: request.maxTokens ?? 4000,
          temperature: request.temperature ?? 0.7,
          system: request.systemPrompt || "You are a red-team strategist. Be critical, find blindspots, challenge assumptions. Your job is to stress-test analysis and find weaknesses before they become problems.",
          messages: [
            {
              role: "user",
              content: request.prompt,
            },
          ],
        }),
      });

      if (!res.ok) {
        let error: unknown;
        try {
          error = await res.json();
        } catch {
          error = { error: await res.text() };
        }
        throw new Error(`Anthropic API error: ${res.status} - ${JSON.stringify(error)}`);
      }

      return await res.json();
    });

    // Claude API returns content as an array of content blocks
    const contentBlocks = response.content || [];
    const content = contentBlocks
      .map((block: { type: string; text?: string }) => block.text || "")
      .join("\n\n") || "";
    
    const inputTokens = response.usage?.input_tokens || 0;
    const outputTokens = response.usage?.output_tokens || 0;
    const tokensUsed = inputTokens + outputTokens || estimateTokens(request.prompt);
    const cost = estimateCost(tokensUsed, model, "anthropic");

    return createSuccessResponse<ClaudeResponse>(
      {
        content,
        reasoning: content, // Claude includes reasoning in response
      },
      {
        tokensUsed,
        cost,
        model,
        timestamp: new Date().toISOString(),
      }
    );
  } catch (error) {
    // If model not found, try fallback models in order
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes("not_found_error")) {
      // Try fallback models in order
      if (model.includes("claude-3-opus")) {
        console.warn("⚠️  claude-3-opus-20240229 not available, trying claude-3-sonnet-20240229");
        return critique({
          ...request,
          model: "claude-3-sonnet-20240229",
        });
      } else if (model.includes("claude-3-sonnet") && !model.includes("claude-3-5")) {
        console.warn("⚠️  claude-3-sonnet-20240229 not available, trying claude-3-haiku-20240307");
        return critique({
          ...request,
          model: "claude-3-haiku-20240307",
        });
      }
    }
    
    return createErrorResponse<ClaudeResponse>(
      error,
      "Manual critique required"
    );
  }
}

/**
 * Perform editorial polish using Claude
 */
export async function polish(
  request: ClaudeRequest
): Promise<AIResponse<ClaudeResponse>> {
  const systemPrompt =
    request.systemPrompt ||
    "You are an expert editor. Polish the given content to be clearer, more compelling, and more professional while maintaining the original intent and voice.";

  return critique({
    ...request,
    systemPrompt,
    temperature: request.temperature ?? 0.3, // Lower temperature for polish
  });
}
