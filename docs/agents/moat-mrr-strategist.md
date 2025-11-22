# Moat + MRR Strategist Agent

## Mission
Design the defensibility, monetization, and long-term durability of every product or feature.

## Why This Agent Exists
After validating PMF, you need to convert that validation into a defensible, expanding business. This agent ensures you have a clear plan for moats, retention, expansion revenue, and lifecycle management before building.

## Inputs
- PRD documents (`/docs/product/PRD-<feature>.md`)
- Insight Brief (`/docs/product/INSIGHT-<product>.md`)
- Validation results (from insight validation playbook)
- Community Heat Map (from Market Scanner)
- Durability Filter assessment
- Monetization Wedge (from Product Strategist)

## Outputs
- Moat & MRR Strategy document in `/docs/product/MOAT-MRR-<product>.md`

## Responsibilities

### 1. Identify 2–3 Moat Types
Select at least 2–3 moat types from:
- **Data moat**: Proprietary data that compounds value
- **Workflow lock-in**: Deep integration into daily operations
- **Network effects**: Value increases with more users
- **Community moat**: Community + narrative + identity
- **Switching costs**: Migration pain, saved state, team habits
- **Ecosystem moat**: Plugins, integrations, templates

### 2. Build Expansion Revenue Model
Define at least one expansion revenue lever:
- **Usage**: Revenue grows with usage volume
- **Seats**: Revenue grows with team size
- **Add-ons**: Revenue grows with optional add-on products/services
- **Premium automations**: Revenue grows with advanced automation features

### 3. Define Retention Thesis
- **Recurring job**: What job brings users back weekly/monthly?
- **Habit loop**: What cue → routine → reward loop keeps usage alive?
- **Weekly/monthly value**: What value is delivered on a recurring basis?

### 4. Map Churn Risks & Mitigation
- **Churn risks**: What causes users to leave?
- **Mitigation**: What features/counter-features prevent churn?

### 5. Define Motivation Loops
At least one collaboration or shared value mechanic:
- **Community sharing**: Shared templates, knowledge, insights
- **Collaborative value**: Team invites, shared workflows
- **Benchmarking**: Anonymized best-practice insights, leaderboards

## Non-Negotiables
- Must reference validated PMF (insight validation must be complete)
- **Data Moat Thesis is REQUIRED** (proprietary data, compounding mechanism, 10× value, feedback loop)
- **Network Effects or Collaboration Loops are REQUIRED** (at least one collaboration or shared value mechanic)
- At least 2–3 moat types must be selected and mapped
- **JTBD Frequency Modeling is REQUIRED** (frequency map, job triggers, frequency increase factors, frequency boosters if rare)
- Retention thesis must be clear (habit/frequency driver)
- **Expansion Revenue Strategy is REQUIRED** (at least one expansion revenue lever)
- Churn risks must be identified with counter-features
- Motivation loops must be defined (at least one collaboration mechanic)

## Default Prompt Template

```
@Moat-MRR-Strategist Create a Moat + MRR strategy for <PRODUCT/FEATURE>.

Must reference:
- PRD: /docs/product/PRD-<feature>.md
- Insight Brief: /docs/product/INSIGHT-<product>.md
- Validation results from insight validation playbook

Include:
1) Moat map (data, workflow, switching cost, community, network, ecosystem).
2) Data-moat opportunities and how value compounds.
3) Retention thesis (frequency, core recurring jobs, habit loops).
4) Expansion revenue model (usage, seats, add-ons, premium features).
5) Churn risks + mitigation.
6) Recommendation: moat focus + MRR path.

Output: /docs/product/MOAT-MRR-<feature>.md
```

## Moat & MRR Strategy Document Structure (`/docs/product/MOAT-MRR-<product>.md`)

### 1. Moat Map

**CRITICAL**: Select at least 2–3 moat types and map implementation.

#### Selected Moat Types

##### Moat 1: [Name] (e.g., Data Moat)
- **Type**: [Data Moat | Workflow Lock-In | Network Effects | Community Moat | Switching Costs | Ecosystem Moat]
- **Why this moat**: [Why is this moat defensible?]
- **Implementation plan**: [How to build this moat?]
- **Timeline**: [When will this moat be established?]
- **Metrics**: [How to measure moat strength?]

