/**
 * Create Landing Page for Ketamine Meditation Journey Music Mobile App (Step 6 of Insight Validation Playbook)
 * 
 * Following Rule 200 (Insight Validation Playbook) Step 6:
 * @Landing-Builder → Landing Page
 * 
 * This script creates:
 * - docs/validation/LANDING-ketamine-meditation-journey-music-mobile-app.md
 */

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import { generateLandingPageCopy } from "../src/lib/ai-tools/manus";
import { generateMidjourneyPrompt } from "../src/lib/ai-tools/visual";
import { generateFounderIntro } from "../src/lib/ai-tools/elevenlabs";
import { reason } from "../src/lib/ai-tools/chatgpt";

const PROJECT_SLUG = "ketamine-meditation-journey-music-mobile-app";
const PROJECT_NAME = "Ketamine - Meditation Journey Music Mobile App";
const NICHE = "Individuals exploring ketamine-assisted therapy and meditation practices";

const VALIDATION_DIR = join(process.cwd(), "docs", "validation");
const PRODUCT_DIR = join(process.cwd(), "docs", "product");
const RESEARCH_DIR = join(process.cwd(), "docs", "research");
const DISCOVERY_DIR = join(process.cwd(), "docs", "discovery");

// Ensure validation directory exists
if (!existsSync(VALIDATION_DIR)) {
  require("fs").mkdirSync(VALIDATION_DIR, { recursive: true });
}

