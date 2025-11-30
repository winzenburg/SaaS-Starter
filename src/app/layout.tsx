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
import { Fraunces, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { TRPCProvider } from "@/lib/trpc/provider";
import { ErrorBoundary } from "./error-boundary";
import { GlobalNav } from "@/components/navigation/global-nav";
import "./globals.css";

// SynthFlow Typography: Fraunces (variable serif) for headings, Outfit for body
const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
      <html lang="en" className={`${fraunces.variable} ${outfit.variable}`} suppressHydrationWarning>
        <body className="antialiased" suppressHydrationWarning>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-xl focus:font-semibold"
          >
            Skip to main content
          </a>
          {/* Marketing Header - Hidden on product routes */}
          <header 
            role="banner" 
            className="marketing-header sticky top-0 z-50 bg-white border-b border-gray-200"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center gap-6">
                  <Link
                    href="/"
                    className="text-xl font-display font-semibold"
                    aria-label="SaaS Starter - Home"
                  >
                    SaaS Starter
                  </Link>
                  <GlobalNav />
                </div>
                <nav role="navigation" aria-label="Authentication" className="flex items-center gap-4">
                  <SignedOut>
                    <SignInButton>
                      <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton>
                      <button className="px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90">
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
