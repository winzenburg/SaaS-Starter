# Opportunity & Moat Agent

> Stage 4 of Product Discovery: Find where your product can earn a defensive moat in the niche

## Mission

Find where your product can earn a defensive moat in the niche by identifying winner-take-most dynamics, switching cost potential, data moats, workflow embedding opportunities, and underserved segments. Calculate Opportunity Score (must be ≥ 8.0/10 to proceed).

## When to Use

- **Stage 4 of Product Discovery**: Fourth and final stage after persona & JTBD
- **After Persona & JTBD**: Must complete Stage 3 (Persona & JTBD) first
- **Before Validation Planning**: Must complete before validation phase
- **Discovery Workflow**: Step 6 in 8-step discovery pipeline

## AI Tool Integrations

- **Manus.im**: Competitor landscape analysis
- **ChatGPT**: Opportunity frameworks, moat analysis
- **Midjourney/Canva**: Mock illustrations of opportunities
- **Cursor**: Structured evaluation

## Required Inputs

1. **Manus Competitor Gaps** (REQUIRED)
   - Competitor gap analysis from Manus
   - Positioning gaps
   - Feature gaps
   - Unmet needs

2. **JTBD Documents** (REQUIRED)
   - `/docs/discovery/JTBD-<idea-slug>.md`

3. **Pain Signals Documents** (REQUIRED)
   - `/docs/discovery/PAIN-SIGNALS-<idea-slug>.md`

## Core Tasks

### 1. Identify Winner-Take-Most Dynamics

**Tools**: ChatGPT

**Winner-Take-Most Analysis**:
- Network effects: Does the product benefit from network effects?
- Scale advantages: Does scale create advantages?
- Platform effects: Does the product create a platform?
- Market concentration: Is the market likely to concentrate?
- Winner-take-most indicators: What indicates winner-take-most potential?

### 2. Analyze Switching Cost Potential

**Tools**: ChatGPT

**Switching Cost Analysis**:
- Data migration costs: How costly is it to migrate data?
- Workflow integration costs: How integrated is the product in workflows?
- Training costs: How much training is required?
- Relationship costs: How important are relationships built in the product?
- Switching cost strength: How strong are switching costs? (Low/Medium/High)

### 3. Identify Data Moats

**Tools**: ChatGPT

**Data Moat Elements**:
- Data exhaust: What data does the product naturally generate?
- Data insights: What insights can be derived from the data?
- Data tracking: What can be tracked that competitors can't?
- Proprietary data: What data is unique to this product?
- Compounding mechanism: How does data compound value?
- 10× Value: How does data create 10× value?
- Feedback loop: How does usage improve data?

### 4. Analyze Workflow Embedding Opportunities

**Tools**: ChatGPT

**Workflow Embedding Analysis**:
- Workflow integration points: Where can the product integrate into workflows?
- Workflow dependencies: What workflows depend on the product?
- Workflow lock-in: How can the product create workflow lock-in?
- Workflow embedding strength: How strong is workflow embedding? (Low/Medium/High)
- Workflow embedding strategy: How to embed the product in workflows?

### 5. Identify Underserved Segments (Blue Ocean Pockets)

**Tools**: ChatGPT

**Blue Ocean Analysis**:
- Underserved segments: What segments are underserved?
- Segment characteristics: What are the characteristics of underserved segments?
- Segment size: How large are underserved segments?
- Segment needs: What needs do underserved segments have?
- Blue ocean opportunities: What opportunities exist in blue ocean pockets?
- Competitive advantage: What competitive advantage exists in blue ocean pockets?

### 6. Provide Midjourney/Canva Prompts for "Future Vision" Mockups

**Tools**: Midjourney/Canva + Visual Asset Agent

**Visual Prompt Requirements** (Rule 080):
- Vision mockup of future product (2-3 variants)
- Conceptual diagram (2-3 variants)
- Social ad concepts (2-3 variants)
- All prompts explicit in style, lighting, medium, mood

### 7. Calculate Opportunity Score

**Tools**: Cursor

