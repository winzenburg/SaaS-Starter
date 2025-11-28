/**
 * Validation workflow API endpoint
 * 
 * POST /api/workflows/validation - Create and execute validation workflow
 */

import { NextRequest, NextResponse } from "next/server";
import {
  createValidationWorkflow,
  executeValidationStep,
  updateValidationResults,
  checkValidationThresholds,
} from "@/lib/workflows/validation";
import { saveWorkflow, loadWorkflow } from "@/lib/workflows/db";
import type { WorkflowExecutionRequest } from "@/lib/workflows/types";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as WorkflowExecutionRequest & {
      stepId?: string;
      action?: "create" | "execute" | "update-results" | "check-thresholds";
      workflowId?: string;
      results?: Partial<{
        signups: number;
        conversionRate: number;
        dmReplies: number;
        wtpSignals: number;
      }>;
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

      const result = await executeValidationStep(workflow, body.stepId);
      await saveWorkflow(result.workflow);

      return NextResponse.json({
        success: true,
        workflow: result.workflow,
        output: result.output,
      });
    }

    if (body.action === "update-results" && body.results && body.workflowId) {
      // Update validation results
      const workflow = await loadWorkflow(body.workflowId);
      if (!workflow) {
        return NextResponse.json(
          { error: "Workflow not found" },
          { status: 404 }
        );
      }

      const updated = updateValidationResults(workflow, body.results);
      await saveWorkflow(updated);

      return NextResponse.json({
        success: true,
        workflow: updated,
      });
    }

    if (body.action === "check-thresholds" && body.workflowId) {
      // Check if thresholds are met
      const workflow = await loadWorkflow(body.workflowId);
      if (!workflow) {
        return NextResponse.json(
          { error: "Workflow not found" },
          { status: 404 }
        );
      }

      if (body.results) {
        const updated = updateValidationResults(workflow, body.results);
        const check = checkValidationThresholds(updated);
        await saveWorkflow(updated);

        return NextResponse.json({
          success: true,
          passed: check.passed,
          checks: check.checks,
        });
      }
    }

    // Create new workflow
    const workflow = createValidationWorkflow(body);
    await saveWorkflow(workflow);

    return NextResponse.json({
      success: true,
      workflow,
      message: "Validation workflow created. Use /api/workflows/validation with action=execute to run steps.",
    });
  } catch (error) {
    console.error("Validation workflow error:", error);
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

