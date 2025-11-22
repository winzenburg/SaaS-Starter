# SaaS Starter

A modern, production-ready SaaS starter template built with Next.js (App Router), React, TypeScript, and best-in-class engineering practices.

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

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ 
- PostgreSQL (or your preferred database)
- npm or yarn

### Installation

1. Clone and install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your values
```

3. Set up the database:

```bash
npm run db:generate
npm run db:push
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🧪 Testing

- **Unit/Integration tests**: `npm run test` (Vitest)
- **E2E tests**: `npm run test:e2e` (Playwright)
- **Type checking**: `npm run type-check`

## 📦 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Database**: Prisma (PostgreSQL)
- **Validation**: Zod
- **Payments**: Stripe
- **Deployment**: Vercel
- **Testing**: Vitest, Playwright

## 🏛️ Project Structure

### Feature Modules

Each feature is self-contained:

```typescript
// src/features/auth/index.ts
export { LoginForm } from "./ui/LoginForm";
export { loginAction } from "./data/loginAction";
export { loginSchema } from "./domain/loginSchema";
```

### Shared Utilities

Common utilities live in `src/lib`:

- `db.ts` - Prisma client instance
- `validation.ts` - Shared Zod schemas
- Additional utilities as needed

## 🔒 Type Safety

- **Strict TypeScript** - All code is strictly typed
- **Zod validation** - All inputs validated at boundaries
- **Type guards** - Safe parsing of unknown data

## 🎨 Design System

- **4px baseline** - All spacing uses 4px increments (4px, 8px, 12px, 16px, 20px, 24px)
- **Tailwind CSS v4** - Modern utility-first styling
- **Accessibility** - WCAG 2.2 AA compliant

## 📝 Development Guidelines

### Adding a Feature

1. Create feature module in `src/features/<feature>/`
2. Organize into `ui/`, `data/`, `domain/` subdirectories
3. Export public API via `index.ts`
4. Write tests alongside implementation
5. Update documentation

### Server Actions

Prefer server actions over client mutations:

```typescript
// src/features/auth/data/loginAction.ts
"use server";

import { loginSchema } from "../domain/loginSchema";

export async function loginAction(formData: FormData) {
  const validated = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { error: "Invalid input" };
  }

  // Implementation...
}
```

### Testing

- **Unit tests** for domain logic
- **Integration tests** for server actions
- **E2E tests** for critical user flows

## 🚢 Deployment

This project is optimized for Vercel:

- Automatic deployments from Git
- Edge runtime support (when needed)
- Built-in analytics and observability
- Feature flags support

## 📚 Documentation

- [Architecture Decision Records (ADRs)](./docs/adr/) - Design decisions
- [Feature Documentation](./docs/features/) - Feature-specific docs
- [API Documentation](./docs/api/) - API contracts

## 🤝 Contributing

1. Follow the coding principles in this README
2. Write tests for new features
3. Keep diffs small and focused
4. Update documentation

## 📄 License

MIT

