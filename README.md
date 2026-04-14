# MCP Security Checklist

An interactive security checklist for teams building, deploying, or consuming Model Context Protocol (MCP) servers.

Live site: [mcp-checklist.tampertantrumlabs.com](https://mcp-checklist.tampertantrumlabs.com)

Built and maintained by [TamperTantrum Labs](https://tampertantrumlabs.com), an application security consultancy focused on AI, LLM, and MCP security.

## What this is

A community-improvable checklist of the controls that matter when an AI agent gets tool access to your systems: authentication, input validation, permission scoping, data handling, logging, deployment hardening, multi-agent isolation, and incident response.

The checklist is a single YAML file. The web app renders it, lets you tick items off, tracks per-section and overall progress, and persists state to your browser. No accounts, no backend, no telemetry.

## What this is not

This is not a compliance framework, an audit standard, or a substitute for a real security review. It is a sanity check. If your MCP server passes everything here, you have done the basics. You may still have bespoke risks that need a person to find.

## How to use it

Open the site, walk through each section, check items as they apply to your implementation. Use the severity filter to focus on what matters most for your stage:

- **Critical:** exploitable, should block deployment
- **High:** significant risk, needs a remediation plan before production
- **Medium:** best-practice hardening
- **Low:** mature-implementation polish

Progress is saved per browser via `localStorage`. There is no server-side state.

## Repo layout

```
mcp-security-checklist/
├── src/
│   ├── data/
│   │   └── checklist.yaml      # the source of truth — edit this for content changes
│   ├── components/             # React UI
│   ├── lib/                    # YAML loader, storage, types
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css               # Tailwind v4 + design tokens
├── public/
├── index.html
├── vite.config.ts
└── package.json
```

The checklist content lives entirely in `src/data/checklist.yaml`. Everything else is presentation.

## Local development

Requires Node 20+ and pnpm.

```
pnpm install
pnpm dev          # start dev server
pnpm build        # production build
pnpm typecheck    # tsc --noEmit
pnpm preview      # serve built bundle
```

## Contributing

Found a missing control? Disagree with a severity? Edit `src/data/checklist.yaml` and open a PR. See [CONTRIBUTING.md](CONTRIBUTING.md) for the guidelines.

You almost never need to touch the React code to add or change checklist items. That is the whole point of the YAML split.

## Deployment

The site is a static Vite build and deploys to Vercel. The custom domain is configured at `mcp-checklist.tampertantrumlabs.com`.

## License

MIT. See [LICENSE](LICENSE). Use it, fork it, embed it, run it inside your own internal tooling.

## About TamperTantrum Labs

We are an application security consultancy that specializes in AI, LLM, and MCP security. If you would rather have someone walk through this checklist with you (and actually test the things on it), that is what we do.

[tampertantrumlabs.com](https://tampertantrumlabs.com)
