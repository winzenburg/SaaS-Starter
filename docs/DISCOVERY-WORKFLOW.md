# Discovery Workflow

> Defensible, repeatable, AI-powered discovery machine

## Overview

The discovery pipeline is a structured 8-step process that systematically analyzes niche, pain signals, personas, and opportunities using AI-enhanced tools before any engineering work begins.

## Discovery Pipeline

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

## Step-by-Step Workflow

### Step 1: Manus → Niche Narrative + Pain Language + JTBD + Competitors

**Tool**: Manus.im  
**Agent**: `@Manus-Narrative-Agent`

**Outputs Generated**:
- **Niche Narrative**: Culture, vocabulary, identity, geography, income, communities, trends
- **Pain Language**: Direct quotes, frustration statements, "I wish..." statements
- **JTBD Extraction**: Main job, related jobs, emotional jobs, triggers, success criteria
- **Competitor Analysis**: Positioning, narratives, gaps, differentiation opportunities

**Key Deliverables**:
- Raw narrative foundation
- Pain language dictionary
- Initial JTBD insights
- Competitor landscape

**Duration**: 1-2 hours

**Next Step**: Step 2 (ChatGPT Refinement)

---

### Step 2: ChatGPT → Refinement Packet

**Tool**: ChatGPT  
**Agent**: `@ChatGPT-Reasoning-Agent`

**Refinement Tasks**:
- **Clustering**: Cluster pain points by frequency, severity, urgency
- **Synthesis**: Synthesize JTBD (main job, related jobs, emotional jobs)
- **Extraction**: Extract opportunity vectors
- **Validation**: Validate competitor assumptions

**Output**: Refined insights packet ready for Cursor agents

**Key Deliverables**:
- Clustered pain points
- Synthesized JTBD structure
- Validated competitor insights
- Opportunity vectors identified

**Duration**: 30-60 minutes

**Next Step**: Step 3 (Niche Intelligence)

---

### Step 3: @Niche-Intelligence-Agent → Niche Map

**Tool**: Cursor + Manus + ChatGPT  
**Agent**: `@Niche-Intelligence-Agent`

**Tasks**:
1. Map niche size, psychographics, and subcultures
2. Extract language patterns, identity signals, status markers
3. Identify communities (Reddit, Slack, Discord, Facebook groups, LinkedIn clusters)
4. Define entry points (how founders earn trust)
5. Document niche worldview and cultural tensions

**Output**: `/docs/discovery/NICHE-INTEL-<idea-slug>.md`

**Key Deliverables**:
- Niche size and psychographics
- Language patterns and identity signals
- Community list with entry points
- Niche worldview and cultural tensions

**Duration**: 1-2 hours

**Next Step**: Step 4 (Pain Signal Analysis)

---

### Step 4: @Pain-Signal-Agent → Pain Prioritization

**Tool**: Cursor + Manus + ChatGPT  
**Agent**: `@Pain-Signal-Agent`

**Tasks**:
1. Cluster pains using frequency, severity, urgency
2. Identify "moment of acute pain" (MAAP)
3. Map pain → cost (time, money, emotional)
4. Score each pain (1-10) based on:
   - Frequency
   - Emotional intensity
   - Financial impact
   - Workaround difficulty
   - Monetization potential
5. Prioritize pains by total score

**Output**: `/docs/discovery/PAIN-SIGNALS-<idea-slug>.md`

**Key Deliverables**:
- Pain clusters (organized by frequency, severity, urgency)
- Top pain signals (ranked by total score)
- MAAP analysis
- Pain cost analysis (time, money, emotional)
- Pain prioritization (high/medium/low priority)

**Duration**: 1-2 hours

**Next Step**: Step 5 (Persona & JTBD)

---

### Step 5: @JTBD-Agent → Persona + Jobs Map + Voice Script

**Tool**: Cursor + Manus + ChatGPT + ElevenLabs  
**Agent**: `@JTBD-Agent`

**Tasks**:
1. Produce deep persona narrative (identity, beliefs, fears, aspirations)
2. Structure JTBD (main job + related jobs + emotional jobs)
3. Identify ongoing vs discrete jobs
4. Map triggers, success criteria, and barriers
5. Provide ElevenLabs interview script (30-60 seconds, 2 tones)

**Output**: `/docs/discovery/JTBD-<idea-slug>.md`

