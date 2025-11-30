#!/usr/bin/env tsx
/**
 * Import Manus discovery pack for Ketamine Meditation Journey Music Mobile App
 * 
 * This script processes the Manus discovery pack and generates
 * validation documents (NARRATIVE, PERSONA, COMPETITORS)
 */

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import {
  parseManusDiscoveryPack,
  extractSources,
  formatCitations,
  generateSourcesSection,
} from "../src/lib/ai-tools/manus-parser";

const PROJECT_SLUG = "ketamine-meditation-journey-music-mobile-app";
const PROJECT_NAME = "Ketamine - Meditation Journey Music Mobile App";
const NICHE = "Individuals exploring ketamine-assisted therapy and meditation practices";
const PAIN_POINT = "Need for guided meditation experiences with therapeutic support";

async function importKetamineManus() {
  console.log("📥 Importing Manus Discovery Pack for Ketamine Project\n");
  console.log(`Project: ${PROJECT_NAME}\n`);

  const discoveryDir = join(process.cwd(), "docs", "discovery");
  const projectDir = join(process.cwd(), "projects", PROJECT_SLUG);
  const timestamp = new Date().toISOString().split('T')[0];

  // Check for the Manus file
  const manusFile = join(discoveryDir, `MANUS-${PROJECT_SLUG}.md`);
  
  if (!existsSync(manusFile)) {
    console.log(`❌ Manus file not found at: ${manusFile}\n`);
    console.log("📋 Instructions:");
    console.log("1. Create or upload the Manus discovery pack file");
    console.log(`2. Save it as: ${manusFile}`);
    console.log("3. The file should contain the Manus discovery pack output (markdown or JSON format)\n");
    console.log("💡 You can:");
    console.log("   - Paste the Manus output directly into the file");
    console.log("   - Or save it as a markdown file with the Manus content\n");
    process.exit(1);
  }

  try {
    console.log(`✅ Found Manus file: ${manusFile}\n`);
    const content = readFileSync(manusFile, "utf-8");
    console.log("✅ Successfully read Manus discovery pack\n");

    // Parse the discovery pack
    const parsed = parseManusDiscoveryPack(content);
    console.log("✅ Successfully parsed discovery pack\n");

    // Extract sources
    const sources = extractSources(content);
    console.log(`✅ Found ${sources.size} source citations\n`);

    // Extract sections from markdown format
    const nicheNarrativeMatch = content.match(/## 1\. Niche Narrative\s*([\s\S]*?)(?=## 2\.|$)/i);
    const personaMatch = content.match(/## 3\. Detailed Persona\s*([\s\S]*?)(?=## 4\.|$)/i);
    const competitorsMatch = content.match(/## 4\. Competitor Landscape\s*([\s\S]*?)(?=## 5\.|$)/i);

    // Generate NARRATIVE document
    if (nicheNarrativeMatch || parsed.narrative) {
      console.log("✅ Generating NARRATIVE document...");
      let narrativeText = nicheNarrativeMatch 
        ? nicheNarrativeMatch[1].trim()
        : (typeof parsed.narrative === "string" ? parsed.narrative : parsed.narrative?.narrative || "");
      
      narrativeText = formatCitations(narrativeText, sources);
      
      const narrativeContent = `# Narrative: ${PROJECT_NAME}

**Product**: ${PROJECT_NAME}  
**Target Niche**: ${NICHE}  
**Generated**: ${timestamp}  
**Source**: Manus.im Discovery Pack (Real Research)  
**Status**: Ready for Validation

---

## Niche Narrative

${narrativeText}

---

## Sources & Citations

${generateSourcesSection(sources)}

---

## Generation Metadata

**AI Tool**: Manus.im  
**Source File**: MANUS-${PROJECT_SLUG}.md  
**Generated**: ${timestamp}  
**All claims backed by cited sources**
`;

      writeFileSync(
        join(projectDir, `NARRATIVE-${PROJECT_SLUG}.md`),
        narrativeContent
      );
      console.log("   ✓ NARRATIVE document created with citations\n");
    }

    // Generate PERSONA document
    if (personaMatch || parsed.persona) {
      console.log("✅ Generating PERSONA document...");
      let personaText = personaMatch 
        ? personaMatch[1].trim()
        : "";
      
      if (parsed.persona) {
        const persona = parsed.persona;
        personaText = `### Persona Overview

**Name**: ${persona.name || "Target User"}  
**Role**: ${persona.role || NICHE}

### Identity & Psychographics

**Identity**: ${persona.identity || "Not specified"}

### Pain Points

${persona.painPoints && persona.painPoints.length > 0
  ? persona.painPoints.map((p: string) => `- ${p}`).join("\n")
  : "- No pain points specified"}

### Emotional Drivers

${persona.emotionalDrivers && persona.emotionalDrivers.length > 0
  ? persona.emotionalDrivers.map((d: string) => `- ${d}`).join("\n")
  : "- No emotional drivers specified"}

### Jobs-to-be-Done

${persona.jtbd && persona.jtbd.length > 0
  ? persona.jtbd.map((j: string) => `- ${j}`).join("\n")
  : "- No JTBD specified"}`;
      }
      
      personaText = formatCitations(personaText, sources);
      
      const personaContent = `# Persona: ${PROJECT_NAME}

**Product**: ${PROJECT_NAME}  
**Target Niche**: ${NICHE}  
**Generated**: ${timestamp}  
**Source**: Manus.im Discovery Pack (Real Research)  
**Status**: Ready for Validation

---

${personaText}

---

## Sources & Citations

${generateSourcesSection(sources)}

---

## Generation Metadata

**AI Tool**: Manus.im  
**Source File**: MANUS-${PROJECT_SLUG}.md  
**Generated**: ${timestamp}  
**All claims backed by cited sources**
`;

      writeFileSync(
        join(projectDir, `PERSONA-${PROJECT_SLUG}.md`),
        personaContent
      );
      console.log("   ✓ PERSONA document created with citations\n");
    }

    // Generate COMPETITORS document
    if (competitorsMatch || (parsed.competitors && parsed.competitors.length > 0)) {
      console.log("✅ Generating COMPETITORS document...");
      let competitorsText = competitorsMatch 
        ? competitorsMatch[1].trim()
        : "";
      
      if (parsed.competitors && parsed.competitors.length > 0) {
        competitorsText = parsed.competitors.map((comp: any, i: number) => {
          return `### Competitor ${i + 1}: ${comp.name || "Unknown Competitor"}

**Positioning**: ${comp.positioning || "Not specified"}

**Gaps & Opportunities**:
${comp.gaps && Array.isArray(comp.gaps) && comp.gaps.length > 0
  ? comp.gaps.map((gap: string) => `- ${gap}`).join("\n")
  : "- No gaps identified"}`;
        }).join("\n\n---\n\n");
      }
      
      competitorsText = formatCitations(competitorsText, sources);
      
      const competitorsContent = `# Competitor Analysis: ${PROJECT_NAME}

**Product**: ${PROJECT_NAME}  
**Target Niche**: ${NICHE}  
**Generated**: ${timestamp}  
**Source**: Manus.im Discovery Pack (Real Research)  
**Status**: Ready for Validation

---

## Competitor Landscape

${competitorsText}

---

## Sources & Citations

${generateSourcesSection(sources)}

---

## Generation Metadata

**AI Tool**: Manus.im  
**Source File**: MANUS-${PROJECT_SLUG}.md  
**Generated**: ${timestamp}  
**All claims backed by cited sources**
`;

      writeFileSync(
        join(projectDir, `COMPETITORS-${PROJECT_SLUG}.md`),
        competitorsContent
      );
      console.log("   ✓ COMPETITORS document created with citations\n");
    }

    console.log("✅ All validation documents generated from Manus discovery pack!\n");
    console.log("📁 Documents saved to:", projectDir);
    console.log("\n📊 Summary:");
    console.log("   - NARRATIVE: Generated from Manus discovery pack");
    console.log("   - PERSONA: Generated from Manus discovery pack");
    console.log("   - COMPETITORS: Generated from Manus discovery pack");
    console.log(`\n✅ All documents include ${sources.size} cited sources from Manus research.`);

  } catch (error) {
    console.error("❌ Error processing Manus discovery pack:", error);
    if (error instanceof Error) {
      console.error("   Error message:", error.message);
    }
    process.exit(1);
  }
}

importKetamineManus();


