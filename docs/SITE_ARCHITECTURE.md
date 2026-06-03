# SITE_ARCHITECTURE.md

---

# Purpose

- This document defines the page architecture of the Infineo landing page.
- It is the source of truth for section order and section boundaries.
- Agents must not invent sections.
- Agents must not reorder sections without explicit approval.
- Agents must not merge, split, or move functionality between sections without explicit approval.

---

# Read Order

Read after:
- PROJECT_OVERVIEW.md

Read before:
- COMPONENT_REGISTRY.md

---

# Approved Page Flow

Determined from `src/App.jsx`. Render order is exact.

1. Title *(sticky header — renders outside the journey-background wrapper)*
2. Hero
3. Impact *(inside `div.journey-background`)*
4. Parents *(inside `div.journey-background`)*
5. Modules *(inside `div.journey-background`)*
6. DemoClass *(inside `div.journey-background`)*
7. Pricing *(inside `div.journey-background`)*
8. Footer

Floating elements (rendered outside all section wrappers, after Pricing, before Footer):
- FloatingChatbot
- FloatingWhatsapp

**Observed:** BroadwayText is used as a sub-component inside Hero (renders the hero heading lines). It is not a standalone section in the current render tree.

**Observed:** `context.md` lists BroadwayText as a step in the section journey between Hero and Impact. This does not match the current `App.jsx` render tree. Status: unknown.

---

# Section Responsibilities

## Title

Purpose: Sticky navigation header. Always visible at the top of the viewport.

Owns:
- Infineo logo
- Desktop navigation links (`ABOUT`, `IMPACT`, `NOTE TO PARENTS`, `CURRICULUM`, `PRICING`)
- Desktop `BOOK THE DEMO` CTA button
- Mobile hamburger menu and drawer
- Light/dark theme toggle

Does Not Own:
- Hero content
- Any section content below the header
- Form submission

---

## Hero

Purpose: First-screen experience. Primary emotional and conversion entry point.

Owns:
- Hero headline (rendered via BroadwayText sub-component)
- Hero subtitle copy
- Primary `BOOK THE DEMO` CTA button
- Social proof strip (500+ Happy Kids, 7 Epic Modules, Ages 5–14)
- Neo mascot with blinking animation (4-frame sprite)
- Background video (`/bg-video2.mp4`)
- Scroll indicator

Does Not Own:
- Navigation
- Pricing
- Booking form
- FAQ

---

## Impact

Purpose: Demonstrate child transformation from problem state to positive outcome. Emotional engagement section.

Owns:
- Section heading ("Every Child's Transformation")
- 3 journey cards (Screen Addiction → Focus, Peer Pressure → Empathy, Anxiety → Resilience)
- Glass-break animation per card
- Glass-break audio (`glass-break.mp3`)
- Secondary CTA button ("Start Your Child's Journey")

Does Not Own:
- Navigation
- Booking form
- Pricing
- Module details

---

## Parents

Purpose: Direct letter to parents. Trust-building and emotional connection.

Owns:
- "A Letter to Every Parent" heading
- Letter body copy
- Founder avatar and name display

Does Not Own:
- Navigation
- Booking form
- Pricing
- FAQ

**Observed:** Founder avatar image is loaded from an external placeholder URL (`https://i.pravatar.cc/80?img=12`). Founder name shown is "Ananya Sharma".

---

## Modules

Purpose: Display the full curriculum map of available mythology modules.

Owns:
- Section heading ("Explore. Learn. Grow.")
- Game-map layout with 9 module nodes (7 active, 2 "Coming Next")
- Animated SVG path connecting all nodes
- Module tooltips (name and subtitle per node)

Does Not Own:
- Navigation
- Booking form
- Pricing
- Mythology character-to-lesson curriculum mapping

**Observed:** 9 modules are defined: Ganesha, Hanuman, Krishna, Ram, Shiva, Shakti, Vishnu, Ramayana, Mahabharata. Ramayana and Mahabharata are marked `comingSoon: true`.

---

## DemoClass

Purpose: Primary conversion section. Houses the demo class booking form and trial reward display.

Owns:
- Booking form (child name, parent name, email, phone, child age, module preference)
- Form submission handler
- Trial reward orbit animation (5 reward cards)
- Neo mascot with eye-tracking interaction
- Section CTA copy ("Book a FREE 30-Minute Demo Class")

Does Not Own:
- Navigation
- Pricing plans
- FAQ responses
- EmailJS integration *(observed: form currently calls a local `handleSubmit` that sets `isSubmitted` state only — no EmailJS call found in current code)*

**Observed:** Form `handleSubmit` does not currently call EmailJS. It sets `isSubmitted: true` and resets form after 3 seconds. EmailJS integration is described in `context.md` as required but is not present in the current code.

---

## Pricing

Purpose: Display subscription plan options and pricing to help parents select a tier.

Owns:
- 3 pricing plan cards (Starter, Popular, Premium)
- Monthly/quarterly billing toggle
- Per-session price calculation
- "Get Started" CTA per plan

Does Not Own:
- Navigation
- Booking form
- FAQ
- Payment processing *(no payment integration observed)*

**Observed:** Prices are hardcoded in INR (₹). No payment gateway or external billing integration is present in the current code.

---

## Footer

Purpose: Site-wide footer with navigation links, contact information, and newsletter signup.

