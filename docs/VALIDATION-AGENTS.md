# Part 1: Validation Agents (New + AI-Integrated)

> The 4 new validation agents that integrate AI tools for maximum effectiveness

## Overview

These 4 validation agents are **AI-native** - they're designed specifically to leverage AI tools (Manus.im, ChatGPT, ElevenLabs, Midjourney/Canva) to accelerate and improve validation workflows.

---

## 9. Manus Narrative Agent ⭐ NEW

### Mission

Use Manus.im to generate compelling narratives, analyze competitors, and develop detailed personas that drive desirability validation.

### Primary AI Tool

**Manus.im** - Specialized in narrative understanding, competitor analysis, and persona development

### Core Capabilities

1. **Narrative Generation**
   - Generate 3-5 narrative variations
   - Connect identity-level pain to solution
   - Select strongest narrative based on emotional resonance

2. **Competitor Analysis**
   - Analyze competitor narratives and messaging
   - Identify positioning gaps
   - Find differentiation opportunities

3. **Persona Development**
   - Create personas with identity-level motivations
   - Go beyond functional needs to emotional drivers
   - Validate personas resonate with target community

### When to Use

✅ **Use Manus Agent when**:
- Creating product narratives
- Analyzing competitor positioning
- Developing user personas
- Crafting validation messaging

❌ **Don't use for**:
- Technical documentation (use Cursor)
- Code generation (use Cursor)
- Data analysis (use ChatGPT or Cursor)

### Integration Workflow

```
Step 1: Receive raw insight from Insight Strategist
   ↓
Step 2: @Manus-Narrative-Agent → Generate 5 narrative variations
   ↓
Step 3: Analyze variations for emotional resonance
   ↓
Step 4: Select strongest narrative
   ↓
Step 5: Generate competitor analysis
   ↓
Step 6: Develop detailed personas
   ↓
Output: Narrative + Competitors + Personas
```

### Example Usage

```
@Manus-Narrative-Agent Create a narrative and persona analysis for Enterprise Design System.

Use Manus.im to:
1) Generate 3-5 narrative variations that connect identity-level pain of 
   inconsistent UI development to a design system solution for startup CTOs
2) Analyze competitor narratives in the design system SaaS space
3) Develop detailed personas for CTOs, Heads of Product, and Lead Designers
   with identity-level motivations (not just functional needs)

Output:
- /docs/product/NARRATIVE-enterprise-design-system.md
- /docs/research/COMPETITORS-enterprise-design-system.md
- /docs/research/PERSONA-enterprise-design-system.md
```

### Output Structure

**Narrative Document** (`/docs/product/NARRATIVE-<product>.md`):
- 5 narrative variations
- Selected narrative with reasoning
- Identity-level pain connection
- Emotional resonance analysis

**Competitor Analysis** (`/docs/research/COMPETITORS-<product>.md`):
- Competitor narrative analysis
- Positioning map
- Differentiation opportunities
- Recommendations

**Persona Profiles** (`/docs/research/PERSONA-<product>.md`):
- Identity-level motivations
- Emotional drivers
- Behavioral patterns
- Communication preferences

### Quality Criteria

- ✅ Narrative connects identity-level pain to solution
- ✅ Narrative is emotionally compelling and memorable
- ✅ Competitor analysis identifies clear differentiation
- ✅ Personas reflect real identity-level motivations
- ✅ All outputs ready for validation testing

### Integration Points

- **Input**: Raw insight from Insight Strategist
- **Output**: Used by Product Strategist, Market Scanner, UX Researcher
- **Parallel**: Can run with ChatGPT Reasoning Agent for comparison

---

## 10. ChatGPT Reasoning Agent ⭐ NEW

### Mission

Use ChatGPT for deep reasoning, idea refinement, and accelerated ideation that goes beyond Cursor's capabilities.

### Primary AI Tool

**ChatGPT** (GPT-4-turbo for reasoning, GPT-3.5-turbo for ideation)

### Core Capabilities

1. **Complex Reasoning**
   - Step-by-step problem analysis
   - Chain-of-thought reasoning
   - Multi-factor decision making

2. **Idea Refinement**
   - Identify weaknesses in ideas
   - Propose specific improvements
   - Iterate until quality threshold met

3. **Accelerated Ideation**
   - Generate multiple solution variations
   - Fast iteration (GPT-3.5-turbo)
   - Filter and rank by quality

### When to Use

✅ **Use ChatGPT Agent when**:
- Complex multi-step reasoning problems
- Idea refinement after feedback
- Generating multiple solution variations
- Strategic analysis (market, moat, business model)

