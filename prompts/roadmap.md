# toad-eye docs site — Roadmap

> Реализация docs site на Astro Starlight + Cloudflare Pages.
> Каждый Epic = GitHub Milestone. Каждая Story = GitHub Issue.
> Labels: `docs`, `epic`, `content`, `infra`, `dx`.

---

## Epic 1: Scaffold & Infrastructure

**Goal:** Рабочий пустой docs site, задеплоенный на Cloudflare Pages с CI/CD.
**Milestone:** `docs-scaffold`
**Blocked by:** nothing
**Unblocks:** всё остальное

### Story 1.1: Scaffold Starlight project

**Labels:** `docs`, `infra`

Create `docs/` directory in monorepo root with Astro Starlight template.

**Acceptance criteria:**

- `docs/` directory exists with `astro.config.ts`, `package.json`, `src/content/docs/`
- `npm run dev` inside `docs/` starts local dev server on localhost:4321
- Placeholder `index.mdx` with toad-eye branding (title, logo placeholder, tagline)
- Sidebar configured with planned section structure (Getting Started, Guides, Infrastructure, API Reference, Compatibility, Advanced) — can use placeholder `.md` files
- `package.json` has `build`, `dev`, `preview` scripts
- Root `package.json` updated: add `docs` workspace, add `npm run docs` script

**Tech notes:**

```bash
npm create astro@latest -- --template starlight docs
```

---

### Story 1.2: Install and configure plugins

**Labels:** `docs`, `infra`

Install `starlight-llms-txt` and `astro-og-canvas`. Configure both in `astro.config.ts`.

**Acceptance criteria:**

- `starlight-llms-txt` configured with projectName, description, promote/demote rules
- `npm run build` generates `/llms.txt`, `/llms-full.txt`, `/llms-small.txt` in `dist/`
- `astro-og-canvas` generates OG images for each page at build time
- OG meta tags (`og:image`, `twitter:image`) present in HTML `<head>` of each page
- Route data middleware wired up for OG image injection

**Tech notes:**

```bash
cd docs
npm install starlight-llms-txt astro-og-canvas
```

---

### Story 1.3: Custom branding & styling

**Labels:** `docs`, `dx`

Apply toad-eye visual identity to the Starlight site.

**Acceptance criteria:**

- Logo SVG in sidebar header (toad-eye frog icon, or text logo if SVG not ready)
- Custom color scheme via Starlight CSS variables (green/teal toad palette)
- Favicon set (`.ico` or `.svg`)
- Social links in header: GitHub repo, npm package
- `editLink` configured pointing to `https://github.com/vola-trebla/toad-eye/edit/main/docs/`
- Footer credit or link to main repo

---

### Story 1.4: Deploy to Cloudflare Pages

**Labels:** `docs`, `infra`

Set up Cloudflare Pages project connected to the GitHub repo.

**Acceptance criteria:**

- Cloudflare Pages project created (`toad-eye-docs`)
- Build settings: command `cd docs && npm ci && npm run build`, output dir `docs/dist`
- Successful deploy from `main` branch
- PR preview deploys working (any PR touching `docs/**` gets preview URL)
- Cloudflare Analytics enabled (Web Analytics, free)

---

### Story 1.5: GitHub Actions CI workflow

**Labels:** `docs`, `infra`

CI workflow that builds docs on PRs and deploys on merge to main.

**Acceptance criteria:**

- `.github/workflows/docs.yml` exists
- On PR with `docs/**` changes: build + deploy preview to Cloudflare Pages
- On push to `main` with `docs/**` changes: production deploy
- Build failure blocks PR merge
- Workflow uses `cloudflare/wrangler-action@v3`

---

### Story 1.6: Custom domain setup

**Labels:** `docs`, `infra`

Connect `docs.toad-eye.dev` (or chosen domain) to Cloudflare Pages.

**Acceptance criteria:**

- Domain purchased and DNS configured
- `docs.toad-eye.dev` resolves to Cloudflare Pages site
- HTTPS working (Cloudflare auto-provisions SSL)
- `astro.config.ts` has `site: 'https://docs.toad-eye.dev'` for correct sitemap/OG URLs
- README.md and package.json `homepage` updated with new docs URL

**Note:** Can be deferred if domain not yet purchased. Site works on `*.pages.dev` subdomain in the meantime.

---

## Epic 2: Getting Started (Critical Path Content)

