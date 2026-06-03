# FILE_EDIT_RULES.md

---

# Purpose

- This document governs the file modification workflow for all AI coding agents.
- Rules apply before, during, and after every edit.
- The goal is minimizing breakage, unnecessary edits, and scope creep.
- This document is process-oriented. For ownership boundaries, see COMPONENT_REGISTRY.md. For behavior rules, see AI_AGENT_CONSTITUTION.md.

---

# Read Order

Read after:
- PROJECT_OVERVIEW.md
- SITE_ARCHITECTURE.md
- COMPONENT_REGISTRY.md
- AI_AGENT_CONSTITUTION.md

Read before:
- CURRENT_STATE.md

---

# Pre-Edit Workflow

Execute these steps in order before writing a single line of code.

**Step 1 — Understand the request**
- Identify exactly what must change: copy, behavior, style, data, or structure.
- If the request is ambiguous, stop and ask. Do not interpret.

**Step 2 — Identify the owning component**
- Open COMPONENT_REGISTRY.md.
- Find the component that owns the responsibility being changed.
- If ownership is unclear, check SITE_ARCHITECTURE.md Section Responsibilities.
- If still unclear, stop and ask.

**Step 3 — Assess edit impact**
- Check the Edit Impact rating in COMPONENT_REGISTRY.md (Low / Medium / High).
- High-impact files require extra validation steps (see Protected Files section).
- If the task requires a High-impact file but the change feels small, confirm the file is actually necessary.

**Step 4 — Read only required files**
- Read only the owning component file and its direct CSS file.
- Do not read sibling components.
- Do not read parent files (App.jsx) unless the task explicitly involves App.jsx.
- Do not read theme.css unless a CSS variable needs to be checked or changed.

**Step 5 — Confirm scope before writing**
- State which file(s) will be changed and why.
- If more than one file is required, apply the Multi-File Change Rules below before proceeding.

---

# File Selection Rules

Select the most specific file that owns the responsibility.

| Task type | Correct file selection |
|---|---|
| Change any text or copy in a section | That section's `.jsx` file only |
| Change a color or visual style | `theme.css` only (if a variable exists); component CSS only if overriding locally |
| Change spacing or size | `tokens.css` (scale token) or component CSS (local override) |
| Change FAQ answer or add FAQ entry | `FloatingChatbot.jsx` (`faqs` array) only |
| Change pricing plan data | `Pricing.jsx` (`plans` array) only |
| Change module list | `Modules.jsx` (`MODULES` array) only |
| Change impact journey cards | `Impact.jsx` (`JOURNEYS` array) only |
| Change form fields | `DemoClass.jsx` only |
| Change nav links | `Title.jsx` only |
| Change section render order | `App.jsx` — requires explicit approval first |
| Change theme toggle behavior | `ThemeContext.jsx` only |
| Change sparkle colors | `cursorSparkles.js` (`PALETTE_DARK` / `PALETTE_LIGHT`) only |
| Change WhatsApp number | `FloatingWhatsapp.jsx` (`phoneNumber` constant) only |
| Change footer links or contact info | `Footer.jsx` only |

**Selection anti-patterns — never do these:**
- Do not edit `App.jsx` to change copy in a section.
- Do not edit `theme.css` to change a single component's local style.
- Do not edit `ThemeContext.jsx` to fix a visual theme issue.
- Do not edit a component's CSS file to fix a broken nav anchor — that is owned by `Title.jsx`.
- Do not edit multiple section components when the shared system (`theme.css`, `tokens.css`) is the correct target.

---

# Edit Size Rules

Classify every task before starting. The classification determines required process.

## Small Edit

Definition: A change to a single file that affects only content, copy, or isolated data.

Examples:
- Updating the hero subtitle text in `Hero.jsx`
- Adding a new FAQ entry to the `faqs` array in `FloatingChatbot.jsx`
- Changing a pricing plan feature list in `Pricing.jsx`
- Updating the WhatsApp phone number in `FloatingWhatsapp.jsx`
- Fixing a CSS value in a single component's CSS file

Process:
1. Read the owning file.
2. Make the change.
3. Run the standard validation checklist.
4. Report files modified.

## Medium Edit

Definition: A behavior change within a single component, or a style change affecting multiple elements via a shared variable.

