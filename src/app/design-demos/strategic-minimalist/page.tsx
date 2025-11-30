"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Design Demo: Strategic Minimalist
 * 
 * A minimalist, strategy-focused design with:
 * - Deep charcoal background (#0F0F11)
 * - Red Dot Red accent (#FF4D00)
 * - Monospace body font
 * - Bento grid portfolio layout
 * - Large, bold typography
 */

export default function StrategicMinimalistDemo() {
  useEffect(() => {
    // Simple subtle parallax effect on scroll
    const handleScroll = () => {
      const cards = document.querySelectorAll(".demo-card");
      const scrolled = window.scrollY;

      cards.forEach((card, index) => {
        if (window.innerWidth > 1024) {
          const speed = index % 2 === 0 ? 0.05 : 0.02;
          (card as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="demo-strategic-minimalist">
      {/* Back to Design Previews */}
      <Link
        href="/design-demos"
        className="absolute top-4 left-4 z-50 px-4 py-2 bg-[#1A1A1D] border border-[#333] text-[#Eaeaea] hover:bg-[#222] transition-colors flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Demos
      </Link>

      <div className="demo-container">
        {/* Hero Section */}
        <header className="demo-hero">
          <p className="demo-hero-tagline">Digital Product Strategist</p>
          <h1>
            I bridge the gap between<br />
            <span className="demo-highlight">User Needs</span> &{" "}
            <span className="demo-highlight">Business Goals.</span>
          </h1>
        </header>

        {/* Selected Work (Bento Grid) */}
        <section id="work" className="demo-section">
          <h2>Selected Strategy</h2>
          <div className="demo-grid-wrapper">
            {/* Project 1: Large Wide */}
            <div className="demo-card demo-card-large">
              <span className="demo-card-category">FinTech • UX Strategy</span>
              <div className="demo-card-title">NeoBank 2.0</div>
              <p style={{ marginTop: "10px" }}>Redefining the onboarding flow for Gen-Z users.</p>
              <div className="demo-card-metric">+45%</div>
            </div>

            {/* Project 2: Medium Box */}
            <div className="demo-card demo-card-medium">
              <span className="demo-card-category">SaaS • Retention</span>
              <div className="demo-card-title">CloudFlow</div>
              <p style={{ marginTop: "10px" }}>Churn reduction strategy.</p>
              <div className="demo-card-metric">-12%</div>
            </div>

            {/* Project 3: Tall Vertical */}
            <div className="demo-card demo-card-tall">
              <span className="demo-card-category">E-Commerce • CRO</span>
              <div className="demo-card-title">Luxe Retail</div>
              <p style={{ marginTop: "10px" }}>
                Full checkout optimization and A/B testing framework implementation.
              </p>
              <div className="demo-card-metric">2.4x</div>
            </div>

            {/* Project 4: Medium Box */}
            <div className="demo-card demo-card-medium">
              <span className="demo-card-category">HealthTech • Research</span>
              <div className="demo-card-title">VitalSign</div>
              <p style={{ marginTop: "10px" }}>User research & persona development.</p>
            </div>

            {/* Project 5: Medium Box */}
            <div className="demo-card demo-card-medium">
              <span className="demo-card-category">AI • Product Ops</span>
              <div className="demo-card-title">DataMind</div>
              <p style={{ marginTop: "10px" }}>Defining the roadmap for V1 launch.</p>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section id="methodology" className="demo-section">
          <h2>The Approach</h2>
          <div className="demo-method-grid">
            <div className="demo-method-item">
              <h3>01. Discovery & Audit</h3>
              <p>
                I don&apos;t guess. I audit existing data, interview stakeholders, and map the current
                landscape to find the hidden friction points.
              </p>
            </div>
            <div className="demo-method-item">
              <h3>02. Strategic Framework</h3>
              <p>
                Building the &quot;Skeleton&quot; before the &quot;Skin&quot;. I deliver wireframes, user flows,
                and product roadmaps that prioritize value.
              </p>
            </div>
            <div className="demo-method-item">
              <h3>03. Execution & Loop</h3>
              <p>
                Agile implementation oversight followed by rigorous A/B testing and data analysis to
                refine the product loop.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="demo-footer">
          <div>
            <h2 style={{ border: "none", marginBottom: 0 }}>Let&apos;s Build.</h2>
            <p>Available for Q1 2025 Engagements</p>
            <a href="mailto:hello@example.com" className="demo-cta-button">
              Start a Project
            </a>
          </div>
          <div
            style={{
              textAlign: "right",
              fontFamily: "var(--font-body)",
              color: "var(--text-muted)",
            }}
          >
            <p>Based in [City]</p>
            <p>Twitter / LinkedIn</p>
            <p>&copy; 2024</p>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        /* Reset body and html for demo */
        body:has(.demo-strategic-minimalist),
        html:has(.demo-strategic-minimalist) {
          margin: 0;
          padding: 0;
          background-color: #0f0f11 !important;
        }

        /* Hide main layout header when viewing demo */
        body:has(.demo-strategic-minimalist) header[role="banner"].glass-header {
          display: none !important;
        }

        /* Hide main layout content wrapper padding */
        body:has(.demo-strategic-minimalist) main[role="main"] {
          padding: 0 !important;
          margin: 0 !important;
          max-width: none !important;
        }
      `}</style>
      <style jsx>{`
        .demo-strategic-minimalist {
          --bg-color: #0f0f11; /* Deepest Charcoal, almost black */
          --card-bg: #1a1a1d;
          --text-main: #eaeaea;
          --text-muted: #888888;
          --accent: #ff4d00; /* Red Dot Red / International Orange */
          --font-display: "Helvetica Neue", Helvetica, Arial, sans-serif;
          --font-body: "Courier New", Courier, monospace; /* Monospace for "Strategy" feel */
          --gap: 20px;

          background-color: var(--bg-color);
          color: var(--text-main);
          font-family: var(--font-display);
          line-height: 1.4;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
          width: 100%;
          margin: 0;
          padding: 0;
          position: relative;
        }

        /* Typography */
        .demo-strategic-minimalist h1 {
          font-size: 8vw;
          line-height: 0.9;
          letter-spacing: -0.03em;
          font-weight: 700;
          margin-bottom: 2rem;
          transform-origin: left;
          animation: slideIn 1s ease-out forwards;
        }

        .demo-strategic-minimalist h2 {
          font-size: 2rem;
          font-weight: 400;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--text-muted);
          padding-bottom: 10px;
          display: inline-block;
        }

        .demo-strategic-minimalist h3 {
          font-size: 1.5rem;
          margin-bottom: 10px;
          color: var(--text-main);
        }

        .demo-strategic-minimalist p {
          font-family: var(--font-body);
          color: var(--text-muted);
          font-size: 1rem;
          max-width: 60ch;
        }

        /* Layout Utilities */
        .demo-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px;
          width: 100%;
          box-sizing: border-box;
        }

        .demo-section {
          margin-bottom: 150px;
        }

        /* Hero Section */
        .demo-hero {
          height: 90vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding-bottom: 100px;
          position: relative;
        }

        .demo-hero-tagline {
          font-family: var(--font-body);
          color: var(--accent);
          font-size: 1.2rem;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .demo-highlight {
          color: var(--text-muted);
          transition: color 0.3s ease;
        }

        .demo-highlight:hover {
          color: var(--accent);
          cursor: default;
        }

        /* Bento Grid Portfolio */
        .demo-grid-wrapper {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: repeat(2, 400px);
          gap: var(--gap);
          width: 100%;
          box-sizing: border-box;
        }

        .demo-card {
          background-color: var(--card-bg);
          border-radius: 4px;
          padding: 30px;
          position: relative;
          transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1),
            background 0.3s;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid transparent;
          box-sizing: border-box;
          width: 100%;
        }

        .demo-card:hover {
          transform: translateY(-5px);
          border-color: var(--text-muted);
          background-color: #222;
        }

        /* Grid Spans for Bento Layout */
        .demo-card-large {
          grid-column: span 8;
        }

        .demo-card-medium {
          grid-column: span 4;
        }

        .demo-card-tall {
          grid-column: span 4;
          grid-row: span 2;
        }

        .demo-card-category {
          font-family: var(--font-body);
          font-size: 0.8rem;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .demo-card-title {
          font-size: 2.5rem;
          font-weight: 600;
          margin-top: 20px;
        }

        .demo-card-metric {
          font-size: 4rem;
          font-weight: 700;
          color: var(--accent);
          position: absolute;
          bottom: 20px;
          right: 30px;
          opacity: 0.1;
          transition: opacity 0.3s, transform 0.3s;
        }

        .demo-card:hover .demo-card-metric {
          opacity: 1;
          transform: scale(1.1);
        }

        /* Methodology Section */
        .demo-method-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          border-top: 1px solid #333;
          padding-top: 40px;
        }

        /* Footer / Contact */
        .demo-footer {
          border-top: 1px solid #333;
          padding-top: 50px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .demo-cta-button {
          display: inline-block;
          margin-top: 20px;
          padding: 15px 40px;
          background: var(--text-main);
          color: var(--bg-color);
          text-decoration: none;
          font-weight: 700;
          border-radius: 50px;
          transition: all 0.3s ease;
        }

        .demo-cta-button:hover {
          background: var(--accent);
          color: white;
          transform: scale(1.05);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .demo-container {
            padding: 20px;
          }
          
          .demo-hero {
            height: 70vh;
            padding-bottom: 60px;
          }
          
          .demo-section {
            margin-bottom: 80px;
          }
          
          .demo-grid-wrapper {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            gap: 15px;
          }
          
          .demo-card {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
            height: 350px;
          }
          
          .demo-strategic-minimalist h1 {
            font-size: 12vw;
          }
          
          .demo-method-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
        
        @media (max-width: 640px) {
          .demo-container {
            padding: 16px;
          }
          
          .demo-hero {
            height: 60vh;
            padding-bottom: 40px;
          }
          
          .demo-section {
            margin-bottom: 60px;
          }
          
          .demo-card {
            padding: 20px;
          }
          
          .demo-card-title {
            font-size: 1.8rem;
          }
        }

        /* Animations */
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

