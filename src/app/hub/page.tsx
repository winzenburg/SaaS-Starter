"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
}

interface PortfolioStats {
  total: number;
  byStatus: Record<string, number>;
  totalMRR: number;
  avgScore: number;
}

function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    validation: "bg-yellow-100 text-yellow-800 border-yellow-200",
    engineering: "bg-blue-100 text-blue-800 border-blue-200",
    growth: "bg-green-100 text-green-800 border-green-200",
    maintenance: "bg-gray-100 text-gray-800 border-gray-200",
    killed: "bg-red-100 text-red-800 border-red-200",
  };
  return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
}

function getScoreColor(score?: number): string {
  if (!score) return "text-gray-400";
  if (score >= 30) return "text-green-600 font-semibold";
  if (score >= 25) return "text-blue-600 font-semibold";
  if (score >= 20) return "text-yellow-600";
  return "text-gray-600";
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error && projects.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Hub Dashboard
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <p className="text-blue-800 mb-2">
                <strong>Note:</strong> Projects registry is local-only
              </p>
              <p className="text-blue-700 text-sm">
                {error}
              </p>
            </div>
            <p className="text-gray-600 mb-6">
              To view your projects, run locally:
            </p>
            <code className="block bg-gray-100 rounded-lg p-4 text-sm max-w-md mx-auto mb-6">
              npm run manage-projects list
            </code>
            <p className="text-gray-600 text-sm">
              The dashboard will show projects when running locally, or when projects are stored in a database.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                SaaS Starter Hub
              </h1>
              <p className="mt-2 text-gray-600">
                Manage your portfolio of SaaS projects
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500">Total Projects</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">
              {stats.total}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500">Total MRR</div>
            <div className="mt-2 text-3xl font-bold text-green-600">
              ${stats.totalMRR.toLocaleString()}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500">Avg Portfolio Score</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">
              {stats.avgScore > 0 ? stats.avgScore.toFixed(1) : "—"}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500">In Validation</div>
            <div className="mt-2 text-3xl font-bold text-yellow-600">
              {stats.byStatus.validation || 0}
            </div>
          </div>
        </div>

        {/* Status Breakdown */}
        {Object.keys(stats.byStatus).length > 0 && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Portfolio by Status
            </h2>
            <div className="flex flex-wrap gap-4">
              {Object.entries(stats.byStatus).map(([status, count]) => (
                <div
                  key={status}
                  className={`px-4 py-2 rounded-lg border ${getStatusColor(status)}`}
                >
                  <span className="font-medium capitalize">{status}</span>
                  <span className="ml-2 font-bold">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects List */}
        {projects.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No projects yet
            </h2>
            <p className="text-gray-600 mb-6">
              Create your first project using the CLI:
            </p>
            <code className="block bg-gray-100 rounded-lg p-4 text-sm max-w-md mx-auto">
              npm run create-project &quot;My First SaaS&quot;
            </code>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Projects ({projects.length})
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div
                  key={project.slug}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex-1">
                      {project.name}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(
                        project.status || "unknown"
                      )}`}
                    >
                      {project.status || "unknown"}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Portfolio Score</span>
                      <span className={`font-medium ${getScoreColor(project.portfolioScore)}`}>
                        {project.portfolioScore ? `${project.portfolioScore}/40` : "—"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Priority</span>
                      <span className="text-xs text-gray-600">
                        {getPriorityLabel(project.portfolioScore)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">MRR</span>
                      <span className="font-medium text-green-600">
                        ${(project.mrr || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Template: {project.template}</span>
                      <span>
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {project.gitRepo && (
                      <a
                        href={project.gitRepo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-800 mt-2 block truncate"
                      >
                        {project.gitRepo}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 bg-white rounded-lg shadow p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                Create New Project
              </h3>
              <code className="block bg-gray-100 rounded p-3 text-sm">
                npm run create-project &quot;Project Name&quot;
              </code>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                List Projects
              </h3>
              <code className="block bg-gray-100 rounded p-3 text-sm">
                npm run manage-projects list
              </code>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                Check Status
              </h3>
              <code className="block bg-gray-100 rounded p-3 text-sm">
                npm run manage-projects status &lt;slug&gt;
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
