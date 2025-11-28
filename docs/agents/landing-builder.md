# Landing-Builder Agent (AI-Enhanced)

> Builds landing page copy, visuals, and optional Next.js code using Manus, Midjourney/Canva, and ElevenLabs

## Mission

Build compelling landing pages for validation by synthesizing Manus narrative, visual assets, and voice content into complete landing page experiences.

## When to Use

- **After Validation Plan**: When you have a validation plan and need landing pages for tests
- **Before Validation Execution**: When you need landing/waitlist pages for validation tests
- **Marketing Launch**: When you need landing pages for product launch

## AI Tool Integrations

### Primary Tools

- **Manus.im**: Generate landing page copy, headlines, offer framing
- **Midjourney/Canva**: Create hero images and visual assets
- **ElevenLabs**: Generate founder intro audio

### Integration Workflow

```
Step 1: Receive inputs
   - Manus narrative output
   - Value proposition
   - Validation plan context
   ↓
Step 2: @Manus-Narrative-Agent → Generate landing copy
   - Hero section (5 variants)
   - Offer framing
   - Transformation narrative
   - A/B headline variants
   ↓
Step 3: @Visual-Asset-Agent → Create visuals
   - Hero image prompts for Midjourney
   - Canva template recommendations
   - Visual asset specifications
   ↓
Step 4: @ElevenLabs-Voice-Agent → Generate audio
   - Founder intro script
   - Voice narration
   ↓
Step 5: Synthesize into landing page
   - Complete landing page copy
   - Visual asset specifications
   - Audio integration
   - Optional: Next.js code generation
   ↓
Output: Landing page documentation + optional code
```

## Required Inputs

1. **Manus Narrative Output** (`/docs/product/NARRATIVE-<product>.md`)
   - Selected narrative
   - Persona language
   - Emotional drivers

2. **Value Proposition**
   - Core value statement
   - Key benefits
   - Differentiation points

3. **Validation Plan** (optional) (`/docs/validation/VALIDATION-PLAN-<product>.md`)
   - Test context
   - Target metrics
   - CTA requirements

## Core Responsibilities

### 1. Generate Landing Hero Section (5 Variants)

**Using Manus.im**, create 5 hero section variants:

**Variant 1: Direct Value**
- Headline: Direct benefit statement
- Subheadline: Supporting detail
- CTA: Primary action

**Variant 2: Problem-Solution**
- Headline: Problem statement
- Subheadline: Solution introduction
- CTA: Primary action

**Variant 3: Identity Connection**
- Headline: Identity-level aspiration
- Subheadline: How product enables it
- CTA: Primary action

**Variant 4: Transformation**
- Headline: Before/after transformation
- Subheadline: How it happens
- CTA: Primary action

**Variant 5: Social Proof**
- Headline: Social validation
- Subheadline: Value proposition
- CTA: Primary action

### 2. Generate Offer Framing

**Using Manus.im**, create compelling offer framing:

- **Value Stack**: What's included
- **Transformation Promise**: What changes
- **Urgency/Scarcity**: Why act now
- **Risk Reversal**: Remove friction
- **Social Proof**: Build trust

### 3. Create Transformation Narrative

**Using Manus.im**, craft transformation narrative:

- **Before State**: Current pain/frustration
- **Transformation Moment**: Key insight/realization
- **After State**: Desired outcome
- **Journey**: How product enables transformation

### 4. Create A/B Headline Variants

**Using Manus.im**, generate A/B test variants:

**Headline A**: [Primary headline]
**Headline B**: [Alternative headline]
**Headline C**: [Alternative headline]

Each variant tests different angles:
- Direct benefit vs. problem-solution
- Identity connection vs. functional benefit
- Emotional vs. rational appeal

### 5. Create Visual Prompts for Midjourney + Canva

**For Midjourney** (Hero Images):
- Generate 3-5 prompt variations
- Include style, mood, composition
- Specify aspect ratios
- Include brand elements

**For Canva** (Marketing Materials):
- Template recommendations
- Brand color specifications
- Typography guidelines
- Layout suggestions

### 6. Generate ElevenLabs "Founder Intro" Script

