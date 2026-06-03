# SESSION_BOOTSTRAP.md

---

# Purpose

- Every session begins here.
- Goal: orient in minimum reads, identify blockers, begin work.
- Do not load files until this procedure tells you to.

---

# Startup Procedure

## Step 1 — Read CURRENT_STATE.md

Answer these before anything else:

- Is the requested task in the Blocked list? → If yes: stop, report block to owner, do not proceed.
- Does the task touch a Known Discrepancy? → If yes: flag it before proceeding.
- Is there a relevant Session Handoff Note? → Read it now.

If the task is blocked or unresolvable: stop here.

---

## Step 2 — Classify the task

Pick exactly one:

| Task type | Go to |
|---|---|
| Status / current work question | Step 3 → load nothing more |
| Project purpose or constraint question | Step 3 → PROJECT_OVERVIEW.md |
| Architecture or section order question | Step 3 → SITE_ARCHITECTURE.md |
| Ownership question | Step 3 → COMPONENT_REGISTRY.md |
| Component edit (copy, data, behavior) | Step 3 → COMPONENT_REGISTRY.md + target file |
| Theme change | Step 3 → COMPONENT_REGISTRY.md + theme.css |
| Navigation change | Step 3 → SITE_ARCHITECTURE.md + Title.jsx |
| Form change | Step 3 → COMPONENT_REGISTRY.md + DemoClass.jsx |
| Multi-file change | Step 4 before anything else |

---

## Step 3 — Load minimum required files

Use CONTEXT_LOADING_STRATEGY.md Task-Based Loading Rules for the classified task type.

Load only what that rule specifies. Stop loading when you have enough to act.

---

## Step 4 — Check stop conditions (conditional)

Read AI_AGENT_CONSTITUTION.md Stop Conditions section only if:

- Ownership is still unclear after reading COMPONENT_REGISTRY.md
- The task involves architecture changes
- The task touches a known discrepancy
- Scope is expanding beyond the original request
- The task requires a High-impact file (`App.jsx`, `ThemeContext.jsx`, `theme.css`, `tokens.css`, `App.css`)

If none of these apply, skip this step entirely.

---

## Step 5 — Begin work

You need before starting:

- [ ] Owning file identified
- [ ] No active block on this task
- [ ] No unresolved discrepancy conflict
- [ ] Scope confirmed to one file (or multi-file justification approved)

If any item is unchecked: resolve it before writing code.

---

# Fast Decision Tree

```
What do I need?
│
├── Current status / active work
│   └── CURRENT_STATE.md only
│
├── Project goals or constraints
│   └── PROJECT_OVERVIEW.md
│
├── Section order or render structure
│   └── SITE_ARCHITECTURE.md
│
├── Which file owns this
│   └── COMPONENT_REGISTRY.md
│
├── How to edit safely
│   └── FILE_EDIT_RULES.md
│
├── Behavior rules or stop conditions
│   └── AI_AGENT_CONSTITUTION.md
│
├── What to load for this task type
│   └── CONTEXT_LOADING_STRATEGY.md
│
└── When to update docs
    └── DOCUMENT_MAINTENANCE_RULES.md
```

---

# Startup Anti-Patterns

| Anti-pattern | Why wrong |
|---|---|
| Reading all docs at session start | Most sessions need 1–2 docs maximum |
| Opening `App.jsx` first | App.jsx owns architecture; CURRENT_STATE.md and COMPONENT_REGISTRY.md answer most questions without it |
| Opening multiple component files before ownership is known | Read COMPONENT_REGISTRY.md first; it identifies the one file to open |
| Reading SITE_ARCHITECTURE.md for a copy change | Copy is owned by the component; architecture docs are not needed |
| Skipping CURRENT_STATE.md | The task may be blocked; skip this and you may do work that cannot be used |
| Loading source files before checking for blocks | Wastes the entire session if the task turns out to be blocked |

---

# Success Criteria

A successful startup:

- Reads CURRENT_STATE.md first, always
- Identifies whether the task is blocked before loading any source file
- Loads at most 2–3 files for a typical component edit
- Identifies the owning file without opening sibling components
- Begins work within the first 3 file reads
