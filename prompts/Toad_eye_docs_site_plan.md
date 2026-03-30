# toad-eye docs site — полный план

## 1. Stack decision: Astro Starlight ✅

Без вариантов. Причины:

- Markdown-based, `.md` файлы — как просил
- Built-in sidebar, search (Pagefind), dark mode, mobile, code highlighting
- TypeScript конфиг (`astro.config.ts`) — нативно для проекта
- Zero JS по умолчанию → быстрый сайт
- Деплой на Cloudflare Pages / Vercel — бесплатно, из коробки
- Используется OpenTelemetry docs, Hono, и десятки OSS проектов
- MDX поддержка для интерактивных компонентов (если понадобятся)

Альтернативы (Docusaurus, Mintlify, Nextra) — нет причин рассматривать. Starlight лучше по всем параметрам для solo OSS проекта.

---

## 2. Sitemap — полная структура

### Sidebar navigation tree

```
📁 Getting Started
  ├── Introduction                    # what is toad-eye, who it's for
  ├── Quick Start — MCP Server        # 2-line MCP instrumentation
  ├── Quick Start — LLM Calls         # auto-instrument OpenAI/Anthropic/Gemini
  └── Installation & Stack Setup      # npm install, CLI init/up/down, Docker prereqs

📁 Guides
  ├── Auto-Instrumentation            # instrument: ["openai", "anthropic", "gemini", "mcp"]
  ├── Manual Instrumentation          # traceLLMCall(input, fn), when and why
  ├── MCP Server Observability        # toadEyeMiddleware deep dive, all options
  ├── MCP Client Instrumentation      # enableMcpClientInstrumentation, E2E tracing
  ├── MCP E2E Distributed Tracing     # traceparent via _meta, CLIENT→SERVER linking
  ├── Vercel AI SDK Integration       # ToadEyeAISpanProcessor, withToadEye
  ├── Streaming & TTFT                # auto-instrumented streaming, TTFT metric, prefill/decode
  ├── Budget Guards                   # daily/perUser/perModel, warn/block/downgrade
  ├── Privacy & Redaction             # recordContent, hashContent, salt, redactPatterns, PII, contentSamplingRate
  ├── Agent Tracing                   # traceAgentQuery, traceAgentStep, ReAct, multi-agent, handoffs
  ├── FinOps Attribution              # config.attributes, team/user/feature breakdown
  ├── Alerting                        # YAML config, channels (Telegram/Slack/webhook/email), PromQL
  ├── Semantic Drift Detection        # createDriftMonitor, baseline management, sampleRate
  ├── Trace Export to toad-eval       # exportTrace, Jaeger → YAML regression tests
  ├── Custom Pricing                  # setCustomPricing() for fine-tuned models
  ├── Session Tracking                # sessionId, sessionExtractor
  ├── Console Mode (No Docker)        # output: "console", spans to stderr
  └── Thinking & Reasoning Tokens     # thinkingContent, thinkingTokens (o1, Claude, Gemini)

📁 Infrastructure
  ├── CLI Reference                   # init, up, down, status, demo, export-trace — flags & env vars
  ├── Docker Compose Stack            # what's inside: Collector, Prometheus, Jaeger, Grafana
  ├── Port Configuration              # PORT_CONFIG, env var overrides, collision detection
  ├── Grafana Dashboards              # описание каждого из 11 dashboards + screenshots
  └── Production Deployment           # replace local stack with Datadog/SigNoz/Grafana Cloud/Honeycomb

📁 API Reference
  ├── initObservability()             # ToadEyeConfig — every option documented
  ├── traceLLMCall()                  # LLMCallInput, LLMCallOutput
  ├── toadEyeMiddleware()             # ToadMcpOptions, dispose callback
  ├── Agent API                       # traceAgentQuery, traceAgentStep, AgentStepInput, AgentQueryOptions
  ├── Budget API                      # BudgetTracker, BudgetConfig, BudgetExceededMode, DowngradeCallback
  ├── Alert API                       # AlertManager, AlertsConfig, AlertRule, AlertChannelConfig
  ├── Drift API                       # DriftMonitor, DriftMonitorConfig, EmbeddingProvider
  ├── Export API                      # exportTrace, fetchTrace, traceToEvalYaml
  ├── Pricing API                     # calculateCost, setCustomPricing, getModelPricing, ModelPricing
  ├── Vercel API                      # ToadEyeAISpanProcessor, withToadEye
  ├── MCP Client API                  # enableMcpClientInstrumentation, traceSampling
  ├── Guard API                       # recordGuardResult, GuardMode, GuardResult
  ├── Callbacks                       # onSpanEnd (SpanEndData), onBudgetExceeded, onToolCall, onResourceRead
  ├── Constants                       # GEN_AI_ATTRS, GEN_AI_METRICS — full table
  └── Subpath Imports                 # toad-eye, toad-eye/mcp, toad-eye/alerts, toad-eye/drift, toad-eye/export, toad-eye/vercel

📁 Compatibility
  ├── OTel Semantic Conventions       # GenAI semconv, OTEL_SEMCONV_STABILITY_OPT_IN
  ├── Backend Compatibility Matrix    # Jaeger/Datadog/SigNoz/Grafana Tempo/Honeycomb/Langfuse/Arize
  └── Span & Metric Reference         # all span names, all metrics, attribute tables

📁 Advanced
  ├── Sampling Configuration          # sdkRate, collector tail sampling
  ├── Cloud Mode (coming soon)        # apiKey, cloudEndpoint
  ├── onSpanEnd for Eval Pipelines    # SpanEndData → custom eval logic
  └── Tool Hallucination Detection    # gen_ai.mcp.tool.hallucinations, JSON-RPC -32601

📂 Root pages
  ├── /                               # landing/hero (можно позже)
  └── CHANGELOG                       # link to GitHub CHANGELOG.md
```

