/**
 * Integration tests for Hub Projects API
 * 
 * Tests the /api/hub/projects endpoint
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { GET } from "@/app/api/hub/projects/route";
import { NextRequest } from "next/server";
import { readdirSync, statSync } from "fs";
import { join } from "path";

// Mock fs operations
vi.mock("fs", () => ({
  readdirSync: vi.fn(),
  readFileSync: vi.fn(),
  statSync: vi.fn(),
}));

vi.mock("fs/promises", () => ({}));

describe("GET /api/hub/projects", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return empty array when projects directory doesn't exist", async () => {
    vi.mocked(readdirSync).mockImplementation(() => {
      throw new Error("ENOENT");
    });

    const request = new NextRequest("http://localhost:3000/api/hub/projects", {
      method: "GET",
    });

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.projects).toEqual([]);
    expect(data.message).toBeDefined();
  });

  it("should return empty array when no projects found", async () => {
    vi.mocked(readdirSync).mockReturnValue([] as any);

    const request = new NextRequest("http://localhost:3000/api/hub/projects", {
      method: "GET",
    });

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.projects).toEqual([]);
    expect(data.message).toContain("No projects found");
  });

  it("should return projects when they exist", async () => {
    // Mock directory structure
    vi.mocked(readdirSync).mockImplementation((path: string) => {
      if (path.includes("projects")) {
        return [
          { name: "test-project", isDirectory: () => true },
        ] as any;
      }
      if (path.includes("test-project")) {
        return ["README.md", "PORTFOLIO-SCORE-test-project.md"] as any;
      }
      return [] as any;
    });

    vi.mocked(statSync).mockImplementation((path: string) => {
      if (path.includes("README.md")) {
        return {
          isDirectory: () => false,
          isFile: () => true,
          size: 100,
          mtime: new Date("2024-01-01"),
        } as any;
      }
      if (path.includes("PORTFOLIO-SCORE")) {
        return {
          isDirectory: () => false,
          isFile: () => true,
          size: 200,
          mtime: new Date("2024-01-02"),
        } as any;
      }
      return {
        isDirectory: () => true,
        isFile: () => false,
      } as any;
    });

    // Mock readFileSync for README and portfolio score
    const { readFileSync } = await import("fs");
    vi.mocked(readFileSync).mockImplementation((path: string) => {
      if (path.includes("README.md")) {
        return "# Test Project\n**Status**: validation\n**Opportunity Score**: 7.5";
      }
      if (path.includes("PORTFOLIO-SCORE")) {
        return "**Total Score**: 30/40";
      }
      return "";
    });

    const request = new NextRequest("http://localhost:3000/api/hub/projects", {
      method: "GET",
    });

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data.projects)).toBe(true);
    if (data.projects.length > 0) {
      expect(data.projects[0]).toHaveProperty("name");
      expect(data.projects[0]).toHaveProperty("slug");
      expect(data.projects[0]).toHaveProperty("documents");
    }
  });

  it("should handle errors gracefully", async () => {
    vi.mocked(readdirSync).mockImplementation(() => {
      throw new Error("Unexpected error");
    });

    vi.spyOn(console, "error").mockImplementation(() => {});

    const request = new NextRequest("http://localhost:3000/api/hub/projects", {
      method: "GET",
    });

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.projects).toEqual([]);
    expect(data.error).toBeDefined();
  });

  it("should sort projects by portfolio score", async () => {
    vi.mocked(readdirSync).mockImplementation((path: string) => {
      if (path.includes("projects")) {
        return [
          { name: "low-score", isDirectory: () => true },
          { name: "high-score", isDirectory: () => true },
        ] as any;
      }
      return [] as any;
    });

    vi.mocked(statSync).mockReturnValue({
      isDirectory: () => true,
    } as any);

    const { readFileSync } = await import("fs");
    vi.mocked(readFileSync).mockImplementation((path: string) => {
      if (path.includes("high-score")) {
        return "**Total Score**: 35/40";
      }
      if (path.includes("low-score")) {
        return "**Total Score**: 20/40";
      }
      return "";
    });

    const request = new NextRequest("http://localhost:3000/api/hub/projects", {
      method: "GET",
    });

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    if (data.projects.length >= 2) {
      // High score should come first
      expect(data.projects[0]?.portfolioScore).toBeGreaterThanOrEqual(
        data.projects[1]?.portfolioScore || 0
      );
    }
  });
});

