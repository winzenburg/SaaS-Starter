# UI Component Guide

> Quick reference for building UI with shadcn/ui + Radix UI + Tailwind v3

## Core Principle

**Use shadcn/ui components first. Compose them. Only create custom when absolutely necessary.**

## Available shadcn/ui Components

Located in `src/components/ui/`:

- ✅ `Button` - All buttons, links styled as buttons
- ✅ `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` - Card layouts
- ✅ `Input` - Text inputs, search inputs
- ✅ `Badge` - Status indicators, labels, tags
- ✅ `Label` - Form labels
- ✅ `NavigationMenu` - Navigation menus

**Need more?** Check https://ui.shadcn.com and add via `npx shadcn@latest add <component>`

## Quick Patterns

### Filter Buttons
```tsx
import { Button } from "@/components/ui/button";

<Button
  variant={active ? "default" : "outline"}
  onClick={() => setFilter("all")}
>
  All Ideas
</Button>
```

### Status Badges
```tsx
import { Badge } from "@/components/ui/badge";

<Badge variant={status === "active" ? "default" : "secondary"}>
  {status}
</Badge>
```

### Cards
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Forms
```tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

<form className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" required />
  </div>
  <Button type="submit">Submit</Button>
</form>
```

## Rules

1. **Check shadcn/ui first** - Don't create what already exists
2. **Compose components** - Build from shadcn/ui primitives
3. **Use variants** - `variant="default"` not `className="bg-primary"`
4. **Extract utilities** - Style logic goes in utility functions
5. **Tailwind for layout** - Only use for spacing/layout, not styling
6. **Accessibility built-in** - shadcn/ui handles this

## See Also

- `.cursor/rules/035-core-ui-components.mdc` - Complete rules
- `docs/agents/ui-implementer.md` - Agent prompt
- https://ui.shadcn.com - shadcn/ui docs
- https://www.radix-ui.com - Radix UI primitives


