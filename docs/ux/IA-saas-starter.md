# Information Architecture: SaaS Starter Hub

## Site Map

```
/
├── / (Home)
│   └── Links to /hub and /workflows
├── /hub (Portfolio Dashboard)
│   ├── Project cards
│   └── Project detail views
├── /workflows (Workflows Dashboard)
│   ├── Workflow list
│   ├── /workflows/[id] (Workflow detail)
│   └── Create workflow dialog
├── /docs/product/[...path] (Document viewer)
│   └── Dynamic document rendering
└── /landing (Marketing landing)
    └── Marketing content
```

## Navigation Structure

### Primary Navigation
- **Home** (`/`) - Entry point with links to main features
- **Hub** (`/hub`) - Portfolio dashboard
- **Workflows** (`/workflows`) - Workflow management

### Secondary Navigation
- **Document Viewer** (`/docs/product/[...path]`) - View project documents
- **Landing** (`/landing`) - Marketing page

### Contextual Navigation
- **Back to Hub** - Available in document viewer
- **Workflow Detail** - Available from workflow list
- **Create Workflow** - Available from workflows dashboard

## User Flows

### Flow 1: Create and Execute Discovery Workflow

```
1. User visits /workflows
2. User clicks "Create Workflow"
3. User fills form (idea name, slug, phase)
4. User submits form
5. Workflow created and displayed
6. User clicks workflow card
7. User views workflow detail page
8. User clicks "Execute Step" for step 1
9. Step executes (API call)
10. Step status updates to "completed"
11. User can execute next step
```

### Flow 2: View Project Documents

```
1. User visits /hub
2. User sees project cards
3. User clicks on project card
4. User sees project documents list
5. User clicks on document
6. Document renders in viewer
7. User can navigate back to hub
```

### Flow 3: Track Validation Results

```
1. User visits /workflows/[id]
2. User sees validation workflow
3. User scrolls to "Validation Thresholds"
4. User enters results (signups, conversion rate, etc.)
5. Results update automatically
6. User clicks "Check Thresholds"
7. System compares results to thresholds
8. User sees pass/fail status
```

## Keyboard Flows

### Dialog Navigation
- **Tab**: Move to next focusable element
- **Shift+Tab**: Move to previous focusable element
- **Escape**: Close dialog
- **Enter**: Submit form (when on submit button)

### Workflow List
- **Tab**: Navigate through workflow cards
- **Enter/Space**: Open workflow detail
- **Arrow keys**: Navigate between cards (if implemented)

### Document Viewer
- **Tab**: Navigate through page elements
- **Backspace** (when focused on back link): Navigate back

## Edge Cases

### Empty States
- No workflows: Show "Create Your First Workflow" CTA
- No projects: Show "Create Your First Project" CTA
- No documents: Show "No documents available" message

### Error States
- Workflow creation fails: Show error message in dialog
- Step execution fails: Show error in step status
- Document not found: Show 404 page with back link
- API error: Show user-friendly error message

### Loading States
- Workflow creation: Show "Creating..." button state
- Step execution: Show spinner in step card
- Document loading: Show loading skeleton
- API calls: Show appropriate loading indicators

## Permissions

### Current (MVP)
- All authenticated users have full access
- No role-based restrictions

### Future
- Workspace owners
- Workspace members
- Read-only viewers

