/**
 * Validation workflow execution
 * 
 * Implements the validation process from Rule 200 (Insight Validation Playbook)
 */

import type {
  ValidationWorkflow,
  WorkflowStep,
  WorkflowExecutionRequest,
} from "./types";

const VALIDATION_STEPS: Array<Omit<WorkflowStep, "status" | "startedAt" | "completedAt">> = [
  {
    id: "validation-1",
    name: "Demand-Validator → Validation Plan",
    agent: "Demand-Validator",
    tool: "cursor",
  },
  {
    id: "validation-2",
    name: "Landing-Builder → Landing Page",
    agent: "Landing-Builder",
    tool: "cursor",
  },
  {
    id: "validation-3",
    name: "Distribution-Operator → Distribution Strategy",
    agent: "Distribution-Operator",
    tool: "cursor",
  },
  {
    id: "validation-4",
    name: "Pricing-Tester → Pricing Test Strategy",
    agent: "Pricing-Tester",
    tool: "cursor",
  },
  {
    id: "validation-5",
    name: "Creative-Batch-Operator → Creative Batch",
    agent: "Creative-Batch-Operator",
    tool: "glif",
  },
  {
    id: "validation-6",
    name: "Red-Team-Strategist → Validation Red-Team",
    agent: "Red-Team-Strategist",
    tool: "claude",
  },
];

/**
 * Create a new validation workflow
 */
export function createValidationWorkflow(
  request: WorkflowExecutionRequest
): ValidationWorkflow {
  const workflowId = `validation-${request.ideaSlug}-${Date.now()}`;

  return {
    id: workflowId,
    ideaSlug: request.ideaSlug,
    ideaName: request.ideaName,
    phase: "validation",
    status: "pending",
    steps: VALIDATION_STEPS.map((step) => ({
      ...step,
      status: "pending" as const,
    })),
    thresholds: {
      warmTrafficConversion: 15,
      coldTrafficConversion: 3,
      dmReplyRate: 20,
      wtpSignals: 1,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Execute validation workflow step
 */
export async function executeValidationStep(
  workflow: ValidationWorkflow,
  stepId: string
): Promise<{ workflow: ValidationWorkflow; output?: unknown }> {
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
  
  const updatedWorkflow: ValidationWorkflow = {
    ...workflow,
    status: "in_progress",
    steps: updatedSteps,
    updatedAt: new Date().toISOString(),
  };

  // Validation steps require Cursor agent execution
  // These are documented in the agent files and should be invoked via Cursor
  const finalSteps = [...updatedWorkflow.steps];
  finalSteps[stepIndex] = {
    ...finalSteps[stepIndex]!,
    metadata: {
      note: "This step requires Cursor agent execution. Please invoke the agent manually.",
      agent: step.agent,
    },
  };
  
  const finalWorkflow: ValidationWorkflow = {
    ...updatedWorkflow,
    steps: finalSteps,
    updatedAt: new Date().toISOString(),
  };

  return { workflow: finalWorkflow };
}

/**
 * Update validation results
 */
export function updateValidationResults(
  workflow: ValidationWorkflow,
  results: Partial<ValidationWorkflow["results"]>
): ValidationWorkflow {
  const existingResults = workflow.results || {
    signups: 0,
    conversionRate: 0,
    dmReplies: 0,
    wtpSignals: 0,
  };
  
  return {
    ...workflow,
    results: {
      ...existingResults,
      ...results,
    },
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Check if validation thresholds are met
 */
export function checkValidationThresholds(
  workflow: ValidationWorkflow
): {
  passed: boolean;
  checks: Array<{ metric: string; threshold: number; actual: number; passed: boolean }>;
} {
  if (!workflow.results || !workflow.thresholds) {
    return { passed: false, checks: [] };
  }

  const checks = [
    {
      metric: "Warm Traffic Conversion",
      threshold: workflow.thresholds.warmTrafficConversion,
      actual: workflow.results.conversionRate || 0,
      passed:
        (workflow.results.conversionRate || 0) >=
        workflow.thresholds.warmTrafficConversion,
    },
    {
      metric: "DM Reply Rate",
      threshold: workflow.thresholds.dmReplyRate,
      actual: workflow.results.dmReplies || 0,
      passed:
        (workflow.results.dmReplies || 0) >= workflow.thresholds.dmReplyRate,
    },
    {
      metric: "WTP Signals",
      threshold: workflow.thresholds.wtpSignals,
      actual: workflow.results.wtpSignals || 0,
      passed:
        (workflow.results.wtpSignals || 0) >= workflow.thresholds.wtpSignals,
    },
  ];

  const passed = checks.every((check) => check.passed);

  return { passed, checks };
}

