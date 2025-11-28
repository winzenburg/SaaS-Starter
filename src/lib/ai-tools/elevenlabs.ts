/**
 * ElevenLabs integration
 * 
 * Used for: Voice content generation (demos, persona interviews, founder intros)
 * API Docs: https://elevenlabs.io/docs
 */

import { requireEnv, withRetry, createErrorResponse, createSuccessResponse } from "./utils";
import type { AIResponse, ElevenLabsRequest, ElevenLabsResponse } from "./types";

const ELEVENLABS_API_URL = "https://api.elevenlabs.io/v1";

/**
 * Generate voice audio from script
 */
export async function generateVoice(
  request: ElevenLabsRequest
): Promise<AIResponse<ElevenLabsResponse>> {
  try {
    const apiKey = requireEnv("ELEVENLABS_API_KEY");
    const voiceId = request.voiceId || process.env.ELEVENLABS_VOICE_ID || "default";

    const response = await withRetry(async () => {
      const res = await fetch(`${ELEVENLABS_API_URL}/text-to-speech/${voiceId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          text: request.script,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: request.stability ?? 0.5,
            similarity_boost: request.similarityBoost ?? 0.75,
            style: request.style ?? 0.0,
          },
        }),
      });

      if (!res.ok) {
        let error: unknown;
        try {
          error = await res.json();
        } catch {
          error = { error: await res.text() };
        }
        throw new Error(`ElevenLabs API error: ${res.status} - ${JSON.stringify(error)}`);
      }

      const audioData = await res.arrayBuffer();
      const contentType = res.headers.get("content-type") || "audio/mpeg";
      return { audioData, contentType };
    });

    // For now, return the audio data
    // In production, you might want to upload to storage and return URL
    const audioUrl = `data:${response.contentType};base64,${Buffer.from(response.audioData).toString("base64")}`;

    return createSuccessResponse<ElevenLabsResponse>(
      {
        audioUrl,
        audioData: response.audioData,
        // Rough duration estimate: ~150 words per minute, ~0.4 seconds per word
        duration: Math.ceil(request.script.split(/\s+/).length * 0.4),
      },
      {
        model: "eleven_multilingual_v2",
        timestamp: new Date().toISOString(),
      }
    );
  } catch (error) {
    return createErrorResponse<ElevenLabsResponse>(
      error,
      "Manual voice generation required"
    );
  }
}

/**
 * Generate persona interview voice
 */
export async function generatePersonaVoice(
  script: string,
  tone: "casual" | "professional" = "professional"
): Promise<AIResponse<ElevenLabsResponse>> {
  return generateVoice({
    script,
    stability: tone === "casual" ? 0.4 : 0.6,
    similarityBoost: 0.8,
    style: tone === "casual" ? 0.3 : 0.0,
  });
}

/**
 * Generate founder intro voice
 */
export async function generateFounderIntro(
  script: string
): Promise<AIResponse<ElevenLabsResponse>> {
  return generateVoice({
    script,
    stability: 0.6,
    similarityBoost: 0.8,
    style: 0.2, // Slightly more expressive for founder intro
  });
}