Examples:
- Adding EmailJS integration to `DemoClass.jsx` (`handleSubmit`)
- Adding scroll behavior to the Hero CTA button
- Changing a CSS variable value in `theme.css` that affects multiple sections
- Adding a new field to the DemoClass booking form
- Fixing the `#how` or `#curriculum` anchor IDs (if approved)

Process:
1. Read the owning file and its CSS file.
2. Check COMPONENT_REGISTRY.md for dependencies.
3. If a shared CSS variable is changing, identify all components that consume it.
4. Make the change.
5. Run the standard validation checklist, including both theme verification.
6. Report files modified and any downstream components that may be visually affected.

## Large Edit

Definition: A change that requires modifying more than one component file, or touches any High-impact file alongside other files.

Examples:
- Adding EmailJS to `DemoClass.jsx` AND updating `Footer.jsx` contact email in the same task
- Changing a `ThemeContext.jsx` API shape and updating all consumers
- Adding a new section (requires `App.jsx` + new component file + new CSS file)
- Renaming a CSS variable in `theme.css` (requires verifying all component CSS files)

Process:
1. Stop before writing any code.
2. List every file that must change and why each one is necessary.
3. Confirm with owner that the full scope is approved.
4. Execute changes in dependency order: shared systems before consumers.
5. Run the full validation checklist after all files are changed.
6. Report every file modified, the reason for each, and any new observations.

**Escalation rule:** If a task starts as Small or Medium and expands during execution, stop, reclassify, and confirm the new scope before continuing.

---

# Multi-File Change Rules

Required before touching more than one file in a single task:

1. List every file that will change.
2. For each file, state the specific change and why that file owns it.
3. Confirm that a single-file solution is not possible.
4. Confirm that no file on the list is being changed for style preference or cleanup convenience.
5. Get explicit confirmation before proceeding.

Example of a valid multi-file justification:
> "Adding EmailJS requires editing `DemoClass.jsx` (owns the form submission handler) and installing the `emailjs-com` package (requires `package.json`). No single-file solution is possible because the package does not exist in the project."

Example of an invalid multi-file justification:
> "While updating the FAQ, I also cleaned up some unused imports in `Impact.jsx`."
> — This is scope creep. The second change was not requested.

---

# Protected Files

These files require heightened caution before editing. Extra steps are mandatory.

## `src/App.jsx` — Edit Impact: High

Before editing:
- Confirm the task explicitly requires App.jsx (section order, wrapper structure, or global effect).
- Verify that FloatingChatbot and FloatingWhatsapp remain outside `div.journey-background` after the edit.
- Verify that the section render order matches the approved order in SITE_ARCHITECTURE.md after the edit.

## `src/context/ThemeContext.jsx` — Edit Impact: High

Before editing:
- Confirm the task explicitly requires ThemeContext (theme state, localStorage keys, or sparkle flags).
- Identify all components that consume `useTheme` (currently: Title, FloatingChatbot).
- Verify that `data-theme` is still correctly applied to `document.documentElement` after the edit.
- Verify the `useTheme` hook return shape is unchanged unless the change is intentional and approved.

## `src/styles/theme.css` — Edit Impact: High

Before editing:
- Identify which CSS variable is changing and which components consume it.
- Verify the change is applied correctly in both `[data-theme="light"]` and `[data-theme="dark"]` blocks.
- Do not rename existing variables. Add new variables if a new concept is needed.

## `src/styles/tokens.css` — Edit Impact: High

Before editing:
- Identify which token is changing and which component CSS files reference it.
- Do not rename existing tokens.
- Prefer adding a new token over repurposing an existing one.

## `src/App.css` — Edit Impact: High

Before editing:
- Do not add `will-change: transform` to any section class. This creates a stacking context that traps FloatingChatbot and FloatingWhatsapp.
- Verify that `#sparkle-portal` styles are preserved if modifying z-index layers.
- Verify that `.section-transition`, `.section-blurred`, `.section-visible` classes remain consistent with the IntersectionObserver logic in `App.jsx`.

---

# Validation Checklist

Run this checklist before reporting work as complete.

**Correctness**
- [ ] The requested change is implemented exactly as described.
- [ ] No unrelated code was modified.
- [ ] No unrelated code was deleted.
- [ ] Commented-out code that existed before the edit is still present.

