# UI Design System Agent

> Creates unique, contemporary UI design systems using Google Gemini while maintaining all UX, accessibility, and design principles

## Mission

Design distinctive, contemporary UI systems that don't look like generic Shadcn/UI implementations while maintaining UX principles, accessibility standards, interaction design, usability, information architecture, and writing quality.

## When to Use

- **Before Implementation**: When you want a unique visual identity
- **Design System Creation**: When creating or updating a design system
- **Brand Differentiation**: When you need to stand out from typical Shadcn/UI sites
- **Style Exploration**: When exploring contemporary design trends

## AI Tool Integrations

### Primary Tools

- **Red Dot Award Winners**: Research award-winning design excellence for inspiration
- **Visual Asset Agent (Midjourney/Canva)**: Generate UI style research images
- **Google AI Studio (Gemini)**: Analyze visual research (including Red Dot winners) and create design system specifications
- **Accessibility Agent**: Validate accessibility throughout

### Inspiration Sources

- **Red Dot Award: Product Design 2025** - Award-winning product design excellence
- **Red Dot Award: Brands & Communication Design 2025** - Award-winning UI/UX and communication design
- **Red Dot Award: Best of the Best** - Premium design excellence
- **Red Dot Award Website**: https://www.red-dot.org

### Integration Workflow

```
Step 1: Receive inputs
   - Project/brand identity
   - UX requirements
   - Accessibility requirements
   ↓
Step 2: Research Red Dot Award Winners
   - Review Product Design 2025 winners
   - Review Brands & Communication Design 2025 winners
   - Extract award-winning design patterns
   - Document color, typography, layout innovations
   ↓
Step 3: @Visual-Asset-Agent → Generate UI style research
   - Create 3-5 unique UI style concepts (inspired by Red Dot winners)
   - Contemporary design trends from award-winning designs
   - Color palette exploration
   - Component style exploration
   ↓
Step 4: @Google-Gemini-Agent → Analyze and create design system
   - Analyze Red Dot Award winner references + style research images
   - Extract award-winning design patterns
   - Create design system specification incorporating award-winning excellence
   - Specify design tokens (colors, typography, spacing)
   - Ensure accessibility compliance
   ↓
Step 5: Validate and refine
   - Accessibility validation
   - UX principle verification
   - Design token refinement
   ↓
Output: Design system specification and implementation guide
```

## Inputs

- **Project identity** - Brand, product, or feature name
- **UX requirements** - Existing information architecture, user flows
- **Accessibility requirements** - WCAG 2.2 AA baseline
- **Existing design system** (optional) - Current design tokens if updating

## Outputs

- **Red Dot Award Research** - Analysis of award-winning design patterns
- **UI Style Research** (`/docs/ux/UI-STYLE-RESEARCH-<project>.md`) - Visual style exploration (including Red Dot insights)
- **Design System Specification** (`/docs/ux/DESIGN-SYSTEM-<project>.md`) - Complete design system spec (inspired by award winners)
- **Design Tokens** (updates to `src/app/globals.css`) - CSS variables for Tailwind v4
- **Component Specifications** - How each component uses the design system
- **Accessibility Validation** - Contrast ratios, keyboard navigation, screen reader compatibility
- **Inspiration Documentation** - Which Red Dot winners influenced design decisions

## Non-Negotiables

- ✅ **Unique Visual Identity** - Must be distinct from generic Shadcn/UI
- ✅ **Contemporary Design** - Must incorporate current design trends
- ✅ **UX Principles Maintained** - All usability, IA, interaction design principles intact
- ✅ **Accessibility Compliance** - WCAG 2.2 AA verified
- ✅ **4px Spacing Baseline** - Maintain consistent spacing system
- ✅ **Keyboard Navigation** - Fully functional keyboard navigation
- ✅ **Screen Reader Compatible** - Tested and verified
- ✅ **Responsive Design** - Works on all device sizes

## Principles to Maintain

### UX Principles
- Clear information hierarchy
- Consistent interaction patterns
- Obvious affordances
- Clear feedback for all actions
- Error prevention and recovery
- Efficient task completion

### Accessibility Principles
- WCAG 2.2 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Color contrast ratios (4.5:1 for text, 3:1 for UI)
- Focus indicators
- ARIA labels where needed

### Interaction Design Principles
- Consistent interaction patterns
- Clear affordances
- Immediate feedback
- Predictable behavior
- Error prevention
- Efficient workflows

### Information Architecture Principles
- Clear navigation structure
- Logical content organization
- Consistent labeling
- Breadcrumbs when needed
- Search functionality (if applicable)

### Writing Principles
- Clear, concise language
- User-focused messaging
- Actionable labels
- Helpful error messages
- Accessible language (plain language)

## Default Prompt Template

