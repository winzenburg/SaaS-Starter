/**
 * Initialize Discovery Workflows for Batch 1 (Top 5 Ideas)
 * 
 * Creates discovery workflows for:
 * 1. Amazon FBA Seller Intelligence
 * 2. Real Estate Investor & Flipper Platform
 * 3. AI Meeting Assistant
 * 4. AI Code Review & Documentation Tool
 * 5. Enterprise Design System for Startups
 */

import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const BATCH_1_IDEAS = [
  {
    name: "Amazon FBA Seller Intelligence",
    slug: "amazon-fba-seller-intelligence",
    niche: "Amazon Sellers",
    jtbd: "Help me understand my product performance and find new opportunities",
    buyer: "FBA seller or small brand owner",
    description: "Intelligence platform for Amazon FBA sellers to analyze product performance, identify opportunities, and optimize their business",
  },
  {
    name: "Real Estate Investor & Flipper Platform",
    slug: "real-estate-investor-flipper",
    niche: "Real estate investors/flippers",
    jtbd: "Help me analyze deals, track renos, and ROI",
    buyer: "Small investor, flipper",
    description: "Platform for real estate investors and flippers to analyze deals, track renovations, and calculate ROI",
  },
  {
    name: "AI Meeting Assistant",
    slug: "ai-meeting-assistant",
    niche: "Sales teams, founders, CS reps",
    jtbd: "Help me capture meeting notes and update my CRM automatically",
    buyer: "Sales leader, AE, founder",
    description: "AI-powered meeting assistant that captures notes, extracts action items, and automatically updates CRM systems",
  },
  {
    name: "AI Code Review & Documentation Tool",
    slug: "ai-code-review-docs",
    niche: "Engineers, startups",
    jtbd: "Help me generate clean code reviews and documentation instantly",
    buyer: "CTO, dev lead, IC engineer",
    description: "AI tool that generates comprehensive code reviews and documentation automatically for engineering teams",
  },
  {
    name: "Enterprise Design System for Startups",
    slug: "enterprise-design-system-startups",
    niche: "Startups, scale-ups, CTOs/Heads of Product",
    jtbd: "Help me ship UI consistently and faster",
    buyer: "CTO, Head of Product, Lead Designer",
    description: "Enterprise-grade design system and component library for startups to ship consistent UI faster",
  },
];

function createManusPrompt(idea: typeof BATCH_1_IDEAS[0]) {
  return `Generate a discovery pack for: ${idea.name}

Target niche: ${idea.niche}
Initial JTBD: ${idea.jtbd}
Buyer: ${idea.buyer}
Description: ${idea.description}

Provide:
1. Niche narrative (culture, vocabulary, identity, geography, income, communities, trends)
2. Pain language dictionary (complaints, frustrations, unmet needs, direct quotes, "I wish..." statements)
3. JTBD seeds (functional jobs, emotional jobs, social jobs, triggers, success criteria)
4. Competitor landscape and gaps (positioning, narratives, differentiation opportunities)
5. Pricing expectations (what buyers expect to pay, willingness to pay signals)
6. Distribution hooks and entry points (how to reach this niche, trust signals, community entry points)
`;
}

function createChatGPTPrompt(idea: typeof BATCH_1_IDEAS[0]) {
  return `Refine and synthesize this Manus discovery output for ${idea.name}:

[PASTE MANUS OUTPUT HERE]

Tasks:
1. Cluster pain points by frequency, severity, urgency
2. Synthesize JTBD structure (main job, related jobs, emotional jobs)
3. Extract opportunity vectors from competitor gaps
4. Validate and cross-check assumptions
5. Create a clean "Validation Pack" ready for Cursor agents

Output format:
- Clustered pain points with scores
- Structured JTBD map
- Opportunity vectors ranked by potential
- Validated assumptions
- Ready-to-use insights for Cursor agents
`;
}

