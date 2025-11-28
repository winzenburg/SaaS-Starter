# Batch 1 Discovery Execution Guide

> Run initial validation for all 5 Batch 1 projects using the AI tool stack

## Quick Start

### Option 1: Automated Script (Recommended)

Run Step 1 (Manus Discovery Pack) for all 5 projects:

```bash
npm run discovery:batch-1
```

This will:
1. Execute Manus API calls for each project
2. Generate niche narrative, persona, and competitor analysis
3. Save results to `docs/discovery/MANUS-<slug>.md`

**Time**: ~10-15 minutes (includes API calls and rate limiting delays)

### Option 2: Manual Execution via Workflows UI

1. Go to `/workflows`
2. Create Discovery workflow for each project:
   - Amazon FBA Seller Intelligence
   - Real Estate Investor & Flipper Platform
   - AI Meeting Assistant
   - AI Code Review & Documentation Tool
   - Enterprise Design System for Startups
3. Execute Step 1 for each workflow

### Option 3: Individual Cursor Agent Invocation

For each project, invoke the Manus agent:

```
@Manus-Narrative-Agent Generate discovery pack for: [PROJECT_NAME]

Target niche: [NICHE]
Initial JTBD: [JTBD]
Buyer: [BUYER]
Description: [DESCRIPTION]
```

## Projects in Batch 1

1. **Amazon FBA Seller Intelligence** (`amazon-fba-seller-intelligence`)
2. **Real Estate Investor & Flipper Platform** (`real-estate-investor-flipper`)
3. **AI Meeting Assistant** (`ai-meeting-assistant`)
4. **AI Code Review & Documentation Tool** (`ai-code-review-docs`)
5. **Enterprise Design System for Startups** (`enterprise-design-system-startups`)

## Discovery Workflow Steps

### Step 1: Manus Discovery Pack ✅ (This script)

**Output**: `docs/discovery/MANUS-<slug>.md`

Contains:
- Niche narrative (culture, vocabulary, identity, geography, income, communities, trends)
- Pain language dictionary (complaints, frustrations, unmet needs)
- JTBD seeds (functional, emotional, social jobs)
- Competitor landscape and gaps
- Pricing expectations
- Distribution hooks and entry points

### Step 2: ChatGPT Refinement

**Input**: `docs/discovery/MANUS-<slug>.md`  
**Output**: `docs/discovery/CHATGPT-REFINEMENT-<slug>.md`

Refines and clusters Manus output:
- Clusters pain points into themes
- Synthesizes JTBD structure
- Extracts opportunity vectors
- Validates competitor assumptions

### Steps 3-6: Cursor Agents

Execute via Cursor or workflows UI:

3. **@Niche-Intelligence-Agent** → `docs/discovery/NICHE-INTEL-<slug>.md`
4. **@Pain-Signal-Agent** → `docs/discovery/PAIN-SIGNALS-<slug>.md`
5. **@JTBD-Agent** → `docs/discovery/JTBD-<slug>.md`
6. **@Opportunity-Moat-Agent** → `docs/discovery/OPPORTUNITY-<slug>.md`

### Step 7: Red-Team (Optional)

**@Red-Team-Strategist** → `docs/discovery/REDTEAM-<slug>.md`

Only run for ideas with Opportunity Score ≥ 7.5

### Step 8: Scoring & Decision

Calculate Opportunity Score (0-10) based on:
- Niche Viability (0-2.5)
- Pain Intensity (0-2.5)
- Persona Clarity (0-2.5)
- Moat Potential (0-2.5)

**Decision Gate**: If Score ≥ 8.0 → Proceed to Demand Validation

## Expected Outputs

After running this script, you should have:

```
docs/discovery/
├── MANUS-amazon-fba-seller-intelligence.md
├── MANUS-real-estate-investor-flipper.md
├── MANUS-ai-meeting-assistant.md
├── MANUS-ai-code-review-docs.md
└── MANUS-enterprise-design-system-startups.md
```

## Next Steps

1. **Review Manus outputs** - Check quality and completeness
2. **Run Step 2 (ChatGPT)** - Refine each Manus output
3. **Run Steps 3-6** - Execute Cursor agents for each project
4. **Calculate Opportunity Scores** - Score each idea
5. **Identify top 3** - Select ideas with Score ≥ 8.0
6. **Proceed to Validation** - Run demand validation for top 3

## Troubleshooting

### API Key Issues

Make sure `.env.local` has:
```env
MANUS_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
```

### Rate Limiting

The script includes 2-second delays between projects. If you hit rate limits:
- Increase delay in script
- Run projects individually
- Check API usage limits

### Failed Requests

If a project fails:
- Check API keys are valid
- Verify network connection
- Review error message in console
- Retry individual project manually

## Time Estimates

- **Step 1 (Manus)**: 10-15 minutes for all 5 projects
- **Step 2 (ChatGPT)**: 5-10 minutes for all 5 projects
- **Steps 3-6**: 6-10 hours per project (sequential)
- **Total for Batch 1**: 35-55 hours

## Success Criteria

✅ All 5 Manus outputs generated  
✅ Each output contains narrative, persona, and competitors  
✅ Files saved to correct location  
✅ Ready for Step 2 (ChatGPT Refinement)

