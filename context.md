# context.md — System Architecture

> **Status (2026-04-18):** Bare Vite scaffold still on disk, brainstorming in progress for the rewrite. Target stack is locked (below). The Vite files get scrapped and replaced with a Next.js TS scaffold once the spec is approved. Sections tagged *(to-build)* exist in the design but haven't been written yet.

## Tech stack (target)

| Layer       | Choice                                                       |
| ----------- | ------------------------------------------------------------ |
| Framework   | Next.js 15 (App Router, React 19)                            |
| Language    | TypeScript (strict mode)                                     |
| Styling     | Tailwind CSS v4 (`@import "tailwindcss"` + `@theme` tokens)  |
| UI kit      | shadcn/ui primitives, composed into portfolio components     |
| Animation   | Framer Motion                                                |
| Fonts       | Cormorant Garamond (display serif) + Inter (body) — via `next/font` |
| Build/dev   | Next.js with Turbopack (`next dev --turbo`)                  |
| Routing     | File-based (App Router) — no `react-router-dom`              |
| Testing     | Vitest + React Testing Library + jsdom                       |
| Linting     | Next ESLint config                                           |
| Deploy      | Vercel (presumed)                                            |

No database, no auth, no backend. This is a static portfolio — pages are server-rendered at build, interactivity is client-side only.

## File layout *(to-build — implementation happens after spec approval)*

```
app/
  layout.tsx               # Root: fonts, <EmberField>, <KeyHud> footer
  page.tsx                 # Main menu (the four stacked nav items)
  about/page.tsx           # About submenu
  about/[slug]/page.tsx    # About detail
  projects/page.tsx        # Projects submenu (brush-items per project)
  projects/[slug]/page.tsx # Project detail
  experience/page.tsx      # Experience submenu
  experience/[slug]/page.tsx
  contact/page.tsx         # Contact submenu
  not-found.tsx            # 404, styled as game menu
  globals.css              # Tailwind import + @theme tokens + ink-brush utilities
components/
  ui/                      # shadcn primitives (only what we actually use)
  menu/                    # BrushItem, MenuStack, Breadcrumb, KeyHud
  layout/                  # EmberField, PortraitFrame, Ornament
  features/                # ProjectCard, RoleCard, ContactLink
hooks/
  use-menu-keyboard.ts     # Arrows/Enter/Esc/wrap-around focus
lib/
  content.ts               # Typed arrays: projects[], experience[], etc.
  motion.ts                # Shared Framer Motion variants
  utils.ts                 # cn() from shadcn
types/
  content.ts               # Project, Role, ContactLink types
test/
  setup.ts                 # Vitest setup, testing-library matchers
public/images/projects/    # Already present (arctic, ldo)
```

## How code is developed

1. **Brainstorm first.** `superpowers:brainstorming` before any feature or design decision.
2. **Plan second.** For multi-step changes, `superpowers:writing-plans` produces a plan file before code is written.
3. **Build third.** Implement against the plan. If tests apply, follow `superpowers:test-driven-development`.
4. **Verify before claiming done.** `superpowers:verification-before-completion` — run `npm run build`, `npm run lint`, and `npm run test` and confirm they pass before declaring complete. For UI changes, boot `npm run dev` and exercise the feature in a browser.
5. **Commit only on request.** Jaran controls when commits happen.

## Conventions

- **Server Components by default.** `'use client'` only when a component needs state, effects, or event handlers. Menu, keyboard hook, particles = client; page shells, content = server.
- **Co-located files per feature.** A component lives in `components/<area>/<Name>.tsx`; if it has its own types, they live alongside. Shared types go in `types/`.
- **Tailwind v4 tokens in `@theme`.** Palette (obsidian/gold/cream), fonts, spacing live in `globals.css` — don't hardcode hex values in class lists.
- **Framer Motion variants in `lib/motion.ts`.** Components reference named variants, don't inline transition configs.
- **Content stays typed.** `lib/content.ts` is the single source of truth for projects, roles, contact links. No content in JSX.
- **Respect `prefers-reduced-motion`** — disable ember drift and ink-wash animations when the user has it set.
- **Test business logic, not visuals.** Vitest covers the keyboard hook, content helpers, and any utility — not pixel-perfect rendering.

See [`references.md`](./references.md) § "Development best practices" for Next.js 15 / Tailwind v4 / Vitest / shadcn patterns.
