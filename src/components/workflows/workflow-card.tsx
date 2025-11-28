/**
 * Workflow Card Component
 * 
 * Displays a single workflow with status, steps, and actions
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { FolderKanban } from "lucide-react";
import { WorkflowSteps } from "./workflow-steps";
import { WorkflowActions } from "./workflow-actions";
import type { Workflow, WorkflowPhase } from "@/lib/workflows/types";

interface WorkflowCardProps {
  workflow: Workflow;
  onUpdate: (workflow: Workflow) => void;
}

export function WorkflowCard({ workflow, onUpdate }: WorkflowCardProps) {
  const [expanded, setExpanded] = useState(false);

  const getStatusColor = (status: Workflow["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border border-green-500/50";
      case "in_progress":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/50";
      case "failed":
        return "bg-red-500/20 text-red-400 border border-red-500/50";
      case "paused":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50";
      default:
        return "bg-gray-500/20 text-gray-400 border border-gray-500/50";
    }
  };

  const getPhaseColor = (phase: WorkflowPhase) => {
    switch (phase) {
      case "discovery":
        return "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50";
      case "validation":
        return "bg-orange-500/20 text-orange-400 border border-orange-500/50";
      case "build":
        return "bg-purple-500/20 text-purple-400 border border-purple-500/50";
      case "scale":
        return "bg-pink-500/20 text-pink-400 border border-pink-500/50";
      default:
        return "bg-gray-500/20 text-gray-400 border border-gray-500/50";
    }
  };

  const completedSteps = workflow.steps.filter(
    (s) => s.status === "completed"
  ).length;
  const totalSteps = workflow.steps.length;
  const progress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  return (
    <article className="glass-card rounded-lg p-6 hover:shadow-xl hover:border-slate-600/40 transition-all duration-300">
      {/* Header */}
      <header className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span
              className={`px-3 py-1.5 rounded-md text-sm font-bold whitespace-nowrap ${getPhaseColor(
                workflow.phase
              )}`}
              aria-label={`Phase: ${workflow.phase}`}
            >
              {workflow.phase.toUpperCase()}
            </span>
            <span
              className={`px-3 py-1.5 rounded-md text-sm font-bold whitespace-nowrap ${getStatusColor(
                workflow.status
              )}`}
              aria-label={`Status: ${workflow.status.replace("_", " ")}`}
            >
              {workflow.status.replace("_", " ").toUpperCase()}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{workflow.ideaName}</h3>
          <p className="text-base text-gray-400 font-medium">
            {workflow.ideaSlug}
          </p>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-md p-2 text-lg font-bold transition-colors duration-300"
          aria-label={expanded ? "Collapse workflow details" : "Expand workflow details"}
          aria-expanded={expanded}
        >
          {expanded ? "▼" : "▶"}
        </button>
      </header>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-base font-semibold text-white mb-2">
          <span>Progress</span>
          <span>
            {completedSteps} / {totalSteps} steps
          </span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-3" role="progressbar" aria-valuenow={completedSteps} aria-valuemin={0} aria-valuemax={totalSteps} aria-label={`${completedSteps} of ${totalSteps} steps completed`}>
          <div
            className="bg-blue-500 h-3 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Score (Discovery only) */}
      {workflow.phase === "discovery" && "score" in workflow && (
        <div className="mb-4 p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <span className="text-base font-bold text-white">Opportunity Score</span>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {workflow.score?.toFixed(1) || "—"}
            </span>
          </div>
          {workflow.scoreBreakdown && (
            <div className="grid grid-cols-2 gap-3 mt-3 text-sm font-semibold text-gray-300">
              <div>
                <span className="text-gray-500">Niche:</span> {workflow.scoreBreakdown.nicheViability.toFixed(1)}
              </div>
              <div>
                <span className="text-gray-500">Pain:</span> {workflow.scoreBreakdown.painIntensity.toFixed(1)}
              </div>
              <div>
                <span className="text-gray-500">Persona:</span> {workflow.scoreBreakdown.personaClarity.toFixed(1)}
              </div>
              <div>
                <span className="text-gray-500">Moat:</span> {workflow.scoreBreakdown.moatPotential.toFixed(1)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Results (Validation only) */}
      {workflow.phase === "validation" && "results" in workflow && (
        <div className="mb-4 p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
          <div className="text-base font-bold text-white mb-3">Results</div>
          <div className="grid grid-cols-2 gap-3 text-sm font-semibold text-gray-300">
            {workflow.results && (
              <>
                <div>
                  <span className="text-gray-500">Signups:</span> {workflow.results.signups || 0}
                </div>
                <div>
                  <span className="text-gray-500">Conversion:</span> {workflow.results.conversionRate || 0}%
                </div>
                <div>
                  <span className="text-gray-500">DM Replies:</span> {workflow.results.dmReplies || 0}
                </div>
                <div>
                  <span className="text-gray-500">WTP Signals:</span> {workflow.results.wtpSignals || 0}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Expanded Content */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-slate-800">
          <WorkflowSteps workflow={workflow} onUpdate={onUpdate} />
          <div className="mt-4">
            <WorkflowActions workflow={workflow} onUpdate={onUpdate} />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-4 pt-4 border-t border-slate-800">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <time className="text-sm font-medium text-gray-500" dateTime={workflow.createdAt}>
              Created: {new Date(workflow.createdAt).toISOString().split("T")[0]}
            </time>
            <Link
              href={`/workflows/${workflow.id}`}
              className="text-sm font-semibold text-blue-400 hover:text-blue-300 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-md px-2 py-1 transition-colors duration-300 whitespace-nowrap"
            >
              View Details →
            </Link>
          </div>
          <div className="flex items-center justify-start">
            <Link
              href={`/hub?project=${workflow.ideaSlug}`}
              className="text-xs text-gray-500 hover:text-gray-400 transition-colors duration-300 flex items-center gap-1"
            >
              <FolderKanban className="w-3 h-3" />
              View Project
            </Link>
          </div>
        </div>
      </footer>
    </article>
  );
}

