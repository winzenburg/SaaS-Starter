#!/usr/bin/env tsx
/**
 * Red Dot Award Winner Fetcher
 * 
 * Fetches and parses Red Dot Award winner data from the most recent year for UI design inspiration.
 * 
 * Usage:
 *   npm run fetch-red-dot-winners
 *   npm run fetch-red-dot-winners -- --category product-design
 *   npm run fetch-red-dot-winners -- --output docs/ux/red-dot-winners
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { chromium, type Browser, type Page } from "playwright";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const HUB_ROOT = resolve(__dirname, "..");

interface RedDotWinner {
  id: string;
  title: string;
  description?: string;
  category: string;
  year: number;
  awardType?: "red-dot" | "best-of-best" | "grand-prix";
  company?: string;
  designer?: string;
  country?: string;
  imageUrl?: string;
  detailUrl?: string;
  tags?: string[];
}

interface FetchOptions {
  year: number; // Automatically set to most recent year
  category: "product-design" | "brands-communication" | "design-concept" | "all";
  outputDir: string;
  limit?: number;
}

const DEFAULT_OPTIONS: Omit<FetchOptions, "year"> = {
  category: "product-design",
  outputDir: join(HUB_ROOT, "docs/ux/red-dot-winners"),
};

/**
 * Get the most recent year with Red Dot Award winners
 * Defaults to current year, but can check website if needed
 */
function getMostRecentYear(): number {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth(); // 0-11
  
  // Red Dot Awards are typically announced in summer/fall
  // If we're in early year (Jan-Jul), previous year might still be most recent with full results
  // For simplicity, use current year (winners are typically from previous year's competition)
  // You can manually override if needed, but default to current year
  return currentYear;
}

function parseArgs(): Partial<Omit<FetchOptions, "year">> {
  const args = process.argv.slice(2);
  const options: Partial<Omit<FetchOptions, "year">> = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--category" && args[i + 1]) {
      const category = args[i + 1] as FetchOptions["category"];
      if (["product-design", "brands-communication", "design-concept", "all"].includes(category)) {
        options.category = category;
      }
      i++;
    } else if (arg === "--output" && args[i + 1]) {
      options.outputDir = resolve(args[i + 1]);
      i++;
    } else if (arg === "--limit" && args[i + 1]) {
      options.limit = parseInt(args[i + 1], 10);
      i++;
    } else if (arg === "--help" || arg === "-h") {
      console.log(`
Red Dot Award Winner Fetcher

Usage:
  npm run fetch-red-dot-winners [options]

Options:
  --category <category>      Category: product-design, brands-communication, design-concept, all (default: product-design)
  --output <path>            Output directory (default: docs/ux/red-dot-winners)
  --limit <number>           Limit number of winners to fetch (optional)
  --help, -h                 Show this help message

Note: Automatically fetches from the most recent year (currently ${getMostRecentYear()}).

Examples:
  npm run fetch-red-dot-winners
  npm run fetch-red-dot-winners -- --category product-design
  npm run fetch-red-dot-winners -- --category all --limit 50
      `);
      process.exit(0);
    }
  }

  return options;
}

/**
 * Get Red Dot Award search URL based on category and year
 */
function getSearchUrl(category: FetchOptions["category"], year: number): string {
  const baseUrl = "https://www.red-dot.org/search";
  
  switch (category) {
    case "product-design":
      // Product Design category filter
      return `${baseUrl}?solr[filter][]=year%3A${year}&solr[filter][]=meta_categories%3A%2F10%2F`;
    case "brands-communication":
      // Brands & Communication Design
      return `${baseUrl}?solr[filter][]=year%3A${year}&solr[filter][]=meta_categories%3A%2F20%2F`;
    case "design-concept":
      // Design Concept
      return `${baseUrl}?solr[filter][]=year%3A${year}&solr[filter][]=meta_categories%3A%2F30%2F`;
    case "all":
      return `${baseUrl}?solr[filter][]=year%3A${year}`;
    default:
      return `${baseUrl}?solr[filter][]=year%3A${year}&solr[filter][]=meta_categories%3A%2F10%2F`;
  }
}

