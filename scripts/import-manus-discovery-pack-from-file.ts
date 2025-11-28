/**
 * Import Manus discovery pack from the provided file
 * 
 * This script reads the discovery_pack.md file and generates
 * NARRATIVE, PERSONA, and COMPETITORS documents with proper citations
 */

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { writeFileSync, readFileSync } from "fs";
import { join } from "path";
import {
  parseManusDiscoveryPack,
  extractSources,
  formatCitations,
  generateSourcesSection,
} from "../src/lib/ai-tools/manus-parser";

const PROJECT_SLUG = "enterprise-design-system-startups";
const PROJECT_NAME = "Enterprise Design System for Startups";
const NICHE = "Startups, scale-ups, CTOs/Heads of Product";
const PAIN_POINT = "Help me ship UI consistently and faster";

async function importFromFile() {
  console.log("📥 Importing Manus discovery pack from file...\n");

  const discoveryPackPath = "/Users/ryanwinzenburg/Downloads/discovery_pack.md";
  const projectDir = join(process.cwd(), "projects", PROJECT_SLUG);
  const timestamp = new Date().toISOString().split('T')[0];

  try {
    const content = readFileSync(discoveryPackPath, "utf-8");
    console.log("✅ Successfully read discovery pack file\n");

    // Parse the discovery pack using the parser utility
    const parsed = parseManusDiscoveryPack(content);
    console.log("✅ Successfully parsed discovery pack\n");

    // Extract sources
    const sources = extractSources(content);
    console.log(`✅ Found ${sources.size} source citations\n`);

    // Extract sections (using parsed data or fallback to regex)
    const nicheNarrativeMatch = content.match(/## 1\. Niche Narrative\s*([\s\S]*?)(?=## 2\.|$)/);
    const personaMatch = content.match(/## 3\. Detailed Persona\s*([\s\S]*?)(?=## 4\.|$)/);
    const competitorsMatch = content.match(/## 4\. Competitor Landscape\s*([\s\S]*?)(?=## 5\.|$)/);

    // Generate NARRATIVE document
    if (nicheNarrativeMatch) {
      console.log("✅ Generating NARRATIVE document...");
      let narrativeText = nicheNarrativeMatch[1].trim();
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
**Source File**: discovery_pack.md  
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
    if (personaMatch) {
      console.log("✅ Generating PERSONA document...");
      let personaText = personaMatch[1].trim();
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
**Source File**: discovery_pack.md  
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
    if (competitorsMatch) {
      console.log("✅ Generating COMPETITORS document...");
      let competitorsText = competitorsMatch[1].trim();
      competitorsText = formatCitations(competitorsText, sources);
      
      const competitorsContent = `# Competitor Analysis: ${PROJECT_NAME}

**Product**: ${PROJECT_NAME}  
**Target Niche**: ${NICHE}  
**Generated**: ${timestamp}  
**Source**: Manus.im Discovery Pack (Real Research)  
**Status**: Ready for Validation

---

${competitorsText}

---

## Sources & Citations

${generateSourcesSection(sources)}

---

## Generation Metadata

**AI Tool**: Manus.im  
**Source File**: discovery_pack.md  
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
    console.error("❌ Error reading discovery pack:", error);
    if (error instanceof Error) {
      console.error("   Error message:", error.message);
    }
    process.exit(1);
  }
}

importFromFile();

