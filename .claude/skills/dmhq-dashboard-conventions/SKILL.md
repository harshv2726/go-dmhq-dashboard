---
name: dmhq-dashboard-conventions
description: Use whenever building or modifying UI in apps/dashboard (this DMHQ seller dashboard) — pages, components, forms, tables, or theme. Layers DMHQ-specific conventions and product philosophy on top of the generic shadcn skill; read both when touching this app.
---

# DMHQ dashboard conventions

## Product philosophy — read before adding scope

DMHQ's pitch is **thinness vs. Shopify**: v1 settings are ~10 fields
across 5 sections vs. Shopify's 60+ across 10+ pages. The thinness
*is* the product pitch (positioning against Instamojo/Dukaan/Shopify
for solo Instagram sellers) — every new field, page, or setting should
be checked against whether it breaks that contrast before adding it.

This applies to **features/scope**, not visual craft — the UI itself
should look as polished as any modern SaaS dashboard (Linear, Vercel,
Stripe-grade). Don't confuse "thin feature surface" with "should look
unfinished." Polish the fewer things generously; don't add more things.

## Stack specifics

- Next.js 16 has breaking changes vs. training-data Next.js — see
  `apps/dashboard/AGENTS.md`, read `node_modules/next/dist/docs/`
  before using unfamiliar APIs.
- React 19, Tailwind v4 (`@theme inline` token blocks in `globals.css`,
  not a `tailwind.config.js`), shadcn (`components.json` present — the
  generic `shadcn` skill installed alongside this one covers component
  add/customization mechanics).
- Data fetching: SWR (`useSWR` + `@/lib/api`), not React Query.
- Tables: shadcn `Table` primitives directly for simple lists (Orders,
  Collections), TanStack Table via `@/components/products/data-table.tsx`
  for the richer Products list.

## Design tokens (`src/app/globals.css`)

Brand accent is a **Shopify-style dark green** (`--primary: #008060`
light / `#00a66c` dark), applied to `--primary`, `--ring`,
`--sidebar-primary`. There's an explicit `--primary-hover` token
(`#006e52` light / `#00bf7d` dark) — the default `Button` variant uses
`hover:bg-primary-hover`, not an opacity trick, so touch that token
(not just `--primary`) if the hover shade needs to change. Neutrals
are cool off-white/gray, not warm: light mode background `#f6f6f7`
with white cards (`#ffffff`), dark mode a near-black neutral base
(`#18191b`) with slightly lighter cards (`#1f2022`). Because the green
is mid-luminance in both themes, `--primary-foreground` stays
**white** in both light and dark — check contrast before touching
primary tokens if the hue changes. `--accent`/`--sidebar-accent` is a
soft green tint (`#e3f5ec` light / `#113328` dark) with a dark-green
foreground (`#008060` light / `#4ade9b` dark), used for hover/active
states — a distinct token from `--primary`.

There's a full semantic color set beyond the brand accent —
`--success`/`--warning`/`--info` (plus `-foreground` pairs), alongside
the existing `--destructive` — for status pills, alerts, and any
non-brand signal color. `--success` intentionally equals `--primary`
(same dark green, both roles literally share the hue). `--warning`
(`#f49342`) uses a dark foreground, not white, in both themes — it's
the one semantic color whose luminance sits close to the 0.5 threshold.
`--info` is blue (`#2c6ecb` light / `#5b8def` dark). Chart tokens
(`--chart-1..5`) run green → info-blue → orange → red → gray. Never
reuse the brand accent for destructive/warning/info roles or vice versa
— each semantic color is its own token.

Both light and dark are defined (`:root` / `.dark`). Dark mode is
toggled via the `next-themes` `ThemeProvider` (`attribute="class"`) —
check `apps/dashboard/src/app/layout.tsx` for current wiring before
assuming it's on or off.

**Typography**: both `--font-sans` (body) and `--font-heading`
(headings, dialog/card/sheet titles, the DMHQ wordmark) resolve to
Bricolage Grotesque (via `next/font/google` in `layout.tsx`, variable
font — no separate weight files needed). The whole UI is Bricolage
Grotesque now, matching the `dashboard-concept-ui-theme` reference —
there's no separate system-ui body face to fall back to. The
`font-heading` utility class still exists for anything that should
read with heavier weight/brand emphasis.

## Established component patterns — reuse, don't reinvent

- `PageHeader` (`@/components/layout/page-header`) — every page's
  title/description/optional action button. Always use this, not an
  ad hoc `<h1>`.
- `SectionCards` (`@/components/section-cards`) — stat-tile grid for
  the dashboard home page.
- `EmptyState` (`@/components/layout/empty-state`, if present) — icon
  + title + description + optional action for zero-data states across
  Orders/Products/Collections/Inventory/Customers. Use it instead of a
  bare `<p className="text-sm text-muted-foreground">`.
- `PaginationControls` (`@/components/layout/pagination-controls`) —
  every paginated list.
- `OrderStatusBadge` (`@/components/orders/status-badge`) — status
  pills; extend this pattern (semantic color, not brand accent) for
  any new status-like badge rather than inventing a new one.

## Sidebar / nav

`app-sidebar.tsx` drives the primary nav; active state is
`data-active` driven through `sidebar-accent` tokens (not
`sidebar-primary` — that's reserved for the brand mark). Nested nav
(e.g. Products → Collections/Inventory) uses shadcn's `Collapsible`
pattern in `nav-main.tsx`.
