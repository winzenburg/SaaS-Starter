import { pgTable, text, timestamp, uuid, jsonb } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

/**
 * Example User table
 * Customize this schema for your SaaS needs
 */
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

/**
 * Workflows table
 * Stores discovery and validation workflows
 */
export const workflows = pgTable("workflows", {
  id: uuid("id").defaultRandom().primaryKey(),
  ideaSlug: text("idea_slug").notNull(),
  ideaName: text("idea_name").notNull(),
  phase: text("phase").notNull(), // "discovery" | "validation" | "build" | "scale"
  status: text("status").notNull(), // "pending" | "in_progress" | "completed" | "failed" | "paused"
  // Store the entire workflow object as JSONB for flexibility
  workflowData: jsonb("workflow_data").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type WorkflowRow = typeof workflows.$inferSelect;
export type NewWorkflowRow = typeof workflows.$inferInsert;

