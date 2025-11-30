import { NextResponse } from "next/server";
import { readdirSync, readFileSync, existsSync } from "fs";
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
  verdict?: string | null; // PROCEED, PIVOT, or KILL
}

/**
 * Read portfolio score file and extract project info
 */
function readPortfolioScore(slug: string): {
  name: string;
  score: number;
  verdict: string | null;
  niche?: string;
  jtbd?: string;
} | null {
  try {
    // Try docs/portfolio first
    const portfolioPath = join(process.cwd(), "docs", "portfolio", `PORTFOLIO-SCORE-${slug}.md`);
    if (!existsSync(portfolioPath)) {
      // Try project folder
      const projectPortfolioPath = join(process.cwd(), "projects", slug, `PORTFOLIO-SCORE-${slug}.md`);
      if (!existsSync(projectPortfolioPath)) {
        return null;
      }
      const content = readFileSync(projectPortfolioPath, "utf-8");
      return parsePortfolioScore(content, slug);
    }
    const content = readFileSync(portfolioPath, "utf-8");
    return parsePortfolioScore(content, slug);
  } catch {
    return null;
  }
}

function parsePortfolioScore(content: string, slug: string): {
  name: string;
  score: number;
  verdict: string | null;
  niche?: string;
  jtbd?: string;
} | null {
  try {
    // Extract name from title
    const nameMatch = content.match(/^# Portfolio Score: (.+)$/m);
    const name = nameMatch?.[1] || slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

    // Extract score
    const scoreMatch = content.match(/\*\*Total Score\*\*.*?(\d+)\/40/i);
    const score = scoreMatch && scoreMatch[1] ? parseInt(scoreMatch[1]!) : 0;

    // Extract verdict - handle formats like "### Verdict: ✅ **PROCEED**" or "### Verdict: ⚠️ PIVOT"
    // Try multiple patterns to handle different formats
    let verdictMatch = content.match(/### Verdict:\s*[✅⚠️❌]?\s*\*?\*?([A-Z]+)\*?\*?/i);
    if (!verdictMatch) {
      // Fallback: look for "Verdict:" followed by any word in all caps
      verdictMatch = content.match(/### Verdict:\s*[^\n]*?([A-Z]{4,})/i);
    }
    const verdict: string | null = verdictMatch && verdictMatch[1] ? verdictMatch[1].trim() : null;

    // Extract niche
    const nicheMatch = content.match(/\*\*Target Niche\*\*:\s*(.+)/i);
    const niche = nicheMatch?.[1]?.trim();

    // Extract JTBD
    const jtbdMatch = content.match(/\*\*Initial JTBD\*\*:\s*(.+)/i);
    const jtbd = jtbdMatch?.[1]?.trim();

    return { name, score, verdict: verdict ?? null, niche, jtbd };
  } catch {
    return null;
  }
}

/**
 * Load all portfolio scores and create virtual projects for ideas without project folders
 */
function loadAllPortfolioScores(): Map<string, ProjectRegistry> {
  const virtualProjects = new Map<string, ProjectRegistry>();
  
  try {
    const portfolioDir = join(process.cwd(), "docs", "portfolio");
    if (!existsSync(portfolioDir)) {
      return virtualProjects;
    }

    const files = readdirSync(portfolioDir).filter(f => 
      f.startsWith("PORTFOLIO-SCORE-") && f.endsWith(".md")
    );

    for (const file of files) {
      const slug = file.replace("PORTFOLIO-SCORE-", "").replace(".md", "");
      const scoreData = readPortfolioScore(slug);
      
      if (scoreData) {
        // Check if project folder exists
        const projectDir = join(process.cwd(), "projects", slug);
        const hasProjectFolder = existsSync(projectDir);

        // Only create virtual project if no project folder exists
        if (!hasProjectFolder) {
          virtualProjects.set(slug, {
            name: scoreData.name,
            slug,
            description: scoreData.jtbd || scoreData.niche || `Portfolio scored idea: ${scoreData.name}`,
            template: "idea",
            outputPath: portfolioDir,
            features: [],
            envVars: {},
            status: scoreData.score >= 30 ? "validation" : scoreData.score >= 20 ? "validation" : "validation",
            portfolioScore: scoreData.score,
            mrr: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }
      }
    }
  } catch (error) {
    console.error("Error loading portfolio scores:", error);
  }

  return virtualProjects;
}

export async function GET() {
  try {
    // Load all portfolio scores to create virtual projects
    const virtualProjects = loadAllPortfolioScores();
    
    const projectsDir = join(process.cwd(), "projects");
    
    // Check if projects directory exists
    let entries: string[] = [];
    let hasProjectsDir = false;
    try {
      entries = readdirSync(projectsDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && entry.name !== "node_modules")
        .map((entry) => entry.name);
      hasProjectsDir = true;
    } catch {
      // Projects directory doesn't exist or can't be read (e.g., on Vercel)
      // Continue with virtual projects only
      console.log("Projects directory not accessible (this is normal on Vercel)");
    }

    // Check if database is available for workflow counts
    const hasDatabase = !!process.env.DATABASE_URL;

    // Load projects from project folders
    const projectsResults: (ProjectWithDocuments | null)[] = hasProjectsDir
      ? await Promise.all(
          entries
            .filter((folderName): folderName is string => folderName !== undefined)
            .map(async (folderName) => {
              try {
                const project = readProjectFromFolder(folderName, projectsDir);
                if (!project) return null;
                
                // Update portfolio score and verdict from portfolio file if available
                const portfolioData = readPortfolioScore(project.slug);
                if (portfolioData && portfolioData.score > 0) {
                  project.portfolioScore = portfolioData.score;
                }
                
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
                  verdict: portfolioData?.verdict ?? null,
                };
              } catch (error) {
                console.error(`Error reading project ${folderName}:`, error);
                return null;
              }
            })
        )
      : [];

    const validProjects: ProjectWithDocuments[] = projectsResults.filter((p): p is ProjectWithDocuments => p !== null);

    // Track slugs we've already added to prevent duplicates
    const addedSlugs = new Set<string>(validProjects.map(p => p.slug.toLowerCase()));

    // Add virtual projects (ideas with portfolio scores but no project folder)
    for (const [slug, virtualProject] of virtualProjects) {
      // Skip if we already have a real project with this slug (case-insensitive)
      const slugLower = slug.toLowerCase();
      if (addedSlugs.has(slugLower)) {
        continue;
      }

      // Find documents for virtual project (from docs directories)
      const documents = findProjectDocuments(slug, "");

      // Get workflow counts if database is available
      let workflowCounts;
      if (hasDatabase) {
        try {
          workflowCounts = await getWorkflowCountsByProject(slug);
        } catch (error) {
          // Database might not be configured, ignore workflow counts
        }
      }

      // Get verdict from portfolio score
      const portfolioData = readPortfolioScore(slug);
      
      validProjects.push({
        ...virtualProject,
        documents,
        workflowCounts,
        verdict: portfolioData?.verdict ?? null,
      });
      
      // Mark this slug as added
      addedSlugs.add(slugLower);
    }

    // Sort by portfolio score (highest first), then by name
    validProjects.sort((a, b) => {
      const scoreA = a.portfolioScore || 0;
      const scoreB = b.portfolioScore || 0;
      if (scoreB !== scoreA) {
        return scoreB - scoreA;
      }
      return a.name.localeCompare(b.name);
    });

    // If no projects at all, return helpful message
    if (validProjects.length === 0 && !hasProjectsDir) {
      return NextResponse.json({ 
        projects: [],
        message: "Projects registry is local-only. Use 'npm run manage-projects list' locally to view projects."
      });
    }

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
