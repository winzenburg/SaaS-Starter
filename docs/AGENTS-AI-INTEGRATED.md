# Complete Agent Guide (30 Agents, AI-Integrated)

> Complete guide to all agents with AI tool integrations

## Overview

This system includes **30 agents**:
- **1 Orchestrator** (Factory Foreman)
- **4 Discovery Agents** (Niche, Pain, JTBD, Opportunity)
- **5 Validation Agents** (Demand-Validator, Landing-Builder, Distribution-Operator, Pricing-Tester, Creative-Batch-Operator)
- **1 Red-Team Strategist** (Claude-first)
- **3 Platform Integration Agents** (Analytics, Data Platform, Auth/Onboarding)
- **16 Core Agents** (Product, Engineering, UX, etc.)

All agents are integrated with AI tools for maximum effectiveness.

## Core Agents (13) - AI-Enhanced

### 1. Insight & Narrative Strategist

**Mission**: Identify unfair insights and craft compelling narratives that connect identity-level pain to solutions.

**AI Tool Integrations**:
- **Manus.im**: Generate narrative variations, analyze competitor narratives
- **ChatGPT**: Refine insights, analyze market signals
- **Visual Asset Agent**: Create concept visuals for insights

**Workflow**:
```
1. Identify raw insight (manual or ChatGPT-assisted)
2. @Manus-Narrative-Agent → Generate 5 narrative variations
3. @ChatGPT-Reasoning-Agent → Analyze which narrative is strongest
4. @Visual-Asset-Agent → Create concept visual for insight
5. Output: Unfair Insight Brief with narrative + visual
```

**Outputs**: `/docs/product/INSIGHT-<product>.md`

**AI-Enhanced Features**:
- Narrative generation via Manus.im
- Insight refinement via ChatGPT
- Visual concept creation

---

### 6. Product Strategist ⭐ UPGRADED (AI-Enhanced)

**Mission**: Create narrative-driven PRDs that validate desirability before building, using Manus persona + JTBD.

**AI Tool Integrations**:
- **Manus.im**: Extract persona insights and JTBD from Manus outputs
- **ChatGPT**: Refine PRD structure, optimize success metrics, analyze risks

**Workflow**:
```
1. Receive Manus Persona + JTBD (from Manus Narrative Agent)
2. Extract persona language, identity-level motivations, JTBD
3. @ChatGPT-Reasoning-Agent → Refine PRD structure and optimize success metrics
4. Create PRD using Manus persona language and JTBD
5. Include: Success metrics, risks, analytics, feature flags
6. Output: Complete PRD with all required sections
```

**Outputs**: `/docs/product/PRD-<product>.md`

**AI-Enhanced Features**:
- Ingests Manus persona + JTBD (REQUIRED)
- Uses Manus persona language in user stories
- Extracts early adopter profile from Manus personas
- ChatGPT optimizes success metrics and risk analysis
- Comprehensive PRD with success metrics, risks, analytics, feature flags

---

### 7. Moat & MRR Strategist

**Mission**: Design defensibility, monetization, and long-term durability.

**AI Tool Integrations**:
- **ChatGPT**: Deep reasoning on moat strategies, expansion revenue analysis
- **Manus.im**: Competitive moat positioning

**Workflow**:
```
1. Analyze product for moat opportunities
2. @ChatGPT-Reasoning-Agent → Deep analysis of moat strategies
3. @ChatGPT-Reasoning-Agent → Expansion revenue modeling
4. @Manus-Narrative-Agent → Competitive positioning analysis
5. Output: Moat + MRR strategy
```

**Outputs**: `/docs/product/MOAT-MRR-<product>.md`

**AI-Enhanced Features**:
- Strategic reasoning via ChatGPT
- Competitive analysis via Manus.im

---

### 8. Retention Architect

**Mission**: Design activation → habit → retention → expansion loops before code exists.

**AI Tool Integrations**:
- **ChatGPT**: Analyze retention patterns, design habit loops
- **ElevenLabs**: Create notification voice prompts

**Workflow**:
```
1. Design activation path
2. @ChatGPT-Reasoning-Agent → Analyze retention patterns
3. @ChatGPT-Reasoning-Agent → Design habit loops
4. @ElevenLabs-Voice-Agent → Create notification voice prompts
5. Output: Retention architecture
```

