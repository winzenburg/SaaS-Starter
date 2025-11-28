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
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      return null;
    }

    // Parse connection string to check if SSL is needed
    const url = new URL(connectionString);
    const isSupabase = url.hostname.includes("supabase.com") || url.hostname.includes("pooler.supabase.com");
    const needsSSL = url.hostname !== "localhost" && url.hostname !== "127.0.0.1";
    
    poolInstance = new Pool({
      connectionString,
      // Add SSL configuration for remote databases
      // Supabase requires SSL but may use self-signed certificates
      ...(needsSSL && {
        ssl: process.env.DATABASE_SSL === "false" ? false : {
          rejectUnauthorized: isSupabase ? false : (process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== "false"),
        },
      }),
      // Connection timeout
      connectionTimeoutMillis: 10000,
      // Query timeout
      query_timeout: 10000,
    });

    // Handle connection errors
    poolInstance.on("error", (err) => {
      console.error("Unexpected database pool error:", err);
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

