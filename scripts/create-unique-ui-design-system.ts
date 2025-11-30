#!/usr/bin/env tsx
/**
 * Create Unique UI Design System for SaaS Starter
 * 
 * Uses Google Gemini to analyze Red Dot Award winners and current design,
 * then creates a unique design system specification.
 * 
 * Usage:
 *   npm run create-unique-ui-design-system
 */

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import { generateMultimodal } from "../src/lib/ai-tools/google-ai-studio";

const OUTPUT_DIR = join(process.cwd(), "docs/ux");
const DESIGN_SYSTEM_OUTPUT = join(OUTPUT_DIR, "DESIGN-SYSTEM-saas-starter.md");

async function createUniqueDesignSystem() {
  console.log("🎨 Creating Unique UI Design System for SaaS Starter\n");

  try {
    // Read current design system
    console.log("📖 Reading current design system...\n");
    const currentGlobalsCss = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf-8");
    console.log("✅ Read globals.css\n");
    
    // Check for Red Dot winners data (if fetched)
    const redDotWinnersPath = join(process.cwd(), "docs/ux/red-dot-winners");
    let redDotContext = "";
    
    if (existsSync(redDotWinnersPath)) {
      // Try to load Red Dot winners JSON if available
      try {
        const files = require("fs").readdirSync(redDotWinnersPath);
        const jsonFile = files.find((f: string) => f.endsWith(".json"));
        if (jsonFile) {
          const redDotData = JSON.parse(
            readFileSync(join(redDotWinnersPath, jsonFile), "utf-8")
          );
          redDotContext = `\n\nRed Dot Award Winners Context:\n${JSON.stringify(redDotData.winners.slice(0, 5), null, 2)}`;
        }
      } catch (e) {
        console.warn("Could not load Red Dot winners, continuing without them...");
      }
    }

    console.log("📊 Analyzing current design with Google Gemini...\n");
    console.log("⏳ This may take 30-60 seconds...\n");

    // Create a concise prompt
    const prompt = `Create a unique, contemporary design system specification for SaaS Starter that stands out from generic Shadcn/UI implementations.

Current design uses dark mode with glassmorphism and generic blue accents. Create a distinctive new design system.

Requirements:
1. Unique color palette (not generic blue) - dark mode optimized
2. Contemporary typography approach  
3. Enhanced spacing (maintain 4px baseline)
4. Component specs for buttons, cards, inputs
5. WCAG 2.2 AA accessibility (document contrast ratios)
6. Tailwind CSS v4 implementation guide

Output a comprehensive Markdown document with:

## Color Palette
- CSS variables in HSL format
- Background, foreground, primary, secondary colors
- Contrast ratios documented

## Typography
- Font families, sizes, weights
- Line heights, spacing

## Spacing System
- 4px baseline scale

## Component Specifications
- Buttons, cards, inputs with states
- Accessibility requirements

## Implementation Guide
- Exact CSS variable updates for globals.css
- Component customization instructions

Current CSS:
\`\`\`css
${currentGlobalsCss.substring(0, 1500)}
\`\`\`
${redDotContext ? `\n\nRed Dot Award Inspiration:\n${redDotContext.substring(0, 800)}` : ""}

Make it unique, contemporary, and award-winning quality while maintaining all accessibility standards.`;

    console.log("🔄 Calling Google Gemini API...\n");
    const analysis = await generateMultimodal({
      prompt,
      model: "gemini-2.5-flash", // Using latest available model
    });

    console.log("✅ Received response from Gemini\n");

    if (!analysis.success || !analysis.data) {
      console.error("❌ Analysis failed:", analysis.error);
      console.error("Full analysis object:", JSON.stringify(analysis, null, 2));
      throw new Error(`Failed to generate design system: ${analysis.error || "Unknown error"}`);
    }

    const designSystemSpec = analysis.data.content || analysis.data.visualDescription || "";
    
    if (!designSystemSpec || designSystemSpec.trim().length === 0) {
      console.error("❌ Empty response from Gemini");
      console.error("Analysis data:", JSON.stringify(analysis.data, null, 2));
      throw new Error("Gemini returned empty content");
    }
    
    console.log(`📝 Generated design system (${designSystemSpec.length} characters)\n`);

    // Create output directory if it doesn't exist
    if (!existsSync(OUTPUT_DIR)) {
      require("fs").mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Save design system specification
    writeFileSync(DESIGN_SYSTEM_OUTPUT, designSystemSpec, "utf-8");

    console.log(`✅ Design system specification created!`);
    console.log(`📄 Saved to: ${DESIGN_SYSTEM_OUTPUT}\n`);

    console.log("Next steps:");
    console.log("1. Review the design system specification");
    console.log("2. Update src/app/globals.css with new design tokens");
    console.log("3. Update components to use new design system");
    console.log("4. Test accessibility compliance");
    console.log("5. Verify all UX principles are maintained\n");

  } catch (error) {
    console.error("❌ Error creating design system:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
      console.error("Stack:", error.stack);
    }
    process.exit(1);
  }
}

// Run the function
createUniqueDesignSystem().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});

export { createUniqueDesignSystem };
