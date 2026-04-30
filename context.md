# context.md — System Architecture

> **Status (updated 2026-04-28):** Navigation architecture is pivoting to **Persona 3 Reload–style** — vertical menu, per-section tonal wash (Framer Motion, shipped), angular stencil commit-wipe on navigation (pending), section watermarks (pending). The home stage sits over a **looping video background** from a 20 s crossfaded loop (`public/wallpaper/shaman-village.*`, now five optimized assets totalling ~8.4 MB desktop / ~2.2 MB mobile — down from a single 77 MB mp4). Delivery uses device-aware `<source>` ladders (WebM primary, MP4 Safari fallback, 1080p desktop / 720p mobile), a poster JPEG painted first for instant first frame, `preload="metadata"` + `requestIdleCallback`-gated mount, and a `prefers-reduced-motion` escape that skips the `<video>` entirely. The home stage continues the **"restrained atmospheric" treatment**: menu words dimmed to 0.82 opacity with a metallic-gold gradient strikethrough on the active item, body/html background made transparent so the video is visible. **Home panel chrome: Elden Ring / Mode B vocabulary applied to `SummaryPanel` + `MobileSummaryCard`.** Double-hairline gold filigree frame, four CSS-only gold corner L-brackets, medallion-in-hairline rules, info cards with corner-bracket system, buttons framed via `outline-offset: 3px`. Eyebrow and bio line are retired. **Color usage shifted:** `--color-accent-red` is reserved for dormant chronicle/destination chrome — every active home-page accent uses `--color-gold`/`--color-gold-bright`. **Display font:** **Optimus Princeps** (Manfred Klein, free for commercial use, local via `next/font/local`, files in `public/fonts/`). **`SummaryPanel` current state (updated 2026-04-28):** Experience entries show four roles — Business Automation & Systems Developer Co-op at Renellence (Jan 2026–Present), Systems Engineering Intern at Civilcraft (Jun–Aug 2025), Electrical Subsystem Member at WARG (Sep 2025–Present), Coding Instructor at Code Ninjas (Jul–Aug 2025). Each entry uses a two-line structure: role title (weight 600, wraps freely) + company sub-line (upright, no italic) with inline white-filtered company logo and a clickable link to the company website. Footer CTAs are GitHub (`https://github.com/Jarank-git`) and LinkedIn (`https://www.linkedin.com/in/jaran-khalid/`) only — Resume CTA removed. Footer links use real brand logos (GitHub Octocat, LinkedIn `in`) instead of SoG controller glyphs. Education line shows `Uwaterloo_crest.png` inline mark. **Entry component pattern established** — this two-line role+company structure with inline white-filtered logos is the template for future destination cards (projects, experience detail). All four destination routes (`/about`, `/projects`, `/experience`, `/contact`) remain blank pending redesign. `[slug]` detail routes still slated for removal. Load-bearing: video pipeline + atmosphere stack, Mode B chrome system on home panels, company logo assets, color tokens (with usage rules), Optimus Princeps + Cormorant + Plex Mono, three responsive modes, `MenuStack`, `ToneWash`.

## Tech stack

| Layer       | Choice                                                                                      |
| ----------- | ------------------------------------------------------------------------------------------- |
| Framework   | Next.js 15 (App Router, React 19)                                                           |
| Language    | TypeScript (strict mode)                                                                    |
| Styling     | Tailwind CSS v4 (`@import "tailwindcss"` + `@theme` tokens)                                 |
| UI kit      | shadcn/ui primitives (only `button` installed so far)                                       |
| Animation   | Framer Motion 11                                                                            |
| Fonts       | Optimus Princeps (display, local in `public/fonts/`) + Cormorant Garamond (body) + Italianno (script, dormant) + IBM Plex Mono (mono) — via `next/font/local` + `next/font/google` |
| Build/dev   | Next.js with Turbopack (`next dev --turbopack`)                                             |
| Routing     | File-based App Router                                                                       |
| Testing     | Vitest + React Testing Library + jsdom                                                      |
| Linting     | Next ESLint config                                                                          |
| Deploy      | Vercel — `main` auto-deploys production (frozen at old portfolio); `redesign` builds previews |

No database, no auth, no backend. Static portfolio — server-rendered at build, interactivity is client-side only.

## Design direction (post-pivot)

**Nav + motion architecture: Persona 3 Reload.** Vertical menu of four sections driven by keyboard (↑↓ / j / k / Enter) and click. Hover/selection triggers a per-section tonal wash that slides in from a corner unique to that section (shipped via `ToneWash.tsx` + Framer Motion `AnimatePresence`). Commit (Enter / click) fires an angular stencil wipe — a hard-edged polygon sweep carrying the destination's color + a section watermark — before `router.push()` (pending). Each destination is treated as a themed "floor" with its own watermark banner rather than a journaled chapter.