**Goal:** Любой новый пользователь может пройти от 0 до работающего toad-eye за 5 минут по документации.
**Milestone:** `docs-getting-started`
**Blocked by:** Epic 1 (scaffold)
**Unblocks:** public launch announcement

### Story 2.1: Introduction page

**Labels:** `docs`, `content`

`getting-started/introduction.md` — what is toad-eye, who it's for, what problems it solves.

**Content outline:**

- One-paragraph pitch (MCP + LLM observability, TypeScript-native, self-hosted)
- "What You Get" section: auto-instrumentation, 11 dashboards, budget guards, privacy, alerting, agent tracing
- Comparison table (toad-eye vs Sentry MCP vs Grafana Cloud/OpenLIT) — move from current README
- Architecture diagram (embed existing SVG from `demo/toad_eye_architecture_v2.svg`)
- "Next steps" links to both Quick Start pages

**Style:** concise, MCP-first, no fluff. Under 400 words of prose.

---

### Story 2.2: Quick Start — MCP Server

**Labels:** `docs`, `content`

`getting-started/quick-start-mcp.md` — hero use case #1, 2-line MCP instrumentation.

**Content outline:**

- Prerequisites: Node.js 18+, `@modelcontextprotocol/sdk`, Docker Desktop
- `npm install toad-eye`
- Code: `initObservability()` + `toadEyeMiddleware(server)` — copy-paste ready
- Privacy defaults callout (:::note — inputs NOT recorded by default)
- "See data immediately" — link to Grafana at localhost:3100
- Screenshot: Grafana MCP dashboard (use existing `demo/grafana-mcp-dashboard.png`)
- Next steps: "Set up the stack" link, "Privacy options" link

**Style:** Under 300 words. Code > text. Copy-paste → works.

---

### Story 2.3: Quick Start — LLM Calls

**Labels:** `docs`, `content`

`getting-started/quick-start-llm.md` — hero use case #2, auto-instrument LLM SDKs.

**Content outline:**

- Code: `initObservability({ serviceName, instrument: ["openai", "anthropic"] })`
- Supported providers: OpenAI, Anthropic, Gemini, Vercel AI SDK
- Streaming auto-instrumented callout
- Screenshot: Jaeger trace view
- TTFT metric mention
- Tabbed code example (Tabs component): OpenAI / Anthropic / Gemini tabs
- Next steps links

---

### Story 2.4: Installation & Stack Setup

**Labels:** `docs`, `content`

`getting-started/installation.md` — from `npm install` to running stack.

**Content outline:**

- `npm install toad-eye`
- CLI flow: `npx toad-eye init` → `npx toad-eye up` → `npx toad-eye demo`
- Docker prerequisite callout (:::caution)
- Service URLs table (Grafana :3100, Jaeger :16686, Prometheus :9090, Collector :4318)
- Port conflict resolution (env var overrides)
- Console mode alternative (:::tip — `output: "console"` for zero-Docker start)
- Imports reference table (all subpath exports)

---

## Epic 3: Core Guides

**Goal:** Deep coverage основных фич. Каждый guide — self-contained, code-first.
**Milestone:** `docs-core-guides`
**Blocked by:** Epic 2 (Getting Started pages exist for cross-linking)

### Story 3.1: Auto-Instrumentation guide

**Labels:** `docs`, `content`

`guides/auto-instrumentation.md`

**Covers:**

- `instrument: ["openai", "anthropic", "gemini", "mcp"]` array
- How it works (monkey-patching SDK prototypes)
- Per-provider behavior differences
- `enableAll()` / `disableAll()` lifecycle
- Error handling on failed patch (console warning, not crash)
- When to use manual `traceLLMCall()` instead

---

### Story 3.2: MCP Server Observability guide

**Labels:** `docs`, `content`

`guides/mcp-server.md`

**Covers:**

- `toadEyeMiddleware(server, options)` — full options deep dive
- `recordInputs`, `recordOutputs`, `redactKeys`, `maxPayloadSize`
- `sessionId` / auto-generated session IDs
- `propagateContext` — W3C traceparent via `_meta`
- `onToolCall` / `onResourceRead` callbacks
- `dispose()` return value — session cleanup
- STDIO safety — `ensureStdioSafe()`, stderr redirect
- MCP metrics: `gen_ai.mcp.tool.duration`, `gen_ai.mcp.tool.calls`, etc.

---

### Story 3.3: MCP Client & E2E Tracing guide

