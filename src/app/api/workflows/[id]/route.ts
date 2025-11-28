/**
 * Workflow API endpoint
 * 
 * GET /api/workflows/[id] - Get a workflow by ID
 */

import { NextRequest, NextResponse } from "next/server";
import { loadWorkflow } from "@/lib/workflows/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const workflowId = params.id;

    if (!workflowId) {
      return NextResponse.json(
        { error: "Workflow ID is required" },
        { status: 400 }
      );
    }

    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        {
          success: false,
          error: "Database not configured",
          message: "DATABASE_URL is not set",
        },
        { status: 500 }
      );
    }

    const workflow = await loadWorkflow(workflowId);

    if (!workflow) {
      return NextResponse.json(
        {
          success: false,
          error: "Workflow not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      workflow,
    });
  } catch (error) {
    console.error("Error loading workflow:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

