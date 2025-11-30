import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { writeFileSync, readFileSync, existsSync, readdirSync } from "fs";
import { join } from "path";
import { reason } from "../src/lib/ai-tools/chatgpt";

const PORTFOLIO_DIR = join(process.cwd(), "docs", "portfolio");
const PROJECTS_DIR = join(process.cwd(), "projects");

// Initial 20 ideas from INITIAL_20_IDEAS.md
const IDEAS = [
  {
    name: "Amazon FBA Seller Intelligence",
    slug: "amazon-fba-seller-intelligence",
    niche: "Amazon Sellers",
    jtbd: "Help me understand my product performance and find new opportunities",
    buyer: "FBA seller or small brand owner",
    budgeted: true,
    recurring: true,
  },
  {
    name: "Real Estate Investor & Flipper Platform",
    slug: "real-estate-investor-flipper-platform",
    niche: "Real estate investors/flippers",
    jtbd: "Help me analyze deals, track renos, and ROI",
    buyer: "Small investor, flipper",
    budgeted: true,
    recurring: true,
  },
  {
    name: "Ghost Kitchen Manager",
    slug: "ghost-kitchen-manager",
    niche: "Ghost kitchens, virtual restaurants",
    jtbd: "Help me manage orders, menus, and costs across platforms",
    buyer: "Ghost kitchen operator",
    budgeted: true,
    recurring: true,
  },
  {
    name: "Enterprise Design System for Startups",
    slug: "enterprise-design-system-startups",
    niche: "Startups, scale-ups, CTOs/Heads of Product",
    jtbd: "Help me ship UI consistently and faster",
    buyer: "CTO, Head of Product, Lead Designer",
    budgeted: true,
    recurring: true,
  },
  {
    name: "HVAC Service Business Suite",
    slug: "hvac-service-business-suite",
    niche: "HVAC SMBs",
    jtbd: "Help me schedule jobs, invoice, and track staff",
    buyer: "HVAC business owner",
    budgeted: true,
    recurring: true,
  },
  {
    name: "Creator Revenue Dashboard",
    slug: "creator-revenue-dashboard",
    niche: "Solo creators, YouTubers, coaches",
    jtbd: "Help me see all my revenue streams in one place",
    buyer: "Creator",
    budgeted: false, // Sometimes
    recurring: true,
  },
  {
    name: "Subcontractor Mgmt for GCs",
    slug: "subcontractor-mgmt-for-gcs",
    niche: "General contractors, builders",
    jtbd: "Help me track subcontractors, schedules, and payments",
    buyer: "GC owner/operator",
    budgeted: true,
    recurring: true,
  },
  {
    name: "Wedding Photography Suite",
    slug: "wedding-photography-suite",
    niche: "Wedding photographers",
    jtbd: "Help me manage clients, galleries, and contracts",
    buyer: "Photographer",
    budgeted: true,
    recurring: true,
  },
  {
    name: "Freelancer Finance & Tax",
    slug: "freelancer-finance-tax",
    niche: "Freelancers, consultants",
    jtbd: "Help me track income and automatically file taxes",
    buyer: "Freelancer",
    budgeted: false, // Sometimes
    recurring: true,
  },
  {
    name: "Dietitian Nutrition Therapy Platform",
    slug: "dietitian-nutrition-therapy-platform",
    niche: "Registered dietitians",
    jtbd: "Help me track client progress & customize meal plans",
    buyer: "Dietitian",
    budgeted: false, // Sometimes
    recurring: true,
  },
  {
    name: "Athletic Performance Tracker",
    slug: "athletic-performance-tracker",
    niche: "Sports coaches, trainers",
    jtbd: "Help me track athlete performance and programs",
    buyer: "Coach / trainer",
    budgeted: false, // Sometimes
    recurring: true,
  },
  {
    name: "Pool Service Business Platform",
    slug: "pool-service-business-platform",
    niche: "Pool cleaning SMBs",
    jtbd: "Help me manage routes, invoices, and chemicals",
    buyer: "Pool service operator",
    budgeted: true,
    recurring: true,
  },
  {
    name: "AI Proposal & RFP Tool for Agencies",
    slug: "ai-proposal-rfp-tool-agencies",
    niche: "Marketing/dev/creative agencies",
    jtbd: "Help me respond to more RFPs and win more deals",
    buyer: "Agency owner",
    budgeted: true,
    recurring: true,
  },
  {
    name: "Influencer Media Kit Generator",
    slug: "influencer-media-kit-generator",
    niche: "Influencers, UGC creators",
    jtbd: "Help me create a beautiful media kit automatically",
    buyer: "Creator",
    budgeted: false, // Sometimes
    recurring: false, // Sometimes
  },
  {
    name: "Creator Collaboration Marketplace",
    slug: "creator-collaboration-marketplace",
    niche: "Creators, brands, agencies",
    jtbd: "Help me find collabs with the right partners",
    buyer: "Creator or brand manager",
    budgeted: false, // Sometimes
    recurring: true,
  },
  {
    name: "AI Content Repurposing Engine",
    slug: "ai-content-repurposing-engine",
    niche: "Creators & social teams",
    jtbd: "Help me turn long content into short content automatically",
    buyer: "Creator, agency, social media manager",
    budgeted: true,
    recurring: true,
  },
  {
    name: "AI Meeting Assistant",
    slug: "ai-meeting-assistant",
    niche: "Sales teams, founders, CS reps",
    jtbd: "Help me capture meeting notes and update my CRM automatically",
    buyer: "Sales leader, AE, founder",
    budgeted: true,
    recurring: true,
  },
  {
    name: "AI Code Review & Documentation Tool",
    slug: "ai-code-review-documentation-tool",
    niche: "Engineers, startups",
    jtbd: "Help me generate clean code reviews and documentation instantly",
    buyer: "CTO, dev lead, IC engineer",
    budgeted: true,
    recurring: true,
  },
  {
    name: "Micro-SaaS Idea Validator",
    slug: "micro-saas-idea-validator",
    niche: "Indie hackers, small founders",
    jtbd: "Help me validate if an idea is viable quickly",
    buyer: "Indie founder",
    budgeted: false,
    recurring: false,
  },
  {
    name: "Freelancer Invoice-to-Tax Platform",
    slug: "freelancer-invoice-to-tax-platform",
    niche: "Freelancers",
    jtbd: "Help me convert invoices into tax-ready summaries",
    buyer: "Freelancer",
    budgeted: false, // Sometimes
    recurring: true,
  },
];

