/**
 * Workflow Actions Component
 * 
 * Provides actions for executing workflow steps
 */

"use client";

import { useState } from "react";
import type { Workflow } from "@/lib/workflows/types";

interface WorkflowActionsProps {
  workflow: Workflow;
  onUpdate: (workflow: Workflow) => void;
}

export function WorkflowActions({ workflow, onUpdate }: WorkflowActionsProps) {
  const [executing, setExecuting] = useState<string | null>(null);

  const executeStep = async (stepId: string) => {
    setExecuting(stepId);
    try {
      const endpoint =
        workflow.phase === "discovery"
          ? "/api/workflows/discovery"
          : "/api/workflows/validation";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ideaSlug: workflow.ideaSlug,
          ideaName: workflow.ideaName,
          phase: workflow.phase,
          action: "execute",
          stepId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to execute step");
      }

      const data = await response.json();
      onUpdate(data.workflow);
    } catch (error) {
      console.error("Error executing step:", error);
      alert("Failed to execute step. Check console for details.");
    } finally {
      setExecuting(null);
    }
  };

  const pendingSteps = workflow.steps.filter(
    (s) => s.status === "pending" || s.status === "failed"
  );

  const inProgressStep = workflow.steps.find(
    (s) => s.status === "in_progress"
  );

  return (
    <div>
      <h4 className="font-medium mb-3 text-white">Actions</h4>
      <div className="space-y-2">
        {inProgressStep && (
          <div className="p-2 bg-blue-500/20 border border-blue-500/50 rounded text-sm text-blue-400">
            Step &quot;{inProgressStep.name}&quot; is currently in progress
          </div>
        )}
        {pendingSteps.length > 0 ? (
          <div className="space-y-1">
            {pendingSteps.map((step) => (
              <button
                key={step.id}
                onClick={() => executeStep(step.id)}
                disabled={executing !== null || !!inProgressStep}
                className="w-full text-left px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-colors duration-300"
              >
                {executing === step.id ? "Executing..." : `Execute: ${step.name}`}
              </button>
            ))}
          </div>
        ) : (
          <div className="p-2 bg-slate-800/50 border border-slate-700 rounded text-sm text-gray-400">
            All steps completed
          </div>
        )}
      </div>
    </div>
  );
}

