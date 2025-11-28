/**
 * Integration tests for Validation Workflow API
 * 
 * Tests the /api/workflows/validation endpoint
 */

import { describe, it, expect, vi } from "vitest";
import { POST, GET } from "@/app/api/workflows/validation/route";
import { NextRequest } from "next/server";

// Mock the workflow functions
const mockWorkflow = {
  id: "validation-test-idea",
  ideaSlug: "test-idea",
  ideaName: "Test Idea",
  phase: "validation",
  status: "pending",
  steps: [
    {
      id: "step-1",
      name: "Demand Validation",
      status: "pending",
      agent: "Demand-Validator",
    },
  ],
  thresholds: {
    warmTrafficConversion: 15,
    coldTrafficConversion: 3,
    dmReplyRate: 20,
    wtpSignals: 1,
  },
  results: {
    signups: 0,
    conversionRate: 0,
    dmReplies: 0,
    wtpSignals: 0,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

vi.mock("@/lib/workflows/validation", () => ({
  createValidationWorkflow: vi.fn((body) => ({
    ...mockWorkflow,
    ideaSlug: body.ideaSlug,
    ideaName: body.ideaName,
  })),
  executeValidationStep: vi.fn(async (workflow, stepId) => ({
    workflow: {
      ...workflow,
      steps: workflow.steps.map((step: { id: string }) =>
        step.id === stepId
          ? { ...step, status: "completed", output: "Mock output" }
          : step
      ),
    },
    output: "Mock step output",
  })),
  updateValidationResults: vi.fn((workflow, results) => ({
    ...workflow,
    results: { ...workflow.results, ...results },
  })),
  checkValidationThresholds: vi.fn((workflow) => ({
    passed: workflow.results.conversionRate >= workflow.thresholds.warmTrafficConversion,
    checks: [
      {
        metric: "warmTrafficConversion",
        passed: workflow.results.conversionRate >= workflow.thresholds.warmTrafficConversion,
        current: workflow.results.conversionRate,
        threshold: workflow.thresholds.warmTrafficConversion,
      },
    ],
  })),
}));

describe("POST /api/workflows/validation", () => {
  it("should create a validation workflow with valid data", async () => {
    const body = {
      ideaSlug: "test-idea",
      ideaName: "Test Idea",
      phase: "validation" as const,
    };

    const request = new NextRequest("http://localhost:3000/api/workflows/validation", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.workflow).toBeDefined();
    expect(data.workflow.phase).toBe("validation");
  });

  it("should return 400 if required fields are missing", async () => {
    const body = {
      ideaName: "Test Idea",
    };

    const request = new NextRequest("http://localhost:3000/api/workflows/validation", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain("ideaSlug");
  });

  it("should execute a workflow step when action=execute", async () => {
    const body = {
      ideaSlug: "test-idea",
      ideaName: "Test Idea",
      phase: "validation" as const,
      action: "execute" as const,
      stepId: "step-1",
    };

    const request = new NextRequest("http://localhost:3000/api/workflows/validation", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.workflow).toBeDefined();
    expect(data.output).toBeDefined();
  });

  it("should update validation results when action=update-results", async () => {
    const body = {
      ideaSlug: "test-idea",
      ideaName: "Test Idea",
      phase: "validation" as const,
      action: "update-results" as const,
      results: {
        signups: 10,
        conversionRate: 15,
        dmReplies: 5,
        wtpSignals: 2,
      },
    };

    const request = new NextRequest("http://localhost:3000/api/workflows/validation", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.workflow).toBeDefined();
    expect(data.workflow.results.signups).toBe(10);
    expect(data.workflow.results.conversionRate).toBe(15);
  });

  it("should check thresholds when action=check-thresholds", async () => {
    const body = {
      ideaSlug: "test-idea",
      ideaName: "Test Idea",
      phase: "validation" as const,
      action: "check-thresholds" as const,
      results: {
        signups: 10,
        conversionRate: 20, // Above threshold of 15
        dmReplies: 5,
        wtpSignals: 2,
      },
    };

    const request = new NextRequest("http://localhost:3000/api/workflows/validation", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.passed).toBeDefined();
    expect(data.checks).toBeDefined();
    expect(Array.isArray(data.checks)).toBe(true);
  });

  it("should return 500 on unexpected error", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    const request = new NextRequest("http://localhost:3000/api/workflows/validation", {
      method: "POST",
      body: "invalid json",
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBeDefined();
  });
});

describe("GET /api/workflows/validation", () => {
  it("should return 400 if workflowId is missing", async () => {
    const request = new NextRequest("http://localhost:3000/api/workflows/validation", {
      method: "GET",
    });

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain("workflowId");
  });

  it("should return error message when workflowId is provided (storage not implemented)", async () => {
    const request = new NextRequest(
      "http://localhost:3000/api/workflows/validation?workflowId=test-123",
      {
        method: "GET",
      }
    );

    const response = await GET(request);
    const data = await response.json();

    expect(data.error).toContain("storage not implemented");
  });
});

