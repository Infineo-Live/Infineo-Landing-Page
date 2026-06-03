# COMPONENT_REGISTRY.md

---

# Purpose

- This document defines component ownership for every file in the codebase.
- Agents must identify which component owns a responsibility before editing any file.
- Agents must modify the smallest responsible component possible.
- Agents must not edit unrelated components to accomplish a task.

---

# Read Order

Read after:
- PROJECT_OVERVIEW.md
- SITE_ARCHITECTURE.md

Read before:
- FILE_EDIT_RULES.md

---

# Component Inventory

| Component | File | Edit Impact |
|---|---|---|
| App | `src/App.jsx` | High |
| Title | `src/components/Title.jsx` | Medium |
| Hero | `src/components/Hero.jsx` | Medium |
| BroadwayText | `src/components/BroadwayText.jsx` | Low |
| Impact | `src/components/Impact.jsx` | Medium |
| Parents | `src/components/Parents.jsx` | Low |
| Modules | `src/components/Modules.jsx` | Medium |
| DemoClass | `src/components/DemoClass.jsx` | High |
| Pricing | `src/components/Pricing.jsx` | Medium |
| FloatingChatbot | `src/components/FloatingChatbot.jsx` | Medium |
| FloatingWhatsapp | `src/components/FloatingWhatsapp.jsx` | Low |
| Footer | `src/components/Footer.jsx` | Low |
| ThemeContext | `src/context/ThemeContext.jsx` | High |
| cursorSparkles | `src/utils/cursorSparkles.js` | Medium |
| theme.css | `src/styles/theme.css` | High |
| tokens.css | `src/styles/tokens.css` | High |
| App.css | `src/App.css` | High |

---

# Component Definitions

---

## App

File: `src/App.jsx`

Purpose: Root component. Mounts all sections in approved order. Initializes global effects (cursor sparkles, scroll-reveal IntersectionObserver).

Imports:
- ThemeProvider from `./context/ThemeContext`
- initCursorSparkles from `./utils/cursorSparkles`
- Title, Hero, Impact, Parents, Modules, DemoClass, Pricing, FloatingChatbot, FloatingWhatsapp, Footer
- `./App.css`

Exports: `App` (default)

Owns:
- Section render order
- `div.journey-background` wrapper (wraps Impact → Pricing)
- Global scroll-reveal IntersectionObserver (adds `section-visible` / `section-blurred` classes)
- Cursor sparkle initialization

Does Not Own:
- Section content (each section owns its own content)
- Theme state (owned by ThemeContext)
- CSS variables (owned by theme.css / tokens.css)

Dependencies: All section components, ThemeContext, cursorSparkles

Edit Impact: High

Reason: Any change to App.jsx affects section render order, wrapper boundaries, or global effects. Misplacing FloatingChatbot or FloatingWhatsapp inside `journey-background` will break their viewport-fixed positioning.

---

## Title

File: `src/components/Title.jsx`

Purpose: Sticky navigation header. Hides on scroll down, reveals on scroll up.

Imports:
- useTheme from `../context/ThemeContext.jsx`
- `logo_with_text.png`
- `../styles/Title.css`

Exports: `Title` (default)

Owns:
- Infineo logo display
- Desktop navigation links and labels
- Desktop `BOOK THE DEMO` button
- Mobile hamburger toggle and drawer
- Light/dark theme toggle button
- Scroll-aware hide/reveal behavior
- Mouse-tracking nav droplet effect

Does Not Own:
- Theme state (reads from ThemeContext, does not own it)
- Any section content
- Form submission

Dependencies: ThemeContext (useTheme)

Edit Impact: Medium

Reason: Changes to nav links affect all anchor scroll destinations across the page. Theme toggle is wired to ThemeContext; visual breakage affects both themes.

---

## Hero

File: `src/components/Hero.jsx`

Purpose: First-screen experience. Renders above `journey-background`.

Imports:
- BroadwayText from `./BroadwayText`
- Neo mascot frames: `neo.png`, `neo2.png`, `neo3.png`, `neo4.png` from `../assets/neo-version/blink/`
- `../styles/Hero.css`

Exports: `Hero` (default)

Owns:
- Hero heading (delegated to BroadwayText sub-component)
- Hero subtitle copy
- Primary `BOOK THE DEMO` CTA button
- Social proof strip (500+ Happy Kids, 7 Epic Modules, Ages 5–14)
- Neo mascot blink animation (4-frame CSS sprite)
- Background video (`/bg-video2.mp4`)
- Scroll indicator
- Section visibility IntersectionObserver (adds `visible` class)

