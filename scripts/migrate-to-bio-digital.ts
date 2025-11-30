#!/usr/bin/env tsx
/**
 * Bio-Digital Design System Migration Script
 * 
 * Systematically replaces dark mode classes with Bio-Digital light theme classes
 * across all pages and components.
 * 
 * Usage:
 *   npm run migrate-to-bio-digital
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, extname } from "path";

const PROJECT_ROOT = process.cwd();
const SRC_DIR = join(PROJECT_ROOT, "src");

// Files to skip (design demos are intentionally different)
const SKIP_PATTERNS = [
  /design-demos/,
  /node_modules/,
  /\.next/,
  /\.git/,
];

interface Replacement {
  pattern: RegExp | string;
  replacement: string;
  description: string;
}

// Patterns to replace in order
const REPLACEMENTS: Replacement[] = [
  // Background gradients - Remove dark backgrounds (body already has Bio-Digital gradient)
  {
    pattern: /min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950/g,
    replacement: "min-h-screen",
    description: "Remove dark gradient backgrounds"
  },
  {
    pattern: /bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950/g,
    replacement: "",
    description: "Remove dark gradient backgrounds"
  },

  // Text colors - Replace with Bio-Digital tokens
  {
    pattern: /text-white(?![^\s"']*hover)/g,
    replacement: "text-[hsl(var(--text-main))]",
    description: "Replace white text with Bio-Digital main text color"
  },
  {
    pattern: /text-gray-300/g,
    replacement: "text-[hsl(var(--text-muted))]",
    description: "Replace gray-300 with Bio-Digital muted text"
  },
  {
    pattern: /text-gray-400/g,
    replacement: "text-[hsl(var(--text-muted))]",
    description: "Replace gray-400 with Bio-Digital muted text"
  },
  {
    pattern: /text-gray-500/g,
    replacement: "text-[hsl(var(--text-muted))]",
    description: "Replace gray-500 with Bio-Digital muted text"
  },
  {
    pattern: /text-gray-200/g,
    replacement: "text-[hsl(var(--text-main))]",
    description: "Replace gray-200 with Bio-Digital main text"
  },

  // Card/Background colors - Remove dark backgrounds
  {
    pattern: /bg-slate-800\/50/g,
    replacement: "",
    description: "Remove dark slate background overlays"
  },
  {
    pattern: /bg-slate-800/g,
    replacement: "",
    description: "Remove dark slate backgrounds"
  },
  {
    pattern: /bg-slate-900/g,
    replacement: "",
    description: "Remove dark slate-900 backgrounds"
  },
  {
    pattern: /bg-slate-700/g,
    replacement: "",
    description: "Remove dark slate-700 backgrounds"
  },

  // Borders - Remove dark borders
  {
    pattern: /border-slate-700\/30/g,
    replacement: "",
    description: "Remove dark slate-700 borders"
  },
  {
    pattern: /border-slate-700/g,
    replacement: "",
    description: "Remove dark slate borders"
  },
  {
    pattern: /border-slate-800/g,
    replacement: "",
    description: "Remove dark slate-800 borders"
  },
  {
    pattern: /border-slate-600\/40/g,
    replacement: "",
    description: "Remove dark slate-600 borders"
  },

  // Hover states - Clean up dark hover states
  {
    pattern: /hover:border-slate-600\/40/g,
    replacement: "",
    description: "Remove dark hover borders"
  },
  {
    pattern: /hover:bg-slate-800/g,
    replacement: "",
    description: "Remove dark hover backgrounds"
  },

  // Replace gradient text colors with Bio-Digital primary
  {
    pattern: /bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent/g,
    replacement: "text-[var(--primary)]",
    description: "Replace Cosmic Dusk gradient with Bio-Digital primary"
  },
];

// Get all TypeScript/TSX files recursively
function getAllFiles(dir: string, fileList: string[] = []): string[] {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    // Skip if matches skip patterns
    if (SKIP_PATTERNS.some((pattern) => pattern.test(filePath))) {
      return;
    }

    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (extname(file) === ".tsx" || extname(file) === ".ts") {
      fileList.push(filePath);
    }
  });

  return fileList;
}

interface FileChange {
  file: string;
  changes: string[];
}

function processFile(filePath: string): FileChange | null {
  let content = readFileSync(filePath, "utf-8");
  const originalContent = content;
  const changes: string[] = [];

  REPLACEMENTS.forEach(({ pattern, replacement, description }) => {
    if (typeof pattern === "string") {
      if (content.includes(pattern)) {
        const count = (content.match(new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
        content = content.replaceAll(pattern, replacement);
        if (count > 0) {
          changes.push(`${description} (${count} replacements)`);
        }
      }
    } else {
      // Regex pattern
      const matches = content.match(pattern);
      if (matches) {
        const count = matches.length;
        content = content.replace(pattern, replacement);
        changes.push(`${description} (${count} replacements)`);
      }
    }
  });

  // Clean up multiple spaces and empty className attributes
  content = content.replace(/className="\s+"/g, '');
  content = content.replace(/className="(\s+)/g, 'className="');
  content = content.replace(/(\s+)"/g, '"');
  content = content.replace(/\s+/g, ' '); // Normalize whitespace

  if (content !== originalContent && changes.length > 0) {
    return { file: filePath, changes };
  }

  return null;
}

async function migrate() {
  console.log("🚀 Starting Bio-Digital Design System Migration\n");
  console.log("📁 Scanning files...\n");

  const files = getAllFiles(SRC_DIR);
  console.log(`Found ${files.length} TypeScript/TSX files to process\n`);

  const fileChanges: FileChange[] = [];
  let totalFilesChanged = 0;
  let totalChanges = 0;

  // Process each file
  files.forEach((file) => {
    const change = processFile(file);
    
    if (change) {
      fileChanges.push(change);
      totalFilesChanged++;
      totalChanges += change.changes.length;
    }
  });

  // Show summary
  console.log(`\n📊 Migration Summary:`);
  console.log(`   Files scanned: ${files.length}`);
  console.log(`   Files changed: ${totalFilesChanged}`);
  console.log(`   Total replacements: ${totalChanges}\n`);

  if (fileChanges.length === 0) {
    console.log("✅ No changes needed - all files already use Bio-Digital design system!\n");
    return;
  }

  // Show what will be changed (first 10 files)
  console.log("📝 Files to be modified:\n");
  fileChanges.slice(0, 10).forEach(({ file, changes }) => {
    const relativePath = file.replace(PROJECT_ROOT + "/", "");
    console.log(`   ${relativePath}`);
    changes.slice(0, 3).forEach((change) => {
      console.log(`     - ${change}`);
    });
    if (changes.length > 3) {
      console.log(`     ... and ${changes.length - 3} more`);
    }
    console.log();
  });

  if (fileChanges.length > 10) {
    console.log(`   ... and ${fileChanges.length - 10} more files\n`);
  }

  // Apply changes
  console.log("💾 Applying changes...\n");
  fileChanges.forEach(({ file }) => {
    let content = readFileSync(file, "utf-8");

    // Apply all replacements
    REPLACEMENTS.forEach(({ pattern, replacement }) => {
      if (typeof pattern === "string") {
        content = content.replaceAll(pattern, replacement);
      } else {
        // For regex, replace all occurrences
        const globalPattern = new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g');
        content = content.replace(globalPattern, replacement);
      }
    });

    // Clean up
    content = content.replace(/className="\s+"/g, '');
    content = content.replace(/className="(\s+)/g, 'className="');
    content = content.replace(/(\s+)"/g, '"');

    writeFileSync(file, content, "utf-8");
  });

  console.log("✅ Migration complete!\n");
  console.log("⚠️  Please review the changes and test the application.\n");
  console.log("Next steps:");
  console.log("1. Check git diff to review changes");
  console.log("2. Run the dev server and visually inspect pages");
  console.log("3. Test key user flows");
  console.log("4. Commit when satisfied\n");
}

// Run migration
migrate().catch((error) => {
  console.error("❌ Migration failed:", error);
  if (error instanceof Error) {
    console.error("Error details:", error.message);
    console.error("Stack:", error.stack);
  }
  process.exit(1);
});

export { migrate };