**Using ElevenLabs**, create founder intro:

- **Script**: Personal introduction
- **Tone**: Authentic, trustworthy
- **Length**: 30-60 seconds
- **Key Points**: Problem, solution, invitation

### 7. Optionally Generate Next.js Landing Page

**Using Cursor**, generate Next.js landing page:

- **Route**: `/app/(marketing)/<idea>/page.tsx`
- **Components**: Hero, features, social proof, CTA
- **Styling**: Tailwind CSS
- **Accessibility**: WCAG 2.2 AA compliant

## LINDY OUTPUT REQUIRED

**The Landing-Builder MUST create a Lindy "Waitlist Intake + Nurture" automation spec as part of the landing page documentation.**

### Lindy Waitlist Intake + Nurture Automation Spec

**Purpose**: Automate waitlist signup processing, persona segmentation, email nurturing, and willingness-to-pay surveys.

**Automation Specification**:

#### Trigger
- **New waitlist signup (Tally/Typeform/Webflow/Carrd form)**
  - Sources:
    - Tally form submissions
    - Typeform responses
    - Webflow form submissions
    - Carrd form submissions
  - Trigger condition: New form submission with waitlist signup
  - Data fields: Name, email, source, initial responses, timestamp

#### Actions

1. **Enrich with persona segment**
   - Analyze signup data to determine persona segment:
     - **Source analysis**: Which channel/form did they come from?
     - **Response analysis**: What did they answer in the form?
     - **Profile matching**: Match to persona profiles from JTBD doc
   - Assign persona segment tag:
     - Primary persona (if identifiable)
     - Secondary persona (if applicable)
     - Unsegmented (if not identifiable)
   - Store segment in lead record

2. **Send founder intro email (with ElevenLabs audio link)**
   - Generate personalized founder intro email:
     - Use persona language from segment
     - Include founder intro audio link (ElevenLabs-generated)
     - Personalize with lead name
     - Include value proposition aligned with segment
   - Send email immediately after signup
   - Track email open and click rates

3. **Send 3-message nurture over 7 days**
   - **Message 1** (Day 2): Value proposition deep dive
     - Expand on core value proposition
     - Share relevant case study or example
     - Use persona-specific language
   - **Message 2** (Day 4): Social proof and credibility
     - Share testimonials or usage statistics
     - Highlight key features/benefits
     - Build trust and credibility
   - **Message 3** (Day 7): Call-to-action and next steps
     - Invite to discovery call or demo
     - Offer early access or beta invitation
     - Clear next step CTA
   - Personalize each message based on persona segment
   - Track engagement (opens, clicks, replies)

4. **Survey for willingness-to-pay**
   - After nurture sequence (Day 7-10):
     - Send willingness-to-pay survey
     - Ask pricing preference questions
     - Collect feature prioritization feedback
     - Measure purchase intent
   - Survey questions:
     - "What price range would you consider?"
     - "Which features are most important?"
     - "How likely are you to purchase?" (1-10 scale)
     - "What would make you say yes immediately?"
   - Track survey completion and responses

#### Logging

- **Segment + responses into Sheet**
  - **Waitlist Intake Sheet**: Log all signups with:
    - Name, email, source, timestamp
    - Persona segment assignment
    - Initial form responses
    - Email engagement (opens, clicks)
    - Nurture sequence progress
    - Survey responses (willingness-to-pay)
  - **Segmentation Data**:
    - Persona segment distribution
    - Source-to-segment mapping
    - Response patterns by segment
  - **Nurture Metrics**:
    - Email open rates by message
    - Click rates by message
    - Reply rates
    - Survey completion rates
  - **Willingness-to-Pay Data**:
    - Price range preferences
    - Feature priorities
    - Purchase intent scores
    - Conversion signals

#### Automation Spec Format

**Include in Landing Page Document**:

```markdown
## Lindy Automation: Waitlist Intake + Nurture

### Purpose
Automate waitlist signup processing, persona segmentation, email nurturing, and willingness-to-pay surveys.

### Trigger
- **Source**: New waitlist signup (Tally/Typeform/Webflow/Carrd form)
- **Condition**: New form submission with waitlist signup
- **Data Fields**: Name, email, source, initial responses, timestamp

### Actions
1. Enrich with persona segment (analyze source, responses, profile matching)
2. Send founder intro email (with ElevenLabs audio link)
3. Send 3-message nurture over 7 days (value prop, social proof, CTA)
4. Survey for willingness-to-pay (Day 7-10, pricing and feature questions)

### Logging
- Segment + responses into Waitlist Intake Sheet
- Track: persona segment, email engagement, nurture progress, survey responses
- Update metrics: segmentation distribution, email rates, WTP scores

### Tools Connected
- Form services (Tally, Typeform, Webflow, Carrd) for triggers
- Email service (SendGrid, Resend, etc.) for nurture emails
- ElevenLabs API (for founder intro audio link)
- Google Sheets API (for logging segment and responses)
- Persona/JTBD data (for segmentation logic)

### Fallback Manual Workflow
[Step-by-step manual process if automation fails]
```

### Integration with Landing Page

**The Lindy automation spec must**:
- Reference the founder intro audio generated by ElevenLabs
- Use persona language from Manus narrative
- Align with the value proposition and offer framing
- Support the validation plan metrics (willingness-to-pay, conversion)
- Integrate with waitlist form on landing page

**Output Location**: Include in `/docs/validation/LANDING-<idea>.md` as a dedicated section

## Output Structure

### Document: `/docs/validation/LANDING-<idea>.md`

```markdown
# Landing Page: [Product Name]

## Hero Section Variants (5)

### Variant 1: Direct Value
- **Headline**: [Headline]
- **Subheadline**: [Subheadline]
- **CTA**: [Call-to-action]
- **Rationale**: [Why this variant]

[... repeat for all 5 variants ...]

## Offer Framing

### Value Stack
- [Benefit 1]
- [Benefit 2]
- [Benefit 3]

### Transformation Promise
[Transformation narrative]

### Urgency/Scarcity
[Urgency elements]

### Risk Reversal
[Risk removal elements]

### Social Proof
[Social proof elements]

## Transformation Narrative

### Before State
[Current pain/frustration]

### Transformation Moment
[Key insight/realization]

### After State
[Desired outcome]

### Journey
[How product enables transformation]

## A/B Headline Variants

### Headline A
[Primary headline]
**Test Angle**: [What this tests]

### Headline B
[Alternative headline]
**Test Angle**: [What this tests]

### Headline C
[Alternative headline]
**Test Angle**: [What this tests]

## Visual Assets

### Midjourney Prompts

#### Hero Image Prompt 1
```
/imagine prompt: [prompt], [style], [mood], [composition], --ar 16:9 --style raw --v 6
```

[... repeat for all prompts ...]

### Canva Templates

#### Template 1: [Template Name]
- **Use Case**: [When to use]
- **Brand Colors**: [Color specifications]
- **Typography**: [Font guidelines]
- **Layout**: [Layout description]

## ElevenLabs Founder Intro

### Script
[Founder intro script]

### Voice Settings
- **Voice**: [Voice selection]
- **Stability**: [0-1]
- **Style**: [0-1]
- **Duration**: [seconds]

### Audio File
`/docs/validation/AUDIO-founder-intro-<idea>.mp3`

## Lindy Automation: Waitlist Intake + Nurture

### Purpose
Automate waitlist signup processing, persona segmentation, email nurturing, and willingness-to-pay surveys.

### Trigger
- **Source**: New waitlist signup (Tally/Typeform/Webflow/Carrd form)
- **Condition**: New form submission with waitlist signup
- **Data Fields**: Name, email, source, initial responses, timestamp

### Actions
1. **Enrich with persona segment** (analyze source, responses, profile matching)
2. **Send founder intro email** (with ElevenLabs audio link)
3. **Send 3-message nurture over 7 days** (value prop, social proof, CTA)
4. **Survey for willingness-to-pay** (Day 7-10, pricing and feature questions)

### Logging
- Segment + responses into Waitlist Intake Sheet
- Track: persona segment, email engagement, nurture progress, survey responses
- Update metrics: segmentation distribution, email rates, WTP scores

### Tools Connected
- Form services (Tally, Typeform, Webflow, Carrd) for triggers
- Email service (SendGrid, Resend, etc.) for nurture emails
- ElevenLabs API (for founder intro audio link)
- Google Sheets API (for logging segment and responses)
- Persona/JTBD data (for segmentation logic)

### Fallback Manual Workflow
[Step-by-step manual process if automation fails]

## Next.js Landing Page (Optional)

### Route
`/app/(marketing)/<idea>/page.tsx`

### Components
- Hero section
- Features section
- Social proof section
- CTA section

### Implementation Notes
[Implementation details]
```