**Outputs**: `/docs/product/RETENTION-<product>.md`

**AI-Enhanced Features**:
- Retention pattern analysis via ChatGPT
- Voice notification design via ElevenLabs

---

### 9. Portfolio Prioritizer

**Mission**: Score, prioritize, and greenlight ideas for maximum expected value.

**AI Tool Integrations**:
- **ChatGPT**: Expected value modeling, risk analysis

**Workflow**:
```
1. Score ideas on 8 criteria
2. @ChatGPT-Reasoning-Agent → Expected value modeling
3. @ChatGPT-Reasoning-Agent → Risk analysis
4. Output: Portfolio score with EV model
```

**Outputs**: `/docs/product/PORTFOLIO-SCORE-<idea>.md`

**AI-Enhanced Features**:
- EV modeling via ChatGPT
- Risk analysis via ChatGPT

---

### 10. Market Scanner

**Mission**: Scan communities for heat signals and validate niche durability.

**AI Tool Integrations**:
- **Manus.im**: Competitor narrative analysis
- **ChatGPT**: Market signal analysis, trend identification

**Workflow**:
```
1. Scan communities for heat signals
2. @Manus-Narrative-Agent → Analyze competitor narratives
3. @ChatGPT-Reasoning-Agent → Analyze market signals
4. Output: Market scan with competitor analysis
```

**Outputs**: `/docs/research/MARKET-<product>.md`

**AI-Enhanced Features**:
- Competitor analysis via Manus.im
- Market signal analysis via ChatGPT

---

### 11. UX Researcher ⭐ UPGRADED (AI-Enhanced)

**Mission**: Conduct identity + narrative-aligned user research using Manus persona + pain language.

**AI Tool Integrations**:
- **Manus.im**: Extract persona language and pain points from Manus outputs
- **ChatGPT**: Refine interview scripts, optimize usability tests, synthesize research

**Workflow**:
```
1. Receive Manus Persona (REQUIRED)
2. Extract persona language, pain points, identity-level motivations
3. @ChatGPT-Reasoning-Agent → Refine interview scripts and usability tests
4. Create interview scripts using Manus persona language and pain language
5. Create usability tests using Manus pain language and persona context
6. Conduct research (using Manus persona language)
7. Synthesize findings (map to Manus persona and pain points)
8. Output: Research synthesis with Manus persona validation
```

**Outputs**: 
- `/docs/research/JTBD-<feature>.md` - Interview scripts
- `/docs/research/usability-<feature>.md` - Usability test plans
- `/docs/research/synthesis-<feature>.md` - Research synthesis

**AI-Enhanced Features**:
- Ingests Manus persona + pain language (REQUIRED)
- Uses Manus persona language in all interview scripts
- Uses Manus pain language in all usability tests
- Maps research findings back to Manus persona
- ChatGPT optimizes research approach and synthesis

---

### 12. IA Designer ⭐ UPGRADED (AI-Enhanced)

**Mission**: Design information architecture, user flows, keyboard flows, and wireframes using Manus JTBD and Midjourney/Canva visuals.

**AI Tool Integrations**:
- **Manus.im**: Extract JTBD from Manus outputs
- **Visual Asset Agent (Midjourney/Canva)**: Create wireframe visuals and flow diagrams
- **ChatGPT**: IA pattern analysis, flow optimization

**Workflow**:
```
1. Receive Manus JTBD (REQUIRED)
2. Extract JTBD, job triggers, context from Manus outputs
3. @Visual-Asset-Agent → Create wireframe visuals via Midjourney/Canva
4. @ChatGPT-Reasoning-Agent → Analyze IA patterns and optimize flows
5. Design IA organized around Manus JTBD
6. Create user flows aligned with Manus JTBD steps
7. Create keyboard flows for accessibility
8. Create wireframes with visual assets
9. Output: Complete IA, flows, keyboard flows, wireframes
```

**Outputs**: 
- `/docs/ux/IA-<product>.md` - Information architecture
- `/docs/ux/user-flows-<product>.md` - User flows
- `/docs/ux/keyboard-flows-<product>.md` - Keyboard flows
- `/docs/ux/wireframes-<product>.md` - Wireframes with visuals

