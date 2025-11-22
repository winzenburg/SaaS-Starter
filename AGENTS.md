# Cursor Multi-Agent Orchestration

> Machine-readable README for Cursor 2.x multi-agent system

## System Overview

Cursor 2.1 supports up to 8 parallel agents, each running in an isolated worktree. This document defines the agent system, roles, and workflows.

## Operating Principles

All agents must adhere to these core principles:

- **Boring, evolutionary code** - Prefer simple, maintainable solutions over clever abstractions
- **Tests define correctness** - Write tests that describe expected behavior
- **Small diffs** - Make incremental, verifiable changes
- **WCAG 2.2 AA** - All UI must meet accessibility standards

## Agent Roster

### 1. Product Strategist
**Role**: Define product requirements and strategy
**Prompt**: `docs/agents/product-strategist.md`
**When to use**: New features, product decisions, requirement gathering

### 2. Market Scanner
**Role**: Research market and competitive landscape
**Prompt**: `docs/agents/market-scanner.md`
**When to use**: New feature planning, competitive analysis, technology selection

### 3. UX Researcher
**Role**: Understand users and validate designs
**Prompt**: `docs/agents/ux-researcher.md`
**When to use**: Feature discovery, user validation, usability testing

### 4. IA/Interaction
**Role**: Design information architecture and interactions
**Prompt**: `docs/agents/ia-designer.md`
**When to use**: New features, major redesigns, flow improvements

### 5. Accessibility
**Role**: Ensure WCAG 2.2 AA compliance
**Prompt**: `docs/agents/accessibility.md`
**When to use**: UI implementation, accessibility reviews, compliance checks

### 6. Engineering Architect
**Role**: Design technical architecture and patterns
**Prompt**: `docs/agents/engineering-architect.md`
**When to use**: New features, architectural decisions, major refactors

### 7. Test Engineer
**Role**: Write and maintain comprehensive tests
**Prompt**: `docs/agents/test-engineer.md`
**When to use**: New features, refactoring, bug fixes, test maintenance

### 8. Implementer
**Role**: Build features and implement code
**Prompt**: `docs/agents/implementer.md`
**When to use**: Feature implementation, bug fixes, improvements

## Standard Workflow

The standard workflow for feature development:

```
PRD → IA/flows → ADR → tests → build → a11y audit → verify
```

**Playbook**: `.cursor/rules/210-playbook-new-feature.mdc`

## File Structure

```
.cursor/
├── rules/           # Three-layer rule system
│   ├── 001-099/     # Layer A: Core Guardrails (always on)
│   │   ├── 001-core-architecture.mdc
│   │   ├── 005-core-testing.mdc
│   │   ├── 010-core-ux-a11y.mdc
│   │   ├── 015-core-security.mdc
│   │   ├── 020-core-observability.mdc
│   │   └── 030-core-style.mdc
│   ├── 100-199/     # Layer B: Stack/Integration Rules (always on)
│   │   ├── 110-next-app-router.mdc
│   │   ├── 120-trpc-conventions.mdc
│   │   ├── 130-drizzle-postgres.mdc
│   │   ├── 140-stripe-billing.mdc
│   │   ├── 150-vercel-platform.mdc
│   │   └── 160-feature-flags.mdc
│   └── 200-299/     # Layer C: Playbooks/Workflows (invoked when needed)
│       ├── 210-playbook-new-feature.mdc
│       ├── 220-playbook-bugfix.mdc
│       ├── 230-playbook-refactor.mdc
│       ├── 240-playbook-a11y-audit.mdc
│       ├── 250-playbook-billing-change.mdc
│       └── 260-playbook-multi-tenancy.mdc
└── agents/          # Role prompts (agent-specific instructions)
    ├── product-strategist.mdc
    ├── engineering-architect.mdc
    ├── test-engineer.mdc
    ├── implementer.mdc
    └── accessibility.mdc
```

## Rule Layers

### Layer A: Core Guardrails (001-099)
**Purpose**: Short, enforceable constraints. Always active.
- 001-core-architecture: Core principles, feature modules, type safety
- 005-core-testing: Test coverage requirements
- 010-core-ux-a11y: UX patterns and accessibility baseline
- 015-core-security: Security fundamentals
- 020-core-observability: Observability requirements
- 030-core-style: Code style and formatting

### Layer B: Stack/Integration Rules (100-199)
**Purpose**: Precise conventions for Next.js, tRPC, Drizzle, Stripe, Vercel. Always active.
- 110-next-app-router: App Router conventions
- 120-trpc-conventions: tRPC procedure and router patterns
- 130-drizzle-postgres: Drizzle schema and query conventions
- 140-stripe-billing: Webhook security and integration
- 150-vercel-platform: Runtime, deployment, observability
- 160-feature-flags: Feature flag usage

### Layer C: Playbooks/Workflows (200-299)
**Purpose**: Longer "how to do X" guides. Invoked when needed.
- 210-playbook-new-feature: Complete feature development workflow
- 220-playbook-bugfix: Bug fix process
- 230-playbook-refactor: Refactoring process and patterns
- 240-playbook-a11y-audit: Accessibility audit process
- 250-playbook-billing-change: Billing change process
- 260-playbook-multi-tenancy: Multi-tenancy implementation

### Role Prompts (`.cursor/agents/*.mdc`)
**Purpose**: Agent-specific instructions and responsibilities
- Agent role definition
- Workflow for that agent
- Quality criteria
- Output expectations

## Parallel Workflows

While the standard workflow is sequential, some steps can run in parallel:

- **Market Scanner** can research while **Product Strategist** writes PRD
- **UX Researcher** can validate while **IA/Interaction** designs flows
- **Test Engineer** can write tests while **Engineering Architect** creates ADR
- **Accessibility** can audit while **Implementer** builds (with coordination)

## Quality Gates

All agents must pass quality gates:
- Follow `.cursor/rules/*` guardrails
- Use `.cursor/playbooks/*` workflows
- Tests must be green before merging
- WCAG 2.2 AA compliance required
- Code must pass linting and type checking

## See Also

- `.cursor/rules/` - Project guardrails
- `.cursor/playbooks/` - Workflow playbooks
- `.cursor/agents/` - Agent role prompts
- `docs/ARCHITECTURE.md` - Architecture patterns
- `docs/CONTRIBUTING.md` - Development guidelines
- `docs/adr/` - Architecture Decision Records
