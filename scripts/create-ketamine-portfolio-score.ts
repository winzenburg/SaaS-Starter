import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import { reason } from "../src/lib/ai-tools/chatgpt";

const PROJECT_SLUG = "ketamine-meditation-journey-music-mobile-app";
const PROJECT_NAME = "Ketamine - Meditation Journey Music Mobile App";
const NICHE = "Individuals exploring ketamine-assisted therapy and meditation practices";

const PRODUCT_DIR = join(process.cwd(), "docs", "product");
const RESEARCH_DIR = join(process.cwd(), "docs", "research");
const VALIDATION_DIR = join(process.cwd(), "docs", "validation");
const PORTFOLIO_DIR = join(process.cwd(), "docs", "portfolio");

async function createPortfolioScore() {
  console.log("🔍 Creating Portfolio Score (Portfolio Prioritizer Agent)\n");
  console.log(`Project: ${PROJECT_NAME}\n`);
  console.log("Following Portfolio Management Playbook (Rule 207)\n");
  console.log("Agent: @Portfolio-Prioritizer (ChatGPT-first)\n");

  // Step 1: Load input documents
  console.log("📥 Step 1: Loading input documents...\n");

  const narrativePath = join(PRODUCT_DIR, `NARRATIVE-${PROJECT_SLUG}.md`);
  const personaPath = join(RESEARCH_DIR, `PERSONA-${PROJECT_SLUG}.md`);
  const competitorsPath = join(RESEARCH_DIR, `COMPETITORS-${PROJECT_SLUG}.md`);
  const validationPlanPath = join(VALIDATION_DIR, `VALIDATION-PLAN-${PROJECT_SLUG}.md`);
  const redteamPath = join(VALIDATION_DIR, `REDTEAM-${PROJECT_SLUG}.md`);

  if (!existsSync(narrativePath)) {
    throw new Error(`Missing: ${narrativePath}`);
  }
  if (!existsSync(personaPath)) {
    throw new Error(`Missing: ${personaPath}`);
  }
  if (!existsSync(competitorsPath)) {
    throw new Error(`Missing: ${competitorsPath}`);
  }
  if (!existsSync(validationPlanPath)) {
    throw new Error(`Missing: ${validationPlanPath}`);
  }

  const narrative = readFileSync(narrativePath, "utf-8");
  const persona = readFileSync(personaPath, "utf-8");
  const competitors = readFileSync(competitorsPath, "utf-8");
  const validationPlan = readFileSync(validationPlanPath, "utf-8");
  const redteam = existsSync(redteamPath) ? readFileSync(redteamPath, "utf-8") : null;

  console.log(`✅ Loaded: ${narrativePath}`);
  console.log(`✅ Loaded: ${personaPath}`);
  console.log(`✅ Loaded: ${competitorsPath}`);
  console.log(`✅ Loaded: ${validationPlanPath}`);
  if (redteam) {
    console.log(`✅ Loaded: ${redteamPath}`);
  }
  console.log("");

  // Step 2: ChatGPT → Portfolio Score
  console.log("🔍 Step 2: ChatGPT → Portfolio Score Analysis...\n");
  console.log("   Tasks:");
  console.log("   - Score desirability signal strength");
  console.log("   - Score niche durability (growth, budgeted buyer, recurring job)");
  console.log("   - Assess moat potential (data moat, workflow lock-in, switching costs)");
  console.log("   - Evaluate expansion revenue depth");
  console.log("   - Map JTBD frequency");
  console.log("   - Analyze wave/timing");
  console.log("   - Assess implementation cost + risk");
  console.log("   - Model expected value (Probability × Impact)");
  console.log("   - Provide kill/pivot/proceed verdict\n");

  const prompt = `You are the Portfolio Prioritizer Agent. Your job is to score and prioritize product ideas based on 8 criteria to determine if they should be killed, pivoted, or proceed to validation/engineering.

# Product Context

**Idea**: ${PROJECT_NAME}
**Target Niche**: ${NICHE}

# Input Documents

## Narrative
${narrative}

## Persona
${persona}

## Competitors
${competitors}

## Validation Plan
${validationPlan}

${redteam ? `## Red-Team Critique\n${redteam}\n` : ""}

# Your Task

Create a comprehensive Portfolio Score document following this exact structure:

# Portfolio Score: ${PROJECT_NAME}

**Idea**: [Brief description]
**Target Niche**: ${NICHE}
**Initial JTBD**: [Extract from validation plan]
**Buyer**: [Extract from persona]
**Budgeted Buyer**: ✅/❌ [Assess]
**Recurring Job**: ✅/❌ [Assess frequency]

## Scoring

### 1. Desirability Signal Strength

**Score: X/5** ([Level])

**Validation Tests**:
- [List validation tests from validation plan]
- [Assess current status: Not run yet / In progress / Completed]

**Demand Signals**:
- [Waitlists: Any?]
- [Pre-orders: Any?]
- [DMs/Inquiries: Any?]
- [Repeat usage: Any?]
- [Emotional attachment: Any?]

**Confidence**: [High | Medium | Low]

### 2. Niche Durability Score

**Score: X/5** ([Level])

**Growth Trajectory**:
- [Assess market growth]
- [Assess niche sustainability]

**Budgeted Buyer**:
- [Clear economic buyer?]
- [Budget authority?]
- [Budget size estimate]
- [Budget stability]

**Recurring Job**:
- [Frequency: Daily/Weekly/Monthly/Quarterly]
- [Job recurrence: Continuous/Ongoing/Periodic]
- [Job importance: Critical/Important/Nice-to-have]
- [Job durability: Will exist for 12-36+ months?]

**Confidence**: [High | Medium | Low]

### 3. Moat Potential

**Score: X/5** ([Level])

**Data Moat Potential**:
- [Proprietary data opportunities?]
- [Compounding mechanism?]
- [Data uniqueness?]
- [Data moat strength]

**Workflow Lock-In Potential**:
- [Workflow integration depth?]
- [Workflow dependency?]
- [Workflow lock-in strength]

**Switching Costs Potential**:
- [Migration pain?]
- [Saved state?]
- [Team habits?]
- [Switching cost strength]

**Overall Moat Potential**: [Assessment]

**Confidence**: [High | Medium | Low]

### 4. Expansion Revenue Depth

**Score: X/5** ([Level])

**Expansion Revenue Levers**:

**Lever 1: [Name]**
- **Type**: [Type]
- **Potential**: [High/Moderate/Low]
- **Expansion multiple**: [X-Yx]
- **Timeline**: [Timeframe]

[Add 2-3 more levers if applicable]

**Value Metric**: [What metric drives expansion?]

**Expansion Path**:
- **Initial revenue**: [Estimate]
- **Expansion path**: [Path description]
- **Target expansion**: [Estimate]
- **Expansion timeline**: [Timeframe]

**Confidence**: [High | Medium | Low]

### 5. JTBD Frequency Map

**Score: X/5** ([Level])

**Job Frequency**: [Daily/Weekly/Monthly/Quarterly]

**Job Triggers**:
- **Time-based**: [Triggers]
- **Event-based**: [Triggers]
- **Action-based**: [Triggers]

**Frequency Increase Factors**:
- **Success factors**: [What increases frequency?]
- **Growth factors**: [What increases frequency?]
- **Value factors**: [What increases frequency?]
- **Dependency factors**: [What creates dependency?]

**Frequency Boosters**: [What could increase frequency?]

**Confidence**: [High | Medium | Low]

### 6. Wave/Timing Analysis

**Score: X/5** ([Level])

**Wave Maturity Assessment**:
- **Wave stage**: [Emerging/Growing/Mature/Declining]
- **Wave timing**: [Early/Early-Mid/Mid/Late]
- **Wave sustainability**: [High/Medium/Low]

**Early Indicators Track**:
- **Growth signals**: [Assessment]
- **Decline signals**: [Assessment]
- **Signal strength**: [Strong/Moderate/Weak]

**Competitor Velocity Mapping**:
- **Competitor speed**: [Fast/Moderate/Slow]
- **Competitor activity**: [High/Moderate/Low]
- **Market dynamics**: [Assessment]

**Regulatory Horizon Scan**:
- **Regulatory opportunities**: [Assessment]
- **Regulatory risks**: [Assessment - CRITICAL for ketamine]
- **Regulatory timing**: [Assessment]

**Confidence**: [High | Medium | Low]

### 7. Implementation Cost + Risk

**Score: X/5** ([Level] - Note: Higher score = Lower cost/risk)

**Implementation Cost**:
- **Time estimate**: [Timeline]
- **Resource estimate**: [Resources needed]
- **Complexity**: [Low/Moderate/High]
- **Infrastructure needs**: [What's needed?]

**Risk Level**:
- **Demand risk**: [Low/Medium/High]
- **Moat risk**: [Low/Medium/High]
- **Market risk**: [Low/Medium/High]
- **Team risk**: [Low/Medium/High]
- **Technical risk**: [Low/Medium/High]
- **Regulatory risk**: [Low/Medium/High - CRITICAL for ketamine]

**Combined Score**: X/5 (Lower cost/risk = Higher score)

**Confidence**: [High | Medium | Low]

### 8. Expected Value (EV) Model

**Probability of Success**:
- **Demand validation probability**: [X%]
- **Moat/MRR validation probability**: [X%]
- **Build success probability**: [X%]
- **Market success probability**: [X%]
- **Regulatory success probability**: [X% - CRITICAL for ketamine]
- **Overall probability**: [X%]

**Impact (MRR Potential)**:
- **Year 1 MRR potential**: [Estimate]
- **Year 2 MRR potential**: [Estimate]
- **Year 3 MRR potential**: [Estimate]
- **Lifetime value**: [Estimate per user]

**Expected Value Calculation**:
- **EV = [Probability]% × [Year 2 MRR] = [EV]**
- **EV Score**: [High/Moderate/Low]

**Confidence**: [High | Medium | Low]

## Portfolio Score Summary

| Criterion | Score | Weight | Weighted |
|-----------|-------|--------|----------|
| Desirability Signal | X/5 | 1.0 | X.X |
| Niche Durability | X/5 | 1.0 | X.X |
| Moat Potential | X/5 | 1.0 | X.X |
| Expansion Revenue | X/5 | 1.0 | X.X |
| JTBD Frequency | X/5 | 1.0 | X.X |
| Wave/Timing | X/5 | 1.0 | X.X |
| Cost (inverse) | X/5 | 1.0 | X.X |
| Risk (inverse) | X/5 | 1.0 | X.X |
| **Total Score** | **XX/40** | | **XX.X** |

**Portfolio Priority**: [⭐⭐⭐⭐⭐ Top Priority (≥30) | ⭐⭐⭐⭐ High Priority (25-29) | ⭐⭐⭐ Medium Priority (20-24) | ⭐⭐ Low Priority (15-19) | ⭐ Kill (0-14)]

## Recommendation

### Verdict: [✅ PROCEED | ⚠️ PIVOT | ❌ KILL]

**Rationale**:
- [Key factors supporting verdict]
- [Key risks/concerns]
- [Critical considerations - especially regulatory for ketamine]

**Key Factors**:
1. [Factor 1]
2. [Factor 2]
3. [Factor 3]
4. [Factor 4]

**Next Steps**:
1. **Immediate**: [What to do now]
2. **Short-term (1-3 months)**: [What to do next]
3. **Long-term (3-12 months)**: [What to do later]

**Confidence**: [High | Medium | Low]

---

# Important Considerations

1. **Regulatory Risk**: This is a ketamine-related product. You MUST assess regulatory risks carefully. Ketamine is a controlled substance and there are legal/regulatory considerations for apps that facilitate ketamine-assisted experiences.

2. **Safety Concerns**: Mobile apps for ketamine-assisted experiences raise safety concerns. Assess liability risks.

3. **Market Timing**: Psychedelic therapy is gaining acceptance, but assess if timing is right.

4. **Red-Team Critique**: If red-team critique is provided, incorporate its concerns into your assessment, especially around false assumptions, test design weaknesses, and execution risks.

5. **Scoring Scale**: Each criterion is scored 1-5, where:
   - 5 = Excellent/Very Strong
   - 4 = Strong/Good
   - 3 = Moderate/Average
   - 2 = Weak/Poor
   - 1 = Very Weak/Very Poor

6. **Total Score Interpretation**:
   - 30-40: Top Priority (Proceed immediately)
   - 25-29: High Priority (Proceed when resources available)
   - 20-24: Medium Priority (Validate when capacity allows)
   - 15-19: Low Priority (Validate only if no better options)
   - 0-14: Kill (Don't waste resources)

Now generate the complete Portfolio Score document.`;

  const response = await reason({
    prompt,
    model: "gpt-4o",
    temperature: 0.7,
    max_tokens: 8000,
  });

  if (!response.success || !response.data?.content) {
    throw new Error("Failed to generate portfolio score");
  }

  const portfolioScore = response.data.content;

  // Step 3: Save Portfolio Score
  console.log("💾 Step 3: Saving Portfolio Score...\n");

  const outputPath = join(PORTFOLIO_DIR, `PORTFOLIO-SCORE-${PROJECT_SLUG}.md`);
  writeFileSync(outputPath, portfolioScore, "utf-8");

  console.log(`✅ Saved: ${outputPath}\n`);

  console.log("✅ Portfolio Score Complete!\n");
  console.log(`📁 File Created:\n   ${outputPath}\n`);
  console.log("🎯 Next Steps:");
  console.log("   1. Review the portfolio score");
  console.log("   2. Compare with other projects");
  console.log("   3. Make portfolio prioritization decision");
}

createPortfolioScore().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});


