# AI Models Update Guide

> Latest model recommendations for ChatGPT and Claude (as of November 2024)

## Current Recommended Models

### OpenAI (ChatGPT)

**Primary Model**: `gpt-4o` (GPT-4 Omni)
- **Best for**: General reasoning, refinement, clustering, ideation
- **Released**: May 2024
- **Capabilities**: Multimodal, fast, cost-effective
- **Use Case**: Breadth/variants/fast clustering/prompt expansion (per Rule 000)

**Alternative Models**:
- `gpt-4-turbo` - Faster, cheaper alternative
- `gpt-4` - Original GPT-4 (more expensive)

**Note**: GPT-5.1 mentioned in web search may not be available via API yet. Check OpenAI API documentation for latest available models.

### Anthropic (Claude)

**Primary Model**: `claude-3-5-sonnet-20241022` (Latest Sonnet)
- **Best for**: Red-team critique, depth analysis, editorial polish
- **Released**: October 2024
- **Capabilities**: Deep reasoning, critique, editorial polish
- **Use Case**: Depth/critique/red-team/editorial polish (per Rule 000)

**Fallback Models** (in order):
1. `claude-3-opus-20240229` - Most capable, best for critique
2. `claude-3-sonnet-20240229` - Balanced performance
3. `claude-3-haiku-20240307` - Fastest, cheapest

**Note**: Claude Opus 4.5 mentioned in web search may not be available via API yet. Check Anthropic API documentation for latest available models.

## Model Selection Strategy

### For ChatGPT (Refinement Tasks)

**Use `gpt-4o` for**:
- Clustering pain points
- Synthesizing JTBD
- Extracting opportunity vectors
- Validating competitor assumptions
- Fast iteration and variant generation

### For Claude (Critique Tasks)

**Use `claude-3-5-sonnet-20241022` for**:
- Red-team critique
- Identifying false assumptions
- Finding competitor risks
- Stress testing moat potential
- Editorial polish

**Fallback Strategy**:
- If `claude-3-5-sonnet-20241022` not available → `claude-3-opus-20240229`
- If `claude-3-opus-20240229` not available → `claude-3-sonnet-20240229`
- If `claude-3-sonnet-20240229` not available → `claude-3-haiku-20240307`

## Implementation

### Default Models

**ChatGPT** (`src/lib/ai-tools/chatgpt.ts`):
```typescript
const model = request.model || process.env.OPENAI_MODEL || "gpt-4o";
```

**Claude** (`src/lib/ai-tools/claude.ts`):
```typescript
let model = request.model || process.env.CLAUDE_MODEL || "claude-3-5-sonnet-20241022";
// With automatic fallback to claude-3-opus-20240229, claude-3-sonnet-20240229, claude-3-haiku-20240307
```

### Environment Variables

```bash
# OpenAI
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4o  # Optional, defaults to gpt-4o

# Anthropic
ANTHROPIC_API_KEY=your_key_here
CLAUDE_MODEL=claude-3-5-sonnet-20241022  # Optional, defaults to claude-3-5-sonnet-20241022
```

## Cost Considerations

### ChatGPT (gpt-4o)
- Input: $2.50 per 1M tokens
- Output: $10.00 per 1M tokens
- **Best for**: High-volume refinement tasks

### Claude (claude-3-5-sonnet-20241022)
- Input: $3.00 per 1M tokens
- Output: $15.00 per 1M tokens
- **Best for**: Critical critique and polish tasks

### Cost Optimization

- Use `gpt-4o` for high-volume tasks (refinement, clustering)
- Use Claude only for critical tasks (red-team, polish)
- Consider `claude-3-haiku-20240307` for simple tasks (cheaper)

## Updating Models

### When New Models Are Released

1. **Check API Documentation**:
   - OpenAI: https://platform.openai.com/docs/models
   - Anthropic: https://docs.anthropic.com/claude/docs/models-overview

2. **Update Default Models**:
   - Update `src/lib/ai-tools/chatgpt.ts` default model
   - Update `src/lib/ai-tools/claude.ts` default model and fallback chain

3. **Update Cost Estimates**:
   - Update `src/lib/ai-tools/utils.ts` pricing table

4. **Test Integration**:
   - Run orchestration script to verify model availability
   - Test fallback chain if primary model unavailable

## Current Status

**As of November 2024**:
- ✅ `gpt-4o` - Available and recommended
- ⚠️ `claude-3-5-sonnet-20241022` - May not be available (check API)
- ✅ `claude-3-opus-20240229` - Available (fallback)
- ✅ `claude-3-sonnet-20240229` - Available (fallback)
- ✅ `claude-3-haiku-20240307` - Available (fallback)

**Recommendation**: Use `gpt-4o` for ChatGPT and `claude-3-opus-20240229` for Claude until newer models are confirmed available via API.

