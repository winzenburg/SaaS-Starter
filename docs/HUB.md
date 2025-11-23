# SaaS Starter Hub

> A meta-project that spins up new SaaS projects using the 12-agent product creation engine

## What is the Hub?

The **SaaS Starter Hub** is a project generator and portfolio management system. Instead of manually copying this template for each new SaaS idea, the Hub:

1. **Generates new projects** from templates with all infrastructure pre-configured
2. **Manages your portfolio** of spawned projects
3. **Tracks project status** (validation → engineering → growth → maintenance)
4. **Integrates with the agent system** for validation and development workflows

## Architecture

```
SaaS Starter Hub (this repo)
├── scripts/
│   ├── create-project.ts      # Generate new projects
│   └── manage-projects.ts      # Manage portfolio
├── templates/
│   └── default/                # Default project template
├── projects/                   # Project registry (JSON files)
│   ├── project-1.json
│   └── project-2.json
└── docs/                       # Hub documentation + agent system
```

## Quick Start

### 1. Create a New Project

```bash
npm run create-project "My Awesome SaaS"
```

This will:
- Create a new project directory (`../my-awesome-saas`)
- Copy all template files
- Customize package.json, README, etc.
- Register the project in the hub
- Initialize Git (if repo provided)

**With options:**
```bash
# Specify template
npm run create-project "My SaaS" -- --template default

# Specify output path
npm run create-project "My SaaS" -- --output /path/to/projects/my-saas

# Initialize with Git repo
npm run create-project "My SaaS" -- --git https://github.com/user/my-saas.git
```

### 2. Manage Your Portfolio

```bash
# List all projects
npm run manage-projects list

# Check project status
npm run manage-projects status my-awesome-saas

# Update project status
npm run manage-projects update my-awesome-saas validation
```

### 3. Workflow Integration

After creating a project, follow the standard workflow:

1. **Portfolio Scoring** → Score the idea using `@Portfolio-Prioritizer`
2. **Insight Validation** → Run `200-playbook-insight-validation.mdc`
3. **Moat & MRR Validation** → Run `205-playbook-moat-mrr-validation.mdc`
4. **Build** → Follow `210-playbook-new-feature.mdc`

## Project Registry

Each spawned project is registered in `projects/<slug>.json`:

```json
{
  "name": "My Awesome SaaS",
  "slug": "my-awesome-saas",
  "description": "A SaaS for awesome things",
  "template": "default",
  "outputPath": "../my-awesome-saas",
  "gitRepo": "https://github.com/user/my-awesome-saas.git",
  "features": [],
  "envVars": {},
  "status": "validation",
  "portfolioScore": 18,
  "mrr": 0,
  "createdAt": "2025-01-XX",
  "updatedAt": "2025-01-XX"
}
```

## Portfolio Management

The Hub integrates with the Portfolio Management playbook (`.cursor/rules/207-playbook-portfolio-management.mdc`):

### Portfolio Tiers

- **Validation Tier** (3-5 projects): Ideas in validation
- **Engineering Tier** (1-2 projects): Products being built
- **Growth Tier** (2-4 projects): Products in market
- **Maintenance Tier** (unlimited): Stable MRR products

### Tracking Status

Update project status as it progresses:

```bash
# Move to validation
npm run manage-projects update my-saas validation

# Move to engineering
npm run manage-projects update my-saas engineering

# Move to growth
npm run manage-projects update my-saas growth

# Move to maintenance
npm run manage-projects update my-saas maintenance

# Kill a project
npm run manage-projects update my-saas killed
```

## Templates

Templates define the base structure for new projects. The default template includes:

- Next.js 15 (App Router)
- TypeScript (strict mode)
- tRPC
- Drizzle ORM
- Stripe integration
- Tailwind CSS v4
- Testing (Vitest + Playwright)
- All agent system docs and rules

### Creating Custom Templates

1. Create a new template directory: `templates/<template-name>/`
2. Add template-specific files
3. Reference in `create-project.ts` if needed

## Hub Dashboard (Future)

A web UI for managing the portfolio is planned:

- Visual portfolio dashboard
- Project status tracking
- MRR aggregation
- Quick actions (create, update, kill)
- Integration with agent workflows

## Integration with Agent System

The Hub works seamlessly with the 12-agent system:

1. **Create Project** → Use `create-project` script
2. **Portfolio Scoring** → Use `@Portfolio-Prioritizer` agent
3. **Validation** → Use `200-playbook-insight-validation.mdc`
4. **Build** → Use `210-playbook-new-feature.mdc`
5. **Track** → Use `manage-projects` script

## Best Practices

### 1. One Hub, Many Projects

Keep the Hub as the central repository. Each spawned project is independent.

### 2. Update Hub Regularly

As you improve the Hub (new templates, better scripts), update spawned projects:

```bash
# Manual: Copy improvements to projects
# Or: Create migration scripts for major updates
```

### 3. Track Portfolio Health

Regularly review your portfolio:

```bash
npm run manage-projects list
```

Check:
- How many projects in each tier?
- Which projects need attention?
- Which projects should be killed?

### 4. Shared Infrastructure

Consider shared infrastructure across projects:
- Auth service
- Billing service
- Analytics
- Monitoring

## Examples

### Example 1: Create and Validate

```bash
# 1. Create project
npm run create-project "Design System SaaS"

# 2. Navigate to project
cd ../design-system-saas

# 3. Set up environment
npm install
cp .env.example .env
npm run db:push

# 4. Start validation workflow
# (Use Cursor agents: @Portfolio-Prioritizer, @Insight-Strategist, etc.)
```

### Example 2: Portfolio Review

```bash
# List all projects
npm run manage-projects list

# Check status of each
npm run manage-projects status project-1
npm run manage-projects status project-2

# Update status as projects progress
npm run manage-projects update project-1 engineering
npm run manage-projects update project-2 growth
```

## Troubleshooting

### Project Already Exists

If a project directory already exists, the script will fail. Either:
- Delete the existing directory
- Use `--output` to specify a different path

### Template Not Found

Make sure the template exists in `templates/`. Default template is always available.

### Git Initialization Fails

This is okay! You can initialize Git manually:
```bash
cd <project-path>
git init
git add .
git commit -m "Initial commit"
```

## Future Enhancements

- [ ] Web dashboard for portfolio management
- [ ] Automated project updates from Hub
- [ ] Template marketplace
- [ ] Project analytics aggregation
- [ ] Integration with Vercel/GitHub for deployment
- [ ] Automated MRR tracking
- [ ] Portfolio health scoring

## See Also

- [AGENTS.md](../AGENTS.md) - Complete agent system overview
- [GETTING_STARTED.md](./GETTING_STARTED.md) - Validation workflow
- [SYSTEMS.md](./SYSTEMS.md) - The Four Systems framework
- [207-playbook-portfolio-management.mdc](../.cursor/rules/207-playbook-portfolio-management.mdc) - Portfolio management playbook

