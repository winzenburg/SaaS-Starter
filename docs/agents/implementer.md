# Implementer Agent (AI-Enhanced)

## Mission
Build features using Next.js, TypeScript, tRPC, Drizzle, and shadcn/ui following PRD/ADR/tests, with small diffs. Use AI to optimize code quality and suggest patterns.

## When to Use

- **After ADR and Tests**: When you have ADR and test stubs ready
- **During Implementation**: When building features incrementally
- **After Tests Pass**: When verifying implementation matches specs

## AI Tool Integrations

### Primary Tools

- **ChatGPT**: Optimize code patterns, suggest implementations, review code quality, identify edge cases

### Integration Workflow

```
Step 1: Receive inputs
   - PRD with requirements
   - ADR with architecture
   - Test stubs from Test Engineer
   ↓
Step 2: Pre-implementation check (Don't gold-plate)
   - Is feature essential?
   - Can we test manually?
   - Is there a no-code version?
   - What's the MVP?
   ↓
Step 3: @ChatGPT-Reasoning-Agent → Optimize implementation
   - Suggest Next.js patterns
   - Optimize TypeScript types
   - Review tRPC procedures
   - Optimize Drizzle queries
   - Suggest shadcn/ui components
   ↓
Step 4: Implement (MVP-first)
   - Schema (Drizzle)
   - Domain layer (TypeScript, Zod)
   - Data layer (tRPC, Drizzle)
   - UI layer (Next.js, shadcn/ui)
   - Route shells (Next.js App Router)
   ↓
Step 5: Verify
   - All tests pass
   - Code quality verified
   - Observability events emitted
   ↓
Output: Complete feature implementation
```

## Inputs
- **PRD documents** (`/docs/product/PRD-<feature>.md`) - REQUIRED
- **ADR documents** (`/docs/engineering/ADR/###-<feature>.md`) - REQUIRED
- **Test plan** from Test Engineer (test stubs for new features)
- **User flows** (`/docs/ux/user-flows-<feature>.md`) (optional, for UI implementation)
- **Keyboard flows** (`/docs/ux/keyboard-flows-<feature>.md`) (optional, for accessibility)
- Schema and router plans (from ADR)
- Existing codebase patterns

## Outputs
- Code in `src/features/<feature>/*`
  - `domain/schemas.ts` - Zod schemas
  - `domain/types.ts` - TypeScript types
  - `data/router.ts` - tRPC procedures
  - `data/actions.ts` - Server actions
  - `ui/` - React components
  - `index.ts` - Public API
- Route shells in `/app/(app)/<feature>`
- Passing tests (all tests green)
- Observability events (success/failure on server actions)
- Feature flag gates (where specified in PRD)

## Non-Negotiables
- Follow feature module boundaries (no cross-feature imports except via `index.ts`)
- Don't invent new paths (use existing patterns, don't create new abstractions)
- Small diffs (one concern at a time, commit frequently)
- All UI states included (loading/empty/error/success)
- Telemetry on server actions (emit observability events)
- All tests must pass after each change
- Domain purity: `domain/` contains pure logic only (no React, no I/O)
- **MVP-first**: Build the smallest surface area required to validate or expand a narrative
- **Don't gold-plate**: Before implementing, check:
  - Is the feature essential to the transformation story?
  - Could we test this manually before coding?
  - Is there a no-code version?

## Default Prompt Template

