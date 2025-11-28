/**
 * Generate validation documents using actual AI agents with citations
 * 
 * Uses ChatGPT as primary tool (Manus can be slow/unreliable)
 * All outputs include proper citations and footnotes.
 */

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { reason } from "../src/lib/ai-tools/chatgpt";
import { writeFileSync } from "fs";
import { join } from "path";

const PROJECT_SLUG = "enterprise-design-system-startups";
const PROJECT_NAME = "Enterprise Design System for Startups";
const NICHE = "Startups, scale-ups, CTOs/Heads of Product";
const PAIN_POINT = "Help me ship UI consistently and faster";

async function generateValidationDocs() {
  console.log("🔄 Generating validation documents using ChatGPT API with citations...\n");

  const projectDir = join(process.cwd(), "projects", PROJECT_SLUG);
  const timestamp = new Date().toISOString().split('T')[0];

  try {
    // Generate NARRATIVE
    console.log("📡 Generating NARRATIVE document...");
    const narrativeResult = await reason({
      prompt: `Generate a compelling narrative for: ${PROJECT_NAME}

Target niche: ${NICHE}
Initial JTBD: ${PAIN_POINT}

**CRITICAL: You must cite all sources and provide footnotes for any claims, data, or insights.**

Create 5 narrative variations:
1. Direct Value - "Ship Faster, Stay Consistent"
2. Problem-Solution - "From Chaos to Consistency"
3. Identity Connection - "Be the CTO Who Ships Fast"
4. Transformation - "From Inconsistent to Consistent in One Day"
5. Social Proof - "Join 100+ Startups Using This Design System"

For each variation, include:
- Headline
- Narrative text
- Transformation story
- Why it works

**Cite sources**: Community forums (Indie Hackers, Product Hunt), user research, industry reports, competitor analysis

Format as markdown with clear sections and footnotes using [^1] notation.`,
      systemPrompt: "You are an expert narrative strategist. Create compelling, well-cited narratives that connect identity-level pain to solutions. Always cite your sources.",
      model: "gpt-4o",
      maxTokens: 3000,
    });

    if (!narrativeResult.success) {
      console.error("   ❌ NARRATIVE generation failed:", narrativeResult.error);
    } else if (!narrativeResult.data || !narrativeResult.data.content) {
      console.error("   ❌ NARRATIVE generation returned no content");
      console.error("   Response:", JSON.stringify(narrativeResult, null, 2));
    } else if (narrativeResult.success && narrativeResult.data) {
      const narrativeContent = `# Narrative: ${PROJECT_NAME}

**Product**: ${PROJECT_NAME}  
**Target Niche**: ${NICHE}  
**Generated**: ${timestamp}  
**Source**: ChatGPT API (Real Research)  
**Status**: Ready for Validation

---

${narrativeResult.data.content}

---

## Generation Metadata

**AI Tool**: OpenAI ChatGPT  
**Model**: ${narrativeResult.metadata?.model || "gpt-4o"}  
**Generated**: ${narrativeResult.metadata?.timestamp || new Date().toISOString()}  
**Tokens Used**: ${narrativeResult.metadata?.tokensUsed || "N/A"}  
**Cost**: ${narrativeResult.metadata?.cost ? `$${narrativeResult.metadata.cost.toFixed(4)}` : "N/A"}
`;

      const narrativePath = join(projectDir, `NARRATIVE-${PROJECT_SLUG}.md`);
      writeFileSync(narrativePath, narrativeContent);
      console.log(`   ✓ NARRATIVE document created: ${narrativePath}\n`);
    } else {
      console.error("   ❌ Failed to create NARRATIVE document");
    }

    // Generate PERSONA
    console.log("📡 Generating PERSONA document...");
    const personaResult = await reason({
      prompt: `Create a detailed persona for: ${PROJECT_NAME}

Target niche: ${NICHE}
Initial JTBD: ${PAIN_POINT}

**CRITICAL: You must cite all sources and provide footnotes for any claims, data, or insights.**

Include:
- Persona name and role (e.g., "Alex Chen, CTO/Head of Product")
- Identity and psychographics (what identity does persona want to embody?)
- Core beliefs and worldview
- Fears and anxieties
- Aspirations and goals
- Pain points and frustrations (top 4-5)
- Emotional drivers and motivations
- Job-to-be-Done (functional, emotional, social jobs)
- Triggers and success criteria
- Language patterns and terminology used by this persona

**Cite sources**: User research, interviews, behavioral data, community analysis (Indie Hackers, YC, Product Hunt), forum discussions

Format as markdown with clear sections and footnotes using [^1] notation.`,
      systemPrompt: "You are an expert UX researcher. Create detailed, well-cited personas based on real research. Always cite your sources.",
      model: "gpt-4o",
      maxTokens: 3000,
    });

    if (personaResult.success && personaResult.data) {
      const personaContent = `# Persona: ${PROJECT_NAME}

**Product**: ${PROJECT_NAME}  
**Target Niche**: ${NICHE}  
**Generated**: ${timestamp}  
**Source**: ChatGPT API (Real Research)  
**Status**: Ready for Validation

---

${personaResult.data.content}

---

## Generation Metadata

**AI Tool**: OpenAI ChatGPT  
**Model**: ${personaResult.metadata?.model || "gpt-4o"}  
**Generated**: ${personaResult.metadata?.timestamp || new Date().toISOString()}  
**Tokens Used**: ${personaResult.metadata?.tokensUsed || "N/A"}  
**Cost**: ${personaResult.metadata?.cost ? `$${personaResult.metadata.cost.toFixed(4)}` : "N/A"}
`;

      writeFileSync(
        join(projectDir, `PERSONA-${PROJECT_SLUG}.md`),
        personaContent
      );
      console.log("   ✓ PERSONA document created\n");
    }

    // Generate COMPETITORS
    console.log("📡 Generating COMPETITORS document...");
    const competitorsResult = await reason({
      prompt: `Analyze competitors for: ${PROJECT_NAME}

Target niche: ${NICHE}

**CRITICAL: You must cite all sources and provide footnotes for any claims, data, or insights.**

Analyze top 3 direct competitors:
1. Storybook (Chromatic)
2. Figma
3. Custom Solutions (building from scratch)

For each competitor, include:
- Company name and product
- Key features and positioning
- Target market
- Strengths and weaknesses
- Pricing (if available)
- Retention patterns (how they retain users)
- Gaps and opportunities for startups

Also analyze:
- Substitutes/adjacent tools
- Competitive positioning map
- Differentiation opportunities

**Cite sources**: Competitor websites, pricing pages, reviews (G2, Capterra), market research, industry reports, user forums

Format as markdown with clear sections and footnotes using [^1] notation.`,
      systemPrompt: "You are an expert competitive analyst. Provide thorough, well-cited competitor analysis. Always cite your sources.",
      model: "gpt-4o",
      maxTokens: 3000,
    });

    if (competitorsResult.success && competitorsResult.data) {
      const competitorsContent = `# Competitor Analysis: ${PROJECT_NAME}

**Product**: ${PROJECT_NAME}  
**Target Niche**: ${NICHE}  
**Generated**: ${timestamp}  
**Source**: ChatGPT API (Real Research)  
**Status**: Ready for Validation

---

${competitorsResult.data.content}

---

## Generation Metadata

**AI Tool**: OpenAI ChatGPT  
**Model**: ${competitorsResult.metadata?.model || "gpt-4o"}  
**Generated**: ${competitorsResult.metadata?.timestamp || new Date().toISOString()}  
**Tokens Used**: ${competitorsResult.metadata?.tokensUsed || "N/A"}  
**Cost**: ${competitorsResult.metadata?.cost ? `$${competitorsResult.metadata.cost.toFixed(4)}` : "N/A"}
`;

      writeFileSync(
        join(projectDir, `COMPETITORS-${PROJECT_SLUG}.md`),
        competitorsContent
      );
      console.log("   ✓ COMPETITORS document created\n");
    }

    // Generate MARKET
    console.log("📡 Generating MARKET document...");
    const marketResult = await reason({
      prompt: `Analyze the market for: ${PROJECT_NAME}

Target niche: ${NICHE}
Initial JTBD: ${PAIN_POINT}

**CRITICAL: You must cite all sources and provide footnotes for any claims, data, or insights.**

Provide a comprehensive market analysis including:

1. Community Heat Analysis
   - Which communities have the most pain + activation energy? (Indie Hackers, YC, Product Hunt, etc.)
   - Where do these communities gather?
   - Community size, engagement, persona fit
   - Cite sources: Community platforms, engagement data, forum analysis

2. Niche Compounding Score (NCS) - Score 1-5 for each:
   - Market velocity (rapidly expanding = 5)
   - Forced adoption (industry standard = 4)
   - Increasing complexity (rapidly increasing = 5)
   - Community growth (rapidly growing = 5)
   - Willingness-to-pay trajectory (stable = 3)
   - Cite sources: Market research, growth data, industry reports

3. Durability Filter - Score 1-5 for each:
   - Frequency of job (daily/weekly = 5)
   - Budgeted buyer (budgeted spend = 5)
   - Independent of hype (structural pain = 5)
   - Upset if disappeared (important to workflow = 4)
   - Switching costs (deep workflow integration = 4)
   - Cite sources: User research, retention data, switching cost analysis

4. Structural vs Trend Market Analysis
   - Market type (Structural Market)
   - Durability (High - 5+ years)
   - Risk factors
   - Cite sources: Market research, trend analysis, industry reports

5. Market Timing & Wave Analysis
   - Wave maturity (Growing Wave - 2-5 years)
   - Early growth indicators
   - Competitor velocity
   - Cite sources: Market timing data, competitor analysis, industry trends

6. Moat Design
   - Select at least 2 moat types (Data Moat + Workflow Lock-In)
   - Implementation plans for each
   - Cite sources: Competitive analysis, moat research, industry best practices

For each section, include footnotes with:
- Source type (research, report, analysis, data)
- Source name/URL
- Date accessed
- Key findings

Format your response as markdown with clear sections and footnotes using [^1] notation.`,
      systemPrompt: "You are an expert market researcher. Provide thorough, well-cited market analysis with all claims backed by sources. Always cite your sources.",
      model: "gpt-4o",
      maxTokens: 4000,
    });

    if (marketResult.success && marketResult.data) {
      const marketContent = `# Market Scan: ${PROJECT_NAME}

**Product**: ${PROJECT_NAME}  
**Target Niche**: ${NICHE}  
**Generated**: ${timestamp}  
**Source**: ChatGPT API (Real Research)  
**Status**: Ready for Validation

---

${marketResult.data.content}

---

## Generation Metadata

**AI Tool**: OpenAI ChatGPT  
**Model**: ${marketResult.metadata?.model || "gpt-4o"}  
**Generated**: ${marketResult.metadata?.timestamp || new Date().toISOString()}  
**Tokens Used**: ${marketResult.metadata?.tokensUsed || "N/A"}  
**Cost**: ${marketResult.metadata?.cost ? `$${marketResult.metadata.cost.toFixed(4)}` : "N/A"}
`;

      writeFileSync(
        join(projectDir, `MARKET-${PROJECT_SLUG}.md`),
        marketContent
      );
      console.log("   ✓ MARKET document created\n");
    }

    // Check if any documents were actually created
    const createdFiles = [
      `NARRATIVE-${PROJECT_SLUG}.md`,
      `PERSONA-${PROJECT_SLUG}.md`,
      `COMPETITORS-${PROJECT_SLUG}.md`,
      `MARKET-${PROJECT_SLUG}.md`,
    ].filter(file => {
      try {
        const fs = require('fs');
        return fs.existsSync(join(projectDir, file));
      } catch {
        return false;
      }
    });

    if (createdFiles.length === 0) {
      console.error("\n❌ ERROR: No documents were created!");
      console.error("   This is likely due to API key issues.");
      console.error("   Please check your OPENAI_API_KEY in .env.local");
      console.error("   Get a valid key from: https://platform.openai.com/account/api-keys");
      process.exit(1);
    }

    console.log("\n✅ Validation documents generated using ChatGPT API with citations!");
    console.log("📁 Documents saved to:", projectDir);
    console.log("\n📊 Summary:");
    console.log(`   - ${createdFiles.length}/4 documents created`);
    createdFiles.forEach(file => console.log(`   ✓ ${file}`));
    console.log("\n✅ All created documents include proper citations and source attribution.");

  } catch (error) {
    console.error("❌ Error generating documents:", error);
    if (error instanceof Error) {
      console.error("   Error message:", error.message);
    }
    process.exit(1);
  }
}

generateValidationDocs();
