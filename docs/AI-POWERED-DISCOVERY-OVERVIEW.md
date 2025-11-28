# The New AI-Powered Product Discovery System

> Product Discovery is now split into 4 AI-driven stages, each with dedicated Cursor agents and improved rule files.

## Overview

The Product Discovery Phase has been completely redesigned into **4 AI-driven stages**, each leveraging specific AI tools and dedicated Cursor agents. This structure ensures:

- **Focused intelligence gathering** at each stage
- **AI tool optimization** (right tool for the right job)
- **Consistent quality** through dedicated agents
- **Clear progression** from niche → problem → persona → opportunity

## The 4 Stages

```
Stage 1: Niche Intelligence (Manus + ChatGPT)
  ↓
Stage 2: Problem Intelligence (Manus + Cursor)
  ↓
Stage 3: Persona & JTBD Deep Dive (Manus + ChatGPT)
  ↓
Stage 4: Opportunity / Moat Analysis (Manus + ChatGPT + Cursor)
```

## Stage 1: Niche Intelligence

**AI Tools**: Manus.im + ChatGPT  
**Agent**: `@Niche-Intelligence-Agent`  
**Purpose**: Understand the niche, market dynamics, and competitive landscape.

### Process

```
@Niche-Intelligence-Agent Analyze niche for <IDEA>.

Process:
1) @Manus-Narrative-Agent → Analyze competitor narratives and positioning
2) @Manus-Narrative-Agent → Identify market trends and patterns
3) @ChatGPT-Reasoning-Agent → Synthesize niche insights
4) @ChatGPT-Reasoning-Agent → Assess niche durability and growth potential
5) @ChatGPT-Reasoning-Agent → Identify positioning gaps and opportunities

Output:
- /docs/research/NICHE-<idea-slug>.md
- /docs/research/COMPETITORS-<idea-slug>.md
```

### Key Deliverables

- **Competitor Landscape**: Positioning, narratives, differentiation opportunities
- **Niche Durability**: Growth potential, market trends, timing analysis
- **Positioning Gaps**: Where competitors are weak, opportunities to own
- **Market Dynamics**: Wave maturity, early indicators, competitive velocity

### Output Documents

- `/docs/research/NICHE-<idea-slug>.md` - Complete niche analysis
- `/docs/research/COMPETITORS-<idea-slug>.md` - Competitor positioning and gaps

### Rule File

**Rule**: `.cursor/rules/041-niche-intelligence.mdc`

**Key Requirements**:
- Manus competitor analysis required
- ChatGPT synthesis required
- Niche durability assessment required
- Positioning gap identification required

## Stage 2: Pain Signal Analysis

**AI Tools**: Manus.im + ChatGPT + Cursor  
**Agent**: `@Pain-Signal-Agent`  
**Purpose**: Extract the real painful, expensive, urgent problems the niche feels.

### Process

```
@Pain-Signal-Agent Extract pain signals for <IDEA>.

Input:
- Manus pain language dictionary: [From Manus Narrative Agent]
- Competitor gap analysis: [From Niche Intelligence Agent]

Tasks:
1) @Manus-Narrative-Agent → Extract pain language, complaints, unmet needs
2) @ChatGPT-Reasoning-Agent → Cluster pains using frequency, severity, urgency
3) @ChatGPT-Reasoning-Agent → Identify "moment of acute pain" (MAAP)
4) @ChatGPT-Reasoning-Agent → Map pain → cost (time, money, emotional)
5) @ChatGPT-Reasoning-Agent → Score each pain (1-10) based on:
   - frequency
   - emotional intensity
   - financial impact
   - workaround difficulty
   - monetization potential
6) Structure pain report (Cursor)

Output: /docs/discovery/PAIN-SIGNALS-<idea-slug>.md
```

### Key Deliverables

- **Pain Clusters**: Organized by frequency, severity, urgency
- **Top Pain Signals**: Ranked by total score (top 10-15)
- **Moment of Acute Pain (MAAP)**: When/where/why/who/what, intensity
- **Pain Cost Analysis**: Time cost, money cost, emotional cost
- **Pain Scores**: Frequency, emotional intensity, financial impact, workaround difficulty, monetization potential (each 1-10, total out of 50)

