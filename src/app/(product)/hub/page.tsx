"use client";

import { useEffect, useState } from"react";
import Link from"next/link";
import { motion } from"framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from"@/components/ui/card";
import { Badge } from"@/components/ui/badge";
import { Button } from"@/components/ui/button";
import { Workflow, Plus } from"lucide-react";
import {
  getStatusBadgeVariant,
  getVerdictBadgeVariant,
  getScoreTextColor,
  getPriorityLabel,
  formatVerdict,
} from"@/lib/utils/hub";

interface ProjectDocument {
  name: string;
  type:"discovery" |"validation" |"insight" |"portfolio" |"moat" |"retention" |"prd" |"other";
  path: string;
  size: number;
  modified: string;
  phase?:"discovery" |"validation" |"build" |"scale";
}

interface Project {
  name: string;
  slug: string;
  description: string;
  status: string;
  portfolioScore?: number;
  verdict?: string; // PROCEED, PIVOT, or KILL
  mrr?: number;
  createdAt: string;
  updatedAt: string;
  template: string;
  gitRepo?: string;
  documents?: ProjectDocument[];
  workflowCounts?: {
    total: number;
    byPhase: Record<string, number>;
    active: number;
  };
}

interface PortfolioStats {
  total: number;
  byStatus: Record<string, number>;
  totalMRR: number;
  avgScore: number;
}

// Utility functions moved to @/lib/utils/hub.ts

function calculateStats(projects: Project[]): PortfolioStats {
  const byStatus: Record<string, number> = {};
  let totalMRR = 0;
  let totalScore = 0;
  let scoredCount = 0;

  projects.forEach((project) => {
    const status = project.status ||"unknown";
    byStatus[status] = (byStatus[status] || 0) + 1;
    
    if (project.mrr) {
      totalMRR += project.mrr;
    }
    
    if (project.portfolioScore) {
      totalScore += project.portfolioScore;
      scoredCount++;
    }
  });

  return {
    total: projects.length,
    byStatus,
    totalMRR,
    avgScore: scoredCount > 0 ? totalScore / scoredCount : 0,
  };
}

type FilterType = "all" | "top-priority" | "proceed" | "pivot";

