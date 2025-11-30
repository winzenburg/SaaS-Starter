/**
 * Helper functions for project management
 * 
 * Extracted from API route to improve maintainability
 */

import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";

export interface ProjectRegistry {
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

export interface ProjectDocument {
  name: string;
  type: "discovery" | "validation" | "insight" | "portfolio" | "moat" | "retention" | "prd" | "other";
  path: string;
  size: number;
  modified: string;
  phase?: "discovery" | "validation" | "build" | "scale";
}

export function getDocumentType(
  filename: string
): { type: ProjectDocument["type"]; phase?: ProjectDocument["phase"] } {
  const lower = filename.toLowerCase();

  // Discovery documents
  if (
    lower.includes("niche-intel") ||
    lower.includes("pain-signals") ||
    lower.includes("jtbd") ||
    lower.includes("opportunity") ||
    lower.includes("discovery-demo")
  ) {
    return { type: "discovery", phase: "discovery" };
  }

  // Validation documents
  if (
    lower.includes("validation-plan") ||
    lower.includes("landing") ||
    lower.includes("distribution") ||
    lower.includes("pricing-test") ||
    lower.includes("creative-batch") ||
    lower.includes("results") ||
    lower.includes("redteam") ||
    lower.includes("narrative") ||
    lower.includes("persona") ||
    lower.includes("competitors") ||
    lower.includes("market")
  ) {
    return { type: "validation", phase: "validation" };
  }

  // Build documents
  if (lower.includes("insight")) return { type: "insight", phase: "build" };
  if (lower.includes("portfolio")) return { type: "portfolio", phase: "build" };
  if (lower.includes("moat")) return { type: "moat", phase: "build" };
  if (lower.includes("retention")) return { type: "retention", phase: "build" };
  if (lower.includes("prd")) return { type: "prd", phase: "build" };

  return { type: "other" };
}

export function findDocumentsInDirectory(
  dir: string,
  basePath: string,
  projectSlug: string
): ProjectDocument[] {
  const documents: ProjectDocument[] = [];

  try {
    // Check if directory exists and is actually a directory
    let dirStats;
    try {
      dirStats = statSync(dir);
    } catch {
      // Directory doesn't exist, return empty array
      return documents;
    }

    if (!dirStats.isDirectory()) {
      return documents;
    }

    const files = readdirSync(dir).filter((f) => f.endsWith(".md") && f !== "README.md");

    for (const file of files) {
      // Check if file matches this project's slug
      if (!file.toLowerCase().includes(projectSlug.toLowerCase())) continue;

      try {
        const filePath = join(dir, file);
        const stats = statSync(filePath);
        const { type, phase } = getDocumentType(file);

        // Clean up name: remove project slug suffix but keep document type prefix
        const cleanName = file.replace(".md", "").replace(`-${projectSlug}`, "");

        documents.push({
          name: cleanName,
          type,
          phase,
          path: `${basePath}/${file.replace(".md", "")}`,
          size: stats.size,
          modified: stats.mtime.toISOString(),
        });
      } catch {
        // Skip files we can't read
      }
    }
  } catch (error) {
    // Directory doesn't exist or can't be read - silently return empty array
    console.debug(`Could not read directory ${dir}:`, error);
  }

  return documents;
}

export function findProjectDocuments(
  projectSlug: string,
  projectDir: string
): ProjectDocument[] {
  const documents: ProjectDocument[] = [];

  // 1. Find documents in project folder (legacy + product docs)
  const projectDocs = findDocumentsInDirectory(
    projectDir,
    `/projects/${projectSlug}`,
    projectSlug
  );
  documents.push(...projectDocs);

  // 2. Find discovery documents in /docs/discovery/
  const discoveryDir = join(process.cwd(), "docs", "discovery");
  const discoveryDocs = findDocumentsInDirectory(discoveryDir, "/docs/discovery", projectSlug);
  documents.push(...discoveryDocs);

  // 3. Find validation documents in /docs/validation/
  const validationDir = join(process.cwd(), "docs", "validation");
  const validationDocs = findDocumentsInDirectory(
    validationDir,
    "/docs/validation",
    projectSlug
  );
  documents.push(...validationDocs);

  // 4. Find product documents in /docs/product/ (NARRATIVE, INSIGHT, PRD, etc.)
  const productDir = join(process.cwd(), "docs", "product");
  const productDocs = findDocumentsInDirectory(
    productDir,
    "/docs/product",
    projectSlug
  );
  documents.push(...productDocs);

  // 5. Find research documents in /docs/research/ (PERSONA, COMPETITORS, MARKET, etc.)
  const researchDir = join(process.cwd(), "docs", "research");
  const researchDocs = findDocumentsInDirectory(
    researchDir,
    "/docs/research",
    projectSlug
  );
  documents.push(...researchDocs);

  // 6. Find portfolio scores in /docs/portfolio/
  const portfolioDir = join(process.cwd(), "docs", "portfolio");
  const portfolioDocs = findDocumentsInDirectory(
    portfolioDir,
    "/docs/portfolio",
    projectSlug
  );
  documents.push(...portfolioDocs);

  // 7. Find orchestrator outputs in /docs/ideas/
  const ideasDir = join(process.cwd(), "docs", "ideas", projectSlug);
  const ideaDocs = findDocumentsInDirectory(ideasDir, `/docs/ideas/${projectSlug}`, projectSlug);
  documents.push(...ideaDocs);

  // Sort by phase priority, then by type priority, then by name
  const phaseOrder: Record<NonNullable<ProjectDocument["phase"]> | "none", number> = {
    discovery: 1,
    validation: 2,
    build: 3,
    scale: 4,
    none: 5,
  };

  const typeOrder: Record<ProjectDocument["type"], number> = {
    discovery: 1,
    validation: 2,
    insight: 3,
    portfolio: 4,
    prd: 5,
    moat: 6,
    retention: 7,
    other: 8,
  };

  documents.sort((a, b) => {
    const phaseDiff = phaseOrder[a.phase || "none"] - phaseOrder[b.phase || "none"];
    if (phaseDiff !== 0) return phaseDiff;
    const typeDiff = typeOrder[a.type] - typeOrder[b.type];
    if (typeDiff !== 0) return typeDiff;
    return a.name.localeCompare(b.name);
  });

  return documents;
}

export function readProjectFromFolder(
  folderName: string,
  projectsDir: string
): ProjectRegistry | null {
  try {
    const projectDir = join(projectsDir, folderName);
    const jsonFile = join(projectsDir, `${folderName}.json`);

    // Try to read JSON file first (legacy format)
    let projectData: Partial<ProjectRegistry> = {};
    try {
      const dirContents = readdirSync(projectsDir);
      if (dirContents.includes(`${folderName}.json`)) {
        const content = readFileSync(jsonFile, "utf-8");
        projectData = JSON.parse(content);
      }
    } catch {
      // JSON file doesn't exist, that's okay
    }

    // Read README.md to extract project info if JSON doesn't exist
    try {
      const readmePath = join(projectDir, "README.md");
      const projectDirContents = readdirSync(projectDir);
      if (projectDirContents.includes("README.md")) {
        const readmeContent = readFileSync(readmePath, "utf-8");
        // Extract name from README title
        const nameMatch = readmeContent.match(/^# (.+)$/m);
        if (nameMatch && !projectData.name) {
          projectData.name = nameMatch[1];
        }
        // Extract status from README
        const statusMatch = readmeContent.match(/\*\*Status\*\*:\s*(.+)/i);
        if (statusMatch && statusMatch[1] && !projectData.status) {
          const status = statusMatch[1].toLowerCase().trim();
          if (
            ["validation", "engineering", "growth", "maintenance", "killed"].includes(status)
          ) {
            projectData.status = status as ProjectRegistry["status"];
          }
        }
        // Extract opportunity score
        const scoreMatch = readmeContent.match(/\*\*Opportunity Score\*\*:\s*([\d.]+)/i);
        if (scoreMatch && scoreMatch[1] && !projectData.portfolioScore) {
          projectData.portfolioScore = parseFloat(scoreMatch[1]) * 4; // Convert 0-10 to 0-40 scale
        }
      }
    } catch {
      // README doesn't exist or can't be read
    }

    // Read portfolio score to get actual score
    try {
      const projectDirContents = readdirSync(projectDir);
      const portfolioFiles = projectDirContents.filter((f) => f.includes("PORTFOLIO-SCORE"));
      if (portfolioFiles.length > 0) {
        const portfolioPath = join(projectDir, portfolioFiles[0]!);
        const portfolioContent = readFileSync(portfolioPath, "utf-8");
        const scoreMatch = portfolioContent.match(/\*\*Total Score\*\*:\s*(\d+)\/40/i);
        if (scoreMatch) {
          projectData.portfolioScore = parseInt(scoreMatch[1]!);
        }
      }
    } catch {
      // Can't read portfolio score
    }

    // Default values
    return {
      name:
        projectData.name ||
        folderName
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" "),
      slug: folderName,
      description: projectData.description || `Project: ${folderName}`,
      template: projectData.template || "saas-starter",
      outputPath: projectDir,
      gitRepo: projectData.gitRepo,
      features: projectData.features || [],
      envVars: projectData.envVars || {},
      status: projectData.status || "validation",
      portfolioScore: projectData.portfolioScore,
      mrr: projectData.mrr || 0,
      createdAt: projectData.createdAt || new Date().toISOString(),
      updatedAt: projectData.updatedAt || new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

