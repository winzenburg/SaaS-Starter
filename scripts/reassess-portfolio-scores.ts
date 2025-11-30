/**
 * Reassess Portfolio Scores for projects with completed discovery work
 * 
 * Projects to reassess:
 * 1. Real Estate Investor Flipper Platform
 * 2. Enterprise Design System for Startups
 * 
 * Uses discovery documents (NICHE-INTEL, PAIN-SIGNALS, JTBD, OPPORTUNITY) to update scores
 */

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import { reason } from "../src/lib/ai-tools/chatgpt";

const PROJECTS_TO_REASSESS = [
  {
    slug: "real-estate-investor-flipper-platform",
    name: "Real Estate Investor & Flipper Platform",
    discoveryDocs: [
      "docs/discovery/NICHE-INTEL-real-estate-investor-flipper-platform.md",
      "docs/discovery/PAIN-SIGNALS-real-estate-investor-flipper-platform.md",
      "docs/discovery/JTBD-real-estate-investor-flipper-platform.md",
      "docs/discovery/OPPORTUNITY-real-estate-investor-flipper-platform.md",
    ],
    currentScorePath: "projects/real-estate-investor-flipper-platform/PORTFOLIO-SCORE-real-estate-investor-flipper-platform.md",
  },
  {
    slug: "enterprise-design-system-startups",
    name: "Enterprise Design System for Startups",
    discoveryDocs: [
      "docs/discovery/NICHE-INTEL-enterprise-design-system-startups.md",
      "docs/discovery/PAIN-SIGNALS-enterprise-design-system-startups.md",
      "docs/discovery/JTBD-enterprise-design-system-startups.md",
      "docs/discovery/OPPORTUNITY-enterprise-design-system-startups.md",
    ],
    currentScorePath: "projects/enterprise-design-system-startups/PORTFOLIO-SCORE-enterprise-design-system-startups.md",
  },
];

async function reassessPortfolioScore(project: typeof PROJECTS_TO_REASSESS[0]) {
  console.log(`\n🎯 Reassessing Portfolio Score: ${project.name}\n`);

  // Read current portfolio score
  let currentScore = "";
  if (existsSync(project.currentScorePath)) {
    currentScore = readFileSync(project.currentScorePath, "utf-8");
    console.log(`✅ Found existing portfolio score: ${project.currentScorePath}`);
  } else {
    console.log(`⚠️  No existing portfolio score found at: ${project.currentScorePath}`);
  }

  // Read discovery documents
  const discoveryContent: string[] = [];
  for (const docPath of project.discoveryDocs) {
    if (existsSync(docPath)) {
      const content = readFileSync(docPath, "utf-8");
      discoveryContent.push(`\n## ${docPath}\n\n${content}`);
      console.log(`✅ Loaded: ${docPath}`);
    } else {
      console.log(`⚠️  Missing: ${docPath}`);
    }
  }

  if (discoveryContent.length === 0) {
    console.error(`❌ No discovery documents found for ${project.name}`);
    return;
  }

  const discoveryText = discoveryContent.join("\n\n---\n\n");

  // Create reassessment prompt
  const reassessmentPrompt = `Reassess the portfolio score for "${project.name}" based on the completed discovery work.

**Current Portfolio Score:**
${currentScore || "No existing score found"}

**Discovery Documents:**
${discoveryText}

**Task**: Reassess all 8 criteria based on the new discovery insights:

1. **Desirability Signal Strength** (1-5)
   - Review pain signals (frequency, severity, urgency)
   - Assess demand signals and validation potential
   - Consider pain monetization potential

2. **Niche Durability Score** (1-5)
   - Review niche size, growth trajectory, psychographics
   - Assess budgeted buyer characteristics
   - Evaluate recurring job frequency and durability

3. **Moat Potential** (1-5)
   - Review opportunity analysis (switching costs, data moats, network effects)
   - Assess workflow embedding depth
   - Evaluate competitive moat strength

4. **Expansion Revenue Depth** (1-5)
   - Review opportunity vectors
   - Assess expansion revenue levers
   - Evaluate monetization potential

5. **JTBD Frequency Map** (1-5)
   - Review JTBD analysis (main job, related jobs, triggers)
   - Assess job frequency and recurrence
   - Evaluate frequency increase factors

6. **Wave/Timing Analysis** (1-5)
   - Review niche intelligence (market maturity, timing)
   - Assess competitive landscape
   - Evaluate market readiness

7. **Implementation Cost + Risk** (1-5, inverse - lower is better)
   - Review pain complexity and solution scope
   - Assess technical complexity from discovery
   - Evaluate risk factors identified in red-team critique

8. **Expected Value (EV) Model**
   - Calculate probability of success based on discovery insights
   - Model MRR potential based on niche size and pricing
   - Calculate expected value

**Output Format**: Provide a complete portfolio score document following the exact structure of the current score, with updated scores and rationale based on discovery insights.

**Key Changes to Look For**:
- Pain signal strength may increase scores (stronger validation)
- Niche intelligence may refine market size estimates
- Opportunity analysis may strengthen moat potential
- JTBD analysis may refine frequency scores
- Red-team critique may identify new risks

**Be thorough and cite specific evidence from discovery documents.**`;

  const result = await reason({
    prompt: reassessmentPrompt,
    systemPrompt: "You are a portfolio strategist. Reassess portfolio scores based on discovery insights with precision and evidence-based reasoning.",
    model: "gpt-4o",
    maxTokens: 4000,
  });

  if (!result.success || !result.data) {
    console.error(`❌ Failed to reassess portfolio score for ${project.name}:`, result.error);
    return;
  }

  // Save updated portfolio score
  const outputPath = project.currentScorePath;
  const updatedScore = result.data.content;

  // Ensure the output follows the proper format
  const formattedScore = `# Portfolio Score: ${project.name}

${updatedScore}

---

## Reassessment Metadata

**Reassessed**: ${new Date().toISOString().split('T')[0]}  
**Source**: Discovery documents (NICHE-INTEL, PAIN-SIGNALS, JTBD, OPPORTUNITY)  
**AI Tool**: ChatGPT (GPT-4o)  
**Tokens**: ${result.metadata?.tokensUsed || "N/A"}  
**Status**: Updated based on completed discovery work
`;

  writeFileSync(outputPath, formattedScore);
  console.log(`✅ Updated portfolio score saved to: ${outputPath}\n`);
}

async function main() {
  console.log("🔄 Reassessing Portfolio Scores Based on Discovery Work\n");
  console.log(`Projects to reassess: ${PROJECTS_TO_REASSESS.length}\n`);

  for (const project of PROJECTS_TO_REASSESS) {
    await reassessPortfolioScore(project);
  }

  console.log("✅ Portfolio score reassessment complete!\n");
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});


