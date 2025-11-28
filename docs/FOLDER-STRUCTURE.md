# Folder Structure

Complete folder structure for the SaaS Starter multi-agent system.

## Validation Documents

**Location**: `/docs/validation/`

### File Naming Convention

All validation documents follow the pattern: `[TYPE]-[idea-slug].md`

Where `[idea-slug]` is a lowercase, hyphenated version of the product/feature name.

### Document Types

```
/docs/validation/
├── README.md                          # Validation folder documentation
├── VALIDATION-PLAN-*.md               # Validation strategy (from @Demand-Validator)
├── LANDING-*.md                       # Landing page copy/visuals (from @Landing-Builder)
├── DISTRIBUTION-*.md                  # Distribution strategy (from @Distribution-Operator)
├── PRICING-TEST-*.md                  # Pricing tests (from @Pricing-Tester)
└── RESULTS-*.md                       # Validation results (from validation execution)
```

**Examples**:
- `VALIDATION-PLAN-enterprise-design-system.md`
- `LANDING-enterprise-design-system.md`
- `DISTRIBUTION-enterprise-design-system.md`
- `PRICING-TEST-enterprise-design-system.md`
- `RESULTS-enterprise-design-system.md`

## Cursor Rules

**Location**: `.cursor/rules/`

### Rule Numbering System

- **000-099**: Core guardrails (always active)
- **100-199**: Stack/integration rules (always active)
- **200-299**: Playbooks (invoked when needed)

### Core Rules (000-099)

```
.cursor/rules/
├── README.md                          # Rules folder documentation
│
├── 001-philosophy.mdc                 # Core philosophy
├── 040-demand-validation.mdc          # Demand validation requirements
├── 050-manus-integration.mdc          # Manus output consumption
├── 060-elevenlabs-integration.mdc     # ElevenLabs voice content requirements
├── 070-midjourney-canva.mdc           # Visual asset requirements
├── 080-distribution.mdc               # Distribution map requirements
│
├── 100-prd.mdc                        # PRD requirements
├── 110-adr.mdc                        # ADR requirements
├── 120-test-plan.mdc                  # Test plan requirements
└── 130-implementation.mdc             # Implementation requirements
```

### Other Core Rules

```
.cursor/rules/
├── 000-core-idea-criteria.mdc         # Isenberg's filters
├── 001-core-architecture.mdc          # Architecture principles
├── 002-core-compounding-niche-score.mdc
├── 003-core-data-moat-planning.mdc
├── 004-core-expansion-revenue.mdc
├── 005-core-testing.mdc
├── 006-core-frequency-modeling.mdc
├── 007-core-portfolio-kill-greenlight.mdc
├── 010-core-ux-a11y.mdc
├── 015-core-security.mdc
├── 020-core-observability.mdc
├── 025-core-session-hygiene.mdc
├── 027-core-adr-trigger.mdc
├── 027-core-desirability-first.mdc
├── 030-core-style.mdc
└── 035-core-enterprise-readiness.mdc
```

### Stack/Integration Rules (100-199)

```
.cursor/rules/
├── 110-next-app-router.mdc            # App Router conventions
├── 120-trpc-conventions.mdc           # tRPC patterns
├── 130-drizzle-postgres.mdc            # Drizzle schema and queries
├── 140-stripe-billing.mdc             # Stripe webhooks and billing
├── 150-vercel-platform.mdc            # Vercel runtime and services
├── 160-feature-flags.mdc               # Feature flag usage
├── 170-data-moat.mdc                  # Data moat thesis
├── 180-expansion-revenue.mdc          # Expansion revenue mechanism
│
├── 190-ai-tool-integrations.mdc       # General AI tool integration
├── 195-ai-workflow-orchestration.mdc
├── 196-ai-quality-control.mdc
├── 197-ai-cost-management.mdc
├── 198-ai-prompt-templates.mdc
└── 199-ai-error-handling.mdc
```

### Playbooks (200-299)

```
.cursor/rules/
├── 200-playbook-insight-validation.mdc
├── 205-playbook-moat-mrr-validation.mdc
├── 207-playbook-portfolio-management.mdc
├── 210-playbook-new-feature.mdc
├── 220-playbook-bugfix.mdc
├── 230-playbook-refactor.mdc
├── 240-playbook-a11y-audit.mdc
├── 250-playbook-billing-change.mdc
└── 260-playbook-multi-tenancy.mdc
```

## Projects Folder

**Location**: `/projects/`

All project-specific documents are now organized by project idea in dedicated folders.

