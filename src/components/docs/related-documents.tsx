/**
 * Related Documents Component
 * 
 * Shows related documents for the current document
 * 
 * NOTE: This is a server component (uses fs operations)
 */

import { readdirSync } from"fs";
import { join } from"path";
import Link from"next/link";
import { Card, CardContent, CardHeader, CardTitle } from"@/components/ui/card";
import { Badge } from"@/components/ui/badge";
import { FileText, ArrowRight } from"lucide-react";

interface RelatedDocument {
  name: string;
  path: string;
  type: string;
}

interface RelatedDocumentsProps {
  currentPath: string;
  projectSlug?: string;
}

function getDocumentType(filename: string): string {
  const typeMatch = filename.match(/^(NICHE-INTEL|PAIN-SIGNALS|JTBD|OPPORTUNITY|REDTEAM|CHATGPT-REFINEMENT|MANUS|WORKFLOW|VALIDATION-PLAN|LANDING|DISTRIBUTION|PRICING-TEST|CREATIVE-BATCH|RESULTS)/i);
  return typeMatch ? typeMatch[1] :"OTHER";
}

function getTypeLabel(type: string): string {
  const labels: Record<string, string> = {"NICHE-INTEL":"Niche Intelligence","PAIN-SIGNALS":"Pain Signals","JTBD":"Jobs-to-Be-Done","OPPORTUNITY":"Opportunity & Moat","REDTEAM":"Red-Team","CHATGPT-REFINEMENT":"ChatGPT Refinement","MANUS":"Manus Discovery","WORKFLOW":"Workflow","VALIDATION-PLAN":"Validation Plan","LANDING":"Landing Page","DISTRIBUTION":"Distribution","PRICING-TEST":"Pricing Test","CREATIVE-BATCH":"Creative Batch","RESULTS":"Results","OTHER":"Other",
  };
  return labels[type] || type;
}

function getTypeColor(type: string): string {
  const colors: Record<string, string> = {"NICHE-INTEL":"bg-cyan-500/20 text-cyan-400 border-cyan-500/50","PAIN-SIGNALS":"bg-red-500/20 text-red-400 border-red-500/50","JTBD":"bg-purple-500/20 text-purple-400 border-purple-500/50","OPPORTUNITY":"bg-green-500/20 text-green-400 border-green-500/50","REDTEAM":"bg-orange-500/20 text-orange-400 border-orange-500/50","CHATGPT-REFINEMENT":"bg-[var(--primary)]/20 text-[var(--primary)] border-[var(--primary)]/50","MANUS":"bg-indigo-500/20 text-indigo-400 border-indigo-500/50","WORKFLOW":"bg-gray-500/20 text-[hsl(var(--text-muted))] border-gray-500/50","VALIDATION-PLAN":"bg-[var(--primary)]/20 text-[var(--primary)] border-[var(--primary)]/50","LANDING":"bg-green-500/20 text-green-400 border-green-500/50","DISTRIBUTION":"bg-purple-500/20 text-purple-400 border-purple-500/50","PRICING-TEST":"bg-yellow-500/20 text-yellow-400 border-yellow-500/50","CREATIVE-BATCH":"bg-pink-500/20 text-pink-400 border-pink-500/50","RESULTS":"bg-cyan-500/20 text-cyan-400 border-cyan-500/50","OTHER":"bg-slate-500/20 text-slate-400 border-slate-500/50",
  };
  return colors[type] || colors.OTHER;
}

export function RelatedDocuments({ currentPath, projectSlug }: RelatedDocumentsProps) {
  // Determine if this is a discovery or validation doc
  const isDiscovery = currentPath.includes("discovery/");
  const isValidation = currentPath.includes("validation/");
  
  if (!isDiscovery && !isValidation) {
    return null;
  }

  const dir = isDiscovery 
    ? join(process.cwd(),"docs","discovery")
    : join(process.cwd(),"docs","validation");

  let relatedDocs: RelatedDocument[] = [];
  
  try {
    const files = readdirSync(dir)
      .filter((file) => {
        if (!file.endsWith(".md") || file ==="README.md") return false;
        // If we have a project slug, only show docs for that project
        if (projectSlug) {
          return file.includes(projectSlug);
        }
        return true;
      })
      .map((file) => {
        const type = getDocumentType(file);
        const name = file
          .replace(".md","")
          .replace(/^[^-]+-/,"")
          .replace(/-/g,"")
          .replace(/\b\w/g, (l) => l.toUpperCase());
        
        const category = isDiscovery ?"discovery" :"validation";
        const path = `${category}/${file.replace(".md","")}`;
        
        return {
          name,
          path,
          type,
        };
      })
      .filter((doc) => doc.path !== currentPath) // Exclude current document
      .slice(0, 6); // Limit to 6 related docs

    relatedDocs = files;
  } catch (error) {
    console.error("Error reading related documents:", error);
  }

  if (relatedDocs.length === 0) {
    return null;
  }

  return (
    <Card className="glass-card mt-8">
      <CardHeader>
        <CardTitle className="text-lg text-[hsl(var(--text-main))] flex items-center gap-2">
          <FileText className="w-5 h-5 text-[var(--primary)]" />
          Related Documents
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {relatedDocs.map((doc) => (
            <Link
              key={doc.path}
              href={`/docs/${doc.path}`}
              className="group flex items-center justify-between p-3 rounded-lg border hover:border-[hsl(var(--primary))] transition-all duration-300"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[hsl(var(--text-main))] group-hover:text-[var(--primary)] transition-colors truncate">
                  {doc.name}
                </p>
                <Badge className={`text-xs mt-1 ${getTypeColor(doc.type)}`}>
                  {getTypeLabel(doc.type)}
                </Badge>
              </div>
              <ArrowRight className="w-4 h-4 text-[hsl(var(--text-muted))] group-hover:text-[var(--primary)] transition-colors flex-shrink-0 ml-2" />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