export default function HubPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/hub/projects");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data.projects || []);
        // If there's a message, it means projects are local-only
        if (data.message && data.projects.length === 0) {
          setError(data.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message :"Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const stats = calculateStats(projects);

  // Filter projects based on selected filter
  const filteredProjects = projects.filter((project) => {
    switch (filter) {
      case "top-priority":
        return (project.portfolioScore || 0) >= 30;
      case "proceed":
        return project.verdict?.toUpperCase().includes("PROCEED") ?? false;
      case "pivot":
        return project.verdict?.toUpperCase().includes("PIVOT") ?? false;
      case "all":
      default:
        return true;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[var(--primary)] mx-auto"></div>
          <p className="mt-4 text-lg font-semibold text-foreground">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error && projects.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="text-center bg-card border border-border rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl mb-4 text-foreground">
                Hub Dashboard
              </CardTitle>
              <div className="bg-muted/50 border border-[var(--primary)]/30 rounded-lg p-6 mb-6">
                <p className="text-[var(--primary)] mb-2 font-bold text-lg">
                  <strong>Note:</strong> Projects registry is local-only
                </p>
                <p className="text-[var(--primary)]/80 text-base font-medium">
                  {error}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground mb-6 font-semibold">
                To view your projects, run locally:
              </p>
              <code className="block bg-muted/50 rounded-lg p-4 text-base max-w-md mx-auto mb-6 font-mono text-foreground">
                npm run manage-projects list
              </code>
              <p className="text-base text-muted-foreground font-medium">
                The dashboard will show projects when running locally, or when projects are stored in a database.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-light text-foreground mb-2">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Welcome back. System efficiency is at 94%.
        </p>
      </div>
        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="group bg-card border border-border rounded-lg rounded-2xl hover:shadow-xl p-6 transition-all duration-300 hover:-translate-y-1 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Total Projects</div>
            <div className="text-4xl font-bold text-foreground group-hover:text-[var(--primary)] transition-colors duration-300">
              {stats.total}
            </div>
          </div>
          <div className="group bg-card border border-border rounded-lg rounded-2xl hover:shadow-xl p-6 transition-all duration-300 hover:-translate-y-1 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Total MRR</div>
            <div className="text-4xl font-bold text-green-400 group-hover:text-green-300 transition-colors duration-300">
              ${stats.totalMRR.toLocaleString()}
            </div>
          </div>
          <div className="group bg-card border border-border rounded-lg rounded-2xl hover:shadow-xl p-6 transition-all duration-300 hover:-translate-y-1 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Avg Portfolio Score</div>
            <div className="text-4xl font-bold text-foreground group-hover:text-purple-400 transition-colors duration-300">
              {stats.avgScore > 0 ? stats.avgScore.toFixed(1) :"—"}
            </div>
          </div>
          <div className="group bg-card border border-border rounded-lg rounded-2xl hover:shadow-xl p-6 transition-all duration-300 hover:-translate-y-1 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">In Validation</div>
            <div className="text-4xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300">
              {stats.byStatus.validation || 0}
            </div>
          </div>
        </div>

        {/* Status Breakdown */}
        {Object.keys(stats.byStatus).length > 0 && (
          <div className="bg-card border border-border rounded-lg rounded-2xl p-6 mb-8 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <h2 className="text-xl font-bold text-foreground mb-4">
              Portfolio by Status
            </h2>
            <div className="flex flex-wrap gap-3">
              {Object.entries(stats.byStatus).map(([status, count], index) => (
                <Badge
                  key={status}
                  variant={getStatusBadgeVariant(status)}
                  className="px-4 py-2.5 text-sm"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <span className="font-bold capitalize">{status}</span>
                  <span className="ml-2 font-bold">{count}</span>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Projects List */}
        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="text-center py-12 border-dashed bg-card border border-border rounded-lg">
              <CardHeader>
                <div className="w-16 h-16 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border">
                  <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <CardTitle className="text-2xl mb-3 text-foreground">No projects yet</CardTitle>
                <CardDescription className="text-lg mb-6 text-muted-foreground">
                  Create your first project using the CLI:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <code className="block bg-muted/50 rounded-xl p-4 text-sm max-w-md mx-auto font-mono text-foreground hover:bg-muted/70 transition-colors duration-300">
                  npm run create-project &quot;My First SaaS&quot;
                </code>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div>
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold font-heading text-[var(--primary)]">
                  Projects ({filteredProjects.length})
                </h2>
              </div>
              
              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  onClick={() => setFilter("all")}
                >
                  All Ideas ({projects.length})
                </Button>
                <Button
                  variant={filter === "top-priority" ? "default" : "outline"}
                  onClick={() => setFilter("top-priority")}
                  className={filter === "top-priority" ? "bg-green-500 hover:bg-green-600" : ""}
                >
                  ⭐⭐⭐⭐⭐ Top Priority ({projects.filter(p => (p.portfolioScore || 0) >= 30).length})
                </Button>
                <Button
                  variant={filter === "proceed" ? "default" : "outline"}
                  onClick={() => setFilter("proceed")}
                >
                  ✅ Proceed ({projects.filter(p => p.verdict?.toUpperCase().includes("PROCEED")).length})
                </Button>
                <Button
                  variant={filter === "pivot" ? "default" : "outline"}
                  onClick={() => setFilter("pivot")}
                  className={filter === "pivot" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                >
                  ⚠️ Need Pivoting ({projects.filter(p => p.verdict?.toUpperCase().includes("PIVOT")).length})
                </Button>
              </div>
            </motion.div>
            {filteredProjects.length === 0 ? (
              <Card className="text-center py-8 border-dashed bg-card border border-border rounded-lg">
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">
                    No projects match the selected filter. Try a different filter.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <motion.div
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, staggerChildren: 0.1 }}
              >
                {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card border border-border rounded-lg">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-xl flex-1 group-hover:text-[var(--primary)] transition-colors duration-300 text-foreground">
                          {project.name}
                        </CardTitle>
                        <div className="flex flex-col gap-1 ml-2">
                          {project.verdict && (
                            <Badge variant={getVerdictBadgeVariant(project.verdict)} className="text-xs">
                              {formatVerdict(project.verdict)}
                            </Badge>
                          )}
                          <Badge variant={getStatusBadgeVariant(project.status)} className="capitalize text-xs">
                            {project.status ||"unknown"}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription className="line-clamp-2 text-muted-foreground">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2.5 mb-4">
                        <div className="flex items-center justify-between text-sm p-2.5 rounded-lg transition-colors duration-300">
                          <span className="text-muted-foreground font-medium">Portfolio Score</span>
                          <span className={`font-bold text-base ${getScoreTextColor(project.portfolioScore)}`}>
                            {project.portfolioScore ? `${project.portfolioScore}/40` :"—"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm p-2.5 rounded-lg transition-colors duration-300">
                          <span className="text-muted-foreground font-medium">Priority</span>
                          <span className="text-xs text-muted-foreground font-semibold">
                            {getPriorityLabel(project.portfolioScore)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm p-2.5 rounded-lg transition-colors duration-300">
                          <span className="text-muted-foreground font-medium">MRR</span>
                          <span className="font-bold text-base text-green-400">
                            ${(project.mrr || 0).toLocaleString()}
                          </span>
                        </div>
                        {project.workflowCounts && project.workflowCounts.total > 0 && (
                          <div className="flex items-center justify-between text-sm p-2.5 rounded-lg bg-[var(--primary)]/500/10 border border-[var(--primary)]/500/20 group-hover:bg-[var(--primary)]/500/15 transition-colors duration-300">
                            <span className="text-muted-foreground font-medium">Workflows</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-[var(--primary)]">
                                {project.workflowCounts.active > 0 && (
                                  <span className="inline-flex items-center gap-1">
                                    <span className="w-2 h-2 bg-[var(--primary)]/400 rounded-full animate-pulse"></span>
                                    {project.workflowCounts.active} active
                                  </span>
                                )}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {project.workflowCounts.total} total
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Documents Section - Organized by Phase */}
                      {project.documents && project.documents.length > 0 && (
                        <div className="pt-4 border-t">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-bold text-foreground">
                              Documents ({project.documents.length})
                            </h4>
                            <div className="flex items-center gap-2">
                              {project.documents.some(d => d.phase ==="discovery") && (
                                <Link
                                  href="/docs/discovery"
                                  className="text-xs text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors"
                                >
                                  View All Discovery →
                                </Link>
                              )}
                              {project.documents.some(d => d.phase ==="validation") && (
                                <Link
                                  href="/docs/validation"
                                  className="text-xs text-green-400 hover:text-green-300 transition-colors"
                                >
                                  View All Validation →
                                </Link>
                              )}
                            </div>
                          </div>
                      
                      {/* Group documents by phase */}
                      {(() => {
                        const documentsByPhase = project.documents.reduce((acc, doc) => {
                          const phase = doc.phase ||"other";
                          if (!acc[phase]) acc[phase] = [];
                          acc[phase].push(doc);
                          return acc;
                        }, {} as Record<string, typeof project.documents>);

                        const phaseLabels: Record<string, string> = {
                          discovery:"Discovery",
                          validation:"Validation",
                          build:"Product Strategy",
                          scale:"Scale",
                          other:"Other",
                        };

                        const phaseOrder = ["discovery","validation","build","scale","other"];

                        return (
                          <div className="space-y-4">
                            {phaseOrder.map((phase) => {
                              const docs = documentsByPhase[phase];
                              if (!docs || docs.length === 0) return null;

                              return (
                                <div key={phase} className="space-y-2">
                                  <h5 className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                                    {phaseLabels[phase] || phase}
                                  </h5>
                                  <div className="space-y-1.5">
                                    {docs.map((doc) => {
                                      const typeColors: Record<ProjectDocument["type"], string> = {
                                        discovery:"bg-cyan-50 text-cyan-900 border-2 border-cyan-400",
                                        validation:"bg-orange-50 text-orange-900 border-2 border-orange-400",
                                        insight:"bg-purple-50 text-purple-900 border-2 border-purple-400",
                                        portfolio:"bg-[var(--primary)]/50 text-[var(--primary)]-foreground border-2 border-[var(--primary)]",
                                        moat:"bg-green-50 text-green-900 border-2 border-green-400",
                                        retention:"bg-yellow-50 text-yellow-900 border-2 border-yellow-400",
                                        prd:"bg-indigo-50 text-indigo-900 border-2 border-indigo-400",
                                        other:"bg-gray-50 text-gray-900 border-2 border-gray-400",
                                      };
                                      
                                      // Build correct href based on path
                                      let href = doc.path;
                                      if (doc.path.startsWith("/docs/discovery/")) {
                                        href = `/docs/${doc.path.replace("/docs/","")}`;
                                      } else if (doc.path.startsWith("/docs/validation/")) {
                                        href = `/docs/${doc.path.replace("/docs/","")}`;
                                      } else if (doc.path.startsWith("/docs/product/")) {
                                        href = `/docs/${doc.path.replace("/docs/","")}`;
                                      } else if (doc.path.startsWith("/docs/research/")) {
                                        href = `/docs/${doc.path.replace("/docs/","")}`;
                                      } else if (doc.path.startsWith("/docs/ideas/")) {
                                        href = `/docs/${doc.path.replace("/docs/","")}`;
                                      } else if (doc.path.startsWith("/projects/")) {
                                        // For project folder files, link directly to the file
                                        href = `/docs/product/${doc.path.replace("/projects/","")}`;
                                      } else {
                                        href = `/docs/product/${doc.path}`;
                                      }
                                      
                                      // Clean up document name for display
                                      const displayName = doc.name
                                        .replace(/^(NICHE-INTEL|PAIN-SIGNALS|JTBD|OPPORTUNITY|REDTEAM|NARRATIVE|VALIDATION-PLAN|LANDING|DISTRIBUTION|PRICING-TEST|CREATIVE-BATCH|RESULTS|INSIGHT|PORTFOLIO-SCORE|MOAT|RETENTION|PRD|CHECKLIST|SUMMARY|PERSONA|COMPETITORS|DISCOVERY-DEMO)-/i,"")
                                        .replace(/-/g,"")
                                        .replace(/\b\w/g, (l) => l.toUpperCase());
                                      
                                      return (
                                        <Link
                                          key={doc.path}
                                          href={href}
                                          className="flex items-center justify-between text-xs p-2.5 rounded-xl border hover:shadow-sm transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-primary/500 focus:ring-offset-2"
                                        >
                                          <div className="flex items-center gap-2 flex-1 min-w-0">
                                            <span
                                              className={`px-2 py-0.5 rounded-lg text-xs font-bold flex-shrink-0 transition-all duration-300 ${typeColors[doc.type]}`}
                                            >
                                              {doc.type}
                                            </span>
                                            <span className="text-muted-foreground truncate group-hover:text-[var(--primary)] font-medium text-xs transition-colors duration-300">
                                              {displayName}
                                            </span>
                                          </div>
                                          <span className="text-muted-foreground ml-2 flex-shrink-0 font-bold text-sm group-hover:text-[var(--primary)] group-hover:translate-x-0.5 transition-all duration-300">
                                            →
                                          </span>
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })()}
                        </div>
                      )}
                    </CardContent>
                    <div className="px-6 pb-6 pt-0 border-t">
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 mb-3">
                        <span className="font-medium">Template: {project.template}</span>
                        <span className="font-medium">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        {project.workflowCounts && project.workflowCounts.total > 0 ? (
                          <Link
                            href={`/workflows?project=${project.slug}`}
                            className="text-xs text-[var(--primary)] hover:text-[var(--primary)]/80 font-medium transition-colors duration-300 flex items-center gap-1"
                          >
                            <Workflow className="w-3 h-3" />
                            View Workflows ({project.workflowCounts.total})
                          </Link>
                        ) : (
                          <Link
                            href={`/workflows?create=${project.slug}`}
                            className="text-xs text-muted-foreground hover:text-muted-foreground font-medium transition-colors duration-300 flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" />
                            Start Workflow
                          </Link>
                        )}
                        {project.gitRepo && (
                          <a
                            href={project.gitRepo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[var(--primary)] hover:text-[var(--primary)]/80 truncate font-medium transition-colors duration-300"
                          >
                            {project.gitRepo}
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
              </motion.div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 bg-card border border-border rounded-lg rounded-2xl p-8 animate-fade-in">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Quick Actions
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="group">
              <h3 className="font-bold text-foreground mb-3 text-lg group-hover:text-[var(--primary)] transition-colors duration-300">
                Create New Project
              </h3>
              <code className="block rounded-xl p-4 text-sm font-mono text-muted-foreground border transition-colors duration-300">
                npm run create-project &quot;Project Name&quot;
              </code>
            </div>
            <div className="group">
              <h3 className="font-bold text-foreground mb-3 text-lg group-hover:text-[var(--primary)] transition-colors duration-300">
                List Projects
              </h3>
              <code className="block rounded-xl p-4 text-sm font-mono text-muted-foreground border transition-colors duration-300">
                npm run manage-projects list
              </code>
            </div>
            <div className="group">
              <h3 className="font-bold text-foreground mb-3 text-lg group-hover:text-[var(--primary)] transition-colors duration-300">
                Check Status
              </h3>
              <code className="block rounded-xl p-4 text-sm font-mono text-muted-foreground border transition-colors duration-300">
                npm run manage-projects status &lt;slug&gt;
              </code>
            </div>
          </div>
        </div>
    </>
  );
}
