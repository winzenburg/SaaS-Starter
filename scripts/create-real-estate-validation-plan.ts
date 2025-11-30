/**
 * Create Validation Plan for Real Estate Investor Flipper Platform
 * 
 * Following Rule 200 (Insight Validation Playbook) Step 4:
 * @Demand-Validator → Validation Plan
 * 
 * This script uses ChatGPT to create:
 * - docs/validation/VALIDATION-PLAN-real-estate-investor-flipper-platform.md
 */

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import { reason } from "../src/lib/ai-tools/chatgpt";

const PROJECT_SLUG = "real-estate-investor-flipper-platform";
const PROJECT_NAME = "Real Estate Investor & Flipper Platform";
const NICHE = "Real estate investors/flippers";

const DISCOVERY_DIR = join(process.cwd(), "docs", "discovery");
const VALIDATION_DIR = join(process.cwd(), "docs", "validation");

// Ensure validation directory exists
if (!existsSync(VALIDATION_DIR)) {
  require("fs").mkdirSync(VALIDATION_DIR, { recursive: true });
}

async function createValidationPlan() {
  console.log("🎯 Creating Validation Plan (Step 4)\n");
  console.log("Following Rule 200 (Insight Validation Playbook) Step 4\n");
  console.log("Agent: @Demand-Validator\n");
  console.log("Using ChatGPT Reasoning Agent to design validation tests\n");

  // Step 1: Load discovery documents
  console.log("📥 Step 1: Loading discovery documents...\n");
  
  const nicheIntelPath = join(DISCOVERY_DIR, `NICHE-INTEL-${PROJECT_SLUG}.md`);
  const painSignalsPath = join(DISCOVERY_DIR, `PAIN-SIGNALS-${PROJECT_SLUG}.md`);
  const jtbdPath = join(DISCOVERY_DIR, `JTBD-${PROJECT_SLUG}.md`);
  const opportunityPath = join(DISCOVERY_DIR, `OPPORTUNITY-${PROJECT_SLUG}.md`);
  const manusPath = join(DISCOVERY_DIR, `MANUS-${PROJECT_SLUG}.md`);
  const chatgptRefinementPath = join(DISCOVERY_DIR, `CHATGPT-REFINEMENT-${PROJECT_SLUG}.md`);

  const requiredDocs = [
    { path: nicheIntelPath, name: "NICHE-INTEL" },
    { path: painSignalsPath, name: "PAIN-SIGNALS" },
    { path: jtbdPath, name: "JTBD" },
    { path: opportunityPath, name: "OPPORTUNITY" },
  ];

  for (const doc of requiredDocs) {
    if (!existsSync(doc.path)) {
      console.error(`❌ ${doc.name} document not found: ${doc.path}`);
      process.exit(1);
    }
  }

  const nicheIntelContent = readFileSync(nicheIntelPath, "utf-8");
  const painSignalsContent = readFileSync(painSignalsPath, "utf-8");
  const jtbdContent = readFileSync(jtbdPath, "utf-8");
  const opportunityContent = readFileSync(opportunityPath, "utf-8");
  const manusContent = existsSync(manusPath) ? readFileSync(manusPath, "utf-8") : "Not available";
  const chatgptRefinementContent = existsSync(chatgptRefinementPath) 
    ? readFileSync(chatgptRefinementPath, "utf-8") 
    : "Not available";

  console.log(`✅ Loaded: ${nicheIntelPath}`);
  console.log(`✅ Loaded: ${painSignalsPath}`);
  console.log(`✅ Loaded: ${jtbdPath}`);
  console.log(`✅ Loaded: ${opportunityPath}`);
  if (existsSync(manusPath)) {
    console.log(`✅ Loaded: ${manusPath}`);
  }
  if (existsSync(chatgptRefinementPath)) {
    console.log(`✅ Loaded: ${chatgptRefinementPath}`);
  }
  console.log();

  // Step 2: Use ChatGPT to create validation plan
  console.log("🤖 Step 2: ChatGPT Reasoning Agent → Creating Validation Plan...\n");
  console.log("   Tasks:");
  console.log("   - Extract JTBD, persona language, frustrations, emotional drivers from discovery documents");
  console.log("   - Design 8-12 validation tests");
  console.log("   - Define test thresholds (success, kill, pivot, proceed)");
  console.log("   - Create kill/pivot/proceed rules");
  console.log("   - Create 7-14 day sprint plan");
  console.log("   - Include Lindy Validation Logger automation spec\n");

  const chatgptPrompt = `Create a complete validation plan for ${PROJECT_NAME} following the Demand-Validator agent requirements.

**Input Documents (Discovery Phase Outputs):**

**NICHE-INTEL:**
${nicheIntelContent.substring(0, 6000)}${nicheIntelContent.length > 6000 ? "..." : ""}

**PAIN-SIGNALS:**
${painSignalsContent.substring(0, 6000)}${painSignalsContent.length > 6000 ? "..." : ""}

**JTBD (Persona & Job-to-be-Done):**
${jtbdContent.substring(0, 6000)}${jtbdContent.length > 6000 ? "..." : ""}

**OPPORTUNITY:**
${opportunityContent.substring(0, 4000)}${opportunityContent.length > 4000 ? "..." : ""}

**Required Output Structure:**

# Validation Plan: ${PROJECT_NAME}

## Extracted Elements from Discovery Documents

### Job-to-be-Done
[Extract JTBD from JTBD document - what is the primary job the persona is trying to get done?]

### Persona Language
[Extract key terminology and language from JTBD and NICHE-INTEL documents - exact words and phrases they use, like "ROI-focused," "scaling operations," "professional systems," etc.]

### Frustrations
[Extract from PAIN-SIGNALS document - what pains them most? List by frequency and severity]

### Emotional Drivers
[Extract from JTBD document - identity-level motivations - how does persona want to feel? How do they want to be perceived?]

### Identity-Level Pain Points
[Extract from JTBD and PAIN-SIGNALS - pain points that connect to identity - not just functional pain, but identity-level pain like "appearing professional to lenders," "being seen as a scaling entrepreneur," etc.]

## Validation Tests (8-12 tests required)

For each test, provide:

### Test 1: [Test Name]
- **Purpose**: [What are we testing?]
- **Method**: [How to execute this test - step by step, specific to real estate flippers]
- **Metrics**: [What to measure - specific metrics]
- **Success Threshold**: [Specific metric for success - e.g., >10% conversion, >50 signups]
- **Kill Threshold**: [Specific metric for kill - e.g., <2% conversion, <10 signups]
- **Pivot Threshold**: [Specific metric for pivot - e.g., 2-5% conversion, 10-30 signups]
- **Proceed Threshold**: [Specific metric for proceed - e.g., >10% conversion, >50 signups]

**Required Test Types (must include all):**
1. Social Narrative Test - Test narrative resonance on BiggerPockets forums, Reddit r/realestateinvesting
2. Fake Door Test - Test demand without building (landing page with CTA)
3. Landing/Waitlist Test - Landing page with waitlist signup
4. DM Outreach Test - Direct message to target personas on BiggerPockets, LinkedIn, Reddit
5. Concierge MVP Test - Manual service delivery (deal analysis, renovation tracking)
6. Prepayment/Preorder Test - Ask for payment before building
7-12. Additional tests as needed (community engagement on BiggerPockets/REIA, content validation, feature prioritization, pricing validation, referral, partnership with hard money lenders, etc.)

**Important**: All tests should be specific to real estate flippers and use their language ("ROI-focused," "scaling operations," "professional systems," "contractor management," "budget tracking," etc.)

## Kill/Pivot/Proceed Rules

### Kill Rules (Stop immediately)
[List specific conditions that trigger kill decision - e.g., "Kill if 4+ tests fail kill thresholds", "Kill if <30% willing to pay $50-$99/month", etc.]

### Pivot Rules (Major changes needed)
[List specific conditions that trigger pivot decision - e.g., "Pivot if narrative doesn't resonate", "Pivot if wrong target persona", "Pivot if pricing sensitivity too high", etc.]

### Proceed Rules (Continue to next phase)
[List specific conditions that trigger proceed decision - e.g., "Proceed if 6+ tests pass proceed thresholds", "Proceed if >70% willing to pay $50-$99/month", etc.]

## 7-14 Day Sprint Plan

### Week 1: Quick Wins
- **Day 1-2**: [Test name] - [Brief description]
- **Day 3-4**: [Test name] - [Brief description]
- **Day 5-7**: [Test name] - [Brief description]

### Week 2: Deep Validation
- **Day 8-9**: [Test name] - [Brief description]
- **Day 10-12**: [Test name] - [Brief description]
- **Day 13-14**: [Test name] - [Brief description]

**Daily Check-ins**: Review test results, adjust thresholds if needed, make kill/pivot/proceed decisions

## Lindy Automation: Validation Logger

### Purpose
Automate validation metrics collection, threshold comparison, and daily reporting for validation sprints.

### Trigger
- **Sources**: New form response / DM tag / ad result update / waitlist signup / preorder
- **Condition**: New data point added to any validation test source
- **Data Fields**: Test type, metric value, timestamp, source, user segment

### Actions
1. **Compute rolling conversion + engagement rates** (7-day, 14-day, all-time)
   - Conversion rates: Landing page, waitlist, prepayment tests
   - Reply rates: DM outreach, email campaigns
   - Engagement rates: Social narrative tests, content tests
   - Click-through rates: Fake door tests, ad tests

2. **Compare to thresholds**
   - For each test, compare current metrics to defined thresholds
   - Flag tests that cross thresholds (success, kill, pivot, proceed)
   - Generate alerts for kill/pivot thresholds

3. **Post daily summary** to Slack/email
   - All test results (current metrics vs thresholds)
   - Threshold status (which tests passed/failed thresholds)
   - Kill/pivot/proceed recommendations
   - Key insights and trends
   - Next actions required

### Logging
- **Append to RESULTS-${PROJECT_SLUG}.md outline + Sheet**
  - RESULTS Document: Append daily summary to \`/docs/validation/RESULTS-${PROJECT_SLUG}.md\`
  - Validation Metrics Sheet: Update Sheet with raw data and calculated metrics
  - Data Sync: Ensure RESULTS doc and Sheet stay in sync

### Tools Connected
- Form services (Tally, Google Forms, Typeform, etc.)
- Social platform APIs (BiggerPockets, Reddit, LinkedIn, X) for engagement tracking
- Ad platform APIs (Meta, Google, LinkedIn Ads) for ad results
- Slack API (for daily summaries)
- Email service (SendGrid, Resend, etc.)
- Google Sheets API (for metrics logging)
- File system (for RESULTS document updates)

### Fallback Manual Workflow
[Step-by-step manual process if automation fails - how to manually collect metrics, compare thresholds, and create daily summaries]

## Daily Check-in Template

### Day [X] Results
- **Test**: [Test name]
- **Results**: [Metrics]
- **Decision**: [Kill/Pivot/Proceed]
- **Next Steps**: [Actions]

**Important Guidelines:**
- Use persona language in all test messaging ("ROI-focused," "scaling operations," "professional systems")
- Test emotional connection, not just functional needs (identity transformation: "solo operator" → "scaling entrepreneur")
- Set clear, specific thresholds (avoid ambiguity)
- Make decisions fast (don't wait for perfect data)
- Document everything (track all test results)
- Iterate on tests (improve based on learnings)
- Focus on willingness to pay (this is the ultimate validation metric)
- Community-first approach (engage authentically in BiggerPockets, Reddit, REIA chapters)

**All tests must be actionable and ready for immediate execution.**`;

  const chatgptResult = await reason({
    prompt: chatgptPrompt,
    systemPrompt: "You are an expert validation strategist specializing in real estate and SaaS validation. Create comprehensive, actionable validation plans with clear thresholds and executable tests. Always be specific and measurable. Use the persona language and terminology from the discovery documents.",
    model: "gpt-4o",
    maxTokens: 8000,
  });

  if (!chatgptResult.success || !chatgptResult.data) {
    console.error("❌ ChatGPT validation plan creation failed:", chatgptResult.error);
    process.exit(1);
  }

  const validationPlanContent = chatgptResult.data.content;
  console.log(`✅ Validation plan created\n`);

  // Step 3: Save validation plan
  console.log("💾 Step 3: Saving Validation Plan...\n");

  const validationPlanPath = join(VALIDATION_DIR, `VALIDATION-PLAN-${PROJECT_SLUG}.md`);
  
  const fullValidationPlan = `# Validation Plan: ${PROJECT_NAME}

**Product**: ${PROJECT_NAME}  
**Target Niche**: ${NICHE}  
**Generated**: ${new Date().toISOString().split('T')[0]}  
**Source**: Demand-Validator Agent (AI-Enhanced)  
**Status**: Ready for execution

---

${validationPlanContent}

---

## Generation Metadata

**AI Tool**: ChatGPT (GPT-4o)  
**Agent**: @Demand-Validator  
**Inputs**: 
- NICHE-INTEL: ${nicheIntelPath}
- PAIN-SIGNALS: ${painSignalsPath}
- JTBD: ${jtbdPath}
- OPPORTUNITY: ${opportunityPath}
${existsSync(manusPath) ? `- MANUS: ${manusPath}` : ""}
${existsSync(chatgptRefinementPath) ? `- CHATGPT-REFINEMENT: ${chatgptRefinementPath}` : ""}
**Generated**: ${new Date().toISOString().split('T')[0]}  
**Tokens**: ${chatgptResult.metadata?.tokensUsed || "N/A"}  
**Next Step**: Step 5 - @Red-Team-Strategist → Validation Red-Team (optional but recommended)
`;

  writeFileSync(validationPlanPath, fullValidationPlan);
  console.log(`✅ Saved: ${validationPlanPath}\n`);

  // Summary
  console.log("✅ Validation Plan Complete!\n");
  console.log("📁 File Created:");
  console.log(`   ${validationPlanPath}\n`);
  console.log("🎯 Next Steps:");
  console.log("   Step 5: @Red-Team-Strategist → Validation Red-Team (optional but recommended)");
  console.log("   Step 6: @Landing-Builder → Landing Page\n");
}

createValidationPlan().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});

