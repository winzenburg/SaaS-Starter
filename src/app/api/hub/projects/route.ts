import { NextResponse } from "next/server";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";

interface ProjectRegistry {
  name: string;
  slug: string;
  description: string;
  template: string;
  outputPath: string;
  gitRepo?: string;
  features: string[];
  envVars: Record<string, string>;
  status?: "validation" | "engineering" | "growth" | "maintenance" | "killed";
  portfolioScore?: number;
  mrr?: number;
  createdAt: string;
  updatedAt: string;
}

export async function GET() {
  try {
    const projectsDir = join(process.cwd(), "projects");
    
    // Check if projects directory exists
    let files: string[] = [];
    try {
      files = readdirSync(projectsDir).filter((f) => f.endsWith(".json") && f !== ".gitkeep");
    } catch {
      // Projects directory doesn't exist or can't be read (e.g., on Vercel)
      // Return empty array - this is expected for deployed hub
      console.log("Projects directory not accessible (this is normal on Vercel)");
      return NextResponse.json({ 
        projects: [],
        message: "Projects registry is local-only. Use 'npm run manage-projects list' locally to view projects."
      });
    }

    if (files.length === 0) {
      return NextResponse.json({ 
        projects: [],
        message: "No projects found. Create one with 'npm run create-project \"Project Name\"'"
      });
    }

    const projects: ProjectRegistry[] = files.map((file) => {
      try {
        const content = readFileSync(join(projectsDir, file), "utf-8");
        return JSON.parse(content);
      } catch (error) {
        console.error(`Error reading ${file}:`, error);
        return null;
      }
    }).filter((p): p is ProjectRegistry => p !== null);

    // Sort by portfolio score (highest first), then by name
    projects.sort((a, b) => {
      const scoreA = a.portfolioScore || 0;
      const scoreB = b.portfolioScore || 0;
      if (scoreB !== scoreA) {
        return scoreB - scoreA;
      }
      return a.name.localeCompare(b.name);
    });

    return NextResponse.json({ projects });
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