/**
 * Extract winner data from a search result item
 */
async function extractWinnerData(page: Page, itemElement: any): Promise<RedDotWinner | null> {
  try {
    // Extract basic information
    const titleElement = await itemElement.$("h3, h2, .title, [class*='title']");
    const title = titleElement ? (await titleElement.textContent())?.trim() || "Untitled" : "Untitled";

    // Extract description
    const descElement = await itemElement.$("p, .description, [class*='description']");
    const description = descElement ? (await descElement.textContent())?.trim() : undefined;

    // Extract image URL
    const imgElement = await itemElement.$("img");
    const imageUrl = imgElement ? await imgElement.getAttribute("src") || await imgElement.getAttribute("data-src") : undefined;

    // Extract link
    const linkElement = await itemElement.$("a");
    const detailUrl = linkElement ? await linkElement.getAttribute("href") : undefined;
    const fullDetailUrl = detailUrl?.startsWith("http") ? detailUrl : detailUrl ? `https://www.red-dot.org${detailUrl}` : undefined;

    // Extract award type from badges or classes
    const awardType: RedDotWinner["awardType"] = "red-dot";
    const badgeText = await itemElement.textContent();
    if (badgeText?.toLowerCase().includes("best of the best")) {
      awardType = "best-of-best";
    } else if (badgeText?.toLowerCase().includes("grand prix")) {
      awardType = "grand-prix";
    }

    // Generate ID from title
    const id = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
      .substring(0, 100);

    return {
      id,
      title,
      description,
      category: "product-design", // Will be updated based on actual category
      year: new Date().getFullYear(),
      awardType,
      imageUrl,
      detailUrl: fullDetailUrl,
    };
  } catch (error) {
    console.error("Error extracting winner data:", error);
    return null;
  }
}

/**
 * Fetch winners from Red Dot Award website
 */
async function fetchWinners(browser: Browser, options: FetchOptions): Promise<RedDotWinner[]> {
  const page = await browser.newPage();
  const winners: RedDotWinner[] = [];

  try {
    const searchUrl = getSearchUrl(options.category, options.year);
    console.log(`Fetching winners from: ${searchUrl}`);

    await page.goto(searchUrl, { waitUntil: "networkidle" });
    
    // Wait for search results to load - Red Dot website uses JavaScript rendering
    await page.waitForTimeout(5000);
    
    // Try to wait for specific content indicators
    try {
      await page.waitForSelector("body", { timeout: 10000 });
    } catch (e) {
      console.warn("Timeout waiting for page content, continuing anyway...");
    }

    // Try multiple selectors for search results
    const possibleSelectors = [
      ".search-result",
      ".result-item",
      "[class*='result']",
      "[class*='winner']",
      ".product-item",
      "article",
      ".card",
    ];

    let items: any[] = [];
    for (const selector of possibleSelectors) {
      items = await page.$$(selector);
      if (items.length > 0) {
        console.log(`Found ${items.length} items using selector: ${selector}`);
        break;
      }
    }

    if (items.length === 0) {
      console.warn("No winners found. The page structure may have changed.");
      console.log("Page content preview:", await page.content().then(c => c.substring(0, 500)));
      return [];
    }

    const limit = options.limit || items.length;
    const itemsToProcess = items.slice(0, limit);

    console.log(`Processing ${itemsToProcess.length} winners...`);

    for (let i = 0; i < itemsToProcess.length; i++) {
      const item = itemsToProcess[i];
      console.log(`Processing winner ${i + 1}/${itemsToProcess.length}...`);

      const winner = await extractWinnerData(page, item);
      if (winner) {
        winner.category = options.category;
        winner.year = options.year;
        winners.push(winner);
      }
    }

    return winners;
  } catch (error) {
    console.error("Error fetching winners:", error);
    throw error;
  } finally {
    await page.close();
  }
}