❌ **Don't use for**:
- Code generation (use Cursor)
- File operations (use Cursor)
- Simple tasks (use Cursor)

### Integration Workflow

#### Reasoning Workflow

```
Step 1: Define problem with context and constraints
   ↓
Step 2: @ChatGPT-Reasoning-Agent → Chain-of-thought analysis
   ↓
Step 3: Break down into sub-problems
   ↓
Step 4: Analyze each sub-problem
   ↓
Step 5: Synthesize conclusions
   ↓
Step 6: Validate against constraints
   ↓
Output: Reasoning analysis with recommendations
```

#### Refinement Workflow

```
Step 1: Initial idea + feedback
   ↓
Step 2: @ChatGPT-Reasoning-Agent → Identify weaknesses
   ↓
Step 3: Propose improvements
   ↓
Step 4: Refine idea
   ↓
Step 5: Validate refined idea
   ↓
Output: Refined idea with improvement explanation
```

#### Ideation Workflow

```
Step 1: Problem statement + constraints
   ↓
Step 2: @ChatGPT-Reasoning-Agent → Generate 10+ variations (GPT-3.5)
   ↓
Step 3: Filter by quality criteria
   ↓
Step 4: Rank by potential
   ↓
Output: Ranked list of ideas with brief explanations
```

### Example Usage

#### Reasoning Example

```
@ChatGPT-Reasoning-Agent Analyze this problem step-by-step:

Problem: How to build a data moat for a design system SaaS?
Context: 
  - Product: Enterprise Design System for startups
  - Market: Startups, scale-ups, CTOs
  - Current state: No data moat yet
Constraints:
  - Limited resources (solo founder)
  - Fast time-to-market needed
  - Must be defensible long-term

Use chain-of-thought reasoning:
1. Understand the problem
2. Break down into sub-problems
3. Analyze each sub-problem
4. Synthesize conclusions
5. Validate against constraints

Output: /docs/product/REASONING-data-moat-design-system.md
```

#### Refinement Example

```
@ChatGPT-Reasoning-Agent Refine this idea:

Initial Idea: Design system platform with component library
Feedback: 
  - Too generic, no differentiation
  - Missing retention mechanism
  - Unclear expansion revenue path
Constraints:
  - Must target startups specifically
  - Must have clear moat
  - Must scale revenue with usage

Process:
1. Identify weaknesses
2. Propose improvements
3. Refine idea
4. Validate against constraints

Output: /docs/product/REFINED-design-system-platform.md
```

### Model Selection Guide

**Use GPT-4-turbo for**:
- Complex reasoning
- Strategic analysis
- High-stakes refinement
- When quality > speed

**Use GPT-3.5-turbo for**:
- Ideation (multiple variations)
- Simple refinement
- Fast iteration
- When speed > quality

### Output Structure

**Reasoning Analysis** (`/docs/product/REASONING-<topic>.md`):
- Problem breakdown
- Sub-problem analysis
- Synthesized conclusions
- Actionable recommendations

**Refined Idea** (`/docs/product/REFINED-<idea>.md`):
- Initial idea
- Identified weaknesses
- Proposed improvements
- Refined idea with explanation

**Ideation Results** (`/docs/product/IDEAS-<problem>.md`):
- List of ideas (ranked)
- Brief explanations
- Quality scores
- Recommendations

### Quality Criteria

- ✅ Reasoning is clear and step-by-step
- ✅ Refinements address identified weaknesses
- ✅ Ideation produces diverse, high-quality variations
- ✅ All outputs are actionable and specific

### Integration Points

- **Input**: Problems, ideas, feedback from any agent
- **Output**: Used by all agents needing deeper analysis
- **Parallel**: Can run alongside Cursor agents for comparison

---

## 11. ElevenLabs Voice Agent ⭐ NEW

### Mission

Use ElevenLabs to create professional voice content for demos, narrations, and validation materials that build credibility and emotional connection.

### Primary AI Tool

**ElevenLabs** - Professional voice synthesis

### Core Capabilities

1. **Voice Selection**
   - Match voice to product tone
   - Consider target audience
   - Test multiple voices

2. **Script Optimization**
   - Write voice-optimized scripts
   - Natural pauses and emphasis
   - Conversational tone

3. **Audio Generation**
   - Professional quality audio
   - Adjustable voice settings
   - Multiple output formats

### When to Use

✅ **Use ElevenLabs Agent when**:
- Product demo narrations
- Validation test audio content
- Marketing video voiceovers
- Landing page audio elements
- Accessibility audio alternatives

