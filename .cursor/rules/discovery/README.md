# Discovery Rules

This folder contains the discovery rules for the 4-stage Product Discovery system.

## Rule Files

### 01-niche-intelligence.mdc

**Stage**: Stage 1 of Product Discovery  
**Agent**: `@Niche-Intelligence-Agent`  
**Purpose**: Understand the niche - culture, vocabulary, identity, geography, income, communities, trends

**Key Requirements**:
- Map niche size, psychographics, and subcultures
- Extract language patterns, identity signals, status markers
- Identify communities (Reddit, Slack, Discord, Facebook groups, LinkedIn clusters)
- Define entry points (how founders earn trust)
- Document niche worldview and cultural tensions

**Output**: `/docs/discovery/NICHE-INTEL-<idea-slug>.md`

### 02-pain-signal-analysis.mdc

**Stage**: Stage 2 of Product Discovery  
**Agent**: `@Pain-Signal-Agent`  
**Purpose**: Extract the real painful, expensive, urgent problems the niche feels

**Key Requirements**:
- Cluster pains using frequency, severity, urgency
- Identify "moment of acute pain" (MAAP)
- Map pain → cost (time, money, emotional)
- Score each pain (1-10) based on 5 dimensions
- Prioritize pains by total score

**Output**: `/docs/discovery/PAIN-SIGNALS-<idea-slug>.md`

### 03-persona-jtbd.mdc

**Stage**: Stage 3 of Product Discovery  
**Agent**: `@JTBD-Agent`  
**Purpose**: Create a persona that is NOT fictional — based on psychographics + JTBD + emotional drivers

**Key Requirements**:
- Produce deep persona narrative (identity, beliefs, fears, aspirations)
- JTBD main job + related jobs + emotional jobs
- Identify ongoing vs discrete jobs
- Map triggers, success criteria, and barriers
- Provide ElevenLabs interview script (optional)

**Output**: `/docs/discovery/JTBD-<idea-slug>.md`

### 04-opportunity-moat.mdc

**Stage**: Stage 4 of Product Discovery  
**Agent**: `@Opportunity-Moat-Agent`  
**Purpose**: Find where your product can earn a defensive moat in the niche

**Key Requirements**:
- Identify winner-take-most dynamics
- Analyze switching cost potential
- Identify data moats (data exhaust, insights, tracking)
- Analyze workflow embedding opportunities
- Identify underserved segments (blue ocean pockets)
- Provide Midjourney/Canva prompts for "future vision" mockups

**Output**: `/docs/discovery/OPPORTUNITY-<idea-slug>.md`

## Discovery Workflow

```
Raw Idea
  ↓
Stage 1: Niche Intelligence
  → @Niche-Intelligence-Agent
  → /docs/discovery/NICHE-INTEL-*.md
  ↓
Stage 2: Pain Signal Analysis
  → @Pain-Signal-Agent
  → /docs/discovery/PAIN-SIGNALS-*.md
  ↓
Stage 3: Persona & JTBD
  → @JTBD-Agent
  → /docs/discovery/JTBD-*.md
  ↓
Stage 4: Opportunity & Moat
  → @Opportunity-Moat-Agent
  → /docs/discovery/OPPORTUNITY-*.md
  ↓
Validation Phase (if proceed)
  → Validation planning and execution
```

## Stage Gates

- **Stage 1 → Stage 2**: Niche intelligence must be complete
- **Stage 2 → Stage 3**: Pain signal analysis must be complete
- **Stage 3 → Stage 4**: Persona & JTBD must be complete
- **Stage 4 → Validation**: Opportunity & moat analysis must be complete

## Integration

These rules integrate with:
- **Rule 050 (Manus Integration)**: Uses Manus outputs for narrative, persona, competitor analysis
- **Rule 060 (ChatGPT Refinement)**: ChatGPT refinement and synthesis for pain clustering, JTBD structuring
- **Rule 070 (ElevenLabs Integration)**: Optional voice interview for persona validation
- **Rule 080 (Midjourney/Canva)**: Visual asset generation for opportunity mockups
- **Rule 310 (Manus in Discovery)**: Manus narrative engine requirements for discovery
- **Rule 320 (ChatGPT Refinement)**: ChatGPT refinement in discovery context
- **Rule 330 (ElevenLabs Voice)**: ElevenLabs persona voice interviews
- **Rule 340 (Midjourney Visuals)**: Midjourney/Canva opportunity visualization
- **Rule 003 (Data Moat Planning)**: Data moat planning required in Stage 4

## See Also

- `docs/agents/discovery/01-niche-intelligence-agent.md` - Niche Intelligence agent
- `docs/agents/discovery/02-pain-signal-agent.md` - Pain Signal agent
- `docs/agents/discovery/03-persona-jtbd-agent.md` - Persona & JTBD agent
- `docs/agents/discovery/04-opportunity-moat-agent.md` - Opportunity & Moat agent
- `docs/discovery/README.md` - Discovery documents folder
- `docs/AI-POWERED-DISCOVERY-OVERVIEW.md` - Discovery system overview

