# context.md — System Architecture

> **Status (2026-04-20):** Navigation architecture is pivoting to **Persona 3 Reload–style** — vertical menu, per-section tonal wash (Framer Motion, shipped), angular stencil commit-wipe on navigation (pending), section watermarks (pending). The **Elden Ring / Expedition 33 color palette and font stack stay locked** (`@theme` tokens + `next/font` loaders are untouched). All four destination routes (`/about`, `/projects`, `/experience`, `/contact`) are being blanked to empty placeholders — their existing content and chrome are considered inaccurate to the new direction and will be torn out. The `[slug]` detail routes are slated for removal. Atmosphere chrome on the home stage (Splatters, GoldenFlakes, EmberField, bg-glyph "EXPEDITION", Ornament, InkDefs) and the ink-curtain page transition are under demolition review. The only parts of the current build treated as load-bearing going forward are: the color tokens, the font stack, the three responsive modes, `MenuStack`, and `ToneWash`.

## Tech stack

| Layer       | Choice                                                                                      |
| ----------- | ------------------------------------------------------------------------------------------- |
| Framework   | Next.js 15 (App Router, React 19)                                                           |
| Language    | TypeScript (strict mode)                                                                    |
| Styling     | Tailwind CSS v4 (`@import "tailwindcss"` + `@theme` tokens)                                 |
| UI kit      | shadcn/ui primitives (only `button` installed so far)                                       |
| Animation   | Framer Motion 11                                                                            |
| Fonts       | Cinzel Decorative (display) + Cormorant Garamond (body) + Italianno (script) + IBM Plex Mono (mono) — via `next/font` |
| Build/dev   | Next.js with Turbopack (`next dev --turbopack`)                                             |
| Routing     | File-based App Router                                                                       |
| Testing     | Vitest + React Testing Library + jsdom                                                      |
| Linting     | Next ESLint config                                                                          |
| Deploy      | Vercel — `main` auto-deploys production (frozen at old portfolio); `redesign` builds previews |

No database, no auth, no backend. Static portfolio — server-rendered at build, interactivity is client-side only.

## Design direction (post-pivot)

**Nav + motion architecture: Persona 3 Reload.** Vertical menu of four sections driven by keyboard (↑↓ / j / k / Enter) and click. Hover/selection triggers a per-section tonal wash that slides in from a corner unique to that section (shipped via `ToneWash.tsx` + Framer Motion `AnimatePresence`). Commit (Enter / click) fires an angular stencil wipe — a hard-edged polygon sweep carrying the destination's color + a section watermark — before `router.push()` (pending). Each destination is treated as a themed "floor" with its own watermark banner rather than a journaled chapter.

**Palette + type: Elden Ring / Expedition 33.** Dark earth/midnight paper, warm cream ink, antique gold, ember-red accent. Display serif (Cinzel Decorative) paired with body serif (Cormorant Garamond), script accent (Italianno), mono for labels (IBM Plex Mono). These tokens are *frozen* — `@theme` in `app/globals.css` and the `next/font` setup in `app/layout.tsx` are not to be modified without explicit approval.

**What is being torn out:** the chronicle/journal sub-route chrome, feature components that render project/role/about detail, ink-brush atmosphere (splatters, flakes, embers, bg-glyph), ink-curtain page transition, and all `[slug]` detail routes.

Full palette + font inventory (still authoritative): [`docs/design/design-references.md`](./docs/design/design-references.md). Expedition-33-era component implementation notes in that file are now archival.

## File layout

Legend: **[KEEP]** load-bearing post-pivot · **[DEMO]** slated for removal/rewrite · **[BLANK]** exists but content wiped · **[TBD]** undecided

```
app/
  layout.tsx                         [KEEP]  Root: fonts, PageTransition (DEMO), skip link, GlobalAtmosphere (DEMO)
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
    GlobalAtmosphere.tsx             [DEMO]  Grain/vignette/midnight-gradient layers — reviewing which survive
    PageTransition.tsx               [DEMO]  Ink-curtain wipe — replace with P3R angular stencil wipe
    ChronicleLayout.tsx              [DEMO]  Journal chrome for sub-routes — deleted with chronicle aesthetic
    EmberField.tsx                   [DEMO]  Canvas ember drift
    GoldenFlakes.tsx                 [DEMO]  Canvas golden flakes
    InkDefs.tsx                      [DEMO]  Inline SVG defs for ink splats
    Ornament.tsx                     [DEMO]  Decorative flourishes
  menu/
    MenuStack.tsx                    [KEEP]  Vertical nav + keyboard
    BrushItem.tsx                    [TBD]   Currently ink-brush styled; item primitive stays but visual treatment will be reworked
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
