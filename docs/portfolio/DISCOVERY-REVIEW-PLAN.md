# Discovery Review Plan: 20 Initial Ideas

> Using the new AI-powered discovery workflow to systematically evaluate all 20 ideas

## Discovery Workflow Overview

The new discovery workflow uses AI tools to systematically analyze each idea through 8 steps:

1. **Manus** → Niche Narrative + Pain Language + JTBD + Competitors
2. **ChatGPT** → Refinement Packet
3. **@Niche-Intelligence-Agent** → Niche Map (`/docs/discovery/NICHE-INTEL-<idea-slug>.md`)
4. **@Pain-Signal-Agent** → Pain Prioritization (`/docs/discovery/PAIN-SIGNALS-<idea-slug>.md`)
5. **@JTBD-Agent** → Persona + Jobs Map (`/docs/discovery/JTBD-<idea-slug>.md`)
6. **@Opportunity-Moat-Agent** → Moat Strategy (`/docs/discovery/OPPORTUNITY-<idea-slug>.md`)
7. **Score the Idea** → Opportunity Score (0-10)
8. **Decision Gate** → If Score ≥ 8.0 → Move to Demand Validation

**Critical Rule**: No engineering work begins until Opportunity Score ≥ 8.0/10

## How to Run Discovery for Each Idea

### Quick Start: Using the Workflows UI

1. Go to `/workflows`
2. Click "Create Workflow"
3. Enter:
   - **Idea Name**: [Idea name from list]
   - **Idea Slug**: [kebab-case slug]
   - **Phase**: Discovery
4. Click "Create Workflow"
5. Execute each step sequentially

### Manual: Using Cursor Agents

For each idea, run this sequence:

#### Step 1: Manus Discovery Pack

**Input to Manus**:
```
Generate a discovery pack for: [IDEA_NAME]

Target niche: [TARGET_NICHE]
Initial JTBD: [INITIAL_JTBD]

Provide:
1. Niche narrative (culture, vocabulary, identity, geography, income, communities)
2. Pain language dictionary (complaints, frustrations, unmet needs)
3. JTBD seeds (functional, emotional, social jobs)
4. Competitor landscape and gaps
5. Pricing expectations
6. Distribution hooks and entry points
```

**Save output**: Use as input for Step 2

#### Step 2: ChatGPT Refinement

**Input to ChatGPT**:
```
Refine and synthesize this Manus discovery output for [IDEA_NAME]:

[PASTE MANUS OUTPUT]

Tasks:
1. Cluster pain points by frequency, severity, urgency
2. Synthesize JTBD structure (main job, related jobs, emotional jobs)
3. Extract opportunity vectors from competitor gaps
4. Validate and cross-check assumptions
5. Create a clean "Validation Pack" ready for Cursor agents
```

**Save output**: Use as input for Cursor agents

#### Step 3-6: Cursor Discovery Agents

Run each agent in sequence:

```bash
# Step 3: Niche Intelligence
@Niche-Intelligence-Agent Analyze niche for [IDEA_NAME]

Inputs:
- Manus niche narrative: [from Step 1]
- ChatGPT refinement: [from Step 2]

Output: /docs/discovery/NICHE-INTEL-<idea-slug>.md

# Step 4: Pain Signal Analysis
@Pain-Signal-Agent Analyze pain signals for [IDEA_NAME]

Inputs:
- Manus pain language: [from Step 1]
- ChatGPT clustering: [from Step 2]

Output: /docs/discovery/PAIN-SIGNALS-<idea-slug>.md

# Step 5: JTBD Analysis
@JTBD-Agent Create persona and JTBD map for [IDEA_NAME]

Inputs:
- Manus persona narrative: [from Step 1]
- Manus JTBD seeds: [from Step 1]
- ChatGPT JTBD structure: [from Step 2]

Output: /docs/discovery/JTBD-<idea-slug>.md

# Step 6: Opportunity & Moat Analysis
@Opportunity-Moat-Agent Evaluate opportunity and moat potential for [IDEA_NAME]

Inputs:
- Manus competitor gaps: [from Step 1]
- Pain signals: /docs/discovery/PAIN-SIGNALS-<idea-slug>.md
- JTBD analysis: /docs/discovery/JTBD-<idea-slug>.md

Output: /docs/discovery/OPPORTUNITY-<idea-slug>.md
```

#### Step 7: Calculate Opportunity Score

The `@Opportunity-Moat-Agent` will calculate the Opportunity Score based on:

1. **Niche Viability** (0-2.5 points)
   - Niche size and growth potential
   - Entry points and trust signals
   - Community engagement

2. **Pain Intensity** (0-2.5 points)
   - Top pain signal scores (average of top 3)
   - MAAP intensity
   - Monetization potential

3. **Persona Clarity** (0-1.5 points)
   - Persona narrative completeness
   - JTBD frequency and clarity
   - Emotional driver strength

4. **Moat Potential** (0-3.5 points)
   - Winner-take-most dynamics
   - Switching cost potential
   - Data moat strength
   - Workflow embedding potential
   - Blue ocean opportunity size

**Total**: 10.0 points maximum

#### Step 8: Decision Gate

- **If Opportunity Score ≥ 8.0/10**: Proceed to Demand Validation
- **If Opportunity Score < 8.0/10**: Pivot or Kill

## Prioritized Discovery Schedule

