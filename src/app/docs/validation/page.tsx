/**
 * Validation Documents Listing Page
 * 
 * Shows all validation documents organized by project
 */

import { readdirSync, statSync } from "fs";
import { join } from "path";
import { ValidationDocsList } from "@/components/docs/validation-docs-list";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface ValidationDoc {
  filename: string;
  name: string;
  project?: string;
  type: string;
  path: string;
  modified: Date;
}

function parseValidationDoc(filename: string): { name: string; project?: string; type: string } {
  const base = filename.replace(".md", "");
  
  const typeMatch = base.match(/^(VALIDATION-PLAN|LANDING|DISTRIBUTION|PRICING-TEST|CREATIVE-BATCH|RESULTS)/i);
  const type = typeMatch ? typeMatch[1] : "OTHER";
  
  const projectMatch = base.match(/^[^-]+-(.+)$/);
  const project = projectMatch ? projectMatch[1] : undefined;
  
  const name = base
    .replace(/^(VALIDATION-PLAN|LANDING|DISTRIBUTION|PRICING-TEST|CREATIVE-BATCH|RESULTS)-/i, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return { name, project, type };
}

function getTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    "VALIDATION-PLAN": "Validation Plan",
    "LANDING": "Landing Page",
    "DISTRIBUTION": "Distribution",
    "PRICING-TEST": "Pricing Test",
    "CREATIVE-BATCH": "Creative Batch",
    "RESULTS": "Results",
    "OTHER": "Other",
  };
  return labels[type] || type;
}

function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    "VALIDATION-PLAN": "bg-blue-500/20 text-blue-400 border-blue-500/50",
    "LANDING": "bg-green-500/20 text-green-400 border-green-500/50",
    "DISTRIBUTION": "bg-purple-500/20 text-purple-400 border-purple-500/50",
    "PRICING-TEST": "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
    "CREATIVE-BATCH": "bg-pink-500/20 text-pink-400 border-pink-500/50",
    "RESULTS": "bg-cyan-500/20 text-cyan-400 border-cyan-500/50",
    "OTHER": "bg-slate-500/20 text-slate-400 border-slate-500/50",
  };
  return colors[type] || colors.OTHER;
}

export default function ValidationDocsPage() {
  const validationDir = join(process.cwd(), "docs", "validation");
  
  let docs: ValidationDoc[] = [];
  try {
    const files = readdirSync(validationDir)
      .filter((file) => file.endsWith(".md") && file !== "README.md")
      .map((file) => {
        const fullPath = join(validationDir, file);
        const stats = statSync(fullPath);
        const parsed = parseValidationDoc(file);
        
        return {
          filename: file,
          name: parsed.name,
          project: parsed.project,
          type: parsed.type,
          path: `validation/${file.replace(".md", "")}`,
          modified: stats.mtime,
        };
      })
      .sort((a, b) => b.modified.getTime() - a.modified.getTime());

    docs = files;
  } catch (error) {
    console.error("Error reading validation directory:", error);
  }

  // Group by project
  const docsByProject = docs.reduce((acc, doc) => {
    const key = doc.project || "other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(doc);
    return acc;
  }, {} as Record<string, ValidationDoc[]>);

  const projects = Object.keys(docsByProject).sort();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ValidationDocsList
          docs={docs}
          docsByProject={docsByProject}
          projects={projects}
        />
      </div>
    </div>
  );
}

