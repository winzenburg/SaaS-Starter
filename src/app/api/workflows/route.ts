/**
 * Workflows API endpoint
 * 
 * GET /api/workflows - List all workflows
 */

import { NextRequest, NextResponse } from "next/server";
import { listWorkflows } from "@/lib/workflows/db";

export async function GET(_request: NextRequest) {
  try {
    // Check if DATABASE_URL is set before attempting to use the database
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        success: true,
        workflows: [],
        message: "Database not configured. Workflows are stored in the database. Set DATABASE_URL to enable workflows.",
      });
    }

    const workflows = await listWorkflows();

    return NextResponse.json({
      success: true,
      workflows,
    });
  } catch (error) {
    console.error("Error listing workflows:", error);
    
    // If database is not configured or connection fails, return empty array gracefully
    // This allows the app to work without a database (e.g., during development)
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes("DATABASE_URL") || errorMessage.includes("database") || errorMessage === "") {
      return NextResponse.json({
        success: true,
        workflows: [],
        message: "Database not configured or connection failed. Workflows are stored in the database. Set DATABASE_URL to enable workflows.",
      });
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

