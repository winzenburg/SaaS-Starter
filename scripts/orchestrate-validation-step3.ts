/**
 * Orchestrate Validation Step 3: Narrative + Personas
 * 
 * Following Rule 200 (Insight Validation Playbook) Step 3:
 * @Manus-Narrative-Agent → Narrative + Personas
 * 
 * Following Rule 311 (Manus Orchestration Flow):
 * Manus → ChatGPT → Claude → Cursor Agents
 * 
 * This script creates validation documents:
 * - docs/product/NARRATIVE-<product>.md
 * - docs/research/PERSONA-<product>.md
 * - docs/research/COMPETITORS-<product>.md
 */

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import { reason } from "../src/lib/ai-tools/chatgpt";
import { critique } from "../src/lib/ai-tools/claude";
import { extractSources, parseManusDiscoveryPack } from "../src/lib/ai-tools/manus-parser";

const PROJECT_SLUG = "enterprise-design-system-startups";
const PROJECT_NAME = "Enterprise Design System for Startups";
const NICHE = "Startups, scale-ups, CTOs/Heads of Product";

const DISCOVERY_DIR = join(process.cwd(), "docs", "discovery");
const PRODUCT_DIR = join(process.cwd(), "docs", "product");
const RESEARCH_DIR = join(process.cwd(), "docs", "research");

// Ensure directories exist
[PRODUCT_DIR, RESEARCH_DIR].forEach(dir => {
  if (!existsSync(dir)) {
    require("fs").mkdirSync(dir, { recursive: true });
  }
});

