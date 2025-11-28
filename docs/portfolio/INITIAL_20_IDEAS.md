# Initial 20 SaaS Ideas - Portfolio Analysis

> Portfolio scoring and prioritization for 20 raw ideas

## Ideas Overview

| # | Name | Target Niche | Initial JTBD | Buyer | Budgeted? | Recurring? |
|---|------|--------------|--------------|-------|-----------|------------|
| 1 | Amazon FBA Seller Intelligence | Amazon Sellers | Help me understand my product performance and find new opportunities | FBA seller or small brand owner | ✅ Yes | ✅ Yes |
| 2 | Real Estate Investor & Flipper Platform | Real estate investors/flippers | Help me analyze deals, track renos, and ROI | Small investor, flipper | ✅ Yes | ✅ Yes |
| 3 | Ghost Kitchen Manager | Ghost kitchens, virtual restaurants | Help me manage orders, menus, and costs across platforms | Ghost kitchen operator | ✅ Yes | ✅ Yes |
| 4 | Enterprise Design System for Startups | Startups, scale-ups, CTOs/Heads of Product | Help me ship UI consistently and faster | CTO, Head of Product, Lead Designer | ✅ Yes | ✅ Yes |
| 5 | HVAC Service Business Suite | HVAC SMBs | Help me schedule jobs, invoice, and track staff | HVAC business owner | ✅ Yes | ✅ Yes |
| 6 | Creator Revenue Dashboard | Solo creators, YouTubers, coaches | Help me see all my revenue streams in one place | Creator | ⚠️ Sometimes | ✅ Yes |
| 7 | Subcontractor Mgmt for GCs | General contractors, builders | Help me track subcontractors, schedules, and payments | GC owner/operator | ✅ Yes | ✅ Yes |
| 8 | Wedding Photography Suite | Wedding photographers | Help me manage clients, galleries, and contracts | Photographer | ✅ Yes | ✅ Yes |
| 9 | Freelancer Finance & Tax | Freelancers, consultants | Help me track income and automatically file taxes | Freelancer | ⚠️ Sometimes | ✅ Yes |
| 10 | Dietitian Nutrition Therapy Platform | Registered dietitians | Help me track client progress & customize meal plans | Dietitian | ⚠️ Sometimes | ✅ Yes |
| 11 | Athletic Performance Tracker | Sports coaches, trainers | Help me track athlete performance and programs | Coach / trainer | ⚠️ Sometimes | ✅ Yes |
| 12 | Pool Service Business Platform | Pool cleaning SMBs | Help me manage routes, invoices, and chemicals | Pool service operator | ✅ Yes | ✅ Yes |
| 13 | AI Proposal & RFP Tool for Agencies | Marketing/dev/creative agencies | Help me respond to more RFPs and win more deals | Agency owner | ✅ Yes | ✅ Yes |
| 14 | Influencer Media Kit Generator | Influencers, UGC creators | Help me create a beautiful media kit automatically | Creator | ⚠️ Sometimes | ⚠️ Sometimes |
| 15 | Creator Collaboration Marketplace | Creators, brands, agencies | Help me find collabs with the right partners | Creator or brand manager | ⚠️ Sometimes | ✅ Yes |
| 16 | AI Content Repurposing Engine | Creators & social teams | Help me turn long content into short content automatically | Creator, agency, social media manager | ✅ Yes | ✅ Yes |
| 17 | AI Meeting Assistant | Sales teams, founders, CS reps | Help me capture meeting notes and update my CRM automatically | Sales leader, AE, founder | ✅ Yes | ✅ Yes |
| 18 | AI Code Review & Documentation Tool | Engineers, startups | Help me generate clean code reviews and documentation instantly | CTO, dev lead, IC engineer | ✅ Yes | ✅ Yes |
| 19 | Micro-SaaS Idea Validator | Indie hackers, small founders | Help me validate if an idea is viable quickly | Indie founder | ❌ No | ❌ No |
| 20 | Freelancer Invoice-to-Tax Platform | Freelancers | Help me convert invoices into tax-ready summaries | Freelancer | ⚠️ Sometimes | ✅ Yes |

## Initial Assessment

### Strong Candidates (Budgeted Buyer + Recurring Job)

**Tier 1 - Highest Potential**:
- #1: Amazon FBA Seller Intelligence
- #2: Real Estate Investor & Flipper Platform
- #3: Ghost Kitchen Manager
- #4: Enterprise Design System for Startups
- #5: HVAC Service Business Suite
- #7: Subcontractor Mgmt for GCs
- #8: Wedding Photography Suite
- #12: Pool Service Business Platform
- #13: AI Proposal & RFP Tool for Agencies
- #16: AI Content Repurposing Engine
- #17: AI Meeting Assistant
- #18: AI Code Review & Documentation Tool

**Tier 2 - Moderate Potential** (Budgeted Sometimes):
- #6: Creator Revenue Dashboard
- #9: Freelancer Finance & Tax
- #10: Dietitian Nutrition Therapy Platform
- #11: Athletic Performance Tracker
- #15: Creator Collaboration Marketplace
- #20: Freelancer Invoice-to-Tax Platform

**Tier 3 - Lower Potential**:
- #14: Influencer Media Kit Generator (Sometimes recurring)
- #19: Micro-SaaS Idea Validator (No budget, no recurring job)

## Next Steps: Discovery Workflow

### NEW: AI-Powered Discovery Process

**Before** portfolio scoring or validation, run the **Discovery Workflow** on each idea to systematically analyze:
- Niche intelligence (culture, vocabulary, communities)
- Pain signals (frequency, severity, urgency, monetization)
- Persona & JTBD (identity, jobs, emotional drivers)
- Opportunity & moat potential (defensibility, switching costs, data moats)