**Labels:** `docs`, `content`

`guides/mcp-client.md` + `guides/mcp-e2e-tracing.md` (or single page if fits)

**Covers:**

- `enableMcpClientInstrumentation(Client)` — prototype patching
- `instrument: ["mcp"]` — auto mode
- CLIENT→SERVER linked spans via `_meta.traceparent`
- `traceSampling()` for `sampling/createMessage` calls
- E2E distributed tracing demo walkthrough (screenshot: Jaeger E2E trace)
- Tool hallucination detection (`gen_ai.mcp.tool.hallucinations`, JSON-RPC -32601)

---

### Story 3.4: Budget Guards guide

**Labels:** `docs`, `content`

`guides/budget-guards.md`

**Covers:**

- `budgets: { daily, perUser, perModel }` config
- Three modes: `warn`, `block`, `downgrade`
- `downgradeCallback` — when and how to implement
- `ToadBudgetExceededError` — what happens on block
- `BudgetTracker` API: `getSpent()`, `getRemainingBudget()`
- `warnedModels` cap at 100 entries (memory leak prevention)
- Budget error double-count fix (not counted in `gen_ai.client.errors`)

---

### Story 3.5: Privacy & Redaction guide

**Labels:** `docs`, `content`

`guides/privacy.md`

**Covers:**

- `recordContent: false` — disable all content recording
- `hashContent: true` + `salt` — SHA-256 hashing with salt
- Salt warning behavior (emitted once if no salt configured)
- `redactPatterns` — custom regex patterns
- `redactDefaults: true` — built-in PII patterns (email, SSN, CC, phone)
- `auditMasking: true` — debug logging for redaction
- `contentSamplingRate` — record only N% of calls
- MCP-specific: `recordInputs: false` default, `redactKeys`

---

### Story 3.6: Streaming & TTFT guide

**Labels:** `docs`, `content`

`guides/streaming.md`

**Covers:**

- Auto-instrumented streaming for all providers
- `stream_options` auto-injection for OpenAI
- TTFT metric: `gen_ai.content.first_token` span event
- `gen_ai.response.time_to_first_token_ms` attribute
- `StreamAccumulator` — how chunks accumulate (completion, tokens, tool calls)
- Streaming tool calls (non-contiguous indices fix)
- Gemini stream wrapper (`{ stream: AsyncIterable }` pattern)
- Abandoned stream handling (finally block records partial data)

---

### Story 3.7: Console Mode guide

**Labels:** `docs`, `content`

`guides/console-mode.md`

**Covers:**

- `output: "console"` — spans to stderr, no Docker needed
- When to use: quick debugging, CI pipelines, lightweight environments
- `ToadEyeConsoleExporter` output format
- Limitations vs full OTLP mode

---

### Story 3.8: Agent Tracing guide

**Labels:** `docs`, `content`

`guides/agent-tracing.md`

**Covers:**

- `traceAgentQuery(input, fn)` — parent span with ReAct tracing
- `traceAgentStep(input)` — individual step spans
- Step types: think, act, observe, answer, handoff
- Multi-agent via nesting — child `traceAgentQuery` = child spans
- Loop detection: observe→think transitions
- `maxSteps` guard (default 25, warning on exceed)
- Handoff attributes: `toAgent`, `handoffReason`
- `toolDurationMs`, `toolStatus`, `toolType`
- OTel semconv alignment: `invoke_agent`, `execute_tool` span names

---

### Story 3.9: Vercel AI SDK Integration guide

**Labels:** `docs`, `content`

`guides/vercel-ai-sdk.md`

**Covers:**

- `instrument: ["ai"]` — auto mode
- `ToadEyeAISpanProcessor` — how it works
- `withToadEye()` wrapper
- Import: `toad-eye/vercel`
- Interaction with Vercel's built-in AI telemetry

---

### Story 3.10: Alerting guide

**Labels:** `docs`, `content`

`guides/alerting.md`

**Covers:**

- `AlertManager` class — `start()`, `stop()`
- `startAlertsFromFile(path)` — YAML config loading
- `AlertsConfig` structure: alerts array, channels map
- Alert channels: Telegram, Slack webhook, generic webhook, email (SMTP)
- `AlertRule`: name, metric, condition (PromQL string), channels, cooldown
- `parseCondition()` — condition syntax
- Grafana annotation on alert fire
- `evalIntervalSeconds` (min 10s), `cooldownMinutes` (default 30)
- Example: cost spike alert, latency anomaly alert, error rate alert