```
projects/
├── README.md                           # Projects folder documentation
│
├── <project-slug>/                     # One folder per project idea
│   ├── README.md                       # Project overview and status
│   │
│   ├── NICHE-INTEL-<project-slug>.md   # Stage 1: Niche Intelligence
│   ├── PAIN-SIGNALS-<project-slug>.md # Stage 2: Pain Signal Analysis
│   ├── JTBD-<project-slug>.md         # Stage 3: Persona & JTBD
│   ├── OPPORTUNITY-<project-slug>.md  # Stage 4: Opportunity & Moat
│   ├── DISCOVERY-DEMO-<project-slug>.md # Discovery workflow summary
│   │
│   ├── INSIGHT-<project-slug>.md      # Insight brief
│   ├── PORTFOLIO-SCORE-<project-slug>.md # Portfolio score
│   │
│   ├── VALIDATION-PLAN-<project-slug>.md # Validation plan
│   ├── LANDING-<project-slug>.md      # Landing page
│   ├── DISTRIBUTION-<project-slug>.md # Distribution map
│   ├── PRICING-TEST-<project-slug>.md # Pricing tests
│   │
│   ├── PRD-<project-slug>.md          # Product Requirement Document
│   ├── MOAT-<project-slug>.md         # Moat strategy
│   └── RETENTION-<project-slug>.md    # Retention architecture
│
└── [other project folders...]
```

**Examples**:
- `projects/enterprise-design-system-startups/` - All documents for Enterprise Design System
- `projects/real-estate-investor-flipper-platform/` - All documents for Real Estate Investor Platform
- `projects/amazon-fba-seller-intelligence/` - All documents for Amazon FBA tool

## Complete Folder Structure

```
/
├── .cursor/
│   └── rules/                         # Cursor rule files (.mdc)
│       ├── README.md
│       ├── 001-philosophy.mdc
│       ├── 040-demand-validation.mdc
│       ├── 050-manus-integration.mdc
│       ├── 060-elevenlabs-integration.mdc
│       ├── 070-midjourney-canva.mdc
│       ├── 080-distribution.mdc
│       ├── 100-prd.mdc
│       ├── 110-adr.mdc
│       ├── 120-test-plan.mdc
│       ├── 130-implementation.mdc
│       └── [other rule files...]
│
├── projects/                          # Project-specific documents (NEW)
│   ├── README.md
│   └── <project-slug>/               # One folder per project
│       ├── README.md
│       ├── NICHE-INTEL-*.md
│       ├── PAIN-SIGNALS-*.md
│       ├── JTBD-*.md
│       ├── OPPORTUNITY-*.md
│       ├── INSIGHT-*.md
│       ├── PORTFOLIO-SCORE-*.md
│       ├── VALIDATION-PLAN-*.md
│       ├── LANDING-*.md
│       ├── DISTRIBUTION-*.md
│       ├── PRICING-TEST-*.md
│       ├── PRD-*.md
│       ├── MOAT-*.md
│       └── RETENTION-*.md
│
└── docs/
    ├── validation/                     # Validation templates/examples
    │   └── README.md
    │
    ├── discovery/                      # Discovery templates/examples (legacy)
    │   └── README.md
    │
    ├── product/                        # Product templates/examples (legacy)
    │   └── [empty or examples only]
    │
    ├── research/                       # Research templates/examples
    │   └── [templates/examples]
    │
    ├── engineering/                    # Engineering documents
    │   └── ADR/
    │       └── NNNN-*.md
    │
    ├── ux/                             # UX documents
    │   ├── IA-*.md
    │   └── user-flows-*.md
    │
    ├── agents/                         # Agent definitions
    │   ├── demand-validator.md
    │   ├── landing-builder.md
    │   ├── distribution-operator.md
    │   ├── pricing-tester.md
    │   └── [other agents...]
    │
    └── prompts/                        # Prompt templates
        ├── manus/
        ├── chatgpt/
        ├── elevenlabs/
        └── visual/
```

## File Naming Conventions

### Validation Documents
- Pattern: `[TYPE]-[idea-slug].md`
- Example: `VALIDATION-PLAN-enterprise-design-system.md`

### Product Documents
- Pattern: `[TYPE]-[idea-slug].md`
- Example: `PRD-enterprise-design-system.md`

### Research Documents
- Pattern: `[TYPE]-[idea-slug].md`
- Example: `PERSONA-enterprise-design-system.md`

### Engineering Documents
- Pattern: `NNNN-[short-name].md`
- Example: `0001-template.md`, `0002-multi-tenancy-isolation.md`

### Rule Files
- Pattern: `NNN-[name].mdc`
- Example: `001-philosophy.mdc`, `100-prd.mdc`

## Migration Note

**Important**: All documents are organized by phase and idea slug (per Rule 003).

- **Discovery documents**: `/docs/discovery/` (NICHE-INTEL, PAIN-SIGNALS, JTBD, OPPORTUNITY, REDTEAM)
- **Validation documents**: `/docs/validation/` (VALIDATION-PLAN, LANDING, DISTRIBUTION, PRICING-TEST, CREATIVE-BATCH, RESULTS)
- **Build documents**: `/docs/product/`, `/docs/adr/`, `/docs/engineering/`, `/docs/analytics/`, `/docs/ux/`
- **Orchestrator outputs**: `/docs/ideas/<idea-slug>/` (CHECKLIST, SUMMARY)

All documents for the same idea use the same `<idea-slug>` identifier.

## See Also

- `projects/README.md` - Projects folder documentation
- `docs/validation/README.md` - Validation folder documentation
- `.cursor/rules/README.md` - Rules folder documentation
- `docs/AGENTS.md` - Agent orchestration manual
- `docs/GETTING_STARTED.md` - Getting started guide

