# Content Mapping: "Building a Product Creation Engine"

> Series of articles documenting what we're building and why it's unique

## Series Overview

**Title**: "Building a Product Creation Engine: How We're Combining AI Agents, Validation Frameworks, and Portfolio Theory to Build Better SaaS Products"

**Target Audience**: 
- SaaS founders and product builders
- Indie hackers and solopreneurs
- Product managers and startup teams
- Anyone building products with limited resources

**Core Thesis**: We're not just building another SaaS starter template. We're building a **repeatable, defensible product creation engine** that combines Greg Isenberg's desirability-first methodology with durability/moat validation, multi-agent AI orchestration, and portfolio management.

---

## Article 1: "The Problem: Why Most SaaS Startups Fail Before They Even Start"

**Hook**: "90% of SaaS startups fail. But what if the problem isn't the idea—it's the process?"

### Key Points:
- **The Build Trap**: Most founders build before validating (desirability problem)
- **The Feature Trap**: Even validated products fail because they lack defensibility (durability problem)
- **The Portfolio Problem**: Solo founders and small teams can't afford to bet everything on one idea
- **The Documentation Problem**: Knowledge gets lost, processes aren't repeatable
- **The AI Problem**: AI tools are powerful but disconnected—no orchestration, no citations, no systematic workflow

### Unique Angle:
- We're solving **both** the "will people want this?" problem (Isenberg) **and** the "will they keep paying 12-36 months from now?" problem (durability)
- Most validation frameworks stop at demand. We go further.

### Call to Action:
- "What if you could validate both desirability AND durability before writing a single line of code?"

---

## Article 2: "The Solution: A Dual-Filter Validation Framework"

**Hook**: "Heat gets you in. Durability makes it a real SaaS business."

### Key Points:
- **Filter 1: Heat Filter (Isenberg-style)** - "Do a tribe of real humans urgently want this?"
  - Proof: Waitlists, DMs, preorders, repeat usage
  - Validation: Social narrative tests, fake door tests, landing/waitlist tests, DM outreach
  
- **Filter 2: Durability Filter** - "Will this still matter and keep paying 12-36 months from now?"
  - Proof: Recurring job, budgeted buyer, retention loop, moat map
  - Validation: Moat potential, retention architecture, expansion revenue model, switching costs

### Unique Angle:
- Most frameworks validate **either** desirability **or** durability. We validate **both**.
- The "Durability Filter" is our unique addition—it prevents building products that people want but won't pay for long-term.

### Visual/Example:
- Show the two-filter pipeline diagram
- Example: A product that passes Heat Filter but fails Durability Filter (and why that matters)

### Call to Action:
- "What if you could kill bad ideas faster and double down on the ones that will actually build a business?"

---

## Article 3: "The AI Orchestration: How We're Connecting Manus, ChatGPT, Claude, and Cursor Agents"

**Hook**: "AI tools are powerful. But they're islands. What if they worked together?"

### Key Points:
- **The Orchestration Flow**: Manus → ChatGPT → Claude → Cursor Agents
  - **Manus**: Narrative, competitor analysis, personas (raw discovery)
  - **ChatGPT**: Refinement, synthesis, reasoning
  - **Claude**: Red-team critique, depth, editorial polish
  - **Cursor Agents**: Structured document creation (Niche Intelligence, Pain Signals, JTBD, Opportunity/Moat)

- **Citation Tracking**: Every AI-generated claim is backed by sources with URLs
  - Not just "Manus Discovery Pack" but specific citations with URLs
  - Citations propagate through the orchestration chain
  - Stakeholders can verify evidence

- **Systematic Workflow**: Each step has inputs, outputs, and quality gates
  - No ad-hoc AI prompting
  - Repeatable, auditable process

### Unique Angle:
- Most people use AI tools in isolation. We've built a **systematic orchestration** that connects them.
- The citation system is unique—most AI outputs are unverifiable. Ours are fully cited.

### Visual/Example:
- Show the orchestration flow diagram
- Show before/after: Ad-hoc AI prompting vs. Systematic orchestration
- Example: How a Manus discovery pack flows through ChatGPT → Claude → structured documents

### Call to Action:
- "What if AI tools worked together in a systematic, auditable way?"

---

## Article 4: "The Portfolio Approach: Managing Multiple Bets, Killing Fast, Prioritizing by Expected Value"

**Hook**: "You're not building one product. You're managing a portfolio of bets."

### Key Points:
- **Portfolio Theory for SaaS**: Don't bet everything on one idea
  - Multiple product bets running in parallel
  - Kill fast, double down on winners
  - Prioritize by expected value (EV), not just "gut feel"

- **Portfolio Scoring System**: 0-40 point scoring model
  - Desirability signal strength (0-10)
  - Niche durability score (0-10)
  - Moat potential (0-10)
  - Expansion revenue depth (0-10)
  - Kill/Pivot/Proceed verdicts

- **Resource Allocation**: Allocate resources by expected value
  - High EV bets get more resources
  - Low EV bets get killed or pivoted

### Unique Angle:
- Most founders are "all in" on one idea. We're managing a **portfolio**.
- The scoring system is systematic, not subjective.

