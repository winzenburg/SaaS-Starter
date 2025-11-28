# Cursor Rules

This folder contains machine-readable rule files (`.mdc`) for Cursor's multi-agent system.

## Rule Numbering System

Rules are organized by number ranges:

- **000-099**: Core guardrails (always active)
  - `000-orchestration.mdc` - **META-RULE**: Global orchestration (single factory pipeline)
- **100-199**: Stack/integration rules (always active)
- **200-299**: Playbooks (invoked when needed)
- **300-399**: Discovery rules (AI-powered discovery pipeline)

## Discovery Rules (300-399)

**Full Discovery Rule Set** - AI-powered product discovery pipeline

### Master & Overview
- `300-discovery-master.mdc` - Master discovery rule (orchestrates all discovery)
- `301-discovery-overview.mdc` - Discovery overview, gates, AI tool roles
- `302-discovery-workflow.mdc` - Complete 8-step discovery workflow

### AI Tool Integration in Discovery
- `310-manus-in-discovery.mdc` - Manus narrative engine requirements
- `320-chatgpt-refinement.mdc` - ChatGPT refinement and synthesis
- `330-elevenlabs-voice.mdc` - ElevenLabs persona voice interviews
- `340-midjourney-visuals.mdc` - Midjourney/Canva opportunity visualization

### Discovery Stage Rules (041-044)
- `041-niche-intelligence.mdc` - Stage 1: Niche Intelligence
- `042-problem-intelligence.mdc` - Stage 2: Pain Signal Analysis (Note: This is the old name, agent is now Pain-Signal-Agent)
- `043-persona-jtbd.mdc` - Stage 3: Persona & JTBD (Deep Insight)
- `044-opportunity-moat.mdc` - Stage 4: Opportunity & Moat

**Workflow**: See `docs/DISCOVERY-WORKFLOW.md` for the complete 8-step discovery pipeline.

**Key Principle**: No engineering until Opportunity Score ≥ 8.0/10

## Core Rules (000-099)

### Philosophy & Principles
- `001-philosophy.mdc` - Core philosophy (validation-first, AI-enhanced, boring tech)
- `002-model-routing.mdc` - Model routing (ChatGPT vs Claude usage guidelines)
- `003-doc-organization.mdc` - Document organization (one idea = one full doc set)

### Validation & AI Integration
- `040-demand-validation.mdc` - Demand validation requirements
- `050-manus-integration.mdc` - Manus output consumption patterns
- `060-chatgpt-refinement.mdc` - ChatGPT refinement and synthesis
- `070-elevenlabs-integration.mdc` - ElevenLabs voice content requirements
- `080-midjourney-canva.mdc` - Visual asset requirements
- `085-glif-integration.mdc` - Glif creative batching workflows
- `090-distribution.mdc` - Distribution map requirements
- `090-lindy-integration.mdc` - Lindy AI automation for validation workflows
- `091-lindy-doc-references.mdc` - Required exact paths and references in Lindy specs
- `095-posthog-integration.mdc` - PostHog analytics and feature flags integration
- `096-supabase-integration.mdc` - Supabase database, storage, and edge functions integration
- `097-clerk-integration.mdc` - Clerk authentication, orgs, and onboarding integration

### Core Engineering
- `100-prd.mdc` - PRD requirements
- `110-adr.mdc` - ADR requirements
- `120-test-plan.mdc` - Test plan requirements
- `130-implementation.mdc` - Implementation requirements

