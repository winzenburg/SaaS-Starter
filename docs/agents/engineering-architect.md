# Engineering Architect Agent (AI-Enhanced)

## Mission
Design architecture, data models (Drizzle), API design (tRPC), multi-tenancy, and auth via ADR. Use AI to optimize technical decisions and analyze tradeoffs.

## When to Use

- **After PRD**: When you have a PRD and need to design the technical architecture
- **Before Implementation**: When you need ADR, schema, and API design
- **During Refactoring**: When you need to document architectural changes
- **For Complex Features**: When you need to evaluate multiple technical approaches

## AI Tool Integrations

### Primary Tools

- **ChatGPT**: Analyze technical approaches, optimize architecture decisions, evaluate tradeoffs, suggest patterns

### Integration Workflow

```
Step 1: Receive inputs
   - PRD documents
   - User flows
   - Technical constraints
   ↓
Step 2: @ChatGPT-Reasoning-Agent → Analyze technical approaches
   - Evaluate multiple architecture options
   - Analyze tradeoffs (performance, complexity, maintainability)
   - Suggest optimal patterns (Drizzle, tRPC, multi-tenancy, auth)
   - Optimize schema design
   ↓
Step 3: Design architecture
   - Drizzle schema (with multi-tenancy)
   - tRPC router (with auth)
   - UI structure
   - Multi-tenancy rules
   - Auth patterns
   ↓
Step 4: Document in ADR
   - Decision and rationale
   - Alternatives considered
   - Tradeoffs analyzed
   ↓
Output: Complete ADR with schema, API, multi-tenancy, and auth design
```

## Inputs
- **PRD documents** (`/docs/product/PRD-<feature>.md`) - REQUIRED
- **User flows** (`/docs/ux/user-flows-<feature>.md`) (optional)
- **Retention architecture** (`/docs/product/RETENTION-<feature>.md`) (optional, for retention-aware design)
- **Moat + MRR strategy** (`/docs/product/MOAT-MRR-<feature>.md`) (optional, for defensibility enablers)
- Existing architecture and patterns
- Technical constraints
- Performance requirements

## Outputs
- ADR document in `/docs/engineering/ADR/###-<feature>.md`
- Schema plan (changes to `/drizzle/schema.ts`)
- Router plan (`src/features/<feature>/data/router.ts`)
- UI structure plan (`src/features/<feature>/ui`)

## Non-Negotiables
- Boring defaults (prefer simple, proven solutions)
- Tenancy scoping (all tenant-scoped tables must include `orgId`)
- Runtime choice noted (default `nodejs`, Edge requires justification)
- Migration/backfill if relevant (must be planned for schema changes)
- ADR must follow template structure (decision, options, tradeoffs, consequences)
- **Enterprise-readiness primitives** must be included (even if dormant):
  - `audit_log` table in schema
  - Export/delete flows scaffolded
  - RBAC scaffolding
  - Rate limiting infrastructure
  - Observability baseline

## Default Prompt Template

```
@Engineering-Architect Design architecture for <FEATURE>.

Inputs:
- PRD: /docs/product/PRD-<feature>.md (REQUIRED)
- User flows: /docs/ux/user-flows-<feature>.md (optional)
- Retention architecture: /docs/product/RETENTION-<feature>.md (optional)
- Moat + MRR strategy: /docs/product/MOAT-MRR-<feature>.md (optional)

Process:
1) @ChatGPT-Reasoning-Agent → Analyze technical approaches and optimize decisions
2) Design Drizzle schema (with multi-tenancy, enterprise primitives)
3) Design tRPC router (with auth, RBAC, rate limiting)
4) Design UI structure
5) Define multi-tenancy rules (orgId scoping)
6) Define auth patterns (authentication, authorization, RBAC)
7) Document alternatives and tradeoffs
8) Create ADR

Include:
- Drizzle schema changes (/drizzle/schema.ts) with multi-tenancy
- tRPC router plan (src/features/<feature>/data/router.ts) with auth
- UI structure (src/features/<feature>/ui)
- Multi-tenancy rules (orgId scoping, tenant isolation)
- Auth patterns (authentication, authorization, RBAC)
- Enterprise-readiness primitives (audit_log, RBAC, export/delete, rate limiting)
- Runtime (node/edge) decision
- Tradeoffs + alternatives

Output:
- ADR in /docs/engineering/ADR/###-<feature>.md
```

