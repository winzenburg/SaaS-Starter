# The Unified Pipeline

> AI-powered validation loop that integrates Manus, ChatGPT, Cursor, Midjourney/Canva, and ElevenLabs into a complete validation workflow.

## Overview

The Unified Pipeline is a 6-step validation workflow that transforms a raw product idea into a complete validation package ready for execution. Each step uses specific AI tools and agents to produce validated outputs.

## Pipeline Flow

```
Raw Idea
  ↓
Step 1: Manus → Narrative, Persona, Competitor, Pricing, Hooks
  ↓
Step 2: ChatGPT → Refine + Clean → Validation Pack
  ↓
Step 3: Cursor Multi-Agent Workflow → Validation Documents
  ↓
Step 4: Midjourney/Canva → Visual Assets
  ↓
Step 5: ElevenLabs → Voice Content
  ↓
Step 6: Launch Validation Sprint → Execute Tests
```

## Step 1: Manus

**Tool**: Manus.im  
**Agent**: `@Manus-Narrative-Agent`  
**Purpose**: Generate narrative, persona, competitor analysis, pricing insights, and social hooks.

### Input

- Raw product idea
- Target niche
- Core pain point

### Process

**Run the seed prompt**:
```
@Manus-Narrative-Agent Create narrative and persona analysis for <PRODUCT>.

Use Manus.im to:
1) Generate 3-5 narrative variations that connect identity-level pain to solution
2) Analyze competitor narratives and positioning
3) Develop detailed personas with identity-level motivations
4) Extract pricing expectations and willingness to pay
5) Generate social hooks for distribution

Output:
- /docs/product/NARRATIVE-<product>.md
- /docs/research/COMPETITORS-<product>.md
- /docs/research/PERSONA-<product>.md
```

### Output

**Generated Documents**:
- `/docs/product/NARRATIVE-<product>.md`
  - Narrative variations
  - Selected narrative
  - Identity-level pain connection
  - Transformation story

- `/docs/research/COMPETITORS-<product>.md`
  - Competitor positioning
  - Differentiation opportunities
  - Market messaging insights

- `/docs/research/PERSONA-<product>.md`
  - Persona profiles
  - Identity-level motivations
  - Emotional drivers
  - Frustrations
  - Where they hang out

**Extracted Elements**:
- **Narrative**: Identity-level pain, transformation story, value proposition
- **Persona**: Language, terminology, frustrations, emotional motivations
- **Competitor**: Positioning gaps, differentiation opportunities
- **Pricing**: Price expectations, willingness to pay, budget authority
- **Hooks**: Social hooks for LinkedIn, X/Twitter, Reddit, TikTok

### Quality Criteria

- ✅ Narrative connects identity-level pain to solution
- ✅ Personas reflect real identity-level motivations
- ✅ Competitor analysis identifies clear differentiation
- ✅ Pricing insights are specific and actionable
- ✅ Social hooks are platform-optimized

## Step 2: ChatGPT

**Tool**: ChatGPT  
**Agent**: `@ChatGPT-Reasoning-Agent`  
**Purpose**: Refine and clean Manus outputs, synthesize into a "Validation Pack".

### Input

- Manus narrative document
- Manus persona document
- Manus competitor document
- Raw insights and data

### Process

**Refine + Clean**:
```
@ChatGPT-Reasoning-Agent Synthesize and refine Manus outputs into a Validation Pack.

Inputs:
- Narrative: /docs/product/NARRATIVE-<product>.md
- Persona: /docs/research/PERSONA-<product>.md
- Competitor: /docs/research/COMPETITORS-<product>.md

Process:
1) Synthesize narrative, persona, and competitor insights
2) Refine and clean language for consistency
3) Extract key elements (JTBD, pain language, emotional drivers)
4) Structure insights for validation use
5) Create Validation Pack document

Output: /docs/validation/VALIDATION-PACK-<product>.md
```

### Output

**Validation Pack Document**: `/docs/validation/VALIDATION-PACK-<product>.md`

