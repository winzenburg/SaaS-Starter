# Demand-Validator Agent (AI-Enhanced)

> Synthesizes Manus.im narrative + ChatGPT refinement into a complete validation plan

## Mission

Define validation strategy, tests, thresholds, and kill/pivot rules by synthesizing AI-generated narratives and personas into actionable validation plans.

## When to Use

- **After Narrative Generation**: When you have Manus-generated narrative and personas
- **Before Validation Execution**: When you need a structured validation plan
- **Portfolio Prioritization**: When scoring ideas and planning validation sprints

## AI Tool Integrations

### Primary Tools

- **Manus.im**: Extract JTBD, persona language, frustrations, emotional drivers
- **ChatGPT**: Refine validation strategy, analyze test design, optimize thresholds

### Integration Workflow

```
Step 1: Receive Manus outputs
   - Narrative document
   - Persona profiles
   - Competitor analysis
   ↓
Step 2: Extract key elements
   - JTBD from narrative
   - Persona language and frustrations
   - Emotional drivers
   - Identity-level pain points
   ↓
Step 3: @ChatGPT-Reasoning-Agent → Design validation tests
   - Analyze narrative for test opportunities
   - Design 8-12 validation tests
   - Define test thresholds
   ↓
Step 4: Create validation plan
   - 7-14 day sprint plan
   - Kill/pivot/proceed rules
   - Test sequencing
   ↓
Output: Complete validation plan
```

## Required Inputs

1. **Manus Narrative Output** (`/docs/product/NARRATIVE-<product>.md`)
   - Narrative variations
   - Selected narrative
   - Identity-level pain connection

2. **Manus Persona Output** (`/docs/research/PERSONA-<product>.md`)
   - Persona profiles
   - Identity-level motivations
   - Emotional drivers
   - Frustrations

3. **Manus Competitor Output** (optional) (`/docs/research/COMPETITORS-<product>.md`)
   - Competitor positioning
   - Differentiation opportunities

## Core Responsibilities

### 1. Extract Key Elements from Manus Output

**From Narrative**:
- Job-to-be-Done (JTBD)
- Identity-level pain points
- Emotional drivers
- Value proposition language

**From Personas**:
- Persona language and terminology
- Frustrations and pain points
- Emotional motivations
- Communication preferences
- Where they hang out (for outreach)

**From Competitors** (if available):
- Positioning gaps
- Differentiation opportunities
- Market messaging insights

### 2. Define 8-12 Validation Tests

**Required Test Types**:

1. **Social Narrative Tests**
   - Test narrative resonance on social platforms
   - Measure engagement, shares, comments
   - Validate emotional connection

2. **Fake Door Tests**
   - Test demand without building
   - Measure click-through rates
   - Validate interest level

3. **Landing/Waitlist Test**
   - Landing page with waitlist signup
   - Measure conversion rates
   - Validate willingness to wait

4. **DM Outreach Test**
   - Direct message to target personas
   - Measure response rates
   - Validate personal interest

5. **Concierge MVP Test**
   - Manual service delivery
   - Measure usage and feedback
   - Validate core value proposition

6. **Prepayment/Preorder Test**
   - Ask for payment before building
   - Measure conversion rates
   - Validate willingness to pay

**Additional Test Types** (as needed):
- Community engagement tests
- Content validation tests
- Feature prioritization tests
- Pricing validation tests
- Referral tests
- Partnership tests

### 3. Define Test Thresholds

For each test, define:

**Success Threshold**:
- Minimum metric to consider test passed
- Example: 10% conversion rate, 50 signups, 5 preorders

**Kill Threshold**:
- Maximum metric below which idea should be killed
- Example: <2% conversion, <10 signups, 0 preorders

**Pivot Threshold**:
- Range where idea needs significant changes
- Example: 2-5% conversion, 10-30 signups

**Proceed Threshold**:
- Metric indicating strong validation
- Example: >10% conversion, >50 signups, >5 preorders

### 4. Create Kill/Pivot/Proceed Rules

**Kill Rules** (Stop immediately):
- Multiple tests fail kill thresholds
- No willingness to pay
- No emotional connection
- Negative feedback from target personas

**Pivot Rules** (Major changes needed):
- Tests show interest but wrong approach
- Narrative doesn't resonate
- Wrong target persona
- Value proposition unclear

**Proceed Rules** (Continue to next phase):
- Multiple tests pass proceed thresholds
- Strong willingness to pay
- Clear emotional connection
- Positive feedback from target personas

### 5. Create 7-14 Day Sprint Plan

**Sprint Structure**:

**Week 1: Quick Wins**
- Day 1-2: Social narrative tests
- Day 3-4: Fake door tests
- Day 5-7: Landing/waitlist test

**Week 2: Deep Validation**
- Day 8-9: DM outreach test
- Day 10-12: Concierge MVP test
- Day 13-14: Prepayment/preorder test

**Daily Check-ins**:
- Review test results
- Adjust thresholds if needed
- Make kill/pivot/proceed decisions
- Update sprint plan

## LINDY OUTPUT REQUIRED

**The Demand-Validator MUST create a Lindy "Validation Logger" automation spec as part of the validation plan.**

### Lindy Validation Logger Automation Spec

**Purpose**: Automate validation metrics collection, threshold comparison, and daily reporting for validation sprints.

**Automation Specification**:

#### Trigger
- **New form response / DM tag / ad result update**
  - Sources:
    - Form responses (waitlist signups, survey responses, feedback forms)
    - DM tags (outreach outcomes: Interested / Not now / No)
    - Ad result updates (conversions, clicks, impressions from paid tests)
  - Trigger condition: New data point added to any validation test source
  - Data fields: Test type, metric value, timestamp, source

#### Actions

1. **Compute rolling conversion + reply rates**
   - Calculate rolling metrics for each test type:
     - **Conversion rates**: Landing page, waitlist, prepayment tests
     - **Reply rates**: DM outreach, email campaigns
     - **Engagement rates**: Social narrative tests, content tests
     - **Click-through rates**: Fake door tests, ad tests
   - Rolling window: Last 7 days, last 14 days, all-time
   - Update metrics in real-time as new data arrives

2. **Compare to thresholds**
   - For each test, compare current metrics to defined thresholds:
     - **Success Threshold**: Minimum metric for test passed
     - **Kill Threshold**: Maximum metric below which idea should be killed
     - **Pivot Threshold**: Range where idea needs significant changes
     - **Proceed Threshold**: Metric indicating strong validation
   - Flag tests that cross thresholds (success, kill, pivot, proceed)
   - Generate alerts for kill/pivot thresholds

3. **Post daily summary to Slack/email**
   - Generate daily summary report with:
     - All test results (current metrics vs thresholds)
     - Threshold status (which tests passed/failed thresholds)
     - Kill/pivot/proceed recommendations
     - Key insights and trends
     - Next actions required
   - Send summary to:
     - Slack channel (specified in validation plan)
     - Email (founder/team email addresses)
   - Schedule: Daily at specified time (e.g., 9 AM)

#### Logging

- **Append to RESULTS-<idea>.md outline + Sheet**
  - **RESULTS Document**: Append daily summary to `/docs/validation/RESULTS-<idea>.md`
    - Format: Markdown with date, metrics, thresholds, status, insights
    - Structure: Follow RESULTS document outline
    - Append mode: Add new entry without overwriting previous data
  - **Validation Metrics Sheet**: Update Sheet with:
    - Raw data points (test type, metric, timestamp, source)
    - Calculated metrics (rolling rates, thresholds comparison)
    - Daily summary data
    - Threshold status flags
  - **Data Sync**: Ensure RESULTS doc and Sheet stay in sync

#### Automation Spec Format

**Include in Validation Plan Document**:

```markdown
## Lindy Automation: Validation Logger

### Purpose
Automate validation metrics collection, threshold comparison, and daily reporting for validation sprints.

### Trigger
- **Sources**: New form response / DM tag / ad result update
- **Condition**: New data point added to any validation test source
- **Data Fields**: Test type, metric value, timestamp, source

### Actions
1. Compute rolling conversion + reply rates (7-day, 14-day, all-time)
2. Compare to thresholds (success, kill, pivot, proceed)
3. Post daily summary to Slack/email

### Logging
- Append daily summary to RESULTS-<idea>.md outline
- Update Validation Metrics Sheet with raw data and calculated metrics
- Keep RESULTS doc and Sheet in sync

### Tools Connected
- Form services (Tally, Google Forms, Typeform, etc.)
- Social platform APIs (LinkedIn, X, etc.) for DM tags
- Ad platform APIs (Meta, Google, LinkedIn Ads) for ad results
- Slack API (for daily summaries)
- Email service (SendGrid, Resend, etc.)
- Google Sheets API (for metrics logging)
- File system (for RESULTS document updates)

### Fallback Manual Workflow
[Step-by-step manual process if automation fails]
```

### Integration with Validation Plan

**The Lindy automation spec must**:
- Reference all validation tests defined in the validation plan
- Use the thresholds defined for each test
- Support the 7-14 day sprint plan timeline
- Align with kill/pivot/proceed rules
- Integrate with daily check-in process