**AI-Enhanced Features**:
- Ingests Manus JTBD (REQUIRED)
- Uses Manus JTBD to inform IA structure and flows
- Creates wireframe visuals via Midjourney/Canva
- Creates visual flow diagrams via Midjourney/Canva
- ChatGPT optimizes IA patterns and flows

---

### 13. Accessibility Agent ⭐ UPGRADED (AI-Enhanced)

**Mission**: Audit, test, and fix accessibility issues for WCAG 2.2 AA compliance. Create screen reader flows and provide actionable a11y fixes.

**AI Tool Integrations**:
- **ChatGPT**: Analyze accessibility issues, optimize remediation strategies, generate screen reader flow documentation

**Workflow**:
```
1. Receive inputs (components, keyboard flows from IA Designer)
2. Run automated checks (@axe-core/react, @axe-core/playwright)
3. Complete manual audit (WCAG 2.2 AA all criteria)
4. Test with keyboard only
5. Test with screen readers (NVDA, JAWS, VoiceOver)
6. @ChatGPT-Reasoning-Agent → Analyze issues and optimize remediation
7. Create screen reader flows for all key journeys
8. Generate prioritized fixes with actionable diffs
9. Output: Complete accessibility audit with fixes and screen reader flows
```

**Outputs**: 
- `/docs/ux/accessibility-audit-<product>.md` - Complete WCAG 2.2 AA audit
- `/docs/ux/screen-reader-flows-<product>.md` - Screen reader flow documentation
- Remediation diffs list (prioritized fixes with actionable code changes)

**AI-Enhanced Features**:
- ChatGPT analyzes accessibility issues and optimizes remediation strategies
- ChatGPT generates comprehensive screen reader flow documentation
- All fixes include actionable code changes (ready-to-apply diffs)
- WCAG 2.2 AA compliance testing (Level A, AA, AAA optional, WCAG 2.2 new criteria)
- Screen reader flows documented for all key user journeys

---

### 14. Engineering Architect ⭐ UPGRADED (AI-Enhanced)

**Mission**: Design architecture, data models (Drizzle), API design (tRPC), multi-tenancy, and auth via ADR. Use AI to optimize technical decisions and analyze tradeoffs.

**AI Tool Integrations**:
- **ChatGPT**: Analyze technical approaches, optimize architecture decisions, evaluate tradeoffs, suggest patterns

**Workflow**:
```
1. Receive inputs (PRD, user flows, retention architecture, moat strategy)
2. @ChatGPT-Reasoning-Agent → Analyze technical approaches
   - Evaluate multiple architecture options
   - Analyze tradeoffs (performance, complexity, maintainability)
   - Suggest optimal patterns (Drizzle, tRPC, multi-tenancy, auth)
   - Optimize schema design
3. Design Drizzle schema (with multi-tenancy, enterprise primitives)
4. Design tRPC router (with auth, RBAC, rate limiting)
5. Design UI structure
6. Define multi-tenancy rules (orgId scoping, tenant isolation)
7. Define auth patterns (authentication, authorization, RBAC)
8. Document alternatives and tradeoffs
9. Create ADR
```

**Outputs**: 
- `/docs/engineering/ADR/###-<feature>.md` - Architecture Decision Record
- Drizzle schema plan (changes to `/drizzle/schema.ts`)
- tRPC router plan (`src/features/<feature>/data/router.ts`)
- UI structure plan (`src/features/<feature>/ui`)
- Multi-tenancy rules (orgId scoping, tenant isolation)
- Auth patterns (authentication, authorization, RBAC)

**AI-Enhanced Features**:
- ChatGPT analyzes technical approaches and optimizes architecture decisions
- ChatGPT evaluates tradeoffs (performance, complexity, maintainability)
- ChatGPT suggests optimal patterns for Drizzle, tRPC, multi-tenancy, and auth
- All architecture decisions documented with rationale and alternatives
- Enterprise-readiness primitives included (audit_log, RBAC, export/delete, rate limiting)
- All architecture decisions documented with rationale and alternatives

---

### 15. Test Engineer ⭐ UPGRADED (AI-Enhanced)

