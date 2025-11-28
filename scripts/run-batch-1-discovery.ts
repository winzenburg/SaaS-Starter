/**
 * Run Batch 1 Discovery Workflow - Step 1 (Manus)
 * 
 * Executes Step 1 (Manus Discovery Pack) for all 5 Batch 1 projects
 */

// Load environment variables from .env.local
import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import {
  generateDiscoveryPack,
} from "../src/lib/ai-tools/manus";
import { createDiscoveryWorkflow } from "../src/lib/workflows/discovery";
import { saveWorkflow, listWorkflowsByPhase } from "../src/lib/workflows/db";
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "fs";
import { join } from "path";

interface Batch1Project {
  name: string;
  slug: string;
  niche: string;
  jtbd: string;
  buyer: string;
  description: string;
}

const BATCH_1_PROJECTS: Batch1Project[] = [
  {
    name: "Amazon FBA Seller Intelligence",
    slug: "amazon-fba-seller-intelligence",
    niche: "Amazon Sellers",
    jtbd: "Help me understand my product performance and find new opportunities",
    buyer: "FBA seller or small brand owner",
    description: "Intelligence platform for Amazon FBA sellers to analyze product performance, identify opportunities, and optimize their business",
  },
  {
    name: "Real Estate Investor & Flipper Platform",
    slug: "real-estate-investor-flipper",
    niche: "Real estate investors/flippers",
    jtbd: "Help me analyze deals, track renos, and ROI",
    buyer: "Small investor, flipper",
    description: "Platform for real estate investors and flippers to analyze deals, track renovations, and calculate ROI",
  },
  {
    name: "AI Meeting Assistant",
    slug: "ai-meeting-assistant",
    niche: "Sales teams, founders, CS reps",
    jtbd: "Help me capture meeting notes and update my CRM automatically",
    buyer: "Sales leader, AE, founder",
    description: "AI-powered meeting assistant that captures notes and automatically updates CRM systems",
  },
  {
    name: "AI Code Review & Documentation Tool",
    slug: "ai-code-review-docs",
    niche: "Engineers, startups",
    jtbd: "Help me generate clean code reviews and documentation instantly",
    buyer: "CTO, dev lead, IC engineer",
    description: "AI tool for engineers to generate code reviews and documentation automatically",
  },
  {
    name: "Enterprise Design System for Startups",
    slug: "enterprise-design-system-startups",
    niche: "Startups, scale-ups, CTOs/Heads of Product",
    jtbd: "Help me ship UI consistently and faster",
    buyer: "CTO, Head of Product, Lead Designer",
    description: "Enterprise-grade design system and component library for startups to ship consistent UI faster",
  },
];

/**
 * Check for existing Manus discovery results
 */
async function loadExistingDiscovery(projectSlug: string): Promise<{
  found: boolean;
  data?: unknown;
  source: "file" | "database" | null;
}> {
  // Check for existing markdown file
  const outputDir = join(process.cwd(), "docs", "discovery");
  const filePath = join(outputDir, `MANUS-${projectSlug}.md`);
  
  if (existsSync(filePath)) {
    try {
      const content = readFileSync(filePath, "utf-8");
      // Extract JSON from the Raw Data section
      const rawDataMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
      if (rawDataMatch) {
        const parsed = JSON.parse(rawDataMatch[1]);
        return { found: true, data: parsed, source: "file" };
      }
    } catch (error) {
      console.warn(`   ⚠️  Could not parse existing file: ${error}`);
    }
  }

  // Check for existing workflow in database
  if (process.env.DATABASE_URL) {
    try {
      const workflows = await listWorkflowsByPhase("discovery");
      const existingWorkflow = workflows.find(
        (w) => w.ideaSlug === projectSlug
      );
      
      if (existingWorkflow) {
        const step1 = existingWorkflow.steps.find((s) => s.id === "step-1");
        if (step1?.output && step1.status === "completed") {
          try {
            const parsed = JSON.parse(step1.output);
            return { found: true, data: parsed, source: "database" };
          } catch (error) {
            console.warn(`   ⚠️  Could not parse workflow output: ${error}`);
          }
        }
      }
    } catch (error) {
      console.warn(`   ⚠️  Could not check database: ${error}`);
    }
  }

  return { found: false, source: null };
}

