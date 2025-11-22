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

## Next Steps

### Step 1: Portfolio Scoring

Run Portfolio Prioritizer on each idea to get detailed scores:

```
@Portfolio-Prioritizer Score and prioritize the idea: [IDEA_NAME]

Include:
1) Desirability signal strength (validation tests).
2) Niche Durability Score (growth, budgeted buyer, recurring job).
3) Moat potential (data moat, workflow lock-in, switching costs).
4) Expansion revenue depth.
5) JTBD frequency map.
6) Wave/timing analysis.
7) Implementation cost + risk.
8) Expected value (EV) model.
9) Clear recommendation: kill, pivot, or proceed.

Output: /docs/product/PORTFOLIO-SCORE-[idea-slug].md
```

### Step 2: Start with Top 3-5 Ideas

Based on initial assessment, prioritize these for detailed scoring:

1. **Amazon FBA Seller Intelligence** — Strong niche, budgeted buyer, recurring job
2. **Real Estate Investor & Flipper Platform** — Strong niche, budgeted buyer, recurring job
3. **AI Meeting Assistant** — Hot market, clear value, budgeted buyer
4. **AI Code Review & Documentation Tool** — Developer tools, budgeted buyer
5. **Enterprise Design System for Startups** — Clear buyer, recurring need

### Step 3: Quick Validation

For your top 3-5 ideas, run quick validation:

1. **Core Criteria Check** (5 min each)
   - Verify 6 core criteria (see `.cursor/rules/000-core-idea-criteria.mdc`)

2. **Insight Validation** (1-2 hours each)
   - Run full 7-step validation flow (see `.cursor/rules/200-playbook-insight-validation.mdc`)

## Recommended Workflow

### Week 1: Portfolio Scoring
- **Day 1-2**: Score top 10 ideas (Tier 1 + Tier 2)
- **Day 3**: Identify top 3-5 based on scores
- **Day 4-5**: Core criteria check on top 3-5

### Week 2-3: Validation
- **Day 6-10**: Insight validation on top 3-5 ideas
- **Day 11-14**: Select top 1-2 ideas with strongest validation

### Week 4+: Build
- **Week 4-6**: Design & Engineering on top idea
- **Week 7+**: Launch and measure

## Notes

- **#19 (Micro-SaaS Idea Validator)**: Meta-idea. Consider killing or pivoting (no budget, no recurring job).
- **Creator tools (#6, #14, #15)**: Lower budget certainty. May need different monetization approach.
- **AI tools (#16, #17, #18)**: Hot market but competitive. Need strong moat strategy.
- **SMB tools (#1, #2, #3, #5, #7, #8, #12)**: Strong potential. Budgeted buyers, recurring jobs.

## Quick Start Command

To start scoring your first idea:

```
@Portfolio-Prioritizer Score and prioritize the idea: Amazon FBA Seller Intelligence

Include:
1) Desirability signal strength (validation tests).
2) Niche Durability Score (growth, budgeted buyer, recurring job).
3) Moat potential (data moat, workflow lock-in, switching costs).
4) Expansion revenue depth.
5) JTBD frequency map.
6) Wave/timing analysis.
7) Implementation cost + risk.
8) Expected value (EV) model.
9) Clear recommendation: kill, pivot, or proceed.

Output: /docs/product/PORTFOLIO-SCORE-amazon-fba-seller-intelligence.md
```

