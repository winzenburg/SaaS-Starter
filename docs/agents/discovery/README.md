# Discovery Agents

> AI-powered discovery agents for systematic product discovery

## Overview

Discovery agents are specialized AI agents that execute the 4-stage Product Discovery process. Each agent uses Manus, ChatGPT, and other AI tools to produce structured discovery documents.

## Discovery Agents

### 1. Niche Intelligence Agent

**Stage**: Stage 1 of Product Discovery  
**Output**: `/docs/discovery/NICHE-INTEL-<idea-slug>.md`

**Purpose**: Understand the niche - culture, vocabulary, identity, geography, income, communities, trends

**Key Tasks**:
- Map niche size, psychographics, and subcultures
- Extract language patterns, identity signals, status markers
- Identify communities (Reddit, Slack, Discord, Facebook groups, LinkedIn clusters)
- Define entry points (how founders earn trust)
- Document niche worldview and cultural tensions

**See**: `01-niche-intelligence-agent.md`

---

### 2. Pain Signal Agent

**Stage**: Stage 2 of Product Discovery  
**Output**: `/docs/discovery/PAIN-SIGNALS-<idea-slug>.md`

**Purpose**: Extract the real painful, expensive, urgent problems the niche feels

**Key Tasks**:
- Cluster pains using frequency, severity, urgency
- Identify "moment of acute pain" (MAAP)
- Map pain → cost (time, money, emotional)
- Score each pain (1–10) based on 5 dimensions

**See**: `02-pain-signal-agent.md`

---

### 3. Persona & JTBD Agent

**Stage**: Stage 3 of Product Discovery  
**Output**: `/docs/discovery/JTBD-<idea-slug>.md`

**Purpose**: Create a persona that is NOT fictional — based on psychographics + JTBD + emotional drivers

**Key Tasks**:
- Produce deep persona narrative (identity, beliefs, fears, aspirations)
- JTBD main job + related jobs + emotional jobs
- Identify ongoing vs discrete jobs
- Map triggers, success criteria, and barriers
- Provide ElevenLabs interview script (30-60 seconds, 2 tones)

**See**: `03-persona-jtbd-agent.md`

---

### 4. Opportunity & Moat Agent

**Stage**: Stage 4 of Product Discovery  
**Output**: `/docs/discovery/OPPORTUNITY-<idea-slug>.md`

**Purpose**: Find where your product can earn a defensive moat in the niche

**Key Tasks**:
- Identify winner-take-most dynamics
- Analyze switching cost potential
- Identify data moats (data exhaust, insights, tracking)
- Analyze workflow embedding opportunities
- Identify underserved segments (blue ocean pockets)
- Provide Midjourney/Canva prompts for "future vision" mockups
- Calculate Opportunity Score (must be ≥ 8.0/10)

**See**: `04-opportunity-moat-agent.md`

---

## Discovery Workflow

```
Raw Idea
  ↓
Step 1: Manus → Niche Narrative + Pain Language + JTBD + Competitors
  ↓
Step 2: ChatGPT → Refinement Packet
  ↓
Step 3: @Niche-Intelligence-Agent → Niche Map
  ↓
Step 4: @Pain-Signal-Agent → Pain Prioritization
  ↓
Step 5: @JTBD-Agent → Persona + Jobs Map + Voice Script
  ↓
Step 6: @Opportunity-Moat-Agent → Moat Strategy + Vision Prompts
  ↓
Step 7: Score the Idea (0-10)
  ↓
Step 8: If Score ≥ 8 → Move to Demand-Validation Agents
```

## Output Structure

All discovery outputs go to `/docs/discovery/`:

- `NICHE-INTEL-<project-slug>.md` - Niche Intelligence
- `PAIN-SIGNALS-<project-slug>.md` - Pain Signal Analysis
- `JTBD-<project-slug>.md` - Persona & JTBD
- `OPPORTUNITY-<project-slug>.md` - Opportunity & Moat (includes Opportunity Score)

## Opportunity Score Gate

**CRITICAL**: Opportunity Score must be ≥ 8.0/10 to proceed to validation.

**Calculation**:
- Niche Viability: 0-2.5 points
- Pain Intensity: 0-2.5 points
- Persona Clarity: 0-1.5 points
- Moat Potential: 0-3.5 points
- **Total**: 10.0 points maximum

## Integration with Rules

- **Rule 300**: Discovery Master
- **Rule 301**: Discovery Overview
- **Rule 302**: Discovery Workflow
- **Rule 041-044**: Discovery stage rules
- **Rule 310-340**: AI tool integration rules

## See Also

- `docs/DISCOVERY-WORKFLOW.md` - Complete discovery workflow
- `docs/HUB-AND-SPOKE.md` - Hub-and-spoke architecture
- `.cursor/rules/discovery/` - Discovery rules
- `.cursor/rules/300-discovery-master.mdc` - Discovery master rule

