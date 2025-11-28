"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Workflow, Plus } from "lucide-react";

interface ProjectDocument {
  name: string;
  type: "discovery" | "validation" | "insight" | "portfolio" | "moat" | "retention" | "prd" | "other";
  path: string;
  size: number;
  modified: string;
  phase?: "discovery" | "validation" | "build" | "scale";
}

interface Project {
  name: string;
  slug: string;
  description: string;
  status: string;
  portfolioScore?: number;
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

function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    validation: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50",
    engineering: "bg-blue-500/20 text-blue-400 border border-blue-500/50",
    growth: "bg-green-500/20 text-green-400 border border-green-500/50",
    maintenance: "bg-gray-500/20 text-gray-400 border border-gray-500/50",
    killed: "bg-red-500/20 text-red-400 border border-red-500/50",
  };
  return colors[status] || "bg-gray-500/20 text-gray-400 border border-gray-500/50";
}

function getScoreColor(score?: number): string {
  if (!score) return "text-gray-400";
  if (score >= 30) return "text-green-400 font-bold";
  if (score >= 25) return "text-blue-400 font-bold";
  if (score >= 20) return "text-yellow-400 font-semibold";
  return "text-gray-300 font-semibold";
}

function getPriorityLabel(score?: number): string {
  if (!score) return "—";
  if (score >= 30) return "⭐⭐⭐⭐⭐ Top Priority";
  if (score >= 25) return "⭐⭐⭐⭐ High Priority";
  if (score >= 20) return "⭐⭐⭐ Medium Priority";
  if (score >= 15) return "⭐⭐ Low Priority";
  return "⭐ Kill";
}