### Итого: ~40 страниц контента

---

## 3. Приоритет написания (что первым)

### Phase 1 — Critical Path (неделя 1-2)

Must-have для любого пользователя. Без этого docs site бесполезен.

1. **Introduction** — что это, зачем, для кого
2. **Quick Start — MCP Server** — hero use case, copy-paste и работает
3. **Quick Start — LLM Calls** — второй hero use case
4. **Installation & Stack Setup** — npm install → npx toad-eye init → up → demo
5. **initObservability() API Reference** — ToadEyeConfig с каждой опцией
6. **CLI Reference** — все команды

### Phase 2 — Core Guides (неделя 2-3)

Глубокое покрытие основных фич.

7. **Auto-Instrumentation** — instrument array, что поддерживается
8. **MCP Server Observability** — toadEyeMiddleware deep dive
9. **Budget Guards** — популярная фича, уже есть в README
10. **Privacy & Redaction** — критично для enterprise adoption
11. **Streaming & TTFT** — отличительная фича
12. **Grafana Dashboards** — описание 11 dashboards + screenshots
13. **Console Mode** — zero-Docker quick start

### Phase 3 — Extended Guides (неделя 3-4)

Фичи для advanced users.

14. **Agent Tracing** — ReAct, multi-agent
15. **MCP E2E Distributed Tracing** — killer feature
16. **MCP Client Instrumentation**
17. **Vercel AI SDK Integration**
18. **Alerting**
19. **FinOps Attribution**
20. **traceLLMCall() API** + **toadEyeMiddleware() API**

### Phase 4 — Full Coverage (неделя 4-6)

Остальные API reference pages, compatibility, advanced topics.

21-40. Все остальные страницы

### Phase 5 — Polish

- Landing page с hero
- Screenshots/GIFs на ключевых страницах
- Cross-links между pages
- SEO meta tags

---

## 4. Технический план

### 4.1 Scaffold

```bash
# В корне монорепо (или отдельный репо — решение ниже)
npm create astro@latest -- --template starlight docs
cd docs
npm install
npm run dev
```

**Где жить**: отдельная директория `docs/` в монорепо toad-eye. Не отдельный репо — single source of truth, PR-ы могут менять код и доки одновременно.

### 4.2 Структура файлов

```
docs/
├── astro.config.ts          # Starlight config, sidebar tree
├── package.json
├── src/
│   └── content/
│       └── docs/
│           ├── index.mdx            # landing page
│           ├── getting-started/
│           │   ├── introduction.md
│           │   ├── quick-start-mcp.md
│           │   ├── quick-start-llm.md
│           │   └── installation.md
│           ├── guides/
│           │   ├── auto-instrumentation.md
│           │   ├── mcp-server.md
│           │   ├── mcp-client.md
│           │   ├── mcp-e2e-tracing.md
│           │   ├── vercel-ai-sdk.md
│           │   ├── streaming.md
│           │   ├── budget-guards.md
│           │   ├── privacy.md
│           │   ├── agent-tracing.md
│           │   ├── finops.md
│           │   ├── alerting.md
│           │   ├── semantic-drift.md
│           │   ├── trace-export.md
│           │   ├── custom-pricing.md
│           │   ├── sessions.md
│           │   ├── console-mode.md
│           │   └── thinking-tokens.md
│           ├── infrastructure/
│           │   ├── cli.md
│           │   ├── docker-stack.md
│           │   ├── ports.md
│           │   ├── dashboards.md
│           │   └── production.md
│           ├── api/
│           │   ├── init-observability.md
│           │   ├── trace-llm-call.md
│           │   ├── mcp-middleware.md
│           │   ├── agent.md
│           │   ├── budget.md
│           │   ├── alerts.md
│           │   ├── drift.md
│           │   ├── export.md
│           │   ├── pricing.md
│           │   ├── vercel.md
│           │   ├── mcp-client.md
│           │   ├── guard.md
│           │   ├── callbacks.md
│           │   ├── constants.md
│           │   └── imports.md
│           ├── compatibility/
│           │   ├── otel-semconv.md
│           │   ├── backends.md
│           │   └── spans-metrics.md
│           └── advanced/
│               ├── sampling.md
│               ├── cloud-mode.md
│               ├── on-span-end.md
│               └── tool-hallucination.md
└── public/
    └── images/          # screenshots, architecture SVG
```