### Visual/Example:
- Show portfolio dashboard with multiple projects
- Show scoring breakdown for a real project
- Example: How a 25-point project gets prioritized over a 15-point project

### Call to Action:
- "What if you could manage multiple product bets systematically, not emotionally?"

---

## Article 5: "The Documentation System: How We're Making Knowledge Repeatable and Auditable"

**Hook**: "Knowledge gets lost. Processes aren't repeatable. What if every decision was documented and auditable?"

### Key Points:
- **Systematic Document Organization**: Every idea has a complete document set
  - Discovery phase: `/docs/discovery/` (NICHE-INTEL, PAIN-SIGNALS, JTBD, OPPORTUNITY)
  - Validation phase: `/docs/validation/`, `/docs/product/`, `/docs/research/` (VALIDATION-PLAN, NARRATIVE, PERSONA, COMPETITORS)
  - Product strategy: `/docs/product/` (INSIGHT, PRD, MOAT, RETENTION)

- **Cross-Referenced Knowledge**: Documents link to related documents
  - Related documents component
  - Project-based organization
  - Phase-based organization

- **Real-Time Workflow Tracking**: Visual progress through discovery and validation
  - Workflow cards show status
  - Step-by-step progress tracking
  - Integration with Hub dashboard

- **Auditable Process**: Every decision is documented with evidence
  - Citations with URLs
  - Quality gates documented
  - Kill/pivot/proceed decisions tracked

### Unique Angle:
- Most teams document ad-hoc. We have a **systematic documentation system**.
- The Hub dashboard makes it visual and accessible.

### Visual/Example:
- Show document organization structure
- Show Hub dashboard with project cards
- Show workflow tracking interface
- Example: How a project moves from discovery → validation → build

### Call to Action:
- "What if every product decision was documented, auditable, and repeatable?"

---

## Article 6: "The Rules and Agents System: How We're Making the Process Repeatable"

**Hook**: "What if your product creation process was as systematic as your code?"

### Key Points:
- **Cursor Rules System**: 300+ rules that enforce the process
  - Core guardrails (000-099): Architecture, testing, security, accessibility
  - Stack/integration rules (100-199): Next.js, tRPC, Drizzle, Stripe, AI tools
  - Playbooks (200-299): Insight validation, moat/MRR validation, new feature, bugfix, refactor

- **Agent System**: 16 specialized AI agents
  - Discovery agents: Niche Intelligence, Pain Signal, JTBD, Opportunity/Moat
  - Validation agents: Demand-Validator, Landing-Builder, Distribution-Operator, Pricing-Tester
  - Product strategy agents: Insight Strategist, Product Strategist, Moat/MRR Strategist, Retention Architect
  - Research agents: Market Scanner, UX Researcher, IA Designer

- **Quality Gates**: Every step has gates that must be passed
  - No build until validated (desirability + durability)
  - No feature without retention architecture
  - No product without moat strategy

### Unique Angle:
- Most teams have ad-hoc processes. We have **systematic rules and agents**.
- The rules are machine-readable and enforceable.

### Visual/Example:
- Show rule structure (core, stack, playbooks)
- Show agent roster
- Show quality gate checklist
- Example: How a new feature must pass all gates before engineering

### Call to Action:
- "What if your product creation process was as systematic and repeatable as your code?"

---

## Article 7: "The Hub: A Meta-Project for Managing Your Product Portfolio"

**Hook**: "What if you had a dashboard for managing your entire product portfolio?"

### Key Points:
- **Portfolio Dashboard**: Visual overview of all projects
  - Portfolio stats (total projects, MRR, average score, in validation)
  - Project cards with status, score, MRR, workflow counts
  - Documents organized by phase (discovery, validation, build, scale)

- **Workflow Tracking**: Visual progress through discovery and validation
  - Workflow cards show phase, status, steps completed
  - Step-by-step progress tracking
  - Integration with project cards

- **Document Discovery**: Automatic discovery of documents across multiple directories
  - Searches `/docs/discovery/`, `/docs/validation/`, `/docs/product/`, `/docs/research/`
  - Groups by project and phase
  - Links to document viewer

- **Cross-Navigation**: Seamless navigation between Hub, Workflows, and Documents
  - Hub → Workflows (view workflows for a project)
  - Workflows → Documents (view documents for a workflow)
  - Documents → Related Documents (navigate between related docs)

### Unique Angle:
- Most teams use spreadsheets or ad-hoc tools. We have a **dedicated Hub**.
- The Hub is a meta-project—it's a product for managing products.

### Visual/Example:
- Show Hub dashboard screenshot
- Show workflow tracking interface
- Show document organization
- Example: How a project moves through the system

### Call to Action:
- "What if you had a dashboard for managing your entire product portfolio?"

---

## Article 8: "The Technical Stack: Next.js, tRPC, Drizzle, and Modern Web Standards"

**Hook**: "We're not just building a process. We're building a platform."

### Key Points:
- **Modern Stack**: Next.js 15 (App Router), tRPC, Drizzle ORM, PostgreSQL
  - Server/client component separation
  - Type-safe APIs with tRPC
  - Type-safe database with Drizzle
  - Modern React patterns

