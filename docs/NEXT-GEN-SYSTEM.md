# Next-Generation Rules + Agents System

> The most advanced Demand-Validation + Product-Creation AI playbook you can run today

## Overview

This system integrates 5 AI tools into your Cursor 2.1 agent workflows:

1. **Manus.im** - Narrative, competitor analysis, persona development
2. **ChatGPT** - Reasoning, refinement, accelerated ideation
3. **ElevenLabs** - Voice credibility, demo narration, content
4. **Midjourney** - Hero images, concept visual assets
5. **Canva** - Marketing materials, templates

## System Architecture

### 16-Agent System

**Core Agents (8)**:
1. Insight & Narrative Strategist
2. Product Strategist
3. Moat & MRR Strategist
4. Retention Architect
5. Portfolio Prioritizer
6. Market Scanner
7. UX Researcher
8. IA Designer

**AI Validation Agents (4 NEW)**:
9. Manus Narrative Agent
10. ChatGPT Reasoning Agent
11. ElevenLabs Voice Agent
12. Visual Asset Agent

**Execution Agents (4)**:
13. Accessibility Agent
14. Engineering Architect
15. Test Engineer
16. Implementer

### 10 AI Integration Rules

**Layer B: AI Integration Rules (190-199)**:
- `190-ai-tool-integrations.mdc` - General integration patterns
- `050-manus-integration.mdc` - Manus.im integration
- `060-chatgpt-refinement.mdc` - ChatGPT refinement
- `070-elevenlabs-integration.mdc` - ElevenLabs integration
- `080-midjourney-canva.mdc` - Midjourney/Canva integration
- `195-ai-workflow-orchestration.mdc` - Multi-tool orchestration
- `196-ai-quality-control.mdc` - Quality gates
- `197-ai-cost-management.mdc` - Budget tracking
- `198-ai-prompt-templates.mdc` - Prompt templates
- `199-ai-error-handling.mdc` - Error handling

## Folder Structure

```
SaaS Starter Hub/
├── docs/
│   ├── agents/
│   │   ├── manus-narrative-agent.md (NEW)
│   │   ├── chatgpt-reasoning-agent.md (NEW)
│   │   ├── elevenlabs-voice-agent.md (NEW)
│   │   ├── visual-asset-agent.md (NEW)
│   │   └── [8 core agents]
│   ├── prompts/ (NEW)
│   │   ├── manus/
│   │   ├── chatgpt/
│   │   ├── elevenlabs/
│   │   └── visual/
│   ├── AI-INTEGRATION-GUIDE.md (NEW)
│   └── NEXT-GEN-SYSTEM.md (this file)
├── src/
│   └── lib/
│       └── ai-tools/ (NEW)
│           ├── manus.ts
│           ├── chatgpt.ts
│           ├── elevenlabs.ts
│           ├── visual.ts
│           └── types.ts
└── .cursor/
    └── rules/
        ├── 190-ai-tool-integrations.mdc (NEW)
        ├── 050-manus-integration.mdc
        ├── 060-chatgpt-refinement.mdc
        ├── 070-elevenlabs-integration.mdc
        ├── 080-midjourney-canva.mdc
        ├── 195-ai-workflow-orchestration.mdc (NEW)
        ├── 196-ai-quality-control.mdc (NEW)
        ├── 197-ai-cost-management.mdc (NEW)
        ├── 198-ai-prompt-templates.mdc (NEW)
        └── 199-ai-error-handling.mdc (NEW)
```

## Quick Start

### 1. Set Up API Keys

Add to `.env.local`:

```bash
MANUS_API_KEY=your_key
OPENAI_API_KEY=your_key
ELEVENLABS_API_KEY=your_key
CANVA_API_KEY=your_key
CANVA_BRAND_ID=your_brand_id
```

### 2. Use in Workflows

```
@Manus-Narrative-Agent Create narrative for Enterprise Design System
@ChatGPT-Reasoning-Agent Analyze data moat strategy
@ElevenLabs-Voice-Agent Generate demo narration
@Visual-Asset-Agent Create hero image
```

### 3. Follow Integration Rules

All AI tool usage follows patterns in `.cursor/rules/190-199/`.

## Workflow Examples

### Validation Workflow (AI-Enhanced)

```
1. @Insight-Strategist → Raw insight
2. @Manus-Narrative-Agent → Narrative + Personas (parallel)
3. @ChatGPT-Reasoning-Agent → Refine insight (parallel)
4. Synthesize: Best narrative + refined insight
5. @Market-Scanner → Community validation
6. @Visual-Asset-Agent → Hero images (parallel)
7. @ElevenLabs-Voice-Agent → Demo narration (parallel)
8. Validation tests with all assets
```

### Build Workflow (AI-Enhanced)

```
1. @Product-Strategist → PRD
2. @ChatGPT-Reasoning-Agent → Technical approach analysis
3. @Engineering-Architect → ADR
4. @Implementer → Code
5. @Visual-Asset-Agent → UI assets
6. @ElevenLabs-Voice-Agent → Demo audio
```

## Cost Estimates

**Per Product Validation Cycle**:
- Minimum: ~$35-95 (using free/low-cost options)
- Typical: ~$90-243 (using recommended tools)
- Maximum: ~$200-400 (using premium options)

See `197-ai-cost-management.mdc` for detailed cost breakdown.

## Quality Gates

All AI outputs must pass quality gates:
- Narrative: 7/10 minimum (identity connection, emotional resonance, clarity)
- Reasoning: 7/10 minimum (logic, completeness, actionability)
- Voice: 7/10 minimum (clarity, naturalness, tone match)
- Visual: 7/10 minimum (concept communication, style consistency)

See `196-ai-quality-control.mdc` for detailed criteria.

## Prompt Templates

Ready-to-use templates in `docs/prompts/`:
- Manus: Narrative, competitor analysis, personas
- ChatGPT: Reasoning, refinement, ideation
- ElevenLabs: Demo narration, voice scripts
- Visual: Hero images, concept visuals, Canva templates

## Best Practices

1. **Start with cheapest tools** - GPT-3.5 before GPT-4
2. **Parallelize independent tasks** - Speed up workflows
3. **Cache common requests** - Reduce costs
4. **Set quality thresholds** - Don't proceed with low-quality outputs
5. **Monitor costs** - Stay within budget
6. **Log everything** - Learn and improve

## Documentation

- **AI Integration Guide**: `docs/AI-INTEGRATION-GUIDE.md`
- **Agent Roles**: `docs/agents/*.md`
- **Integration Rules**: `.cursor/rules/190-199/*.mdc`
- **Prompt Templates**: `docs/prompts/*/`

## What Makes This Next-Gen

1. **Explicit AI Integration** - Not just Cursor, but 5 specialized AI tools
2. **Orchestrated Workflows** - Multiple AI tools working together
3. **Quality Gates** - Ensures AI outputs meet standards
4. **Cost Management** - Budget tracking and optimization
5. **Error Handling** - Graceful fallbacks for AI failures
6. **Prompt Templates** - Ready-to-use, optimized prompts
7. **Complete Documentation** - Every tool documented with examples

This is the most advanced demand-validation + product-creation AI playbook available today.