### Output Documents

- `/docs/discovery/PAIN-SIGNALS-<idea-slug>.md` - Complete pain signals analysis with scores

### Rule File

**Rule**: `.cursor/rules/042-problem-intelligence.mdc`

**Key Requirements**:
- Manus pain language extraction required
- Pain clustering required (frequency, severity, urgency)
- MAAP identification required
- Pain cost mapping required (time, money, emotional)
- Pain scoring required (5 dimensions, 1-10 each)

## Stage 3: Persona & JTBD Deep Dive

**AI Tools**: Manus.im + ChatGPT  
**Agent**: `@Persona-JTBD-Agent`  
**Purpose**: Deep understanding of target personas and their Jobs-to-be-Done.

### Process

```
@Persona-JTBD-Agent Create persona and JTBD analysis for <IDEA>.

Process:
1) @Manus-Narrative-Agent → Generate detailed personas with identity-level motivations
2) @Manus-Narrative-Agent → Extract JTBD from narrative and persona
3) @ChatGPT-Reasoning-Agent → Refine persona profiles
4) @ChatGPT-Reasoning-Agent → Map JTBD frequency and triggers
5) @ChatGPT-Reasoning-Agent → Design frequency boosters (if job is rare)
6) @ChatGPT-Reasoning-Agent → Create persona language dictionary

Output:
- /docs/research/PERSONA-<idea-slug>.md
- /docs/research/JTBD-<idea-slug>.md
```

### Key Deliverables

- **Persona Profiles**: Identity-level motivations, emotional drivers, frustrations
- **JTBD Extraction**: Job, triggers, context, frequency, steps, success criteria
- **JTBD Frequency Map**: Daily/weekly/monthly/quarterly/event-driven/rare
- **Frequency Boosters**: Alerts, monitoring, workflows, repeated jobs, recurring tasks (if rare)
- **Persona Language Dictionary**: Exact terminology, communication preferences

### Output Documents

- `/docs/research/PERSONA-<idea-slug>.md` - Complete persona profiles
- `/docs/research/JTBD-<idea-slug>.md` - Complete JTBD analysis with frequency map

### Rule File

**Rule**: `.cursor/rules/043-persona-jtbd.mdc`

**Key Requirements**:
- Manus persona generation required
- JTBD extraction from Manus outputs required
- JTBD frequency mapping required
- Frequency boosters required if job is rare
- Persona language dictionary required

## Stage 4: Opportunity / Moat Analysis

**AI Tools**: Manus.im + ChatGPT + Cursor  
**Agent**: `@Opportunity-Moat-Agent`  
**Purpose**: Analyze opportunity, defensibility, and moat potential.

### Process

```
@Opportunity-Moat-Agent Analyze opportunity and moat potential for <IDEA>.

Process:
1) @Manus-Narrative-Agent → Extract value propositions and transformation narrative
2) @ChatGPT-Reasoning-Agent → Assess opportunity size and timing
3) @ChatGPT-Reasoning-Agent → Analyze moat potential (data moat, workflow lock-in, switching costs)
4) @ChatGPT-Reasoning-Agent → Design Data Moat Thesis
5) @ChatGPT-Reasoning-Agent → Assess expansion revenue potential
6) @Cursor → Structure opportunity analysis
7) @Cursor → Create moat map and defensibility strategy

Output:
- /docs/product/OPPORTUNITY-<idea-slug>.md
- /docs/product/MOAT-<idea-slug>.md
```

### Key Deliverables

- **Opportunity Analysis**: Market size, timing, growth potential, competitive window
- **Moat Potential**: 2-3 moat types identified and analyzed
- **Data Moat Thesis**: Proprietary data, compounding mechanism, 10× value, feedback loop
- **Expansion Revenue Model**: Clear path to 10× expansion revenue
- **Defensibility Strategy**: How to build and maintain moats

### Output Documents

- `/docs/product/OPPORTUNITY-<idea-slug>.md` - Complete opportunity analysis
- `/docs/product/MOAT-<idea-slug>.md` - Complete moat analysis and strategy

