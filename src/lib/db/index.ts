import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

let dbInstance: ReturnType<typeof drizzle> | null = null;
let poolInstance: Pool | null = null;

/**
 * Get database connection (lazy initialization)
 * Returns null if DATABASE_URL is not set (e.g., during build)
 */
function getDbConnection() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  if (!poolInstance) {
    poolInstance = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }

  if (!dbInstance) {
    dbInstance = drizzle(poolInstance, { schema });
  }

  return dbInstance;
}

/**
 * Get database instance
 * Throws error if DATABASE_URL is not set (for runtime use)
 */
export function getDb() {
  const db = getDbConnection();
  if (!db) {
    throw new Error("DATABASE_URL is not set");
  }
  return db;
}

/**
 * Database instance (lazy)
 * Use getDb() for safer access that handles missing env vars
 */
export const db = getDbConnection();

