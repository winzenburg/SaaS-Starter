# User Flows: SaaS Starter Hub

## Flow 1: Create Discovery Workflow

### Happy Path

```mermaid
graph TD
    A[User visits /workflows] --> B[User clicks Create Workflow]
    B --> C[Dialog opens]
    C --> D[User enters idea name]
    D --> E[User enters idea slug]
    E --> F[User selects Discovery phase]
    F --> G[User clicks Create]
    G --> H[API creates workflow]
    H --> I[Workflow appears in list]
    I --> J[User clicks workflow card]
    J --> K[Workflow detail page loads]
```

### Emotional Peak
**"I can see my workflow is created and ready to execute"** - When workflow appears in list

### Aha Moment
**"I understand how to execute steps systematically"** - When user sees step-by-step interface

### Story Resolution
**"I've completed discovery and have validated insights"** - When workflow reaches completed state

### Failure Paths

**Path A: Validation Error**
- User submits form with missing fields
- Error message appears in dialog
- User corrects and resubmits

**Path B: API Error**
- Workflow creation fails
- Error message appears
- User can retry or cancel

## Flow 2: Execute Workflow Step

### Happy Path

```mermaid
graph TD
    A[User views workflow detail] --> B[User sees pending steps]
    B --> C[User clicks Execute Step 1]
    C --> D[Step status changes to in_progress]
    D --> E[API executes step]
    E --> F[Step completes successfully]
    F --> G[Step status changes to completed]
    G --> H[Step output displayed]
    H --> I[Next step becomes available]
```

### Emotional Peak
**"I can see progress happening in real-time"** - When step status updates

### Aha Moment
**"I understand how the workflow system works"** - When first step completes

### Story Resolution
**"I've executed all steps and have results"** - When workflow completes

### Failure Paths

**Path A: Step Execution Error**
- Step execution fails
- Error message appears in step card
- User can retry or skip

**Path B: Network Error**
- API call fails
- Error message appears
- User can retry

## Flow 3: View Project Documents

### Happy Path

```mermaid
graph TD
    A[User visits /hub] --> B[User sees project cards]
    B --> C[User clicks project card]
    C --> D[Project detail view loads]
    D --> E[User sees document list]
    E --> F[User clicks document]
    F --> G[Document viewer loads]
    G --> H[Markdown renders]
    H --> I[User reads document]
    I --> J[User clicks Back to Hub]
    J --> K[Returns to hub]
```

### Emotional Peak
**"I can easily find and read my project documentation"** - When document loads

### Aha Moment
**"I understand my project's validation status"** - When viewing validation results

### Story Resolution
**"I have all the information I need to make decisions"** - After reviewing documents

### Failure Paths

**Path A: Document Not Found**
- Document file missing
- 404 page displayed
- User can navigate back

**Path B: Invalid Path**
- Invalid document path
- Error message displayed
- User can try different path

## Flow 4: Track Validation Results

### Happy Path

```mermaid
graph TD
    A[User views validation workflow] --> B[User scrolls to thresholds]
    B --> C[User enters signups]
    C --> D[Results update automatically]
    D --> E[User enters conversion rate]
    E --> F[Results update automatically]
    F --> G[User clicks Check Thresholds]
    G --> H[System compares to thresholds]
    H --> I[Pass/fail status displayed]
    I --> J[User sees which metrics passed]
```

### Emotional Peak
**"I can see my validation progress clearly"** - When thresholds are checked

### Aha Moment
**"I understand what I need to improve"** - When seeing failed metrics

### Story Resolution
**"I know whether to proceed or pivot"** - After seeing threshold results

### Failure Paths

**Path A: No Results Entered**
- User clicks Check without results
- Error message appears
- User enters results

**Path B: Invalid Input**
- User enters invalid number
- Input validation prevents submission
- User corrects input

