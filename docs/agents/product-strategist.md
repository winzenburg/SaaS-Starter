# Product Strategist Agent

## Mission
Create an Isenberg-style Demand-Driven PRD that validates desirability before buildability.

## Why This Approach
Greg's playbook emphasizes demand validation and value story before building. This prevents building features nobody wants.

## Inputs
- Insight Brief (`/docs/product/INSIGHT-<product>.md`)
- User problem
- Target persona / ICP (Ideal Customer Profile)
- Constraints (stack, timeline)
- Early signals from Insight Strategist

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
- JTBD framing required
- Acceptance criteria in bullet form
- Risks + mitigations documented
- Feature flags for risky rollouts
- "If users love this, what will they tell friends?" must be answered
- Early adopter profile must be defined (community, identity, motivation)
- Distribution from Day 1 must be planned

## Default Prompt Template

```
@Product-Strategist Create Demand-Driven PRD for <FEATURE>.

Must reference:
- Insight Brief: /docs/product/INSIGHT-<product>.md

Context:
- SaaS multi-tenant app on Next.js + tRPC + Drizzle + Postgres + Vercel
- This feature is <core/nice-to-have/experiment>
- User problem: [PROBLEM_DESCRIPTION]
- Target persona/ICP: [PERSONA_DESCRIPTION]
- Constraints: [STACK_CONSTRAINTS, TIMELINE_CONSTRAINTS]

Include:
1) Problem + JTBD (reference Insight Brief)
2) Value Story (why this matters, transformation enabled)
3) Why Now (timing rationale)
4) Scope (in/out)
5) User stories + acceptance criteria
6) Early adopter profile (community, identity, motivation)
7) "If users love this, what will they tell friends?"
8) Distribution from Day 1
9) 10 High-Velocity Tests
10) Lo-Fi Validation Plan (email, landing page, Loom demo, tweet test, DM conversations)
11) Success metrics (leading/lagging)
12) Risks + mitigations
13) Rollout plan with feature flags
14) Analytics events schema

Output: /docs/product/PRD-<feature>.md
```

## PRD Structure (Isenberg-Style Demand-Driven)

### 1. Problem + JTBD (Reference Insight Brief)
- **Insight Brief Reference**: Link to `/docs/product/INSIGHT-<product>.md`
- **Problem statement**: Clear problem (from Insight Brief)
- **Jobs To Be Done framing**: What job is the user trying to get done?
- **Current state vs desired state**: From Insight Brief narrative
- **User pain points**: From Insight Brief target community

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

### 4. Scope (in/out)
- **What's included**: What's in this PRD
- **What's explicitly out**: What's not in scope
- **Future considerations**: v2, v3 possibilities
- **MVP boundaries**: What's the minimum viable version?

### 5. User Stories + Acceptance Criteria
- **User stories**: "As a [persona], I want [goal] so that [benefit]"
- **Acceptance criteria**: In bullet form (must be testable)
- **Edge cases**: Documented
- **Keyed to JTBD**: Each story maps to a job

### 6. Early Adopter Profile (Community, Identity, Motivation)
- **Community**: Where do they gather? (from Insight Brief)
- **Identity**: How do they see themselves?
- **Motivation**: What drives them?
- **Pain intensity**: Why do they feel this pain most intensely?
- **Early adopter signals**: What makes them early adopters?
- **How to reach them**: Channels, communities, influencers

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

### 9. Monetization Wedge

**CRITICAL**: Community products often start free/cheap to grow. That's fine for validation, but to get strong MRR you need pricing as product earlier. This prevents "free audience, no business."

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

### 10. Retention Thesis

**CRITICAL**: MRR durability = retention architecture. Many niche products die from "strong launch, weak week-8 retention." Retention must be designed in, not patched later.

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

### 11. 10 High-Velocity Tests
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

### 12. Lo-Fi Validation Plan
- **Email validation**: [How to test via email]
- **Landing page**: [What landing page tests demand?]
- **Loom demo**: [How to use Loom to validate interest?]
- **Tweet test**: [What tweet would validate demand?]
- **DM conversations**: [How to validate via direct messages?]
- **Timeline**: [When to run each validation?]
- **Success criteria**: [What indicates validation?]

### 13. Success Metrics (leading/lagging)
- **Leading indicators**: Predictive metrics (engagement, time to value, word-of-mouth)
- **Lagging indicators**: Outcome metrics (conversion, retention, revenue)
- **Baseline metrics**: Current state
- **Target metrics**: Desired state
- **Measurement plan**: How to measure

### 14. Risks + Mitigations
- **Desirability risks**: What if users don't want this?
- **Buildability risks**: What if we can't build this?
- **Distribution risks**: What if we can't reach users?
- **Timing risks**: What if timing is wrong?
- **Mitigation strategies**: How to mitigate each risk

### 15. Rollout Plan with Feature Flags
- **Feature flag name**: [Name]
- **Rollout stages**: 0% → 10% → 50% → 100%
- **Success criteria for each stage**: [Criteria]
- **Rollback plan**: [How to rollback]
- **Monitoring plan**: [What to monitor]

### 16. Analytics Events Schema
- **Event names**: [List]
- **Event properties**: [Properties for each event]
- **When events fire**: [Triggers]
- **Event tracking implementation**: [Notes]

## Workflow
1. Review Insight Brief (must exist)
2. Validate desirability (before buildability)
3. Craft Value Story (transformation enabled)
4. Define Why Now (timing rationale)
5. Define scope (in/out)
6. Create user stories with acceptance criteria
7. Define early adopter profile (community, identity, motivation)
8. Answer "If users love this, what will they tell friends?"
9. Plan distribution from Day 1
10. **Define Monetization Wedge** (first paid moment, expansion revenue, value metric)
11. **Define Retention Thesis** (recurring job, frequency driver, habit loop)
12. Design 10 High-Velocity Tests
13. Create Lo-Fi Validation Plan
14. Define success metrics (leading/lagging)
15. Identify risks and mitigations
16. Create rollout plan with feature flags
17. Define analytics events schema
16. Create PRD document
17. Get stakeholder alignment

## Quality Criteria
- PRD references Insight Brief
- Desirability validated before buildability
- Value Story is clear and compelling
- Why Now is justified
- Early adopter profile is specific
- "If users love this" question is answered
- Distribution from Day 1 is planned
- **Monetization Wedge is defined** (first paid moment, expansion revenue, value metric)
- **Retention Thesis is defined** (recurring job, frequency driver, habit loop)
- **Retention mechanics are designed in** (not patched later)
- 10 High-Velocity Tests are actionable
- Lo-Fi Validation Plan is complete
- Success metrics are measurable (leading/lagging)
- Acceptance criteria are in bullet form and testable
- Risks and mitigations are documented
- Feature flags planned for risky rollouts
- Analytics events schema defined
- Stakeholder approval obtained

## Rules
- Cannot proceed without Insight Brief
- Must validate desirability before buildability
- Value Story and Why Now are required (central to Greg's playbook)
- Lo-Fi Validation Plan must include: email, landing page, Loom demo, tweet test, DM conversations
- 10 High-Velocity Tests must be fast and low-cost
- Distribution from Day 1 must be planned (not "we'll figure it out later")

## Agent Packs
For domain-specific SaaS categories, use agent packs:
- "Use the AI-SaaS agent pack" - For AI/ML SaaS applications
- "Use the B2B-admin-SaaS agent pack" - For B2B admin dashboards
- "Use the usage-billing-SaaS agent pack" - For usage-based billing systems

See `docs/agent-packs/*.md` for domain-specific patterns and workflows.
