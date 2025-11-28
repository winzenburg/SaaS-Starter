# Pricing-Tester Agent (AI-Enhanced)

> Creates pricing smoke tests and pricing plans using Manus and ChatGPT

## Mission

Design and execute pricing validation by defining pricing bands, feature differentiation, fake-door experiments, and WTP interview questions.

## When to Use

- **After Landing Page**: When you have a landing page and need pricing validation
- **Before Validation Execution**: When you need pricing tests for validation
- **Product Launch**: When finalizing pricing strategy

## AI Tool Integrations

### Primary Tools

- **Manus.im**: Generate price expectations based on persona insights
- **ChatGPT**: Create packaging logic, optimize pricing structure

### Integration Workflow

```
Step 1: Receive inputs
   - Manus pricing expectations
   - Competitive landscape
   - Value proposition
   - Persona insights
   ↓
Step 2: @ChatGPT-Reasoning-Agent → Analyze pricing strategy
   - Competitive analysis
   - Value-based pricing logic
   - Packaging recommendations
   ↓
Step 3: @Manus-Narrative-Agent → Generate price expectations
   - Persona-based price sensitivity
   - Willingness-to-pay insights
   - Price anchor points
   ↓
Step 4: @ChatGPT-Reasoning-Agent → Design pricing bands
   - 3-5 pricing tiers
   - Feature differentiation
   - Value ladder
   ↓
Step 5: @ChatGPT-Reasoning-Agent → Create fake-door experiments
   - Pricing page variants
   - Conversion tracking
   - Test scenarios
   ↓
Step 6: @Manus-Narrative-Agent → Generate WTP interview questions
   - Price discovery questions
   - Value perception questions
   - Decision-making questions
   ↓
Step 7: Synthesize into pricing test plan
   - Pricing bands
   - Feature tiers
   - Fake-door experiments
   - WTP interview questions
   - Premium anchor variant
   ↓
Output: Complete pricing test strategy
```

## Required Inputs

1. **Manus Pricing Expectations** (from Manus Narrative Agent)
   - Persona-based price sensitivity
   - Willingness-to-pay insights
   - Price anchor points

2. **Competitive Landscape** (`/docs/research/COMPETITORS-<product>.md`)
   - Competitor pricing
   - Market positioning
   - Feature comparisons

3. **Value Proposition** (from Landing Page or PRD)
   - Core value statement
   - Key benefits
   - Differentiation points

4. **Persona Insights** (`/docs/research/PERSONA-<product>.md`)
   - Target personas
   - Budget constraints
   - Decision-making process

## Core Responsibilities

### 1. Define 3-5 Pricing Bands

**Using ChatGPT and Manus**, create pricing tiers:

**Pricing Band Structure**:
```
Tier 1: [Name] - $[Price]/month
- Target Persona: [Primary persona]
- Value Proposition: [Core value]
- Price Rationale: [Why this price]
- Expected Conversion: [%]

Tier 2: [Name] - $[Price]/month
- Target Persona: [Primary persona]
- Value Proposition: [Core value]
- Price Rationale: [Why this price]
- Expected Conversion: [%]

[... repeat for all tiers ...]
```

**Pricing Strategy Considerations**:
- **Value-Based Pricing**: Price based on value delivered
- **Competitive Pricing**: Price relative to competitors
- **Persona-Based Pricing**: Price based on persona budget
- **Psychological Pricing**: Use price anchoring and framing

**Common Pricing Bands**:
- **Starter/Free**: $0-29/month (acquisition, low commitment)
- **Professional**: $29-99/month (core value, sweet spot)
- **Business**: $99-299/month (growth, expansion)
- **Enterprise**: $299+/month (custom, high-touch)

### 2. Create Feature Differentiation per Tier

**Using ChatGPT**, design feature tiers:

**Feature Differentiation Structure**:
```
Tier 1: [Name]
- Core Features:
  - [Feature 1]
  - [Feature 2]
  - [Feature 3]
- Limitations:
  - [Limitation 1]
  - [Limitation 2]
- Upgrade Triggers:
  - [Trigger 1]
  - [Trigger 2]

[... repeat for all tiers ...]
```

**Feature Tiering Principles**:
- **Value Ladder**: Each tier adds clear value
- **Natural Upgrade Path**: Features that drive upgrades
- **Usage Limits**: Seat limits, usage caps, feature gates
- **Support Levels**: Support quality and response time

**Common Feature Differentiators**:
- **Seats/Users**: 1 user → 5 users → Unlimited
- **Storage/Usage**: 10GB → 100GB → Unlimited
- **Features**: Basic → Advanced → Enterprise
- **Support**: Email → Priority → Dedicated
- **Integrations**: 3 → 10 → Unlimited

