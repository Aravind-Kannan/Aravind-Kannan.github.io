# Design — Aravind Kannan portfolio

A locked design system for this site. Every page redesign reads this file before
emitting code. Do not regenerate per page — extend or amend this file when the
system needs to grow.

## Genre
modern-minimal (technical / intimate)

## Macrostructure family
Content pages share **Letter chrome**: mono path eyebrow, medium display title,
font-light body, hairline rules, primary-only accent, no frosted cards.

- Marketing (Home): existing terminal / hero — out of this redesign scope
- Content pages (Journey, Projects, About, Contact): Letter chrome + page-specific body

## Theme
Anchored on existing site tokens (zinc paper · primary blue). Prefer Tailwind
`primary-*` / `zinc-*` utilities that map to these values.

- `--color-paper`   oklch(99% 0.002 95)   /* #fdfdfc */
- `--color-paper-2` oklch(98% 0.002 95)
- `--color-ink`     oklch(21% 0.006 286)  /* zinc-900 */
- `--color-ink-2`   oklch(55% 0.01 286)   /* zinc-500/600 */
- `--color-rule`    oklch(90% 0.004 286)  /* zinc-200 */
- `--color-accent`  oklch(55% 0.19 255)   /* primary-500/600 #3b82f6 */
- `--color-focus`   oklch(55% 0.19 255)

Dark mode inverts paper/ink via existing `.dark` body tokens; accent stays primary.

## Typography
- Display: Inter, weight 600 (page titles), style normal
- Body: Inter, weight 300–400
- Mono: Roboto Mono, weight 400–500 (eyebrows, dates, emails, meta)
- Display tracking: tight (−0.02em via base)
- Page title scale: `text-2xl sm:text-3xl`
- Section title scale: `text-base sm:text-lg` medium
- Body: `text-sm` / `sm:text-base`

## Spacing
4-point named scale in `tokens.css`. Page shell: `pt-24 pb-12/16`, horizontal
`px-4 sm:px-6 lg:px-8`, content `max-w-4xl`. Page header: tight eyebrow→title
gap (`mb-3`). Footer: compact `py-8/10`, same content width.

## Motion
- Ease: `--ease-out` = cubic-bezier(0.16, 1, 0.3, 1)
- Page enter: opacity + slight y (≤16px), ~450ms
- Reveal: fade + small y via `Reveal` / page motion; no 3D tilt, no card lift
- Reduced-motion: opacity-only, ≤150ms

## Microinteractions stance
- Silent success (e.g. copy email → "Copied")
- Hover: color / border only — no shadow glow, no translate-y card lift
- Focus: `ring-2 ring-primary-500` immediate

## CTA voice
- Primary: text + accent hover, or outline button `rounded-xl` hairline border
- Secondary: mono / link with ArrowUpRight
- No filled primary slabs on content pages unless needed for one action

## Per-page allowances
- Journey: vertical timeline + text tabs (underline active), primary markers only
- Projects: stacked list with hairline dividers (not equal card grid)
- About: prose + two hairline sections (Principles list, Toolkit tags) — no glass cards
- Contact: two-column Letter + channels (existing shape OK inside shell)

## What pages MUST share
- `PageShell` + `PageHeader` (eyebrow · title · optional lede)
- Accent = primary blue only (no rainbow kind colors)
- No glassmorphism, blur orbs, icon-tile feature cards, 3D tilt
- Same enter motion

## What pages MAY differ on
- Body macrostructure within Letter family (timeline · list · prose · letter+aside)
- Interactive filters / copy / external links as content requires

## Exports
See `tokens.css` at project root.