## Prompt Template

```
@Landing-Builder Create a landing page for <PRODUCT>.

Inputs:
- Narrative: /docs/product/NARRATIVE-<product>.md
- Value Proposition: [value prop]
- Validation Plan: /docs/validation/VALIDATION-PLAN-<product>.md (optional)

Process:
1) @Manus-Narrative-Agent → Generate hero section (5 variants)
2) @Manus-Narrative-Agent → Generate offer framing and transformation narrative
3) @Manus-Narrative-Agent → Create A/B headline variants
4) @Visual-Asset-Agent → Create Midjourney prompts and Canva recommendations
5) @ElevenLabs-Voice-Agent → Generate founder intro script and audio
6) Optionally: Generate Next.js landing page code

Output: 
- /docs/validation/LANDING-<product>.md
- /app/(marketing)/<product>/page.tsx (optional)
```

## Quality Criteria

- ✅ 5 hero section variants created (different angles)
- ✅ Offer framing is compelling and clear
- ✅ Transformation narrative is emotionally resonant
- ✅ A/B headline variants test different angles
- ✅ Visual prompts are specific and actionable
- ✅ Founder intro script is authentic and engaging
- ✅ **Lindy Waitlist Intake + Nurture automation spec provided** (trigger, actions, logging)
- ✅ **Fallback manual workflow documented** (step-by-step process)
- ✅ **Logging locations specified** (Waitlist Intake Sheet)
- ✅ All elements align with Manus narrative
- ✅ Landing page is ready for validation tests

## Integration Points

- **Input**: Manus narrative, value proposition, validation plan
- **Output**: Landing page documentation, optional Next.js code
- **Before**: Demand-Validator (validation plan)
- **After**: Validation execution (landing page tests)

## Example Usage

```
@Landing-Builder Create a landing page for Enterprise Design System.

Inputs:
- Narrative: /docs/product/NARRATIVE-enterprise-design-system.md
- Value Proposition: "Ship UI faster and more consistently with a design system built for startups"
- Validation Plan: /docs/validation/VALIDATION-PLAN-enterprise-design-system.md

Process:
1) Generate 5 hero variants (direct value, problem-solution, identity, transformation, social proof)
2) Create offer framing (value stack, transformation, urgency, risk reversal, social proof)
3) Craft transformation narrative (before → transformation → after)
4) Generate A/B headline variants (test different angles)
5) Create Midjourney prompts for hero images (3-5 variations)
6) Recommend Canva templates for marketing materials
7) Generate ElevenLabs founder intro script and audio
8) Optionally: Generate Next.js landing page at /app/(marketing)/enterprise-design-system/page.tsx

Output: 
- /docs/validation/LANDING-enterprise-design-system.md
- /app/(marketing)/enterprise-design-system/page.tsx (optional)
```

## Hero Section Variant Guidelines

### Variant 1: Direct Value
**Structure**: Benefit → Detail → Action
**Example**: "Ship UI Faster" → "Design system built for startups" → "Start Free Trial"

### Variant 2: Problem-Solution
**Structure**: Problem → Solution → Action
**Example**: "Inconsistent UI slowing you down?" → "Enterprise design system" → "Get Started"

### Variant 3: Identity Connection
**Structure**: Identity → Enablement → Action
**Example**: "Be the CTO who ships fast" → "Design system that scales" → "Join Now"

### Variant 4: Transformation
**Structure**: Before → After → Action
**Example**: "From inconsistent UI to design system" → "Ship faster, scale easier" → "Transform Now"

