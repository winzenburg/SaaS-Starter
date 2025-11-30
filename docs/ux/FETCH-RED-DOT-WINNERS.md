# Fetch Red Dot Award Winners Script

> Automated script to fetch and save Red Dot Award winner data for UI design inspiration

## Overview

This script automatically fetches Red Dot Award winner data from the official website and saves it in both JSON and Markdown formats for use in your design workflow.

## Installation

The script uses Playwright which is already installed in the project. If you need to install Playwright browsers:

```bash
npx playwright install chromium
```

## Usage

### Basic Usage

Fetch Product Design winners from the most recent year (default):

```bash
npm run fetch-red-dot-winners
```

**Note:** The script automatically fetches from the most recent year available.

### Options

```bash
npm run fetch-red-dot-winners [options]
```

**Options:**

- `--category <category>` - Category to fetch:
  - `product-design` (default)
  - `brands-communication`
  - `design-concept`
  - `all`
- `--output <path>` - Output directory (default: `docs/ux/red-dot-winners`)
- `--limit <number>` - Limit number of winners to fetch (optional)
- `--help, -h` - Show help message

### Examples

**Fetch Product Design winners (most recent year):**

```bash
npm run fetch-red-dot-winners
# or explicitly
npm run fetch-red-dot-winners -- --category product-design
```

**Fetch Brands & Communication Design winners:**

```bash
npm run fetch-red-dot-winners -- --category brands-communication
```

**Fetch all categories with a limit:**

```bash
npm run fetch-red-dot-winners -- --category all --limit 50
```

**Custom output directory:**

```bash
npm run fetch-red-dot-winners -- --output docs/inspiration/red-dot
```

## Output Format

The script generates two files for each fetch:

### 1. JSON File (`red-dot-{category}-{year}.json`)

Structured data for programmatic use:

```json
{
  "metadata": {
    "fetchedAt": "2025-01-15T10:30:00.000Z",
    "category": "product-design",
    "year": 2025,
    "count": 25,
    "source": "https://www.red-dot.org"
  },
  "winners": [
    {
      "id": "award-winning-saas-dashboard",
      "title": "Award-Winning SaaS Dashboard",
      "description": "Modern dashboard with unique design...",
      "category": "product-design",
      "year": 2025,
      "awardType": "best-of-best",
      "company": "Example Company",
      "designer": "Jane Designer",
      "country": "Germany",
      "imageUrl": "https://www.red-dot.org/...",
      "detailUrl": "https://www.red-dot.org/...",
      "tags": ["dashboard", "saas", "ui"]
    }
  ]
}
```

### 2. Markdown File (`red-dot-{category}-{year}.md`)

Human-readable format for easy viewing and reference:

```markdown
# Red Dot Award: Product Design 2025

Fetched: 2025-01-15T10:30:00.000Z
Source: https://www.red-dot.org
Total Winners: 25

---

## Award-Winning SaaS Dashboard

**Award**: Best of the Best

Modern dashboard with unique design...

![Award-Winning SaaS Dashboard](https://...)

[View Details](https://www.red-dot.org/...)

**Company**: Example Company

**Designer**: Jane Designer

**Country**: Germany

---
```

## Using in Design Workflow

### Step 1: Fetch Winners

```bash
npm run fetch-red-dot-winners -- --category product-design
```

This automatically fetches from the most recent year.

### Step 2: Review in Markdown

Open the generated Markdown file to review winners:

```bash
open docs/ux/red-dot-winners/red-dot-product-design-2025.md
```

### Step 3: Use with Gemini Analysis

The JSON file can be loaded programmatically, or screenshots/images can be extracted for Gemini analysis:

```typescript
import { readFileSync } from "fs";
import { generateMultimodal } from "@/lib/ai-tools/google-ai-studio";

const winnersData = JSON.parse(
  readFileSync("docs/ux/red-dot-winners/red-dot-product-design-2025.json", "utf-8")
);

// Analyze winners with Gemini
const analysis = await generateMultimodal({
  prompt: "Analyze these Red Dot Award winners and extract design patterns...",
  images: winnersData.winners.map(winner => ({
    url: winner.imageUrl,
    mimeType: "image/png"
  }))
});
```

### Step 4: Reference in Design System Creation

Include Red Dot winner references when creating design systems:

```
@UI-Design-System-Agent Create unique UI design system for [PROJECT].

Use Red Dot Award winners from:
- docs/ux/red-dot-winners/red-dot-product-design-2025.json

Analyze award-winning patterns and incorporate into design system.
```

## Troubleshooting

### No Winners Found

If the script reports "No winners found":

1. **Check the URL**: Visit the Red Dot website manually to verify winners exist for that year/category
2. **Check selectors**: The website structure may have changed. You may need to update selectors in the script
3. **Try different category**: Some categories may not have winners for certain years

### Page Loading Issues

If the page doesn't load:

1. **Increase timeout**: The script waits 5 seconds for content to load
2. **Check network**: Ensure you have internet connection
3. **Try manual visit**: Visit the URL manually to see if there are any access restrictions

### Rate Limiting

If you encounter rate limiting:

1. **Add delays**: The script processes winners sequentially with built-in delays
2. **Use limits**: Use `--limit` to fetch fewer winners per run
3. **Space out requests**: Run the script at different times

## Integration with Workflow

This script integrates with the Unique UI Design workflow:

1. **Fetch winners** using this script
2. **Review** in Markdown format
3. **Analyze** with Gemini using JSON data
4. **Incorporate** award-winning patterns into design system

See `.cursor/rules/211-playbook-unique-ui-design.mdc` for the complete workflow.

## Script Location

- **Script**: `scripts/fetch-red-dot-winners.ts`
- **Output**: `docs/ux/red-dot-winners/` (default)

## Notes

- The script uses Playwright for reliable web scraping
- Winners are saved in both JSON (structured) and Markdown (readable) formats
- The script handles common errors gracefully
- HTML structure changes may require script updates

## Example Workflow

```bash
# 1. Fetch Product Design winners
npm run fetch-red-dot-winners -- --year 2025 --category product-design

# 2. Review winners
cat docs/ux/red-dot-winners/red-dot-product-design-2025.md

# 3. Use in design system creation
# Reference the JSON file in your design workflow
```

## Related Documentation

- **Unique UI Design Workflow**: `.cursor/rules/211-playbook-unique-ui-design.mdc`
- **UI Design System Agent**: `docs/agents/ui-design-system-agent.md`
- **Red Dot Award Inspiration Guide**: `docs/UX/RED-DOT-AWARD-INSPIRATION.md`

