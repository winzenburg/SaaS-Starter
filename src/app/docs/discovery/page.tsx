/**
 * Discovery Documents Listing Page
 * 
 * Shows all discovery documents organized by project
 */

import { readdirSync, statSync } from"fs";
import { join } from"path";
// Using DiscoveryDocsList client component instead of direct imports
import { DiscoveryDocsList } from"@/components/docs/discovery-docs-list";

export const dynamic ="force-dynamic";
export const revalidate = 0;

interface DiscoveryDoc {
  filename: string;
  name: string;
  project?: string;
  type: string;
  path: string;
  modified: Date;
}

function parseDiscoveryDoc(filename: string): { name: string; project?: string; type: string } {
  // Remove .md extension
  const base = filename.replace(".md","");
  
  // Extract document type
  const typeMatch = base.match(/^(NICHE-INTEL|PAIN-SIGNALS|JTBD|OPPORTUNITY|REDTEAM|CHATGPT-REFINEMENT|MANUS|WORKFLOW)/i);
  const type: string = typeMatch && typeMatch[1] ? typeMatch[1] : "OTHER";
  
  // Extract project slug (everything after the type prefix)
  const projectMatch = base.match(/^[^-]+-(.+)$/);
  const project = projectMatch ? projectMatch[1] : undefined;
  
  // Generate display name
  const name = base
    .replace(/^(NICHE-INTEL|PAIN-SIGNALS|JTBD|OPPORTUNITY|REDTEAM|CHATGPT-REFINEMENT|MANUS|WORKFLOW)-/i,"")
    .replace(/-/g,"")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return { name, project, type };
}

// getTypeLabel and getTypeColor are not used - handled by DiscoveryDocsList component

export default function DiscoveryDocsPage() {
  const discoveryDir = join(process.cwd(),"docs","discovery");
  
  let docs: DiscoveryDoc[] = [];
  try {
    const files = readdirSync(discoveryDir)
      .filter((file) => file.endsWith(".md") && file !=="README.md")
      .map((file) => {
        const fullPath = join(discoveryDir, file);
        const stats = statSync(fullPath);
        const parsed = parseDiscoveryDoc(file);
        
        return {
          filename: file,
          name: parsed.name,
          project: parsed.project,
          type: parsed.type,
          path: `discovery/${file.replace(".md","")}`,
          modified: stats.mtime,
        };
      })
      .sort((a, b) => b.modified.getTime() - a.modified.getTime());

    docs = files;
  } catch (error) {
    console.error("Error reading discovery directory:", error);
  }

  // Group by project
  const docsByProject = docs.reduce((acc, doc) => {
    const key = doc.project ||"other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(doc);
    return acc;
  }, {} as Record<string, DiscoveryDoc[]>);

  const projects = Object.keys(docsByProject).sort();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DiscoveryDocsList
          docs={docs}
          docsByProject={docsByProject}
          projects={projects}
        />
      </div>
    </div>
  );
}