❌ **Don't use for**:
- Long-form content (cost prohibitive)
- Real-time voice (use different tool)
- Music generation (use different tool)

### Integration Workflow

```
Step 1: Receive script from Product Strategist
   ↓
Step 2: @ElevenLabs-Voice-Agent → Select appropriate voice
   ↓
Step 3: Optimize script for voice narration
   ↓
Step 4: Generate audio with optimal settings
   ↓
Step 5: Review and adjust if needed
   ↓
Step 6: Create transcript for accessibility
   ↓
Output: Professional audio + transcript
```

### Example Usage

```
@ElevenLabs-Voice-Agent Create demo narration for Enterprise Design System.

Script:
Welcome to Enterprise Design System.

We help startups and scale-ups ship UI faster and more consistently.

Our platform provides:
- Pre-built component libraries
- Design system management tools
- Team collaboration features

Start your free trial today.

Voice Style: Professional
Target Audience: CTOs, Heads of Product
Duration: Under 60 seconds
Output: /docs/product/DEMO-AUDIO-enterprise-design-system.mp3
```

### Voice Settings Guide

**Stability** (0-1):
- **0.0-0.3**: Very expressive, varies each generation
- **0.4-0.6**: Balanced (recommended for most)
- **0.7-1.0**: Very consistent, same output each time

**Use Cases**:
- Demos: 0.6-0.8 (consistent but natural)
- Narrations: 0.5-0.7 (balanced)
- Creative: 0.3-0.5 (more expressive)

**Similarity** (0-1):
- **0.6-0.8**: Recommended (close to original)
- Higher = closer to original voice

**Style** (0-1):
- **0.4-0.6**: Recommended (moderate style)
- Higher = more style variation

### Output Structure

**Audio File** (`/docs/product/AUDIO-<content>.mp3`):
- Professional quality audio
- Optimized for web delivery
- Multiple formats (mp3, wav)

**Script Document** (`/docs/product/VOICE-SCRIPT-<content>.md`):
- Original script
- Voice settings used
- Usage instructions
- Transcript for accessibility

### Quality Criteria

- ✅ Voice matches product tone and brand
- ✅ Narration is clear and natural-sounding
- ✅ Audio quality is professional
- ✅ Content builds credibility and trust
- ✅ Transcript provided for accessibility

### Integration Points

- **Input**: Scripts from Product Strategist
- **Output**: Used in demos, validation tests, marketing materials
- **Parallel**: Visual Asset Agent (combine audio + visual)

---

## 12. Visual Asset Agent ⭐ NEW

### Mission

Use Midjourney and Canva to create hero images, concept visuals, and marketing assets that communicate product concepts and enhance validation materials.

### Primary AI Tools

**Midjourney** (hero images, concepts) + **Canva** (marketing materials)

### Core Capabilities

1. **Hero Image Generation** (Midjourney)
   - High-impact landing page visuals
   - Brand-consistent styling
   - Multiple variations

2. **Concept Visual Creation** (Midjourney)
   - Feature visualization
   - Workflow illustrations
   - Abstract representations

3. **Marketing Material Design** (Canva)
   - Social media graphics
   - Ad banners
   - Presentation slides

### When to Use

✅ **Use Visual Agent when**:
- Hero images for landing pages
- Concept visuals for product features
- Marketing materials (social, ads)
- Validation test visuals
- Brand identity assets

❌ **Don't use for**:
- UI mockups (use design tools)
- Technical diagrams (use Cursor/diagram tools)
- Code visualizations (use Cursor)

### Integration Workflow

#### Midjourney Workflow

```
Step 1: Define visual brief (style, mood, composition)
   ↓
Step 2: @Visual-Asset-Agent → Craft Midjourney prompt
   ↓
Step 3: Generate 4 variations
   ↓
Step 4: Select best variation
   ↓
Step 5: Upscale to high resolution
   ↓
Step 6: Optimize for web (formats, sizes)
   ↓
Output: Hero image + optimized versions
```

#### Canva Workflow

```
Step 1: Select Canva template
   ↓
Step 2: @Visual-Asset-Agent → Customize with brand elements
   ↓
Step 3: Add content (headlines, CTAs)
   ↓
Step 4: Export in multiple formats
   ↓
Step 5: Optimize for intended use
   ↓
Output: Marketing asset + variants
```

### Example Usage

#### Midjourney Example

