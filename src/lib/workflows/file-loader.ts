/**
 * File-based workflow loader
 * 
 * Discovers workflows from existing documents when database is not configured
 */

import { readdirSync, statSync, readFileSync } from "fs";
import { join } from "path";
import type { Workflow } from "./types";

const PROJECT_ROOT = process.cwd();

/**
 * Discover workflows from validation and discovery documents
 */
export function discoverWorkflowsFromFiles(): Workflow[] {
  const workflows: Workflow[] = [];

  // Check for validation plans (validation workflows)
  const validationDir = join(PROJECT_ROOT, "docs/validation");
  try {
    if (statSync(validationDir).isDirectory()) {
      const files = readdirSync(validationDir).filter(
        (f) => f.startsWith("VALIDATION-PLAN-") && f.endsWith(".md")
      );

      for (const file of files) {
        // Extract project slug from filename: VALIDATION-PLAN-<slug>.md
        const slug = file
          .replace(/^VALIDATION-PLAN-/, "")
          .replace(/\.md$/, "")
          .toLowerCase();

        // Try to get project name from portfolio score or project folder
        const projectName = getProjectName(slug);

        workflows.push({
          id: `validation-${slug}-${Date.now()}`,
          ideaSlug: slug,
          ideaName: projectName,
          phase: "validation",
          status: "completed",
          steps: [
            {
              id: "validation-plan",
              name: "Validation Plan Created",
              status: "completed",
              completedAt: getFileModifiedTime(join(validationDir, file)),
            },
          ],
          createdAt: getFileModifiedTime(join(validationDir, file)),
          updatedAt: getFileModifiedTime(join(validationDir, file)),
        });
      }
    }
  } catch {
    // Directory doesn't exist, skip
  }

  // Check for discovery documents (discovery workflows)
  // Look for projects with NARRATIVE, PERSONA, or COMPETITORS documents
  const discoveryDirs = [
    join(PROJECT_ROOT, "docs/discovery"),
    join(PROJECT_ROOT, "docs/product"),
    join(PROJECT_ROOT, "docs/research"),
    join(PROJECT_ROOT, "projects"),
  ];

  const discoveredProjects = new Set<string>();

  for (const dir of discoveryDirs) {
    try {
      if (!statSync(dir).isDirectory()) continue;

      const files = readdirSync(dir).filter(
        (f) =>
          f.endsWith(".md") &&
          (f.startsWith("NARRATIVE-") ||
            f.startsWith("PERSONA-") ||
            f.startsWith("COMPETITORS-") ||
            f.startsWith("MANUS-"))
      );

      for (const file of files) {
        // Extract project slug from filename
        let slug = file
          .replace(/^(NARRATIVE|PERSONA|COMPETITORS|MANUS)-/, "")
          .replace(/\.md$/, "")
          .toLowerCase();

        // Skip if we've already created a workflow for this project
        if (discoveredProjects.has(slug)) continue;

        // Check if this project already has a validation workflow
        const hasValidation = workflows.some(
          (w) => w.ideaSlug === slug && w.phase === "validation"
        );

        // Only create discovery workflow if no validation workflow exists
        if (!hasValidation) {
          const projectName = getProjectName(slug);
          discoveredProjects.add(slug);

          workflows.push({
            id: `discovery-${slug}-${Date.now()}`,
            ideaSlug: slug,
            ideaName: projectName,
            phase: "discovery",
            status: "completed",
            steps: [
              {
                id: "discovery-docs",
                name: "Discovery Documents Created",
                status: "completed",
                completedAt: getFileModifiedTime(join(dir, file)),
              },
            ],
            createdAt: getFileModifiedTime(join(dir, file)),
            updatedAt: getFileModifiedTime(join(dir, file)),
          });
        }
      }
    } catch {
      // Directory doesn't exist, skip
    }
  }

  return workflows;
}

/**
 * Get project name from portfolio score or project folder
 */
function getProjectName(slug: string): string {
  // Try portfolio score first
  const portfolioScorePath = join(
    PROJECT_ROOT,
    "docs/portfolio",
    `PORTFOLIO-SCORE-${slug}.md`
  );
  try {
    if (statSync(portfolioScorePath).isFile()) {
      const content = readFileSync(portfolioScorePath, "utf-8");
      const nameMatch = content.match(/^#\s+(.+)$/m);
      if (nameMatch) {
        return nameMatch[1].trim();
      }
    }
  } catch {
    // File doesn't exist, continue
  }

  // Try project folder README
  const projectReadmePath = join(PROJECT_ROOT, "projects", slug, "README.md");
  try {
    if (statSync(projectReadmePath).isFile()) {
      const content = readFileSync(projectReadmePath, "utf-8");
      const nameMatch = content.match(/^#\s+(.+)$/m);
      if (nameMatch) {
        return nameMatch[1].trim();
      }
    }
  } catch {
    // File doesn't exist, continue
  }

  // Fallback: format slug as title
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Get file modified time as ISO string
 */
function getFileModifiedTime(filePath: string): string {
  try {
    const stats = statSync(filePath);
    return stats.mtime.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

