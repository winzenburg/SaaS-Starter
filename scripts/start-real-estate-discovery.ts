/**
 * Start Discovery for Real Estate Investor Flipper Platform
 * 
 * Following Rule 000 (Orchestration) and Rule 311 (Manus Orchestration Flow):
 * Step 1: Manus → Generate Raw Discovery Pack
 */

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { writeFileSync } from "fs";
import { join } from "path";
import { generateDiscoveryPack } from "../src/lib/ai-tools/manus";

const PROJECT_SLUG = "real-estate-investor-flipper-platform";
const PROJECT_NAME = "Real Estate Investor & Flipper Platform";
const NICHE = "Real estate investors/flippers";
const PAIN_POINT = "Help me analyze deals, track renos, and ROI";
const CONTEXT = "Platform to help real estate investors and flippers analyze deals, track renovations, and monitor ROI across their portfolio";

const DISCOVERY_DIR = join(process.cwd(), "docs", "discovery");

async function startDiscovery() {
  console.log("🎯 Starting Discovery for Real Estate Investor Flipper Platform\n");
  console.log("Following Rule 000 (Orchestration) and Rule 311 (Manus Orchestration Flow)\n");
  console.log("Step 1: Manus → Generate Raw Discovery Pack\n");

  // Step 1: Generate Raw Manus Discovery Pack
  console.log("📥 Step 1: Generating Raw Manus Discovery Pack...\n");
  console.log(`   Product: ${PROJECT_NAME}`);
  console.log(`   Niche: ${NICHE}`);
  console.log(`   Pain Point: ${PAIN_POINT}\n`);

  try {
    const result = await generateDiscoveryPack({
      product: PROJECT_NAME,
      niche: NICHE,
      painPoint: PAIN_POINT,
      context: CONTEXT,
    });

    if (!result.success || !result.data) {
      console.error("❌ Manus discovery pack generation failed:", result.error);
      process.exit(1);
    }

    const discoveryPack = result.data;
    const rawContent = typeof discoveryPack === "string" 
      ? discoveryPack 
      : JSON.stringify(discoveryPack, null, 2);

    const manusOutputPath = join(DISCOVERY_DIR, `MANUS-${PROJECT_SLUG}.md`);
    
    const manusOutput = `# Manus Discovery Pack: ${PROJECT_NAME}

**Product**: ${PROJECT_NAME}  
**Target Niche**: ${NICHE}  
**Pain Point**: ${PAIN_POINT}  
**Generated**: ${new Date().toISOString().split('T')[0]}  
**Source**: Manus.im Discovery Pack (Raw Output)  
**Status**: Raw output - requires ChatGPT refinement

---

${rawContent}

---

## Generation Metadata

**AI Tool**: Manus.im  
**Model**: ${result.metadata?.model || "manus-discovery-pack"}  
**Generated**: ${new Date().toISOString().split('T')[0]}  
**Tokens**: ${result.metadata?.tokensUsed || "N/A"}  
**Next Step**: ChatGPT Refinement (Step 2)
`;

    writeFileSync(manusOutputPath, manusOutput);
    console.log(`✅ Saved raw Manus output to: ${manusOutputPath}\n`);
    console.log("📋 Next Steps:");
    console.log("   1. ✅ Step 1 Complete: Raw Manus discovery pack generated");
    console.log("   2. ⏭️  Step 2: Run ChatGPT refinement");
    console.log("   3. ⏭️  Step 3: Run Claude red-team critique (optional)");
    console.log("   4. ⏭️  Step 4: Cursor agents create structured documents");
    console.log("\n🚀 To continue, run the orchestration script:");
    console.log(`   npx tsx scripts/orchestrate-manus-discovery.ts`);
    console.log(`   (Update PROJECT_SLUG to "${PROJECT_SLUG}" in the script)\n`);

  } catch (error) {
    console.error("❌ Error generating Manus discovery pack:", error);
    process.exit(1);
  }
}

startDiscovery().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});