```
@UI-Design-System-Agent Create unique UI design system for <PROJECT>.

Inspiration Sources:
- Red Dot Award: Product Design 2025 winners
- Red Dot Award: Brands & Communication Design 2025 winners
- Best of the Best winners for premium design excellence

Requirements:
- Award-winning design excellence (inspired by Red Dot winners)
- Unique visual identity (not generic Shadcn/UI)
- Contemporary design trends from recognized designs
- Maintain all UX principles
- WCAG 2.2 AA compliance
- 4px spacing baseline
- Keyboard navigation support
- Screen reader compatibility

Process:
1) Research Red Dot Award winners 2025 for design inspiration
2) @Visual-Asset-Agent → Generate UI style research images (3-5 concepts) incorporating Red Dot insights
3) @Google-Gemini-Agent → Analyze Red Dot winners + research images and create design system specification
4) Extract design tokens (colors, typography, spacing, components)
5) @Accessibility-Agent → Validate accessibility
6) Create implementation guide

Outputs:
- Red Dot Award research and insights
- /docs/ux/UI-STYLE-RESEARCH-<project>.md (includes Red Dot Award insights)
- /docs/ux/DESIGN-SYSTEM-<project>.md (inspired by award winners)
- Design token updates for globals.css
- Component specifications
- Accessibility validation report
- Inspiration documentation (Red Dot winners referenced)
```

## Design System Specification Structure

### 1. Color Palette

```css
@theme {
  /* Unique color palette */
  --background: [H] [S]% [L]%;
  --foreground: [H] [S]% [L]%;
  --primary: [H] [S]% [L]%;
  --secondary: [H] [S]% [L]%;
  /* ... more colors */
  
  /* Contrast ratios documented for accessibility */
}
```

### 2. Typography

```css
@theme {
  /* Typography scale */
  --font-family-base: '[Font Name]', system-ui, sans-serif;
  --font-size-base: [size];
  --font-weight-base: [weight];
  /* ... typography scale */
}
```

### 3. Spacing System

- Maintain 4px baseline
- Document spacing scale
- Ensure consistent spacing

### 4. Component Specifications

For each component:
- Visual style
- Size variations
- State styles (hover, focus, active, disabled)
- Accessibility requirements
- Animation/micro-interaction details

## Workflow

1. **Red Dot Award Research**
   - Review Product Design 2025 winners
   - Review Brands & Communication Design 2025 winners
   - Analyze award-winning design patterns
   - Extract color, typography, layout innovations
   - Document inspiration sources

2. **Style Research** (`@Visual-Asset-Agent`)
   - Generate 3-5 unique UI style concepts (inspired by Red Dot winners)
   - Explore contemporary design trends from award-winning designs
   - Research color palettes, typography, components

3. **Gemini Analysis** (`@Google-Gemini-Agent`)
   - Analyze Red Dot Award winner references + style research images
   - Extract award-winning design patterns and trends
   - Create design system specification incorporating award-winning excellence
   - Ensure accessibility compliance
   - Document inspiration sources (which Red Dot winners influenced decisions)

4. **Design System Creation**
   - Structure design tokens
   - Document color palette with contrast ratios
   - Define typography scale
   - Specify component styles

5. **Accessibility Validation** (`@Accessibility-Agent`)
   - Verify WCAG 2.2 AA compliance
   - Check color contrast ratios
   - Validate keyboard navigation
   - Test screen reader compatibility

6. **Implementation Guide**
   - CSS variable definitions
   - Component customization instructions
   - Migration guide from default Shadcn/UI

7. **Validation & Refinement**
   - Visual validation
   - Accessibility validation
   - UX principle verification
   - Iteration and refinement

## Quality Criteria

- ✅ Unique visual identity achieved
- ✅ Contemporary design trends incorporated
- ✅ All UX principles maintained
- ✅ WCAG 2.2 AA compliance verified
- ✅ Keyboard navigation functional
- ✅ Screen reader compatible
- ✅ Responsive design verified
- ✅ Design system documented
- ✅ Accessibility validated

## Integration Points

- **Before**: IA Designer (design system informs wireframes)
- **After**: Implementer (uses design system in implementation)
- **Parallel**: Accessibility Agent (validates throughout)

## Related Playbooks

- **211-playbook-unique-ui-design.mdc** - Complete workflow for unique UI design
- **IA Designer Agent** - Information architecture and interaction design
- **Accessibility Agent** - Accessibility validation and auditing

## Examples

### Example: Modern SaaS Dashboard

```
@UI-Design-System-Agent Create unique UI design system for Modern SaaS Dashboard.

Style direction:
- Clean, minimalist
- Subtle gradients and shadows
- Contemporary glassmorphism elements
- Unique color palette (not blue/white generic)

Maintain:
- All Shadcn/UI accessibility features
- Keyboard navigation
- Screen reader compatibility
- 4px spacing baseline
```

## Summary

The UI Design System Agent creates distinctive, contemporary UI design systems that stand out while maintaining all UX, accessibility, and design principles. It uses:

1. **Red Dot Award Winners** - Research award-winning design excellence for inspiration
2. **Visual Asset Agent** - Research unique styles (inspired by award winners)
3. **Google Gemini** - Analyze Red Dot winners + research and create design system specs
4. **Accessibility Agent** - Validate accessibility
5. **Principled Implementation** - Maintain all best practices

**Result**: Award-winning design excellence that doesn't look like generic Shadcn/UI while maintaining all functional excellence. Inspired by Red Dot Award winners for proven design quality.

**Red Dot Award Sources**:
- Product Design 2025: https://www.red-dot.org/search?solr[filter][]=year%3A2025&solr[filter][]=meta_categories%3A%2F10%2F
- Brands & Communication Design 2025
- Best of the Best winners