---

### Story 3.11: Remaining guides (batch)

**Labels:** `docs`, `content`

Create remaining guide pages:

- `guides/finops.md` — `config.attributes` for team/user/feature FinOps attribution
- `guides/semantic-drift.md` — `createDriftMonitor`, `saveBaseline`, `loadBaseline`, `sampleRate`
- `guides/trace-export.md` — `exportTrace`, `fetchTrace`, `traceToEvalYaml`, Jaeger→toad-eval YAML
- `guides/custom-pricing.md` — `setCustomPricing()`, `getModelPricing()`, `ModelPricing` type
- `guides/sessions.md` — `sessionId`, `sessionExtractor` callback
- `guides/thinking-tokens.md` — `thinkingContent`, `thinkingTokens`, thinking ratio metric
- `guides/manual-instrumentation.md` — `traceLLMCall(input, fn)`, when/why to use

Each page follows the standard template: one-sentence intro → quick example → how it works → config options table → gotchas.

---

## Epic 4: Infrastructure Documentation

**Goal:** CLI, Docker stack, dashboards, port config, production deployment — всё задокументировано.
**Milestone:** `docs-infrastructure`
**Blocked by:** Epic 1

### Story 4.1: CLI Reference

**Labels:** `docs`, `content`

`infrastructure/cli.md`

**Covers:**

- All commands: `init`, `up`, `down`, `status`, `demo`, `export-trace`
- Flags: `--force`, `--jaeger-url`
- Environment variables for port overrides
- Docker prerequisite check
- Terminal frame code examples (Expressive Code terminal frames)

**Source:** extract from `src/cli.ts`

---

### Story 4.2: Grafana Dashboards reference

**Labels:** `docs`, `content`

`infrastructure/dashboards.md`

**Covers:**

- All 11 dashboards: name, what it shows, key panels, when to use
  1. Overview
  2. Cost Breakdown
  3. Latency Analysis
  4. Errors
  5. Model Comparison
  6. FinOps Attribution
  7. Provider Health
  8. Agent Workflow
  9. MCP Server
  10. MCP End-to-End
  11. MCP Tool Analytics
- Screenshots for top 3-4 dashboards
- How dashboards are auto-provisioned via `toad-eye init`

**Source:** dashboard JSON files from `infra/grafana/dashboards/`

---

### Story 4.3: Docker stack & port configuration

**Labels:** `docs`, `content`

`infrastructure/docker-stack.md` + `infrastructure/ports.md`

**Covers:**

- Docker Compose architecture: OTel Collector, Prometheus, Jaeger, Grafana
- Service versions and resource requirements
- Port defaults table with env var overrides
- Port collision detection behavior
- `COLLECTOR_PORT`, `PROMETHEUS_PORT`, `JAEGER_PORT`, `GRAFANA_PORT`

---

### Story 4.4: Production Deployment guide

**Labels:** `docs`, `content`

`infrastructure/production.md`

**Covers:**

- Replace local stack with managed backends
- Backend compatibility matrix: Datadog, SigNoz, Grafana Tempo, Honeycomb, etc.
- Endpoint configuration for each backend
- Sampling configuration for production (`sdkRate`, collector tail sampling)
- Cloud mode placeholder (`apiKey`, `cloudEndpoint`)

---

## Epic 5: API Reference

**Goal:** Every exported type, function, constant — documented with types, defaults, and examples.
**Milestone:** `docs-api-reference`
**Blocked by:** Epic 1

### Story 5.1: Auto-generate API pages from TypeScript types

**Labels:** `docs`, `content`, `dx`

Generate initial content for API reference pages by extracting from source code.

**Pages to generate:**

- `api/init-observability.md` — `ToadEyeConfig` interface, every field with type + default + description
- `api/trace-llm-call.md` — `LLMCallInput`, `LLMCallOutput` interfaces
- `api/mcp-middleware.md` — `ToadMcpOptions`, `ToadEyeMiddlewareDispose`
- `api/agent.md` — `AgentStepInput`, `AgentQueryOptions`, `AgentQueryInput`, `AgentStepType`
- `api/budget.md` — `BudgetConfig`, `BudgetExceededMode`, `DowngradeCallback`, `BudgetExceededInfo`
- `api/alerts.md` — `AlertsConfig`, `AlertRule`, `AlertChannelConfig`, `FiredAlert`
- `api/drift.md` — `DriftMonitor`, `DriftMonitorConfig`, `EmbeddingProvider`, `EmbeddingConfig`, `DriftBaseline`
- `api/export.md` — `ExportTraceOptions`, `exportTrace`, `fetchTrace`, `traceToEvalYaml`
- `api/pricing.md` — `ModelPricing`, `calculateCost`, `setCustomPricing`, `getModelPricing`
- `api/vercel.md` — `ToadEyeAISpanProcessor`, `withToadEye`
- `api/mcp-client.md` — `enableMcpClientInstrumentation`, `traceSampling`, `TraceSamplingOptions`
- `api/guard.md` — `recordGuardResult`, `GuardMode`, `GuardResult`

