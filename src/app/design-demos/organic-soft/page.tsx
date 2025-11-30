"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Design Demo: Organic Soft
 * 
 * A soft, organic design with:
 * - Light gradient background
 * - Glass morphism cards
 * - Soft coral accent (#ff8c69)
 * - Serif typography (Georgia)
 * - Ambient floating orb animation
 * - Pill-shaped stat badges
 */

export default function OrganicSoftDemo() {
  return (
    <div className="demo-organic-soft">
      {/* Back to Design Previews */}
      <Link
        href="/design-demos"
        className="absolute top-4 left-4 z-50 px-4 py-2 bg-white/80 backdrop-blur-md border border-white/80 text-[#2c3e50] hover:bg-white transition-colors flex items-center gap-2 rounded-full shadow-lg"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Demos
      </Link>

      {/* Ambient Background Orb */}
      <div className="demo-orb"></div>

      <div className="demo-container">
        <header>
          <span className="demo-author-name">Alice Chen</span>
          <h1>
            Digital ecosystems<br />
            designed for humans.
          </h1>
          <p className="demo-subtitle">
            I deconstruct complex user behaviors to build product strategies that feel natural,
            intuitive, and remarkably effective.
          </p>
        </header>

        <section className="demo-work-stream">
          {/* Project 1 */}
          <div className="demo-glass-card">
            <div>
              <span className="demo-project-meta">HealthTech • 2024</span>
              <h2 className="demo-project-title">CareCircle</h2>
              <p className="demo-project-desc">
                Reducing patient anxiety through a redesigned, empathy-first onboarding process.
              </p>
            </div>
            <div className="demo-stat-badge">
              <span className="demo-stat-value">92%</span>
              <span className="demo-stat-label">Completion Rate</span>
            </div>
          </div>

          {/* Project 2 */}
          <div className="demo-glass-card">
            <div>
              <span className="demo-project-meta">EdTech • 2023</span>
              <h2 className="demo-project-title">Lumina</h2>
              <p className="demo-project-desc">
                Gamified learning paths that adapt to student emotional states.
              </p>
            </div>
            <div className="demo-stat-badge">
              <span className="demo-stat-value">3x</span>
              <span className="demo-stat-label">Daily Active Users</span>
            </div>
          </div>

          {/* Project 3 */}
          <div className="demo-glass-card">
            <div>
              <span className="demo-project-meta">Non-Profit • Strategy</span>
              <h2 className="demo-project-title">Roots</h2>
              <p className="demo-project-desc">
                Connecting donors to impact stories through immersive web storytelling.
              </p>
            </div>
            <div className="demo-stat-badge">
              <span className="demo-stat-value">$2M</span>
              <span className="demo-stat-label">Raised in Q1</span>
            </div>
          </div>
        </section>
      </div>

      {/* Floating Nav */}
      <nav className="demo-nav-pill">
        <a href="#work">Work</a>
        <a href="#about">Philosophy</a>
        <a href="#contact">Contact</a>
      </nav>

      <style jsx global>{`
        /* Reset body and html for demo */
        body:has(.demo-organic-soft),
        html:has(.demo-organic-soft) {
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #f3f4f6, #e8eaf6) !important;
        }

        /* Hide main layout header when viewing demo */
        body:has(.demo-organic-soft) header[role="banner"].glass-header {
          display: none !important;
        }

        /* Hide main layout content wrapper padding */
        body:has(.demo-organic-soft) main[role="main"] {
          padding: 0 !important;
          margin: 0 !important;
          max-width: none !important;
        }
      `}</style>
      <style jsx>{`
        .demo-organic-soft {
          --bg-grad-start: #f3f4f6;
          --bg-grad-end: #e8eaf6;
          --text-dark: #2c3e50;
          --glass-bg: rgba(255, 255, 255, 0.6);
          --glass-border: rgba(255, 255, 255, 0.8);
          --accent-soft: #ff8c69; /* Soft Coral */
          --font-serif: "Georgia", serif;
          --font-sans: "Helvetica Neue", sans-serif;

          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, var(--bg-grad-start), var(--bg-grad-end));
          color: var(--text-dark);
          font-family: var(--font-sans);
          min-height: 100vh;
          overflow-x: hidden;
          width: 100%;
          position: relative;
        }

        /* Ambient Background Orb */
        .demo-orb {
          position: fixed;
          width: 600px;
          height: 600px;
          background: radial-gradient(
            circle,
            rgba(255, 140, 105, 0.2) 0%,
            rgba(255, 255, 255, 0) 70%
          );
          border-radius: 50%;
          top: -200px;
          right: -100px;
          z-index: -1;
          animation: breathe 10s infinite ease-in-out;
          pointer-events: none;
        }

        .demo-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 60px 20px;
          width: 100%;
          box-sizing: border-box;
          position: relative;
          z-index: 1;
        }

        /* Typography */
        .demo-organic-soft h1 {
          font-family: var(--font-serif);
          font-size: 5rem;
          font-weight: normal;
          line-height: 1.1;
          margin-bottom: 40px;
          color: #1a1a1a;
        }

        .demo-author-name {
          font-size: 0.9rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 20px;
          color: var(--accent-soft);
        }

        .demo-subtitle {
          font-size: 1.25rem;
          color: #555;
          margin-bottom: 80px;
          max-width: 500px;
          line-height: 1.6;
        }

        /* Glass Cards */
        .demo-work-stream {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .demo-glass-card {
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          border-radius: 30px;
          padding: 50px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }

        .demo-glass-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
        }

        .demo-project-meta {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #888;
          margin-bottom: 10px;
          display: block;
        }

        .demo-project-title {
          font-family: var(--font-serif);
          font-size: 2.5rem;
          margin: 0 0 15px 0;
          color: var(--text-dark);
        }

        .demo-project-desc {
          color: #555;
          line-height: 1.6;
          max-width: 400px;
        }

        .demo-stat-badge {
          background: #fff;
          padding: 20px 30px;
          border-radius: 50px; /* Pill shape */
          text-align: center;
          min-width: 150px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          flex-shrink: 0;
        }

        .demo-stat-value {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: var(--accent-soft);
        }

        .demo-stat-label {
          font-size: 0.8rem;
          color: #999;
          display: block;
          margin-top: 4px;
        }

        /* Floating Nav */
        .demo-nav-pill {
          position: fixed;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          background: #1a1a1a;
          color: #fff;
          padding: 15px 30px;
          border-radius: 50px;
          display: flex;
          gap: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          z-index: 100;
        }

        .demo-nav-pill a {
          color: #fff;
          text-decoration: none;
          font-size: 0.9rem;
          opacity: 0.7;
          transition: opacity 0.2s;
        }

        .demo-nav-pill a:hover {
          opacity: 1;
        }

        /* Animations */
        @keyframes breathe {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .demo-container {
            padding: 40px 16px;
          }

          .demo-organic-soft h1 {
            font-size: 3.5rem;
          }

          .demo-subtitle {
            margin-bottom: 60px;
          }

          .demo-glass-card {
            flex-direction: column;
            align-items: flex-start;
            padding: 30px;
          }

          .demo-stat-badge {
            width: 100%;
            margin-top: 20px;
          }

          .demo-project-title {
            font-size: 2rem;
          }

          .demo-nav-pill {
            bottom: 20px;
            padding: 12px 24px;
            gap: 16px;
          }

          .demo-orb {
            width: 400px;
            height: 400px;
            top: -100px;
            right: -50px;
          }
        }

        @media (max-width: 640px) {
          .demo-organic-soft h1 {
            font-size: 2.5rem;
          }

          .demo-subtitle {
            font-size: 1.1rem;
            margin-bottom: 50px;
          }

          .demo-glass-card {
            padding: 24px;
          }

          .demo-project-title {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
}

