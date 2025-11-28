# Keyboard Flows: SaaS Starter Hub

## Dialog Navigation (Create Workflow)

### Tab Order
1. Idea Name input
2. Idea Slug input
3. Phase select
4. Cancel button
5. Create Workflow button

### Keyboard Actions
- **Tab**: Move to next field
- **Shift+Tab**: Move to previous field
- **Escape**: Close dialog (if not submitting)
- **Enter**: Submit form (when on submit button)
- **Arrow keys**: Navigate select options

### Focus Management
- Focus moves to first input when dialog opens
- Focus returns to trigger button when dialog closes
- Focus trapped within dialog (Tab cycles within)

## Workflow List Navigation

### Tab Order
1. "Create Workflow" button
2. First workflow card (entire card focusable)
3. Second workflow card
4. ... (continues through all cards)

### Keyboard Actions
- **Tab**: Move to next card
- **Shift+Tab**: Move to previous card
- **Enter/Space**: Open workflow detail (when card focused)
- **Arrow keys**: Navigate between cards (if implemented)

### Focus Management
- Focus visible on all interactive elements
- Focus indicator uses primary color with 2px ring
- Focus moves to workflow detail page after opening

## Workflow Detail Page

### Tab Order
1. Back link (if present)
2. Workflow status badge
3. First step card
4. "Execute" button (if step pending)
5. Second step card
6. ... (continues through all steps)
7. Validation Thresholds section (if validation workflow)
8. Input fields in thresholds
9. "Check Thresholds" button

### Keyboard Actions
- **Tab**: Move to next element
- **Shift+Tab**: Move to previous element
- **Enter/Space**: Activate button or link
- **Arrow keys**: Navigate within select/radio groups

### Focus Management
- Focus visible on all interactive elements
- Focus moves to executed step output when step completes
- Focus moves to error message when error occurs

## Document Viewer

### Tab Order
1. "Back to Hub" link
2. Document title
3. Document content (read-only, not focusable)
4. Any links within document

### Keyboard Actions
- **Tab**: Move to next link
- **Shift+Tab**: Move to previous link
- **Enter/Space**: Activate link
- **Backspace** (when focused on back link): Navigate back

### Focus Management
- Focus visible on all links
- Focus returns to hub after navigation

## Form Input Navigation

### Tab Order (Validation Thresholds)
1. Signups input
2. Conversion Rate input
3. DM Replies input
4. WTP Signals input
5. Check Thresholds button

### Keyboard Actions
- **Tab**: Move to next input
- **Shift+Tab**: Move to previous input
- **Enter**: Submit form (when on submit button)
- **Arrow keys**: Increment/decrement number inputs (if implemented)

### Focus Management
- Focus visible on all inputs
- Focus moves to error message when validation fails
- Focus moves to success message when update succeeds

## Skip Links

### Implementation
- Skip to main content link (visible on focus)
- Skip to navigation link (if navigation added)
- Skip to footer link (if footer added)

### Keyboard Actions
- **Tab** (on page load): Focus moves to skip link
- **Enter**: Skip to target section
- Focus moves to target after skip

## Keyboard Shortcuts (Future)

### Global Shortcuts
- **Ctrl/Cmd + K**: Open command palette
- **Ctrl/Cmd + N**: Create new workflow
- **Ctrl/Cmd + H**: Navigate to hub
- **Ctrl/Cmd + W**: Navigate to workflows

### Workflow Shortcuts
- **Ctrl/Cmd + E**: Execute next pending step
- **Ctrl/Cmd + R**: Refresh workflow status