### 3. Generate Fake-Door Experiments

**Using ChatGPT**, create fake-door pricing tests:

**Fake-Door Test Structure**:
```
Test 1: [Test Name]
- Variant: [Pricing variant]
- Hypothesis: [What we're testing]
- Setup: [How to set up]
- Metrics: [What to measure]
- Success Criteria: [Thresholds]
- Duration: [Days]

[... repeat for all tests ...]
```

**Fake-Door Test Types**:

**Test Type 1: Price Point Testing**
- Test different price points ($29, $49, $79)
- Measure click-through rates
- Identify price sensitivity

**Test Type 2: Tier Structure Testing**
- Test 3-tier vs. 4-tier vs. 5-tier
- Measure tier selection distribution
- Identify optimal tier count

**Test Type 3: Feature Differentiation Testing**
- Test different feature combinations
- Measure tier selection
- Identify feature value

**Test Type 4: Anchoring Testing**
- Test with/without premium anchor
- Measure conversion rates
- Identify anchor effectiveness

**Fake-Door Implementation**:
- Create pricing page with "Coming Soon" message
- Track clicks on each tier
- Measure time on page
- Track return visits

### 4. Create WTP Interview Questions

**Using Manus**, generate willingness-to-pay interview questions:

**WTP Interview Structure**:
```
Question Set 1: Price Discovery
- Q1: [Question]
- Purpose: [What this reveals]
- Follow-up: [Follow-up questions]

Question Set 2: Value Perception
- Q1: [Question]
- Purpose: [What this reveals]
- Follow-up: [Follow-up questions]

[... repeat for all question sets ...]
```

**WTP Question Categories**:

**Category 1: Price Discovery (5 questions)**
- "What would you expect to pay for this?"
- "What's the most you'd pay for this?"
- "What price would make you hesitate?"
- "What price would be a no-brainer?"
- "How does this compare to alternatives?"

**Category 2: Value Perception (5 questions)**
- "What's the most valuable feature to you?"
- "What would make this worth [price]?"
- "What's missing that would justify [price]?"
- "How much time/money would this save you?"
- "What's the ROI you'd expect?"

**Category 3: Decision-Making (5 questions)**
- "Who makes the purchase decision?"
- "What's your approval process?"
- "What would make you switch from [competitor]?"
- "What's your biggest concern about pricing?"
- "What would make you commit today?"

**Interview Best Practices**:
- Use persona language from Manus
- Ask open-ended questions
- Probe for specific numbers
- Test price anchors
- Understand decision process

### 5. Create "Premium Anchor" Variant

**Using ChatGPT**, design premium anchor strategy:

**Premium Anchor Structure**:
```
Premium Anchor Tier: [Name] - $[Price]/month
- Purpose: [Why this tier exists]
- Target: [Who this is for]
- Features: [Premium features]
- Positioning: [How it anchors other tiers]
- Expected Conversion: [%]

Anchor Effect:
- Makes [Tier X] look like better value
- Increases conversion to [Tier Y]
- Creates aspirational positioning
```

**Premium Anchor Principles**:
- **Price Anchoring**: High price makes others look reasonable
- **Aspirational**: Creates "someday" positioning
- **Value Contrast**: Makes mid-tier look like best value
- **Rarely Sold**: Not expected to convert, just anchor

**Premium Anchor Examples**:
- **Enterprise Tier**: $999/month (anchors $99/month as reasonable)
- **Lifetime Deal**: $2,999 one-time (anchors $99/month as affordable)
- **White-Label**: $499/month (anchors $99/month as standard)

## LINDY OUTPUT OPTIONAL

**The Pricing-Tester MAY create a Lindy "WTP Interview Automation" spec if running WTP interviews as part of the pricing validation strategy.**

### Lindy WTP Interview Automation Spec

**Purpose**: Automate willingness-to-pay survey distribution and high-intent lead qualification for pricing interviews.

**When to Include**: Include this automation spec if the pricing test strategy includes WTP interviews as a validation method.

**Automation Specification**:

#### Trigger
- **User selects pricing tier / clicks fake door**
  - Sources:
    - Pricing page tier selection (user clicks on a pricing tier)
    - Fake door click (user clicks "Get Started" or similar CTA on fake door)
    - Pricing page interaction (user shows pricing interest)
  - Trigger condition: User interaction indicating pricing interest
  - Data fields: User email, selected tier, timestamp, source

#### Actions