### 4.3 astro.config.ts sidebar

```typescript
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  integrations: [
    starlight({
      title: "toad-eye",
      logo: { src: "./src/assets/toad-eye-logo.svg" },
      social: {
        github: "https://github.com/vola-trebla/toad-eye",
      },
      editLink: {
        baseUrl: "https://github.com/vola-trebla/toad-eye/edit/main/docs/",
      },
      sidebar: [
        {
          label: "Getting Started",
          items: [
            { label: "Introduction", slug: "getting-started/introduction" },
            {
              label: "Quick Start — MCP",
              slug: "getting-started/quick-start-mcp",
            },
            {
              label: "Quick Start — LLM",
              slug: "getting-started/quick-start-llm",
            },
            { label: "Installation", slug: "getting-started/installation" },
          ],
        },
        {
          label: "Guides",
          autogenerate: { directory: "guides" },
        },
        {
          label: "Infrastructure",
          autogenerate: { directory: "infrastructure" },
        },
        {
          label: "API Reference",
          collapsed: true,
          autogenerate: { directory: "api" },
        },
        {
          label: "Compatibility",
          collapsed: true,
          autogenerate: { directory: "compatibility" },
        },
        {
          label: "Advanced",
          collapsed: true,
          autogenerate: { directory: "advanced" },
        },
      ],
    }),
  ],
});
```

### 4.4 Hosting: Cloudflare Pages

Рекомендую Cloudflare Pages, не Vercel:

- Бесплатный план щедрее (unlimited bandwidth vs 100GB)
- Быстрее глобально (CDN ближе к пользователям)
- Нет cold starts
- `docs.toad-eye.dev` — custom domain бесплатно

```bash
# wrangler.toml не нужен — Cloudflare Pages auto-detects Astro
# Settings в CF dashboard:
#   Build command: npm run build
#   Build output: dist/
#   Root directory: docs/
```

### 4.5 CI/CD — автодеплой

GitHub Actions workflow:

```yaml
# .github/workflows/docs.yml
name: Deploy Docs

on:
  push:
    branches: [main]
    paths: ["docs/**"]
  pull_request:
    paths: ["docs/**"]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: cd docs && npm ci && npm run build
      - name: Deploy to Cloudflare Pages
        if: github.ref == 'refs/heads/main'
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          accountId: ${{ secrets.CF_ACCOUNT_ID }}
          command: pages deploy docs/dist --project-name=toad-eye-docs
```

PR preview deploys — Cloudflare Pages делает автоматически.

---

## 5. Оценка объёма

| Секция          | Страниц | ~Слов на страницу       | Итого слов       |
| --------------- | ------- | ----------------------- | ---------------- |
| Getting Started | 4       | 400-600                 | ~2,000           |
| Guides          | 17      | 500-800                 | ~11,000          |
| Infrastructure  | 5       | 400-600                 | ~2,500           |
| API Reference   | 15      | 300-500 (таблицы + код) | ~6,000           |
| Compatibility   | 3       | 400-600                 | ~1,500           |
| Advanced        | 4       | 400-600                 | ~2,000           |
| **Итого**       | **~48** |                         | **~25,000 слов** |

Реалистичная оценка: **40-48 страниц**, **~25K слов** контента.

Для сравнения: средний OSS проект такого размера — 20-30 страниц. У тебя функциональность покрывает 48 потому что фич реально много.

---

## 6. Автогенерация vs ручное написание

### Можно автогенерировать из кода (с помощью Claude Code)