Does Not Own:
- BroadwayText animation logic (owned by BroadwayText)
- Navigation
- Booking form

Dependencies: BroadwayText

Edit Impact: Medium

Reason: Hero is the primary first impression. CTA button has no scroll behavior attached; changes here do not affect other sections unless anchor IDs change.

---

## BroadwayText

File: `src/components/BroadwayText.jsx`

Purpose: Animated per-character text reveal component. Used as a sub-component inside Hero headings.

Imports:
- `../styles/BroadwayText.css`

Exports: `BroadwayText` (default)

Props:
- `text` (string) — text to animate
- `className` (string, optional)
- `tag` (element type, default `span`)

Owns:
- Character-by-character reveal animation
- IntersectionObserver to trigger visibility
- Word grouping to prevent mid-word line breaks

Does Not Own:
- Heading structure (owned by Hero)
- Font or color styles (owned by theme.css)

Dependencies: None (no component dependencies)

Edit Impact: Low

Reason: Self-contained. Only used inside Hero currently. Changes to animation timing or character splitting only affect text where BroadwayText is used.

---

## Impact

File: `src/components/Impact.jsx`

Purpose: Child transformation storytelling section. Three before/after journey cards with glass-break animation.

Imports:
- 6 impact images from `../assets/impact/`
- `glass-break.mp3` from `../assets/audio/`
- `../styles/Impact.css`

Exports: `Impact` (default), `GlassBreakCard` (internal, not exported)

Owns:
- Section heading and subheading
- 3 journey card definitions (data hardcoded in `JOURNEYS` array)
- Glass-break animation state machine (hidden → enter → breaking → broken → reveal)
- Glass-break audio playback and browser autoplay unlock
- Secondary CTA button ("Start Your Child's Journey")

Does Not Own:
- Navigation
- Booking form
- Pricing

Dependencies: None (no component dependencies)

Edit Impact: Medium

Reason: Audio unlock relies on first user gesture. Animation state is per-card. Changes to `JOURNEYS` data directly alter section content. CTA button has no action attached.

---

## Parents

File: `src/components/Parents.jsx`

Purpose: "Letter to Every Parent" trust section.

Imports:
- `website-neo.png` from `../assets/` (imported but not rendered in JSX)
- `../styles/Parents.css`

Exports: `Parents` (default)

Owns:
- Letter heading, body copy, and decorative SVG ornaments
- Founder avatar and name display

Does Not Own:
- Navigation
- Booking form
- Pricing

Dependencies: None

Edit Impact: Low

Reason: No external data, no interactivity. Fully static content. Changes are contained to this file.

**Observed:** `website-neo.png` is imported but not used in the component JSX. Founder avatar loads from external URL `https://i.pravatar.cc/80?img=12`.

---

## Modules

File: `src/components/Modules.jsx`

Purpose: Game-map style curriculum display. Shows 9 mythology module nodes connected by an animated SVG path.

Imports:
- 9 god/epic images from `../assets/gods/`
- `../styles/Modules.css`

Exports: `Modules` (default)

Owns:
- Module data (hardcoded in `MODULES` array — 9 entries)
- SVG path generation between nodes
- Responsive layout switching at 650px breakpoint
- Node reveal animation via IntersectionObserver
- "Coming Next" badge for Ramayana and Mahabharata nodes

Does Not Own:
- Mythology character-to-lesson curriculum mapping (not defined; do not invent)
- Navigation
- Booking form
- Pricing

Dependencies: None

Edit Impact: Medium

Reason: Path coordinates are calculated from `MODULES` array positions. Adding, removing, or reordering entries will recalculate the SVG path. Mobile layout uses separate coordinate logic.

---

## DemoClass

File: `src/components/DemoClass.jsx`

Purpose: Primary conversion section. Contains the demo booking form and trial reward display.

Imports:
- `neo-without-eyes.png` from `../assets/neo-version/`
- `../styles/DemoClass.css`

Exports: `DemoClass` (default)

