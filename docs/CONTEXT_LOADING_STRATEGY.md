# CONTEXT_LOADING_STRATEGY.md

---

# Purpose

- Not all documents should be loaded every session.
- Agents must load the minimum context required for the current task.
- Reading unnecessary files increases token cost and hallucination risk.
- This document defines exactly what to read for each task type.

---

# Default Startup Sequence

Every session starts here. Load in order. Stop as soon as the task is understood.

1. `docs/CURRENT_STATE.md` — determine what work is active and what is blocked
2. `docs/PROJECT_OVERVIEW.md` — confirm project constraints if needed

**Stop here** unless the task requires architecture, ownership, or component-level context.

Most sessions do not need to go further than step 1.

---

# Task-Based Loading Rules

---

## Understanding Current Work

Goal: Determine what is active, blocked, or deferred.

Read:
- `docs/CURRENT_STATE.md`

Do not read:
- Any source code
- SITE_ARCHITECTURE.md
- COMPONENT_REGISTRY.md
- Any component files

---

## Understanding Project Purpose or Constraints

Goal: Understand business goals, audience, scope, or constraints before making decisions.

Read:
- `docs/PROJECT_OVERVIEW.md`

Do not read:
- Component files
- CSS files
- Source code

---

## Architecture Questions

Goal: Understand section order, section boundaries, or render structure.

Read:
- `docs/PROJECT_OVERVIEW.md`
- `docs/SITE_ARCHITECTURE.md`

Do not read:
- `App.jsx` (unless a specific render detail is needed and SITE_ARCHITECTURE.md does not answer it)
- Individual component files
- CSS files

---

## Ownership Questions

Goal: Determine which file owns a specific responsibility.

Read:
- `docs/COMPONENT_REGISTRY.md`

Do not read:
- Multiple component files to figure out ownership
- CSS files
- `App.jsx`

If COMPONENT_REGISTRY.md does not answer the ownership question, read SITE_ARCHITECTURE.md Section Responsibilities. If still unclear, stop and ask.

---

## Editing an Existing Component

Goal: Make a targeted change to a known component.

Read:
1. `docs/CURRENT_STATE.md` — confirm no active block on this work
2. `docs/COMPONENT_REGISTRY.md` — confirm ownership, edit impact, and dependencies
3. Target component `.jsx` file only
4. Target component `.css` file only if styling is involved

Stop. Do not read:
- Sibling component files
- `App.jsx`
- `theme.css` or `tokens.css` unless a variable name must be verified
- Any other component not listed as a dependency in COMPONENT_REGISTRY.md

---

## Theme Changes

Goal: Change a color, visual style, or theme variable.

Read:
1. `docs/COMPONENT_REGISTRY.md` → Theme System section
2. `src/styles/theme.css`
3. `src/styles/tokens.css` only if a scale token (spacing, font-size, radius) is involved

Read `src/context/ThemeContext.jsx` only if:
- The toggle behavior is changing, OR
- The localStorage key is changing, OR
- The `sparklesEnabled` state is involved

Do not read:
- Individual component CSS files (unless verifying a local override)
- Component `.jsx` files

---

## Navigation Changes

Goal: Change nav link labels, anchor targets, or scroll destinations.

Read:
1. `docs/SITE_ARCHITECTURE.md` → Navigation Rules section
2. `src/components/Title.jsx`
3. Target section `.jsx` file only if an `id` attribute needs to be added or changed

Do not read:
- `App.jsx`
- Unrelated component files
- CSS files

---

## Form Changes

Goal: Change booking form fields, labels, validation, or submission behavior.

Read:
1. `docs/COMPONENT_REGISTRY.md` → DemoClass entry and Form System section
2. `src/components/DemoClass.jsx`

Read `src/styles/DemoClass.css` only if styling is involved.

Do not read:
- `FloatingChatbot.jsx` (different form system)
- `Footer.jsx` (newsletter form is separate and unrelated)
- `theme.css` unless a form input variable needs to be checked

---

## Floating UI Changes

Goal: Change FloatingChatbot or FloatingWhatsapp behavior, content, or position.

Read:
1. `docs/COMPONENT_REGISTRY.md` → Floating UI System section
2. `docs/SITE_ARCHITECTURE.md` → Architecture Constraints section (for fixed positioning rules)
3. Target floating component file (`FloatingChatbot.jsx` or `FloatingWhatsapp.jsx`)

Do not read:
- `App.jsx` unless the floating component's mount position is being changed
- The other floating component (each is independent)
- `ThemeContext.jsx` unless theme-aware icon logic is changing

---

## FAQ / Chatbot Content Changes

Goal: Add, edit, or remove chatbot FAQ entries.

Read:
1. `src/components/FloatingChatbot.jsx` only

Do not read:
- Any other file
- SITE_ARCHITECTURE.md
- theme.css

---

## Pricing Data Changes

Goal: Change plan names, prices, features, or session counts.

Read:
1. `src/components/Pricing.jsx` only

Do not read:
- `DemoClass.jsx`
- `Footer.jsx`
- Any other file

---

## Module List Changes

Goal: Add, remove, or edit mythology module nodes.

