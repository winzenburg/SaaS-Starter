#!/usr/bin/env tsx
/**
 * Cleanup Empty Classes Script
 * 
 * Removes empty className attributes and orphaned hover/border classes
 * that were left after the migration.
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, extname } from "path";

const PROJECT_ROOT = process.cwd();
const SRC_DIR = join(PROJECT_ROOT, "src");

const SKIP_PATTERNS = [/design-demos/, /node_modules/, /\.next/, /\.git/];

function getAllFiles(dir: string, fileList: string[] = []): string[] {
  const files = readdirSync(dir);
  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    if (SKIP_PATTERNS.some((pattern) => pattern.test(filePath))) return;
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (extname(file) === ".tsx" || extname(file) === ".ts") {
      fileList.push(filePath);
    }
  });
  return fileList;
}

function cleanupFile(filePath: string): boolean {
  let content = readFileSync(filePath, "utf-8");
  const originalContent = content;

  // Remove empty hover: classes
  content = content.replace(/\bhover:\s+/g, "");
  content = content.replace(/\bhover:\s*["']/g, "");
  content = content.replace(/hover:\s/g, "");
  
  // Remove orphaned border/background classes
  content = content.replace(/\s+border\s+/g, " ");
  content = content.replace(/\s+border\s*["']/g, "");
  content = content.replace(/\s+\s+/g, " "); // Double spaces

  // Remove empty className attributes
  content = content.replace(/className="\s*"/g, '');
  content = content.replace(/className='\s*'/g, '');
  
  // Clean up trailing spaces before closing quotes
  content = content.replace(/\s+"/g, '"');
  content = content.replace(/\s+'/g, "'");
  
  // Remove multiple spaces
  content = content.replace(/\s{2,}/g, " ");

  if (content !== originalContent) {
    writeFileSync(filePath, content, "utf-8");
    return true;
  }
  return false;
}

async function cleanup() {
  console.log("🧹 Cleaning up empty classes...\n");
  const files = getAllFiles(SRC_DIR);
  let cleaned = 0;

  files.forEach((file) => {
    if (cleanupFile(file)) {
      cleaned++;
      console.log(`✅ Cleaned: ${file.replace(PROJECT_ROOT + "/", "")}`);
    }
  });

  console.log(`\n✅ Cleanup complete! Cleaned ${cleaned} files.\n`);
}

cleanup().catch((error) => {
  console.error("❌ Cleanup failed:", error);
  process.exit(1);
});

