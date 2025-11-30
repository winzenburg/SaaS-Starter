# Hub Page Implementation Summary

> Created by Claude Code on 2025-11-30
> This document serves as a backup/memory of the hub functionality implementation

## Overview

The hub page (`/hub`) displays a portfolio of SaaS project ideas with filtering, document discovery, and portfolio scoring.

## Key Features Implemented

### 1. Virtual Projects from Ideas List
Projects are loaded from two sources:
- **Real projects**: Folders in `projects/` directory
- **Virtual projects**: Parsed from `docs/portfolio/INITIAL_20_IDEAS.md` markdown table

This results in 22 total projects (7 real + 15 virtual from the 20 ideas list, minus duplicates).

### 2. Document Discovery
Documents are automatically discovered from 7 locations:
1. `projects/<slug>/` - Project folder documents
2. `docs/discovery/` - Discovery phase documents (MANUS, NICHE-INTEL, PAIN-SIGNALS, JTBD, OPPORTUNITY)
3. `docs/validation/` - Validation documents (VALIDATION-PLAN, REDTEAM)
4. `docs/product/` - Product documents (NARRATIVE, INSIGHT, PRD)
5. `docs/research/` - Research documents (PERSONA, COMPETITORS, MARKET)
6. `docs/portfolio/` - Portfolio score documents
7. `docs/ideas/<slug>/` - Orchestrator outputs

**Naming convention**: `<DOC-TYPE>-<project-slug>.md`
Example: `NICHE-INTEL-enterprise-design-system-startups.md`

### 3. Portfolio Score & Verdict Parsing
Portfolio scores are extracted from markdown files matching `PORTFOLIO-SCORE-*.md` in:
- `projects/<slug>/`
- `docs/portfolio/`

**Regex patterns used**:
```typescript
// Score: **Total Score**: 34/40
/\*\*Total Score\*\*:\s*(\d+)\/40/i

// Verdict: ### Verdict: ✅ **PROCEED**
/###\s*Verdict[:\s]*[^\n]*?\*\*(PROCEED|PIVOT|KILL)\*\*/i
```

### 4. Filter Functionality
Four filter buttons on the hub page:
- **All**: Shows all projects
- **Priority**: Projects with portfolioScore >= 30
- **Proceed**: Projects with verdict === "PROCEED"
- **Pivot**: Projects with verdict === "PIVOT" or "KILL"

## Key Files

### Backend/API
- `src/lib/projects/helpers.ts` - Core helper functions:
  - `parseIdeasFromMarkdown()` - Parses INITIAL_20_IDEAS.md
  - `ideaToProject()` - Converts idea to ProjectRegistry
  - `getAllProjectsWithIdeas()` - Merges real + virtual projects
  - `findProjectDocuments()` - Discovers documents across all locations
  - `readProjectFromFolder()` - Reads project data including portfolio score
  - `getDocumentType()` - Categorizes documents by type/phase
  - `normalizeSlug()` - Handles slug variations (and vs &)

- `src/app/api/hub/projects/route.ts` - API endpoint returning all projects with documents

### Frontend
- `src/app/(product)/hub/page.tsx` - Hub page with:
  - Stats cards (Total Projects, MRR, Avg Score, In Validation)
  - Filter buttons
  - Project cards grid
  - Document list per project

### Middleware
- `src/middleware.ts` - Added `/hub(.*)` and `/workflows(.*)` to public routes

## Data Types

```typescript
interface ProjectRegistry {
  name: string;
  slug: string;
  description: string;
  template: string;
  outputPath: string;
  gitRepo?: string;
  features: string[];
  envVars: Record<string, string>;
  status?: "validation" | "engineering" | "growth" | "maintenance" | "killed";
  portfolioScore?: number;
  verdict?: "PROCEED" | "PIVOT" | "KILL";
  mrr?: number;
  createdAt: string;
  updatedAt: string;
}

interface ProjectDocument {
  name: string;
  type: "discovery" | "validation" | "insight" | "portfolio" | "moat" | "retention" | "prd" | "other";
  path: string;
  size: number;
  modified: string;
  phase?: "discovery" | "validation" | "build" | "scale";
}

type FilterType = "all" | "priority" | "proceed" | "pivot";
```

## Design System

Uses Synthflow-inspired warm cream color palette:
- Background: `bg-[#FAF9F7]`
- Cards: `bg-white` with subtle shadows
- Accent: Warm orange/amber for highlights
- Sidebar: Cream background with green active states

## How to Test

```bash
# Start dev server
npm run dev

# Test API endpoint
curl http://localhost:3000/api/hub/projects | python3 -m json.tool

# Count projects
curl -s http://localhost:3000/api/hub/projects | python3 -c "import json,sys; print(len(json.load(sys.stdin)['projects']))"
```

## Troubleshooting

### ChunkLoadError / Runtime errors
Kill all Next.js processes and restart:
```bash
pkill -f "next"
rm -rf .next
npm run dev
```

### Documents not appearing
1. Check file naming: `<DOC-TYPE>-<project-slug>.md`
2. Verify slug matches project folder name
3. Check file is in one of the 7 discovery locations

### Projects not showing
1. Verify `docs/portfolio/INITIAL_20_IDEAS.md` exists and has table format
2. Check `projects/` folder for real project folders
3. Test API endpoint directly

## Recovery Steps

If the implementation is lost, restore these key changes:

1. **helpers.ts**: Add functions for parsing ideas, document discovery, portfolio scoring
2. **route.ts**: Use `getAllProjectsWithIdeas()` instead of just reading project folders
3. **hub/page.tsx**: Add filter state, filter buttons UI, filter logic
4. **middleware.ts**: Add `/hub(.*)` and `/workflows(.*)` to public routes

## Git Commits Reference

Key functionality should be preserved in commits containing:
- "virtual projects" or "ideas list"
- "document discovery"
- "portfolio score parsing"
- "filter functionality"
- "hub page"
