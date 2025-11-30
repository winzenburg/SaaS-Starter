import { test } from "@playwright/test";

test.describe("Hub Page Inspection", () => {
  test.use({ baseURL: "http://localhost:3001" });
  
  test("Inspect hub page for filters and portfolio scores", async ({ page }) => {
    // Navigate to hub page with longer timeout
    await page.goto("/hub", { waitUntil: "domcontentloaded", timeout: 60000 });
    
    // Wait for page to load
    await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {
      console.log("Network idle timeout - continuing anyway");
    });
    
    // Take a screenshot
    await page.screenshot({ path: "hub-page-screenshot.png", fullPage: true });
    
    // Check if page loaded
    const pageTitle = await page.title();
    console.log("Page title:", pageTitle);
    
    // Check for filter buttons
    console.log("\n=== Checking for Filter Buttons ===");
    const allIdeasButton = page.getByRole("button", { name: /All Ideas/i });
    const topPriorityButton = page.getByRole("button", { name: /Top Priority/i });
    const proceedButton = page.getByRole("button", { name: /Proceed/i });
    const pivotButton = page.getByRole("button", { name: /Need Pivoting|Pivot/i });
    
    const allIdeasVisible = await allIdeasButton.isVisible().catch(() => false);
    const topPriorityVisible = await topPriorityButton.isVisible().catch(() => false);
    const proceedVisible = await proceedButton.isVisible().catch(() => false);
    const pivotVisible = await pivotButton.isVisible().catch(() => false);
    
    console.log("All Ideas button visible:", allIdeasVisible);
    console.log("Top Priority button visible:", topPriorityVisible);
    console.log("Proceed button visible:", proceedVisible);
    console.log("Pivot button visible:", pivotVisible);
    
    // Check for projects
    console.log("\n=== Checking for Projects ===");
    const projectCards = page.locator('[class*="Card"]').filter({ hasText: /Project|Idea/i });
    const projectCount = await projectCards.count();
    console.log("Project cards found:", projectCount);
    
    // Get all project names
    const projectNames = await page.locator('h3, [class*="CardTitle"]').allTextContents();
    console.log("Project names found:", projectNames.slice(0, 10));
    
    // Check for portfolio scores
    console.log("\n=== Checking for Portfolio Scores ===");
    const scoreElements = page.locator('text=/\\d+\\/40/');
    const scoreCount = await scoreElements.count();
    console.log("Portfolio score elements found:", scoreCount);
    
    if (scoreCount > 0) {
      const scores = await scoreElements.allTextContents();
      console.log("Scores found:", scores.slice(0, 5));
    }
    
    // Check for verdict badges
    console.log("\n=== Checking for Verdict Badges ===");
    const proceedBadges = page.locator('text=/PROCEED/i');
    const pivotBadges = page.locator('text=/PIVOT/i');
    const proceedCount = await proceedBadges.count();
    const pivotCount = await pivotBadges.count();
    console.log("PROCEED badges found:", proceedCount);
    console.log("PIVOT badges found:", pivotCount);
    
    // Check API response
    console.log("\n=== Checking API Response ===");
    const apiResponse = await page.evaluate(async () => {
      try {
        const response = await fetch("/api/hub/projects");
        const data = await response.json();
        return data;
      } catch (error) {
        return { error: String(error) };
      }
    });
    
    console.log("API projects count:", apiResponse.projects?.length || 0);
    if (apiResponse.projects && apiResponse.projects.length > 0) {
      const firstProject = apiResponse.projects[0];
      console.log("First project:", {
        name: firstProject.name,
        slug: firstProject.slug,
        portfolioScore: firstProject.portfolioScore,
        verdict: firstProject.verdict,
      });
    }
    
    // Check for any error messages
    console.log("\n=== Checking for Errors ===");
    const errorMessages = page.locator('text=/error|Error|failed|Failed/i');
    const errorCount = await errorMessages.count();
    console.log("Error messages found:", errorCount);
    if (errorCount > 0) {
      const errors = await errorMessages.allTextContents();
      console.log("Errors:", errors);
    }
    
    // Get page HTML structure (key elements)
    console.log("\n=== Page Structure ===");
    const mainContent = await page.locator("main, [role='main']").first().innerHTML().catch(() => "Not found");
    console.log("Main content length:", mainContent.length);
    
    // Check console for errors
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });
    
    // Wait a bit to catch console errors
    await page.waitForTimeout(2000);
    
    if (consoleErrors.length > 0) {
      console.log("\n=== Console Errors ===");
      consoleErrors.forEach((error, i) => console.log(`${i + 1}. ${error}`));
    }
    
    // Summary
    console.log("\n=== SUMMARY ===");
    console.log("Filters visible:", allIdeasVisible && topPriorityVisible && proceedVisible && pivotVisible);
    console.log("Projects loaded:", projectCount > 0);
    console.log("Portfolio scores visible:", scoreCount > 0);
    console.log("Verdict badges visible:", proceedCount > 0 || pivotCount > 0);
    console.log("API working:", apiResponse.projects ? true : false);
  });
});