**Key Deliverables**:
- Deep persona narrative (NOT fictional, based on psychographics + JTBD + emotional drivers)
- Main job + related jobs + emotional jobs
- Ongoing vs discrete jobs classification
- Triggers, success criteria, barriers mapped
- ElevenLabs voice script (casual + professional tones)
- Optional: Persona interview prompts

**Duration**: 2-3 hours

**Next Step**: Step 6 (Opportunity & Moat)

---

### Step 6: @Opportunity-Moat-Agent → Moat Strategy + Vision Prompts

**Tool**: Cursor + Manus + ChatGPT + Midjourney/Canva  
**Agent**: `@Opportunity-Moat-Agent`

**Tasks**:
1. Identify winner-take-most dynamics
2. Analyze switching cost potential
3. Identify data moats (data exhaust, insights, tracking)
4. Analyze workflow embedding opportunities
5. Identify underserved segments (blue ocean pockets)
6. Provide Midjourney/Canva prompts for "future vision" mockups

**Output**: `/docs/discovery/OPPORTUNITY-<idea-slug>.md`

**Key Deliverables**:
- Winner-take-most dynamics analysis
- Switching cost potential analysis
- Data moats identified (data exhaust, insights, tracking, proprietary data, compounding mechanism, 10× value, feedback loop)
- Workflow embedding opportunities analyzed
- Underserved segments identified (blue ocean pockets)
- Midjourney/Canva prompts:
  - Vision mockup of future product
  - Conceptual diagram
  - Social ad concepts

**Duration**: 2-3 hours

**Next Step**: Step 7 (Scoring)

---

### Step 7: Score the Idea (0-10)

**Tool**: Cursor  
**Agent**: `@Opportunity-Moat-Agent` (calculates score)

**Opportunity Score Calculation**:

1. **Niche Viability** (0-2.5 points)
   - Niche size and growth potential
   - Entry points and trust signals
   - Community engagement

2. **Pain Intensity** (0-2.5 points)
   - Top pain signal scores (average of top 3)
   - MAAP intensity
   - Monetization potential

3. **Persona Clarity** (0-1.5 points)
   - Persona narrative completeness
   - JTBD frequency and clarity
   - Emotional driver strength

4. **Moat Potential** (0-3.5 points)
   - Winner-take-most dynamics
   - Switching cost potential
   - Data moat strength
   - Workflow embedding potential
   - Blue ocean opportunity size

**Total**: 10.0 points maximum

**Output**: Opportunity Score documented in `/docs/discovery/OPPORTUNITY-<idea-slug>.md`

**Duration**: 30 minutes

**Next Step**: Step 8 (Gate Decision)

---

### Step 8: If Score ≥ 8 → Move to Demand-Validation Agents

**Gate**: Opportunity Score ≥ 8.0/10

**If Score ≥ 8.0/10**:
- ✅ **Proceed to Demand-Validation Phase**
- Move to validation agents:
  - `@Demand-Validator` → Validation plan
  - `@Landing-Builder` → Landing page
  - `@Distribution-Operator` → Distribution map
  - `@Pricing-Tester` → Pricing tests

**If Score < 8.0/10**:
- ❌ **Pivot or Kill Decision Required**
- Document decision in Opportunity report
- Either:
  - **Pivot**: Adjust idea based on discovery insights
  - **Kill**: Archive idea and move to next opportunity

**Output**: Decision documented in `/docs/discovery/OPPORTUNITY-<idea-slug>.md`

**Duration**: Decision time (varies)

---

## Complete Discovery Package

After completing all 8 steps, you have:

### Documents

1. **NICHE-INTEL-<idea-slug>.md**
   - Niche size, psychographics, subcultures
   - Language patterns, identity signals, status markers
   - Communities and entry points
   - Niche worldview and cultural tensions

2. **PAIN-SIGNALS-<idea-slug>.md**
   - Pain clusters and prioritization
   - Top pain signals (ranked by score)
   - MAAP analysis
   - Pain cost analysis

3. **JTBD-<idea-slug>.md**
   - Deep persona narrative
   - Main job + related jobs + emotional jobs
   - Ongoing vs discrete jobs
   - Triggers, success criteria, barriers
   - ElevenLabs voice script (2 tones)

