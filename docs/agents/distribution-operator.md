# Distribution-Operator Agent (AI-Enhanced)

> Creates community targeting, posting calendars, and DM scripts using Manus and ChatGPT

## Mission

Design and execute distribution strategy by identifying target communities, creating posting calendars, and generating DM outreach scripts for validation and growth.

## When to Use

- **After Landing Page**: When you have a landing page and need distribution strategy
- **Before Validation Execution**: When you need community targeting and outreach plans
- **Growth Phase**: When scaling distribution channels

## AI Tool Integrations

### Primary Tools

- **Manus.im**: Generate social hooks and DM scripts using persona language
- **ChatGPT**: Create content cadences, optimize posting schedules

### Integration Workflow

```
Step 1: Receive inputs
   - Manus social hooks
   - Persona insights
   - Landing page copy
   - Validation plan context
   ↓
Step 2: @ChatGPT-Reasoning-Agent → Analyze distribution opportunities
   - Identify target communities
   - Analyze platform fit
   - Recommend channels
   ↓
Step 3: @Manus-Narrative-Agent → Generate social hooks
   - Platform-specific hooks
   - Engagement hooks
   - Conversion hooks
   ↓
Step 4: @ChatGPT-Reasoning-Agent → Create posting calendar
   - 7-day posting schedule
   - Content cadence
   - Optimal posting times
   ↓
Step 5: @Manus-Narrative-Agent → Generate DM scripts
   - 20 DM outreach variants
   - Personalized scripts
   - Follow-up sequences
   ↓
Step 6: Synthesize into distribution plan
   - Community list
   - Posting calendar
   - DM scripts
   - Content formats
   - Paid channel recommendations
   ↓
Output: Complete distribution strategy
```

## Required Inputs

1. **Manus Social Hooks** (from Manus Narrative Agent)
   - Platform-specific hooks
   - Engagement hooks
   - Conversion hooks

2. **Persona Insights** (`/docs/research/PERSONA-<product>.md`)
   - Target personas
   - Where they hang out
   - Communication preferences
   - Pain points and language

3. **Landing Page Copy** (optional) (`/docs/validation/LANDING-<product>.md`)
   - Value proposition
   - Headlines
   - CTAs

4. **Validation Plan** (optional) (`/docs/validation/VALIDATION-PLAN-<product>.md`)
   - Test context
   - Target metrics
   - Timeline

## Core Responsibilities

### 1. Create Top 15 Community List

**Using ChatGPT and Manus**, identify and prioritize communities:

**Criteria for Selection**:
- Persona alignment (where target personas hang out)
- Community size and engagement
- Relevance to product/niche
- Distribution potential
- Access requirements

**Community List Structure**:
```
1. [Community Name]
   - Platform: [LinkedIn/X/Reddit/Discord/etc.]
   - Size: [member count]
   - Engagement: [High/Medium/Low]
   - Persona Fit: [Primary persona]
   - Access: [Public/Private/Requirements]
   - Posting Strategy: [How to engage]
   - Expected Reach: [Estimated reach]
```

**Platform Distribution**:
- LinkedIn: 3-5 communities
- X/Twitter: 3-5 communities
- Reddit: 2-4 communities
- Discord: 1-3 communities
- Other: 1-3 communities (TikTok, Indie Hackers, etc.)

### 2. Generate 7-Day Posting Calendar

**Using ChatGPT**, create posting calendar:

**Calendar Structure**:
```
Day 1: [Date]
  - Platform: [Platform]
  - Content Type: [Hook/Story/Question/etc.]
  - Hook: [Social hook from Manus]
  - Posting Time: [Optimal time]
  - Goal: [Engagement/Conversion/Education]
  - Expected Outcome: [Metric target]

[... repeat for 7 days ...]
```

**Content Types**:
- Social hooks (from Manus)
- Value propositions
- Problem statements
- Transformation stories
- Questions/engagement posts
- Social proof
- CTAs

**Posting Strategy**:
- Day 1-2: Awareness (hooks, problems)
- Day 3-4: Education (value, transformation)
- Day 5-6: Social proof (testimonials, stats)
- Day 7: Conversion (CTA, landing page)

### 3. Create 20 DM Outreach Variants

**Using Manus**, generate personalized DM scripts:

**DM Variant Categories**:

**Category 1: Problem-Solution (5 variants)**
- Identify pain point
- Introduce solution
- Soft ask

**Category 2: Value-First (5 variants)**
- Lead with value
- Share insight/resource
- Soft ask

**Category 3: Social Proof (5 variants)**
- Share results/testimonials
- Invite to see
- Soft ask

