#!/usr/bin/env tsx
/**
 * Project Management CLI
 * 
 * Manages the portfolio of spawned projects from this hub.
 * 
 * Usage:
 *   npm run manage-projects list
 *   npm run manage-projects status <project-slug>
 *   npm run manage-projects update <project-slug>
 */

import { existsSync, readFileSync, readdirSync, writeFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const HUB_ROOT = join(__dirname, "..");
const PROJECTS_DIR = join(HUB_ROOT, "projects");

interface ProjectRegistry {
  name: string;
  slug: string;
  description: string;
  template: string;
  outputPath: string;
  gitRepo?: string;
  features: string[];
  envVars: Record<string, string>;
  createdAt: string;
  updatedAt: string;
  status?: "validation" | "engineering" | "growth" | "maintenance" | "killed";
  portfolioScore?: number;
  mrr?: number;
}

function listProjects(): void {
  if (!existsSync(PROJECTS_DIR)) {
    console.log("No projects found.");
    return;
  }

  const files = readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".json"));
  const projects: ProjectRegistry[] = files.map((file) => {
    const content = readFileSync(join(PROJECTS_DIR, file), "utf-8");
    return JSON.parse(content);
  });

  if (projects.length === 0) {
    console.log("No projects found.");
    return;
  }

  console.log(`\n📦 Portfolio: ${projects.length} projects\n`);

  projects.forEach((project) => {
    const status = project.status || "unknown";
    const score = project.portfolioScore ? ` (Score: ${project.portfolioScore})` : "";
    const mrr = project.mrr ? ` | MRR: $${project.mrr}` : "";
    console.log(`  ${project.slug}`);
    console.log(`    Name: ${project.name}`);
    console.log(`    Status: ${status}${score}${mrr}`);
    console.log(`    Path: ${project.outputPath}`);
    if (project.gitRepo) {
      console.log(`    Repo: ${project.gitRepo}`);
    }
    console.log("");
  });
}

function showProjectStatus(slug: string): void {
  const registryPath = join(PROJECTS_DIR, `${slug}.json`);

  if (!existsSync(registryPath)) {
    console.error(`Error: Project "${slug}" not found`);
    process.exit(1);
  }

  const project: ProjectRegistry = JSON.parse(
    readFileSync(registryPath, "utf-8"),
  );

  console.log(`\n📊 Project: ${project.name} (${project.slug})\n`);
  console.log(`Description: ${project.description}`);
  console.log(`Template: ${project.template}`);
  console.log(`Status: ${project.status || "unknown"}`);
  console.log(`Portfolio Score: ${project.portfolioScore || "not scored"}`);
  console.log(`MRR: $${project.mrr || 0}`);
  console.log(`Created: ${project.createdAt}`);
  console.log(`Updated: ${project.updatedAt}`);
  console.log(`\nPath: ${project.outputPath}`);
  if (project.gitRepo) {
    console.log(`Repo: ${project.gitRepo}`);
  }
  console.log(`\nFeatures: ${project.features.length > 0 ? project.features.join(", ") : "None"}`);
}

function updateProject(slug: string, updates: Partial<ProjectRegistry>): void {
  const registryPath = join(PROJECTS_DIR, `${slug}.json`);

  if (!existsSync(registryPath)) {
    console.error(`Error: Project "${slug}" not found`);
    process.exit(1);
  }

  const project: ProjectRegistry = JSON.parse(
    readFileSync(registryPath, "utf-8"),
  );

  const updated = {
    ...project,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  writeFileSync(registryPath, JSON.stringify(updated, null, 2) + "\n");
  console.log(`✅ Project "${slug}" updated`);
}

function main(): void {
  const command = process.argv[2];

  switch (command) {
    case "list":
      listProjects();
      break;
    case "status":
      const slug = process.argv[3];
      if (!slug) {
        console.error("Error: Project slug required");
        console.log("Usage: npm run manage-projects status <project-slug>");
        process.exit(1);
      }
      showProjectStatus(slug);
      break;
    case "update":
      const updateSlug = process.argv[3];
      if (!updateSlug) {
        console.error("Error: Project slug required");
        console.log("Usage: npm run manage-projects update <project-slug>");
        process.exit(1);
      }
      // Parse updates from command line (simplified - could be enhanced)
      const status = process.argv[4];
      const updates: Partial<ProjectRegistry> = {};
      if (status) {
        updates.status = status as ProjectRegistry["status"];
      }
      updateProject(updateSlug, updates);
      break;
    default:
      console.log("Usage:");
      console.log("  npm run manage-projects list");
      console.log("  npm run manage-projects status <project-slug>");
      console.log("  npm run manage-projects update <project-slug> [status]");
      process.exit(1);
  }
}

main();

