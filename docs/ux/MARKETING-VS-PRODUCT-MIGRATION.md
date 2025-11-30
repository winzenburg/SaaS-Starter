# Marketing vs Product Design Migration Plan

## Goal
Create clear visual separation between marketing pages (Home, Articles) and SaaS product pages (Hub, Workflows) using SynthFlow designs as inspiration.

## Current Structure Issues
- Homepage is at `/app/page.tsx` (needs marketing styles)
- Articles are at `/app/articles/` (needs marketing styles)
- Hub exists in both `/app/hub/page.tsx` and `/app/(product)/hub/page.tsx` (consolidate)
- Workflows exist in both `/app/workflows/page.tsx` and `/app/(product)/workflows/page.tsx` (consolidate)

## Target Structure

### Marketing Pages (Route Group: `(marketing)`)
- `/` - Homepage (marketing hero, glassmorphic cards, organic feel)
- `/articles` - Articles list (marketing layout)
- `/articles/[slug]` - Individual articles (marketing layout)

**Design Inspiration**: SynthFlow Ecosystem page
- Warm, organic color palette
- Large hero sections
- Glassmorphic cards
- Soft gradients and background imagery
- Editorial/typography-driven

### SaaS Product Pages (Route Group: `(product)`)
- `/hub` - Portfolio dashboard (SaaS layout with sidebar)
- `/workflows` - Workflows list (SaaS layout with sidebar)
- `/workflows/[id]` - Workflow detail (SaaS layout with sidebar)

**Design Inspiration**: SynthFlow Dashboard
- Clean, professional, data-focused
- Left sidebar navigation
- Top search bar
- Tables and structured data
- Functional/utilitarian aesthetic

## Implementation Steps

1. ✅ Create `marketing.css` with organic, warm styles
2. ✅ Create `saas-product.css` with clean, functional styles
3. ✅ Create `(marketing)/layout.tsx` that imports marketing.css
4. ✅ Update `(product)/layout.tsx` to import saas-product.css
5. ⏳ Move homepage to `(marketing)/page.tsx`
6. ⏳ Move articles to `(marketing)/articles/`
7. ⏳ Remove duplicate hub/workflows pages from root `/app/`
8. ⏳ Update pages to use appropriate styling classes

## Style Differences

### Marketing
- Background: Warm gradient with organic overlays
- Cards: Glassmorphic with soft shadows
- Typography: Large, editorial serif headings
- Colors: Warm coral/orange accents
- Spacing: Generous, airy
- CTAs: Pill-shaped, prominent

### SaaS Product
- Background: Clean white with subtle gray sidebar
- Cards: White with subtle borders and shadows
- Typography: Functional, clear hierarchy
- Colors: Green for status, muted grays
- Spacing: Efficient, data-dense
- Buttons: Clean, functional

