/**
 * Workflow orchestration
 * 
 * Centralized exports for discovery and validation workflows
 */

export {
  createDiscoveryWorkflow,
  executeDiscoveryStep,
} from "./discovery";

export {
  createValidationWorkflow,
  executeValidationStep,
  updateValidationResults,
  checkValidationThresholds,
} from "./validation";

export type {
  Workflow,
  WorkflowPhase,
  WorkflowStatus,
  WorkflowStep,
  DiscoveryWorkflow,
  ValidationWorkflow,
  WorkflowExecutionRequest,
  WorkflowExecutionResponse,
} from "./types";

