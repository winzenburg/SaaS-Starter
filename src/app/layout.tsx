import type { Metadata } from "next";
import Link from "next/link";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { TRPCProvider } from "@/lib/trpc/provider";
import { ErrorBoundary } from "./error-boundary";
import { GlobalNav } from "@/components/navigation/global-nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SaaS Starter",
  description: "A modern SaaS starter template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:font-semibold"
          >
            Skip to main content
          </a>
          <header role="banner" className="glass-header sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                {/* Logo and Main Navigation */}
                <div className="flex items-center gap-6">
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent hover:from-blue-400 hover:to-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-md px-2 py-1 transition-all"
                    aria-label="SaaS Starter - Home"
                  >
                    SaaS Starter
                  </Link>
                  <GlobalNav />
                </div>
                {/* Authentication */}
                <nav role="navigation" aria-label="Authentication" className="flex items-center gap-4">
                  <SignedOut>
                    <SignInButton>
                      <button className="px-4 py-2 text-base font-semibold text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-md transition-colors">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton>
                      <button className="px-6 py-2 bg-blue-600 text-white rounded-md font-semibold text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors">
                        Sign Up
                      </button>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </nav>
              </div>
            </div>
          </header>
          <ErrorBoundary>
            <TRPCProvider>
              <main id="main-content" role="main" className="min-h-screen">
                {children}
              </main>
            </TRPCProvider>
          </ErrorBoundary>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}

