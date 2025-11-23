# SaaS Starter Hub

> A meta-project that spins up new SaaS projects using a 12-agent product creation engine

**SaaS Starter Hub** is both:
1. **A project generator** - Create new SaaS projects with one command
2. **A portfolio management system** - Track and manage multiple SaaS bets
3. **A complete product creation engine** - 12 specialized AI agents for validation, design, and development

## 🎯 What Makes This Different?

This isn't just a starter template—it's a **systematized product creation engine** that combines:
- **Greg Isenberg's desirability-first methodology** (community heat, identity-level pain)
- **Durability & defensibility filters** (moat design, retention architecture, expansion revenue)
- **Portfolio theory** (multiple bets, expected value modeling, kill-fast diagnostics)
- **Production-ready infrastructure** (Next.js, tRPC, Drizzle, Stripe, Vercel)

## 🚀 Quick Start

### Create Your First Project

```bash
npm run create-project "My Awesome SaaS"
```

This generates a complete SaaS project with all infrastructure pre-configured.

### Manage Your Portfolio

```bash
# List all projects
npm run manage-projects list

# Check project status
npm run manage-projects status my-awesome-saas
```

### Follow the Validation Workflow

1. **Portfolio Scoring** → Score ideas using `@Portfolio-Prioritizer`
2. **Insight Validation** → Validate desirability using `@Insight-Strategist`
3. **Moat & MRR Validation** → Design defensibility using `@Moat-MRR-Strategist`
4. **Build** → Follow the feature development playbook

See [docs/HUB.md](./docs/HUB.md) for complete hub documentation.

## 🏗️ Architecture

This project follows a **feature-module architecture** with clear separation of concerns:

```
src/
├── app/              # Next.js App Router pages
├── features/         # Feature modules (no cross-feature imports)
│   └── <feature>/
│       ├── ui/       # React components
│       ├── data/     # Server actions, API routes
│       ├── domain/   # Business logic, types, schemas
│       └── index.ts  # Public API
├── lib/              # Shared utilities
└── test/             # Test utilities
```

### Core Principles

- **Boring, evolutionary architecture** - Prefer simple, maintainable solutions
- **Behavior-driven development** - Tests define correctness
- **Small, verifiable diffs** - Incremental changes with clear intent
- **Strong typing** - TypeScript strict mode + Zod validation at boundaries
- **Domain-driven structure** - Features are self-contained modules

## 📦 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Database**: Drizzle ORM + PostgreSQL
- **API**: tRPC
- **Validation**: Zod
- **Payments**: Stripe
- **Deployment**: Vercel
- **Testing**: Vitest, Playwright

## 🎨 Design System

- **4px baseline** - All spacing uses 4px increments (4px, 8px, 12px, 16px, 20px, 24px)
- **Tailwind CSS v4** - Modern utility-first styling
- **Accessibility** - WCAG 2.2 AA compliant

## 📚 Documentation

- **[Hub Documentation](./docs/HUB.md)** - How to use the hub to create and manage projects
- **[Agent System](./AGENTS.md)** - Complete 12-agent product creation engine
- **[Getting Started](./docs/GETTING_STARTED.md)** - Validation workflow guide
- **[Systems Framework](./docs/SYSTEMS.md)** - The Four Systems for building a SaaS empire
- **[Architecture](./docs/ARCHITECTURE.md)** - Technical architecture details
- **[Portfolio Management](./.cursor/rules/207-playbook-portfolio-management.mdc)** - Portfolio theory playbook

## 🤝 Contributing

1. Follow the coding principles in this README
2. Write tests for new features
3. Keep diffs small and focused
4. Update documentation

## 📄 License

MIT
