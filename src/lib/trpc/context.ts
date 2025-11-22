import { db } from "@/lib/db";

/**
 * Create tRPC context
 */
export async function createContext() {
  return {
    db,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;

