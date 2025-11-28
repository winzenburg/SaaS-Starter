# Master Validation Prompt

> Unified, best-in-class master prompt for AI Super-Stack Demand Validation Sprint

## Usage

Copy this prompt, replace `<INSERT IDEA>` with your product idea, and execute in Cursor.

---

## The Prompt

```
I am running the AI Super-Stack Demand Validation Sprint for a SaaS idea.

Tools available:
- Manus.im (market + persona + narrative analysis)
- ChatGPT (reasoning + refinement)
- Cursor 2.1 (multi-agent execution)
- Midjourney/Canva (visuals)
- ElevenLabs (voice)
- Next.js/React for landing pages

Goal:
Generate a fully operational validation sprint for this idea.

Idea:
<INSERT IDEA>

Deliverables:
1. Persona + JTBD extraction
2. Pain language dictionary
3. Competitor landscape + gaps
4. Pricing expectations
5. Value props + hooks
6. Social post library
7. DM outreach library
8. Landing copy + visuals
9. Audio script for ElevenLabs
10. Validation plan + tests + thresholds
11. Distribution plan
12. Results logging sheet

Process:
Follow the Unified Pipeline (docs/UNIFIED-PIPELINE.md):

Step 1: Manus
- @Manus-Narrative-Agent → Generate narrative, persona, competitor analysis
- Extract: JTBD, pain language, emotional drivers, pricing signals, social hooks
- Output: /docs/product/NARRATIVE-<idea-slug>.md, /docs/research/PERSONA-<idea-slug>.md, /docs/research/COMPETITORS-<idea-slug>.md

Step 2: ChatGPT
- @ChatGPT-Reasoning-Agent → Refine and synthesize Manus outputs
- Create Validation Pack with all extracted elements
- Output: /docs/validation/VALIDATION-PACK-<idea-slug>.md

Step 3: Cursor Multi-Agent Workflow
- @Demand-Validator → Create validation plan with 8-12 tests, thresholds, kill/pivot/proceed rules, 7-14 day sprint
- @Landing-Builder → Create landing page copy, 5 hero variants, A/B headlines, visual prompts, ElevenLabs script
- @Distribution-Operator → Create top 15 communities, 7-day posting calendar, 20 DM variants, content formats, paid channels
- @Pricing-Tester → Create 3-5 pricing bands, feature differentiation, fake-door experiments, WTP questions, premium anchor
- (Optional) @Growth-Loop-Agent → Create referral mechanisms, viral loops, incentive systems, retention triggers
- Output: /docs/validation/VALIDATION-PLAN-<idea-slug>.md, /docs/validation/LANDING-<idea-slug>.md, /docs/validation/DISTRIBUTION-<idea-slug>.md, /docs/validation/PRICING-TEST-<idea-slug>.md

Step 4: Midjourney/Canva
- @Visual-Asset-Agent → Generate hero images, social ad visuals, thumbnails
- Use prompts from Landing-Builder output
- Output: /docs/product/VISUALS-<idea-slug>/hero/, /docs/product/VISUALS-<idea-slug>/social/, /docs/product/VISUALS-<idea-slug>/thumbnails/

Step 5: ElevenLabs
- @ElevenLabs-Voice-Agent → Generate founder intro audio, demo narration, social voice segments
- Use scripts from Landing-Builder output
- Output: /docs/product/FOUNDER-INTRO-<idea-slug>.mp3, /docs/product/DEMO-NARRATION-<idea-slug>.mp3, /docs/product/SOCIAL-VOICE-<idea-slug>/*.mp3

Step 6: Results Logging Sheet
- Create results tracking template
- Output: /docs/validation/RESULTS-<idea-slug>.md (template)

Quality Gates:
- All Manus outputs must be high-quality (narrative, persona, competitor, pricing, hooks)
- Validation Pack must synthesize all elements clearly
- All validation documents must be complete and actionable
- Visual assets must be generated and optimized
- Voice content must be generated with transcripts
- Results logging sheet must be ready for execution

Rules to Follow:
- Rule 040 (Demand Validation): No feature enters production without passing validation thresholds
- Rule 050 (Manus Consumption): Extract pain language, JTBD, competitor gaps, emotional desires, pricing signals, personas
- Rule 060 (ElevenLabs Integration): Include founder intro script, demo narration scripts, social voice segments
- Rule 070 (Midjourney/Canva): Produce hero image prompts, dashboard/app mock prompts, social ad visuals, thumbnail prompts
- Rule 080 (Distribution): Every idea gets a distribution map (community list, posting sequences, DM templates, platform hooks)

Begin execution.
```

