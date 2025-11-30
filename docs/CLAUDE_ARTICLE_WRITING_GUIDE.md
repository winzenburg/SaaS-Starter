# Claude Article Writing Guide

> Guidelines for using Claude to write articles following the Indie Hackers & Hacker News style guide

## Overview

This guide provides prompts, templates, and workflows for using Claude to write articles that:
- Serve as personal reference documentation
- Resonate with Indie Hackers and Hacker News audiences
- Follow optimal length (1,500-2,500 words)
- Use the right voice and tone (conversational but professional, honest, evidence-based)
- Include proper structure (hook, context, main content, examples, takeaways)

---

## Claude Prompt Template

### Base Template

```
You are writing an article for [Indie Hackers / Hacker News / Both] that will also serve as personal reference documentation.

**Article Topic**: [Article title from content mapping]
**Target Length**: [1,500-2,500 words]
**Target Audience**: [Indie Hackers / Hacker News / Both]

**Article Context**:
- This is part of a series documenting our product creation engine
- We're building a systematic approach to SaaS product creation
- Articles should be honest, practical, and evidence-based
- Include real examples from our actual implementation

**Voice & Tone Requirements**:
- Use "I" for personal experience and authentic storytelling
- Use "you" or "founders" for universal application (avoid "we/our" for product promotion)
- Focus on general principles and frameworks (not specific brands or individuals)
- Conversational but professional
- Honest and transparent (acknowledge limitations, failures)
- Practical and actionable (focus on "how")
- Evidence-based (include data, examples, proof)
- Humble confidence (confident in approach, humble about results)

**Structure Requirements**:
1. **Opening (2-3 paragraphs)**
   - Hook: Surprising insight, problem, or question
   - Context: Why this matters, our background
   - Thesis: What we'll cover, what readers will learn

2. **Main Content (bulk of article)**
   - Core concept/framework
   - How it works (process, system, implementation)
   - Examples/case studies from our actual work
   - Lessons learned (what worked, what didn't)

3. **Practical Application**
   - How to apply this
   - Actionable steps
   - Tools/resources needed

4. **Discussion**
   - Trade-offs and limitations
   - When this works, when it doesn't
   - Future improvements

5. **Takeaways**
   - 3-5 key points
   - What readers can do next
   - How to engage/contribute

**Content Requirements**:
- Include specific examples from our actual implementation
- Reference our actual system (Hub, workflows, documents, rules, agents)
- Include real data/metrics if available
- Link to related articles in the series
- Acknowledge limitations and trade-offs
- Show the process, not just the results

**Formatting Requirements**:
- Use descriptive headers (not "Introduction", "Conclusion")
- Break up text with headers, lists, examples
- Use code blocks for technical content
- Include placeholders for screenshots/diagrams
- Make content scannable (headers, bullets, bold)

**What to Avoid**:
- Don't reference specific brands or product names (avoid "SaaS Starter", "Our Hub")
- Don't attribute frameworks to individuals by name (avoid "Greg Isenberg's approach" - use "desirability-first approach" instead)
- Don't use "we/our" to promote your specific system or product
- Don't include promotional links to your own product pages
- Don't use "you should" (too prescriptive)
- Don't make unsupported claims
- Don't hide failures or struggles
- Don't use marketing language or hype
- Don't write walls of text
- Don't assume prior knowledge without context
- Don't over-promise or oversell

**Sources to Reference**:
- [List relevant docs, rules, agents, code examples]
- [List related articles in the series]
- [List actual examples from our implementation]

**Output Format**:
- Markdown format
- Ready for publishing (with minor edits)
- Include [SCREENSHOT] placeholders where visuals would help
- Include [LINK] placeholders for cross-references

Now, write the article following these guidelines.
```

---

## Article-Specific Prompts

### Article 1: "The Problem: Why Most SaaS Startups Fail Before They Even Start"

