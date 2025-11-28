/**
 * Import existing discovery documents as a completed discovery workflow
 * 
 * This script creates a workflow record for projects that have discovery documents
 * but no workflow record in the database.
 * 
 * Usage: npx tsx scripts/import-discovery-documents-as-workflow.ts <project-slug>
 */

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { existsSync, readdirSync, statSync, readFileSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";
import { saveWorkflow } from "@/lib/workflows/db";
import { createDiscoveryWorkflow } from "@/lib/workflows/discovery";
import type { DiscoveryWorkflow, WorkflowStep } from "@/lib/workflows/types";

// Discovery workflow steps (matching src/lib/workflows/discovery.ts)
const DISCOVERY_STEPS: Array<Omit<WorkflowStep, "status" | "startedAt" | "completedAt">> = [
  {
    id: "step-1",
    name: "Manus → Niche Narrative + Pain Language + JTBD + Competitors",
    agent: "Manus-Narrative-Agent",
    tool: "manus",
  },
  {
    id: "step-2",
    name: "ChatGPT → Refinement Packet",
    agent: "ChatGPT-Reasoning-Agent",
    tool: "chatgpt",
  },
  {
    id: "step-3",
    name: "Niche Intelligence Agent → Niche Map",
    agent: "Niche-Intelligence-Agent",
    tool: "cursor",
  },
  {
    id: "step-4",
    name: "Pain Signal Agent → Pain Prioritization",
    agent: "Pain-Signal-Agent",
    tool: "cursor",
  },
  {
    id: "step-5",
    name: "JTBD Agent → Persona + Jobs Map + Voice Script",
    agent: "JTBD-Agent",
    tool: "cursor",
  },
  {
    id: "step-6",
    name: "Opportunity & Moat Agent → Moat Strategy + Vision Prompts",
    agent: "Opportunity-Moat-Agent",
    tool: "cursor",
  },
  {
    id: "step-7",
    name: "Red-Team Strategist → Critique & Blindspots",
    agent: "Red-Team-Strategist",
    tool: "claude",
  },
  {
    id: "step-8",
    name: "Score the idea (0-10) and decide",
    agent: "Orchestrator",
    tool: "cursor",
  },
];

const PROJECT_SLUG = process.argv[2] || "enterprise-design-system-startups";
const DISCOVERY_DIR = join(process.cwd(), "docs", "discovery");

// Map document types to workflow steps
const DOCUMENT_TO_STEP: Record<string, { name: string; agent?: string; order: number }> = {
  "MANUS": { name: "Manus Discovery Pack", agent: "Manus Narrative Agent", order: 1 },
  "CHATGPT-REFINEMENT": { name: "ChatGPT Refinement", agent: "ChatGPT Reasoning Agent", order: 2 },
  "REDTEAM": { name: "Claude Red-Team Critique", agent: "Claude Red-Team Agent", order: 3 },
  "NICHE-INTEL": { name: "Niche Intelligence Analysis", agent: "Niche-Intelligence-Agent", order: 4 },
  "PAIN-SIGNALS": { name: "Pain Signal Analysis", agent: "Pain-Signal-Agent", order: 5 },
  "JTBD": { name: "Jobs-to-Be-Done Analysis", agent: "JTBD-Agent", order: 6 },
  "OPPORTUNITY": { name: "Opportunity & Moat Analysis", agent: "Opportunity-Moat-Agent", order: 7 },
};

async function importDiscoveryDocumentsAsWorkflow() {
  console.log(`🔍 Importing discovery documents for: ${PROJECT_SLUG}\n`);

  // Check if discovery directory exists
  if (!existsSync(DISCOVERY_DIR)) {
    console.error(`❌ Discovery directory not found: ${DISCOVERY_DIR}`);
    process.exit(1);
  }

  // Find all discovery documents for this project
  const discoveryFiles = readdirSync(DISCOVERY_DIR)
    .filter((file) => file.includes(PROJECT_SLUG) && file.endsWith(".md"))
    .map((file) => {
      const fullPath = join(DISCOVERY_DIR, file);
      const stats = statSync(fullPath);
      return {
        filename: file,
        path: fullPath,
        modified: stats.mtime.toISOString(),
      };
    });

  if (discoveryFiles.length === 0) {
    console.log(`⚠️  No discovery documents found for ${PROJECT_SLUG}`);
    console.log(`   Looking in: ${DISCOVERY_DIR}`);
    process.exit(0);
  }

  console.log(`📄 Found ${discoveryFiles.length} discovery documents:\n`);
  discoveryFiles.forEach((file) => {
    console.log(`   - ${file.filename}`);
  });

  // Determine project name from documents or use slug
  let projectName = PROJECT_SLUG
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Try to extract name from first document
  try {
    const firstDoc = readFileSync(discoveryFiles[0].path, "utf-8");
    const nameMatch = firstDoc.match(/\*\*Product\*\*:\s*(.+)/);
    if (nameMatch) {
      projectName = nameMatch[1].trim();
    }
  } catch {
    // Use default
  }

  console.log(`\n📦 Project: ${projectName}`);
  console.log(`   Slug: ${PROJECT_SLUG}\n`);

  // Create workflow with steps based on found documents
  const workflow = createDiscoveryWorkflow({
    ideaSlug: PROJECT_SLUG,
    ideaName: projectName,
    phase: "discovery",
  });

  // Mark steps as completed based on existing documents
  const completedSteps: WorkflowStep[] = [];
  const foundStepTypes = new Set<string>();

  discoveryFiles.forEach((file) => {
    // Extract document type from filename
    const docType = Object.keys(DOCUMENT_TO_STEP).find((type) =>
      file.filename.includes(type)
    );

    if (docType && DOCUMENT_TO_STEP[docType]) {
      const stepInfo = DOCUMENT_TO_STEP[docType];
      foundStepTypes.add(docType);

      // Map to workflow step IDs
      const stepIdMap: Record<string, string> = {
        "MANUS": "step-1",
        "CHATGPT-REFINEMENT": "step-2",
        "REDTEAM": "step-7",
        "NICHE-INTEL": "step-3",
        "PAIN-SIGNALS": "step-4",
        "JTBD": "step-5",
        "OPPORTUNITY": "step-6",
      };

      const stepId = stepIdMap[docType] || `step-${stepInfo.order}`;
      
      // Find or create the step
      let step = workflow.steps.find((s) => s.id === stepId);
      if (!step) {
        // Create new step if it doesn't exist in the default workflow
        step = {
          id: stepId,
          name: stepInfo.name,
          agent: stepInfo.agent,
          status: "completed",
          startedAt: file.modified,
          completedAt: file.modified,
          output: `Document: ${file.filename}`,
          metadata: {
            documentPath: file.path,
            documentFilename: file.filename,
          },
        };
        completedSteps.push(step);
      } else {
        // Update existing step
        step.status = "completed";
        step.startedAt = file.modified;
        step.completedAt = file.modified;
        step.output = `Document: ${file.filename}`;
        step.metadata = {
          ...step.metadata,
          documentPath: file.path,
          documentFilename: file.filename,
        };
      }
    }
  });

  // Add any new steps that weren't in the default workflow
  completedSteps.forEach((step) => {
    if (!workflow.steps.find((s) => s.id === step.id)) {
      workflow.steps.push(step);
    }
  });

  // Ensure all default steps exist, mark missing ones as pending
  DISCOVERY_STEPS.forEach((defaultStep) => {
    const existingStep = workflow.steps.find((s) => s.id === defaultStep.id);
    if (!existingStep) {
      workflow.steps.push({
        ...defaultStep,
        status: "pending",
      });
    }
  });

  // Sort steps by their original order
  const stepOrder = DISCOVERY_STEPS.map((s) => s.id);
  workflow.steps.sort((a, b) => {
    const aIndex = stepOrder.indexOf(a.id);
    const bIndex = stepOrder.indexOf(b.id);
    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  // Update workflow status
  const allCompleted = workflow.steps.every((s) => s.status === "completed");
  workflow.status = allCompleted ? "completed" : "in_progress";

  // Calculate opportunity score if we have all required documents
  if (
    foundStepTypes.has("NICHE-INTEL") &&
    foundStepTypes.has("PAIN-SIGNALS") &&
    foundStepTypes.has("JTBD") &&
    foundStepTypes.has("OPPORTUNITY")
  ) {
      // Try to extract scores from documents
      try {
        const opportunityDoc = discoveryFiles.find((f) => f.filename.includes("OPPORTUNITY"));
        if (opportunityDoc) {
          const content = readFileSync(opportunityDoc.path, "utf-8");
          const scoreMatch = content.match(/Opportunity Score[:\s]*(\d+(?:\.\d+)?)/i);
          if (scoreMatch) {
            workflow.score = parseFloat(scoreMatch[1]);
            console.log(`\n📊 Found Opportunity Score: ${workflow.score}`);
          }
        }
      } catch {
        // Ignore errors
      }
  }

  // Save workflow to database
  try {
    await saveWorkflow(workflow);
    console.log(`\n✅ Successfully imported discovery workflow!`);
    console.log(`   Workflow ID: ${workflow.id}`);
    console.log(`   Status: ${workflow.status}`);
    console.log(`   Steps: ${workflow.steps.filter((s) => s.status === "completed").length}/${workflow.steps.length} completed`);
    if (workflow.score) {
      console.log(`   Opportunity Score: ${workflow.score}`);
    }
    console.log(`\n🌐 View in UI: http://localhost:3000/workflows/${workflow.id}`);
  } catch (error) {
    console.error(`\n❌ Error saving workflow:`, error);
    if (error instanceof Error && error.message.includes("DATABASE_URL")) {
      console.error(`\n💡 Make sure DATABASE_URL is set in .env.local`);
    }
    process.exit(1);
  }
}

// Run the import
importDiscoveryDocumentsAsWorkflow().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});