**Ownership**
- [ ] Only the owning component(s) were edited.
- [ ] No functionality was moved between components.
- [ ] No new component, file, or abstraction was created unless explicitly requested.

**Architecture**
- [ ] Section render order in `App.jsx` is unchanged (unless reorder was the task).
- [ ] FloatingChatbot and FloatingWhatsapp remain outside `div.journey-background`.
- [ ] No new routing, provider, or context was added.

**Theme**
- [ ] The change works correctly in dark mode.
- [ ] The change works correctly in light mode.
- [ ] No color values were hardcoded in place of an existing theme variable.

**Stability**
- [ ] No High-impact file was modified beyond the scope of the task.
- [ ] If `theme.css` was modified, both theme blocks (`[data-theme="light"]` and `[data-theme="dark"]`) were updated consistently.
- [ ] If a CSS variable was renamed, all consumers were updated.

---

# Documentation Update Rules

Update docs only when the codebase change makes existing docs inaccurate.

| What changed in code | Document to update |
|---|---|
| A section was added, removed, or reordered | SITE_ARCHITECTURE.md (Approved Page Flow) |
| A component's ownership changed | COMPONENT_REGISTRY.md (Component Definition) and SITE_ARCHITECTURE.md (Section Responsibilities) |
| A new component was created | COMPONENT_REGISTRY.md (add new entry) |
| A component was deleted | COMPONENT_REGISTRY.md (remove entry) |
| A shared system boundary changed | COMPONENT_REGISTRY.md (Shared Systems section) |
| A known discrepancy was resolved | SITE_ARCHITECTURE.md or COMPONENT_REGISTRY.md (remove the relevant Observed note) |
| Current task status changed | CURRENT_STATE.md only |
| A new constraint was introduced | AI_AGENT_CONSTITUTION.md (if behavioral) or SITE_ARCHITECTURE.md (if architectural) |

**Do not update docs when:**
- The doc accurately describes the current state.
- A small implementation detail changed that is not tracked at this documentation level.
- The change is internal to a component and does not affect its ownership, interface, or section boundary.

---

# Output Rules

When reporting completed work, always include:

**1. Files modified**
List every file that was changed.

**2. Reason for each file**
One sentence per file explaining why it was the correct file to change.

**3. What was changed**
Concise description of the actual change made. No need to reproduce the full diff if the change is small.

**4. Validation result**
Confirm the validation checklist was run. Flag any item that could not be verified (e.g., visual theme verification requires a running browser).

**5. Observations**
Any facts noticed during the edit that may matter later. No recommendations. No speculation. Facts only.

**6. Unresolved unknowns**
Anything that was not addressed because it required owner input. Do not silently skip unknowns.

---

# Forbidden Editing Patterns

| Pattern | Why forbidden |
|---|---|
| Reading all component files before a single-component task | Wastes tokens; COMPONENT_REGISTRY.md exists for this purpose |
| Editing `App.jsx` to change hero copy | Hero.jsx owns hero copy; App.jsx is architecture-only |
| Editing `theme.css` to fix one component's local alignment | Component's own CSS file is the correct target |
| Editing `ThemeContext.jsx` to change a visual color | ThemeContext owns state, not visuals; edit `theme.css` |
| Fixing broken nav anchors (`#how`, `#curriculum`) without approval | Observed discrepancy with unknown intent; requires owner decision |
| Adding EmailJS silently while implementing an unrelated form change | EmailJS integration is a named, pending, explicitly unimplemented feature |
| Refactoring `JOURNEYS`, `MODULES`, or `plans` arrays into separate data files while implementing a content change | Refactoring requires separate approval; do not bundle with content tasks |
| Updating founder avatar URL or WhatsApp number without explicit instruction | These are known placeholders; replacing them requires owner-provided values |
| Creating `Hero_v2.jsx` or any versioned/duplicate component file | Prohibited by AI_AGENT_CONSTITUTION.md File Creation Rules |
| Leaving `console.log` or debug output in any edited file | Production codebase; no debug artifacts |
| Marking work complete without checking both light and dark themes | Both themes are always in scope per AI_AGENT_CONSTITUTION.md |
| Making a "while I'm in here" change to an unrelated section of the same file | Every change must be traceable to the current request |