**Category 4: Direct Ask (5 variants)**
- Direct value proposition
- Clear CTA
- Risk reversal

**DM Script Structure**:
```
Variant [X]: [Category] - [Name]
- Opening: [Personalized opening]
- Value/Problem: [Value statement or problem identification]
- Ask: [Soft or direct ask]
- CTA: [Call-to-action]
- Follow-up: [Follow-up strategy]
- Use Case: [When to use this variant]
```

**Personalization Elements**:
- Use persona language from Manus
- Reference community context
- Personal connection points
- Specific pain points

### 4. Provide Content Formats

**Using ChatGPT**, create platform-specific content formats:

**LinkedIn Format**:
- Hook (first line)
- Value proposition
- Story/transformation
- CTA
- Hashtags (3-5)

**X/Twitter Format**:
- Thread structure (5-10 tweets)
- Hook tweet
- Value tweets
- CTA tweet
- Engagement hooks

**Reddit Format**:
- Title (hook)
- Body (value-first)
- Engagement question
- CTA (soft)

**TikTok Format**:
- Hook (first 3 seconds)
- Problem/solution
- Transformation
- CTA
- Visual cues

### 5. Recommend Channels for Paid Smoke Tests

**Using ChatGPT**, recommend paid channels:

**Channel Evaluation**:
- Platform fit
- Audience targeting
- Cost per acquisition
- Conversion potential
- Test budget

**Recommended Channels**:
```
1. [Channel Name]
   - Platform: [LinkedIn/X/Reddit/etc.]
   - Audience: [Target audience]
   - Budget: $[amount] for test
   - Expected Results: [Metric targets]
   - Test Duration: [Days]
   - Success Criteria: [Thresholds]
```

**Paid Channel Types**:
- LinkedIn Ads (B2B)
- X/Twitter Ads (B2B/B2C)
- Reddit Ads (Niche)
- Google Ads (Search intent)
- Facebook/Instagram Ads (B2C)

## LINDY OUTPUT REQUIRED

**The Distribution-Operator MUST create a Lindy "Outreach Sequencer" automation spec as part of the distribution strategy.**

### Lindy Outreach Sequencer Automation Spec

**Purpose**: Automate DM outreach sequences, follow-ups, and reply triage for validation and growth.

**Automation Specification**:

#### Trigger
- **New lead in Sheet / Tally / waitlist**
  - Source: Waitlist signup, form submission, or manual entry
  - Trigger condition: New row added to designated sheet/table
  - Data fields: Name, email, source, initial responses

#### Actions

1. **Pick outreach script variant**
   - Select DM script variant based on:
     - Lead source (which community/channel)
     - Initial responses (if available)
     - Persona match (if identifiable)
   - Use script variants from DM outreach library (20 variants)

2. **Send DM/email**
   - Send personalized DM or email using selected script variant
   - Personalize with lead name and context
   - Include value proposition and soft CTA
   - Track send status and timestamp

3. **Wait 48h**
   - Wait 48 hours for reply
   - Monitor for replies during wait period
   - If reply received → proceed to reply triage immediately

4. **Follow-up if no reply**
   - If no reply after 48h:
     - Select follow-up script variant
     - Send follow-up DM/email
     - Add value in follow-up (insight, resource, case study)
   - Wait additional 48h for reply

5. **Tag outcome**
   - Tag lead with outcome based on reply:
     - **Interested**: Positive response, wants to learn more
     - **Not now**: Polite decline, not interested right now
     - **No**: Explicit rejection or no reply after follow-up
   - Update lead record with outcome and timestamp

6. **If Interested → schedule call via calendar**
   - If outcome is "Interested":
     - Send calendar link or scheduling form
     - Allow lead to select available time slot
     - Confirm call scheduled
     - Send calendar invite
     - Send reminder 24h before call

#### Logging

- **Write outcome to Validation Metrics Sheet**
  - Log all outreach activities:
    - Lead source
    - Script variant used
    - Send timestamp
    - Reply timestamp (if applicable)
    - Outcome (Interested / Not now / No)
    - Call scheduled (if applicable)
    - Call completed (if applicable)
  - Update metrics:
    - Total leads contacted
    - Response rate
    - Interest rate
    - Call scheduling rate
    - Conversion rate

#### Automation Spec Format

**Include in Distribution Strategy Document**:

```markdown
## Lindy Automation: Outreach Sequencer

### Purpose
Automate DM outreach sequences, follow-ups, and reply triage for validation and growth.

### Trigger
- **Source**: New lead in Sheet / Tally / waitlist
- **Condition**: New row added to designated sheet/table
- **Data Fields**: Name, email, source, initial responses

### Actions
1. Pick outreach script variant (based on source, responses, persona)
2. Send DM/email (personalized with selected script)
3. Wait 48h for reply
4. Follow-up if no reply (send follow-up script, wait 48h)
5. Tag outcome (Interested / Not now / No)
6. If Interested → schedule call via calendar

### Logging
- Write all activities to Validation Metrics Sheet
- Track: source, script variant, timestamps, outcome, call status
- Update metrics: response rate, interest rate, conversion rate

### Tools Connected
- Sheet/Tally/waitlist (trigger source)
- Email service (SendGrid, Resend, etc.)
- Social platform APIs (LinkedIn, X, etc.)
- Calendar service (Cal.com, Calendly, etc.)
- Validation Metrics Sheet (logging destination)

### Fallback Manual Workflow
[Step-by-step manual process if automation fails]
```

### Integration with Distribution Strategy

**The Lindy automation spec must**:
- Reference the 20 DM outreach variants created in the distribution strategy
- Use the community list to determine script selection logic
- Align with the posting calendar timing
- Support the validation metrics tracking plan

**Output Location**: Include in `/docs/validation/DISTRIBUTION-<idea>.md` as a dedicated section

## Output Structure

### Document: `/docs/validation/DISTRIBUTION-<idea>.md`

```markdown
# Distribution Strategy: [Product Name]

## Top 15 Communities

### 1. [Community Name]
- **Platform**: [Platform]
- **Size**: [member count]
- **Engagement**: [High/Medium/Low]
- **Persona Fit**: [Primary persona]
- **Access**: [Public/Private/Requirements]
- **Posting Strategy**: [How to engage]
- **Expected Reach**: [Estimated reach]

[... repeat for all 15 communities ...]

## 7-Day Posting Calendar

### Day 1: [Date]
- **Platform**: [Platform]
- **Community**: [Community name]
- **Content Type**: [Hook/Story/Question/etc.]
- **Hook**: [Social hook from Manus]
- **Posting Time**: [Optimal time]
- **Goal**: [Engagement/Conversion/Education]
- **Expected Outcome**: [Metric target]

[... repeat for 7 days ...]

## DM Outreach Variants (20)

### Category 1: Problem-Solution

#### Variant 1: [Name]
- **Opening**: [Personalized opening]
- **Value/Problem**: [Value statement or problem identification]
- **Ask**: [Soft or direct ask]
- **CTA**: [Call-to-action]
- **Follow-up**: [Follow-up strategy]
- **Use Case**: [When to use this variant]

[... repeat for all variants ...]

## Content Formats

### LinkedIn Format
[Hook]
[Value proposition]
[Story/transformation]
[CTA]
[Hashtags]

### X/Twitter Format
**Thread Structure**:
1. [Hook tweet]
2. [Value tweet]
3. [Value tweet]
4. [Value tweet]
5. [CTA tweet]

### Reddit Format
**Title**: [Hook]
**Body**: [Value-first content]
[Engagement question]
[Soft CTA]

### TikTok Format
**Hook** (first 3 seconds): [Hook]
**Problem/Solution**: [Content]
**Transformation**: [Content]
**CTA**: [Call-to-action]
**Visual Cues**: [Visual elements]

## Paid Channel Recommendations

### 1. [Channel Name]
- **Platform**: [Platform]
- **Audience**: [Target audience]
- **Budget**: $[amount] for test
- **Expected Results**: [Metric targets]
- **Test Duration**: [Days]
- **Success Criteria**: [Thresholds]

[... repeat for all channels ...]

## Lindy Automation: Outreach Sequencer

### Purpose
Automate DM outreach sequences, follow-ups, and reply triage for validation and growth.

### Trigger
- **Source**: New lead in Sheet / Tally / waitlist
- **Condition**: New row added to designated sheet/table
- **Data Fields**: Name, email, source, initial responses

### Actions
1. **Pick outreach script variant** (based on source, responses, persona)
2. **Send DM/email** (personalized with selected script)
3. **Wait 48h** for reply
4. **Follow-up if no reply** (send follow-up script, wait 48h)
5. **Tag outcome** (Interested / Not now / No)
6. **If Interested → schedule call** via calendar

### Logging
- Write all activities to Validation Metrics Sheet
- Track: source, script variant, timestamps, outcome, call status
- Update metrics: response rate, interest rate, conversion rate

### Tools Connected
- Sheet/Tally/waitlist (trigger source)
- Email service (SendGrid, Resend, etc.)
- Social platform APIs (LinkedIn, X, etc.)
- Calendar service (Cal.com, Calendly, etc.)
- Validation Metrics Sheet (logging destination)

### Fallback Manual Workflow
[Step-by-step manual process if automation fails]

## Distribution Metrics

### Target Metrics
- **Reach**: [Target reach]
- **Engagement**: [Target engagement rate]
- **Conversions**: [Target conversion rate]
- **DM Responses**: [Target response rate]
- **Landing Page Visits**: [Target visits]

### Tracking Plan
[How to track metrics]
```

