# Master Orchestrator Prompt

> One prompt to run the entire SaaS Factory pipeline

## Usage

Copy and paste this prompt into Cursor, replacing the placeholders with your idea details.

---

```
@Orchestrator

Run the full SaaS Factory pipeline for IDEA:

**Name:**
<idea name>

**Description:**
<1–3 sentences>

**Context:**
- We are using the Global Orchestration Rule (000-orchestration.mdc).
- Tools available: Manus, ChatGPT, Claude, Cursor, Lindy, Glif, Midjourney, Canva, ElevenLabs, Clerk, Supabase, PostHog.
- Cursor is system of record.

**Instructions:**

1) Start Discovery Sprint.

2) If Manus pack is missing, generate the Manus seed prompt I should run and specify where I should save the output.

3) Call each discovery agent in order and generate their docs.

4) Produce Discovery Score + Proceed/Pivot/Kill recommendation.

5) If Proceed, generate Validation phase docs + Lindy specs.

6) Define exact validation thresholds and kill/pivot rules.

7) If validation likely Proceed, generate the Build phase doc set and implementation handoff checklist.

**Deliverables:**

- /docs/ideas/<idea-slug>/CHECKLIST.md
- /docs/ideas/<idea-slug>/SUMMARY.md
- All required docs in their standard folders.

**Be strict on gates and highlight any weak signals or assumptions.**
```

---

## Example Usage

```
@Orchestrator

Run the full SaaS Factory pipeline for IDEA:

**Name:**
Enterprise Design System for Startups

**Description:**
A design system platform that helps startups build consistent, scalable design systems without hiring a full design team. Provides component libraries, design tokens, documentation, and integration tools.

**Context:**
- We are using the Global Orchestration Rule (000-orchestration.mdc).
- Tools available: Manus, ChatGPT, Claude, Cursor, Lindy, Glif, Midjourney, Canva, ElevenLabs, Clerk, Supabase, PostHog.
- Cursor is system of record.

**Instructions:**

1) Start Discovery Sprint.

2) If Manus pack is missing, generate the Manus seed prompt I should run and specify where I should save the output.

3) Call each discovery agent in order and generate their docs.

4) Produce Discovery Score + Proceed/Pivot/Kill recommendation.

5) If Proceed, generate Validation phase docs + Lindy specs.

6) Define exact validation thresholds and kill/pivot rules.

7) If validation likely Proceed, generate the Build phase doc set and implementation handoff checklist.

**Deliverables:**

- /docs/ideas/enterprise-design-system-startups/CHECKLIST.md
- /docs/ideas/enterprise-design-system-startups/SUMMARY.md
- All required docs in their standard folders.

**Be strict on gates and highlight any weak signals or assumptions.**
```

---

## What This Prompt Does

This prompt invokes the **Orchestrator agent** to run the complete SaaS Factory pipeline:

### Phase A — Discovery (24h Sprint)
- Generates Manus seed prompt if needed
- Calls all 5 discovery agents in sequence:
  - @Niche-Intelligence-Agent → NICHE-INTEL
  - @Pain-Signal-Agent → PAIN-SIGNALS
  - @JTBD-Agent → JTBD
  - @Opportunity-Moat-Agent → OPPORTUNITY
  - @Red-Team-Strategist → REDTEAM
- Calculates Discovery Score (0-10)
- Gate: Score ≥ 8.0 to proceed

### Phase B — Validation (48-72h)
- Calls all 5 validation agents in sequence:
  - @Demand-Validator → VALIDATION-PLAN
  - @Landing-Builder → LANDING
  - @Distribution-Operator → DISTRIBUTION
  - @Pricing-Tester → PRICING-TEST
  - @Creative-Batch-Operator → CREATIVE-BATCH
- Outputs 3 Lindy automation specs
- Creates Validation Dashboard template
- Defines exact validation thresholds and kill/pivot rules
- Gate: Thresholds pass to proceed

### Phase C — Build (Only if Proceed)
- Calls all 6 build agents in sequence:
  - @Product-Strategist → PRD
  - @Engineering-Architect → ADR
  - @Auth-Onboarding-Architect → Clerk plan
  - @Data-Platform-Architect → Supabase plan
  - @Analytics-Architect → PostHog plan
  - @Test-Engineer → Test plan
- Hands off to @Implementer for implementation
- Requires @Accessibility-Agent audit

## Outputs

### 1. Checklist File
**Location**: `/docs/ideas/<idea-slug>/CHECKLIST.md`

Single source of truth tracking progress through all phases.

### 2. Summary File
**Location**: `/docs/ideas/<idea-slug>/SUMMARY.md`

Final rollup with Discovery Score, validation results, build status, and final Proceed/Pivot/Kill decision.

### 3. All Phase Documents

**Discovery docs** (`/docs/discovery/`):
- NICHE-INTEL-<idea-slug>.md
- PAIN-SIGNALS-<idea-slug>.md
- JTBD-<idea-slug>.md
- OPPORTUNITY-<idea-slug>.md
- REDTEAM-<idea-slug>.md

**Validation docs** (`/docs/validation/`):
- VALIDATION-PLAN-<idea-slug>.md
- LANDING-<idea-slug>.md
- DISTRIBUTION-<idea-slug>.md
- PRICING-TEST-<idea-slug>.md
- CREATIVE-BATCH-<idea-slug>.md
- RESULTS-<idea-slug>.md

**Lindy specs** (`/docs/automation/lindy/`):
- LINDY-SPEC-WAITLIST-NURTURE-<idea-slug>.md
- LINDY-SPEC-OUTREACH-SEQUENCER-<idea-slug>.md
- LINDY-SPEC-DAILY-BRIEF-<idea-slug>.md

**Build docs** (if Proceed):
- PRD-<feature-slug>.md (`/docs/product/`)
- ADR-<feature-slug>.md (`/docs/adr/`)
- AUTH-<feature-slug>.md (`/docs/engineering/`)
- DATA-MODEL-<feature-slug>.md (`/docs/engineering/`)
- EVENTS-<feature-slug>.md (`/docs/analytics/`)
- Test plan (`/docs/engineering/`)

## Gates Enforced

The Orchestrator will strictly enforce:

1. **Discovery Gate**: Score ≥ 8.0/10 required to proceed to validation
2. **Validation Gate**: All thresholds must pass to proceed to build
3. **Feature Flag Gate**: All builds must ship behind PostHog flags
4. **Multi-Tenancy Gate**: Clerk roles + Supabase RLS required

## Weak Signals & Assumptions

The Orchestrator will highlight:
- Weak market signals (low niche viability, unclear pain)
- Unvalidated assumptions (untested pricing, unproven distribution)
- Competitive risks (strong incumbents, low moat potential)
- Technical risks (complex implementation, unclear architecture)

## See Also

- `docs/agents/orchestrator.md` - Complete Orchestrator agent definition
- `.cursor/rules/000-orchestration.mdc` - Global Orchestration Rule
- `.cursor/rules/003-doc-organization.mdc` - Document organization rules

