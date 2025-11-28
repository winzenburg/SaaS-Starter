# Unified Factory Flow

> Clean operating model: Discovery → Validation → Build → Scale

## One-Line Lanes for Every Tool (No Overlap)

### System of Record / Execution
- **Cursor 2.1**: repo, rules, agents, docs, code, checklists, architectural decisions

### Narrative + Market Truth
- **Manus**: niche worldview, pain language, JTBD seeds, competitor gaps, pricing expectations, distribution hooks

### Reasoning + Synthesis
- **ChatGPT + Claude**: refinement, clustering, counter-arguments, alternative framings, second-opinion QA
  - **Rule of thumb**: ChatGPT for breadth/iteration; Claude for depth/critique/editing

### Automation "Do Stuff in the World"
- **Lindy AI**: outreach sequences, waitlist nurture, scheduling, logging, daily briefs
- **n8n**: only if you hit a Lindy limitation

### Identity / Multi-Tenancy
- **Clerk**: auth, sessions, orgs/roles, onboarding gates
- **Supabase**: Postgres app data, RLS enforcement, storage, edge functions / cron / webhooks

### Analytics & Experiments
- **PostHog**: events, funnels, retention, session replay, feature flags & A/B tests

### Creative Batching
- **Glif**: high-volume draft creatives & micro-tools
- **Midjourney / Canva**: polish or style-specific visual output

### Voice Trust + Demos
- **ElevenLabs**: founder intro, persona voice, demo narration, outreach VO

**That's it. Each tool has a single purpose and a clear boundary.**

## Unified Factory Flow

### Stage A — Discovery (24h sprint)

**Goal**: Understand niche, pain, persona, and opportunity before validation

**Steps**:

1. **Manus generates Discovery Pack**
   - Niche narrative
   - Pain language dictionary
   - JTBD seeds
   - Competitor gaps
   - Pricing expectations
   - Distribution hooks

2. **ChatGPT/Claude refine into "Validation Pack"**
   - ChatGPT: Clustering, light synthesis, variant generation
   - Claude: Critique, polish, consistency audit (if needed)

3. **Cursor Discovery Agents produce**:
   - `@Niche-Intelligence-Agent` → `NICHE-INTEL-<idea>.md`
   - `@Pain-Signal-Agent` → `PAIN-SIGNALS-<idea>.md`
   - `@JTBD-Agent` → `JTBD-<idea>.md`
   - `@Opportunity-Moat-Agent` → `OPPORTUNITY-<idea>.md`

4. **Decision gate**: Score ≥ 8 moves to validation
   - Opportunity Score calculated
   - If ≥ 8.0/10 → Proceed to Validation
   - If < 8.0/10 → Pivot or Kill

**Outputs**: Complete discovery package in `projects/<idea>/`

### Stage B — Demand Validation (48–72h)

**Goal**: Validate demand before building

**Steps**:

5. **Cursor Validation Agents produce**:
   - `@Demand-Validator` → `VALIDATION-PLAN-<idea>.md` + thresholds
   - `@Landing-Builder` → `LANDING-<idea>.md` (copy)
   - `@Distribution-Operator` → `DISTRIBUTION-<idea>.md`
   - `@Pricing-Tester` → `PRICING-TEST-<idea>.md`
   - `@Creative-Batch-Operator` → `CREATIVE-BATCH-<idea>.md` (Glif workflows)

6. **Glif batches ads/heroes/socials**
   - Execute Glif workflows from Creative-Batch-Operator
   - Generate high-volume draft creatives
   - Assets saved to `/docs/validation/assets/<idea>/`

7. **Midjourney/Canva polish best variants**
   - Select best Glif outputs
   - Polish with Midjourney/Canva
   - Final assets for landing page and ads

8. **ElevenLabs makes founder/feature VO**
   - Founder intro audio
   - Demo narration
   - Outreach voice content

9. **Lindy runs**:
   - **Outreach Sequencer**: Automated DM/email outreach
   - **Waitlist Segment + Nurture**: Waitlist intake and nurturing
   - **Daily Validation Brief**: Metrics collection and reporting

10. **Decision gate**: Proceed / Pivot / Kill based on thresholds
    - Compare results to validation thresholds
    - If Proceed → Move to Build
    - If Pivot → Adjust and re-validate
    - If Kill → Document learnings and archive

**Outputs**: Complete validation package with test results

### Stage C — Build (only after Proceed)

**Goal**: Build feature with validated demand

**Steps**:

