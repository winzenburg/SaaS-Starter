# Manus API Troubleshooting

## ✅ API Integration Status

The Manus API integration is **working correctly**. The API key is configured and tasks are being created successfully.

## Common Issues

### 1. Credit Limit Exceeded

**Error**: `credit limit exceeded - []`

**Cause**: Your Manus account has run out of API credits.

**Solutions**:
1. **Add credits** to your Manus account
2. **Use "speed" mode** instead of "quality" mode (uses fewer credits)
3. **Run projects individually** instead of in batch
4. **Wait for credit reset** if you have a monthly limit

**Current Setting**: The script now uses "speed" mode by default to conserve credits.

### 2. Task Timeout

**Error**: `Manus task timeout - task did not complete in X seconds`

**Cause**: Tasks are taking longer than the timeout period (currently 5 minutes).

**Solutions**:
1. **Increase timeout** in `src/lib/ai-tools/manus.ts` (currently 300000ms = 5 minutes)
2. **Use "speed" mode** instead of "quality" mode (faster completion)
3. **Run projects individually** to avoid concurrent task limits
4. **Check task status manually** via the task URL in the response

### 3. Task Not Found

**Error**: `task not found - []`

**Cause**: Task hasn't been created yet or there's a delay in the API.

**Solution**: The code now handles 404 errors by continuing to poll. If this persists, check:
- API key is valid
- Network connection is stable
- Manus API status is operational

### 4. Task Failed

**Error**: `Manus task failed: Unknown error`

**Cause**: The task was created but failed during processing.

**Solutions**:
1. **Check the task URL** in the creation response to see details
2. **Simplify the prompt** - very long prompts may fail
3. **Try "speed" mode** instead of "quality" mode
4. **Run the task manually** via Manus.im web interface to debug

## Best Practices

### Credit Management

1. **Start with one project** to test
2. **Use "speed" mode** for initial discovery (saves credits)
3. **Upgrade to "quality" mode** only for final validation
4. **Monitor credit usage** in your Manus dashboard

### Running Discovery

**Option 1: Run One Project at a Time**
```bash
# Modify the script to process only one project
# Or create individual scripts for each project
```

**Option 2: Use Workflows UI**
1. Go to `/workflows`
2. Create discovery workflow for one project
3. Execute Step 1
4. Wait for completion
5. Repeat for next project

**Option 3: Manual Execution**
1. Use Manus.im web interface
2. Use prompts from `docs/discovery/WORKFLOW-*.md`
3. Save outputs manually to `docs/discovery/MANUS-*.md`

## Checking Task Status

If a task is created but timing out, you can check its status:

1. **Get task URL** from the creation response
2. **Visit the URL** in your browser (e.g., `https://manus.im/app/PXHfiLmNraED7aAEuedWeg`)
3. **Or use the API**:
```bash
curl -X GET "https://api.manus.ai/v1/tasks/{task_id}" \
  -H "accept: application/json" \
  -H "API_KEY: your_api_key"
```

## Credit Usage

Each task uses credits based on:
- **Mode**: "speed" uses fewer credits than "quality"
- **Prompt length**: Longer prompts use more credits
- **Complexity**: More complex analysis uses more credits

**Estimated usage per project**:
- Speed mode: ~4-8 credits per task (narrative, persona, competitors = 3 tasks)
- Quality mode: ~8-16 credits per task

**For 5 projects in Batch 1**:
- Speed mode: ~60-120 credits total
- Quality mode: ~120-240 credits total

## Next Steps

Once you have credits available:

1. **Test with one project first**:
   - Run discovery for just "Amazon FBA Seller Intelligence"
   - Verify it completes successfully
   - Check the output quality

2. **Then run the full batch**:
   ```bash
   npm run discovery:batch-1
   ```

3. **Monitor credit usage** as you go

## Support

- **Manus API Docs**: https://open.manus.ai/docs
- **Manus Dashboard**: Check credit balance and usage
- **Task URLs**: Each task creation returns a URL you can visit to see progress

