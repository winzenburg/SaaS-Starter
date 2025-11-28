/**
 * Integration tests for Discovery Workflow API
 * 
 * Tests the /api/workflows/discovery endpoint
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { POST, GET } from "@/app/api/workflows/discovery/route";
import { NextRequest } from "next/server";

// Mock the workflow functions
vi.mock("@/lib/workflows/discovery", () => ({
  createDiscoveryWorkflow: vi.fn((body) => ({
    id: `discovery-${body.ideaSlug}`,
    ideaSlug: body.ideaSlug,
    ideaName: body.ideaName,
    phase: "discovery",
    status: "pending",
    steps: [
      {
        id: "step-1",
        name: "Manus Narrative",
        status: "pending",
        agent: "Manus",
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })),
  executeDiscoveryStep: vi.fn(async (workflow, stepId) => ({
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
}));

describe("POST /api/workflows/discovery", () => {
  it("should create a discovery workflow with valid data", async () => {
    const body = {
      ideaSlug: "test-idea",
      ideaName: "Test Idea",
      phase: "discovery" as const,
    };

    const request = new NextRequest("http://localhost:3000/api/workflows/discovery", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.workflow).toBeDefined();
    expect(data.workflow.ideaSlug).toBe("test-idea");
    expect(data.workflow.ideaName).toBe("Test Idea");
    expect(data.workflow.phase).toBe("discovery");
  });

  it("should return 400 if ideaSlug is missing", async () => {
    const body = {
      ideaName: "Test Idea",
      phase: "discovery" as const,
    };

    const request = new NextRequest("http://localhost:3000/api/workflows/discovery", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain("ideaSlug");
  });

  it("should return 400 if ideaName is missing", async () => {
    const body = {
      ideaSlug: "test-idea",
      phase: "discovery" as const,
    };

    const request = new NextRequest("http://localhost:3000/api/workflows/discovery", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain("ideaName");
  });

  it("should execute a workflow step when action=execute", async () => {
    const body = {
      ideaSlug: "test-idea",
      ideaName: "Test Idea",
      phase: "discovery" as const,
      action: "execute" as const,
      stepId: "step-1",
    };

    const request = new NextRequest("http://localhost:3000/api/workflows/discovery", {
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

  it("should return 500 on unexpected error", async () => {
    // Mock an error
    vi.spyOn(console, "error").mockImplementation(() => {});

    const request = new NextRequest("http://localhost:3000/api/workflows/discovery", {
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

describe("GET /api/workflows/discovery", () => {
  it("should return 400 if workflowId is missing", async () => {
    const request = new NextRequest("http://localhost:3000/api/workflows/discovery", {
      method: "GET",
    });

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain("workflowId");
  });

  it("should return error message when workflowId is provided (storage not implemented)", async () => {
    const request = new NextRequest(
      "http://localhost:3000/api/workflows/discovery?workflowId=test-123",
      {
        method: "GET",
      }
    );

    const response = await GET(request);
    const data = await response.json();

    expect(data.error).toContain("storage not implemented");
  });
});