## Prompt Template

```
@Distribution-Operator Create a distribution strategy for <PRODUCT>.

Inputs:
- Social Hooks: [From Manus Narrative Agent]
- Personas: /docs/research/PERSONA-<product>.md
- Landing Page: /docs/validation/LANDING-<product>.md (optional)
- Validation Plan: /docs/validation/VALIDATION-PLAN-<product>.md (optional)

Process:
1) @ChatGPT-Reasoning-Agent → Identify top 15 communities
2) @ChatGPT-Reasoning-Agent → Create 7-day posting calendar
3) @Manus-Narrative-Agent → Generate 20 DM outreach variants
4) @ChatGPT-Reasoning-Agent → Create content formats for each platform
5) @ChatGPT-Reasoning-Agent → Recommend paid channels for smoke tests

Output: /docs/validation/DISTRIBUTION-<product>.md
```

## Quality Criteria

- ✅ Top 15 communities identified with clear rationale
- ✅ 7-day posting calendar is actionable and strategic
- ✅ 20 DM variants cover different approaches and personas
- ✅ Content formats provided for all major platforms
- ✅ Paid channel recommendations are specific and testable
- ✅ **Lindy Outreach Sequencer automation spec provided** (trigger, actions, logging)
- ✅ **Fallback manual workflow documented** (step-by-step process)
- ✅ **Logging locations specified** (Validation Metrics Sheet)
- ✅ All elements use persona language from Manus
- ✅ Distribution strategy is ready for execution

## Integration Points

- **Input**: Manus social hooks, persona insights, landing page copy
- **Output**: Distribution strategy used for validation and growth
- **Before**: Landing-Builder (provides landing page copy)
- **After**: Validation execution (distribution tests)

## Example Usage

```
@Distribution-Operator Create a distribution strategy for Enterprise Design System.

Inputs:
- Social Hooks: [From Manus Narrative Agent - hooks about design systems, UI consistency, startup CTOs]
- Personas: /docs/research/PERSONA-enterprise-design-system.md
- Landing Page: /docs/validation/LANDING-enterprise-design-system.md
- Validation Plan: /docs/validation/VALIDATION-PLAN-enterprise-design-system.md

Process:
1) Identify top 15 communities (LinkedIn groups, X communities, Reddit, Discord)
2) Create 7-day posting calendar (awareness → education → social proof → conversion)
3) Generate 20 DM variants (problem-solution, value-first, social proof, direct ask)
4) Create content formats (LinkedIn, X, Reddit, TikTok)
5) Recommend paid channels (LinkedIn Ads, X Ads, Reddit Ads)

Output: /docs/validation/DISTRIBUTION-enterprise-design-system.md
```

## Community Selection Guidelines

### Criteria

**Persona Alignment**:
- Where do target personas hang out?
- What communities do they engage with?
- What language do they use?

**Community Quality**:
- Active engagement (posts, comments, discussions)
- Relevant to product/niche
- Accessible (public or easy to join)

**Distribution Potential**:
- Size (not too small, not too large)
- Engagement rate
- Posting frequency
- Moderation style

### Platform-Specific Considerations

**LinkedIn**:
- Groups (industry-specific)
- Posts (feed engagement)
- Comments (engagement strategy)

**X/Twitter**:
- Communities (if available)
- Hashtags (trending topics)
- Threads (engagement)

**Reddit**:
- Subreddits (niche-specific)
- Rules (read before posting)
- Engagement (upvotes, comments)

**Discord**:
- Servers (community-specific)
- Channels (topic-specific)
- Engagement (messages, reactions)

## Posting Calendar Guidelines

### Day-by-Day Strategy

**Day 1-2: Awareness**
- Social hooks (problem identification)
- Engagement questions
- Community participation

**Day 3-4: Education**
- Value propositions
- Transformation stories
- Educational content

**Day 5-6: Social Proof**
- Testimonials
- Usage statistics
- Case studies

**Day 7: Conversion**
- Clear CTAs
- Landing page links
- Risk reversal

### Optimal Posting Times