```
You are writing Article 1 of our series: "The Problem: Why Most SaaS Startups Fail Before They Even Start"

**Target**: Indie Hackers & Hacker News
**Length**: 1,200-1,800 words
**Tone**: Honest, problem-focused

**Key Points to Cover**:
- The Build Trap: Most founders build before validating (desirability problem)
- The Feature Trap: Even validated products fail because they lack defensibility (durability problem)
- The Portfolio Problem: Solo founders and small teams can't afford to bet everything on one idea
- The Documentation Problem: Knowledge gets lost, processes aren't repeatable
- The AI Problem: AI tools are powerful but disconnected—no orchestration, no citations, no systematic workflow

**Unique Angle**:
- We're solving BOTH the "will people want this?" problem (Isenberg) AND the "will they keep paying 12-36 months from now?" problem (durability)
- Most validation frameworks stop at demand. We go further.

**Hook**: "90% of SaaS startups fail. But what if the problem isn't the idea—it's the process?"

**Call to Action**: "What if you could validate both desirability AND durability before writing a single line of code?"

**Sources to Reference**:
- Our actual experience building multiple SaaS products
- Common failure patterns we've observed
- Statistics on SaaS failure rates
- Examples from our portfolio

Write the article following the base template guidelines.
```

---

### Article 2: "The Solution: A Dual-Filter Validation Framework"

```
You are writing Article 2 of our series: "The Solution: A Dual-Filter Validation Framework"

**Target**: Indie Hackers & Hacker News
**Length**: 2,000-3,000 words
**Tone**: Systematic, evidence-based

**Key Points to Cover**:
- Filter 1: Heat Filter (Isenberg-style) - "Do a tribe of real humans urgently want this?"
  - Proof: Waitlists, DMs, preorders, repeat usage
  - Validation: Social narrative tests, fake door tests, landing/waitlist tests, DM outreach
  
- Filter 2: Durability Filter - "Will this still matter and keep paying 12-36 months from now?"
  - Proof: Recurring job, budgeted buyer, retention loop, moat map
  - Validation: Moat potential, retention architecture, expansion revenue model, switching costs

**Unique Angle**:
- Most frameworks validate EITHER desirability OR durability. We validate BOTH.
- The "Durability Filter" is our unique addition—it prevents building products that people want but won't pay for long-term.

**Hook**: "Heat gets you in. Durability makes it a real SaaS business."

**Visual/Example**:
- Show the two-filter pipeline diagram
- Example: A product that passes Heat Filter but fails Durability Filter (and why that matters)

**Sources to Reference**:
- Rule 200 (Insight Validation Playbook)
- Rule 205 (Moat & MRR Validation)
- Our actual validation process
- Examples from our portfolio scoring
- Real validation test results

**Call to Action**: "What if you could kill bad ideas faster and double down on the ones that will actually build a business?"

Write the article following the base template guidelines.
```

---

### Article 3: "The AI Orchestration: How We're Connecting Manus, ChatGPT, Claude, and Cursor Agents"

```
You are writing Article 3 of our series: "The AI Orchestration: How We're Connecting Manus, ChatGPT, Claude, and Cursor Agents"

**Target**: Hacker News (primary), Indie Hackers (secondary)
**Length**: 2,000-2,500 words
**Tone**: Technical but accessible

**Key Points to Cover**:
- The Orchestration Flow: Manus → ChatGPT → Claude → Cursor Agents
  - Manus: Narrative, competitor analysis, personas (raw discovery)
  - ChatGPT: Refinement, synthesis, reasoning
  - Claude: Red-team critique, depth, editorial polish
  - Cursor Agents: Structured document creation (Niche Intelligence, Pain Signals, JTBD, Opportunity/Moat)

- Citation Tracking: Every AI-generated claim is backed by sources with URLs
  - Not just "Manus Discovery Pack" but specific citations with URLs
  - Citations propagate through the orchestration chain
  - Stakeholders can verify evidence

- Systematic Workflow: Each step has inputs, outputs, and quality gates
  - No ad-hoc AI prompting
  - Repeatable, auditable process

**Unique Angle**:
- Most people use AI tools in isolation. We've built a SYSTEMATIC ORCHESTRATION that connects them.
- The citation system is unique—most AI outputs are unverifiable. Ours are fully cited.

**Hook**: "AI tools are powerful. But they're islands. What if they worked together?"

**Visual/Example**:
- Show the orchestration flow diagram
- Show before/after: Ad-hoc AI prompting vs. Systematic orchestration
- Example: How a Manus discovery pack flows through ChatGPT → Claude → structured documents
- Code examples from our orchestration scripts

**Sources to Reference**:
- Rule 311 (Manus Orchestration Flow)
- Rule 190 (AI Tool Integrations)
- Our actual orchestration scripts (scripts/orchestrate-manus-discovery.ts, scripts/orchestrate-validation-step3.ts)
- Real examples of citation propagation
- Our AI tool integration code (src/lib/ai-tools/)

**Call to Action**: "What if AI tools worked together in a systematic, auditable way?"

Write the article following the base template guidelines, with emphasis on technical depth and code examples.
```

