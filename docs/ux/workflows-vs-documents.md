# Workflows vs Documents: Understanding the Difference

## The Confusion

You've run discovery documents for the Design System project, but they don't show up in the Workflows page. Why?

## Two Separate Systems

### 1. Documents (Markdown Files)
- **Location**: `/docs/discovery/`, `/docs/product/`, etc.
- **Created by**: Scripts, agents, manual creation
- **Purpose**: Store research findings, insights, analysis
- **Format**: Markdown files
- **Examples**:
  - `NICHE-INTEL-enterprise-design-system-startups.md`
  - `PAIN-SIGNALS-enterprise-design-system-startups.md`
  - `JTBD-enterprise-design-system-startups.md`
  - `OPPORTUNITY-enterprise-design-system-startups.md`

### 2. Workflows (Database Records)
- **Location**: Database (`workflows` table)
- **Created by**: UI (`/workflows` page) or API
- **Purpose**: Track execution of structured processes
- **Format**: Database records with steps, status, progress
- **Examples**:
  - Discovery Workflow (8 steps: Manus → ChatGPT → Claude → Agents)
  - Validation Workflow (6 steps: Landing → Distribution → Pricing)

## The Problem

**Documents can exist without Workflows**, and vice versa. This creates confusion:

- ✅ Discovery documents exist (created via scripts)
- ❌ No workflow records exist (not created)
- ❓ How do they relate?

## The Solution: Two Approaches

### Approach 1: Workflows Create Documents (Recommended)
**Workflows are the execution engine that creates documents**

```
Workflow (Execution Tracking)
├── Step 1: Manus → Creates MANUS-{slug}.md
├── Step 2: ChatGPT → Creates CHATGPT-REFINEMENT-{slug}.md
├── Step 3: Niche-Intelligence-Agent → Creates NICHE-INTEL-{slug}.md
├── Step 4: Pain-Signal-Agent → Creates PAIN-SIGNALS-{slug}.md
├── Step 5: JTBD-Agent → Creates JTBD-{slug}.md
└── Step 6: Opportunity-Moat-Agent → Creates OPPORTUNITY-{slug}.md
```

**Benefits**:
- Clear execution tracking
- Progress visibility
- Step-by-step status
- Can resume/pause workflows
- See what's completed vs pending

### Approach 2: Documents Exist Independently (Current State)
**Documents are created via scripts, workflows are optional**

```
Script Execution
├── Creates NICHE-INTEL-{slug}.md
├── Creates PAIN-SIGNALS-{slug}.md
├── Creates JTBD-{slug}.md
└── Creates OPPORTUNITY-{slug}.md

(No workflow record created)
```

**Problem**: No execution tracking, no progress visibility

## Value Proposition of Workflows Page

### Why Use Workflows?

1. **Execution Tracking**
   - See which steps are completed
   - Track progress through multi-step processes
   - Resume where you left off

2. **Status Management**
   - Know if a workflow is pending, in progress, completed, or failed
   - See which agent/tool is currently running
   - Get error messages if steps fail

3. **Project Context**
   - Group workflows by project
   - See all workflows for a project in one place
   - Link from Hub to Workflows

4. **Structured Process**
   - Enforce step order
   - Validate prerequisites
   - Track dependencies between steps

5. **Progress Visibility**
   - See "3 of 8 steps completed"
   - Know what's next
   - Understand overall progress

### When to Use Workflows vs Just Documents

**Use Workflows When**:
- You want to track execution progress
- You need step-by-step status
- You want to pause/resume work
- You're following a structured process
- You want to see what's done vs what's pending

**Just Documents When**:
- Quick one-off research
- Manual analysis
- Documents created outside the system
- No need for execution tracking

## Current State: Design System Project

**What Exists**:
- ✅ Discovery documents (NICHE-INTEL, PAIN-SIGNALS, JTBD, OPPORTUNITY)
- ❌ No workflow record

**What Should Happen**:
1. Create a Discovery Workflow for the project
2. Mark steps as "completed" based on existing documents
3. Show workflow in Workflows page
4. Link from Hub to Workflows

## Next Steps

1. **Import existing documents as workflows** (script to create workflow records)
2. **Update orchestration scripts** to create workflows when creating documents
3. **Clarify UI** to show relationship between documents and workflows
4. **Add "Import Documents as Workflow" feature** for retroactive tracking

