# AI Tools Integration Library

> Centralized integration for Manus.im, ChatGPT, ElevenLabs, Midjourney, and Canva

## Structure

```
src/lib/ai-tools/
├── README.md (this file)
├── manus.ts (Manus.im integration)
├── chatgpt.ts (ChatGPT integration)
├── elevenlabs.ts (ElevenLabs integration)
├── visual.ts (Midjourney/Canva integration)
├── types.ts (Shared types)
└── utils.ts (Shared utilities)
```

## Usage

### Manus.im

```typescript
import { generateNarrative, analyzeCompetitors, createPersona } from "@/lib/ai-tools/manus";

const narrative = await generateNarrative({
  product: "Enterprise Design System",
  niche: "Startups, CTOs",
  painPoint: "Inconsistent UI development"
});
```

### ChatGPT

```typescript
import { reason, refine, ideate } from "@/lib/ai-tools/chatgpt";

const analysis = await reason({
  problem: "How to build data moat?",
  context: productContext
});
```

### ElevenLabs

```typescript
import { generateVoice } from "@/lib/ai-tools/elevenlabs";

const audio = await generateVoice({
  script: "Welcome to our platform...",
  voiceId: "professional-male"
});
```

### Visual Tools

```typescript
import { generateVisual, createCanvaDesign } from "@/lib/ai-tools/visual";

const heroImage = await generateVisual({
  prompt: "Modern SaaS dashboard",
  style: "minimalist"
});
```

## Environment Variables

Add to `.env.local`:

```bash
MANUS_API_KEY=your_key
OPENAI_API_KEY=your_key
ELEVENLABS_API_KEY=your_key
CANVA_API_KEY=your_key
CANVA_BRAND_ID=your_brand_id
```

## Error Handling

All functions return:

```typescript
{
  success: boolean;
  data?: T;
  error?: string;
  fallback?: string;
}
```

## Rate Limiting

All functions implement:
- Exponential backoff
- Retry logic
- Rate limit tracking

## Cost Tracking

All functions log:
- API calls
- Token usage
- Cost estimates

