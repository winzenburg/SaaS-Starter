# Next-Generation Product Discovery Phase

> Completely redesigned Discovery Phase with full AI integration: Manus, ChatGPT, Cursor 2.1, ElevenLabs, and Midjourney/Canva

## Overview

The Product Discovery Phase is the **single best place to integrate** all AI tools. This next-generation system is a material upgrade that is:

- **Much more powerful**: AI-enhanced agents produce higher-quality outputs
- **Much more consistent**: Standardized workflows ensure quality
- **Explicitly built for niches**: Designed for niche PMF, defensibility, and strong MRR outcomes

## The AI Stack

### Tools Integrated

1. **Manus.im** - Narrative, persona, competitor analysis, pricing insights, social hooks
2. **ChatGPT** - Reasoning, refinement, synthesis, optimization
3. **Cursor 2.1** - Multi-agent execution, structured workflows, code generation
4. **ElevenLabs** - Voice content (founder intro, demo narration, social segments)
5. **Midjourney/Canva** - Visual assets (hero images, social ads, thumbnails)

### AI-Enhanced Agents

**Validation Agents (New)**:
- `@Demand-Validator` (AI-Enhanced) - Validation strategy with Manus + ChatGPT
- `@Landing-Builder` (AI-Enhanced) - Landing pages with Manus + Midjourney/Canva + ElevenLabs
- `@Distribution-Operator` (AI-Enhanced) - Distribution with Manus + ChatGPT
- `@Pricing-Tester` (AI-Enhanced) - Pricing tests with Manus + ChatGPT

**Core Agents (Upgraded)**:
- `@Insight-Strategist` - Now uses Manus for narrative validation
- `@Product-Strategist` - Now ingests Manus persona + JTBD
- `@Market-Scanner` - Now uses ChatGPT for analysis
- `@Retention-Architect` - Now uses ChatGPT for retention design
- `@Moat-MRR-Strategist` - Now uses ChatGPT for moat analysis
- `@Portfolio-Prioritizer` - Now uses ChatGPT for scoring

**AI Validation Agents (New)**:
- `@Manus-Narrative-Agent` - Narrative, competitor, persona generation
- `@ChatGPT-Reasoning-Agent` - Reasoning, refinement, synthesis
- `@ElevenLabs-Voice-Agent` - Voice content generation
- `@Visual-Asset-Agent` - Visual asset generation

## Next-Generation Discovery Workflow

### Phase 1: AI-Powered Insight & Narrative (Steps 1-3)

**Goal**: Generate compelling narrative, personas, and competitor analysis using AI.

#### Step 1: Insight Strategist

**Agent**: `@Insight-Strategist`  
**AI Tools**: None (foundational step)

**Process**:
```
@Insight-Strategist Create an "Unfair Insight + Narrative" brief for <IDEA>.

Output: /docs/product/INSIGHT-<idea-slug>.md
```

**Output**: Unfair insight, target community, early signals, distribution wedge

#### Step 2: Manus Narrative Generation (Parallel)

**Agent**: `@Manus-Narrative-Agent`  
**AI Tools**: **Manus.im**

**Process**:
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

**Output**:
- **Narrative**: Identity-level pain connection, transformation story, value proposition
- **Personas**: Identity-level motivations, emotional drivers, frustrations, where they hang out
- **Competitors**: Positioning gaps, differentiation opportunities, market messaging
- **Pricing**: Price expectations, WTP, budget authority, pricing triggers
- **Hooks**: Social hooks for LinkedIn, X, Reddit, TikTok

#### Step 3: ChatGPT Validation Pack Synthesis

**Agent**: `@ChatGPT-Reasoning-Agent`  
**AI Tools**: **ChatGPT**

**Process**:
```
@ChatGPT-Reasoning-Agent Synthesize and refine Manus outputs into a Validation Pack.

Inputs:
- Narrative: /docs/product/NARRATIVE-<idea-slug>.md
- Persona: /docs/research/PERSONA-<idea-slug>.md
- Competitor: /docs/research/COMPETITORS-<idea-slug>.md
- Insight: /docs/product/INSIGHT-<idea-slug>.md

Process:
1) Synthesize narrative, persona, competitor, and insight
2) Extract key elements:
   - Persona + JTBD extraction
   - Pain language dictionary
   - Competitor landscape + gaps
   - Pricing expectations
   - Value props + hooks
3) Refine and clean language for consistency
4) Structure insights for validation use

Output: /docs/validation/VALIDATION-PACK-<idea-slug>.md
```

**Output**: Validation Pack with all extracted elements, ready for validation agents

### Phase 2: AI-Powered Validation Planning (Steps 4-7)

**Goal**: Create complete validation package using AI-enhanced agents.

#### Step 4: Demand Validator

