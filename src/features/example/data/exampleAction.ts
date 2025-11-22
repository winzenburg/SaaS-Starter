"use server";

import { exampleSchema } from "../domain/exampleSchema";

/**
 * Example server action
 * Demonstrates the data layer structure
 */
export async function exampleAction(formData: FormData) {
  const validated = exampleSchema.safeParse({
    email: formData.get("email"),
    name: formData.get("name"),
  });

  if (!validated.success) {
    return {
      success: false as const,
      error: "Validation failed",
      issues: validated.error.issues,
    };
  }

  // Process the validated data
  // In a real feature, this would interact with the database, etc.

  return {
    success: true as const,
    data: validated.data,
  };
}