**Contains**:
- **Synthesized Narrative**: Clean, consistent narrative
- **Key Persona Insights**: Persona language, frustrations, motivations
- **JTBD Extraction**: Job-to-be-Done from narrative/persona
- **Pain Language**: Direct quotes and pain points
- **Emotional Drivers**: Identity-level motivations
- **Competitor Gaps**: Positioning opportunities
- **Pricing Signals**: Price expectations, WTP, budget authority
- **Social Hooks**: Refined hooks for each platform
- **Validation Opportunities**: Test ideas and opportunities

### Quality Criteria

- ✅ All Manus outputs synthesized into coherent pack
- ✅ Language is clean and consistent
- ✅ Key elements extracted and structured
- ✅ Ready for validation agent consumption

## Step 3: Cursor Multi-Agent Workflow

**Tool**: Cursor 2.1  
**Agents**: Multiple agents working in sequence  
**Purpose**: Generate complete validation documents using Validation Pack.

### Workflow

```
Validation Pack
  ↓
@Demand-Validator → VALIDATION-PLAN-*.md
  ↓
@Landing-Builder → LANDING-*.md
  ↓
@Distribution-Operator → DISTRIBUTION-*.md
  ↓
@Pricing-Tester → PRICING-TEST-*.md
  ↓
(optional) @Growth-Loop-Agent → Growth loop strategy
```

### Step 3a: Demand-Validator

**Agent**: `@Demand-Validator`  
**Input**: Validation Pack from Step 2  
**Output**: `/docs/validation/VALIDATION-PLAN-<product>.md`

**Process**:
```
@Demand-Validator Create validation plan for <PRODUCT>.

Inputs:
- Validation Pack: /docs/validation/VALIDATION-PACK-<product>.md
- Manus outputs: /docs/product/NARRATIVE-<product>.md, /docs/research/PERSONA-<product>.md

Process:
1) Extract JTBD, persona language, frustrations, emotional drivers from Validation Pack
2) @ChatGPT-Reasoning-Agent → Design 8-12 validation tests
3) Define test thresholds (success, kill, pivot, proceed)
4) Create kill/pivot/proceed rules
5) Generate 7-14 day sprint plan

Output: /docs/validation/VALIDATION-PLAN-<product>.md
```

**Output Sections**:
- Extracted elements from Manus outputs
- 8-12 validation tests (social narrative, fake door, landing/waitlist, DM outreach, concierge MVP, prepayment/preorder)
- Test thresholds (success, kill, pivot, proceed)
- Kill/pivot/proceed rules
- 7-14 day sprint plan

### Step 3b: Landing-Builder

**Agent**: `@Landing-Builder`  
**Input**: Validation Pack, Validation Plan  
**Output**: `/docs/validation/LANDING-<product>.md` + optional Next.js code

**Process**:
```
@Landing-Builder Create landing page for <PRODUCT>.

Inputs:
- Validation Pack: /docs/validation/VALIDATION-PACK-<product>.md
- Validation Plan: /docs/validation/VALIDATION-PLAN-<product>.md

Process:
1) @Manus-Narrative-Agent → Generate 5 hero section variants
2) @Manus-Narrative-Agent → Generate offer framing and transformation narrative
3) @Manus-Narrative-Agent → Create A/B headline variants
4) Generate visual prompts for Midjourney/Canva
5) Generate ElevenLabs "founder intro" script
6) (Optional) Generate Next.js landing page code

Output:
- /docs/validation/LANDING-<product>.md
- (Optional) /app/(marketing)/<product>/page.tsx
```

**Output Sections**:
- 5 hero section variants (from Manus)
- Offer framing and transformation narrative (from Manus)
- A/B headline variants (from Manus)
- Visual prompts for Midjourney/Canva
- ElevenLabs "founder intro" script
- Optional Next.js landing page code

### Step 3c: Distribution-Operator

**Agent**: `@Distribution-Operator`  
**Input**: Validation Pack, Landing Page  
**Output**: `/docs/validation/DISTRIBUTION-<product>.md`

