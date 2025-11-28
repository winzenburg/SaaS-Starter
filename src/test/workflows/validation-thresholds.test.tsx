import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { axe } from "jest-axe";
import { ValidationThresholds } from "@/components/workflows/validation-thresholds";
import type { ValidationWorkflow } from "@/lib/workflows/types";

const mockWorkflow: ValidationWorkflow = {
  id: "test-1",
  ideaSlug: "test-idea",
  ideaName: "Test Idea",
  phase: "validation",
  status: "in_progress",
  steps: [],
  thresholds: {
    warmTrafficConversion: 15,
    coldTrafficConversion: 3,
    dmReplyRate: 20,
    wtpSignals: 1,
  },
  results: {
    signups: 0,
    conversionRate: 0,
    dmReplies: 0,
    wtpSignals: 0,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe("ValidationThresholds", () => {
  const mockOnUpdate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock fetch
    global.fetch = vi.fn();
  });

  it("renders all input fields with proper labels", () => {
    render(
      <ValidationThresholds workflow={mockWorkflow} onUpdate={mockOnUpdate} />
    );

    expect(screen.getByLabelText(/signups/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/conversion rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/dm replies/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/wtp signals/i)).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ValidationThresholds workflow={mockWorkflow} onUpdate={mockOnUpdate} />
    );

    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("updates results when input changes", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        workflow: { ...mockWorkflow, results: { ...mockWorkflow.results, signups: 10 } },
      }),
    } as Response);

    render(
      <ValidationThresholds workflow={mockWorkflow} onUpdate={mockOnUpdate} />
    );

    const signupsInput = screen.getByLabelText(/signups/i);
    fireEvent.change(signupsInput, { target: { value: "10" } });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
  });

  it("displays error message when update fails", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error("Network error"));

    render(
      <ValidationThresholds workflow={mockWorkflow} onUpdate={mockOnUpdate} />
    );

    const signupsInput = screen.getByLabelText(/signups/i);
    fireEvent.change(signupsInput, { target: { value: "10" } });

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });

  it("announces status updates to screen readers", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        workflow: mockWorkflow,
      }),
    } as Response);

    render(
      <ValidationThresholds workflow={mockWorkflow} onUpdate={mockOnUpdate} />
    );

    const signupsInput = screen.getByLabelText(/signups/i);
    fireEvent.change(signupsInput, { target: { value: "10" } });

    await waitFor(() => {
      const statusRegion = screen.getByRole("status");
      expect(statusRegion).toBeInTheDocument();
    });
  });
});

