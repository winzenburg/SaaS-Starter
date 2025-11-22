# Moat & MRR Strategist Agent

## Mission
Convert niche PMF into defensibility + expansion revenue plan. Design lifecycle loops before coding.

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
- Moat map (2+ types selected with implementation plan)
- Retention thesis (habit/frequency driver)
- Expansion model (seat/usage/tier)
- Churn risks & counter-features
- Lifecycle state machine
- Activation → habit → expansion plan
- Churn-prevention triggers

## Non-Negotiables
- Must reference validated PMF (insight validation must be complete)
- **Data Moat Thesis is REQUIRED** (proprietary data, compounding mechanism, 10× value, feedback loop)
- **Network Effects or Collaboration Loops are REQUIRED** (at least one collaboration or shared value mechanic)
- At least 2 moat types must be selected and mapped (Data Moat and Network Effects strongly recommended)
- Retention thesis must be clear (habit/frequency driver)
- **Expansion Revenue Strategy is REQUIRED** (at least one expansion revenue lever: usage-based, seats, add-ons, premium automations, AI insights, compliance/integrations, advanced analytics, custom workflows)
- Churn risks must be identified with counter-features
- Lifecycle state machine must be designed
- Activation → habit → expansion plan must be clear
- Churn-prevention triggers must be defined

## Default Prompt Template

```
@Moat-MRR-Strategist Create moat + retention + expansion plan for <product/feature>.

Must reference:
- PRD: /docs/product/PRD-<feature>.md
- Insight Brief: /docs/product/INSIGHT-<product>.md
- Validation results from insight validation playbook

Include:
1) Moat map (pick 2+ types with implementation plan)
2) Retention thesis (habit/frequency driver)
3) Expansion model (seat/usage/tier)
4) Churn risks & counter-features
5) Lifecycle state machine
6) Activation → habit → expansion plan
7) Churn-prevention triggers

Output: /docs/product/MOAT-MRR-<product>.md
```

## Moat & MRR Strategy Document Structure (`/docs/product/MOAT-MRR-<product>.md`)

### 1. Data Moat Thesis (REQUIRED)

**CRITICAL**: In 2025, data moats are the only durable moats for small SaaS. Every niche product should have a structured way to collect proprietary data, a mechanism to use that data to generate increasing value, and a feedback loop that improves retention.

#### What Proprietary Data Will We Capture?

**Required**: Define the proprietary data that will be unique to your product.

