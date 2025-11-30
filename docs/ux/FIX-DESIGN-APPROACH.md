# Fixing the Design - Current Issues

## Problems Identified

1. **Tailwind utilities not working** - `bg-primary` generates no CSS
2. **Buttons are transparent** - styles not applying
3. **Design doesn't match SynthFlow reference**

## Root Cause

Tailwind v4 isn't recognizing our CSS variables as theme colors. The `@theme` block might not be working correctly, or we need to use a different approach.

## Solution Options

1. Use arbitrary values: `bg-[var(--primary)]` instead of `bg-primary`
2. Configure Tailwind v4 properly with `@theme` block
3. Use direct CSS classes instead of Tailwind utilities

## Next Steps

Need to rebuild using direct CSS classes and CSS variables to match SynthFlow exactly.