**Mission**: Define test strategy and generate unit tests, integration tests, and E2E (Playwright) tests that match specs. Use AI to optimize test coverage and identify edge cases.

**AI Tool Integrations**:
- **ChatGPT**: Optimize test strategy, identify edge cases, suggest test patterns, analyze test coverage

**Workflow**:
```
1. Receive inputs (PRD with acceptance criteria, ADR with technical specs)
2. @ChatGPT-Reasoning-Agent → Optimize test strategy
   - Analyze acceptance criteria
   - Identify edge cases
   - Suggest test patterns
   - Optimize test coverage
3. Create test plan (map tests to acceptance criteria, identify invariants)
4. Generate unit tests (domain logic, invariants)
5. Generate integration tests (tRPC + DB, multi-tenancy, RBAC)
6. Generate E2E tests (Playwright, critical journeys)
7. Output: Complete test suite
```

**Outputs**: 
- Unit tests (`src/features/<feature>/domain/*.test.ts`)
- Integration tests (`src/features/<feature>/data/*.test.ts`)
- E2E tests (`e2e/<feature>/*.spec.ts`)
- Test plan document

**AI-Enhanced Features**:
- ChatGPT optimizes test strategy and identifies edge cases
- ChatGPT suggests test patterns and analyzes coverage
- All acceptance criteria mapped to tests (unit, integration, or E2E)
- All domain invariants explicitly tested
- Multi-tenancy and RBAC tested (integration and E2E)
- Realistic seed scenarios for E2E tests

---

### 16. Implementer ⭐ UPGRADED (AI-Enhanced)

**Mission**: Build features using Next.js, TypeScript, tRPC, Drizzle, and shadcn/ui following PRD/ADR/tests, with small diffs. Use AI to optimize code quality and suggest patterns.

**AI Tool Integrations**:
- **ChatGPT**: Optimize code patterns, suggest implementations, review code quality, identify edge cases

**Workflow**:
```
1. Receive inputs (PRD, ADR, test plan, user flows, keyboard flows)
2. Pre-implementation check (Don't gold-plate)
3. @ChatGPT-Reasoning-Agent → Optimize implementation patterns
   - Suggest Next.js App Router patterns
   - Optimize TypeScript types
   - Review tRPC procedures
   - Optimize Drizzle queries
   - Suggest shadcn/ui components
4. Implement (MVP-first, small diffs):
   - Schema (Drizzle)
   - Domain layer (TypeScript, Zod)
   - Data layer (tRPC, Drizzle)
   - UI layer (Next.js, shadcn/ui)
   - Route shells (Next.js App Router)
5. Verify: All tests pass, code quality, observability, feature flags
```

**Outputs**: 
- Complete feature implementation:
  - Schema (`/drizzle/schema.ts`)
  - Domain layer (`src/features/<feature>/domain/`)
  - Data layer (`src/features/<feature>/data/`)
  - UI layer (`src/features/<feature>/ui/`)
  - Route shells (`/app/(app)/<feature>/`)
- Passing tests (all tests green)
- Observability events (success/failure on server actions)
- Feature flag gates (where specified in PRD)

**AI-Enhanced Features**:
- ChatGPT optimizes code patterns and suggests implementations
- ChatGPT reviews code quality and identifies edge cases
- All technologies explicitly covered (Next.js, TypeScript, tRPC, Drizzle, shadcn/ui)
- MVP-first approach (smallest surface area to validate narrative)
- Don't gold-plate (feature must be essential, can't test manually, no no-code version)

---

### 17. Growth Loop Agent ⭐ NEW (AI-Enhanced)

**Mission**: Turn early signals into growth loops by designing referrals, viral loops, incentive systems, and retention triggers. Use AI to analyze user behavior and optimize growth mechanisms.

**AI Tool Integrations**:
- **Manus.im**: Analyze user motivations, design referral messaging, create incentive narratives
- **ChatGPT**: Analyze growth patterns, optimize loop mechanics, design incentive systems, model viral coefficients

**Workflow**:
```
1. Receive inputs (early signals, product usage data, retention architecture, moat strategy)
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
4. Design referral loops (leverage identity-level motivations)
5. Design viral loops (clear value exchange)
6. Design incentive systems (sustainable, scalable)
7. Design retention triggers (aligned with retention architecture)
8. Output: Complete growth loop strategy
```

