# The Four Systems for Building a SaaS Empire

> Consolidated framework for systematized product creation with multiple bets and continuous MRR compounding

## Overview

This document consolidates the 7 critical categories into 4 systems that work together to create a repeatable, defensible product-creation engine.

**Mental Model**: Isenberg's approach is a great desirability engine for niches. To match our goals (defensive moat + enduring MRR), we explicitly encode durability, retention architecture, and moat design as first-class steps — not assumptions.

**Two-Filter Pipeline**: 
- **Heat Filter** (Isenberg): "Do a tribe of real humans urgently want this?" (Proof: waitlists, DMs, preorders, repeat usage)
- **Durability Filter** (Your Addition): "Will this still matter and keep paying 12–36 months from now?" (Proof: recurring job, budgeted buyer, retention loop, moat map)

**Heat gets you in. Durability makes it a real SaaS business.**

---

## System A: Compounding Niche Engine

**Goal**: Filter niches to identify compounding opportunities that create durable MRR.

### Filters (All Required)

#### 1. Heat Filter (Isenberg)
**Question**: "Do a tribe of real humans urgently want this?"

**Proof**: 
- Waitlists
- DMs
- Preorders
- Repeat usage

**Validation**: `.cursor/rules/200-playbook-insight-validation.mdc`
- At least 3 demand-validation tests passed
- Emotional attachment validated (30%+ would be upset if disappeared)
- High-heat community identified

#### 2. Durability Filter
**Question**: "Will this still matter and keep paying 12–36 months from now?"

**Scoring Criteria** (Score 1-5 for each):
1. **Frequency of the Job**: Daily/weekly (5) → One-time (1)
2. **Economic Buyer Has Budget**: Budgeted spend (5) → No budget (1)
3. **Problem Exists Independent of Hype**: Structural pain (5) → Trend-driven (1)
4. **Users Would Be Upset If It Disappeared**: Critical (5) → No attachment (1)
5. **Clear Path to Switching Costs**: Deep integration (5) → No switching costs (1)

**Assessment**:
- **Durable Market (18-25)**: Compounding SaaS asset, build for long-term MRR
- **Cash-Flow Micro-Bet (10-17)**: Cash-flow micro-bet, build for short-term revenue
- **Low Durability (5-9)**: Consider pivot or kill

**Validation**: `.cursor/rules/205-playbook-moat-mrr-validation.mdc`

#### 3. Frequency Filter (JTBD Frequency Modeling)
**Question**: "How often does the core job occur?"

**Required**: JTBD Frequency Map
- **How often?**: Daily/Weekly/Monthly/Quarterly/Event-driven/Rare
- **What triggers it?**: Time-based/Event-based/Action-based/External/Internal
- **What increases frequency?**: Success factors/Growth factors/Value factors/Dependency factors

**If job is rare**: Required frequency boosters (alerts, monitoring, workflows, repeated jobs, recurring tasks)

**Validation**: `docs/agents/moat-mrr-strategist.md` (Section 4), `docs/agents/product-strategist.md` (Section 1a)

#### 4. Budget Authority Filter
**Question**: "Does the economic buyer have budget?"

**Required**: Budget authority confirmed
- Budgeted spend (enterprise/SMB) = Proceed
- Discretionary spend = Proceed with caution
- Hobby spend = Consider pivot or kill
- No budget = Kill

