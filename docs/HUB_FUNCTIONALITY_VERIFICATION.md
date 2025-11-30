# Hub Functionality Verification Checklist

This document verifies that all functionality is working with Claude Code's design (without changing any styling).

## Functionality That Must Work

### ✅ 1. Filter System
**Location**: `src/app/(product)/hub/page.tsx`

**Status**: ✅ Implemented
- Filter state: `const [filter, setFilter] = useState<FilterType>("all")`
- Filter logic: Lines 117-131
- Filter buttons: Lines 280-310
- Filter counts: Each button shows correct count

**Verify**:
- [ ] All filter button shows all projects
- [ ] Priority filter shows projects with score >= 30
- [ ] Proceed filter shows projects with PROCEED verdict
- [ ] Pivot filter shows projects with PIVOT or KILL verdict
- [ ] Counts on buttons match filtered results

---

### ✅ 2. Portfolio Stats Cards
**Location**: `src/app/(product)/hub/page.tsx` (lines 189-215)

**Status**: ✅ Implemented
- Stats calculation: `calculateStats(projects)` function
- 4 stat cards: Total Projects, Total MRR, Avg Score, In Validation

**Verify**:
- [ ] Total Projects count is correct
- [ ] Total MRR sums all project MRR values
- [ ] Avg Portfolio Score calculates correctly
- [ ] In Validation shows count from `stats.byStatus.validation`

---

### ✅ 3. Verdict Parsing
**Location**: `src/app/api/hub/projects/route.ts` (lines 67-74)

**Status**: ✅ Implemented with emoji handling
- Primary regex: `/### Verdict:\s*[✅⚠️❌]?\s*\*?\*?([A-Z]+)\*?\*?/i`
- Fallback regex: `/### Verdict:\s*[^\n]*?([A-Z]{4,})/i`

**Verify**:
- [ ] Verdicts parse correctly from portfolio score files
- [ ] Handles emoji characters (⚠️, ✅, ❌)
- [ ] Handles bold markdown (**PROCEED**)
- [ ] Returns PROCEED, PIVOT, or KILL correctly

---

### ✅ 4. Document Discovery
**Location**: `src/lib/projects/helpers.ts` (lines 133-222)

**Status**: ✅ Implemented - Scans 7 locations

**Verify**:
- [ ] Documents found in `projects/<slug>/`
- [ ] Documents found in `docs/discovery/`
- [ ] Documents found in `docs/validation/`
- [ ] Documents found in `docs/product/`
- [ ] Documents found in `docs/research/`
- [ ] Documents found in `docs/portfolio/`
- [ ] Documents found in `docs/ideas/<slug>/`
- [ ] Documents organized by phase correctly
- [ ] Document links work correctly

---

### ✅ 5. Virtual Projects from Portfolio Scores
**Location**: `src/app/api/hub/projects/route.ts` (lines 93-139)

**Status**: ✅ Implemented
- Function: `loadAllPortfolioScores()`
- Creates virtual projects from `PORTFOLIO-SCORE-*.md` files
- Only creates if no project folder exists (deduplication)

**Verify**:
- [ ] Virtual projects created from portfolio score files
- [ ] Real projects take precedence over virtual ones
- [ ] All 16 portfolio score files are loaded
- [ ] Projects deduplicated correctly by slug

---

### ✅ 6. Project Cards Display
**Location**: `src/app/(product)/hub/page.tsx` (lines 327-561)

**Status**: ✅ Implemented

**Data Displayed**:
- [ ] Project name and description
- [ ] Verdict badge (using `getVerdictBadgeVariant()` and `formatVerdict()`)
- [ ] Status badge (using `getStatusBadgeVariant()`)
- [ ] Portfolio Score with color (using `getScoreTextColor()`)
- [ ] Priority label (using `getPriorityLabel()`)
- [ ] MRR display
- [ ] Workflow counts (active/total)
- [ ] Documents organized by phase
- [ ] Links to workflows
- [ ] Git repo link (if available)

---

### ✅ 7. Utility Functions
**Location**: `src/lib/utils/hub.ts`

**Status**: ✅ All implemented
- [ ] `getStatusBadgeVariant(status)` - Works
- [ ] `getVerdictBadgeVariant(verdict)` - Works
- [ ] `getScoreTextColor(score)` - Works
- [ ] `getPriorityLabel(score)` - Works
- [ ] `formatVerdict(verdict)` - Works

---

## API Route Verification

**Location**: `src/app/api/hub/projects/route.ts`

**Verify**:
- [ ] Returns projects array
- [ ] Includes `verdict` field for each project
- [ ] Includes `portfolioScore` field
- [ ] Includes `documents` array
- [ ] Includes `workflowCounts` (if database available)
- [ ] Sorts by portfolio score (highest first)
- [ ] Deduplicates projects correctly

---

## What NOT to Change

**DO NOT MODIFY**:
- ❌ Any styling, colors, or CSS classes
- ❌ Layout or spacing
- ❌ Component structure (unless functionality is broken)
- ❌ Design system tokens
- ❌ Visual appearance

**ONLY VERIFY**:
- ✅ Data is loading correctly
- ✅ Filters work correctly
- ✅ Calculations are accurate
- ✅ Links work
- ✅ All functionality is present

---

## Testing Steps

1. **Check API**: `curl http://localhost:3000/api/hub/projects | jq '.projects | length'`
2. **Check Filters**: Click each filter button, verify counts match
3. **Check Stats**: Verify stat card numbers are correct
4. **Check Verdicts**: Verify verdict badges appear on project cards
5. **Check Documents**: Verify documents are discoverable and linked
6. **Check Virtual Projects**: Verify all 16 portfolio scores create projects

---

## Summary

All functionality appears to be implemented. The task is to **verify** it works with Claude Code's design, not to change the design.

