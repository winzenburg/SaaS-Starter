"use client";

import Link from"next/link";
import { motion } from"framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from"@/components/ui/card";
import { Badge } from"@/components/ui/badge";
import { FileText, Calendar, Clock, ArrowRight } from"lucide-react";

interface ArticleMeta {
  slug: string;
  title: string;
  description?: string;
  publishedAt: string;
  readTime?: number;
  category?: string;
  tags?: string[];
}

interface ArticlesListProps {
  articles: ArticleMeta[];
}

export function ArticlesList({ articles }: ArticlesListProps) {
  if (articles.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="text-center py-12 border-dashed glass-card">
          <CardHeader>
            <div className="w-16 h-16  backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border">
              <FileText className="w-8 h-8 text-[hsl(var(--text-muted))]" />
            </div>
            <CardTitle className="text-2xl mb-3 text-[hsl(var(--text-main))]">No articles yet</CardTitle>
            <CardDescription className="text-lg mb-6 text-[hsl(var(--text-muted))]">
              Articles will appear here once they're created
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      {articles.map((article, index) => (
        <motion.div
          key={article.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link href={`/articles/${article.slug}`}>
            <Card className="group h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 glass-card cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl flex-1 group-hover:text-[var(--primary)] transition-colors duration-300 text-[hsl(var(--text-main))] line-clamp-2">
                    {article.title}
                  </CardTitle>
                </div>
                {article.description && (
                  <CardDescription className="line-clamp-3 text-[hsl(var(--text-muted))]">
                    {article.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-[hsl(var(--text-muted))] mb-4">
                  <div className="flex items-center gap-4">
                    {article.publishedAt && (
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                      </div>
                    )}
                    {article.readTime && (
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime} min read</span>
                      </div>
                    )}
                  </div>
                </div>
                {article.category && (
                  <Badge variant="outline" className="mb-2  text-[hsl(var(--text-muted))]">
                    {article.category}
                  </Badge>
                )}
                <div className="flex items-center gap-2 text-[var(--primary)] group-hover:text-[var(--primary)]/80 mt-4 transition-colors duration-300">
                  <span className="text-sm font-semibold">Read article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

