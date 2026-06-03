# DOCUMENT_MAINTENANCE_RULES.md

---

# Purpose

- Documentation must reflect reality. If the code and the docs disagree, one of them is wrong.
- Documentation must not be updated automatically after every code change.
- Unnecessary updates introduce drift: docs that describe a state that no longer exists, or never existed.
- This document defines exactly when each doc should be updated, when it should not, and how conflicts are resolved.

---

# Source of Truth Principle

**When code wins:**
The code is the ground truth for all factual observations about what currently exists, what currently renders, and what currently executes. If a doc says a component does X and the code does Y, the code is correct and the doc is stale.

**When docs win:**
Docs are the ground truth for decisions, constraints, and approved architecture that are not yet reflected in code. If the code lacks a feature documented as required (e.g., EmailJS), the doc is correct and the code is incomplete — not vice versa.

**How conflicts are handled:**
1. Identify which category the conflict falls into: factual observation (code wins) or decision/constraint (docs win).
2. Do not resolve the conflict silently.
3. Report the conflict to the owner if category is ambiguous.
4. Update the stale party only after the category is confirmed.
5. Never update both sides simultaneously to make them agree — that destroys the signal.

---

# Update Triggers

---

## PROJECT_OVERVIEW.md

**Update when:**
- The project phase changes (e.g., pre-launch → launched)
- The primary or secondary business goal is formally changed by the owner
- The technical stack changes (framework, build tool, form delivery method)
- A capability is formally added to or removed from project scope
- A constraint is formally added or removed by the owner
- A success criterion is defined where a `[TBD]` placeholder currently exists

**Do not update when:**
- A component is added or edited (that belongs in COMPONENT_REGISTRY.md)
- A section is reordered (that belongs in SITE_ARCHITECTURE.md)
- A discrepancy is resolved (that belongs in CURRENT_STATE.md and the relevant architecture doc)
- The change is internal implementation detail with no impact on project-level facts
- A placeholder is still unknown — leave it as `[TBD]`, do not invent a value

---

## SITE_ARCHITECTURE.md

**Update when:**
- A section is added to App.jsx
- A section is removed from App.jsx
- The render order in App.jsx changes
- A section's ownership boundary changes (e.g., a responsibility moves from one section to another)
- A known discrepancy is resolved (remove the relevant Observed note)
- A new navigation anchor ID is added and confirmed
- A broken anchor is fixed and verified

**Do not update when:**
- A component's internal implementation changes but its ownership boundary is unchanged
- A CSS value changes inside a section
- Copy or data inside a section changes
- A discrepancy is discovered but not yet resolved — add it as an Observed note, do not rewrite surrounding content
- The change is to a floating element's internal behavior (not its mount position)

---

## COMPONENT_REGISTRY.md

