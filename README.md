# Experience Studio — landing site

A bilingual (English / Arabic, RTL-aware) editorial landing site for an end-to-end
**experience-design studio** — a practice that takes a client from a customer need →
proposed solution → service catalog → system & API design → automated support &
workflow. Positioning: *"We don't hand off. We ship."*

> **Brand name is a placeholder.** It lives in a single source of truth —
> `window.BRAND` in `studio.js` — change it there and it updates everywhere.

Static site, no build step. Open `index.html` (English) or `index.ar.html` (Arabic)
in a browser.

## Structure

| File | Purpose |
|---|---|
| `index.html` / `index.ar.html` | Landing page (EN / AR) |
| `capability.html` / `capability.ar.html` | Capability detail page (`?id=…`) |
| `article.html` / `article.ar.html` | Journal article page (`?id=…`) |
| `studio.css` | Shared design system (tokens, themes, components) |
| `studio.ar.css` | Arabic / RTL + Arabic-font overrides |
| `studio.js` | Brand name, theme/texture/type switcher, scroll reveals, custom cursor |
| `capabilities.js` / `capabilities.ar.js` | "What we make" — single source of truth |
| `journal.js` / `journal.ar.js` | Articles — single source of truth |
| `artworks/` · `people/` · `journal/` · `Assets/` | Imagery |

## Design system

- **Editorial-minimal** aesthetic: oversized serif display (Fraunces) + clean sans
  (Inter / IBM Plex Sans Arabic), generous whitespace, subtle grain.
- A floating **Brand Studio** panel switches **color themes** (warm: Sand & Clay,
  Ivory & Oxblood, Saffron, Date, Nightfall, Ember), **textures**, and **body fonts** —
  persisted in `localStorage`.
- Content is grounded in the service-design / systems literature (JTBD, service
  blueprinting, DDD, Conway's Law, the Saga pattern, etc.).

## License

© 2026 — All rights reserved.
