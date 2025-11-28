/**
 * Date Display Component
 * 
 * Client-side date formatting to avoid hydration mismatches
 */

"use client";

import { useEffect, useState } from "react";
import { formatDate, formatDateTime } from "@/lib/utils/date";

interface DateDisplayProps {
  date: string | Date;
  format?: "date" | "datetime";
  className?: string;
}

export function DateDisplay({ date, format = "date", className }: DateDisplayProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR, show a placeholder or simple format
  if (!mounted) {
    return <span className={className}>{formatDate(date)}</span>;
  }

  // After hydration, show the formatted date
  return (
    <span className={className}>
      {format === "datetime" ? formatDateTime(date) : formatDate(date)}
    </span>
  );
}