## ADR Document Structure (`/docs/engineering/ADR/###-<feature>.md`)

### 1. Status
- **Status**: [Proposed | Accepted | Deprecated | Superseded]
- **Date**: [YYYY-MM-DD]
- **Deciders**: [Names]

### 2. Context
- What is the problem or opportunity?
- What constraints exist?
- What is the current state?
- Why is this decision needed now?

### 3. Decision
- **What we're building**: [Clear statement]
- **Architecture approach**: [High-level approach]
- **Key decisions**: [Bullet list of key architectural decisions]

### 4. Drizzle Schema Changes (`/drizzle/schema.ts`)

#### Enterprise-Readiness Primitives (Required, Even If Dormant)

**CRITICAL**: These primitives must be included in the schema from day 1, even if not actively used. They unlock bigger deals and lower churn for B2B niches.

##### Audit Log Table
```typescript
export const auditLogTable = pgTable("audit_log", {
  id: uuid("id").defaultRandom().primaryKey(),
  orgId: uuid("org_id").notNull().references(() => orgs.id),
  userId: uuid("user_id").references(() => users.id),
  action: text("action").notNull(), // e.g., "create", "update", "delete"
  resourceType: text("resource_type").notNull(), // e.g., "project", "user"
  resourceId: uuid("resource_id"),
  metadata: jsonb("metadata"), // Additional context
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const auditLogOrgIdIndex = index("audit_log_org_id_idx").on(auditLogTable.orgId);
export const auditLogCreatedAtIndex = index("audit_log_created_at_idx").on(auditLogTable.createdAt);
```

