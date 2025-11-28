/**
 * Orchestrate Manus discovery pack through the proper flow:
 * Manus → ChatGPT → Claude → Cursor Agents
 * 
 * This script follows Rule 000 (Orchestration) and Rule 311 (Manus Orchestration Flow)
 */

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import { reason } from "../src/lib/ai-tools/chatgpt";
import { critique } from "../src/lib/ai-tools/claude";

const PROJECT_SLUG = "enterprise-design-system-startups";
const PROJECT_NAME = "Enterprise Design System for Startups";
const NICHE = "Startups, scale-ups, CTOs/Heads of Product";
const PAIN_POINT = "Help me ship UI consistently and faster";

const DISCOVERY_PACK_PATH = "/Users/ryanwinzenburg/Downloads/discovery_pack.md";
const PROJECT_DIR = join(process.cwd(), "projects", PROJECT_SLUG);
const DISCOVERY_DIR = join(process.cwd(), "docs", "discovery");

async function orchestrateManusDiscovery() {
  console.log("🎯 Orchestrating Manus Discovery Pack\n");
  console.log("Following Rule 000 (Orchestration): Manus → ChatGPT → Claude → Cursor Agents\n");

  // Step 1: Save Raw Manus Output
  console.log("📥 Step 1: Saving Raw Manus Discovery Pack...\n");
  
  if (!existsSync(DISCOVERY_PACK_PATH)) {
    console.error(`❌ Manus discovery pack not found at: ${DISCOVERY_PACK_PATH}`);
    process.exit(1);
  }

  const rawManusContent = readFileSync(DISCOVERY_PACK_PATH, "utf-8");
  const manusOutputPath = join(DISCOVERY_DIR, `MANUS-${PROJECT_SLUG}.md`);
  
  const manusOutput = `# Manus Discovery Pack: ${PROJECT_NAME}

**Product**: ${PROJECT_NAME}  
**Target Niche**: ${NICHE}  
**Generated**: ${new Date().toISOString().split('T')[0]}  
**Source**: Manus.im Discovery Pack (Raw Output)  
**Status**: Raw output - requires ChatGPT refinement

---

${rawManusContent}

---

## Generation Metadata

**AI Tool**: Manus.im  
**Source**: Imported from discovery_pack.md  
**Generated**: ${new Date().toISOString().split('T')[0]}  
**Next Step**: ChatGPT Refinement
`;

  writeFileSync(manusOutputPath, manusOutput);
  console.log(`✅ Saved raw Manus output to: ${manusOutputPath}\n`);

  // Step 2: ChatGPT Refinement
  console.log("🤖 Step 2: ChatGPT Refinement...\n");
  console.log("   Tasks:");
  console.log("   - Cluster pain points by frequency, severity, urgency");
  console.log("   - Synthesize JTBD (main job, related jobs, emotional jobs)");
  console.log("   - Extract opportunity vectors (winner-take-most, switching costs, data moats)");
  console.log("   - Validate competitor assumptions\n");

  const chatgptRefinementPrompt = `Refine and synthesize this Manus discovery output for ${PROJECT_NAME}:

${rawManusContent}

**Refinement Tasks:**

1. **Cluster Pain Points**:
   - Group pains by frequency (Daily/Weekly/Monthly/Quarterly/Event-driven/Rare)
   - Group pains by severity (Mild/Moderate/Severe/Critical)
   - Group pains by urgency (Low/Medium/High/Critical)
   - Identify pain patterns across clusters
   - Score top 5 pains (1-10 scale)

2. **Synthesize JTBD**:
   - Extract main functional job (primary job-to-be-done)
   - Identify related jobs (supporting jobs)
   - Identify emotional jobs (how persona wants to feel)
   - Identify social jobs (how persona wants to be perceived)
   - Map triggers (when/where/why does job arise?)
   - Define success criteria (how does persona know job is done well?)
   - Identify barriers (what prevents job completion?)

3. **Extract Opportunity Vectors**:
   - Winner-take-most dynamics (network effects, platform effects)
   - Switching cost potential (workflow embedding, data migration)
   - Data moat opportunities (unique data exhaust, insights, tracking)
   - Workflow embedding opportunities (integration points, daily usage)
   - Underserved segments (blue ocean pockets, unmet needs)

4. **Validate Competitor Assumptions**:
   - Cross-check competitor positioning claims
   - Validate competitor gap assumptions
   - Verify differentiation opportunities
   - Validate market positioning assumptions
   - Check pricing expectations against market reality

**Output Format:**
- Clustered pain points with scores
- Structured JTBD map (main, related, emotional, social jobs)
- Opportunity vectors ranked by potential
- Validated competitor insights
- Ready-to-use insights for Cursor discovery agents

**All claims must be backed by citations from the Manus discovery pack.**`;

  const chatgptResult = await reason({
    prompt: chatgptRefinementPrompt,
    systemPrompt: "You are an expert product strategist. Refine and synthesize discovery insights with precision and clarity. Always cite your sources.",
    model: "gpt-4o",
    maxTokens: 4000,
  });

  let chatgptRefinementContent = "";
  let chatgptOutputPath = "";

  if (!chatgptResult.success || !chatgptResult.data) {
    console.warn("⚠️  ChatGPT refinement failed:", chatgptResult.error);
    console.warn("   Continuing with Claude critique using raw Manus output only\n");
    chatgptRefinementContent = "ChatGPT refinement skipped due to API quota/error. Claude critique will use raw Manus output directly.";
  } else {
    chatgptRefinementContent = chatgptResult.data.content;
    chatgptOutputPath = join(DISCOVERY_DIR, `CHATGPT-REFINEMENT-${PROJECT_SLUG}.md`);
    const chatgptOutput = `# ChatGPT Refinement: ${PROJECT_NAME}

**Product**: ${PROJECT_NAME}  
**Target Niche**: ${NICHE}  
**Generated**: ${new Date().toISOString().split('T')[0]}  
**Source**: ChatGPT Refinement of Manus Discovery Pack  
**Status**: Refined insights - ready for Claude red-team critique

---

## Refined Insights

${chatgptResult.data.content}

---

## Generation Metadata

**AI Tool**: ChatGPT (GPT-4o)  
**Input**: Manus Discovery Pack  
**Generated**: ${new Date().toISOString().split('T')[0]}  
**Tokens**: ${chatgptResult.metadata?.tokensUsed || "N/A"}  
**Next Step**: Claude Red-Team Critique
`;

    writeFileSync(chatgptOutputPath, chatgptOutput);
    console.log(`✅ Saved ChatGPT refinement to: ${chatgptOutputPath}\n`);
  }

  // Step 3: Claude Red-Team Critique
  console.log("🔍 Step 3: Claude Red-Team Critique...\n");
  console.log("   Tasks:");
  console.log("   - Identify false assumptions");
  console.log("   - Find competitor risks");
  console.log("   - Stress test moat potential");
  console.log("   - Suggest pivots if needed\n");

  const claudePrompt = `Perform a red-team critique of this discovery analysis for ${PROJECT_NAME}:

**Manus Raw Output:**
${rawManusContent.substring(0, 10000)}...

${chatgptRefinementContent ? `**ChatGPT Refinement:**
${chatgptRefinementContent.substring(0, 5000)}...` : "**Note**: ChatGPT refinement was skipped. Critique based on raw Manus output."}

**Red-Team Critique Tasks:**

1. **Identify False Assumptions**:
   - Market assumptions (niche size, growth, timing)
   - Pain assumptions (intensity, frequency, monetization potential)
   - Persona assumptions (identity, motivations, behaviors)
   - Competitive assumptions (positioning, gaps, differentiation)
   - Timing assumptions (market readiness, competitive response)

2. **Find Competitor Risks**:
   - Competitive response scenarios (how competitors might react)
   - Market timing risks (too early, too late, wrong wave)
   - Moat vulnerability (what could break the moat)
   - Pricing/channel fragility (sustainability, defensibility)

3. **Stress Test Moat**:
   - Switching cost potential (can users easily switch?)
   - Data moat strength (is data truly unique and defensible?)
   - Network effects potential (will network effects materialize?)
   - Workflow embedding depth (how deeply embedded in workflow?)

4. **Suggest Pivots**:
   - Alternative approaches if assumptions are wrong
   - Risk mitigation strategies
   - Kill criteria (when to abandon the idea)
   - Pivot opportunities (alternative angles, segments, positioning)

**Be critical but constructive. Challenge assumptions. Find blindspots.**`;

  const claudeResult = await critique({
    prompt: claudePrompt,
    systemPrompt: "You are a red-team strategist. Be critical, find blindspots, challenge assumptions. Your job is to stress-test the discovery analysis and find weaknesses before they become problems.",
    model: "claude-3-opus-20240229", // Claude Opus for deep critique (will fallback if not available)
    maxTokens: 4000,
  });

  if (!claudeResult.success || !claudeResult.data) {
    console.error("❌ Claude red-team critique failed:", claudeResult.error);
    console.error("   Error details:", claudeResult.error);
    process.exit(1);
  }

  const claudeOutputPath = join(DISCOVERY_DIR, `REDTEAM-${PROJECT_SLUG}.md`);
  const claudeOutput = `# Red-Team Critique: ${PROJECT_NAME}

**Product**: ${PROJECT_NAME}  
**Target Niche**: ${NICHE}  
**Generated**: ${new Date().toISOString().split('T')[0]}  
**Source**: Claude Red-Team Critique (via ChatGPT - should use Claude API in production)  
**Status**: Critique complete - ready for Cursor agents

---

## Red-Team Analysis

${claudeResult.data.content}

---

## Generation Metadata

**AI Tool**: Claude (claude-3-opus-20240229, with fallback to claude-3-sonnet-20240229 or claude-3-haiku-20240307)  
**Input**: Manus Discovery Pack${chatgptRefinementContent ? " + ChatGPT Refinement" : " (ChatGPT refinement skipped)"}  
**Generated**: ${new Date().toISOString().split('T')[0]}  
**Tokens**: ${claudeResult.metadata?.tokensUsed || "N/A"}  
**Next Step**: Cursor Agents (Niche-Intelligence, Pain-Signal, JTBD, Opportunity-Moat)
`;

  writeFileSync(claudeOutputPath, claudeOutput);
  console.log(`✅ Saved Claude red-team critique to: ${claudeOutputPath}\n`);

  // Step 4: Summary
  console.log("✅ Orchestration Complete!\n");
  console.log("📁 Files Created:");
  console.log(`   1. ${manusOutputPath}`);
  if (chatgptOutputPath) {
    console.log(`   2. ${chatgptOutputPath}`);
  } else {
    console.log(`   2. ChatGPT refinement skipped (API quota/error)`);
  }
  console.log(`   3. ${claudeOutputPath}\n`);
  console.log("🎯 Next Steps:");
  console.log("   - Use Cursor agents to create structured discovery documents:");
  console.log("     - @Niche-Intelligence-Agent → NICHE-INTEL-*.md");
  console.log("     - @Pain-Signal-Agent → PAIN-SIGNALS-*.md");
  console.log("     - @JTBD-Agent → JTBD-*.md");
  console.log("     - @Opportunity-Moat-Agent → OPPORTUNITY-*.md\n");
  console.log("   These agents will use:");
  console.log("   - Raw Manus output (reference)");
  console.log("   - ChatGPT refinement (clustered/synthesized insights)");
  console.log("   - Claude red-team critique (validated assumptions)\n");
}

orchestrateManusDiscovery().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});

