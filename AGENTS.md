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
├── rules/           # Guardrails (constraints, what NOT to do)
│   ├── 00-meta.mdc  # Memory & session hygiene
│   ├── 10-architecture.mdc
│   ├── 20-testing.mdc
│   ├── 30-ux-a11y.mdc
│   └── 40-platform-ops.mdc
├── playbooks/       # Workflows (how to do things)
│   ├── 10-feature-development.mdc
│   └── 20-refactoring.mdc
└── agents/          # Role prompts (agent-specific instructions)
    ├── product-strategist.mdc
    ├── engineering-architect.mdc
    ├── test-engineer.mdc
    ├── implementer.mdc
    └── accessibility.mdc
```

## Rule Types

### Guardrails (`.cursor/rules/*.mdc`)
**Purpose**: Define constraints and what NOT to do
- Architecture constraints
- Testing requirements
- Accessibility standards
- Platform operations rules

### Playbooks (`.cursor/playbooks/*.mdc`)
**Purpose**: Define workflows and how to do things
- Feature development process
- Refactoring workflows
- Quality gates and checkpoints

### Role Prompts (`.cursor/agents/*.mdc`)
**Purpose**: Agent-specific instructions and responsibilities
- Agent role definition
- Workflow for that agent
- Quality criteria
- Output expectations

### Meta Rules (`.cursor/rules/00-meta.mdc`)
**Purpose**: Memory and session hygiene
- When to create memories
- Session management
- Context preservation
- Error recovery

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
