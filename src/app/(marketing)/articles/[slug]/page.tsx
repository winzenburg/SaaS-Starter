import { readFileSync, readdirSync, existsSync } from"fs";
import { join } from"path";
import { notFound } from"next/navigation";
import { MarkdownViewer } from"@/components/docs/markdown-viewer";
import Link from"next/link";
import { ArrowLeft, Calendar, Clock } from"lucide-react";
import { Badge } from"@/components/ui/badge";

export const dynamic ="force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface ArticleMeta {
  title: string;
  description?: string;
  publishedAt: string;
  readTime?: number;
  category?: string;
  tags?: string[];
}

function extractFrontmatter(content: string): { frontmatter: Partial<ArticleMeta>; body: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match || !match[1] || !match[2]) {
    return { frontmatter: {}, body: content };
  }

  const frontmatterText = match[1];
  const body = match[2];

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

  return { frontmatter, body };
}

function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const articlesDir = join(process.cwd(),"articles");

  let content: string | null = null;
  let articlePath: string | null = null;

  // Try to find the article file
  try {
    if (!existsSync(articlesDir)) {
      notFound();
    }
    
    const files = readdirSync(articlesDir);
    const articleFile = files.find((file) => file === `${slug}.md` || file === `${slug}.mdx`);

    if (articleFile) {
      articlePath = join(articlesDir, articleFile);
      content = readFileSync(articlePath,"utf-8");
    }
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
    // Directory doesn't exist or file not found
  }

  if (!content) {
    notFound();
  }

  const { frontmatter, body } = extractFrontmatter(content);
  const readTime = frontmatter.readTime || calculateReadTime(body);
  const title = frontmatter.title || slug.replace(/-/g,"").replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="min-h-screen">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass-card rounded-lg p-8 lg:p-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Link
                href="/articles"
                className="text-sm text-[var(--primary)] hover:text-[var(--primary)]/80 inline-flex items-center gap-2 transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Articles
              </Link>
            </div>

            <div className="mb-6">
              <h1 className="text-4xl sm:text-5xl font-bold font-heading text-[var(--primary)] mb-4">
                {title}
              </h1>
              {frontmatter.description && (
                <p className="text-xl text-[hsl(var(--text-muted))] leading-relaxed mb-6">
                  {frontmatter.description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              {frontmatter.publishedAt && (
                <div className="flex items-center gap-2 text-[hsl(var(--text-muted))] text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(frontmatter.publishedAt).toLocaleDateString("en-US", {
                    year:"numeric",
                    month:"long",
                    day:"numeric",
                  })}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-[hsl(var(--text-muted))] text-sm">
                <Clock className="w-4 h-4" />
                <span>{readTime} min read</span>
              </div>
              {frontmatter.category && (
                <Badge variant="outline" className="text-[hsl(var(--text-muted))]">
                  {frontmatter.category}
                </Badge>
              )}
            </div>

            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                {frontmatter.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-[hsl(var(--text-muted))] text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <MarkdownViewer content={body} />
          </div>
        </div>
      </article>
    </div>
  );
}

