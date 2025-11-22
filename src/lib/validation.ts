import { z } from "zod";

/**
 * Common validation schemas and helpers
 * Use these as building blocks for feature-specific schemas
 */

export const emailSchema = z.string().email("Invalid email address");

export const cuidSchema = z.string().cuid();

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type PaginationInput = z.infer<typeof paginationSchema>;

