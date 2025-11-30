/**
 * Validation Documents Listing Page
 * 
 * Shows all validation documents organized by project
 */

import { readdirSync, statSync } from"fs";
import { join } from"path";
import { ValidationDocsList } from"@/components/docs/validation-docs-list";

export const dynamic ="force-dynamic";
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
  const base = filename.replace(".md","");
  
  const typeMatch = base.match(/^(VALIDATION-PLAN|LANDING|DISTRIBUTION|PRICING-TEST|CREATIVE-BATCH|RESULTS)/i);
  const type: string = typeMatch && typeMatch[1] ? typeMatch[1] : "OTHER";
  
  const projectMatch = base.match(/^[^-]+-(.+)$/);
  const project = projectMatch ? projectMatch[1] : undefined;
  
  const name = base
    .replace(/^(VALIDATION-PLAN|LANDING|DISTRIBUTION|PRICING-TEST|CREATIVE-BATCH|RESULTS)-/i,"")
    .replace(/-/g,"")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return { name, project, type };
}

// getTypeLabel and getTypeColor are not used - handled by ValidationDocsList component

export default function ValidationDocsPage() {
  const validationDir = join(process.cwd(),"docs","validation");
  
  let docs: ValidationDoc[] = [];
  try {
    const files = readdirSync(validationDir)
      .filter((file) => file.endsWith(".md") && file !=="README.md")
      .map((file) => {
        const fullPath = join(validationDir, file);
        const stats = statSync(fullPath);
        const parsed = parseValidationDoc(file);
        
        return {
          filename: file,
          name: parsed.name,
          project: parsed.project,
          type: parsed.type,
          path: `validation/${file.replace(".md","")}`,
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
    const key = doc.project ||"other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(doc);
    return acc;
  }, {} as Record<string, ValidationDoc[]>);

  const projects = Object.keys(docsByProject).sort();

  return (
    <div className="min-h-screen">
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

