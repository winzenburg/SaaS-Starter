/**
 * Regenerate validation documents using actual AI agents
 * 
 * This script uses the real Manus.im API to generate:
 * - NARRATIVE
 * - PERSONA  
 * - COMPETITORS
 * 
 * And uses ChatGPT for:
 * - MARKET analysis
 */

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { generateDiscoveryPack } from "../src/lib/ai-tools/manus";
import { writeFileSync } from "fs";
import { join } from "path";

const PROJECT_SLUG = "enterprise-design-system-startups";
const PROJECT_NAME = "Enterprise Design System for Startups";
const NICHE = "Startups, scale-ups, CTOs/Heads of Product";
const PAIN_POINT = "Help me ship UI consistently and faster";

async function regenerateValidationDocs() {
  console.log("🔄 Regenerating validation documents using actual AI agents...\n");

  // Step 1: Generate Discovery Pack from Manus
  console.log("📡 Calling Manus.im API to generate discovery pack...");
  console.log("   This may take 1-2 minutes...\n");

  try {
    const result = await generateDiscoveryPack({
      product: PROJECT_NAME,
      niche: NICHE,
      painPoint: PAIN_POINT,
      context: "A design system platform for startups that works on day one, scales with the team, and integrates seamlessly with Next.js, React, and Tailwind.",
    });

    if (!result.success || !result.data) {
      throw new Error(result.error || "Manus API call failed");
    }

    const data = result.data;
    const projectDir = join(process.cwd(), "projects", PROJECT_SLUG);

    // Generate NARRATIVE document
    if (data.narrative) {
      console.log("✅ Generating NARRATIVE document...");
      const narrativeContent = `# Narrative: ${PROJECT_NAME}

**Product**: ${PROJECT_NAME}  
**Target Niche**: ${NICHE}  
**Generated**: ${new Date().toISOString().split('T')[0]}  
**Source**: Manus.im API (Real Research)  
**Status**: Ready for Validation

---

## Narrative

${data.narrative}

---

## Source

This narrative was generated using the Manus.im API with real research and analysis.
**Model**: ${result.metadata?.model || "manus-discovery-pack"}  
**Generated**: ${result.metadata?.timestamp || new Date().toISOString()}
`;

      writeFileSync(
        join(projectDir, `NARRATIVE-${PROJECT_SLUG}.md`),
        narrativeContent
      );
      console.log("   ✓ NARRATIVE document created\n");
    }

    // Generate PERSONA document
    if (data.persona) {
      console.log("✅ Generating PERSONA document...");
      const personaContent = `# Persona: ${PROJECT_NAME}

**Product**: ${PROJECT_NAME}  
**Target Niche**: ${NICHE}  
**Generated**: ${new Date().toISOString().split('T')[0]}  
**Source**: Manus.im API (Real Research)  
**Status**: Ready for Validation

---

## Primary Persona

### Persona Overview

**Name**: ${data.persona.name}  
**Role**: ${data.persona.role}

### Identity & Psychographics

**Identity**: ${data.persona.identity}

### Pain Points

${data.persona.painPoints.map((p: string) => `- ${p}`).join("\n")}

### Emotional Drivers

${data.persona.emotionalDrivers.map((d: string) => `- ${d}`).join("\n")}

### Jobs-to-be-Done

${data.persona.jtbd.map((j: string) => `- ${j}`).join("\n")}

---

## Source

This persona was generated using the Manus.im API with real research and analysis.
**Model**: ${result.metadata?.model || "manus-discovery-pack"}  
**Generated**: ${result.metadata?.timestamp || new Date().toISOString()}
`;

      writeFileSync(
        join(projectDir, `PERSONA-${PROJECT_SLUG}.md`),
        personaContent
      );
      console.log("   ✓ PERSONA document created\n");
    }

    // Generate COMPETITORS document
    if (data.competitors && data.competitors.length > 0) {
      console.log("✅ Generating COMPETITORS document...");
      const competitorsContent = `# Competitor Analysis: ${PROJECT_NAME}

**Product**: ${PROJECT_NAME}  
**Target Niche**: ${NICHE}  
**Generated**: ${new Date().toISOString().split('T')[0]}  
**Source**: Manus.im API (Real Research)  
**Status**: Ready for Validation

---

## Competitor Landscape

${data.competitors.map((comp: any, i: number) => `### Competitor ${i + 1}: ${comp.name}

**Positioning**: ${comp.positioning}

**Gaps & Opportunities**:
${comp.gaps?.map((gap: string) => `- ${gap}`).join("\n") || "- No gaps identified"}

---`).join("\n\n")}

---

## Source

This competitor analysis was generated using the Manus.im API with real research and analysis.
**Model**: ${result.metadata?.model || "manus-discovery-pack"}  
**Generated**: ${result.metadata?.timestamp || new Date().toISOString()}
`;

      writeFileSync(
        join(projectDir, `COMPETITORS-${PROJECT_SLUG}.md`),
        competitorsContent
      );
      console.log("   ✓ COMPETITORS document created\n");
    }

    console.log("✅ All validation documents regenerated using real AI research!\n");
    console.log("📁 Documents saved to:", projectDir);

  } catch (error) {
    console.error("❌ Error generating documents:", error);
    if (error instanceof Error) {
      console.error("   Error message:", error.message);
    }
    process.exit(1);
  }
}

regenerateValidationDocs();

