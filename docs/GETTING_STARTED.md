# Getting Started: From 20 Raw Ideas to Your First SaaS

> Step-by-step guide to using the 12-agent product creation engine

## Your Starting Point

You have **20 raw ideas in a spreadsheet**. Here's how to turn them into a prioritized portfolio and start building.

## Step 1: Portfolio Scoring (30-60 minutes)

**Goal**: Score all 20 ideas to identify the top 3-5 to validate.

### Action: Run Portfolio Prioritizer on Each Idea

For each of your 20 ideas, create a portfolio score document:

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

### Quick Scoring Template

For speed, you can use this quick scoring template in your spreadsheet:

| Idea | Desirability (1-5) | Niche Durability (1-5) | Moat Potential (1-5) | Expansion Revenue (1-5) | Frequency (1-5) | Wave/Timing (1-5) | Cost (1-5) | Risk (1-5) | **Total Score** | **Verdict** |
|------|-------------------|----------------------|---------------------|----------------------|----------------|------------------|------------|-----------|----------------|-------------|
| Idea 1 | | | | | | | | | | |
| Idea 2 | | | | | | | | | | |

**Scoring Guide**:
- **Desirability**: 1=No signals, 5=Strong signals (waitlists, DMs, preorders)
- **Niche Durability**: 1=Declining, 5=Growing with budgeted buyers
- **Moat Potential**: 1=No moat, 5=Clear path to 2+ moats
- **Expansion Revenue**: 1=No expansion, 5=Clear path to 10x
- **Frequency**: 1=Rare job, 5=Daily/weekly job
- **Wave/Timing**: 1=Poor timing, 5=Perfect timing
- **Cost**: 1=Very high cost, 5=Very low cost
- **Risk**: 1=Very high risk, 5=Very low risk

**Total Score**: Sum of all 8 scores (out of 40)