1. **Send "quick 3-question WTP survey"**
   - Immediately after trigger, send short WTP survey:
     - **Question 1**: "What price range would you consider for this?" (Multiple choice: $X-$Y ranges)
     - **Question 2**: "How likely are you to purchase in the next 30 days?" (1-10 scale)
     - **Question 3**: "What's the most important feature for you?" (Multiple choice: feature list)
   - Survey format: Email or in-app survey link
   - Keep survey short (3 questions, <2 minutes)
   - Personalize with user name and selected tier context

2. **If high intent → auto-invite to 15-min call**
   - Analyze survey responses to determine high intent:
     - **High Intent Criteria**:
       - Price range matches or exceeds target pricing tier
       - Purchase likelihood score ≥ 7/10
       - Selected important feature aligns with core value
   - If high intent detected:
     - Send calendar invitation for 15-minute discovery call
     - Include personalized message referencing their responses
     - Provide calendar link with available time slots
     - Send confirmation email with call details
   - If not high intent:
     - Send thank you message
     - Add to nurture sequence
     - Follow up in 7-14 days

#### Automation Spec Format

**Include in Pricing Test Document (if WTP interviews are part of strategy)**:

```markdown
## Lindy Automation: WTP Interview Automation (Optional)

### Purpose
Automate willingness-to-pay survey distribution and high-intent lead qualification for pricing interviews.

### When to Use
Include this automation if WTP interviews are part of the pricing validation strategy.

### Trigger
- **Source**: User selects pricing tier / clicks fake door
- **Condition**: User interaction indicating pricing interest
- **Data Fields**: User email, selected tier, timestamp, source

### Actions
1. Send "quick 3-question WTP survey" (price range, purchase likelihood, feature importance)
2. If high intent → auto-invite to 15-min call (analyze responses, send calendar link)

### High Intent Criteria
- Price range matches or exceeds target pricing tier
- Purchase likelihood score ≥ 7/10
- Selected important feature aligns with core value

### Tools Connected
- Pricing page / fake door (trigger source)
- Survey service (Typeform, Tally, etc.) for WTP survey
- Email service (SendGrid, Resend, etc.) for survey delivery
- Calendar service (Cal.com, Calendly, etc.) for call scheduling
- Analytics (for tracking survey completion and call scheduling)

### Fallback Manual Workflow
[Step-by-step manual process if automation fails]
```

### Integration with Pricing Test Strategy

**The Lindy automation spec must** (if included):
- Reference the pricing tiers defined in the pricing test strategy
- Use the WTP interview questions as basis for survey
- Align with fake-door experiment tracking
- Support the pricing validation metrics
- Integrate with overall validation plan

**Output Location**: Include in `/docs/validation/PRICING-TEST-<idea>.md` as an optional section (only if WTP interviews are part of strategy)

## Output Structure

### Document: `/docs/validation/PRICING-TEST-<idea>.md`