**Outputs**: 
- `/docs/product/GROWTH-LOOPS-<feature>.md` - Complete growth loop strategy
- Referral system design
- Viral loop mechanics
- Incentive system design
- Retention trigger design

**AI-Enhanced Features**:
- Manus analyzes user motivations and designs referral messaging
- ChatGPT optimizes growth loops and models viral coefficients
- Referral loops leverage identity-level motivations (from Manus)
- Viral loops have clear value exchange
- Incentive systems are sustainable and scalable
- Retention triggers aligned with retention architecture

---

## Validation Agents (4 NEW) - AI-Native

### 18. Manus Narrative Agent ⭐ NEW

**Mission**: Use Manus.im to generate compelling narratives, analyze competitors, and develop personas.

**Primary AI Tool**: **Manus.im**

**Capabilities**:
- Narrative generation (5 variations, select best)
- Competitor narrative analysis
- Persona development with identity-level motivations

**When to Use**:
- Creating product narratives
- Analyzing competitor positioning
- Developing user personas
- Crafting validation messaging

**Integration Points**:
- **Input**: Raw insight from Insight Strategist
- **Output**: Narrative, personas, competitor analysis
- **Used By**: Product Strategist, Market Scanner, UX Researcher

**Workflow**:
```
@Manus-Narrative-Agent Create narrative and persona analysis for <PRODUCT>.

Use Manus.im to:
1) Generate 3-5 narrative variations
2) Analyze competitor narratives
3) Develop detailed personas

Output:
- /docs/product/NARRATIVE-<product>.md
- /docs/research/COMPETITORS-<product>.md
- /docs/research/PERSONA-<product>.md
```

**Quality Criteria**:
- ✅ Narrative connects identity-level pain to solution
- ✅ Emotionally compelling and memorable
- ✅ Competitor analysis identifies differentiation
- ✅ Personas reflect identity-level motivations

---

### 19. ChatGPT Reasoning Agent ⭐ NEW

**Mission**: Use ChatGPT for deep reasoning, idea refinement, and accelerated ideation.

**Primary AI Tool**: **ChatGPT** (GPT-4 for reasoning, GPT-3.5 for ideation)

**Capabilities**:
- Complex multi-step reasoning
- Idea refinement and improvement
- Accelerated ideation (multiple variations)
- Strategic analysis

**When to Use**:
- Complex reasoning problems
- Idea refinement after feedback
- Generating multiple solution variations
- Strategic analysis (market, moat, business model)

**Integration Points**:
- **Input**: Problems, ideas, feedback
- **Output**: Reasoning analysis, refined ideas, ideation results
- **Used By**: All agents needing deeper analysis

**Workflow**:
```
@ChatGPT-Reasoning-Agent Analyze and refine <TOPIC/IDEA>.

Use ChatGPT to:
1) Perform deep reasoning (if complex problem)
2) Refine and improve (if refinement needed)
3) Generate variations (if ideation needed)

Model: gpt-4-turbo (reasoning) or gpt-3.5-turbo (ideation)
Output: /docs/product/<OUTPUT-FILE>.md
```

**Quality Criteria**:
- ✅ Reasoning is clear and step-by-step
- ✅ Refinements address weaknesses
- ✅ Ideation produces diverse, high-quality variations
- ✅ Outputs are actionable and specific

---

### 20. ElevenLabs Voice Agent ⭐ NEW

**Mission**: Use ElevenLabs to create professional voice content for demos, narrations, and validation.

**Primary AI Tool**: **ElevenLabs**

**Capabilities**:
- Demo narration generation
- Validation test audio content
- Marketing voiceovers
- Voice script optimization

**When to Use**:
- Product demo narrations
- Validation test audio
- Marketing video voiceovers
- Landing page audio elements

**Integration Points**:
- **Input**: Scripts from Product Strategist
- **Output**: Professional audio files
- **Used By**: Validation tests, demos, marketing materials