**Source files:** `src/types/*.ts`, `src/core/spans.ts`, `src/mcp/types.ts`, `src/budget/types.ts`, `src/alerts/types.ts`, `src/drift/*.ts`, `src/index.ts`

**Method:** Claude Code session with type files as context. Output: markdown tables with field/type/default/description columns.

---

### Story 5.2: Callbacks reference page

**Labels:** `docs`, `content`

`api/callbacks.md`

**Covers:**

- `onSpanEnd` — `SpanEndData` type, when it fires, eval pipeline use case
- `onBudgetExceeded` — modes and behavior
- `onToolCall` — MCP middleware hook
- `onResourceRead` — MCP middleware hook
- `sessionExtractor` — dynamic session ID callback
- `downgradeCallback` — model downgrade logic

---

### Story 5.3: Constants & Subpath Imports reference

**Labels:** `docs`, `content`

`api/constants.md` + `api/imports.md`

**Covers:**

- `GEN_AI_ATTRS` — full table of all attribute constants with string values
- `GEN_AI_METRICS` — full table of all metric constants
- Deprecated: `LLM_ATTRS`, `LLM_METRICS`
- Subpath imports map: `toad-eye`, `toad-eye/mcp`, `toad-eye/alerts`, `toad-eye/drift`, `toad-eye/export`, `toad-eye/vercel`
- What each subpath exports

---

## Epic 6: Compatibility & Advanced

**Goal:** OTel semconv details, backend matrix, advanced topics.
**Milestone:** `docs-compatibility`
**Blocked by:** Epic 1

### Story 6.1: OTel Semantic Conventions page

**Labels:** `docs`, `content`

`compatibility/otel-semconv.md`

**Covers:**

- GenAI semconv alignment
- `OTEL_SEMCONV_STABILITY_OPT_IN` env var behavior
- Deprecated vs canonical attributes
- Span naming convention table

**Source:** `COMPATIBILITY.md`

---

### Story 6.2: Backend Compatibility Matrix

**Labels:** `docs`, `content`

`compatibility/backends.md`

**Covers:**

- Full matrix: Jaeger, Datadog, SigNoz, Grafana Tempo, Honeycomb, Langfuse, Arize Phoenix
- Per-backend: traces support, metrics support, GenAI UI, distributed tracing, search/filter
- Standard vs extension attributes support

**Source:** `COMPATIBILITY.md`

---

### Story 6.3: Spans & Metrics Reference

**Labels:** `docs`, `content`

`compatibility/spans-metrics.md`

**Covers:**

- Complete span names table with examples
- Complete metrics list with types (counter, histogram, UpDownCounter)
- Standard OTel GenAI attributes table
- toad-eye extension attributes table

**Source:** `COMPATIBILITY.md`, `src/types/attributes.ts`, `src/types/metrics.ts`

---

### Story 6.4: Advanced topics

**Labels:** `docs`, `content`

Create advanced pages:

- `advanced/sampling.md` — `SamplingConfig`, `sdkRate`, collector tail sampling settings
- `advanced/cloud-mode.md` — `apiKey`, `cloudEndpoint`, transport switching (placeholder/coming soon)
- `advanced/on-span-end.md` — `SpanEndData` → eval pipeline integration, real use cases
- `advanced/tool-hallucination.md` — `gen_ai.mcp.tool.hallucinations` metric, JSON-RPC -32601 detection

---

## Epic 7: Polish & Launch

**Goal:** Cross-links, screenshots, README update, launch announcement.
**Milestone:** `docs-launch`
**Blocked by:** Epics 2-6 (at least Epics 2-3 complete)

### Story 7.1: Landing page

**Labels:** `docs`, `content`

`index.mdx` — hero landing page.

**Content:**

