# CLAUDE.md

This file provides guidance to Claude Code when working on the toad-eye documentation site.

## Project

**toad-eye-docs** — documentation site for the `toad-eye` npm package (OpenTelemetry-based observability for MCP servers and LLM applications). Built with Astro Starlight, hosted on Cloudflare Pages.

**Status:** project is being built from scratch following the roadmap in `prompts/roadmap.md`.

The library source code lives in a separate repo: https://github.com/vola-trebla/toad-eye
Reference it (via Context7 or GitHub MCP) for accurate types, defaults, and behavior when writing docs.

## Planning documents (prompts/)

- `prompts/Toad_eye_docs_site_plan.md` — full site plan: stack decision, sitemap (~48 pages), phases, tech plan, session breakdown
- `prompts/stack.md` — stack rationale, plugins, what was borrowed from which project, cost analysis
- `prompts/roadmap.md` — 7 epics, 38 stories with acceptance criteria, execution order

These are the source of truth for what to build and in what order. Follow the roadmap epics/stories sequentially.

## Stack

- Astro Starlight — docs framework
- Cloudflare Pages — hosting (free tier)
- starlight-llms-txt — auto-generates /llms.txt, /llms-full.txt, /llms-small.txt
- astro-og-canvas — auto-generates OG images per page at build time
- Pagefind — built-in full-text search (ships with Starlight)

## Commands

```bash
npm run dev        # dev server on localhost:4321
npm run build      # production build → dist/
npm run preview    # preview production build locally
npx prettier --write .  # format before commit
```

> Commands work after Epic 1 scaffold is complete (Astro project created in repo root).

## Directory structure

```
src/
├── assets/              # logo, favicon, branding images
├── content/
│   └── docs/            # ALL documentation pages (.md / .mdx)
│       ├── index.mdx    # landing page
│       ├── getting-started/
│       ├── guides/
│       ├── infrastructure/
│       ├── api/
│       ├── compatibility/
│       └── advanced/
└── routeData.ts         # OG image meta tag injection

public/
└── images/              # screenshots, architecture diagrams

astro.config.ts          # Starlight config: sidebar, plugins, branding
```

## Content conventions

- Every page is a `.md` file with YAML frontmatter (`title`, `description`)
- Style: concise, code examples > lengthy explanations, MCP-first positioning
- One-sentence intro → Quick Example code block → How It Works → Config options table → Gotchas
- Use Starlight built-in components: `:::note`, `:::caution`, `:::tip` for callouts
- Use `<Tabs>` / `<TabItem>` from `@astrojs/starlight/components` for multi-variant code examples
- API reference pages: markdown tables with columns Type | Default | Description
- All code examples must be copy-paste runnable

## Sidebar

Sidebar is configured in `astro.config.ts` under `starlight({ sidebar: [...] })`.
Getting Started section uses explicit items. Other sections use `autogenerate: { directory }`.

## MCP tools available

- **GitHub MCP** — use for creating issues, PRs, reading files from `vola-trebla/toad-eye` source repo. Also use for creating milestones/labels per roadmap.
- **Context7** — use for looking up Astro Starlight docs (`/withastro/starlight`), Astro docs (`/withastro/docs`), plugin APIs. Always check docs before guessing API.
- **Playwright** — use for visual testing of built docs site (screenshots, layout verification)

## Git workflow

- `main` branch = production (auto-deploys to Cloudflare Pages)
- Feature branches: `docs/<topic>` (e.g. `docs/budget-guards-guide`)
- PRs trigger preview deploys on Cloudflare Pages (preview URL in PR comment)
- Commit messages: conventional commits (`docs: add budget guards guide`)
- Format before commit: `npx prettier --write .`

## When writing documentation

1. Check the toad-eye source code for accurate type definitions — don't guess defaults or option names
2. Every config option must match the actual TypeScript interface (use Context7 or GitHub MCP to verify)
3. Include the correct import path (e.g. `toad-eye/mcp`, `toad-eye/alerts`, `toad-eye/drift`)
4. Test code examples mentally against the real API — if unsure, check source
5. Cross-link related pages: guides ↔ API reference ↔ getting started

## Writing language

- Documentation content (pages, code comments, frontmatter): **English**
- Communication with the user: **Russian** (user's preference)
- Commit messages, PR titles/descriptions: **English**

## What NOT to do

- Don't invent config options that don't exist in the source
- Don't show deprecated APIs without marking them as deprecated
- Don't create files outside `src/content/docs/` for documentation content
- Don't modify `astro.config.ts` sidebar without explicit request
- Don't skip acceptance criteria from roadmap stories — treat them as checklist
- Don't write placeholder/lorem ipsum content — every page ships with real content or doesn't ship
