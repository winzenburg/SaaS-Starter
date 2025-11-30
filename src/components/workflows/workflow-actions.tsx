/**
 * Workflow Actions Component
 * 
 * Provides actions for executing workflow steps
 */"use client";

import { useState } from"react";
import type { Workflow } from"@/lib/workflows/types";

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
        workflow.phase ==="discovery"
          ?"/api/workflows/discovery"
          :"/api/workflows/validation";

      const response = await fetch(endpoint, {
        method:"POST",
        headers: {"Content-Type":"application/json" },
        body: JSON.stringify({
          ideaSlug: workflow.ideaSlug,
          ideaName: workflow.ideaName,
          phase: workflow.phase,
          action:"execute",
          workflowId: workflow.id,
          stepId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to execute step");
      }

      const data = await response.json();
      if (data.success && data.workflow) {
        onUpdate(data.workflow);
        // Files are now being saved to disk automatically
        // Reload workflow from server to ensure we have the latest state
        // This ensures files are saved and workflow state is persisted
        setTimeout(async () => {
          try {
            const reloadResponse = await fetch(`/api/workflows/${workflow.id}`);
            if (reloadResponse.ok) {
              const reloadData = await reloadResponse.json();
              if (reloadData.success && reloadData.workflow) {
                onUpdate(reloadData.workflow);
              }
            }
          } catch (reloadError) {
            console.error("Failed to reload workflow:", reloadError);
          }
        }, 1500); // Wait 1.5s for file operations to complete
      } else {
        throw new Error(data.error || "Failed to execute step");
      }
    } catch (error) {
      console.error("Error executing step:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to execute step. Check console for details.";
      alert(errorMessage);
    } finally {
      setExecuting(null);
    }
  };

  const pendingSteps = workflow.steps.filter(
    (s) => s.status ==="pending" || s.status ==="failed"
  );

  const inProgressStep = workflow.steps.find(
    (s) => s.status ==="in_progress"
  );

  return (
    <div>
      <h4 className="font-medium mb-3 text-[hsl(var(--text-main))]">Actions</h4>
      <div className="space-y-2">
        {inProgressStep && (
          <div className="p-2 bg-[var(--primary)]/20 border border-[var(--primary)]/50 rounded text-sm text-[var(--primary)]">
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
                className="w-full text-left px-3 py-2 bg-[var(--primary)] text-[hsl(var(--text-main))] rounded hover:bg-[var(--primary)]/90 disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-colors duration-300"
              >
                {executing === step.id ?"Executing..." : `Execute: ${step.name}`}
              </button>
            ))}
          </div>
        ) : (
          <div className="p-2 border rounded text-sm text-[hsl(var(--text-muted))]">
            All steps completed
          </div>
        )}
      </div>
    </div>
  );
}

