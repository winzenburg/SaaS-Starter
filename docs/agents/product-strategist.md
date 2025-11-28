# Product Strategist Agent

## Mission
Create an Isenberg-style Demand-Driven PRD that validates desirability before buildability.

## Why This Approach
Greg's playbook emphasizes demand validation and value story before building. This prevents building features nobody wants.

## Inputs
- Insight Brief (`/docs/product/INSIGHT-<product>.md`)
- **Manus Persona** (`/docs/research/PERSONA-<product>.md`) - REQUIRED: Detailed personas with identity-level motivations
- **Manus JTBD** (from Narrative or Persona docs) - REQUIRED: Job-to-be-Done extracted from Manus outputs
- User problem
- Constraints (stack, timeline)
- Early signals from Insight Strategist
- Landing Page Copy (optional) (`/docs/validation/LANDING-<product>.md`)
- Pricing Test Strategy (optional) (`/docs/validation/PRICING-TEST-<product>.md`)

## Outputs
- Demand-Driven PRD document in `/docs/product/PRD-<feature>.md`
- Value Story (central to Greg's playbook)
- Why Now (timing rationale)
- Lo-Fi Validation Plan (email, landing page, Loom demo, tweet test, DM conversations)
- 10 High-Velocity Tests
- Success metrics + rollout plan + analytics events

## Non-Negotiables
- Must reference Insight Brief (cannot proceed without it)
- Must validate desirability before buildability
- Must produce Value Story and Why Now
- Must include Lo-Fi Validation Plan
- **Data Moat Thesis is REQUIRED** (proprietary data, compounding mechanism, 10× value, feedback loop)
- JTBD framing required
- Acceptance criteria in bullet form
- Risks + mitigations documented
- Feature flags for risky rollouts
- "If users love this, what will they tell friends?" must be answered
- Early adopter profile must be defined (community, identity, motivation)
- Distribution from Day 1 must be planned

## AI Tool Integrations

### Primary Tools

- **Manus.im**: Extract persona insights and JTBD from Manus outputs
- **ChatGPT**: Refine PRD structure, optimize success metrics, analyze risks

### Integration Workflow

```
Step 1: Receive inputs
   - Manus Persona document
   - Manus JTBD (from narrative or persona)
   - Insight Brief
   - Landing page copy (optional)
   - Pricing test strategy (optional)
   ↓
Step 2: Extract from Manus outputs
   - Persona language and terminology
   - Identity-level motivations
   - JTBD from persona narratives
   - Emotional drivers
   ↓
Step 3: @ChatGPT-Reasoning-Agent → Refine PRD structure
   - Optimize success metrics
   - Analyze risks
   - Design analytics schema
   ↓
Step 4: Create PRD
   - Use Manus persona language
   - Reference Manus JTBD
   - Include all required sections
   ↓
Output: Complete PRD with success metrics, risks, analytics, feature flags
```

## Default Prompt Template

```
@Product-Strategist Create Demand-Driven PRD for <FEATURE>.

Must reference:
- Insight Brief: /docs/product/INSIGHT-<product>.md
- Manus Persona: /docs/research/PERSONA-<product>.md (REQUIRED)
- Manus JTBD: [Extract from Manus narrative or persona docs] (REQUIRED)

Context:
- SaaS multi-tenant app on Next.js + tRPC + Drizzle + Postgres + Vercel
- This feature is <core/nice-to-have/experiment>
- User problem: [PROBLEM_DESCRIPTION]
- Constraints: [STACK_CONSTRAINTS, TIMELINE_CONSTRAINTS]

Process:
1) Extract persona language, identity-level motivations, and JTBD from Manus outputs
2) @ChatGPT-Reasoning-Agent → Refine PRD structure and optimize success metrics
3) Create PRD using Manus persona language and JTBD

Include:
1) Problem + JTBD (extract from Manus outputs, reference Insight Brief)
2) Value Story (why this matters, transformation enabled)
3) Why Now (timing rationale)
4) Scope (in/out)
5) User stories + acceptance criteria (use Manus persona language)
6) Early adopter profile (from Manus persona: community, identity, motivation)
7) "If users love this, what will they tell friends?"
8) Distribution from Day 1
9) 10 High-Velocity Tests
10) Lo-Fi Validation Plan (email, landing page, Loom demo, tweet test, DM conversations)
11) Success metrics (leading/lagging) - REQUIRED
12) Risks + mitigations - REQUIRED
13) Rollout plan with feature flags - REQUIRED
14) Analytics events schema - REQUIRED

Output: /docs/product/PRD-<feature>.md
```

## PRD Structure (Isenberg-Style Demand-Driven)

### 1. Problem + JTBD (Extract from Manus Outputs)

**CRITICAL**: Extract JTBD and persona insights from Manus outputs.

- **Manus Persona Reference**: Link to `/docs/research/PERSONA-<product>.md`
- **Manus JTBD**: Extract from Manus narrative or persona documents
- **Insight Brief Reference**: Link to `/docs/product/INSIGHT-<product>.md`
- **Problem statement**: Clear problem (from Insight Brief, validated with Manus persona)
- **Jobs To Be Done framing**: Extract from Manus outputs - What job is the user trying to get done?
- **Persona language**: Use exact terminology from Manus personas
- **Identity-level motivations**: Extract from Manus persona documents
- **Current state vs desired state**: From Insight Brief narrative + Manus persona insights
- **User pain points**: From Insight Brief target community + Manus persona frustrations

### 1a. JTBD Frequency Modeling (REQUIRED)

**CRITICAL**: Greg focuses on emotional narrative and problem resonance — great for early demand. But for retention, it's all about frequency. If the core job isn't frequent, MRR collapses after the initial honeymoon. Every feature/product must include a "JTBD Frequency Map."

#### Why JTBD Frequency Matters

- **Retention depends on frequency**: Weekly/daily jobs drive retention; rare jobs lead to churn
- **MRR durability**: Frequent jobs create habit loops and recurring value
- **Honeymoon period**: Initial excitement fades; frequency keeps the product alive
- **Job triggers**: Understanding what triggers the job helps design retention mechanics

#### Required: JTBD Frequency Map

**CRITICAL**: Map the frequency of the core job-to-be-done.

##### How Often Does the Job Occur?

**Required**: Define the frequency of the core job.

- **Daily jobs**: Job occurs daily (highest retention potential)
- **Weekly jobs**: Job occurs weekly (strong retention potential)
- **Monthly jobs**: Job occurs monthly (moderate retention potential)
- **Quarterly jobs**: Job occurs quarterly (low retention potential)
- **Event-driven jobs**: Job occurs when specific events happen (variable retention)
- **Rare jobs**: Job occurs rarely (low retention potential, needs frequency boosters)

**Examples**:
- **Daily**: Daily standup, daily reporting, daily monitoring
- **Weekly**: Weekly planning, weekly reviews, weekly reports
- **Monthly**: Monthly reporting, monthly planning, monthly audits
- **Quarterly**: Quarterly reviews, quarterly planning
- **Event-driven**: Onboarding new team member, launching campaign, compliance audit
- **Rare**: One-time setup, annual review, emergency response

##### What Triggers the Job?

**Required**: Define what triggers the job to occur.

- **Time-based triggers**: Scheduled time (daily at 9am, weekly on Monday)
- **Event-based triggers**: Specific events (new user signs up, error occurs, milestone reached)
- **Action-based triggers**: User actions (completes task, reaches limit, needs update)
- **External triggers**: External factors (market changes, compliance requirements, team growth)
- **Internal triggers**: Internal factors (deadline approaching, goal achieved, problem detected)

**Examples**:
- **Time-based**: "Every Monday at 9am, team needs weekly planning"
- **Event-based**: "When new team member joins, need to onboard them"
- **Action-based**: "When user completes task, need to review results"
- **External triggers**: "When compliance deadline approaches, need to audit"
- **Internal triggers**: "When error rate exceeds threshold, need to investigate"

##### What Increases the Frequency?

**Required**: Define what increases the frequency of the job.

- **Success factors**: What makes the job happen more often?
- **Growth factors**: What causes the job to scale?
- **Value factors**: What makes the job more valuable when done frequently?
- **Dependency factors**: What creates dependencies that increase frequency?

**Examples**:
- **Success factors**: More successful outcomes → more frequent job execution
- **Growth factors**: Team growth → more frequent collaboration needs
- **Value factors**: More frequent execution → better outcomes → higher value
- **Dependency factors**: More integrations → more frequent sync needs

#### If the Job Is Rare: Frequency Boosters (REQUIRED)

**CRITICAL**: If the core job is rare (quarterly, event-driven, or one-time), you need frequency boosters to keep the product alive. Without frequency boosters, MRR collapses after the honeymoon period.

##### Required Frequency Boosters (Choose at least one):

1. **Alerts**
   - Product sends alerts/notifications to bring users back
   - **Example**: Weekly digest emails, error alerts, milestone notifications
   - **Implementation**: [How to implement alerts?]

2. **Monitoring**
   - Product monitors conditions and surfaces insights regularly
   - **Example**: Dashboard updates, health checks, performance monitoring
   - **Implementation**: [How to implement monitoring?]

3. **Workflows**
   - Product automates workflows that require regular attention
   - **Example**: Automated reports, scheduled tasks, recurring processes
   - **Implementation**: [How to implement workflows?]

4. **Repeated Jobs**
   - Product creates repeated instances of the job
   - **Example**: Multiple projects, recurring campaigns, batch processing
   - **Implementation**: [How to implement repeated jobs?]

5. **Recurring Tasks**
   - Product creates recurring tasks that need regular completion
   - **Example**: Weekly reviews, monthly audits, quarterly planning
   - **Implementation**: [How to implement recurring tasks?]

#### JTBD Frequency Strategy

**CRITICAL**: Design the frequency strategy to ensure retention.

- **Target frequency**: [What's the target frequency for retention?]
- **Frequency boosters**: [Which frequency boosters are needed?]
- **Retention mechanism**: [How does frequency drive retention?]
- **Habit formation**: [How does frequency create habits?]

**Example Strategies**:
- **Rare job + Alerts**: One-time setup job → weekly alerts → monthly check-ins → retention
- **Event-driven + Monitoring**: Event-driven job → continuous monitoring → weekly insights → retention
- **Quarterly + Workflows**: Quarterly job → monthly workflows → weekly updates → retention

#### Quality Gate

- JTBD frequency must be clearly defined (daily/weekly/monthly/quarterly/event-driven/rare)
- Job triggers must be identified
- Frequency increase factors must be defined
- If job is rare, frequency boosters must be selected (at least one)
- Frequency strategy must ensure retention

**Critical Rule**: If the core job isn't frequent, MRR collapses after the initial honeymoon. Every feature/product must include a "JTBD Frequency Map." If the job is rare, you need frequency boosters (alerts, monitoring, workflows, repeated jobs, recurring tasks) to keep the product alive.

### 2. Value Story (Central to Greg's Playbook)
- **The transformation**: What transformation do we enable?
- **Before state**: What is life like without this?
- **After state**: What is life like with this?
- **The journey**: How do we help them get from before to after?
- **Emotional resonance**: Why does this matter deeply?
- **Value proposition**: Clear, compelling value story

### 3. Why Now (Timing Rationale)
- **Market timing**: Why is this the right time?
- **Technology readiness**: What makes this possible now?
- **User readiness**: Why are users ready for this now?
- **Competitive window**: Why now vs later?
- **Urgency factors**: What creates urgency?

### 3a. Market Timing & Wave Analysis (REQUIRED)

**CRITICAL**: Isenberg is great at identifying present niche pain. But MRR durability often comes from being early on a wave too. This prevents building a niche that is valid, but not future-proof.

#### Wave Maturity Assessment

**Required**: Assess where the market wave is in its lifecycle.

- **Emerging Wave** (0-2 years): Early adopters, experimental solutions, high uncertainty
- **Growing Wave** (2-5 years): Mainstream adoption begins, clear winners emerge
- **Mature Wave** (5-10 years): Market established, consolidation, slower growth
- **Declining Wave** (10+ years): Market shrinking, legacy solutions, disruption risk

**Assessment**: [Where is this wave? What evidence supports this?]

#### Early Indicators Track

**Required**: Track early indicators that signal wave direction.

- **Adoption signals**: [What signals indicate growing adoption?]
- **Investment signals**: [What investment activity indicates growth?]
- **Regulatory signals**: [What regulatory changes indicate growth?]
- **Technology signals**: [What technology changes indicate growth?]
- **Community signals**: [What community activity indicates growth?]

**Early decline indicators**: [What signals indicate market decline or disruption risk?]

#### Competitor Velocity Mapping

**Required**: Map competitor velocity to understand market dynamics.

- **Fast-moving competitors**: [Who is moving fast? What are they building?]
- **Slow-moving competitors**: [Who is slow? Why?]
- **New entrants**: [Who is entering? What are they bringing?]
- **Exits**: [Who is leaving? Why?]

#### Regulatory Horizon Scan

**Required**: Scan regulatory horizon for opportunities and risks.

- **Regulatory opportunities**: [What new regulations create opportunities?]
- **Compliance requirements**: [What compliance needs are emerging?]
- **Regulatory risks**: [What regulatory changes create risks?]

#### Emerging Pain Signals

**Required**: Track emerging pain signals that indicate future opportunities.

- **Technology pain**: [What technology pain is emerging?]
- **Workflow pain**: [What workflow pain is emerging?]
- **Compliance pain**: [What compliance pain is emerging?]
- **Market pain**: [What market pain is emerging?]
- **Community pain**: [What community pain is emerging?]

#### Market Timing Strategy

**CRITICAL**: Design strategy based on wave analysis.

- **Wave position**: [Where is the wave?]
- **Timing strategy**: [How to time entry/exit?]
- **Risk mitigation**: [How to mitigate wave risks?]
- **Opportunity capture**: [How to capture wave opportunities?]

**Critical Rule**: Isenberg is great at identifying present niche pain. But MRR durability often comes from being early on a wave too. This prevents building a niche that is valid, but not future-proof.

### 4. Scope (in/out)
- **What's included**: What's in this PRD
- **What's explicitly out**: What's not in scope
- **Future considerations**: v2, v3 possibilities
- **MVP boundaries**: What's the minimum viable version?

### 5. User Stories + Acceptance Criteria

**CRITICAL**: Use Manus persona language and terminology in user stories.

- **User stories**: "As a [Manus persona name], I want [goal] so that [benefit]"
  - Use exact persona names from Manus outputs
  - Use persona language and terminology
  - Reference identity-level motivations from Manus
- **Acceptance criteria**: In bullet form (must be testable)
- **Edge cases**: Documented
- **Keyed to JTBD**: Each story maps to a job (extracted from Manus outputs)
- **Persona alignment**: Stories must align with Manus persona profiles

### 6. Early Adopter Profile (Extract from Manus Persona)

**CRITICAL**: Extract early adopter profile directly from Manus persona documents.

- **Manus Persona Reference**: Link to `/docs/research/PERSONA-<product>.md`
- **Community**: Where do they gather? (from Manus persona: where they hang out)
- **Identity**: How do they see themselves? (from Manus persona: identity-level motivations)
- **Motivation**: What drives them? (from Manus persona: emotional drivers)
- **Pain intensity**: Why do they feel this pain most intensely? (from Manus persona: frustrations)
- **Persona language**: Use exact terminology from Manus personas
- **Early adopter signals**: What makes them early adopters? (from Manus persona: behavioral patterns)
- **How to reach them**: Channels, communities, influencers (from Manus persona: communication preferences)

### 7. "If Users Love This, What Will They Tell Friends?"
- **Word-of-mouth message**: What will they say?
- **Shareable moment**: What makes them want to share?
- **Social proof**: What would they show others?
- **Referral trigger**: What makes them refer?
- **Viral loop potential**: How does this spread?

### 8. Distribution from Day 1
- **Day 1 distribution strategy**: How do we reach users immediately?
- **Community entry point**: From Insight Brief distribution wedge
- **Content strategy**: What content supports distribution?
- **Partnership opportunities**: Who can help distribute?
- **Growth loops**: How does usage drive distribution?
- **No-code distribution**: How to distribute before building?

### 9. Monetization Wedge (REQUIRED)

**CRITICAL**: Community products often start free/cheap to grow. That's fine for validation, but to get strong MRR you need pricing as product earlier. This section is **REQUIRED** in all PRDs.

#### First Paid Moment (REQUIRED)

**CRITICAL**: Define the first paid moment clearly. This is when the user first pays, not when they might pay later.

- **When does the user first pay?**: [Specific moment in user journey]
- **What triggers the first payment?**: [What action or need triggers payment?]
- **What value justifies the first payment?**: [What value does the user get?]
- **How early in the journey is the paid moment?**: [Early (first week) | Mid (first month) | Late (after value proven)]
- **What prevents "free forever"?**: [What forces the paid moment?]

**Examples**:
- User needs to invite team members (seats) → First paid moment: Team invite
- User exceeds free tier limits (usage) → First paid moment: Usage limit hit
- User needs advanced features (tiers) → First paid moment: Feature need
- User needs to remove branding (tiers) → First paid moment: Branding removal

#### Natural Expansion Revenue (REQUIRED)

**CRITICAL**: MRR is fragile unless pricing grows with value. While the first paid moment defines initial revenue, explicit expansion levers turn a $29/mo tool into a $290/mo business without acquisition cost. Every product must include at least one expansion revenue lever.

##### Required: At Least One Expansion Revenue Lever

Choose at least one (or combine multiple):

1. **Usage-Based Pricing**: Revenue grows with usage volume (API calls, data processed, actions taken, etc.)
2. **Additional Seats**: Revenue grows with team size
3. **Add-Ons**: Revenue grows with optional add-on products/services
4. **Premium Automations**: Revenue grows with advanced automation features
5. **AI Enhanced Insights**: Revenue grows with AI-powered insights and recommendations
6. **Compliance/Integrations**: Revenue grows with compliance features and integrations
7. **Advanced Analytics**: Revenue grows with advanced analytics and reporting
8. **Custom Workflows**: Revenue grows with custom workflow capabilities

##### Expansion Revenue Strategy

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

##### Expansion Revenue Metrics

- **Expansion rate**: [What % of customers expand?]
- **Average expansion**: [What's the average expansion multiple?]
- **Time to expansion**: [How long until first expansion?]
- **Expansion frequency**: [How often do customers expand?]
- **Expansion revenue**: [What % of MRR comes from expansion?]

##### Expansion Revenue Projections

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

#### Value Metric Scales with Customer Success

**CRITICAL**: Define the value metric that scales with customer success. This is what customers pay for.

- **Value metric**: What do customers pay for? (users, API calls, storage, projects, etc.)
- **Customer success alignment**: How does the value metric align with customer success?
- **Scaling mechanism**: How does customer success drive higher value metric usage?
- **Pricing alignment**: How does pricing align with value delivered?

#### Pricing Strategy
- **Pricing model**: Freemium, usage-based, seat-based, tiered, etc.
- **Free tier strategy**: What's free and why? (not just "free to grow")
- **Paid tier strategy**: What's paid and why?
- **Pricing as product**: How does pricing create value, not just capture value?
- **Expansion strategy**: How does pricing enable natural expansion?

#### Examples of Monetization Wedges
- **First paid moment**: User needs to invite team members (seats)
- **Expansion revenue**: More team members = more seats = more revenue
- **Value metric**: Number of team members (scales with customer success)
- **First paid moment**: User exceeds free tier limits (usage)
- **Expansion revenue**: More usage = more revenue
- **Value metric**: API calls or data processed (scales with customer success)
- **First paid moment**: User needs advanced features (tiers)
- **Expansion revenue**: Upgrade to higher tier = more revenue
- **Value metric**: Feature access (scales with customer success)

#### Quality Gate
- **First Paid Moment must be clear and early** (not "maybe later")
- **Natural expansion revenue must be defined** (not just "more users")
- **Value metric must scale with customer success** (not arbitrary)
- **Pricing strategy prevents "free audience, no business"**
- **Monetization wedge designed** (not just community growth) This prevents "free audience, no business."

#### What Is the First Paid Moment?
- When does the user first pay?
- What triggers the first payment?
- What value justifies the first payment?
- How early in the journey is the paid moment?
- What's the free-to-paid conversion trigger?

#### What Is the Natural Expansion Revenue?
- **Seats**: How does revenue grow with team size?
- **Usage**: How does revenue grow with usage volume?
- **Tiers**: How does revenue grow with feature tiers?
- **Add-ons**: What additional products/services drive expansion?
- **Natural expansion path**: What's the organic growth in revenue per customer?

#### What Value Metric Scales with Customer Success?
- **Value metric**: What do customers pay for? (users, API calls, storage, projects, etc.)
- **Customer success alignment**: How does the value metric align with customer success?
- **Scaling mechanism**: How does customer success drive higher value metric usage?
- **Pricing alignment**: How does pricing align with value delivered?

#### Pricing Strategy
- **Pricing model**: Freemium, usage-based, seat-based, tiered, etc.
- **Free tier strategy**: What's free and why? (not just "free to grow")
- **Paid tier strategy**: What's paid and why?
- **Pricing as product**: How does pricing create value, not just capture value?
- **Expansion strategy**: How does pricing enable natural expansion?

#### Examples of Monetization Wedges
- **First paid moment**: User needs to invite team members (seats)
- **Expansion revenue**: More team members = more seats = more revenue
- **Value metric**: Number of team members (scales with customer success)
- **First paid moment**: User exceeds free tier limits (usage)
- **Expansion revenue**: More usage = more revenue
- **Value metric**: API calls or data processed (scales with customer success)
- **First paid moment**: User needs advanced features (tiers)
- **Expansion revenue**: Upgrade to higher tier = more revenue
- **Value metric**: Feature access (scales with customer success)

#### Quality Gate
- First paid moment must be clear and early
- Natural expansion revenue must be defined
- Value metric must scale with customer success
- Pricing strategy prevents "free audience, no business"
- Monetization wedge designed (not just community growth)

### 10. Data Moat Thesis (REQUIRED)

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

### 11. Network Effects or Collaboration Loops (REQUIRED)

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

### 12. Durability Filter

**CRITICAL**: Some niches are trend-spikes, not durable markets. Isenberg is great at catching waves, but defensive moat + enduring MRR requires filtering for structural vs. cyclical pain, recurring workflow vs. novelty, budgeted spend vs. hobby spend.

#### Scoring Criteria (Score 1-5 for each)

##### 1. Frequency of the Job
- **5**: Daily/weekly recurring job
- **4**: Monthly recurring job
- **3**: Quarterly recurring job
- **2**: Occasional/seasonal job
- **1**: One-time or rare job

##### 2. Economic Buyer Has Budget
- **5**: Budgeted spend, enterprise buyer
- **4**: Budgeted spend, SMB buyer
- **3**: Discretionary spend, but regular
- **2**: Hobby spend, occasional
- **1**: No budget, free only

##### 3. Problem Exists Independent of Hype
- **5**: Structural pain, exists regardless of trends
- **4**: Long-term pain, not trend-dependent
- **3**: Pain exists but may be amplified by trends
- **2**: Trend-dependent pain, may fade
- **1**: Purely trend-driven, likely temporary

##### 4. Users Would Be Upset If It Disappeared
- **5**: Critical to operations, high emotional attachment
- **4**: Important to workflow, would be missed
- **3**: Useful but replaceable
- **2**: Nice to have, low attachment
- **1**: No attachment, easily forgotten

##### 5. Clear Path to Switching Costs / Workflow Embed
- **5**: Deep workflow integration, high switching costs
- **4**: Moderate integration, some switching costs
- **3**: Light integration, minimal switching costs
- **2**: No integration, easy to switch
- **1**: No switching costs, purely transactional

#### Durability Assessment

**Total Score (out of 25)**:

- **Durable Market (18-25)**: 
  - **Treatment**: Compounding SaaS asset
  - **Strategy**: Build for long-term MRR
  - **Investment**: Full product development
  - **Moat focus**: Structural moats (data, workflow, network effects)

- **Cash-Flow Micro-Bet (10-17)**: 
  - **Treatment**: Cash-flow micro-bet, not compounding asset
  - **Strategy**: Build for short-term revenue, expect trend fade
  - **Investment**: Minimal viable product, fast iteration
  - **Moat focus**: Community moat only, expect competition

- **Low Durability (5-9)**: 
  - **Treatment**: Consider pivot or kill
  - **Strategy**: Not recommended unless strong distribution wedge
  - **Investment**: Minimal, validate quickly
  - **Moat focus**: None, likely temporary

#### Strategic Recommendation

Based on durability score:
- **Product strategy**: Long-term vs. short-term
- **Investment level**: Full development vs. MVP
- **Moat strategy**: Structural moats vs. community moat only
- **Expectations**: Compounding asset vs. cash-flow micro-bet

**Critical Rule**: If a niche fails durability, still build — but treat it like a cash-flow micro-bet, not a compounding SaaS asset.

### 13. Retention Thesis (REQUIRED)

**CRITICAL**: MRR durability = retention architecture. Many niche products die from "strong launch, weak week-8 retention." Retention must be designed in, not patched later. This section is **REQUIRED** in all PRDs.

#### Why Do Users Come Back Weekly/Monthly?
- What recurring job drives return visits?
- What problem needs solving repeatedly?
- What value is delivered on a recurring basis?
- What makes this a weekly/monthly need, not a one-time need?

#### What's the Recurring Job or Frequency Driver?
- **Recurring job**: What job does the user need to do repeatedly?
- **Frequency driver**: What triggers the user to return?
- **Value cadence**: How often does new value appear?
- **Update frequency**: What changes/updates bring users back?

#### What Habit Loop / Alert / Collaborative Ritual Keeps Usage Alive?
- **Habit loop**: What cue → routine → reward loop exists?
- **Alerts/notifications**: What triggers bring users back?
- **Collaborative rituals**: What team/community rituals depend on the product?
- **Social triggers**: What social signals drive return visits?
- **Status/identity**: How does continued usage signal identity?

#### Retention Mechanics
- How is retention designed into the product?
- What prevents churn (not just what drives acquisition)?
- What switching costs exist?
- What habit formation is built in?
- What collaborative dependencies exist?

#### Examples of Retention Mechanics
- **Weekly reports**: Users return weekly to see updated reports
- **Team collaboration**: Product is essential to team workflows
- **Habit loop**: Daily check-in becomes a habit
- **Alerts**: Notifications bring users back for updates
- **Social proof**: Community activity drives return visits
- **Data accumulation**: Product gets better with more data (data moat)

#### Quality Gate
- Retention thesis must be clear and specific
- Recurring job must be identified
- Frequency driver must be defined
- Habit loop/ritual must be designed
- Retention mechanics must be designed in (not patched later)

### 14. 10 High-Velocity Tests
- **Test 1**: [Name] - [Method] - [Success criteria] - [Timeline]
- **Test 2**: [Name] - [Method] - [Success criteria] - [Timeline]
- **Test 3**: [Name] - [Method] - [Success criteria] - [Timeline]
- **Test 4**: [Name] - [Method] - [Success criteria] - [Timeline]
- **Test 5**: [Name] - [Method] - [Success criteria] - [Timeline]
- **Test 6**: [Name] - [Method] - [Success criteria] - [Timeline]
- **Test 7**: [Name] - [Method] - [Success criteria] - [Timeline]
- **Test 8**: [Name] - [Method] - [Success criteria] - [Timeline]
- **Test 9**: [Name] - [Method] - [Success criteria] - [Timeline]
- **Test 10**: [Name] - [Method] - [Success criteria] - [Timeline]

**Note**: High-velocity tests are fast, low-cost ways to validate demand before building.

### 15. Lo-Fi Validation Plan
- **Email validation**: [How to test via email]
- **Landing page**: [What landing page tests demand?]
- **Loom demo**: [How to use Loom to validate interest?]
- **Tweet test**: [What tweet would validate demand?]
- **DM conversations**: [How to validate via direct messages?]
- **Timeline**: [When to run each validation?]
- **Success criteria**: [What indicates validation?]

### 16. Success Metrics (leading/lagging) - REQUIRED

**CRITICAL**: Success metrics must be clearly defined and measurable. Use ChatGPT to optimize metric selection.

- **Leading indicators**: Predictive metrics (engagement, time to value, word-of-mouth)
  - **Engagement metrics**: Daily/weekly active users, session frequency, feature usage
  - **Time to value**: Time from signup to first value, activation rate
  - **Word-of-mouth**: Referral rate, NPS, social shares
  - **Habit formation**: Weekly active users, streak metrics, habit loop completion
- **Lagging indicators**: Outcome metrics (conversion, retention, revenue)
  - **Conversion metrics**: Free-to-paid conversion, trial-to-paid conversion
  - **Retention metrics**: Week-1 retention, Week-4 retention, Month-3 retention, churn rate
  - **Revenue metrics**: MRR, ARR, expansion revenue, LTV, CAC
  - **Product-market fit**: PMF score, retention curve, usage frequency
- **Baseline metrics**: Current state (if applicable)
- **Target metrics**: Desired state (specific, measurable, time-bound)
- **Measurement plan**: How to measure (analytics tools, tracking implementation)
- **Success thresholds**: What metrics indicate success? (e.g., >40% Week-1 retention, >10% conversion)
- **Failure thresholds**: What metrics indicate failure? (e.g., <20% Week-1 retention, <2% conversion)

### 17. Risks + Mitigations - REQUIRED

**CRITICAL**: Risks must be identified and mitigated. Use ChatGPT to analyze risks comprehensively.

- **Desirability risks**: What if users don't want this?
  - **Risk**: Low validation signal, weak demand
  - **Mitigation**: Run validation tests before build, iterate based on feedback
  - **Early warning**: Low engagement in validation tests
- **Buildability risks**: What if we can't build this?
  - **Risk**: Technical complexity, resource constraints, timeline delays
  - **Mitigation**: Technical spike, proof-of-concept, phased rollout
  - **Early warning**: Technical blockers, timeline slips
- **Distribution risks**: What if we can't reach users?
  - **Risk**: Low distribution, poor channel fit, weak messaging
  - **Mitigation**: Test distribution channels early, iterate messaging
  - **Early warning**: Low conversion rates, poor engagement
- **Timing risks**: What if timing is wrong?
  - **Risk**: Market not ready, competitor launches first, trend fades
  - **Mitigation**: Monitor market signals, accelerate if needed, pivot if necessary
  - **Early warning**: Market signals change, competitor activity
- **Retention risks**: What if users don't come back?
  - **Risk**: Low frequency, weak habit formation, no switching costs
  - **Mitigation**: Design retention mechanics, frequency boosters, habit loops
  - **Early warning**: Low Week-1 retention, declining usage
- **Monetization risks**: What if users won't pay?
  - **Risk**: No willingness to pay, wrong pricing, weak value prop
  - **Mitigation**: Test pricing early, validate WTP, iterate value prop
  - **Early warning**: Low conversion, pricing objections
- **Competitive risks**: What if competitors launch similar features?
  - **Risk**: Feature parity, better execution, stronger distribution
  - **Mitigation**: Build moats, focus on differentiation, move fast
  - **Early warning**: Competitor announcements, market shifts
- **Mitigation strategies**: How to mitigate each risk (specific, actionable)
- **Risk monitoring**: How to monitor risks (metrics, signals, triggers)
- **Contingency plans**: What to do if risks materialize (pivot, kill, iterate)

### 18. Rollout Plan with Feature Flags - REQUIRED

**CRITICAL**: Feature flags enable safe, gradual rollouts. All risky features must have feature flags.

- **Feature flag name**: [Name] (e.g., `feature-<feature-name>`)
- **Feature flag type**: Boolean, percentage, or user-based
- **Rollout stages**: 0% → 10% → 50% → 100%
  - **Stage 1 (0% → 10%)**: Internal testing, dogfooding
  - **Stage 2 (10% → 50%)**: Beta users, early adopters
  - **Stage 3 (50% → 100%)**: General availability
- **Success criteria for each stage**: [Criteria]
  - **Stage 1 criteria**: No critical bugs, positive internal feedback
  - **Stage 2 criteria**: >X% engagement, >Y% positive feedback, <Z% error rate
  - **Stage 3 criteria**: >X% adoption, >Y% retention, <Z% churn
- **Rollback plan**: [How to rollback]
  - **Rollback triggers**: Error rate >X%, negative feedback >Y%, engagement <Z%
  - **Rollback process**: Disable feature flag, notify users, investigate
  - **Rollback timeline**: Immediate (<1 hour) or scheduled (<24 hours)
- **Monitoring plan**: [What to monitor]
  - **Metrics**: Engagement, error rate, performance, retention
  - **Alerts**: Set up alerts for critical metrics
  - **Dashboards**: Create dashboards for real-time monitoring
- **Feature flag implementation**: [How to implement]
  - **Code location**: Where feature flag is checked
  - **Flag management**: How to enable/disable flags
  - **User targeting**: How to target specific users/segments

### 19. Analytics Events Schema - REQUIRED

**CRITICAL**: Analytics events enable measurement of success metrics. All key user actions must be tracked.

- **Event names**: [List of all events]
  - **User events**: signup, login, logout, profile_update
  - **Feature events**: feature_viewed, feature_used, feature_completed
  - **Conversion events**: trial_started, payment_initiated, payment_completed
  - **Retention events**: daily_active, weekly_active, monthly_active
  - **Engagement events**: page_viewed, button_clicked, form_submitted
- **Event properties**: [Properties for each event]
  - **User properties**: user_id, user_type, plan_type, signup_date
  - **Feature properties**: feature_name, feature_version, feature_context
  - **Conversion properties**: plan_type, price, payment_method
  - **Retention properties**: days_since_signup, usage_frequency, last_active_date
  - **Engagement properties**: page_name, button_name, form_name, time_spent
- **When events fire**: [Triggers]
  - **On page load**: page_viewed events
  - **On user action**: button_clicked, form_submitted events
  - **On state change**: signup, payment_completed events
  - **On schedule**: daily_active, weekly_active events
- **Event tracking implementation**: [Notes]
  - **Tracking library**: Which analytics library? (e.g., PostHog, Mixpanel, Amplitude)
  - **Implementation location**: Where events are tracked (frontend, backend, both)
  - **Event validation**: How to validate events are firing correctly
  - **Privacy considerations**: How to handle PII, GDPR compliance
- **Analytics dashboard**: [What dashboards to create]
  - **Success metrics dashboard**: Track leading/lagging indicators
  - **Feature usage dashboard**: Track feature adoption and engagement
  - **Conversion funnel dashboard**: Track conversion rates
  - **Retention dashboard**: Track retention curves and churn

## Workflow
1. **Receive Manus outputs** (persona document, JTBD from narrative)
2. **Extract from Manus outputs**:
   - Persona language and terminology
   - Identity-level motivations
   - JTBD from persona narratives
   - Emotional drivers
   - Communication preferences
3. Review Insight Brief (must exist)
4. Validate desirability (before buildability)
5. Craft Value Story (transformation enabled)
6. Define Why Now (timing rationale)
7. Define scope (in/out)
8. Create user stories with acceptance criteria (use Manus persona language)
9. Define early adopter profile (extract from Manus persona: community, identity, motivation)
10. Answer "If users love this, what will they tell friends?"
11. Plan distribution from Day 1
12. **Define Monetization Wedge** (first paid moment, expansion revenue, value metric)
13. **Define Data Moat Thesis** (proprietary data, compounding mechanism, 10× value, feedback loop)
14. **Define Network Effects or Collaboration Loops** (at least one collaboration or shared value mechanic)
15. **Score Durability Filter** (frequency, budget, independent of hype, upset if disappeared, switching costs)
16. **Assess Durability** (Durable Market | Cash-Flow Micro-Bet | Low Durability)
17. **Define Retention Thesis** (recurring job, frequency driver, habit loop)
18. Design 10 High-Velocity Tests
19. Create Lo-Fi Validation Plan
20. **Define success metrics (leading/lagging)** - REQUIRED
21. **Identify risks and mitigations** - REQUIRED
22. **Create rollout plan with feature flags** - REQUIRED
23. **Define analytics events schema** - REQUIRED
24. @ChatGPT-Reasoning-Agent → Refine PRD structure and optimize success metrics
25. Create PRD document
26. Get stakeholder alignment

## Quality Criteria
- **Manus Persona is REQUIRED** (persona document must be referenced)
- **Manus JTBD is REQUIRED** (JTBD must be extracted from Manus outputs)
- PRD references Insight Brief
- PRD uses Manus persona language and terminology
- Desirability validated before buildability
- Value Story is clear and compelling
- Why Now is justified
- Early adopter profile is extracted from Manus persona (community, identity, motivation)
- "If users love this" question is answered
- Distribution from Day 1 is planned
- **Monetization Wedge is REQUIRED** (first paid moment, expansion revenue, value metric)
- **Data Moat Thesis is REQUIRED** (proprietary data, compounding mechanism, 10× value, feedback loop)
- **Durability Filter is scored** (all 5 criteria scored 1-5)
- **Durability assessment is clear** (Durable Market | Cash-Flow Micro-Bet | Low Durability)
- **Strategic recommendation aligned with durability** (long-term vs. short-term strategy)
- **Retention Thesis is REQUIRED** (recurring job, frequency driver, habit loop)
- **Retention mechanics are designed in** (not patched later)
- 10 High-Velocity Tests are actionable
- Lo-Fi Validation Plan is complete
- **Success metrics are REQUIRED** (leading/lagging indicators clearly defined, measurable, with thresholds)
- Acceptance criteria are in bullet form and testable
- **Risks and mitigations are REQUIRED** (comprehensive risk analysis with mitigation strategies)
- **Feature flags are REQUIRED** (rollout plan with feature flags for risky features)
- **Analytics events schema is REQUIRED** (all key events defined with properties and triggers)
- Stakeholder approval obtained

## Rules
- **Cannot proceed without Manus Persona** (persona document is REQUIRED)
- **Cannot proceed without Manus JTBD** (JTBD must be extracted from Manus outputs)
- Cannot proceed without Insight Brief
- Must validate desirability before buildability
- Value Story and Why Now are required (central to Greg's playbook)
- PRD must use Manus persona language and terminology
- Early adopter profile must be extracted from Manus persona
- Lo-Fi Validation Plan must include: email, landing page, Loom demo, tweet test, DM conversations
- 10 High-Velocity Tests must be fast and low-cost
- Distribution from Day 1 must be planned (not "we'll figure it out later")
- **Success metrics are REQUIRED** (leading/lagging indicators must be defined)
- **Risks and mitigations are REQUIRED** (comprehensive risk analysis required)
- **Feature flags are REQUIRED** (all risky features must have feature flags)
- **Analytics events schema is REQUIRED** (all key events must be tracked)

## Agent Packs
For domain-specific SaaS categories, use agent packs:
- "Use the AI-SaaS agent pack" - For AI/ML SaaS applications
- "Use the B2B-admin-SaaS agent pack" - For B2B admin dashboards
- "Use the usage-billing-SaaS agent pack" - For usage-based billing systems

See `docs/agent-packs/*.md` for domain-specific patterns and workflows.