async function createKetamineLandingPage() {
  console.log("🎨 Creating Landing Page (Step 6)\n");
  console.log("Project: Ketamine - Meditation Journey Music Mobile App\n");
  console.log("Following Rule 200 (Insight Validation Playbook) Step 6\n");
  console.log("Agent: @Landing-Builder (AI-Enhanced)\n");
  console.log("Using ChatGPT to generate landing page content\n");

  // Step 1: Load input documents
  console.log("📥 Step 1: Loading input documents...\n");
  
  const validationPlanPath = join(VALIDATION_DIR, `VALIDATION-PLAN-${PROJECT_SLUG}.md`);
  const narrativePath = join(PRODUCT_DIR, `NARRATIVE-${PROJECT_SLUG}.md`);
  const personaPath = join(RESEARCH_DIR, `PERSONA-${PROJECT_SLUG}.md`);
  const competitorsPath = join(RESEARCH_DIR, `COMPETITORS-${PROJECT_SLUG}.md`);
  const manusPath = join(DISCOVERY_DIR, `MANUS-${PROJECT_SLUG}.md`);

  if (!existsSync(validationPlanPath)) {
    console.error(`❌ Validation plan not found: ${validationPlanPath}`);
    console.error("   Please run Step 4 (Demand-Validator) first.");
    process.exit(1);
  }

  const validationPlanContent = readFileSync(validationPlanPath, "utf-8");
  const narrativeContent = existsSync(narrativePath) ? readFileSync(narrativePath, "utf-8") : "Not available";
  const personaContent = existsSync(personaPath) ? readFileSync(personaPath, "utf-8") : "Not available";
  const competitorsContent = existsSync(competitorsPath) ? readFileSync(competitorsPath, "utf-8") : "Not available";
  const manusContent = existsSync(manusPath) ? readFileSync(manusPath, "utf-8") : "Not available";

  console.log(`✅ Loaded: ${validationPlanPath}`);
  if (existsSync(narrativePath)) console.log(`✅ Loaded: ${narrativePath}`);
  if (existsSync(personaPath)) console.log(`✅ Loaded: ${personaPath}`);
  if (existsSync(competitorsPath)) console.log(`✅ Loaded: ${competitorsPath}`);
  if (existsSync(manusPath)) console.log(`✅ Loaded: ${manusPath}`);
  console.log();

  // Step 2: Use ChatGPT to generate landing copy that references ALL discovery documents
  // This ensures we use exact persona language, pain points, and insights
  console.log("📝 Step 2: ChatGPT → Generating Landing Page Copy (with full discovery context)...\n");
  console.log("   Using ALL discovery documents to ensure copy references:");
  console.log("   - Real pain language from MANUS (e.g., 'burnt-out, under-compensated, and overwhelmed')");
  console.log("   - Specific quotes and 'I wish' statements");
  console.log("   - Identity-level motivations from PERSONA");
  console.log("   - JTBD from discovery documents");
  console.log("   - Differentiation opportunities");
  console.log("   - Pricing expectations\n");

  const landingCopyPrompt = `Create compelling, conversion-focused landing page copy for ${PROJECT_NAME} targeting ${NICHE}.

**CRITICAL REQUIREMENTS:**
1. You MUST use the EXACT persona language, pain points, quotes, and insights from the discovery documents below
2. Do NOT use generic language - use specific quotes, "I wish" statements, and identity-level motivations
3. Make it compelling and conversion-focused - speak directly to the persona's pain and identity
4. Reference specific communities, pricing, and differentiation from discovery documents
5. Use the exact pain language from MANUS (e.g., "burnt-out, under-compensated, and overwhelmed")
6. Reference specific JTBD from discovery (e.g., "Help me escape my mental ruts", "Help me feel less alone")
7. Use identity-level motivations from PERSONA (e.g., "optimization-obsessed", "biohacker mentality")

**Discovery Documents:**

**MANUS Discovery Pack:**
${manusContent !== "Not available" ? manusContent.substring(0, 8000) : "Not available"}${manusContent !== "Not available" && manusContent.length > 8000 ? "..." : ""}

**Persona Profile:**
${personaContent !== "Not available" ? personaContent.substring(0, 6000) : "Not available"}${personaContent !== "Not available" && personaContent.length > 6000 ? "..." : ""}

**Validation Plan (Extracted Elements):**
${validationPlanContent.substring(0, 4000)}${validationPlanContent.length > 4000 ? "..." : ""}

**Narrative:**
${narrativeContent !== "Not available" ? narrativeContent.substring(0, 4000) : "Not available"}${narrativeContent !== "Not available" && narrativeContent.length > 4000 ? "..." : ""}

**Competitors:**
${competitorsContent !== "Not available" ? competitorsContent.substring(0, 3000) : "Not available"}${competitorsContent !== "Not available" && competitorsContent.length > 3000 ? "..." : ""}

**Required Output Structure:**

# Landing Page Copy: ${PROJECT_NAME}

## Hero Section Variants (5)

### Variant 1: Direct Value
- **Headline**: [Use persona language - e.g., reference "optimization", "competitive edge", "biohacker" if appropriate]
- **Subheadline**: [Reference specific pain points from MANUS - e.g., "burnt-out, under-compensated, and overwhelmed"]
- **CTA**: [Action-oriented, using persona language]

### Variant 2: Problem-Solution
- **Headline**: [Use exact pain language from MANUS - e.g., "Burnt-out, Under-compensated, and Overwhelmed?"]
- **Subheadline**: [Reference specific solution from discovery docs]
- **CTA**: [Direct relief-focused action]

### Variant 3: Identity Connection
- **Headline**: [Use identity-level motivations from PERSONA - e.g., "For the Optimization-Obsessed CTO"]
- **Subheadline**: [Reference identity signals and cultural affiliations]
- **CTA**: [Identity-affirming action]

### Variant 4: Transformation
- **Headline**: [Use transformation narrative from discovery - e.g., "From Burnout to Breakthrough"]
- **Subheadline**: [Reference specific before/after states from discovery]
- **CTA**: [Transformation-focused action]

### Variant 5: Social Proof
- **Headline**: [Reference community signals - e.g., "Join CTOs in 7CTOs Community"]
- **Subheadline**: [Use trust signals from discovery]
- **CTA**: [Community-focused action]

## Offer Framing

### Value Stack
[Use specific features from discovery docs - e.g., "Adaptive music technology", "Integration tools for leadership insights"]

### Transformation Promise
[Use exact transformation language from discovery - reference specific outcomes like "escape mental ruts", "reduce anxiety and stress", "feel less alone"]

### Urgency/Scarcity
[Reference pricing expectations from discovery - e.g., "$199-$299/year vs $15,000 retreats"]

### Risk Reversal
[Use trust signals from discovery - e.g., "Professional and secure design", "Data privacy & security"]

### Social Proof
[Reference specific communities and sources from discovery - e.g., "Trusted by CTOs in 7CTOs community"]

## Transformation Narrative

### Before State
[Use EXACT pain language from MANUS - e.g., "Burnt-out, under-compensated, and overwhelmed. 'I just feel burnt-out, under-compensated, and overwhelmed, and my personal life has really been suffering.'"]

### Transformation Moment
[Reference specific JTBD from discovery - e.g., "Help me escape my mental ruts", "Reduce my anxiety and stress"]

### After State
[Use success criteria from discovery - e.g., "Tangible reduction in stress and anxiety", "Renewed sense of purpose"]

### Journey
[Reference specific differentiation from discovery - e.g., "Adaptive Music for the Executive Mind", "Integration as a Core Feature"]

## A/B Headline Variants

### Headline A: [Use persona language - e.g., "For CTOs Who Are Burnt-out, Under-compensated, and Overwhelmed"]
**Angle**: [Direct pain language from discovery]

### Headline B: [Use identity language - e.g., "The Biohacker's Next Frontier: Ketamine-Assisted Leadership"]
**Angle**: [Identity-level motivation from discovery]

### Headline C: [Use transformation language - e.g., "Escape Your Mental Ruts: From Burnout to Breakthrough"]
**Angle**: [JTBD language from discovery]

**CRITICAL REQUIREMENTS:**
1. Use EXACT quotes and pain language from MANUS document (e.g., "burnt-out, under-compensated, and overwhelmed")
2. Reference specific "I wish" statements from discovery
3. Use identity-level motivations from PERSONA (e.g., "optimization-obsessed", "biohacker mentality")
4. Reference specific JTBD from discovery (e.g., "Help me escape my mental ruts", "Help me feel less alone")
5. Use differentiation opportunities from discovery (e.g., "Adaptive Music for the Executive Mind")
6. Reference pricing expectations from discovery ($199-$299/year, $29-$49 journey packs)
7. Use community signals from discovery (e.g., "7CTOs community", "r/startups")
8. Make it compelling and conversion-focused - speak directly to the persona's pain and identity`;

  const chatgptCopyResult = await reason({
    prompt: landingCopyPrompt,
    systemPrompt: "You are an expert landing page copywriter specializing in conversion optimization. You MUST use the exact persona language, pain points, quotes, and insights from the discovery documents provided. Do NOT use generic language. Reference specific quotes, 'I wish' statements, and identity-level motivations. Make the copy compelling and conversion-focused. The copy must be specific, urgent, and speak directly to the persona's pain and identity.",
    model: "gpt-4o",
    maxTokens: 6000,
  });

  if (!chatgptCopyResult.success || !chatgptCopyResult.data) {
    console.error("❌ ChatGPT landing page copy generation failed:", chatgptCopyResult.error);
    process.exit(1);
  }

  const landingPageCopy = chatgptCopyResult.data.content;
  console.log(`✅ Landing page copy generated (via ChatGPT with full discovery context)\n`);


  // Step 3: Use ChatGPT to generate visual prompts and ElevenLabs script
  console.log("🎨 Step 3: ChatGPT → Generating Visual Prompts & ElevenLabs Script...\n");
  console.log("   Tasks:");
  console.log("   - Generate visual prompts for Midjourney (3-5 hero image prompts)");
  console.log("   - Generate Canva template recommendations");
  console.log("   - Generate ElevenLabs founder intro script");
  console.log("   - Create Lindy Waitlist Intake + Nurture automation spec\n");

  const chatgptPrompt = `Based on the landing page copy and context below, generate visual assets and audio content for ${PROJECT_NAME}.

**Landing Page Copy (from Manus):**
${landingPageCopy.substring(0, 4000)}${landingPageCopy.length > 4000 ? "..." : ""}

**Context:**
${narrativeContent !== "Not available" ? `Narrative: ${narrativeContent.substring(0, 2000)}` : ""}
${personaContent !== "Not available" ? `Persona: ${personaContent.substring(0, 2000)}` : ""}

**Required Output:**

## Visual Assets

### Midjourney Hero Image Prompts (3-5 prompts)

**Prompt 1**: [Detailed prompt with style, mood, composition, aspect ratio, brand elements]
**Prompt 2**: [Detailed prompt with style, mood, composition, aspect ratio, brand elements]
**Prompt 3**: [Detailed prompt with style, mood, composition, aspect ratio, brand elements]
[Add 2 more if needed]

### Canva Template Recommendations

**Template 1**: [Template name/ID]
- **Use Case**: [Where to use it]
- **Brand Colors**: [Color specifications]
- **Typography**: [Font guidelines]
- **Layout**: [Layout suggestions]

**Template 2**: [Template name/ID]
- **Use Case**: [Where to use it]
- **Brand Colors**: [Color specifications]
- **Typography**: [Font guidelines]
- **Layout**: [Layout suggestions]

## ElevenLabs Founder Intro Script

### Script
[Personal introduction script - 30-60 seconds, authentic, trustworthy tone]
[Include: Problem, solution, invitation]

### Tone Guidelines
[Authentic, trustworthy, personal]

### Key Points
1. [Problem statement]
2. [Solution introduction]
3. [Invitation to try]

## Lindy Waitlist Intake + Nurture Automation Spec

### Purpose
Automate waitlist signup processing, persona segmentation, email nurturing, and willingness-to-pay surveys.

### Trigger
- **New waitlist signup** (Tally/Typeform/Webflow/Carrd form)
  - Sources: Tally, Typeform, Webflow, Carrd form submissions
  - Trigger condition: New form submission with waitlist signup
  - Data fields: Name, email, source, initial responses, timestamp

### Actions

1. **Enrich with persona segment**
   - Analyze signup data to determine persona segment
   - Assign persona segment tag (Primary persona, Secondary persona, or Unsegmented)
   - Store segment in lead record

2. **Send founder intro email (with ElevenLabs audio link)**
   - Email subject: [Subject line]
   - Email body: [Email template with audio link]
   - Include: Founder intro audio, value proposition, next steps

3. **Schedule nurture sequence**
   - Day 3: [Email content]
   - Day 7: [Email content]
   - Day 14: [Email content]
   - Day 21: [Email content]

4. **Send willingness-to-pay survey (Day 10)**
   - Survey questions: [List of WTP questions]
   - Analyze responses and update lead record

### Logging
- **Append to Waitlist Intake Sheet**
  - Update Sheet with signup data, persona segment, email sent status, survey responses
  - Data Sync: Ensure Sheet stays in sync

### Tools Connected
- Form services (Tally, Typeform, Webflow, Carrd)
- Email service (SendGrid, Resend, etc.)
- Google Sheets API (for logging)
- ElevenLabs API (for audio link)

### Fallback Manual Workflow
[Step-by-step manual process if automation fails]

**Important**: All content must align with the persona language and emotional drivers from the input documents. Use the exact terminology and pain points identified in the persona and narrative documents.`;

  const chatgptResult = await reason({
    prompt: chatgptPrompt,
    systemPrompt: "You are an expert visual and audio content strategist. Generate specific, actionable visual prompts for Midjourney, Canva template recommendations, and authentic founder intro scripts that align with the landing page copy and persona language.",
    model: "gpt-4o",
    maxTokens: 4000,
  });

  if (!chatgptResult.success || !chatgptResult.data) {
    console.error("❌ ChatGPT visual/audio generation failed:", chatgptResult.error);
    process.exit(1);
  }

  const visualAudioContent = chatgptResult.data.content;
  console.log(`✅ Visual prompts and audio script generated\n`);

  // Step 4: Generate Midjourney prompts using Visual Asset Agent
  console.log("🖼️  Step 4: Visual Asset Agent → Generating Midjourney Prompts...\n");
  
  const midjourneyPrompts: string[] = [];
  // Extract prompts from ChatGPT output and format them using Visual Asset Agent
  const promptMatches = visualAudioContent.match(/Prompt \d+: (.+)/g);
  if (promptMatches) {
    for (const match of promptMatches.slice(0, 5)) {
      const promptText = match.replace(/Prompt \d+: /, "");
      const visualResult = generateMidjourneyPrompt({
        prompt: promptText,
        style: "modern, clean, professional, calming, transformative",
        aspectRatio: "16:9",
      });
      if (visualResult.success && visualResult.data) {
        midjourneyPrompts.push(visualResult.data.prompt);
      }
    }
  }

  // Step 5: Generate ElevenLabs founder intro script (and optionally audio)
  console.log("🎤 Step 5: ElevenLabs Voice Agent → Generating Founder Intro...\n");
  
  // Extract script from ChatGPT output
  const scriptMatch = visualAudioContent.match(/### Script\s+([\s\S]+?)(?=###|$)/);
  let founderIntroScript = scriptMatch ? scriptMatch[1].trim() : "";
  
  // If no script found, generate one with ChatGPT
  if (!founderIntroScript) {
    const scriptPrompt = `Generate a 30-60 second founder intro script for ${PROJECT_NAME} based on this context:

${narrativeContent !== "Not available" ? `Narrative: ${narrativeContent.substring(0, 2000)}` : ""}
${personaContent !== "Not available" ? `Persona: ${personaContent.substring(0, 2000)}` : ""}

The script should be:
- Authentic and trustworthy
- Personal introduction
- Include: Problem, solution, invitation
- 30-60 seconds in length (approximately 75-150 words)`;

    const scriptResult = await reason({
      prompt: scriptPrompt,
      systemPrompt: "You are a founder creating an authentic, personal introduction. Write a script that feels genuine and trustworthy.",
      model: "gpt-4o",
      maxTokens: 500,
    });

    if (scriptResult.success && scriptResult.data) {
      founderIntroScript = scriptResult.data.content;
    }
  }

  // Optionally generate audio (if ELEVENLABS_API_KEY is set)
  let elevenLabsAudioUrl = "";
  if (founderIntroScript && process.env.ELEVENLABS_API_KEY) {
    try {
      const audioResult = await generateFounderIntro(founderIntroScript);
      if (audioResult.success && audioResult.data) {
        elevenLabsAudioUrl = audioResult.data.audioUrl || "";
        console.log(`✅ Founder intro audio generated\n`);
      }
    } catch (error) {
      console.warn("⚠️  ElevenLabs audio generation skipped:", error);
    }
  } else {
    console.log("ℹ️  ElevenLabs audio generation skipped (no API key or script)\n");
  }

  // Step 6: Organize all outputs into document structure
  console.log("💾 Step 6: Organizing and saving Landing Page...\n");

  const landingPagePath = join(VALIDATION_DIR, `LANDING-${PROJECT_SLUG}.md`);
  
  const fullLandingPageDoc = `# Landing Page: ${PROJECT_NAME}

**Product**: ${PROJECT_NAME}  
**Target Niche**: ${NICHE}  
**Generated**: ${new Date().toISOString().split('T')[0]}  
**Source**: Landing-Builder Agent (AI-Enhanced)  
**Status**: Ready for validation tests

---

${landingPageCopy}

---

${visualAudioContent}

---

## Midjourney Prompts (Formatted)

${midjourneyPrompts.length > 0 ? midjourneyPrompts.map((p, i) => `**Prompt ${i + 1}**:\n\`\`\`\n${p}\n\`\`\``).join("\n\n") : "*Prompts will be extracted from visual content above*"}