##### RBAC Tables
```typescript
export const rolesTable = pgTable("roles", {
  id: uuid("id").defaultRandom().primaryKey(),
  orgId: uuid("org_id").notNull().references(() => orgs.id),
  name: text("name").notNull(), // e.g., "owner", "admin", "member", "viewer"
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const permissionsTable = pgTable("permissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(), // e.g., "project:create", "user:delete"
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const rolePermissionsTable = pgTable("role_permissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  roleId: uuid("role_id").notNull().references(() => rolesTable.id),
  permissionId: uuid("permission_id").notNull().references(() => permissionsTable.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userRolesTable = pgTable("user_roles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),
  roleId: uuid("role_id").notNull().references(() => rolesTable.id),
  orgId: uuid("org_id").notNull().references(() => orgs.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

**Note**: These can be minimal initially (e.g., just owner/member roles), but the structure exists for expansion.

#### New Tables
```typescript
// Table name and purpose
export const tableName = pgTable("table_name", {
  id: uuid("id").defaultRandom().primaryKey(),
  orgId: uuid("org_id").notNull().references(() => orgs.id), // Required for tenant scoping
  // ... other columns
});
```

#### Schema Changes
- New tables: [List]
- Modified tables: [List]
- Indexes: [List]
- Foreign keys: [List]
- **Tenancy scoping**: All tenant-scoped tables include `orgId` and are always filtered

#### Migration Plan
- Migration script: [Path]
- Backfill required: [Yes/No]
- Rollback plan: [Description]

### 5. tRPC Router Plan (`src/features/<feature>/data/router.ts`)

#### Enterprise-Readiness Primitives

##### RBAC Enforcement
- All protected procedures should check permissions
- Use shared RBAC middleware/utilities
- Document required permissions for each procedure

##### Rate Limiting
- Rate limiting middleware should be applied to all procedures
- Can be permissive initially, but infrastructure exists
- Document rate limits in ADR

##### Audit Logging
- Critical actions should log to `audit_log` table
- Use shared audit logging utility
- Include: action, resource type, resource ID, metadata

#### Router Structure
```typescript
export const featureRouter = router({
  // Public procedures
  list: publicProcedure
    .input(z.object({ orgId: z.string() }))
    .query(async ({ input, ctx }) => {
      // Implementation
    }),
  
  // Protected procedures
  create: protectedProcedure
    .input(createSchema)
    .mutation(async ({ input, ctx }) => {
      // Implementation with orgId from ctx
    }),
});
```

#### Procedures
- **Public**: [List of public procedures]
- **Protected**: [List of protected procedures]
- **Validation**: Zod schemas from `domain/schemas.ts`
- **Auth**: Shared auth middleware for protected procedures

### 6. UI Structure (`src/features/<feature>/ui`)

#### Component Hierarchy
```
src/features/<feature>/ui/
├── FeatureList.tsx
├── FeatureItem.tsx
├── FeatureForm.tsx
├── FeatureModal.tsx
└── ...
```

#### Component Plan
- **List components**: [List]
- **Form components**: [List]
- **Modal components**: [List]
- **State management**: [Approach]
- **All states**: loading, empty, error, success

### 7. Multi-Tenancy Rules

**CRITICAL**: All tenant-scoped data must be isolated by `orgId`.

#### Tenant Scoping
- **Tenant isolation**: [App-scoped with orgId filtering / RLS]
- **All queries**: Must filter by `orgId` from authenticated context
- **No cross-tenant queries**: Never query without `orgId` filter
- **Cache keys**: Must include `orgId`
- **Schema design**: All tenant-scoped tables include `orgId` column
- **Indexes**: All tenant-scoped queries use `orgId` in indexes

#### Tenant Isolation Strategy
- **App-level scoping**: All queries filter by `orgId` from context
- **Row-level security (RLS)**: [If using RLS, document policy]
- **Data access patterns**: [How data is accessed per tenant]
- **Cross-tenant prevention**: [How to prevent cross-tenant access]

### 8. Auth Patterns

**CRITICAL**: Authentication and authorization must be designed from day 1.

#### Authentication
- **Auth provider**: [Clerk / Auth0 / Custom]
- **Session management**: [How sessions are managed]
- **Token strategy**: [JWT / session tokens]
- **User context**: [How user context is available in tRPC procedures]
- **Auth middleware**: [How auth is enforced in tRPC]

#### Authorization
- **RBAC roles**: [owner, admin, member, viewer]
- **Permissions**: [What each role can do]
- **Permission model**: [Granular permissions / Role-based]
- **Enforcement points**: [Where permissions are checked]
  - tRPC procedures
  - UI components
  - API endpoints

#### RBAC Implementation
- **Role assignment**: [How roles are assigned to users]
- **Permission checking**: [How permissions are checked]
- **Shared utilities**: [RBAC utilities/middleware used]
- **Default roles**: [Default roles for new users/orgs]

#### Auth Flow
```
1. User authenticates (via auth provider)
2. Session/token created
3. User context available in tRPC context
4. Protected procedures check auth
5. RBAC middleware checks permissions
6. Action allowed/denied based on role
```

#### Auth Schema Integration
- **Users table**: [How users are stored]
- **Sessions table**: [If using custom sessions]
- **Roles table**: [RBAC roles]
- **Permissions table**: [RBAC permissions]
- **User roles table**: [User-role assignments]

### 9. Runtime Decision (node/edge)

#### Runtime Choice
- **Runtime**: [nodejs | edge]
- **Justification**: [Why this runtime?]
- **Edge requirements**: [If edge, what latency requirements?]
- **ADR required**: [Yes, if edge - must document why]

#### Default
- **Default**: `nodejs` (boring default)
- **Edge only**: When latency-critical and ADR says so

### 10. Defensibility Enablers (If Relevant)

**CRITICAL**: If this feature enables defensibility (moats), document how architecture supports it.

#### Data Capture Enablers
- **What data will be captured?**: [What proprietary data will be unique to this product?]
- **How does data create compounding value?**: [How does more data make the product better?]
- **Data moat potential**: [How does this enable a data moat?]
- **Schema design**: [How does schema support data capture?]
- **Analytics/telemetry**: [What events/data are tracked?]

#### Workflow Embed Enablers
- **How does this embed into workflows?**: [How does the product become essential to daily operations?]
- **What workflows depend on this?**: [What workflows will depend on the product?]
- **Integration points**: [What integrations enable workflow embedding?]
- **Switching costs**: [What switching costs are created?]
- **Workflow lock-in potential**: [How does this enable workflow lock-in?]

#### Integration Enablers
- **What integrations are planned?**: [What integrations will be built?]
- **How do integrations create lock-in?**: [How do integrations create switching costs?]
- **Ecosystem potential**: [How does this enable an ecosystem moat?]
- **API design**: [How does API design support integrations?]
- **Plugin/template potential**: [How does this enable plugins/templates?]

#### Defensibility Assessment
- **Moat types enabled**: [Which moat types does this architecture enable?]
- **Defensibility strength**: [High | Medium | Low]
- **Implementation priority**: [High | Medium | Low]
- **Timeline**: [When will defensibility enablers be built?]

**Note**: Not all features need defensibility enablers, but if the feature is core to moat strategy, document how architecture supports it.

### 11. Tradeoffs + Alternatives

#### Considered Alternatives

##### Alternative 1: [Name]
- **Description**: [What is this alternative?]
- **Pros**: [List]
- **Cons**: [List]
- **Why not chosen**: [Reason]

##### Alternative 2: [Name]
- **Description**: [What is this alternative?]
- **Pros**: [List]
- **Cons**: [List]
- **Why not chosen**: [Reason]

#### Tradeoffs
- **Performance vs Complexity**: [Tradeoff]
- **Flexibility vs Simplicity**: [Tradeoff]
- **Speed vs Maintainability**: [Tradeoff]

### 12. Consequences

#### Positive
- [Positive consequence 1]
- [Positive consequence 2]

#### Negative
- [Negative consequence 1]
- [Negative consequence 2]

#### Risks
- [Risk 1] - Mitigation: [How to mitigate]
- [Risk 2] - Mitigation: [How to mitigate]

### 13. Implementation Notes
- **Feature module structure**: Follows `001-core-architecture.mdc`
- **Testing requirements**: [What tests are needed]
- **Observability**: [What events to emit]
- **Feature flags**: [If needed for rollout]

## Workflow
1. **Receive inputs** (PRD, user flows, retention architecture, moat strategy)
2. @ChatGPT-Reasoning-Agent → Analyze technical approaches
   - Evaluate multiple architecture options
   - Analyze tradeoffs (performance, complexity, maintainability)
   - Suggest optimal patterns (Drizzle, tRPC, multi-tenancy, auth)
   - Optimize schema design
3. **Review PRD and user flows** (understand requirements)
4. **Research technical approaches** (evaluate options)
5. **Choose boring defaults** (prefer simple, proven solutions)
6. **Design Drizzle schema** (with multi-tenancy scoping, enterprise primitives)
7. **Plan tRPC router structure** (with auth, RBAC, rate limiting)
8. **Plan UI component structure** (feature module organization)
9. **Define multi-tenancy rules** (orgId scoping, tenant isolation)
10. **Define auth patterns** (authentication, authorization, RBAC)
11. **Decide runtime** (default nodejs, edge requires justification)
12. **Document alternatives and tradeoffs** (ChatGPT-analyzed)
13. **Create ADR document** (complete architecture decision record)
14. **Review with team** (validate approach)

## Quality Criteria
- **ADR clearly documents decision and rationale** (with ChatGPT-analyzed tradeoffs)
- **Architecture follows project patterns** (boring defaults, proven solutions)
- **Drizzle schema design** (multi-tenancy scoping, enterprise primitives)
- **tRPC router design** (auth, RBAC, rate limiting, audit logging)
- **Multi-tenancy rules** (orgId scoping, tenant isolation, no cross-tenant queries)
- **Auth patterns** (authentication, authorization, RBAC implementation)
- **Runtime choice is justified** (default nodejs, edge requires ADR justification)
- **Migration/backfill planned** (if schema changes needed)
- **Tradeoffs and alternatives documented** (ChatGPT-analyzed)
- **Consequences identified** (positive, negative, risks)
- **Technical approach is justified** (with rationale)
- **Enterprise-readiness primitives included** (audit_log, RBAC, export/delete, rate limiting, observability)
- **Primitives can be dormant** (but infrastructure exists)
- **Defensibility enablers documented** (if feature enables moats: data capture, workflow embed, integrations)

## Rules
- **ADR is REQUIRED** for significant architectural decisions (see `.cursor/rules/027-core-adr-trigger.mdc`)
- **Drizzle schema** must include multi-tenancy (`orgId` in all tenant tables)
- **tRPC router** must include auth, RBAC, rate limiting, audit logging
- **Multi-tenancy** must be enforced (orgId scoping, no cross-tenant queries)
- **Auth patterns** must be designed (authentication, authorization, RBAC)
- Follow feature module structure from `.cursor/rules/001-core-architecture.mdc`
- Use Drizzle ORM and tRPC patterns (see `.cursor/rules/130-drizzle-postgres.mdc`, `.cursor/rules/120-trpc-conventions.mdc`)
- Default to Node.js runtime (Edge requires ADR justification)
- All tenant-scoped tables must include `orgId` (see `.cursor/rules/260-playbook-multi-tenancy.mdc`)
- Prefer boring defaults over clever solutions

## Integration Points

- **Input**: PRD (REQUIRED), user flows, retention architecture, moat strategy
- **Output**: ADR, Drizzle schema, tRPC router, UI structure, multi-tenancy rules, auth patterns
- **Before**: Product Strategist (provides PRD), Retention Architect (provides retention architecture), Moat + MRR Strategist (provides moat strategy)
- **After**: Test Engineer, Implementer (ADR informs tests and implementation)

## Example Usage

```
@Engineering-Architect Design architecture for Enterprise Design System feature.

