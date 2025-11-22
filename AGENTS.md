# Cursor Multi-Agent Orchestration

> Machine-readable README for Cursor 2.x multi-agent system

## Operating Principles

- Boring, evolutionary code
- Tests define correctness
- Small diffs
- WCAG 2.2 AA

## Agents

See `docs/agents/*.md` for full prompts.

1. **Insight & Narrative Strategist** — insights + narratives in `/docs/product` (runs before Product Strategist)
2. **Product Strategist** — PRDs in `/docs/product`
3. **Market Scanner** — market scans in `/docs/research`
4. **UX Researcher** — scripts/synthesis in `/docs/research`
5. **IA Designer** — IA/flows in `/docs/ux`
6. **Accessibility** — audits in `/docs/ux`
7. **Engineering Architect** — ADRs + schemas in `/docs/engineering`
8. **Test Engineer** — test plans + suites in `/tests` and `/e2e`
9. **Implementer** — code in `/src/features` + `/app` routes

## Default Workflows

- **Pre-build validation**: `.cursor/rules/000-playbook-pre-build-validation.mdc` (must pass before new feature)
- **New feature**: `.cursor/rules/210-playbook-new-feature.mdc` (requires pre-build validation)
- **Bugfix**: `.cursor/rules/220-playbook-bugfix.mdc`
- **Refactor**: `.cursor/rules/230-playbook-refactor.mdc`

## Rule System

### Layer A: Core Guardrails (001-099)
Always active. Short, enforceable constraints.
- `001-core-architecture.mdc` - Architecture principles, feature modules
- `005-core-testing.mdc` - Test requirements
- `010-core-ux-a11y.mdc` - UX and accessibility baseline
- `015-core-security.mdc` - Security fundamentals
- `020-core-observability.mdc` - Observability requirements
- `025-core-session-hygiene.mdc` - Planning and diff management
- `027-core-adr-trigger.mdc` - When to write ADRs
- `030-core-style.mdc` - Code style

### Layer B: Stack/Integration Rules (100-199)
Always active. Precise conventions for Next.js, tRPC, Drizzle, Stripe, Vercel.
- `110-next-app-router.mdc` - App Router conventions
- `120-trpc-conventions.mdc` - tRPC patterns
- `130-drizzle-postgres.mdc` - Drizzle schema and queries
- `140-stripe-billing.mdc` - Stripe webhooks and billing
- `150-vercel-platform.mdc` - Vercel runtime and services
- `160-feature-flags.mdc` - Feature flag usage

### Layer C: Playbooks (000-299)
Invoked when needed. Detailed "how to do X" guides.
- `000-playbook-pre-build-validation.mdc` - Pre-build validation (Isenberg Edition) - **Must pass before new feature**
- `210-playbook-new-feature.mdc` - Feature development workflow
- `220-playbook-bugfix.mdc` - Bug fix process
- `230-playbook-refactor.mdc` - Refactoring process
- `240-playbook-a11y-audit.mdc` - Accessibility audit
- `250-playbook-billing-change.mdc` - Billing changes
- `260-playbook-multi-tenancy.mdc` - Multi-tenancy implementation

## Domain Agent Packs

For specific SaaS categories, add agent packs in `/docs/agent-packs/`:

- `ai-saas.md` - AI/ML SaaS patterns
- `b2b-admin-saas.md` - B2B admin dashboard patterns
- `usage-billing-saas.md` - Usage-based billing patterns

Agent packs extend base agents with domain-specific workflows and patterns.

**Usage**: Invoke Product Strategist or Engineering Architect with "Use the AI-SaaS agent pack" to apply domain-specific patterns.

## Cursor 2.x Gotchas

### Glob-Scoped Rules
Glob-scoped rules are currently flaky in Cursor 2.0+; prefer explicit rule files for now.

### Parallel Agents
Parallel agents use git worktrees; merge intentionally and avoid accepting changes blindly.

## See Also

- `.cursor/rules/` - Project guardrails and playbooks
- `docs/agents/` - Agent role prompts
- `docs/agent-packs/` - Domain-specific agent configurations
- `docs/ARCHITECTURE.md` - Architecture patterns
- `docs/CONTRIBUTING.md` - Development guidelines
- `docs/adr/` - Architecture Decision Records
