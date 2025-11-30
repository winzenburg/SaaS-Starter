import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { writeFileSync, existsSync, mkdirSync, readFileSync } from "fs";
import { join } from "path";

interface ArticleConfig {
  articleNumber: number;
  title: string;
  description: string;
  hook: string;
  keyPoints: string[];
  uniqueAngle: string;
  callToAction: string;
  targetAudience: "Indie Hackers" | "Hacker News" | "Both";
  targetLength: number;
  sources: string[];
}

// Article configurations from content mapping
const ARTICLE_CONFIGS: Record<number, ArticleConfig> = {
  1: {
    articleNumber: 1,
    title: "The Problem: Why Most SaaS Startups Fail Before They Even Start",
    description: "Exploring why 90% of SaaS startups fail and how the problem isn't the idea—it's the process.",
    hook: "90% of SaaS startups fail. But what if the problem isn't the idea—it's the process?",
    keyPoints: [
      "The Build Trap: Most founders build before validating (desirability problem)",
      "The Feature Trap: Even validated products fail because they lack defensibility (durability problem)",
      "The Portfolio Problem: Solo founders and small teams can't afford to bet everything on one idea",
      "The Documentation Problem: Knowledge gets lost, processes aren't repeatable",
      "The AI Problem: AI tools are powerful but disconnected—no orchestration, no citations, no systematic workflow",
    ],
    uniqueAngle: "Solving BOTH the 'will people want this?' problem AND the 'will they keep paying 12-36 months from now?' problem (durability). Most validation frameworks stop at demand validation—a dual-filter approach goes further.",
    callToAction: "What if you could validate both desirability AND durability before writing a single line of code?",
    targetAudience: "Both",
    targetLength: 1800,
    sources: [
      "docs/FINAL_SYSTEM_SUMMARY.md",
      "docs/SYSTEMS.md",
      ".cursor/rules/200-playbook-insight-validation.mdc",
      ".cursor/rules/205-playbook-moat-mrr-validation.mdc",
    ],
  },
  2: {
    articleNumber: 2,
    title: "The Solution: A Dual-Filter Validation Framework",
    description: "Heat gets you in. Durability makes it a real SaaS business.",
    hook: "Heat gets you in. Durability makes it a real SaaS business.",
    keyPoints: [
      "Filter 1: Heat Filter - 'Do a tribe of real humans urgently want this?' (desirability-first validation)",
      "Filter 2: Durability Filter - 'Will this still matter and keep paying 12-36 months from now?'",
      "Most frameworks validate EITHER desirability OR durability. A dual-filter approach validates BOTH.",
    ],
    uniqueAngle: "The 'Durability Filter' prevents building products that people want but won't pay for long-term—combining desirability validation with durability assessment catches bad ideas early.",
    callToAction: "What if you could kill bad ideas faster and double down on the ones that will actually build a business?",
    targetAudience: "Both",
    targetLength: 2500,
    sources: [
      "docs/SYSTEMS.md",
      ".cursor/rules/200-playbook-insight-validation.mdc",
      ".cursor/rules/205-playbook-moat-mrr-validation.mdc",
      "docs/FINAL_SYSTEM_SUMMARY.md",
    ],
  },
  3: {
    articleNumber: 3,
    title: "The AI Orchestration: How to Connect Multiple AI Tools in a Systematic Workflow",
    description: "AI tools are powerful, but they're islands. Here's how to orchestrate them into a systematic, auditable workflow.",
    hook: "AI tools are powerful. But they're islands. What if they worked together?",
    keyPoints: [
      "The Orchestration Flow: Manus → ChatGPT → Claude → Cursor Agents",
      "Citation Tracking: Every AI-generated claim backed by sources with URLs",
      "Systematic Workflow: Each step has inputs, outputs, and quality gates",
      "Most people use AI tools in isolation—a systematic orchestration connects them",
    ],
    uniqueAngle: "Most AI outputs are unverifiable. A systematic orchestration with citation tracking makes every claim auditable and every workflow repeatable.",
    callToAction: "What if AI tools worked together in a systematic, auditable way?",
    targetAudience: "Hacker News",
    targetLength: 2500,
    sources: [
      "docs/AI-INTEGRATION-GUIDE.md",
      ".cursor/rules/190-ai-tool-integrations.mdc",
      ".cursor/rules/195-ai-workflow-orchestration.mdc",
      ".cursor/rules/311-manus-orchestration-flow.mdc",
    ],
  },
  4: {
    articleNumber: 4,
    title: "The Portfolio Approach: Managing Multiple Bets, Killing Fast, Prioritizing by Expected Value",
    description: "You're not building one product. You're managing a portfolio of bets.",
    hook: "You're not building one product. You're managing a portfolio of bets.",
    keyPoints: [
      "Portfolio Theory for SaaS: Don't bet everything on one idea",
      "Portfolio Scoring System: 0-40 point scoring model (desirability, durability, moat, expansion)",
      "Resource Allocation: Allocate resources by expected value",
      "Kill fast, double down on winners",
    ],
    uniqueAngle: "Most founders are 'all in' on one idea. A portfolio approach with systematic scoring reduces risk and increases the odds of success.",
    callToAction: "What if you could manage multiple product bets systematically, not emotionally?",
    targetAudience: "Indie Hackers",
    targetLength: 2500,
    sources: [
      ".cursor/rules/207-playbook-portfolio-management.mdc",
      "docs/agents/portfolio-prioritizer.md",
      "docs/SYSTEMS.md",
    ],
  },
  5: {
    articleNumber: 5,
    title: "The Documentation System: Making Knowledge Repeatable and Auditable",
    description: "Knowledge gets lost. Processes aren't repeatable. What if every decision was documented and auditable?",
    hook: "Knowledge gets lost. Processes aren't repeatable. What if every decision was documented and auditable?",
    keyPoints: [
      "Systematic Document Organization: Every idea has a complete document set",
      "Cross-Referenced Knowledge: Documents link to related documents",
      "Real-Time Workflow Tracking: Visual progress through discovery and validation",
      "Auditable Process: Every decision is documented with evidence",
    ],
    uniqueAngle: "Most teams document ad-hoc. A systematic documentation system makes knowledge repeatable and every decision auditable.",
    callToAction: "What if every product decision was documented, auditable, and repeatable?",
    targetAudience: "Both",
    targetLength: 2200,
    sources: [
      ".cursor/rules/003-doc-organization.mdc",
      ".cursor/rules/136-document-viewer-patterns.mdc",
      ".cursor/rules/138-hub-document-discovery.mdc",
    ],
  },
  6: {
    articleNumber: 6,
    title: "The Rules and Agents System: Making the Process Repeatable",
    description: "What if your product creation process was as systematic as your code?",
    hook: "What if your product creation process was as systematic as your code?",
    keyPoints: [
      "Rules System: 300+ rules that enforce the process (core, stack, playbooks)",
      "Agent System: Specialized AI agents for each phase (discovery, validation, product strategy, research)",
      "Quality Gates: Every step has gates that must be passed",
      "Machine-readable and enforceable process",
    ],
    uniqueAngle: "Most teams have ad-hoc processes. A rules and agents system makes product creation as systematic and repeatable as code.",
    callToAction: "What if your product creation process was as systematic and repeatable as your code?",
    targetAudience: "Both",
    targetLength: 2800,
    sources: [
      "docs/AGENT_ROSTER.md",
      "docs/FINAL_SYSTEM_SUMMARY.md",
      ".cursor/rules/027-core-desirability-first.mdc",
    ],
  },
  7: {
    articleNumber: 7,
    title: "The Hub: A Meta-Project for Managing Your Product Portfolio",
    description: "What if you had a dashboard for managing your entire product portfolio?",
    hook: "What if you had a dashboard for managing your entire product portfolio?",
    keyPoints: [
      "Portfolio Dashboard: Visual overview of all projects with stats and scores",
      "Workflow Tracking: Visual progress through discovery and validation",
      "Document Discovery: Automatic discovery of documents across multiple directories",
      "Cross-Navigation: Seamless navigation between Hub, Workflows, and Documents",
    ],
    uniqueAngle: "Most teams use spreadsheets or ad-hoc tools. A dedicated Hub makes portfolio management visual and accessible—a meta-project for managing products.",
    callToAction: "What if you had a dashboard for managing your entire product portfolio?",
    targetAudience: "Indie Hackers",
    targetLength: 2500,
    sources: [
      ".cursor/rules/138-hub-document-discovery.mdc",
      "docs/HUB-AND-SPOKE.md",
    ],
  },
  8: {
    articleNumber: 8,
    title: "The Technical Stack: Modern Web Standards for Product Creation Platforms",
    description: "Building a process is one thing. Building a platform is another.",
    hook: "Building a process is one thing. Building a platform is another.",
    keyPoints: [
      "Modern Stack: Next.js 15 (App Router), tRPC, Drizzle ORM, PostgreSQL",
      "Design System: Shadcn/UI, Tailwind CSS v4, accessible components (WCAG 2.2 AA)",
      "AI Tool Integration: API integrations with error handling, model fallback, citation extraction",
      "Observability: Error tracking, analytics, performance monitoring",
    ],
    uniqueAngle: "Most validation frameworks are spreadsheets or docs. Building a platform with modern web standards makes the process production-ready, not a prototype.",
    callToAction: "What if your validation framework was a platform, not a spreadsheet?",
    targetAudience: "Hacker News",
    targetLength: 2200,
    sources: [
      ".cursor/rules/110-next-app-router.mdc",
      ".cursor/rules/120-trpc-conventions.mdc",
      ".cursor/rules/130-drizzle-postgres.mdc",
      ".cursor/rules/010-core-ux-a11y.mdc",
    ],
  },
  9: {
    articleNumber: 9,
    title: "The Results: What We've Learned Building This System",
    description: "Building a systematic product creation engine. Here's what works, what doesn't, and what we've learned.",
    hook: "Building a systematic product creation engine. Here's what works, what doesn't, and what we've learned.",
    keyPoints: [
      "What Works: Dual-filter validation, AI orchestration, portfolio approach, systematic documentation",
      "What Doesn't Work: Ad-hoc AI prompting, single-idea focus, build-first mentality, unstructured documentation",
      "Lessons Learned: Validation is a process, AI tools need orchestration, portfolio management is essential, documentation is a feature",
      "Future Improvements: More integrations, better automation, enhanced scoring, community features",
    ],
    uniqueAngle: "Sharing what works and what doesn't while building, not after—an honest assessment of a systematic approach to product creation.",
    callToAction: "What if you could learn from these mistakes and build on these successes?",
    targetAudience: "Both",
    targetLength: 2000,
    sources: [
      "docs/FINAL_SYSTEM_SUMMARY.md",
      "docs/SYSTEMS.md",
    ],
  },
  10: {
    articleNumber: 10,
    title: "The Open Source Vision: Building a Community Around Product Creation",
    description: "What if the entire product creation process was open source?",
    hook: "What if the entire product creation process was open source?",
    keyPoints: [
      "Open Source Philosophy: Rules, agents, and processes are transparent and auditable",
      "Community Benefits: Shared validation frameworks, orchestration patterns, document templates, lessons learned",
      "Future Vision: Community-contributed agents, rules, templates, and case studies",
      "Most validation frameworks are proprietary—an open source approach benefits everyone",
    ],
    uniqueAngle: "Most validation frameworks are proprietary. Open sourcing the entire process creates a community-driven product creation engine that everyone can improve.",
    callToAction: "What if you could contribute to and benefit from a community-driven product creation engine?",
    targetAudience: "Both",
    targetLength: 3000,
    sources: [
      "docs/FINAL_SYSTEM_SUMMARY.md",
      "docs/CONTRIBUTING.md",
    ],
  },
};

