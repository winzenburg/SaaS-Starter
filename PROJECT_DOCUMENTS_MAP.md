# Complete Project Documents Map

This document maps all portfolio score files to their associated documents so Claude Code can find everything.

---

## Ketamine Meditation Journey Music Mobile App

**Slug**: `ketamine-meditation-journey-music-mobile-app`

### Portfolio Score
- `docs/portfolio/PORTFOLIO-SCORE-ketamine-meditation-journey-music-mobile-app.md`

### Discovery Documents
- `docs/discovery/MANUS-ketamine-meditation-journey-music-mobile-app.md`

### Validation Documents
- `docs/validation/VALIDATION-PLAN-ketamine-meditation-journey-music-mobile-app.md`
- `docs/validation/REDTEAM-ketamine-meditation-journey-music-mobile-app.md`

### Product Strategy Documents
- `docs/product/NARRATIVE-ketamine-meditation-journey-music-mobile-app.md`

### Research Documents
- `docs/research/COMPETITORS-ketamine-meditation-journey-music-mobile-app.md`
- `docs/research/PERSONA-ketamine-meditation-journey-music-mobile-app.md`

### Project Folder Documents
- `projects/ketamine-meditation-journey-music-mobile-app/NARRATIVE-ketamine-meditation-journey-music-mobile-app.md`
- `projects/ketamine-meditation-journey-music-mobile-app/PERSONA-ketamine-meditation-journey-music-mobile-app.md`
- `projects/ketamine-meditation-journey-music-mobile-app/COMPETITORS-ketamine-meditation-journey-music-mobile-app.md`
- `projects/ketamine-meditation-journey-music-mobile-app/COMPETITOR-RESEARCH-NOTES-ketamine-meditation-journey-music-mobile-app.md`
- `projects/ketamine-meditation-journey-music-mobile-app/POSITIONING-ketamine-meditation-journey-music-mobile-app.md`
- `projects/ketamine-meditation-journey-music-mobile-app/PRICING-ketamine-meditation-journey-music-mobile-app.md`
- `projects/ketamine-meditation-journey-music-mobile-app/GAPS-OPPORTUNITIES-ketamine-meditation-journey-music-mobile-app.md`

---

## Enterprise Design System for Startups

**Slug**: `enterprise-design-system-startups`

### Portfolio Score
- `docs/portfolio/PORTFOLIO-SCORE-enterprise-design-system-startups.md` (in project folder)
- `projects/enterprise-design-system-startups/PORTFOLIO-SCORE-enterprise-design-system-startups.md`

### Product Strategy Documents
- `docs/product/NARRATIVE-enterprise-design-system-startups.md`
- `projects/enterprise-design-system-startups/INSIGHT-enterprise-design-system-startups.md`

### Research Documents
- `docs/research/COMPETITORS-enterprise-design-system-startups.md`
- `docs/research/PERSONA-enterprise-design-system-startups.md`

### Validation Documents
- `docs/validation/VALIDATION-PLAN-enterprise-design-system-startups.md`

---

## All Portfolio Score Files and Their Document Locations

To find all documents for any project, search for files containing the project slug in these directories:

1. **Portfolio Scores**: `docs/portfolio/PORTFOLIO-SCORE-<slug>.md`
2. **Discovery**: `docs/discovery/*<slug>*`
3. **Validation**: `docs/validation/*<slug>*`
4. **Product Strategy**: `docs/product/*<slug>*`
5. **Research**: `docs/research/*<slug>*`
6. **Project Folder**: `projects/<slug>/*`

### Example Search Pattern
For project slug `ketamine-meditation-journey-music-mobile-app`:
```bash
find docs projects -type f -name "*ketamine-meditation-journey-music-mobile-app*"
```

---

## How Documents Are Matched to Projects

The `findProjectDocuments()` function in `src/lib/projects/helpers.ts` matches documents by:
1. **Slug matching**: Files must contain the project slug (case-insensitive)
2. **Directory scanning**: Searches 7 different directories
3. **Type detection**: Determines document type from filename patterns

### Document Type Patterns
- **Discovery**: `*NICHE-INTEL*`, `*PAIN-SIGNALS*`, `*JTBD*`, `*OPPORTUNITY*`, `*DISCOVERY-DEMO*`, `*MANUS*`
- **Validation**: `*VALIDATION-PLAN*`, `*LANDING*`, `*DISTRIBUTION*`, `*PRICING-TEST*`, `*CREATIVE-BATCH*`, `*RESULTS*`, `*REDTEAM*`, `*NARRATIVE*`, `*PERSONA*`, `*COMPETITORS*`
- **Product Strategy**: `*INSIGHT*`, `*PORTFOLIO-SCORE*`, `*MOAT*`, `*RETENTION*`, `*PRD*`
- **Research**: `*PERSONA*`, `*COMPETITORS*`, `*MARKET*`

---

## Quick Reference: All 16 Portfolio Score Files

1. `docs/portfolio/PORTFOLIO-SCORE-ai-content-repurposing-engine.md`
2. `docs/portfolio/PORTFOLIO-SCORE-ai-proposal-rfp-tool-agencies.md`
3. `docs/portfolio/PORTFOLIO-SCORE-athletic-performance-tracker.md`
4. `docs/portfolio/PORTFOLIO-SCORE-creator-collaboration-marketplace.md`
5. `docs/portfolio/PORTFOLIO-SCORE-creator-revenue-dashboard.md`
6. `docs/portfolio/PORTFOLIO-SCORE-dietitian-nutrition-therapy-platform.md`
7. `docs/portfolio/PORTFOLIO-SCORE-freelancer-finance-tax.md`
8. `docs/portfolio/PORTFOLIO-SCORE-freelancer-invoice-to-tax-platform.md`
9. `docs/portfolio/PORTFOLIO-SCORE-ghost-kitchen-manager.md`
10. `docs/portfolio/PORTFOLIO-SCORE-hvac-service-business-suite.md`
11. `docs/portfolio/PORTFOLIO-SCORE-influencer-media-kit-generator.md`
12. `docs/portfolio/PORTFOLIO-SCORE-ketamine-meditation-journey-music-mobile-app.md`
13. `docs/portfolio/PORTFOLIO-SCORE-micro-saas-idea-validator.md`
14. `docs/portfolio/PORTFOLIO-SCORE-pool-service-business-platform.md`
15. `docs/portfolio/PORTFOLIO-SCORE-subcontractor-mgmt-for-gcs.md`
16. `docs/portfolio/PORTFOLIO-SCORE-wedding-photography-suite.md`

---

## For Claude Code

To see all documents for a project:
1. Extract the slug from the portfolio score filename (remove `PORTFOLIO-SCORE-` prefix and `.md` suffix)
2. Search for files containing that slug in:
   - `docs/discovery/`
   - `docs/validation/`
   - `docs/product/`
   - `docs/research/`
   - `docs/portfolio/`
   - `projects/<slug>/`

Example for ketamine app:
- Slug: `ketamine-meditation-journey-music-mobile-app`
- Search pattern: `*ketamine-meditation-journey-music-mobile-app*`
- Locations: All `docs/*/` and `projects/ketamine-meditation-journey-music-mobile-app/`

