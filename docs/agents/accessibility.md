# Accessibility Agent

## Mission
Audit or preflight designs/code for WCAG 2.2 AA.

## Inputs
- Implemented UI components
- Feature requirements
- Existing accessibility audit reports
- WCAG 2.2 AA standards
- Design mockups (for preflight)

## Outputs
- Accessibility audit document in `/docs/ux/accessibility-audit-<feature>.md`
- Remediation diffs list (prioritized fixes)

## Non-Negotiables
- Keyboard nav + focus order must be verified
- SR (Screen Reader) labels/roles must be correct
- Touch targets ≥44×44px must be enforced
- Contrast checks must meet WCAG AA (4.5:1 for text, 3:1 for UI)
- All issues must be prioritized (critical/serious/minor)
- Automated checks must be run (@axe-core/react, @axe-core/playwright)

## Default Prompt Template

```
@Accessibility Audit <FEATURE/COMPONENT> for WCAG 2.2 AA.

Check:
- keyboard + focus order + visible focus
- semantic structure, ARIA only if needed
- SR labels, error announcements
- contrast + touch targets
- empty/loading/error patterns

Output: /docs/ux/accessibility-audit-<feature>.md with prioritized fixes
```

## Audit Document Structure (`/docs/ux/accessibility-audit-<feature>.md`)

### 1. Executive Summary
- Overall WCAG 2.2 AA compliance status
- Total issues found (by severity)
- Critical issues count
- Estimated remediation effort

### 2. Automated Checks Results

#### Component Testing (@axe-core/react)
- Test results
- Violations found
- Pass/fail status

#### E2E Testing (@axe-core/playwright)
- Test results
- Violations found
- Pass/fail status

### 3. Keyboard Navigation + Focus Order

#### Keyboard Navigation
- [ ] All interactive elements keyboard accessible
- [ ] Logical tab order throughout
- [ ] No keyboard traps
- [ ] Escape key closes modals/dialogs
- [ ] Arrow keys work in lists/menus
- [ ] Enter/Space activate buttons/links

#### Focus Management
- [ ] Visible focus indicators on all interactive elements
- [ ] Focus order is logical and intuitive
- [ ] Focus returns to trigger after modal closes
- [ ] Focus visible in high contrast mode
- [ ] Skip links available for main content

#### Issues Found
- **Issue**: [Description]
  - **Location**: [File/Component]
  - **Severity**: Critical/Serious/Minor
  - **Fix**: [Remediation steps]
  - **Priority**: [1-5]

### 4. Semantic Structure + ARIA

#### Semantic HTML
- [ ] Proper HTML elements used (not divs for everything)
- [ ] Heading hierarchy correct (h1 → h2 → h3, no skipping)
- [ ] Landmark regions used (nav, main, aside, etc.)
- [ ] Form labels associated with inputs
- [ ] ARIA only when semantic HTML insufficient

#### ARIA Usage
- [ ] ARIA roles used appropriately
- [ ] ARIA labels provided where needed
- [ ] ARIA live regions for dynamic content
- [ ] ARIA states updated correctly
- [ ] No redundant ARIA

#### Issues Found
- **Issue**: [Description]
  - **Location**: [File/Component]
  - **Severity**: Critical/Serious/Minor
  - **Fix**: [Remediation steps]
  - **Priority**: [1-5]

### 5. Screen Reader Labels + Error Announcements

#### Screen Reader Labels
- [ ] All images have descriptive alt text
- [ ] Form inputs have associated labels
- [ ] Buttons have descriptive text or aria-label
- [ ] Icons have aria-label or aria-hidden
- [ ] Error messages associated with form fields
- [ ] Error messages announced to screen readers

#### Error Announcements
- [ ] Inline errors announced
- [ ] Toast notifications announced
- [ ] Form submission errors announced
- [ ] Dynamic content changes announced

#### Issues Found
- **Issue**: [Description]
  - **Location**: [File/Component]
  - **Severity**: Critical/Serious/Minor
  - **Fix**: [Remediation steps]
  - **Priority**: [1-5]

### 6. Contrast + Touch Targets

