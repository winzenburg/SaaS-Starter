/**
 * Quick script to check if all routes are accessible
 */

import { readdirSync, statSync } from "fs";
import { join } from "path";

const routes = [
  "/",
  "/hub",
  "/workflows",
  "/articles",
  "/docs/discovery",
  "/docs/validation",
];

const apiRoutes = [
  "/api/hub/projects",
  "/api/workflows",
  "/api/articles",
];

console.log("Checking routes...\n");

// Check if page files exist
const appDir = join(process.cwd(), "src", "app");

function checkRoute(route: string): boolean {
  if (route === "/") {
    return require("fs").existsSync(join(appDir, "page.tsx"));
  }
  
  const parts = route.split("/").filter(Boolean);
  let currentPath = appDir;
  
  for (const part of parts) {
    currentPath = join(currentPath, part);
    if (!require("fs").existsSync(currentPath)) {
      return false;
    }
  }
  
  return require("fs").existsSync(join(currentPath, "page.tsx")) || 
         require("fs").existsSync(join(currentPath, "route.ts"));
}

routes.forEach(route => {
  const exists = checkRoute(route);
  console.log(`${exists ? "✅" : "❌"} ${route}`);
});

console.log("\nChecking API routes...\n");

apiRoutes.forEach(route => {
  const exists = checkRoute(route);
  console.log(`${exists ? "✅" : "❌"} ${route}`);
});

console.log("\nChecking articles directory...\n");
const articlesDir = join(process.cwd(), "articles");
if (require("fs").existsSync(articlesDir)) {
  const files = readdirSync(articlesDir).filter(f => f.endsWith(".md"));
  console.log(`✅ Articles directory exists with ${files.length} article(s)`);
  files.forEach(file => {
    console.log(`   - ${file}`);
  });
} else {
  console.log("❌ Articles directory does not exist");
}