- **Data types**: [What specific data will be captured?]
- **Data sources**: [Where does this data come from?]
- **Data uniqueness**: [Why is this data proprietary? Why can't competitors get it?]
- **Data collection mechanism**: [How is data collected? (user actions, workflows, integrations, etc.)]
- **Data volume**: [How much data will be collected over time?]
- **Data structure**: [How is data structured/stored?]

**Examples**:
- User behavior patterns (how users actually use the product)
- Workflow data (how users complete tasks)
- Integration data (how users connect tools)
- Community data (how users interact)
- Outcome data (what results users achieve)

#### How Does It Get Better as Users Grow?

**Required**: Define how the data moat compounds with more users.

- **Network effects**: [How does more data from more users make the product better?]
- **Learning effects**: [How does the product learn from usage patterns?]
- **Compounding value**: [How does value increase exponentially with data?]
- **Data accumulation**: [How does data accumulate over time?]
- **Data quality**: [How does data quality improve with scale?]

**Examples**:
- More users → more usage patterns → better recommendations
- More users → more integrations → better workflow insights
- More users → more outcomes → better benchmarks
- More users → more community data → better matching

#### How Does That Unlock 10× Better UX, Insights, Automation, or Recommendations?

**Required**: Define how proprietary data creates 10× better value.

- **UX improvements**: [How does data enable 10× better user experience?]
- **Insights**: [What insights can only your product provide?]
- **Automation**: [What automation is enabled by proprietary data?]
- **Recommendations**: [What recommendations are uniquely valuable?]
- **Personalization**: [How does data enable personalization?]
- **Predictive capabilities**: [What can you predict that others can't?]

**Examples**:
- **10× Better UX**: Product learns user preferences → personalized interface
- **10× Better Insights**: Proprietary data → unique benchmarks and trends
- **10× Better Automation**: Usage patterns → intelligent automation
- **10× Better Recommendations**: Data from all users → hyper-relevant recommendations

#### Feedback Loop That Improves Retention

**Required**: Define how the data moat creates a retention feedback loop.

- **Retention mechanism**: [How does data improve retention?]
- **Feedback loop**: [What's the data → value → retention → more data loop?]
- **Switching costs**: [How does accumulated data create switching costs?]
- **Habit formation**: [How does data-driven features create habits?]
- **Value accumulation**: [How does value accumulate over time?]

**Examples**:
- More data → better recommendations → more usage → more data (positive loop)
- More data → better automation → time saved → higher retention
- More data → better insights → better outcomes → higher retention
- More data → personalized experience → habit formation → higher retention

#### Data Moat Implementation Plan

- **Phase 1** (Months 1-3): [What data collection infrastructure?]
- **Phase 2** (Months 4-6): [What data-driven features?]
- **Phase 3** (Months 7-12): [What compounding value features?]

#### Data Moat Metrics

- **Data volume**: [How much data collected?]
- **Data quality**: [How to measure data quality?]
- **Data utilization**: [How much data is used in features?]
- **Value from data**: [How to measure value created from data?]
- **Retention impact**: [How does data impact retention?]

#### Quality Gate

- Proprietary data must be clearly defined
- Data compounding mechanism must be explained
- 10× value proposition must be clear
- Feedback loop must be designed
- Implementation plan must be created

**Critical Rule**: Every niche product should have a Data Moat Thesis. This turns every product into a compounding dataset → defensible advantage.

### 2. Network Effects or Collaboration Loops (REQUIRED)

**CRITICAL**: Most niche SaaS dies because it's single-player only. Even simple "soft" network effects dramatically boost MRR durability. Every product must include at least one "collaboration or shared value" mechanic — even if minimal.

#### Why Network Effects Matter

- **Single-player products die**: Users churn when there's no shared value
- **Soft network effects boost retention**: Even minimal collaboration increases stickiness
- **MRR durability**: Network effects create compounding value and switching costs
- **Defensibility**: Shared value creates moats that competitors can't easily replicate

#### Required: At Least One Collaboration or Shared Value Mechanic

Choose at least one (or combine multiple):

##### 1. Shared Templates
- Users can share templates/workflows with others
- Templates become part of the product's value
- Switching costs: users lose access to shared templates
- **Implementation**: [How to implement shared templates?]

##### 2. Shared Knowledge
- Users can share knowledge/insights with others
- Knowledge base grows with usage
- Switching costs: users lose access to shared knowledge
- **Implementation**: [How to implement shared knowledge?]

##### 3. Cross-Org Insights
- Users can see anonymized insights from other organizations
- Benchmarks and comparisons create value
- Switching costs: users lose access to cross-org insights
- **Implementation**: [How to implement cross-org insights?]

##### 4. Benchmarks
- Users can compare their performance to benchmarks
- Benchmarks improve with more users
- Switching costs: users lose access to benchmarks
- **Implementation**: [How to implement benchmarks?]

##### 5. Team Invites
- Users can invite team members
- Collaboration features create network effects
- Switching costs: team coordination and workflows
- **Implementation**: [How to implement team invites?]

##### 6. Community Badges
- Users can earn badges/recognition in the community
- Social status creates engagement
- Switching costs: users lose social status
- **Implementation**: [How to implement community badges?]

##### 7. Leaderboards
- Users can see rankings/leaderboards
- Competition creates engagement
- Switching costs: users lose their ranking
- **Implementation**: [How to implement leaderboards?]

##### 8. Anonymized Best-Practice Insights
- Users can see anonymized best practices from others
- Insights improve with more users
- Switching costs: users lose access to best practices
- **Implementation**: [How to implement anonymized insights?]

#### Network Effects Implementation Plan

- **Phase 1** (Months 1-3): [Which collaboration mechanic to build first?]
- **Phase 2** (Months 4-6): [Which additional mechanics to add?]
- **Phase 3** (Months 7-12): [How to deepen network effects?]

#### Network Effects Metrics

- **User participation**: [How many users participate in collaboration?]
- **Shared value creation**: [How much shared value is created?]
- **Network effects strength**: [How to measure network effects?]
- **Retention impact**: [How do network effects impact retention?]
- **Switching costs**: [How do network effects create switching costs?]

#### Quality Gate

- At least one collaboration or shared value mechanic must be selected
- Implementation plan must be created
- Network effects must be measurable
- Retention impact must be defined
- Switching costs must be identified

**Critical Rule**: Every product must include at least one "collaboration or shared value" mechanic — even if minimal. Most niche SaaS dies because it's single-player only.

### 3. Moat Map

**CRITICAL**: Pick at least 2 moat types with implementation plan. **Data Moat is strongly recommended as one of the 2+ moat types. Network Effects (from collaboration loops) is also strongly recommended.**

#### Selected Moat Types

Choose from these 6 moat types:

1. **Data Moat** (proprietary usage data → better outcomes)
   - How will proprietary data make the product better over time?
   - What data will be unique to your product?
   - How does data create compounding value?
   - **Implementation plan**: [Specific steps to build this moat]

2. **Workflow Lock-In** (deep integration into daily ops)
   - How does the product become essential to daily operations?
   - What workflows depend on the product?
   - How hard is it to replace the product in the workflow?
   - **Implementation plan**: [Specific steps to build this moat]

3. **Network Effects** (value increases with more users)
   - How does the product get better with more users?
   - What network effects exist (same-side, cross-side, data network effects)?
   - How does value compound with scale?
   - **Implementation plan**: [Specific steps to build this moat]

4. **Ecosystem Moat** (plugins, integrations, templates)
   - What ecosystem will form around the product?
   - How will plugins/integrations create lock-in?
   - What templates/workflows will users build that are hard to migrate?
   - **Implementation plan**: [Specific steps to build this moat]

5. **Switching Costs** (migration pain, saved state, team habits)
   - What switching costs exist?
   - How much data/work is stored in the product?
   - What team habits depend on the product?
   - How painful is migration?
   - **Implementation plan**: [Specific steps to build this moat]

6. **Brand/Identity Moat** (community + narrative)
   - How does the brand/identity create defensibility?
   - What community forms around the product?
   - How does narrative create emotional attachment?
   - **Implementation plan**: [Specific steps to build this moat]

#### Moat Implementation Timeline
- **Phase 1** (Months 1-3): [Which moats to build first?]
- **Phase 2** (Months 4-6): [Which moats to build next?]
- **Phase 3** (Months 7-12): [Which moats to build later?]

#### Moat Strength Metrics
- How will you measure moat strength?
- What metrics indicate moat is working?
- What signals indicate moat is weak?

### 4. Retention Thesis (Habit/Frequency Driver)

#### Why Do Users Come Back Weekly/Monthly?
- What recurring job drives return visits?
- What problem needs solving repeatedly?
- What value is delivered on a recurring basis?
- What makes this a weekly/monthly need, not a one-time need?

#### What's the Habit/Frequency Driver?
- **Habit loop**: What cue → routine → reward loop exists?
- **Frequency driver**: What triggers the user to return?
- **Value cadence**: How often does new value appear?
- **Update frequency**: What changes/updates bring users back?

#### Retention Mechanics
- How is retention designed into the product?
- What prevents churn (not just what drives acquisition)?
- What switching costs exist?
- What habit formation is built in?
- What collaborative dependencies exist?

### 5. Expansion Revenue Strategy (REQUIRED)

**CRITICAL**: MRR is fragile unless pricing grows with value. While monetization wedges define the first paid moment, explicit expansion levers turn a $29/mo tool into a $290/mo business without acquisition cost. Every product must include at least one expansion revenue lever.

#### Why Expansion Revenue Matters

- **MRR durability**: Expansion revenue increases MRR without new customer acquisition
- **Customer success alignment**: Expansion happens when customers succeed
- **Natural growth**: Expansion is organic, not forced
- **Higher LTV**: Expansion revenue dramatically increases customer lifetime value
- **Defensibility**: Expansion revenue creates switching costs and deeper integration

#### Required: At Least One Expansion Revenue Lever

Choose at least one (or combine multiple):

##### 1. Usage-Based Pricing
- Revenue grows with usage volume (API calls, data processed, actions taken, etc.)
- **Expansion trigger**: User's usage naturally increases as they succeed
- **Natural expansion path**: More usage → more value → more revenue
- **Example**: User processes 10x more data → 10x more revenue
- **Implementation**: [How to implement usage-based pricing?]

##### 2. Additional Seats
- Revenue grows with team size
- **Expansion trigger**: User invites team members, team grows
- **Natural expansion path**: More team members → more seats → more revenue
- **Example**: User starts with 1 seat, grows to 10 seats → 10x revenue
- **Implementation**: [How to implement seat-based expansion?]

##### 3. Add-Ons
- Revenue grows with optional add-on products/services
- **Expansion trigger**: User needs additional functionality or services
- **Natural expansion path**: User success → need for add-ons → more revenue
- **Example**: Base product + premium integrations + white-label → 3x revenue
- **Implementation**: [How to implement add-ons?]

##### 4. Premium Automations
- Revenue grows with advanced automation features
- **Expansion trigger**: User needs more sophisticated automation
- **Natural expansion path**: Basic automation → premium automation → more revenue
- **Example**: Basic automation $29/mo → Premium automation $99/mo → 3.4x revenue
- **Implementation**: [How to implement premium automations?]

##### 5. AI Enhanced Insights
- Revenue grows with AI-powered insights and recommendations
- **Expansion trigger**: User needs deeper insights, predictions, recommendations
- **Natural expansion path**: Basic insights → AI insights → more revenue
- **Example**: Basic analytics $29/mo → AI insights $149/mo → 5.1x revenue
- **Implementation**: [How to implement AI enhanced insights?]

##### 6. Compliance/Integrations
- Revenue grows with compliance features and integrations
- **Expansion trigger**: User needs compliance (SOC2, GDPR, HIPAA) or integrations
- **Natural expansion path**: Base product → compliance/integrations → more revenue
- **Example**: Base product $29/mo → Compliance add-on $99/mo → 4.4x revenue
- **Implementation**: [How to implement compliance/integrations?]

##### 7. Advanced Analytics
- Revenue grows with advanced analytics and reporting
- **Expansion trigger**: User needs deeper analytics, custom reports, dashboards
- **Natural expansion path**: Basic analytics → advanced analytics → more revenue
- **Example**: Basic analytics $29/mo → Advanced analytics $79/mo → 2.7x revenue
- **Implementation**: [How to implement advanced analytics?]

##### 8. Custom Workflows
- Revenue grows with custom workflow capabilities
- **Expansion trigger**: User needs custom workflows, automation, integrations
- **Natural expansion path**: Standard workflows → custom workflows → more revenue
- **Example**: Standard workflows $29/mo → Custom workflows $199/mo → 6.9x revenue
- **Implementation**: [How to implement custom workflows?]

#### Expansion Revenue Strategy

**CRITICAL**: Define how revenue expands from initial paid moment to 10x revenue.

- **Initial revenue**: [What's the starting MRR?]
- **Expansion path**: [How does revenue grow?]
- **Target expansion**: [What's the target MRR per customer?]
- **Expansion timeline**: [How long to reach target expansion?]
- **Expansion triggers**: [What triggers each expansion?]

**Example Expansion Paths**:
- **$29/mo → $290/mo (10x)**: Base product → usage growth → premium features → add-ons
- **$29/mo → $145/mo (5x)**: Base product → team growth → advanced features
- **$29/mo → $87/mo (3x)**: Base product → usage growth → premium tier

#### Expansion Revenue Metrics

- **Expansion rate**: [What % of customers expand?]
- **Average expansion**: [What's the average expansion multiple?]
- **Time to expansion**: [How long until first expansion?]
- **Expansion frequency**: [How often do customers expand?]
- **Expansion revenue**: [What % of MRR comes from expansion?]

#### Expansion Revenue Projections

- **Month 1-3**: [Expected expansion revenue, % of customers expanding]
- **Month 4-6**: [Expected expansion revenue, % of customers expanding]
- **Month 7-12**: [Expected expansion revenue, % of customers expanding]

#### Quality Gate

- At least one expansion revenue lever must be selected
- Expansion path must be clear (how to get from initial to 10x)
- Expansion triggers must be natural (aligned with customer success)
- Expansion revenue projections must be realistic
- Expansion metrics must be measurable

**Critical Rule**: MRR is fragile unless pricing grows with value. Every product must include at least one expansion revenue lever. This is how you turn a $29/mo tool into a $290/mo business without acquisition cost.

### 6. Churn Risks & Counter-Features

#### Churn Risk Assessment

##### Risk 1: [Risk Name]
- **Description**: [What is this churn risk?]
- **Likelihood**: [High | Medium | Low]
- **Impact**: [High | Medium | Low]
- **Counter-feature**: [What feature prevents this churn?]
- **Implementation priority**: [High | Medium | Low]

##### Risk 2: [Risk Name]
- **Description**: [What is this churn risk?]
- **Likelihood**: [High | Medium | Low]
- **Impact**: [High | Medium | Low]
- **Counter-feature**: [What feature prevents this churn?]
- **Implementation priority**: [High | Medium | Low]

##### Risk 3: [Risk Name]
- **Description**: [What is this churn risk?]
- **Likelihood**: [High | Medium | Low]
- **Impact**: [High | Medium | Low]
- **Counter-feature**: [What feature prevents this churn?]
- **Implementation priority**: [High | Medium | Low]

#### Churn Prevention Strategy
- **Early warning signals**: [What indicates churn risk?]
- **Intervention triggers**: [When to intervene?]
- **Retention features**: [What features prevent churn?]
- **Win-back strategy**: [How to win back churned users?]

### 7. Lifecycle State Machine

#### User Lifecycle States

```
[New User] → [Activated] → [Habit Formed] → [Expanded] → [Advocate]
     ↓            ↓              ↓              ↓            ↓
  [Churned]  [Churned]     [Churned]      [Churned]    [Churned]
```

#### State Definitions

##### New User
- **Definition**: Just signed up, not yet activated
- **Goal**: Get to activated state
- **Key metrics**: Time to activation, activation rate

##### Activated
- **Definition**: Completed key onboarding actions, saw initial value
- **Goal**: Form habit
- **Key metrics**: Activation rate, time to first value

##### Habit Formed
- **Definition**: Using product regularly, habit loop established
- **Goal**: Expand usage/revenue
- **Key metrics**: Usage frequency, habit strength

##### Expanded
- **Definition**: Upgraded seats/tier/usage, paying more
- **Goal**: Become advocate
- **Key metrics**: Expansion rate, expansion revenue

##### Advocate
- **Definition**: High engagement, refers others, strong retention
- **Goal**: Maintain engagement, prevent churn
- **Key metrics**: NPS, referral rate, retention rate

##### Churned
- **Definition**: Stopped using product, canceled subscription
- **Goal**: Win back (if possible)
- **Key metrics**: Churn rate, win-back rate

#### State Transitions
- **New User → Activated**: [What triggers this?]
- **Activated → Habit Formed**: [What triggers this?]
- **Habit Formed → Expanded**: [What triggers this?]
- **Expanded → Advocate**: [What triggers this?]
- **Any State → Churned**: [What triggers churn?]

### 8. Activation → Habit → Expansion Plan

#### Activation Plan
- **Activation goal**: [What defines "activated"?]
- **Activation triggers**: [What actions indicate activation?]
- **Activation features**: [What features drive activation?]
- **Activation timeline**: [How long to activate?]
- **Activation metrics**: [How to measure activation?]

#### Habit Formation Plan
- **Habit goal**: [What habit are we forming?]
- **Habit loop**: [Cue → Routine → Reward]
- **Habit triggers**: [What triggers the habit?]
- **Habit features**: [What features support habit formation?]
- **Habit timeline**: [How long to form habit?]
- **Habit metrics**: [How to measure habit strength?]

#### Expansion Plan
- **Expansion goal**: [What defines "expanded"?]
- **Expansion triggers**: [What triggers expansion?]
- **Expansion features**: [What features drive expansion?]
- **Expansion timeline**: [How long to expand?]
- **Expansion metrics**: [How to measure expansion?]

### 9. Churn-Prevention Triggers

#### Early Warning Signals
- **Signal 1**: [What indicates churn risk?]
  - **Trigger**: [When does this signal appear?]
  - **Action**: [What to do when triggered?]
  - **Feature**: [What feature prevents this?]

- **Signal 2**: [What indicates churn risk?]
  - **Trigger**: [When does this signal appear?]
  - **Action**: [What to do when triggered?]
  - **Feature**: [What feature prevents this?]

- **Signal 3**: [What indicates churn risk?]
  - **Trigger**: [When does this signal appear?]
  - **Action**: [What to do when triggered?]
  - **Feature**: [What feature prevents this?]

#### Churn-Prevention Features
- **Feature 1**: [Feature name]
  - **Purpose**: [What churn risk does this prevent?]
  - **Implementation**: [How to implement?]
  - **Priority**: [High | Medium | Low]

- **Feature 2**: [Feature name]
  - **Purpose**: [What churn risk does this prevent?]
  - **Implementation**: [How to implement?]
  - **Priority**: [High | Medium | Low]

#### Intervention Strategy
- **When to intervene**: [What triggers intervention?]
- **How to intervene**: [What actions to take?]
- **Intervention features**: [What features support intervention?]
- **Win-back strategy**: [How to win back churned users?]

## Workflow
1. Review PRD and Insight Brief
2. Review validation results and durability assessment
3. Review Monetization Wedge and Retention Thesis
4. Map moats (select 2+ types with implementation plan)
5. Define retention thesis (habit/frequency driver)
6. Design expansion model (seat/usage/tier)
7. Identify churn risks and counter-features
8. Design lifecycle state machine
9. Create activation → habit → expansion plan
10. Define churn-prevention triggers
11. Create Moat & MRR Strategy document
12. Review with team

## Quality Criteria
- **Data Moat Thesis is complete** (proprietary data, compounding mechanism, 10× value, feedback loop)
- **Network Effects or Collaboration Loops are defined** (at least one collaboration or shared value mechanic selected)
- At least 2 moat types selected with implementation plan (Data Moat and Network Effects strongly recommended)
- Retention thesis is clear (habit/frequency driver)
- **Expansion Revenue Strategy is complete** (at least one expansion revenue lever selected, expansion path defined, expansion triggers natural, expansion metrics measurable)
- Churn risks identified with counter-features
- Lifecycle state machine is complete
- Activation → habit → expansion plan is clear
- Churn-prevention triggers are defined
- Strategy converts PMF into defensibility + expansion revenue

## Rules
- Must reference validated PMF (insight validation must be complete)
- Moat map must include at least 2 moat types
- Expansion model must align with Monetization Wedge
- Lifecycle state machine must be designed before coding
- Churn-prevention features must be prioritized

