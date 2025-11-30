# Design System Split: Marketing vs SaaS Product

## Overview

We're implementing two distinct design systems to create clear visual separation between:
- **Marketing pages** (Home, Articles) - Organic, warm, editorial feel
- **SaaS Product pages** (Portfolio/Hub, Workflows) - Clean, functional, data-focused

## Inspiration

### Marketing Pages (SynthFlow Ecosystem)
- Organic, warm color palette (orange/coral accents)
- Large hero sections with prominent typography
- Glassmorphic cards with organic shapes
- Soft gradients and background imagery
- Editorial/typography-driven layout
- Prominent, organic CTA buttons

### SaaS Product Pages (SynthFlow Dashboard)
- Clean, professional, data-focused
- Left sidebar navigation (standard SaaS pattern)
- Top search bar
- Tables and structured data layouts
- Functional/utilitarian aesthetic
- Green accents for status indicators
- Clean white backgrounds with subtle gray

## Implementation Strategy

1. **Create separate CSS files:**
   - `globals.css` - Base Bio-Digital tokens (shared)
   - `marketing.css` - Marketing-specific overrides
   - `saas-product.css` - SaaS product-specific overrides

2. **Route Group Structure:**
   - `/app/(marketing)/` - Marketing pages (Home, Articles)
   - `/app/(app)/` - SaaS product pages (Hub, Workflows)

3. **Layout Strategy:**
   - Root layout - Shared header, base styles
   - Marketing layout - Marketing-specific styles, no sidebar
   - SaaS layout - Sidebar navigation, dashboard styling

4. **Component Variants:**
   - Marketing components - Glassmorphic, organic shapes
   - SaaS components - Clean, functional, data-focused

