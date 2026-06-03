# PROJECT_OVERVIEW.md

---

# Purpose

- This document defines project-level facts and constraints.
- Unknown information must never be invented.
- This document is intended for future AI coding agents.
- This document provides high-level project context only.
- It must not be used for implementation-level decisions.

---

# Read Order

Read this document before:

- SITE_ARCHITECTURE.md
- COMPONENT_REGISTRY.md
- CURRENT_STATE.md

Purpose: Provide high-level project context only.

Do not use this document for:

- Implementation decisions
- Component ownership
- Styling decisions
- File editing decisions

---

## 1. Project Identity

- **Project name:** Infineo Landing Page
- **Description:** A single-page marketing and conversion site for Infineo, a Disney/Pixar-inspired mythology storytelling platform for children aged 5–12.
- **Current phase:** Active development (pre-launch)

---

## 2. Business Goal

- **Primary:** Drive demo class bookings from parents.
- **Secondary:**
  - Build brand trust through cinematic, story-driven UX.
  - Answer common parent questions to reduce booking friction.
  - Surface pricing and module information.
- **Primary conversion action:** Submit the "Book a Demo Class" form.
- **Secondary conversion actions:**
  - Engage with the FloatingChatbot FAQ.
  - Contact via FloatingWhatsapp.

---

## 3. Target Audience

- **Primary:** Parents of children aged 5–12.
- **Secondary:** Teachers; children (secondary influence, not decision-makers).
- **NOT the target audience:** EdTech investors, developers, general public without children, B2B buyers.

---

## 4. Technical Stack

- **Framework:** React
- **Build tool:** Vite
- **Styling approach:** Per-component CSS files + shared design tokens (`tokens.css`) + theme variables (`theme.css`). No CSS-in-JS, no utility framework.
- **State management:** React Context API. No global state library.
- **Animation:** Framer Motion + vanilla CSS transitions.
- **Form delivery:** EmailJS (demo booking submissions → infineo@infineo.live).
- **Deployment approach:** [Unknown — not defined in project files.]

---

## 5. Current Project Scope

**Includes:**
- Sticky header (Title)
- Hero section with video background
- BroadwayText (cinematic scroll text experience)
- Impact section
- Parents section
- Modules section
- DemoClass section with booking form
- Pricing section
- Footer
- FloatingChatbot (scripted FAQ — not AI/LLM)
- FloatingWhatsapp button
- Light and dark theme support (both are first-class)
- Cursor sparkle effect

**Does not include:**
- Backend or database
- User authentication
- AI/LLM chatbot
- Multi-page routing
- CMS or admin panel
- Mobile app

---

## 6. Success Criteria

- **Conversion target:** [TBD]
- **Performance target:** [TBD]
- **Accessibility target:** [TBD]
- **UX requirement:** Cinematic, magical feel (Disney/Pixar-inspired). Animations support storytelling. Both light and dark themes must be fully functional.
- **Maintainability requirement:** Each section is a self-contained component with its own CSS file. Modifications to one section must not break others.

---

## 7. Constraints

- Existing code must be preserved unless explicitly changed.
- No unnecessary abstractions or new state management libraries.
- No speculative or future features without explicit request.
- No section reordering without explicit approval.
- No architecture changes (routing, bundler, framework) without approval.
- Chatbot must remain scripted FAQ — do not integrate LLM/AI unless explicitly requested.
- Mythology character-to-lesson associations must not be invented; wait for explicit mapping.
- Demo form email recipient is fixed: infineo@infineo.live. Do not hardcode alternatives.

---

## 8. Current Status

**Observed completed areas:**
- Core section components: Title, Hero, Impact, Parents, Modules, DemoClass, Pricing, Footer
- FloatingChatbot, FloatingWhatsapp
- ThemeContext (light/dark)
- Design token system

**Observations:**
- BroadwayText component file exists at `src/components/BroadwayText.jsx`.
- BroadwayText is not currently rendered from `App.jsx`.
- Status: Unknown. No reason inferred.
- Deployment pipeline: not defined in any project file.

**Current priority:** [TBD — confirm with project owner before assuming.]
