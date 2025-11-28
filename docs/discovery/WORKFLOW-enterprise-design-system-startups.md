# Discovery Workflow: Enterprise Design System for Startups

## Idea Details
- **Name**: Enterprise Design System for Startups
- **Slug**: enterprise-design-system-startups
- **Niche**: Startups, scale-ups, CTOs/Heads of Product
- **JTBD**: Help me ship UI consistently and faster
- **Buyer**: CTO, Head of Product, Lead Designer

## Discovery Workflow Steps

### Step 1: Manus Discovery Pack
**Status**: ⏳ Pending

**Prompt**:
```
Generate a discovery pack for: Enterprise Design System for Startups

Target niche: Startups, scale-ups, CTOs/Heads of Product
Initial JTBD: Help me ship UI consistently and faster
Buyer: CTO, Head of Product, Lead Designer
Description: Enterprise-grade design system and component library for startups to ship consistent UI faster

Provide:
1. Niche narrative (culture, vocabulary, identity, geography, income, communities, trends)
2. Pain language dictionary (complaints, frustrations, unmet needs, direct quotes, "I wish..." statements)
3. JTBD seeds (functional jobs, emotional jobs, social jobs, triggers, success criteria)
4. Competitor landscape and gaps (positioning, narratives, differentiation opportunities)
5. Pricing expectations (what buyers expect to pay, willingness to pay signals)
6. Distribution hooks and entry points (how to reach this niche, trust signals, community entry points)

```

**Instructions**:
1. Go to Manus.im
2. Use the prompt above
3. Save the output to: `docs/discovery/MANUS-enterprise-design-system-startups.md`

### Step 2: ChatGPT Refinement
**Status**: ⏳ Pending (requires Step 1)

**Prompt**:
```
Refine and synthesize this Manus discovery output for Enterprise Design System for Startups:

[PASTE MANUS OUTPUT HERE]

Tasks:
1. Cluster pain points by frequency, severity, urgency
2. Synthesize JTBD structure (main job, related jobs, emotional jobs)
3. Extract opportunity vectors from competitor gaps
4. Validate and cross-check assumptions
5. Create a clean "Validation Pack" ready for Cursor agents

Output format:
- Clustered pain points with scores
- Structured JTBD map
- Opportunity vectors ranked by potential
- Validated assumptions
- Ready-to-use insights for Cursor agents

```

**Instructions**:
1. Copy Manus output from Step 1
2. Use ChatGPT with the prompt above
3. Save the output to: `docs/discovery/CHATGPT-REFINEMENT-enterprise-design-system-startups.md`

### Step 3: Niche Intelligence Agent
**Status**: ⏳ Pending (requires Steps 1-2)

**Command**:
```bash
@Niche-Intelligence-Agent Analyze niche for Enterprise Design System for Startups

Inputs:
- Manus niche narrative: docs/discovery/MANUS-enterprise-design-system-startups.md
- ChatGPT refinement: docs/discovery/CHATGPT-REFINEMENT-enterprise-design-system-startups.md

Output: /docs/discovery/NICHE-INTEL-enterprise-design-system-startups.md
```

### Step 4: Pain Signal Agent
**Status**: ⏳ Pending (requires Steps 1-2)

**Command**:
```bash
@Pain-Signal-Agent Analyze pain signals for Enterprise Design System for Startups

Inputs:
- Manus pain language: docs/discovery/MANUS-enterprise-design-system-startups.md
- ChatGPT clustering: docs/discovery/CHATGPT-REFINEMENT-enterprise-design-system-startups.md

Output: /docs/discovery/PAIN-SIGNALS-enterprise-design-system-startups.md
```

### Step 5: JTBD Agent
**Status**: ⏳ Pending (requires Steps 1-2)

**Command**:
```bash
@JTBD-Agent Create persona and JTBD map for Enterprise Design System for Startups

Inputs:
- Manus persona narrative: docs/discovery/MANUS-enterprise-design-system-startups.md
- Manus JTBD seeds: docs/discovery/MANUS-enterprise-design-system-startups.md
- ChatGPT JTBD structure: docs/discovery/CHATGPT-REFINEMENT-enterprise-design-system-startups.md

Output: /docs/discovery/JTBD-enterprise-design-system-startups.md
```

### Step 6: Opportunity & Moat Agent
**Status**: ⏳ Pending (requires Steps 3-5)

**Command**:
```bash
@Opportunity-Moat-Agent Evaluate opportunity and moat potential for Enterprise Design System for Startups

Inputs:
- Manus competitor gaps: docs/discovery/MANUS-enterprise-design-system-startups.md
- Pain signals: /docs/discovery/PAIN-SIGNALS-enterprise-design-system-startups.md
- JTBD analysis: /docs/discovery/JTBD-enterprise-design-system-startups.md

Output: /docs/discovery/OPPORTUNITY-enterprise-design-system-startups.md
```

### Step 7: Red-Team Strategist (Optional)
**Status**: ⏳ Optional

**Command**:
```bash
@Red-Team-Strategist Critique and find blindspots for Enterprise Design System for Startups

Inputs:
- All discovery documents in /docs/discovery/enterprise-design-system-startups/

Output: /docs/discovery/REDTEAM-enterprise-design-system-startups.md
```

### Step 8: Score & Decision
**Status**: ⏳ Pending (requires Step 6)

**Opportunity Score Calculation** (in OPPORTUNITY doc):
- Niche Viability (0-2.5 points)
- Pain Intensity (0-2.5 points)
- Persona Clarity (0-1.5 points)
- Moat Potential (0-3.5 points)

**Decision Gate**:
- If Score ≥ 8.0/10 → Proceed to Demand Validation
- If Score < 8.0/10 → Pivot or Kill

## Expected Outputs

- [ ] `docs/discovery/MANUS-enterprise-design-system-startups.md`
- [ ] `docs/discovery/CHATGPT-REFINEMENT-enterprise-design-system-startups.md`
- [ ] `docs/discovery/NICHE-INTEL-enterprise-design-system-startups.md`
- [ ] `docs/discovery/PAIN-SIGNALS-enterprise-design-system-startups.md`
- [ ] `docs/discovery/JTBD-enterprise-design-system-startups.md`
- [ ] `docs/discovery/OPPORTUNITY-enterprise-design-system-startups.md`
- [ ] `docs/discovery/REDTEAM-enterprise-design-system-startups.md` (optional)
- [ ] Opportunity Score calculated
- [ ] Decision: Proceed / Pivot / Kill

## Next Steps

After completing all steps:
1. Review Opportunity Score
2. If ≥ 8.0/10: Proceed to Demand Validation workflow
3. If < 8.0/10: Consider pivot or move to next idea