**Agent**: `@Demand-Validator` (AI-Enhanced)  
**AI Tools**: **Manus.im** + **ChatGPT** + **Cursor**

**Process**:
```
@Demand-Validator Create validation plan for <IDEA>.

Inputs:
- Validation Pack: /docs/validation/VALIDATION-PACK-<idea-slug>.md

Process:
1) Extract JTBD, persona language, frustrations, emotional drivers from Validation Pack
2) @ChatGPT-Reasoning-Agent → Design 8-12 validation tests
3) Define test thresholds (success, kill, pivot, proceed)
4) Create kill/pivot/proceed rules
5) Generate 7-14 day sprint plan

Output: /docs/validation/VALIDATION-PLAN-<idea-slug>.md
```

**Output**: Complete validation plan with tests, thresholds, rules, sprint plan

#### Step 5: Landing Builder

**Agent**: `@Landing-Builder` (AI-Enhanced)  
**AI Tools**: **Manus.im** + **Midjourney/Canva** + **ElevenLabs** + **Cursor**

**Process**:
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

**Output**: Landing page copy, 5 hero variants, A/B headlines, visual prompts, audio script, optional code

#### Step 6: Distribution Operator

**Agent**: `@Distribution-Operator` (AI-Enhanced)  
**AI Tools**: **Manus.im** + **ChatGPT** + **Cursor**

**Process**:
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

**Output**: Top 15 communities, 7-day posting calendar, 20 DM variants, content formats, paid channels

#### Step 7: Pricing Tester

**Agent**: `@Pricing-Tester` (AI-Enhanced)  
**AI Tools**: **Manus.im** + **ChatGPT** + **Cursor**

**Process**:
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

**Output**: 3-5 pricing bands, feature differentiation, fake-door experiments, WTP questions, premium anchor

### Phase 3: AI-Powered Asset Generation (Steps 8-9)

**Goal**: Generate visual and voice assets using AI tools.

#### Step 8: Visual Asset Generation

**Agent**: `@Visual-Asset-Agent`  
**AI Tools**: **Midjourney** + **Canva**

**Process**:
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

**Output**: Hero images, social ad visuals, thumbnails (all optimized and platform-specific)

#### Step 9: Voice Content Generation

**Agent**: `@ElevenLabs-Voice-Agent`  
**AI Tools**: **ElevenLabs**

**Process**:
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

**Output**: Founder intro audio, demo narration, social voice segments (all with transcripts)

### Phase 4: AI-Powered Product Strategy (Steps 10-13)

**Goal**: Create product strategy documents using AI-enhanced agents.

#### Step 10: Market Scanner

**Agent**: `@Market-Scanner` (AI-Enhanced)  
**AI Tools**: **ChatGPT** + **Cursor**

**Process**:
```
@Market-Scanner Analyze market for <IDEA>.

Inputs:
- Insight: /docs/product/INSIGHT-<idea-slug>.md
- Validation Pack: /docs/validation/VALIDATION-PACK-<idea-slug>.md

Process:
1) @ChatGPT-Reasoning-Agent → Analyze community heat
2) @ChatGPT-Reasoning-Agent → Assess niche durability
3) @ChatGPT-Reasoning-Agent → Evaluate social moat potential
4) @ChatGPT-Reasoning-Agent → Analyze competitor retention patterns
5) @ChatGPT-Reasoning-Agent → Assess wave/timing

Output: /docs/research/MARKET-<idea-slug>.md
```

**Output**: Community heat map, niche durability score, social moat potential, competitor analysis, wave/timing

#### Step 11: Product Strategist

**Agent**: `@Product-Strategist` (AI-Enhanced)  
**AI Tools**: **Manus.im** + **ChatGPT** + **Cursor**

**Process**:
```
@Product-Strategist Create Demand-Driven PRD for <IDEA>.

Inputs:
- Insight: /docs/product/INSIGHT-<idea-slug>.md
- Manus Persona: /docs/research/PERSONA-<idea-slug>.md (REQUIRED)
- Manus JTBD: [Extract from Manus outputs] (REQUIRED)
- Validation Pack: /docs/validation/VALIDATION-PACK-<idea-slug>.md

Process:
1) Extract persona language, identity-level motivations, and JTBD from Manus outputs
2) @ChatGPT-Reasoning-Agent → Refine PRD structure and optimize success metrics
3) Create PRD using Manus persona language and JTBD

Output: /docs/product/PRD-<idea-slug>.md
```

**Output**: Complete PRD with all 17 required sections, using Manus persona language and JTBD

#### Step 12: Retention Architect

**Agent**: `@Retention-Architect` (AI-Enhanced)  
**AI Tools**: **ChatGPT** + **Cursor**