async function generateArticleWithClaude(config: ArticleConfig) {
  console.log(`\n🎯 Generating Article ${config.articleNumber}: ${config.title}\n`);

  // Read source documents
  const sourceContents: string[] = [];
  for (const source of config.sources) {
    const sourcePath = join(process.cwd(), source);
    if (existsSync(sourcePath)) {
      try {
        const content = readFileSync(sourcePath, "utf-8");
        sourceContents.push(`\n## ${source}\n\n${content.substring(0, 5000)}...\n`);
      } catch (error) {
        console.warn(`⚠️  Could not read source ${source}: ${error}`);
      }
    }
  }

  // Build the prompt using the Claude Article Writing Guide template
  const prompt = `You are writing an article for ${config.targetAudience} that will also serve as personal reference documentation.

**Article Topic**: ${config.title}
**Target Length**: ${config.targetLength} words
**Target Audience**: ${config.targetAudience}

**Article Context**:
- This is part of a series documenting our product creation engine
- We're building a systematic approach to SaaS product creation
- Articles should be honest, practical, and evidence-based
- Include real examples from our actual implementation

**Hook**: ${config.hook}

**Key Points to Cover**:
${config.keyPoints.map((point) => `- ${point}`).join("\n")}

**Unique Angle**: ${config.uniqueAngle}

**Call to Action**: ${config.callToAction}

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
   - Hook: ${config.hook}
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
- Include specific examples from actual implementations (avoid referencing specific brand names)
- Describe frameworks and systems generically (avoid "our system", "our Hub")
- Include real data/metrics if available
- Link to related articles in the series (without brand-specific CTAs)
- Acknowledge limitations and trade-offs
- Show the process, not just the results
- Focus on universal principles applicable to all readers

**Formatting Requirements**:
- Use descriptive headers (not "Introduction", "Conclusion")
- Break up text with headers, lists, examples
- Use code blocks for technical content
- Include [SCREENSHOT] placeholders where visuals would help
- Include [LINK] placeholders for cross-references
- Use markdown format

**What to Avoid**:
- Don't reference specific brands or product names (avoid "SaaS Starter", "Our Hub")
- Don't attribute frameworks to individuals by name (avoid "[Person]'s approach" - use general descriptors like "desirability-first approach" instead)
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
${sourceContents.join("\n")}

**Output Format**:
- Markdown format with frontmatter
- Frontmatter should include: title, description, publishedAt, category, tags
- Ready for publishing (with minor edits)
- Include [SCREENSHOT] placeholders where visuals would help
- Include [LINK] placeholders for cross-references

Now, write the article following these guidelines. The article should be approximately ${config.targetLength} words.`;

  console.log("🤖 Calling Claude to generate article...\n");

  // Import critique after env vars are loaded
  const { critique } = await import("../src/lib/ai-tools/claude");

  const result = await critique({
    prompt,
    systemPrompt: "You are an expert technical writer specializing in product creation, SaaS validation, and systematic processes. Your writing is clear, honest, practical, and evidence-based. You write for both technical and non-technical audiences, making complex concepts accessible without dumbing them down.",
    model: "claude-3-opus-20240229",
    maxTokens: 4000, // Reduced for compatibility with all models
  });

  if (!result.success || !result.data) {
    console.error("❌ Claude failed to generate article:", result.error);
    process.exit(1);
  }

  const articleContent = result.data.content;

  // Extract title from content if not in frontmatter
  const frontmatterMatch = articleContent.match(/^---\n([\s\S]*?)\n---\n/);
  let frontmatter = "";
  let body = articleContent;

  if (!frontmatterMatch) {
    // Add frontmatter if not present
    const publishedAt = new Date().toISOString();
    frontmatter = `---
title: "${config.title}"
description: "${config.description}"
publishedAt: "${publishedAt}"
category: "Product Creation"
tags: "validation, saas, product-development"
---

`;
    body = articleContent;
  } else {
    frontmatter = frontmatterMatch[0];
    body = articleContent.replace(/^---\n[\s\S]*?\n---\n/, "");
  }

  // Ensure articles directory exists
  const articlesDir = join(process.cwd(), "articles");
  if (!existsSync(articlesDir)) {
    mkdirSync(articlesDir, { recursive: true });
  }

  // Generate slug from title
  const slug = config.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const articlePath = join(articlesDir, `${slug}.md`);
  const fullContent = frontmatter + body;

  writeFileSync(articlePath, fullContent, "utf-8");

  console.log(`✅ Article generated successfully!`);
  console.log(`   Path: ${articlePath}`);
  console.log(`   Length: ${body.split(/\s+/).length} words`);
  console.log(`   URL: http://localhost:3000/articles/${slug}\n`);

  return { slug, path: articlePath, content: fullContent };
}

// Main execution
const articleNumber = parseInt(process.argv[2] || "1", 10);

if (!ARTICLE_CONFIGS[articleNumber]) {
  console.error(`❌ Article ${articleNumber} not found in configurations.`);
  console.error(`   Available articles: ${Object.keys(ARTICLE_CONFIGS).join(", ")}`);
  process.exit(1);
}

const articleConfig = ARTICLE_CONFIGS[articleNumber];

generateArticleWithClaude(articleConfig)
  .then(() => {
    console.log("✅ Article generation complete!\n");
  })
  .catch((error) => {
    console.error("❌ Error generating article:", error);
    process.exit(1);
  });

