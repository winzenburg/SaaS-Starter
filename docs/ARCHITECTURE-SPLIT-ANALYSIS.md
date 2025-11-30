# Marketing vs Product Site Split - Analysis

## Current Architecture

**Single Next.js App with Route Groups:**
- `(marketing)` - Public marketing pages (Home, Articles)
- `(product)` - Authenticated product pages (Hub, Workflows)
- Shared root layout with header
- Shared authentication (Clerk)
- Shared database and API

## Option 1: Keep Together (Current Approach)

### Pros ✅
- **Single codebase** - Easier to maintain shared components, types, utilities
- **Shared authentication** - Clerk session works seamlessly across routes
- **Shared data** - Articles, projects, workflows all in same DB
- **Simpler deployment** - One Vercel project, one domain
- **Easier development** - One dev server, shared hot reload
- **Cost effective** - One hosting bill, shared infrastructure
- **Route groups work well** - Clean separation without complexity

### Cons ❌
- **Coupled deployments** - Marketing changes require full app rebuild
- **Shared dependencies** - Marketing pages bundle product code
- **Less flexibility** - Can't optimize marketing site separately (static export, etc.)

## Option 2: Split into Two Sites

### Architecture
```
marketing-site/          product-site/
├── Next.js (static)     ├── Next.js (dynamic)
├── Public pages         ├── Auth required
├── Articles (MDX)       ├── Dashboard
└── Deploy: Vercel      └── Deploy: Vercel
```

### Pros ✅
- **Complete separation** - Zero coupling between sites
- **Independent deployments** - Deploy marketing without touching product
- **Optimization** - Marketing can be fully static, product can be SSR
- **Different teams** - Marketing team can work independently
- **Different tech** - Could use different frameworks if needed
- **Performance** - Marketing site can be CDN-cached, ultra-fast
- **Security** - Product site can have stricter security headers

### Cons ❌
- **Two codebases** - Duplicate components, types, utilities
- **Auth complexity** - Need to handle Clerk session across domains
- **Data sharing** - Need API between sites or shared database access
- **More infrastructure** - Two deployments, two domains/subdomains
- **Development overhead** - Two dev servers, more complex local setup
- **Cost** - Two Vercel projects (though still reasonable)
- **Shared code** - Need monorepo or npm packages for shared utilities

## Recommendation

### Keep Together If:
- ✅ Small team (1-3 developers)
- ✅ Marketing and product share components/data
- ✅ Want simple deployment and maintenance
- ✅ Marketing pages need dynamic features (user-specific content)
- ✅ Current route group separation is working

### Split If:
- ✅ Large team with separate marketing/product teams
- ✅ Marketing site needs to be fully static/optimized
- ✅ Marketing site needs different domain (www vs app)
- ✅ Want to use different frameworks (e.g., Astro for marketing)
- ✅ Marketing changes frequently, product is stable
- ✅ Need different security/performance requirements

## Hybrid Approach (Best of Both Worlds)

**Keep together BUT optimize:**

1. **Route-based code splitting** - Marketing routes don't load product code
2. **Conditional imports** - Only load product components when needed
3. **Static generation** - Pre-render marketing pages at build time
4. **Separate domains** - Use subdomains (www vs app) with same codebase
5. **Independent deploys** - Use Vercel previews to deploy routes independently

## Current State Assessment

Looking at your codebase:
- ✅ Route groups already provide clean separation
- ✅ Different CSS files for marketing vs product
- ✅ Authentication is centralized (Clerk)
- ✅ Shared components (navigation, etc.)
- ✅ Articles are markdown files (could be static)

**Verdict: Keep together for now.** The route group approach gives you 80% of the benefits with 20% of the complexity. You can always split later if needed.

## When to Revisit

Consider splitting when:
1. Marketing team wants to deploy independently multiple times per day
2. Marketing site needs to be fully static (no Next.js runtime)
3. You need different domains (www.saasstarter.com vs app.saasstarter.com)
4. Team grows and needs complete independence
5. Performance requirements diverge significantly

