/**
 * Workflows API endpoint
 * 
 * GET /api/workflows - List all workflows
 */

import { NextRequest, NextResponse } from "next/server";
import { listWorkflows } from "@/lib/workflows/db";
import { discoverWorkflowsFromFiles } from "@/lib/workflows/file-loader";

export async function GET(_request: NextRequest) {
  try {
    // Check if DATABASE_URL is set before attempting to use the database
    if (!process.env.DATABASE_URL) {
      // Fallback to file-based discovery when database is not configured
      const workflows = discoverWorkflowsFromFiles();
      return NextResponse.json({
        success: true,
        workflows,
        message: "Database not configured. Workflows discovered from files.",
      });
    }

    const workflows = await listWorkflows();

    return NextResponse.json({
      success: true,
      workflows,
    });
  } catch (error) {
    console.error("Error listing workflows:", error);
    
    // If database is not configured or connection fails, try file-based discovery
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes("DATABASE_URL") || errorMessage.includes("database") || errorMessage === "") {
      try {
        const workflows = discoverWorkflowsFromFiles();
        return NextResponse.json({
          success: true,
          workflows,
          message: "Database not configured. Workflows discovered from files.",
        });
      } catch (fileError) {
        return NextResponse.json({
          success: true,
          workflows: [],
          message: "Database not configured and file discovery failed. Set DATABASE_URL to enable workflows.",
        });
      }
    }
    
    return NextResponse.json(
      {
        success: false,
        workflows: [],
        error: errorMessage || "Unknown error",
      },
      { status: 500 }
    );
  }
}

