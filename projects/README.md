# Projects (Hub and Spoke Architecture)

This folder contains all project-specific documents organized by project idea.

**Hub**: SaaS Starter (this repository) manages all projects  
**Spokes**: Each project folder is a self-contained project spoke

See `docs/HUB-AND-SPOKE.md` for complete architecture documentation.

## Folder Structure

Each project has its own folder with the following structure:

```
projects/
  <project-slug>/
    NICHE-INTEL-<project-slug>.md          # Stage 1: Niche Intelligence
    PAIN-SIGNALS-<project-slug>.md         # Stage 2: Pain Signal Analysis
    JTBD-<project-slug>.md                 # Stage 3: Persona & JTBD
    OPPORTUNITY-<project-slug>.md          # Stage 4: Opportunity & Moat
    DISCOVERY-DEMO-<project-slug>.md       # Discovery workflow summary
    INSIGHT-<project-slug>.md              # Insight brief (if exists)
    PORTFOLIO-SCORE-<project-slug>.md      # Portfolio score (if exists)
    VALIDATION-PLAN-<project-slug>.md      # Validation plan (if exists)
    LANDING-<project-slug>.md              # Landing page (if exists)
    DISTRIBUTION-<project-slug>.md         # Distribution map (if exists)
    PRICING-TEST-<project-slug>.md         # Pricing tests (if exists)
    PRD-<project-slug>.md                  # PRD (if exists)
    MOAT-<project-slug>.md                 # Moat strategy (if exists)
    RETENTION-<project-slug>.md            # Retention architecture (if exists)
```

## Current Projects

### enterprise-design-system-startups

**Status**: Discovery Complete, Opportunity Score: 8.5/10  
**Recommendation**: Proceed to Validation

**Documents**:
- ✅ NICHE-INTEL-enterprise-design-system-startups.md
- ✅ PAIN-SIGNALS-enterprise-design-system-startups.md
- ✅ JTBD-enterprise-design-system-startups.md
- ✅ OPPORTUNITY-enterprise-design-system-startups.md
- ✅ DISCOVERY-DEMO-enterprise-design-system-startups.md
- ✅ INSIGHT-enterprise-design-system-startups.md
- ✅ PORTFOLIO-SCORE-enterprise-design-system-startups.md

### real-estate-investor-flipper-platform

**Status**: Portfolio Scored  
**Documents**:
- ✅ PORTFOLIO-SCORE-real-estate-investor-flipper-platform.md

### amazon-fba-seller-intelligence

**Status**: Portfolio Scored  
**Documents**:
- ✅ PORTFOLIO-SCORE-amazon-fba-seller-intelligence.md

### ai-meeting-assistant

**Status**: Portfolio Scored  
**Documents**:
- ✅ PORTFOLIO-SCORE-ai-meeting-assistant.md

### ai-code-review-documentation-tool

**Status**: Portfolio Scored  
**Documents**:
- ✅ PORTFOLIO-SCORE-ai-code-review-documentation-tool.md

## File Naming Convention

All project documents follow the pattern: `[TYPE]-<project-slug>.md`

Where `[TYPE]` is the document type and `<project-slug>` is a lowercase, hyphenated version of the project name.

**Document Types**:
- `NICHE-INTEL-*` - Niche Intelligence
- `PAIN-SIGNALS-*` - Pain Signal Analysis
- `JTBD-*` - Persona & JTBD Analysis
- `OPPORTUNITY-*` - Opportunity & Moat Analysis
- `DISCOVERY-DEMO-*` - Discovery workflow summary
- `INSIGHT-*` - Insight brief
- `PORTFOLIO-SCORE-*` - Portfolio score
- `VALIDATION-PLAN-*` - Validation plan
- `LANDING-*` - Landing page
- `DISTRIBUTION-*` - Distribution map
- `PRICING-TEST-*` - Pricing tests
- `PRD-*` - Product Requirement Document
- `MOAT-*` - Moat strategy
- `RETENTION-*` - Retention architecture

## Workflow

1. **Portfolio Scoring** → `PORTFOLIO-SCORE-*.md` in project folder
2. **Discovery** → `NICHE-INTEL-*.md`, `PAIN-SIGNALS-*.md`, `JTBD-*.md`, `OPPORTUNITY-*.md`
3. **Validation** → `VALIDATION-PLAN-*.md`, `LANDING-*.md`, `DISTRIBUTION-*.md`, `PRICING-TEST-*.md`
4. **Product Strategy** → `PRD-*.md`, `MOAT-*.md`, `RETENTION-*.md`

## See Also

- `docs/DISCOVERY-WORKFLOW.md` - Discovery workflow documentation
- `docs/portfolio/INITIAL_20_IDEAS.md` - Initial 20 ideas portfolio
- `.cursor/rules/301-discovery-overview.mdc` - Discovery overview rule

