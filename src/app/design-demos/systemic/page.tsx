"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Design Demo: Systemic
 * 
 * A structured, technical design with:
 * - Grid-based layout with black borders
 * - Monospace typography (Courier)
 * - International Klein Blue accent (#0044FF)
 * - Table-style project rows
 * - Scrolling ticker animation
 * - Technical/architectural aesthetic
 */

export default function SystemicDemo() {
  return (
    <div className="demo-systemic">
      {/* Back to Design Previews */}
      <Link
        href="/design-demos"
        className="absolute top-6 left-6 z-50 px-4 py-2 bg-white border-2 border-black text-black hover:bg-[#0044FF] hover:text-white transition-colors flex items-center gap-2 font-mono text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        BACK TO DEMOS
      </Link>

      <div className="demo-wrapper">
        {/* Ticker */}
        <div className="demo-scrolling-ticker">
          <div className="demo-ticker-content">
            /// AVAILABLE FOR CONTRACT WORK Q1 2025 /// SYSTEM ARCHITECTURE /// KPI OPTIMIZATION ///
            PRODUCT OPERATIONS /// AVAILABLE FOR CONTRACT WORK Q1 2025 /// SYSTEM ARCHITECTURE ///
            KPI OPTIMIZATION /// PRODUCT OPERATIONS ///
          </div>
        </div>

        {/* Header */}
        <div className="demo-cell demo-header-cell">
          <div className="demo-role-tag">REF: 2025-PF</div>
          <h1>
            Systemic<br />
            Product<br />
            Strategy.
          </h1>
        </div>

        {/* Sidebar Info */}
        <div className="demo-cell demo-sidebar">
          <div className="demo-data-row">
            <span>LOCATION</span>
            <span>[CITY, STATE]</span>
          </div>
          <div className="demo-data-row">
            <span>EXPERIENCE</span>
            <span>08 YEARS</span>
          </div>
          <div className="demo-data-row">
            <span>SPECIALTY</span>
            <span>B2B / SAAS</span>
          </div>
          <div className="demo-data-row" style={{ marginTop: "40px" }}>
            <span>CONTACT</span>
            <a href="mailto:hello@example.com" className="demo-contact-link">
              EMAIL -&gt;
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="demo-cell">
          <h3 className="demo-section-title">/// SELECTED INDEX</h3>

          <div className="demo-project-row">
            <div className="demo-p-name">LogiTech</div>
            <div className="demo-p-desc">Supply chain auto-scaling algorithm.</div>
            <div className="demo-p-metric">EFFICIENCY +22%</div>
          </div>

          <div className="demo-project-row">
            <div className="demo-p-name">FinServe</div>
            <div className="demo-p-desc">Enterprise dashboard unification.</div>
            <div className="demo-p-metric">ERRORS -40%</div>
          </div>

          <div className="demo-project-row">
            <div className="demo-p-name">DataCore</div>
            <div className="demo-p-desc">API monetization strategy.</div>
            <div className="demo-p-metric">REV $1.2M</div>
          </div>

          <div className="demo-project-row">
            <div className="demo-p-name">Structura</div>
            <div className="demo-p-desc">Internal tools audit &amp; rebuild.</div>
            <div className="demo-p-metric">TIME -15HRS/WK</div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Reset body and html for demo */
        body:has(.demo-systemic),
        html:has(.demo-systemic) {
          margin: 0;
          padding: 0;
          background-color: #ffffff !important;
        }

        /* Hide main layout header when viewing demo */
        body:has(.demo-systemic) header[role="banner"].glass-header {
          display: none !important;
        }

        /* Hide main layout content wrapper padding */
        body:has(.demo-systemic) main[role="main"] {
          padding: 0 !important;
          margin: 0 !important;
          max-width: none !important;
        }
      `}</style>
      <style jsx>{`
        .demo-systemic {
          --bg-color: #ffffff;
          --line-color: #000000;
          --highlight: #0044ff; /* International Klein Blue */
          --font-mono: "Courier Prime", "Courier New", monospace;
          --font-main: "Helvetica Neue", Helvetica, Arial, sans-serif;

          background-color: var(--bg-color);
          color: var(--line-color);
          font-family: var(--font-main);
          margin: 0;
          padding: 0;
          border: 20px solid var(--bg-color); /* Frame the site */
          min-height: 100vh;
          width: 100%;
          box-sizing: border-box;
        }

        /* The Grid System */
        .demo-wrapper {
          border-top: 2px solid var(--line-color);
          border-left: 2px solid var(--line-color);
          display: grid;
          grid-template-columns: 300px 1fr; /* Sidebar / Content split */
          width: 100%;
          box-sizing: border-box;
        }

        .demo-cell {
          border-right: 2px solid var(--line-color);
          border-bottom: 2px solid var(--line-color);
          padding: 40px;
          box-sizing: border-box;
        }

        /* Header Area */
        .demo-header-cell {
          grid-column: span 2;
          padding: 80px 40px;
        }

        .demo-systemic h1 {
          font-family: var(--font-mono);
          font-size: 4rem;
          letter-spacing: -0.05em;
          text-transform: uppercase;
          margin: 0;
          line-height: 0.9;
        }

        .demo-role-tag {
          display: inline-block;
          background: var(--line-color);
          color: var(--bg-color);
          padding: 5px 10px;
          font-family: var(--font-mono);
          font-size: 0.9rem;
          margin-bottom: 20px;
        }

        /* Sidebar Info */
        .demo-sidebar {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .demo-data-row {
          display: flex;
          justify-content: space-between;
        }

        .demo-contact-link {
          color: var(--highlight);
          text-decoration: none;
          transition: opacity 0.2s;
        }

        .demo-contact-link:hover {
          opacity: 0.7;
        }

        /* Project List - Table Style */
        .demo-project-row {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          align-items: baseline;
          border-bottom: 1px solid #ccc;
          padding: 25px 0;
          transition: background 0.2s, padding-left 0.2s;
        }

        .demo-project-row:last-child {
          border-bottom: none;
        }

        .demo-project-row:hover {
          background: #f0f0f0;
          padding-left: 10px;
        }

        .demo-p-name {
          font-weight: 700;
          font-size: 1.5rem;
        }

        .demo-p-desc {
          color: #555;
        }

        .demo-p-metric {
          font-family: var(--font-mono);
          text-align: right;
          color: var(--highlight);
          font-weight: bold;
        }

        .demo-section-title {
          font-family: var(--font-mono);
          margin-bottom: 40px;
          font-size: 1rem;
          font-weight: normal;
        }

        /* Utility */
        .demo-scrolling-ticker {
          grid-column: span 2;
          background: var(--line-color);
          color: var(--bg-color);
          white-space: nowrap;
          overflow: hidden;
          padding: 10px 0;
          font-family: var(--font-mono);
          font-size: 0.85rem;
        }

        .demo-ticker-content {
          display: inline-block;
          animation: scroll 20s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        /* Responsive */
        @media (max-width: 900px) {
          .demo-systemic {
            border: 10px solid var(--bg-color);
          }

          .demo-wrapper {
            grid-template-columns: 1fr;
          }

          .demo-header-cell {
            grid-column: span 1;
            padding: 60px 30px;
          }

          .demo-scrolling-ticker {
            grid-column: span 1;
          }

          .demo-project-row {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .demo-p-metric {
            text-align: left;
          }

          .demo-cell {
            padding: 30px 20px;
          }

          .demo-systemic h1 {
            font-size: 3rem;
          }
        }

        @media (max-width: 640px) {
          .demo-systemic {
            border: 5px solid var(--bg-color);
          }

          .demo-header-cell {
            padding: 40px 20px;
          }

          .demo-systemic h1 {
            font-size: 2.5rem;
          }

          .demo-p-name {
            font-size: 1.25rem;
          }

          .demo-cell {
            padding: 20px 16px;
          }
        }
      `}</style>
    </div>
  );
}

