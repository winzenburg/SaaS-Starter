/**
 * Database operations for workflows
 */

import { eq, desc } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { workflows } from "@/lib/db/schema";
import type { Workflow } from "./types";

/**
 * Save a workflow to the database
 */
export async function saveWorkflow(workflow: Workflow): Promise<Workflow> {
  const db = getDb();

  const existing = await db
    .select()
    .from(workflows)
    .where(eq(workflows.id, workflow.id))
    .limit(1);

  if (existing.length > 0) {
    // Update existing workflow
    const [updated] = await db
      .update(workflows)
      .set({
        ideaSlug: workflow.ideaSlug,
        ideaName: workflow.ideaName,
        phase: workflow.phase,
        status: workflow.status,
        workflowData: workflow as unknown as Record<string, unknown>,
        updatedAt: new Date(),
      })
      .where(eq(workflows.id, workflow.id))
      .returning();

    return updated.workflowData as Workflow;
  } else {
    // Insert new workflow
    const [inserted] = await db
      .insert(workflows)
      .values({
        id: workflow.id,
        ideaSlug: workflow.ideaSlug,
        ideaName: workflow.ideaName,
        phase: workflow.phase,
        status: workflow.status,
        workflowData: workflow as unknown as Record<string, unknown>,
      })
      .returning();

    return inserted.workflowData as Workflow;
  }
}

/**
 * Load a workflow by ID
 */
export async function loadWorkflow(workflowId: string): Promise<Workflow | null> {
  const db = getDb();

  const [result] = await db
    .select()
    .from(workflows)
    .where(eq(workflows.id, workflowId))
    .limit(1);

  if (!result) {
    return null;
  }

  return result.workflowData as Workflow;
}

/**
 * List all workflows
 */
export async function listWorkflows(): Promise<Workflow[]> {
  const db = getDb();

  const results = await db
    .select()
    .from(workflows)
    .orderBy(desc(workflows.createdAt));

  return results.map((row) => row.workflowData as Workflow);
}

/**
 * List workflows by phase
 */
export async function listWorkflowsByPhase(
  phase: Workflow["phase"]
): Promise<Workflow[]> {
  const db = getDb();

  const results = await db
    .select()
    .from(workflows)
    .where(eq(workflows.phase, phase))
    .orderBy(desc(workflows.createdAt));

  return results.map((row) => row.workflowData as Workflow);
}

/**
 * List workflows by project slug (ideaSlug)
 */
export async function listWorkflowsByProject(
  projectSlug: string
): Promise<Workflow[]> {
  const db = getDb();

  const results = await db
    .select()
    .from(workflows)
    .where(eq(workflows.ideaSlug, projectSlug))
    .orderBy(desc(workflows.createdAt));

  return results.map((row) => row.workflowData as Workflow);
}

/**
 * Get workflow counts by project slug
 */
export async function getWorkflowCountsByProject(
  projectSlug: string
): Promise<{
  total: number;
  byPhase: Record<string, number>;
  active: number;
}> {
  const db = getDb();

  const results = await db
    .select()
    .from(workflows)
    .where(eq(workflows.ideaSlug, projectSlug));

  const workflows = results.map((row) => row.workflowData as Workflow);
  
  const byPhase: Record<string, number> = {};
  let active = 0;

  workflows.forEach((workflow) => {
    byPhase[workflow.phase] = (byPhase[workflow.phase] || 0) + 1;
    if (workflow.status === "in_progress" || workflow.status === "pending") {
      active++;
    }
  });

  return {
    total: workflows.length,
    byPhase,
    active,
  };
}

/**
 * Delete a workflow
 */
export async function deleteWorkflow(workflowId: string): Promise<boolean> {
  const db = getDb();

  const result = await db.delete(workflows).where(eq(workflows.id, workflowId));

  return result.rowCount ? result.rowCount > 0 : false;
}