11. **Cursor Build Agents produce**:
    - `@Product-Strategist` → `PRD-<feature>.md`
    - `@Engineering-Architect` → `ADR-<feature>.md`
    - `@Analytics-Architect` → `EVENTS-<feature>.md` + `FUNNEL-<feature>.md` (PostHog)
    - `@Data-Platform-Architect` → `DATA-MODEL-<feature>.md` + `RLS-<feature>.md` + `EDGE-FN-<feature>.md` (Supabase)
    - `@Auth-Onboarding-Architect` → `AUTH-<feature>.md` + `ONBOARDING-<feature>.md` (Clerk)
    - `@Test-Engineer` → Test plan
    - `@IA-Designer` → User flows and wireframes
    - `@UX-Researcher` → Research scripts (if needed)

12. **Implementer ships behind PostHog flags → release**
    - Implement feature following PRD/ADR
    - Ship behind PostHog feature flag
    - Gradual rollout via PostHog
    - Monitor via PostHog analytics

**Outputs**: Working feature with analytics, auth, data model, tests

### Stage D — Scale

**Goal**: Grow and optimize based on data

**Steps**:

13. **PostHog drives retention + activation loops**
    - Track events and funnels
    - Identify drop-off points
    - Optimize activation paths
    - Run A/B tests via feature flags

14. **Lindy automates lifecycle comms**
    - Onboarding sequences
    - Re-engagement campaigns
    - Churn prevention
    - Lifecycle automation

15. **Claude/ChatGPT help iterate copy & growth loops**
    - ChatGPT: Rapid iteration on copy variants
    - Claude: Polish and critique growth strategies
    - Refine messaging based on data

16. **Glif/MJ/Canva/ElevenLabs keep creative velocity high**
    - Glif: Batch new creative variants
    - Midjourney/Canva: Polish visuals
    - ElevenLabs: Update voice content

**Outputs**: Optimized product with growth loops and high creative velocity

## Tool Boundaries (No Overlap)

### Cursor 2.1
- **System of record**: All docs, code, decisions
- **Execution**: Agent orchestration, code generation
- **NOT used for**: Narrative generation, automation, analytics

### Manus
- **Narrative + market truth**: Niche, pain, JTBD, competitors, pricing, hooks
- **NOT used for**: Code, docs, automation, analytics

### ChatGPT + Claude
- **Reasoning + synthesis**: Refinement, clustering, critique, polish
- **NOT used for**: Code generation, automation, analytics tracking

### Lindy AI
- **Automation**: Outreach, nurture, scheduling, logging
- **NOT used for**: Core product logic, source-of-truth docs, deterministic CI/CD

### Clerk
- **Identity**: Auth, sessions, orgs, roles, onboarding gates
- **NOT used for**: Application data, analytics, business logic

### Supabase
- **Data platform**: Postgres, RLS, storage, edge functions
- **NOT used for**: Primary auth (if Clerk active), analytics, business logic

### PostHog
- **Analytics**: Events, funnels, retention, feature flags
- **NOT used for**: Core product logic, source-of-truth docs, system-of-record decisions

### Glif
- **Creative batching**: High-volume draft creatives, micro-tools
- **NOT used for**: Core product logic, system-of-record workflows, stable versioning

### Midjourney / Canva
- **Visual polish**: Style-specific visual output
- **NOT used for**: Code, docs, automation

### ElevenLabs
- **Voice content**: Founder intro, persona voice, demo narration
- **NOT used for**: Code, docs, automation

## Integration Points

### Discovery → Validation
- Discovery outputs feed validation planning
- Opportunity Score ≥ 8.0 required to proceed
- Manus narrative used in landing copy and distribution

### Validation → Build
- Validation results inform PRD
- Validation thresholds become success metrics
- Landing copy informs onboarding flow

### Build → Scale
- PostHog events track feature adoption
- Analytics inform growth loop design
- Feature flags enable gradual rollout

## Quality Gates

**Each stage must pass quality gates before proceeding**:

- **Discovery**: All 4 discovery docs complete, Opportunity Score ≥ 8.0
- **Validation**: All validation tests pass thresholds, Proceed decision
- **Build**: PRD, ADR, analytics, data model, auth, tests complete
- **Scale**: Feature shipped, analytics tracking, growth loops active

## Summary

**Unified Factory Flow**: Discovery (24h) → Validation (48-72h) → Build (after Proceed) → Scale

**Tool Boundaries**: Each tool has a single purpose, no overlap

**Decision Gates**: Score ≥ 8 (Discovery), Thresholds passed (Validation), Proceed decision (Build)

**This creates a predictable, repeatable factory for building SaaS products.**

