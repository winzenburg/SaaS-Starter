/**
 * Validation Thresholds Component
 * 
 * Displays and manages validation thresholds and results
 */"use client";

import { useState, useRef } from"react";
import type { ValidationWorkflow } from"@/lib/workflows/types";

interface ValidationThresholdsProps {
  workflow: ValidationWorkflow;
  onUpdate: (workflow: ValidationWorkflow) => void;
}

export function ValidationThresholds({
  workflow,
  onUpdate,
}: ValidationThresholdsProps) {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const updateResults = async (results: Partial<ValidationWorkflow["results"]>) => {
    setUpdating(true);
    setError(null);
    setStatusMessage(null);

    try {
      const response = await fetch("/api/workflows/validation", {
        method:"POST",
        headers: {"Content-Type":"application/json" },
        body: JSON.stringify({
          ideaSlug: workflow.ideaSlug,
          ideaName: workflow.ideaName,
          phase:"validation",
          action:"update-results",
          results,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update results");
      }

      const data = await response.json();
      onUpdate(data.workflow);
      setStatusMessage("Results updated successfully");
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (error) {
      console.error("Error updating results:", error);
      const errorMsg = error instanceof Error ? error.message :"Failed to update results";
      setError(errorMsg);
    } finally {
      setUpdating(false);
    }
  };

  const checkThresholds = async () => {
    if (!workflow.results) {
      setError("No results to check. Please enter validation results first.");
      return;
    }

    setError(null);
    setStatusMessage(null);

    try {
      const response = await fetch("/api/workflows/validation", {
        method:"POST",
        headers: {"Content-Type":"application/json" },
        body: JSON.stringify({
          ideaSlug: workflow.ideaSlug,
          ideaName: workflow.ideaName,
          phase:"validation",
          action:"check-thresholds",
          results: workflow.results,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to check thresholds");
      }

      const data = await response.json();
      if (data.passed) {
        setStatusMessage("All thresholds passed! Validation is successful.");
      } else {
        const failed = data.checks
          .filter((c: { passed: boolean }) => !c.passed)
          .map((c: { metric: string }) => c.metric)
          .join(",");
        setError(`Thresholds not met. Failed metrics: ${failed}`);
      }
    } catch (error) {
      console.error("Error checking thresholds:", error);
      const errorMsg = error instanceof Error ? error.message :"Failed to check thresholds";
      setError(errorMsg);
    }
  };

  const thresholds = workflow.thresholds || {
    warmTrafficConversion: 15,
    coldTrafficConversion: 3,
    dmReplyRate: 20,
    wtpSignals: 1,
  };
  const results = workflow.results || {
    signups: 0,
    conversionRate: 0,
    dmReplies: 0,
    wtpSignals: 0,
  };

  return (
    <div className="glass-card rounded-lg p-6">
      <h3 className="font-semibold mb-4 text-[hsl(var(--text-main))]" id="thresholds-heading">
        Validation Thresholds
      </h3>

      {/* Status and Error Messages */}
      {error && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-md text-red-400 text-sm"
        >
          <strong className="font-semibold">Error:</strong> {error}
        </div>
      )}

      {statusMessage && (
        <div
          ref={statusRef}
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-md text-green-400 text-sm"
        >
          {statusMessage}
        </div>
      )}

      {/* Results Input */}
      <div className="space-y-3 mb-4" role="group" aria-labelledby="thresholds-heading">
        <div>
          <label htmlFor="signups" className="block text-sm font-medium mb-1 text-[hsl(var(--text-muted))]">
            Signups
          </label>
          <input
            id="signups"
            type="number"
            min="0"
            step="1"
            value={results.signups || 0}
            onChange={(e) => {
              const value = parseInt(e.target.value) || 0;
              updateResults({ signups: value });
            }}
            disabled={updating}
            className="w-full px-3 py-2 border rounded-md text-[hsl(var(--text-main))] focus:outline-none focus:ring-2 focus:ring-primary focus:border-[var(--primary)] disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-[hsl(var(--text-muted))]"
            aria-describedby="signups-hint"
            aria-busy={updating}
          />
          <p id="signups-hint" className="sr-only">
            Enter the number of signups for this validation workflow
          </p>
        </div>

        <div>
          <label htmlFor="conversionRate" className="block text-sm font-medium mb-1 text-[hsl(var(--text-muted))]">
            Conversion Rate (%)
          </label>
          <input
            id="conversionRate"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={results.conversionRate || 0}
            onChange={(e) => {
              const value = parseFloat(e.target.value) || 0;
              updateResults({ conversionRate: value });
            }}
            disabled={updating}
            className="w-full px-3 py-2 border rounded-md text-[hsl(var(--text-main))] focus:outline-none focus:ring-2 focus:ring-primary focus:border-[var(--primary)] disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-[hsl(var(--text-muted))]"
            aria-describedby="conversionRate-hint conversionRate-threshold"
            aria-busy={updating}
          />
          <p id="conversionRate-hint" className="sr-only">
            Enter the conversion rate as a percentage
          </p>
          <p id="conversionRate-threshold" className="sr-only">
            Target threshold: {thresholds.warmTrafficConversion}%
          </p>
        </div>

        <div>
          <label htmlFor="dmReplies" className="block text-sm font-medium mb-1 text-[hsl(var(--text-muted))]">
            DM Reply Rate (%)
          </label>
          <input
            id="dmReplies"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={results.dmReplies || 0}
            onChange={(e) => {
              const value = parseFloat(e.target.value) || 0;
              updateResults({ dmReplies: value });
            }}
            disabled={updating}
            className="w-full px-3 py-2 border rounded-md text-[hsl(var(--text-main))] focus:outline-none focus:ring-2 focus:ring-primary focus:border-[var(--primary)] disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-[hsl(var(--text-muted))]"
            aria-describedby="dmReplies-hint dmReplies-threshold"
            aria-busy={updating}
          />
          <p id="dmReplies-hint" className="sr-only">
            Enter the DM reply rate as a percentage
          </p>
          <p id="dmReplies-threshold" className="sr-only">
            Target threshold: {thresholds.dmReplyRate}%
          </p>
        </div>

        <div>
          <label htmlFor="wtpSignals" className="block text-sm font-medium mb-1 text-[hsl(var(--text-muted))]">
            WTP Signals
          </label>
          <input
            id="wtpSignals"
            type="number"
            min="0"
            step="1"
            value={results.wtpSignals || 0}
            onChange={(e) => {
              const value = parseInt(e.target.value) || 0;
              updateResults({ wtpSignals: value });
            }}
            disabled={updating}
            className="w-full px-3 py-2 border rounded-md text-[hsl(var(--text-main))] focus:outline-none focus:ring-2 focus:ring-primary focus:border-[var(--primary)] disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-[hsl(var(--text-muted))]"
            aria-describedby="wtpSignals-hint wtpSignals-threshold"
            aria-busy={updating}
          />
          <p id="wtpSignals-hint" className="sr-only">
            Enter the number of willingness-to-pay signals
          </p>
          <p id="wtpSignals-threshold" className="sr-only">
            Target threshold: {thresholds.wtpSignals}
          </p>
        </div>
      </div>

      {/* Thresholds Display */}
      <div className="space-y-2 mb-4 text-sm" role="region" aria-label="Threshold comparison">
        <div className="flex justify-between">
          <span className="text-[hsl(var(--text-muted))]">Warm Traffic Conversion</span>
          <span className="font-medium text-[hsl(var(--text-main))]" aria-label={`${results.conversionRate || 0} percent out of ${thresholds.warmTrafficConversion} percent target`}>
            {results.conversionRate || 0}% / {thresholds.warmTrafficConversion}%
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[hsl(var(--text-muted))]">DM Reply Rate</span>
          <span className="font-medium text-[hsl(var(--text-main))]" aria-label={`${results.dmReplies || 0} percent out of ${thresholds.dmReplyRate} percent target`}>
            {results.dmReplies || 0}% / {thresholds.dmReplyRate}%
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[hsl(var(--text-muted))]">WTP Signals</span>
          <span className="font-medium text-[hsl(var(--text-main))]" aria-label={`${results.wtpSignals || 0} out of ${thresholds.wtpSignals} target`}>
            {results.wtpSignals || 0} / {thresholds.wtpSignals}
          </span>
        </div>
      </div>

      {/* Check Button */}
      <button
        onClick={checkThresholds}
        disabled={!workflow.results || updating}
        className="w-full px-4 py-2 bg-[var(--primary)] text-[hsl(var(--text-main))] rounded-md hover:bg-[var(--primary)]/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
        aria-describedby="check-thresholds-hint"
      >
        {updating ? (
          <>
            <span aria-hidden="true">Checking...</span>
            <span className="sr-only">Checking thresholds, please wait</span>
          </>
        ) : ("Check Thresholds"
        )}
      </button>
      <p id="check-thresholds-hint" className="sr-only">
        Compares current results against validation thresholds and reports which metrics passed or failed
      </p>
    </div>
  );
}