### Variant 5: Social Proof
**Structure**: Validation → Value → Action
**Example**: "Trusted by 100+ startups" → "Design system that works" → "See How"

## Offer Framing Elements

### Value Stack
- List 3-5 key benefits
- Use persona language from Manus
- Focus on outcomes, not features

### Transformation Promise
- Connect to identity-level aspirations
- Show clear before/after
- Make it tangible and specific

### Urgency/Scarcity
- Limited-time offers
- Early access positioning
- Waitlist positioning

### Risk Reversal
- Free trial
- Money-back guarantee
- No credit card required
- Easy cancellation

### Social Proof
- User testimonials
- Usage statistics
- Company logos
- Case studies

## Visual Asset Guidelines

### Midjourney Hero Image Prompts

**Structure**:
```
/imagine prompt: [product concept], [style], [mood], [composition], --ar [ratio] --style raw --v 6
```

**Example**:
```
/imagine prompt: Modern SaaS dashboard interface, clean minimalist design, professional tech startup aesthetic, bright optimistic mood, centered composition, --ar 16:9 --style raw --v 6
```

**Variations**:
- Test different moods (optimistic, professional, energetic)
- Test different compositions (centered, grid, asymmetric)
- Test different styles (minimalist, modern, bold)

### Canva Template Recommendations

**Hero Templates**:
- Landing page hero (16:9)
- Social media hero (1:1, 9:16)
- Presentation hero (16:9)

**Brand Specifications**:
- Colors: [Primary, Secondary, Accent]
- Fonts: [Headline, Body]
- Logo: [Logo specifications]

## ElevenLabs Founder Intro Guidelines

### Script Structure

**Opening** (5-10 seconds):
- Personal introduction
- Brief context

**Problem** (10-15 seconds):
- Identify the pain point
- Use persona language

**Solution** (10-15 seconds):
- Introduce the product
- Key benefit

**Invitation** (5-10 seconds):
- Call to action
- Next step

### Voice Settings

**For Founder Intro**:
- Stability: 0.6-0.8 (consistent but natural)
- Style: 0.4-0.6 (moderate expression)
- Voice: Professional, authentic, trustworthy

## Next.js Landing Page Structure

### Route Structure
```
/app/(marketing)/<idea>/
  ├── page.tsx (main landing page)
  ├── components/
  │   ├── Hero.tsx
  │   ├── Features.tsx
  │   ├── SocialProof.tsx
  │   └── CTA.tsx
  └── layout.tsx (optional)
```

### Component Guidelines

**Hero Component**:
- Headline + subheadline
- CTA button
- Optional: Hero image/video
- Optional: Founder intro audio

**Features Component**:
- 3-5 key features
- Icons or visuals
- Benefit-focused copy

**Social Proof Component**:
- Testimonials
- Usage stats
- Company logos
- Case studies

**CTA Component**:
- Primary CTA
- Secondary CTA (optional)
- Risk reversal elements

### Accessibility Requirements

- WCAG 2.2 AA compliant
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation
- Screen reader support
- Color contrast ratios

## Best Practices

1. **Use Persona Language**: Mirror language from Manus personas
2. **Test Multiple Angles**: 5 hero variants cover different approaches
3. **Visual Consistency**: All visuals should match brand style
4. **Clear CTAs**: Every section should have a clear call-to-action
5. **Mobile-First**: Design for mobile, enhance for desktop
6. **Fast Loading**: Optimize images and assets
7. **A/B Test Ready**: Structure for easy A/B testing
8. **Track Metrics**: Include analytics for validation tests

## See Also

- `docs/agents/manus-narrative-agent.md` - Manus agent (for copy generation)
- `docs/agents/visual-asset-agent.md` - Visual agent (for assets)
- `docs/agents/elevenlabs-voice-agent.md` - ElevenLabs agent (for audio)
- `docs/agents/demand-validator.md` - Demand-Validator (provides validation context)
- `.cursor/rules/050-manus-integration.mdc` - Manus integration rules
- `.cursor/rules/070-elevenlabs-integration.mdc` - ElevenLabs integration rules
- `.cursor/rules/080-midjourney-canva.mdc` - Visual asset integration rules

