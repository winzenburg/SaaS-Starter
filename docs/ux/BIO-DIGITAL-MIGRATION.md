# Bio-Digital Design System Migration

## Current Status

✅ **Completed:**
- `globals.css` - Bio-Digital design system fully implemented
- `src/app/page.tsx` - Homepage converted to light theme
- Button, Card, Badge components - Using Bio-Digital tokens

❌ **Still Needs Fixing:**
- ~180+ instances of dark mode classes across multiple pages
- All docs pages (validation, discovery, product, research)
- Hub page
- Workflows pages (list and detail)
- Articles pages
- Component cards and lists
- Design demo pages (these are intentionally different)

## Common Patterns to Replace

### Background Patterns
```tsx
// ❌ OLD - Dark mode
className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"

// ✅ NEW - Bio-Digital (light, inherits from body)
className="min-h-screen"
// Body already has the Bio-Digital gradient background
```

### Text Colors
```tsx
// ❌ OLD
className="text-white"
className="text-gray-300"
className="text-gray-400"

// ✅ NEW - Use Bio-Digital tokens
className="text-[hsl(var(--text-main))]"
className="text-[hsl(var(--text-muted))]"
// Or use semantic classes that map to Bio-Digital
```

### Card Backgrounds
```tsx
// ❌ OLD
className="bg-slate-800/50 border border-slate-700"

// ✅ NEW - Use glass-card utility
className="glass-card"
// Already includes Bio-Digital glassmorphism
```

### Headings
```tsx
// ❌ OLD
className="text-white font-bold"

// ✅ NEW
className="text-[hsl(var(--text-main))] font-heading"
// Uses Fraunces serif with proper Bio-Digital styling
```

## Systematic Fix Strategy

1. **Remove all dark background gradients** - Pages should rely on body background
2. **Replace text colors** - Use Bio-Digital CSS variables
3. **Update card components** - Use `glass-card` class
4. **Fix headings** - Use `font-heading` and Bio-Digital text sizes
5. **Update badges** - Already fixed in component, just remove overrides

## Key Files to Update (Priority Order)

### High Priority (Main user flows)
1. `src/app/hub/page.tsx`
2. `src/app/workflows/page.tsx`
3. `src/app/workflows/[id]/page.tsx`
4. `src/app/articles/page.tsx`
5. `src/app/articles/[slug]/page.tsx`

### Medium Priority (Documentation)
6. `src/app/docs/**/page.tsx` (all doc routes)
7. Component doc lists

### Lower Priority
8. Design demo pages (intentionally different aesthetic)
9. Component-specific overrides

## Testing Checklist

After migration, verify:
- [ ] All pages show light gradient background
- [ ] Text is dark and readable (not white on light)
- [ ] Cards have glassmorphic effect
- [ ] Primary color (coral) is visible and correct
- [ ] Typography uses Fraunces/Outfit fonts
- [ ] Spacing follows 8pt grid
- [ ] All interactive elements have proper hover states

