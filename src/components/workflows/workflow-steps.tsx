/**
 * Workflow Steps Component
 *
 * Displays all steps in a workflow with their status
 */"use client";

import { Check, Loader2, X, Pause, Circle } from "lucide-react";
import type { Workflow, WorkflowStep } from"@/lib/workflows/types";

interface WorkflowStepsProps {
  workflow: Workflow;
  onUpdate?: (workflow: Workflow) => void;
}

export function WorkflowSteps({ workflow }: WorkflowStepsProps) {
  const getStepStatusIcon = (status: WorkflowStep["status"]) => {
    switch (status) {
      case"completed":
        return <Check className="w-4 h-4" />;
      case"in_progress":
        return <Loader2 className="w-4 h-4 animate-spin" />;
      case"failed":
        return <X className="w-4 h-4" />;
      case"paused":
        return <Pause className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  const getStepStatusColor = (status: WorkflowStep["status"]) => {
    switch (status) {
      case"completed":
        return"text-green-600";
      case"in_progress":
        return"text-[var(--primary)]";
      case"failed":
        return"text-red-600";
      case"paused":
        return"text-amber-600";
      default:
        return"text-slate-400";
    }
  };

  return (
    <div>
      <h4 className="font-medium mb-3 text-[hsl(var(--text-main))]">Steps</h4>
      <div className="space-y-2">
        {workflow.steps.map((step) => (
          <div
            key={step.id}
            className="flex items-start gap-3 p-2 rounded transition-colors duration-300"
          >
            <div
              className={`text-lg font-bold ${getStepStatusColor(step.status)}`}
            >
              {getStepStatusIcon(step.status)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[hsl(var(--text-muted))]">{step.name}</span>
                {step.agent && (
                  <span className="text-xs text-[hsl(var(--text-muted))]">
                    ({step.agent})
                  </span>
                )}
              </div>
              {step.error && (
                <div className="text-xs text-red-400 mt-1">{step.error}</div>
              )}
              {step.metadata?.note !== undefined && step.metadata.note !== null && (
                <div className="text-xs text-[hsl(var(--text-muted))] mt-1">
                  {(() => {
                    const note = step.metadata.note;
                    if (typeof note ==="string") return note;
                    if (typeof note ==="number" || typeof note ==="boolean") return String(note);
                    try {
                      return JSON.stringify(note);
                    } catch {
                      return String(note);
                    }
                  })()}
                </div>
              )}
              {step.startedAt && (
                <div className="text-xs text-[hsl(var(--text-muted))] mt-1">
                  Started: {new Date(step.startedAt).toISOString().replace("T","").slice(0, 16)}
                </div>
              )}
              {step.completedAt && (
                <div className="text-xs text-[hsl(var(--text-muted))]">
                  Completed: {new Date(step.completedAt).toISOString().replace("T","").slice(0, 16)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

