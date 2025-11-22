import { z } from "zod";
import { emailSchema } from "@/lib/validation";

/**
 * Example feature schema
 * This demonstrates the domain layer structure
 */
export const exampleSchema = z.object({
  email: emailSchema,
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
});

export type ExampleInput = z.infer<typeof exampleSchema>;