function calculateStats(projects: Project[]): PortfolioStats {
  const byStatus: Record<string, number> = {};
  let totalMRR = 0;
  let totalScore = 0;
  let scoredCount = 0;

  projects.forEach((project) => {
    const status = project.status || "unknown";
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

export default function HubPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const stats = calculateStats(projects);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg font-semibold text-white">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error && projects.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="text-center glass-card">
            <CardHeader>
              <CardTitle className="text-2xl mb-4 text-white">
                Hub Dashboard
              </CardTitle>
              <div className="glass-subtle border border-blue-500/30 rounded-lg p-6 mb-6">
                <p className="text-blue-400 mb-2 font-bold text-lg">
                  <strong>Note:</strong> Projects registry is local-only
                </p>
                <p className="text-blue-300 text-base font-medium">
                  {error}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-300 mb-6 font-semibold">
                To view your projects, run locally:
              </p>
              <code className="block glass-subtle rounded-lg p-4 text-base max-w-md mx-auto mb-6 font-mono text-gray-200">
                npm run manage-projects list
              </code>
              <p className="text-base text-gray-300 font-medium">
                The dashboard will show projects when running locally, or when projects are stored in a database.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="glass-header sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="animate-fade-in">
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                SaaS Starter Hub
              </h1>
              <p className="mt-2 text-lg text-gray-400 font-medium">
                Manage your portfolio of SaaS projects
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="group glass-card rounded-2xl hover:shadow-xl p-6 hover:border-slate-600/40 transition-all duration-300 hover:-translate-y-1 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">Total Projects</div>
            <div className="text-4xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
              {stats.total}
            </div>
          </div>
          <div className="group glass-card rounded-2xl hover:shadow-xl p-6 hover:border-slate-600/40 transition-all duration-300 hover:-translate-y-1 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">Total MRR</div>
            <div className="text-4xl font-bold text-green-400 group-hover:text-green-300 transition-colors duration-300">
              ${stats.totalMRR.toLocaleString()}
            </div>
          </div>
          <div className="group glass-card rounded-2xl hover:shadow-xl p-6 hover:border-slate-600/40 transition-all duration-300 hover:-translate-y-1 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">Avg Portfolio Score</div>
            <div className="text-4xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
              {stats.avgScore > 0 ? stats.avgScore.toFixed(1) : "—"}
            </div>
          </div>
          <div className="group glass-card rounded-2xl hover:shadow-xl p-6 hover:border-slate-600/40 transition-all duration-300 hover:-translate-y-1 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">In Validation</div>
            <div className="text-4xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300">
              {stats.byStatus.validation || 0}
            </div>
          </div>
        </div>

        {/* Status Breakdown */}
        {Object.keys(stats.byStatus).length > 0 && (
          <div className="glass-card rounded-2xl p-6 mb-8 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <h2 className="text-xl font-bold text-white mb-4">
              Portfolio by Status
            </h2>
            <div className="flex flex-wrap gap-3">
              {Object.entries(stats.byStatus).map(([status, count], index) => (
                <div
                  key={status}
                  className={`px-4 py-2.5 rounded-xl ${getStatusColor(status)} transition-all duration-300 hover:scale-105 cursor-default`}
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <span className="font-bold capitalize text-sm">{status}</span>
                  <span className="ml-2 font-bold text-base">{count}</span>
                </div>
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
            <Card className="text-center py-12 border-dashed glass-card">
              <CardHeader>
                <div className="w-16 h-16 bg-slate-800/50 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700/30">
                  <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <CardTitle className="text-2xl mb-3 text-white">No projects yet</CardTitle>
                <CardDescription className="text-lg mb-6 text-gray-300">
                  Create your first project using the CLI:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <code className="block glass-subtle rounded-xl p-4 text-sm max-w-md mx-auto font-mono text-gray-200 hover:bg-slate-800/60 transition-colors duration-300">
                  npm run create-project &quot;My First SaaS&quot;
                </code>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div>
            <motion.div
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                Projects ({projects.length})
              </h2>
            </motion.div>
            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 glass-card hover:border-slate-600/40">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-xl flex-1 group-hover:text-blue-400 transition-colors duration-300 text-white">
                          {project.name}
                        </CardTitle>
                        <Badge variant="outline" className="ml-2 capitalize border-slate-700 text-gray-300">
                          {project.status || "unknown"}
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-2 text-gray-400">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2.5 mb-4">
                        <div className="flex items-center justify-between text-sm p-2.5 rounded-lg bg-slate-800/50 group-hover:bg-slate-800 transition-colors duration-300">
                          <span className="text-gray-400 font-medium">Portfolio Score</span>
                          <span className={`font-bold text-base ${getScoreColor(project.portfolioScore)}`}>
                            {project.portfolioScore ? `${project.portfolioScore}/40` : "—"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm p-2.5 rounded-lg bg-slate-800/50 group-hover:bg-slate-800 transition-colors duration-300">
                          <span className="text-gray-400 font-medium">Priority</span>
                          <span className="text-xs text-gray-300 font-semibold">
                            {getPriorityLabel(project.portfolioScore)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm p-2.5 rounded-lg bg-slate-800/50 group-hover:bg-slate-800 transition-colors duration-300">
                          <span className="text-gray-400 font-medium">MRR</span>
                          <span className="font-bold text-base text-green-400">
                            ${(project.mrr || 0).toLocaleString()}
                          </span>
                        </div>
                        {project.workflowCounts && project.workflowCounts.total > 0 && (
                          <div className="flex items-center justify-between text-sm p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/15 transition-colors duration-300">
                            <span className="text-gray-400 font-medium">Workflows</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-blue-400">
                                {project.workflowCounts.active > 0 && (
                                  <span className="inline-flex items-center gap-1">
                                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                                    {project.workflowCounts.active} active
                                  </span>
                                )}
                              </span>
                              <span className="text-xs text-gray-400">
                                {project.workflowCounts.total} total
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Documents Section - Organized by Phase */}
                      {project.documents && project.documents.length > 0 && (
                        <div className="pt-4 border-t border-slate-800">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-bold text-white">
                              Documents ({project.documents.length})
                            </h4>
                            <div className="flex items-center gap-2">
                              {project.documents.some(d => d.phase === "discovery") && (
                                <Link
                                  href="/docs/discovery"
                                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                  View All Discovery →
                                </Link>
                              )}
                              {project.documents.some(d => d.phase === "validation") && (
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
                          const phase = doc.phase || "other";
                          if (!acc[phase]) acc[phase] = [];
                          acc[phase].push(doc);
                          return acc;
                        }, {} as Record<string, typeof project.documents>);

                        const phaseLabels: Record<string, string> = {
                          discovery: "Discovery",
                          validation: "Validation",
                          build: "Product Strategy",
                          scale: "Scale",
                          other: "Other",
                        };

                        const phaseOrder = ["discovery", "validation", "build", "scale", "other"];

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
                                        discovery: "bg-cyan-50 text-cyan-900 border-2 border-cyan-400",
                                        validation: "bg-orange-50 text-orange-900 border-2 border-orange-400",
                                        insight: "bg-purple-50 text-purple-900 border-2 border-purple-400",
                                        portfolio: "bg-blue-50 text-blue-900 border-2 border-blue-400",
                                        moat: "bg-green-50 text-green-900 border-2 border-green-400",
                                        retention: "bg-yellow-50 text-yellow-900 border-2 border-yellow-400",
                                        prd: "bg-indigo-50 text-indigo-900 border-2 border-indigo-400",
                                        other: "bg-gray-50 text-gray-900 border-2 border-gray-400",
                                      };
                                      
                                      // Build correct href based on path
                                      let href = doc.path;
                                      if (doc.path.startsWith("/docs/discovery/")) {
                                        href = `/docs/product/${doc.path.replace("/docs/", "")}`;
                                      } else if (doc.path.startsWith("/docs/validation/")) {
                                        href = `/docs/product/${doc.path.replace("/docs/", "")}`;
                                      } else if (doc.path.startsWith("/docs/ideas/")) {
                                        href = `/docs/product/${doc.path.replace("/docs/", "")}`;
                                      } else if (doc.path.startsWith("/projects/")) {
                                        // For project folder files, link directly to the file
                                        href = `/docs/product/${doc.path.replace("/projects/", "")}`;
                                      } else {
                                        href = `/docs/product/${doc.path}`;
                                      }
                                      
                                      // Clean up document name for display
                                      const displayName = doc.name
                                        .replace(/^(NICHE-INTEL|PAIN-SIGNALS|JTBD|OPPORTUNITY|REDTEAM|NARRATIVE|VALIDATION-PLAN|LANDING|DISTRIBUTION|PRICING-TEST|CREATIVE-BATCH|RESULTS|INSIGHT|PORTFOLIO-SCORE|MOAT|RETENTION|PRD|CHECKLIST|SUMMARY|PERSONA|COMPETITORS|DISCOVERY-DEMO)-/i, "")
                                        .replace(/-/g, " ")
                                        .replace(/\b\w/g, (l) => l.toUpperCase());
                                      
                                      return (
                                        <Link
                                          key={doc.path}
                                          href={href}
                                          className="flex items-center justify-between text-xs p-2.5 rounded-xl border border-slate-800 hover:bg-slate-800/50 hover:border-slate-700 hover:shadow-sm transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                                        >
                                          <div className="flex items-center gap-2 flex-1 min-w-0">
                                            <span
                                              className={`px-2 py-0.5 rounded-lg text-xs font-bold flex-shrink-0 transition-all duration-300 ${typeColors[doc.type]}`}
                                            >
                                              {doc.type}
                                            </span>
                                            <span className="text-gray-300 truncate group-hover:text-blue-400 font-medium text-xs transition-colors duration-300">
                                              {displayName}
                                            </span>
                                          </div>
                                          <span className="text-gray-500 ml-2 flex-shrink-0 font-bold text-sm group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all duration-300">
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
                    <div className="px-6 pb-6 pt-0 border-t border-slate-800">
                      <div className="flex items-center justify-between text-xs text-gray-500 pt-4 mb-3">
                        <span className="font-medium">Template: {project.template}</span>
                        <span className="font-medium">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        {project.workflowCounts && project.workflowCounts.total > 0 ? (
                          <Link
                            href={`/workflows?project=${project.slug}`}
                            className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 flex items-center gap-1"
                          >
                            <Workflow className="w-3 h-3" />
                            View Workflows ({project.workflowCounts.total})
                          </Link>
                        ) : (
                          <Link
                            href={`/workflows?create=${project.slug}`}
                            className="text-xs text-gray-500 hover:text-gray-400 font-medium transition-colors duration-300 flex items-center gap-1"
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
                            className="text-xs text-blue-400 hover:text-blue-300 truncate font-medium transition-colors duration-300"
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
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 glass-card rounded-2xl p-8 animate-fade-in">
          <h2 className="text-2xl font-bold text-white mb-6">
            Quick Actions
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="group">
              <h3 className="font-bold text-white mb-3 text-lg group-hover:text-blue-400 transition-colors duration-300">
                Create New Project
              </h3>
              <code className="block bg-slate-800/50 rounded-xl p-4 text-sm font-mono text-gray-300 border border-slate-700 hover:bg-slate-800 transition-colors duration-300">
                npm run create-project &quot;Project Name&quot;
              </code>
            </div>
            <div className="group">
              <h3 className="font-bold text-white mb-3 text-lg group-hover:text-blue-400 transition-colors duration-300">
                List Projects
              </h3>
              <code className="block bg-slate-800/50 rounded-xl p-4 text-sm font-mono text-gray-300 border border-slate-700 hover:bg-slate-800 transition-colors duration-300">
                npm run manage-projects list
              </code>
            </div>
            <div className="group">
              <h3 className="font-bold text-white mb-3 text-lg group-hover:text-blue-400 transition-colors duration-300">
                Check Status
              </h3>
              <code className="block bg-slate-800/50 rounded-xl p-4 text-sm font-mono text-gray-300 border border-slate-700 hover:bg-slate-800 transition-colors duration-300">
                npm run manage-projects status &lt;slug&gt;
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
