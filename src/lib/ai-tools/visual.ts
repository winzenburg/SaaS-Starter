/**
 * Visual asset integration (Midjourney/Canva)
 * 
 * Note: Midjourney doesn't have a public API, so this provides:
 * 1. Prompt generation for Midjourney (via Discord or third-party)
 * 2. Canva API integration (when available)
 */

import { requireEnv, createErrorResponse, createSuccessResponse } from "./utils";
import type { AIResponse, VisualRequest, VisualResponse } from "./types";

/**
 * Generate Midjourney prompt
 * Returns a formatted prompt ready for Midjourney
 */
export function generateMidjourneyPrompt(
  request: VisualRequest
): AIResponse<{ prompt: string; negativePrompt?: string }> {
  try {
    const style = request.style || "modern, clean, professional";
    const aspectRatio = request.aspectRatio || "16:9";

    // Format prompt for Midjourney
    const prompt = `${request.prompt}, ${style}, ${aspectRatio} aspect ratio, high quality, detailed --v 6`;

    return createSuccessResponse(
      {
        prompt,
        negativePrompt: request.negativePrompt,
      },
      {
        model: "midjourney",
        timestamp: new Date().toISOString(),
      }
    );
  } catch (error) {
    return createErrorResponse(
      error,
      "Manual prompt generation required"
    );
  }
}

/**
 * Create Canva design
 * Note: Canva API integration requires specific setup
 */
export async function createCanvaDesign(
  request: VisualRequest & { templateId?: string; brandId?: string }
): Promise<AIResponse<VisualResponse>> {
  try {
    const apiKey = requireEnv("CANVA_API_KEY");
    const brandId = request.brandId || process.env.CANVA_BRAND_ID;

    if (!brandId) {
      throw new Error("CANVA_BRAND_ID is required for Canva API");
    }

    // Canva API integration would go here
    // This is a placeholder - actual implementation depends on Canva API structure
    const res = await fetch("https://api.canva.com/rest/v1/designs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        brand_id: brandId,
        template_id: request.templateId,
        prompt: request.prompt,
        style: request.style,
      }),
    });

    if (!res.ok) {
      let error: unknown;
      try {
        error = await res.json();
      } catch {
        error = { error: await res.text() };
      }
      throw new Error(`Canva API error: ${res.status} - ${JSON.stringify(error)}`);
    }

    const data = await res.json();

    return createSuccessResponse<VisualResponse>(
      {
        imageUrl: data.url || data.image_url || "",
        prompt: request.prompt,
      },
      {
        model: "canva",
        timestamp: new Date().toISOString(),
      }
    );
  } catch (error) {
    return createErrorResponse<VisualResponse>(
      error,
      "Manual design creation required"
    );
  }
}

/**
 * Generate visual asset (wrapper that tries Canva first, falls back to Midjourney prompt)
 */
export async function generateVisual(
  request: VisualRequest
): Promise<AIResponse<VisualResponse>> {
  // Try Canva first if available
  if (process.env.CANVA_API_KEY) {
    const canvaResult = await createCanvaDesign(request);
    if (canvaResult.success) {
      return canvaResult;
    }
  }

  // Fall back to Midjourney prompt generation
  const midjourneyResult = generateMidjourneyPrompt(request);
  if (midjourneyResult.success && midjourneyResult.data) {
    return createSuccessResponse<VisualResponse>(
      {
        imageUrl: "", // No actual image, just prompt
        prompt: midjourneyResult.data.prompt,
      },
      midjourneyResult.metadata
    );
  }

  return createErrorResponse<VisualResponse>(
    new Error("Failed to generate visual"),
    "Manual visual creation required"
  );
}