- **Design System**: Shadcn/UI, Tailwind CSS v4, Framer Motion, Lucide Icons
  - Accessible components (WCAG 2.2 AA)
  - Dark mode with glassmorphism
  - Modern, elegant UI
  - Micro-interactions and motion

- **AI Tool Integration**: Manus, ChatGPT, Claude, ElevenLabs, Visual Assets
  - API integrations with error handling
  - Model fallback logic
  - Citation extraction and propagation
  - Retry logic and timeout handling

- **Observability**: Error tracking, analytics, performance monitoring
  - Vercel Analytics
  - Speed Insights
  - Error boundaries

### Unique Angle:
- Most validation frameworks are spreadsheets or docs. We built a **platform**.
- The technical stack is production-ready, not a prototype.

### Visual/Example:
- Show tech stack diagram
- Show UI screenshots
- Show API integration patterns
- Example: How the orchestration script calls AI APIs

### Call to Action:
- "What if your validation framework was a platform, not a spreadsheet?"

---

## Article 9: "The Results: What We've Learned Building This System"

**Hook**: "We've built this system. Here's what we've learned."

### Key Points:
- **What Works**: 
  - Dual-filter validation catches bad ideas early
  - AI orchestration saves time and improves quality
  - Portfolio approach reduces risk
  - Systematic documentation makes knowledge repeatable

- **What Doesn't Work**:
  - Ad-hoc AI prompting (no citations, no audit trail)
  - Single-idea focus (too risky)
  - Build-first mentality (waste of resources)
  - Unstructured documentation (knowledge gets lost)

- **Lessons Learned**:
  - Validation is a process, not a one-time event
  - AI tools need orchestration, not just prompting
  - Portfolio management is essential for solo founders
  - Documentation is a feature, not a burden

- **Future Improvements**:
  - More AI tool integrations
  - Better workflow automation
  - Enhanced portfolio scoring
  - Community features

### Unique Angle:
- We're sharing what we've learned **while building**, not after.
- Honest assessment of what works and what doesn't.

### Visual/Example:
- Show before/after comparisons
- Show metrics (time saved, ideas killed, etc.)
- Show roadmap

### Call to Action:
- "What if you could learn from our mistakes and build on our successes?"

---

## Article 10: "The Open Source Vision: Building a Community Around Product Creation"

**Hook**: "What if the entire product creation process was open source?"

### Key Points:
- **Open Source Philosophy**: 
  - Rules and agents are open source
  - Process is transparent and auditable
  - Community can contribute improvements
  - Knowledge is shared, not hoarded

- **Community Benefits**:
  - Shared validation frameworks
  - Shared AI orchestration patterns
  - Shared document templates
  - Shared lessons learned

- **Future Vision**:
  - Community-contributed agents
  - Community-contributed rules
  - Community-contributed templates
  - Community-contributed case studies

### Unique Angle:
- Most validation frameworks are proprietary. We're **open sourcing** ours.
- The community can improve the system.

### Visual/Example:
- Show GitHub repository
- Show contribution guidelines
- Show community roadmap

### Call to Action:
- "What if you could contribute to and benefit from a community-driven product creation engine?"

---

## Content Calendar Suggestion

**Week 1**: Article 1 (The Problem)
**Week 2**: Article 2 (The Solution: Dual-Filter Framework)
**Week 3**: Article 3 (AI Orchestration)
**Week 4**: Article 4 (Portfolio Approach)
**Week 5**: Article 5 (Documentation System)
**Week 6**: Article 6 (Rules and Agents)
**Week 7**: Article 7 (The Hub)
**Week 8**: Article 8 (Technical Stack)
**Week 9**: Article 9 (Results and Lessons)
**Week 10**: Article 10 (Open Source Vision)

---

## Distribution Strategy

- **Primary Platform**: Personal blog or Medium
- **Secondary Platforms**: 
  - Dev.to (for technical articles)
  - Hacker News (for Articles 1, 2, 9, 10)
  - Twitter/X (thread summaries)
  - LinkedIn (professional audience)
  - Indie Hackers (for Articles 4, 5, 9)

## Key Metrics to Track

- Views and engagement
- Sign-ups for the system
- GitHub stars/forks
- Community contributions
- Case studies from users

---

## Unique Selling Points to Emphasize

1. **Dual-Filter Validation**: Heat + Durability (unique combination)
2. **AI Orchestration**: Systematic, not ad-hoc (unique approach)
3. **Portfolio Management**: Multiple bets, kill fast (unique for solo founders)
4. **Systematic Documentation**: Repeatable, auditable (unique process)
5. **Rules and Agents**: Machine-readable, enforceable (unique system)
6. **The Hub**: Meta-project for managing products (unique tool)
7. **Open Source**: Community-driven (unique philosophy)

---

## Next Steps

1. **Choose Article 1** to start with (The Problem is a good hook)
2. **Create detailed outline** for each article
3. **Gather examples and screenshots** for each article
4. **Write first draft** of Article 1
5. **Get feedback** and iterate
6. **Publish and promote** Article 1
7. **Repeat** for subsequent articles

