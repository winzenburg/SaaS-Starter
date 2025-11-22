# Contributing Guidelines

## Development Workflow

1. **Plan First** - Outline approach, architecture, tests, and risks
2. **Small Diffs** - Keep changes focused and verifiable
3. **Tests First** - Write tests alongside implementation
4. **Document** - Update docs when adding features

## Code Quality

### TypeScript

- ✅ Strict mode always ON
- ✅ No `any` types
- ✅ Use type guards for unknown data
- ✅ Constrain generics appropriately

### Testing

- ✅ Unit tests for domain logic
- ✅ Integration tests for server actions
- ✅ E2E tests for critical flows
- ✅ All tests must pass before merging

### Accessibility

- ✅ Semantic HTML before ARIA
- ✅ Keyboard navigation works
- ✅ Descriptive alt text for images
- ✅ ARIA labels when needed
- ✅ Focus management

### Code Style

- ✅ Prefer explicit over clever
- ✅ Co-locate files near usage
- ✅ Pure, deterministic components
- ✅ No console.log in production code

## Feature Development

### Adding a New Feature

1. Create feature module in `src/features/<feature>/`
2. Organize into `ui/`, `data/`, `domain/`
3. Export public API via `index.ts`
4. Write tests
5. Update documentation

### Example Feature Structure

```
src/features/auth/
├── domain/
│   ├── loginSchema.ts
│   └── types.ts
├── data/
│   ├── loginAction.ts
│   └── logoutAction.ts
├── ui/
│   ├── LoginForm.tsx
│   └── LogoutButton.tsx
└── index.ts
```

## Pull Request Process

1. **Small, focused PRs** - One feature or fix per PR
2. **Tests included** - All new code has tests
3. **Documentation** - Update docs if needed
4. **Type check passes** - `npm run type-check`
5. **Lint passes** - `npm run lint`
6. **All tests pass** - `npm run test && npm run test:e2e`

## Architecture Changes

If you're making architectural changes:

1. **Create an ADR** - Document the decision
2. **Explain trade-offs** - Why this approach?
3. **Update architecture docs** - Keep docs in sync

## Questions?

- Check existing ADRs in `docs/adr/`
- Review similar features for patterns
- Ask for clarification when needed