/**
 * Save winners to JSON file
 */
function saveWinnersToJson(winners: RedDotWinner[], outputDir: string, category: string, year: number): void {
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const filename = `red-dot-${category}-${year}.json`;
  const filepath = join(outputDir, filename);

  const data = {
    metadata: {
      fetchedAt: new Date().toISOString(),
      category,
      year,
      count: winners.length,
      source: "https://www.red-dot.org",
    },
    winners,
  };

  writeFileSync(filepath, JSON.stringify(data, null, 2), "utf-8");
  console.log(`Saved ${winners.length} winners to: ${filepath}`);
}

/**
 * Save winners to Markdown file for easy viewing
 */
function saveWinnersToMarkdown(winners: RedDotWinner[], outputDir: string, category: string, year: number): void {
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const filename = `red-dot-${category}-${year}.md`;
  const filepath = join(outputDir, filename);

  const categoryName = category.split("-").map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(" ");

  let markdown = `# Red Dot Award: ${categoryName} ${year}\n\n`;
  markdown += `Fetched: ${new Date().toISOString()}\n`;
  markdown += `Source: https://www.red-dot.org\n`;
  markdown += `Total Winners: ${winners.length}\n\n`;
  markdown += `---\n\n`;

  for (const winner of winners) {
    markdown += `## ${winner.title}\n\n`;
    
    if (winner.awardType && winner.awardType !== "red-dot") {
      markdown += `**Award**: ${winner.awardType === "best-of-best" ? "Best of the Best" : "Grand Prix"}\n\n`;
    }

    if (winner.description) {
      markdown += `${winner.description}\n\n`;
    }

    if (winner.imageUrl) {
      markdown += `![${winner.title}](${winner.imageUrl})\n\n`;
    }

    if (winner.detailUrl) {
      markdown += `[View Details](${winner.detailUrl})\n\n`;
    }

    if (winner.company) {
      markdown += `**Company**: ${winner.company}\n\n`;
    }

    if (winner.designer) {
      markdown += `**Designer**: ${winner.designer}\n\n`;
    }

    if (winner.country) {
      markdown += `**Country**: ${winner.country}\n\n`;
    }

    markdown += `---\n\n`;
  }

  writeFileSync(filepath, markdown, "utf-8");
  console.log(`Saved Markdown to: ${filepath}`);
}

/**
 * Main function
 */
async function main(): Promise<void> {
  const args = parseArgs();
  const mostRecentYear = getMostRecentYear();
  const options: FetchOptions = { 
    ...DEFAULT_OPTIONS, 
    ...args,
    year: mostRecentYear, // Always use most recent year
  };

  console.log("Red Dot Award Winner Fetcher");
  console.log("=============================");
  console.log(`Year: ${options.year} (most recent)`);
  console.log(`Category: ${options.category}`);
  console.log(`Output: ${options.outputDir}`);
  if (options.limit) {
    console.log(`Limit: ${options.limit}`);
  }
  console.log("");

  const browser = await chromium.launch({ headless: true });
  
  try {
    const winners = await fetchWinners(browser, options);

    if (winners.length === 0) {
      console.log("No winners found. This may be due to:");
      console.log("1. The page structure may have changed");
      console.log("2. The website may require JavaScript to load content");
      console.log("3. No winners may exist for the specified year/category");
      console.log("\nTry visiting the URL manually to verify:");
      console.log(getSearchUrl(options.category, options.year));
      return;
    }

    console.log(`\nSuccessfully fetched ${winners.length} winners!`);

    // Save to JSON
    saveWinnersToJson(winners, options.outputDir, options.category, options.year);

    // Save to Markdown
    saveWinnersToMarkdown(winners, options.outputDir, options.category, options.year);

    console.log("\nDone!");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}

export { main, fetchWinners, extractWinnerData, type RedDotWinner, type FetchOptions };

