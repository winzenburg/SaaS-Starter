# Cursor Multi-Agent Orchestration

> Machine-readable README for Cursor 2.x multi-agent system

## Operating Principles

- **Boring, evolutionary code** - Prefer simple, maintainable solutions over clever abstractions
- **Tests define correctness** - Write tests that describe expected behavior
- **Small diffs** - Make incremental, verifiable changes
- **WCAG 2.2 AA** - All UI must meet accessibility standards

## Agent Roster

| Agent | Role | Prompt | When to Use |
|-------|------|--------|-------------|
| **Product Strategist** | Define product requirements and strategy | `docs/agents/product-strategist.md` | New features, product decisions, requirement gathering |
| **Market Scanner** | Research market and competitive landscape | `docs/agents/market-scanner.md` | New feature planning, competitive analysis, technology selection |
| **UX Researcher** | Understand users and validate designs | `docs/agents/ux-researcher.md` | Feature discovery, user validation, usability testing |
| **IA/Interaction** | Design information architecture and interactions | `docs/agents/ia-designer.md` | New features, major redesigns, flow improvements |
| **Accessibility** | Ensure WCAG 2.2 AA compliance | `docs/agents/accessibility.md` | UI implementation, accessibility reviews, compliance checks |
| **Engineering Architect** | Design technical architecture and patterns | `docs/agents/engineering-architect.md` | New features, architectural decisions, major refactors |
| **Test Engineer** | Write and maintain comprehensive tests | `docs/agents/test-engineer.md` | New features, refactoring, bug fixes, test maintenance |
| **Implementer** | Build features and implement code | `docs/agents/implementer.md` | Feature implementation, bug fixes, improvements |

## Standard Workflow

```
PRD → IA/flows → ADR → tests → build → a11y audit → verify
```

**Playbook**: `.cursor/rules/210-playbook-new-feature.mdc`

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

## Parallel Workflows

- **Market Scanner** can research while **Product Strategist** writes PRD
- **UX Researcher** can validate while **IA/Interaction** designs flows
- **Test Engineer** can write tests while **Engineering Architect** creates ADR
- **Accessibility** can audit while **Implementer** builds (with coordination)

## Quality Gates

- Follow `.cursor/rules/*` guardrails
- Use `.cursor/rules/200-299/*` playbooks when needed
- Tests must be green before merging
- WCAG 2.2 AA compliance required
- Code must pass linting and type checking

## See Also

- `.cursor/rules/` - Project guardrails and playbooks
- `docs/agents/` - Agent role prompts
- `docs/ARCHITECTURE.md` - Architecture patterns
- `docs/CONTRIBUTING.md` - Development guidelines
- `docs/adr/` - Architecture Decision Records