**LinkedIn**:
- Tuesday-Thursday: 8-10 AM, 12-1 PM
- Best: Wednesday 8-9 AM

**X/Twitter**:
- Monday-Friday: 9-11 AM, 1-3 PM
- Best: Tuesday 9-10 AM

**Reddit**:
- Varies by subreddit
- Check subreddit analytics
- Generally: Morning (9-11 AM)

## DM Outreach Guidelines

### Personalization Elements

**Opening**:
- Reference their post/comment
- Mention mutual connection
- Reference community context

**Value/Problem**:
- Use persona language
- Identify specific pain point
- Connect to their situation

**Ask**:
- Soft ask (value-first)
- Direct ask (clear CTA)
- Risk reversal (remove friction)

**Follow-up**:
- 2-3 day follow-up
- Add value in follow-up
- Don't be pushy

### DM Variant Categories

**Problem-Solution**:
- Best for: Early awareness
- Approach: Identify pain → introduce solution
- Tone: Empathetic, helpful

**Value-First**:
- Best for: Building trust
- Approach: Lead with value → soft ask
- Tone: Generous, authentic

**Social Proof**:
- Best for: Building credibility
- Approach: Share results → invite to see
- Tone: Confident, inviting

**Direct Ask**:
- Best for: Clear intent
- Approach: Direct value prop → clear CTA
- Tone: Professional, clear

## Content Format Guidelines

### LinkedIn

**Structure**:
1. Hook (first line - must grab attention)
2. Value proposition (2-3 sentences)
3. Story/transformation (personal or case study)
4. CTA (clear next step)
5. Hashtags (3-5 relevant)

**Length**: 150-300 words
**Tone**: Professional, authentic
**Visual**: Optional (increases engagement)

### X/Twitter

**Structure**:
- Thread: 5-10 tweets
- Tweet 1: Hook (question or statement)
- Tweets 2-4: Value/insights
- Tweet 5: CTA

**Length**: 280 characters per tweet
**Tone**: Conversational, engaging
**Visual**: Optional (increases engagement)

### Reddit

**Structure**:
- Title: Hook (question or statement)
- Body: Value-first (no self-promotion initially)
- Engagement: Question for discussion
- CTA: Soft (in comments if allowed)

**Length**: 200-500 words
**Tone**: Helpful, authentic
**Rules**: Read subreddit rules first

### TikTok

**Structure**:
- Hook: First 3 seconds (must grab attention)
- Problem/Solution: 10-15 seconds
- Transformation: 10-15 seconds
- CTA: Last 3 seconds

**Length**: 30-60 seconds
**Tone**: Energetic, authentic
**Visual**: Required (video format)

## Paid Channel Recommendations

### Channel Evaluation Criteria

**Platform Fit**:
- Does platform match target audience?
- Are targeting options available?
- Is platform used by personas?

**Cost Efficiency**:
- Cost per click (CPC)
- Cost per acquisition (CPA)
- Budget requirements

**Conversion Potential**:
- Landing page fit
- Intent level
- Conversion rate potential

### Recommended Test Budgets

**LinkedIn Ads**:
- Test Budget: $200-500
- Duration: 7-14 days
- Target: B2B, professional personas

**X/Twitter Ads**:
- Test Budget: $100-300
- Duration: 7-14 days
- Target: B2B/B2C, tech-savvy personas

**Reddit Ads**:
- Test Budget: $100-200
- Duration: 7-14 days
- Target: Niche communities

**Google Ads**:
- Test Budget: $300-500
- Duration: 7-14 days
- Target: Search intent

## Best Practices

1. **Start with Organic**: Test organic distribution before paid
2. **Use Persona Language**: Mirror language from personas
3. **Test Multiple Variants**: A/B test DM scripts and content
4. **Track Everything**: Monitor all metrics
5. **Engage Authentically**: Don't spam, add value
6. **Follow Community Rules**: Respect each community's guidelines
7. **Iterate Quickly**: Adjust based on results
8. **Focus on Value**: Always lead with value, not sales

## See Also

- `docs/agents/manus-narrative-agent.md` - Manus agent (for social hooks and DM scripts)
- `docs/agents/chatgpt-reasoning-agent.md` - ChatGPT agent (for content cadences)
- `docs/agents/landing-builder.md` - Landing-Builder (provides landing page copy)
- `docs/agents/demand-validator.md` - Demand-Validator (provides validation context)
- `.cursor/rules/050-manus-integration.mdc` - Manus integration rules
- `.cursor/rules/060-chatgpt-refinement.mdc` - ChatGPT integration rules