#### Color Contrast
- [ ] Text meets WCAG AA (4.5:1 for normal text, 3:1 for large text)
- [ ] UI components meet WCAG AA (3:1)
- [ ] Color not sole indicator of information
- [ ] High contrast mode supported

#### Touch Targets
- [ ] Interactive elements at least 44×44px
- [ ] Adequate spacing between touch targets
- [ ] Touch targets don't overlap
- [ ] Mobile-friendly interaction patterns

#### Issues Found
- **Issue**: [Description]
  - **Location**: [File/Component]
  - **Severity**: Critical/Serious/Minor
  - **Fix**: [Remediation steps]
  - **Priority**: [1-5]

### 7. Empty/Loading/Error Patterns

#### Empty States
- [ ] Empty state is accessible
- [ ] Screen reader announces empty state
- [ ] Keyboard accessible actions in empty state

#### Loading States
- [ ] Loading state announced to screen readers
- [ ] Loading state doesn't trap focus
- [ ] Keyboard accessible during loading

#### Error States
- [ ] Error states accessible
- [ ] Error messages announced to screen readers
- [ ] Error recovery paths keyboard accessible
- [ ] Error states have proper ARIA attributes

#### Issues Found
- **Issue**: [Description]
  - **Location**: [File/Component]
  - **Severity**: Critical/Serious/Minor
  - **Fix**: [Remediation steps]
  - **Priority**: [1-5]

### 8. Remediation Diffs List (Prioritized)

#### Critical Priority (P0 - Must Fix)
- [ ] **Issue**: [Description]
  - **File**: [File path]
  - **Line**: [Line numbers]
  - **Current**: [Current code]
  - **Fixed**: [Fixed code]
  - **Diff**: [Unified diff format]

#### High Priority (P1 - Should Fix)
- [ ] **Issue**: [Description]
  - **File**: [File path]
  - **Line**: [Line numbers]
  - **Current**: [Current code]
  - **Fixed**: [Fixed code]
  - **Diff**: [Unified diff format]

#### Medium Priority (P2 - Nice to Fix)
- [ ] **Issue**: [Description]
  - **File**: [File path]
  - **Line**: [Line numbers]
  - **Current**: [Current code]
  - **Fixed**: [Fixed code]
  - **Diff**: [Unified diff format]

### 9. Testing Results

#### Screen Reader Testing
- **NVDA (Windows)**: [Results]
- **JAWS (Windows)**: [Results]
- **VoiceOver (macOS/iOS)**: [Results]

#### Keyboard-Only Testing
- **Tab navigation**: [Results]
- **Arrow key navigation**: [Results]
- **Keyboard shortcuts**: [Results]

#### High Contrast Mode
- **Windows High Contrast**: [Results]
- **macOS Increase Contrast**: [Results]

### 10. Compliance Status
- **WCAG 2.2 AA Compliance**: [Pass/Fail/Partial]
- **Critical Issues**: [Count]
- **Serious Issues**: [Count]
- **Minor Issues**: [Count]
- **Estimated Remediation Time**: [Hours]

## Workflow
1. Review implemented UI or design mockups
2. Run automated checks (@axe-core/react, @axe-core/playwright)
3. Complete manual audit checklist
4. Test with keyboard only
5. Test with screen readers (NVDA, JAWS, VoiceOver)
6. Check color contrast
7. Verify touch targets
8. Categorize issues by severity
9. Create prioritized remediation diffs list
10. Document all findings
11. Re-audit after fixes

## Quality Criteria
- WCAG 2.2 AA compliance achieved
- All critical and serious issues fixed
- Keyboard navigation works everywhere
- Screen reader compatible
- Color contrast meets standards
- Touch targets meet minimum size
- All issues prioritized and documented
- Remediation diffs are actionable

## Rules
- Follow playbook: `.cursor/rules/240-playbook-a11y-audit.mdc`
- Test with actual screen reader software (NVDA, JAWS, VoiceOver)
- Verify all interactive elements are keyboard accessible
- Use automated checks: @axe-core/react (components), @axe-core/playwright (e2e)
- All fixes must be prioritized (critical/serious/minor)
