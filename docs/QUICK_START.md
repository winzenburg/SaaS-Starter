# Quick Start Guide

## Prerequisites

- Node.js 20+ (use `.nvmrc` if you have nvm)
- PostgreSQL database (local or hosted)
- Stripe account (for payments)

## Initial Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and configure:

**Required:**
- `DATABASE_URL` - Your PostgreSQL connection string
- `STRIPE_SECRET_KEY` - From Stripe dashboard
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - From Stripe dashboard
- `STRIPE_WEBHOOK_SECRET` - From Stripe webhook settings

**AI Tools (for discovery/validation agents):**
- `MANUS_API_KEY` - For narrative generation and personas
- `OPENAI_API_KEY` - For ChatGPT reasoning and refinement
- `ANTHROPIC_API_KEY` - For Claude red-teaming (optional)
- `ELEVENLABS_API_KEY` - For voice content (optional)
- `MIDJOURNEY_API_KEY` or Discord tokens - For visual assets (optional)

**Platform Services (optional):**
- `NEXT_PUBLIC_POSTHOG_KEY` - For analytics
- `NEXT_PUBLIC_SUPABASE_URL` - For database/storage
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - For authentication

See [Environment Variables Guide](./ENVIRONMENT-VARIABLES.md) for complete setup instructions.

### 3. Database Setup

Generate Prisma client and push schema:

```bash
npm run db:generate
npm run db:push
```

Or use migrations for production:

```bash
npm run db:migrate
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Development Workflow

### Running Tests

- **Unit/Integration**: `npm run test`
- **E2E**: `npm run test:e2e` (requires dev server)
- **Type Check**: `npm run type-check`

### Adding a Feature

1. Create feature directory: `src/features/<feature-name>/`
2. Add `domain/`, `data/`, `ui/` subdirectories
3. Export public API in `index.ts`
4. Write tests alongside implementation

See `src/features/example/` for a complete example.

### Database Changes

1. Update `prisma/schema.prisma`
2. Run `npm run db:push` (dev) or `npm run db:migrate` (production)
3. Prisma client auto-regenerates

## Deployment to Vercel

1. Push to GitHub/GitLab/Bitbucket
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

Vercel will automatically:
- Detect Next.js
- Run build command
- Deploy on push to main

## Common Tasks

### Stripe Webhooks

1. Set up webhook endpoint in Stripe dashboard
2. Point to: `https://your-domain.com/api/webhooks/stripe`
3. Add `STRIPE_WEBHOOK_SECRET` to environment variables

### Feature Flags

Use Vercel Feature Flags:

```typescript
import { isFeatureEnabled } from "@/lib/feature-flags";

const enabled = await isFeatureEnabled("my-feature", false);
```

### Cron Jobs

Configure in `vercel.json` or Vercel dashboard:

```json
{
  "crons": [{
    "path": "/api/cron/my-job",
    "schedule": "0 0 * * *"
  }]
}
```

## Next Steps

- Read [ARCHITECTURE.md](./ARCHITECTURE.md) for design patterns
- Check [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines
- Review example feature in `src/features/example/`

