/**
 * Reassess Portfolio Score for Ketamine Meditation Journey Music Mobile App
 * 
 * Uses available discovery documents (MANUS, NARRATIVE, PERSONA, GAPS-OPPORTUNITIES, COMPETITORS)
 */

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { writeFileSync, readFileSync, existsSync } from "fs";
import { reason } from "../src/lib/ai-tools/chatgpt";

const PROJECT = {
  slug: "ketamine-meditation-journey-music-mobile-app",
  name: "Ketamine - Meditation Journey Music Mobile App",
  discoveryDocs: [
    "docs/discovery/MANUS-ketamine-meditation-journey-music-mobile-app.md",
    "projects/ketamine-meditation-journey-music-mobile-app/NARRATIVE-ketamine-meditation-journey-music-mobile-app.md",
    "projects/ketamine-meditation-journey-music-mobile-app/PERSONA-ketamine-meditation-journey-music-mobile-app.md",
    "projects/ketamine-meditation-journey-music-mobile-app/GAPS-OPPORTUNITIES-ketamine-meditation-journey-music-mobile-app.md",
    "projects/ketamine-meditation-journey-music-mobile-app/COMPETITORS-ketamine-meditation-journey-music-mobile-app.md",
  ],
  currentScorePath: "docs/portfolio/PORTFOLIO-SCORE-ketamine-meditation-journey-music-mobile-app.md",
};

async function reassessKetaminePortfolioScore() {
  console.log(`\n🎯 Reassessing Portfolio Score: ${PROJECT.name}\n`);

  // Read current portfolio score
  let currentScore = "";
  if (existsSync(PROJECT.currentScorePath)) {
    currentScore = readFileSync(PROJECT.currentScorePath, "utf-8");
    console.log(`✅ Found existing portfolio score: ${PROJECT.currentScorePath}`);
  } else {
    console.log(`⚠️  No existing portfolio score found at: ${PROJECT.currentScorePath}`);
  }

  // Read discovery documents
  const discoveryContent: string[] = [];
  for (const docPath of PROJECT.discoveryDocs) {
    if (existsSync(docPath)) {
      const content = readFileSync(docPath, "utf-8");
      discoveryContent.push(`\n## ${docPath}\n\n${content}`);
      console.log(`✅ Loaded: ${docPath}`);
    } else {
      console.log(`⚠️  Missing: ${docPath}`);
    }
  }

  if (discoveryContent.length === 0) {
    console.error(`❌ No discovery documents found for ${PROJECT.name}`);
    return;
  }

  const discoveryText = discoveryContent.join("\n\n---\n\n");

  // Create reassessment prompt
  const reassessmentPrompt = `Reassess the portfolio score for "${PROJECT.name}" based on the completed discovery work.

**Current Portfolio Score:**
${currentScore || "No existing score found"}

**Discovery Documents:**
${discoveryText.substring(0, 20000)}${discoveryText.length > 20000 ? "..." : ""}

**Task**: Reassess all 8 criteria based on the new discovery insights:

1. **Desirability Signal Strength** (1-5)
   - Review pain points from PERSONA and NARRATIVE (burnout, isolation, mental strain)
   - Assess demand signals from MANUS discovery (affluent niche, $15k retreat spending)
   - Consider willingness to pay (high disposable income, premium wellness spending)

2. **Niche Durability Score** (1-5)
   - Review niche characteristics from NARRATIVE (CTOs, startup founders, tech leaders)
   - Assess budgeted buyer (affluent, high disposable income, willing to pay $15k for retreats)
   - Evaluate recurring job frequency (weekly/monthly stress cycles, burnout episodes)

3. **Moat Potential** (1-5)
   - Review GAPS-OPPORTUNITIES analysis (technology gaps, platform gaps, business model gaps)
   - Assess switching costs (journey music preferences, integration into wellness routine)
   - Evaluate data moat opportunities (journey preferences, biometric data, personalization)

4. **Expansion Revenue Depth** (1-5)
   - Review GAPS-OPPORTUNITIES (premium subscription, corporate wellness, additional therapy types)
   - Assess expansion levers from discovery
   - Evaluate monetization potential (premium pricing for affluent niche)

5. **JTBD Frequency Map** (1-5)
   - Review JTBD from MANUS and PERSONA (weekly stress cycles, burnout episodes, mental health support)
   - Assess job frequency and recurrence
   - Evaluate frequency increase factors

6. **Wave/Timing Analysis** (1-5)
   - Review market trends from NARRATIVE (growing acceptance, high-profile adoption like Elon Musk)
   - Assess regulatory landscape (acknowledge risks but also growing acceptance)
   - Evaluate market timing and maturity

7. **Implementation Cost + Risk** (1-5, inverse - lower is better)
   - Review complexity from discovery (mobile app, music curation, personalization)
   - Assess regulatory risks (acknowledge but consider growing acceptance)
   - Evaluate technical complexity vs. market opportunity

8. **Expected Value (EV) Model**
   - Calculate probability of success based on discovery insights
   - Model MRR potential based on niche size and premium pricing ($50-200/mo for affluent users)
   - Calculate expected value

**Key Insights from Discovery**:
- Affluent niche (CTOs, startup founders) with high disposable income
- Willing to pay $15k for psychedelic retreats (proves willingness to pay premium)
- Growing acceptance (Elon Musk, executive wellness trend)
- Clear pain points (burnout, isolation, mental strain)
- Technology gaps (AI-powered adaptive music, mobile-first standalone)
- Business model gaps (premium consumer app vs. free/B2B competitors)

**Output Format**: Provide a complete portfolio score document following the exact structure of the current score, with updated scores and rationale based on discovery insights.

**Be thorough and cite specific evidence from discovery documents. Consider that the discovery work may reveal stronger signals than the initial assessment.**`;

  const result = await reason({
    prompt: reassessmentPrompt,
    systemPrompt: "You are a portfolio strategist. Reassess portfolio scores based on discovery insights with precision and evidence-based reasoning. Consider that discovery work often reveals stronger signals than initial assessments.",
    model: "gpt-4o",
    maxTokens: 4000,
  });

  if (!result.success || !result.data) {
    console.error(`❌ Failed to reassess portfolio score for ${PROJECT.name}:`, result.error);
    return;
  }

  // Save updated portfolio score
  const outputPath = PROJECT.currentScorePath;
  const updatedScore = result.data.content;

  // Ensure the output follows the proper format
  const formattedScore = `# Portfolio Score: ${PROJECT.name}

${updatedScore}

---

## Reassessment Metadata

**Reassessed**: ${new Date().toISOString().split('T')[0]}  
**Source**: Discovery documents (MANUS, NARRATIVE, PERSONA, GAPS-OPPORTUNITIES, COMPETITORS)  
**AI Tool**: ChatGPT (GPT-4o)  
**Tokens**: ${result.metadata?.tokensUsed || "N/A"}  
**Status**: Updated based on completed discovery work
`;

  writeFileSync(outputPath, formattedScore);
  console.log(`✅ Updated portfolio score saved to: ${outputPath}\n`);
}

reassessKetaminePortfolioScore().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});


