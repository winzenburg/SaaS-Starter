/**
 * Manus.im integration
 * 
 * Used for: Narrative generation, competitor analysis, persona creation
 * API Docs: https://manus.im/docs
 */

import { requireEnv, createErrorResponse, createSuccessResponse } from "./utils";
import type {
  AIResponse,
  ManusNarrativeRequest,
  ManusPersonaRequest,
  ManusCompetitorRequest,
  ManusResponse,
} from "./types";

const MANUS_API_URL = process.env.MANUS_API_URL || "https://api.manus.ai/v1";

/**
 * Create a Manus AI task
 */
async function createManusTask(
  prompt: string,
  mode: "speed" | "quality" = "speed"
): Promise<{ task_id: string; task_title?: string; task_url?: string }> {
  const apiKey = requireEnv("MANUS_API_KEY");

  const res = await fetch(`${MANUS_API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      API_KEY: apiKey,
    },
    body: JSON.stringify({
      prompt,
      mode,
    }),
  });

  if (!res.ok) {
    let errorMessage = `Manus API error: ${res.status}`;
    try {
      const errorBody = await res.json();
      errorMessage = errorBody.message || errorBody.error || errorMessage;
      if (errorBody.details) {
        errorMessage += ` - ${JSON.stringify(errorBody.details)}`;
      }
    } catch {
      const errorText = await res.text();
      errorMessage = errorText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  const response = await res.json();
  
  // Validate response structure
  if (!response.task_id) {
    throw new Error("Manus API response missing task_id");
  }
  
  return response;
}

/**
 * Get task result (poll until complete)
 */
async function getTaskResult(
  taskId: string,
  maxWaitMs: number = 600000 // Increased to 10 minutes
): Promise<{ result?: string; status: string }> {
  const apiKey = requireEnv("MANUS_API_KEY");
  const startTime = Date.now();
  
  // Wait a moment after task creation before first poll
  await new Promise((resolve) => setTimeout(resolve, 2000));

  while (Date.now() - startTime < maxWaitMs) {
    const res = await fetch(`${MANUS_API_URL}/tasks/${taskId}`, {
      headers: {
        accept: "application/json",
        API_KEY: apiKey,
      },
    });

    if (!res.ok) {
      // If 404, the task might not be ready yet - continue polling
      if (res.status === 404) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        continue;
      }
      
      let errorMessage = `Manus API error: ${res.status}`;
      try {
        const errorBody = await res.json();
        errorMessage = errorBody.message || errorBody.error || errorMessage;
        if (errorBody.details) {
          errorMessage += ` - ${JSON.stringify(errorBody.details)}`;
        }
      } catch {
        const errorText = await res.text();
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const task = await res.json();

    if (task.status === "completed") {
      // Extract result from output array
      // The result is in the last assistant message's content
      let resultText = "";
      if (task.output && Array.isArray(task.output)) {
        // Find the last assistant message with content
        const assistantMessages = task.output
          .filter((msg: any) => msg.role === "assistant" && msg.content)
          .reverse();
        
        if (assistantMessages.length > 0) {
          const lastMessage = assistantMessages[0];
          if (lastMessage.content && Array.isArray(lastMessage.content)) {
            const textContent = lastMessage.content.find(
              (c: any) => c.type === "output_text" && c.text
            );
            if (textContent) {
              resultText = textContent.text;
            }
          }
        }
      }
      
      // If no text found, return the full output as JSON
      if (!resultText && task.output) {
        resultText = JSON.stringify(task.output, null, 2);
      }
      
      return { result: resultText || "Task completed but no output found", status: task.status };
    }

    if (task.status === "failed") {
      throw new Error(`Manus task failed: ${task.error || "Unknown error"}`);
    }

    // Wait 5 seconds before polling again (tasks can take time, especially "quality" mode)
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  throw new Error(`Manus task timeout - task did not complete in ${maxWaitMs / 1000} seconds`);
}

/**
 * Generate narrative for a product/niche
 */
export async function generateNarrative(
  request: ManusNarrativeRequest
): Promise<AIResponse<ManusResponse>> {
  try {
    const prompt = `Generate a discovery pack for: ${request.product}

Target niche: ${request.niche}
Initial JTBD: ${request.painPoint}
Description: ${request.context || request.product}

Provide:
1. Niche narrative (culture, vocabulary, identity, geography, income, communities, trends)
2. Pain language dictionary (complaints, frustrations, unmet needs, direct quotes, "I wish..." statements)
3. JTBD seeds (functional jobs, emotional jobs, social jobs, triggers, success criteria)
4. Competitor landscape and gaps (positioning, narratives, differentiation opportunities)
5. Pricing expectations (what buyers expect to pay, willingness to pay signals)
6. Distribution hooks and entry points (how to reach this niche, trust signals, community entry points)`;

    // Create task (use "speed" mode to conserve credits)
    const task = await createManusTask(prompt, "speed");

    // Wait for completion
    const result = await getTaskResult(task.task_id);

    if (!result.result) {
      throw new Error("Manus task completed but no result returned");
    }

    // Parse the result (assuming it's JSON or structured text)
    let narrativeData: ManusResponse;
    try {
      narrativeData = JSON.parse(result.result);
    } catch {
      // If not JSON, wrap it in a narrative field
      narrativeData = {
        narrative: result.result,
      };
    }

    return createSuccessResponse<ManusResponse>(narrativeData, {
      model: "manus-narrative",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return createErrorResponse<ManusResponse>(
      error,
      "Manual narrative generation required"
    );
  }
}

/**
 * Create persona from product/niche
 */
export async function createPersona(
  request: ManusPersonaRequest
): Promise<AIResponse<ManusResponse>> {
  try {
    const prompt = `Create a detailed persona for: ${request.product}

Target niche: ${request.niche}
${request.narrative ? `Context from narrative: ${request.narrative}` : ""}

Provide:
1. Persona name and role
2. Identity and psychographics
3. Pain points and frustrations
4. Emotional drivers and motivations
5. Job-to-be-Done (functional, emotional, social jobs)
6. Triggers and success criteria
7. Language patterns and terminology used by this persona`;

    // Create task (use "speed" mode to conserve credits)
    const task = await createManusTask(prompt, "speed");

    // Wait for completion
    const result = await getTaskResult(task.task_id);

    if (!result.result) {
      throw new Error("Manus task completed but no result returned");
    }

    // Parse the result
    let personaData: ManusResponse;
    try {
      const parsed = JSON.parse(result.result);
      personaData = {
        persona: parsed.persona || {
          name: parsed.name || "Target User",
          role: parsed.role || request.niche,
          identity: parsed.identity || "",
          painPoints: parsed.painPoints || [],
          emotionalDrivers: parsed.emotionalDrivers || [],
          jtbd: parsed.jtbd || [],
        },
      };
    } catch {
      // If not JSON, create a basic persona structure
      personaData = {
        persona: {
          name: "Target User",
          role: request.niche,
          identity: result.result,
          painPoints: [],
          emotionalDrivers: [],
          jtbd: [],
        },
      };
    }

    return createSuccessResponse<ManusResponse>(personaData, {
      model: "manus-persona",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return createErrorResponse<ManusResponse>(
      error,
      "Manual persona creation required"
    );
  }
}

/**
 * Analyze competitors
 */
export async function analyzeCompetitors(
  request: ManusCompetitorRequest
): Promise<AIResponse<ManusResponse>> {
  try {
    const prompt = `Analyze competitors for: ${request.product}

Target niche: ${request.niche}
${request.competitors && request.competitors.length > 0 
  ? `Known competitors: ${request.competitors.join(", ")}` 
  : ""}

Provide:
1. Competitor landscape (who are the main players in this space)
2. Positioning analysis (how each competitor positions themselves)
3. Gaps and opportunities (where competitors fall short)
4. Differentiation opportunities (how to stand out)
5. Pricing analysis (what competitors charge and why)`;

    // Create task (use "speed" mode to conserve credits)
    const task = await createManusTask(prompt, "speed");

    // Wait for completion
    const result = await getTaskResult(task.task_id);

    if (!result.result) {
      throw new Error("Manus task completed but no result returned");
    }

    // Parse the result
    let competitorData: ManusResponse;
    try {
      const parsed = JSON.parse(result.result);
      competitorData = {
        competitors: Array.isArray(parsed.competitors) 
          ? parsed.competitors 
          : parsed.competitors 
            ? [parsed.competitors] 
            : [{
                name: "Competitor Analysis",
                positioning: parsed.positioning || result.result,
                gaps: parsed.gaps || [],
              }],
      };
    } catch {
      // If not JSON, create a basic competitor structure
      competitorData = {
        competitors: [{
          name: "Competitor Analysis",
          positioning: result.result,
          gaps: [],
        }],
      };
    }

    return createSuccessResponse<ManusResponse>(competitorData, {
      model: "manus-competitors",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return createErrorResponse<ManusResponse>(
      error,
      "Manual competitor analysis required"
    );
  }
}

/**
 * Extract pain language from narrative
 */
export function extractPainLanguage(narrative: string): string[] {
  // Simple extraction - can be enhanced with NLP
  const painPatterns = [
    /(?:frustrated|annoyed|struggling|difficult|painful|problem|issue|challenge)/gi,
  ];
  
  const sentences = narrative.split(/[.!?]+/);
  const painSentences = sentences.filter((sentence) =>
    painPatterns.some((pattern) => pattern.test(sentence))
  );

  return painSentences.map((s) => s.trim()).filter(Boolean);
}

/**
 * Generate complete discovery pack in a single API call
 * This consolidates narrative, persona, and competitor analysis into one prompt
 * to reduce API costs from 3 calls to 1 call per project.
 */
export async function generateDiscoveryPack(
  request: ManusNarrativeRequest
): Promise<AIResponse<ManusResponse>> {
  try {
    const prompt = `Generate a complete discovery pack for: ${request.product}

Target niche: ${request.niche}
Initial JTBD: ${request.painPoint}
Description: ${request.context || request.product}

**CRITICAL: You must cite all sources and provide footnotes for any claims, data, or insights.**

Provide a comprehensive analysis including:

1. Niche Narrative
   - Culture, vocabulary, identity, geography, income, communities, trends
   - How this niche thinks, talks, and behaves
   - **Cite sources**: Community forums, surveys, industry reports, social media analysis

2. Pain Language Dictionary
   - Common complaints and frustrations
   - Unmet needs and direct quotes
   - "I wish..." statements from the niche
   - **Cite sources**: Direct quotes from forums, social media, interviews, support tickets

3. Detailed Persona
   - Persona name and role
   - Identity and psychographics
   - Pain points and frustrations
   - Emotional drivers and motivations
   - Job-to-be-Done (functional, emotional, social jobs)
   - Triggers and success criteria
   - Language patterns and terminology used
   - **Cite sources**: User research, interviews, behavioral data, community analysis

4. Competitor Landscape
   - Main players in this space
   - Positioning analysis for each competitor
   - Gaps and opportunities where competitors fall short
   - Differentiation opportunities
   - Pricing analysis (what competitors charge and why)
   - **Cite sources**: Competitor websites, pricing pages, reviews, market research, industry reports

5. Pricing Expectations
   - What buyers expect to pay
   - Willingness to pay signals
   - Value perception in this niche
   - **Cite sources**: Pricing research, competitor pricing, market surveys, buyer interviews

6. Distribution Hooks and Entry Points
   - How to reach this niche
   - Trust signals
   - Community entry points
   - **Cite sources**: Community platforms, engagement data, distribution channels, referral patterns

**For each section, include a "sources" array with:**
- Source type (forum, survey, interview, website, report, etc.)
- Source name/URL
- Date accessed
- Key findings from that source

Format your response as JSON with the following structure:
{
  "narrative": "detailed narrative text...",
  "narrativeSources": [
    {
      "type": "forum|survey|report|interview",
      "name": "Source name or URL",
      "date": "Date accessed",
      "findings": "Key findings from this source"
    }
  ],
  "persona": {
    "name": "Persona Name",
    "role": "Role Title",
    "identity": "Identity description...",
    "painPoints": ["pain 1", "pain 2"],
    "emotionalDrivers": ["driver 1", "driver 2"],
    "jtbd": ["job 1", "job 2"]
  },
  "personaSources": [
    {
      "type": "user_research|interview|behavioral_data",
      "name": "Source name or URL",
      "date": "Date accessed",
      "findings": "Key findings from this source"
    }
  ],
  "competitors": [
    {
      "name": "Competitor Name",
      "positioning": "How they position themselves",
      "gaps": ["gap 1", "gap 2"],
      "sources": [
        {
          "type": "website|pricing_page|review|report",
          "name": "Source name or URL",
          "date": "Date accessed",
          "findings": "Key findings from this source"
        }
      ]
    }
  ],
  "pricingExpectations": ["expectation 1", "expectation 2"],
  "pricingSources": [
    {
      "type": "pricing_research|survey|interview",
      "name": "Source name or URL",
      "date": "Date accessed",
      "findings": "Key findings from this source"
    }
  ],
  "hooks": ["hook 1", "hook 2"],
  "distributionSources": [
    {
      "type": "community_platform|engagement_data",
      "name": "Source name or URL",
      "date": "Date accessed",
      "findings": "Key findings from this source"
    }
  ]
}`;

    // Create task (use "speed" mode to conserve credits)
    const task = await createManusTask(prompt, "speed");

    // Wait for completion
    const result = await getTaskResult(task.task_id);

    if (!result.result) {
      throw new Error("Manus task completed but no result returned");
    }

    // Parse the result - handle both JSON and markdown formats
    let discoveryData: ManusResponse;
    try {
      // Try JSON first
      const parsed = JSON.parse(result.result);
      discoveryData = {
        narrative: parsed.narrative || result.result,
        persona: parsed.persona || {
          name: "Target User",
          role: request.niche,
          identity: parsed.identity || "",
          painPoints: parsed.painPoints || [],
          emotionalDrivers: parsed.emotionalDrivers || [],
          jtbd: parsed.jtbd || [],
        },
        competitors: parsed.competitors || [],
        pricingExpectations: parsed.pricingExpectations || [],
        hooks: parsed.hooks || [],
      };
    } catch {
      // If not JSON, try to parse as markdown (Manus discovery pack format)
      const markdownContent = result.result;
      
      // Use the parser utility to extract structured data
      try {
        const { parseManusDiscoveryPack } = await import("./manus-parser");
        const parsed = parseManusDiscoveryPack(markdownContent);
        
        discoveryData = {
          narrative: parsed.narrative || markdownContent,
          persona: parsed.persona ? {
            name: parsed.persona.name || "Target User",
            role: parsed.persona.role || request.niche,
            identity: parsed.persona.identity || "",
            painPoints: parsed.persona.painPoints || [],
            emotionalDrivers: parsed.persona.emotionalDrivers || [],
            jtbd: parsed.persona.jtbd || [],
          } : {
            name: "Target User",
            role: request.niche,
            identity: "",
            painPoints: [],
            emotionalDrivers: [],
            jtbd: [],
          },
          competitors: parsed.competitors || [],
          pricingExpectations: parsed.pricingExpectations ? [parsed.pricingExpectations] : [],
          hooks: parsed.distributionHooks ? [parsed.distributionHooks] : [],
        };
      } catch (parseError) {
        // Fallback: create basic structure from raw markdown
        discoveryData = {
          narrative: markdownContent,
          persona: {
            name: "Target User",
            role: request.niche,
            identity: "",
            painPoints: [],
            emotionalDrivers: [],
            jtbd: [],
          },
          competitors: [],
          pricingExpectations: [],
          hooks: [],
        };
      }
    }

    return createSuccessResponse<ManusResponse>(discoveryData, {
      model: "manus-discovery-pack",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return createErrorResponse<ManusResponse>(
      error,
      "Manual discovery pack generation required"
    );
  }
}

/**
 * Get task by ID (for retrieving existing tasks)
 */
export async function getManusTask(taskId: string): Promise<{ result?: string; status: string; output?: unknown }> {
  const apiKey = requireEnv("MANUS_API_KEY");
  
  const res = await fetch(`${MANUS_API_URL}/tasks/${taskId}`, {
    headers: {
      accept: "application/json",
      API_KEY: apiKey,
    },
  });

  if (!res.ok) {
    let errorMessage = `Manus API error: ${res.status}`;
    try {
      const errorBody = await res.json();
      errorMessage = errorBody.message || errorBody.error || errorMessage;
    } catch {
      const errorText = await res.text();
      errorMessage = errorText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  const task = await res.json();
  
  if (task.status === "completed") {
    // Extract result from output array
    let resultText = "";
    if (task.output && Array.isArray(task.output)) {
      const assistantMessages = task.output
        .filter((msg: any) => msg.role === "assistant" && msg.content)
        .reverse();
      
      if (assistantMessages.length > 0) {
        const lastMessage = assistantMessages[0];
        if (lastMessage.content && Array.isArray(lastMessage.content)) {
          const textContent = lastMessage.content.find(
            (c: any) => c.type === "output_text" && c.text
          );
          if (textContent) {
            resultText = textContent.text;
          }
        }
      }
    }
    
    if (!resultText && task.output) {
      resultText = JSON.stringify(task.output, null, 2);
    }
    
    return { result: resultText || "Task completed but no output found", status: task.status, output: task.output };
  }

  return { status: task.status, output: task.output };
}

/**
 * Extract JTBD from persona
 */
export function extractJTBD(persona: ManusResponse["persona"]): string[] {
  if (!persona?.jtbd) {
    return [];
  }
  return persona.jtbd;
}