function createWorkflowReadme(idea: typeof BATCH_1_IDEAS[0]) {
  return `# Discovery Workflow: ${idea.name}

## Idea Details
- **Name**: ${idea.name}
- **Slug**: ${idea.slug}
- **Niche**: ${idea.niche}
- **JTBD**: ${idea.jtbd}
- **Buyer**: ${idea.buyer}

## Discovery Workflow Steps

### Step 1: Manus Discovery Pack
**Status**: ⏳ Pending

**Prompt**:
\`\`\`
${createManusPrompt(idea)}
\`\`\`

**Instructions**:
1. Go to Manus.im
2. Use the prompt above
3. Save the output to: \`docs/discovery/MANUS-${idea.slug}.md\`

### Step 2: ChatGPT Refinement
**Status**: ⏳ Pending (requires Step 1)

**Prompt**:
\`\`\`
${createChatGPTPrompt(idea)}
\`\`\`

**Instructions**:
1. Copy Manus output from Step 1
2. Use ChatGPT with the prompt above
3. Save the output to: \`docs/discovery/CHATGPT-REFINEMENT-${idea.slug}.md\`

### Step 3: Niche Intelligence Agent
**Status**: ⏳ Pending (requires Steps 1-2)

**Command**:
\`\`\`bash
@Niche-Intelligence-Agent Analyze niche for ${idea.name}

Inputs:
- Manus niche narrative: docs/discovery/MANUS-${idea.slug}.md
- ChatGPT refinement: docs/discovery/CHATGPT-REFINEMENT-${idea.slug}.md

Output: /docs/discovery/NICHE-INTEL-${idea.slug}.md
\`\`\`

### Step 4: Pain Signal Agent
**Status**: ⏳ Pending (requires Steps 1-2)

**Command**:
\`\`\`bash
@Pain-Signal-Agent Analyze pain signals for ${idea.name}

Inputs:
- Manus pain language: docs/discovery/MANUS-${idea.slug}.md
- ChatGPT clustering: docs/discovery/CHATGPT-REFINEMENT-${idea.slug}.md

Output: /docs/discovery/PAIN-SIGNALS-${idea.slug}.md
\`\`\`

### Step 5: JTBD Agent
**Status**: ⏳ Pending (requires Steps 1-2)

**Command**:
\`\`\`bash
@JTBD-Agent Create persona and JTBD map for ${idea.name}

Inputs:
- Manus persona narrative: docs/discovery/MANUS-${idea.slug}.md
- Manus JTBD seeds: docs/discovery/MANUS-${idea.slug}.md
- ChatGPT JTBD structure: docs/discovery/CHATGPT-REFINEMENT-${idea.slug}.md

Output: /docs/discovery/JTBD-${idea.slug}.md
\`\`\`

### Step 6: Opportunity & Moat Agent
**Status**: ⏳ Pending (requires Steps 3-5)

**Command**:
\`\`\`bash
@Opportunity-Moat-Agent Evaluate opportunity and moat potential for ${idea.name}

Inputs:
- Manus competitor gaps: docs/discovery/MANUS-${idea.slug}.md
- Pain signals: /docs/discovery/PAIN-SIGNALS-${idea.slug}.md
- JTBD analysis: /docs/discovery/JTBD-${idea.slug}.md

Output: /docs/discovery/OPPORTUNITY-${idea.slug}.md
\`\`\`

### Step 7: Red-Team Strategist (Optional)
**Status**: ⏳ Optional

**Command**:
\`\`\`bash
@Red-Team-Strategist Critique and find blindspots for ${idea.name}

Inputs:
- All discovery documents in /docs/discovery/${idea.slug}/

Output: /docs/discovery/REDTEAM-${idea.slug}.md
\`\`\`

### Step 8: Score & Decision
**Status**: ⏳ Pending (requires Step 6)

**Opportunity Score Calculation** (in OPPORTUNITY doc):
- Niche Viability (0-2.5 points)
- Pain Intensity (0-2.5 points)
- Persona Clarity (0-1.5 points)
- Moat Potential (0-3.5 points)

**Decision Gate**:
- If Score ≥ 8.0/10 → Proceed to Demand Validation
- If Score < 8.0/10 → Pivot or Kill

## Expected Outputs

- [ ] \`docs/discovery/MANUS-${idea.slug}.md\`
- [ ] \`docs/discovery/CHATGPT-REFINEMENT-${idea.slug}.md\`
- [ ] \`docs/discovery/NICHE-INTEL-${idea.slug}.md\`
- [ ] \`docs/discovery/PAIN-SIGNALS-${idea.slug}.md\`
- [ ] \`docs/discovery/JTBD-${idea.slug}.md\`
- [ ] \`docs/discovery/OPPORTUNITY-${idea.slug}.md\`
- [ ] \`docs/discovery/REDTEAM-${idea.slug}.md\` (optional)
- [ ] Opportunity Score calculated
- [ ] Decision: Proceed / Pivot / Kill

## Next Steps

After completing all steps:
1. Review Opportunity Score
2. If ≥ 8.0/10: Proceed to Demand Validation workflow
3. If < 8.0/10: Consider pivot or move to next idea
`;
}

