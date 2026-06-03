# CURRENT_STATE.md

---

# Purpose

- This document tracks the current operational state of the Infineo landing page project.
- It is the first operational document a future agent should read before touching any code.
- It contains only current information. Historical information belongs in version control.
- It is expected to change frequently. Update it when task state changes. Do not update it otherwise.

---

# Read Order

Read after:
- PROJECT_OVERVIEW.md
- AI_AGENT_CONSTITUTION.md

Read before:
- Any source code files

Purpose: Determine what work is active, what is blocked, and what discrepancies exist before loading any component context.

---

# Project Status

**Current phase:** Active development — pre-launch

**Overall status:** Core sections exist and render. The page is not yet in a launchable state. Several functional gaps remain (see Work Queue below).

**Last reviewed:** 2025-07-15

**Deployment pipeline:** Not defined in any project file. Status unknown.

---

# Active Priority

**Owner input required.**

No reliable priority signal exists in the codebase or documentation. The following is the highest-impact gap based on observed project state:

- The demo booking form (`DemoClass.jsx`) submits to no destination. EmailJS integration is documented as required in `context.md` but is absent from the code. This is the primary conversion path of the site.

This observation is not a declared priority. Confirm with owner before acting on it.

---

# Current Work Queue

## Ready
*Tasks that can be executed immediately without owner input.*

No tasks are currently in Ready state. All identified work requires owner input, credentials, destination decisions, or approval before proceeding. See Blocked below.

## Blocked
*Tasks that cannot proceed without owner input.*

| Task | Blocked by |
|---|---|
| EmailJS integration | Owner must provide: service ID, template ID, public key |
| Wire Hero CTA button | Hero "BOOK THE DEMO" button has no destination. Destination not confirmed. Owner must decide. |
| Wire Impact CTA button | Impact "Start Your Child's Journey" button has no destination. Destination not confirmed. Owner must decide. |
| Replace founder avatar in Parents | Owner must provide: real founder photo URL or local asset |
| Update WhatsApp number | Owner must provide: live WhatsApp phone number |
| Fix Footer contact email | Footer shows `hello@infineo.com`. context.md specifies `infineo@infineo.live`. Owner must confirm correct address. |
| Wire social media links in Footer | Owner must provide: real URLs for Facebook, Instagram, YouTube, X |
| Wire Footer Company column links (About Us, Team, Blog, etc.) | Owner must provide: destinations or confirm pages do not exist yet |
| Resolve `#how` anchor destination | Owner must decide: which section should "NOTE TO PARENTS" / "HOW IT WORKS" scroll to |
| Resolve `#curriculum` anchor destination | Owner must decide: which section should "CURRICULUM" scroll to. Destination not confirmed. |
| Wire Pricing "Get Started" buttons | Owner must decide: intended action is not documented. |
| Add `#pricing` anchor to Pricing section | `#pricing` is referenced in Footer links but no matching `id` exists on the Pricing section element. Owner must confirm intended anchor name. |
| Deployment pipeline | Owner must define: hosting, build process, environment |
| BroadwayText standalone section | Owner must decide: should BroadwayText be mounted as a standalone section between Hero and Impact (per context.md), or remain a sub-component inside Hero? |

## Deferred
*Known work intentionally not being addressed now.*

| Work | Reason deferred |
|---|---|
| Footer newsletter form submission | No handler defined; delivery destination unknown |
| Pricing payment integration | Out of current scope per PROJECT_OVERVIEW.md |
| Mythology character-to-lesson curriculum mapping | Explicitly deferred; must not be invented |
| Success Stories page / Blog / Press Kit | Footer links point to `#`; pages do not exist |
| Mobile app | Explicitly out of scope per PROJECT_OVERVIEW.md |
| AI/LLM chatbot upgrade | Explicitly prohibited unless owner requests it |

---

# Known Discrepancies

All discrepancies sourced from existing documentation. No new observations added here.

