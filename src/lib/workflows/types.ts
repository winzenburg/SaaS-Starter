/**
 * Workflow types for discovery and validation
 */

export type WorkflowPhase = "discovery" | "validation" | "build" | "scale";

export type WorkflowStatus = "pending" | "in_progress" | "completed" | "failed" | "paused";

export interface WorkflowStep {
  id: string;
  name: string;
  agent?: string;
  tool?: string;
  status: WorkflowStatus;
  startedAt?: string;
  completedAt?: string;
  error?: string;
  output?: string;
  metadata?: Record<string, unknown>;
}

export interface DiscoveryWorkflow {
  id: string;
  ideaSlug: string;
  ideaName: string;
  phase: "discovery";
  status: WorkflowStatus;
  steps: WorkflowStep[];
  score?: number;
  scoreBreakdown?: {
    nicheViability: number;
    painIntensity: number;
    personaClarity: number;
    moatPotential: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ValidationWorkflow {
  id: string;
  ideaSlug: string;
  ideaName: string;
  phase: "validation";
  status: WorkflowStatus;
  steps: WorkflowStep[];
  thresholds?: {
    warmTrafficConversion: number;
    coldTrafficConversion: number;
    dmReplyRate: number;
    wtpSignals: number;
  };
  results?: {
    signups: number;
    conversionRate: number;
    dmReplies: number;
    wtpSignals: number;
  };
  createdAt: string;
  updatedAt: string;
}

export type Workflow = DiscoveryWorkflow | ValidationWorkflow;

export interface WorkflowExecutionRequest {
  ideaSlug: string;
  ideaName: string;
  description?: string;
  phase: WorkflowPhase;
  context?: Record<string, unknown>;
}

export interface WorkflowExecutionResponse {
  workflowId: string;
  status: WorkflowStatus;
  message: string;
}

