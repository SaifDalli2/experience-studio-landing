# Qarar — experience studio

A bilingual (English / Arabic, RTL-aware) editorial landing site for **Qarar** (Arabic
**قرار**, "decision") — an end-to-end **experience-design studio** that takes a client
from a customer need → proposed solution → service catalog → system & API design →
automated support & workflow. Positioning: *"We don't hand off. We ship."*

> The brand name lives in a single source of truth — `window.BRAND` in `studio.js`
> (language-aware: "Qarar" in English, "قرار" in Arabic).

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
| `insight.js` | CXPinsight SDK loader + the studio's own analytics events |
| `artworks/` · `people/` · `journal/` · `Assets/` | Imagery |

## Design system

- **Editorial-minimal** aesthetic: oversized serif display (Fraunces) + clean sans
  (Inter / IBM Plex Sans Arabic), generous whitespace, subtle grain.
- A floating **Brand Studio** panel switches **color themes** (warm: Sand & Clay,
  Ivory & Oxblood, Saffron, Date, Nightfall, Ember), **textures**, and **body fonts** —
  persisted in `localStorage`.
- Content is grounded in the service-design / systems literature (JTBD, service
  blueprinting, DDD, Conway's Law, the Saga pattern, etc.).

## Analytics — CXPinsight

`insight.js` is included in the `<head>` of every page. It loads the CXPinsight
unified web SDK (which auto-captures page views, clicks, scroll, web vitals and
errors) and adds the events this site actually cares about. Keys live in the
`CONFIG` block at the top of `insight.js` — the one place to change them.

> The web key is a **public, client-side ingest key**, scoped to this application.
> It is meant to ship in the page source.

Every event carries `lang` (`en` / `ar`) and `page`, so the bilingual site can be
split by language; detail pages also carry `record_id`.

| Event | Fires when | Payload |
|---|---|---|
| `language_switch` | The ع / EN toggle is clicked | `from`, `to` |
| `capability_open` | A bento tile on the landing page is opened | `capability_id`, `title`, `position` |
| `capability_view` | A capability detail page is rendered | `capability_id`, `title` |
| `capability_nav` | Previous / next on a capability page | `direction`, `to_id` |
| `journal_open` | A journal item on the landing page is opened | `article_id`, `title`, `position` |
| `article_view` | An article page is rendered | `article_id`, `title`, `tag` |
| `article_completed` | The reader reaches the end of the prose | `article_id`, `seconds` |
| `article_nav` | Previous / next on an article | `direction`, `to_id` |
| `contact_click` | A `mailto:` link is clicked | `method`, `address`, `location` |
| `nav_section` | An in-page section anchor is used | `section`, `source` |
| `brand_studio_change` | A visitor changes theme / texture / body type | `control`, `value` |

Clicks are captured by one delegated listener, because the bento tiles and journal
list are rendered from data after load. Brand Studio changes are read from the
`data-theme` / `data-texture` / `data-type` attributes `studio.js` writes onto
`<body>`, so the two files stay decoupled; the stored selection being restored on
load is deliberately not reported as a change.

## License

© 2026 — All rights reserved.
