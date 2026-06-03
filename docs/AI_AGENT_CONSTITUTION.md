# AI_AGENT_CONSTITUTION.md

---

# Purpose

- This document governs the behavior of all AI coding agents working on this project.
- These rules override agent defaults, style preferences, and general best practices.
- Rules are not suggestions. Non-compliance causes real damage to a pre-launch production codebase.
- If uncertain about scope, intent, or ownership: stop and ask. Do not assume. Do not proceed.

---

# Read Order

Read after:
- PROJECT_OVERVIEW.md
- SITE_ARCHITECTURE.md
- COMPONENT_REGISTRY.md

Read before:
- FILE_EDIT_RULES.md
- CURRENT_STATE.md

---

# Core Principles

1. **Preserve working code.** If it works, do not touch it unless the change was explicitly requested.
2. **Facts over assumptions.** Only act on observed information. Never invent business logic, content, or architecture.
3. **Smallest responsible change.** Edit the one file that owns the responsibility. Do not spread changes.
4. **Read less, understand more.** Use COMPONENT_REGISTRY.md to identify the target file before opening anything.
5. **Ask before expanding scope.** If a task requires touching more than the expected file, stop and confirm.
6. **Unknown stays unknown.** Do not fill in missing information. Mark it unknown and report it.
7. **Both themes are always in scope.** No change is complete unless it works in light mode and dark mode.

---

# Protected Rules

## Architecture Protection

- Do not invent new sections. The approved section list is in SITE_ARCHITECTURE.md.
- Do not reorder sections. The render order in `App.jsx` is the approved order.
- Do not move ownership between components. Ownership is defined in COMPONENT_REGISTRY.md.
- Do not create new shared systems (contexts, providers, stores) without explicit approval.
- Do not add routing. This is a single-page application. No router exists and none is approved.
- Do not move FloatingChatbot or FloatingWhatsapp inside `div.journey-background` or any ancestor with `filter`, `will-change: filter`, or `backdrop-filter`. This will silently break viewport-fixed positioning.
- Do not add a new wrapper `div` in `App.jsx` around existing sections without explicit approval.

## Code Protection

- Working code is protected. Do not rewrite a component to implement a small change.
- Do not delete code unless the owner explicitly requests deletion.
- Do not refactor variable names, function signatures, or file structure for style preference.
- Do not convert class-based patterns, reorganize imports, or reformat files unless asked.
- Do not remove commented-out code. It may be intentional (e.g., the commented-out secondary button in Hero, the commented-out overlay in Parents).
- Do not upgrade, swap, or remove dependencies without explicit approval.

## Scope Protection

- Implement only the work described in the current request.
- Do not add bonus features, "nice to have" improvements, or UX enhancements not requested.
- Do not add future-proofing code, abstraction layers, or "extensible" structures.
- Do not solve problems that were not mentioned. If you notice an unrelated issue, report it in observations — do not fix it silently.
- Do not add error boundaries, loading states, or suspense wrappers unless explicitly requested.

## Token Protection

- Before opening any file, consult COMPONENT_REGISTRY.md to identify the responsible file.
- Do not read the entire project to answer a targeted question.
- Do not re-read files you have already read in the same session unless the content may have changed.
- Do not read CSS files to answer questions about component logic.
- Do not read component files to answer questions about CSS variables — read `theme.css` or `tokens.css`.

## Assumption Protection

- Do not infer the reason for an observed discrepancy. Record it as an observation.
- Do not assume a broken anchor link (`#how`, `#curriculum`) is safe to fix without approval. It may be intentional.
- Do not assume a placeholder value (WhatsApp number, founder avatar URL, contact email) should be updated. Report it.
- Do not assume EmailJS is configured. It is not present in the current code. Integrating it requires explicit instruction.
- Do not assume mythology character-to-lesson associations. None are defined. Do not invent them.
- Do not assume the current priority or sprint goal. Consult CURRENT_STATE.md or ask the owner.

---

# File Creation Rules

**Allowed only when:**
- The owner explicitly requests a new file by name or purpose.
- A new component is required by approved architecture change.
- A new CSS file is required for a newly approved component.

**Not allowed:**
- Helper files created speculatively (`utils/helpers.js`, `utils/formUtils.js`)
- Duplicate or versioned components (`Hero_v2.jsx`, `DemoClass_backup.jsx`)
- Abstraction files created to reduce repetition that was not complained about
- Config files for tools not already in the project
- New context providers or stores unless explicitly approved
- Any governance or documentation file outside `/docs`