**Verdict**:
- **25-40**: Proceed (top priority)
- **20-24**: Proceed (high priority)
- **15-19**: Pivot (needs adjustment)
- **<15**: Kill (don't waste time)

### Expected Output

After scoring all 20 ideas, you should have:
- Portfolio scores for all 20 ideas
- Top 3-5 ideas identified (scores ≥ 20)
- Kill list (scores < 15)
- Pivot list (scores 15-19)

**Next Step**: Take your top 3-5 ideas to Step 2.

---

## Step 2: Core Criteria Check (5 minutes per idea)

**Goal**: Verify each top-scoring idea meets the 6 core criteria.

### Action: Quick Checklist

For each of your top 3-5 ideas, verify:

- [ ] **Strong desirability** (community heat signals present)
- [ ] **Identity-level pain** (not just functional pain)
- [ ] **Recurring job** (weekly/monthly frequency or boosters)
- [ ] **Budgeted buyer** (clear buyer with willingness to pay)
- [ ] **First monetization wedge** (clear first paid moment)
- [ ] **Path to defensibility** (at least one moat type identified)

**Rule**: If 2+ criteria fail → pivot or kill. Do not proceed.

**Reference**: `.cursor/rules/000-core-idea-criteria.mdc`

### Expected Output

- 1-3 ideas that pass core criteria
- Ideas that fail moved to pivot/kill list

**Next Step**: Take your 1-3 validated ideas to Step 3.

---

## Step 3: Insight Validation (1-2 hours per idea)

**Goal**: Validate desirability, durability, and defensibility before build.

### Action: Run Insight Validation Playbook

For each of your 1-3 ideas, follow the 7-step validation:

```
@Insight-Strategist Create an "Unfair Insight + Narrative" brief for [IDEA_NAME].

Include:
1) Unfair insight (what do we know that others don't?)
2) Narrative: the emotional hook + transformation story
3) Target community (who feels this pain most intensely?)
4) Early signals: what would strongly validate interest?
5) 5 demand-validation tests (no-code/human first)
6) Distribution wedge (audience or community entry point)
7) Recommendation: proceed, pivot, or kill

Output: /docs/product/INSIGHT-[idea-slug].md
```

Then continue with the full validation flow:

1. **@Insight-Strategist** → Unfair Insight Brief
2. **@Market-Scanner** → Community Heat & Niche Durability
3. **@Product-Strategist** → Narrative PRD + Desirability Tests
4. **@Retention-Architect** → Weekly/Monthly Value Design
5. **@Moat-MRR-Strategist** → Moat Map + Expansion Plan
6. **@Portfolio-Prioritizer** → Final Kill/Pivot/Proceed

**Reference**: `.cursor/rules/200-playbook-insight-validation.mdc`

### Expected Output

For each idea:
- `/docs/product/INSIGHT-[idea].md` — Unfair insight, narrative, community
- `/docs/research/MARKET-[idea].md` — Community heat, niche durability
- `/docs/product/PRD-[idea].md` — Narrative PRD, desirability validation
- `/docs/product/RETENTION-[idea].md` — Retention architecture
- `/docs/product/MOAT-MRR-[idea].md` — Moat map, expansion revenue
- Final verdict: **Proceed** | Pivot | Kill

**Next Step**: Take ideas with "Proceed" verdict to Step 4.

---

## Step 4: Design & Engineering (1-2 weeks per idea)

**Goal**: Build the feature with validated demand, clear retention, and defensibility.

### Action: Run New Feature Playbook

For each idea with "Proceed" verdict, follow the build flow:

**Prerequisites Check** (must have all 5):
- [ ] Insight Brief complete
- [ ] Narrative PRD complete
- [ ] Retention Architecture complete
- [ ] Moat + MRR Strategy complete
- [ ] Portfolio Greenlight (verdict: "Proceed")

**Then proceed to**:

1. **@IA-Designer** → IA/Flows/Edge Cases
2. **@Engineering-Architect** → ADR + Schema + Router Plan
3. **@Test-Engineer** → Test Plan + Stubs
4. **@Implementer** → Build (Small Diffs, MVP-First)
5. **@Accessibility-Agent** → A11y Audit + Fix Loop
6. **@Test-Engineer** → Test Verify
7. **@Product-Strategist** → PRD Acceptance Check

**Reference**: `.cursor/rules/210-playbook-new-feature.mdc`

### Expected Output

- Working feature with validated demand
- Retention architecture implemented
- Data capture instrumented (for Data Moat)
- Expansion revenue mechanisms implemented
- All tests green, a11y compliant
- Ready for deployment

---

## Recommended Workflow for 20 Ideas

### Week 1: Portfolio Scoring

**Day 1-2**: Score all 20 ideas
- Use Portfolio Prioritizer agent for each idea
- Create portfolio score documents
- Identify top 3-5 ideas

**Day 3**: Core criteria check
- Verify top 3-5 ideas meet 6 core criteria
- Filter to 1-3 ideas that pass

### Week 2-3: Validation

**Day 4-10**: Insight validation for top 1-3 ideas
- Run full 7-step validation flow
- Create all validation artifacts
- Get final Proceed/Pivot/Kill verdicts

**Day 11-14**: Select top idea
- Choose the idea with strongest validation
- Ensure all 5 prerequisites complete

### Week 4+: Build

**Week 4-6**: Design & Engineering
- Run new feature playbook
- Build MVP with validated demand
- Deploy and measure

---

## Quick Start: Your First Idea (Today)

If you want to start immediately, pick your **best idea** (highest confidence) and:

1. **Run Portfolio Prioritizer** (15 min)
   ```
   @Portfolio-Prioritizer Score and prioritize the idea: [YOUR_BEST_IDEA]
   ```

2. **Check Core Criteria** (5 min)
   - Verify it meets 6 criteria
   - If 2+ fail → pick next idea

3. **Run Insight Validation** (1-2 hours)
   - Follow 7-step flow
   - Get Proceed/Pivot/Kill verdict

4. **If Proceed**: Start building
   - Follow new feature playbook
   - Build MVP

---

## Tools & Resources

### Cursor Agents
- Use `@Agent-Name` to invoke agents
- Agents will create documents in appropriate folders
- Follow prompts in `docs/agents/*.md`

### Key Documents
- `docs/FINAL_SYSTEM_SUMMARY.md` — Complete system overview
- `docs/SYSTEMS.md` — The Four Systems framework
- `AGENTS.md` — Agent orchestration manual
- `.cursor/rules/` — All rules and playbooks

### Spreadsheet Template

Create a tracking spreadsheet with columns:

| Idea | Portfolio Score | Core Criteria Pass | Validation Status | Verdict | Next Step |
|------|----------------|-------------------|------------------|---------|-----------|
| Idea 1 | | | | | |
| Idea 2 | | | | | |

---

## Common Questions

### Q: How many ideas should I validate at once?

**A**: Start with 1-2 ideas. Don't spread yourself too thin. Focus on getting one idea through the full validation → build → launch cycle first.

### Q: What if all 20 ideas score low?

**A**: That's valuable information! It means:
- Your ideas need more refinement
- You need to find better niches
- You should pivot your approach

Don't force it. Better to kill 20 bad ideas than build 1 bad product.

### Q: Can I skip validation and just build?

**A**: **No.** Building before validation is forbidden (`.cursor/rules/027-core-desirability-first.mdc`). The system is designed to prevent waste. Validation takes 1-2 hours. Building takes weeks. Validate first.

### Q: What if validation says "Kill" but I still believe in the idea?

**A**: That's a signal to **pivot**, not ignore. Ask:
- What part of validation failed?
- Can you adjust the idea to pass?
- Is there a different community/angle?

If you can't pivot to pass validation, kill it. Your time is better spent on ideas that pass.

### Q: How do I know which idea to build first?

**A**: Build the idea with:
- Highest portfolio score
- Strongest validation signals
- Clearest path to first paid moment
- Most defensible moat strategy

---

## Next Steps

1. **Today**: Score your 20 ideas using Portfolio Prioritizer
2. **This Week**: Validate your top 1-3 ideas
3. **Next Week**: Start building your top idea

**Remember**: The system is designed to help you **kill bad ideas fast** and **build good ideas well**. Don't fall in love with every idea. Let the data guide you.

Good luck! 🚀

