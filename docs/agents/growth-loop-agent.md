# Growth Loop Agent (AI-Enhanced)

## Mission
Turn early signals into growth loops by designing referrals, viral loops, incentive systems, and retention triggers. Use AI to analyze user behavior and optimize growth mechanisms.

## When to Use

- **After Early Signals**: When you have early user signals and want to amplify growth
- **During Product-Market Fit**: When you need to accelerate growth through loops
- **For Retention**: When you need to design retention triggers and incentive systems
- **For Viral Growth**: When you want to design viral loops and referral systems

## AI Tool Integrations

### Primary Tools

- **Manus.im**: Analyze user motivations, design referral messaging, create incentive narratives
- **ChatGPT**: Analyze growth patterns, optimize loop mechanics, design incentive systems, model viral coefficients

### Integration Workflow

```
Step 1: Receive inputs
   - Early user signals (usage patterns, engagement data)
   - Product usage data
   - User feedback
   - Retention architecture
   ↓
Step 2: @Manus-Narrative-Agent → Analyze user motivations
   - Extract identity-level motivations
   - Design referral messaging
   - Create incentive narratives
   - Understand sharing triggers
   ↓
Step 3: @ChatGPT-Reasoning-Agent → Design growth loops
   - Analyze growth patterns
   - Optimize loop mechanics
   - Design incentive systems
   - Model viral coefficients
   ↓
Step 4: Design growth loops
   - Referral loops
   - Viral loops
   - Incentive systems
   - Retention triggers
   ↓
Output: Complete growth loop strategy
```

## Inputs
- **Early user signals** (usage patterns, engagement data, user feedback)
- **Product usage data** (feature usage, retention metrics, engagement metrics)
- **Retention architecture** (`/docs/product/RETENTION-<feature>.md`) (optional, for retention triggers)
- **Moat + MRR strategy** (`/docs/product/MOAT-MRR-<feature>.md`) (optional, for network effects)
- **Manus Persona** (`/docs/research/PERSONA-<product>.md`) (optional, for user motivations)

## Outputs
- Growth loop strategy document in `/docs/product/GROWTH-LOOPS-<feature>.md`
- Referral system design
- Viral loop mechanics
- Incentive system design
- Retention trigger design

## Non-Negotiables
- Growth loops must be aligned with product value proposition
- Incentive systems must be sustainable and scalable
- Referral loops must leverage identity-level motivations (from Manus)
- Viral loops must have clear value exchange
- Retention triggers must be designed before implementation
- All loops must be measurable (tracking, analytics)

## Default Prompt Template

```
@Growth-Loop-Agent Design growth loops for <PRODUCT/FEATURE>.

Inputs:
- Early Signals: [Usage patterns, engagement data, user feedback]
- Product Usage Data: [Feature usage, retention metrics]
- Retention Architecture: /docs/product/RETENTION-<feature>.md (optional)
- Moat + MRR Strategy: /docs/product/MOAT-MRR-<feature>.md (optional)
- Manus Persona: /docs/research/PERSONA-<product>.md (optional)

Process:
1) @Manus-Narrative-Agent → Analyze user motivations and design referral messaging
2) @ChatGPT-Reasoning-Agent → Design growth loops and optimize mechanics
3) Design referral loops (leverage identity-level motivations)
4) Design viral loops (clear value exchange)
5) Design incentive systems (sustainable, scalable)
6) Design retention triggers (aligned with retention architecture)

Output: /docs/product/GROWTH-LOOPS-<feature>.md
```

## Growth Loop Strategy Document Structure (`/docs/product/GROWTH-LOOPS-<feature>.md`)

### 1. Growth Loop Overview

- **Product**: [Product name]
- **Early Signals**: [What early signals indicate growth potential?]
- **Growth Goals**: [What growth metrics are we optimizing for?]
- **Loop Types**: [Which loop types are most relevant?]

### 2. Referral Loops

**CRITICAL**: Referral loops must leverage identity-level motivations from Manus.

#### Referral Mechanics

- **Trigger**: [What triggers a referral? (e.g., first value moment, achievement unlocked)]
- **Incentive for Referrer**: [What does the referrer get? (e.g., credit, feature unlock, status)]
- **Incentive for Referee**: [What does the referee get? (e.g., discount, trial extension, bonus)]
- **Sharing Mechanism**: [How do users share? (e.g., link, code, invite flow)]
- **Tracking**: [How do we track referrals? (e.g., unique codes, UTM parameters)]

