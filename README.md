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

### Reader feedback — 👍 / 👎

When a reader reaches the end of an article, `article_completed` fires and the SDK
opens a one-question survey: *Was this worth your time?* — thumbs up or down.
The SDK caps its own impressions and remembers a submitted survey, so it does not
nag on every article.

The survey id lives in `SURVEY_ID` at the top of `insight.js`:

| Survey | id | Languages |
|---|---|---|
| Before you go / قبل أن تذهب | `2164dc2a-b896-40ba-9144-c1b3b6bea092` | `en` + `ar` |

**One bilingual survey.** The SDK resolves the language itself and overlays the
survey's `translations` map, in this order:

```js
[ loadSurvey({lang}), document.documentElement.getAttribute('lang'), navigator.language ]
```

`insight.js` passes `lang` explicitly — it is the SDK's first choice and keeps the
widget in step with the page regardless of markup. The renderer also stamps
`dir="rtl"` on the container for right-to-left languages, which the custom CSS uses
to give the Arabic title its own weight.

> Needs an SDK bundle from 2026-08-30 or later. Before that, `translations` appeared
> nowhere in the bundle and `_selectedLanguage` was read but never assigned, so a
> bilingual survey always rendered its `defaultLanguage` — which is why this was
> briefly built as two surveys, one per language. The Arabic-only survey
> (`b737d58e-7878-40bf-aa06-61c01e6be36a`) is now **closed**, not deleted: it still
> holds 2 responses.

**Three renderer quirks worth remembering when editing this survey:**

- Per-question translations must be **objects** (`{"worth_reading": {"text": "…"}}`),
  not the plain strings the MCP `create_survey` docs specify. The renderer checks
  `typeof c === 'object'` before applying, so a string is silently ignored and the
  question stays in the default language.
- The binary renderer reads `choices` / `yesLabel` / `noLabel`, *not* the `options`
  array the survey schema documents. Set `options` alone and you get "Yes" / "No"
  instead of the thumbs.
- Choice values must be `"true"` / `"false"`. The server coerces a `binary` answer
  to a boolean when it flattens it to the top level, so a value like `"up"` is
  stored as `worth_reading: false` — silently inverting a thumbs-up.

Placement is `bottom-left`. The Brand Studio panel sits
bottom-right in LTR and bottom-left in RTL, and the SDK positions its widget with a
direction-aware property that mirrors under RTL — the two flips cancel, so one
value keeps the widget opposite the panel in both languages.

Each response carries the article id: the widget sweeps every URL query parameter
into the response metadata, so `?id=…` arrives as `_variables.id` and thumbs break
down per article. It is also declared as a survey variable
(`{name: "id", source: "query", echoInResponse: true}`) so it is a first-class field
rather than incidental metadata — the capture happens either way, the declaration
governs how it is surfaced.

Editing `variables` — not just questions — requires pausing the survey first: the
API returns `409 Question set is locked while the survey is active`, despite the
message mentioning only questions.

#### Brand theming

The widget is themed in CXPinsight, not in this repo — there is nothing to change
here to restyle it. Two layers:

1. **A static base** per survey (`set_survey_theme`): Sand & Clay palette, pill
   buttons, 16px card, the site's type scale, no progress bar, no voice toggle.
   This is what renders if the CSS layer below cannot apply.
2. **A live-token layer** (`branding.customCss`) that maps the SDK's `--cxp-*`
   variables onto this site's own tokens — `--bg`, `--ink`, `--accent`, `--line`,
   `--sans`, `--serif`. The widget is a child of `<body>`, so it inherits them and
   **follows the Brand Studio theme as the visitor switches it** — all six
   palettes, light and dark — instead of being pinned to one. Verified against
   `sand`, `ember`, `night` and `oxblood`.

Because custom CSS is applied with `@scope`, a browser without `@scope` support
gets none of layer 2 and falls back to layer 1 — which is why the base palette is
worth keeping accurate.

Five things the CSS layer has to do that the theme API cannot:

- **Give the card its own surface.** Mapping `--cxp-card-bg` to `--bg` painted it the
  exact page colour, so over a light section it dissolved into the background and
  read as "hidden behind the page" — separated only by a 16% hairline and the SDK's
  soft `0 4px 20px` shadow. The card now sits on `--bg-2` (the site's raised surface)
  with the Brand Studio panel's heavier shadow; the choices inside stay on `--bg`, so
  the layers step apart in both light and dark themes.
- **Hide the description.** The renderer emits
  `a.description || "Help us improve your experience"`, so an empty description
  yields that hardcoded English line — on the Arabic page too. `display: none` on
  `.cxp-widget-description` is the only way to remove it.
- **Hide the mic.** `behaviour.voiceMode: false` does *not* remove the voice control
  from the widget; `.cxp-voice-mic` must be hidden in CSS.
- **Translate the submit button.** "Submit" is hardcoded in the renderer's markup —
  there is no `submitText`/`submitLabel` option and the translations map does not
  reach it — so the Arabic label is swapped via `::after` under `[dir="rtl"]`.
- **Size the thumbs** (otherwise body-text size) and **hide the radio dot** inside
  each thumb label, since the glyph is the control.

Theming the survey **detaches** it from the application theme —
`set_application_theme` returned 403 for the current API key. `reset_survey_theme`
re-links it if that permission is ever granted.

## License

© 2026 — All rights reserved.
