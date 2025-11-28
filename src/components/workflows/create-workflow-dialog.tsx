/**
 * Create Workflow Dialog
 * 
 * Dialog for creating new discovery or validation workflows
 */

"use client";

import { useState, useEffect, useRef } from "react";
import type { WorkflowPhase } from "@/lib/workflows/types";

interface CreateWorkflowDialogProps {
  onClose: () => void;
  onCreate: (workflow: {
    ideaSlug: string;
    ideaName: string;
    phase: WorkflowPhase;
  }) => void;
}

export function CreateWorkflowDialog({
  onClose,
  onCreate,
  initialSlug,
  initialName,
}: CreateWorkflowDialogProps & { initialSlug?: string; initialName?: string }) {
  const [ideaSlug, setIdeaSlug] = useState(initialSlug || "");
  const [ideaName, setIdeaName] = useState(initialName || "");
  const [phase, setPhase] = useState<WorkflowPhase>("discovery");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Load project name if slug is provided but name is not
  useEffect(() => {
    if (ideaSlug && !ideaName) {
      // Try to fetch project name from Hub API
      fetch(`/api/hub/projects`)
        .then((res) => res.json())
        .then((data) => {
          const project = data.projects?.find((p: { slug: string }) => p.slug === ideaSlug);
          if (project) {
            setIdeaName(project.name);
          }
        })
        .catch(() => {
          // Ignore errors, user can enter manually
        });
    }
  }, [ideaSlug, ideaName]);

  // Focus trap and keyboard handling
  useEffect(() => {
    // Focus first input when dialog opens
    firstInputRef.current?.focus();

    // Handle Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !submitting) {
        onClose();
      }
    };

    // Handle focus trap
    const handleTab = (e: KeyboardEvent) => {
      if (!dialogRef.current) return;

      const focusableElements = dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleTab);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleTab);
    };
  }, [onClose, submitting]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!ideaSlug.trim() || !ideaName.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    try {
      onCreate({ ideaSlug: ideaSlug.trim(), ideaName: ideaName.trim(), phase });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create workflow");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      onClick={(e) => {
        if (e.target === e.currentTarget && !submitting) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        className="glass-modal rounded-lg p-6 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="dialog-title" className="text-2xl font-bold mb-2 text-white">
          Create New Workflow
        </h2>
        <p id="dialog-description" className="text-sm text-gray-400 mb-6">
          Fill in the form below to create a new discovery or validation workflow
        </p>

        {error && (
          <div
            role="alert"
            aria-live="assertive"
            className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-md"
          >
            <strong className="font-semibold text-red-400 text-base">Error:</strong>
            <span className="text-red-400 text-base ml-1">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label
              htmlFor="ideaName"
              className="block text-base font-semibold mb-2 text-white"
            >
              Idea Name <span className="text-red-400 font-bold" aria-label="required">*</span>
            </label>
            <input
              ref={firstInputRef}
              id="ideaName"
              type="text"
              value={ideaName}
              onChange={(e) => {
                setIdeaName(e.target.value);
                setError(null);
              }}
              className="w-full px-4 py-3 text-base text-white bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500"
              placeholder="Enterprise Design System for Startups"
              required
              aria-required="true"
              aria-invalid={error && !ideaName.trim() ? "true" : "false"}
              aria-describedby="ideaName-hint"
            />
            <p id="ideaName-hint" className="sr-only">
              Enter the name of your product idea
            </p>
          </div>

          <div>
            <label
              htmlFor="ideaSlug"
              className="block text-base font-semibold mb-2 text-white"
            >
              Idea Slug <span className="text-red-400 font-bold" aria-label="required">*</span>
            </label>
            <input
              id="ideaSlug"
              type="text"
              value={ideaSlug}
              onChange={(e) => {
                setIdeaSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
                setError(null);
              }}
              className="w-full px-4 py-3 text-base text-white bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500"
              placeholder="enterprise-design-system"
              required
              aria-required="true"
              aria-invalid={error && !ideaSlug.trim() ? "true" : "false"}
              aria-describedby="ideaSlug-hint ideaSlug-format"
            />
            <p id="ideaSlug-format" className="text-sm text-gray-400 mt-2 font-medium">
              Lowercase, hyphenated (e.g., &quot;enterprise-design-system&quot;)
            </p>
            <p id="ideaSlug-hint" className="sr-only">
              Enter a URL-friendly identifier for your idea. It will be automatically formatted to lowercase with hyphens.
            </p>
          </div>

          <div>
            <label
              htmlFor="phase"
              className="block text-base font-semibold mb-2 text-white"
            >
              Phase <span className="text-red-400 font-bold" aria-label="required">*</span>
            </label>
            <select
              id="phase"
              value={phase}
              onChange={(e) => setPhase(e.target.value as WorkflowPhase)}
              className="w-full px-4 py-3 text-base text-white bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              aria-required="true"
              aria-describedby="phase-hint phase-description"
            >
              <option value="discovery">Discovery</option>
              <option value="validation">Validation</option>
            </select>
            <p id="phase-description" className="text-sm text-gray-400 mt-2 font-medium">
              {phase === "discovery"
                ? "8-step discovery process (Manus → ChatGPT → Cursor agents)"
                : "6-step validation process (Demand validation → Landing → Distribution)"}
            </p>
            <p id="phase-hint" className="sr-only">
              Select whether this is a discovery workflow or validation workflow
            </p>
          </div>

          <div className="flex gap-3 justify-end pt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-6 py-3 text-base font-semibold text-gray-300 bg-slate-800 border border-slate-700 rounded-md hover:bg-slate-700 hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Cancel and close dialog"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 text-base font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-busy={submitting}
            >
              {submitting ? (
                <>
                  <span aria-hidden="true">Creating...</span>
                  <span className="sr-only">Creating workflow, please wait</span>
                </>
              ) : (
                "Create Workflow"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