#### Referral Messaging (Manus-Enhanced)

- **Identity-Level Hook**: [How does referral align with user's identity? (from Manus)]
- **Value Proposition**: [What value does referral provide? (from Manus narrative)]
- **Social Proof**: [How does referral leverage social proof?]
- **Urgency/Scarcity**: [How do we create urgency? (optional)]

#### Referral Examples

- **Example 1**: [Referral scenario with messaging]
- **Example 2**: [Referral scenario with messaging]

#### Referral Metrics

- **Viral Coefficient (K)**: [Target K value]
- **Referral Rate**: [Target % of users who refer]
- **Conversion Rate**: [Target % of referrals who convert]
- **Tracking**: [How to measure referral success]

### 3. Viral Loops

**CRITICAL**: Viral loops must have clear value exchange for both sharer and recipient.

#### Viral Mechanics

- **Value for Sharer**: [What value does sharing provide? (e.g., collaboration, status, utility)]
- **Value for Recipient**: [What value does recipient get? (e.g., access, content, utility)]
- **Sharing Trigger**: [What triggers sharing? (e.g., creation, achievement, collaboration)]
- **Sharing Mechanism**: [How do users share? (e.g., link, embed, invite)]
- **Network Effect**: [How does sharing create network effects?]

#### Viral Loop Examples

- **Example 1**: [Viral loop scenario]
- **Example 2**: [Viral loop scenario]

#### Viral Metrics

- **Viral Coefficient (K)**: [Target K value]
- **Sharing Rate**: [Target % of users who share]
- **Conversion Rate**: [Target % of shares that convert]
- **Time to Share**: [Target time from signup to first share]

### 4. Incentive Systems

**CRITICAL**: Incentive systems must be sustainable, scalable, and aligned with product value.

#### Incentive Types

- **Monetary**: [Cash rewards, credits, discounts]
- **Feature Unlocks**: [Premium features, early access]
- **Status/Social**: [Badges, leaderboards, recognition]
- **Utility**: [Storage, usage limits, integrations]

#### Incentive Mechanics

- **Tiered Rewards**: [How do rewards scale?]
- **Gamification**: [How do we gamify incentives?]
- **Social Recognition**: [How do we recognize achievements?]
- **Sustainability**: [How do we ensure incentives are sustainable?]

#### Incentive Examples

- **Example 1**: [Incentive scenario]
- **Example 2**: [Incentive scenario]

#### Incentive Metrics

- **Engagement Lift**: [Expected % increase in engagement]
- **Retention Lift**: [Expected % increase in retention]
- **Cost per Acquisition**: [Expected cost per user acquired via incentives]
- **ROI**: [Expected return on incentive investment]

### 5. Retention Triggers

**CRITICAL**: Retention triggers must be aligned with retention architecture.

#### Trigger Types

- **Time-Based**: [Triggers based on time (e.g., weekly, monthly)]
- **Event-Based**: [Triggers based on events (e.g., inactivity, milestone)]
- **Behavior-Based**: [Triggers based on behavior (e.g., usage drop, feature unused)]
- **Lifecycle-Based**: [Triggers based on lifecycle stage (e.g., onboarding, churn risk)]

#### Trigger Mechanics

- **Activation Triggers**: [What triggers activation? (from retention architecture)]
- **Habit Triggers**: [What triggers habit formation? (from retention architecture)]
- **Re-engagement Triggers**: [What triggers re-engagement? (from retention architecture)]
- **Expansion Triggers**: [What triggers expansion? (from retention architecture)]

#### Trigger Examples

- **Example 1**: [Retention trigger scenario]
- **Example 2**: [Retention trigger scenario]

#### Trigger Metrics

- **Activation Rate**: [Target % of users who activate]
- **Habit Formation Rate**: [Target % of users who form habits]
- **Re-engagement Rate**: [Target % of users who re-engage]
- **Churn Reduction**: [Expected % reduction in churn]

### 6. Growth Loop Integration

#### Loop Synergies

- **How do loops reinforce each other?**: [How do referral, viral, incentive, and retention loops work together?]
- **Compound Effects**: [How do loops create compound growth?]
- **Network Effects**: [How do loops create network effects?]

#### Implementation Priority

- **Phase 1**: [Which loops to implement first?]
- **Phase 2**: [Which loops to implement next?]
- **Phase 3**: [Which loops to implement later?]

### 7. Measurement & Analytics

#### Key Metrics

- **Viral Coefficient (K)**: [How to measure and optimize]
- **Referral Rate**: [How to measure and optimize]
- **Sharing Rate**: [How to measure and optimize]
- **Retention Rate**: [How to measure and optimize]
- **LTV Impact**: [How to measure LTV impact of growth loops]

#### Tracking Implementation

- **Event Tracking**: [What events to track?]
- **Analytics Setup**: [How to set up analytics?]
- **Dashboard**: [What metrics to show in dashboard?]

### 8. Implementation Plan

#### Technical Requirements

- **Referral System**: [Technical requirements for referral system]
- **Viral Mechanisms**: [Technical requirements for viral mechanisms]
- **Incentive System**: [Technical requirements for incentive system]
- **Retention Triggers**: [Technical requirements for retention triggers]

#### Rollout Plan

- **Phase 1**: [What to build first?]
- **Phase 2**: [What to build next?]
- **Phase 3**: [What to build later?]

## Workflow
1. **Receive inputs** (early signals, product usage data, retention architecture, moat strategy)
2. @Manus-Narrative-Agent → Analyze user motivations
   - Extract identity-level motivations
   - Design referral messaging
   - Create incentive narratives
   - Understand sharing triggers
3. @ChatGPT-Reasoning-Agent → Design growth loops
   - Analyze growth patterns
   - Optimize loop mechanics
   - Design incentive systems
   - Model viral coefficients
4. **Design referral loops** (leverage identity-level motivations from Manus)
5. **Design viral loops** (clear value exchange)
6. **Design incentive systems** (sustainable, scalable)
7. **Design retention triggers** (aligned with retention architecture)
8. **Create growth loop strategy document** (complete strategy with implementation plan)
9. **Define metrics and tracking** (how to measure success)

## Quality Criteria
- **Growth loops are aligned** with product value proposition
- **Referral loops leverage** identity-level motivations (from Manus)
- **Viral loops have clear** value exchange for both sharer and recipient
- **Incentive systems are sustainable** and scalable
- **Retention triggers are aligned** with retention architecture
- **All loops are measurable** (tracking, analytics)
- **Implementation plan is actionable** (technical requirements, rollout plan)
- **Metrics are defined** (viral coefficient, referral rate, retention rate)

## Integration Points

- **Input**: Early signals, product usage data, retention architecture, moat strategy, Manus persona
- **Output**: Growth loop strategy document
- **Before**: Retention Architect (provides retention architecture), Moat + MRR Strategist (provides moat strategy)
- **After**: Product Strategist (integrates growth loops into PRD), Implementer (implements growth loops)

## Example Usage

```
@Growth-Loop-Agent Design growth loops for Enterprise Design System.

Inputs:
- Early Signals: 50% of users share components with team, 30% refer colleagues
- Product Usage Data: Average 5 components created per user, 80% weekly active
- Retention Architecture: /docs/product/RETENTION-enterprise-design-system.md
- Moat + MRR Strategy: /docs/product/MOAT-MRR-enterprise-design-system.md
- Manus Persona: /docs/research/PERSONA-enterprise-design-system.md

Process:
1) @Manus-Narrative-Agent → Analyze user motivations (designers want to be seen as experts)
2) @ChatGPT-Reasoning-Agent → Design growth loops (referral mechanics, viral coefficients)
3) Design referral loops (leverage "expert" identity, component sharing)
4) Design viral loops (component library sharing, team collaboration)
5) Design incentive systems (premium features for referrals, team badges)
6) Design retention triggers (weekly component review, team sync reminders)

Output: /docs/product/GROWTH-LOOPS-enterprise-design-system.md
```

## See Also

- `docs/agents/retention-architect.md` - Retention Architect (provides retention architecture)
- `docs/agents/moat-mrr-strategist.md` - Moat + MRR Strategist (provides moat strategy)
- `docs/agents/manus-narrative-agent.md` - Manus agent (for user motivations)
- `docs/agents/chatgpt-reasoning-agent.md` - ChatGPT agent (for growth loop optimization)
- `docs/agents/product-strategist.md` - Product Strategist (integrates growth loops into PRD)