- Hero tagline + one-paragraph pitch
- Two hero CTAs: "Quick Start — MCP" and "Quick Start — LLM"
- Feature cards grid (Starlight CardGrid component): auto-instrumentation, dashboards, budget guards, privacy, alerting, agent tracing
- npm install one-liner
- "Trusted by" / stars badge (if applicable)

---

### Story 7.2: Cross-linking pass

**Labels:** `docs`, `dx`

Go through all pages and add cross-links.

**Acceptance criteria:**

- Every guide page links to relevant API reference page
- Every API reference page links back to the guide explaining usage
- Getting Started pages link to deep-dive guides
- "Related" or "See also" sections at bottom of each page where relevant
- No orphan pages (every page reachable from sidebar + at least one other page)

---

### Story 7.3: Screenshots & visual assets

**Labels:** `docs`, `content`

Add screenshots to key pages.

**Screenshots needed:**

- Grafana MCP dashboard (existing: `demo/grafana-mcp-dashboard.png`)
- Jaeger E2E trace (existing: `demo/jaeger-e2e-trace.png`)
- Grafana Overview dashboard
- Grafana Cost Breakdown dashboard
- CLI `npx toad-eye status` terminal output
- Architecture diagram (existing: `demo/toad_eye_architecture_v2.svg`)

Copy existing assets from `demo/` to `docs/public/images/`. Take new screenshots from running stack.

---

### Story 7.4: README.md update

**Labels:** `docs`, `dx`

Trim README to Quick Start only. Point everything else to docs site.

**Changes:**

- Keep: badges, Quick Start MCP, Quick Start LLM, Set Up the Stack, Services table
- Remove: Budget Guards section, Agent Observability section, detailed CLI, Architecture, Imports
- Add: `📖 Full documentation: https://docs.toad-eye.dev` banner after Quick Start
- Update `package.json` homepage to docs URL

---

### Story 7.5: CHANGELOG link page

**Labels:** `docs`, `content`

Either:

- (a) Redirect `/changelog` → GitHub CHANGELOG.md, or
- (b) Use `starlight-changelogs` plugin to render CHANGELOG inline

Decide based on maintenance burden. Option (a) is zero-maintenance.

---

### Story 7.6: Launch checklist & announcement

**Labels:** `docs`

Pre-launch verification:

- [ ] All Getting Started pages reviewed and tested (follow each guide from scratch)
- [ ] `npm run build` succeeds with zero warnings
- [ ] `/llms.txt` serves correctly on production URL
- [ ] OG images render correctly (test with opengraph.xyz)
- [ ] Mobile layout tested
- [ ] Search works (Pagefind indexed all pages)
- [ ] All code examples are copy-paste runnable
- [ ] Custom domain SSL working

Post-launch:

- [ ] Dev.to announcement post (build-in-public style)
- [ ] Tweet from @ElSapoCripto
- [ ] Update npm package description if needed
- [ ] Submit to Starlight Showcase (PR to withastro/starlight)

---

## Execution Order (recommended)

```
Week 1:  Epic 1 (scaffold + infra)     — 6 stories
Week 2:  Epic 2 (Getting Started)      — 4 stories
Week 2:  Story 5.1 (API auto-generate) — 1 story (batch with Claude Code)
Week 3:  Stories 3.1-3.6 (core guides) — 6 stories
Week 3:  Epic 4 (infrastructure docs)  — 4 stories
Week 4:  Stories 3.7-3.11 (remaining)  — 5 stories
Week 4:  Stories 5.2-5.3, Epic 6       — 6 stories
Week 5:  Epic 7 (polish + launch)      — 6 stories
```

**Total: 38 stories across 7 epics.**

---

## Story Template (for GitHub Issues)

```markdown
## Context

[Why this story exists, what it unblocks]

## Acceptance Criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] ...

## Content Outline

[For content stories: sections/headings to cover]

## Source Files

[TypeScript source files to reference for accuracy]

## Notes

[Style notes, gotchas, links to examples from other docs sites]
```

---

## Labels

| Label     | Color  | Usage                                     |
| --------- | ------ | ----------------------------------------- |
| `docs`    | blue   | All docs-related issues                   |
| `epic`    | purple | Epic tracking issues                      |
| `content` | green  | Writing/content creation                  |
| `infra`   | orange | Infrastructure, CI/CD, hosting            |
| `dx`      | teal   | Developer experience, cross-links, polish |
