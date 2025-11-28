# Hub & Workflows Page Relationship

## Current State Analysis

### Hub Page (`/hub`)
- **Purpose**: Portfolio management dashboard
- **Shows**: Projects (SaaS ideas/products)
- **Project Properties**:
  - `slug` - unique identifier (e.g., "enterprise-design-system-startups")
  - `name` - display name
  - `status` - validation, engineering, growth, maintenance, killed
  - `portfolioScore` - calculated score (0-40)
  - `mrr` - monthly recurring revenue
  - `documents` - associated documents (discovery, validation, etc.)

### Workflows Page (`/workflows`)
- **Purpose**: Discovery and validation workflow management
- **Shows**: Workflows (processes for validating ideas)
- **Workflow Properties**:
  - `ideaSlug` - links to a project (should match project `slug`)
  - `ideaName` - display name
  - `phase` - discovery, validation, build, scale
  - `status` - pending, in_progress, completed, failed, paused
  - `steps` - workflow execution steps

## The Problem

**Disconnect**: Projects and Workflows are currently separate entities with no clear relationship in the UI.

- Projects exist in the Hub but their workflows aren't visible
- Workflows exist independently without clear project context
- Users can't easily see which projects have active workflows
- No way to navigate from a project to its workflows

## Proposed Relationship Model

### Core Concept
**A Project can have multiple Workflows**

```
Project (Hub)
├── Discovery Workflow (Workflows)
├── Validation Workflow (Workflows)
├── Build Workflow (future)
└── Scale Workflow (future)
```

### Relationship Rules

1. **One-to-Many**: One project (`slug`) can have multiple workflows
2. **Phase-Based**: Each workflow has a `phase` (discovery, validation, etc.)
3. **Unique Constraint**: One project can have one workflow per phase (optional)
4. **Linking**: `workflow.ideaSlug === project.slug`

## Proposed UI Improvements

### 1. Hub Page Enhancements

**Add to Project Cards:**
- Workflow status indicator (shows active workflows for this project)
- Quick link to view workflows for this project
- Workflow progress summary (e.g., "Discovery: 3/8 steps")

**Add Workflow Section:**
- "Active Workflows" section showing workflows grouped by project
- Filter by project
- Quick actions: "Start Discovery", "Start Validation"

### 2. Workflows Page Enhancements

**Group by Project:**
- Show workflows grouped by project/idea
- Project header with link back to Hub
- Filter/search by project name

**Project Context:**
- Show project status from Hub
- Show project portfolio score
- Link to project details in Hub

### 3. Navigation Flow

```
Hub → View Project → See Workflows → View Workflow Details
  ↓
Workflows → Filter by Project → View Project in Hub
```

### 4. Unified Project View (Future)

**New Route: `/projects/[slug]`**
- Project overview
- Associated workflows (all phases)
- Documents organized by phase
- Project timeline/status
- Quick actions

## Implementation Plan

### Phase 1: Link Existing Data
1. Update Workflows API to include project data
2. Update Hub to show workflow counts/status
3. Add navigation links between pages

### Phase 2: Enhanced Views
1. Group workflows by project on Workflows page
2. Add workflow section to Hub project cards
3. Add project filter to Workflows page

### Phase 3: Unified Experience
1. Create `/projects/[slug]` detail page
2. Show all project data + workflows in one view
3. Add workflow creation from project context

## Data Model Alignment

### Current State
```typescript
// Project (Hub)
interface Project {
  slug: string;  // "enterprise-design-system-startups"
  name: string;
  // ... other fields
}

// Workflow (Workflows)
interface Workflow {
  ideaSlug: string;  // Should match project.slug
  ideaName: string; // Should match project.name
  phase: "discovery" | "validation" | "build" | "scale";
  // ... other fields
}
```

### Proposed Alignment
- Ensure `workflow.ideaSlug` always matches `project.slug`
- Add validation when creating workflows
- Add project lookup when displaying workflows
- Create helper functions to link projects ↔ workflows

## User Stories

### As a user, I want to:
1. **See project workflows from Hub**: "I'm on the Hub, I see 'Enterprise Design System' project. I want to see its discovery and validation workflows."
2. **See project context from Workflows**: "I'm viewing a workflow, I want to see which project it belongs to and its status."
3. **Navigate seamlessly**: "I want to easily move between viewing a project and its workflows."
4. **Filter workflows by project**: "I want to see only workflows for 'Enterprise Design System' project."
5. **Start workflows from project**: "I'm viewing a project, I want to start a discovery workflow for it."

## Next Steps

1. **Document the relationship** (this document)
2. **Update APIs** to include cross-references
3. **Update UI components** to show relationships
4. **Add navigation** between Hub and Workflows
5. **Test the user flow** end-to-end