### Rule File

**Rule**: `.cursor/rules/044-opportunity-moat.mdc`

**Key Requirements**:
- Manus value proposition extraction required
- ChatGPT opportunity analysis required
- ChatGPT moat analysis required
- Data Moat Thesis required
- Expansion revenue model required
- Moat map required

## Complete Discovery Workflow

```
Raw Idea
  ↓
Stage 1: Niche Intelligence (Manus + ChatGPT)
  → @Niche-Intelligence-Agent
  → /docs/research/NICHE-*.md
  → /docs/research/COMPETITORS-*.md
  ↓
Stage 2: Pain Signal Analysis (Manus + ChatGPT + Cursor)
  → @Pain-Signal-Agent
  → /docs/discovery/PAIN-SIGNALS-*.md
  ↓
Stage 3: Persona & JTBD Deep Dive (Manus + ChatGPT)
  → @Persona-JTBD-Agent
  → /docs/research/PERSONA-*.md
  → /docs/research/JTBD-*.md
  ↓
Stage 4: Opportunity / Moat Analysis (Manus + ChatGPT + Cursor)
  → @Opportunity-Moat-Agent
  → /docs/product/OPPORTUNITY-*.md
  → /docs/product/MOAT-*.md
  ↓
Validation Phase (if proceed)
  → Validation planning and execution
```

## New Dedicated Agents

### 1. Niche Intelligence Agent

**Agent**: `@Niche-Intelligence-Agent`  
**AI Tools**: Manus.im + ChatGPT  
**Purpose**: Analyze niche, competitors, and market dynamics

**Key Responsibilities**:
- Competitor narrative analysis (Manus)
- Niche durability assessment (ChatGPT)
- Positioning gap identification (ChatGPT)
- Market dynamics analysis (ChatGPT)

**Output**: Niche analysis, competitor analysis

### 2. Pain Signal Agent

**Agent**: `@Pain-Signal-Agent`  
**AI Tools**: Manus.im + ChatGPT + Cursor  
**Purpose**: Extract the real painful, expensive, urgent problems the niche feels

**Key Responsibilities**:
- Pain language extraction (Manus)
- Pain clustering (ChatGPT - frequency, severity, urgency)
- MAAP identification (ChatGPT - moment of acute pain)
- Pain cost mapping (ChatGPT - time, money, emotional)
- Pain scoring (ChatGPT - 5 dimensions, 1-10 each)
- Pain report structuring (Cursor)

**Output**: Pain signals analysis with scores and prioritization

### 3. Persona & JTBD Agent

**Agent**: `@Persona-JTBD-Agent`  
**AI Tools**: Manus.im + ChatGPT  
**Purpose**: Deep understanding of personas and Jobs-to-be-Done

**Key Responsibilities**:
- Persona generation (Manus)
- JTBD extraction (Manus)
- Persona refinement (ChatGPT)
- JTBD frequency mapping (ChatGPT)
- Frequency booster design (ChatGPT)

**Output**: Persona profiles, JTBD analysis with frequency map

### 4. Opportunity & Moat Agent

**Agent**: `@Opportunity-Moat-Agent`  
**AI Tools**: Manus.im + ChatGPT + Cursor  
**Purpose**: Analyze opportunity, defensibility, and moat potential

**Key Responsibilities**:
- Value proposition extraction (Manus)
- Opportunity analysis (ChatGPT)
- Moat analysis (ChatGPT)
- Data Moat Thesis design (ChatGPT)
- Expansion revenue model (ChatGPT)
- Opportunity structuring (Cursor)
- Moat map creation (Cursor)

**Output**: Opportunity analysis, moat analysis and strategy

## Improved Rule Files

### Rule 041: Niche Intelligence

**File**: `.cursor/rules/041-niche-intelligence.mdc`

**Requirements**:
- Manus competitor analysis required
- ChatGPT synthesis required
- Niche durability assessment required
- Positioning gap identification required
- Market dynamics analysis required

### Rule 042: Problem Intelligence

**File**: `.cursor/rules/042-problem-intelligence.mdc`

