"use client";

import { useState, useEffect } from "react";
import { ProductSidebar } from "@/components/navigation/product-sidebar";
import { ProductHeader } from "@/components/navigation/product-header";
import "./saas-product.css";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Sync with localStorage for collapsed state
  useEffect(() => {
    const checkCollapsed = () => {
      const saved = localStorage.getItem("sidebar-collapsed");
      if (saved !== null) {
        setIsCollapsed(saved === "true");
      }
    };
    checkCollapsed();
    
    // Listen for sidebar collapse changes
    const handleCollapseChange = ((e: CustomEvent<boolean>) => {
      setIsCollapsed(e.detail);
    }) as EventListener;
    
    window.addEventListener("sidebar-collapse-changed", handleCollapseChange);
    return () => window.removeEventListener("sidebar-collapse-changed", handleCollapseChange);
  }, []);

  return (
    <div className={`product-page ${isCollapsed ? "product-page-sidebar-collapsed" : ""}`}>
      <ProductSidebar
        isOpen={isMobileMenuOpen}
        onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <div className="product-layout">
        <ProductHeader onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        <main className="product-main">
          {children}
        </main>
      </div>
    </div>
  );
}
