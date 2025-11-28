# Complete Agent Roster

> All agents in the SaaS Starter multi-agent system (30 total)

## Agent List (30 Total)

**Note**: This roster includes the Orchestrator and all specialist agents. See `docs/agents/orchestrator.md` for the master orchestrator that runs the complete pipeline.

### Strategy & Validation Agents (1-5)

1. **Insight & Narrative Strategist** (`docs/agents/insight-strategist.md`)
   - **Mission**: Transform raw ideas into validated insights, narratives, and emotional hooks
   - **Outputs**: Unfair Insight documents in `/docs/product`
   - **Key**: Isenberg-critical, validates demand before build

2. **Product Strategist** (`docs/agents/product-strategist.md`)
   - **Mission**: Create Isenberg-style Demand-Driven PRDs
   - **Outputs**: PRDs in `/docs/product`
   - **Key**: Narrative + desirability-first, validates before buildability

3. **Moat & MRR Strategist** (`docs/agents/moat-mrr-strategist.md`) ← **NEW**
   - **Mission**: Convert niche PMF into defensibility + expansion revenue plan
   - **Outputs**: Moat & MRR Strategy documents in `/docs/product`
   - **Key**: Designs moats, retention thesis, expansion revenue before code

4. **Retention Architect** (`docs/agents/retention-architect.md`) ← **NEW**
   - **Mission**: Design retention architecture BEFORE code
   - **Outputs**: Retention Architecture documents in `/docs/product`
   - **Key**: Activation paths, habit loops, notification strategy, collaboration loops, renewal triggers

5. **Portfolio Prioritizer** (`docs/agents/portfolio-prioritizer.md`) ← **NEW**
   - **Mission**: Score and prioritize product ideas using portfolio theory
   - **Outputs**: Portfolio scoring documents in `/docs/portfolio`
   - **Key**: Manages multiple bets, allocates resources by expected value, kills fast

### Research & Design Agents (6-9)

6. **Market Scanner** (`docs/agents/market-scanner.md`)
   - **Mission**: Validate market through community-first analysis
   - **Outputs**: Market scans in `/docs/research`
   - **Key**: Community-first, not competitor-first

7. **UX Researcher** (`docs/agents/ux-researcher.md`)
   - **Mission**: Produce scripts/plans to validate assumptions
   - **Outputs**: Scripts/synthesis in `/docs/research`
   - **Key**: Identity + narrative-aligned

8. **IA Designer** (`docs/agents/ia-designer.md`)
   - **Mission**: Map navigation, flows, edge cases, interaction details
   - **Outputs**: IA/flows in `/docs/ux`
   - **Key**: Emotion → interaction

9. **Accessibility Agent** (`docs/agents/accessibility.md`)
   - **Mission**: Audit or preflight designs/code for WCAG 2.2 AA
   - **Outputs**: Accessibility audits in `/docs/ux`
   - **Key**: WCAG 2.2 AA baseline

### Engineering Agents (10-12)

10. **Engineering Architect** (`docs/agents/engineering-architect.md`)
    - **Mission**: Decide structure, data model, and tradeoffs via ADR
    - **Outputs**: ADRs + schemas in `/docs/engineering`
    - **Key**: Boring defaults, tenancy scoping, runtime choice

11. **Test Engineer** (`docs/agents/test-engineer.md`)
    - **Mission**: Define strategy + generate tests that match specs
    - **Outputs**: Test plans + suites in `/tests` and `/e2e`
    - **Key**: Tests keyed to acceptance criteria, invariants explicit

12. **Implementer** (`docs/agents/implementer.md`)
    - **Mission**: Build the feature to PRD/ADR/tests, with small diffs
    - **Outputs**: Code in `/src/features` + `/app` routes
    - **Key**: Feature module boundaries, small diffs, MVP-first

## Agent Workflow

### Complete Flow: Insight → Validation → Moat → Retention → Monetization → Build

```
Phase 1: Portfolio & Insight
1. Portfolio Prioritizer → Score idea
2. Insight & Narrative Strategist → Unfair Insight

Phase 2: Validation
3. Product Strategist → Narrative + Desirability PRD
4. Market Scanner → Community Heat + Moat
5. Run Validation Tests
6. Green-light decision (validation)

Phase 3: Moat & Retention
7. Moat & MRR Strategist → Moat map + Data Moat Thesis + Expansion Revenue Strategy
8. Retention Architect → Activation path + Habit loops + Notification strategy + Collaboration loops + Renewal triggers
9. Green-light decision (moat + retention)

Phase 4: Monetization
10. Product Strategist → Monetization Wedge + Expansion Revenue Strategy (finalize)
11. Green-light decision (monetization)

Phase 5: Design
12. UX Researcher → Scripts/synthesis
13. IA Designer → flows/edge cases

Phase 6: Build
14. Engineering Architect → ADR + schema + router plan
15. Test Engineer → test plan + stubs
16. Implementer → build (small diffs, MVP-first)
17. Accessibility Agent → a11y audit + fix loop
18. Test Engineer → test verify
19. Product Strategist → PRD acceptance check
```

## Agent Categories

### Strategy Layer (1-5)
Focus on **what to build** and **why it will succeed**:
- Portfolio prioritization
- Insight & narrative
- Product strategy
- Moat & MRR strategy
- Retention architecture

### Research & Design Layer (6-9)
Focus on **who needs it** and **how they'll use it**:
- Market research
- UX research
- Information architecture
- Accessibility

### Engineering Layer (10-12)
Focus on **how to build it** and **how to verify it**:
- Architecture decisions
- Test strategy
- Implementation

## Key Principles

1. **No build until validated**: Strategy agents (1-5) must complete before engineering (10-12)
2. **Retention before code**: Retention Architect (4) designs retention architecture before Implementer (12) builds
3. **Moat before build**: Moat & MRR Strategist (3) designs moats before Engineering Architect (10) designs architecture
4. **Portfolio first**: Portfolio Prioritizer (5) scores ideas before any validation begins
5. **Small diffs**: All agents work incrementally with small, testable changes

## Integration Points

- **Portfolio Prioritizer** → All other agents (scores ideas first)
- **Insight & Narrative Strategist** → Product Strategist (provides insight brief)
- **Product Strategist** → Moat & MRR Strategist (provides PRD)
- **Moat & MRR Strategist** → Retention Architect (provides retention thesis)
- **Retention Architect** → Engineering Architect (provides retention architecture)
- **Engineering Architect** → Test Engineer + Implementer (provides ADR + schema)
- **All agents** → Accessibility Agent (all outputs must be accessible)

## See Also

- `AGENTS.md` - Main orchestration manual
- `docs/SYSTEMS.md` - The Four Systems for Building a SaaS Empire
- `docs/agents/*.md` - Detailed agent prompts
- `.cursor/rules/` - Project guardrails and playbooks

