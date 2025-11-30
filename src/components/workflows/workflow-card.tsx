/**
 * Workflow Card Component
 * 
 * Displays a single workflow with status, steps, and actions
 */"use client";

import { useState } from"react";
import Link from"next/link";
import { FolderKanban, ChevronDown, ChevronRight, ArrowRight } from"lucide-react";
import { WorkflowSteps } from"./workflow-steps";
import { WorkflowActions } from"./workflow-actions";
import type { Workflow, WorkflowPhase } from"@/lib/workflows/types";

interface WorkflowCardProps {
  workflow: Workflow;
  onUpdate: (workflow: Workflow) => void;
}

export function WorkflowCard({ workflow, onUpdate }: WorkflowCardProps) {
  const [expanded, setExpanded] = useState(false);

  const getStatusColor = (status: Workflow["status"]) => {
    switch (status) {
      case"completed":
        return"bg-[#e8f0eb] text-[#4a7c59] border border-[#c5d9cb]";
      case"in_progress":
        return"bg-slate-700 text-white border border-slate-600";
      case"failed":
        return"bg-red-100 text-red-700 border border-red-200";
      case"paused":
        return"bg-amber-100 text-amber-700 border border-amber-200";
      default:
        return"bg-slate-100 text-slate-600 border border-slate-200";
    }
  };

  const getPhaseColor = (phase: WorkflowPhase) => {
    switch (phase) {
      case"discovery":
        return"bg-cyan-100 text-cyan-800 border border-cyan-300";
      case"validation":
        return"bg-orange-100 text-orange-900 border border-orange-300";
      case"build":
        return"bg-violet-100 text-violet-800 border border-violet-300";
      case"scale":
        return"bg-pink-100 text-pink-800 border border-pink-300";
      default:
        return"bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  const completedSteps = workflow.steps.filter(
    (s) => s.status ==="completed"
  ).length;
  const totalSteps = workflow.steps.length;
  const progress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  return (
    <article className="bg-white border border-border rounded-lg p-6 hover:shadow-md transition-all duration-300">
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
              aria-label={`Status: ${workflow.status.replace("_","")}`}
            >
              {workflow.status.replace("_","").toUpperCase()}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">{workflow.ideaName}</h3>
          <p className="text-sm text-muted-foreground">
            {workflow.ideaSlug}
          </p>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-[#4a7c59] focus:ring-offset-2 rounded-md p-2 transition-colors duration-200"
          aria-label={expanded ?"Collapse workflow details" :"Expand workflow details"}
          aria-expanded={expanded}
        >
          {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </header>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm font-medium text-foreground mb-2">
          <span>Progress</span>
          <span className="text-muted-foreground">
            {completedSteps} / {totalSteps} steps
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2" role="progressbar" aria-valuenow={completedSteps} aria-valuemin={0} aria-valuemax={totalSteps} aria-label={`${completedSteps} of ${totalSteps} steps completed`}>
          <div
            className="bg-[#4a7c59] h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Score (Discovery only) */}
      {workflow.phase ==="discovery" &&"score" in workflow && (
        <div className="mb-4 p-4 bg-[#e8f0eb] border border-[#c5d9cb] rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-foreground">Opportunity Score</span>
            <span className="text-2xl font-bold text-[#4a7c59]">
              {workflow.score?.toFixed(1) ||"—"}
            </span>
          </div>
          {workflow.scoreBreakdown && (
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Niche</span>
                <span className="font-medium text-foreground">{workflow.scoreBreakdown.nicheViability.toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span>Pain</span>
                <span className="font-medium text-foreground">{workflow.scoreBreakdown.painIntensity.toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span>Persona</span>
                <span className="font-medium text-foreground">{workflow.scoreBreakdown.personaClarity.toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span>Moat</span>
                <span className="font-medium text-foreground">{workflow.scoreBreakdown.moatPotential.toFixed(1)}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Results (Validation only) */}
      {workflow.phase ==="validation" &&"results" in workflow && (
        <div className="mb-4 p-4 bg-orange-50 border border-orange-100 rounded-lg">
          <div className="text-sm font-semibold text-foreground mb-3">Validation Results</div>
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            {workflow.results && (
              <>
                <div className="flex justify-between">
                  <span>Signups</span>
                  <span className="font-medium text-foreground">{workflow.results.signups || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Conversion</span>
                  <span className="font-medium text-foreground">{workflow.results.conversionRate || 0}%</span>
                </div>
                <div className="flex justify-between">
                  <span>DM Replies</span>
                  <span className="font-medium text-foreground">{workflow.results.dmReplies || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>WTP Signals</span>
                  <span className="font-medium text-foreground">{workflow.results.wtpSignals || 0}</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Expanded Content */}
      {expanded && (
        <div className="mt-4 pt-4 border-t">
          <WorkflowSteps workflow={workflow} onUpdate={onUpdate} />
          <div className="mt-4">
            <WorkflowActions workflow={workflow} onUpdate={onUpdate} />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-4 pt-4 border-t border-border">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <time className="text-xs text-muted-foreground" dateTime={workflow.createdAt}>
              Created: {new Date(workflow.createdAt).toISOString().split("T")[0]}
            </time>
            <Link
              href={`/workflows/${workflow.id}`}
              className="text-sm font-medium text-[#4a7c59] hover:text-[#3d6649] focus:outline-none focus:ring-2 focus:ring-[#4a7c59] focus:ring-offset-2 rounded px-2 py-1 transition-colors duration-200 inline-flex items-center gap-1"
            >
              View Details
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="flex items-center justify-start">
            <Link
              href={`/hub?project=${workflow.ideaSlug}`}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1"
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

