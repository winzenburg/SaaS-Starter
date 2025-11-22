# Cursor Multi-Agent Orchestration

> Machine-readable README for Cursor 2.x multi-agent system

## Operating Principles

- Boring, evolutionary code
- Tests define correctness
- Small diffs
- WCAG 2.2 AA

## Agents

See `docs/agents/*.md` for full prompts.

1. **Product Strategist** — PRDs in `/docs/product`
2. **Market Scanner** — market scans in `/docs/research`
3. **UX Researcher** — scripts/synthesis in `/docs/research`
4. **IA Designer** — IA/flows in `/docs/ux`
5. **Accessibility** — audits in `/docs/ux`
6. **Engineering Architect** — ADRs + schemas in `/docs/engineering`
7. **Test Engineer** — test plans + suites in `/tests` and `/e2e`
8. **Implementer** — code in `/src/features` + `/app` routes

## Default Workflows

- **New feature**: `.cursor/rules/210-playbook-new-feature.mdc`
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

### Layer C: Playbooks (200-299)
Invoked when needed. Detailed "how to do X" guides.
- `210-playbook-new-feature.mdc` - Feature development workflow
- `220-playbook-bugfix.mdc` - Bug fix process
- `230-playbook-refactor.mdc` - Refactoring process
- `240-playbook-a11y-audit.mdc` - Accessibility audit
- `250-playbook-billing-change.mdc` - Billing changes
- `260-playbook-multi-tenancy.mdc` - Multi-tenancy implementation

## See Also

- `.cursor/rules/` - Project guardrails and playbooks
- `docs/agents/` - Agent role prompts
- `docs/ARCHITECTURE.md` - Architecture patterns
- `docs/CONTRIBUTING.md` - Development guidelines
- `docs/adr/` - Architecture Decision Records