---

## Detailed Deliverables Checklist

### 1. Persona + JTBD Extraction

**Source**: Manus outputs  
**Agent**: `@Manus-Narrative-Agent`  
**Output**: `/docs/research/PERSONA-<idea-slug>.md`

**Must Include**:
- Persona profiles with identity-level motivations
- Job-to-be-Done (JTBD) extracted from narrative/persona
- Job triggers, context, frequency, steps
- Success criteria for job completion

### 2. Pain Language Dictionary

**Source**: Manus persona outputs  
**Agent**: `@Manus-Narrative-Agent`  
**Output**: Extracted in `/docs/validation/VALIDATION-PACK-<idea-slug>.md`

**Must Include**:
- Direct quotes of pain language (exact words users use)
- Frustration statements
- "I wish..." statements
- Problem descriptions in user's own words
- Identity-level pain points

### 3. Competitor Landscape + Gaps

**Source**: Manus competitor analysis  
**Agent**: `@Manus-Narrative-Agent`  
**Output**: `/docs/research/COMPETITORS-<idea-slug>.md`

**Must Include**:
- Competitor positioning and narratives
- Positioning gaps (where competitors are weak)
- Messaging gaps (what competitors don't say)
- Feature gaps (what competitors don't offer)
- Differentiation opportunities

### 4. Pricing Expectations

**Source**: Manus persona outputs  
**Agent**: `@Manus-Narrative-Agent`  
**Output**: Extracted in `/docs/validation/VALIDATION-PACK-<idea-slug>.md` and `/docs/validation/PRICING-TEST-<idea-slug>.md`

**Must Include**:
- Price expectations (what price range users expect)
- Willingness to pay (how much users are willing to pay)
- Budget authority (does user have budget authority?)
- Pricing triggers (what pricing model resonates?)
- Value anchors (what users compare price to?)

### 5. Value Props + Hooks

**Source**: Manus narrative outputs  
**Agent**: `@Manus-Narrative-Agent`  
**Output**: Extracted in `/docs/validation/VALIDATION-PACK-<idea-slug>.md` and `/docs/validation/LANDING-<idea-slug>.md`

**Must Include**:
- Value propositions (transformation narrative, before/after story)
- Social hooks (platform-specific hooks for LinkedIn, X, Reddit, TikTok)
- Emotional hooks (identity-level motivations, aspirations)
- Engagement hooks (questions, statements that drive engagement)

### 6. Social Post Library

**Source**: Distribution-Operator output  
**Agent**: `@Distribution-Operator`  
**Output**: `/docs/validation/DISTRIBUTION-<idea-slug>.md`

**Must Include**:
- 7-day posting calendar with posts for each day
- Platform-specific content formats (LinkedIn, X, Reddit, TikTok)
- Posting times optimized for each platform
- Content types (hooks, value props, stories, questions, CTAs)
- Engagement strategies

### 7. DM Outreach Library

**Source**: Distribution-Operator output  
**Agent**: `@Distribution-Operator`  
**Output**: `/docs/validation/DISTRIBUTION-<idea-slug>.md`

**Must Include**:
- 20 DM outreach variants covering 4 categories:
  - Problem-Solution (5 variants)
  - Value-First (5 variants)
  - Social Proof (5 variants)
  - Direct Ask (5 variants)
- Personalization elements (persona language, community context, pain points)
- Follow-up sequences (2-3 day follow-up strategies)
- Use case guidance (when to use each variant)

### 8. Landing Copy + Visuals

**Source**: Landing-Builder output  
**Agent**: `@Landing-Builder`  
**Output**: `/docs/validation/LANDING-<idea-slug>.md` + optional Next.js code

**Must Include**:
- 5 hero section variants (from Manus)
- Offer framing and transformation narrative (from Manus)
- A/B headline variants (from Manus)
- Visual prompts for Midjourney/Canva
- Generated visual assets (hero images, social visuals)
- Optional Next.js landing page code

### 9. Audio Script for ElevenLabs

**Source**: Landing-Builder output  
**Agent**: `@Landing-Builder` + `@ElevenLabs-Voice-Agent`  
**Output**: Scripts in `/docs/validation/LANDING-<idea-slug>.md`, Audio in `/docs/product/FOUNDER-INTRO-<idea-slug>.mp3`

**Must Include**:
- Founder intro script (30-60 seconds)
- Demo narration script (2-3 minutes)
- Social voice segments (5-30 seconds each)
- Voice settings (stability, similarity, style)
- Full transcripts for accessibility

### 10. Validation Plan + Tests + Thresholds

**Source**: Demand-Validator output  
**Agent**: `@Demand-Validator`  
**Output**: `/docs/validation/VALIDATION-PLAN-<idea-slug>.md`

**Must Include**:
- 8-12 validation tests:
  - Social narrative tests
  - Fake door tests
  - Landing/waitlist test
  - DM outreach test
  - Concierge MVP test
  - Prepayment/preorder test
- Test thresholds (success, kill, pivot, proceed)
- Kill/pivot/proceed rules
- 7-14 day sprint plan

### 11. Distribution Plan

**Source**: Distribution-Operator output  
**Agent**: `@Distribution-Operator`  
**Output**: `/docs/validation/DISTRIBUTION-<idea-slug>.md`

**Must Include**:
- Top 15 community list (prioritized, actionable)
- 7-day posting sequence (strategic flow: Awareness → Education → Social Proof → Conversion)
- 20 DM templates (personalized, varied)
- Platform-by-platform hooks (LinkedIn, X, Reddit, TikTok, Discord)
- Paid channel recommendations

### 12. Results Logging Sheet

**Source**: Template created  
**Agent**: Manual creation  
**Output**: `/docs/validation/RESULTS-<idea-slug>.md` (template)

**Must Include**:
- Test results tracking (metrics, outcomes)
- Threshold analysis (met/not met)
- Kill/pivot/proceed decision framework
- Next steps planning
- Metrics dashboard

---

## Execution Workflow

### Phase 1: Manus Analysis (Step 1)

```
@Manus-Narrative-Agent Create narrative and persona analysis for <IDEA>.

Use Manus.im to:
1) Generate 3-5 narrative variations that connect identity-level pain to solution
2) Analyze competitor narratives and positioning
3) Develop detailed personas with identity-level motivations
4) Extract pricing expectations and willingness to pay
5) Generate social hooks for distribution

Output:
- /docs/product/NARRATIVE-<idea-slug>.md
- /docs/research/COMPETITORS-<idea-slug>.md
- /docs/research/PERSONA-<idea-slug>.md
```

### Phase 2: ChatGPT Refinement (Step 2)

```
@ChatGPT-Reasoning-Agent Synthesize and refine Manus outputs into a Validation Pack.

Inputs:
- Narrative: /docs/product/NARRATIVE-<idea-slug>.md
- Persona: /docs/research/PERSONA-<idea-slug>.md
- Competitor: /docs/research/COMPETITORS-<idea-slug>.md

Process:
1) Synthesize narrative, persona, and competitor insights
2) Extract key elements:
   - Persona + JTBD extraction
   - Pain language dictionary
   - Competitor landscape + gaps
   - Pricing expectations
   - Value props + hooks
3) Structure insights for validation use
4) Create Validation Pack document

Output: /docs/validation/VALIDATION-PACK-<idea-slug>.md
```

### Phase 3: Cursor Multi-Agent Workflow (Step 3)

#### 3a: Demand-Validator

```
@Demand-Validator Create validation plan for <IDEA>.

Inputs:
- Validation Pack: /docs/validation/VALIDATION-PACK-<idea-slug>.md

Process:
1) Extract JTBD, persona language, frustrations, emotional drivers
2) @ChatGPT-Reasoning-Agent → Design 8-12 validation tests
3) Define test thresholds (success, kill, pivot, proceed)
4) Create kill/pivot/proceed rules
5) Generate 7-14 day sprint plan

Output: /docs/validation/VALIDATION-PLAN-<idea-slug>.md
```

#### 3b: Landing-Builder

```
@Landing-Builder Create landing page for <IDEA>.

Inputs:
- Validation Pack: /docs/validation/VALIDATION-PACK-<idea-slug>.md
- Validation Plan: /docs/validation/VALIDATION-PLAN-<idea-slug>.md

Process:
1) @Manus-Narrative-Agent → Generate 5 hero section variants
2) @Manus-Narrative-Agent → Generate offer framing and transformation narrative
3) @Manus-Narrative-Agent → Create A/B headline variants
4) Generate visual prompts for Midjourney/Canva
5) Generate ElevenLabs "founder intro" script
6) (Optional) Generate Next.js landing page code

Output:
- /docs/validation/LANDING-<idea-slug>.md
- (Optional) /app/(marketing)/<idea-slug>/page.tsx
```

#### 3c: Distribution-Operator

```
@Distribution-Operator Create distribution strategy for <IDEA>.

Inputs:
- Validation Pack: /docs/validation/VALIDATION-PACK-<idea-slug>.md
- Landing Page: /docs/validation/LANDING-<idea-slug>.md

Process:
1) @ChatGPT-Reasoning-Agent → Identify top 15 communities
2) @ChatGPT-Reasoning-Agent → Create 7-day posting calendar
3) @Manus-Narrative-Agent → Generate 20 DM outreach variants
4) @ChatGPT-Reasoning-Agent → Create content formats for each platform
5) @ChatGPT-Reasoning-Agent → Recommend paid channels for smoke tests

Output: /docs/validation/DISTRIBUTION-<idea-slug>.md
```

#### 3d: Pricing-Tester

```
@Pricing-Tester Create pricing test strategy for <IDEA>.

Inputs:
- Validation Pack: /docs/validation/VALIDATION-PACK-<idea-slug>.md
- Validation Plan: /docs/validation/VALIDATION-PLAN-<idea-slug>.md

Process:
1) @ChatGPT-Reasoning-Agent → Define 3-5 pricing bands
2) @ChatGPT-Reasoning-Agent → Create feature differentiation per tier
3) @ChatGPT-Reasoning-Agent → Design fake-door experiments
4) @Manus-Narrative-Agent → Generate WTP interview questions
5) @ChatGPT-Reasoning-Agent → Create premium anchor variant

Output: /docs/validation/PRICING-TEST-<idea-slug>.md
```

### Phase 4: Visual Assets (Step 4)

```
@Visual-Asset-Agent Create visual assets for <IDEA>.

Inputs:
- Landing Page: /docs/validation/LANDING-<idea-slug>.md (contains visual prompts)
- Distribution Strategy: /docs/validation/DISTRIBUTION-<idea-slug>.md

Process:
1) Extract visual prompts from Landing-Builder output
2) Generate hero images with Midjourney (or Canva)
3) Generate social ad visuals with Canva (platform-specific)
4) Generate thumbnail visuals with Canva
5) Optimize and export assets

Output:
- /docs/product/VISUALS-<idea-slug>/hero/
- /docs/product/VISUALS-<idea-slug>/social/
- /docs/product/VISUALS-<idea-slug>/thumbnails/
```

### Phase 5: Voice Content (Step 5)

```
@ElevenLabs-Voice-Agent Create voice content for <IDEA>.

Inputs:
- Landing Page: /docs/validation/LANDING-<idea-slug>.md (contains ElevenLabs scripts)
- Validation Plan: /docs/validation/VALIDATION-PLAN-<idea-slug>.md

Process:
1) Extract founder intro script from Landing-Builder output
2) Generate founder intro audio with ElevenLabs
3) Generate demo narration audio (if needed)
4) Generate social media voice segments (if needed)
5) Export audio files with transcripts

Output:
- /docs/product/FOUNDER-INTRO-<idea-slug>.mp3
- /docs/product/DEMO-NARRATION-<idea-slug>.mp3
- /docs/product/SOCIAL-VOICE-<idea-slug>/*.mp3
```

### Phase 6: Results Logging Sheet (Step 6)

Create results tracking template:

```
# Validation Results: <IDEA>

## Test Results

### Test 1: [Test Name]
- **Date**: [Date]
- **Metric**: [Metric name]
- **Result**: [Result value]
- **Threshold**: [Threshold value]
- **Status**: [Met/Not Met]

[... repeat for all tests ...]

## Threshold Analysis

- **Tests Passed**: [X/Total]
- **Thresholds Met**: [X/Total]
- **Overall Status**: [Pass/Fail]

## Decision

- **Decision**: [Kill/Pivot/Proceed]
- **Rationale**: [Why this decision?]
- **Next Steps**: [What happens next?]

## Metrics Dashboard

- **Landing Page Visits**: [Count]
- **Conversion Rate**: [%]
- **DM Response Rate**: [%]
- **Social Engagement Rate**: [%]
- **WTP Interview Results**: [Summary]
```

---

## Quality Checklist

Before considering the sprint complete, verify:

- [ ] **Persona + JTBD**: Extracted from Manus, clearly documented
- [ ] **Pain Language Dictionary**: Direct quotes, frustrations, "I wish..." statements
- [ ] **Competitor Landscape + Gaps**: Positioning gaps, differentiation opportunities identified
- [ ] **Pricing Expectations**: Price expectations, WTP, budget authority documented
- [ ] **Value Props + Hooks**: Transformation narrative, social hooks, emotional hooks
- [ ] **Social Post Library**: 7-day calendar, platform-specific formats, engagement strategies
- [ ] **DM Outreach Library**: 20 variants, 4 categories, personalization elements, follow-up sequences
- [ ] **Landing Copy + Visuals**: 5 hero variants, A/B headlines, visual assets generated
- [ ] **Audio Script for ElevenLabs**: Founder intro, demo narration, social segments, transcripts
- [ ] **Validation Plan + Tests + Thresholds**: 8-12 tests, thresholds, kill/pivot/proceed rules, sprint plan
- [ ] **Distribution Plan**: Top 15 communities, 7-day sequence, 20 DM templates, platform hooks
- [ ] **Results Logging Sheet**: Template ready for execution tracking

---

## See Also

- `docs/UNIFIED-PIPELINE.md` - Complete pipeline documentation
- `docs/validation/README.md` - Validation folder documentation
- `.cursor/rules/040-demand-validation.mdc` - Demand validation rules
- `.cursor/rules/050-manus-integration.mdc` - Manus consumption patterns
- `.cursor/rules/060-elevenlabs-integration.mdc` - ElevenLabs requirements
- `.cursor/rules/070-midjourney-canva.mdc` - Visual asset requirements
- `.cursor/rules/080-distribution.mdc` - Distribution requirements

