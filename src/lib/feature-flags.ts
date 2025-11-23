/**
 * Feature flag utilities
 * Use Vercel Feature Flags for safe rollouts
 * 
 * Note: For flags v4, use the flags API directly in your components/routes.
 * This is a placeholder utility that can be extended when flags are configured.
 */

export async function isFeatureEnabled(
  _flagName: string,
  defaultValue = false,
): Promise<boolean> {
  // TODO: Implement flags v4 API when flags are configured
  // For now, return default value to allow builds to succeed
  // 
  // Example implementation once flags are set up:
  // import { flags } from "flags/next";
  // const flagValues = await flags();
  // return flagValues[flagName] ?? defaultValue;
  
  return defaultValue;
}

/**
 * Client-side feature flag hook
 * Use this in client components
 * 
 * Example:
 * ```tsx
 * 'use client';
 * import { useFeatureFlag } from '@/lib/feature-flags';
 * 
 * export function MyComponent() {
 *   const isEnabled = useFeatureFlag('my-feature');
 *   return isEnabled ? <NewFeature /> : <OldFeature />;
 * }
 * ```
 */
export function useFeatureFlag(_flagName: string, defaultValue = false): boolean {
  // TODO: Implement client-side flags hook when flags are configured
  // For now, return default value to allow builds to succeed
  // 
  // Example implementation once flags are set up:
  // import { useFlags } from 'flags/react';
  // const flags = useFlags();
  // return flags[flagName] ?? defaultValue;
  
  return defaultValue;
}