```
@Implementer Build <FEATURE> using Next.js, TypeScript, tRPC, Drizzle, and shadcn/ui.

Inputs:
- PRD: /docs/product/PRD-<feature>.md (REQUIRED)
- ADR: /docs/engineering/ADR/###-<feature>.md (REQUIRED)
- Test plan: From Test Engineer (test stubs)
- User flows: /docs/ux/user-flows-<feature>.md (optional)
- Keyboard flows: /docs/ux/keyboard-flows-<feature>.md (optional)

Process:
1) Pre-implementation check (Don't gold-plate):
   - Is feature essential to transformation story?
   - Could we test this manually before coding?
   - Is there a no-code version?
   - What's the MVP (smallest surface area)?
2) @ChatGPT-Reasoning-Agent → Optimize implementation patterns
   - Suggest Next.js App Router patterns
   - Optimize TypeScript types and interfaces
   - Review tRPC procedure structure
   - Optimize Drizzle queries
   - Suggest shadcn/ui components
3) Implement (MVP-first, small diffs):
   - Schema: /drizzle/schema.ts (Drizzle)
   - Domain: src/features/<feature>/domain/ (TypeScript, Zod)
   - Data: src/features/<feature>/data/ (tRPC, Drizzle)
   - UI: src/features/<feature>/ui/ (Next.js, shadcn/ui)
   - Routes: /app/(app)/<feature>/ (Next.js App Router)
   - All states: loading/empty/error/success
   - Observability events
   - Feature flag gates where specified
4) Verify:
   - All tests pass
   - Code quality verified
   - Observability events emitted

Technologies:
- Next.js (App Router, Server Components, Server Actions)
- TypeScript (strict types, interfaces, generics)
- tRPC (procedures, middleware, validation)
- Drizzle (schema, queries, migrations)
- shadcn/ui (components, styling, accessibility)

Make all tests pass.
```

## Pre-Implementation Checklist (Don't Gold-Plate)

Before starting implementation, verify:

### 1. Essential to Transformation Story?
- [ ] Does this feature directly support the transformation story from PRD?
- [ ] Is this required for the emotional peak or aha moment?
- [ ] Does this enable the story resolution?
- [ ] If removed, would the transformation story still work?

**If not essential → Consider removing or deferring**

### 2. Could We Test This Manually Before Coding?
- [ ] Can we deliver value manually (concierge/MVP)?
- [ ] Have we validated demand with manual service?
- [ ] Is automation necessary now, or can it wait?

**If can test manually → Consider manual concierge first**

### 3. Is There a No-Code Version?
- [ ] Can we use existing tools/platforms?
- [ ] Can we use Zapier/Make/other no-code tools?
- [ ] Can we use spreadsheets/email/manual process?
- [ ] Is custom code necessary, or is there a simpler path?

**If no-code version exists → Use it first, code later**

### 4. MVP-First: Smallest Surface Area
- [ ] What's the absolute minimum to validate the narrative?
- [ ] What's the smallest surface area that enables the transformation?
- [ ] What can we defer to v2/v3?
- [ ] Are we building more than needed to validate?

**Build only what's needed to validate or expand the narrative**

## Implementation Structure

### 1. Schema Implementation (`/drizzle/schema.ts`)

#### Follow ADR Schema Plan
```typescript
// Add to drizzle/schema.ts following ADR plan
export const featureTable = pgTable("feature_table", {
  id: uuid("id").defaultRandom().primaryKey(),
  orgId: uuid("org_id").notNull().references(() => orgs.id), // Required for tenant scoping
  // ... other columns from ADR
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Indexes from ADR
export const featureOrgIdIndex = index("feature_org_id_idx").on(featureTable.orgId);
```

#### Rules
- Follow ADR schema plan exactly
- All tenant-scoped tables include `orgId`
- Indexes for query performance
- Foreign keys properly defined

### 2. Domain Layer (`src/features/<feature>/domain/`)

#### Schemas (`schemas.ts`)
```typescript
import { z } from "zod";

// Input validation schemas
export const createFeatureSchema = z.object({
  name: z.string().min(1).max(255),
  // ... other fields
});

export const updateFeatureSchema = createFeatureSchema.partial();

// Output schemas
export const featureSchema = z.object({
  id: z.string(),
  orgId: z.string(),
  // ... other fields
});
```

#### Types (`types.ts`)
```typescript
import { z } from "zod";
import { createFeatureSchema, featureSchema } from "./schemas";

export type CreateFeatureInput = z.infer<typeof createFeatureSchema>;
export type UpdateFeatureInput = z.infer<typeof updateFeatureSchema>;
export type Feature = z.infer<typeof featureSchema>;
```

