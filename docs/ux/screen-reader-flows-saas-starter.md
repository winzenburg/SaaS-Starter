# Screen Reader Flows: SaaS Starter Hub

## Flow 1: Create Workflow (Screen Reader)

### Announcements
1. **Dialog opens**: "Create New Workflow dialog. Fill in the form below to create a new discovery or validation workflow."
2. **Idea Name field**: "Idea Name, required, text input"
3. **Idea Slug field**: "Idea Slug, required, text input. Enter a URL-friendly identifier for your idea. It will be automatically formatted to lowercase with hyphens."
4. **Phase select**: "Phase, required, dropdown. Select whether this is a discovery workflow or validation workflow."
5. **Error (if any)**: "Error: [error message]" (assertive)
6. **Success**: "Workflow created successfully" (polite)

### Navigation
- User tabs through form fields
- Screen reader announces label, type, and required status
- Helper text announced via aria-describedby
- Error messages announced immediately when they appear

## Flow 2: Execute Workflow Step (Screen Reader)

### Announcements
1. **Step card**: "Step 1: Manus Narrative Generation, status: pending"
2. **Execute button**: "Execute Step 1, button"
3. **Step executing**: "Step 1 status changed to in progress" (polite)
4. **Step completed**: "Step 1 completed successfully. Output: [output summary]" (polite)
5. **Step failed**: "Step 1 failed. Error: [error message]" (assertive)

### Navigation
- User tabs through workflow steps
- Screen reader announces step name, status, and available actions
- Status changes announced via aria-live regions
- Outputs announced when steps complete

## Flow 3: View Validation Results (Screen Reader)

### Announcements
1. **Section**: "Validation Thresholds, section"
2. **Signups input**: "Signups, number input. Enter the number of signups for this validation workflow"
3. **Conversion Rate input**: "Conversion Rate, percentage, number input. Enter the conversion rate as a percentage. Target threshold: 15 percent"
4. **Results update**: "Results updated successfully" (polite)
5. **Check button**: "Check Thresholds, button. Compares current results against validation thresholds and reports which metrics passed or failed"
6. **Threshold check result**: "All thresholds passed! Validation is successful" OR "Thresholds not met. Failed metrics: [list]" (assertive)

### Navigation
- User tabs through input fields
- Screen reader announces label, type, and threshold information
- Updates announced via aria-live regions
- Results announced clearly

## Flow 4: Navigate Hub (Screen Reader)

### Announcements
1. **Page load**: "SaaS Starter Hub, heading level 1"
2. **Project card**: "[Project Name], [Phase] phase, [Score] score, link"
3. **Document link**: "[Document Name], link"
4. **Empty state**: "No projects yet. Create your first project, button"

### Navigation
- User tabs through project cards
- Screen reader announces project name, phase, and score
- User can activate cards to view details
- Empty states clearly announced

## ARIA Live Regions

### Implementation
- **Error messages**: `role="alert"` with `aria-live="assertive"`
- **Status messages**: `role="status"` with `aria-live="polite"`
- **Dynamic updates**: Use appropriate aria-live regions for workflow status changes

### Best Practices
- Use assertive for errors (immediate attention)
- Use polite for status updates (non-intrusive)
- Keep messages concise and actionable
- Update aria-atomic based on content type