Owns:
- Booking form (fields: childName, parentName, email, phone, childAge, module)
- Form state management (controlled inputs via useState)
- Form submission handler (local state only — no EmailJS call present)
- Trial reward orbit animation (5 reward cards, RAF-driven rotation)
- Neo mascot eye-tracking (mousemove / touchmove)
- Mascot scroll parallax
- Reward card sparkle burst on hover
- Section in-view reveal via IntersectionObserver

Does Not Own:
- EmailJS integration (described in context.md as required; not present in current code)
- Pricing plan information
- FAQ responses
- Navigation

Dependencies: None

Edit Impact: High

Reason: Primary conversion component. Form submission currently uses local state only — EmailJS integration is absent. Eye-tracking uses multiple refs. Orbit animation uses requestAnimationFrame loop; cleanup is required on unmount.

---

## Pricing

File: `src/components/Pricing.jsx`

Purpose: Display three subscription plan tiers with monthly/quarterly billing toggle.

Imports:
- `../styles/Pricing.css`

Exports: `Pricing` (default)

Owns:
- 3 plan definitions (hardcoded in `plans` array — Starter, Popular, Premium)
- Monthly/quarterly billing toggle state
- Selected plan highlight state
- Per-session price calculation display
- "Get Started" CTA buttons (no action attached)
- Section visibility via IntersectionObserver

Does Not Own:
- Payment processing (none present)
- Navigation
- Booking form

Dependencies: None

Edit Impact: Medium

Reason: Plan data (prices, features, session counts) is hardcoded. Currency is INR (₹). Changes to plan structure affect all three cards. "Get Started" buttons have no handler beyond `e.stopPropagation()`.

---

## FloatingChatbot

File: `src/components/FloatingChatbot.jsx`

Purpose: Viewport-fixed scripted FAQ assistant.

Imports:
- useTheme from `../context/ThemeContext`
- `../styles/FloatingChatbot.css`

Exports: `FloatingChatbot` (default)

Owns:
- Floating trigger button (viewport-fixed)
- Chat panel open/close state
- Message list state
- 8 FAQ entries (hardcoded in `faqs` array, keyword-matched)
- Quick-question buttons (first 3 FAQs on open)
- Simulated bot typing delay (800ms)
- Theme-aware icons

Does Not Own:
- Any LLM, AI, or external API connection
- Navigation
- Booking form

Dependencies: ThemeContext (useTheme)

Edit Impact: Medium

Reason: FAQ responses and keywords are hardcoded. Adding/editing FAQ entries requires editing the `faqs` array in this file only. Theme icons read from ThemeContext.

**Constraint:** Must not be converted to AI/LLM without explicit approval.

---

## FloatingWhatsapp

File: `src/components/FloatingWhatsapp.jsx`

Purpose: Viewport-fixed WhatsApp deep-link button.

Imports:
- `../styles/FloatingWhatsapp.css`

Exports: `FloatingWhatsapp` (default)

Owns:
- Floating button (viewport-fixed)
- WhatsApp URL construction (`https://wa.me/` + phone + pre-filled message)

Does Not Own:
- Chat logic
- Navigation

Dependencies: None

Edit Impact: Low

Reason: Fully self-contained. Only change needed is updating the phone number constant. No component dependencies.

**Observed:** `phoneNumber` is set to `"919999999999"` — a placeholder. Not a live number.

---

## Footer

File: `src/components/Footer.jsx`

Purpose: Site-wide footer. Navigation links, contact info, newsletter form, legal links.

Imports:
- `../styles/Footer.css`

Exports: `Footer` (default)

Owns:
- Brand logo and tagline
- Social media links (all currently `#`)
- Module links column (anchor to `#modules`)
- For Parents links column
- Company links column
- Legal links column
- Newsletter email form (no submission handler — `e.preventDefault()` only)
- Contact information display
- Copyright line

Does Not Own:
- Primary navigation (owned by Title)
- Booking form (owned by DemoClass)
- Pricing plan data (owned by Pricing)

Dependencies: None

Edit Impact: Low

Reason: Fully static. No state, no context. Changes are contained unless anchor links are edited (affects in-page scroll destinations).

**Observed:** Contact email shown is `hello@infineo.com`. context.md specifies `infineo@infineo.live`. Newsletter form calls `e.preventDefault()` only — no submission handler.

---

## ThemeContext

File: `src/context/ThemeContext.jsx`

Purpose: Global light/dark theme state. Persists to localStorage. Applies `data-theme` attribute to `document.documentElement`.

Imports: React (createContext, useContext, useEffect, useState)

