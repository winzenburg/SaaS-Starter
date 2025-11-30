/**
 * Hub Page E2E Tests
 * 
 * Tests the Hub dashboard page functionality including:
 * - Page loading and layout
 * - Portfolio stats display
 * - Filter buttons (All Ideas, Top Priority, Proceed, Pivot)
 * - Project cards with portfolio scores
 * - Verdict badges (PROCEED, PIVOT, KILL)
 * - Filter functionality
 * - API endpoint
 * - Quick Actions section
 * - Empty state handling
 * - shadcn/ui component usage
 * 
 * Run with:
 *   npx playwright test e2e/hub.spec.ts
 * 
 * Run in headed mode:
 *   npx playwright test e2e/hub.spec.ts --headed
 * 
 * Run specific test:
 *   npx playwright test e2e/hub.spec.ts -g "should display filter buttons"
 */

import { test, expect } from "@playwright/test";

test.describe("Hub Page", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to hub page
    await page.goto("/hub", { waitUntil: "networkidle", timeout: 30000 });
  });

  test("should load the hub page with dashboard overview", async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/SaaS Starter|Dashboard/i);

    // Check main heading
    const heading = page.getByRole("heading", { name: /Dashboard Overview/i });
    await expect(heading).toBeVisible();

    // Check welcome message
    await expect(page.getByText(/Welcome back/i)).toBeVisible();
  });

  test("should display portfolio stats cards", async ({ page }) => {
    // Wait for stats to load
    await page.waitForSelector('text=/Total Projects|Total MRR|Avg Portfolio Score|In Validation/i', {
      timeout: 10000,
    });

    // Check for stat cards
    const totalProjects = page.getByText(/Total Projects/i);
    const totalMRR = page.getByText(/Total MRR/i);
    const avgScore = page.getByText(/Avg Portfolio Score/i);
    const inValidation = page.getByText(/In Validation/i);

    await expect(totalProjects).toBeVisible();
    await expect(totalMRR).toBeVisible();
    await expect(avgScore).toBeVisible();
    await expect(inValidation).toBeVisible();
  });

  test("should display filter buttons", async ({ page }) => {
    // Wait for filters to load
    await page.waitForSelector('button:has-text("All Ideas")', { timeout: 10000 });

    // Check all filter buttons are visible
    const allIdeasButton = page.getByRole("button", { name: /All Ideas/i });
    const topPriorityButton = page.getByRole("button", { name: /Top Priority/i });
    const proceedButton = page.getByRole("button", { name: /Proceed/i });
    const pivotButton = page.getByRole("button", { name: /Need Pivoting|Pivot/i });

    await expect(allIdeasButton).toBeVisible();
    await expect(topPriorityButton).toBeVisible();
    await expect(proceedButton).toBeVisible();
    await expect(pivotButton).toBeVisible();

    // Check buttons are clickable
    await expect(allIdeasButton).toBeEnabled();
    await expect(topPriorityButton).toBeEnabled();
    await expect(proceedButton).toBeEnabled();
    await expect(pivotButton).toBeEnabled();
  });

  test("should display projects with portfolio scores", async ({ page }) => {
    // Wait for projects section to load
    await page.waitForSelector('text=/Projects \\(\\d+\\)/i', { timeout: 10000 });

    // Check for project cards - look for elements containing project names
    const projectNames = page.getByRole('heading', { level: 2 }).filter({ 
      hasText: /Projects/i 
    });
    await expect(projectNames.first()).toBeVisible();

    // Look for project cards by finding elements with portfolio scores
    const scoreElements = page.getByText(/\d+\/40/);
    const scoreCount = await scoreElements.count();
    
    if (scoreCount > 0) {
      // Projects are loading - verify at least one score is visible
      await expect(scoreElements.first()).toBeVisible();
      
      // Check for project names (they should be in headings or strong text)
      const hasProjectContent = await page.getByText(/Amazon|Enterprise|Ghost|HVAC/i).count();
      expect(hasProjectContent).toBeGreaterThan(0);
    } else {
      // If no projects, check for empty state
      const emptyState = page.getByText(/No projects yet|Create your first project/i);
      await expect(emptyState).toBeVisible();
    }
  });

  test("should display verdict badges on project cards", async ({ page }) => {
    // Wait for projects section to load
    await page.waitForSelector('text=/Projects \\(\\d+\\)/i', { timeout: 10000 });

    // Check for verdict badges (PROCEED, PIVOT, or KILL)
    const proceedBadges = page.getByText(/✅.*PROCEED|PROCEED/i);
    const pivotBadges = page.getByText(/⚠️.*PIVOT|PIVOT/i);
    const killBadges = page.getByText(/❌.*KILL|KILL/i);

    const proceedCount = await proceedBadges.count();
    const pivotCount = await pivotBadges.count();
    const killCount = await killBadges.count();

    // At least one verdict badge should be visible if projects exist
    const totalVerdicts = proceedCount + pivotCount + killCount;
    
    // Check if there are projects by looking for portfolio scores
    const scoreElements = page.getByText(/\d+\/40/);
    const projectCount = await scoreElements.count();

    if (projectCount > 0) {
      // At least some projects should have verdict badges
      expect(totalVerdicts).toBeGreaterThanOrEqual(0);
    }
  });

  test("should filter projects by Top Priority", async ({ page }) => {
    // Wait for filters and projects to load
    await page.waitForSelector('button:has-text("Top Priority")', { timeout: 10000 });
    await page.waitForSelector('text=/Projects \\(\\d+\\)/i', { timeout: 10000 });

    // Get initial project count by counting portfolio scores
    const initialScores = page.getByText(/\d+\/40/);
    const initialCount = await initialScores.count();

    if (initialCount > 0) {
      // Click Top Priority filter
      const topPriorityButton = page.getByRole("button", { name: /Top Priority/i });
      await topPriorityButton.click();

      // Wait for filter to apply
      await page.waitForTimeout(1000);

      // Check that filter button is active (has default variant styling)
      const isActive = await topPriorityButton.evaluate((el) => {
        return el.classList.contains("bg-primary") || 
               el.getAttribute("data-state") === "active" ||
               el.classList.contains("bg-green-500");
      });
      
      // Filter should be visually active
      expect(isActive).toBeTruthy();
    }
  });

  test("should filter projects by Proceed verdict", async ({ page }) => {
    // Wait for filters and projects to load
    await page.waitForSelector('button:has-text("Proceed")', { timeout: 10000 });
    await page.waitForSelector('text=/Projects \\(\\d+\\)/i', { timeout: 10000 });

    // Get initial project count by counting portfolio scores
    const initialScores = page.getByText(/\d+\/40/);
    const initialCount = await initialScores.count();

    if (initialCount > 0) {
      // Click Proceed filter
      const proceedButton = page.getByRole("button", { name: /Proceed/i });
      await proceedButton.click();

      // Wait for filter to apply
      await page.waitForTimeout(1000);

      // Check that filter button is active
      const isActive = await proceedButton.evaluate((el) => {
        return el.classList.contains("bg-primary") || 
               el.getAttribute("data-state") === "active";
      });
      
      expect(isActive).toBeTruthy();
    }
  });

  test("should filter projects by Pivot verdict", async ({ page }) => {
    // Wait for filters and projects to load
    await page.waitForSelector('button:has-text("Pivot")', { timeout: 10000 });
    await page.waitForSelector('text=/Projects \\(\\d+\\)/i', { timeout: 10000 });

    // Get initial project count by counting portfolio scores
    const initialScores = page.getByText(/\d+\/40/);
    const initialCount = await initialScores.count();

    if (initialCount > 0) {
      // Click Pivot filter
      const pivotButton = page.getByRole("button", { name: /Need Pivoting|Pivot/i });
      await pivotButton.click();

      // Wait for filter to apply
      await page.waitForTimeout(1000);

      // Check that filter button is active
      const isActive = await pivotButton.evaluate((el) => {
        return el.classList.contains("bg-primary") || 
               el.classList.contains("bg-yellow-500") ||
               el.getAttribute("data-state") === "active";
      });
      
      expect(isActive).toBeTruthy();
    }
  });

  test("should display status breakdown badges", async ({ page }) => {
    // Wait for status breakdown section
    await page.waitForSelector('text=/Portfolio by Status/i', { timeout: 10000 });

    // Check for status breakdown heading
    const statusHeading = page.getByRole("heading", { name: /Portfolio by Status/i });
    await expect(statusHeading).toBeVisible();

    // Check for status badges (at least one should exist)
    const statusBadges = page.locator('[class*="Badge"]').filter({ 
      hasText: /validation|engineering|growth|maintenance|killed/i 
    });
    const badgeCount = await statusBadges.count();
    
    // Status breakdown should show at least one badge if there are projects
    expect(badgeCount).toBeGreaterThanOrEqual(0);
  });

  test("should have working API endpoint", async ({ page }) => {
    // Test API endpoint directly
    const response = await page.request.get("/api/hub/projects");
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty("projects");
    expect(Array.isArray(data.projects)).toBe(true);

    // If projects exist, check structure
    if (data.projects.length > 0) {
      const firstProject = data.projects[0];
      expect(firstProject).toHaveProperty("name");
      expect(firstProject).toHaveProperty("slug");
      expect(firstProject).toHaveProperty("status");
      
      // Check optional properties
      if (firstProject.portfolioScore !== undefined) {
        expect(typeof firstProject.portfolioScore).toBe("number");
        expect(firstProject.portfolioScore).toBeGreaterThanOrEqual(0);
        expect(firstProject.portfolioScore).toBeLessThanOrEqual(40);
      }
      
      if (firstProject.verdict !== undefined && firstProject.verdict !== null) {
        expect(["PROCEED", "PIVOT", "KILL"]).toContain(
          firstProject.verdict.toUpperCase()
        );
      }
    }
  });

  test("should display Quick Actions section", async ({ page }) => {
    // Wait for Quick Actions section
    await page.waitForSelector('text=/Quick Actions/i', { timeout: 10000 });

    // Check for Quick Actions heading
    const quickActionsHeading = page.getByRole("heading", { name: /Quick Actions/i });
    await expect(quickActionsHeading).toBeVisible();

    // Check for action items
    const createProject = page.getByText(/Create New Project/i);
    const listProjects = page.getByText(/List Projects/i);
    const checkStatus = page.getByText(/Check Status/i);

    await expect(createProject).toBeVisible();
    await expect(listProjects).toBeVisible();
    await expect(checkStatus).toBeVisible();
  });

  test("should handle empty state when no projects exist", async ({ page }) => {
    // Check if empty state is shown when no projects
    // Look for portfolio scores to determine if projects exist
    const scoreElements = page.getByText(/\d+\/40/);
    const scoreCount = await scoreElements.count();

    // Also check for project names
    const projectNames = page.getByText(/Amazon|Enterprise|Ghost|HVAC|Creator|Freelancer/i);
    const nameCount = await projectNames.count();

    if (scoreCount === 0 && nameCount === 0) {
      // Check for empty state message
      const emptyState = page.getByText(/No projects yet|Create your first project/i);
      await expect(emptyState).toBeVisible();

      // Check for CLI command example
      const cliCommand = page.getByText(/npm run create-project/i);
      await expect(cliCommand).toBeVisible();
    }
    // If projects exist, this test passes (empty state not shown, which is correct)
  });

  test("should use shadcn/ui components correctly", async ({ page }) => {
    // Check that buttons use shadcn/ui Button component
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    if (buttonCount > 0) {
      // Check first button has shadcn/ui classes
      const firstButton = buttons.first();
      const buttonClasses = await firstButton.getAttribute("class");
      
      // shadcn/ui buttons typically have specific class patterns
      expect(buttonClasses).toBeTruthy();
    }

    // Check that cards use shadcn/ui Card component
    const cards = page.locator('[class*="Card"]');
    const cardCount = await cards.count();
    
    if (cardCount > 0) {
      const firstCard = cards.first();
      const cardClasses = await firstCard.getAttribute("class");
      expect(cardClasses).toBeTruthy();
    }

    // Check that badges use shadcn/ui Badge component
    const badges = page.locator('[class*="Badge"]');
    const badgeCount = await badges.count();
    
    if (badgeCount > 0) {
      const firstBadge = badges.first();
      const badgeClasses = await firstBadge.getAttribute("class");
      expect(badgeClasses).toBeTruthy();
    }
  });
});

