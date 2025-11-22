# Cursor Multi-Agent Orchestration

This document describes how to use Cursor 2.1 multi-agents for parallel development workflows.

## Overview

Cursor 2.1 supports up to 8 parallel agents, each running in an isolated worktree. Use agents to:
- Work on multiple features simultaneously
- Parallelize testing and refactoring
- Speed up development cycles
- Maintain code quality across features

## Agent Roster

### 🏗️ Architecture Agent
**Purpose**: Design and implement architectural changes
- Creates ADRs for significant decisions
- Refactors across feature boundaries
- Updates architecture documentation
- Reviews and improves code structure

**When to use**: Major refactors, new patterns, architectural decisions

### 🧪 Testing Agent
**Purpose**: Write and maintain tests
- Creates unit tests for domain logic
- Writes integration tests for server actions
- Sets up E2E tests for critical flows
- Ensures test coverage requirements

**When to use**: New features, refactoring, bug fixes

### 🎨 UI/UX Agent
**Purpose**: Build accessible, polished interfaces
- Implements UI components with all states (loading/empty/error/success)
- Ensures WCAG 2.2 AA compliance
- Creates responsive, accessible designs
- Follows design system patterns

**When to use**: New features, UI improvements, accessibility fixes

### 🔌 Integration Agent
**Purpose**: Connect features and external services
- Sets up tRPC procedures
- Configures API routes
- Integrates third-party services (Stripe, etc.)
- Handles webhook setup

**When to use**: New integrations, API work, external service setup

### 🗄️ Database Agent
**Purpose**: Manage database schema and migrations
- Creates Drizzle schemas
- Writes migrations
- Optimizes queries
- Handles data transformations

**When to use**: Schema changes, migrations, query optimization

### 📚 Documentation Agent
**Purpose**: Maintain project documentation
- Updates README and architecture docs
- Creates feature documentation
- Writes ADRs
- Maintains API documentation

**When to use**: New features, architectural changes, onboarding

### 🔒 Security Agent
**Purpose**: Ensure security best practices
- Reviews authentication/authorization
- Verifies webhook signatures
- Checks for PII in logs
- Audits dependencies

**When to use**: Security reviews, new auth features, compliance

### 🚀 Performance Agent
**Purpose**: Optimize performance and observability
- Adds observability events
- Optimizes bundle size
- Improves query performance
- Sets up monitoring

**When to use**: Performance issues, optimization work, monitoring setup

## Workflows

### Feature Development Workflow

1. **Architecture Agent**: Design feature structure and create ADR if needed
2. **Database Agent**: Create schema and migrations
3. **UI/UX Agent**: Build UI components with all states
4. **Integration Agent**: Set up tRPC procedures and API routes
5. **Testing Agent**: Write comprehensive tests (unit + integration + e2e)
6. **Documentation Agent**: Update feature documentation

**Parallel execution**: Steps 3-5 can run in parallel after step 2

### Refactoring Workflow

1. **Architecture Agent**: Plan refactor and create ADR
2. **Testing Agent**: Ensure all tests are green
3. **Architecture Agent**: Perform refactor
4. **Testing Agent**: Verify tests still pass
5. **Documentation Agent**: Update documentation

**Rule**: Tests must be green before further refactors

### Bug Fix Workflow

1. **Testing Agent**: Write failing test that reproduces bug
2. **Appropriate Agent**: Fix the bug
3. **Testing Agent**: Verify test passes
4. **Documentation Agent**: Document the fix if significant

### Security Review Workflow

1. **Security Agent**: Review code for security issues
2. **Integration Agent**: Fix webhook/API security issues
3. **Database Agent**: Review data access patterns
4. **Security Agent**: Final security audit

## Best Practices

### Agent Coordination

- **One feature per agent** - Don't have multiple agents work on the same feature simultaneously
- **Clear boundaries** - Use feature module boundaries to isolate work
- **Communication** - Use commit messages and PRs to communicate between agents
- **Sequential dependencies** - Ensure dependencies are resolved before parallel work

### Worktree Management

- Each agent runs in an isolated worktree
- Agents can work on different branches simultaneously
- Merge conflicts are handled at integration time
- Use feature flags to test parallel work safely

### Quality Gates

- All agents must follow `.cursor/rules/*` guidelines
- Tests must pass before merging agent work
- Code must pass linting and type checking
- Documentation must be updated

## Agent Prompts

### Starting an Agent

When starting an agent, provide:
1. **Clear objective** - What needs to be done
2. **Context** - Relevant files and dependencies
3. **Constraints** - Any limitations or requirements
4. **Success criteria** - How to know it's done

### Example: Starting UI/UX Agent

```
Build the login form feature with:
- Form in src/features/auth/ui/LoginForm.tsx
- Use schema from src/features/auth/domain/schemas.ts
- Include loading/empty/error/success states
- WCAG 2.2 AA compliant
- Responsive design
```

### Example: Starting Testing Agent

```
Write tests for the auth feature:
- Unit tests for domain logic
- Integration tests for loginAction
- E2E test for login flow
- All tests must pass
```

## Troubleshooting

### Merge Conflicts

- Resolve conflicts in main branch
- Coordinate with other agents if needed
- Use feature flags to isolate conflicting work

### Agent Stuck

- Check if agent is waiting on dependencies
- Verify worktree is clean
- Review agent's progress in sidebar

### Quality Issues

- Review `.cursor/rules/*` compliance
- Run tests and linting
- Check documentation updates

## Advanced: Custom Agents

For complex workflows, you can create custom agent configurations in `/docs/agents/*`:

- `feature-development.md` - Detailed feature dev workflow
- `security-audit.md` - Security review checklist
- `performance-optimization.md` - Performance tuning guide

## See Also

- `.cursor/rules/` - Project guardrails
- `docs/ARCHITECTURE.md` - Architecture patterns
- `docs/CONTRIBUTING.md` - Development guidelines

