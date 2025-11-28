/**
 * Import Manus discovery pack from file or manual input
 * 
 * This script allows you to import a Manus discovery pack that was generated
 * outside of the API (e.g., manually in Manus.im or from a saved file)
 */

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";

const PROJECT_SLUG = "enterprise-design-system-startups";
const PROJECT_NAME = "Enterprise Design System for Startups";
const NICHE = "Startups, scale-ups, CTOs/Heads of Product";
const PAIN_POINT = "Help me ship UI consistently and faster";

interface ManusDiscoveryPack {
  narrative?: string | { narrative?: string };
  persona?: {
    name?: string;
    role?: string;
    identity?: string;
    painPoints?: string[];
    emotionalDrivers?: string[];
    jtbd?: string[];
  };
  competitors?: Array<{
    name?: string;
    positioning?: string;
    gaps?: string[];
  }>;
  pricingExpectations?: string[];
  hooks?: string[];
  narrativeSources?: Array<{ type: string; name: string; date: string; findings: string; url?: string }>;
  personaSources?: Array<{ type: string; name: string; date: string; findings: string; url?: string }>;
}

function extractNarrative(narrative: string | { narrative?: string } | undefined): string {
  if (!narrative) return "";
  if (typeof narrative === "string") return narrative;
  return narrative.narrative || "";
}

async function importManusDiscoveryPack() {
  console.log("📥 Import Manus Discovery Pack\n");
  console.log("This script will help you import a Manus discovery pack.\n");
  console.log("Options:");
  console.log("1. Import from existing file (docs/discovery/MANUS-*.md)");
  console.log("2. Import from JSON file");
  console.log("3. Manual entry (paste Manus output)\n");

  const projectDir = join(process.cwd(), "projects", PROJECT_SLUG);
  const discoveryDir = join(process.cwd(), "docs", "discovery");
  const timestamp = new Date().toISOString().split('T')[0];

  // Try to find existing Manus file
  const existingManusFile = join(discoveryDir, `MANUS-${PROJECT_SLUG}.md`);
  
  if (existsSync(existingManusFile)) {
    console.log(`✅ Found existing Manus file: ${existingManusFile}\n`);
    console.log("Reading and parsing...\n");
    
    try {
      const content = readFileSync(existingManusFile, "utf-8");
      
      // Try to extract JSON from the file
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[1]);
        console.log("✅ Successfully parsed Manus discovery pack from file\n");
        
        // Generate documents from the parsed data
        await generateDocumentsFromManusPack(parsed, projectDir, timestamp);
        return;
      } else {
        console.log("⚠️  File exists but no JSON found. Please provide the Manus output manually.\n");
      }
    } catch (error) {
      console.error("❌ Error reading file:", error instanceof Error ? error.message : "Unknown error");
      console.log("\nPlease provide the Manus output manually.\n");
    }
  } else {
    console.log(`ℹ️  No existing Manus file found at: ${existingManusFile}\n`);
    console.log("Please provide the Manus discovery pack output.\n");
    console.log("You can:");
    console.log("1. Paste the Manus output here (JSON format)");
    console.log("2. Save it to:", existingManusFile);
    console.log("3. Or provide a path to a JSON file\n");
  }

  console.log("💡 To use this script:");
  console.log("   1. Generate a discovery pack in Manus.im");
  console.log("   2. Copy the output (should be JSON format)");
  console.log("   3. Save it to:", existingManusFile);
  console.log("   4. Run this script again\n");
  
  console.log("Or, if you have the JSON directly, you can modify this script to include it.");
}

