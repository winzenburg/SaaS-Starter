# Hub and Spoke Architecture

> SaaS Starter as the central hub managing all project spokes

## Architecture Overview

**Hub**: SaaS Starter (this repository)  
**Spokes**: Individual idea documents in `/docs/discovery/`, `/docs/validation/`, `/docs/ideas/`

The SaaS Starter acts as the central orchestration system that:
- Manages the portfolio of all projects
- Provides shared tooling, agents, and workflows
- Tracks project status, scores, and metrics
- Orchestrates discovery, validation, and product development across projects

Each project (spoke) is:
- Self-contained in its own folder
- Has its own documents and artifacts
- Can be managed independently
- Reports back to the hub for portfolio management

## Hub Responsibilities

### 1. Portfolio Management
- Track all projects in one place
- Calculate portfolio metrics (total MRR, average scores, status breakdown)
- Prioritize projects by score and opportunity
- Kill/pivot decisions across portfolio

### 2. Shared Tooling
- Multi-agent system (30 agents including Orchestrator)
- AI tool integrations (Manus, ChatGPT, ElevenLabs, Midjourney/Canva)
- Cursor rules and playbooks
- Validation workflows
- Discovery workflows

### 3. Orchestration
- Coordinate discovery across projects
- Manage validation sprints
- Track engineering progress
- Monitor growth metrics

### 4. Knowledge Base
- Agent definitions and prompts
- Rule files and playbooks
- Best practices and patterns
- Templates and examples

## Spoke Structure

Each idea has documents organized by phase:

**Discovery documents** (`/docs/discovery/`):
- NARRATIVE-<idea-slug>.md
- NICHE-INTEL-<idea-slug>.md
- PAIN-SIGNALS-<idea-slug>.md
- JTBD-<idea-slug>.md
- OPPORTUNITY-<idea-slug>.md
- REDTEAM-<idea-slug>.md

**Validation documents** (`/docs/validation/`):
- VALIDATION-PLAN-<idea-slug>.md
- LANDING-<idea-slug>.md
- DISTRIBUTION-<idea-slug>.md
- PRICING-TEST-<idea-slug>.md
- CREATIVE-BATCH-<idea-slug>.md
- RESULTS-<idea-slug>.md

**Orchestrator outputs** (`/docs/ideas/<idea-slug>/`):
- CHECKLIST.md
- SUMMARY.md
├── DISCOVERY-DEMO-*.md         # Discovery workflow summary
│
├── INSIGHT-*.md                # Product: Insight brief
├── PORTFOLIO-SCORE-*.md        # Product: Portfolio score
│
├── VALIDATION-PLAN-*.md        # Validation: Validation plan
├── LANDING-*.md                # Validation: Landing page
├── DISTRIBUTION-*.md           # Validation: Distribution map
├── PRICING-TEST-*.md           # Validation: Pricing tests
│
├── PRD-*.md                    # Product: PRD
├── MOAT-*.md                   # Product: Moat strategy
└── RETENTION-*.md              # Product: Retention architecture
```

## Hub Dashboard

The hub dashboard (`/hub`) provides:

- **Portfolio Overview**: Total projects, MRR, average scores
- **Status Breakdown**: Projects by status (validation, engineering, growth, etc.)
- **Project Cards**: Each project with:
  - Name, description, status
  - Portfolio score and priority
  - MRR (if applicable)
  - All documents linked
  - Quick actions

## Project Lifecycle

### 1. Discovery Phase
- Hub orchestrates discovery agents
- Spoke receives discovery documents
- Opportunity score calculated
- Decision: proceed to validation or kill

### 2. Validation Phase
- Hub orchestrates validation agents
- Spoke receives validation documents
- Tests executed
- Decision: proceed to engineering or pivot

### 3. Engineering Phase
- Hub orchestrates engineering agents
- Spoke receives PRD, ADR, tests
- Code implemented
- Decision: proceed to growth or iterate

### 4. Growth Phase
- Hub orchestrates growth agents
- Spoke receives growth loop strategy
- Metrics tracked
- Decision: scale or optimize

## Hub API

The hub provides an API (`/api/hub/projects`) that:

- Scans `projects/` directory for project folders
- Reads project metadata from README.md and documents
- Discovers all documents in each project folder
- Returns structured project data for dashboard

## Benefits of Hub-and-Spoke

### For the Hub (SaaS Starter)
- Centralized portfolio management
- Shared tooling reduces duplication
- Consistent workflows across projects
- Portfolio-level insights and decisions

### For Each Spoke (Project)
- Self-contained and portable
- Clear project boundaries
- Independent development
- Easy to archive or spin off

### For Portfolio Management
- See all projects in one place
- Compare scores and metrics
- Make portfolio-level decisions
- Track progress across projects

## Creating a New Project Spoke

1. **Create Project Folder**:
   ```bash
   mkdir projects/my-new-project
   ```

2. **Initialize Project**:
   - Create `README.md` with project overview
   - Add initial documents (INSIGHT, PORTFOLIO-SCORE, etc.)

3. **Hub Discovers Project**:
   - Hub API scans `projects/` directory
   - Reads project metadata
   - Shows in hub dashboard

4. **Run Discovery**:
   - Use hub agents to run discovery workflow
   - Documents saved to project folder
   - Hub tracks progress

## Project Status Tracking

Each project README.md should include:

```markdown
**Status**: Discovery Complete  
**Opportunity Score**: 8.5/10  
**Recommendation**: ✅ Proceed to Validation
```

The hub reads this to:
- Display status in dashboard
- Calculate portfolio metrics
- Prioritize projects
- Track lifecycle progress

## See Also

- `projects/README.md` - Projects folder documentation
- `src/app/hub/page.tsx` - Hub dashboard
- `src/app/api/hub/projects/route.ts` - Hub API
- `docs/DISCOVERY-WORKFLOW.md` - Discovery workflow
- `docs/AGENTS.md` - Agent orchestration