**Validation**: Durability Filter (Criterion #2), Insight Strategist (Recurring Job + Budgeted Buyer Check)

#### 5. Expansion Revenue Potential Filter
**Question**: "Can this grow from $29/mo to $290/mo without acquisition cost?"

**Required**: At least one expansion revenue lever
- Usage-based pricing
- Additional seats
- Add-ons
- Premium automations
- AI enhanced insights
- Compliance/integrations
- Advanced analytics
- Custom workflows

**Validation**: `docs/agents/moat-mrr-strategist.md` (Section 5), `docs/agents/product-strategist.md` (Section 9)

#### 6. Data-Moat Viability Filter
**Question**: "Can we build a data moat that compounds value?"

**Required**: Data Moat Thesis
- **What proprietary data will we capture?**
- **How does it get better as users grow?**
- **How does that unlock 10× better UX, insights, automation, or recommendations?**
- **What feedback loop improves retention?**

**Validation**: `docs/agents/moat-mrr-strategist.md` (Section 1), `docs/agents/product-strategist.md` (Section 10)

#### 7. Niche Compounding Score (NCS)
**Question**: "Is this a compounding niche or a decaying niche?"

**Scoring Criteria** (Score 1-5 for each):
1. **Market Velocity**: Growing fast (5) → Shrinking (1)
2. **Forced Adoption**: Regulation/compliance mandates (5) → Optional (1)
3. **Increasing Complexity**: Complexity growing (5) → Simplifying (1)
4. **Community Growth**: Community growing (5) → Shrinking (1)
5. **Willingness-to-Pay Trajectory**: Increasing (5) → Decreasing (1)

**Assessment**:
- **Compounding Niche (20-25)**: Build for long-term compounding
- **Stable Niche (15-19)**: Build for stable MRR
- **Decaying Niche (10-14)**: Build for short-term, expect decline
- **Declining Niche (5-9)**: Avoid or pivot

**Validation**: `docs/agents/market-scanner.md` (Section 6)

### System A Output

**Green-Light if**:
- ✅ Heat Filter passed (at least 3 tests, emotional attachment)
- ✅ Durability Filter passed (score ≥ 18, or 10-17 as cash-flow micro-bet)
- ✅ Frequency Filter passed (daily/weekly, or rare with frequency boosters)
- ✅ Budget Authority confirmed (budgeted spend)
- ✅ Expansion Revenue Potential defined (at least one lever)
- ✅ Data-Moat Viability confirmed (Data Moat Thesis complete)
- ✅ Niche Compounding Score ≥ 15 (Compounding or Stable Niche)

**Proceed to System B (Moat Architect)**.

---

## System B: Moat Architect

**Goal**: Design defensibility before building. Answer moat questions before writing code.

### Required Questions (All Must Be Answered)

#### 1. What Moat(s) Are We Designing Toward?

**Required**: Select at least 2 moat types with implementation plan.

**Moat Types**:
1. **Data Moat** (STRONGLY RECOMMENDED) - Proprietary data → better outcomes
2. **Network Effects** (STRONGLY RECOMMENDED) - Collaboration loops, shared value
3. **Workflow Lock-In** - Deep integration into daily ops
4. **Ecosystem Moat** - Plugins, integrations, templates
5. **Switching Costs** - Migration pain, saved state, team habits
6. **Brand/Identity Moat** - Community + narrative

**Implementation Plan Required**:
- How to build it
- Timeline (Phase 1: Months 1-3, Phase 2: Months 4-6, Phase 3: Months 7-12)
- Metrics (how to measure moat strength)
- Dependencies (what needs to happen first)
- Risks (what could prevent this moat from forming)

**Validation**: `docs/agents/moat-mrr-strategist.md` (Section 3), `docs/agents/market-scanner.md` (Section 7)

#### 2. What Data Creates Compounding Value?

**Required**: Data Moat Thesis (System A, Filter #6)

**Components**:
- Proprietary data definition
- Compounding mechanism (how data improves with more users)
- 10× value proposition (how data unlocks 10× better UX/insights/automation/recommendations)
- Feedback loop (data → value → retention → more data)

**Validation**: `docs/agents/moat-mrr-strategist.md` (Section 1), `docs/agents/product-strategist.md` (Section 10)

#### 3. How Do Switching Costs Accumulate?

**Required**: Switching costs strategy

**Switching Cost Types**:
- **Data accumulation**: More data → higher switching costs
- **Workflow integration**: Deeper integration → higher switching costs
- **Team habits**: Team dependencies → higher switching costs
- **Network effects**: More connections → higher switching costs
- **Customization**: More customization → higher switching costs

**Accumulation Strategy**:
- How switching costs increase over time
- What features create switching costs
- How to measure switching cost strength

**Validation**: `docs/agents/moat-mrr-strategist.md` (Retention Thesis, Moat Map), `docs/agents/market-scanner.md` (Section 8)

### System B Output

**Green-Light if**:
- ✅ At least 2 moat types selected with implementation plan
- ✅ Data Moat Thesis complete (if Data Moat selected)
- ✅ Network Effects or Collaboration Loops defined (if Network Effects selected)
- ✅ Switching costs accumulation strategy defined
- ✅ Moat implementation timeline created
- ✅ Moat strength metrics defined

**Proceed to System C (Retention Framework)**.

---

## System C: Retention Framework

**Goal**: Design retention BEFORE code. Include activation, habit loops, notifications, collaboration, and renewal triggers.

### Required Components (All Must Be Designed)

#### 1. Activation Path

**Required**: Activation plan

**Components**:
- **Activation goal**: What defines "activated"?
- **Activation triggers**: What actions indicate activation?
- **Activation features**: What features drive activation?
- **Activation timeline**: How long to activate?
- **Activation metrics**: How to measure activation?

**Validation**: `docs/agents/moat-mrr-strategist.md` (Section 8)

#### 2. Habit Loops

**Required**: Habit formation plan

**Components**:
- **Habit goal**: What habit are we forming?
- **Habit loop**: Cue → Routine → Reward
- **Habit triggers**: What triggers the habit?
- **Habit features**: What features support habit formation?
- **Habit timeline**: How long to form habit?
- **Habit metrics**: How to measure habit strength?

**Validation**: `docs/agents/moat-mrr-strategist.md` (Section 8), `docs/agents/product-strategist.md` (Section 13)

#### 3. Notification Strategy

**Required**: Notification/alert strategy

**Components**:
- **Notification types**: What notifications bring users back?
- **Notification triggers**: When to send notifications?
- **Notification frequency**: How often to send?
- **Notification value**: What value do notifications provide?
- **Notification opt-out**: How to handle opt-outs?

**Validation**: `docs/agents/moat-mrr-strategist.md` (Section 4 - Frequency Boosters), `docs/agents/product-strategist.md` (Section 1a - Frequency Boosters)

#### 4. Collaboration Loops

**Required**: At least one collaboration or shared value mechanic

**Mechanics** (choose at least one):
- Shared templates
- Shared knowledge
- Cross-org insights
- Benchmarks
- Team invites
- Community badges
- Leaderboards
- Anonymized best-practice insights

**Validation**: `docs/agents/moat-mrr-strategist.md` (Section 2), `docs/agents/product-strategist.md` (Section 11)

#### 5. Renewal Triggers

**Required**: Renewal/re-engagement strategy

**Components**:
- **Renewal value**: What value drives renewal?
- **Renewal triggers**: What triggers renewal consideration?
- **Renewal features**: What features support renewal?
- **Renewal timeline**: When does renewal happen?
- **Renewal metrics**: How to measure renewal?

**Validation**: `docs/agents/moat-mrr-strategist.md` (Section 9 - Churn-Prevention Triggers), `docs/agents/product-strategist.md` (Section 13)

### System C Output

**Green-Light if**:
- ✅ Activation path designed
- ✅ Habit loops designed
- ✅ Notification strategy defined
- ✅ Collaboration loops defined (at least one)
- ✅ Renewal triggers defined
- ✅ Retention thesis complete (recurring job, frequency driver, habit loop)

**Proceed to System D (Portfolio Prioritization)**.

---

## System D: Portfolio Prioritization

**Goal**: Score each idea to prioritize resources and avoid "falling in love with every idea."

### Scoring Criteria (Score 1-5 for each)

#### 1. Signal Strength
- **5**: Very strong signals (multiple validation tests passed, high emotional attachment, clear demand)
- **4**: Strong signals (some validation tests passed, moderate emotional attachment, clear demand)
- **3**: Moderate signals (few validation tests passed, unclear emotional attachment, unclear demand)
- **2**: Weak signals (validation tests failed, low emotional attachment, unclear demand)
- **1**: No signals (no validation tests passed, no emotional attachment, no demand)

**Validation**: `.cursor/rules/200-playbook-insight-validation.mdc`

#### 2. TAM-for-Niche
- **5**: Very large TAM (niche is large and growing, clear expansion path)
- **4**: Large TAM (niche is large, stable expansion path)
- **3**: Moderate TAM (niche is moderate, limited expansion path)
- **2**: Small TAM (niche is small, unclear expansion path)
- **1**: Very small TAM (niche is very small, no expansion path)

**Validation**: `docs/agents/market-scanner.md` (Niche Compounding Score, Market Timing & Wave Analysis)

#### 3. Moat Potential
- **5**: Very high moat potential (clear moat strategy, strong defensibility, high switching costs)
- **4**: High moat potential (clear moat strategy, moderate defensibility, moderate switching costs)
- **3**: Moderate moat potential (some moat strategy, limited defensibility, limited switching costs)
- **2**: Low moat potential (unclear moat strategy, weak defensibility, low switching costs)
- **1**: Very low moat potential (no moat strategy, no defensibility, no switching costs)

**Validation**: `docs/agents/moat-mrr-strategist.md` (Moat Map), `docs/agents/market-scanner.md` (Moat Design)

#### 4. Implementation Cost
- **5**: Very low cost (minimal time, existing infrastructure, simple build)
- **4**: Low cost (moderate time, some infrastructure, straightforward build)
- **3**: Moderate cost (significant time, new infrastructure, complex build)
- **2**: High cost (high time, new infrastructure, very complex build)
- **1**: Very high cost (extreme time, new infrastructure, extremely complex build)

**Validation**: `.cursor/rules/207-playbook-portfolio-management.mdc` (Resource Requirements)

#### 5. Long-Term Retention Risk
- **5**: Very low risk (daily/weekly jobs, strong habit loops, high switching costs)
- **4**: Low risk (weekly/monthly jobs, moderate habit loops, moderate switching costs)
- **3**: Moderate risk (monthly/quarterly jobs, weak habit loops, limited switching costs)
- **2**: High risk (quarterly/rare jobs, no habit loops, low switching costs)
- **1**: Very high risk (rare jobs, no habit loops, no switching costs)

**Validation**: `docs/agents/moat-mrr-strategist.md` (JTBD Frequency Modeling, Retention Thesis), `docs/agents/product-strategist.md` (JTBD Frequency Modeling, Retention Thesis)

#### 6. Monetization Depth
- **5**: Very deep (clear expansion path to 10x revenue, multiple expansion levers, high LTV)
- **4**: Deep (clear expansion path to 5x revenue, some expansion levers, moderate LTV)
- **3**: Moderate (some expansion path to 3x revenue, limited expansion levers, moderate LTV)
- **2**: Shallow (unclear expansion path, few expansion levers, low LTV)
- **1**: Very shallow (no expansion path, no expansion levers, very low LTV)

**Validation**: `docs/agents/moat-mrr-strategist.md` (Expansion Revenue Strategy), `docs/agents/product-strategist.md` (Monetization Wedge, Expansion Revenue Strategy)

### Portfolio Score Calculation

**Total Score (out of 30)**:
- **Portfolio Priority (25-30)**: Top priority, allocate resources immediately
- **High Priority (20-24)**: High priority, allocate resources when available
- **Medium Priority (15-19)**: Medium priority, validate when capacity allows
- **Low Priority (10-14)**: Low priority, validate only if no better options
- **Kill (0-9)**: Kill immediately, don't waste resources

### Portfolio Prioritization Matrix

**Prioritize by**: Signal Strength × TAM-for-Niche × Moat Potential × (1 - Implementation Cost/5) × (1 - Long-Term Retention Risk/5) × Monetization Depth

**Simplified**: Focus on high signal strength, large TAM, high moat potential, low implementation cost, low retention risk, deep monetization.

### System D Rules

1. **How many simultaneous bets?**
   - Validation Tier: 3-5 products simultaneously
   - Engineering Tier: 1-2 products simultaneously
   - Growth Tier: 2-4 products
   - Maintenance Tier: Unlimited (as long as profitable)

2. **How to allocate validation time?**
   - Allocation Formula: Time = Portfolio Score / Sum of All Portfolio Scores × Total Validation Time
   - Minimum Time: Each product gets minimum 10% of validation time

3. **How to score opportunity cost?**
   - Opportunity Cost = Best Alternative EV - Current Product EV
   - Kill if: Opportunity Cost > Current Product EV × 2

4. **How many should graduate to engineering?**
   - Maximum 2 products graduate simultaneously
   - Graduation Criteria: Portfolio Score ≥ 20, Signal Strength ≥ 4, Moat Potential ≥ 4, Implementation Cost ≤ 3, Retention Risk ≤ 3, Monetization Depth ≥ 4

### System D Output

**Green-Light if**:
- ✅ Portfolio Score ≥ 20 (High Priority or Portfolio Priority)
- ✅ Signal Strength ≥ 4
- ✅ TAM-for-Niche ≥ 4
- ✅ Moat Potential ≥ 4
- ✅ Implementation Cost ≤ 3
- ✅ Long-Term Retention Risk ≤ 3
- ✅ Monetization Depth ≥ 4
- ✅ Engineering capacity available

**Proceed to Engineering** (`.cursor/rules/210-playbook-new-feature.mdc`).

---

## System Integration

### Complete Pipeline

```
Raw Idea
  ↓
System D: Portfolio Prioritization (Score idea)
  ↓ (if Portfolio Score ≥ 20)
System A: Compounding Niche Engine (Filter through all 7 filters)
  ↓ (if all filters pass)
System B: Moat Architect (Design moats before building)
  ↓ (if moat strategy complete)
System C: Retention Framework (Design retention before code)
  ↓ (if retention framework complete)
Engineering (Build with small diffs, MVP-first)
```

### Quality Gates

**No product enters engineering without**:
- ✅ Portfolio Score ≥ 20 (System D)
- ✅ All 7 filters passed (System A)
- ✅ Moat strategy complete (System B)
- ✅ Retention framework complete (System C)
- ✅ Engineering capacity available

### Kill Fast Rules

**Kill immediately if**:
- ❌ Portfolio Score < 10
- ❌ Heat Filter failed (no demand signals)
- ❌ Durability Filter failed (score < 10)
- ❌ Frequency Filter failed (rare job with no frequency boosters)
- ❌ Budget Authority failed (no budget)
- ❌ Expansion Revenue Potential failed (no expansion levers)
- ❌ Data-Moat Viability failed (no data moat possible)
- ❌ Niche Compounding Score < 10 (Declining Niche)
- ❌ Moat strategy impossible (no moats possible)
- ❌ Retention framework impossible (no retention possible)

---

## See Also

- `.cursor/rules/207-playbook-portfolio-management.mdc` - Portfolio management playbook
- `.cursor/rules/200-playbook-insight-validation.mdc` - Heat Filter validation
- `.cursor/rules/205-playbook-moat-mrr-validation.mdc` - Durability Filter validation
- `.cursor/rules/210-playbook-new-feature.mdc` - Feature development workflow
- `docs/agents/moat-mrr-strategist.md` - Moat & MRR strategy agent
- `docs/agents/product-strategist.md` - Product strategy agent
- `docs/agents/market-scanner.md` - Market analysis agent
- `docs/agents/insight-strategist.md` - Insight & narrative agent

---

## Bottom Line

**Isenberg's approach is a great desirability engine for niches.**

**To match our goals (defensive moat + enduring MRR), we explicitly encode durability, retention architecture, and moat design as first-class steps — not assumptions.**

**The Four Systems ensure**:
- ✅ We only build what has heat (System A: Heat Filter)
- ✅ We only build what has durability (System A: Durability Filter)
- ✅ We design moats before building (System B: Moat Architect)
- ✅ We design retention before coding (System C: Retention Framework)
- ✅ We prioritize by expected value (System D: Portfolio Prioritization)

**This turns every product into a compounding dataset → defensible advantage → enduring MRR.**

