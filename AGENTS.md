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
**Prompt**: `.cursor/agents/product-strategist.mdc`
**When to use**: New features, product decisions, requirement gathering

### 2. Market Scanner
**Role**: Research market and competitive landscape
**When to use**: New feature planning, competitive analysis, technology selection

### 3. UX Researcher
**Role**: Understand users and validate designs
**When to use**: Feature discovery, user validation, usability testing

### 4. IA/Interaction
**Role**: Design information architecture and interactions
**When to use**: New features, major redesigns, flow improvements

### 5. Accessibility
**Role**: Ensure WCAG 2.2 AA compliance
**Prompt**: `.cursor/agents/accessibility.mdc`
**When to use**: UI implementation, accessibility reviews, compliance checks

### 6. Engineering Architect
**Role**: Design technical architecture and patterns
**Prompt**: `.cursor/agents/engineering-architect.mdc`
**When to use**: New features, architectural decisions, major refactors

### 7. Test Engineer
**Role**: Write and maintain comprehensive tests
**Prompt**: `.cursor/agents/test-engineer.mdc`
**When to use**: New features, refactoring, bug fixes, test maintenance

### 8. Implementer
**Role**: Build features and implement code
**Prompt**: `.cursor/agents/implementer.mdc`
**When to use**: Feature implementation, bug fixes, improvements

## Standard Workflow

The standard workflow for feature development:

```
PRD → IA/flows → ADR → tests → build → a11y audit → verify
```

**Playbook**: `.cursor/playbooks/10-feature-development.mdc`

## File Structure

```
.cursor/
├── rules/           # Three-layer rule system
│   ├── 001-099/     # Layer A: Core Guardrails (always on)
│   │   ├── 001-meta.mdc
│   │   ├── 010-architecture.mdc
│   │   ├── 020-testing.mdc
│   │   └── 030-ux-a11y.mdc
│   ├── 100-199/     # Layer B: Stack/Integration Rules (always on)
│   │   ├── 100-nextjs.mdc
│   │   ├── 110-trpc.mdc
│   │   ├── 120-drizzle.mdc
│   │   ├── 130-stripe.mdc
│   │   └── 140-vercel.mdc
│   └── 200-299/     # Layer C: Playbooks/Workflows (invoked when needed)
│       ├── 200-feature-development.mdc
│       └── 210-refactoring.mdc
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
- 001-meta: Memory & session hygiene
- 010-architecture: Core principles, feature modules, type safety
- 020-testing: Test coverage requirements
- 030-ux-a11y: UX patterns and accessibility baseline

### Layer B: Stack/Integration Rules (100-199)
**Purpose**: Precise conventions for Next.js, tRPC, Drizzle, Stripe, Vercel. Always active.
- 100-nextjs: App Router conventions
- 110-trpc: tRPC procedure and router patterns
- 120-drizzle: Drizzle schema and query conventions
- 130-stripe: Webhook security and integration
- 140-vercel: Runtime, feature flags, observability

### Layer C: Playbooks/Workflows (200-299)
**Purpose**: Longer "how to do X" guides. Invoked when needed.
- 200-feature-development: Complete feature development workflow
- 210-refactoring: Refactoring process and patterns

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
