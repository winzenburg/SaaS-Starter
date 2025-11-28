# Next Steps: Batch 1 Discovery Workflows

> Active workflows: Design System, Real Estate, FBA

## Active Workflows

You've started discovery workflows for:

1. ✅ **Enterprise Design System for Startups** (`enterprise-design-system-startups`)
2. ✅ **Real Estate Investor & Flipper Platform** (`real-estate-investor-flipper`)
3. ✅ **Amazon FBA Seller Intelligence** (`amazon-fba-seller-intelligence`)

## Current Step: Step 1 (Manus Discovery Pack)

### What to Do Now

For each of the 3 active workflows, complete **Step 1: Manus Discovery Pack**:

1. **Go to Manus.im**
2. **Use the prompt from each workflow guide**:
   - `docs/discovery/WORKFLOW-enterprise-design-system-startups.md`
   - `docs/discovery/WORKFLOW-real-estate-investor-flipper.md`
   - `docs/discovery/WORKFLOW-amazon-fba-seller-intelligence.md`

3. **Save outputs to**:
   - `docs/discovery/MANUS-enterprise-design-system-startups.md`
   - `docs/discovery/MANUS-real-estate-investor-flipper.md`
   - `docs/discovery/MANUS-amazon-fba-seller-intelligence.md`

### Quick Reference: Manus Prompts

#### Enterprise Design System for Startups

```
Generate a discovery pack for: Enterprise Design System for Startups

Target niche: Startups, scale-ups, CTOs/Heads of Product
Initial JTBD: Help me ship UI consistently and faster
Buyer: CTO, Head of Product, Lead Designer
Description: Enterprise-grade design system and component library for startups to ship consistent UI faster

Provide:
1. Niche narrative (culture, vocabulary, identity, geography, income, communities, trends)
2. Pain language dictionary (complaints, frustrations, unmet needs, direct quotes, "I wish..." statements)
3. JTBD seeds (functional jobs, emotional jobs, social jobs, triggers, success criteria)
4. Competitor landscape and gaps (positioning, narratives, differentiation opportunities)
5. Pricing expectations (what buyers expect to pay, willingness to pay signals)
6. Distribution hooks and entry points (how to reach this niche, trust signals, community entry points)
```

#### Real Estate Investor & Flipper Platform

```
Generate a discovery pack for: Real Estate Investor & Flipper Platform

Target niche: Real estate investors/flippers
Initial JTBD: Help me analyze deals, track renos, and ROI
Buyer: Small investor, flipper
Description: Platform for real estate investors and flippers to analyze deals, track renovations, and calculate ROI

Provide:
1. Niche narrative (culture, vocabulary, identity, geography, income, communities, trends)
2. Pain language dictionary (complaints, frustrations, unmet needs, direct quotes, "I wish..." statements)
3. JTBD seeds (functional jobs, emotional jobs, social jobs, triggers, success criteria)
4. Competitor landscape and gaps (positioning, narratives, differentiation opportunities)
5. Pricing expectations (what buyers expect to pay, willingness to pay signals)
6. Distribution hooks and entry points (how to reach this niche, trust signals, community entry points)
```

#### Amazon FBA Seller Intelligence

```
Generate a discovery pack for: Amazon FBA Seller Intelligence

Target niche: Amazon Sellers
Initial JTBD: Help me understand my product performance and find new opportunities
Buyer: FBA seller or small brand owner
Description: Intelligence platform for Amazon FBA sellers to analyze product performance, identify opportunities, and optimize their business

Provide:
1. Niche narrative (culture, vocabulary, identity, geography, income, communities, trends)
2. Pain language dictionary (complaints, frustrations, unmet needs, direct quotes, "I wish..." statements)
3. JTBD seeds (functional jobs, emotional jobs, social jobs, triggers, success criteria)
4. Competitor landscape and gaps (positioning, narratives, differentiation opportunities)
5. Pricing expectations (what buyers expect to pay, willingness to pay signals)
6. Distribution hooks and entry points (how to reach this niche, trust signals, community entry points)
```

## After Step 1 Completes

Once you have all 3 Manus outputs saved:

### Step 2: ChatGPT Refinement

For each idea, refine the Manus output:

1. **Copy Manus output** from the saved file
2. **Use ChatGPT** with the refinement prompt from each workflow guide
3. **Save to**: `docs/discovery/CHATGPT-REFINEMENT-<slug>.md`

### Steps 3-6: Cursor Agents

After Step 2, run Cursor agents sequentially for each idea:

1. `@Niche-Intelligence-Agent` → Creates NICHE-INTEL doc
2. `@Pain-Signal-Agent` → Creates PAIN-SIGNALS doc
3. `@JTBD-Agent` → Creates JTBD doc
4. `@Opportunity-Moat-Agent` → Creates OPPORTUNITY doc (includes scoring)

**Note**: You can work on one idea at a time, or parallelize across ideas if preferred.

## Using the Workflows UI

If you created workflows via `/workflows`:

1. **Navigate to each workflow** in the UI
2. **Click "Execute Step"** for Step 1
3. **The system will**:
   - Call Manus API (if configured)
   - Save output automatically
   - Update workflow status

4. **After Step 1 completes**, proceed to Step 2, etc.

## Tracking Progress

Update `docs/portfolio/BATCH-1-STATUS.md` as you complete each step:

- Mark steps as complete: `[x]`
- Update Opportunity Scores when calculated
- Record decisions (Proceed/Pivot/Kill)

## Expected Timeline

- **Step 1 (Manus)**: 3-6 hours (1-2 hours per idea, can parallelize)
- **Step 2 (ChatGPT)**: 1.5-3 hours (30-60 min per idea)
- **Steps 3-6**: 18-30 hours (6-10 hours per idea, sequential recommended)

**Total for 3 ideas**: 22.5-39 hours

## Questions?

- See workflow guides: `docs/discovery/WORKFLOW-*.md`
- See quick start: `docs/discovery/BATCH-1-QUICK-START.md`
- See discovery plan: `docs/portfolio/DISCOVERY-REVIEW-PLAN.md`

