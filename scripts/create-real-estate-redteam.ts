/**
 * Create Validation Red-Team Critique for Real Estate Investor Flipper Platform (Step 5 of Insight Validation Playbook)
 * 
 * Following Rule 200 (Insight Validation Playbook) Step 5:
 * @Red-Team-Strategist → Validation Red-Team
 * 
 * This script creates:
 * - docs/validation/REDTEAM-real-estate-investor-flipper-platform.md
 */

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import { critique } from "../src/lib/ai-tools/claude";

const PROJECT_SLUG = "real-estate-investor-flipper-platform";
const PROJECT_NAME = "Real Estate Investor & Flipper Platform";
const NICHE = "Real estate investors/flippers";

const VALIDATION_DIR = join(process.cwd(), "docs", "validation");
const DISCOVERY_DIR = join(process.cwd(), "docs", "discovery");

// Ensure validation directory exists
if (!existsSync(VALIDATION_DIR)) {
  require("fs").mkdirSync(VALIDATION_DIR, { recursive: true });
}

async function createRealEstateRedTeam() {
  console.log("🔍 Creating Validation Red-Team Critique (Step 5)\n");
  console.log("Project: Real Estate Investor & Flipper Platform\n");
  console.log("Following Rule 200 (Insight Validation Playbook) Step 5\n");
  console.log("Agent: @Red-Team-Strategist (Claude-first)\n");

  // Step 1: Load input documents
  console.log("📥 Step 1: Loading input documents...\n");
  
  const validationPlanPath = join(VALIDATION_DIR, `VALIDATION-PLAN-${PROJECT_SLUG}.md`);
  
  // Optional inputs (from discovery phase)
  const nicheIntelPath = join(DISCOVERY_DIR, `NICHE-INTEL-${PROJECT_SLUG}.md`);
  const painSignalsPath = join(DISCOVERY_DIR, `PAIN-SIGNALS-${PROJECT_SLUG}.md`);
  const jtbdPath = join(DISCOVERY_DIR, `JTBD-${PROJECT_SLUG}.md`);
  const opportunityPath = join(DISCOVERY_DIR, `OPPORTUNITY-${PROJECT_SLUG}.md`);
  
  // Optional validation documents (may not exist yet)
  const landingPath = join(VALIDATION_DIR, `LANDING-${PROJECT_SLUG}.md`);
  const distributionPath = join(VALIDATION_DIR, `DISTRIBUTION-${PROJECT_SLUG}.md`);
  const pricingTestPath = join(VALIDATION_DIR, `PRICING-TEST-${PROJECT_SLUG}.md`);

  if (!existsSync(validationPlanPath)) {
    console.error(`❌ Validation plan not found: ${validationPlanPath}`);
    console.error("   Please run Step 4 (Demand-Validator) first.");
    process.exit(1);
  }

  const validationPlanContent = readFileSync(validationPlanPath, "utf-8");
  const nicheIntelContent = existsSync(nicheIntelPath) ? readFileSync(nicheIntelPath, "utf-8") : "Not available";
  const painSignalsContent = existsSync(painSignalsPath) ? readFileSync(painSignalsPath, "utf-8") : "Not available";
  const jtbdContent = existsSync(jtbdPath) ? readFileSync(jtbdPath, "utf-8") : "Not available";
  const opportunityContent = existsSync(opportunityPath) ? readFileSync(opportunityPath, "utf-8") : "Not available";
  const landingContent = existsSync(landingPath) ? readFileSync(landingPath, "utf-8") : "Not available";
  const distributionContent = existsSync(distributionPath) ? readFileSync(distributionPath, "utf-8") : "Not available";
  const pricingTestContent = existsSync(pricingTestPath) ? readFileSync(pricingTestPath, "utf-8") : "Not available";

  console.log(`✅ Loaded: ${validationPlanPath}`);
  if (existsSync(nicheIntelPath)) console.log(`✅ Loaded: ${nicheIntelPath}`);
  if (existsSync(painSignalsPath)) console.log(`✅ Loaded: ${painSignalsPath}`);
  if (existsSync(jtbdPath)) console.log(`✅ Loaded: ${jtbdPath}`);
  if (existsSync(opportunityPath)) console.log(`✅ Loaded: ${opportunityPath}`);
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
${validationPlanContent.substring(0, 10000)}${validationPlanContent.length > 10000 ? "..." : ""}

**Discovery Documents:**

**NICHE-INTEL:**
${nicheIntelContent !== "Not available" ? nicheIntelContent.substring(0, 5000) : "Not available"}${nicheIntelContent !== "Not available" && nicheIntelContent.length > 5000 ? "..." : ""}

**PAIN-SIGNALS:**
${painSignalsContent !== "Not available" ? painSignalsContent.substring(0, 5000) : "Not available"}${painSignalsContent !== "Not available" && painSignalsContent.length > 5000 ? "..." : ""}

**JTBD:**
${jtbdContent !== "Not available" ? jtbdContent.substring(0, 5000) : "Not available"}${jtbdContent !== "Not available" && jtbdContent.length > 5000 ? "..." : ""}

**OPPORTUNITY:**
${opportunityContent !== "Not available" ? opportunityContent.substring(0, 5000) : "Not available"}${opportunityContent !== "Not available" && opportunityContent.length > 5000 ? "..." : ""}

**Validation Documents (if available):**

**Landing Page:**
${landingContent !== "Not available" ? landingContent.substring(0, 3000) : "Not available"}${landingContent !== "Not available" && landingContent.length > 3000 ? "..." : ""}

**Distribution Strategy:**
${distributionContent !== "Not available" ? distributionContent.substring(0, 3000) : "Not available"}${distributionContent !== "Not available" && distributionContent.length > 3000 ? "..." : ""}

**Pricing Test Strategy:**
${pricingTestContent !== "Not available" ? pricingTestContent.substring(0, 3000) : "Not available"}${pricingTestContent !== "Not available" && pricingTestContent.length > 3000 ? "..." : ""}

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

  // Step 3: Organize Claude output into document structure
  console.log("💾 Step 3: Organizing and saving Red-Team Critique...\n");

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
${existsSync(nicheIntelPath) ? `- NICHE-INTEL: ${nicheIntelPath}` : ""}
${existsSync(painSignalsPath) ? `- PAIN-SIGNALS: ${painSignalsPath}` : ""}
${existsSync(jtbdPath) ? `- JTBD: ${jtbdPath}` : ""}
${existsSync(opportunityPath) ? `- OPPORTUNITY: ${opportunityPath}` : ""}
${existsSync(landingPath) ? `- Landing: ${landingPath}` : ""}
${existsSync(distributionPath) ? `- Distribution: ${distributionPath}` : ""}
${existsSync(pricingTestPath) ? `- Pricing Test: ${pricingTestPath}` : ""}
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

createRealEstateRedTeam().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});

