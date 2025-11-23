#!/usr/bin/env tsx
/**
 * Project Generator CLI
 * 
 * Creates a new SaaS project from this hub template.
 * 
 * Usage:
 *   npm run create-project <project-name>
 *   npm run create-project <project-name> -- --template <template-name>
 *   npm run create-project <project-name> -- --output <path>
 */

import { execSync } from "child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync, cpSync } from "fs";
import { join, dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const HUB_ROOT = resolve(__dirname, "..");

interface ProjectConfig {
  name: string;
  slug: string;
  description: string;
  template?: string;
  outputPath: string;
  gitRepo?: string;
  features: string[];
  envVars: Record<string, string>;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function parseArgs(): {
  projectName: string;
  template?: string;
  outputPath?: string;
  gitRepo?: string;
} {
  const args = process.argv.slice(2);
  const projectName = args[0];

  if (!projectName) {
    console.error("Error: Project name is required");
    console.log("\nUsage:");
    console.log("  npm run create-project <project-name>");
    console.log("  npm run create-project <project-name> -- --template <template-name>");
    console.log("  npm run create-project <project-name> -- --output <path>");
    process.exit(1);
  }

  const templateIndex = args.indexOf("--template");
  const outputIndex = args.indexOf("--output");
  const gitIndex = args.indexOf("--git");

  return {
    projectName,
    template: templateIndex !== -1 ? args[templateIndex + 1] : undefined,
    outputPath: outputIndex !== -1 ? args[outputIndex + 1] : undefined,
    gitRepo: gitIndex !== -1 ? args[gitIndex + 1] : undefined,
  };
}

function getProjectConfig(projectName: string, template?: string): ProjectConfig {
  const slug = slugify(projectName);
  const outputPath = join(HUB_ROOT, "..", slug);

  // Check if project registry exists and has config
  const registryPath = join(HUB_ROOT, "projects", `${slug}.json`);
  let config: Partial<ProjectConfig> = {};

  if (existsSync(registryPath)) {
    try {
      config = JSON.parse(readFileSync(registryPath, "utf-8"));
    } catch (e) {
      console.warn(`Warning: Could not parse registry file ${registryPath}`);
    }
  }

  return {
    name: projectName,
    slug,
    description: config.description || `${projectName} - SaaS project`,
    template: template || config.template || "default",
    outputPath: config.outputPath || outputPath,
    gitRepo: config.gitRepo,
    features: config.features || [],
    envVars: config.envVars || {},
  };
}

function copyTemplate(config: ProjectConfig): void {
  const templatePath = join(HUB_ROOT, "templates", config.template || "default");

  if (!existsSync(templatePath)) {
    console.error(`Error: Template "${config.template}" not found`);
    console.log(`Available templates: ${listTemplates().join(", ")}`);
    process.exit(1);
  }

  console.log(`📦 Copying template "${config.template}"...`);

  // Create output directory
  if (existsSync(config.outputPath)) {
    console.error(`Error: Directory ${config.outputPath} already exists`);
    process.exit(1);
  }

  mkdirSync(config.outputPath, { recursive: true });

  // Copy template files
  cpSync(templatePath, config.outputPath, { recursive: true });

  // Copy hub files (excluding node_modules, .git, etc.)
  const filesToCopy = [
    "package.json",
    "tsconfig.json",
    "next.config.ts",
    "tailwind.config.ts",
    "drizzle.config.ts",
    "vitest.config.ts",
    "playwright.config.ts",
    "postcss.config.mjs",
    "vercel.json",
    ".gitignore",
    ".cursor",
    "src",
    "e2e",
    "docs",
    "prisma",
  ];

  filesToCopy.forEach((file) => {
    const sourcePath = join(HUB_ROOT, file);
    const destPath = join(config.outputPath, file);

    if (existsSync(sourcePath)) {
      if (file === ".cursor") {
        // Copy .cursor directory but filter out hub-specific rules
        cpSync(sourcePath, destPath, { recursive: true });
      } else {
        cpSync(sourcePath, destPath, { recursive: true });
      }
    }
  });
}

function customizeProject(config: ProjectConfig): void {
  console.log(`🔧 Customizing project files...`);

  const packageJsonPath = join(config.outputPath, "package.json");
  if (existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
    packageJson.name = config.slug;
    packageJson.description = config.description;
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");
  }

  // Update README
  const readmePath = join(config.outputPath, "README.md");
  if (existsSync(readmePath)) {
    let readme = readFileSync(readmePath, "utf-8");
    readme = readme.replace(/SaaS Starter/g, config.name);
    readme = readme.replace(/saas-starter/g, config.slug);
    writeFileSync(readmePath, readme);
  }

  // Create .env.example
  const envExamplePath = join(config.outputPath, ".env.example");
  const envExample = `# Database
DATABASE_URL="postgresql://user:password@localhost:5432/${config.slug}"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
`;
  writeFileSync(envExamplePath, envExample);

  // Create project-specific docs
  const projectDocsPath = join(config.outputPath, "docs", "project");
  mkdirSync(projectDocsPath, { recursive: true });

  const projectInfo = `# ${config.name}

Generated from SaaS Starter Hub on ${new Date().toISOString()}

## Project Details

- **Name**: ${config.name}
- **Slug**: ${config.slug}
- **Template**: ${config.template}
${config.gitRepo ? `- **Git Repo**: ${config.gitRepo}` : ""}

## Features

${config.features.map((f) => `- ${f}`).join("\n") || "- None configured yet"}

## Next Steps

1. Set up environment variables (copy .env.example to .env)
2. Initialize database: \`npm run db:push\`
3. Start development: \`npm run dev\`
4. Follow validation workflow: See docs/GETTING_STARTED.md
`;

  writeFileSync(join(projectDocsPath, "README.md"), projectInfo);
}

function initializeGit(config: ProjectConfig): void {
  if (!config.gitRepo) {
    console.log("⏭️  Skipping Git initialization (no repo specified)");
    return;
  }

  console.log(`🔨 Initializing Git repository...`);

  try {
    execSync("git init", { cwd: config.outputPath, stdio: "inherit" });
    execSync("git add .", { cwd: config.outputPath, stdio: "inherit" });
    execSync('git commit -m "Initial commit from SaaS Starter Hub"', {
      cwd: config.outputPath,
      stdio: "inherit",
    });
    execSync(`git remote add origin ${config.gitRepo}`, {
      cwd: config.outputPath,
      stdio: "inherit",
    });
    console.log(`✅ Git repository initialized`);
    console.log(`   Run: cd ${config.outputPath} && git push -u origin main`);
  } catch (error) {
    console.warn("Warning: Git initialization failed (this is okay)");
  }
}

function updateRegistry(config: ProjectConfig): void {
  const registryDir = join(HUB_ROOT, "projects");
  mkdirSync(registryDir, { recursive: true });

  const registryPath = join(registryDir, `${config.slug}.json`);
  const registryData = {
    name: config.name,
    slug: config.slug,
    description: config.description,
    template: config.template,
    outputPath: config.outputPath,
    gitRepo: config.gitRepo,
    features: config.features,
    envVars: config.envVars,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  writeFileSync(registryPath, JSON.stringify(registryData, null, 2) + "\n");
  console.log(`📝 Project registered: ${registryPath}`);
}

function listTemplates(): string[] {
  const templatesPath = join(HUB_ROOT, "templates");
  if (!existsSync(templatesPath)) {
    return ["default"];
  }
  return ["default"]; // Add more templates as needed
}

function main(): void {
  const args = parseArgs();
  const config = getProjectConfig(args.projectName, args.template);

  if (args.outputPath) {
    config.outputPath = resolve(args.outputPath);
  }

  if (args.gitRepo) {
    config.gitRepo = args.gitRepo;
  }

  console.log(`🚀 Creating project: ${config.name}`);
  console.log(`   Slug: ${config.slug}`);
  console.log(`   Template: ${config.template}`);
  console.log(`   Output: ${config.outputPath}`);

  copyTemplate(config);
  customizeProject(config);
  updateRegistry(config);
  initializeGit(config);

  console.log(`\n✅ Project created successfully!`);
  console.log(`\nNext steps:`);
  console.log(`  1. cd ${config.outputPath}`);
  console.log(`  2. npm install`);
  console.log(`  3. cp .env.example .env`);
  console.log(`  4. npm run db:push`);
  console.log(`  5. npm run dev`);
}

main();

