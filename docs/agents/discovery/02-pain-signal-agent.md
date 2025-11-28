# Pain Signal Agent

> Stage 2 of Product Discovery: Extract the real painful, expensive, urgent problems the niche feels

## Mission

Extract and analyze the real painful, expensive, urgent problems the niche feels by clustering pains, identifying moments of acute pain, mapping pain to cost, and scoring each pain based on frequency, emotional intensity, financial impact, workaround difficulty, and monetization potential.

## When to Use

- **Stage 2 of Product Discovery**: Second stage after niche intelligence
- **After Niche Intelligence**: Must complete Stage 1 (Niche Intelligence) first
- **Before Persona & JTBD**: Must complete before Stage 3 (Persona & JTBD)
- **Discovery Workflow**: Step 4 in 8-step discovery pipeline

## AI Tool Integrations

- **Manus.im**: Pain language extraction, complaints, unmet needs
- **ChatGPT**: Clustering and prioritization
- **Cursor**: Structured pain report

## Required Inputs

1. **Manus Pain Language Dictionary** (REQUIRED)
   - Direct quotes of pain language
   - Frustration statements
   - "I wish..." statements
   - Problem descriptions
   - Identity-level pain points

2. **Competitor Gap Analysis** (REQUIRED)
   - Positioning gaps from Manus
   - Feature gaps
   - Unmet needs
   - Pain points competitors don't address

## Core Tasks

### 1. Cluster Pains Using Frequency, Severity, Urgency

**Tools**: ChatGPT

**Clustering Dimensions**:
- Frequency: Daily/Weekly/Monthly/Quarterly/Event-driven/Rare
- Severity: Mild/Moderate/Severe/Critical
- Urgency: Low/Medium/High/Critical

**Clustering Process**:
- Group pains by frequency
- Group pains by severity
- Group pains by urgency
- Identify pain patterns
- Create pain clusters

### 2. Identify "Moment of Acute Pain" (MAAP)

**Tools**: ChatGPT

**MAAP Analysis**:
- When is pain most intense?
- What triggers acute pain moments?
- What makes pain unbearable?
- When do people seek solutions?

### 3. Map Pain → Cost (Time, Money, Emotional)

**Tools**: ChatGPT

**Cost Mapping**:
- Time cost: How much time is wasted?
- Money cost: How much money is lost?
- Emotional cost: What emotional toll does pain take?

### 4. Score Each Pain (1–10) Based on 5 Dimensions

**Tools**: ChatGPT

**Scoring Dimensions**:
- Frequency (1-10): How often does pain occur?
- Emotional Intensity (1-10): How emotionally intense is the pain?
- Financial Impact (1-10): How much financial impact does pain have?
- Workaround Difficulty (1-10): How difficult is it to work around?
- Monetization Potential (1-10): How well can this pain be monetized?

**Total Score**: Sum of all 5 dimensions (out of 50)

## Outputs

**Output**: `/docs/discovery/PAIN-SIGNALS-<idea-slug>.md`

**Required Sections**:
1. Pain Clusters (by frequency, severity, urgency)
2. Top Pain Signals (ranked by total score)
3. Moment of Acute Pain (MAAP) Analysis
4. Pain Cost Analysis (time, money, emotional)
5. Pain Scores (all 5 dimensions, total out of 50)
6. Recommendations

## Quality Criteria

- ✅ Pains clustered (by frequency, severity, urgency)
- ✅ Top pain signals identified (ranked by total score)
- ✅ MAAP identified (moment of acute pain)
- ✅ Pain cost mapped (time, money, emotional)
- ✅ All pains scored (all 5 dimensions, total out of 50)
- ✅ Recommendations provided (prioritization, next steps)

## Integration Points

- **Before**: Stage 1 (Niche Intelligence) - pain signals require niche context
- **After**: Stage 3 (Persona & JTBD) - pain signals inform persona and JTBD
- **Rule**: `.cursor/rules/042-problem-intelligence.mdc`
- **Workflow**: `docs/DISCOVERY-WORKFLOW.md`

## Prompt Template

```
@Pain-Signal-Agent Extract pain signals for <IDEA>.

Input:
- Manus pain language dictionary: [From Manus Narrative Agent]
- Competitor gap analysis: [From competitor analysis]

Tasks:
1) Cluster pains using frequency, severity, urgency
2) Identify "moment of acute pain" (MAAP)
3) Map pain → cost (time, money, emotional)
4) Score each pain (1–10) based on:
   - Frequency
   - Emotional intensity
   - Financial impact
   - Workaround difficulty
   - Monetization potential
5) Produce documentation (Cursor)

Output: /docs/discovery/PAIN-SIGNALS-<idea-slug>.md
```

## See Also

- `.cursor/rules/042-problem-intelligence.mdc` - Pain signal analysis rules
- `.cursor/rules/300-discovery-master.mdc` - Discovery master rule
- `.cursor/rules/302-discovery-workflow.mdc` - Discovery workflow
- `docs/agents/manus-narrative-agent.md` - Manus agent
- `docs/agents/chatgpt-reasoning-agent.md` - ChatGPT agent

