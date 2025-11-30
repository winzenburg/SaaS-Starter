import type { Metadata } from "next";
import "../marketing.css";

export const metadata: Metadata = {
  title: "Ketamine - Meditation Journey Music Mobile App | Transform Burnout to Breakthrough",
  description: "Experience profound transformation through guided ketamine-assisted meditation journeys. Join thousands of tech leaders on a journey to renewal.",
};

export default function KetamineLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Standalone layout - no SaaS Starter navigation or branding
  return <>{children}</>;
}