Exports:
- `ThemeProvider` (named) — wrap at App root
- `useTheme` (named hook) — consume in any component

Owns:
- Theme state (`'dark'` default)
- `sparklesEnabled` state
- localStorage keys: `infineo-theme`, `infineo-sparkles`
- `data-theme` attribute on `<html>`
- `window.__sparklesEnabled` global flag
- `window.__cursorSparklesCleanup` call when sparkles disabled

Does Not Own:
- Visual theme styles (owned by theme.css)
- Sparkle particle rendering (owned by cursorSparkles)

Dependencies: None

Edit Impact: High

Reason: Consumed by Title, FloatingChatbot, and cursorSparkles (via `data-theme` attribute). Incorrect state changes affect every themed element on the page across both modes.

---

## cursorSparkles

File: `src/utils/cursorSparkles.js`

Purpose: Cursor trail and click-burst particle system. Renders SVG particles into a `#sparkle-portal` overlay div appended to `document.body`.

Imports: None

Exports: `initCursorSparkles` (default function)

Owns:
- `#sparkle-portal` div creation and management
- Dark and light palette definitions (reads `data-theme` from `<html>`)
- Four SVG particle shapes: glint cross, 4/5-point star, diamond, orb
- Mousemove trail and click burst event listeners
- Particle RAF animation loop and cleanup

Does Not Own:
- Theme state (reads `data-theme` attribute set by ThemeContext)
- Sparkle enable/disable logic (ThemeContext calls `window.__cursorSparklesCleanup`)

Dependencies: ThemeContext indirectly (reads `data-theme` attribute; does not import ThemeContext directly)

Edit Impact: Medium

Reason: Initialised once in App.jsx useEffect. Returns a cleanup function. Skips execution on touch-only devices. Changes to palette or shapes are self-contained. Changes to portal ID (`sparkle-portal`) require matching update in App.css.

---

# Shared Systems

---

## Theme System

Owner: `src/context/ThemeContext.jsx` (state), `src/styles/theme.css` (variables), `src/styles/tokens.css` (scale tokens)

How it works:
- ThemeContext sets `data-theme="light"` or `data-theme="dark"` on `<html>`.
- `theme.css` defines all CSS custom properties under `:root` / `[data-theme="light"]` / `[data-theme="dark"]`.
- `tokens.css` defines layout-scale tokens (spacing, font-size, border-radius) that do not change per theme.
- All component CSS files consume variables from `theme.css` and `tokens.css`.

Boundary:
- To change a color or visual style → edit `theme.css`.
- To change a spacing or size scale → edit `tokens.css`.
- To change theme toggle behavior → edit `ThemeContext.jsx`.
- Do not hardcode color values in component CSS files if a theme variable exists.

Components that directly consume ThemeContext: Title, FloatingChatbot.

Components that consume theme via CSS variables: all components (indirectly via their CSS files).

---

## Navigation System

Owner: `src/components/Title.jsx`

How it works:
- Desktop nav and mobile drawer in Title render anchor links (`href="#id"`).
- Scroll destination IDs are set on section root elements in individual components.
- Smooth scroll is enabled globally via `html { scroll-behavior: smooth }` in `theme.css`.

Known anchor IDs in use:

| ID | Set in |
|---|---|
| `home` | Hero (`<section id="home">`) |
| `stories` | Impact (`<section id="stories">`) |
| `parents` | Parents (`<section id="parents">`) |
| `modules` | Modules (`<section id="modules">`) |
| `book` | DemoClass (form container `id="book"`) |

**Observed:** `#how` and `#curriculum` are referenced in Title nav links but no matching `id` exists in any current component.

**Observed:** `#pricing` is referenced in Footer links but no `id` is observed on the Pricing section element.

---

## Form System

Owner: `src/components/DemoClass.jsx` (primary booking form), `src/components/Footer.jsx` (newsletter form)

DemoClass form:
- Controlled inputs via React useState.
- `handleSubmit` sets `isSubmitted: true` and resets fields after 3 seconds.
- No EmailJS call present in current code.
- Intended recipient per context.md: `infineo@infineo.live`.

Footer newsletter form:
- Calls `e.preventDefault()` only.
- No submission handler.

Shared global form input styles: defined in `theme.css` (`input`, `textarea`, `select` rules).

---

## Floating UI System

Owner: `src/components/FloatingChatbot.jsx`, `src/components/FloatingWhatsapp.jsx`

