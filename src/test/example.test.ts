import { describe, it, expect } from "vitest";
import { emailSchema } from "@/lib/validation";

describe("validation", () => {
  it("validates email addresses", () => {
    expect(emailSchema.safeParse("test@example.com").success).toBe(true);
    expect(emailSchema.safeParse("invalid-email").success).toBe(false);
  });
});

