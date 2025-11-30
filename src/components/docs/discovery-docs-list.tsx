"use client";

/**
 * Discovery Documents List Component
 * 
 * Client component for displaying discovery documents with animations
 */

import Link from"next/link";
import { motion } from"framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from"@/components/ui/card";
import { Badge } from"@/components/ui/badge";
import { FileText, FolderKanban, ArrowLeft, ArrowRight } from"lucide-react";

interface DiscoveryDoc {
  filename: string;
  name: string;
  project?: string;
  type: string;
  path: string;
  modified: Date;
}

interface DiscoveryDocsListProps {
  docs: DiscoveryDoc[];
  docsByProject: Record<string, DiscoveryDoc[]>;
  projects: string[];
}

function getTypeLabel(type: string | undefined): string {
  const labels: Record<string, string> = {"NICHE-INTEL":"Niche Intelligence","PAIN-SIGNALS":"Pain Signals","JTBD":"Jobs-to-Be-Done","OPPORTUNITY":"Opportunity & Moat","REDTEAM":"Red-Team Critique","CHATGPT-REFINEMENT":"ChatGPT Refinement","MANUS":"Manus Discovery","WORKFLOW":"Workflow","OTHER":"Other",
  };
  return type ? (labels[type] || type) : "Other";
}

function getTypeColor(type: string | undefined): string {
  const colors: Record<string, string> = {"NICHE-INTEL":"bg-cyan-500/20 text-cyan-400 border-cyan-500/50","PAIN-SIGNALS":"bg-red-500/20 text-red-400 border-red-500/50","JTBD":"bg-purple-500/20 text-purple-400 border-purple-500/50","OPPORTUNITY":"bg-green-500/20 text-green-400 border-green-500/50","REDTEAM":"bg-orange-500/20 text-orange-400 border-orange-500/50","CHATGPT-REFINEMENT":"bg-[var(--primary)]/20 text-[var(--primary)] border-[var(--primary)]/50","MANUS":"bg-indigo-500/20 text-indigo-400 border-indigo-500/50","WORKFLOW":"bg-gray-500/20 text-[hsl(var(--text-muted))] border-gray-500/50","OTHER":"bg-slate-500/20 text-slate-400 border-slate-500/50",
  };
  if (!type) return colors.OTHER;
  const color = colors[type];
  return color ?? colors.OTHER;
}

export function DiscoveryDocsList({ docs, docsByProject, projects }: DiscoveryDocsListProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <Link
            href="/hub"
            className="text-sm text-[var(--primary)] hover:text-[var(--primary)]/80 inline-flex items-center gap-1.5 transition-colors duration-300"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Hub
          </Link>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold font-heading text-[var(--primary)] mb-2">
          Discovery Documents
        </h1>
        <p className="text-lg text-[hsl(var(--text-muted))] font-medium">
          Research and analysis documents for product discovery
        </p>
      </motion.div>

      {docs.length === 0 ? (
        <Card className="glass-card text-center py-12">
          <CardHeader>
            <FileText className="w-16 h-16 text-[hsl(var(--text-muted))] mx-auto mb-4" />
            <CardTitle className="text-2xl mb-2 text-[hsl(var(--text-main))]">No discovery documents yet</CardTitle>
            <CardDescription className="text-base text-[hsl(var(--text-muted))]">
              Discovery documents will appear here once created
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="space-y-8">
          {projects.map((projectKey, projectIndex) => {
            const projectDocs = docsByProject[projectKey];
            if (!projectDocs || projectDocs.length === 0) return null;
            
            const projectName = projectKey ==="other" 
              ?"Other Documents" 
              : projectKey.replace(/-/g,"").replace(/\b\w/g, (l) => l.toUpperCase());

            return (
              <motion.div
                key={projectKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: projectIndex * 0.1 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between border-b  pb-3">
                  <div className="flex items-center gap-3">
                    <FolderKanban className="w-5 h-5 text-[var(--primary)]" />
                    <h2 className="text-2xl font-bold text-[hsl(var(--text-main))]">{projectName}</h2>
                    <Badge variant="outline" className="text-[hsl(var(--text-muted))]">
                      {projectDocs.length} document{projectDocs.length !== 1 ?"s" :""}
                    </Badge>
                  </div>
                  {projectKey !=="other" && (
                    <Link
                      href={`/hub?project=${projectKey}`}
                      className="text-sm text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors inline-flex items-center gap-1"
                    >
                      View Project
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projectDocs.map((doc, docIndex) => (
                    <motion.div
                      key={doc.filename}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: (projectIndex * 0.1) + (docIndex * 0.05) }}
                    >
                      <Link href={`/docs/${doc.path}`}>
                        <Card className="glass-card hover:shadow-xl transition-all duration-300 h-full cursor-pointer group">
                          <CardHeader>
                            <div className="flex items-start justify-between mb-2">
                              <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/20 border border-[var(--primary)]/50 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--primary)]/30 transition-colors">
                                <FileText className="w-5 h-5 text-[var(--primary)]" />
                              </div>
                              <Badge className={`text-xs ${getTypeColor(doc.type)}`}>
                                {getTypeLabel(doc.type)}
                              </Badge>
                            </div>
                            <CardTitle className="text-lg text-[hsl(var(--text-main))] group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                              {doc.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-xs text-[hsl(var(--text-muted))]">
                              Updated: {new Date(doc.modified).toLocaleDateString()}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </>
  );
}

