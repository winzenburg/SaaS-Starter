# API Quota Troubleshooting Guide

> How to fix API quota issues for OpenAI and Anthropic

## OpenAI Quota Issues

### Error Message
```
OpenAI API error: 429 - {"error":{"message":"You exceeded your current quota, please check your plan and billing details."}}
```

### Solutions

#### Option 1: Check and Update Billing (Recommended)

1. **Go to OpenAI Platform**:
   - Visit: https://platform.openai.com/account/billing
   - Sign in with your OpenAI account

2. **Check Current Plan**:
   - Review your current usage and limits
   - Check if you have available credits

3. **Add Payment Method**:
   - Go to: https://platform.openai.com/account/billing/payment-methods
   - Add a credit card or update existing payment method

4. **Set Usage Limits** (Optional):
   - Go to: https://platform.openai.com/account/billing/limits
   - Set soft limits to avoid unexpected charges
   - Set hard limits to prevent overages

5. **Request Quota Increase** (If Needed):
   - Go to: https://platform.openai.com/account/limits
   - Request a quota increase if you need higher limits

#### Option 2: Use a Different API Key

If you have multiple OpenAI accounts or organization keys:

1. **Get New API Key**:
   - Go to: https://platform.openai.com/api-keys
   - Create a new API key

2. **Update `.env.local`**:
   ```bash
   OPENAI_API_KEY=sk-proj-your-new-key-here
   ```

3. **Restart the Script**:
   ```bash
   npx tsx scripts/orchestrate-manus-discovery.ts
   ```

#### Option 3: Wait for Quota Reset

If you're on a free tier or usage-based plan:

1. **Check Reset Date**:
   - Quotas typically reset monthly
   - Check your billing cycle in OpenAI dashboard

2. **Wait and Retry**:
   - Wait for quota reset
   - Retry the script after reset

#### Option 4: Use Alternative Model (Temporary)

If you need to proceed immediately, you can temporarily use a cheaper model:

1. **Update Script**:
   ```typescript
   // In scripts/orchestrate-manus-discovery.ts
   const chatgptResult = await reason({
     // ...
     model: "gpt-3.5-turbo", // Cheaper alternative
   });
   ```

2. **Note**: Lower quality, but may work for basic refinement tasks

## Anthropic (Claude) Quota Issues

### Error Message
```
Anthropic API error: 429 - Rate limit exceeded
```

### Solutions

#### Option 1: Check Billing and Usage

1. **Go to Anthropic Console**:
   - Visit: https://console.anthropic.com/
   - Sign in with your Anthropic account

2. **Check Usage**:
   - Review API usage and limits
   - Check available credits

3. **Add Payment Method**:
   - Go to billing settings
   - Add or update payment method

#### Option 2: Use Fallback Models

The system automatically falls back to cheaper models:
- `claude-3-opus-20240229` → `claude-3-sonnet-20240229` → `claude-3-haiku-20240307`

Haiku is the cheapest and should work even with limited quota.

#### Option 3: Wait and Retry

Rate limits typically reset on a rolling window. Wait a few minutes and retry.

## Verification Steps

### Test OpenAI API Key

```bash
# Test OpenAI API key
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $(grep OPENAI_API_KEY .env.local | cut -d'=' -f2)" \
  | head -20
```

### Test Anthropic API Key

```bash
# Test Anthropic API key
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $(grep ANTHROPIC_API_KEY .env.local | cut -d'=' -f2)" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d '{"model":"claude-3-haiku-20240307","max_tokens":10,"messages":[{"role":"user","content":"test"}]}' \
  | head -20
```

## Quick Fix Checklist

- [ ] Check OpenAI billing: https://platform.openai.com/account/billing
- [ ] Verify payment method is active
- [ ] Check usage limits and quotas
- [ ] Request quota increase if needed
- [ ] Verify API key is correct in `.env.local`
- [ ] Test API key with curl commands above
- [ ] Wait for quota reset if on free tier
- [ ] Consider using cheaper models temporarily

## Cost Estimates

### For Discovery Orchestration

**ChatGPT Refinement** (gpt-4o):
- Estimated tokens: ~3,000-5,000
- Estimated cost: $0.01-0.02

**Claude Red-Team Critique** (claude-3-haiku):
- Estimated tokens: ~4,000-6,000
- Estimated cost: $0.01-0.02

**Total per orchestration**: ~$0.02-0.04

## Prevention

1. **Set Usage Limits**: Configure soft/hard limits in OpenAI dashboard
2. **Monitor Usage**: Check usage regularly
3. **Use Cheaper Models**: Use gpt-3.5-turbo or claude-3-haiku for non-critical tasks
4. **Cache Results**: Don't regenerate the same content multiple times

## After Fixing Quota

Once quota is fixed, rerun the orchestration:

```bash
npx tsx scripts/orchestrate-manus-discovery.ts
```

The script will:
1. ✅ Use existing Manus output (already saved)
2. ✅ Generate ChatGPT refinement (now that quota is fixed)
3. ✅ Use Claude critique (already completed)
4. ✅ Ready for Cursor agents

