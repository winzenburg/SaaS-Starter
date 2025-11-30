# Hub Functionality Integration Guide

This document maps our current functionality to Claude Code's new design implementation.

## Current Implementation vs. Claude Code's Documentation

### Key Difference Found

**Claude Code's Documentation** mentions:
- Parsing virtual projects from `docs/portfolio/INITIAL_20_IDEAS.md` markdown table
- Functions: `parseIdeasFromMarkdown()`, `ideaToProject()`, `getAllProjectsWithIdeas()`

**Our Actual Implementation**:
- Creates virtual projects from `PORTFOLIO-SCORE-*.md` files in `docs/portfolio/`
- Function: `loadAllPortfolioScores()` in `src/app/api/hub/projects/route.ts`
- No parsing from `INITIAL_20_IDEAS.md` table

**Action Needed**: Verify which approach is correct, or if both should be supported.

---

## Functionality That Must Be Preserved

### 1. Filter System ✅
**Location**: `src/app/(product)/hub/page.tsx`

**Current Implementation**:
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

**Filter Buttons** (lines 280-310):
- All Ideas ({count})
- Priority ({count}) - score >= 30
- Proceed ({count}) - verdict contains PROCEED
- Pivot ({count}) - verdict contains PIVOT or KILL

**Must Preserve**:
- Filter logic
- Count calculations
- State management (`filter` state)

---

### 2. Portfolio Stats Cards ✅
**Location**: `src/app/(product)/hub/page.tsx` (lines 189-215)

**Current Implementation**:
```typescript
const stats = calculateStats(projects);
// Returns: { total, byStatus, totalMRR, avgScore }
```

**Stats Displayed**:
1. Total Projects - `stats.total`
2. Total MRR - `stats.totalMRR` (formatted with `toLocaleString()`)
3. Avg Portfolio Score - `stats.avgScore` (formatted to 1 decimal)
4. In Validation - `stats.byStatus.validation || 0`

**Must Preserve**:
- `calculateStats()` function logic
- Data calculations
- Display format (can be redesigned)

---

### 3. Verdict Parsing ✅
**Location**: `src/app/api/hub/projects/route.ts` (lines 67-74)

**Current Implementation**:
```typescript
// Try multiple patterns to handle different formats
let verdictMatch = content.match(/### Verdict:\s*[✅⚠️❌]?\s*\*?\*?([A-Z]+)\*?\*?/i);
if (!verdictMatch) {
  // Fallback: look for "Verdict:" followed by any word in all caps
  verdictMatch = content.match(/### Verdict:\s*[^\n]*?([A-Z]{4,})/i);
}
const verdict: string | null = verdictMatch && verdictMatch[1] ? verdictMatch[1].trim() : null;
```

**Why This Matters**: Handles emoji characters in markdown (e.g., "### Verdict: ⚠️ PIVOT")

**Claude Code's Pattern** (from docs):
```typescript
/###\s*Verdict[:\s]*[^\n]*?\*\*(PROCEED|PIVOT|KILL)\*\*/i
```

**Action**: Our implementation is more robust (handles emojis). Keep ours or merge both patterns.

---

### 4. Document Discovery ✅
**Location**: `src/lib/projects/helpers.ts` (lines 133-222)

**Current Implementation**: Scans 7 directories:
1. `projects/<slug>/`
2. `docs/discovery/`
3. `docs/validation/`
4. `docs/product/`
5. `docs/research/`
6. `docs/portfolio/`
7. `docs/ideas/<slug>/`

**Matches Claude Code's Documentation** ✅

**Must Preserve**:
- All 7 directory locations
- Document type detection (`getDocumentType()`)
- Phase mapping (discovery, validation, build, scale)
- Slug matching logic

---

### 5. Project Cards Display ✅
**Location**: `src/app/(product)/hub/page.tsx` (lines 327-561)

**Current Features**:
- Project name and description
- Verdict badge (uses `getVerdictBadgeVariant()` and `formatVerdict()`)
- Status badge (uses `getStatusBadgeVariant()`)
- Portfolio Score with color coding (uses `getScoreTextColor()`)
- Priority label (uses `getPriorityLabel()`)
- MRR display
- Workflow counts (active/total)
- Documents organized by phase
- Links to workflows and git repo

**Utility Functions** (in `src/lib/utils/hub.ts`):
- `getStatusBadgeVariant(status)` - Badge variant for status
- `getVerdictBadgeVariant(verdict)` - Badge variant for verdict
- `getScoreTextColor(score)` - Text color for portfolio score
- `getPriorityLabel(score)` - Priority label text
- `formatVerdict(verdict)` - Formats verdict with emojis

**Must Preserve**:
- All data display
- Utility functions
- Document organization by phase
- Link generation logic

---

### 6. API Route ✅
**Location**: `src/app/api/hub/projects/route.ts`

**Current Implementation**:
1. Loads virtual projects from portfolio scores (`loadAllPortfolioScores()`)
2. Loads real projects from `projects/` directory
3. Deduplicates by slug (real projects take precedence)
4. Finds documents for each project
5. Gets workflow counts from database (if available)
6. Sorts by portfolio score (highest first)

**Response Format**:
```typescript
{
  projects: ProjectWithDocuments[],
  message?: string // If projects are local-only
}
```

**Must Preserve**:
- Virtual project creation from portfolio scores
- Deduplication logic
- Document discovery integration
- Sorting logic

---

## Integration Checklist

When integrating with Claude Code's new design:

### Backend/API (No Changes Needed)
- [x] API route structure is correct
- [x] Document discovery works
- [x] Verdict parsing handles emojis
- [x] Virtual projects from portfolio scores

### Frontend (UI Can Be Redesigned)
- [ ] Filter buttons - preserve logic, can redesign UI
- [ ] Stats cards - preserve calculations, can redesign UI
- [ ] Project cards - preserve data display, can redesign UI
- [ ] Utility functions - keep all functions in `src/lib/utils/hub.ts`
- [ ] Document display - preserve organization, can redesign UI

### Design System
Claude Code mentions:
- Warm cream color palette: `bg-[#FAF9F7]`
- Cards: `bg-white` with subtle shadows
- Accent: Warm orange/amber
- Sidebar: Cream background with green active states

**Action**: Apply new design system while preserving all functionality.

---

## Files to Update

1. **`src/app/(product)/hub/page.tsx`**
   - Keep: All state management, filter logic, data calculations
   - Update: UI components, styling, layout to match new design

2. **`src/lib/utils/hub.ts`**
   - Keep: All utility functions (they're design-agnostic)

3. **`src/app/api/hub/projects/route.ts`**
   - Keep: All logic (it's backend, design-independent)

4. **`src/lib/projects/helpers.ts`**
   - Keep: All document discovery logic

---

## Testing After Integration

1. [ ] All 4 filters work and show correct counts
2. [ ] Portfolio stats display correct numbers
3. [ ] Verdict badges show correct colors
4. [ ] Project cards display all data
5. [ ] Documents are discoverable and linked correctly
6. [ ] Empty states work
7. [ ] Loading states work
8. [ ] API route returns correct data
9. [ ] Playwright tests pass (`e2e/hub.spec.ts`)

---

## Reconciliation Needed

**Question**: Does Claude Code's implementation parse from `INITIAL_20_IDEAS.md` or from portfolio score files?

**Current Reality**: We parse from portfolio score files (`PORTFOLIO-SCORE-*.md`)

**Action**: Verify which approach Claude Code actually implemented, or if we need to support both.

