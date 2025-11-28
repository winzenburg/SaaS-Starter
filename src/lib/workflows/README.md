# Workflow Execution Library

> Orchestration utilities for discovery and validation workflows

## Overview

This library provides utilities for executing the discovery and validation workflows defined in:
- `.cursor/rules/302-discovery-workflow.mdc` (Discovery)
- `.cursor/rules/200-playbook-insight-validation.mdc` (Validation)

## Usage

### Discovery Workflow

```typescript
import { createDiscoveryWorkflow, executeDiscoveryStep } from "@/lib/workflows";

// Create workflow
const workflow = createDiscoveryWorkflow({
  ideaSlug: "enterprise-design-system",
  ideaName: "Enterprise Design System for Startups",
  phase: "discovery",
});

// Execute step 1 (Manus narrative)
const result = await executeDiscoveryStep(workflow, "step-1");
```

### Validation Workflow

```typescript
import {
  createValidationWorkflow,
  executeValidationStep,
  updateValidationResults,
  checkValidationThresholds,
} from "@/lib/workflows";

// Create workflow
const workflow = createValidationWorkflow({
  ideaSlug: "enterprise-design-system",
  ideaName: "Enterprise Design System for Startups",
  phase: "validation",
});

// Update results
const updated = updateValidationResults(workflow, {
  signups: 50,
  conversionRate: 18,
  dmReplies: 12,
  wtpSignals: 3,
});

// Check thresholds
const check = checkValidationThresholds(updated);
console.log(check.passed); // true/false
```

## API Endpoints

### POST /api/workflows/discovery

Create or execute a discovery workflow step.

```json
{
  "ideaSlug": "enterprise-design-system",
  "ideaName": "Enterprise Design System for Startups",
  "phase": "discovery",
  "action": "execute",
  "stepId": "step-1"
}
```

### POST /api/workflows/validation

Create or execute a validation workflow step, update results, or check thresholds.

```json
{
  "ideaSlug": "enterprise-design-system",
  "ideaName": "Enterprise Design System for Startups",
  "phase": "validation",
  "action": "update-results",
  "results": {
    "signups": 50,
    "conversionRate": 18,
    "dmReplies": 12,
    "wtpSignals": 3
  }
}
```

## Workflow Steps

### Discovery (8 steps)

1. **Manus → Niche Narrative** (AI tool integration)
2. **ChatGPT → Refinement Packet** (AI tool integration)
3. **Niche Intelligence Agent** (Cursor agent)
4. **Pain Signal Agent** (Cursor agent)
5. **JTBD Agent** (Cursor agent)
6. **Opportunity & Moat Agent** (Cursor agent)
7. **Red-Team Strategist** (Cursor agent)
8. **Score the idea** (Orchestrator)

### Validation (6 steps)

1. **Demand-Validator** (Cursor agent)
2. **Landing-Builder** (Cursor agent)
3. **Distribution-Operator** (Cursor agent)
4. **Pricing-Tester** (Cursor agent)
5. **Creative-Batch-Operator** (Cursor agent)
6. **Red-Team-Strategist** (Cursor agent)

## Notes

- Steps 1-2 of discovery workflow use AI tool integrations directly
- Steps 3-8 of discovery and all validation steps require Cursor agent execution
- Workflow state should be persisted (database, file system, etc.) in production
- Threshold checking is built-in for validation workflows

