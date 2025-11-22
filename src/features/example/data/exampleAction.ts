"use server";

import { exampleSchema } from "../domain/exampleSchema";

export type ExampleActionState =
  | { success: false; error: string; issues: unknown[] }
  | { success: true; data: { email: string; name: string } }
  | null;

/**
 * Example server action
 * Demonstrates the data layer structure
 * Compatible with React 19 useFormState API
 */
export async function exampleAction(
  prevState: ExampleActionState,
  formData: FormData,
): Promise<ExampleActionState> {
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