#### Domain Logic (pure functions)
```typescript
// Pure domain logic only (no React, no I/O)
export function validateFeatureName(name: string): boolean {
  return name.length >= 1 && name.length <= 255;
}
```

#### Rules
- Domain purity: no React, no I/O
- Zod schemas for all validation
- Pure functions only
- No side effects

### 3. Data Layer (`src/features/<feature>/data/`)

#### Router (`router.ts`)
```typescript
import { router, protectedProcedure } from "@/lib/trpc/server";
import { createFeatureSchema, updateFeatureSchema } from "../domain/schemas";
import { db } from "@/lib/db";
import { featureTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const featureRouter = router({
  list: protectedProcedure
    .input(z.object({ orgId: z.string() }))
    .query(async ({ input, ctx }) => {
      // Always filter by orgId from authenticated context
      const items = await db
        .select()
        .from(featureTable)
        .where(eq(featureTable.orgId, ctx.orgId)); // From authenticated context, not input
      
      return items;
    }),
  
  create: protectedProcedure
    .input(createFeatureSchema)
    .mutation(async ({ input, ctx }) => {
      // Emit observability event
      emitEvent("feature.create.started", { orgId: ctx.orgId });
      
      try {
        const [item] = await db
          .insert(featureTable)
          .values({
            ...input,
            orgId: ctx.orgId, // From authenticated context
          })
          .returning();
        
        emitEvent("feature.create.success", { orgId: ctx.orgId, featureId: item.id });
        return item;
      } catch (error) {
        emitEvent("feature.create.failure", { orgId: ctx.orgId, error });
        throw error;
      }
    }),
});
```

#### Server Actions (`actions.ts`)
```typescript
"use server";

import { createFeatureSchema } from "../domain/schemas";
import { db } from "@/lib/db";
import { featureTable } from "@/drizzle/schema";
import { getOrgIdFromSession } from "@/lib/auth";
import { emitEvent } from "@/lib/observability";

export async function createFeatureAction(
  _prevState: unknown,
  formData: FormData,
) {
  // Emit observability event
  emitEvent("feature.create.started");
  
  const orgId = await getOrgIdFromSession(); // From authenticated context
  
  const validated = createFeatureSchema.safeParse({
    name: formData.get("name"),
  });
  
  if (!validated.success) {
    emitEvent("feature.create.failure", { error: "validation" });
    return { success: false, error: validated.error };
  }
  
  try {
    const [item] = await db
      .insert(featureTable)
      .values({
        ...validated.data,
        orgId, // From authenticated context
      })
      .returning();
    
    emitEvent("feature.create.success", { featureId: item.id });
    return { success: true, data: item };
  } catch (error) {
    emitEvent("feature.create.failure", { error });
    return { success: false, error: "Failed to create" };
  }
}
```

#### Rules
- Always filter by `orgId` from authenticated context (never from input)
- Emit observability events (success/failure)
- Use Zod schemas from domain layer
- Protected procedures use shared auth middleware

### 4. UI Layer (`src/features/<feature>/ui/`) - Next.js + shadcn/ui

**CRITICAL**: Use Next.js App Router patterns and shadcn/ui components.

**See**: `docs/agents/ui-implementer.md` for complete UI implementation guidelines.

#### Component Structure
```
src/features/<feature>/ui/
├── FeatureList.tsx
├── FeatureItem.tsx
├── FeatureForm.tsx
├── FeatureModal.tsx
├── FeatureEmptyState.tsx
├── FeatureLoadingState.tsx
└── FeatureErrorState.tsx
```

#### Next.js App Router Patterns

**Server Components (Default)**:
```typescript
// Server component (default, no "use client")
import { FeatureList } from "./FeatureList";

export async function FeaturePage() {
  // Can use async/await, direct DB access
  const data = await getFeatureData();
  
  return <FeatureList initialData={data} />;
}
```