**Output Location**: Include in `/docs/validation/VALIDATION-PLAN-<idea>.md` as a dedicated section

## Output Structure

### Document: `/docs/validation/VALIDATION-PLAN-<idea>.md`

```markdown
# Validation Plan: [Product Name]

## Extracted Elements from Manus Output

### Job-to-be-Done
[Extracted JTBD from narrative]

### Persona Language
[Key terminology and language from personas]

### Frustrations
[List of frustrations from personas]

### Emotional Drivers
[Identity-level motivations]

### Identity-Level Pain Points
[Pain points that connect to identity]

## Validation Tests (8-12 tests)

### Test 1: Social Narrative Test
- **Purpose**: [Test narrative resonance]
- **Method**: [How to execute]
- **Metrics**: [What to measure]
- **Success Threshold**: [Metric for success]
- **Kill Threshold**: [Metric for kill]
- **Pivot Threshold**: [Metric for pivot]
- **Proceed Threshold**: [Metric for proceed]

[... repeat for all tests ...]

## Kill/Pivot/Proceed Rules

### Kill Rules
- [Rule 1]
- [Rule 2]
- [Rule 3]

### Pivot Rules
- [Rule 1]
- [Rule 2]
- [Rule 3]

### Proceed Rules
- [Rule 1]
- [Rule 2]
- [Rule 3]

## 7-14 Day Sprint Plan

### Week 1: Quick Wins
- **Day 1-2**: [Test name]
- **Day 3-4**: [Test name]
- **Day 5-7**: [Test name]

### Week 2: Deep Validation
- **Day 8-9**: [Test name]
- **Day 10-12**: [Test name]
- **Day 13-14**: [Test name]

## Lindy Automation: Validation Logger

### Purpose
Automate validation metrics collection, threshold comparison, and daily reporting for validation sprints.

### Trigger
- **Sources**: New form response / DM tag / ad result update
- **Condition**: New data point added to any validation test source
- **Data Fields**: Test type, metric value, timestamp, source

### Actions
1. **Compute rolling conversion + reply rates** (7-day, 14-day, all-time)
2. **Compare to thresholds** (success, kill, pivot, proceed)
3. **Post daily summary** to Slack/email

### Logging
- Append daily summary to RESULTS-<idea>.md outline
- Update Validation Metrics Sheet with raw data and calculated metrics
- Keep RESULTS doc and Sheet in sync

### Tools Connected
- Form services (Tally, Google Forms, Typeform, etc.)
- Social platform APIs (LinkedIn, X, etc.) for DM tags
- Ad platform APIs (Meta, Google, LinkedIn Ads) for ad results
- Slack API (for daily summaries)
- Email service (SendGrid, Resend, etc.)
- Google Sheets API (for metrics logging)
- File system (for RESULTS document updates)

### Fallback Manual Workflow
[Step-by-step manual process if automation fails]

## Daily Check-in Template

### Day [X] Results
- **Test**: [Test name]
- **Results**: [Metrics]
- **Decision**: [Kill/Pivot/Proceed]
- **Next Steps**: [Actions]
```

## Prompt Template

```
@Demand-Validator Create a validation plan for <PRODUCT>.

Inputs:
- Narrative: /docs/product/NARRATIVE-<product>.md
- Personas: /docs/research/PERSONA-<product>.md
- Competitors: /docs/research/COMPETITORS-<product>.md (optional)

Process:
1) Extract JTBD, persona language, frustrations, emotional drivers from Manus output
2) @ChatGPT-Reasoning-Agent → Design 8-12 validation tests
3) Define test thresholds (success, kill, pivot, proceed)
4) Create kill/pivot/proceed rules
5) Create 7-14 day sprint plan

Output: /docs/validation/VALIDATION-PLAN-<product>.md
```

## Quality Criteria

- ✅ All key elements extracted from Manus output
- ✅ 8-12 validation tests defined (covering all required types)
- ✅ Clear thresholds for each test
- ✅ Kill/pivot/proceed rules are specific and actionable
- ✅ Sprint plan is realistic and executable
- ✅ Tests are sequenced logically
- ✅ **Lindy Validation Logger automation spec provided** (trigger, actions, logging)
- ✅ **Fallback manual workflow documented** (step-by-step process)
- ✅ **Logging locations specified** (RESULTS doc + Sheet)
- ✅ Plan is ready for immediate execution

## Integration Points

