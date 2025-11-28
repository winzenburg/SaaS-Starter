/**
 * Discovery workflow API endpoint
 * 
 * POST /api/workflows/discovery - Create and execute discovery workflow
 */

import { NextRequest, NextResponse } from "next/server";
import {
  createDiscoveryWorkflow,
  executeDiscoveryStep,
} from "@/lib/workflows/discovery";
import { saveWorkflow, loadWorkflow } from "@/lib/workflows/db";
import type { WorkflowExecutionRequest } from "@/lib/workflows/types";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as WorkflowExecutionRequest & {
      stepId?: string;
      action?: "create" | "execute";
      workflowId?: string;
    };

    if (!body.ideaSlug || !body.ideaName) {
      return NextResponse.json(
        { error: "ideaSlug and ideaName are required" },
        { status: 400 }
      );
    }

    if (body.action === "execute" && body.stepId && body.workflowId) {
      // Execute a specific step
      const workflow = await loadWorkflow(body.workflowId);
      if (!workflow) {
        return NextResponse.json(
          { error: "Workflow not found" },
          { status: 404 }
        );
      }

      const result = await executeDiscoveryStep(workflow, body.stepId);
      
      // Save updated workflow
      await saveWorkflow(result.workflow);

      return NextResponse.json({
        success: true,
        workflow: result.workflow,
        output: result.output,
      });
    }

    // Create new workflow
    const workflow = createDiscoveryWorkflow(body);
    await saveWorkflow(workflow);

    return NextResponse.json({
      success: true,
      workflow,
      message: "Discovery workflow created. Use /api/workflows/discovery with action=execute to run steps.",
    });
  } catch (error) {
    console.error("Discovery workflow error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const workflowId = searchParams.get("workflowId");

  if (!workflowId) {
    return NextResponse.json(
      { error: "workflowId is required" },
      { status: 400 }
    );
  }

  try {
    const workflow = await loadWorkflow(workflowId);
    if (!workflow) {
      return NextResponse.json(
        { error: "Workflow not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, workflow });
  } catch (error) {
    console.error("Error loading workflow:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