How it works:
- Both components use `position: fixed` to stay in the viewport.
- Both are rendered in App.jsx **outside** `div.journey-background` and **outside** Footer.
- This placement is a hard constraint documented in App.jsx.

Constraint: Any ancestor element with `filter`, `will-change: filter`, `backdrop-filter`, or `background-attachment: fixed` creates a new containing block that traps `position: fixed` children. FloatingChatbot and FloatingWhatsapp must never be moved inside such an ancestor.

Z-index reference (from theme.css and App.css):
- `#sparkle-portal`: `z-index: 999999`
- FloatingChatbot: `z-index: 99999` (observed in FloatingChatbot.css — not read, inferred from comment in App.css)
- FloatingWhatsapp: [not confirmed — CSS file not read]

---

# Editing Rules

| Task | Edit only |
|---|---|
| Change hero headline or subtitle | `Hero.jsx` |
| Change hero CTA button label | `Hero.jsx` |
| Change nav link labels or destinations | `Title.jsx` |
| Change theme toggle behavior | `ThemeContext.jsx` |
| Change color variables (either theme) | `theme.css` |
| Change spacing/size scale tokens | `tokens.css` |
| Change impact journey cards (problems/results) | `Impact.jsx` (`JOURNEYS` array) |
| Change letter-to-parents copy | `Parents.jsx` |
| Change module list or node positions | `Modules.jsx` (`MODULES` array) |
| Add/remove/reorder modules | `Modules.jsx` (`MODULES` array) |
| Change booking form fields | `DemoClass.jsx` |
| Add EmailJS integration | `DemoClass.jsx` (`handleSubmit`) |
| Change pricing plan data or prices | `Pricing.jsx` (`plans` array) |
| Change chatbot FAQ responses | `FloatingChatbot.jsx` (`faqs` array) |
| Change WhatsApp phone number | `FloatingWhatsapp.jsx` (`phoneNumber` constant) |
| Change footer links or copy | `Footer.jsx` |
| Change cursor sparkle palette | `cursorSparkles.js` (`PALETTE_DARK` / `PALETTE_LIGHT`) |
| Change section render order | `App.jsx` — requires explicit approval |
| Add a new section | `App.jsx` — requires explicit approval |

---

# Observations

- `website-neo.png` is imported in `Parents.jsx` but is not rendered anywhere in the component JSX.
- `ThemeContext` exports `sparklesEnabled` and `toggleSparkles` but no component currently renders a sparkles toggle UI.
- `window.__sparklesEnabled` and `window.__cursorSparklesCleanup` are set as global window properties by ThemeContext and cursorSparkles respectively. No other file is observed reading these except cursorSparkles.
- `tokens.css` defines a rem-based spacing scale; `theme.css` defines a px-based spacing scale. Both exist. Component CSS files may use either.
- `theme.css` defines global `input`, `textarea`, `select`, `button`, `a`, and heading element styles. Component CSS files may override these locally.
- `theme.css` defines `.btn-primary`, `.btn-secondary`, `.btn-magic`, `.magic-card`, `.text-shimmer` as shared utility classes. These are used across multiple component CSS files.
- `App.css` defines `.section-transition`, `.section-blurred`, `.section-visible` classes applied by the IntersectionObserver in `App.jsx`. Only `will-change: opacity` is used (not `will-change: transform`) to avoid creating stacking contexts that would trap floating UI.
- `BroadwayText` is rendered inside Hero as a sub-component for heading lines. It is not rendered as a standalone section anywhere in the current codebase.
- DemoClass booking form has no EmailJS call. Submission is local state only.
- Footer contact email (`hello@infineo.com`) does not match the email in context.md (`infineo@infineo.live`).
- Footer newsletter form has no submission handler beyond `e.preventDefault()`.
- WhatsApp phone number in FloatingWhatsapp is `"919999999999"` — a placeholder.
- Founder avatar in Parents loads from `https://i.pravatar.cc/80?img=12` — an external third-party URL.
- Several Footer columns (Company, social links) point to `#` with no real destinations.
- `#how` and `#curriculum` nav anchors in Title have no matching `id` in any rendered component.
- Pricing "Get Started" buttons call `e.stopPropagation()` only — no navigation or form action.
- Hero "BOOK THE DEMO" button and Impact "Start Your Child's Journey" button have no scroll or routing behavior in their component code.
