"use client";

import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

interface ProductHeaderProps {
  onMenuClick?: () => void;
}

export function ProductHeader({ onMenuClick }: ProductHeaderProps) {
  return (
    <header className="product-header">
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">S</span>
          </div>
          <span className="font-semibold text-base">SaaS Starter</span>
        </div>
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="search"
              placeholder="Search workflows, data, or commands"
              className="pl-10 pr-4 py-2 w-full rounded-lg text-sm border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
        </Button>
        <div className="h-6 w-px bg-border"></div>
        <SignedOut>
          <Link href="/sign-in">
            <Button variant="ghost" className="text-sm">
              Log In
            </Button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  );
}
