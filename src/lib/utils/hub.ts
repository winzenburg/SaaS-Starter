/**
 * Hub page utility functions
 * Extracted from hub page to follow UI component rules
 */

import type { VariantProps } from "class-variance-authority";

/**
 * Get Badge variant for project status
 */
export function getStatusBadgeVariant(
  status: string
): VariantProps<typeof import("@/components/ui/badge").badgeVariants>["variant"] {
  const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    validation: "secondary",
    engineering: "default",
    growth: "default",
    maintenance: "secondary",
    killed: "destructive",
  };
  return variants[status] || "secondary";
}

/**
 * Get Badge variant for verdict
 */
export function getVerdictBadgeVariant(
  verdict?: string
): VariantProps<typeof import("@/components/ui/badge").badgeVariants>["variant"] {
  if (!verdict) return "secondary";
  
  const upper = verdict.toUpperCase();
  if (upper.includes("PROCEED")) return "default";
  if (upper.includes("PIVOT")) return "secondary";
  if (upper.includes("KILL")) return "destructive";
  
  return "secondary";
}

/**
 * Get text color class for portfolio score
 * Note: This is for text color only, not component styling
 */
export function getScoreTextColor(score?: number): string {
  if (!score) return "text-muted-foreground";
  if (score >= 30) return "text-green-400 font-bold";
  if (score >= 25) return "text-[var(--primary)] font-bold";
  if (score >= 20) return "text-yellow-400 font-semibold";
  return "text-muted-foreground font-semibold";
}

/**
 * Get priority label for portfolio score
 */
export function getPriorityLabel(score?: number): string {
  if (!score) return "—";
  if (score >= 30) return "⭐⭐⭐⭐⭐ Top Priority";
  if (score >= 25) return "⭐⭐⭐⭐ High Priority";
  if (score >= 20) return "⭐⭐⭐ Medium Priority";
  if (score >= 15) return "⭐⭐ Low Priority";
  return "⭐ Kill";
}

/**
 * Format verdict for display
 */
export function formatVerdict(verdict?: string): string {
  if (!verdict) return "";
  const upper = verdict.toUpperCase();
  if (upper.includes("PROCEED")) return "✅ PROCEED";
  if (upper.includes("PIVOT")) return "⚠️ PIVOT";
  if (upper.includes("KILL")) return "❌ KILL";
  return verdict;
}


