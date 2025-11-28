# <IDEA NAME> — Master Checklist

**Status:** Not Started / Discovery / Validation / Build / Scaling

**Decision:** TBD (Proceed / Pivot / Kill)

**Updated:** <auto-filled by Orchestrator>

---

## 0. Idea Metadata

- [ ] Idea Name: <auto>
- [ ] One-liner: <auto>
- [ ] Niche / ICP: <auto>
- [ ] Initial JTBD: <auto>

---

# A. DISCOVERY SPRINT (24 HOURS)

### A1. Narrative / Market Truth (Manus → Refined in Cursor)

- [ ] Manus Discovery Pack generated
- [ ] Narrative refined (ChatGPT)
- [ ] Deep critique (Claude)
- [ ] Saved to: `/docs/discovery/NARRATIVE-<idea-slug>.md`

### A2. Niche Intelligence

- [ ] @Niche-Intelligence-Agent complete
- [ ] Saved to `/docs/discovery/NICHE-INTEL-<idea-slug>.md`

### A3. Pain Signals

- [ ] @Pain-Signal-Agent complete
- [ ] Saved to `/docs/discovery/PAIN-SIGNALS-<idea-slug>.md`

### A4. JTBD Mapping

- [ ] @JTBD-Agent complete
- [ ] Saved to `/docs/discovery/JTBD-<idea-slug>.md`

### A5. Opportunity & Moat

- [ ] @Opportunity-Moat-Agent complete
- [ ] Saved to `/docs/discovery/OPPORTUNITY-<idea-slug>.md`

### A6. Red Team (Claude-first)

- [ ] @Red-Team-Strategist critique complete
- [ ] Saved to `/docs/discovery/REDTEAM-<idea-slug>.md`

### A7. Discovery Score

- [ ] Score assigned (0–10): <auto>
- [ ] Rationale saved
- [ ] Gate decision:
  - [ ] Proceed to Validation
  - [ ] Pivot
  - [ ] Kill
- [ ] Summary updated

---

# B. DEMAND VALIDATION (48–72 HOURS)

### B1. Validation Plan + Thresholds

- [ ] @Demand-Validator produced VALIDATION-PLAN
- [ ] Thresholds defined (min CTR, LP CVR, email reply %, etc.)
- [ ] Saved to `/docs/validation/VALIDATION-PLAN-<idea-slug>.md`

### B2. Landing Page

- [ ] @Landing-Builder generated LANDING copy
- [ ] Draft visuals created via Glif
- [ ] Polished in Midjourney/Canva
- [ ] Saved to `/docs/validation/LANDING-<idea-slug>.md`

### B3. Distribution

- [ ] @Distribution-Operator plan created
- [ ] Saved to `/docs/validation/DISTRIBUTION-<idea-slug>.md`

### B4. Pricing Test

- [ ] @Pricing-Tester created pricing tiers + test plan
- [ ] Saved to `/docs/validation/PRICING-TEST-<idea-slug>.md`

### B5. Creative Batch

- [ ] @Creative-Batch-Operator created creative brief
- [ ] Glif creative variants generated
- [ ] Final assets uploaded
- [ ] Saved to `/docs/validation/CREATIVE-BATCH-<idea-slug>.md`

### B6. Lindy Automation Specs

- [ ] Outreach Sequencer
- [ ] Waitlist Nurture Flow
- [ ] Daily Validation Digest
- [ ] Saved to `/docs/automation/lindy/LINDY-SPEC-*-<idea-slug>.md`

### B7. Results Log

- [ ] Daily results logged
- [ ] Saved to `/docs/validation/RESULTS-<idea-slug>.md`

### B8. Validation Decision Gate

- [ ] Pass / Fail thresholds evaluated
- [ ] Decision:
  - [ ] Proceed
  - [ ] Pivot
  - [ ] Kill
- [ ] Final rationale written in Summary file

---

# C. BUILD PHASE (Only if Proceed)

### C1. Product Specification

- [ ] @Product-Strategist created PRD
- [ ] Saved to `/docs/product/PRD-<feature-slug>.md`

### C2. Technical Architecture

- [ ] @Engineering-Architect created ADR
- [ ] Saved to `/docs/adr/ADR-<feature-slug>.md`

### C3. Auth + Onboarding (Clerk)

- [ ] @Auth-Onboarding-Architect created plan
- [ ] Clerk orgs, roles, onboarding gates defined
- [ ] Saved to `/docs/engineering/AUTH-<feature-slug>.md` and `/docs/ux/ONBOARDING-<feature-slug>.md`

### C4. Data Platform / Supabase

- [ ] @Data-Platform-Architect created schema + RLS + Edge plan
- [ ] Saved to `/docs/engineering/DATA-MODEL-<feature-slug>.md`, `/docs/engineering/RLS-<feature-slug>.md`, `/docs/engineering/EDGE-FN-<feature-slug>.md`

### C5. Analytics + Feature Flags (PostHog)

- [ ] @Analytics-Architect created events + funnels + flags
- [ ] Saved to `/docs/analytics/EVENTS-<feature-slug>.md`, `/docs/analytics/FUNNEL-<feature-slug>.md`, `/docs/analytics/EXPERIMENT-<feature-slug>.md`

### C6. Test Plan

- [ ] @Test-Engineer created comprehensive test plan
- [ ] Saved to `/docs/engineering/TEST-PLAN-<feature-slug>.md`

### C7. Implementation

- [ ] @Implementer built feature end-to-end
- [ ] Code reviewed
- [ ] Deployed behind PostHog flag

### C8. Accessibility

- [ ] @Accessibility-Agent audit completed
- [ ] All issues fixed
- [ ] Saved to `/docs/ux/A11Y-AUDIT-<feature-slug>.md`

### C9. Build Gate

- [ ] QA pass
- [ ] Error budgets respected
- [ ] Launch decision: Go / No-Go

---

# D. SCALE PHASE

### D1. PostHog Retention Loops

- [ ] Activation dashboard
- [ ] Retention cohorts
- [ ] Feature adoption KPIs

### D2. Lindy Lifecycle Automations

- [ ] Onboarding support
- [ ] Engagement nudges
- [ ] Churn-risk flows

### D3. Growth Engineering

- [ ] Experiment queue created
- [ ] Flags shipped
- [ ] Iteration notes logged

---

# E. FINAL SUMMARY

- [ ] Summary written to `/docs/ideas/<idea-slug>/SUMMARY.md`
- [ ] Proceed / Pivot / Kill recorded
- [ ] Major learnings documented
- [ ] Next steps defined

