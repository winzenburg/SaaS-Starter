"use client";

import { Search, Menu, Bell, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
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

        {/* Search bar with keyboard shortcut */}
        <div className="flex-1 max-w-lg flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="search"
              placeholder="Search workflows, data, or commands..."
              className="pl-10 py-2 w-full rounded-lg text-sm border border-border bg-muted/30 focus:outline-none focus:ring-1 focus:ring-ring focus:bg-background transition-colors"
            />
          </div>
          <span className="text-xs text-slate-400 select-none font-medium whitespace-nowrap">
            Cmd+K
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="w-5 h-5" />
        </Button>
        <div className="h-5 w-px bg-border"></div>
        <SignedOut>
          <Link href="/sign-in">
            <Button variant="ghost" className="text-sm font-medium">
              LOG IN
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