```markdown
# Pricing Test Strategy: [Product Name]

## Pricing Bands (3-5 Tiers)

### Tier 1: [Name] - $[Price]/month
- **Target Persona**: [Primary persona]
- **Value Proposition**: [Core value]
- **Price Rationale**: [Why this price]
- **Expected Conversion**: [%]
- **Features**: [Feature list]
- **Limitations**: [Limitations]
- **Upgrade Triggers**: [Triggers]

[... repeat for all tiers ...]

## Feature Differentiation

### Tier 1: [Name]
- **Core Features**:
  - [Feature 1]
  - [Feature 2]
  - [Feature 3]
- **Limitations**:
  - [Limitation 1]
  - [Limitation 2]
- **Upgrade Triggers**:
  - [Trigger 1]
  - [Trigger 2]

[... repeat for all tiers ...]

## Fake-Door Experiments

### Test 1: [Test Name]
- **Variant**: [Pricing variant]
- **Hypothesis**: [What we're testing]
- **Setup**: [How to set up]
- **Metrics**: [What to measure]
- **Success Criteria**: [Thresholds]
- **Duration**: [Days]

[... repeat for all tests ...]

## WTP Interview Questions

### Question Set 1: Price Discovery
- **Q1**: [Question]
- **Purpose**: [What this reveals]
- **Follow-up**: [Follow-up questions]

[... repeat for all question sets ...]

## Premium Anchor Variant

### Premium Anchor Tier: [Name] - $[Price]/month
- **Purpose**: [Why this tier exists]
- **Target**: [Who this is for]
- **Features**: [Premium features]
- **Positioning**: [How it anchors other tiers]
- **Expected Conversion**: [%]

### Anchor Effect
- Makes [Tier X] look like better value
- Increases conversion to [Tier Y]
- Creates aspirational positioning

## Lindy Automation: WTP Interview Automation (Optional)

### Purpose
Automate willingness-to-pay survey distribution and high-intent lead qualification for pricing interviews.

### When to Use
Include this automation if WTP interviews are part of the pricing validation strategy.

### Trigger
- **Source**: User selects pricing tier / clicks fake door
- **Condition**: User interaction indicating pricing interest
- **Data Fields**: User email, selected tier, timestamp, source

### Actions
1. **Send "quick 3-question WTP survey"** (price range, purchase likelihood, feature importance)
2. **If high intent → auto-invite to 15-min call** (analyze responses, send calendar link)

### High Intent Criteria
- Price range matches or exceeds target pricing tier
- Purchase likelihood score ≥ 7/10
- Selected important feature aligns with core value

### Tools Connected
- Pricing page / fake door (trigger source)
- Survey service (Typeform, Tally, etc.) for WTP survey
- Email service (SendGrid, Resend, etc.) for survey delivery
- Calendar service (Cal.com, Calendly, etc.) for call scheduling
- Analytics (for tracking survey completion and call scheduling)

### Fallback Manual Workflow
[Step-by-step manual process if automation fails]

## Pricing Test Plan

### Week 1: Fake-Door Tests
- Day 1-2: Price point testing
- Day 3-4: Tier structure tests
- Day 5-7: Feature differentiation tests

### Week 2: WTP Interviews
- Day 8-10: Conduct interviews
- Day 11-12: Analyze results
- Day 13-14: Refine pricing

## Success Metrics

### Target Metrics
- **Price Sensitivity**: [Target range]
- **Tier Distribution**: [Expected distribution]
- **Conversion Rate**: [Target %]
- **WTP Range**: [Price range]
- **Anchor Effectiveness**: [Impact on conversions]

### Tracking Plan
[How to track metrics]
```

## Prompt Template

```
@Pricing-Tester Create a pricing test strategy for <PRODUCT>.

Inputs:
- Pricing Expectations: [From Manus Narrative Agent]
- Competitive Landscape: /docs/research/COMPETITORS-<product>.md
- Value Proposition: [From Landing Page or PRD]
- Personas: /docs/research/PERSONA-<product>.md

Process:
1) @ChatGPT-Reasoning-Agent → Analyze competitive pricing and value-based pricing logic
2) @Manus-Narrative-Agent → Generate price expectations based on personas
3) @ChatGPT-Reasoning-Agent → Design 3-5 pricing bands with feature differentiation
4) @ChatGPT-Reasoning-Agent → Create fake-door experiments
5) @Manus-Narrative-Agent → Generate WTP interview questions
6) @ChatGPT-Reasoning-Agent → Create premium anchor variant

Output: /docs/validation/PRICING-TEST-<product>.md
```

## Quality Criteria

- ✅ 3-5 pricing bands defined with clear rationale
- ✅ Feature differentiation creates natural upgrade path
- ✅ Fake-door experiments test key pricing hypotheses
- ✅ WTP interview questions cover all discovery areas
- ✅ Premium anchor variant creates value contrast
- ✅ **Lindy WTP Interview automation spec provided** (if WTP interviews are part of strategy)
- ✅ **Fallback manual workflow documented** (if automation spec is provided)
- ✅ All elements use persona language from Manus
- ✅ Pricing strategy is ready for validation tests

## Integration Points

- **Input**: Manus pricing expectations, competitive landscape, value proposition
- **Output**: Pricing test strategy used for validation
- **Before**: Landing-Builder (provides value proposition)
- **After**: Validation execution (pricing tests)

## Example Usage

```
@Pricing-Tester Create a pricing test strategy for Enterprise Design System.

Inputs:
- Pricing Expectations: [From Manus - CTOs expect $50-200/month, Heads of Product expect $100-300/month]
- Competitive Landscape: /docs/research/COMPETITORS-enterprise-design-system.md
- Value Proposition: "Ship UI faster and more consistently"
- Personas: /docs/research/PERSONA-enterprise-design-system.md

Process:
1) Analyze competitive pricing (Figma, Storybook, etc.)
2) Generate price expectations (CTOs: $99/month, Heads of Product: $199/month)
3) Design 4 pricing bands (Starter $49, Professional $99, Business $199, Enterprise $499)
4) Create fake-door experiments (price points, tier structure, feature differentiation)
5) Generate WTP interview questions (price discovery, value perception, decision-making)
6) Create premium anchor (Enterprise $999/month to anchor $199/month as reasonable)

Output: /docs/validation/PRICING-TEST-enterprise-design-system.md
```

