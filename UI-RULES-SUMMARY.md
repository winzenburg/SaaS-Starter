# UI Component Rules & Agent - Summary

## ✅ Created Files

### 1. Core Rule: `.cursor/rules/035-core-ui-components.mdc`
Comprehensive rules for UI development:
- Use shadcn/ui components first
- Compose components, don't create custom
- Use component variants, not custom classes
- Extract utility functions for styling
- Forms must use shadcn/ui Input/Label/Select
- Tailwind only for layout/spacing
- Accessibility built-in (shadcn/ui handles this)

### 2. Agent Prompt: `docs/agents/ui-implementer.md`
Complete agent prompt for UI implementation:
- Mission and responsibilities
- Component selection guidelines
- Composition patterns
- Common code patterns
- Quality checklist

### 3. Quick Reference: `docs/UI-COMPONENT-GUIDE.md`
Quick reference guide with:
- Available shadcn/ui components
- Common patterns (buttons, badges, cards, forms)
- Rules summary

## 🎯 Key Principles

1. **shadcn/ui First** - Always check `src/components/ui/` before creating custom
2. **Compose, Don't Create** - Build from shadcn/ui primitives
3. **Use Variants** - `variant="default"` not `className="bg-primary"`
4. **Extract Utilities** - Style logic in utility functions
5. **Tailwind for Layout** - Only spacing/layout, not component styling

## 📋 Usage

### For Agents
```
@UI-Implementer Build the UI for <FEATURE>
```

### For Rules
Reference: `.cursor/rules/035-core-ui-components.mdc`

### For Quick Reference
See: `docs/UI-COMPONENT-GUIDE.md`

## 🔍 What This Fixes

- ❌ Custom components duplicating shadcn/ui
- ❌ Inline style functions creating inconsistency
- ❌ Tailwind classes overriding component variants
- ❌ Components not composed from primitives
- ❌ Raw HTML inputs instead of shadcn/ui Input
- ❌ Inline color/style functions

## ✅ What This Enforces

- ✅ Always use shadcn/ui components
- ✅ Compose components from primitives
- ✅ Use component variants
- ✅ Extract style logic to utilities
- ✅ Forms use shadcn/ui components
- ✅ Tailwind only for layout
- ✅ Accessibility built-in
