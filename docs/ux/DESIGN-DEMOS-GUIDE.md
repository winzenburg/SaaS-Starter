# Design Demos Guide

## Overview

The Design Demos section allows you to explore and visualize different design approaches before committing to a full implementation. Each demo is a standalone page that showcases a complete design system.

## Available Demos

### 1. Strategic Minimalist ✅
**Path**: `/design-demos/strategic-minimalist`

**Design Characteristics**:
- **Background**: Deep charcoal (#0F0F11)
- **Accent Color**: Red Dot Red / International Orange (#FF4D00)
- **Typography**: Helvetica Neue (headings) + Courier New (body)
- **Layout**: Bento grid portfolio
- **Aesthetic**: Minimal, strategy-focused, bold typography

**Key Features**:
- Large, impactful hero typography (8vw headings)
- Bento grid layout with varied card sizes
- Monospace body text for a "strategic" feel
- Hover effects with parallax scrolling
- Minimal color palette (charcoal + red accent)

### 2. Organic Soft ✅
**Path**: `/design-demos/organic-soft`

**Design Characteristics**:
- **Background**: Light gradient (#f3f4f6 → #e8eaf6)
- **Accent Color**: Soft Coral (#ff8c69)
- **Typography**: Georgia (headings) + Helvetica Neue (body)
- **Layout**: Vertical glass card stack
- **Aesthetic**: Soft, organic, glass morphism

**Key Features**:
- Ambient floating orb animation (breathe effect)
- Glass morphism cards with backdrop blur
- Pill-shaped stat badges
- Floating bottom navigation pill
- Serif typography for elegant feel
- Horizontal card layout with stats on right

### 3. Systemic ✅
**Path**: `/design-demos/systemic`

**Design Characteristics**:
- **Background**: Pure white (#ffffff)
- **Accent Color**: International Klein Blue (#0044FF)
- **Typography**: Courier Prime/New (monospace)
- **Layout**: Grid-based with black borders
- **Aesthetic**: Technical, architectural, structured

**Key Features**:
- Grid system with black borders (technical drawing style)
- Monospace typography throughout
- Table-style project rows
- Scrolling ticker animation at top
- Sidebar with metadata display
- Hover effects on project rows

## Accessing Demos

1. **Demo Hub**: Visit `/design-demos` to see all available demos
2. **Individual Demo**: Click on any demo card or visit `/design-demos/{demo-slug}`

## Adding New Demos

To add a new design demo:

1. Create a new page at `src/app/design-demos/{your-demo-slug}/page.tsx`
2. Use `styled-jsx` for scoped styling (like the Strategic Minimalist demo)
3. Add the demo to the list in `src/app/design-demos/page.tsx`
4. Ensure the demo is standalone and doesn't conflict with the main site styles

## Demo Structure

Each demo page should:
- Use `"use client"` if it needs interactivity
- Have its own complete styling (scoped with `styled-jsx`)
- Include a "Back to Demos" link
- Be fully self-contained (no dependencies on main site components)
- Maintain accessibility standards (WCAG 2.2 AA)

## Implementation Workflow

1. **Explore**: Review all demo pages at `/design-demos`
2. **Choose**: Select your preferred design approach
3. **Implement**: We'll apply the chosen design across the entire site
4. **Customize**: Fine-tune colors, typography, and components as needed

---

**Current Status**: 
- ✅ Demo 1 (Strategic Minimalist) - Live
- ✅ Demo 2 (Organic Soft) - Live
- ✅ Demo 3 (Systemic) - Live

All three design demos are now available for review!