**Palette + type: Elden Ring / Expedition 33 — restrained atmospheric pass.** Dark earth/midnight paper (now transparent on `html/body` so the video shows through), warm cream ink, antique gold dominating every active accent (metallic `gold-deep → gold-bright → gold` gradient on strikes/rules), ember-red still defined but dormant (only chronicle/destination chrome). Display Roman titling caps (**Optimus Princeps**, local) paired with body serif (**Cormorant Garamond**), script accent (**Italianno**, dormant), mono for labels (**IBM Plex Mono**). The `@theme` color tokens are frozen; `accent-red` usage is locked out of the home stage. The display font was swapped from Cinzel Decorative to Optimus Princeps on 2026-04-22 — any further font changes require explicit approval.

**What is being torn out:** the chronicle/journal sub-route chrome, feature components that render project/role/about detail, ink-brush atmosphere (splatters, flakes, embers, bg-glyph), ink-curtain page transition, and all `[slug]` detail routes.

Full palette + font inventory (still authoritative): [`docs/design/design-references.md`](./docs/design/design-references.md). Expedition-33-era component implementation notes in that file are now archival.

## File layout

Legend: **[KEEP]** load-bearing post-pivot · **[DEMO]** slated for removal/rewrite · **[BLANK]** exists but content wiped · **[TBD]** undecided

```
app/
  layout.tsx                         [KEEP]  Root: fonts (Optimus Princeps via next/font/local + 3 Google fonts), PageTransition (DEMO), skip link, GlobalAtmosphere (KEEP — now hosts video bg)
  page.tsx                           [KEEP]  Home — 3 layout modes via useLayoutMode; stage content being pruned
  globals.css                        [KEEP]  Tailwind import + @theme tokens (FROZEN) + styles (pruning in progress)
  not-found.tsx                      [DEMO]  Chronicle-styled fragment — rewrite for new aesthetic
  about/page.tsx                     [BLANK] Destination kept, content wiped pending redesign
  about/[slug]/page.tsx              [DEMO]  Detail route going away
  projects/page.tsx                  [BLANK] Destination kept, content wiped pending redesign
  projects/[slug]/page.tsx           [DEMO]  Detail route going away
  experience/page.tsx                [BLANK] Destination kept, content wiped pending redesign
  experience/[slug]/page.tsx         [DEMO]  Detail route going away
  contact/page.tsx                   [BLANK] Destination kept, content wiped pending redesign
components/
  layout/
    GlobalAtmosphere.tsx             [KEEP]  Hosts looping video bg with device-aware <source> ladder, poster first-paint, idle-callback deferred mount, prefers-reduced-motion escape; bottom/left atmos-fade + softened atmos-vignette; grain layer removed 2026-04-22; video pipeline rewritten 2026-04-23
    PageTransition.tsx               [DEMO]  Ink-curtain wipe — replace with P3R angular stencil wipe
    ChronicleLayout.tsx              [DEMO]  Journal chrome for sub-routes — deleted with chronicle aesthetic
    EmberField.tsx                   [DEMO]  Canvas ember drift
    GoldenFlakes.tsx                 [DEMO]  Canvas golden flakes — removed from cinematic stage 2026-04-22, file remains
    InkDefs.tsx                      [DEMO]  Inline SVG defs for ink splats
    Ornament.tsx                     [DEMO]  Decorative flourishes
  menu/
    MenuStack.tsx                    [KEEP]  Vertical nav + keyboard
    BrushItem.tsx                    [TBD]   Item primitive; gold-band highlight already Elden Ring–flavoured, menu-num retyped to Optimus Princeps italic 2026-04-23
    SummaryPanel.tsx                 [KEEP]  Slide-in left-zone panel, primary showcase of the Mode B filigree chrome (frame + corner L-brackets + medallion rule + framed buttons + crest + CTAs)
    GhostWatermark.tsx               [KEEP]  Left-zone watermark shown when non-summary item is selected
    ToneWash.tsx                     [KEEP]  Per-section Framer Motion color sweep
    sections.ts                      [KEEP]  MENU_ITEMS config (section/label/href/tone/corner)
    HudCard.tsx                      [DEMO]  Unused
    PartyChips.tsx                   [DEMO]  Unused
    CommandHud.tsx                   [DEMO]  Unused
    Stamp.tsx                        [DEMO]  Unused
  features/                          [DEMO]  AboutSection, ProjectCard, RoleCard — deleted with detail routes
  ui/
    button.tsx                       [KEEP]  shadcn primitive
hooks/
  use-layout-mode.ts                 [KEEP]  cinematic/fluid/mobile switcher
  use-media-query.ts                 [KEEP]  SSR-safe media-query hook
  use-menu-keyboard.ts               [TBD]   Currently unused; retain as reference
lib/
  content.ts                         [TBD]   Typed content arrays — likely rewritten when destinations are designed
  motion.ts                          [KEEP]  Shared Framer Motion variants
  path.ts                            [KEEP]  URL helpers
  utils.ts                           [KEEP]  cn() from shadcn
types/
  content.ts                         [TBD]   Content type shapes — will follow content.ts rewrite
test/                                [KEEP]  Vitest setup
public/images/projects/              [TBD]   Asset folder may be restructured with destinations
public/assets/                       [KEEP]  External logos/marks (new 2026-04-23):
                                           uwaterloo-crest.png        (250×250 RGBA, ~40 KB — Wikimedia Commons seal, white bg flood-filled to transparent via Pillow)
public/fonts/                        [KEEP]  OptimusPrinceps.ttf + OptimusPrincepsSemiBold.ttf — local display font (Manfred Klein, free for commercial use)
public/wallpaper/                    [KEEP]  Optimized background pipeline:
                                           shaman-village.webm        (1920×1080 VP9 CRF 37, 8.2 MB)
                                           shaman-village.mp4         (1920×1080 H.264 CRF 26, 8.1 MB — Safari fallback)
                                           shaman-village-mobile.webm (1280×720  VP9 CRF 41, 2.0 MB)
                                           shaman-village-mobile.mp4  (1280×720  H.264 CRF 28, 2.1 MB — iOS Safari fallback)
                                           shaman-village-poster.jpg  (1920×1080 MJPEG q8, 152 KB — first-paint poster)
                                           All loop seamlessly over a 20 s crossfade; audio stripped
```