- **Input**: Manus narrative, personas, competitor analysis
- **Output**: Validation plan used by validation execution
- **Before**: Manus Narrative Agent, ChatGPT Reasoning Agent
- **After**: Validation execution, Portfolio Prioritizer (for scoring)

## Example Usage

```
@Demand-Validator Create a validation plan for Enterprise Design System.

Inputs:
- Narrative: /docs/product/NARRATIVE-enterprise-design-system.md
- Personas: /docs/research/PERSONA-enterprise-design-system.md
- Competitors: /docs/research/COMPETITORS-enterprise-design-system.md

Process:
1) Extract JTBD: "Help me ship UI consistently and faster"
2) Extract persona language: "CTO", "Head of Product", "design system", "component library"
3) Extract frustrations: "Inconsistent UI", "slow development", "technical debt"
4) Extract emotional drivers: "Want to be seen as leader who ships fast"
5) @ChatGPT-Reasoning-Agent → Design 10 validation tests
6) Define thresholds for each test
7) Create kill/pivot/proceed rules
8) Create 14-day sprint plan

Output: /docs/validation/VALIDATION-PLAN-enterprise-design-system.md
```

## Test Design Guidelines

### Social Narrative Tests

**Purpose**: Test if narrative resonates emotionally

**Methods**:
- Twitter/X thread with narrative
- LinkedIn post with narrative
- Indie Hackers post
- Reddit post in relevant community

**Metrics**:
- Engagement rate
- Shares/retweets
- Comments (quality over quantity)
- DMs expressing interest

**Thresholds**:
- Kill: <5% engagement, <3 shares, no DMs
- Pivot: 5-10% engagement, 3-10 shares, 1-2 DMs
- Proceed: >10% engagement, >10 shares, >3 DMs

### Fake Door Tests

**Purpose**: Test demand without building

**Methods**:
- "Coming Soon" page with signup
- Feature button that shows "Coming Soon"
- Pricing page with "Not Available Yet"

**Metrics**:
- Click-through rate
- Signup rate
- Time on page
- Return visits

**Thresholds**:
- Kill: <2% CTR, <1% signup
- Pivot: 2-5% CTR, 1-3% signup
- Proceed: >5% CTR, >3% signup

### Landing/Waitlist Test

**Purpose**: Test willingness to wait

**Methods**:
- Landing page with value proposition
- Waitlist signup form
- Email sequence for waitlist

**Metrics**:
- Conversion rate (visitor → signup)
- Email open rate
- Email engagement
- Referral rate

**Thresholds**:
- Kill: <5% conversion, <20 signups
- Pivot: 5-10% conversion, 20-50 signups
- Proceed: >10% conversion, >50 signups

### DM Outreach Test

**Purpose**: Test personal interest

**Methods**:
- Direct message to target personas
- Personalized pitch using persona language
- Ask for feedback or interest

**Metrics**:
- Response rate
- Positive response rate
- Willingness to pay expressed
- Referral offers

**Thresholds**:
- Kill: <20% response, <5% positive
- Pivot: 20-40% response, 5-15% positive
- Proceed: >40% response, >15% positive

### Concierge MVP Test

**Purpose**: Test core value proposition manually

**Methods**:
- Manual service delivery
- Personal interaction with users
- Collect feedback and usage data

**Metrics**:
- Usage frequency
- Feature requests
- Willingness to pay
- Referral rate

**Thresholds**:
- Kill: <50% weekly usage, no WTP
- Pivot: 50-70% usage, unclear WTP
- Proceed: >70% usage, clear WTP

### Prepayment/Preorder Test

**Purpose**: Test willingness to pay

**Methods**:
- Ask for payment before building
- Preorder offer
- Early access pricing

**Metrics**:
- Conversion rate
- Average order value
- Payment completion rate

**Thresholds**:
- Kill: 0% conversion, 0 preorders
- Pivot: 1-3% conversion, 1-3 preorders
- Proceed: >3% conversion, >5 preorders

## Best Practices

1. **Start with Quick Wins** - Social and fake door tests first
2. **Use Persona Language** - Mirror language from personas in tests
3. **Test Emotional Connection** - Not just functional needs
4. **Set Clear Thresholds** - Avoid ambiguity in decisions
5. **Make Decisions Fast** - Don't wait for perfect data
6. **Document Everything** - Track all test results
7. **Iterate on Tests** - Improve tests based on learnings

## See Also

- `docs/agents/manus-narrative-agent.md` - Manus agent (provides inputs)
- `docs/agents/chatgpt-reasoning-agent.md` - ChatGPT agent (for test design)
- `.cursor/rules/200-playbook-insight-validation.mdc` - Validation playbook

