# Manus API Setup Guide

## Overview

The Manus API integration uses a task-based async API. Tasks are created, then polled until completion.

## API Structure

- **Base URL**: `https://api.manus.ai/v1`
- **Authentication**: `API_KEY` header (not Bearer token)
- **Method**: Task-based (create task → poll for result)

## Setup

### 1. Get API Key

1. Go to [Manus API Integration settings](https://open.manus.ai/docs/quickstart)
2. Generate a new API key
3. Copy the key

### 2. Add to Environment

Add to `.env.local`:

```env
MANUS_API_KEY=your_api_key_here
```

### 3. Verify API Key

Test the API key:

```bash
curl -X POST "https://api.manus.ai/v1/tasks" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "API_KEY: your_api_key_here" \
  -d '{"prompt":"test","mode":"speed"}'
```

Expected response:
```json
{
  "taskId": "task_xxx",
  "status": "pending"
}
```

## API Endpoints

### Create Task

```typescript
POST /v1/tasks
Headers:
  - API_KEY: your_api_key
  - Content-Type: application/json
Body:
  {
    "prompt": "Your prompt here",
    "mode": "speed" | "quality"
  }
```

### Get Task Status

```typescript
GET /v1/tasks/{taskId}
Headers:
  - API_KEY: your_api_key
```

Response:
```json
{
  "taskId": "task_xxx",
  "status": "pending" | "completed" | "failed",
  "result": "..." // only when status is "completed"
}
```

## Usage in Code

The integration is already set up in `src/lib/ai-tools/manus.ts`:

```typescript
import { generateNarrative, createPersona, analyzeCompetitors } from "@/lib/ai-tools/manus";

// Generate narrative
const result = await generateNarrative({
  product: "My Product",
  niche: "Target Niche",
  painPoint: "Pain point description",
  context: "Additional context"
});

// Create persona
const persona = await createPersona({
  product: "My Product",
  niche: "Target Niche",
  narrative: "Narrative from previous step"
});

// Analyze competitors
const competitors = await analyzeCompetitors({
  product: "My Product",
  niche: "Target Niche"
});
```

## Error Handling

The API returns structured errors:

```json
{
  "code": 16,
  "message": "invalid api key",
  "details": []
}
```

Common errors:
- **Code 16**: Invalid API key - check your `MANUS_API_KEY` in `.env.local`
- **404**: Endpoint not found - verify API URL is `https://api.manus.ai/v1`
- **429**: Rate limit exceeded - wait and retry

## Troubleshooting

### "Invalid API Key" Error

1. Verify `MANUS_API_KEY` is set in `.env.local`
2. Check for typos or extra spaces
3. Regenerate API key if needed

### "404 Not Found" Error

1. Verify API URL: `https://api.manus.ai/v1`
2. Check endpoint path: `/tasks` (not `/narrative` or `/persona`)
3. Ensure you're using POST for creating tasks

### Task Timeout

Tasks typically complete in 10-60 seconds. If timeout occurs:
- Increase `maxWaitMs` in `getTaskResult()` (default: 60000ms)
- Check task status manually via API
- Verify your prompt isn't too complex

## Rate Limits

Manus API has rate limits. The integration includes:
- Automatic retry with exponential backoff
- 2-second delay between polling requests
- Error handling for rate limit responses

## Next Steps

Once the API is working:
1. Run `npm run discovery:batch-1` to test
2. Check `docs/discovery/MANUS-*.md` files for outputs
3. Proceed to Step 2 (ChatGPT Refinement)