**Opportunity Score Calculation** (Rule 301):
- Niche Viability (0-2.5 points)
- Pain Intensity (0-2.5 points)
- Persona Clarity (0-1.5 points)
- Moat Potential (0-3.5 points)
- **Total**: 10.0 points maximum
- **Threshold**: ≥ 8.0/10 required to proceed

## Outputs

**Output**: `/docs/discovery/OPPORTUNITY-<idea-slug>.md`

**Required Sections**:
1. Winner-Take-Most Dynamics
2. Switching Cost Potential
3. Data Moats (data exhaust, insights, tracking)
4. Workflow Embedding Opportunities
5. Underserved Segments (blue ocean pockets)
6. Midjourney/Canva Prompts (future vision mockups, 2-3 variants)
7. Opportunity Score (must be ≥ 8.0/10)
8. Recommendations (proceed to validation / pivot / kill)

## Quality Criteria

- ✅ Winner-take-most dynamics identified
- ✅ Switching cost potential analyzed
- ✅ Data moats identified (data exhaust, insights, tracking)
- ✅ Workflow embedding opportunities analyzed
- ✅ Underserved segments identified (blue ocean pockets)
- ✅ Midjourney/Canva prompts provided (2-3 variants, explicit in style/lighting/medium/mood)
- ✅ Opportunity Score calculated (≥ 8.0/10 to proceed)
- ✅ Recommendations provided (proceed / pivot / kill)

## Integration Points

- **Before**: Stage 3 (Persona & JTBD) - opportunity analysis requires persona and JTBD
- **After**: Validation Phase (if Opportunity Score ≥ 8.0/10)
- **Rule**: `.cursor/rules/044-opportunity-moat.mdc`
- **Rule**: `.cursor/rules/080-midjourney-canva.mdc` (Visual prompts)
- **Rule**: `.cursor/rules/301-discovery-overview.mdc` (Opportunity Score)
- **Workflow**: `docs/DISCOVERY-WORKFLOW.md`

## Prompt Template

```
@Opportunity-Moat-Agent Analyze opportunity and moat for <IDEA>.

Input:
- Manus competitor gaps: [From Manus Narrative Agent]
- JTBD documents: [From JTBD Agent]
- Pain signals documents: [From Pain Signal Agent]
- Manus References section: [Full citations with URLs from Manus document]

Tasks:
1) Identify winner-take-most dynamics
2) Analyze switching cost potential
3) Identify data moats (data exhaust, insights, tracking)
4) Analyze workflow embedding opportunities
5) Identify underserved segments (blue ocean pockets)
6) Provide Midjourney/Canva prompts for "future vision" mockups (2-3 variants)
7) Calculate Opportunity Score (must be ≥ 8.0/10)
8) Produce documentation (Cursor)

**CRITICAL: Citation Requirements**
- When referencing sources, you MUST include the full citation with URL, not just the number
- Format: "Source: [1] Author, A. (Year). Title. Publisher. - https://example.com/article"
- Example: "Source: [10] Autentika. (2024, June 18). How much is a design system? We counted and here's the price tag. - https://autentika.com/blog/how-much-is-a-design-system-we-counted-and-here-s-the-price-tag"
- Do NOT use generic references like "Source: Manus Discovery Pack" or "Source: [10]"
- All claims must be backed by full citations with URLs from the Manus References section

Output: /docs/discovery/OPPORTUNITY-<idea-slug>.md
```

## See Also

- `.cursor/rules/044-opportunity-moat.mdc` - Opportunity & moat rules
- `.cursor/rules/080-midjourney-canva.mdc` - Midjourney/Canva integration
- `.cursor/rules/301-discovery-overview.mdc` - Discovery overview (Opportunity Score)
- `.cursor/rules/300-discovery-master.mdc` - Discovery master rule
- `.cursor/rules/302-discovery-workflow.mdc` - Discovery workflow
- `docs/agents/manus-narrative-agent.md` - Manus agent
- `docs/agents/chatgpt-reasoning-agent.md` - ChatGPT agent
- `docs/agents/visual-asset-agent.md` - Visual Asset agent

