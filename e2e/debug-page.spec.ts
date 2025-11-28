/**
 * Debug script to investigate page issues
 * 
 * Run with: npx playwright test debug-page.spec.ts --headed
 */

import { test } from "@playwright/test";

// Skip webServer since we're using existing dev server
test.use({
  baseURL: "http://localhost:3000",
});

test.describe("Page Debugging", () => {
  test("Check home page loads correctly", async ({ page }) => {
    // Listen for console messages
    const consoleMessages: Array<{ type: string; text: string }> = [];
    page.on("console", (msg) => {
      consoleMessages.push({ type: msg.type(), text: msg.text() });
    });

    // Listen for page errors
    const pageErrors: string[] = [];
    page.on("pageerror", (error) => {
      pageErrors.push(`Page error: ${error.message}`);
    });

    // Listen for failed requests
    const failedRequests: string[] = [];
    page.on("requestfailed", (request) => {
      failedRequests.push(`${request.method()} ${request.url()} - ${request.failure()?.errorText}`);
    });

    // Navigate to home page
    console.log("\n=== Navigating to home page ===");
    const response = await page.goto("http://localhost:3000", { 
      waitUntil: "domcontentloaded",
      timeout: 10000 
    });
    console.log("Response status:", response?.status());

    // Wait a bit for everything to load
    await page.waitForTimeout(3000);

    // Take a screenshot
    await page.screenshot({ path: "e2e/debug-home.png", fullPage: true });
    console.log("Screenshot saved to e2e/debug-home.png");

    // Check page title
    const title = await page.title();
    console.log("\n=== Page Info ===");
    console.log("Page title:", title);
    console.log("Page URL:", page.url());

    // Check if page content exists
    const bodyText = await page.textContent("body");
    console.log("\nBody text (first 1000 chars):");
    console.log(bodyText?.substring(0, 1000));

    // Check for specific elements
    const hasH1 = await page.locator("h1").count();
    console.log("\n=== Element Counts ===");
    console.log("Number of h1 elements:", hasH1);
    if (hasH1 > 0) {
      const h1Text = await page.locator("h1").first().textContent();
      console.log("First h1 text:", h1Text);
    }

    // Check for main element
    const hasMain = await page.locator("main").count();
    console.log("Number of main elements:", hasMain);

    // Check for error messages
    const errorElements = await page.locator('[class*="error"], [class*="Error"]').count();
    console.log("Error elements found:", errorElements);

    // Check HTML structure
    const htmlContent = await page.content();
    console.log("\n=== HTML Structure ===");
    console.log("HTML length:", htmlContent.length);
    console.log("Has 'SaaS Starter' text:", htmlContent.includes("SaaS Starter"));
    console.log("Has '404' text:", htmlContent.includes("404"));
    console.log("Has 'Internal Server Error' text:", htmlContent.includes("Internal Server Error"));

    // Log all console messages
    if (consoleMessages.length > 0) {
      console.log("\n=== Console Messages ===");
      consoleMessages.forEach((msg, i) => {
        console.log(`${i + 1}. [${msg.type}] ${msg.text}`);
      });
    }

    // Log page errors
    if (pageErrors.length > 0) {
      console.log("\n=== Page Errors ===");
      pageErrors.forEach((error, i) => {
        console.log(`${i + 1}. ${error}`);
      });
    }

    // Log failed requests
    if (failedRequests.length > 0) {
      console.log("\n=== Failed Requests ===");
      failedRequests.forEach((req, i) => {
        console.log(`${i + 1}. ${req}`);
      });
    }

    console.log("\n=== Test Complete ===");
  });

  test("Check workflows page", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("http://localhost:3000/workflows");
    await page.waitForTimeout(2000);

    await page.screenshot({ path: "e2e/debug-workflows.png", fullPage: true });

    const title = await page.title();
    console.log("Workflows page title:", title);

    const bodyText = await page.textContent("body");
    console.log("Body text (first 500 chars):", bodyText?.substring(0, 500));

    if (consoleErrors.length > 0) {
      console.log("\n=== Console Errors ===");
      consoleErrors.forEach((error, i) => {
        console.log(`${i + 1}. ${error}`);
      });
    }
  });

  test("Check hub page", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("http://localhost:3000/hub");
    await page.waitForTimeout(2000);

    await page.screenshot({ path: "e2e/debug-hub.png", fullPage: true });

    const title = await page.title();
    console.log("Hub page title:", title);

    if (consoleErrors.length > 0) {
      console.log("\n=== Console Errors ===");
      consoleErrors.forEach((error, i) => {
        console.log(`${i + 1}. ${error}`);
      });
    }
  });

  test("Check for hydration errors", async ({ page }) => {
    const hydrationErrors: string[] = [];
    
    page.on("console", (msg) => {
      const text = msg.text();
      if (text.includes("hydration") || text.includes("Hydration")) {
        hydrationErrors.push(text);
      }
    });

    await page.goto("http://localhost:3000");
    await page.waitForTimeout(3000);

    if (hydrationErrors.length > 0) {
      console.log("\n=== Hydration Errors ===");
      hydrationErrors.forEach((error, i) => {
        console.log(`${i + 1}. ${error}`);
      });
    }

    // Check HTML structure
    const html = await page.content();
    const hasWmEditor = html.includes("wm-editor-extension");
    console.log("Has wm-editor-extension attribute:", hasWmEditor);

    // Get all attributes on html element
    const htmlElement = await page.locator("html").first();
    const attributes = await htmlElement.evaluate((el) => {
      return Array.from(el.attributes).map((attr) => ({
        name: attr.name,
        value: attr.value,
      }));
    });
    console.log("HTML element attributes:", attributes);
  });
});

