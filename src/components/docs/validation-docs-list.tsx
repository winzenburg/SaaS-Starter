"use client";

/**
 * Validation Documents List Component
 * 
 * Client component for displaying validation documents with animations
 */

import Link from"next/link";
import { motion } from"framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from"@/components/ui/card";
import { Badge } from"@/components/ui/badge";
import { FileText, FolderKanban, ArrowLeft, ArrowRight } from"lucide-react";

interface ValidationDoc {
  filename: string;
  name: string;
  project?: string;
  type: string;
  path: string;
  modified: Date;
}

interface ValidationDocsListProps {
  docs: ValidationDoc[];
  docsByProject: Record<string, ValidationDoc[]>;
  projects: string[];
}

function getTypeLabel(type: string | undefined): string {
  const labels: Record<string, string> = {"VALIDATION-PLAN":"Validation Plan","LANDING":"Landing Page","DISTRIBUTION":"Distribution","PRICING-TEST":"Pricing Test","CREATIVE-BATCH":"Creative Batch","RESULTS":"Results","OTHER":"Other",
  };
  return type ? (labels[type] || type) : "Other";
}

function getTypeColor(type: string | undefined): string {
  const colors: Record<string, string> = {"VALIDATION-PLAN":"bg-[var(--primary)]/20 text-[var(--primary)] border-[var(--primary)]/50","LANDING":"bg-green-500/20 text-green-400 border-green-500/50","DISTRIBUTION":"bg-purple-500/20 text-purple-400 border-purple-500/50","PRICING-TEST":"bg-yellow-500/20 text-yellow-400 border-yellow-500/50","CREATIVE-BATCH":"bg-pink-500/20 text-pink-400 border-pink-500/50","RESULTS":"bg-cyan-500/20 text-cyan-400 border-cyan-500/50","OTHER":"bg-slate-500/20 text-slate-400 border-slate-500/50",
  };
  if (!type) return colors.OTHER;
  const color = colors[type];
  return color ?? colors.OTHER;
}

export function ValidationDocsList({ docs, docsByProject, projects }: ValidationDocsListProps) {
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
          Validation Documents
        </h1>
        <p className="text-lg text-[hsl(var(--text-muted))] font-medium">
          Validation plans, landing pages, and test results
        </p>
      </motion.div>

      {docs.length === 0 ? (
        <Card className="glass-card text-center py-12">
          <CardHeader>
            <FileText className="w-16 h-16 text-[hsl(var(--text-muted))] mx-auto mb-4" />
            <CardTitle className="text-2xl mb-2 text-[hsl(var(--text-main))]">No validation documents yet</CardTitle>
            <CardDescription className="text-base text-[hsl(var(--text-muted))]">
              Validation documents will appear here once created
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
                              <div className="w-10 h-10 rounded-lg bg-green-500/20 border border-green-500/50 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/30 transition-colors">
                                <FileText className="w-5 h-5 text-green-400" />
                              </div>
                              <Badge className={`text-xs ${getTypeColor(doc.type)}`}>
                                {getTypeLabel(doc.type)}
                              </Badge>
                            </div>
                            <CardTitle className="text-lg text-[hsl(var(--text-main))] group-hover:text-green-400 transition-colors line-clamp-2">
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

