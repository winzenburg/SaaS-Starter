# Project Data Storage Locations

## Overview
Projects and their metadata are stored in multiple locations. The Hub API combines data from:
1. **Real project folders** (7 projects)
2. **Virtual projects** from portfolio scores (16 portfolio score files)
3. **Documents** scattered across multiple directories

---

## 1. Real Project Folders
**Location**: `projects/` directory

**7 Project Folders**:
- `projects/ai-meeting-assistant/`
- `projects/amazon-fba-seller-intelligence/`
- `projects/real-estate-investor-flipper-platform/`
- `projects/ai-code-review-documentation-tool/`
- `projects/enterprise-design-system-startups/`
- `projects/ketamine-meditation-journey-music-mobile-app/`
- `projects/music-journey-app/`

**Metadata in each folder**:
- `README.md` - Project description, status
- `PORTFOLIO-SCORE-*.md` - Portfolio score (if exists in folder)
- Other project-specific documents (NARRATIVE, PERSONA, COMPETITORS, etc.)

---

## 2. Portfolio Score Files (Virtual Projects)
**Location**: `docs/portfolio/` directory

**16 Portfolio Score Files** (creates virtual projects for ideas without folders):
- `PORTFOLIO-SCORE-ai-content-repurposing-engine.md`
- `PORTFOLIO-SCORE-ai-proposal-rfp-tool-agencies.md`
- `PORTFOLIO-SCORE-athletic-performance-tracker.md`
- `PORTFOLIO-SCORE-creator-collaboration-marketplace.md`
- `PORTFOLIO-SCORE-creator-revenue-dashboard.md`
- `PORTFOLIO-SCORE-dietitian-nutrition-therapy-platform.md`
- `PORTFOLIO-SCORE-freelancer-finance-tax.md`
- `PORTFOLIO-SCORE-freelancer-invoice-to-tax-platform.md`
- `PORTFOLIO-SCORE-ghost-kitchen-manager.md`
- `PORTFOLIO-SCORE-hvac-service-business-suite.md`
- `PORTFOLIO-SCORE-influencer-media-kit-generator.md`
- `PORTFOLIO-SCORE-ketamine-meditation-journey-music-mobile-app.md`
- `PORTFOLIO-SCORE-micro-saas-idea-validator.md`
- `PORTFOLIO-SCORE-pool-service-business-platform.md`
- `PORTFOLIO-SCORE-subcontractor-mgmt-for-gcs.md`
- `PORTFOLIO-SCORE-wedding-photography-suite.md`

**Note**: Some of these overlap with real project folders (e.g., `ketamine-meditation-journey-music-mobile-app`). The API deduplicates by slug.

---

## 3. Document Storage Locations

Documents are discovered by scanning multiple directories. The `findProjectDocuments()` function in `src/lib/projects/helpers.ts` searches:

### 3.1 Project Folder Documents
**Location**: `projects/<slug>/`
- Project-specific documents stored directly in the project folder
- Example: `projects/ketamine-meditation-journey-music-mobile-app/NARRATIVE-*.md`

### 3.2 Discovery Documents
**Location**: `docs/discovery/`
- Files matching: `*NICHE-INTEL*`, `*PAIN-SIGNALS*`, `*JTBD*`, `*OPPORTUNITY*`, `*DISCOVERY-DEMO*`
- Example: `docs/discovery/MANUS-ketamine-meditation-journey-music-mobile-app.md`

### 3.3 Validation Documents
**Location**: `docs/validation/`
- Files matching: `*VALIDATION-PLAN*`, `*LANDING*`, `*DISTRIBUTION*`, `*PRICING-TEST*`, `*CREATIVE-BATCH*`, `*RESULTS*`, `*REDTEAM*`
- Example: `docs/validation/VALIDATION-PLAN-ketamine-meditation-journey-music-mobile-app.md`

### 3.4 Product Strategy Documents
**Location**: `docs/product/`
- Files matching: `*NARRATIVE*`, `*INSIGHT*`, `*PRD*`
- Example: `docs/product/NARRATIVE-ketamine-meditation-journey-music-mobile-app.md`

### 3.5 Research Documents
**Location**: `docs/research/`
- Files matching: `*PERSONA*`, `*COMPETITORS*`, `*MARKET*`
- Example: `docs/research/PERSONA-ketamine-meditation-journey-music-mobile-app.md`

### 3.6 Portfolio Scores
**Location**: `docs/portfolio/`
- Files matching: `PORTFOLIO-SCORE-*`
- Example: `docs/portfolio/PORTFOLIO-SCORE-ketamine-meditation-journey-music-mobile-app.md`

### 3.7 Ideas Documents (Orchestrator Outputs)
**Location**: `docs/ideas/<slug>/`
- Orchestrator-generated documents
- Example: `docs/ideas/ketamine-meditation-journey-music-mobile-app/`

---

## How the API Loads Projects

**File**: `src/app/api/hub/projects/route.ts`

1. **Load Virtual Projects** (lines 143-144):
   - Scans `docs/portfolio/` for `PORTFOLIO-SCORE-*.md` files
   - Creates virtual projects for ideas without project folders

2. **Load Real Projects** (lines 165-208):
   - Scans `projects/` directory for folders
   - Reads project metadata from `README.md` or JSON files
   - Merges portfolio score data if available

3. **Deduplicate** (lines 212-243):
   - Prevents duplicates by checking if a real project folder exists for each virtual project
   - Real projects take precedence over virtual ones

4. **Find Documents** (lines 177-183, 223-224):
   - Calls `findProjectDocuments()` which scans all 7 document locations
   - Matches documents to projects by slug (case-insensitive)

5. **Sort and Return** (lines 250-258):
   - Sorts by portfolio score (highest first)
   - Returns combined list of real + virtual projects

---

## Why Claude Code Only Sees 7 Projects

Claude Code likely only sees the **real project folders** in `projects/` directory because:
- The virtual projects are created dynamically by the API route
- Portfolio score files in `docs/portfolio/` don't have corresponding folders
- The API combines both sources at runtime

**To see all 22 projects**, Claude Code needs to:
1. Read the portfolio score files in `docs/portfolio/`
2. Understand that the API creates virtual projects from these files
3. Check the API route logic in `src/app/api/hub/projects/route.ts`

---

## Total Project Count

- **7 Real Projects** (with folders in `projects/`)
- **16 Portfolio Score Files** (in `docs/portfolio/`)
- **~22 Total Projects** (after deduplication - some portfolio scores match real projects)

The exact count depends on how many portfolio scores have corresponding project folders.

