# Cursor Multi-Agent Orchestration

> Machine-readable README for Cursor 2.x multi-agent system

## Bottom Line

**Isenberg's approach is a great desirability engine for niches.**

**To match our goals (defensive moat + enduring MRR), we explicitly encode durability, retention architecture, and moat design as first-class steps — not assumptions.**

This means:
- **Durability Filter** is a required validation step (not assumed)
- **Retention architecture** is designed before building (not patched later)
- **Moat design** is a required planning step (not an afterthought)

## Operating Principles

- Boring, evolutionary code
- Tests define correctness
- Small diffs
- WCAG 2.2 AA

## Agents

See `docs/agents/*.md` for full prompts.

1. **Insight & Narrative Strategist** ← NEW (Isenberg-critical) — insights + narratives in `/docs/product`
2. **Product Strategist** (now narrative + desirability-first) — PRDs in `/docs/product`
3. **Moat & MRR Strategist** ← NEW (lightweight, fast) — Moat & MRR strategy in `/docs/product`
4. **Market Scanner** (now community-first) — market scans in `/docs/research`
5. **UX Researcher** (identity + narrative-aligned) — scripts/synthesis in `/docs/research`
6. **IA Designer** (emotion → interaction) — IA/flows in `/docs/ux`
7. **Accessibility Agent** — audits in `/docs/ux`
8. **Engineering Architect** — ADRs + schemas in `/docs/engineering`
9. **Test Engineer** — test plans + suites in `/tests` and `/e2e`
10. **Implementer** — code in `/src/features` + `/app` routes

## Default Workflows

- **Insight validation** (Heat Filter): `.cursor/rules/200-playbook-insight-validation.mdc` (must pass before moat/MRR validation)
  - **Mental Model**: "Do a tribe of real humans urgently want this?" (Proof: waitlists, DMs, preorders, repeat usage)
- **Moat & MRR validation** (Durability Filter): `.cursor/rules/205-playbook-moat-mrr-validation.mdc` (must pass before new feature)
  - **Mental Model**: "Will this still matter and keep paying 12–36 months from now?" (Proof: recurring job, budgeted buyer, retention loop, moat map)
- **New feature**: `.cursor/rules/210-playbook-new-feature.mdc` (requires insight validation + moat/MRR validation)
- **Bugfix**: `.cursor/rules/220-playbook-bugfix.mdc`
- **Refactor**: `.cursor/rules/230-playbook-refactor.mdc`

**Two-Filter Pipeline**: Heat gets you in. Durability makes it a real SaaS business.

## Rule System

### Layer A: Core Guardrails (000-099)
Always active. Short, enforceable constraints.
- `000-core-idea-criteria.mdc` - Isenberg's filters (identity-level pain, recurring need, distribution wedge, insight+community match)
- `001-core-architecture.mdc` - Architecture principles, feature modules
- `005-core-testing.mdc` - Test requirements
- `010-core-ux-a11y.mdc` - UX and accessibility baseline
- `015-core-security.mdc` - Security fundamentals
- `020-core-observability.mdc` - Observability requirements
- `025-core-session-hygiene.mdc` - Planning and diff management
- `027-core-adr-trigger.mdc` - When to write ADRs
- `027-core-desirability-first.mdc` - No build until validated
- `030-core-style.mdc` - Code style
- `035-core-enterprise-readiness.mdc` - Enterprise-readiness primitives (audit logs, RBAC, export/delete, rate limiting)

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
- `200-playbook-insight-validation.mdc` - Greg's pre-build validation process (Isenberg Edition) - **Must pass before moat/MRR validation**
- `205-playbook-moat-mrr-validation.mdc` - Moat & MRR validation (defensibility + monetization) - **Must pass before new feature**
- `210-playbook-new-feature.mdc` - Feature development workflow (requires insight validation + moat/MRR validation)
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
