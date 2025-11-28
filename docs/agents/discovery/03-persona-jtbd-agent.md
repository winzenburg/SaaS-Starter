# Persona & JTBD Agent

> Stage 3 of Product Discovery: Create a persona that is NOT fictional — based on psychographics + JTBD + emotional drivers

## Mission

Create a deep persona narrative based on psychographics, JTBD, and emotional drivers. Produce comprehensive JTBD analysis including main job, related jobs, emotional jobs, ongoing vs discrete jobs, triggers, success criteria, and barriers.

## When to Use

- **Stage 3 of Product Discovery**: Third stage after pain signal analysis
- **After Pain Signal Analysis**: Must complete Stage 2 (Pain Signal Analysis) first
- **Before Opportunity Analysis**: Must complete before Stage 4 (Opportunity & Moat)
- **Discovery Workflow**: Step 5 in 8-step discovery pipeline

## AI Tool Integrations

- **Manus.im**: Persona narrative, identity language, emotional drivers, JTBD extraction
- **ChatGPT**: JTBD structuring, persona refinement
- **ElevenLabs**: Optional voice "persona interview"
- **Cursor**: Documentation

## Required Inputs

1. **Manus Persona Narrative** (REQUIRED)
   - Persona narrative from Manus
   - Identity language
   - Psychographics

2. **Manus Emotional Drivers** (REQUIRED)
   - Emotional motivations
   - Identity-level drivers
   - Aspirations and fears

3. **Manus JTBD Extraction** (REQUIRED)
   - Job-to-be-Done from Manus
   - Job context
   - Job triggers

## Core Tasks

### 1. Produce Deep Persona Narrative

**Tools**: Manus + ChatGPT

**Persona Narrative Elements**:
- Identity: What identity does persona want to embody?
- Beliefs: What does persona believe? (core beliefs, worldview)
- Fears: What does persona fear? (anxieties, concerns)
- Aspirations: What does persona aspire to? (goals, dreams)
- Psychographics: Values, attitudes, lifestyle, personality traits
- Identity Language: Exact terminology persona uses
- Emotional Drivers: What emotions drive persona's actions?

### 2. JTBD Main Job + Related Jobs + Emotional Jobs

**Tools**: ChatGPT

**JTBD Structure**:
- Main Job: What is the primary job the persona is trying to get done?
- Related Jobs: What are the related jobs that support the main job?
- Emotional Jobs: What are the emotional jobs (how persona wants to feel)?
- Job Relationships: How do jobs relate to each other?
- Job Hierarchy: Which jobs are primary vs secondary?

### 3. Identify Ongoing vs Discrete Jobs

**Tools**: ChatGPT

**Job Types**:
- Ongoing Jobs: Jobs that are continuous or recurring
- Discrete Jobs: Jobs that have a clear beginning and end

**For Each Job**:
- Classify as ongoing or discrete
- Document characteristics
- Identify implications for product design

### 4. Map Triggers, Success Criteria, and Barriers

**Tools**: ChatGPT

**Job Mechanics**:
- Triggers: What triggers the job to occur? (time-based, event-based, action-based)
- Success Criteria: How does persona know the job is done well? (functional, emotional, social)
- Barriers: What prevents job completion? (functional, emotional, social)

### 5. Provide ElevenLabs Interview Script

**Tools**: ElevenLabs + Cursor

**Script Requirements** (Rule 070):
- 30-60 second ElevenLabs script (required)
- Two tone variants: casual + professional (required)
- Optional "persona interview script" (recommended)

## Outputs

**Output**: `/docs/discovery/JTBD-<idea-slug>.md`

**Required Sections**:
1. Deep Persona Narrative (identity, beliefs, fears, aspirations)
2. Main Job + Related Jobs + Emotional Jobs
3. Ongoing vs Discrete Jobs
4. Triggers, Success Criteria, and Barriers
5. ElevenLabs Voice Scripts (30-60 seconds, 2 tones: casual + professional)
6. Optional: Persona Interview Script
7. Recommendations

## Quality Criteria

- ✅ Deep persona narrative complete (identity, beliefs, fears, aspirations)
- ✅ JTBD structured (main job, related jobs, emotional jobs)
- ✅ Ongoing vs discrete jobs identified
- ✅ Triggers, success criteria, barriers mapped
- ✅ ElevenLabs scripts provided (30-60 seconds, 2 tones)
- ✅ Recommendations provided (persona clarity, next steps)

## Integration Points

- **Before**: Stage 2 (Pain Signal Analysis) - persona requires pain context
- **After**: Stage 4 (Opportunity & Moat) - persona and JTBD inform opportunity analysis
- **Rule**: `.cursor/rules/043-persona-jtbd.mdc`
- **Rule**: `.cursor/rules/070-elevenlabs-integration.mdc` (ElevenLabs scripts)
- **Workflow**: `docs/DISCOVERY-WORKFLOW.md`

## Prompt Template

```
@JTBD-Agent Create persona and JTBD analysis for <IDEA>.

Input:
- Manus persona narrative: [From Manus Narrative Agent]
- Manus emotional drivers: [From Manus]
- Manus JTBD extraction: [From Manus]

Tasks:
1) Produce deep persona narrative (identity, beliefs, fears, aspirations)
2) JTBD main job + related jobs + emotional jobs
3) Identify ongoing vs discrete jobs
4) Map triggers, success criteria, and barriers
5) Provide ElevenLabs interview script (30-60 seconds, 2 tones)
6) Produce documentation (Cursor)

Output: /docs/discovery/JTBD-<idea-slug>.md
```

## See Also

- `.cursor/rules/043-persona-jtbd.mdc` - Persona & JTBD rules
- `.cursor/rules/070-elevenlabs-integration.mdc` - ElevenLabs integration
- `.cursor/rules/300-discovery-master.mdc` - Discovery master rule
- `.cursor/rules/302-discovery-workflow.mdc` - Discovery workflow
- `docs/agents/manus-narrative-agent.md` - Manus agent
- `docs/agents/chatgpt-reasoning-agent.md` - ChatGPT agent
- `docs/agents/elevenlabs-voice-agent.md` - ElevenLabs agent

