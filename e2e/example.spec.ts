import { test, expect } from "@playwright/test";

test("homepage loads", async ({ page }) => {
  await page.goto("/");

  // Check that the page title is correct
  await expect(page).toHaveTitle(/SaaS Starter/);

  // Check that the main heading is visible
  await expect(page.getByRole("heading", { name: /SaaS Starter/i })).toBeVisible();
});

