# MCP Security Checklist

Static Vite + React + TypeScript site that renders an interactive security checklist for MCP servers. Lives at `mcp-checklist.tampertantrumlabs.com` (deployed on Vercel).

## Stack

- Vite 6 + React 19 + TypeScript (strict)
- Tailwind CSS v4 with `@tailwindcss/vite`, design tokens defined in `src/index.css` `@theme` block (mirrors main-site)
- `js-yaml` to parse the checklist source at build time via `?raw` import
- `localStorage` for progress persistence (no backend)
- pnpm only

## Source of truth

`src/data/checklist.yaml` is the entire checklist content. Schema: `Checklist` in `src/lib/types.ts`. Item ids must be stable, unique across the whole file, never renamed, because they are persisted to user browsers via localStorage. Renaming an id silently resets that user's progress.

## Architecture

- `src/lib/loadChecklist.ts` parses the YAML at module load and exports `checklist`, `ALL_ITEMS`, `ITEMS_BY_SEVERITY`, `SEVERITY_ORDER`.
- `src/lib/storage.ts` owns the `useChecked()` hook (load/save Set<string> to localStorage).
- `src/App.tsx` owns global UI state (severity filter, hide-completed toggle) and composes everything.
- Components are small and presentational. Everything reads from props, no context.

## Design

Matches main-site dark glassmorphism. Use the `.glass` and `.glass-hover` utility classes for surfaces. Card icons must always be inline with titles, never on their own row (TT design rule). Dark only, no light mode. No em dashes anywhere.

## Commands

```
pnpm install
pnpm dev          # start dev server
pnpm build        # tsc -b && vite build
pnpm typecheck    # tsc -b --noEmit
pnpm preview      # serve dist/
```

## Adding a checklist item

Edit `src/data/checklist.yaml`. Pick a stable kebab-case id. Pick the right severity (definitions in CONTRIBUTING.md). Done. No React changes needed.

## Deployment

Vercel. `vercel.json` pins build/install commands and adds basic security headers. Custom domain configured in Vercel dashboard.