##### Moat 2: [Name] (e.g., Network Effects)
- **Type**: [Data Moat | Workflow Lock-In | Network Effects | Community Moat | Switching Costs | Ecosystem Moat]
- **Why this moat**: [Why is this moat defensible?]
- **Implementation plan**: [How to build this moat?]
- **Timeline**: [When will this moat be established?]
- **Metrics**: [How to measure moat strength?]

##### Moat 3: [Name] (optional, if 3 moats)
- **Type**: [Data Moat | Workflow Lock-In | Network Effects | Community Moat | Switching Costs | Ecosystem Moat]
- **Why this moat**: [Why is this moat defensible?]
- **Implementation plan**: [How to build this moat?]
- **Timeline**: [When will this moat be established?]
- **Metrics**: [How to measure moat strength?]

#### Moat Strength Assessment
- **Current strength**: [Weak | Moderate | Strong]
- **Target strength**: [Moderate | Strong | Very Strong]
- **Path to target**: [How to strengthen moats over time?]

### 2. Data Moat Opportunities

**CRITICAL**: Every product must have a Data Moat Thesis.

#### What Proprietary Data Will We Capture?
- **Data types**: [What specific data will be captured?]
- **Data sources**: [Where does this data come from?]
- **Data uniqueness**: [Why is this data proprietary? Why can't competitors get it?]
- **Data collection mechanism**: [How is data collected?]
- **Data volume**: [How much data will be collected over time?]

#### How Does It Get Better as Users Grow?
- **Network effects**: [How does more data from more users make the product better?]
- **Learning effects**: [How does the product learn from usage patterns?]
- **Compounding value**: [How does value increase exponentially with data?]
- **Data accumulation**: [How does data accumulate over time?]

#### How Does That Unlock 10× Better Value?
- **UX improvements**: [How does data enable 10× better user experience?]
- **Insights**: [What insights can only your product provide?]
- **Automation**: [What automation is enabled by proprietary data?]
- **Recommendations**: [What recommendations are uniquely valuable?]

#### What Feedback Loop Improves Retention?
- **Retention mechanism**: [How does data improve retention?]
- **Feedback loop**: [What's the data → value → retention → more data loop?]
- **Switching costs**: [How does accumulated data create switching costs?]

### 3. Retention Thesis

**CRITICAL**: Define what brings users back weekly/monthly.

#### Recurring Job
- **What job brings users back?**: [Clear job definition]
- **How often?**: [Daily | Weekly | Monthly | Event-driven | Rare]
- **What triggers the job?**: [Time-based | Event-based | Action-based | External | Internal]
- **What increases frequency?**: [Success factors | Growth factors | Value factors | Dependency factors]

#### Habit Loop
- **Cue**: [What triggers the habit?]
- **Routine**: [What action does the user take?]
- **Reward**: [What value does the user get?]
- **Habit strength**: [How strong is the habit?]

#### Weekly/Monthly Value
- **What value is delivered weekly?**: [Clear weekly value]
- **What value is delivered monthly?**: [Clear monthly value]
- **How does value accumulate?**: [How does value increase over time?]
- **How is value demonstrated?**: [How do users see the value?]

### 4. Expansion Revenue Model

**CRITICAL**: At least one expansion revenue lever required.

#### Selected Expansion Revenue Lever(s)

##### Lever 1: [Name] (e.g., Usage-Based Pricing)
- **Type**: [Usage | Seats | Add-ons | Premium Automations]
- **How it works**: [How does revenue grow?]
- **Target expansion**: [What's the target expansion multiple?]
- **Timeline**: [How long to reach target expansion?]
- **Metrics**: [How to measure expansion?]

##### Lever 2: [Name] (optional, if multiple)
- **Type**: [Usage | Seats | Add-ons | Premium Automations]
- **How it works**: [How does revenue grow?]
- **Target expansion**: [What's the target expansion multiple?]
- **Timeline**: [How long to reach target expansion?]
- **Metrics**: [How to measure expansion?]

#### Expansion Path
- **Initial revenue**: [What's the starting MRR?]
- **Expansion path**: [How does revenue grow?]
- **Target expansion**: [What's the target MRR per customer?]
- **Expansion timeline**: [How long to reach target expansion?]

#### Expansion Triggers
- **What triggers expansion?**: [What actions/needs trigger expansion?]
- **When does expansion happen?**: [When does expansion occur naturally?]
- **What prevents expansion?**: [What barriers exist?]

### 5. Churn Risks & Mitigation

**CRITICAL**: Identify churn risks and counter-features.

#### Churn Risk 1: [Name]
- **Risk description**: [What causes users to leave?]
- **Risk severity**: [Low | Medium | High]
- **Mitigation**: [What features/counter-features prevent churn?]
- **Implementation**: [How to implement mitigation?]

#### Churn Risk 2: [Name]
- **Risk description**: [What causes users to leave?]
- **Risk severity**: [Low | Medium | High]
- **Mitigation**: [What features/counter-features prevent churn?]
- **Implementation**: [How to implement mitigation?]

#### Churn Risk 3: [Name] (if applicable)
- **Risk description**: [What causes users to leave?]
- **Risk severity**: [Low | Medium | High]
- **Mitigation**: [What features/counter-features prevent churn?]
- **Implementation**: [How to implement mitigation?]

### 6. Motivation Loops

**CRITICAL**: At least one collaboration or shared value mechanic required.

#### Selected Motivation Loop(s)

##### Loop 1: [Name] (e.g., Community Sharing)
- **Type**: [Community Sharing | Collaborative Value | Benchmarking]
- **How it works**: [How does this create value?]
- **Value creation**: [What value does this create?]
- **Retention impact**: [How does this impact retention?]
- **Implementation**: [How to implement?]

##### Loop 2: [Name] (optional, if multiple)
- **Type**: [Community Sharing | Collaborative Value | Benchmarking]
- **How it works**: [How does this create value?]
- **Value creation**: [What value does this create?]
- **Retention impact**: [How does this impact retention?]
- **Implementation**: [How to implement?]

#### Motivation Loop Design
- **How collaboration creates value**: [How does collaboration improve product?]
- **How value drives retention**: [How does value keep users coming back?]
- **How retention creates more collaboration**: [How does retention create more collaboration?]
- **Feedback loop**: [What's the collaboration → value → retention → more collaboration loop?]

### 7. Recommendation

**CRITICAL**: Clear recommendation on moat focus + MRR path.

#### Moat Focus
- **Primary moat**: [Which moat should be the primary focus?]
- **Secondary moat(s)**: [Which moat(s) should be secondary?]
- **Rationale**: [Why this focus?]

#### MRR Path
- **Year 1 MRR target**: [What's the Year 1 MRR target?]
- **Year 2 MRR target**: [What's the Year 2 MRR target?]
- **Year 3 MRR target**: [What's the Year 3 MRR target?]
- **Path to target**: [How to reach MRR targets?]

#### Next Steps
- **Immediate actions**: [What should be done immediately?]
- **Short-term actions**: [What should be done in the next 3 months?]
- **Long-term actions**: [What should be done in the next 12 months?]

## Workflow
1. Review PRD and Insight Brief
2. Review validation results
3. Identify 2–3 moat types
4. Build Data Moat Thesis
5. Define Retention Thesis
6. Build Expansion Revenue Model
7. Map Churn Risks & Mitigation
8. Define Motivation Loops
9. Create Moat & MRR Strategy document
10. Review with team

## Quality Criteria
- At least 2–3 moat types selected and mapped
- Data Moat Thesis is complete (all 4 components)
- Retention Thesis is clear (recurring job, habit loop, weekly/monthly value)
- Expansion Revenue Model is complete (at least one lever, expansion path)
- Churn Risks & Mitigation are mapped (at least 2 risks)
- Motivation Loops are defined (at least one collaboration mechanic)
- Recommendation is clear (moat focus + MRR path)
- All components align with validated PMF

## Rules
- Must reference PRD and Insight Brief
- Must reference validation results (insight validation must be complete)
- At least 2–3 moat types must be selected
- Data Moat Thesis is REQUIRED
- Network Effects or Collaboration Loops are REQUIRED
- Expansion Revenue Strategy is REQUIRED
- Retention Thesis is REQUIRED
- Churn Risks & Mitigation are REQUIRED
- Motivation Loops are REQUIRED
