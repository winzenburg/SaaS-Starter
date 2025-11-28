# Discovery Workflow: AI Code Review & Documentation Tool

## Idea Details
- **Name**: AI Code Review & Documentation Tool
- **Slug**: ai-code-review-docs
- **Niche**: Engineers, startups
- **JTBD**: Help me generate clean code reviews and documentation instantly
- **Buyer**: CTO, dev lead, IC engineer

## Discovery Workflow Steps

### Step 1: Manus Discovery Pack
**Status**: ⏳ Pending

**Prompt**:
```
Generate a discovery pack for: AI Code Review & Documentation Tool

Target niche: Engineers, startups
Initial JTBD: Help me generate clean code reviews and documentation instantly
Buyer: CTO, dev lead, IC engineer
Description: AI tool that generates comprehensive code reviews and documentation automatically for engineering teams

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
3. Save the output to: `docs/discovery/MANUS-ai-code-review-docs.md`

### Step 2: ChatGPT Refinement
**Status**: ⏳ Pending (requires Step 1)

**Prompt**:
```
Refine and synthesize this Manus discovery output for AI Code Review & Documentation Tool:

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
3. Save the output to: `docs/discovery/CHATGPT-REFINEMENT-ai-code-review-docs.md`

### Step 3: Niche Intelligence Agent
**Status**: ⏳ Pending (requires Steps 1-2)

**Command**:
```bash
@Niche-Intelligence-Agent Analyze niche for AI Code Review & Documentation Tool

Inputs:
- Manus niche narrative: docs/discovery/MANUS-ai-code-review-docs.md
- ChatGPT refinement: docs/discovery/CHATGPT-REFINEMENT-ai-code-review-docs.md

Output: /docs/discovery/NICHE-INTEL-ai-code-review-docs.md
```

### Step 4: Pain Signal Agent
**Status**: ⏳ Pending (requires Steps 1-2)

**Command**:
```bash
@Pain-Signal-Agent Analyze pain signals for AI Code Review & Documentation Tool

Inputs:
- Manus pain language: docs/discovery/MANUS-ai-code-review-docs.md
- ChatGPT clustering: docs/discovery/CHATGPT-REFINEMENT-ai-code-review-docs.md

Output: /docs/discovery/PAIN-SIGNALS-ai-code-review-docs.md
```

### Step 5: JTBD Agent
**Status**: ⏳ Pending (requires Steps 1-2)

**Command**:
```bash
@JTBD-Agent Create persona and JTBD map for AI Code Review & Documentation Tool

Inputs:
- Manus persona narrative: docs/discovery/MANUS-ai-code-review-docs.md
- Manus JTBD seeds: docs/discovery/MANUS-ai-code-review-docs.md
- ChatGPT JTBD structure: docs/discovery/CHATGPT-REFINEMENT-ai-code-review-docs.md

Output: /docs/discovery/JTBD-ai-code-review-docs.md
```

### Step 6: Opportunity & Moat Agent
**Status**: ⏳ Pending (requires Steps 3-5)

**Command**:
```bash
@Opportunity-Moat-Agent Evaluate opportunity and moat potential for AI Code Review & Documentation Tool

Inputs:
- Manus competitor gaps: docs/discovery/MANUS-ai-code-review-docs.md
- Pain signals: /docs/discovery/PAIN-SIGNALS-ai-code-review-docs.md
- JTBD analysis: /docs/discovery/JTBD-ai-code-review-docs.md

Output: /docs/discovery/OPPORTUNITY-ai-code-review-docs.md
```

### Step 7: Red-Team Strategist (Optional)
**Status**: ⏳ Optional

**Command**:
```bash
@Red-Team-Strategist Critique and find blindspots for AI Code Review & Documentation Tool

Inputs:
- All discovery documents in /docs/discovery/ai-code-review-docs/

Output: /docs/discovery/REDTEAM-ai-code-review-docs.md
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

- [ ] `docs/discovery/MANUS-ai-code-review-docs.md`
- [ ] `docs/discovery/CHATGPT-REFINEMENT-ai-code-review-docs.md`
- [ ] `docs/discovery/NICHE-INTEL-ai-code-review-docs.md`
- [ ] `docs/discovery/PAIN-SIGNALS-ai-code-review-docs.md`
- [ ] `docs/discovery/JTBD-ai-code-review-docs.md`
- [ ] `docs/discovery/OPPORTUNITY-ai-code-review-docs.md`
- [ ] `docs/discovery/REDTEAM-ai-code-review-docs.md` (optional)
- [ ] Opportunity Score calculated
- [ ] Decision: Proceed / Pivot / Kill

## Next Steps

After completing all steps:
1. Review Opportunity Score
2. If ≥ 8.0/10: Proceed to Demand Validation workflow
3. If < 8.0/10: Consider pivot or move to next idea
