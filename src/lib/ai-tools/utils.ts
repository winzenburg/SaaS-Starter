/**
 * Shared utilities for AI tool integrations
 */

import type { AIResponse, RetryOptions } from "./types";

/**
 * Exponential backoff retry wrapper
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    backoffMs = 1000,
    retryableErrors = ["rate_limit", "timeout", "network"],
  } = options;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      const errorMessage = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();

      // Check if error is retryable
      const isRetryable = retryableErrors.some((retryable) =>
        errorMessage.includes(retryable)
      );

      if (!isRetryable || attempt === maxRetries) {
        throw error;
      }

      // Exponential backoff
      const delay = backoffMs * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError || new Error("Retry failed");
}

/**
 * Create a standardized error response
 */
export function createErrorResponse<T>(
  error: unknown,
  fallback?: string
): AIResponse<T> {
  const errorMessage =
    error instanceof Error ? error.message : String(error);

  return {
    success: false,
    error: errorMessage,
    fallback,
    metadata: {
      timestamp: new Date().toISOString(),
    },
  };
}

/**
 * Create a standardized success response
 */
export function createSuccessResponse<T>(
  data: T,
  metadata?: AIResponse<T>["metadata"]
): AIResponse<T> {
  return {
    success: true,
    data,
    metadata: {
      ...metadata,
      timestamp: new Date().toISOString(),
    },
  };
}

/**
 * Validate API key exists
 */
export function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

/**
 * Estimate token count (rough approximation)
 */
export function estimateTokens(text: string): number {
  // Rough estimate: ~4 characters per token
  return Math.ceil(text.length / 4);
}

/**
 * Calculate cost estimate (placeholder - implement per service)
 */
export function estimateCost(
  tokens: number,
  model: string,
  _service: "openai" | "anthropic" | "manus" | "elevenlabs"
): number {
  // Placeholder - implement actual pricing per service
  const pricing: Record<string, { input: number; output: number }> = {
    "gpt-4o": { input: 0.0025 / 1000, output: 0.01 / 1000 },
    "claude-3-5-sonnet": { input: 0.003 / 1000, output: 0.015 / 1000 },
  };

  const modelPricing = pricing[model] || { input: 0.001 / 1000, output: 0.002 / 1000 };
  // Rough estimate: 70% input, 30% output
  return tokens * (modelPricing.input * 0.7 + modelPricing.output * 0.3);
}

/**
 * Rate limit tracking (in-memory, simple implementation)
 */
class RateLimiter {
  private limits: Map<string, { count: number; resetAt: Date }> = new Map();

  check(key: string, limit: number, windowMs: number): boolean {
    const now = new Date();
    const record = this.limits.get(key);

    if (!record || now > record.resetAt) {
      this.limits.set(key, {
        count: 1,
        resetAt: new Date(now.getTime() + windowMs),
      });
      return true;
    }

    if (record.count >= limit) {
      return false;
    }

    record.count++;
    return true;
  }

  getResetTime(key: string): Date | null {
    return this.limits.get(key)?.resetAt || null;
  }
}

export const rateLimiter = new RateLimiter();

