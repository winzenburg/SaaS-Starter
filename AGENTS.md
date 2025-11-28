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

### Core Agents (12)
1. **Demand-Validator** ← NEW (AI-enhanced) — validation plans in `/docs/validation`
2. **Landing-Builder** ← NEW (AI-enhanced) — landing pages in `/docs/validation` + `/app/(marketing)`
3. **Distribution-Operator** ← NEW (AI-enhanced) — distribution strategy in `/docs/validation`
4. **Pricing-Tester** ← NEW (AI-enhanced) — pricing tests in `/docs/validation`
5. **Insight & Narrative Strategist** — insights + narratives in `/docs/product`
6. **Product Strategist** (narrative + desirability-first) — PRDs in `/docs/product`
7. **Moat & MRR Strategist** — Moat & MRR strategy in `/docs/product`
8. **Retention Architect** — retention architecture in `/docs/product`
9. **Portfolio Prioritizer** — portfolio scoring and prioritization in `/docs/portfolio`
10. **Market Scanner** (community-first) — market scans in `/docs/research`
11. **UX Researcher** (identity + narrative-aligned) — scripts/synthesis in `/docs/research`
12. **IA Designer** (emotion → interaction) — IA/flows in `/docs/ux`

### AI Validation Agents (4 NEW)
10. **Manus Narrative Agent** ← NEW — Narrative, competitor analysis, personas (Manus.im)
11. **ChatGPT Reasoning Agent** ← NEW — Reasoning, refinement, ideation (ChatGPT)
12. **ElevenLabs Voice Agent** ← NEW — Voice content for demos and validation (ElevenLabs)
13. **Visual Asset Agent** ← NEW — Hero images, concept visuals (Midjourney/Canva)

### Execution Agents (4)
14. **Accessibility Agent** — audits in `/docs/ux`
15. **Engineering Architect** — ADRs + schemas in `/docs/engineering`
16. **Test Engineer** — test plans + suites in `/tests` and `/e2e`
17. **Implementer** — code in `/src/features` + `/app` routes

## Default Workflows

- **Portfolio management**: `.cursor/rules/207-playbook-portfolio-management.mdc` (manage multiple product bets, prioritize by expected value, kill fast)
- **Insight validation** (Heat Filter): `.cursor/rules/200-playbook-insight-validation.mdc` (must pass before moat/MRR validation, requires portfolio scoring)
  - **Mental Model**: "Do a tribe of real humans urgently want this?" (Proof: waitlists, DMs, preorders, repeat usage)
- **Moat & MRR validation** (Durability Filter): `.cursor/rules/205-playbook-moat-mrr-validation.mdc` (must pass before new feature)
  - **Mental Model**: "Will this still matter and keep paying 12–36 months from now?" (Proof: recurring job, budgeted buyer, retention loop, moat map)
- **New feature**: `.cursor/rules/210-playbook-new-feature.mdc` (requires portfolio prioritization + insight validation + moat/MRR validation)
- **Bugfix**: `.cursor/rules/220-playbook-bugfix.mdc`
- **Refactor**: `.cursor/rules/230-playbook-refactor.mdc`

**Two-Filter Pipeline**: Heat gets you in. Durability makes it a real SaaS business.

## Rule System

### Layer A: Core Guardrails (000-099)
Always active. Short, enforceable constraints.
- `000-core-idea-criteria.mdc` - Isenberg's filters (identity-level pain, recurring need, distribution wedge, insight+community match)
- `001-core-architecture.mdc` - Architecture principles, feature modules
- `002-core-compounding-niche-score.mdc` - Compounding niche evaluation (NCS scoring)
- `003-core-data-moat-planning.mdc` - Data moat planning (required before engineering)
- `004-core-expansion-revenue.mdc` - Expansion revenue architecture (required before engineering)
- `005-core-testing.mdc` - Test requirements
- `006-core-frequency-modeling.mdc` - JTBD frequency modeling (required before engineering)
- `007-core-portfolio-kill-greenlight.mdc` - Portfolio kill/greenlight criteria (required before validation/engineering)
- `010-core-ux-a11y.mdc` - UX and accessibility baseline
- `015-core-security.mdc` - Security fundamentals
- `020-core-observability.mdc` - Observability requirements
- `025-core-session-hygiene.mdc` - Planning and diff management
- `027-core-adr-trigger.mdc` - When to write ADRs
- `027-core-desirability-first.mdc` - No build until validated
- `030-core-style.mdc` - Code style
- `035-core-enterprise-readiness.mdc` - Enterprise-readiness primitives (audit logs, RBAC, export/delete, rate limiting)