**Workflow**:
```
@ElevenLabs-Voice-Agent Create voice content for <CONTENT-TYPE>.

Use ElevenLabs to:
1) Generate professional voice narration
2) Select appropriate voice for audience
3) Optimize audio for use case

Script: <SCRIPT-CONTENT>
Voice Style: <PROFESSIONAL|FRIENDLY|AUTHORITATIVE>
Output: /docs/product/AUDIO-<content>.mp3
```

**Quality Criteria**:
- ✅ Voice matches product tone and brand
- ✅ Narration is clear and natural-sounding
- ✅ Audio quality is professional
- ✅ Content builds credibility and trust

---

### 21. Visual Asset Agent ⭐ NEW

**Mission**: Use Midjourney and Canva to create hero images, concept visuals, and marketing assets.

**Primary AI Tools**: **Midjourney** (hero images, concepts) + **Canva** (marketing materials)

**Capabilities**:
- Hero image generation (Midjourney)
- Concept visual creation (Midjourney)
- Marketing material design (Canva)
- Asset optimization

**When to Use**:
- Hero images for landing pages
- Concept visuals for product features
- Marketing materials (social, ads)
- Validation test visuals

**Integration Points**:
- **Input**: Visual requirements from Product Strategist
- **Output**: Optimized visual assets
- **Used By**: Landing pages, demos, validation materials, marketing

**Workflow**:
```
@Visual-Asset-Agent Create visual assets for <PRODUCT/FEATURE>.

Use Midjourney/Canva to:
1) Generate hero images matching brand style
2) Create concept visuals for key features
3) Develop visual assets for validation materials

Style: <DESCRIBE-VISUAL-STYLE>
Dimensions: <WIDTHxHEIGHT>
Output: /docs/product/VISUALS-<product>/
```

**Quality Criteria**:
- ✅ Visuals communicate product concept clearly
- ✅ Style is consistent with brand identity
- ✅ Assets are optimized for intended use
- ✅ Accessibility requirements met

---

## Agent Integration Matrix

| Agent | Manus.im | ChatGPT | ElevenLabs | Visual | Primary Use |
|-------|----------|---------|------------|--------|-------------|
| **Demand-Validator** | ✅ Extract | ✅ Design | ❌ | ❌ | **Validation plans** |
| **Landing-Builder** | ✅ Copy | ❌ | ✅ Audio | ✅ Visuals | **Landing pages** |
| **Distribution-Operator** | ✅ Hooks/DMs | ✅ Cadences | ❌ | ❌ | **Distribution** |
| **Pricing-Tester** | ✅ Expectations | ✅ Packaging | ❌ | ❌ | **Pricing** |
| Insight Strategist | ✅ Narrative | ✅ Refinement | ❌ | ✅ Concepts | Narrative generation |
| Product Strategist | ✅ Personas | ✅ Strategy | ❌ | ✅ Features | PRD creation |
| Moat & MRR Strategist | ✅ Competitive | ✅ Reasoning | ❌ | ❌ | Moat design |
| Retention Architect | ❌ | ✅ Patterns | ✅ Notifications | ❌ | Retention loops |
| Portfolio Prioritizer | ❌ | ✅ EV Modeling | ❌ | ❌ | Prioritization |
| Market Scanner | ✅ Competitors | ✅ Signals | ❌ | ❌ | Market research |
| UX Researcher | ✅ Personas | ✅ Scripts | ❌ | ❌ | User research |
| IA Designer | ❌ | ✅ Patterns | ❌ | ✅ Flows | IA design |
| Accessibility Agent | ❌ | ✅ Analysis | ❌ | ❌ | A11y audit |
| Engineering Architect | ❌ | ✅ Optimization | ❌ | ❌ | Architecture |
| Test Engineer | ❌ | ✅ Strategy | ❌ | ❌ | Testing |
| Implementer | ❌ | ✅ Patterns | ❌ | ❌ | Implementation |
| **Manus Agent** | ✅ **Primary** | ❌ | ❌ | ❌ | **Narratives** |
| **ChatGPT Agent** | ❌ | ✅ **Primary** | ❌ | ❌ | **Reasoning** |
| **ElevenLabs Agent** | ❌ | ❌ | ✅ **Primary** | ❌ | **Voice** |
| **Visual Agent** | ❌ | ❌ | ❌ | ✅ **Primary** | **Visuals** |