---

## ElevenLabs Founder Intro

### Script
${founderIntroScript || "*Script will be extracted from visual/audio content above*"}

${elevenLabsAudioUrl ? `### Audio\n${elevenLabsAudioUrl}` : ""}

---

## Generation Metadata

**AI Tools**: 
- ChatGPT (GPT-4o) - Landing page copy (with full discovery context - MANUS, PERSONA, VALIDATION-PLAN, NARRATIVE, COMPETITORS)
- ChatGPT (GPT-4o) (visual prompts, Canva recommendations, ElevenLabs script, Lindy automation)
${elevenLabsAudioUrl ? "- ElevenLabs (founder intro audio)" : ""}
**Agent**: @Landing-Builder  
**Inputs**: 
- Validation Plan: ${validationPlanPath}
${existsSync(narrativePath) ? `- Narrative: ${narrativePath}` : ""}
${existsSync(personaPath) ? `- Persona: ${personaPath}` : ""}
${existsSync(competitorsPath) ? `- Competitors: ${competitorsPath}` : ""}
${existsSync(manusPath) ? `- Manus Discovery: ${manusPath}` : ""}
**Generated**: ${new Date().toISOString().split('T')[0]}  
**Tokens**: 
- ChatGPT (Copy): ${chatgptCopyResult.metadata?.tokensUsed || "N/A"}
- ChatGPT (Visual/Audio): ${chatgptResult.metadata?.tokensUsed || "N/A"}
**Note**: Landing page copy was generated using ChatGPT with full discovery context (MANUS, PERSONA, VALIDATION-PLAN, NARRATIVE, COMPETITORS) to ensure it uses exact persona language, pain points, quotes, and insights from discovery documents.
**Next Step**: Step 7 - @Creative-Batch-Operator → Creative Batch (visual assets)
`;

  writeFileSync(landingPagePath, fullLandingPageDoc);
  console.log(`✅ Saved: ${landingPagePath}\n`);

  // Summary
  console.log("✅ Landing Page Complete!\n");
  console.log("📁 File Created:");
  console.log(`   ${landingPagePath}\n`);
  console.log("🎯 Next Steps:");
  console.log("   Step 7: @Creative-Batch-Operator → Creative Batch (visual assets)");
  console.log("   Step 8: @Distribution-Operator → Distribution Strategy\n");
}

createKetamineLandingPage().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});

