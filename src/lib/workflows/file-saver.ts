/**
 * Utility functions to save workflow outputs as markdown files
 * 
 * Workflows need to save their outputs as files so the hub can discover them
 */

import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

export interface SaveDocumentOptions {
  projectSlug: string;
  documentType: string;
  content: string;
  phase: "discovery" | "validation" | "build" | "scale";
  frontmatter?: Record<string, string | number | boolean>;
}

/**
 * Save a workflow output document to disk
 */
export function saveWorkflowDocument(options: SaveDocumentOptions): string {
  const { projectSlug, documentType, content, phase, frontmatter } = options;

  // Determine the output directory based on phase
  let outputDir: string;
  switch (phase) {
    case "discovery":
      outputDir = join(process.cwd(), "docs", "discovery");
      break;
    case "validation":
      outputDir = join(process.cwd(), "docs", "validation");
      break;
    case "build":
      outputDir = join(process.cwd(), "docs", "product");
      break;
    case "scale":
      outputDir = join(process.cwd(), "docs", "product");
      break;
    default:
      outputDir = join(process.cwd(), "docs", "discovery");
  }

  // Ensure directory exists
  mkdirSync(outputDir, { recursive: true });

  // Generate filename: DOCUMENT-TYPE-project-slug.md
  const filename = `${documentType}-${projectSlug}.md`;
  const filePath = join(outputDir, filename);

  // Build frontmatter string if provided
  let frontmatterStr = "";
  if (frontmatter) {
    const frontmatterLines = Object.entries(frontmatter).map(([key, value]) => {
      if (typeof value === "string") {
        return `${key}: "${value}"`;
      }
      return `${key}: ${value}`;
    });
    frontmatterStr = `---\n${frontmatterLines.join("\n")}\n---\n\n`;
  }

  // Write file
  const fileContent = frontmatterStr + content;
  writeFileSync(filePath, fileContent, "utf-8");

  return filePath;
}

/**
 * Convert workflow output data to markdown format
 */
export function formatWorkflowOutput(
  stepName: string,
  output: unknown,
  metadata?: Record<string, unknown>
): string {
  let markdown = `# ${stepName}\n\n`;

  if (metadata) {
    markdown += `**Generated:** ${new Date().toISOString()}\n`;
    if (metadata.agent) {
      markdown += `**Agent:** ${metadata.agent}\n`;
    }
    if (metadata.tool) {
      markdown += `**Tool:** ${metadata.tool}\n`;
    }
    markdown += `\n---\n\n`;
  }

  if (typeof output === "string") {
    // If output is already markdown, use it directly
    if (output.includes("#") || output.includes("##")) {
      return output;
    }
    markdown += output;
  } else if (typeof output === "object" && output !== null) {
    const outputObj = output as Record<string, unknown>;
    
    // Handle Manus discovery pack structure
    if ("narrative" in outputObj && typeof outputObj.narrative === "string") {
      markdown += `## Narrative\n\n${outputObj.narrative}\n\n`;
    } else if ("narrative" in outputObj && typeof outputObj.narrative === "object") {
      markdown += `## Narrative\n\n${JSON.stringify(outputObj.narrative, null, 2)}\n\n`;
    }

    if ("persona" in outputObj) {
      markdown += `## Persona\n\n`;
      if (typeof outputObj.persona === "object" && outputObj.persona !== null) {
        const persona = outputObj.persona as Record<string, unknown>;
        if ("name" in persona) markdown += `**Name:** ${persona.name}\n\n`;
        if ("role" in persona) markdown += `**Role:** ${persona.role}\n\n`;
        if ("identity" in persona) markdown += `**Identity:** ${persona.identity}\n\n`;
        if ("painPoints" in persona && Array.isArray(persona.painPoints)) {
          markdown += `### Pain Points\n\n${persona.painPoints.map((p: unknown) => `- ${p}`).join("\n")}\n\n`;
        }
        if ("jtbd" in persona && Array.isArray(persona.jtbd)) {
          markdown += `### Jobs to be Done\n\n${persona.jtbd.map((j: unknown) => `- ${j}`).join("\n")}\n\n`;
        }
      } else {
        markdown += `${JSON.stringify(outputObj.persona, null, 2)}\n\n`;
      }
    }

    if ("competitors" in outputObj) {
      markdown += `## Competitor Analysis\n\n`;
      if (Array.isArray(outputObj.competitors)) {
        outputObj.competitors.forEach((comp: unknown, idx: number) => {
          markdown += `### Competitor ${idx + 1}\n\n${JSON.stringify(comp, null, 2)}\n\n`;
        });
      } else {
        markdown += `${JSON.stringify(outputObj.competitors, null, 2)}\n\n`;
      }
    }

    // Handle nested structure (when Manus returns all in one object)
    if ("data" in outputObj && typeof outputObj.data === "object") {
      const data = outputObj.data as Record<string, unknown>;
      if ("narrative" in data || "persona" in data || "competitors" in data) {
        // Recursively format nested data
        return formatWorkflowOutput(stepName, data, metadata);
      }
    }

    // Fallback: pretty-print JSON
    if (!markdown.includes("##")) {
      markdown += `## Output\n\n\`\`\`json\n${JSON.stringify(output, null, 2)}\n\`\`\`\n`;
    }
  } else {
    markdown += String(output);
  }

  return markdown;
}

