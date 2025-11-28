import { NextResponse } from "next/server";
import { readdirSync } from "fs";
import { join } from "path";
import {
  findProjectDocuments,
  readProjectFromFolder,
  type ProjectRegistry,
  type ProjectDocument,
} from "@/lib/projects/helpers";
import { getWorkflowCountsByProject } from "@/lib/workflows/db";

interface ProjectWithDocuments extends ProjectRegistry {
  documents: ProjectDocument[];
  workflowCounts?: {
    total: number;
    byPhase: Record<string, number>;
    active: number;
  };
}

export async function GET() {
  try {
    const projectsDir = join(process.cwd(), "projects");
    
    // Check if projects directory exists
    let entries: string[] = [];
    try {
      entries = readdirSync(projectsDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && entry.name !== "node_modules")
        .map((entry) => entry.name);
    } catch {
      // Projects directory doesn't exist or can't be read (e.g., on Vercel)
      // Return empty array - this is expected for deployed hub
      console.log("Projects directory not accessible (this is normal on Vercel)");
      return NextResponse.json({ 
        projects: [],
        message: "Projects registry is local-only. Use 'npm run manage-projects list' locally to view projects."
      });
    }

    if (entries.length === 0) {
      return NextResponse.json({ 
        projects: [],
        message: "No projects found. Create one with 'npm run create-project \"Project Name\"'"
      });
    }

    // Check if database is available for workflow counts
    const hasDatabase = !!process.env.DATABASE_URL;

    const projects: ProjectWithDocuments[] = await Promise.all(
      entries
        .filter((folderName): folderName is string => folderName !== undefined)
        .map(async (folderName) => {
          try {
            const project = readProjectFromFolder(folderName, projectsDir);
            if (!project) return null;
            
            // Find documents for this project (from project folder)
            const projectDir = join(projectsDir, folderName);
            const documents = findProjectDocuments(project.slug, projectDir);
            
            // Get workflow counts if database is available
            let workflowCounts;
            if (hasDatabase) {
              try {
                workflowCounts = await getWorkflowCountsByProject(project.slug);
              } catch (error) {
                // Database might not be configured, ignore workflow counts
                console.log(`Could not fetch workflow counts for ${project.slug}:`, error);
              }
            }
            
            return {
              ...project,
              documents,
              workflowCounts,
            };
          } catch (error) {
            console.error(`Error reading project ${folderName}:`, error);
            return null;
          }
        })
    );

    const validProjects = projects.filter((p): p is ProjectWithDocuments => p !== null);

    // Sort by portfolio score (highest first), then by name
    validProjects.sort((a, b) => {
      const scoreA = a.portfolioScore || 0;
      const scoreB = b.portfolioScore || 0;
      if (scoreB !== scoreA) {
        return scoreB - scoreA;
      }
      return a.name.localeCompare(b.name);
    });

    return NextResponse.json({ projects: validProjects });
  } catch (error) {
    console.error("Error reading projects:", error);
    return NextResponse.json(
      { 
        projects: [],
        error: "Failed to load projects",
        message: "Projects registry is local-only. Use 'npm run manage-projects list' locally to view projects."
      },
      { status: 500 }
    );
  }
}
