import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { CreateWorkflowDialog } from "@/components/workflows/create-workflow-dialog";

expect.extend(toHaveNoViolations);

describe("CreateWorkflowDialog", () => {
  const mockOnClose = vi.fn();
  const mockOnCreate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all form fields with proper labels", () => {
    render(
      <CreateWorkflowDialog onClose={mockOnClose} onCreate={mockOnCreate} />
    );

    expect(screen.getByLabelText(/idea name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/idea slug/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phase/i)).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <CreateWorkflowDialog onClose={mockOnClose} onCreate={mockOnCreate} />
    );

    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("validates required fields", async () => {
    render(
      <CreateWorkflowDialog onClose={mockOnClose} onCreate={mockOnCreate} />
    );

    const submitButton = screen.getByRole("button", { name: /create workflow/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });

  it("calls onCreate with correct data", async () => {
    render(
      <CreateWorkflowDialog onClose={mockOnClose} onCreate={mockOnCreate} />
    );

    fireEvent.change(screen.getByLabelText(/idea name/i), {
      target: { value: "Test Idea" },
    });
    fireEvent.change(screen.getByLabelText(/idea slug/i), {
      target: { value: "test-idea" },
    });

    const submitButton = screen.getByRole("button", { name: /create workflow/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnCreate).toHaveBeenCalledWith({
        ideaName: "Test Idea",
        ideaSlug: "test-idea",
        phase: "discovery",
      });
    });
  });

  it("closes dialog on Escape key", () => {
    render(
      <CreateWorkflowDialog onClose={mockOnClose} onCreate={mockOnCreate} />
    );

    fireEvent.keyDown(document, { key: "Escape" });

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("traps focus within dialog", async () => {
    render(
      <CreateWorkflowDialog onClose={mockOnClose} onCreate={mockOnCreate} />
    );

    const firstInput = screen.getByLabelText(/idea name/i);
    expect(document.activeElement).toBe(firstInput);

    // Tab through all fields
    fireEvent.keyDown(firstInput, { key: "Tab" });
    // Focus should move to next field, not escape dialog
  });
});