async function generateDocumentsFromManusPack(
  pack: ManusDiscoveryPack,
  projectDir: string,
  timestamp: string
) {
  console.log("📝 Generating validation documents from Manus discovery pack...\n");

  // Generate NARRATIVE
  const narrative = extractNarrative(pack.narrative);
  if (narrative) {
    console.log("✅ Generating NARRATIVE document...");
    const narrativeContent = `# Narrative: ${PROJECT_NAME}

**Product**: ${PROJECT_NAME}  
**Target Niche**: ${NICHE}  
**Generated**: ${timestamp}  
**Source**: Manus.im Discovery Pack (Imported)  
**Status**: Ready for Validation

---

## Narrative

${narrative}

${pack.narrativeSources && pack.narrativeSources.length > 0 ? `

---

## Sources & Citations

${pack.narrativeSources.map((source, i) => {
  const num = i + 1;
  return `[^${num}]: **${source.type}**: ${source.name}${source.url ? ` (${source.url})` : ""} - Accessed: ${source.date}\n   ${source.findings}`;
}).join("\n\n")}
` : ""}

---

## Generation Metadata

**AI Tool**: Manus.im  
**Source**: Imported Discovery Pack  
**Generated**: ${timestamp}
`;

    writeFileSync(
      join(projectDir, `NARRATIVE-${PROJECT_SLUG}.md`),
      narrativeContent
    );
    console.log("   ✓ NARRATIVE document created\n");
  }

  // Generate PERSONA
  if (pack.persona) {
    console.log("✅ Generating PERSONA document...");
    const personaContent = `# Persona: ${PROJECT_NAME}

**Product**: ${PROJECT_NAME}  
**Target Niche**: ${NICHE}  
**Generated**: ${timestamp}  
**Source**: Manus.im Discovery Pack (Imported)  
**Status**: Ready for Validation

---

## Primary Persona

### Persona Overview

**Name**: ${pack.persona.name || "Target User"}  
**Role**: ${pack.persona.role || NICHE}

### Identity & Psychographics

**Identity**: ${pack.persona.identity || "Not specified"}

### Pain Points

${pack.persona.painPoints && pack.persona.painPoints.length > 0
  ? pack.persona.painPoints.map((p) => `- ${p}`).join("\n")
  : "- No pain points specified"}

### Emotional Drivers

${pack.persona.emotionalDrivers && pack.persona.emotionalDrivers.length > 0
  ? pack.persona.emotionalDrivers.map((d) => `- ${d}`).join("\n")
  : "- No emotional drivers specified"}

### Jobs-to-be-Done

${pack.persona.jtbd && pack.persona.jtbd.length > 0
  ? pack.persona.jtbd.map((j) => `- ${j}`).join("\n")
  : "- No JTBD specified"}

${pack.personaSources && pack.personaSources.length > 0 ? `

---

## Sources & Citations

${pack.personaSources.map((source, i) => {
  const num = i + 1;
  return `[^${num}]: **${source.type}**: ${source.name}${source.url ? ` (${source.url})` : ""} - Accessed: ${source.date}\n   ${source.findings}`;
}).join("\n\n")}
` : ""}

---

## Generation Metadata

**AI Tool**: Manus.im  
**Source**: Imported Discovery Pack  
**Generated**: ${timestamp}
`;

    writeFileSync(
      join(projectDir, `PERSONA-${PROJECT_SLUG}.md`),
      personaContent
    );
    console.log("   ✓ PERSONA document created\n");
  }

  // Generate COMPETITORS
  if (pack.competitors && pack.competitors.length > 0) {
    console.log("✅ Generating COMPETITORS document...");
    const competitorsContent = `# Competitor Analysis: ${PROJECT_NAME}

**Product**: ${PROJECT_NAME}  
**Target Niche**: ${NICHE}  
**Generated**: ${timestamp}  
**Source**: Manus.im Discovery Pack (Imported)  
**Status**: Ready for Validation

---

## Competitor Landscape

${pack.competitors.map((comp, i) => {
  return `### Competitor ${i + 1}: ${comp.name || "Unknown Competitor"}

**Positioning**: ${comp.positioning || "Not specified"}

**Gaps & Opportunities**:
${comp.gaps && comp.gaps.length > 0
  ? comp.gaps.map((gap) => `- ${gap}`).join("\n")
  : "- No gaps identified"}

---`;
}).join("\n\n")}

---

## Generation Metadata

**AI Tool**: Manus.im  
**Source**: Imported Discovery Pack  
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

importManusDiscoveryPack().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});