**Update when:**
- A new component file is created
- A component file is deleted
- A component's ownership (Owns / Does Not Own) changes
- A component's dependencies change (new import added or removed that affects behavior)
- A component's Edit Impact rating changes due to new complexity or new consumers
- A shared system boundary changes (Theme System, Navigation System, Form System, Floating UI System)
- A known discrepancy is resolved (remove the relevant Observed note from the component's entry)
- A component's exported interface changes (props, context exports, utility signatures)

**Do not update when:**
- An internal implementation detail changes without affecting ownership, interface, or dependencies
- A CSS value or animation timing is adjusted within a component
- Copy or data is updated within a component
- A new helper variable is added inside a component that is not exported
- The change does not affect any other component's interaction with this one

---

## AI_AGENT_CONSTITUTION.md

**Update when:**
- A new category of forbidden behavior is identified from a real incident
- An architecture constraint is formally added by the owner
- A new project-specific risk is confirmed
- An existing rule is found to be ambiguous and produces inconsistent agent behavior
- A constraint is formally lifted by the owner (remove or revise the rule)

**Do not update when:**
- A routine code change occurs
- A discrepancy is found — discrepancies belong in CURRENT_STATE.md
- You want to add reminders or suggestions that are not enforceable rules
- The motivation is stylistic preference, not protection of the codebase
- The existing rule already covers the scenario — do not duplicate rules

---

## FILE_EDIT_RULES.md

**Update when:**
- A new file type or category of edit is introduced that has no existing rule
- A protected file is added (new High-impact file confirmed)
- A validation checklist item is found to be missing based on a real failure
- A documentation update trigger table entry is missing or incorrect

**Do not update when:**
- The existing rules already cover the scenario
- The motivation is to add general coding advice not specific to this project's edit workflow
- A routine code change occurs
- A component is added (that belongs in COMPONENT_REGISTRY.md)

---

## CURRENT_STATE.md

**Update when:**
- A task moves from Blocked to Ready (owner provided required input)
- A task is completed (remove from Ready)
- A new discrepancy is discovered during a coding session (add to Known Discrepancies table)
- A known discrepancy is resolved (remove its row; also update the originating doc)
- The project phase changes
- The active priority is confirmed or changed by the owner
- A new session handoff note becomes relevant
- A risk from the Known Risks table is resolved or materially changes

**Do not update when:**
- A code change occurred that resolves no discrepancy and shifts no work queue item
- You want to record implementation notes or observations that belong in COMPONENT_REGISTRY.md or SITE_ARCHITECTURE.md
- You want to add future work items that the owner has not approved
- The change is speculative (what might need to happen) rather than factual (what currently is)

**Format constraint:** Remove resolved items. Do not annotate them as resolved inline. Resolved history belongs in version control, not in this document.

---

## CONTEXT_LOADING_STRATEGY.md

**Update when:**
- A new document is added to `/docs` that agents need to load for specific task types
- A new task category emerges that has no loading rule
- A token budget tier is found to be systematically insufficient for a task type
- A task-based loading rule is found to cause agents to load unnecessary files

**Do not update when:**
- A routine code change occurs
- A component is added (update COMPONENT_REGISTRY.md; no new loading rule needed unless it creates a new task category)
- The motivation is to add more files to a loading rule rather than fewer — loading rules exist to reduce context, not expand it

---

# Documentation Anti-Patterns

These are update behaviors that damage documentation reliability over time.

| Anti-pattern | Why it causes harm |
|---|---|
| Updating docs for cosmetic code changes | Creates a false signal that something architecturally meaningful changed |
| Updating docs speculatively to describe future state | Makes it impossible to distinguish current facts from intentions |
| Recording assumptions as observations | Introduces invented information that future agents treat as verified fact |
| Using CURRENT_STATE.md as a roadmap | CURRENT_STATE.md tracks only confirmed active work; a roadmap is a planning tool, not a state document |
| Leaving resolved discrepancies in CURRENT_STATE.md as "closed" entries | Accumulates noise; the document should reflect current state only |
| Adding new observations to PROJECT_OVERVIEW.md | PROJECT_OVERVIEW.md defines constraints, not observations; observations belong in SITE_ARCHITECTURE.md or COMPONENT_REGISTRY.md |
| Updating COMPONENT_REGISTRY.md when only copy changed | Copy changes do not alter ownership, interface, or dependencies |
| Adding rules to AI_AGENT_CONSTITUTION.md after every session | The Constitution should grow from real failures, not from routine tasks |
| Updating multiple docs simultaneously without verifying each trigger independently | Each doc has its own trigger; satisfying one does not automatically satisfy others |
| Softening factual "Observed:" notes with qualifiers like "might", "appears to", "seems" | Observations must be binary: confirmed or not recorded |

---

# Verification Rules

Before updating any document, verify all of the following:

**1. The trigger exists.**
Identify which specific update trigger (listed above for each doc) this change satisfies. If no trigger matches, do not update.

**2. The change is factual.**
The update must describe something that is currently true in the codebase or has been explicitly decided by the owner. It must not describe something intended, expected, or inferred.

**3. The update is minimal.**
Change only the lines that are now inaccurate. Do not rewrite surrounding content, restructure sections, or improve phrasing while making a factual update.

**4. The correct document is being updated.**
Verify the fact belongs in this document and not another. Use this hierarchy:
- Project-level decisions → PROJECT_OVERVIEW.md
- Section order and boundaries → SITE_ARCHITECTURE.md
- Component ownership and interfaces → COMPONENT_REGISTRY.md
- Agent behavior rules → AI_AGENT_CONSTITUTION.md
- Edit workflow process → FILE_EDIT_RULES.md
- Current operational state → CURRENT_STATE.md
- Context loading guidance → CONTEXT_LOADING_STRATEGY.md

If the fact fits multiple documents, record it in the most specific one and reference it from others only if agents would otherwise miss it.

**5. The update does not create a new conflict.**
After updating, verify the updated doc does not now contradict any other doc. If it does, the conflict must be reported and resolved — not papered over.

---

# Staleness Detection

A document may be stale if any of the following indicators are present:

| Indicator | Likely stale document |
|---|---|
| A component is referenced in docs but its file does not exist in the codebase | COMPONENT_REGISTRY.md |
| A component exists in the codebase but has no entry in docs | COMPONENT_REGISTRY.md |
| An anchor ID is listed as working in SITE_ARCHITECTURE.md but no matching `id` exists in any component | SITE_ARCHITECTURE.md |
| CURRENT_STATE.md lists a task as Blocked but the blocking input has been provided and work completed | CURRENT_STATE.md |
| PROJECT_OVERVIEW.md lists a stack item (e.g., EmailJS) that is not implemented and has not been marked unknown | PROJECT_OVERVIEW.md |
| A Known Discrepancy in CURRENT_STATE.md was resolved in code but the row was not removed | CURRENT_STATE.md |
| COMPONENT_REGISTRY.md lists a file's Edit Impact as Low but that file now has multiple consumers | COMPONENT_REGISTRY.md |
| A constraint in AI_AGENT_CONSTITUTION.md references a file or pattern that no longer exists | AI_AGENT_CONSTITUTION.md |
| A loading rule in CONTEXT_LOADING_STRATEGY.md references a doc or section that was renamed or removed | CONTEXT_LOADING_STRATEGY.md |
| An "Observed:" note in SITE_ARCHITECTURE.md or COMPONENT_REGISTRY.md was resolved in code but not removed from docs | SITE_ARCHITECTURE.md or COMPONENT_REGISTRY.md |

When a staleness indicator is detected:
1. Do not silently correct it.
2. Do not proceed with the current task until the staleness is evaluated.
3. If the staleness is confirmed, apply a minimal correction and report it.
4. If the staleness is ambiguous, stop and ask the owner.

---

# Documentation Review Workflow

Follow this sequence whenever a documentation update is proposed.

**Step 1 — Verify the trigger.**
Identify the specific trigger from the Update Triggers section above. State it explicitly. If no trigger matches, stop — the update is not warranted.

**Step 2 — Verify ownership.**
Confirm the fact belongs in the document being updated and not in a more specific document. Use the ownership hierarchy in Verification Rules above.

**Step 3 — Verify the update is required.**
Confirm the current document content is actually inaccurate or incomplete. If the document already accurately reflects the current state, do not update it even if a related code change occurred.

**Step 4 — Apply the minimal update.**
Change only the specific lines that are inaccurate. Do not restructure, rephrase, or expand surrounding content. Do not add commentary, recommendations, or context beyond what the trigger requires.

**Step 5 — Check for new conflicts.**
After updating, scan the updated section and the sections it references in other documents for contradictions. Report any new conflict rather than resolving it silently.