### Layer B: Stack/Integration Rules (100-199)
Always active. Precise conventions for Next.js, tRPC, Drizzle, Stripe, Vercel, and AI tools.
- `110-next-app-router.mdc` - App Router conventions
- `120-trpc-conventions.mdc` - tRPC patterns
- `130-drizzle-postgres.mdc` - Drizzle schema and queries
- `140-stripe-billing.mdc` - Stripe webhooks and billing
- `150-vercel-platform.mdc` - Vercel runtime and services
- `160-feature-flags.mdc` - Feature flag usage
- `170-data-moat.mdc` - Data moat thesis and data capture instrumentation
- `180-expansion-revenue.mdc` - Expansion revenue mechanism design
- `190-ai-tool-integrations.mdc` - AI tool integration patterns (Manus, ChatGPT, ElevenLabs, Visual)
- `191-manus-integration.mdc` - Manus.im specific patterns
- `192-chatgpt-integration.mdc` - ChatGPT specific patterns
- `193-elevenlabs-integration.mdc` - ElevenLabs specific patterns
- `194-visual-asset-integration.mdc` - Midjourney/Canva patterns
- `195-ai-workflow-orchestration.mdc` - Orchestrating multiple AI tools
- `196-ai-quality-control.mdc` - Quality gates for AI outputs
- `197-ai-cost-management.mdc` - Budget tracking and optimization
- `198-ai-prompt-templates.mdc` - Reusable prompt templates
- `199-ai-error-handling.mdc` - Error handling patterns

### Layer C: Playbooks (200-299)
Invoked when needed. Detailed "how to do X" guides.
- `200-playbook-insight-validation.mdc` - Greg's pre-build validation process (Isenberg Edition) - **Must pass before moat/MRR validation**
- `205-playbook-moat-mrr-validation.mdc` - Moat & MRR validation (defensibility + monetization) - **Must pass before new feature**
- `207-playbook-portfolio-management.mdc` - Portfolio management (multiple bets, prioritization, kill fast) - **Must score before validation, must prioritize before engineering**
- `210-playbook-new-feature.mdc` - Feature development workflow (requires portfolio prioritization + insight validation + moat/MRR validation)
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

## AI Tool Integrations

This system integrates 5 AI tools into agent workflows:

1. **Manus.im** - Narrative, competitor analysis, personas
2. **ChatGPT** - Reasoning, refinement, accelerated ideation
3. **ElevenLabs** - Voice content for demos and validation
4. **Midjourney** - Hero images and concept visuals
5. **Canva** - Marketing materials and templates

See `docs/AI-INTEGRATION-GUIDE.md` for complete integration guide.

## See Also

- `docs/AI-INTEGRATION-GUIDE.md` - **Complete AI integration guide** (start here for AI tools)
- `docs/FINAL_SYSTEM_SUMMARY.md` - **Complete 16-agent product creation engine overview** (start here)
- `docs/SYSTEMS.md` - **The Four Systems for Building a SaaS Empire** (consolidated framework)
- `docs/AGENT_ROSTER.md` - Complete agent roster with workflow and integration points
- `docs/VERIFICATION.md` - System verification confirming all 7 blocks integrated
- `.cursor/rules/` - Project guardrails and playbooks (including AI integration rules 190-199)
- `docs/agents/` - Agent role prompts (including 4 new AI validation agents)
- `docs/prompts/` - Ready-to-use prompt templates for AI tools
- `docs/agent-packs/` - Domain-specific agent configurations
- `docs/ARCHITECTURE.md` - Architecture patterns
- `docs/CONTRIBUTING.md` - Development guidelines
- `docs/adr/` - Architecture Decision Records
