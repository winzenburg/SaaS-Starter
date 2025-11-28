# AI Integration Guide

> Complete guide to using Manus.im, ChatGPT, ElevenLabs, Midjourney, and Canva in your product creation workflow

## Overview

This system integrates 5 AI tools into your Cursor 2.1 agent workflows:

1. **Manus.im** - Narrative, competitor analysis, personas
2. **ChatGPT** - Reasoning, refinement, ideation
3. **ElevenLabs** - Voice content for demos and validation
4. **Midjourney** - Hero images and concept visuals
5. **Canva** - Marketing materials and templates

## Quick Start

### 1. Set Up API Keys

Add to `.env.local`:

```bash
MANUS_API_KEY=your_manus_key
OPENAI_API_KEY=your_openai_key
ELEVENLABS_API_KEY=your_elevenlabs_key
CANVA_API_KEY=your_canva_key
CANVA_BRAND_ID=your_canva_brand_id
```

### 2. Use in Agent Workflows

```typescript
// In any agent
import { generateNarrative } from "@/lib/ai-tools/manus";
import { reason } from "@/lib/ai-tools/chatgpt";
import { generateVoice } from "@/lib/ai-tools/elevenlabs";
import { generateVisual } from "@/lib/ai-tools/visual";

// Use in your agent logic
```

### 3. Invoke via Cursor Agents

```
@Manus-Narrative-Agent Create narrative for Enterprise Design System
@ChatGPT-Reasoning-Agent Analyze data moat strategy
@ElevenLabs-Voice-Agent Generate demo narration
@Visual-Asset-Agent Create hero image
```

## Agent Roles

### Core Agents (8)
1. Insight & Narrative Strategist
2. Product Strategist
3. Moat & MRR Strategist
4. Retention Architect
5. Portfolio Prioritizer
6. Market Scanner
7. UX Researcher
8. IA Designer

### Validation Agents (4 NEW)
9. **Manus Narrative Agent** - Narrative, competitors, personas
10. **ChatGPT Reasoning Agent** - Reasoning, refinement, ideation
11. **ElevenLabs Voice Agent** - Voice content
12. **Visual Asset Agent** - Visual assets

### Execution Agents (4)
13. Accessibility Agent
14. Engineering Architect
15. Test Engineer
16. Implementer

## Workflow Integration

### Validation Workflow

```
1. @Insight-Strategist → Raw insight
2. @Manus-Narrative-Agent → Narrative + Personas
3. @ChatGPT-Reasoning-Agent → Refine insight
4. @Market-Scanner → Community validation
5. @Product-Strategist → PRD with narrative
6. @Visual-Asset-Agent → Hero images
7. @ElevenLabs-Voice-Agent → Demo narration
8. Validation tests with all assets
```

### Build Workflow

```
1. @Product-Strategist → PRD
2. @ChatGPT-Reasoning-Agent → Technical approach analysis
3. @Engineering-Architect → ADR
4. @Implementer → Code
5. @Visual-Asset-Agent → UI assets
6. @ElevenLabs-Voice-Agent → Demo audio
```

## Rule Files

### Layer B: AI Integration Rules (190-199)

- `190-ai-tool-integrations.mdc` - General integration patterns
- `050-manus-integration.mdc` - Manus.im integration patterns
- `060-chatgpt-refinement.mdc` - ChatGPT refinement patterns
- `070-elevenlabs-integration.mdc` - ElevenLabs integration patterns
- `080-midjourney-canva.mdc` - Midjourney/Canva patterns

## Cost Management

### Estimated Costs (per product)

- **Manus.im**: $50-100 (narrative + personas)
- **ChatGPT**: $10-50 (reasoning + refinement)
- **ElevenLabs**: $20-50 (demo narration)
- **Midjourney**: $10-30 (hero images)
- **Canva**: $0-13 (templates, Pro if needed)

**Total**: ~$90-243 per product validation cycle

### Optimization Tips

1. **Cache results** - Reuse narratives/personas for similar products
2. **Use cheaper models** - GPT-3.5 for ideation, GPT-4 for reasoning
3. **Batch requests** - Generate multiple variations at once
4. **Set budgets** - Limit API calls per workflow

## Quality Gates

Before using AI tool outputs:

1. ✅ Review for accuracy and relevance
2. ✅ Validate against quality criteria
3. ✅ Ensure output is actionable
4. ✅ Check for bias or inappropriate content
5. ✅ Verify output matches requirements

## Examples

See `/docs/examples/ai-integration/` for:
- Narrative generation examples
- Reasoning analysis examples
- Voice script examples
- Visual prompt examples

## Troubleshooting

### API Errors
- Check API keys are set correctly
- Verify rate limits not exceeded
- Check network connectivity

### Quality Issues
- Refine prompts for better results
- Use more specific constraints
- Iterate on outputs

### Cost Issues
- Review usage logs
- Set budget limits
- Use cheaper models when appropriate

## Next Steps

1. Set up API keys
2. Test each tool integration
3. Create your first AI-enhanced workflow
4. Iterate based on results

See individual agent docs for detailed usage:
- `docs/agents/manus-narrative-agent.md`
- `docs/agents/chatgpt-reasoning-agent.md`
- `docs/agents/elevenlabs-voice-agent.md`
- `docs/agents/visual-asset-agent.md`

