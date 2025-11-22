# Architecture Overview

## Design Principles

This SaaS starter follows a **boring, evolutionary architecture** approach:

1. **Feature Modules** - Self-contained, no cross-feature imports
2. **Server-First** - Prefer server actions over client mutations
3. **Type Safety** - Strict TypeScript + Zod validation at boundaries
4. **Test-Driven** - Tests define correctness
5. **Accessible** - WCAG 2.2 AA compliant by default

## Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (webhooks, cron)
│   ├── (routes)/          # Route groups
│   └── layout.tsx         # Root layout
├── features/              # Feature modules
│   └── <feature>/
│       ├── ui/            # React components
│       ├── data/          # Server actions, API handlers
│       ├── domain/        # Business logic, schemas
│       └── index.ts       # Public API
├── lib/                   # Shared utilities
│   ├── db.ts             # Prisma client
│   ├── validation.ts     # Shared Zod schemas
│   ├── stripe.ts         # Stripe client
│   └── feature-flags.ts  # Vercel feature flags
└── test/                  # Test utilities
```

## Feature Module Pattern

Each feature is self-contained:

### Domain Layer (`domain/`)
- Zod schemas for validation
- TypeScript types
- Business logic (pure functions)

### Data Layer (`data/`)
- Server actions (`"use server"`)
- API route handlers
- Database queries
- External API calls

### UI Layer (`ui/`)
- React components
- Client components (`"use client"`)
- Form components
- Presentational components

### Public API (`index.ts`)
- Exports only what other features need
- Prevents deep imports
- Clear feature boundaries

## Data Flow

```
User Action
  ↓
UI Component (client)
  ↓
Server Action (data/)
  ↓
Validation (domain/)
  ↓
Database (lib/db.ts)
  ↓
Response
```

## Testing Strategy

- **Unit Tests** - Domain logic, pure functions
- **Integration Tests** - Server actions, API routes
- **E2E Tests** - Critical user flows (Playwright)

## Type Safety

1. **Strict TypeScript** - `noUncheckedIndexedAccess`, `strict: true`
2. **Zod Schemas** - Validate all inputs at boundaries
3. **Type Guards** - Safe parsing of unknown data

## Server Actions Pattern

```typescript
"use server";

import { schema } from "../domain/schema";

export async function myAction(formData: FormData) {
  const validated = schema.safeParse({
    field: formData.get("field"),
  });

  if (!validated.success) {
    return { success: false, error: "Validation failed" };
  }

  // Process validated data
  return { success: true, data: result };
}
```

## Database Access

Use the singleton Prisma client from `lib/db.ts`:

```typescript
import { db } from "@/lib/db";

export async function getUser(id: string) {
  return db.user.findUnique({ where: { id } });
}
```

## Feature Flags

Use Vercel Feature Flags for safe rollouts:

```typescript
import { isFeatureEnabled } from "@/lib/feature-flags";

const enabled = await isFeatureEnabled("new-feature", false);
```

## Deployment

- **Platform**: Vercel
- **Runtime**: Node.js (default)
- **Edge Runtime**: Only when explicitly needed
- **Observability**: Vercel Analytics + Speed Insights