All governance, architecture, workflow, state, and AI-related documents must be created inside `/docs`. Never create these in the project root.

---

# Refactoring Rules

The following require explicit owner approval before proceeding:

- Any refactor touching more than one component file
- Any change to a public interface (component props, context exports, utility function signatures)
- Any change to folder structure
- Any change to CSS variable names in `theme.css` or `tokens.css` (all components depend on these)
- Any extraction of inline data into a separate file (`JOURNEYS`, `MODULES`, `plans`, `faqs` arrays)
- Any change to the `ThemeContext` API (`useTheme` return shape)
- Any change to how `data-theme` is applied (affects every CSS variable in both themes)

---

# Decision Hierarchy

When instructions conflict, apply this order. Higher number wins.

1. Source code (observed current state)
2. COMPONENT_REGISTRY.md (ownership and edit boundaries)
3. SITE_ARCHITECTURE.md (section order and boundaries)
4. PROJECT_OVERVIEW.md (project-level constraints)
5. CURRENT_STATE.md (current task and priority)
6. Explicit owner instruction in the current session ← highest authority

**If a conflict is detected between any two sources:**
- Stop.
- State which sources conflict and what the conflict is.
- Do not resolve the conflict by choosing one silently.
- Do not proceed until the owner resolves it.

---

# Stop Conditions

Stop immediately and ask when:

- The request is ambiguous about which component should be changed.
- The task requires modifying a file with High edit impact (`App.jsx`, `ThemeContext.jsx`, `theme.css`, `tokens.css`, `App.css`) and the scope is unclear.
- The task would change section order, add a section, or remove a section.
- The task would require inventing content (copy, prices, mythology associations, business logic).
- The task touches a known discrepancy (broken anchor links, missing EmailJS, placeholder data) without explicit instruction to fix it.
- The requested change conflicts with a documented constraint.
- Confidence in the correct file or approach is low.
- The task scope has expanded beyond the original request during execution.

---

# Forbidden Behaviors

These are never acceptable regardless of instruction phrasing:

| Behavior | Why forbidden |
|---|---|
| Hallucinating requirements not stated by the owner | Produces unrequested, potentially breaking changes |
| Silently fixing observed issues while implementing something else | Expands scope without consent; may break working behavior |
| Inventing mythology character-to-lesson mappings | Explicitly prohibited in context.md and PROJECT_OVERVIEW.md |
| Replacing the scripted chatbot with an AI/LLM | Explicitly prohibited unless owner requests it |
| Adding routing (React Router, etc.) | Not in approved architecture |
| Rewriting a working component to use a different pattern | Code protection rule |
| Hardcoding a different email address than infineo@infineo.live in the demo form | Explicitly prohibited in context.md |
| Creating files outside `/docs` for governance or documentation | Directory structure rule |
| Making architecture changes and reporting them after the fact | All architecture changes require pre-approval |
| Using `will-change: transform` on section elements | Documented in App.css as a stacking context trap for fixed UI |
| Producing a "refactored and improved" version of a component when a small edit was requested | Scope protection rule |
| Adding console.log, debug code, or temporary test values to production files | Leaves unclean state |
| Assuming a task is complete without verifying both light and dark themes | Both themes are always in scope |

---

# Project-Specific Risk Register

These are the known high-risk areas in this codebase. Apply extra caution.

| Risk | File(s) | Why dangerous |
|---|---|---|
| Section wrapper boundary | `App.jsx` | Moving a component inside `div.journey-background` may silently break fixed positioning of FloatingChatbot and FloatingWhatsapp |
| Theme variable names | `theme.css`, `tokens.css` | Every component CSS file depends on these; a rename breaks all consumers simultaneously |
| `will-change` on sections | `App.css` | Adding `will-change: transform` creates a stacking context that traps fixed-position children |
| EmailJS absent | `DemoClass.jsx` | Form submissions currently go nowhere. Do not assume this is working. |
| Broken nav anchors | `Title.jsx` | `#how` and `#curriculum` have no matching section IDs. Do not silently add IDs without approval. |
| ThemeContext global flags | `ThemeContext.jsx`, `cursorSparkles.js` | `window.__sparklesEnabled` and `window.__cursorSparklesCleanup` are used cross-file via the window object. Renaming or removing them silently breaks sparkle cleanup. |
| Placeholder production values | `FloatingWhatsapp.jsx`, `Footer.jsx`, `Parents.jsx` | Phone number, contact email, and founder avatar are all placeholders. Do not treat them as final. |
