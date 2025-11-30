"use client";

import Link from "next/link";
import { ArrowLeft, Palette } from "lucide-react";

/**
 * Design Demos Hub
 * 
 * Overview page for exploring different design approaches
 */

export default function DesignDemosPage() {
  const demos = [
    {
      slug: "strategic-minimalist",
      title: "Strategic Minimalist",
      description: "Deep charcoal background, Red Dot Red accent, monospace typography, bento grid layout",
      keyFeatures: [
        "Red Dot Red accent (#FF4D00)",
        "Monospace body font",
        "Bento grid portfolio",
        "Large, bold typography",
        "Minimal, focused aesthetic",
      ],
      accentColor: "#FF4D00",
    },
    {
      slug: "organic-soft",
      title: "Organic Soft",
      description: "Light gradient background, glass morphism cards, soft coral accent, ambient orb animation",
      keyFeatures: [
        "Soft coral accent (#ff8c69)",
        "Glass morphism cards",
        "Serif typography (Georgia)",
        "Ambient floating orb animation",
        "Pill-shaped stat badges",
        "Light gradient background",
      ],
      accentColor: "#ff8c69",
    },
    {
      slug: "systemic",
      title: "Systemic",
      description: "Grid-based layout, black borders, monospace typography, International Klein Blue accent",
      keyFeatures: [
        "Grid-based layout with black borders",
        "Monospace typography (Courier)",
        "International Klein Blue accent (#0044FF)",
        "Table-style project rows",
        "Scrolling ticker animation",
        "Technical/architectural aesthetic",
      ],
      accentColor: "#0044FF",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="glass-header sticky top-0 z-50 border-b border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-2xl font-bold font-heading bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent hover:from-fuchsia-300 hover:via-purple-300 hover:to-cyan-300 transition-all"
              >
                SaaS Starter
              </Link>
              <span className="px-3 py-1 text-sm font-medium text-slate-400 bg-slate-800/50 border border-slate-700 rounded-lg">
                Design Demos
              </span>
            </div>
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--primary)]/20 border border-[var(--primary)]/50 mb-4">
            <Palette className="w-8 h-8 text-[var(--primary)]" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-heading bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
            Design Approach Demos
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Explore different design approaches and visual styles to find the perfect aesthetic for
            your SaaS product.
          </p>
        </div>

        {/* Demo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {demos.map((demo) => (
            <Link
              key={demo.slug}
              href={`/design-demos/${demo.slug}`}
              className="group glass-card p-6 space-y-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-700 hover:border-slate-600"
            >
              <div
                className="w-full h-2 rounded-full mb-4"
                style={{ backgroundColor: demo.accentColor }}
              />
              <div className="flex items-start justify-between">
                <h2 className="text-2xl font-semibold text-white group-hover:text-[var(--primary)] transition-colors">
                  {demo.title}
                </h2>
                {demo.slug === "coming-soon-2" || demo.slug === "coming-soon-3" ? (
                  <span className="px-2 py-1 text-xs font-medium bg-slate-800 text-slate-400 rounded">
                    Soon
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs font-medium bg-[var(--primary)]/20 text-[var(--primary)] rounded">
                    Live
                  </span>
                )}
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{demo.description}</p>
              <div className="pt-4 border-t border-slate-700">
                <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
                  Key Features
                </p>
                <ul className="space-y-1">
                  {demo.keyFeatures.map((feature, index) => (
                    <li key={index} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-[var(--primary)] mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4">
                <span className="text-sm font-semibold text-[var(--primary)] group-hover:text-[var(--primary)]/80 transition-colors inline-flex items-center gap-2">
                  View Demo
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Section */}
        <div className="glass-card p-8 border-l-4 border-[var(--primary)] max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-white">About Design Demos</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            These demo pages showcase different design approaches and visual styles. Each demo is a
            standalone exploration that you can use as inspiration for your SaaS product.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Once you&apos;ve explored the demos, you can choose your favorite approach and we&apos;ll
            implement it across your entire site.
          </p>
        </div>
      </main>
    </div>
  );
}

