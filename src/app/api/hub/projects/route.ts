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
      files = readdirSync(projectsDir).filter((f) => f.endsWith(".json"));
    } catch {
      return NextResponse.json({ projects: [] });
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
      { error: "Failed to load projects" },
      { status: 500 }
    );
  }
}

