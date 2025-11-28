/**
 * Import Manus discovery pack from a task ID
 * 
 * If you have a Manus task ID from the dashboard, this script can retrieve it
 */

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { getManusTask } from "../src/lib/ai-tools/manus";
import { writeFileSync } from "fs";
import { join } from "path";

const PROJECT_SLUG = "enterprise-design-system-startups";
const PROJECT_NAME = "Enterprise Design System for Startups";
const NICHE = "Startups, scale-ups, CTOs/Heads of Product";

async function importFromTaskId(taskId: string) {
  console.log(`📥 Retrieving Manus task: ${taskId}\n`);

  try {
    const result = await getManusTask(taskId);
    
    if (result.status === "completed" && result.result) {
      console.log("✅ Task completed! Processing results...\n");
      
      // Try to parse as JSON
      let pack;
      try {
        pack = JSON.parse(result.result);
      } catch {
        // If not JSON, try to extract from output
        if (result.output) {
          pack = result.output;
        } else {
          pack = { narrative: result.result };
        }
      }

      const projectDir = join(process.cwd(), "projects", PROJECT_SLUG);
      const timestamp = new Date().toISOString().split('T')[0];

      // Generate documents
      await generateDocumentsFromManusPack(pack, projectDir, timestamp, taskId);
      
    } else {
      console.log(`⚠️  Task status: ${result.status}`);
      console.log("   Task may still be processing. Please wait and try again.");
    }
  } catch (error) {
    console.error("❌ Error retrieving task:", error instanceof Error ? error.message : "Unknown error");
    process.exit(1);
  }
}

async function generateDocumentsFromManusPack(
  pack: any,
  projectDir: string,
  timestamp: string,
  taskId: string
) {
  console.log("📝 Generating validation documents...\n");

  // Extract narrative
  const narrative = typeof pack.narrative === "string" 
    ? pack.narrative 
    : pack.narrative?.narrative || JSON.stringify(pack, null, 2);

  // Generate NARRATIVE
  console.log("✅ Generating NARRATIVE document...");
  const narrativeContent = `# Narrative: ${PROJECT_NAME}

**Product**: ${PROJECT_NAME}  
**Target Niche**: ${NICHE}  
**Generated**: ${timestamp}  
**Source**: Manus.im Discovery Pack (Task ID: ${taskId})  
**Status**: Ready for Validation

---

## Narrative

${narrative}

---

## Generation Metadata

**AI Tool**: Manus.im  
**Task ID**: ${taskId}  
**Generated**: ${timestamp}
`;

  writeFileSync(
    join(projectDir, `NARRATIVE-${PROJECT_SLUG}.md`),
    narrativeContent
  );
  console.log("   ✓ NARRATIVE document created\n");

  // Generate PERSONA if available
  if (pack.persona) {
    console.log("✅ Generating PERSONA document...");
    const persona = pack.persona;
    const personaContent = `# Persona: ${PROJECT_NAME}

**Product**: ${PROJECT_NAME}  
**Target Niche**: ${NICHE}  
**Generated**: ${timestamp}  
**Source**: Manus.im Discovery Pack (Task ID: ${taskId})  
**Status**: Ready for Validation

---

## Primary Persona

### Persona Overview

**Name**: ${persona.name || "Target User"}  
**Role**: ${persona.role || NICHE}

### Identity & Psychographics

**Identity**: ${persona.identity || "Not specified"}

### Pain Points

${persona.painPoints && Array.isArray(persona.painPoints)
  ? persona.painPoints.map((p: string) => `- ${p}`).join("\n")
  : "- No pain points specified"}

### Emotional Drivers

${persona.emotionalDrivers && Array.isArray(persona.emotionalDrivers)
  ? persona.emotionalDrivers.map((d: string) => `- ${d}`).join("\n")
  : "- No emotional drivers specified"}

### Jobs-to-be-Done

${persona.jtbd && Array.isArray(persona.jtbd)
  ? persona.jtbd.map((j: string) => `- ${j}`).join("\n")
  : "- No JTBD specified"}

---

## Generation Metadata

**AI Tool**: Manus.im  
**Task ID**: ${taskId}  
**Generated**: ${timestamp}
`;

    writeFileSync(
      join(projectDir, `PERSONA-${PROJECT_SLUG}.md`),
      personaContent
    );
    console.log("   ✓ PERSONA document created\n");
  }

  // Generate COMPETITORS if available
  if (pack.competitors && Array.isArray(pack.competitors) && pack.competitors.length > 0) {
    console.log("✅ Generating COMPETITORS document...");
    const competitorsContent = `# Competitor Analysis: ${PROJECT_NAME}

**Product**: ${PROJECT_NAME}  
**Target Niche**: ${NICHE}  
**Generated**: ${timestamp}  
**Source**: Manus.im Discovery Pack (Task ID: ${taskId})  
**Status**: Ready for Validation

---

## Competitor Landscape

${pack.competitors.map((comp: any, i: number) => {
  return `### Competitor ${i + 1}: ${comp.name || "Unknown Competitor"}

**Positioning**: ${comp.positioning || "Not specified"}

**Gaps & Opportunities**:
${comp.gaps && Array.isArray(comp.gaps)
  ? comp.gaps.map((gap: string) => `- ${gap}`).join("\n")
  : "- No gaps identified"}

---`;
}).join("\n\n")}

---

## Generation Metadata

**AI Tool**: Manus.im  
**Task ID**: ${taskId}  
**Generated**: ${timestamp}
`;

    writeFileSync(
      join(projectDir, `COMPETITORS-${PROJECT_SLUG}.md`),
      competitorsContent
    );
    console.log("   ✓ COMPETITORS document created\n");
  }

  console.log("✅ All documents generated from Manus discovery pack!\n");
  console.log("📁 Documents saved to:", projectDir);
}

// Get task ID from command line or prompt
const taskId = process.argv[2];

if (!taskId) {
  console.log("📥 Import Manus Discovery Pack from Task ID\n");
  console.log("Usage: npx tsx scripts/import-manus-from-task-id.ts <TASK_ID>\n");
  console.log("Example: npx tsx scripts/import-manus-from-task-id.ts abc123xyz\n");
  console.log("To get a task ID:");
  console.log("1. Go to https://manus.im/dashboard");
  console.log("2. Find your completed task");
  console.log("3. Copy the task ID from the URL or task details\n");
  process.exit(1);
}

importFromTaskId(taskId).catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});

