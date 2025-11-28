/**
 * Check for existing Manus discovery results for all Batch 1 projects
 */

// Load environment variables from .env.local
import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { listWorkflowsByPhase } from "../src/lib/workflows/db";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

interface Batch1Project {
  name: string;
  slug: string;
}

const BATCH_1_PROJECTS: Batch1Project[] = [
  {
    name: "Amazon FBA Seller Intelligence",
    slug: "amazon-fba-seller-intelligence",
  },
  {
    name: "Real Estate Investor & Flipper Platform",
    slug: "real-estate-investor-flipper",
  },
  {
    name: "AI Meeting Assistant",
    slug: "ai-meeting-assistant",
  },
  {
    name: "AI Code Review & Documentation Tool",
    slug: "ai-code-review-docs",
  },
  {
    name: "Enterprise Design System for Startups",
    slug: "enterprise-design-system-startups",
  },
];

async function checkExistingDiscovery() {
  console.log("🔍 Checking for existing Manus discovery results...\n");

  const outputDir = join(process.cwd(), "docs", "discovery");
  const results: Array<{
    project: Batch1Project;
    fileExists: boolean;
    workflowExists: boolean;
    step1Completed: boolean;
    hasData: boolean;
  }> = [];

  // Check files
  for (const project of BATCH_1_PROJECTS) {
    const filePath = join(outputDir, `MANUS-${project.slug}.md`);
    const fileExists = existsSync(filePath);
    
    let fileHasData = false;
    if (fileExists) {
      try {
        const content = readFileSync(filePath, "utf-8");
        const rawDataMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
        if (rawDataMatch) {
          const parsed = JSON.parse(rawDataMatch[1]);
          fileHasData = !!(parsed.narrative || parsed.persona || parsed.competitors);
        }
      } catch (error) {
        // File exists but couldn't parse
      }
    }

    results.push({
      project,
      fileExists,
      workflowExists: false,
      step1Completed: false,
      hasData: fileHasData,
    });
  }

  // Check database workflows
  if (process.env.DATABASE_URL) {
    try {
      console.log("🔌 Connecting to database...");
      const workflows = await listWorkflowsByPhase("discovery");
      console.log(`✅ Found ${workflows.length} workflow(s) in database\n`);
      
      for (const workflow of workflows) {
        const result = results.find((r) => r.project.slug === workflow.ideaSlug);
        if (result) {
          result.workflowExists = true;
          const step1 = workflow.steps.find((s) => s.id === "step-1");
          if (step1) {
            result.step1Completed = step1.status === "completed";
            if (step1.output) {
              try {
                const parsed = JSON.parse(step1.output);
                result.hasData = !!(parsed.narrative || parsed.persona || parsed.competitors);
              } catch {
                // Couldn't parse
              }
            }
          }
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      console.error(`\n❌ Database connection error:`);
      console.error(`   Message: ${errorMessage}`);
      if (errorStack) {
        console.error(`   Stack: ${errorStack.split('\n').slice(0, 3).join('\n')}`);
      }
      console.error(`\n💡 Troubleshooting:`);
      console.error(`   1. Check DATABASE_URL in .env.local`);
      console.error(`   2. Verify database is running and accessible`);
      console.error(`   3. Check SSL requirements (may need ?sslmode=require)`);
      console.error(`   4. Verify network connectivity\n`);
    }
  } else {
    console.log("ℹ️  DATABASE_URL not set - skipping database check\n");
  }

  // Display results
  console.log("=".repeat(80));
  console.log("📊 Existing Discovery Results Summary");
  console.log("=".repeat(80));
  console.log();

  for (const result of results) {
    const status = result.hasData ? "✅ COMPLETE" : result.fileExists || result.workflowExists ? "⚠️  PARTIAL" : "❌ MISSING";
    console.log(`${status} ${result.project.name}`);
    console.log(`   Slug: ${result.project.slug}`);
    console.log(`   File: ${result.fileExists ? "✅ exists" : "❌ missing"}`);
    console.log(`   Workflow: ${result.workflowExists ? "✅ exists" : "❌ missing"}`);
    console.log(`   Step 1: ${result.step1Completed ? "✅ completed" : "❌ not completed"}`);
    console.log(`   Has Data: ${result.hasData ? "✅ yes" : "❌ no"}`);
    console.log();
  }

  const complete = results.filter((r) => r.hasData).length;
  const partial = results.filter((r) => (r.fileExists || r.workflowExists) && !r.hasData).length;
  const missing = results.filter((r) => !r.fileExists && !r.workflowExists).length;

  console.log("=".repeat(80));
  console.log(`📈 Summary: ${complete} complete, ${partial} partial, ${missing} missing`);
  console.log("=".repeat(80));

  if (complete === BATCH_1_PROJECTS.length) {
    console.log("\n✨ All projects have complete Manus discovery packs!");
    console.log("💡 You can skip API calls for all projects.");
  } else if (complete > 0) {
    console.log(`\n💡 ${complete} projects can skip API calls.`);
    console.log(`   ${BATCH_1_PROJECTS.length - complete} projects need new API calls.`);
  }

  if (missing > 0) {
    console.log("\n📝 Note: If you ran these in Manus manually, you can:");
    console.log("   1. Check your Manus dashboard for task IDs");
    console.log("   2. Use the task IDs to retrieve results");
    console.log("   3. Or re-run the discovery script to generate new results");
  }
}

checkExistingDiscovery().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});