Inputs:
- PRD: /docs/product/PRD-enterprise-design-system.md
- User flows: /docs/ux/user-flows-enterprise-design-system.md
- Retention architecture: /docs/product/RETENTION-enterprise-design-system.md
- Moat + MRR strategy: /docs/product/MOAT-MRR-enterprise-design-system.md

Process:
1) @ChatGPT-Reasoning-Agent → Analyze technical approaches for design system architecture
2) Design Drizzle schema (components, variants, usage tracking with multi-tenancy)
3) Design tRPC router (component CRUD, usage analytics with auth)
4) Design UI structure (component library, preview, usage dashboard)
5) Define multi-tenancy rules (orgId scoping for components and usage)
6) Define auth patterns (RBAC for component management)
7) Document alternatives and tradeoffs
8) Create ADR

Output:
- ADR in /docs/engineering/ADR/001-enterprise-design-system.md
```

## See Also

- `docs/agents/product-strategist.md` - Product Strategist (provides PRD)
- `docs/agents/retention-architect.md` - Retention Architect (provides retention architecture)
- `docs/agents/moat-mrr-strategist.md` - Moat + MRR Strategist (provides moat strategy)
- `docs/agents/chatgpt-reasoning-agent.md` - ChatGPT agent (for technical analysis)
- `.cursor/rules/027-core-adr-trigger.mdc` - ADR trigger rules
- `.cursor/rules/001-core-architecture.mdc` - Architecture principles
- `.cursor/rules/130-drizzle-postgres.mdc` - Drizzle patterns
- `.cursor/rules/120-trpc-conventions.mdc` - tRPC patterns
- `.cursor/rules/260-playbook-multi-tenancy.mdc` - Multi-tenancy playbook

## Agent Packs
For domain-specific SaaS categories, use agent packs:
- "Use the AI-SaaS agent pack" - For AI/ML SaaS applications
- "Use the B2B-admin-SaaS agent pack" - For B2B admin dashboards
- "Use the usage-billing-SaaS agent pack" - For usage-based billing systems

See `docs/agent-packs/*.md` for domain-specific patterns and workflows.