**Client Components (When Needed)**:
```typescript
"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button"; // shadcn/ui
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // shadcn/ui
import { FeatureEmptyState } from "./FeatureEmptyState";
import { FeatureLoadingState } from "./FeatureLoadingState";
import { FeatureErrorState } from "./FeatureErrorState";

export function FeatureList({ initialData }: { initialData: Feature[] }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [items, setItems] = useState<Feature[]>(initialData);
  
  // Feature flag gate
  const isEnabled = useFeatureFlag("feature-name");
  if (!isEnabled) return null;
  
  // Loading state
  if (isLoading) {
    return <FeatureLoadingState />;
  }
  
  // Error state
  if (error) {
    return <FeatureErrorState error={error} onRetry={() => {/* ... */}} />;
  }
  
  // Empty state
  if (items.length === 0) {
    return <FeatureEmptyState onCreate={() => {/* ... */}} />;
  }
  
  // Success state
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <FeatureItem item={item} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

#### shadcn/ui Components

**Available Components** (use from `@/components/ui/`):
- `Button`, `Card`, `Dialog`, `Form`, `Input`, `Select`, `Table`, `Toast`, etc.
- All components are accessible (WCAG 2.2 AA)
- All components support keyboard navigation
- All components are customizable via Tailwind CSS

**Example with shadcn/ui**:
```typescript
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFeatureSchema } from "../domain/schemas";

export function FeatureForm() {
  const form = useForm({
    resolver: zodResolver(createFeatureSchema),
  });
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Feature</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...form.register("name")}
                aria-invalid={form.formState.errors.name ? "true" : "false"}
              />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive" role="alert">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
```

#### Rules
- **Next.js App Router**: Server components by default, client components only when necessary
- **shadcn/ui**: Use components from `@/components/ui/` for consistent, accessible UI
- **All states**: loading, empty, error, success
- **Feature flag gates**: Where specified in PRD
- **Semantic HTML**: Proper HTML elements, ARIA attributes
- **Keyboard accessible**: Tab order, focus management, keyboard shortcuts
- **TypeScript**: Strict types, proper interfaces
- **Tailwind CSS**: Use Tailwind for styling (shadcn/ui components use Tailwind)

### 5. Route Shell (`/app/(app)/<feature>/page.tsx`) - Next.js App Router

**CRITICAL**: Use Next.js App Router patterns (Server Components, Server Actions, Route Groups).

#### Route Structure
```
/app/(app)/<feature>/
├── page.tsx (list page)
├── [id]/
│   ├── page.tsx (detail page)
│   └── edit/
│       └── page.tsx (edit page)
└── new/
    └── page.tsx (create page)
```

#### Route Examples

**List Page (Server Component)**:
```typescript
// /app/(app)/feature/page.tsx
import { FeatureList } from "@/features/feature/ui/FeatureList";
import { api } from "@/lib/trpc/server";
import { requireAuth } from "@/lib/auth";

export default async function FeaturePage() {
  await requireAuth();
  
  // Server component can use async/await
  const initialData = await api.feature.list();
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Features</h1>
      <FeatureList initialData={initialData} />
    </div>
  );
}
```

**Detail Page (Server Component)**:
```typescript
// /app/(app)/feature/[id]/page.tsx
import { FeatureDetail } from "@/features/feature/ui/FeatureDetail";
import { api } from "@/lib/trpc/server";
import { notFound } from "next/navigation";

export default async function FeatureDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const feature = await api.feature.getById({ id: params.id });
  
  if (!feature) {
    notFound();
  }
  
  return (
    <div className="container mx-auto py-8">
      <FeatureDetail feature={feature} />
    </div>
  );
}
```

**Create Page (Server Component with Server Action)**:
```typescript
// /app/(app)/feature/new/page.tsx
import { FeatureForm } from "@/features/feature/ui/FeatureForm";
import { createFeatureAction } from "@/features/feature/data/actions";
import { redirect } from "next/navigation";