---

### Article 4: "The Portfolio Approach: Managing Multiple Bets, Killing Fast, Prioritizing by Expected Value"

```
You are writing Article 4 of our series: "The Portfolio Approach: Managing Multiple Bets, Killing Fast, Prioritizing by Expected Value"

**Target**: Indie Hackers (primary), Hacker News (secondary)
**Length**: 1,800-2,500 words
**Tone**: Practical, strategic

**Key Points to Cover**:
- Portfolio Theory for SaaS: Don't bet everything on one idea
  - Multiple product bets running in parallel
  - Kill fast, double down on winners
  - Prioritize by expected value (EV), not just "gut feel"

- Portfolio Scoring System: 0-40 point scoring model
  - Desirability signal strength (0-10)
  - Niche durability score (0-10)
  - Moat potential (0-10)
  - Expansion revenue depth (0-10)
  - Kill/Pivot/Proceed verdicts

- Resource Allocation: Allocate resources by expected value
  - High EV bets get more resources
  - Low EV bets get killed or pivoted

**Unique Angle**:
- Most founders are "all in" on one idea. We're managing a PORTFOLIO.
- The scoring system is systematic, not subjective.

**Hook**: "You're not building one product. You're managing a portfolio of bets."

**Visual/Example**:
- Show portfolio dashboard with multiple projects
- Show scoring breakdown for a real project (Enterprise Design System for Startups)
- Example: How a 25-point project gets prioritized over a 15-point project
- Screenshot of our Hub dashboard

**Sources to Reference**:
- Rule 207 (Portfolio Management Playbook)
- Our actual portfolio scoring system
- Real examples from our portfolio (Enterprise Design System, etc.)
- Our Hub dashboard implementation
- Portfolio scoring documents

**Call to Action**: "What if you could manage multiple product bets systematically, not emotionally?"

Write the article following the base template guidelines, with emphasis on practical application and examples.
```

---

### Article 5: "The Documentation System: How We're Making Knowledge Repeatable and Auditable"