**Requirements**:
- Manus narrative generation required
- Pain language extraction required
- Identity-level pain connection required
- Problem validation opportunities required
- Narrative variations required (3-5)

### Rule 043: Persona & JTBD

**File**: `.cursor/rules/043-persona-jtbd.mdc`

**Requirements**:
- Manus persona generation required
- JTBD extraction from Manus outputs required
- JTBD frequency mapping required
- Frequency boosters required if job is rare
- Persona language dictionary required

### Rule 044: Opportunity & Moat

**File**: `.cursor/rules/044-opportunity-moat.mdc`

**Requirements**:
- Manus value proposition extraction required
- ChatGPT opportunity analysis required
- ChatGPT moat analysis required
- Data Moat Thesis required
- Expansion revenue model required
- Moat map required

## Key Improvements

### 1. Focused Intelligence Gathering

**Before**: Single agent handling multiple concerns  
**After**: Dedicated agent for each stage, focused on specific intelligence

**Benefit**: Higher quality outputs, clearer progression, easier iteration

### 2. AI Tool Optimization

**Before**: Generic AI tool usage  
**After**: Right tool for the right job:
- **Manus**: Narrative, persona, competitor analysis
- **ChatGPT**: Reasoning, refinement, synthesis, analysis
- **Cursor**: Structuring, organization, execution

**Benefit**: Better results, more efficient workflows

### 3. Clear Stage Progression

**Before**: Unclear progression between steps  
**After**: Clear 4-stage progression:
1. Understand the niche
2. Understand the problem
3. Understand the persona
4. Understand the opportunity

**Benefit**: Logical flow, easier to follow, better outcomes

### 4. Improved Rule Files

**Before**: Generic rules  
**After**: Stage-specific rules with clear requirements

**Benefit**: Consistent quality, clear expectations, easier validation

## Integration with Validation Phase

**After Discovery**:
- All 4 stages complete
- All documents generated
- Ready for validation planning

**Validation Phase**:
- Uses outputs from all 4 discovery stages
- Validation agents consume discovery documents
- Validation plan incorporates niche, problem, persona, opportunity insights

## Output Summary

### Research Documents (`/docs/research/`)
- `NICHE-<idea-slug>.md` - Niche analysis
- `COMPETITORS-<idea-slug>.md` - Competitor analysis
- `PERSONA-<idea-slug>.md` - Persona profiles
- `JTBD-<idea-slug>.md` - JTBD analysis with frequency map

### Discovery Documents (`/docs/discovery/`)
- `NICHE-INTEL-<idea-slug>.md` - Niche intelligence analysis
- `PAIN-SIGNALS-<idea-slug>.md` - Pain signals analysis with scores

### Product Documents (`/docs/product/`)
- `OPPORTUNITY-<idea-slug>.md` - Opportunity analysis
- `MOAT-<idea-slug>.md` - Moat analysis and strategy

## Quality Gates

**Each stage must pass quality gates before proceeding**:

- ✅ **Stage 1**: Niche analysis complete, competitor analysis complete, positioning gaps identified
- ✅ **Stage 2**: Pain signals analyzed, pains clustered and scored, MAAP identified, costs mapped
- ✅ **Stage 3**: Persona profiles complete, JTBD extracted and mapped, frequency boosters designed (if needed)
- ✅ **Stage 4**: Opportunity analysis complete, moat potential assessed, Data Moat Thesis designed

## See Also

- `docs/NEXT-GEN-DISCOVERY.md` - Complete next-generation discovery workflow
- `docs/UNIFIED-PIPELINE.md` - Validation pipeline
- `docs/prompts/MASTER-VALIDATION-PROMPT.md` - Master validation prompt
- `.cursor/rules/041-niche-intelligence.mdc` - Niche intelligence rules
- `.cursor/rules/042-problem-intelligence.mdc` - Problem intelligence rules
- `.cursor/rules/043-persona-jtbd.mdc` - Persona & JTBD rules
- `.cursor/rules/044-opportunity-moat.mdc` - Opportunity & moat rules
- `docs/agents/` - All agent definitions