Owns:
- Brand logo and tagline
- Social media links (Facebook, Instagram, YouTube, X/Twitter)
- Module links column
- "For Parents" links column
- Company links column
- Legal links column
- Newsletter email signup form
- Contact information display (email, phone, location)
- Copyright line

Does Not Own:
- Primary navigation (owned by Title)
- Booking form (owned by DemoClass)
- Pricing plans (owned by Pricing)

**Observed:** Footer contact email shown is `hello@infineo.com`. `context.md` specifies `infineo@infineo.live` as the designated contact email. These do not match.

**Observed:** Footer phone number shown is `+91 98765 43210` (placeholder). Footer social links all point to `#` (no real URLs set).

**Observed:** Several footer link destinations (`About Us`, `Our Team`, `Blog`, `Success Stories`, `Career`, `Contact`) point to `#` with no destinations set.

---

## FloatingChatbot

Purpose: Viewport-fixed FAQ assistant. Reduces parent friction and supports demo bookings.

Owns:
- Floating trigger button (viewport-fixed)
- Chat panel UI
- Scripted FAQ response logic (8 FAQ entries, keyword-matched)
- Quick-question buttons (first 3 FAQs surfaced on open)
- Theme-aware icons (dark: 🌟 / 💬, light: 🌞 / 🗨️)

Does Not Own:
- Any LLM, AI, or external API
- Navigation
- Booking form submission

**Constraint:** Must remain a scripted FAQ assistant. Do not integrate LLM/AI unless explicitly requested.

---

## FloatingWhatsapp

Purpose: Viewport-fixed WhatsApp deep-link button for direct parent contact.

Owns:
- Floating WhatsApp button (viewport-fixed)
- WhatsApp deep link with pre-filled message

Does Not Own:
- Chat logic
- Navigation
- Booking form

**Observed:** Phone number in code is `919999999999` (placeholder). This is not a live number.

---

# Navigation Rules

## Anchor links defined in Title (desktop nav):

| Label | `href` |
|---|---|
| ABOUT | `#home` |
| IMPACT | `#stories` |
| NOTE TO PARENTS | `#how` |
| CURRICULUM | `#curriculum` |
| PRICING | `#pricing` |
| BOOK THE DEMO (button) | No `href` — button element only, no scroll target set |

**Observed:** `#how` maps to no `id` found in current component files. `#curriculum` maps to no `id` found in current component files. `#home` maps to `id="home"` in Hero. `#stories` maps to `id="stories"` in Impact. `#pricing` is not observed as an `id` on the Pricing section element in the current code.

## Anchor links defined in Title (mobile drawer):

| Label | `href` |
|---|---|
| ABOUT | `#home` |
| STORIES | `#stories` |
| HOW IT WORKS | `#how` |
| CURRICULUM | `#curriculum` |
| BOOK THE DEMO (button) | No `href` |

**Observed:** Desktop and mobile nav labels are not identical. Desktop shows "NOTE TO PARENTS"; mobile shows "HOW IT WORKS" for the same `#how` href.

## Primary CTA destinations:

- Hero "BOOK THE DEMO" button: no `href` set (button element, no scroll behavior attached in Hero component).
- Impact "Start Your Child's Journey" button: no `href` set.
- DemoClass "Book Free Trial" link: `href="#book"`. `id="book"` is set on the form container inside DemoClass.

## Secondary CTA destinations:

- FloatingWhatsapp: external `https://wa.me/` deep link.
- FloatingChatbot: opens in-page chat panel.
- Pricing "Get Started" buttons: no `href` or handler set beyond `e.stopPropagation()`.

---

# Architecture Constraints

- Do not reorder sections without explicit approval.
- Do not create new top-level sections without explicit approval.
- Do not merge or split existing sections without explicit approval.
- Do not move functionality between sections without explicit approval.
- FloatingChatbot and FloatingWhatsapp must remain rendered outside any ancestor with `filter`, `will-change: filter`, or `background-attachment: fixed`. This is documented in `App.jsx` and is a hard rendering constraint.
- Both light and dark themes must remain functional after any change. A change is not complete unless both themes are verified.
- Do not change the chatbot from scripted FAQ to AI/LLM without explicit approval.

---

# Observations

- `BroadwayText` is used as a sub-component inside Hero for animated heading text. It is not mounted as a standalone section.
- `context.md` lists BroadwayText as a standalone section in the page flow between Hero and Impact. This is not reflected in `App.jsx`.
- Impact, Parents, Modules, DemoClass, and Pricing are all wrapped in a single `div.journey-background`. Title, Hero, floating elements, and Footer are outside this wrapper.
- The DemoClass form does not currently call EmailJS. It uses a local state-only submission handler.
- The footer contact email (`hello@infineo.com`) differs from the EmailJS recipient specified in `context.md` (`infineo@infineo.live`).
- Footer social links, Company column links, and several For Parents links all currently point to `#`.
- The WhatsApp phone number is a placeholder (`919999999999`).
- The Parents section founder avatar is loaded from an external third-party URL (`pravatar.cc`).
- `#how` and `#curriculum` anchor targets in the nav do not correspond to any `id` found in the current rendered components.
- Desktop and mobile nav drawer use different labels for the same `#how` link ("NOTE TO PARENTS" vs "HOW IT WORKS").
- Hero "BOOK THE DEMO" and Impact "Start Your Child's Journey" buttons have no scroll or routing behavior attached in their current component code.
- Pricing "Get Started" buttons have no action attached beyond stopping click propagation.