async function checkExistingScores(): Promise<Set<string>> {
  const existing = new Set<string>();
  
  // Check docs/portfolio
  if (existsSync(PORTFOLIO_DIR)) {
    const files = readdirSync(PORTFOLIO_DIR);
    files.forEach((file) => {
      if (file.startsWith("PORTFOLIO-SCORE-") && file.endsWith(".md")) {
        const slug = file.replace("PORTFOLIO-SCORE-", "").replace(".md", "");
        existing.add(slug);
      }
    });
  }
  
  // Check project folders
  if (existsSync(PROJECTS_DIR)) {
    const projects = readdirSync(PROJECTS_DIR, { withFileTypes: true });
    for (const project of projects) {
      if (project.isDirectory()) {
        const scoreFile = join(PROJECTS_DIR, project.name, `PORTFOLIO-SCORE-${project.name}.md`);
        if (existsSync(scoreFile)) {
          existing.add(project.name);
        }
      }
    }
  }
  
  return existing;
}

async function scoreProject(idea: typeof IDEAS[0], hasDiscoveryDocs: boolean): Promise<string> {
  console.log(`\n📊 Scoring: ${idea.name}...`);
  
  // Try to load any existing discovery/validation docs
  let contextDocs = "";
  
  const discoveryNarrative = join(process.cwd(), "docs", "product", `NARRATIVE-${idea.slug}.md`);
  const discoveryPersona = join(process.cwd(), "docs", "research", `PERSONA-${idea.slug}.md`);
  const discoveryCompetitors = join(process.cwd(), "docs", "research", `COMPETITORS-${idea.slug}.md`);
  const validationPlan = join(process.cwd(), "docs", "validation", `VALIDATION-PLAN-${idea.slug}.md`);
  
  if (hasDiscoveryDocs) {
    if (existsSync(discoveryNarrative)) {
      contextDocs += `\n## Narrative\n${readFileSync(discoveryNarrative, "utf-8").substring(0, 2000)}\n`;
    }
    if (existsSync(discoveryPersona)) {
      contextDocs += `\n## Persona\n${readFileSync(discoveryPersona, "utf-8").substring(0, 1500)}\n`;
    }
    if (existsSync(discoveryCompetitors)) {
      contextDocs += `\n## Competitors\n${readFileSync(discoveryCompetitors, "utf-8").substring(0, 1500)}\n`;
    }
    if (existsSync(validationPlan)) {
      contextDocs += `\n## Validation Plan\n${readFileSync(validationPlan, "utf-8").substring(0, 2000)}\n`;
    }
  }
  
  const prompt = `You are the Portfolio Prioritizer Agent. Your job is to score and prioritize product ideas based on 8 criteria.

# Product Context

**Idea**: ${idea.name}
**Target Niche**: ${idea.niche}
**Initial JTBD**: ${idea.jtbd}
**Buyer**: ${idea.buyer}
**Budgeted Buyer**: ${idea.budgeted ? "✅ Yes" : "❌ No"}
**Recurring Job**: ${idea.recurring ? "✅ Yes" : "❌ No"}

${contextDocs ? `# Additional Context\n${contextDocs}\n` : "# Note: Initial Scoring\nThis is an initial portfolio score based on basic information. A more detailed score can be generated after discovery/validation documents are created.\n"}

# Your Task

Create a comprehensive Portfolio Score document following this exact structure:

# Portfolio Score: ${idea.name}

**Idea**: ${idea.name}
**Target Niche**: ${idea.niche}
**Initial JTBD**: ${idea.jtbd}
**Buyer**: ${idea.buyer}
**Budgeted Buyer**: ${idea.budgeted ? "✅ Yes" : "❌ No"}
**Recurring Job**: ${idea.recurring ? "✅ Yes" : "❌ No"}

## Scoring

### 1. Desirability Signal Strength

**Score: X/5** ([Level])

${hasDiscoveryDocs ? "**Validation Tests**:\n- [List from validation plan if available]\n- [Assess current status]\n\n" : "**Validation Tests**:\n- Not run yet (initial scoring)\n\n"}

**Demand Signals**:
- Waitlists: ${hasDiscoveryDocs ? "[Check docs]" : "None yet"}
- Pre-orders: ${hasDiscoveryDocs ? "[Check docs]" : "None yet"}
- DMs/Inquiries: ${hasDiscoveryDocs ? "[Check docs]" : "None yet"}
- Repeat usage: ${hasDiscoveryDocs ? "[Check docs]" : "None yet"}
- Emotional attachment: ${hasDiscoveryDocs ? "[Check docs]" : "None yet"}

**Confidence**: [High | Medium | Low]

### 2. Niche Durability Score

**Score: X/5** ([Level])

**Growth Trajectory**:
- [Assess market growth for ${idea.niche}]
- [Assess niche sustainability]

**Budgeted Buyer**:
- [Clear economic buyer? ${idea.budgeted ? "Yes" : "No"}]
- [Budget authority?]
- [Budget size estimate]
- [Budget stability]

**Recurring Job**:
- [Frequency: Daily/Weekly/Monthly/Quarterly - assess based on JTBD: "${idea.jtbd}"]
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

**Job Frequency**: [Daily/Weekly/Monthly/Quarterly - assess based on "${idea.jtbd}"]

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
- **Regulatory risks**: [Assessment]
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

**Combined Score**: X/5 (Lower cost/risk = Higher score)

**Confidence**: [High | Medium | Low]

### 8. Expected Value (EV) Model

**Probability of Success**:
- **Demand validation probability**: [X%]
- **Moat/MRR validation probability**: [X%]
- **Build success probability**: [X%]
- **Market success probability**: [X%]
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

1. **Scoring Scale**: Each criterion is scored 1-5, where:
   - 5 = Excellent/Very Strong
   - 4 = Strong/Good
   - 3 = Moderate/Average
   - 2 = Weak/Poor
   - 1 = Very Weak/Very Poor

2. **Total Score Interpretation**:
   - 30-40: Top Priority (Proceed immediately)
   - 25-29: High Priority (Proceed when resources available)
   - 20-24: Medium Priority (Validate when capacity allows)
   - 15-19: Low Priority (Validate only if no better options)
   - 0-14: Kill (Don't waste resources)

3. **Initial Scoring**: ${hasDiscoveryDocs ? "This score is based on available discovery/validation documents." : "This is an initial score based on basic information. Re-score after discovery/validation for more accurate assessment."}

Now generate the complete Portfolio Score document.`;

  const response = await reason({
    prompt,
    model: "gpt-4o",
    temperature: 0.7,
    max_tokens: 8000,
  });

  if (!response.success || !response.data?.content) {
    throw new Error(`Failed to generate portfolio score for ${idea.name}`);
  }

  return response.data.content;
}

async function main() {
  console.log("🔍 Portfolio Scoring: All Projects\n");
  console.log("Following Portfolio Management Playbook (Rule 207)\n");
  console.log("Agent: @Portfolio-Prioritizer (ChatGPT-first)\n");

  // Check existing scores
  const existingScores = await checkExistingScores();
  console.log(`📊 Found ${existingScores.size} existing portfolio scores\n`);

  // Ensure portfolio directory exists
  if (!existsSync(PORTFOLIO_DIR)) {
    const { mkdirSync } = await import("fs");
    mkdirSync(PORTFOLIO_DIR, { recursive: true });
  }

  const results: Array<{ name: string; slug: string; score: number; verdict: string; hasScore: boolean }> = [];

  for (const idea of IDEAS) {
    const hasScore = existingScores.has(idea.slug);
    const hasDiscoveryDocs = 
      existsSync(join(process.cwd(), "docs", "product", `NARRATIVE-${idea.slug}.md`)) ||
      existsSync(join(process.cwd(), "docs", "validation", `VALIDATION-PLAN-${idea.slug}.md`));

    if (hasScore) {
      console.log(`⏭️  Skipping ${idea.name} (already scored)`);
      // Read existing score to extract summary
      const scorePath = join(PORTFOLIO_DIR, `PORTFOLIO-SCORE-${idea.slug}.md`);
      const projectScorePath = join(PROJECTS_DIR, idea.slug, `PORTFOLIO-SCORE-${idea.slug}.md`);
      const existingPath = existsSync(scorePath) ? scorePath : (existsSync(projectScorePath) ? projectScorePath : null);
      
      if (existingPath) {
        const content = readFileSync(existingPath, "utf-8");
        const scoreMatch = content.match(/\*\*Total Score\*\*.*?(\d+)\/40/);
        const verdictMatch = content.match(/### Verdict:.*?([✅⚠️❌].*?PROCEED|PIVOT|KILL)/);
        const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;
        const verdict = verdictMatch ? verdictMatch[1].replace(/[✅⚠️❌]/g, "").trim() : "Unknown";
        results.push({ name: idea.name, slug: idea.slug, score, verdict, hasScore: true });
      }
      continue;
    }

    try {
      const portfolioScore = await scoreProject(idea, hasDiscoveryDocs);
      const outputPath = join(PORTFOLIO_DIR, `PORTFOLIO-SCORE-${idea.slug}.md`);
      writeFileSync(outputPath, portfolioScore, "utf-8");
      
      // Extract score and verdict
      const scoreMatch = portfolioScore.match(/\*\*Total Score\*\*.*?(\d+)\/40/);
      const verdictMatch = portfolioScore.match(/### Verdict:.*?([✅⚠️❌].*?PROCEED|PIVOT|KILL)/);
      const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;
      const verdict = verdictMatch ? verdictMatch[1].replace(/[✅⚠️❌]/g, "").trim() : "Unknown";
      
      results.push({ name: idea.name, slug: idea.slug, score, verdict, hasScore: false });
      console.log(`✅ Scored: ${idea.name} (${score}/40 - ${verdict})`);
      
      // Small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`❌ Error scoring ${idea.name}:`, error);
      results.push({ name: idea.name, slug: idea.slug, score: 0, verdict: "ERROR", hasScore: false });
    }
  }

  // Summary
  console.log("\n" + "=".repeat(80));
  console.log("📊 PORTFOLIO SCORING SUMMARY");
  console.log("=".repeat(80) + "\n");

  // Sort by score
  results.sort((a, b) => b.score - a.score);

  console.log("| Rank | Project | Score | Verdict | Status |");
  console.log("|------|---------|-------|---------|--------|");
  results.forEach((r, i) => {
    const status = r.hasScore ? "Existing" : "New";
    const priority = r.score >= 30 ? "⭐⭐⭐⭐⭐" : r.score >= 25 ? "⭐⭐⭐⭐" : r.score >= 20 ? "⭐⭐⭐" : r.score >= 15 ? "⭐⭐" : "⭐";
    console.log(`| ${i + 1} | ${r.name.substring(0, 40)} | ${r.score}/40 | ${r.verdict} | ${status} |`);
  });

  console.log("\n" + "=".repeat(80));
  console.log(`✅ Scored ${results.filter(r => !r.hasScore).length} new projects`);
  console.log(`📁 All scores saved to: ${PORTFOLIO_DIR}`);
  console.log("=".repeat(80) + "\n");
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});


