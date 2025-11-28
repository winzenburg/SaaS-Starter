/**
 * OpenAI (ChatGPT) integration
 * 
 * Used for: Reasoning, refinement, clustering, ideation
 * API Docs: https://platform.openai.com/docs
 */

import { requireEnv, withRetry, createErrorResponse, createSuccessResponse, estimateTokens, estimateCost } from "./utils";
import type { AIResponse, ChatGPTRequest, ChatGPTResponse } from "./types";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

/**
 * Reason about a problem or question
 */
export async function reason(
  request: ChatGPTRequest
): Promise<AIResponse<ChatGPTResponse>> {
  try {
    const apiKey = requireEnv("OPENAI_API_KEY");
    // Use latest models: gpt-4o (latest), gpt-4-turbo, or gpt-4
    const model = request.model || process.env.OPENAI_MODEL || "gpt-4o";

    const messages = [
      ...(request.systemPrompt
        ? [{ role: "system" as const, content: request.systemPrompt }]
        : []),
      {
        role: "user" as const,
        content: request.context
          ? `${request.prompt}\n\nContext: ${request.context}`
          : request.prompt,
      },
    ];

    const response = await withRetry(async () => {
      const res = await fetch(OPENAI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: request.temperature ?? 0.7,
          max_tokens: request.maxTokens ?? 2000,
        }),
      });

      if (!res.ok) {
        let error: unknown;
        try {
          error = await res.json();
        } catch {
          error = { error: await res.text() };
        }
        throw new Error(`OpenAI API error: ${res.status} - ${JSON.stringify(error)}`);
      }

      return await res.json();
    });

    const content = response.choices[0]?.message?.content || "";
    const tokensUsed = response.usage?.total_tokens || estimateTokens(request.prompt);
    const cost = estimateCost(tokensUsed, model, "openai");

    return createSuccessResponse<ChatGPTResponse>(
      {
        content,
        reasoning: content, // ChatGPT includes reasoning in response
      },
      {
        tokensUsed,
        cost,
        model,
        timestamp: new Date().toISOString(),
      }
    );
  } catch (error) {
    return createErrorResponse<ChatGPTResponse>(
      error,
      "Manual reasoning required"
    );
  }
}

/**
 * Refine and improve content
 */
export async function refine(
  request: ChatGPTRequest
): Promise<AIResponse<ChatGPTResponse>> {
  const systemPrompt =
    request.systemPrompt ||
    "You are an expert editor and strategist. Refine the given content to be clearer, more compelling, and more actionable.";

  return reason({
    ...request,
    systemPrompt,
    temperature: request.temperature ?? 0.5, // Lower temperature for refinement
  });
}

/**
 * Cluster and categorize items
 */
export async function cluster(
  items: string[],
  context?: string
): Promise<AIResponse<{ clusters: Array<{ name: string; items: string[] }> }>> {
  const prompt = `Cluster and categorize these items into logical groups:\n\n${items.map((item, i) => `${i + 1}. ${item}`).join("\n")}\n\nReturn a JSON object with clusters array, each cluster having a "name" and "items" array.`;

  const response = await reason({
    prompt,
    context,
    systemPrompt: "You are a data analyst. Return only valid JSON.",
    temperature: 0.3,
  });

  if (!response.success || !response.data) {
    return createErrorResponse<{ clusters: Array<{ name: string; items: string[] }> }>(
      new Error("Clustering failed"),
      "Manual clustering required"
    );
  }

  try {
    const parsed = JSON.parse(response.data.content);
    return createSuccessResponse(parsed, response.metadata);
  } catch {
    return createErrorResponse(
      new Error("Failed to parse cluster response"),
      "Manual clustering required"
    );
  }
}

/**
 * Generate multiple ideas/variants
 */
export async function ideate(
  request: ChatGPTRequest,
  count: number = 5
): Promise<AIResponse<{ ideas: string[] }>> {
  const prompt = `${request.prompt}\n\nGenerate ${count} distinct ideas or variants. Return as a JSON array of strings.`;

  const response = await reason({
    prompt,
    context: request.context,
    systemPrompt: "You are a creative strategist. Return only valid JSON array.",
    temperature: request.temperature ?? 0.9, // Higher temperature for creativity
  });

  if (!response.success || !response.data) {
    return createErrorResponse<{ ideas: string[] }>(
      new Error("Ideation failed"),
      "Manual ideation required"
    );
  }

  try {
    const parsed = JSON.parse(response.data.content);
    return createSuccessResponse(
      { ideas: Array.isArray(parsed) ? parsed : [parsed] },
      response.metadata
    );
  } catch {
    return createErrorResponse(
      new Error("Failed to parse ideation response"),
      "Manual ideation required"
    );
  }
}

