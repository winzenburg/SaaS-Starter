/**
 * Discovery workflow execution
 * 
 * Implements the 8-step discovery process from Rule 302
 */

import {
  generateNarrative,
  createPersona,
  analyzeCompetitors,
} from "@/lib/ai-tools/manus";
import { refine } from "@/lib/ai-tools/chatgpt";
import type {
  DiscoveryWorkflow,
  WorkflowStep,
  WorkflowExecutionRequest,
} from "./types";

const DISCOVERY_STEPS: Array<Omit<WorkflowStep, "status" | "startedAt" | "completedAt">> = [
  {
    id: "step-1",
    name: "Manus → Niche Narrative + Pain Language + JTBD + Competitors",
    agent: "Manus-Narrative-Agent",
    tool: "manus",
  },
  {
    id: "step-2",
    name: "ChatGPT → Refinement Packet",
    agent: "ChatGPT-Reasoning-Agent",
    tool: "chatgpt",
  },
  {
    id: "step-3",
    name: "Niche Intelligence Agent → Niche Map",
    agent: "Niche-Intelligence-Agent",
    tool: "cursor",
  },
  {
    id: "step-4",
    name: "Pain Signal Agent → Pain Prioritization",
    agent: "Pain-Signal-Agent",
    tool: "cursor",
  },
  {
    id: "step-5",
    name: "JTBD Agent → Persona + Jobs Map + Voice Script",
    agent: "JTBD-Agent",
    tool: "cursor",
  },
  {
    id: "step-6",
    name: "Opportunity & Moat Agent → Moat Strategy + Vision Prompts",
    agent: "Opportunity-Moat-Agent",
    tool: "cursor",
  },
  {
    id: "step-7",
    name: "Red-Team Strategist → Critique & Blindspots",
    agent: "Red-Team-Strategist",
    tool: "claude",
  },
  {
    id: "step-8",
    name: "Score the idea (0-10) and decide",
    agent: "Orchestrator",
    tool: "cursor",
  },
];

/**
 * Execute Step 1: Manus narrative generation
 */
async function executeStep1(
  _ideaSlug: string,
  ideaName: string,
  description?: string
): Promise<{ success: boolean; data?: unknown; error?: string }> {
  try {
    // Generate narrative
    const narrativeResult = await generateNarrative({
      product: ideaName,
      niche: "Startups, CTOs", // TODO: Extract from context
      painPoint: description || "Unknown pain point",
      context: description,
    });

    if (!narrativeResult.success) {
      return { success: false, error: narrativeResult.error };
    }

    // Create persona
    const personaResult = await createPersona({
      product: ideaName,
      niche: "Startups, CTOs",
      narrative: narrativeResult.data?.narrative as string | undefined,
    });

    // Analyze competitors
    const competitorResult = await analyzeCompetitors({
      product: ideaName,
      niche: "Startups, CTOs",
    });

    return {
      success: true,
      data: {
        narrative: narrativeResult.data,
        persona: personaResult.data,
        competitors: competitorResult.data,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Execute Step 2: ChatGPT refinement
 */
async function executeStep2(
  manusOutput: unknown
): Promise<{ success: boolean; data?: unknown; error?: string }> {
  try {
    const refinementResult = await refine({
      prompt: `Refine and structure the following Manus outputs into a clear insights packet:
      
${JSON.stringify(manusOutput, null, 2)}

Cluster pain points, synthesize JTBD, extract opportunity vectors, and validate competitor assumptions.`,
      context: "Discovery workflow refinement",
    });

    if (!refinementResult.success) {
      return { success: false, error: refinementResult.error };
    }

    return {
      success: true,
      data: refinementResult.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Create a new discovery workflow
 */
export function createDiscoveryWorkflow(
  request: WorkflowExecutionRequest
): DiscoveryWorkflow {
  // Generate a UUID for the workflow ID (required by database schema)
  const { randomUUID } = require("crypto");
  const workflowId = randomUUID();

  return {
    id: workflowId,
    ideaSlug: request.ideaSlug,
    ideaName: request.ideaName,
    phase: "discovery",
    status: "pending",
    steps: DISCOVERY_STEPS.map((step) => ({
      ...step,
      status: "pending" as const,
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Execute discovery workflow step
 */
export async function executeDiscoveryStep(
  workflow: DiscoveryWorkflow,
  stepId: string
): Promise<{ workflow: DiscoveryWorkflow; output?: unknown }> {
  const stepIndex = workflow.steps.findIndex((s) => s.id === stepId);
  if (stepIndex === -1) {
    throw new Error(`Step ${stepId} not found`);
  }

  const step = workflow.steps[stepIndex];
  if (!step) {
    throw new Error(`Step ${stepId} not found in workflow`);
  }
  
  // Create updated workflow with new step status
  const updatedSteps = [...workflow.steps];
  updatedSteps[stepIndex] = {
    ...step,
    status: "in_progress",
    startedAt: new Date().toISOString(),
  };
  
  const updatedWorkflow: DiscoveryWorkflow = {
    ...workflow,
    status: "in_progress",
    steps: updatedSteps,
    updatedAt: new Date().toISOString(),
  };

  let output: unknown;
  let error: string | undefined;
  let finalWorkflow: DiscoveryWorkflow = updatedWorkflow;

  try {
    switch (stepId) {
      case "step-1": {
        const result = await executeStep1(
          workflow.ideaSlug,
          workflow.ideaName,
          workflow.ideaName
        );
        if (result.success) {
          output = result.data;
          step.status = "completed";
          step.completedAt = new Date().toISOString();
          step.output = JSON.stringify(result.data);
        } else {
          error = result.error;
          step.status = "failed";
          step.error = error;
        }
        break;
      }
      case "step-2": {
        // Get output from step 1
        const step1Output = workflow.steps[0]?.output
          ? JSON.parse(workflow.steps[0].output)
          : null;
        if (!step1Output) {
          throw new Error("Step 1 must be completed first");
        }
        const result = await executeStep2(step1Output);
        if (result.success) {
          output = result.data;
          step.status = "completed";
          step.completedAt = new Date().toISOString();
          step.output = JSON.stringify(result.data);
        } else {
          error = result.error;
          step.status = "failed";
          step.error = error;
        }
        break;
      }
      // Steps 3-8 require Cursor agent execution (manual or via API)
      // These are documented in the agent files and should be invoked via Cursor
      default:
        throw new Error(
          `Step ${stepId} requires Cursor agent execution. Please invoke the agent manually.`
        );
    }
  } catch (err) {
    error = err instanceof Error ? err.message : String(err);
    const failedSteps = [...finalWorkflow.steps];
    failedSteps[stepIndex] = {
      ...failedSteps[stepIndex]!,
      status: "failed",
      error,
    };
    finalWorkflow = {
      ...finalWorkflow,
      steps: failedSteps,
      status: "failed",
      updatedAt: new Date().toISOString(),
    };
  }

  // Update workflow status based on all steps
  const allCompleted = finalWorkflow.steps.every(
    (s) => s.status === "completed" || s.status === "failed"
  );
  if (allCompleted) {
    finalWorkflow = {
      ...finalWorkflow,
      status: finalWorkflow.steps.some((s) => s.status === "failed")
        ? "failed"
        : "completed",
      updatedAt: new Date().toISOString(),
    };
  }

  return { workflow: finalWorkflow, output };
}

