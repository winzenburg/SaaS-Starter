/**
 * Global Navigation Component
 * 
 * Provides consistent navigation across the entire SaaS Starter application
 * Uses shadcn/ui NavigationMenu for standard, accessible navigation
 * WCAG 2.2 AA compliant with proper contrast, keyboard navigation, and ARIA labels
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface NavLink {
  href: string;
  label: string;
  description?: string;
}

const mainNavLinks: NavLink[] = [
  {
    href: "/",
    label: "Home",
    description: "SaaS Starter home page",
  },
  {
    href: "/hub",
    label: "Portfolio",
    description: "View and manage your SaaS portfolio",
  },
  {
    href: "/workflows",
    label: "Workflows",
    description: "Discovery and validation workflows",
  },
];

export function GlobalNav() {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-1">
        {mainNavLinks.map((link) => {
          const isActive = pathname === link.href || 
            (link.href !== "/" && pathname?.startsWith(link.href));
          
          return (
            <NavigationMenuItem key={link.href}>
              <NavigationMenuLink asChild>
                <Link
                  href={link.href}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent text-gray-300 hover:bg-slate-800 hover:text-white data-[active]:bg-blue-600 data-[active]:text-white",
                    isActive && "bg-blue-600 text-white hover:bg-blue-700"
                  )}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={link.description || link.label}
                >
                  {link.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

