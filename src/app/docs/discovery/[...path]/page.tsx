import { readFileSync } from"fs";
import { join } from"path";
import { notFound } from"next/navigation";
import { MarkdownViewer } from"@/components/docs/markdown-viewer";
import { RelatedDocuments } from"@/components/docs/related-documents";
import Link from"next/link";
import { ArrowLeft, FileText } from"lucide-react";

// This route reads from the local filesystem at request time (various docs folders),
// so we must opt out of static prerendering or Next.js will try to generate
// static paths and fail whenever new docs are added.
export const dynamic ="force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ path: string[] }>;
}

export default async function DiscoveryDocumentPage({ params }: PageProps) {
  const { path: pathArray } = await params;
  const path = pathArray.join("/");
  
  let content: string | null = null;
  
  // Try discovery document path
  const possiblePaths = [
    join(process.cwd(),"docs","discovery", path +".md"),
    join(process.cwd(),"docs","discovery", path),
  ].filter((p): p is string => p !== null);

  // Try each possible path
  for (const possiblePath of possiblePaths) {
    try {
      content = readFileSync(possiblePath,"utf-8");
      break;
    } catch {
      // Try next path
      continue;
    }
  }

  if (!content) {
    notFound();
  }

  // TypeScript now knows content is string (not null) after notFound() check
  const finalContent: string = content;

  // Extract filename from path for title
  const filename = pathArray[pathArray.length - 1] || path;
  const title = filename
    .replace(".md","")
    .replace(/^(NICHE-INTEL|PAIN-SIGNALS|JTBD|OPPORTUNITY|REDTEAM|CHATGPT-REFINEMENT|MANUS|WORKFLOW)-/i,"")
    .replace(/-/g,"")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  // Extract project slug if present
  const projectSlug = pathArray.find(part => part.includes("-")) || null;

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass-card rounded-lg p-8 lg:p-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Link
                href="/docs/discovery"
                className="text-sm text-[var(--primary)] hover:text-[var(--primary)]/80 inline-flex items-center gap-2 transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Discovery
              </Link>
              <span className="px-2 py-1 text-xs font-semibold rounded bg-purple-500/20 text-purple-400 border border-purple-500/50">
                DISCOVERY
              </span>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 border border-purple-500/50 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold font-heading text-[var(--primary)] mb-2">
                  {title}
                </h1>
                {projectSlug && (
                  <p className="text-sm text-[hsl(var(--text-muted))] font-medium">
                    Project: {projectSlug.replace(/-/g,"").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <MarkdownViewer content={finalContent} />
          </div>

          {/* Related Documents */}
          <RelatedDocuments currentPath={`discovery/${path}`} projectSlug={projectSlug || undefined} />
        </div>
      </div>
    </div>
  );
}

