# Design System: SaaS Starter Hub

## Design Tokens

### Colors
- **Primary**: `hsl(var(--primary))` - Main brand color
- **Primary Foreground**: `hsl(var(--primary-foreground))` - Text on primary
- **Muted**: `hsl(var(--muted))` - Secondary text
- **Muted Foreground**: `hsl(var(--muted-foreground))` - Text on muted

### Typography
- **Font Sans**: Geist Sans (variable)
- **Font Mono**: Geist Mono (variable)
- **Base Size**: 16px
- **Line Height**: 1.5

### Spacing
- **Base Unit**: 4px
- **Scale**: 4, 8, 12, 16, 24, 32, 48, 64

### Border Radius
- **Small**: 4px (rounded)
- **Medium**: 8px (rounded-md)
- **Large**: 12px (rounded-lg)

### Shadows
- **Small**: `shadow-sm`
- **Medium**: `shadow`
- **Large**: `shadow-lg`

## Component Patterns

### Buttons

#### Primary Button
```tsx
<button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
  Button Text
</button>
```

#### Secondary Button
```tsx
<button className="px-4 py-2 border rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
  Button Text
</button>
```

### Forms

#### Input Field
```tsx
<div>
  <label htmlFor="input-id" className="block text-sm font-medium mb-1">
    Label <span className="text-red-600" aria-label="required">*</span>
  </label>
  <input
    id="input-id"
    type="text"
    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
    aria-required="true"
    aria-describedby="input-hint"
  />
  <p id="input-hint" className="sr-only">
    Helper text for screen readers
  </p>
</div>
```

#### Error State
```tsx
<div role="alert" aria-live="assertive" className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm">
  <strong className="font-semibold">Error:</strong> Error message
</div>
```

### Dialogs

#### Dialog Structure
```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  <h2 id="dialog-title">Dialog Title</h2>
  <p id="dialog-description" className="sr-only">
    Dialog description
  </p>
  {/* Dialog content */}
</div>
```

## States

### Loading State
- Show spinner or skeleton
- Announce to screen readers: "Loading..."
- Disable interactive elements
- Maintain focus position

### Empty State
- Clear message explaining empty state
- Actionable CTA if applicable
- Screen reader announcement
- Keyboard accessible

### Error State
- Visible error message
- `role="alert"` for screen readers
- Associated with form fields (aria-describedby)
- Clear recovery path

### Success State
- Visible success message
- `role="status"` for screen readers
- Auto-dismiss after appropriate time
- Clear next steps

## Accessibility Patterns

### Focus Management
- Visible focus indicators on all interactive elements
- Logical tab order
- Focus trap in modals
- Focus returns to trigger after modal closes

### Screen Reader Support
- All images have alt text
- All form fields have labels
- All buttons have descriptive text or aria-label
- Dynamic content announced via aria-live
- Error messages announced immediately

### Keyboard Navigation
- All functionality available via keyboard
- Escape closes modals
- Enter/Space activate buttons
- Arrow keys navigate lists/selects
- Tab order is logical

## Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile-First Approach
- Design for mobile first
- Progressive enhancement for larger screens
- Touch targets minimum 44x44px
- Adequate spacing between interactive elements

