"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Workflow, Settings, Users, ChevronLeft, ChevronRight, Sprout } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const platformItems: NavItem[] = [
  { name: "OVERVIEW", href: "/hub", icon: LayoutDashboard },
  { name: "WORKFLOWS", href: "/workflows", icon: Workflow },
];

const configItems: NavItem[] = [
  { name: "SETTINGS", href: "/settings", icon: Settings },
  { name: "TEAM", href: "/team", icon: Users },
];

interface ProductSidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export function ProductSidebar({ isOpen: controlledIsOpen, onToggle }: ProductSidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle mobile/tablet detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Load collapsed state from localStorage
  useEffect(() => {
    if (!isMobile) {
      const saved = localStorage.getItem("sidebar-collapsed");
      if (saved !== null) {
        setIsCollapsed(saved === "true");
      }
    }
  }, [isMobile]);

  // Save collapsed state to localStorage and notify layout
  const handleToggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebar-collapsed", String(newState));
    // Dispatch custom event so layout can react
    window.dispatchEvent(new CustomEvent("sidebar-collapse-changed", { detail: newState }));
  };

  // On mobile, use controlled open/close
  const isOpen = isMobile ? controlledIsOpen : true;
  const isCollapsedState = isMobile ? false : isCollapsed;

  const NavSection = ({ title, items }: { title: string; items: NavItem[] }) => (
    <div className="mb-6">
      {title && !isCollapsedState && (
        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70 mb-3 px-4">
          {title}
        </h3>
      )}
      <nav className="space-y-0.5 px-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={`${item.name}-${item.href}`}
              href={item.href}
              onClick={() => {
                // Close mobile sidebar on navigation
                if (isMobile && onToggle) {
                  onToggle();
                }
              }}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium tracking-wide transition-all group relative",
                isCollapsedState && "justify-center",
                isActive
                  ? "bg-[#4a7c59] text-white"
                  : "text-foreground/80 hover:bg-muted hover:text-foreground"
              )}
              aria-current={isActive ? "page" : undefined}
              title={isCollapsedState ? item.name : undefined}
            >
              <Icon className={cn(
                "w-[18px] h-[18px] flex-shrink-0",
                isActive ? "text-white" : "text-muted-foreground"
              )} />
              {!isCollapsedState && <span>{item.name}</span>}
              {isCollapsedState && (
                <div className="absolute left-full ml-2 px-2 py-1 text-xs font-medium text-foreground bg-card border border-border rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 pointer-events-none">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => onToggle?.()}
          aria-hidden="true"
        />
      )}
      
      <aside
        className={cn(
          "product-sidebar",
          isCollapsedState && "product-sidebar-collapsed",
          isMobile && !isOpen && "product-sidebar-hidden"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Brand Header */}
          <div className={cn(
            "flex items-center justify-between px-4 py-5",
            isCollapsedState && "justify-center px-2"
          )}>
            <Link href="/" className={cn(
              "flex items-center gap-2.5 group",
              isCollapsedState && "justify-center"
            )}>
              <div className="w-8 h-8 rounded-full bg-[#4a7c59] flex items-center justify-center">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              {!isCollapsedState && (
                <span className="font-semibold text-[15px] text-foreground">
                  Cultivate
                </span>
              )}
            </Link>
            {/* Collapse button - desktop only */}
            {!isMobile && !isCollapsedState && (
              <button
                onClick={handleToggleCollapse}
                className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                aria-label="Collapse sidebar"
                title="Collapse sidebar"
              >
                <ChevronLeft className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
            {!isMobile && isCollapsedState && (
              <button
                onClick={handleToggleCollapse}
                className="absolute -right-3 top-6 p-1 rounded-full bg-background border border-border shadow-sm hover:bg-muted transition-colors"
                aria-label="Expand sidebar"
                title="Expand sidebar"
              >
                <ChevronRight className="w-3 h-3 text-muted-foreground" />
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto pt-2 pb-4">
            <NavSection title="PLATFORM" items={platformItems} />
            <div className={cn("h-px bg-border my-4", isCollapsedState ? "mx-2" : "mx-4")}></div>
            <NavSection title="CONFIGURATION" items={configItems} />
          </div>
          
          <div className={cn("border-t border-border p-4", isCollapsedState && "px-2")}>
            {!isCollapsedState ? (
              <>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>System Operational</span>
                </div>
                <div className="text-xs text-muted-foreground">v1.0.0</div>
              </>
            ) : (
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-green-500" title="System Operational"></div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