Read:
1. `docs/COMPONENT_REGISTRY.md` → Modules entry (to understand coordinate and path implications)
2. `src/components/Modules.jsx`

Do not read:
- God/epic asset files
- `App.jsx`
- `theme.css`

---

## Documentation Updates

Goal: Update a doc file after a code change.

Read:
1. The specific doc file being updated only
2. Source file that changed (if needed to verify a fact)

Do not read:
- All doc files
- Unrelated source files

---

# Escalation Rules

Load additional files only when these conditions are met:

| Condition | Additional file to load |
|---|---|
| Ownership of a responsibility is unclear after reading COMPONENT_REGISTRY.md | `docs/SITE_ARCHITECTURE.md` Section Responsibilities |
| A High-impact file (`App.jsx`, `ThemeContext.jsx`, `theme.css`, `tokens.css`, `App.css`) is involved | `docs/FILE_EDIT_RULES.md` Protected Files section |
| An architecture constraint may be relevant | `docs/AI_AGENT_CONSTITUTION.md` Architecture Protection section |
| Task involves a known discrepancy (EmailJS, broken anchors, placeholders) | `docs/CURRENT_STATE.md` Known Discrepancies table |
| Task scope is expanding beyond the original file | Stop and ask. Do not load more files to justify expanding scope. |

---

# Anti-Patterns

These loading behaviors are explicitly forbidden:

| Anti-pattern | Why forbidden |
|---|---|
| Reading all component files before a one-component task | COMPONENT_REGISTRY.md exists to answer ownership without opening files |
| Reading `App.jsx` for copy changes | App.jsx owns architecture, not content |
| Reading `theme.css` for pricing plan changes | Pricing.jsx owns its own data; theme.css is unrelated |
| Reading `ThemeContext.jsx` for navigation changes | ThemeContext owns state, not navigation |
| Reading all CSS files to find a style | Check COMPONENT_REGISTRY.md for which file owns the style |
| Loading `SITE_ARCHITECTURE.md` for FAQ content changes | FAQ is owned entirely by FloatingChatbot.jsx |
| Re-reading files already read in the same session | Use the content already loaded |
| Reading doc files after already loading CURRENT_STATE.md for a simple status check | CURRENT_STATE.md is designed to answer status questions alone |

---

# Token Budget Tiers

Classify the task before loading anything.

## Tiny Task
*Single data value change (copy, number, URL, label).*

Examples: Update WhatsApp number. Change a FAQ answer. Update hero subtitle.

- Max docs to load: 1 (CURRENT_STATE.md to check for blocks)
- Max source files to load: 1 (owning component only)

## Small Task
*Single-component behavior change with no shared system involvement.*

Examples: Add scroll behavior to a CTA button. Add a new FAQ entry. Fix a form field label.

- Max docs to load: 2 (CURRENT_STATE.md + COMPONENT_REGISTRY.md)
- Max source files to load: 2 (component `.jsx` + component `.css` if needed)

## Medium Task
*Single-component change that touches a shared system (theme variables, nav anchors, form submission).*

Examples: Add EmailJS to DemoClass. Fix a broken nav anchor. Change a theme color variable.

- Max docs to load: 3 (CURRENT_STATE.md + COMPONENT_REGISTRY.md + SITE_ARCHITECTURE.md or FILE_EDIT_RULES.md)
- Max source files to load: 3 (owning component + its CSS + the shared system file if needed)

## Large Task
*Multi-file change or High-impact file involved. Requires pre-approval.*

Examples: Add a new section. Rename a CSS variable. Change ThemeContext API.

- Max docs to load: all relevant docs (up to 5)
- Max source files to load: only files confirmed in the multi-file justification
- Stop and confirm scope with owner before loading source files

---

# Session Recovery Workflow

Use this at the start of any new session. Goal: determine whether work can begin without loading source code.

**Minute 1 — Read CURRENT_STATE.md**

Answer these questions from CURRENT_STATE.md alone:

1. Is there active work in progress? (Work Queue → Ready)
2. Is the task I've been given currently blocked? (Work Queue → Blocked)
3. Does my task touch a known discrepancy? (Known Discrepancies table)
4. Is there a relevant session handoff note? (Session Handoff Notes)

If the task is in Blocked: stop. Report the block to the owner. Do not proceed.

If the task touches a known discrepancy: flag it before proceeding.

**Minute 2 — Identify the owning file**

Open COMPONENT_REGISTRY.md. Find the component that owns the responsibility being changed.

Check:
- Edit Impact rating
- Dependencies
- Does Not Own (to confirm scope)

If ownership is clear and Edit Impact is Low or Medium: proceed to load only that component file.

If ownership is unclear or Edit Impact is High: read SITE_ARCHITECTURE.md before loading any source file.

**Decision gate — before loading any source code:**

- Do I know which file to edit? → Yes: load it. No: stop and ask.
- Is the task blocked by a discrepancy or missing owner input? → Yes: report and stop. No: proceed.
- Will this change touch more than one file? → Yes: apply FILE_EDIT_RULES.md Multi-File Change Rules. No: proceed.

Work begins only after passing all three gates.