| Что                                | Источник                  | Метод                                     |
| ---------------------------------- | ------------------------- | ----------------------------------------- |
| **ToadEyeConfig options table**    | `src/types/config.ts`     | Парсить interface, JSDoc → markdown table |
| **ToadMcpOptions table**           | `src/mcp/types.ts`        | То же                                     |
| **LLMCallInput/Output tables**     | `src/core/spans.ts`       | То же                                     |
| **GEN_AI_ATTRS constants**         | `src/types/attributes.ts` | Export → table                            |
| **GEN_AI_METRICS constants**       | `src/types/metrics.ts`    | Export → table                            |
| **Subpath imports**                | `package.json` exports    | Mechanical mapping                        |
| **CLI commands**                   | `src/cli.ts`              | Extract command definitions               |
| **Span naming table**              | `COMPATIBILITY.md`        | Copy + format                             |
| **Backend compatibility matrix**   | `COMPATIBILITY.md`        | Copy + format                             |
| **AlertsConfig / AlertRule types** | `src/alerts/types.ts`     | Interface → table                         |
| **DriftMonitorConfig types**       | `src/drift/monitor.ts`    | Interface → table                         |
| **BudgetConfig types**             | `src/budget/types.ts`     | Interface → table                         |
| **All exported functions list**    | `src/index.ts`            | Parse exports                             |

**~30-40% контента** можно сгенерить механически.

### Скрипт автогенерации (опционально)

Можно написать `scripts/generate-api-docs.ts` который:

1. Парсит TypeScript AST (ts-morph)
2. Извлекает interfaces, JSDoc, default values
3. Генерит `.md` файлы в `docs/src/content/docs/api/`
4. Запускается в CI перед build

Но для v1 — **не стоит**. Быстрее попросить Claude Code сгенерить API reference страницы один раз из исходников. Автогенерацию делать когда API стабилизируется и начнёт дрейфовать от доков.

### Писать руками (обязательно)

- Getting Started — flow, tone, narrative
- Все Guides — examples, use cases, gotchas, "when to use"
- Infrastructure/Dashboards — screenshots + описания
- Advanced topics — context, reasoning, tradeoffs
- Cross-references между страницами

---

## 7. Шаблон страницы (стиль)

Каждая guide page — одна структура:

````markdown
---
title: Budget Guards
description: Daily, per-user, and per-model spend limits with warn/block/downgrade modes.
---

One-sentence what this is.

## Quick Example

\```typescript
// 5-10 строк copy-paste кода
\```

## How It Works

2-3 абзаца.

## Configuration Options

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| ...    | ...  | ...     | ...         |

## Modes

### warn

### block

### downgrade

## Gotchas

- bullet points с реальными проблемами
````

Стиль: **concise, code examples > lengthy explanations, MCP-first** — как в промпте.

---

## 8. Конкретный action plan для Claude Code

Для каждой сессии Claude Code — давать один `.md` файл как контекст + промпт:

**Session 1**: Scaffold + Getting Started (4 pages)

```
Контекст: этот план + README.md + package.json
Задача: npm create astro starlight, настроить sidebar, написать 4 Getting Started страницы
```

**Session 2**: API Reference — autogenerable (8-10 pages)

```
Контекст: этот план + src/types/*.ts + src/index.ts + src/mcp/types.ts
Задача: сгенерить все API reference страницы из типов
```

**Session 3**: Core Guides batch 1 (5-6 pages)

```
Контекст: этот план + src/instrumentations/*.ts + src/mcp/middleware.ts
Задача: auto-instrumentation, MCP server, MCP client, streaming guides
```

**Session 4**: Core Guides batch 2 (5-6 pages)

```
Контекст: этот план + src/budget/*.ts + src/core/spans.ts + src/agent.ts
Задача: budget guards, privacy, agent tracing, FinOps guides
```

**Session 5**: Extended features (5-6 pages)

```
Контекст: этот план + src/alerts/*.ts + src/drift/*.ts + src/export.ts
Задача: alerting, drift, trace export, advanced topics
```

**Session 6**: Infrastructure + Compatibility (8 pages)

```
Контекст: этот план + src/cli.ts + COMPATIBILITY.md + infra/
Задача: CLI ref, dashboards, docker stack, compatibility pages
```

---

## 9. Domain & SEO

- **Domain**: `docs.toad-eye.dev` (если `toad-eye.dev` ещё не куплен — купить)
- **README update**: заменить длинные секции на ссылки → `docs.toad-eye.dev/guides/budget-guards`
- **package.json homepage**: обновить на docs URL
- **npm README**: оставить Quick Start, всё остальное → "Full docs at docs.toad-eye.dev"
- **OG images**: astro-og-canvas для автогенерации (Starlight plugin)

---

## 10. Что НЕ делать сейчас

- ❌ Автогенерация доков из AST (overkill для v1)
- ❌ i18n (нет аудитории для других языков пока)
- ❌ Versioned docs (один актуальный version, CHANGELOG достаточно)
- ❌ Blog section (Dev.to для этого)
- ❌ Algolia DocSearch (Pagefind built-in достаточно)
- ❌ Custom Astro components (plain markdown first)
- ❌ Landing page с animations (простой hero на первое время)