| # | Observation | Source | Owner decision required? |
|---|---|---|---|
| 1 | DemoClass `handleSubmit` does not call EmailJS. Form submissions go nowhere. | COMPONENT_REGISTRY.md, SITE_ARCHITECTURE.md | Yes — provide EmailJS credentials |
| 2 | Footer contact email is `hello@infineo.com`. context.md specifies `infineo@infineo.live`. | COMPONENT_REGISTRY.md, SITE_ARCHITECTURE.md | Yes — confirm correct email |
| 3 | `#how` nav anchor has no matching section `id` in any component. Target section not confirmed. | SITE_ARCHITECTURE.md, COMPONENT_REGISTRY.md | Yes — owner must confirm target section |
| 4 | `#curriculum` nav anchor has no matching section `id` in any component. Target section not confirmed. | SITE_ARCHITECTURE.md, COMPONENT_REGISTRY.md | Yes — owner must confirm target section |
| 5 | `#pricing` referenced in Footer links but no `id` observed on Pricing section element. | SITE_ARCHITECTURE.md, COMPONENT_REGISTRY.md | Yes — confirm and add id |
| 6 | Desktop nav label "NOTE TO PARENTS" and mobile drawer label "HOW IT WORKS" use different text for the same `#how` href. | SITE_ARCHITECTURE.md | Yes — confirm intended label for each |
| 7 | Hero "BOOK THE DEMO" button has no scroll or routing behavior. Destination not confirmed. | SITE_ARCHITECTURE.md, COMPONENT_REGISTRY.md | Yes — owner must confirm intended destination |
| 8 | Impact "Start Your Child's Journey" button has no scroll or routing behavior. Destination not confirmed. | SITE_ARCHITECTURE.md, COMPONENT_REGISTRY.md | Yes — owner must confirm intended destination |
| 9 | Pricing "Get Started" buttons have no action beyond `e.stopPropagation()`. | SITE_ARCHITECTURE.md, COMPONENT_REGISTRY.md | Yes — confirm intended action |
| 10 | WhatsApp phone number is placeholder `919999999999`. | COMPONENT_REGISTRY.md | Yes — provide live number |
| 11 | Founder avatar in Parents loads from `https://i.pravatar.cc/80?img=12` (external placeholder). | COMPONENT_REGISTRY.md, SITE_ARCHITECTURE.md | Yes — provide real asset |
| 12 | Footer social media links all point to `#`. | SITE_ARCHITECTURE.md | Yes — provide real URLs |
| 13 | Footer Company column links (About Us, Team, Blog, etc.) point to `#`. | SITE_ARCHITECTURE.md | Yes — provide destinations or confirm not yet built |
| 14 | `website-neo.png` is imported in `Parents.jsx` but not rendered. | COMPONENT_REGISTRY.md | No — do not remove without owner instruction |
| 15 | `ThemeContext` exports `sparklesEnabled` and `toggleSparkles` but no UI component exposes a sparkles toggle. | COMPONENT_REGISTRY.md | No — do not add UI without owner instruction |
| 16 | BroadwayText exists as a component but is not mounted as a standalone section in `App.jsx`. `context.md` lists it as a section between Hero and Impact. | SITE_ARCHITECTURE.md, PROJECT_OVERVIEW.md | Yes — confirm intended usage |
| 17 | Footer newsletter form calls `e.preventDefault()` only. No submission handler exists. | COMPONENT_REGISTRY.md | Yes — provide delivery destination |
| 18 | Deployment pipeline is not defined in any project file. | PROJECT_OVERVIEW.md | Yes — define before launch |

---

# Known Risks

Sourced from AI_AGENT_CONSTITUTION.md Risk Register. No new risks added.

| Risk | Files affected | Why it matters now |
|---|---|---|
| EmailJS absent | `DemoClass.jsx` | The primary conversion path submits to no destination. Launch with this unresolved means zero bookings captured. |
| Broken nav anchors (`#how`, `#curriculum`) | `Title.jsx` | Two of five nav items are non-functional. Visible to any user who clicks them. |
| Placeholder production values | `FloatingWhatsapp.jsx`, `Footer.jsx`, `Parents.jsx` | Launching with a placeholder WhatsApp number, placeholder email, and placeholder avatar will visibly undermine credibility. |
| Section wrapper boundary | `App.jsx` | FloatingChatbot and FloatingWhatsapp must stay outside `div.journey-background`. Any refactor that moves them inside will silently break fixed positioning. |
| Theme variable dependency chain | `theme.css`, `tokens.css` | All component CSS files depend on these. A rename or deletion cascades to every visual element on the page. |

---

# Session Handoff Notes

Read this before starting any session. These are the things most likely to cause wasted work or incorrect assumptions.

**1. The booking form does not submit anywhere.**
`DemoClass.jsx` `handleSubmit` sets local state only. EmailJS is documented as required but not implemented. Do not assume the form works end-to-end. Do not implement EmailJS without credentials from the owner.

**2. Two nav links go nowhere.**
`#how` and `#curriculum` in `Title.jsx` have no matching section IDs. Target sections are not documented. Do not add IDs or wire these anchors until the owner confirms which sections they should target.

**3. BroadwayText section status is unresolved.**
The component exists and works. It is used inside Hero as a sub-component for heading animation. `context.md` also lists it as a standalone section between Hero and Impact. These are inconsistent. Do not mount it as a standalone section and do not remove it from Hero until the owner clarifies intent.

**4. All placeholder values are still in place.**
WhatsApp number, founder avatar, footer contact email, and social media links are all placeholders or mismatched. Do not treat any of them as final. Do not update them without owner-provided replacement values.

**5. Both themes must work after every change.**
Dark mode is the default. Light mode is fully implemented and considered first-class. Every change must be verified in both themes before marking work complete. Do not skip light mode verification.

**6. The page render order is fixed.**
The section order in `App.jsx` is the approved order per SITE_ARCHITECTURE.md. Do not reorder, merge, or add sections without explicit owner approval.

**7. No deployment target is defined.**
Do not assume Vercel, Netlify, or any other platform. Do not create deployment config files without explicit instruction.

---

# Update Rules

**Update this document when:**
- A task moves from Ready → complete (remove from Ready, note resolved in discrepancy table if applicable)
- A task moves from Blocked → Ready (owner provided required input)
- A new discrepancy is discovered during a coding session
- A known discrepancy is resolved
- Project phase changes
- Active priority is confirmed by owner

**Do not update this document when:**
- A code change was made that does not affect project status
- The change is internal to a component with no impact on the work queue
- The change resolves no discrepancy and shifts no priority
- You want to add recommendations, roadmap items, or speculative future work

**Format rules:**
- Keep each section current. Remove resolved items rather than annotating them as resolved inline.
- If a discrepancy is resolved, remove its row from the Known Discrepancies table and update SITE_ARCHITECTURE.md or COMPONENT_REGISTRY.md to remove the corresponding Observed note.
- Do not let the Work Queue accumulate completed tasks. Completed work is not tracked here.
- Last reviewed date must be updated whenever the document is meaningfully changed.