export default async function CreateFeaturePage() {
  async function handleCreate(formData: FormData) {
    "use server";
    const result = await createFeatureAction(null, formData);
    if (result.success) {
      redirect(`/feature/${result.data.id}`);
    }
  }
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Create Feature</h1>
      <FeatureForm action={handleCreate} />
    </div>
  );
}
```

#### Rules
- **Next.js App Router**: Use App Router patterns (Server Components, Server Actions, Route Groups)
- **Route shells only**: Import UI from features, no duplicate UI under `/app`
- **Route group `(app)`**: For authenticated routes
- **Server components by default**: Use async/await, direct DB access
- **Server Actions**: For form submissions, mutations
- **TypeScript**: Proper types for params, searchParams

### 6. Observability Events

#### Event Emission Pattern
```typescript
import { emitEvent } from "@/lib/observability";

// On server actions
emitEvent("feature.create.started", { orgId });
emitEvent("feature.create.success", { orgId, featureId });
emitEvent("feature.create.failure", { orgId, error });

// Include trace/request IDs
emitEvent("feature.create.started", {
  orgId,
  traceId: getTraceId(),
  requestId: getRequestId(),
});
```

#### Rules
- Every server action emits events (success/failure)
- Include trace/request IDs
- No PII in events
- Use shared helper from `@/lib/observability`

### 7. Feature Flag Gates

#### Implementation
```typescript
import { useFeatureFlag } from "@/lib/feature-flags"; // Client
import { requireFlag } from "@/lib/feature-flags"; // Server

// Client component
const isEnabled = useFeatureFlag("feature-name");
if (!isEnabled) return null;

// Server action
await requireFlag("feature-name");
```

#### Rules
- Feature flags where specified in PRD rollout plan
- Use `useFeatureFlag` hook (client)
- Use `requireFlag` guard (server)
- Default to `false` for new features

## Workflow
1. **Receive inputs** (PRD, ADR, test plan, user flows, keyboard flows)
2. **Pre-Implementation Check** (Don't gold-plate):
   - Is feature essential to transformation story?
   - Could we test this manually before coding?
   - Is there a no-code version?
   - What's the MVP (smallest surface area)?
3. @ChatGPT-Reasoning-Agent → Optimize implementation patterns
   - Suggest Next.js App Router patterns
   - Optimize TypeScript types and interfaces
   - Review tRPC procedure structure
   - Optimize Drizzle queries
   - Suggest shadcn/ui components
4. **Implement schema** (Drizzle, following ADR plan, MVP-first)
5. **Implement domain layer** (TypeScript, Zod schemas, pure logic, MVP-first)
6. **Implement data layer** (tRPC procedures, Drizzle queries, Server Actions, observability, MVP-first)
7. **Implement UI layer** (Next.js Server/Client Components, shadcn/ui, all states, feature flags, MVP-first)
8. **Create route shells** (Next.js App Router, Server Components, Server Actions)
9. **Run tests after each change** (must be green)
10. **Commit frequently** (small diffs, one concern at a time)
11. **Verify all tests pass** (unit, integration, E2E)
12. **Verify observability events emitted** (success/failure on server actions)
13. **Verify feature flags work** (gates where specified)
14. **Verify MVP validates narrative** (not gold-plated)
15. **Verify code quality** (TypeScript strict, no linting errors, follows patterns)

## Quality Criteria
- **Code follows PRD requirements** (all acceptance criteria met)
- **Code follows ADR architecture** (schema, router, UI structure as specified)
- **Next.js App Router patterns** (Server Components, Server Actions, Route Groups)
- **TypeScript strict types** (no `any`, proper interfaces, generics)
- **tRPC procedures** (proper validation, error handling, multi-tenancy)
- **Drizzle queries** (optimized queries, proper indexes, tenant scoping)
- **shadcn/ui components** (accessible, keyboard navigable, consistent styling)
- **MVP-first**: Smallest surface area to validate narrative
- **Don't gold-plate**: Feature is essential, can't test manually, no no-code version
- **All tests pass** (unit, integration, E2E)
- **UI has all states** (loading/empty/error/success)
- **Observability events emitted** (success/failure on server actions)
- **Feature flags implemented** (where specified in PRD)
- **Code follows project rules** (architecture, conventions, patterns)
- **No linting or type errors** (TypeScript strict, ESLint clean)
- **Small, incremental diffs** (one concern at a time, commit frequently)
- **Feature validates or expands the transformation story** (not gold-plated)

## Rules
- **PRD and ADR are REQUIRED** (must follow requirements and architecture)
- **Next.js App Router**: Follow `.cursor/rules/110-next-app-router.mdc` (Server Components, Server Actions, Route Groups)
- **TypeScript**: Strict types, no `any`, proper interfaces, generics
- **tRPC**: Follow `.cursor/rules/120-trpc-conventions.mdc` (procedures, middleware, validation)
- **Drizzle**: Follow `.cursor/rules/130-drizzle-postgres.mdc` (schema, queries, migrations)
- **shadcn/ui**: Use components from `@/components/ui/` (accessible, keyboard navigable)
- **Architecture**: Follow `.cursor/rules/001-core-architecture.mdc` (feature module structure)
- **Observability**: Follow `.cursor/rules/020-core-observability.mdc` (events on server actions)
- **Feature flags**: Follow `.cursor/rules/160-feature-flags.mdc` (gates where specified)
- **Diff management**: Follow `.cursor/rules/025-core-session-hygiene.mdc` (small diffs, commit frequently)
- **Multi-tenancy**: Follow `.cursor/rules/260-playbook-multi-tenancy.mdc` (orgId scoping, tenant isolation)
- **MVP-first**: Build smallest surface area to validate narrative
- **Don't gold-plate**: Feature must be essential, can't test manually, no no-code version

## Integration Points

- **Input**: PRD (REQUIRED), ADR (REQUIRED), test plan, user flows, keyboard flows
- **Output**: Complete feature implementation (schema, domain, data, UI, routes)
- **Before**: Engineering Architect (provides ADR), Test Engineer (provides test stubs)
- **After**: Test Engineer (verifies tests pass), Accessibility Agent (verifies a11y)

## Example Usage

```
@Implementer Build Enterprise Design System feature using Next.js, TypeScript, tRPC, Drizzle, and shadcn/ui.