**Process**:
```
@Retention-Architect Design retention architecture for <IDEA>.

Inputs:
- PRD: /docs/product/PRD-<idea-slug>.md
- Validation Pack: /docs/validation/VALIDATION-PACK-<idea-slug>.md

Process:
1) @ChatGPT-Reasoning-Agent → Design activation path
2) @ChatGPT-Reasoning-Agent → Map weekly/monthly value drivers
3) @ChatGPT-Reasoning-Agent → Design notification/re-engagement triggers
4) @ChatGPT-Reasoning-Agent → Design churn-prevention mechanisms

Output: /docs/product/RETENTION-<idea-slug>.md
```

**Output**: Activation path, weekly/monthly value drivers, notification triggers, churn-prevention design

#### Step 13: Moat & MRR Strategist

**Agent**: `@Moat-MRR-Strategist` (AI-Enhanced)  
**AI Tools**: **ChatGPT** + **Cursor**

**Process**:
```
@Moat-MRR-Strategist Create moat and MRR strategy for <IDEA>.

Inputs:
- PRD: /docs/product/PRD-<idea-slug>.md
- Retention Architecture: /docs/product/RETENTION-<idea-slug>.md
- Validation Pack: /docs/validation/VALIDATION-PACK-<idea-slug>.md

Process:
1) @ChatGPT-Reasoning-Agent → Select 2-3 moat types
2) @ChatGPT-Reasoning-Agent → Design Data Moat Thesis
3) @ChatGPT-Reasoning-Agent → Design expansion revenue model
4) @ChatGPT-Reasoning-Agent → Analyze churn risks and mitigation

Output: /docs/product/MOAT-MRR-<idea-slug>.md
```

**Output**: Moat map (2-3 types), Data Moat Thesis, expansion revenue model, churn risks + mitigation

### Phase 5: Final Decision (Step 14)

**Goal**: Make final kill/pivot/proceed decision using portfolio scoring.

#### Step 14: Portfolio Prioritizer

**Agent**: `@Portfolio-Prioritizer` (AI-Enhanced)  
**AI Tools**: **ChatGPT** + **Cursor**

**Process**:
```
@Portfolio-Prioritizer Score and prioritize <IDEA>.

Inputs:
- All discovery documents (Insight, PRD, Retention, Moat-MRR, Market, Validation Pack)

Process:
1) @ChatGPT-Reasoning-Agent → Calculate desirability signal strength
2) @ChatGPT-Reasoning-Agent → Calculate Niche Durability Score
3) @ChatGPT-Reasoning-Agent → Assess moat potential
4) @ChatGPT-Reasoning-Agent → Assess expansion revenue depth
5) @ChatGPT-Reasoning-Agent → Map JTBD frequency
6) @ChatGPT-Reasoning-Agent → Analyze wave/timing
7) @ChatGPT-Reasoning-Agent → Calculate expected value (EV)
8) Make kill/pivot/proceed decision

Output: /docs/product/PORTFOLIO-SCORE-<idea-slug>.md
```

**Output**: Portfolio score, expected value model, final verdict (kill/pivot/proceed)

## Complete Discovery Workflow

```
Phase 1: AI-Powered Insight & Narrative
  1. @Insight-Strategist → Unfair Insight Brief
  2. @Manus-Narrative-Agent → Narrative + Personas + Competitors (parallel)
  3. @ChatGPT-Reasoning-Agent → Validation Pack Synthesis

Phase 2: AI-Powered Validation Planning
  4. @Demand-Validator → Validation Plan (8-12 tests, thresholds, sprint)
  5. @Landing-Builder → Landing Page (copy, visuals, audio, optional code)
  6. @Distribution-Operator → Distribution Strategy (communities, calendar, DMs)
  7. @Pricing-Tester → Pricing Test Strategy (bands, features, fake-door, WTP)

Phase 3: AI-Powered Asset Generation
  8. @Visual-Asset-Agent → Visual Assets (hero, social, thumbnails)
  9. @ElevenLabs-Voice-Agent → Voice Content (founder intro, demo, social)

Phase 4: AI-Powered Product Strategy
  10. @Market-Scanner → Market Analysis (heat, durability, moat, wave)
  11. @Product-Strategist → PRD (with Manus persona + JTBD)
  12. @Retention-Architect → Retention Architecture (activation, value drivers, triggers)
  13. @Moat-MRR-Strategist → Moat & MRR Strategy (moats, data moat, expansion revenue)

Phase 5: Final Decision
  14. @Portfolio-Prioritizer → Portfolio Score + Kill/Pivot/Proceed Decision
```

## Key Improvements Over Original System

### 1. AI Integration at Every Step

**Original**: Manual narrative and persona creation  
**Next-Gen**: Manus.im generates narrative, personas, competitors, pricing, hooks automatically

**Original**: Manual validation planning  
**Next-Gen**: ChatGPT + Cursor agents create validation plans with 8-12 tests automatically