**Process**:
```
@Distribution-Operator Create distribution strategy for <PRODUCT>.

Inputs:
- Validation Pack: /docs/validation/VALIDATION-PACK-<product>.md
- Landing Page: /docs/validation/LANDING-<product>.md

Process:
1) @ChatGPT-Reasoning-Agent → Identify top 15 communities
2) @ChatGPT-Reasoning-Agent → Create 7-day posting calendar
3) @Manus-Narrative-Agent → Generate 20 DM outreach variants
4) @ChatGPT-Reasoning-Agent → Create content formats for each platform
5) @ChatGPT-Reasoning-Agent → Recommend paid channels for smoke tests

Output: /docs/validation/DISTRIBUTION-<product>.md
```

**Output Sections**:
- Top 15 community list
- 7-day posting calendar
- 20 DM outreach variants
- Content formats (LinkedIn, X, Reddit, TikTok)
- Paid channel recommendations

### Step 3d: Pricing-Tester

**Agent**: `@Pricing-Tester`  
**Input**: Validation Pack, Validation Plan  
**Output**: `/docs/validation/PRICING-TEST-<product>.md`

**Process**:
```
@Pricing-Tester Create pricing test strategy for <PRODUCT>.

Inputs:
- Validation Pack: /docs/validation/VALIDATION-PACK-<product>.md
- Validation Plan: /docs/validation/VALIDATION-PLAN-<product>.md

Process:
1) @ChatGPT-Reasoning-Agent → Define 3-5 pricing bands
2) @ChatGPT-Reasoning-Agent → Create feature differentiation per tier
3) @ChatGPT-Reasoning-Agent → Design fake-door experiments
4) @Manus-Narrative-Agent → Generate WTP interview questions
5) @ChatGPT-Reasoning-Agent → Create premium anchor variant

Output: /docs/validation/PRICING-TEST-<product>.md
```

**Output Sections**:
- 3-5 pricing bands
- Feature differentiation per tier
- Fake-door experiments
- WTP interview questions
- Premium anchor variant

### Step 3e: Growth-Loop-Agent (Optional)

**Agent**: `@Growth-Loop-Agent`  
**Input**: Validation Pack, Distribution Strategy  
**Output**: Growth loop strategy document

**Process**:
```
@Growth-Loop-Agent Create growth loop strategy for <PRODUCT>.

Inputs:
- Validation Pack: /docs/validation/VALIDATION-PACK-<product>.md
- Distribution Strategy: /docs/validation/DISTRIBUTION-<product>.md

Process:
1) @ChatGPT-Reasoning-Agent → Design referral mechanisms
2) @ChatGPT-Reasoning-Agent → Create viral loop strategies
3) @Manus-Narrative-Agent → Generate incentive system messaging
4) @ChatGPT-Reasoning-Agent → Design retention triggers

Output: Growth loop strategy document
```

**Output Sections**:
- Referral mechanisms
- Viral loop strategies
- Incentive systems
- Retention triggers

## Step 4: Midjourney/Canva

**Tool**: Midjourney or Canva  
**Agent**: `@Visual-Asset-Agent`  
**Purpose**: Generate hero images and social visuals.

### Input

- Landing page document (with visual prompts)
- Distribution strategy (with social ad requirements)
- Visual prompts from Landing-Builder

### Process

**Generate Visual Assets**:
```
@Visual-Asset-Agent Create visual assets for <PRODUCT>.

Inputs:
- Landing Page: /docs/validation/LANDING-<product>.md (contains visual prompts)
- Distribution Strategy: /docs/validation/DISTRIBUTION-<product>.md

Process:
1) Extract visual prompts from Landing-Builder output
2) Generate hero images with Midjourney (or Canva)
3) Generate social ad visuals with Canva (platform-specific)
4) Generate thumbnail visuals with Canva
5) Optimize and export assets

Output:
- /docs/product/VISUALS-<product>/hero/
- /docs/product/VISUALS-<product>/social/
- /docs/product/VISUALS-<product>/thumbnails/
```

### Output

**Visual Assets**:
- **Hero Images**: `/docs/product/VISUALS-<product>/hero/`
  - 1920x1080 (WebP + PNG)
  - 640x360 (responsive)
  
