import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("SaaS Starter Hub", () => {
  test("home page loads and is accessible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("SaaS Starter Hub");
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("hub page loads and displays projects", async ({ page }) => {
    await page.goto("/hub");
    await expect(page.locator("h1")).toContainText(/portfolio|hub/i);
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("workflows page loads and is accessible", async ({ page }) => {
    await page.goto("/workflows");
    await expect(page.locator("h1")).toContainText("Workflows");
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("can create workflow via keyboard", async ({ page }) => {
    await page.goto("/workflows");
    
    // Tab to Create Workflow button
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    
    // Dialog should open
    await expect(page.locator('role=dialog')).toBeVisible();
    
    // Tab through form fields
    await page.keyboard.press("Tab"); // Idea Name
    await page.keyboard.type("Test Idea");
    
    await page.keyboard.press("Tab"); // Idea Slug
    await page.keyboard.type("test-idea");
    
    await page.keyboard.press("Tab"); // Phase select
    await page.keyboard.press("Tab"); // Skip to Cancel
    await page.keyboard.press("Tab"); // Create button
    
    // Escape should close dialog
    await page.keyboard.press("Escape");
    await expect(page.locator('role=dialog')).not.toBeVisible();
  });

  test("form validation works and is accessible", async ({ page }) => {
    await page.goto("/workflows");
    
    // Open dialog
    await page.getByRole("button", { name: /create workflow/i }).click();
    
    // Try to submit empty form
    await page.getByRole("button", { name: /create workflow/i }).click();
    
    // Error should appear
    await expect(page.locator('role=alert')).toBeVisible();
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("workflow detail page is accessible", async ({ page }) => {
    // Assuming at least one workflow exists
    await page.goto("/workflows");
    
    // Click first workflow card if exists
    const firstCard = page.locator('[data-testid="workflow-card"]').first();
    if (await firstCard.count() > 0) {
      await firstCard.click();
      await expect(page.locator("h1")).toContainText(/workflow/i);
      
      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    }
  });

  test("document viewer is accessible", async ({ page }) => {
    await page.goto("/docs/product/projects/enterprise-design-system-startups/JTBD-enterprise-design-system-startups");
    
    // Should have back link
    await expect(page.getByRole("link", { name: /back to hub/i })).toBeVisible();
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("keyboard navigation works throughout", async ({ page }) => {
    await page.goto("/");
    
    // Tab through all interactive elements
    let focusableCount = 0;
    while (true) {
      await page.keyboard.press("Tab");
      const focused = await page.evaluate(() => document.activeElement?.tagName);
      if (!focused || focused === "BODY") break;
      focusableCount++;
      if (focusableCount > 50) break; // Safety limit
    }
    
    expect(focusableCount).toBeGreaterThan(0);
  });

  test("focus indicators are visible", async ({ page }) => {
    await page.goto("/workflows");
    
    // Tab to first button
    await page.keyboard.press("Tab");
    
    // Check if focused element has visible focus indicator
    const focusedElement = await page.evaluateHandle(() => document.activeElement);
    const styles = await focusedElement.evaluate((el) => {
      const computed = window.getComputedStyle(el as Element);
      return {
        outline: computed.outline,
        outlineWidth: computed.outlineWidth,
        boxShadow: computed.boxShadow,
      };
    });
    
    // Should have visible focus indicator
    expect(
      styles.outlineWidth !== "0px" || styles.boxShadow !== "none"
    ).toBeTruthy();
  });
});