4. **OPPORTUNITY-<idea-slug>.md**
   - Winner-take-most dynamics
   - Switching cost potential
   - Data moats
   - Workflow embedding opportunities
   - Underserved segments
   - Midjourney/Canva prompts
   - **Opportunity Score** (0-10)

### Artifacts

- **Audio Empathy Artifacts**: ElevenLabs voice scripts (casual + professional)
- **Visual Empathy Artifacts**: Midjourney/Canva prompts (vision mockup, conceptual diagram, social ads)

## Workflow Characteristics

### Defensible

- **Systematic**: Every idea goes through the same process
- **Documented**: All insights are captured in structured documents
- **Validated**: ChatGPT validates assumptions and refines insights
- **Scored**: Opportunity Score provides objective evaluation

### Repeatable

- **Standardized Steps**: Same 8 steps for every idea
- **Clear Gates**: Opportunity Score gate at Step 8
- **Consistent Outputs**: Same document structure for every idea
- **AI-Enhanced**: Manus, ChatGPT, ElevenLabs, Midjourney/Canva integrated

### AI-Powered

- **Manus**: Source-of-truth narrative engine
- **ChatGPT**: Refinement, clustering, synthesis, validation
- **ElevenLabs**: Voice empathy artifacts
- **Midjourney/Canva**: Visual empathy artifacts
- **Cursor Agents**: Structured document production

## Time Investment

**Total Discovery Time**: 7-11 hours per idea

- Step 1 (Manus): 1-2 hours
- Step 2 (ChatGPT): 30-60 minutes
- Step 3 (Niche Intelligence): 1-2 hours
- Step 4 (Pain Signals): 1-2 hours
- Step 5 (Persona & JTBD): 2-3 hours
- Step 6 (Opportunity & Moat): 2-3 hours
- Step 7 (Scoring): 30 minutes
- Step 8 (Gate Decision): Variable

## Quality Gates

**Discovery must pass all quality gates**:

- ✅ **Niche Intelligence complete** (all sections documented)
- ✅ **Pain Signals complete** (all pains scored and prioritized)
- ✅ **JTBD Analysis complete** (persona narrative, all jobs mapped)
- ✅ **Opportunity & Moat Report complete** (all moat types analyzed)
- ✅ **Opportunity Score calculated** (≥ 8.0/10 to proceed)
- ✅ **Audio empathy artifacts created** (ElevenLabs scripts)
- ✅ **Visual empathy artifacts created** (Midjourney/Canva prompts)

## Integration Points

### Before Discovery

- Raw product idea
- Initial market hypothesis

### After Discovery (if Score ≥ 8.0/10)

- Demand-Validation Phase
- Validation planning
- Landing page creation
- Distribution mapping
- Pricing tests

### After Discovery (if Score < 8.0/10)

- Pivot or kill decision
- Idea archive
- Next opportunity evaluation

## See Also

- `.cursor/rules/301-discovery-overview.mdc` - Discovery overview rule
- `.cursor/rules/310-manus-in-discovery.mdc` - Manus usage patterns
- `.cursor/rules/320-chatgpt-refinement.mdc` - ChatGPT refinement patterns
- `.cursor/rules/330-elevenlabs-voice.mdc` - ElevenLabs voice requirements
- `.cursor/rules/340-midjourney-visuals.mdc` - Midjourney/Canva visual requirements
- `docs/agents/niche-intelligence-agent.md` - Niche Intelligence agent
- `docs/agents/pain-signal-agent.md` - Pain Signal agent
- `docs/agents/persona-jtbd-agent.md` - Persona & JTBD agent
- `docs/agents/opportunity-moat-agent.md` - Opportunity & Moat agent
- `docs/AI-POWERED-DISCOVERY-OVERVIEW.md` - Discovery system overview

## Summary

**The discovery pipeline is a defensible, repeatable, AI-powered discovery machine that systematically analyzes niche, pain signals, personas, and opportunities before any engineering work begins.**

1. **Manus** generates narrative foundation
2. **ChatGPT** refines and validates insights
3. **Cursor Agents** produce structured documents
4. **ElevenLabs** creates audio empathy artifacts
5. **Midjourney/Canva** creates visual empathy artifacts
6. **Opportunity Score** provides objective evaluation
7. **Gate** ensures only high-potential ideas proceed

**Discovery is not optional. It's required before any engineering work begins.**