- **Social Ad Visuals**: `/docs/product/VISUALS-<product>/social/`
  - Facebook/Instagram (1200x630)
  - Instagram Story (1080x1920)
  - TikTok/Reels (1080x1920)
  - LinkedIn (1200x627)
  - Twitter/X (1200x675)

- **Thumbnails**: `/docs/product/VISUALS-<product>/thumbnails/`
  - YouTube (1280x720)
  - TikTok/Reels (1080x1920)
  - Blog (1200x630)

### Quality Criteria

- ✅ Visuals communicate product concept clearly
- ✅ Style is consistent with brand identity
- ✅ Assets are optimized for intended use
- ✅ Platform-specific formats are correct

## Step 5: ElevenLabs

**Tool**: ElevenLabs  
**Agent**: `@ElevenLabs-Voice-Agent`  
**Purpose**: Generate voice content for founder intro and demo narrations.

### Input

- Landing page document (with ElevenLabs scripts)
- Validation plan (for demo narration requirements)

### Process

**Generate Voice Content**:
```
@ElevenLabs-Voice-Agent Create voice content for <PRODUCT>.

Inputs:
- Landing Page: /docs/validation/LANDING-<product>.md (contains ElevenLabs scripts)
- Validation Plan: /docs/validation/VALIDATION-PLAN-<product>.md

Process:
1) Extract founder intro script from Landing-Builder output
2) Generate founder intro audio with ElevenLabs
3) Generate demo narration audio (if needed)
4) Generate social media voice segments (if needed)
5) Export audio files with transcripts

Output:
- /docs/product/FOUNDER-INTRO-<product>.mp3
- /docs/product/DEMO-NARRATION-<product>.mp3
- /docs/product/SOCIAL-VOICE-<product>/*.mp3
```

### Output

**Voice Content**:
- **Founder Intro**: `/docs/product/FOUNDER-INTRO-<product>.mp3`
  - 30-60 seconds
  - Professional tone
  - Full transcript included

- **Demo Narration**: `/docs/product/DEMO-NARRATION-<product>.mp3`
  - 2-3 minutes
  - Clear, instructional tone
  - Full transcript included

- **Social Voice Segments**: `/docs/product/SOCIAL-VOICE-<product>/`
  - Hook segments (5 seconds)
  - Problem statements (10 seconds)
  - Solution teasers (15 seconds)
  - CTAs (5 seconds)
  - Full transcripts included

### Quality Criteria

- ✅ Voice matches product tone and brand
- ✅ Narration is clear and natural-sounding
- ✅ Audio quality is professional
- ✅ Transcripts provided for accessibility

## Step 6: Launch Validation Sprint

**Purpose**: Execute validation tests using all generated materials.

### Input

- All validation documents from Steps 1-5
- Visual assets from Step 4
- Voice content from Step 5

### Execution

#### 6a: Landing Page Launch

**Options**:
- **Cursor**: Use generated Next.js code from Landing-Builder
- **Framer**: Import design and use Framer for faster iteration

**Process**:
1. Deploy landing page (Cursor or Framer)
2. Integrate hero images from Step 4
3. Embed founder intro audio from Step 5
4. Set up analytics tracking
5. Launch and monitor metrics

**Metrics to Track**:
- Landing page visits
- Conversion rate (waitlist/contact)
- Time on page
- Bounce rate

#### 6b: DM Outreach

**Tools**: Cursor + Manus scripts  
**Process**: Use DM templates from Distribution-Operator

**Process**:
1. Extract DM templates from `/docs/validation/DISTRIBUTION-<product>.md`
2. Personalize using Manus persona language
3. Send DMs to target communities
4. Track response rates
5. Iterate based on results

**Metrics to Track**:
- DM sent
- Response rate
- Positive responses
- Conversion rate (to landing page)

#### 6c: Social Posts

**Tools**: Manus hooks → Cursor delivery  
**Process**: Use posting calendar from Distribution-Operator

