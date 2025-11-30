import { readdirSync, readFileSync, statSync, existsSync } from"fs";
import { join } from"path";
import { ArticlesList } from"@/components/articles/articles-list";

export const dynamic ="force-dynamic";
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

  const frontmatterText: string = match[1];
  const frontmatter: Partial<ArticleMeta> = {};
  const lines = frontmatterText.split("\n");

  for (const line of lines) {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length > 0) {
      const value = valueParts.join(":").trim().replace(/^["']|["']$/g,"");
      if (key.trim() ==="title") frontmatter.title = value;
      if (key.trim() ==="description") frontmatter.description = value;
      if (key.trim() ==="publishedAt") frontmatter.publishedAt = value;
      if (key.trim() ==="readTime") frontmatter.readTime = parseInt(value, 10);
      if (key.trim() ==="category") frontmatter.category = value;
      if (key.trim() ==="tags") {
        frontmatter.tags = value.split(",").map((t) => t.trim());
      }
    }
  }

  return frontmatter;
}

function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const body = content.replace(/^---\n[\s\S]*?\n---\n/,"");
  const words = body.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export default async function ArticlesPage() {
  const articlesDir = join(process.cwd(),"articles");
  const articles: ArticleMeta[] = [];

  try {
    if (!existsSync(articlesDir)) {
      console.warn("Articles directory does not exist:", articlesDir);
      return (
        <div className="min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ArticlesList articles={[]} />
          </div>
        </div>
      );
    }

    const files = readdirSync(articlesDir).filter(
      (file) => file.endsWith(".md") || file.endsWith(".mdx")
    );

    for (const file of files) {
      try {
        const filePath = join(articlesDir, file);
        const stats = statSync(filePath);
        const content = readFileSync(filePath,"utf-8");
        const frontmatter = extractFrontmatter(content);
        const slug = file.replace(/\.(md|mdx)$/,"");

        const article: ArticleMeta = {
          slug,
          title: frontmatter.title || slug.replace(/-/g,"").replace(/\b\w/g, (l) => l.toUpperCase()),
          description: frontmatter.description,
          publishedAt: frontmatter.publishedAt || stats.mtime.toISOString(),
          readTime: frontmatter.readTime || calculateReadTime(content),
          category: frontmatter.category,
          tags: frontmatter.tags,
        };

        articles.push(article);
      } catch (error) {
        console.error(`Error reading article ${file}:`, error);
      }
    }

    // Sort by publishedAt (newest first)
    articles.sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    // Directory doesn't exist or can't be read
    console.error("Error reading articles directory:", error);
    // Return empty array instead of crashing
  }

  return (
    <div className="marketing-page">
      {/* Hero Section - Marketing Style */}
      <section className="marketing-hero">
        <h1 className="marketing-hero h1">
          Articles
        </h1>
        <p className="marketing-hero p">
          Product creation insights, guides, and lessons learned. 
          Cultivate your understanding of building SaaS products.
        </p>
      </section>

      {/* Articles Grid - Marketing Style */}
      <section className="marketing-section">
        <div className="max-w-7xl mx-auto">
          <ArticlesList articles={articles} />
        </div>
      </section>
    </div>
  );
}

