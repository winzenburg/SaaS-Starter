# SynthFlow Design System Rebuild Plan

## Reference Sites Analysis

### Marketing Site (`/`)
- **Aesthetic**: Organic, warm, bio-inspired ("Ethereal Ecosystem")
- **Color**: OKLCH-based, warm gradients (peach/orange to light grey)
- **Typography**: Fraunces serif for headlines (large, italic), clean sans for body
- **Layout**: Centered hero, organic spacing, greenhouse/conservatory imagery
- **Key Elements**:
  - Leaf logo icon
  - Large serif headline with italic accent words
  - Warm gradient background
  - Glassmorphism cards
  - Orange primary buttons

### Dashboard Site (`/dashboard`)
- **Aesthetic**: Clinical, precise, data-first ("Digital Laboratory")
- **Color**: Clean neutrals, sparse use of accent colors
- **Typography**: Fraunces reserved for high-level headers, Outfit dominates
- **Layout**: Fixed sidebar (240px), fixed header (64px), structured 8pt grid
- **Key Elements**:
  - Fixed sidebar navigation
  - Search bar in header
  - Large feature cards
  - Data tables with clean borders
  - Minimal, precise spacing

## Implementation Steps

### Phase 1: Fix Tailwind Configuration
- Configure Tailwind v4 to recognize design tokens as utilities
- Convert color system from HSL to OKLCH
- Ensure `bg-primary`, `text-primary`, etc. work

### Phase 2: Rebuild Marketing CSS
- Match SynthFlow Ecosystem aesthetic exactly
- Warm gradients, organic layouts
- Glassmorphism effects
- Typography scale

### Phase 3: Rebuild Product CSS  
- Match SynthFlow Dashboard aesthetic exactly
- Fixed sidebar/header layout
- Clean, structured spacing
- Data-first components

### Phase 4: Update Components
- Restyle all shadcn/ui components
- Ensure marketing vs product context awareness

### Phase 5: Verify Match
- Use Playwright to compare side-by-side
- Iterate until exact match

