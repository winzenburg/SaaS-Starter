import { getFlag } from "flags/next";

/**
 * Feature flag utilities
 * Use Vercel Feature Flags for safe rollouts
 */

export async function isFeatureEnabled(
  flagName: string,
  defaultValue = false,
): Promise<boolean> {
  try {
    const flag = await getFlag(flagName);
    return flag === true;
  } catch {
    // Fallback to default if flag service is unavailable
    return defaultValue;
  }
}