### Batch 1: Tier 1 Ideas (Week 1)

Run full discovery on top 5 ideas:

1. **Amazon FBA Seller Intelligence** (`amazon-fba-seller-intelligence`)
   - Strong niche, budgeted buyer, recurring job
   - Expected: High Opportunity Score

2. **Real Estate Investor & Flipper Platform** (`real-estate-investor-flipper`)
   - Strong niche, budgeted buyer, recurring job
   - Expected: High Opportunity Score

3. **AI Meeting Assistant** (`ai-meeting-assistant`)
   - Hot market, clear value, budgeted buyer
   - Expected: Medium-High Opportunity Score (competitive)

4. **AI Code Review & Documentation Tool** (`ai-code-review-docs`)
   - Developer tools, budgeted buyer
   - Expected: Medium-High Opportunity Score

5. **Enterprise Design System for Startups** (`enterprise-design-system-startups`)
   - Clear buyer, recurring need
   - Expected: High Opportunity Score

### Batch 2: Tier 1 Remaining (Week 2)

6. **Ghost Kitchen Manager** (`ghost-kitchen-manager`)
7. **HVAC Service Business Suite** (`hvac-service-business-suite`)
8. **Subcontractor Mgmt for GCs** (`subcontractor-mgmt-gcs`)
9. **Wedding Photography Suite** (`wedding-photography-suite`)
10. **Pool Service Business Platform** (`pool-service-business-platform`)
11. **AI Proposal & RFP Tool for Agencies** (`ai-proposal-rfp-agencies`)
12. **AI Content Repurposing Engine** (`ai-content-repurposing-engine`)

### Batch 3: Tier 2 Ideas (Week 3)

13. **Creator Revenue Dashboard** (`creator-revenue-dashboard`)
14. **Freelancer Finance & Tax** (`freelancer-finance-tax`)
15. **Dietitian Nutrition Therapy Platform** (`dietitian-nutrition-therapy`)
16. **Athletic Performance Tracker** (`athletic-performance-tracker`)
17. **Creator Collaboration Marketplace** (`creator-collaboration-marketplace`)
18. **Freelancer Invoice-to-Tax Platform** (`freelancer-invoice-tax`)

### Batch 4: Tier 3 Ideas (Week 4)

19. **Influencer Media Kit Generator** (`influencer-media-kit-generator`)
20. **Micro-SaaS Idea Validator** (`micro-saas-idea-validator`)

## Discovery Output Checklist

For each idea, ensure you have:

- [ ] `/docs/discovery/NICHE-INTEL-<idea-slug>.md`
- [ ] `/docs/discovery/PAIN-SIGNALS-<idea-slug>.md`
- [ ] `/docs/discovery/JTBD-<idea-slug>.md`
- [ ] `/docs/discovery/OPPORTUNITY-<idea-slug>.md`
- [ ] Opportunity Score calculated (in OPPORTUNITY doc)
- [ ] Decision: Proceed / Pivot / Kill

## Next Steps After Discovery

### If Opportunity Score ≥ 8.0/10

Proceed to **Demand Validation**:

1. `@Demand-Validator` → Validation Plan
2. `@Landing-Builder` → Landing Copy + Visuals
3. `@Distribution-Operator` → Distribution Strategy
4. `@Pricing-Tester` → Pricing Tests

### If Opportunity Score < 8.0/10

**Pivot Options**:
- Adjust target niche
- Refocus on different pain signals
- Change value proposition
- Target different buyer segment

**Kill Criteria**:
- Niche too small or declining
- Pain not intense enough
- No clear moat potential
- Better opportunities available

## Tracking Progress

Use the Hub dashboard (`/hub`) to track:
- Which ideas have completed discovery
- Opportunity Scores for each idea
- Documents generated for each idea
- Next steps for each idea

## Expected Outcomes

After running discovery on all 20 ideas:

1. **Top 3-5 ideas** with Opportunity Score ≥ 8.0/10
2. **Clear understanding** of niche, pain, persona, and opportunity for each
3. **Data-driven decisions** on which ideas to pursue
4. **Pivot or kill decisions** for low-scoring ideas
5. **Prioritized pipeline** for demand validation

## Time Estimates

- **Per idea discovery**: 2-4 hours
  - Manus: 30-60 min
  - ChatGPT refinement: 15-30 min
  - Cursor agents: 60-120 min
  - Review and scoring: 15-30 min

- **Batch 1 (5 ideas)**: 10-20 hours
- **All 20 ideas**: 40-80 hours total

## Quick Reference: Agent Commands

```bash
# Niche Intelligence
@Niche-Intelligence-Agent Analyze niche for [IDEA_NAME]

# Pain Signal Analysis
@Pain-Signal-Agent Analyze pain signals for [IDEA_NAME]

# JTBD Analysis
@JTBD-Agent Create persona and JTBD map for [IDEA_NAME]

# Opportunity & Moat
@Opportunity-Moat-Agent Evaluate opportunity and moat potential for [IDEA_NAME]
```

## See Also

- `.cursor/rules/301-discovery-overview.mdc` - Discovery overview
- `.cursor/rules/302-discovery-workflow.mdc` - Complete 8-step workflow
- `docs/UNIFIED-FACTORY-FLOW.md` - Complete factory flow
- `docs/portfolio/INITIAL_20_IDEAS.md` - Original idea list

