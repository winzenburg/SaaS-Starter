/**
 * Root page - re-exports marketing homepage
 * 
 * In Next.js App Router, route groups like (marketing) don't create URL segments,
 * so (marketing)/page.tsx should handle the root route. However, having an
 * explicit root page.tsx ensures the route works correctly and resolves
 * git worktree issues with deleted files.
 */

export { default } from "./(marketing)/page";

