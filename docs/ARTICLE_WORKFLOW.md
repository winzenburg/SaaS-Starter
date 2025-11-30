# Article Workflow: Using Claude to Write Articles

> Complete workflow for generating articles with Claude and publishing them in SaaS Starter

## Overview

The article workflow allows you to:
1. Use Claude to generate articles following the style guide
2. Automatically save them to the `articles/` directory
3. Display them beautifully in the SaaS Starter app
4. Serve as both personal reference and public content

## Quick Start

### Generate an Article

```bash
# Generate Article 1: "The Problem"
npx tsx scripts/generate-article-with-claude.ts 1

# Generate Article 2: "The Solution"
npx tsx scripts/generate-article-with-claude.ts 2
```

### View Articles

- **Listing Page**: http://localhost:3000/articles
- **Individual Article**: http://localhost:3000/articles/{slug}

## Workflow Steps

### 1. Prepare Article Configuration

Edit `scripts/generate-article-with-claude.ts` to add your article configuration:

```typescript
const ARTICLE_CONFIGS: Record<number, ArticleConfig> = {
  1: {
    articleNumber: 1,
    title: "Your Article Title",
    description: "Article description",
    hook: "Your hook",
    keyPoints: ["Point 1", "Point 2"],
    uniqueAngle: "What makes this unique",
    callToAction: "What readers should do next",
    targetAudience: "Both", // or "Indie Hackers" or "Hacker News"
    targetLength: 2000,
    sources: [
      "docs/FINAL_SYSTEM_SUMMARY.md",
      ".cursor/rules/200-playbook-insight-validation.mdc",
    ],
  },
};
```

### 2. Run the Generation Script

```bash
npx tsx scripts/generate-article-with-claude.ts {article-number}
```

The script will:
- Read source documents
- Build a comprehensive prompt using the Claude Article Writing Guide
- Call Claude API to generate the article
- Save the article to `articles/{slug}.md` with frontmatter
- Display the article URL

### 3. Review and Edit

After generation:
1. Review the article in `articles/{slug}.md`
2. Add screenshots where `[SCREENSHOT]` placeholders are
3. Add links where `[LINK]` placeholders are
4. Add your personal touch and authentic voice
5. Verify all claims and examples
6. Final polish (grammar, flow, clarity)

### 4. Publish

Articles are automatically available at:
- **Listing**: http://localhost:3000/articles
- **Detail**: http://localhost:3000/articles/{slug}

## Article Format

Articles use markdown with frontmatter:

```markdown
---
title: "Article Title"
description: "Article description"
publishedAt: "2024-01-01T00:00:00.000Z"
category: "Product Creation"
tags: "validation, saas, product-development"
---

# Article Content

Your article content here in markdown format...
```

## Article Structure

The Claude prompt ensures articles follow this structure:

1. **Opening (2-3 paragraphs)**
   - Hook
   - Context
   - Thesis

2. **Main Content**
   - Core concept/framework
   - How it works
   - Examples/case studies
   - Lessons learned

3. **Practical Application**
   - How to apply
   - Actionable steps
   - Tools/resources

4. **Discussion**
   - Trade-offs
   - Limitations
   - Future improvements

5. **Takeaways**
   - Key points
   - Next steps
   - Engagement

## Styling

Articles are automatically styled using:
- **MarkdownViewer** component (same as docs)
- **Dark mode** with glassmorphism
- **Responsive design** (mobile-friendly)
- **Read time calculation** (200 words/minute)
- **Category and tag badges**

## Adding More Articles

To add more article configurations:

1. **Add to ARTICLE_CONFIGS** in `scripts/generate-article-with-claude.ts`
2. **Update content mapping** in `docs/CONTENT_MAPPING.md`
3. **Run the script** with the new article number

## Tips for Best Results

1. **Be Specific**: Include detailed key points and unique angles
2. **Provide Sources**: List all relevant docs, rules, agents
3. **Review Carefully**: Always review and edit Claude's output
4. **Add Personal Touch**: Include your authentic voice and experiences
5. **Verify Everything**: Fact-check all claims and examples
6. **Add Visuals**: Replace `[SCREENSHOT]` placeholders with actual images
7. **Link Everything**: Add cross-references to related content

## Troubleshooting

### Claude API Errors

If Claude fails:
- Check `ANTHROPIC_API_KEY` in `.env.local`
- Verify API quota/limits
- Check network connectivity

### Article Not Appearing

If article doesn't appear:
- Check `articles/` directory exists
- Verify file is `.md` or `.mdx` format
- Check frontmatter format is correct
- Restart dev server if needed

### Formatting Issues

If formatting looks wrong:
- Check markdown syntax
- Verify frontmatter is properly formatted
- Check for special characters that need escaping

## Next Steps

1. **Generate Article 1**: Test the workflow
2. **Review and Edit**: Add personal touch
3. **Generate More**: Create the full series
4. **Publish**: Share on Indie Hackers/Hacker News
5. **Iterate**: Refine based on feedback

## Related Documentation

- **Content Mapping**: `docs/CONTENT_MAPPING.md`
- **Style Guide**: `docs/ARTICLE_STYLE_GUIDE.md`
- **Claude Writing Guide**: `docs/CLAUDE_ARTICLE_WRITING_GUIDE.md`
- **Audience Strategy**: `docs/AUDIENCE_AND_PLATFORM_STRATEGY.md`