```
You are writing Article 5 of our series: "The Documentation System: How We're Making Knowledge Repeatable and Auditable"

**Target**: Indie Hackers & Hacker News
**Length**: 1,500-2,200 words
**Tone**: Systematic, practical

**Key Points to Cover**:
- Systematic Document Organization: Every idea has a complete document set
  - Discovery phase: /docs/discovery/ (NICHE-INTEL, PAIN-SIGNALS, JTBD, OPPORTUNITY)
  - Validation phase: /docs/validation/, /docs/product/, /docs/research/ (VALIDATION-PLAN, NARRATIVE, PERSONA, COMPETITORS)
  - Product strategy: /docs/product/ (INSIGHT, PRD, MOAT, RETENTION)

- Cross-Referenced Knowledge: Documents link to related documents
  - Related documents component
  - Project-based organization
  - Phase-based organization

- Real-Time Workflow Tracking: Visual progress through discovery and validation
  - Workflow cards show status
  - Step-by-step progress tracking
  - Integration with Hub dashboard

- Auditable Process: Every decision is documented with evidence
  - Citations with URLs
  - Quality gates documented
  - Kill/pivot/proceed decisions tracked

**Unique Angle**:
- Most teams document ad-hoc. We have a SYSTEMATIC DOCUMENTATION SYSTEM.
- The Hub dashboard makes it visual and accessible.

**Hook**: "Knowledge gets lost. Processes aren't repeatable. What if every decision was documented and auditable?"

**Visual/Example**:
- Show document organization structure
- Show Hub dashboard with project cards
- Show workflow tracking interface
- Example: How a project moves from discovery → validation → build
- Screenshots of our actual system

**Sources to Reference**:
- Rule 003 (Document Organization)
- Rule 136 (Document Viewer Patterns)
- Rule 138 (Hub Document Discovery)
- Our actual document structure
- Our Hub implementation
- Our workflow tracking system

**Call to Action**: "What if every product decision was documented, auditable, and repeatable?"

Write the article following the base template guidelines, with emphasis on system design and practical examples.
```

---

## Claude Workflow

### Step 1: Prepare Context

Before prompting Claude, gather:
1. **Article topic** from content mapping
2. **Relevant sources** (rules, agents, docs, code examples)
3. **Real examples** from your implementation
4. **Screenshots/diagrams** to reference
5. **Related articles** in the series

### Step 2: Use Article-Specific Prompt

Use the article-specific prompt template above, filling in:
- Article number and title
- Target audience (Indie Hackers / Hacker News / Both)
- Key points to cover
- Unique angle
- Hook and call to action
- Sources to reference

### Step 3: Refine with Follow-Up Prompts

After Claude generates the initial draft, use follow-up prompts to refine:

**For Length Adjustment:**
```
The article is [X] words. Please adjust to [target length] words by:
- Expanding on [specific sections] with more examples
- Condensing [specific sections] while keeping key points
- Adding/removing examples as needed
```

**For Tone Adjustment:**
```
The tone needs to be more [conversational/technical/honest]. Please revise to:
- Use more "we/I" language
- Include more personal experiences
- Acknowledge limitations more explicitly
- Add more technical depth
```

**For Structure Improvement:**
```
Please improve the structure by:
- Strengthening the hook in the opening
- Adding more examples in [specific section]
- Making the takeaways more actionable
- Improving scannability with better headers
```

**For Content Enhancement:**
```
Please enhance the content by:
- Adding more specific examples from our actual implementation
- Including code examples for [specific section]
- Adding data/metrics where available
- Referencing our actual system more explicitly
```

### Step 4: Quality Check

Use this checklist to review Claude's output:

**Length:**
- [ ] 1,500-2,500 words (sweet spot)
- [ ] Not too short (< 1,000 words)
- [ ] Not too long (> 4,000 words) unless highly valuable

**Voice & Tone:**
- [ ] Uses "we" and "I" (not "you should")
- [ ] Conversational but professional
- [ ] Honest and transparent (acknowledges limitations)
- [ ] Practical and actionable
- [ ] Evidence-based (includes examples, data)

**Structure:**
- [ ] Strong hook in opening
- [ ] Clear sections with descriptive headers
- [ ] Examples and case studies included
- [ ] Lessons learned section
- [ ] Actionable takeaways
- [ ] Scannable format (headers, bullets, bold)

**Content:**
- [ ] Includes real examples from your implementation
- [ ] References your actual system (Hub, workflows, etc.)
- [ ] Includes code examples if technical
- [ ] Acknowledges limitations and trade-offs
- [ ] Links to related content
- [ ] No unsupported claims
- [ ] No marketing language or hype

**Formatting:**
- [ ] Markdown format
- [ ] Descriptive headers (not "Introduction", "Conclusion")
- [ ] Code blocks for technical content
- [ ] [SCREENSHOT] placeholders where helpful
- [ ] [LINK] placeholders for cross-references

### Step 5: Final Editing

