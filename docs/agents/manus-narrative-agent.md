# Manus Narrative Agent

> Integrates Manus.im for narrative, competitor analysis, and persona development

## Mission

Use Manus.im to generate compelling narratives, analyze competitors, and develop detailed personas that drive desirability validation.

## When to Use

- **Narrative Development**: When creating the "unfair insight" narrative for a product
- **Competitor Analysis**: When scanning the market and understanding competitive positioning
- **Persona Development**: When defining target users and their identity-level pain points
- **Demand Validation**: When crafting messaging for validation tests

## Integration with Manus.im

### API Access

```typescript
// Use Manus.im API or web interface
// API Key: process.env.MANUS_API_KEY
// Base URL: https://api.manus.im/v1

import { generateDiscoveryPack, getManusTask } from "@/lib/ai-tools/manus";
import { parseManusDiscoveryPack, extractSources, formatCitations } from "@/lib/ai-tools/manus-parser";
```

### Discovery Pack Generation

**Primary Method**: Use `generateDiscoveryPack()` to get complete discovery pack in one call:

```typescript
const result = await generateDiscoveryPack({
  product: "Enterprise Design System for Startups",
  niche: "Startups, scale-ups, CTOs/Heads of Product",
  painPoint: "Help me ship UI consistently and faster",
  context: "Enterprise-grade design system for startups"
});

// Result includes: narrative, persona, competitors, pricing, hooks
// All with proper citations and sources
```

**The API handles**:
- ✅ Both JSON and markdown response formats
- ✅ Automatic parsing of discovery pack structure
- ✅ Citation extraction and formatting
- ✅ Source attribution

### Workflow

1. **Discovery Pack Generation**
   - Input: Product idea, target niche, core pain point, context
   - Output: Complete discovery pack (markdown format) with:
     - Niche narrative (with citations)
     - Pain language dictionary (with citations)
     - Detailed persona (with citations)
     - Competitor landscape (with citations)
     - Pricing expectations (with citations)
     - Distribution hooks (with citations)
     - References section (all sources)
   - Duration: 1-2 hours (API call + processing)
   - **All claims must be backed by cited sources**

2. **Parsing Discovery Pack**
   - Use `parseManusDiscoveryPack()` to extract structured data
   - Use `extractSources()` to get all citations
   - Use `formatCitations()` to convert `[number]` to `[^number]` footnotes
   - Generate validation documents with proper citations

3. **Importing Discovery Packs**
   - **From File**: Use `scripts/import-manus-discovery-pack-from-file.ts`
   - **From Task ID**: Use `scripts/import-manus-from-task-id.ts`
   - Both scripts generate NARRATIVE, PERSONA, COMPETITORS documents with citations

4. **Narrative Generation** (Legacy - prefer discovery pack)
   - Input: Product idea, target niche, core pain point
   - Output: Compelling narrative that connects identity-level pain to solution
   - Use Manus to generate 3-5 narrative variations
   - Select strongest narrative based on emotional resonance

5. **Competitor Analysis** (Legacy - prefer discovery pack)
   - Input: Product category, target market
   - Output: Competitor landscape with positioning insights
   - Use Manus to analyze competitor narratives and messaging
   - Identify gaps and differentiation opportunities

6. **Persona Development** (Legacy - prefer discovery pack)
   - Input: Target niche, job-to-be-done
   - Output: Detailed persona with identity-level motivations
   - Use Manus to generate persona narratives
   - Validate persona resonates with target community

## Outputs

- `/docs/product/NARRATIVE-<product>.md` - Narrative brief
- `/docs/research/COMPETITORS-<product>.md` - Competitor analysis
- `/docs/research/PERSONA-<product>.md` - Persona profiles

## Prompt Template

```
@Manus-Narrative-Agent Create a narrative and persona analysis for <PRODUCT>.

Use Manus.im to:
1) Generate 3-5 narrative variations that connect identity-level pain to solution
2) Analyze competitor narratives and positioning
3) Develop detailed personas with identity-level motivations

Output:
- /docs/product/NARRATIVE-<product>.md
- /docs/research/COMPETITORS-<product>.md
- /docs/research/PERSONA-<product>.md
```

## Quality Criteria

- ✅ Narrative connects identity-level pain to solution
- ✅ Narrative is emotionally compelling and memorable
- ✅ Competitor analysis identifies clear differentiation
- ✅ Personas reflect real identity-level motivations
- ✅ All outputs ready for validation testing
- ✅ **All claims backed by cited sources** (required)
- ✅ **Proper citation format** (`[^number]` footnotes with sources section)
- ✅ **Source URLs included** when available
- ✅ **Discovery pack format** properly parsed (markdown or JSON)

## Integration Points

- **Before**: Insight Strategist (provides raw insight)
- **After**: Product Strategist (uses narrative for PRD)
- **Parallel**: Market Scanner (validates narrative with community)