// Create discovery directory structure
const discoveryDir = join(process.cwd(), "docs", "discovery");
try {
  mkdirSync(discoveryDir, { recursive: true });
} catch {
  // Directory already exists
}

// Create workflow READMEs for each idea
BATCH_1_IDEAS.forEach((idea) => {
  const readmePath = join(discoveryDir, `WORKFLOW-${idea.slug}.md`);
  writeFileSync(readmePath, createWorkflowReadme(idea), "utf-8");
  console.log(`✅ Created workflow guide: ${readmePath}`);
});

// Create batch summary
const batchSummary = `# Batch 1 Discovery Workflows

> Top 5 ideas for discovery workflow execution

## Ideas in Batch 1

${BATCH_1_IDEAS.map((idea, idx) => `${idx + 1}. **${idea.name}** (\`${idea.slug}\`)`).join("\n")}

## Workflow Guides

Each idea has a complete workflow guide:

${BATCH_1_IDEAS.map((idea) => `- [${idea.name}](./WORKFLOW-${idea.slug}.md)`).join("\n")}

## Execution Order

Execute workflows in parallel or sequentially:

1. **Step 1 (Manus)**: Run for all 5 ideas (can be done in parallel)
2. **Step 2 (ChatGPT)**: Run for all 5 ideas (after Step 1 completes)
3. **Steps 3-6 (Cursor Agents)**: Run sequentially for each idea
4. **Step 7 (Red-Team)**: Optional, run for ideas with Score ≥ 7.5
5. **Step 8 (Scoring)**: Calculate Opportunity Score for each

## Quick Start

### Option 1: Use Workflows UI
1. Go to \`/workflows\`
2. Create Discovery workflow for each idea
3. Execute steps sequentially

### Option 2: Manual Execution
1. Follow workflow guide for each idea
2. Start with Step 1 (Manus) for all 5
3. Continue through steps sequentially

## Time Estimates

- **Per idea**: 7-11 hours total
- **Batch 1 (5 ideas)**: 35-55 hours total
- **Step 1 (Manus)**: 1-2 hours per idea (can parallelize)
- **Step 2 (ChatGPT)**: 30-60 min per idea
- **Steps 3-6**: 6-10 hours per idea (sequential)

## Success Criteria

Each idea should have:
- ✅ All discovery documents complete
- ✅ Opportunity Score calculated
- ✅ Clear decision: Proceed / Pivot / Kill
- ✅ Top 3 ideas identified for validation

## Next Steps After Batch 1

1. Review all Opportunity Scores
2. Identify top 3 ideas (Score ≥ 8.0/10)
3. Proceed to Demand Validation for top 3
4. Move to Batch 2 for remaining Tier 1 ideas
`;

writeFileSync(
  join(discoveryDir, "BATCH-1-SUMMARY.md"),
  batchSummary,
  "utf-8"
);
console.log(`✅ Created batch summary: ${join(discoveryDir, "BATCH-1-SUMMARY.md")}`);

console.log("\n🎉 Batch 1 discovery workflows initialized!");
console.log("\nNext steps:");
console.log("1. Review workflow guides in docs/discovery/WORKFLOW-*.md");
console.log("2. Start with Step 1 (Manus) for each idea");
console.log("3. Follow the workflow guides sequentially");