**Critical Rule**: No engineering work begins until **Opportunity Score ≥ 8.0/10**

### Step 1: Run Discovery Workflow

**Option A: Use Workflows UI** (Recommended)
1. Go to `/workflows`
2. Click "Create Workflow"
3. Enter idea name, slug, and select "Discovery" phase
4. Execute each step sequentially

**Option B: Use Cursor Agents** (Manual)
See `docs/portfolio/DISCOVERY-REVIEW-PLAN.md` for complete instructions

**Discovery Workflow (8 Steps)**:
1. **Manus** → Niche Narrative + Pain Language + JTBD + Competitors
2. **ChatGPT** → Refinement Packet
3. **@Niche-Intelligence-Agent** → `/docs/discovery/NICHE-INTEL-<idea-slug>.md`
4. **@Pain-Signal-Agent** → `/docs/discovery/PAIN-SIGNALS-<idea-slug>.md`
5. **@JTBD-Agent** → `/docs/discovery/JTBD-<idea-slug>.md`
6. **@Opportunity-Moat-Agent** → `/docs/discovery/OPPORTUNITY-<idea-slug>.md`
7. **Calculate Opportunity Score** (0-10)
8. **Decision Gate**: If Score ≥ 8.0 → Proceed to Validation

### Step 2: Prioritized Discovery Schedule

**Batch 1: Top 5 Ideas** (Week 1)
1. Amazon FBA Seller Intelligence
2. Real Estate Investor & Flipper Platform
3. AI Meeting Assistant
4. AI Code Review & Documentation Tool
5. Enterprise Design System for Startups

**Batch 2: Remaining Tier 1** (Week 2)
- Ghost Kitchen Manager, HVAC Service Business Suite, Subcontractor Mgmt for GCs, Wedding Photography Suite, Pool Service Business Platform, AI Proposal & RFP Tool, AI Content Repurposing Engine

**Batch 3: Tier 2 Ideas** (Week 3)
- Creator Revenue Dashboard, Freelancer Finance & Tax, Dietitian Nutrition Therapy Platform, Athletic Performance Tracker, Creator Collaboration Marketplace, Freelancer Invoice-to-Tax Platform

**Batch 4: Tier 3 Ideas** (Week 4)
- Influencer Media Kit Generator, Micro-SaaS Idea Validator

### Step 3: After Discovery

**If Opportunity Score ≥ 8.0/10**:
- Proceed to **Demand Validation** workflow
- Run validation agents: `@Demand-Validator`, `@Landing-Builder`, `@Distribution-Operator`, `@Pricing-Tester`

**If Opportunity Score < 8.0/10**:
- **Pivot**: Adjust niche, pain focus, or value prop
- **Kill**: Move to next idea

### Complete Discovery Guide

See `docs/portfolio/DISCOVERY-REVIEW-PLAN.md` for:
- Detailed workflow instructions
- Agent command templates
- Time estimates
- Output checklists
- Next steps after discovery

## Recommended Workflow (Updated)

### Week 1: Discovery - Batch 1 (Top 5 Ideas)
- **Day 1-2**: Run discovery workflow on top 5 ideas
- **Day 3**: Review Opportunity Scores, identify top 3
- **Day 4-5**: Deep dive on top 3 ideas (refine discovery if needed)

### Week 2: Discovery - Batch 2 (Remaining Tier 1)
- **Day 6-8**: Run discovery on remaining Tier 1 ideas
- **Day 9-10**: Review all Tier 1 Opportunity Scores

### Week 3: Discovery - Batch 3 (Tier 2 Ideas)
- **Day 11-13**: Run discovery on Tier 2 ideas
- **Day 14**: Review all Opportunity Scores, select top 3-5 overall

### Week 4: Demand Validation (Top 3-5 Ideas)
- **Day 15-17**: Run demand validation on top 3-5 ideas (Score ≥ 8.0)
- **Day 18-19**: Review validation results, select top 1-2

### Week 5+: Build
- **Week 5-7**: Design & Engineering on top idea
- **Week 8+**: Launch and measure

## Notes

- **#19 (Micro-SaaS Idea Validator)**: Meta-idea. Consider killing or pivoting (no budget, no recurring job).
- **Creator tools (#6, #14, #15)**: Lower budget certainty. May need different monetization approach.
- **AI tools (#16, #17, #18)**: Hot market but competitive. Need strong moat strategy.
- **SMB tools (#1, #2, #3, #5, #7, #8, #12)**: Strong potential. Budgeted buyers, recurring jobs.

## Quick Start: Discovery Workflow

### Option 1: Use Workflows UI (Easiest)

1. Go to `/workflows`
2. Click "Create Workflow"
3. Enter:
   - **Idea Name**: Amazon FBA Seller Intelligence
   - **Idea Slug**: `amazon-fba-seller-intelligence`
   - **Phase**: Discovery
4. Click "Create Workflow"
5. Execute each step in sequence

### Option 2: Manual Cursor Agents

Start with Manus discovery pack, then run:

```bash
# Step 3: Niche Intelligence
@Niche-Intelligence-Agent Analyze niche for Amazon FBA Seller Intelligence

# Step 4: Pain Signal Analysis  
@Pain-Signal-Agent Analyze pain signals for Amazon FBA Seller Intelligence

# Step 5: JTBD Analysis
@JTBD-Agent Create persona and JTBD map for Amazon FBA Seller Intelligence

# Step 6: Opportunity & Moat
@Opportunity-Moat-Agent Evaluate opportunity and moat potential for Amazon FBA Seller Intelligence
```

**Outputs**: All discovery documents in `/docs/discovery/`

**See**: `docs/portfolio/DISCOVERY-REVIEW-PLAN.md` for complete instructions