async function runManusDiscovery(project: Batch1Project) {
  console.log(`\n🔍 Starting Manus Discovery for: ${project.name}`);
  console.log(`   Slug: ${project.slug}`);

  // Check for existing results first
  const existing = await loadExistingDiscovery(project.slug);
  
  let discoveryPack: {
    project: {
      name: string;
      slug: string;
      niche: string;
      jtbd: string;
      buyer: string;
      description: string;
    };
    narrative: unknown;
    persona: unknown;
    competitors: unknown;
    pricingExpectations?: unknown;
    hooks?: unknown;
    generatedAt: string;
  };

  if (existing.found && existing.data) {
    console.log(`   ✅ Found existing discovery pack (from ${existing.source})`);
    console.log(`   💡 Reusing existing results - skipping API call`);
    
    // Use existing data, but update project info and timestamp
    const existingData = existing.data as {
      project?: unknown;
      narrative?: unknown;
      persona?: unknown;
      competitors?: unknown;
      pricingExpectations?: unknown;
      hooks?: unknown;
    };
    
    discoveryPack = {
      project: {
        name: project.name,
        slug: project.slug,
        niche: project.niche,
        jtbd: project.jtbd,
        buyer: project.buyer,
        description: project.description,
      },
      narrative: existingData.narrative || null,
      persona: existingData.persona || null,
      competitors: existingData.competitors || null,
      pricingExpectations: existingData.pricingExpectations || null,
      hooks: existingData.hooks || null,
      generatedAt: new Date().toISOString(),
    };
  } else {
    try {
      // Generate complete discovery pack in a single API call
      console.log("   📦 Generating complete discovery pack (narrative, persona, competitors)...");
      const discoveryResult = await generateDiscoveryPack({
        product: project.name,
        niche: project.niche,
        painPoint: project.jtbd,
        context: project.description,
      });

      if (!discoveryResult.success) {
        const errorMsg = discoveryResult.error || "Failed to generate discovery pack";
        console.error(`   ⚠️  Discovery pack generation failed: ${errorMsg}`);
        throw new Error(errorMsg);
      }
      
      console.log("   ✅ Discovery pack generated successfully");

      // Combine all results
      discoveryPack = {
        project: {
          name: project.name,
          slug: project.slug,
          niche: project.niche,
          jtbd: project.jtbd,
          buyer: project.buyer,
          description: project.description,
        },
        narrative: discoveryResult.data?.narrative || null,
        persona: discoveryResult.data?.persona || null,
        competitors: discoveryResult.data?.competitors || null,
        pricingExpectations: discoveryResult.data?.pricingExpectations || null,
        hooks: discoveryResult.data?.hooks || null,
        generatedAt: new Date().toISOString(),
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error(`   ❌ Error for ${project.name}:`, errorMessage);
      
      // Provide helpful messages for common errors
      if (errorMessage.includes("credit limit")) {
        console.log(`   💡 Your Manus account has run out of credits.`);
        console.log(`   💡 Options: Add credits or run projects individually.`);
      } else if (errorMessage.includes("timeout")) {
        console.log(`   💡 Task is taking longer than expected. Try running individually.`);
      }
      
      return {
        success: false,
        project: project.slug,
        error: errorMessage,
      };
    }
  }

  // Save to file
    const outputDir = join(process.cwd(), "docs", "discovery");
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = join(outputDir, `MANUS-${project.slug}.md`);
    const markdownContent = `# Manus Discovery Pack: ${project.name}

Generated: ${new Date().toISOString()}

## Project Details

- **Name**: ${project.name}
- **Slug**: ${project.slug}
- **Niche**: ${project.niche}
- **JTBD**: ${project.jtbd}
- **Buyer**: ${project.buyer}
- **Description**: ${project.description}

## Niche Narrative

${discoveryPack.narrative ? JSON.stringify(discoveryPack.narrative, null, 2) : "Not generated"}

## Persona

${discoveryPack.persona ? JSON.stringify(discoveryPack.persona, null, 2) : "Not generated"}

## Competitor Analysis

${discoveryPack.competitors ? JSON.stringify(discoveryPack.competitors, null, 2) : "Not generated"}

## Pricing Expectations

${discoveryPack.pricingExpectations ? JSON.stringify(discoveryPack.pricingExpectations, null, 2) : "Not generated"}

## Distribution Hooks

${discoveryPack.hooks ? JSON.stringify(discoveryPack.hooks, null, 2) : "Not generated"}

## Raw Data

\`\`\`json
${JSON.stringify(discoveryPack, null, 2)}
\`\`\`
`;

    writeFileSync(outputPath, markdownContent, "utf-8");
    console.log(`   ✅ Saved to: ${outputPath}`);

    // Create or update workflow in database (if DATABASE_URL is set)
    if (process.env.DATABASE_URL) {
      try {
        // Check if workflow already exists
        const workflows = await listWorkflowsByPhase("discovery");
        const existingWorkflow = workflows.find(
          (w) => w.ideaSlug === project.slug
        );
        
        let workflow;
        if (existingWorkflow) {
          // Update existing workflow
          workflow = existingWorkflow;
        } else {
          // Create new workflow
          workflow = createDiscoveryWorkflow({
            ideaSlug: project.slug,
            ideaName: project.name,
            description: project.description,
            phase: "discovery",
          });
        }

        // Update Step 1 with the output
        const step1 = workflow.steps.find((s) => s.id === "step-1");
        if (step1) {
          step1.status = "completed";
          step1.completedAt = new Date().toISOString();
          step1.output = JSON.stringify(discoveryPack);
          workflow.status = "in_progress";
          workflow.updatedAt = new Date().toISOString();
        }

        await saveWorkflow(workflow);
        console.log(`   ✅ Workflow ${existingWorkflow ? 'updated' : 'created'} in database: ${workflow.id}`);
      } catch (dbError) {
        console.warn(`   ⚠️  Could not save workflow to database: ${dbError}`);
        console.warn(`   💡 Tip: Set DATABASE_URL in .env.local to enable workflow persistence`);
        // Continue even if DB save fails
      }
    } else {
      console.log(`   ℹ️  DATABASE_URL not set - skipping workflow creation`);
      console.log(`   💡 Tip: Set DATABASE_URL in .env.local to enable workflow persistence`);
    }

    return {
      success: true,
      project: project.slug,
      outputPath,
      data: discoveryPack,
      reused: existing.found,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error(`   ❌ Error for ${project.name}:`, errorMessage);
    
    // Provide helpful messages for common errors
    if (errorMessage.includes("credit limit")) {
      console.log(`   💡 Your Manus account has run out of credits.`);
      console.log(`   💡 Options: Add credits or run projects individually.`);
    } else if (errorMessage.includes("timeout")) {
      console.log(`   💡 Task is taking longer than expected. Try running individually.`);
    }
    
    return {
      success: false,
      project: project.slug,
      error: errorMessage,
    };
  }
}

async function main() {
  console.log("🚀 Starting Batch 1 Discovery - Step 1 (Manus)");
  console.log(`   Processing ${BATCH_1_PROJECTS.length} projects...\n`);

  const results = [];

  for (const project of BATCH_1_PROJECTS) {
    const result = await runManusDiscovery(project);
    results.push(result);

    // Check if we hit credit limit - stop processing if so
    if (!result.success && result.error?.includes("credit limit")) {
      console.log(`\n⚠️  Credit limit reached. Stopping batch processing.`);
      console.log(`   Processed ${results.length}/${BATCH_1_PROJECTS.length} projects.`);
      console.log(`   💡 Tip: Add credits to your Manus account or run projects individually.`);
      break;
    }

    // Add a delay between requests to avoid rate limiting
    if (project !== BATCH_1_PROJECTS[BATCH_1_PROJECTS.length - 1]) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 Batch 1 Discovery - Step 1 Summary");
  console.log("=".repeat(60));

  const successful = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);
  const reused = successful.filter((r) => (r as { reused?: boolean }).reused);

  console.log(`\n✅ Successful: ${successful.length}/${BATCH_1_PROJECTS.length}`);
  successful.forEach((r) => {
    const reusedFlag = (r as { reused?: boolean }).reused ? " (reused existing)" : " (new)";
    console.log(`   - ${r.project}${reusedFlag}`);
  });
  
  if (reused.length > 0) {
    console.log(`\n♻️  Reused existing results: ${reused.length} projects`);
    console.log(`   💡 This saved ${reused.length} API calls!`);
  }

  if (failed.length > 0) {
    console.log(`\n❌ Failed: ${failed.length}/${BATCH_1_PROJECTS.length}`);
    failed.forEach((r) => {
      console.log(`   - ${r.project}: ${r.error}`);
    });
  }

  console.log("\n📁 Output files saved to: docs/discovery/MANUS-*.md");
  console.log("\n✨ Next step: Run Step 2 (ChatGPT Refinement) for each project");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});

