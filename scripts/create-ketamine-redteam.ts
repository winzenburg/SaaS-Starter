/**
 * Create Validation Red-Team Critique for Ketamine Project (Step 5 of Insight Validation Playbook)
 * 
 * Following Rule 200 (Insight Validation Playbook) Step 5:
 * @Red-Team-Strategist → Validation Red-Team
 * 
 * This script creates:
 * - docs/validation/REDTEAM-ketamine-meditation-journey-music-mobile-app.md
 */

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import { critique } from "../src/lib/ai-tools/claude";

const PROJECT_SLUG = "ketamine-meditation-journey-music-mobile-app";
const PROJECT_NAME = "Ketamine - Meditation Journey Music Mobile App";
const NICHE = "Individuals exploring ketamine-assisted therapy and meditation practices";

const VALIDATION_DIR = join(process.cwd(), "docs", "validation");
const PRODUCT_DIR = join(process.cwd(), "docs", "product");
const RESEARCH_DIR = join(process.cwd(), "docs", "research");

// Ensure validation directory exists
if (!existsSync(VALIDATION_DIR)) {
  require("fs").mkdirSync(VALIDATION_DIR, { recursive: true });
}

async function createKetamineRedTeam() {
  console.log("🔍 Creating Validation Red-Team Critique (Step 5)\n");
  console.log("Project: Ketamine - Meditation Journey Music Mobile App\n");
  console.log("Following Rule 200 (Insight Validation Playbook) Step 5\n");
  console.log("Agent: @Red-Team-Strategist (Claude-first)\n");

  // Step 1: Load input documents
  console.log("📥 Step 1: Loading input documents...\n");
  
  const validationPlanPath = join(VALIDATION_DIR, `VALIDATION-PLAN-${PROJECT_SLUG}.md`);
  const narrativePath = join(PRODUCT_DIR, `NARRATIVE-${PROJECT_SLUG}.md`);
  const personaPath = join(RESEARCH_DIR, `PERSONA-${PROJECT_SLUG}.md`);
  const competitorsPath = join(RESEARCH_DIR, `COMPETITORS-${PROJECT_SLUG}.md`);
  
  // Optional inputs
  const landingPath = join(VALIDATION_DIR, `LANDING-${PROJECT_SLUG}.md`);
  const distributionPath = join(VALIDATION_DIR, `DISTRIBUTION-${PROJECT_SLUG}.md`);
  const pricingTestPath = join(VALIDATION_DIR, `PRICING-TEST-${PROJECT_SLUG}.md`);

  if (!existsSync(validationPlanPath)) {
    console.error(`❌ Validation plan not found: ${validationPlanPath}`);
    console.error("   Please run Step 4 (Demand-Validator) first.");
    process.exit(1);
  }

  const validationPlanContent = readFileSync(validationPlanPath, "utf-8");
  const narrativeContent = existsSync(narrativePath) ? readFileSync(narrativePath, "utf-8") : "Not available";
  const personaContent = existsSync(personaPath) ? readFileSync(personaPath, "utf-8") : "Not available";
  const competitorsContent = existsSync(competitorsPath) ? readFileSync(competitorsPath, "utf-8") : "Not available";
  const landingContent = existsSync(landingPath) ? readFileSync(landingPath, "utf-8") : "Not available";
  const distributionContent = existsSync(distributionPath) ? readFileSync(distributionPath, "utf-8") : "Not available";
  const pricingTestContent = existsSync(pricingTestPath) ? readFileSync(pricingTestPath, "utf-8") : "Not available";

  console.log(`✅ Loaded: ${validationPlanPath}`);
  if (existsSync(narrativePath)) console.log(`✅ Loaded: ${narrativePath}`);
  if (existsSync(personaPath)) console.log(`✅ Loaded: ${personaPath}`);
  if (existsSync(competitorsPath)) console.log(`✅ Loaded: ${competitorsPath}`);
  if (existsSync(landingPath)) console.log(`✅ Loaded: ${landingPath} (optional)`);
  if (existsSync(distributionPath)) console.log(`✅ Loaded: ${distributionPath} (optional)`);
  if (existsSync(pricingTestPath)) console.log(`✅ Loaded: ${pricingTestPath} (optional)`);
  console.log();

  // Step 2: Use Claude to perform red-team critique
  console.log("🔍 Step 2: Claude → Red-Team Critique...\n");
  console.log("   Tasks:");
  console.log("   - Critique validation plan for false assumptions");
  console.log("   - Identify competitor 'why now' risks");
  console.log("   - Stress test moat assumptions");
  console.log("   - Point out pricing/channel fragility");
  console.log("   - Suggest pivots");
  console.log("   - Recommend next move (Proceed/Pivot/Kill)\n");

  const claudePrompt = `Perform a comprehensive red-team critique of the validation plan for ${PROJECT_NAME}.

**CRITICAL: You must identify at least 3 potential weaknesses or risks. Be critical but constructive.**

**Input Documents:**

**Validation Plan:**
${validationPlanContent.substring(0, 10000)}...

**Narrative:**
${narrativeContent.substring(0, 5000)}...

**Persona:**
${personaContent.substring(0, 5000)}...

**Competitor Analysis:**
${competitorsContent.substring(0, 5000)}...

**Landing Page (if available):**
${landingContent !== "Not available" ? landingContent.substring(0, 3000) : "Not available"}...

**Distribution Strategy (if available):**
${distributionContent !== "Not available" ? distributionContent.substring(0, 3000) : "Not available"}...

**Pricing Test Strategy (if available):**
${pricingTestContent !== "Not available" ? pricingTestContent.substring(0, 3000) : "Not available"}...

**Required Output Structure:**

# Validation Red-Team Critique: ${PROJECT_NAME}

## Executive Summary

[Brief summary of key findings and overall recommendation]

## Validation Plan Critique

### False Assumptions Identified
[List at least 3 false assumptions or blindspots in the validation plan]

### Test Design Weaknesses
[Identify weaknesses in test design, methodology, or thresholds]

### Threshold Analysis
[Critique whether thresholds are too lenient, too strict, or poorly defined]

### Execution Risks
[Identify risks in executing the validation plan]

## Competitive & Market Risks

### Competitor "Why Now" Risks
[What could competitors do that would invalidate the "why now" timing?]

### Market Timing Risks
[Is the market timing fragile? What could change?]

### Channel Fragility
[Are distribution channels fragile? What could break them?]

## Pricing & Monetization Fragility

### Pricing Assumptions
[Are pricing assumptions fragile? What could invalidate them?]

### Willingness to Pay Risks
[What could reduce willingness to pay?]

### Revenue Model Risks
[What could break the revenue model?]

## Moat & Defensibility Stress Test

### Moat Assumptions
[What moat assumptions are fragile?]

### Switching Cost Analysis
[Are switching costs real or assumed?]

### Competitive Response
[How could competitors respond?]

## Pivot Recommendations

### If Pivot Needed
[What specific pivots should be considered?]

### Pivot Directions
[What are the most promising pivot directions?]

### New Validation Needed
[What validation would be needed after pivot?]

## Recommended Next Move

### Recommendation: [PROCEED / PIVOT / KILL]

### Rationale
[Clear rationale for the recommendation]

### Confidence Level
[High / Medium / Low confidence in recommendation]

### Key Risks to Monitor
[Top 3 risks to monitor during validation]

### Success Criteria
[What would validate the recommendation?]

**Be critical but constructive. Challenge assumptions. Find blindspots. Your job is to stress-test the validation strategy before execution.**`;

  const claudeResult = await critique({
    prompt: claudePrompt,
    systemPrompt: "You are a red-team strategist specializing in validation critique. Be critical, find blindspots, challenge assumptions. Your job is to stress-test validation plans and find weaknesses before validation tests are executed. You must identify at least 3 potential weaknesses or risks.",
    model: "claude-3-opus-20240229",
    maxTokens: 4000,
  });

  if (!claudeResult.success || !claudeResult.data) {
    console.error("❌ Claude red-team critique failed:", claudeResult.error);
    process.exit(1);
  }

  const redTeamContent = claudeResult.data.content;
  console.log(`✅ Red-team critique complete\n`);

  // Step 3: Save red-team document
  console.log("💾 Step 3: Saving Red-Team Critique...\n");

  const redTeamPath = join(VALIDATION_DIR, `REDTEAM-${PROJECT_SLUG}.md`);
  
  const fullRedTeamDoc = `# Validation Red-Team Critique: ${PROJECT_NAME}

**Product**: ${PROJECT_NAME}  
**Target Niche**: ${NICHE}  
**Generated**: ${new Date().toISOString().split('T')[0]}  
**Source**: Red-Team Strategist Agent (Claude-first)  
**Status**: Ready for review

---

${redTeamContent}

---

## Generation Metadata

**AI Tool**: Claude (claude-3-opus-20240229)  
**Agent**: @Red-Team-Strategist  
**Inputs**: 
- Validation Plan: ${validationPlanPath}
- Narrative: ${existsSync(narrativePath) ? narrativePath : "Not available"}
- Persona: ${existsSync(personaPath) ? personaPath : "Not available"}
- Competitors: ${existsSync(competitorsPath) ? competitorsPath : "Not available"}
- Landing: ${existsSync(landingPath) ? landingPath : "Not available"}
- Distribution: ${existsSync(distributionPath) ? distributionPath : "Not available"}
- Pricing Test: ${existsSync(pricingTestPath) ? pricingTestPath : "Not available"}
**Generated**: ${new Date().toISOString().split('T')[0]}  
**Tokens**: ${claudeResult.metadata?.tokensUsed || "N/A"}  
**Next Step**: Review critique and adjust validation plan if needed, then proceed to Step 6: @Landing-Builder
`;

  writeFileSync(redTeamPath, fullRedTeamDoc);
  console.log(`✅ Saved: ${redTeamPath}\n`);

  // Summary
  console.log("✅ Validation Red-Team Critique Complete!\n");
  console.log("📁 File Created:");
  console.log(`   ${redTeamPath}\n`);
  console.log("🎯 Next Steps:");
  console.log("   1. Review the red-team critique");
  console.log("   2. Adjust validation plan if needed based on critique");
  console.log("   3. Step 6: @Landing-Builder → Landing Page\n");
}

createKetamineRedTeam().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});

