# Cursor Multi-Agent Orchestration

This document describes how to use Cursor 2.1 multi-agents for parallel development workflows.

## Overview

Cursor 2.1 supports up to 8 parallel agents, each running in an isolated worktree. Use agents to:
- Work on multiple features simultaneously
- Parallelize research, design, and implementation
- Speed up development cycles
- Maintain code quality and accessibility across features

## Operating Principles

All agents must adhere to these core principles:

- **Boring, evolutionary code** - Prefer simple, maintainable solutions over clever abstractions
- **Tests define correctness** - Write tests that describe expected behavior
- **Small diffs** - Make incremental, verifiable changes
- **WCAG 2.2 AA** - All UI must meet accessibility standards

## Agents

### 1. Product Strategist
**Purpose**: Define product requirements and strategy
- Creates PRDs (Product Requirements Documents)
- Defines user problems and JTBD (Jobs To Be Done)
- Identifies success metrics and risks
- Documents edge cases and failure modes
- Updates personas and user research

**When to use**: New features, product decisions, requirement gathering

### 2. Market Scanner
**Purpose**: Research market and competitive landscape
- Analyzes competitor features
- Researches best practices and patterns
- Identifies industry standards
- Reviews relevant case studies
- Provides market context for decisions

**When to use**: New feature planning, competitive analysis, technology selection

### 3. UX Researcher
**Purpose**: Understand users and validate designs
- Conducts user research
- Creates user personas
- Validates user flows
- Tests prototypes and designs
- Gathers user feedback

**When to use**: Feature discovery, user validation, usability testing

### 4. IA/Interaction
**Purpose**: Design information architecture and interactions
- Creates information architecture
- Designs user flows and wireframes
- Defines interaction patterns
- Plans navigation and content structure
- Ensures consistent UX patterns

**When to use**: New features, major redesigns, flow improvements

### 5. Accessibility
**Purpose**: Ensure WCAG 2.2 AA compliance
- Audits UI for accessibility issues
- Tests with screen readers
- Verifies keyboard navigation
- Checks color contrast and visual accessibility
- Ensures semantic HTML and ARIA usage

**When to use**: UI implementation, accessibility reviews, compliance checks

### 6. Engineering Architect
**Purpose**: Design technical architecture and patterns
- Creates ADRs (Architecture Decision Records)
- Designs system architecture
- Defines patterns and conventions
- Reviews code structure
- Plans refactoring and improvements

**When to use**: New features, architectural decisions, major refactors

### 7. Test Engineer
**Purpose**: Write and maintain comprehensive tests
- Creates unit tests for domain logic
- Writes integration tests for server actions
- Sets up E2E tests for critical flows
- Ensures test coverage requirements
- Maintains test infrastructure

**When to use**: New features, refactoring, bug fixes, test maintenance

### 8. Implementer
**Purpose**: Build features and implement code
- Implements features following architecture
- Writes server actions and tRPC procedures
- Creates UI components with all states
- Integrates with external services
- Follows all project rules and patterns

**When to use**: Feature implementation, bug fixes, improvements

## Standard Workflow

The standard workflow for feature development follows this sequence:

```
PRD → IA/flows → ADR → tests → build → a11y audit → verify
```

### Step-by-Step Process

1. **PRD** (Product Strategist)
   - Define requirements, user problems, success metrics
   - Document edge cases and failure modes
   - Get stakeholder alignment

2. **IA/flows** (IA/Interaction + UX Researcher)
   - Design information architecture
   - Create user flows and wireframes
   - Validate with user research

3. **ADR** (Engineering Architect)
   - Create Architecture Decision Record
   - Design technical approach
   - Define patterns and conventions

4. **Tests** (Test Engineer)
   - Write tests that define correctness
   - Create unit, integration, and E2E tests
   - Ensure tests pass before implementation

5. **Build** (Implementer)
   - Implement feature following architecture
   - Follow all project rules
   - Create small, verifiable diffs

6. **A11y Audit** (Accessibility)
   - Audit UI for WCAG 2.2 AA compliance
   - Test with assistive technologies
   - Fix accessibility issues

7. **Verify** (Test Engineer + Accessibility)
   - Run all tests (must be green)
   - Final accessibility check
   - Code review and quality gates

## Parallel Workflows

While the standard workflow is sequential, some steps can run in parallel:

### Parallel Execution Opportunities

- **Market Scanner** can research while **Product Strategist** writes PRD
- **UX Researcher** can validate while **IA/Interaction** designs flows
- **Test Engineer** can write tests while **Engineering Architect** creates ADR
- **Accessibility** can audit while **Implementer** builds (with coordination)

### Coordination Rules

- **Sequential dependencies**: PRD → IA/flows → ADR → tests → build
- **Parallel safe**: Market research, user research, documentation
- **Final gates**: Tests and accessibility must pass before merge

## Best Practices

### Agent Coordination

- **Clear handoffs** - Each agent should clearly document outputs for next agent
- **Small increments** - Break work into small, verifiable pieces
- **Communication** - Use commit messages, PRs, and documentation to communicate
- **Follow principles** - All agents must adhere to operating principles

### Worktree Management

- Each agent runs in an isolated worktree
- Agents can work on different branches simultaneously
- Merge conflicts handled at integration time
- Use feature flags to test parallel work safely

### Quality Gates

- All agents must follow `.cursor/rules/*` guidelines
- Tests must be green before merging
- Code must pass linting and type checking
- WCAG 2.2 AA compliance required
- Documentation must be updated

## Example: Feature Development

### Starting a New Feature

1. **Product Strategist**: "Create PRD for user authentication feature"
2. **Market Scanner**: "Research authentication best practices and patterns"
3. **UX Researcher**: "Validate authentication flows with users"
4. **IA/Interaction**: "Design login/signup flows and wireframes"
5. **Engineering Architect**: "Create ADR for auth architecture (NextAuth vs custom)"
6. **Test Engineer**: "Write tests for auth domain logic and flows"
7. **Implementer**: "Build auth feature following ADR and tests"
8. **Accessibility**: "Audit auth UI for WCAG 2.2 AA compliance"
9. **Test Engineer**: "Run full test suite and verify"
10. **Accessibility**: "Final a11y check and sign-off"

## Troubleshooting

### Workflow Blockers

- **Missing PRD**: Product Strategist must complete before IA/Interaction
- **No ADR**: Engineering Architect must create ADR before implementation
- **Failing tests**: Test Engineer must fix before Implementer continues
- **A11y issues**: Accessibility must resolve before merge

### Agent Coordination Issues

- Review handoff documentation
- Check for missing dependencies
- Verify worktree state
- Coordinate through PRs and commits

## See Also

- `.cursor/rules/` - Project guardrails
- `docs/ARCHITECTURE.md` - Architecture patterns
- `docs/CONTRIBUTING.md` - Development guidelines
- `docs/adr/` - Architecture Decision Records
