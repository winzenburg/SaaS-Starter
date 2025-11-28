# Templates

> Production-grade templates for the SaaS Factory pipeline

## Templates

### Checklist Template

**CHECKLIST-TEMPLATE.md** - Master checklist for tracking progress through the entire SaaS Factory pipeline.

### Summary Template

**SUMMARY-TEMPLATE.md** - Executive summary template for final rollup and decision documentation.

#### Usage

The Orchestrator agent will automatically:
1. Copy this template to `/docs/ideas/<idea-slug>/SUMMARY.md`
2. Populate all sections with data from discovery, validation, and build phases
3. Update verdicts at each gate (Discovery, Validation, Build, Final)
4. Include links to all canonical documents in Appendices

#### Structure

The summary includes:

- **Idea Snapshot** (Section 1): One-liner, niche, JTBD, opportunity
- **Discovery Summary** (Section 2): Narrative, insights, pains, JTBD, moat, red-team, score, verdict
- **Validation Summary** (Section 3): Plan, landing, pricing, creative, Lindy, results, verdict
- **Build Summary** (Section 4): PRD, ADR, auth, data, analytics, tests, a11y, verdict
- **Scaling Summary** (Section 5): Activation, retention, growth loops, automations
- **Final Verdict** (Section 6): Decision, reasons, learnings, next steps
- **Appendices** (Section 7): Links to all canonical documents

### Usage

The Orchestrator agent will automatically:
1. Copy this template to `/docs/ideas/<idea-slug>/CHECKLIST.md`
2. Populate idea metadata
3. Update checkboxes as each phase completes
4. Track gate decisions (Proceed/Pivot/Kill)

### Structure

The checklist includes:

- **Idea Metadata** (Section 0): Auto-filled by Orchestrator
- **Discovery Sprint** (Section A): A1-A7 (Narrative, Niche, Pain, JTBD, Opportunity, Red-Team, Score)
- **Demand Validation** (Section B): B1-B8 (Validation Plan, Landing, Distribution, Pricing, Creative, Lindy, Results, Gate)
- **Build Phase** (Section C): C1-C9 (PRD, ADR, Auth, Data, Analytics, Tests, Implementation, A11y, Gate)
- **Scale Phase** (Section D): D1-D3 (PostHog, Lindy, Growth)
- **Final Summary** (Section E): Summary and decision

### Integration

- **Orchestrator Agent**: Uses this template to create idea-specific checklists
- **Rule 000**: Orchestration rule requires checklist maintenance
- **Rule 003**: Document organization rule defines checklist location

## See Also

- `docs/agents/orchestrator.md` - Orchestrator agent definition
- `.cursor/rules/000-orchestration.mdc` - Global Orchestration Rule
- `.cursor/rules/003-doc-organization.mdc` - Document Organization Rule