After Claude generates the refined draft:
1. **Add screenshots** where [SCREENSHOT] placeholders are
2. **Add links** where [LINK] placeholders are
3. **Review for accuracy** - verify all claims, examples, data
4. **Personal touch** - add your own voice, experiences, insights
5. **Final polish** - grammar, flow, clarity

---

## Advanced Claude Prompts

### For Technical Depth (Hacker News)

```
Add more technical depth to [specific section] by:
- Including code examples from our actual implementation
- Explaining the architecture and design decisions
- Showing the implementation details
- Discussing trade-offs and alternatives considered
- Including performance considerations if relevant
```

### For Personal Stories (Indie Hackers)

```
Add more personal context to [specific section] by:
- Sharing our actual experience with [specific example]
- Including what we learned from [specific failure/success]
- Adding anecdotes from our journey
- Explaining our thought process and reasoning
- Making it more relatable and authentic
```

### For Examples and Case Studies

```
Expand the examples section by:
- Adding a detailed case study of [specific project]
- Including before/after comparisons
- Showing actual data/metrics from our implementation
- Adding screenshots descriptions for [specific feature]
- Including lessons learned from each example
```

### For Actionable Takeaways

```
Make the takeaways more actionable by:
- Converting high-level points into specific steps
- Adding "how to" instructions
- Including tools/resources needed
- Providing checklists or templates
- Making it immediately applicable
```

---

## Example: Complete Workflow

### Writing Article 2: "The Solution"

**Step 1: Prepare Context**
- Gather Rule 200 (Insight Validation Playbook)
- Gather Rule 205 (Moat & MRR Validation)
- Find examples from portfolio scoring
- Prepare screenshots of Hub dashboard
- List related articles (Article 1, Article 3)

**Step 2: Initial Prompt**
```
[Use Article 2 prompt from above]
```

**Step 3: Refine with Follow-Ups**
```
The article is 2,800 words. Please condense to 2,500 words by:
- Tightening the explanation of the Heat Filter
- Condensing the examples while keeping the most impactful ones
- Making the Durability Filter section more concise
```

```
Please add more technical depth to the "How It Works" section by:
- Including our actual validation test structure
- Showing how we implement the dual-filter in our system
- Explaining the scoring mechanism
- Adding code examples if relevant
```

```
Please strengthen the examples section by:
- Adding a detailed case study of Enterprise Design System for Startups
- Showing how it passed Heat Filter but we're validating Durability Filter
- Including actual scoring breakdown
- Adding lessons learned
```

**Step 4: Quality Check**
- Review against checklist
- Verify all claims are accurate
- Check examples are from actual implementation
- Ensure tone is right for both audiences

**Step 5: Final Editing**
- Add Hub dashboard screenshots
- Add links to related articles
- Add personal insights and experiences
- Final polish

---

## Tips for Best Results

1. **Be Specific**: The more context you give Claude, the better the output
2. **Iterate**: Don't expect perfect output on first try—refine with follow-ups
3. **Add Personal Touch**: Claude generates the structure, you add the authenticity
4. **Verify Everything**: Always fact-check Claude's output against your actual system
5. **Use Examples**: Reference your actual implementation, not hypotheticals
6. **Show, Don't Tell**: Include code, screenshots, data—not just descriptions
7. **Be Honest**: Claude can help you be more transparent about failures/limitations
8. **Link Everything**: Cross-reference related articles, docs, code

---

## Summary

**Best Practices:**
- Use article-specific prompts with full context
- Iterate with follow-up prompts to refine
- Always quality check against the checklist
- Add personal touch and verify accuracy
- Include real examples, code, screenshots

**Workflow:**
1. Prepare context (sources, examples, screenshots)
2. Use article-specific prompt
3. Refine with follow-up prompts
4. Quality check
5. Final editing (add screenshots, links, personal touch)

**Remember**: Claude is a writing assistant—you're the expert on your system. Use Claude to structure and refine, but always add your authentic voice and verify everything.

