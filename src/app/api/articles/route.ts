import { NextResponse } from "next/server";
import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface ArticleMeta {
  slug: string;
  title: string;
  description?: string;
  publishedAt: string;
  readTime?: number;
  category?: string;
  tags?: string[];
}

function extractFrontmatter(content: string): Partial<ArticleMeta> {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match || !match[1]) {
    return {};
  }

  const frontmatterText = match[1];
  const frontmatter: Partial<ArticleMeta> = {};
  const lines = frontmatterText.split("\n");

  for (const line of lines) {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length > 0) {
      const value = valueParts.join(":").trim().replace(/^["']|["']$/g, "");
      if (key.trim() === "title") frontmatter.title = value;
      if (key.trim() === "description") frontmatter.description = value;
      if (key.trim() === "publishedAt") frontmatter.publishedAt = value;
      if (key.trim() === "readTime") frontmatter.readTime = parseInt(value, 10);
      if (key.trim() === "category") frontmatter.category = value;
      if (key.trim() === "tags") {
        frontmatter.tags = value.split(",").map((t) => t.trim());
      }
    }
  }

  return frontmatter;
}

function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const body = content.replace(/^---\n[\s\S]*?\n---\n/, "");
  const words = body.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export async function GET() {
  try {
    const articlesDir = join(process.cwd(), "articles");

    // Check if articles directory exists
    let files: string[] = [];
    try {
      files = readdirSync(articlesDir).filter(
        (file) => file.endsWith(".md") || file.endsWith(".mdx")
      );
    } catch {
      // Directory doesn't exist, return empty array
      return NextResponse.json({ articles: [] });
    }

    const articles: ArticleMeta[] = [];

    for (const file of files) {
      try {
        const filePath = join(articlesDir, file);
        const stats = statSync(filePath);
        const content = readFileSync(filePath, "utf-8");
        const frontmatter = extractFrontmatter(content);
        const slug = file.replace(/\.(md|mdx)$/, "");

        articles.push({
          slug,
          title: frontmatter.title || slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
          description: frontmatter.description,
          publishedAt: frontmatter.publishedAt || stats.mtime.toISOString(),
          readTime: frontmatter.readTime || calculateReadTime(content),
          category: frontmatter.category,
          tags: frontmatter.tags,
        });
      } catch (error) {
        console.error(`Error reading article ${file}:`, error);
        // Continue with other files
      }
    }

    // Sort by publishedAt (newest first)
    articles.sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return dateB - dateA;
    });

    return NextResponse.json({ articles });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json({ articles: [] }, { status: 500 });
  }
}