async function orchestrateValidationStep3() {
  console.log("🎯 Orchestrating Validation Step 3: Narrative + Personas\n");
  console.log("Following Rule 200 (Insight Validation Playbook) Step 3\n");
  console.log("Following Rule 311 (Manus Orchestration Flow): Manus → ChatGPT → Claude\n");

  // Step 1: Load existing Manus discovery pack
  console.log("📥 Step 1: Loading Manus Discovery Pack...\n");
  
  const manusPath = join(DISCOVERY_DIR, `MANUS-${PROJECT_SLUG}.md`);
  if (!existsSync(manusPath)) {
    console.error(`❌ Manus discovery pack not found at: ${manusPath}`);
    console.error("   Please run discovery orchestration first.");
    process.exit(1);
  }

  const rawManusContent = readFileSync(manusPath, "utf-8");
  const manusParsed = parseManusDiscoveryPack(rawManusContent);
  const manusSources = extractSources(rawManusContent);
  
  const sourcesList = Array.from(manusSources.values())
    .sort((a, b) => parseInt(a.number) - parseInt(b.number))
    .map(source => `[${source.number}] ${source.citation}${source.url ? ` - ${source.url}` : ""}`)
    .join("\n");

  console.log(`✅ Loaded Manus discovery pack from: ${manusPath}`);
  console.log(`📚 Extracted ${manusSources.size} citations from Manus output\n`);

  // Step 2: ChatGPT Refinement (for validation-specific content)
  console.log("🤖 Step 2: ChatGPT Refinement (Validation-Specific)...\n");
  console.log("   Tasks:");
  console.log("   - Extract narrative variations (5 variations, select best)");
  console.log("   - Extract persona with identity-level motivations");
  console.log("   - Extract competitor positioning analysis");
  console.log("   - Prepare content for validation messaging\n");

  const chatgptPrompt = `Refine this Manus discovery pack for VALIDATION purposes (Step 3 of Insight Validation Playbook):

${rawManusContent.substring(0, 15000)}...

**CRITICAL: Citation Requirements**
When referencing sources, you MUST include the full citation with URL, not just the number.
For example, instead of "Source: [1]", use "Source: [1] Moreno Celta, R. (2025). Design System Trends... - https://www.designsystemscollective.com/..."

**Available Citations:**
${sourcesList}

**Validation-Specific Refinement Tasks:**

1. **Extract Narrative Variations** (5 variations):
   - Each narrative must connect identity-level pain to solution
   - Each narrative must have emotional hook + transformation story
   - Narratives should be optimized for validation messaging
   - Rank narratives by emotional resonance
   - Select the strongest narrative
   - **For each narrative, cite sources with full citations and URLs**

2. **Extract Persona** (for validation targeting):
   - Detailed persona with identity-level motivations
   - Persona must reflect real motivations (not fictional)
   - Persona should be optimized for validation test targeting
   - Include psychographics, identity signals, emotional drivers
   - **For each persona element, cite sources with full citations and URLs**

3. **Extract Competitor Positioning** (for validation positioning):
   - Competitor landscape analysis
   - Positioning insights for validation messaging
   - Differentiation opportunities
   - **For each competitor insight, cite sources with full citations and URLs**

**Output Format:**
- 5 narrative variations (ranked, with best selected)
- Detailed persona (identity-level motivations, psychographics)
- Competitor positioning analysis (for validation messaging)
- All with full citations (author, title, URL)

**Citation Format Example:**
- ✅ GOOD: "Source: [1] Moreno Celta, R. (2025). Design System Trends That Are Actually Worth Following in 2025. Design Systems Collective. - https://www.designsystemscollective.com/design-system-trends-that-are-actually-worth-following-in-2025-44a405348687"
- ❌ BAD: "Source: [1]" or "Source: Manus Discovery Pack"

**All claims must be backed by full citations with URLs from the Manus References section.**`;

  const chatgptResult = await reason({
    prompt: chatgptPrompt,
    systemPrompt: "You are an expert product strategist specializing in validation messaging. Extract and refine narrative, persona, and competitor insights for validation purposes. Always cite your sources with full citations and URLs.",
    model: "gpt-4o",
    maxTokens: 4000,
  });

  if (!chatgptResult.success || !chatgptResult.data) {
    console.error("❌ ChatGPT refinement failed:", chatgptResult.error);
    process.exit(1);
  }

  const chatgptRefinementContent = chatgptResult.data.content;
  console.log(`✅ ChatGPT refinement complete\n`);

  // Step 3: Claude Critique (validation-specific)
  console.log("🔍 Step 3: Claude Red-Team Critique (Validation-Specific)...\n");
  console.log("   Tasks:");
  console.log("   - Critique narrative variations for validation effectiveness");
  console.log("   - Validate persona reflects real motivations");
  console.log("   - Stress test competitor positioning");
  console.log("   - Identify validation messaging risks\n");

  const claudePrompt = `Perform a red-team critique of this validation content for ${PROJECT_NAME}:

**Manus Raw Output:**
${rawManusContent.substring(0, 10000)}...

**ChatGPT Refinement (Validation-Specific):**
${chatgptRefinementContent.substring(0, 5000)}...

**Available Citations from Manus:**
${sourcesList}

**CRITICAL: Citation Requirements**
When referencing sources in your critique, you MUST include the full citation with URL, not just the number.

**Red-Team Critique Tasks (Validation-Focused):**

1. **Critique Narrative Variations**:
   - Do narratives effectively connect identity-level pain to solution?
   - Will narratives resonate in validation tests?
   - Are emotional hooks strong enough?
   - Are transformation stories compelling?
   - Identify weak narratives and suggest improvements

2. **Validate Persona**:
   - Does persona reflect real motivations (not fictional)?
   - Is persona specific enough for validation targeting?
   - Are identity-level motivations clear?
   - Will persona resonate with target community?
   - Identify persona gaps or weaknesses

3. **Stress Test Competitor Positioning**:
   - Is competitor analysis accurate?
   - Are differentiation opportunities real?
   - Will positioning hold up in validation tests?
   - Identify positioning risks or weaknesses

**Be critical but constructive. Challenge assumptions. Find blindspots.**`;

  const claudeResult = await critique({
    prompt: claudePrompt,
    systemPrompt: "You are a red-team strategist specializing in validation. Be critical, find blindspots, challenge assumptions. Your job is to stress-test validation content and find weaknesses before validation tests.",
    model: "claude-3-opus-20240229",
    maxTokens: 4000,
  });

  if (!claudeResult.success || !claudeResult.data) {
    console.error("❌ Claude red-team critique failed:", claudeResult.error);
    process.exit(1);
  }

  const claudeCritiqueContent = claudeResult.data.content;
  console.log(`✅ Claude critique complete\n`);

  // Step 4: Create Validation Documents
  console.log("📝 Step 4: Creating Validation Documents...\n");

  // Document 1: NARRATIVE
  const narrativePath = join(PRODUCT_DIR, `NARRATIVE-${PROJECT_SLUG}.md`);
  const narrativeContent = `# Narrative: ${PROJECT_NAME}

**Product**: ${PROJECT_NAME}  
**Target Niche**: ${NICHE}  
**Generated**: ${new Date().toISOString().split('T')[0]}  
**Source**: Manus Discovery Pack → ChatGPT Refinement → Claude Critique  
**Purpose**: Validation messaging and narrative testing

---

## Narrative Variations

${chatgptRefinementContent}

---

## Claude Red-Team Critique

${claudeCritiqueContent}

---

## Generation Metadata

**AI Tools**: Manus.im → ChatGPT (GPT-4o) → Claude (claude-3-opus-20240229)  
**Input**: Manus Discovery Pack (${manusPath})  
**Generated**: ${new Date().toISOString().split('T')[0]}  
**Next Step**: Use selected narrative for validation tests (Step 4: @Demand-Validator)

---

## Sources

${sourcesList}
`;

  writeFileSync(narrativePath, narrativeContent);
  console.log(`✅ Created: ${narrativePath}`);

  // Document 2: PERSONA
  const personaPath = join(RESEARCH_DIR, `PERSONA-${PROJECT_SLUG}.md`);
  const personaContent = `# Persona: ${PROJECT_NAME}

**Product**: ${PROJECT_NAME}  
**Target Niche**: ${NICHE}  
**Generated**: ${new Date().toISOString().split('T')[0]}  
**Source**: Manus Discovery Pack → ChatGPT Refinement → Claude Critique  
**Purpose**: Validation targeting and persona-based messaging

---

## Persona Profile

${chatgptRefinementContent}

---

## Claude Red-Team Critique

${claudeCritiqueContent}

---

## Generation Metadata

**AI Tools**: Manus.im → ChatGPT (GPT-4o) → Claude (claude-3-opus-20240229)  
**Input**: Manus Discovery Pack (${manusPath})  
**Generated**: ${new Date().toISOString().split('T')[0]}  
**Next Step**: Use persona for validation test targeting (Step 4: @Demand-Validator)

---

## Sources

${sourcesList}
`;

  writeFileSync(personaPath, personaContent);
  console.log(`✅ Created: ${personaPath}`);

  // Document 3: COMPETITORS
  const competitorsPath = join(RESEARCH_DIR, `COMPETITORS-${PROJECT_SLUG}.md`);
  const competitorsContent = `# Competitor Analysis: ${PROJECT_NAME}

**Product**: ${PROJECT_NAME}  
**Target Niche**: ${NICHE}  
**Generated**: ${new Date().toISOString().split('T')[0]}  
**Source**: Manus Discovery Pack → ChatGPT Refinement → Claude Critique  
**Purpose**: Validation positioning and competitive differentiation

---

## Competitor Landscape

${chatgptRefinementContent}

---

## Claude Red-Team Critique

${claudeCritiqueContent}

---

## Generation Metadata

**AI Tools**: Manus.im → ChatGPT (GPT-4o) → Claude (claude-3-opus-20240229)  
**Input**: Manus Discovery Pack (${manusPath})  
**Generated**: ${new Date().toISOString().split('T')[0]}  
**Next Step**: Use competitor analysis for validation positioning (Step 4: @Demand-Validator)

---

## Sources

${sourcesList}
`;

  writeFileSync(competitorsPath, competitorsContent);
  console.log(`✅ Created: ${competitorsPath}\n`);

  // Summary
  console.log("✅ Validation Step 3 Complete!\n");
  console.log("📁 Files Created:");
  console.log(`   1. ${narrativePath}`);
  console.log(`   2. ${personaPath}`);
  console.log(`   3. ${competitorsPath}\n`);
  console.log("🎯 Next Step:");
  console.log("   Step 4: @Demand-Validator → Validation Plan");
  console.log("   Inputs: NARRATIVE, PERSONA, COMPETITORS (all ready)\n");
}

orchestrateValidationStep3().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});