## Workflow Integration

### Validation Workflow (AI-Enhanced)

```
Phase 1: Insight & Narrative
1. @Insight-Strategist → Raw insight
2. @Manus-Narrative-Agent → Narrative + Personas (parallel)
3. @Market-Scanner → Community research (parallel)
4. @ChatGPT-Reasoning-Agent → Refine insight (parallel)
5. Synthesize: Best narrative + refined insight

Phase 2: Validation Planning
6. @Demand-Validator → Extract elements from Manus outputs
7. @ChatGPT-Reasoning-Agent → Design 8-12 validation tests
8. @Demand-Validator → Create validation plan with thresholds
9. Create 7-14 day sprint plan

Phase 2b: Landing Page Creation
10. @Landing-Builder → Generate hero section (5 variants)
11. @Landing-Builder → Generate offer framing and transformation narrative
12. @Landing-Builder → Create A/B headline variants
13. @Visual-Asset-Agent → Create hero images (parallel)
14. @ElevenLabs-Voice-Agent → Generate founder intro (parallel)
15. @Landing-Builder → Synthesize into landing page

Phase 2c: Distribution Strategy
16. @Distribution-Operator → Identify top 15 communities
17. @Distribution-Operator → Create 7-day posting calendar
18. @Manus-Narrative-Agent → Generate 20 DM variants (parallel)
19. @ChatGPT-Reasoning-Agent → Create content formats (parallel)
20. @Distribution-Operator → Synthesize distribution strategy

Phase 3: Market Validation
10. Execute validation tests from plan
11. @Manus-Narrative-Agent → Competitor analysis
12. @ChatGPT-Reasoning-Agent → Analyze test results
13. Make kill/pivot/proceed decisions

Phase 4: Asset Creation
14. @Visual-Asset-Agent → Hero images (parallel)
15. @ElevenLabs-Voice-Agent → Demo narration (parallel)
16. Combine assets for validation tests
```

### Build Workflow (AI-Enhanced)

```
Phase 1: Design
1. @Product-Strategist → PRD (with Manus personas)
2. @ChatGPT-Reasoning-Agent → Technical approach analysis
3. @Visual-Asset-Agent → UI concept visuals

Phase 2: Development
4. @Engineering-Architect → ADR
5. @Implementer → Code
6. @Test-Engineer → Tests

Phase 3: Polish
7. @ElevenLabs-Voice-Agent → Demo narration
8. @Visual-Asset-Agent → Final assets
```

## Quick Reference

### Invoke Agents

```
@Demand-Validator Create validation plan for <PRODUCT>
@Landing-Builder Create landing page for <PRODUCT>
@Distribution-Operator Create distribution strategy for <PRODUCT>
@Pricing-Tester Create pricing test strategy for <PRODUCT>
@Insight-Strategist Create insight brief for <PRODUCT>
@Product-Strategist Create PRD for <PRODUCT>
@Moat-MRR-Strategist Design moat strategy for <PRODUCT>
@Retention-Architect Design retention loops for <PRODUCT>
@Portfolio-Prioritizer Score idea: <IDEA>
@Market-Scanner Scan market for <PRODUCT>
@UX-Researcher Design research for <PRODUCT>
@IA-Designer Design IA for <PRODUCT>
@Accessibility-Agent Audit <PRODUCT> for WCAG 2.2 AA
@Engineering-Architect Design architecture for <PRODUCT>
@Test-Engineer Create tests for <PRODUCT>
@Implementer Build <PRODUCT> using Next.js, TypeScript, tRPC, Drizzle, and shadcn/ui
@Growth-Loop-Agent Design growth loops for <PRODUCT>
@Manus-Narrative-Agent Create narrative for <PRODUCT>
@ChatGPT-Reasoning-Agent Analyze <TOPIC>
@ElevenLabs-Voice-Agent Create voice for <CONTENT>
@Visual-Asset-Agent Create visuals for <PRODUCT>
```

## See Also

- `docs/agents/*.md` - Individual agent documentation
- `docs/AI-INTEGRATION-GUIDE.md` - Complete AI integration guide
- `.cursor/rules/190-199/*.mdc` - AI integration rules
- `docs/prompts/` - Ready-to-use prompt templates

