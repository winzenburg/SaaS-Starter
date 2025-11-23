import { getDb } from "@/lib/db";

/**
 * Create tRPC context
 */
export async function createContext() {
  return {
    db: getDb(),
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;