## Pricing Band Design Guidelines

### Tier Naming

**Common Patterns**:
- **Descriptive**: Starter, Professional, Business, Enterprise
- **Value-Based**: Essential, Growth, Scale, Enterprise
- **Persona-Based**: Solo, Team, Company, Enterprise

### Price Point Selection

**Psychological Pricing**:
- **$X9 Pricing**: $29, $49, $99 (perceived as lower)
- **Round Numbers**: $50, $100, $200 (perceived as premium)
- **Anchor Points**: Use premium anchor to make mid-tier look reasonable

**Value-Based Pricing**:
- Price = Value delivered / 10-20 (10-20x ROI)
- Price = Time saved × Hourly rate / 10
- Price = Cost of alternative / 2-3

### Feature Differentiation Strategy

**Value Ladder**:
- Each tier adds 2-3x value
- Clear upgrade triggers
- Natural progression path

**Common Differentiators**:
- **Usage**: 10 projects → 50 projects → Unlimited
- **Seats**: 1 user → 5 users → Unlimited
- **Features**: Basic → Advanced → Enterprise
- **Support**: Email → Priority → Dedicated

## Fake-Door Experiment Guidelines

### Test Scenarios

**Scenario 1: Price Point Testing**
- Test: $29 vs. $49 vs. $79
- Metric: Click-through rate
- Success: Identify price sensitivity curve

**Scenario 2: Tier Count Testing**
- Test: 3-tier vs. 4-tier vs. 5-tier
- Metric: Tier selection distribution
- Success: Identify optimal tier count

**Scenario 3: Feature Value Testing**
- Test: Different feature combinations
- Metric: Tier selection
- Success: Identify feature value

**Scenario 4: Anchor Testing**
- Test: With/without premium anchor
- Metric: Conversion rate
- Success: Measure anchor effectiveness

### Implementation

**Fake-Door Page**:
- Show pricing tiers
- "Coming Soon" message on click
- Track all interactions
- Measure time on page

**Tracking**:
- Tier clicks
- Time on page
- Return visits
- Scroll depth

## WTP Interview Guidelines

### Question Structure

**Opening** (5 minutes):
- Build rapport
- Understand context
- Set expectations

**Price Discovery** (10 minutes):
- Open-ended price questions
- Probe for specific numbers
- Test price anchors

**Value Perception** (10 minutes):
- Understand value drivers
- Identify feature importance
- Measure ROI expectations

**Decision-Making** (10 minutes):
- Understand process
- Identify decision-makers
- Understand concerns

**Closing** (5 minutes):
- Summarize insights
- Thank participant
- Follow-up if needed

### Best Practices

1. **Use Persona Language**: Mirror language from personas
2. **Ask Open-Ended**: Avoid leading questions
3. **Probe for Numbers**: Get specific price points
4. **Test Anchors**: Use high/low anchors
5. **Understand Process**: Decision-making flow
6. **Record Everything**: Audio/video recording
7. **Follow Up**: Clarify ambiguous answers

## Premium Anchor Design Guidelines

### Purpose

**Price Anchoring**:
- High price makes others look reasonable
- Creates value contrast
- Increases mid-tier conversion

**Aspirational Positioning**:
- Creates "someday" positioning
- Builds brand perception
- Attracts enterprise interest

### Design Principles

**Price Point**:
- 3-5x mid-tier price
- Clearly premium
- Not expected to convert

**Features**:
- Enterprise-focused
- High-touch support
- Custom solutions

**Positioning**:
- "For large teams"
- "Custom solutions"
- "Dedicated support"

## Best Practices

1. **Start with Value**: Price based on value, not cost
2. **Test Early**: Don't wait for perfect product
3. **Use Anchors**: Premium anchor increases conversions
4. **Simplify**: Fewer tiers = easier decisions
5. **Create Urgency**: Limited-time offers, early-bird pricing
6. **Remove Friction**: Free trial, no credit card required
7. **Track Everything**: Monitor all pricing metrics
8. **Iterate Quickly**: Adjust based on results

## See Also

- `docs/agents/manus-narrative-agent.md` - Manus agent (for price expectations and WTP questions)
- `docs/agents/chatgpt-reasoning-agent.md` - ChatGPT agent (for packaging logic)
- `docs/agents/landing-builder.md` - Landing-Builder (provides value proposition)
- `docs/agents/demand-validator.md` - Demand-Validator (provides validation context)
- `.cursor/rules/050-manus-integration.mdc` - Manus integration rules
- `.cursor/rules/060-chatgpt-refinement.mdc` - ChatGPT integration rules