```
@Visual-Asset-Agent Create hero image for Enterprise Design System.

Use Midjourney to generate:
- Modern SaaS dashboard interface
- Clean minimalist design
- Professional tech startup aesthetic
- Bright optimistic mood
- Centered composition

Prompt: /imagine prompt: Modern SaaS dashboard interface, clean minimalist design, professional tech startup aesthetic, bright optimistic mood, centered composition, --ar 16:9 --style raw --v 6

Dimensions: 1920x1080
Variations: 4
Output: /docs/product/VISUALS-enterprise-design-system/hero/
```

#### Canva Example

```
@Visual-Asset-Agent Create landing page hero using Canva.

Template: Landing Page Hero
Brand:
  - Colors: #000000, #FFFFFF, #0066FF
  - Fonts: Inter, Roboto
  - Logo: [logo-url]
Content:
  - Headline: "Ship UI Faster"
  - Subheadline: "Enterprise Design System for Startups"
  - CTA: "Start Free Trial"

Dimensions: 1920x1080
Output: /docs/product/VISUALS-enterprise-design-system/marketing/
```

### Midjourney Prompt Engineering

**Prompt Structure**:
```
[subject], [style], [mood], [composition], [technical-settings]
```

**Examples**:

**Hero Image**:
```
/imagine prompt: Modern SaaS platform dashboard, clean minimalist design, professional tech startup aesthetic, bright optimistic mood, centered composition, --ar 16:9 --style raw --v 6
```

**Concept Visual**:
```
/imagine prompt: Design system component library interface, organized grid layout, professional UI design, clean workspace mood, top-down view, --ar 16:9 --style raw --v 6
```

**Brand Visual**:
```
/imagine prompt: Abstract geometric shapes representing design system, modern minimalist style, professional brand aesthetic, balanced composition, --ar 1:1 --style raw --v 6
```

### Output Structure

**Visual Assets Folder** (`/docs/product/VISUALS-<product>/`):
```
VISUALS-enterprise-design-system/
├── hero/
│   ├── hero-1920x1080.webp
│   ├── hero-1920x1080.png
│   └── hero-640x360.webp
├── concepts/
│   ├── feature-1.png
│   └── feature-2.png
└── marketing/
    ├── social-post-1.png
    └── ad-banner-1.png
```

**Asset Documentation** (`/docs/product/BRAND-ASSETS-<product>.md`):
- Asset inventory
- Usage guidelines
- File formats and sizes
- Accessibility notes

### Quality Criteria

- ✅ Visuals communicate product concept clearly
- ✅ Style is consistent with brand identity
- ✅ Assets are optimized for intended use
- ✅ Accessibility requirements met (alt text, contrast)
- ✅ Assets are organized and documented

### Integration Points

- **Input**: Visual requirements from Product Strategist
- **Output**: Used in landing pages, demos, validation materials, marketing
- **Parallel**: ElevenLabs Voice Agent (combine audio + visual)

---

## Validation Agent Workflow

### Complete Validation Workflow

```
Phase 1: Narrative & Insight
1. @Insight-Strategist → Raw insight
2. @Manus-Narrative-Agent → Narrative + Personas (parallel)
3. @ChatGPT-Reasoning-Agent → Refine insight (parallel)
4. Synthesize: Best narrative + refined insight

Phase 2: Market Validation
5. @Market-Scanner → Community research
6. @Manus-Narrative-Agent → Competitor analysis
7. @ChatGPT-Reasoning-Agent → Market signal analysis
8. Validate narrative with community

Phase 3: Asset Creation
9. @Visual-Asset-Agent → Hero images (parallel)
10. @ElevenLabs-Voice-Agent → Demo narration (parallel)
11. Combine assets for validation tests
```

### Quick Reference

**Invoke Validation Agents**:
```
@Manus-Narrative-Agent Create narrative for <PRODUCT>
@ChatGPT-Reasoning-Agent Analyze <TOPIC>
@ElevenLabs-Voice-Agent Create voice for <CONTENT>
@Visual-Asset-Agent Create visuals for <PRODUCT>
```

## See Also

- `docs/agents/manus-narrative-agent.md` - Full Manus agent docs
- `docs/agents/chatgpt-reasoning-agent.md` - Full ChatGPT agent docs
- `docs/agents/elevenlabs-voice-agent.md` - Full ElevenLabs agent docs
- `docs/agents/visual-asset-agent.md` - Full Visual agent docs
- `docs/AI-INTEGRATION-GUIDE.md` - Complete integration guide
- `.cursor/rules/191-194/*.mdc` - Tool-specific integration rules

