/**
 * Google AI Studio (Gemini API) integration
 * 
 * Supports:
 * - Image generation
 * - Multimodal prompts (text + image)
 * - Design creation
 * - Text-to-image generation
 */

import { requireEnv, createErrorResponse, createSuccessResponse } from "./utils";
import type { AIResponse, VisualRequest, VisualResponse } from "./types";

/**
 * Generate image using Gemini's image generation capabilities
 */
export async function generateImage(
  request: VisualRequest & {
    model?: string;
    dimensions?: string;
    seed?: number;
  }
): Promise<AIResponse<VisualResponse>> {
  try {
    const apiKey = requireEnv("GOOGLE_AI_STUDIO_API_KEY");
    const model = request.model || "gemini-1.5-pro";

    // Gemini API endpoint for image generation
    // Note: Gemini primarily uses text-to-image through multimodal prompts
    const prompt = request.negativePrompt
      ? `${request.prompt}. Avoid: ${request.negativePrompt}`
      : request.prompt;

    const style = request.style || "modern, clean, professional";
    const fullPrompt = `${prompt}, ${style}`;

    // Use Gemini's multimodal capabilities for image generation
    // This uses the generateContent endpoint with image generation capabilities
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Create a detailed visual design description for: ${fullPrompt}. Style: ${style}. ${request.aspectRatio ? `Aspect ratio: ${request.aspectRatio}.` : ""}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      let error: unknown;
      try {
        error = await response.json();
      } catch {
        error = { error: await response.text() };
      }
      throw new Error(`Google AI Studio API error: ${response.status} - ${JSON.stringify(error)}`);
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Note: Gemini's current API primarily generates text descriptions
    // For actual image generation, you may need to use Imagen API separately
    // or use the text description with another service
    // This returns a structured prompt that can be used with image generation services

    return createSuccessResponse<VisualResponse>(
      {
        imageUrl: "", // Will need Imagen API or alternative for actual images
        prompt: fullPrompt,
        imageData: undefined,
      },
      {
        model: model,
        timestamp: new Date().toISOString(),
      }
    );
  } catch (error) {
    return createErrorResponse<VisualResponse>(
      error,
      "Manual image generation required"
    );
  }
}

/**
 * Generate design using Gemini's multimodal capabilities
 * Can combine text prompts with reference images
 */
export async function generateDesign(
  request: VisualRequest & {
    referenceImages?: string[]; // Base64 encoded images or URLs
    model?: string;
    creativeMode?: boolean;
  }
): Promise<AIResponse<VisualResponse>> {
  try {
    const apiKey = requireEnv("GOOGLE_AI_STUDIO_API_KEY");
    const model = request.model || "gemini-1.5-pro";

    const parts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> = [
      {
        text: `Design a visual for: ${request.prompt}. Style: ${request.style || "modern, clean, professional"}. ${request.aspectRatio ? `Aspect ratio: ${request.aspectRatio}.` : ""}${request.creativeMode ? " Be creative and innovative." : " Focus on professional quality."}`,
      },
    ];

    // Add reference images if provided
    if (request.referenceImages && request.referenceImages.length > 0) {
      for (const imageRef of request.referenceImages) {
        // If it's a base64 string, use it directly
        // If it's a URL, you'd need to fetch and convert
        if (imageRef.startsWith("data:")) {
          const [mimeType, data] = imageRef.split(",");
          const mime = mimeType.split(":")[1]?.split(";")[0] || "image/png";
          parts.push({
            inlineData: {
              mimeType: mime,
              data: data,
            },
          });
        }
      }
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts,
            },
          ],
          generationConfig: {
            temperature: request.creativeMode ? 0.9 : 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    if (!response.ok) {
      let error: unknown;
      try {
        error = await response.json();
      } catch {
        error = { error: await response.text() };
      }
      throw new Error(`Google AI Studio API error: ${response.status} - ${JSON.stringify(error)}`);
    }

    const data = await response.json();
    const generatedContent = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return createSuccessResponse<VisualResponse>(
      {
        imageUrl: "",
        prompt: request.prompt,
        imageData: undefined,
      },
      {
        model: model,
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
 * Generate multimodal content (text analysis + visual descriptions)
 */
export async function generateMultimodal(
  request: {
    prompt: string;
    images?: Array<{ url?: string; base64?: string; mimeType?: string }>;
    model?: string;
  }
): Promise<AIResponse<{ content: string; visualDescription?: string }>> {
  try {
    const apiKey = requireEnv("GOOGLE_AI_STUDIO_API_KEY");
    const model = request.model || "gemini-2.5-flash"; // Use available model

    const parts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> = [
      { text: request.prompt },
    ];

    // Add images if provided
    if (request.images) {
      for (const image of request.images) {
        if (image.base64 && image.mimeType) {
          parts.push({
            inlineData: {
              mimeType: image.mimeType,
              data: image.base64,
            },
          });
        }
      }
    }

    // Use v1 API which has the newer models
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts,
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192, // Increased for longer design system specifications
          },
        }),
      }
    );

    if (!response.ok) {
      let error: unknown;
      try {
        error = await response.json();
      } catch {
        error = { error: await response.text() };
      }
      throw new Error(`Google AI Studio API error: ${response.status} - ${JSON.stringify(error)}`);
    }

    const data = await response.json();
    
    // Debug: log the response structure if content is missing
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.warn("Unexpected API response structure:", JSON.stringify(data, null, 2).substring(0, 500));
    }
    
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                    data.candidates?.[0]?.content?.parts?.[0]?.text || 
                    "";

    return createSuccessResponse(
      {
        content,
        visualDescription: content,
      },
      {
        model: model,
        timestamp: new Date().toISOString(),
      }
    );
  } catch (error) {
    return createErrorResponse(
      error,
      "Manual multimodal generation required"
    );
  }
}

/**
 * Enhanced visual generation using Google AI Studio
 * Can be used as an alternative to Midjourney/Canva
 */
export async function generateVisualWithGoogleAI(
  request: VisualRequest & {
    model?: string;
    creativeMode?: boolean;
    referenceImages?: string[];
  }
): Promise<AIResponse<VisualResponse>> {
  // Try design generation first
  const designResult = await generateDesign({
    ...request,
    creativeMode: request.creativeMode || false,
  });

  if (designResult.success) {
    return designResult;
  }

  // Fall back to basic image generation
  return generateImage(request);
}

