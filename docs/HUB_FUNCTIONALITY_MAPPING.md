# Hub Functionality Mapping Guide

This document maps all the functionality we built to help integrate it with Claude Code's new design.

## Current Functionality Overview

### 1. Portfolio Stats Cards
**Location**: `src/app/(product)/hub/page.tsx` (lines 189-215)

**Functionality**:
- Total Projects count
- Total MRR (Monthly Recurring Revenue)
- Average Portfolio Score
- In Validation count

**Data Source**: Calculated from `projects` array via `calculateStats()` function

**Current Implementation**:
```typescript
const stats = calculateStats(projects);
// Returns: { total, byStatus, totalMRR, avgScore }
```

---

### 2. Filter System
**Location**: `src/app/(product)/hub/page.tsx` (lines 84, 90, 117-131, 280-310)

**Filters**:
- **All Ideas** - Shows all projects
- **Priority** - Projects with portfolio score >= 30
- **Proceed** - Projects with verdict containing "PROCEED"
- **Pivot** - Projects with verdict containing "PIVOT" or "KILL"

**Implementation**:
```typescript
type FilterType = "all" | "top-priority" | "proceed" | "pivot";

const filteredProjects = projects.filter((project) => {
  switch (filter) {
    case "top-priority":
      return (project.portfolioScore || 0) >= 30;
    case "proceed":
      return project.verdict?.toUpperCase().includes("PROCEED") ?? false;
    case "pivot":
      const verdict = project.verdict?.toUpperCase();
      return verdict?.includes("PIVOT") || verdict?.includes("KILL") || false;
    case "all":
    default:
      return true;
  }
});
```

**Count Display**: Each filter button shows the count of matching projects

---

### 3. Project Cards
**Location**: `src/app/(product)/hub/page.tsx` (lines 327-561)

**Features**:
- Project name and description
- Verdict badge (PROCEED, PIVOT, KILL) - uses `getVerdictBadgeVariant()` and `formatVerdict()`
- Status badge - uses `getStatusBadgeVariant()`
- Portfolio Score (X/40) with color coding - uses `getScoreTextColor()`
- Priority label - uses `getPriorityLabel()`
- MRR display
- Workflow counts (active/total)
- Documents organized by phase (Discovery, Validation, Build, Scale)
- Links to workflows
- Git repo link (if available)

**Utility Functions**: All in `src/lib/utils/hub.ts`

---

### 4. Verdict Parsing
**Location**: `src/app/api/hub/projects/route.ts` (lines 67-74)

**Functionality**: Parses verdict from portfolio score markdown files

**Implementation**:
```typescript
// Try multiple patterns to handle different formats
let verdictMatch = content.match(/### Verdict:\s*[✅⚠️❌]?\s*\*?\*?([A-Z]+)\*?\*?/i);
if (!verdictMatch) {
  // Fallback: look for "Verdict:" followed by any word in all caps
  verdictMatch = content.match(/### Verdict:\s*[^\n]*?([A-Z]{4,})/i);
}
const verdict: string | null = verdictMatch && verdictMatch[1] ? verdictMatch[1].trim() : null;
```

**Why**: Handles emoji characters in markdown files (e.g., "### Verdict: ⚠️ PIVOT")

---

### 5. Document Discovery
**Location**: `src/lib/projects/helpers.ts` (lines 133-222)

**Functionality**: Finds all documents for a project across 7 directories:
1. Project folder (`projects/<slug>/`)
2. Discovery (`docs/discovery/`)
3. Validation (`docs/validation/`)
4. Product Strategy (`docs/product/`)
5. Research (`docs/research/`)
6. Portfolio Scores (`docs/portfolio/`)
7. Ideas (`docs/ideas/<slug>/`)

**Document Types**: discovery, validation, insight, portfolio, moat, retention, prd, other

**Phase Mapping**: Documents are organized by phase (discovery, validation, build, scale)

---

### 6. API Route
**Location**: `src/app/api/hub/projects/route.ts`

**Functionality**:
- Loads real projects from `projects/` directory
- Creates virtual projects from portfolio scores in `docs/portfolio/`
- Deduplicates by slug (real projects take precedence)
- Finds documents for each project
- Gets workflow counts from database (if available)
- Sorts by portfolio score (highest first)

**Response Format**:
```typescript
{
  projects: ProjectWithDocuments[],
  message?: string // If projects are local-only
}
```

---

## Key Data Structures

### Project Interface
```typescript
interface Project {
  name: string;
  slug: string;
  description: string;
  status: string;
  portfolioScore?: number;
  verdict?: string; // PROCEED, PIVOT, or KILL
  mrr?: number;
  createdAt: string;
  updatedAt: string;
  template: string;
  gitRepo?: string;
  documents?: ProjectDocument[];
  workflowCounts?: {
    total: number;
    byPhase: Record<string, number>;
    active: number;
  };
}
```

### ProjectDocument Interface
```typescript
interface ProjectDocument {
  name: string;
  type: "discovery" | "validation" | "insight" | "portfolio" | "moat" | "retention" | "prd" | "other";
  path: string;
  size: number;
  modified: string;
  phase?: "discovery" | "validation" | "build" | "scale";
}
```

---

## Utility Functions

**Location**: `src/lib/utils/hub.ts`

1. **`getStatusBadgeVariant(status: string)`** - Returns badge variant for project status
2. **`getVerdictBadgeVariant(verdict?: string)`** - Returns badge variant for verdict
3. **`getScoreTextColor(score?: number)`** - Returns text color class for portfolio score
4. **`getPriorityLabel(score?: number)`** - Returns priority label text
5. **`formatVerdict(verdict?: string)`** - Formats verdict for display (adds emojis)

---

## Integration Points for New Design

### What Needs to Be Preserved:
1. ✅ Filter logic (All, Priority, Proceed, Pivot)
2. ✅ Portfolio stats calculation
3. ✅ Verdict parsing from markdown
4. ✅ Document discovery across 7 directories
5. ✅ Project card data display (score, verdict, MRR, workflows)
6. ✅ API route that combines real + virtual projects

### What Can Be Redesigned:
- UI components (Card, Button, Badge styling)
- Layout and spacing
- Color scheme and theming
- Animation and transitions
- Typography

---

## Files to Review When Integrating

1. **`src/app/(product)/hub/page.tsx`** - Main Hub page component
2. **`src/app/api/hub/projects/route.ts`** - API route for projects data
3. **`src/lib/projects/helpers.ts`** - Document discovery and project loading
4. **`src/lib/utils/hub.ts`** - Utility functions for badges and formatting
5. **`e2e/hub.spec.ts`** - Playwright tests (verify functionality still works)

---

## Testing Checklist

After integrating with new design, verify:
- [ ] All 4 filters work correctly
- [ ] Filter counts match actual project counts
- [ ] Portfolio stats display correctly
- [ ] Verdict badges show correct colors
- [ ] Project cards display all data
- [ ] Documents are discoverable and linked correctly
- [ ] Empty states work
- [ ] Loading states work
- [ ] API route returns correct data
- [ ] Playwright tests pass