## Routing

- **Destinations.** Four: `/about`, `/projects`, `/experience`, `/contact`. Kept, but rendered blank pending redesign.
- **No detail routes.** `[slug]` sub-routes are being removed. Destinations will decide internally how they present content (inline, tabbed, modal, scroll — TBD).
- **Menu → destination.** `MenuStack` renders a `Link` per item in `MENU_ITEMS` (see `components/menu/sections.ts`). Keyboard: arrow / j / k change selected index; Enter calls `router.push` on the selected href.
- **Commit transition (pending).** Replace `PageTransition` ink-curtain with a P3R-style angular polygon stencil wipe keyed to the destination's tone + a section watermark. Triggered on Enter/click before navigation.
- **Deep-linkable.** Real URLs everywhere — no modal panels.

## Responsive modes

`hooks/use-layout-mode.ts` returns one of:

| Mode        | Media query                                    | Home layout                                                                                             |
| ----------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `cinematic` | `(min-width: 1280px) and (min-height: 820px)`  | Fixed 1600×1000 stage, uniformly scaled via `transform: scale()`. Content inside stage being pared down. |
| `fluid`     | `(min-width: 768px)` below cinematic           | CSS flow layout. Menu centered.                                                                          |
| `mobile`    | `< 768px`                                      | Vertical stacked menu (smaller type, tap-friendly).                                                      |

Home (`app/page.tsx`) gates on a `mounted` flag so SSR doesn't flash the wrong layout.

## How code is developed

1. **Brainstorm first.** `superpowers:brainstorming` before any new feature, component, or visual direction. Janitorial cleanup is exempt.
2. **Plan multi-step work.** `superpowers:writing-plans` → plan file → `superpowers:executing-plans` or `superpowers:subagent-driven-development`.
3. **Build.** Follow `superpowers:test-driven-development` when the change has testable behavior.
4. **Verify before claiming done.** `superpowers:verification-before-completion` — run `npm run build`, `npm run lint`, `npm run test`. For UI, boot `npm run dev` and exercise in a browser (Playwright MCP wired in).
5. **Commit only on request.** Jaran controls commits. Use `portfolio-commit-flow` when a git op is requested.

## Conventions

- **Server Components by default.** `'use client'` only when a component needs state/effects/events/Framer Motion/canvas refs.
- **Co-located files per feature.** `components/<area>/<Name>.tsx`. Shared types in `types/`.
- **Frozen tokens.** `@theme` palette + `next/font` setup are not modified. Don't hardcode colors — use CSS custom properties.
- **Framer Motion variants colocated or in `lib/motion.ts`.** Reference named variants, don't inline long transition configs.
- **Content stays typed.** When destinations are redesigned, `lib/content.ts` is the single source of truth.
- **Respect `prefers-reduced-motion`.** Any new stencil wipe or tone wash must have a reduced-motion fallback.
- **Test logic, not visuals.** Vitest covers content helpers, path helpers, media-query + keyboard hooks. Don't test pixel positions or exact class strings.

See [`references.md`](./references.md) § "Development best practices" for Next.js 15 / Tailwind v4 / Vitest / shadcn specifics.