### Other Core Rules
- `000-core-idea-criteria.mdc` - Isenberg's filters
- `001-core-architecture.mdc` - Architecture principles
- `002-core-compounding-niche-score.mdc` - NCS scoring
- `003-core-data-moat-planning.mdc` - Data moat planning
- `004-core-expansion-revenue.mdc` - Expansion revenue architecture
- `005-core-testing.mdc` - Test requirements
- `006-core-frequency-modeling.mdc` - JTBD frequency modeling
- `007-core-portfolio-kill-greenlight.mdc` - Portfolio kill/greenlight criteria
- `010-core-ux-a11y.mdc` - UX and accessibility baseline
- `015-core-security.mdc` - Security fundamentals
- `020-core-observability.mdc` - Observability requirements
- `025-core-session-hygiene.mdc` - Planning and diff management
- `027-core-adr-trigger.mdc` - When to write ADRs
- `027-core-desirability-first.mdc` - No build until validated
- `030-core-style.mdc` - Code style
- `035-core-enterprise-readiness.mdc` - Enterprise-readiness primitives

## Stack/Integration Rules (100-199)

### Next.js & Platform
- `110-next-app-router.mdc` - App Router conventions
- `120-trpc-conventions.mdc` - tRPC patterns
- `130-drizzle-postgres.mdc` - Drizzle schema and queries
- `140-stripe-billing.mdc` - Stripe webhooks and billing
- `150-vercel-platform.mdc` - Vercel runtime and services
- `160-feature-flags.mdc` - Feature flag usage
- `170-data-moat.mdc` - Data moat thesis and data capture instrumentation
- `180-expansion-revenue.mdc` - Expansion revenue mechanism design

### AI Tool Integrations
- `190-ai-tool-integrations.mdc` - General AI tool integration patterns
- `195-ai-workflow-orchestration.mdc` - Orchestrating multiple AI tools
- `196-ai-quality-control.mdc` - Quality gates for AI outputs
- `197-ai-cost-management.mdc` - Budget tracking and optimization
- `198-ai-prompt-templates.mdc` - Reusable prompt templates
- `199-ai-error-handling.mdc` - Error handling patterns

## Playbooks (200-299)

### Validation Playbooks
- `200-playbook-insight-validation.mdc` - Insight validation workflow
- `205-playbook-moat-mrr-validation.mdc` - Moat & MRR validation

### Management Playbooks
- `207-playbook-portfolio-management.mdc` - Portfolio management

### Development Playbooks
- `210-playbook-new-feature.mdc` - Feature development workflow
- `220-playbook-bugfix.mdc` - Bug fix process
- `230-playbook-refactor.mdc` - Refactoring process

### Quality Playbooks
- `240-playbook-a11y-audit.mdc` - Accessibility audit

### Specialized Playbooks
- `250-playbook-billing-change.mdc` - Billing changes
- `260-playbook-multi-tenancy.mdc` - Multi-tenancy implementation

## Discovery Rules (300-399)

**Full Discovery Rule Set** - AI-powered product discovery pipeline

### Master & Overview
- `300-discovery-master.mdc` - Master discovery rule (orchestrates all discovery)
- `301-discovery-overview.mdc` - Discovery overview, gates, AI tool roles
- `302-discovery-workflow.mdc` - Complete 8-step discovery workflow

### AI Tool Integration in Discovery
- `310-manus-in-discovery.mdc` - Manus narrative engine requirements
- `320-chatgpt-refinement.mdc` - ChatGPT refinement and synthesis
- `330-elevenlabs-voice.mdc` - ElevenLabs persona voice interviews
- `340-midjourney-visuals.mdc` - Midjourney/Canva opportunity visualization

**Key Principle**: No engineering until Opportunity Score ≥ 8.0/10

## Rule File Format

All rule files use the `.mdc` extension and follow this structure:

```markdown
# Rule XXX: [Title]

> Brief description

## Core Principle

[Main principle]

## Required Sections/Requirements

[Detailed requirements]

## Quality Gates

[Quality criteria]

## Integration with Other Rules

[Links to related rules]
```

## Usage

Rules are automatically loaded by Cursor and applied to agent workflows. Agents reference specific rules when executing tasks.

## See Also

- `docs/agents/` - Agent role definitions
- `docs/validation/` - Validation documents
- `docs/product/` - Product documents (PRDs, insights, etc.)

