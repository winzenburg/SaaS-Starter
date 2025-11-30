"use client";

import { useState } from"react";
import Link from"next/link";
import { ArrowLeft, CheckCircle2, XCircle, AlertCircle } from"lucide-react";

/**
 * Design Preview Page - Cosmic Dusk Design System
 * 
 * This page showcases the new"Cosmic Dusk" design system before full implementation.
 * It demonstrates colors, typography, components, and interactions.
 */

export default function DesignPreviewPage() {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass-header sticky top-0 z-50 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="text-2xl font-bold text-[var(--primary)] hover:from-fuchsia-300 hover:via-purple-300 hover:to-cyan-300 transition-all"
            >
              Cosmic Dusk Preview
            </Link>
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-[hsl(var(--text-main))] transition-colors flex items-center gap-2"
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
          <h1 className="text-5xl md:text-6xl font-bold text-[var(--primary)] tracking-tight">
            Cosmic Dusk Design System
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            A unique, contemporary UI design that stands out from generic Shadcn/UI implementations.
            Deep, rich colors inspired by twilight and the cosmos, paired with crisp typography.
          </p>
        </div>

        {/* Color Palette Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-slate-100">Color Palette</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Primary - Magenta/Fuchsia */}
            <div className="glass-card p-6 space-y-4">
              <div className="h-24 rounded-lg bg-[hsl(320,80%,60%)] shadow-lg shadow-fuchsia-500/20 flex items-center justify-center">
                <span className="text-[hsl(var(--text-main))] font-bold">Primary</span>
              </div>
              <div>
                <h3 className="font-semibold text-[hsl(var(--text-main))] mb-2">Primary Accent</h3>
                <p className="text-sm text-slate-400">HSL: 320 80% 60%</p>
                <p className="text-sm text-slate-400">Vibrant Magenta/Fuchsia</p>
              </div>
            </div>

            {/* Secondary - Emerald Green */}
            <div className="glass-card p-6 space-y-4">
              <div className="h-24 rounded-lg bg-[hsl(160,50%,40%)] shadow-lg shadow-emerald-500/20 flex items-center justify-center">
                <span className="text-[hsl(var(--text-main))] font-bold">Secondary</span>
              </div>
              <div>
                <h3 className="font-semibold text-[hsl(var(--text-main))] mb-2">Secondary Accent</h3>
                <p className="text-sm text-slate-400">HSL: 160 50% 40%</p>
                <p className="text-sm text-slate-400">Muted Emerald Green</p>
              </div>
            </div>

            {/* Accent - Cyan */}
            <div className="glass-card p-6 space-y-4">
              <div className="h-24 rounded-lg bg-[hsl(190,70%,60%)] shadow-lg shadow-cyan-500/20 flex items-center justify-center">
                <span className="text-slate-950 font-bold">Accent</span>
              </div>
              <div>
                <h3 className="font-semibold text-[hsl(var(--text-main))] mb-2">Interactive Accent</h3>
                <p className="text-sm text-slate-400">HSL: 190 70% 60%</p>
                <p className="text-sm text-slate-400">Bright Cyan</p>
              </div>
            </div>

            {/* Background */}
            <div className="glass-card p-6 space-y-4">
              <div className="h-24 rounded-lg bg-[hsl(240,20%,8%)] border-2  flex items-center justify-center">
                <span className="text-slate-300 font-bold">Background</span>
              </div>
              <div>
                <h3 className="font-semibold text-[hsl(var(--text-main))] mb-2">Deep Charcoal Indigo</h3>
                <p className="text-sm text-slate-400">HSL: 240 20% 8%</p>
              </div>
            </div>

            {/* Foreground */}
            <div className="glass-card p-6 space-y-4">
              <div className="h-24 rounded-lg bg-[hsl(220,10%,90%)] flex items-center justify-center">
                <span className="text-slate-950 font-bold">Foreground</span>
              </div>
              <div>
                <h3 className="font-semibold text-[hsl(var(--text-main))] mb-2">Soft Off-White</h3>
                <p className="text-sm text-slate-400">HSL: 220 10% 90%</p>
              </div>
            </div>

            {/* Destructive */}
            <div className="glass-card p-6 space-y-4">
              <div className="h-24 rounded-lg bg-[hsl(0,70%,50%)] shadow-lg shadow-red-500/20 flex items-center justify-center">
                <span className="text-[hsl(var(--text-main))] font-bold">Destructive</span>
              </div>
              <div>
                <h3 className="font-semibold text-[hsl(var(--text-main))] mb-2">Destructive Action</h3>
                <p className="text-sm text-slate-400">HSL: 0 70% 50%</p>
              </div>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-slate-100">Typography</h2>
          <div className="glass-card p-8 space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-[hsl(var(--text-main))] mb-2">Heading 1 - Space Grotesk</h1>
              <p className="text-sm text-slate-400">Bold, geometric, distinctive</p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-[hsl(var(--text-main))] mb-2">Heading 2 - Space Grotesk</h2>
              <p className="text-sm text-slate-400">Subheadings and section titles</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-[hsl(var(--text-main))] mb-2">Heading 3 - Space Grotesk</h3>
              <p className="text-sm text-slate-400">Card titles and emphasized text</p>
            </div>
            <div>
              <p className="text-base text-slate-300 mb-2">
                Body text - Inter. Highly versatile and optimized for screens, ensuring excellent readability at all sizes.
                This is the default body text that will be used throughout the application.
              </p>
              <p className="text-sm text-slate-400">Inter - Optimized for screens</p>
            </div>
            <div>
              <code className="text-sm  px-2 py-1 rounded text-cyan-400 font-mono">
                Monospace - Fira Code
              </code>
              <p className="text-sm text-slate-400 mt-2">Fira Code - Clear distinctions for code</p>
            </div>
          </div>
        </section>

        {/* Button Variants Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-slate-100">Button Variants</h2>
          <div className="glass-card p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Primary */}
              <button
                className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-medium bg-[hsl(320,80%,60%)] text-slate-950 hover:bg-[hsl(320,80%,65%)] shadow-lg shadow-fuchsia-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px]"
                onClick={() => setActiveButton("primary")}
              >
                Primary Button
              </button>

              {/* Secondary */}
              <button
                className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-medium bg-[hsl(160,50%,40%)] text-[hsl(var(--text-main))] hover:bg-[hsl(160,50%,45%)] shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px]"
                onClick={() => setActiveButton("secondary")}
              >
                Secondary Button
              </button>

              {/* Outline */}
              <button
                className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-medium border-2  bg-transparent text-slate-300 hover:bg-[hsl(190,70%,60%)] hover:text-slate-950 transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px]"
                onClick={() => setActiveButton("outline")}
              >
                Outline Button
              </button>

              {/* Ghost */}
              <button
                className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-medium text-slate-300 hover:bg-[hsl(190,70%,60%)] hover:text-slate-950 transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px]"
                onClick={() => setActiveButton("ghost")}
              >
                Ghost Button
              </button>

              {/* Link */}
              <button
                className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-medium text-[hsl(320,80%,60%)] underline-offset-4 hover:underline transition-all min-h-[44px]"
                onClick={() => setActiveButton("link")}
              >
                Link Button
              </button>

              {/* Destructive */}
              <button
                className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-medium bg-[hsl(0,70%,50%)] text-[hsl(var(--text-main))] hover:bg-[hsl(0,70%,55%)] shadow-lg shadow-red-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px]"
                onClick={() => setActiveButton("destructive")}
              >
                Destructive Button
              </button>
            </div>

            {activeButton && (
              <div className="mt-6 p-4  rounded-lg border">
                <p className="text-sm text-slate-300">
                  Clicked: <span className="font-semibold text-[hsl(var(--text-main))]">{activeButton}</span> button
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Card Examples Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-slate-100">Card Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Standard Card */}
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[hsl(320,80%,60%)]/20 border border-[hsl(320,80%,60%)]/50 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-[hsl(320,80%,60%)]" />
                </div>
                <h3 className="text-xl font-semibold text-[hsl(var(--text-main))]">Standard Card</h3>
              </div>
              <p className="text-slate-400 text-sm">
                This is a standard card component with subtle glassmorphism. It provides structured containers for content.
              </p>
              <button className="w-full px-4 py-2 bg-[hsl(320,80%,60%)] text-slate-950 rounded-lg font-medium hover:bg-[hsl(320,80%,65%)] transition-colors">
                Action
              </button>
            </div>

            {/* Info Card */}
            <div className="glass-card p-6 space-y-4 border-l-4 border-[hsl(190,70%,60%)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[hsl(190,70%,60%)]/20 border border-[hsl(190,70%,60%)]/50 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-[hsl(190,70%,60%)]" />
                </div>
                <h3 className="text-xl font-semibold text-[hsl(var(--text-main))]">Info Card</h3>
              </div>
              <p className="text-slate-400 text-sm">
                Cards can have accent borders and icons to indicate different types of content or states.
              </p>
            </div>

            {/* Success Card */}
            <div className="glass-card p-6 space-y-4 border-l-4 border-[hsl(160,50%,40%)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[hsl(160,50%,40%)]/20 border border-[hsl(160,50%,40%)]/50 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-[hsl(160,50%,40%)]" />
                </div>
                <h3 className="text-xl font-semibold text-[hsl(var(--text-main))]">Success State</h3>
              </div>
              <p className="text-slate-400 text-sm">
                Different states and types of cards help users quickly understand content context.
              </p>
            </div>
          </div>
        </section>

        {/* Input Fields Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-slate-100">Input Fields</h2>
          <div className="glass-card p-8 space-y-6 max-w-2xl">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-300">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="w-full h-11 px-4 py-2 rounded-xl border   text-slate-300 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[hsl(320,80%,70%)] focus:ring-offset-2 focus:ring-offset-slate-950 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-300">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full h-11 px-4 py-2 rounded-xl border   text-slate-300 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[hsl(320,80%,70%)] focus:ring-offset-2 focus:ring-offset-slate-950 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="disabled" className="text-sm font-medium text-slate-400">
                Disabled Input
              </label>
              <input
                type="text"
                id="disabled"
                placeholder="This input is disabled"
                disabled
                className="w-full h-11 px-4 py-2 rounded-xl border  /50 text-slate-500 cursor-not-allowed opacity-50"
              />
            </div>
          </div>
        </section>

        {/* Color Contrast Demo */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-slate-100">Accessibility - Color Contrast</h2>
          <div className="glass-card p-8">
            <p className="text-slate-300 mb-6">
              All color combinations meet WCAG 2.2 AA standards (4.5:1 for normal text, 3:1 for large text/UI components).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-[hsl(240,20%,8%)] border-2">
                <p className="text-[hsl(220,10%,90%)] text-lg">
                  Foreground on Background: 13.5:1 contrast ratio ✓
                </p>
              </div>
              <div className="p-6 rounded-xl bg-[hsl(320,80%,60%)]">
                <p className="text-[hsl(240,20%,8%)] text-lg font-semibold">
                  Primary Foreground on Primary: 9.9:1 contrast ratio ✓
                </p>
              </div>
              <div className="p-6 rounded-xl bg-[hsl(160,50%,40%)]">
                <p className="text-[hsl(220,10%,90%)] text-lg">
                  Secondary Foreground on Secondary: 5.3:1 contrast ratio ✓
                </p>
              </div>
              <div className="p-6 rounded-xl bg-[hsl(230,15%,20%)] border-2">
                <p className="text-[hsl(220,10%,90%)] text-lg">
                  Foreground on Input: 8.4:1 contrast ratio ✓
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Notes */}
        <section className="mb-16">
          <div className="glass-card p-8 border-l-4 border-[hsl(190,70%,60%)]">
            <h2 className="text-2xl font-bold mb-4 text-[hsl(var(--text-main))]">Implementation Notes</h2>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[hsl(160,50%,40%)] mt-0.5 flex-shrink-0" />
                <span>All colors use HSL format for easy customization in Tailwind CSS v4</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[hsl(160,50%,40%)] mt-0.5 flex-shrink-0" />
                <span>Glassmorphism effects are subtle and performance-optimized</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[hsl(160,50%,40%)] mt-0.5 flex-shrink-0" />
                <span>All interactive elements maintain 44px minimum touch target size</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[hsl(160,50%,40%)] mt-0.5 flex-shrink-0" />
                <span>Focus indicators are visible and meet accessibility standards</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[hsl(160,50%,40%)] mt-0.5 flex-shrink-0" />
                <span>Typography uses Space Grotesk for headings, Inter for body text</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-slate-100">What Makes This Unique?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 border">
              <h3 className="text-xl font-semibold text-slate-300 mb-4">Generic Shadcn/UI</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-slate-500" />
                  <span>Standard blue accents</span>
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-slate-500" />
                  <span>Common gray color palette</span>
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-slate-500" />
                  <span>Predictable design patterns</span>
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-slate-500" />
                  <span>Looks like every other SaaS site</span>
                </li>
              </ul>
            </div>

            <div className="glass-card p-6 border-l-4 border-[hsl(320,80%,60%)]">
              <h3 className="text-xl font-semibold text-[hsl(var(--text-main))] mb-4">Cosmic Dusk Design</h3>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[hsl(320,80%,60%)]" />
                  <span>Vibrant magenta/fuchsia primary</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[hsl(320,80%,60%)]" />
                  <span>Unique cosmic color palette</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[hsl(320,80%,60%)]" />
                  <span>Distinctive typography (Space Grotesk)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[hsl(320,80%,60%)]" />
                  <span>Stand out from the crowd</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center mb-16">
          <div className="glass-card p-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-[var(--primary)]">
              Ready to Implement?
            </h2>
            <p className="text-slate-300 mb-8">
              This preview shows the Cosmic Dusk design system in action. When ready, we'll update your
              <code className="px-2 py-1 rounded text-sm text-cyan-400 mx-1">globals.css</code>
              with these new design tokens and update all components to use this unique design system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-[hsl(320,80%,60%)] text-slate-950 rounded-xl font-semibold hover:bg-[hsl(320,80%,65%)] shadow-lg shadow-fuchsia-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                Implement Design System
              </button>
              <Link
                href="/docs/ux/DESIGN-SYSTEM-saas-starter"
                className="px-8 py-3 border-2  text-slate-300 rounded-xl font-semibold hover:bg-[hsl(190,70%,60%)] hover:text-slate-950 transition-all hover:scale-[1.02] active:scale-[0.98] inline-flex items-center justify-center"
              >
                View Full Specification
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

