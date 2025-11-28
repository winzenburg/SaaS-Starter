/**
 * Discovery Documents Listing Page
 * 
 * Shows all discovery documents organized by project
 */

import { readdirSync, statSync } from "fs";
import { join } from "path";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Search, FolderKanban } from "lucide-react";
import { DiscoveryDocsList } from "@/components/docs/discovery-docs-list";

export const dynamic = "force-dynamic";
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
  const base = filename.replace(".md", "");
  
  // Extract document type
  const typeMatch = base.match(/^(NICHE-INTEL|PAIN-SIGNALS|JTBD|OPPORTUNITY|REDTEAM|CHATGPT-REFINEMENT|MANUS|WORKFLOW)/i);
  const type = typeMatch ? typeMatch[1] : "OTHER";
  
  // Extract project slug (everything after the type prefix)
  const projectMatch = base.match(/^[^-]+-(.+)$/);
  const project = projectMatch ? projectMatch[1] : undefined;
  
  // Generate display name
  const name = base
    .replace(/^(NICHE-INTEL|PAIN-SIGNALS|JTBD|OPPORTUNITY|REDTEAM|CHATGPT-REFINEMENT|MANUS|WORKFLOW)-/i, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return { name, project, type };
}

function getTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    "NICHE-INTEL": "Niche Intelligence",
    "PAIN-SIGNALS": "Pain Signals",
    "JTBD": "Jobs-to-Be-Done",
    "OPPORTUNITY": "Opportunity & Moat",
    "REDTEAM": "Red-Team Critique",
    "CHATGPT-REFINEMENT": "ChatGPT Refinement",
    "MANUS": "Manus Discovery",
    "WORKFLOW": "Workflow",
    "OTHER": "Other",
  };
  return labels[type] || type;
}

function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    "NICHE-INTEL": "bg-cyan-500/20 text-cyan-400 border-cyan-500/50",
    "PAIN-SIGNALS": "bg-red-500/20 text-red-400 border-red-500/50",
    "JTBD": "bg-purple-500/20 text-purple-400 border-purple-500/50",
    "OPPORTUNITY": "bg-green-500/20 text-green-400 border-green-500/50",
    "REDTEAM": "bg-orange-500/20 text-orange-400 border-orange-500/50",
    "CHATGPT-REFINEMENT": "bg-blue-500/20 text-blue-400 border-blue-500/50",
    "MANUS": "bg-indigo-500/20 text-indigo-400 border-indigo-500/50",
    "WORKFLOW": "bg-gray-500/20 text-gray-400 border-gray-500/50",
    "OTHER": "bg-slate-500/20 text-slate-400 border-slate-500/50",
  };
  return colors[type] || colors.OTHER;
}

export default function DiscoveryDocsPage() {
  const discoveryDir = join(process.cwd(), "docs", "discovery");
  
  let docs: DiscoveryDoc[] = [];
  try {
    const files = readdirSync(discoveryDir)
      .filter((file) => file.endsWith(".md") && file !== "README.md")
      .map((file) => {
        const fullPath = join(discoveryDir, file);
        const stats = statSync(fullPath);
        const parsed = parseDiscoveryDoc(file);
        
        return {
          filename: file,
          name: parsed.name,
          project: parsed.project,
          type: parsed.type,
          path: `discovery/${file.replace(".md", "")}`,
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
    const key = doc.project || "other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(doc);
    return acc;
  }, {} as Record<string, DiscoveryDoc[]>);

  const projects = Object.keys(docsByProject).sort();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
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

