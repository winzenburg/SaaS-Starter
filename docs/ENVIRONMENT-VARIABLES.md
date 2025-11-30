# Environment Variables Guide

> Complete reference for all environment variables used in SaaS Starter

## Quick Setup

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Fill in your API keys (see sections below for where to get them)

3. Never commit `.env` to git (it's in `.gitignore`)

## Required Variables

### Database
- `DATABASE_URL` - PostgreSQL connection string
  - Format: `postgresql://user:password@host:port/database?schema=public`
  - Get from: Your PostgreSQL provider (Supabase, Railway, Neon, etc.)

### Stripe (Payments)
- `STRIPE_SECRET_KEY` - Server-side Stripe API key
  - Get from: [Stripe Dashboard](https://dashboard.stripe.com/apikeys) → API keys
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Client-side Stripe key
  - Get from: Same location as above
- `STRIPE_WEBHOOK_SECRET` - Webhook signing secret
  - Get from: Stripe Dashboard → Developers → Webhooks → Add endpoint → Copy signing secret

## AI Tools - Discovery & Validation

### Manus.im
**Purpose**: Narrative generation, competitor analysis, persona creation

- `MANUS_API_KEY` - Your Manus API key
  - Get from: [Manus.im Dashboard](https://manus.im) → API Keys
  - **Required for**: @Manus-Narrative-Agent, discovery agents
- `MANUS_API_URL` - Optional, defaults to official API

**Cost**: ~$50-100 per product narrative

### OpenAI (ChatGPT)
**Purpose**: Reasoning, refinement, clustering, ideation

- `OPENAI_API_KEY` - Your OpenAI API key
  - Get from: [OpenAI Platform](https://platform.openai.com/api-keys)
  - **Required for**: @ChatGPT-Reasoning-Agent, refinement workflows
- `OPENAI_MODEL` - Optional, defaults to `gpt-4o`
  - Options: `gpt-4o`, `gpt-4-turbo`, `gpt-3.5-turbo`

**Cost**: ~$0.01-0.10 per refinement task

### Anthropic (Claude)
**Purpose**: Deep reasoning, critique, red-teaming

- `ANTHROPIC_API_KEY` - Your Anthropic API key
  - Get from: [Anthropic Console](https://console.anthropic.com/) → API Keys
  - **Required for**: @Red-Team-Strategist, deep analysis
- `ANTHROPIC_MODEL` - Optional, defaults to `claude-3-5-sonnet-20241022`
  - Options: `claude-3-5-sonnet-20241022`, `claude-3-opus-20240229`

**Cost**: ~$0.03-0.15 per analysis task

### ElevenLabs
**Purpose**: Voice content for demos, persona interviews, founder intros

- `ELEVENLABS_API_KEY` - Your ElevenLabs API key
  - Get from: [ElevenLabs Dashboard](https://elevenlabs.io/app/settings/api-keys)
  - **Required for**: @ElevenLabs-Voice-Agent
- `ELEVENLABS_VOICE_ID` - Optional, defaults to a professional voice
  - Get from: ElevenLabs Dashboard → Voices → Copy Voice ID

**Cost**: ~$0.18 per 1000 characters

### Midjourney
**Purpose**: Hero images, concept visuals, social ad creatives

**Note**: Midjourney doesn't have a public API. Options:

1. **Discord Bot** (Manual):
   - `MIDJOURNEY_DISCORD_TOKEN` - Your Discord bot token
   - `MIDJOURNEY_SERVER_ID` - Discord server ID
   - `MIDJOURNEY_CHANNEL_ID` - Channel ID for image generation
   - Get from: [Midjourney Discord](https://discord.gg/midjourney)

2. **Third-Party Service** (Recommended):
   - Use Replicate, Stability AI, or similar
   - `MIDJOURNEY_API_KEY` - API key from service provider
   - Services: [Replicate](https://replicate.com), [Stability AI](https://stability.ai)

**Cost**: ~$0.04-0.10 per image

### Canva
**Purpose**: Marketing materials, templates, social graphics

- `CANVA_API_KEY` - Your Canva API key
  - Get from: [Canva Developers](https://www.canva.dev/) → Create App → API Keys
- `CANVA_BRAND_ID` - Your brand ID
  - Get from: Canva Dashboard → Brand Kit → Copy Brand ID

**Cost**: Free tier available, paid plans for API access

### Google AI Studio (Gemini)
**Purpose**: Advanced image generation, multimodal design, AI-powered visual creation

- `GOOGLE_AI_STUDIO_API_KEY` - Your Google AI Studio API key
  - Get from: [Google AI Studio](https://aistudio.google.com/) → Get API Key → Create API Key
  - **Required for**: Advanced image generation, multimodal visual design
- `GOOGLE_AI_STUDIO_MODEL` - Optional, defaults to `gemini-1.5-pro`
  - Options: `gemini-1.5-pro`, `gemini-1.5-flash`, `gemini-pro`

**Features**:
- Multimodal prompts (text + image input)
- Advanced image generation capabilities
- Design creation and refinement
- Text-to-image generation

**Cost**: Free tier available (generous quotas), paid plans for higher usage

### Glif
**Purpose**: Creative batching workflows (high-volume creative outputs)

- `GLIF_API_KEY` - Your Glif API key
  - Get from: [Glif Dashboard](https://glif.app) → Settings → API
- `GLIF_WORKSPACE_ID` - Your workspace ID
  - Get from: Glif Dashboard → Workspace Settings

**Cost**: Pay-per-use, varies by workflow complexity

## Automation & Analytics

### Lindy AI
**Purpose**: Automation runner for discovery + demand validation workflows

- `LINDY_API_KEY` - Your Lindy API key
  - Get from: [Lindy Dashboard](https://lindy.ai) → Settings → API
- `LINDY_WORKSPACE_ID` - Your workspace ID
  - Get from: Lindy Dashboard → Workspace Settings

**Cost**: Free tier available, paid plans for higher usage

### PostHog
**Purpose**: Product analytics, feature flags, session replay

- `NEXT_PUBLIC_POSTHOG_KEY` - Your PostHog project API key
  - Get from: [PostHog Dashboard](https://app.posthog.com) → Project Settings → API Keys
- `NEXT_PUBLIC_POSTHOG_HOST` - Optional, defaults to `https://app.posthog.com`
  - Use custom domain if self-hosting

**Cost**: Free tier available (1M events/month), paid plans for more

### Supabase
**Purpose**: Database, storage, edge functions, RLS

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
  - Get from: [Supabase Dashboard](https://app.supabase.com) → Project Settings → API → Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public (client-side) API key
  - Get from: Same location → anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` - Server-side only (never expose to client)
  - Get from: Same location → service_role key

**Cost**: Free tier available, paid plans for production

### Clerk
**Purpose**: Authentication, sessions, organizations, RBAC

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Public (client-side) key
  - Get from: [Clerk Dashboard](https://dashboard.clerk.com) → API Keys → Publishable Key
- `CLERK_SECRET_KEY` - Server-side secret key
  - Get from: Same location → Secret Key
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL` - Optional, defaults to `/sign-in`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL` - Optional, defaults to `/sign-up`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` - Optional, defaults to `/dashboard`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` - Optional, defaults to `/onboarding`

**Cost**: Free tier available (10,000 MAU), paid plans for more

## Optional Variables

### Vercel (Auto-set when deploying)
- `VERCEL_URL` - Auto-set by Vercel
- `VERCEL_ENV` - Auto-set by Vercel (`development`, `preview`, `production`)

### Feature Flags
- `VERCEL_BLOB_READ_WRITE_TOKEN` - For Vercel Blob storage (if using)

### Monitoring
- `SENTRY_DSN` - Optional, for error tracking
- `SENTRY_AUTH_TOKEN` - Optional, for releases

## Environment-Specific Files

Next.js supports environment-specific files:

- `.env` - Default (loaded in all environments)
- `.env.local` - Local overrides (gitignored, use for secrets)
- `.env.development` - Development-only
- `.env.production` - Production-only

**Best Practice**: Use `.env.local` for your actual API keys (it's gitignored).

## Security Notes

1. **Never commit `.env` or `.env.local`** - They're in `.gitignore`
2. **Use `.env.example`** - Commit this with placeholder values
3. **Server-side only**: `STRIPE_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `CLERK_SECRET_KEY`
4. **Client-side safe**: All `NEXT_PUBLIC_*` variables are exposed to the browser
5. **Vercel**: Add all variables in Vercel Dashboard → Settings → Environment Variables

## Cost Estimates (Per Product)

- **Manus.im**: $50-100 (narrative + personas)
- **ChatGPT**: $1-10 (refinement tasks)
- **Claude**: $3-15 (red-teaming, deep analysis)
- **ElevenLabs**: $5-20 (voice content)
- **Google AI Studio**: $5-25 (multimodal design, image analysis)
- **Midjourney/Canva**: $10-50 (visual assets)
- **Glif**: $5-25 (creative batching)
- **Lindy**: $0-20 (automation, free tier available)
- **PostHog**: $0 (free tier usually sufficient)
- **Supabase**: $0-25 (free tier usually sufficient)
- **Clerk**: $0 (free tier usually sufficient)

**Total per product**: ~$75-265 (most tools have free tiers for validation phase)

## Getting Started Checklist

- [ ] Copy `.env.example` to `.env.local`
- [ ] Set up PostgreSQL database (Supabase, Railway, Neon)
- [ ] Get Stripe API keys (test mode is fine for development)
- [ ] Get Manus API key (if using discovery agents)
- [ ] Get OpenAI API key (if using ChatGPT refinement)
- [ ] Get Anthropic API key (if using Claude red-teaming)
- [ ] Get ElevenLabs API key (if using voice content)
- [ ] Set up Midjourney or alternative (if using visual assets)
- [ ] Get PostHog key (if using analytics)
- [ ] Get Supabase keys (if using Supabase)
- [ ] Get Clerk keys (if using Clerk auth)

## See Also

- [AI Integration Guide](./AI-INTEGRATION-GUIDE.md) - How to use AI tools in workflows
- [Quick Start Guide](./QUICK_START.md) - Initial setup steps
- [Architecture](./ARCHITECTURE.md) - Technical architecture details

