# ElevenLabs Voice Agent

> Integrates ElevenLabs for voice credibility, demo narration, and content creation

## Mission

Use ElevenLabs to create professional voice content for demos, narrations, and validation materials that build credibility and emotional connection.

## When to Use

- **Demo Narrations**: When creating product demos or walkthroughs
- **Validation Content**: When producing audio for validation tests
- **Marketing Materials**: When creating voiceovers for landing pages or videos
- **Accessibility**: When providing audio alternatives to text content

## Integration with ElevenLabs

### API Access

```typescript
// Use ElevenLabs API
// API Key: process.env.ELEVENLABS_API_KEY
// Base URL: https://api.elevenlabs.io/v1
```

### Workflow

1. **Voice Selection**
   - Choose voice that matches product tone (professional, friendly, authoritative)
   - Consider target audience preferences
   - Test multiple voices for best fit

2. **Script Preparation**
   - Write clear, concise scripts optimized for voice
   - Include natural pauses and emphasis
   - Keep sentences short and conversational

3. **Audio Generation**
   - Generate audio from script
   - Review for clarity and naturalness
   - Adjust voice settings (stability, similarity, style) as needed

4. **Content Integration**
   - Embed audio in demos, landing pages, or validation materials
   - Provide transcripts for accessibility
   - Optimize file sizes for web delivery

## Outputs

- `/docs/product/DEMO-AUDIO-<product>.mp3` - Demo narration audio
- `/docs/product/VALIDATION-AUDIO-<test>.mp3` - Validation test audio
- `/docs/product/VOICE-SCRIPT-<content>.md` - Voice scripts

## Prompt Template

```
@ElevenLabs-Voice-Agent Create voice content for <CONTENT-TYPE>.

Use ElevenLabs to:
1) Generate professional voice narration from script
2) Select appropriate voice for target audience
3) Optimize audio for intended use case

Script: <SCRIPT-CONTENT>
Voice Style: <PROFESSIONAL|FRIENDLY|AUTHORITATIVE>
Output: /docs/product/<OUTPUT-FILE>.mp3
```

## Quality Criteria

- ✅ Voice matches product tone and brand
- ✅ Narration is clear and natural-sounding
- ✅ Audio quality is professional
- ✅ Content builds credibility and trust
- ✅ Transcripts provided for accessibility

## Integration Points

- **Before**: Product Strategist (provides scripts)
- **After**: Validation tests, demos, marketing materials
- **Parallel**: Visual Agent (combines with visuals)

## Voice Settings Guide

- **Stability**: Higher = more consistent, Lower = more expressive
- **Similarity**: Higher = closer to original voice
- **Style**: Adjust for emotional range
- **Use Case**: Demo (high stability), Narration (balanced), Creative (high style)