**Original**: Manual landing page creation  
**Next-Gen**: Manus + Midjourney/Canva + ElevenLabs + Cursor create complete landing pages automatically

### 2. Consistent Quality

**Original**: Quality varies by agent execution  
**Next-Gen**: Standardized workflows ensure consistent quality across all outputs

**Original**: Manual extraction of insights  
**Next-Gen**: ChatGPT synthesizes and structures all insights automatically

**Original**: Manual asset creation  
**Next-Gen**: AI tools generate visual and voice assets automatically

### 3. Built for Niches, Defensibility, MRR

**Original**: Focus on desirability validation  
**Next-Gen**: Explicit focus on niche durability, defensibility (moats), and MRR outcomes

**Original**: Manual moat analysis  
**Next-Gen**: ChatGPT analyzes moat potential and designs Data Moat Thesis automatically

**Original**: Manual retention design  
**Next-Gen**: ChatGPT designs retention architecture with activation, value drivers, triggers automatically

### 4. Complete Validation Package

**Original**: Validation plan only  
**Next-Gen**: Complete validation package with landing page, distribution, pricing, visuals, voice, and execution plan

**Original**: Manual distribution planning  
**Next-Gen**: AI agents create top 15 communities, 7-day calendar, 20 DM variants automatically

**Original**: Manual pricing strategy  
**Next-Gen**: AI agents create 3-5 pricing bands, feature differentiation, fake-door experiments automatically

## Output Documents

### Validation Documents (`/docs/validation/`)
- `VALIDATION-PACK-<idea-slug>.md` - Synthesized insights from all sources
- `VALIDATION-PLAN-<idea-slug>.md` - Complete validation plan
- `LANDING-<idea-slug>.md` - Landing page copy, visuals, audio
- `DISTRIBUTION-<idea-slug>.md` - Distribution strategy
- `PRICING-TEST-<idea-slug>.md` - Pricing test strategy
- `RESULTS-<idea-slug>.md` - Results tracking (created during execution)

### Product Documents (`/docs/product/`)
- `INSIGHT-<idea-slug>.md` - Unfair insight brief
- `NARRATIVE-<idea-slug>.md` - Narrative from Manus
- `PRD-<idea-slug>.md` - Product requirements document
- `RETENTION-<idea-slug>.md` - Retention architecture
- `MOAT-MRR-<idea-slug>.md` - Moat and MRR strategy
- `PORTFOLIO-SCORE-<idea-slug>.md` - Portfolio score and decision

### Research Documents (`/docs/research/`)
- `PERSONA-<idea-slug>.md` - Personas from Manus
- `COMPETITORS-<idea-slug>.md` - Competitor analysis from Manus
- `MARKET-<idea-slug>.md` - Market analysis

### Visual Assets (`/docs/product/VISUALS-<idea-slug>/`)
- `hero/` - Hero images (Midjourney/Canva)
- `social/` - Social ad visuals (Canva)
- `thumbnails/` - Thumbnail visuals (Canva)

### Voice Assets (`/docs/product/`)
- `FOUNDER-INTRO-<idea-slug>.mp3` - Founder intro audio (ElevenLabs)
- `DEMO-NARRATION-<idea-slug>.mp3` - Demo narration audio (ElevenLabs)
- `SOCIAL-VOICE-<idea-slug>/` - Social voice segments (ElevenLabs)

## Quality Gates

**Discovery Phase must pass all quality gates**:

- ✅ **Phase 1**: Manus outputs are complete and high-quality
- ✅ **Phase 1**: Validation Pack synthesizes all elements clearly
- ✅ **Phase 2**: All validation documents are complete and actionable
- ✅ **Phase 3**: Visual assets are generated and optimized
- ✅ **Phase 3**: Voice content is generated with transcripts
- ✅ **Phase 4**: All product strategy documents are complete
- ✅ **Phase 5**: Portfolio score is calculated and decision is clear

## Integration with Other Systems

- **Before Discovery**: Raw product idea, portfolio scoring
- **After Discovery**: Complete validation package, product strategy, kill/pivot/proceed decision
- **Next Steps**: If proceed → Execute validation sprint → PRD → Engineering

## See Also

- `docs/UNIFIED-PIPELINE.md` - Complete validation pipeline
- `docs/prompts/MASTER-VALIDATION-PROMPT.md` - Master validation prompt
- `.cursor/rules/040-demand-validation.mdc` - Demand validation rules
- `.cursor/rules/050-manus-integration.mdc` - Manus consumption patterns
- `.cursor/rules/060-elevenlabs-integration.mdc` - ElevenLabs requirements
- `.cursor/rules/070-midjourney-canva.mdc` - Visual asset requirements
- `.cursor/rules/080-distribution.mdc` - Distribution requirements
- `docs/agents/` - All agent definitions