**Process**:
1. Extract posting calendar from `/docs/validation/DISTRIBUTION-<product>.md`
2. Use Manus hooks for each post
3. Post according to calendar
4. Engage with responses
5. Track engagement metrics

**Metrics to Track**:
- Post reach
- Engagement rate (likes, comments, shares)
- Click-through rate (to landing page)
- Conversion rate

#### 6d: Smoke Tests

**Process**: Run fake-door and prepayment tests

**Tests**:
- **Fake Door Tests**: Test demand without building
- **Prepayment Tests**: Test willingness to pay
- **Waitlist Tests**: Test interest level

**Metrics to Track**:
- Click-through rates
- Sign-up rates
- Prepayment rates
- Conversion rates

#### 6e: WTP Interviews

**Process**: Conduct willingness-to-pay interviews

**Process**:
1. Extract WTP questions from `/docs/validation/PRICING-TEST-<product>.md`
2. Schedule interviews with target personas
3. Conduct interviews using persona language
4. Analyze results
5. Refine pricing strategy

**Metrics to Track**:
- Interview completion rate
- Price sensitivity
- Willingness to pay
- Feature preferences

### Results Documentation

**Create**: `/docs/validation/RESULTS-<product>.md`

**Must Include**:
- Test results (metrics, outcomes)
- Threshold analysis (met/not met)
- Kill/pivot/proceed decision
- Next steps

## Complete Pipeline Summary

```
Step 1: Manus
  → Narrative, Persona, Competitor, Pricing, Hooks
  → /docs/product/NARRATIVE-*.md
  → /docs/research/PERSONA-*.md
  → /docs/research/COMPETITORS-*.md

Step 2: ChatGPT
  → Refine + Clean → Validation Pack
  → /docs/validation/VALIDATION-PACK-*.md

Step 3: Cursor Multi-Agent Workflow
  → @Demand-Validator → VALIDATION-PLAN-*.md
  → @Landing-Builder → LANDING-*.md
  → @Distribution-Operator → DISTRIBUTION-*.md
  → @Pricing-Tester → PRICING-TEST-*.md
  → (optional) @Growth-Loop-Agent → Growth strategy

Step 4: Midjourney/Canva
  → Hero images + Social visuals
  → /docs/product/VISUALS-*/hero/
  → /docs/product/VISUALS-*/social/
  → /docs/product/VISUALS-*/thumbnails/

Step 5: ElevenLabs
  → Founder intro + Demo narrations
  → /docs/product/FOUNDER-INTRO-*.mp3
  → /docs/product/DEMO-NARRATION-*.mp3
  → /docs/product/SOCIAL-VOICE-*/*.mp3

Step 6: Launch Validation Sprint
  → Landing page (Cursor or Framer)
  → DM outreach (Cursor + Manus scripts)
  → Posts (Manus hooks > Cursor delivery)
  → Smoke tests
  → WTP interviews
  → /docs/validation/RESULTS-*.md
```

## Quality Gates

**Pipeline must pass all quality gates**:

- ✅ **Step 1**: Manus outputs are complete and high-quality
- ✅ **Step 2**: Validation Pack is synthesized and structured
- ✅ **Step 3**: All validation documents are complete
- ✅ **Step 4**: Visual assets are generated and optimized
- ✅ **Step 5**: Voice content is generated with transcripts
- ✅ **Step 6**: Validation sprint is executed and results documented

## Integration Points

- **Before Pipeline**: Raw product idea, target niche, core pain point
- **After Pipeline**: Complete validation package ready for execution
- **Next Steps**: Execute validation → Analyze results → Make kill/pivot/proceed decision → PRD (if proceed)

## See Also

- `docs/validation/README.md` - Validation folder documentation
- `.cursor/rules/040-demand-validation.mdc` - Demand validation rules
- `.cursor/rules/050-manus-integration.mdc` - Manus consumption patterns
- `.cursor/rules/060-elevenlabs-integration.mdc` - ElevenLabs requirements
- `.cursor/rules/070-midjourney-canva.mdc` - Visual asset requirements
- `.cursor/rules/080-distribution.mdc` - Distribution requirements
- `docs/agents/` - Agent definitions