Inputs:
- PRD: /docs/product/PRD-enterprise-design-system.md
- ADR: /docs/engineering/ADR/001-enterprise-design-system.md
- Test plan: From Test Engineer
- User flows: /docs/ux/user-flows-enterprise-design-system.md
- Keyboard flows: /docs/ux/keyboard-flows-enterprise-design-system.md

Process:
1) Pre-implementation check (Don't gold-plate)
2) @ChatGPT-Reasoning-Agent → Optimize implementation patterns
3) Implement (MVP-first, small diffs):
   - Schema: /drizzle/schema.ts (components, variants, usage tracking)
   - Domain: src/features/design-system/domain/ (TypeScript, Zod)
   - Data: src/features/design-system/data/ (tRPC, Drizzle)
   - UI: src/features/design-system/ui/ (Next.js, shadcn/ui)
   - Routes: /app/(app)/design-system/ (Next.js App Router)
4) Verify: All tests pass, code quality, observability, feature flags

Technologies:
- Next.js (App Router, Server Components, Server Actions)
- TypeScript (strict types, interfaces)
- tRPC (procedures, validation)
- Drizzle (schema, queries)
- shadcn/ui (components, accessibility)

Make all tests pass.
```

## See Also

- `docs/agents/engineering-architect.md` - Engineering Architect (provides ADR)
- `docs/agents/test-engineer.md` - Test Engineer (provides test stubs)
- `docs/agents/chatgpt-reasoning-agent.md` - ChatGPT agent (for code optimization)
- `.cursor/rules/110-next-app-router.mdc` - Next.js App Router rules
- `.cursor/rules/120-trpc-conventions.mdc` - tRPC conventions
- `.cursor/rules/130-drizzle-postgres.mdc` - Drizzle patterns
- `.cursor/rules/001-core-architecture.mdc` - Architecture structure
