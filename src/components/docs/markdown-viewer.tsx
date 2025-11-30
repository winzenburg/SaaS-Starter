/**
 * Markdown Viewer Component
 * 
 * Renders markdown content with proper styling and formatting
 */

import ReactMarkdown from"react-markdown";
import remarkGfm from"remark-gfm";
import rehypeRaw from"rehype-raw";
import rehypeSanitize from"rehype-sanitize";

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

export function MarkdownViewer({ content, className ="" }: MarkdownViewerProps) {
  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          // Headings
          h1: ({ children }) => (
            <h1 className="text-4xl font-bold font-heading text-[hsl(var(--text-main))] mt-8 mb-4 pb-3 border-b">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-bold font-heading text-[hsl(var(--text-main))] mt-8 mb-4 pb-2 border-b">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-semibold font-heading text-[hsl(var(--text-main))] mt-6 mb-3">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xl font-semibold text-[hsl(var(--text-main))] mt-5 mb-2">
              {children}
            </h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-lg font-semibold text-[hsl(var(--text-muted))] mt-4 mb-2">
              {children}
            </h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-base font-semibold text-[hsl(var(--text-muted))] mt-3 mb-2">
              {children}
            </h6>
          ),
          // Paragraphs
          p: ({ children }) => (
            <p className="text-[hsl(var(--text-muted))] leading-7 mb-4">
              {children}
            </p>
          ),
          // Lists
          ul: ({ children }) => (
            <ul className="list-disc mb-4 space-y-2 text-[hsl(var(--text-muted))] ml-6 pl-2">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal mb-4 space-y-2 text-[hsl(var(--text-muted))] ml-6 pl-2">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-7 pl-1">
              {children}
            </li>
          ),
          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith("http") ?"_blank" : undefined}
              rel={href?.startsWith("http") ?"noopener noreferrer" : undefined}
              className="text-[var(--primary)] hover:text-[var(--primary)]/80 underline transition-colors duration-300"
            >
              {children}
            </a>
          ),
          // Code blocks
          code: ({ className, children, ...props }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="text-[var(--primary)] px-1.5 py-0.5 rounded text-sm font-mono border" {...props}>
                  {children}
                </code>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="border rounded-lg p-4 mb-4 overflow-x-auto">
              {children}
            </pre>
          ),
          // Blockquotes
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[var(--primary)]/50 pl-4 my-4 italic text-[hsl(var(--text-muted))] /30 py-2 rounded-r">
              {children}
            </blockquote>
          ),
          // Tables
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border-collapse border rounded-lg">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody>
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="border-b  hover:/30 transition-colors">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left text-sm font-semibold text-[hsl(var(--text-main))] border-r">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-sm text-[hsl(var(--text-muted))] border-r">
              {children}
            </td>
          ),
          // Horizontal rule
          hr: () => (
            <hr className="my-8 border-0 border-t" />
          ),
          // Strong/Bold
          strong: ({ children }) => (
            <strong className="font-bold text-[hsl(var(--text-main))]">
              {children}
            </strong>
          ),
          // Emphasis/Italic
          em: ({ children }) => (
            <em className="italic text-[hsl(var(--text-main))]">
              {children}
            </em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

