# 🐸 Жабий Франкенштейн — docs stack для toad-eye

## Философия

Взять лучшее у каждого, не платить ни копейки, получить результат на уровне Anthropic/Stripe/Vercel docs.

---

## Core Stack

### 1. Astro Starlight — фундамент

**Украдено у:** Astro docs, Biome, Cloudflare Workers, Hono
**Цена:** $0

Что даёт из коробки, за ноль усилий:

- Sidebar navigation с autogenerate по папкам
- Pagefind search (полнотекстовый, работает оффлайн)
- Dark/light mode
- Mobile responsive
- Code syntax highlighting (Expressive Code — лучший в классе)
- TOC (table of contents) на каждой странице
- "Edit this page" ссылки на GitHub
- Sitemap автогенерация
- SEO meta tags

### 2. Cloudflare Pages — хостинг

**Украдено у:** Cloudflare Workers docs (они сами на Starlight + CF Pages)
**Цена:** $0 (Free plan: unlimited sites, unlimited bandwidth, 500 deploys/month)

- PR preview deploys автоматически (каждый PR = preview URL)
- Custom domain: `docs.toad-eye.dev`
- Global CDN — быстрее чем Vercel для глобальной аудитории
- Zero cold starts (static files, не serverless)

### 3. GitHub Actions — CI/CD

**Украдено у:** все нормальные OSS проекты
**Цена:** $0 (public repo)

```yaml
on:
  push:
    branches: [main]
    paths: ["docs/**"]
```

Merge в main → auto deploy. PR → preview URL.

---

## Plugins (всё бесплатное)

### 4. starlight-llms-txt — AI discoverability

**Украдено у:** Anthropic (Mintlify даёт это за $300/мес, мы берём бесплатный Starlight plugin)
**Цена:** $0
**npm:** `starlight-llms-txt`

Автогенерит на каждом билде:

- `/llms.txt` — index для AI агентов (slim, ключевые страницы)
- `/llms-full.txt` — полный markdown dump всей документации
- `/llms-small.txt` — compact версия для моделей с маленьким контекстом

Зачем: AI coding assistants (Cursor, Claude Code, Copilot) смогут скормить твои доки в контекст. По данным Mintlify, llms-full.txt получает 2x больше запросов чем llms.txt.

Конфиг:

```typescript
import starlightLlmsTxt from "starlight-llms-txt";

starlight({
  plugins: [
    starlightLlmsTxt({
      projectName: "toad-eye",
      description:
        "OpenTelemetry-based observability for MCP servers and LLM applications",
      promote: ["getting-started/*", "guides/mcp-server"],
      demote: ["compatibility/*"],
    }),
  ],
});
```

### 5. astro-og-canvas — OG images

**Украдено у:** Patchstack (они описали этот подход для Starlight)
**Цена:** $0
**npm:** `astro-og-canvas`

Автогенерит Open Graph images для каждой страницы на build time:

- Шаринг в Twitter/LinkedIn/Slack — красивый preview с title + description
- Кастомизируемый layout: цвета, лого, шрифты
- Zero runtime cost — статические PNG

### 6. Expressive Code — code blocks

**Украдено у:** встроено в Starlight
**Цена:** $0

Лучшие code blocks на рынке:

- Tabbed code examples (TypeScript / JavaScript / curl)
- Line highlighting, diff syntax
- Frame titles (`// my-app.ts`)
- Copy button встроен
- Terminal window frames для CLI примеров

Как у Stripe, только бесплатно.

---

## Content Features (ручная работа, zero cost)

### 7. Tabbed code examples — à la Stripe

**Украдено у:** Stripe docs

Starlight + MDX поддерживает Tabs component из коробки:

````mdx
import { Tabs, TabItem } from "@astrojs/starlight/components";

<Tabs>
  <TabItem label="MCP Server">
    ```typescript
    import { toadEyeMiddleware } from "toad-eye/mcp";
    toadEyeMiddleware(server);
    ```
  </TabItem>
  <TabItem label="LLM Calls">
    ```typescript
    import { initObservability } from "toad-eye";
    initObservability({ serviceName: "my-app", instrument: ["openai"] });
    ```
  </TabItem>
</Tabs>
````

### 8. Aside/callout boxes — à la Vercel

**Украдено у:** Vercel/Anthropic docs

Встроено в Starlight:

```markdown
:::note
Tool arguments are NOT recorded by default. Opt in with `recordInputs: true`.
:::

:::caution
Budget guards require the observability stack running. Run `npx toad-eye up` first.
:::

:::tip
Use `output: "console"` for zero-Docker quick start — spans print to stderr.
:::
```

### 9. Structured API reference tables

**Украдено у:** Tailwind CSS docs (concise, zero bullshit)

Каждая опция = строка таблицы с type, default, description. Код > текст.

### 10. "Edit this page" links

**Украдено у:** все хорошие OSS docs

```typescript
starlight({
  editLink: {
    baseUrl: "https://github.com/vola-trebla/toad-eye/edit/main/docs/",
  },
});
```

Community contributions прямо из доков → GitHub PR.

---

## SEO & Distribution (zero cost)

### 11. Custom domain

**Что:** `docs.toad-eye.dev`
**Цена:** ~$10-12/год за `.dev` домен (единственная платная вещь)

### 12. Canonical README → docs redirect

**Украдено у:** SigNoz, Langfuse

README.md остаётся коротким (Quick Start only), всё остальное:

> 📖 **Full documentation:** [docs.toad-eye.dev](https://docs.toad-eye.dev)

### 13. npm homepage

```json
{
  "homepage": "https://docs.toad-eye.dev"
}
```

npm page → docs site. Прямой трафик.

### 14. GitHub repo description

```
Observability for MCP servers & LLM apps. Docs: https://docs.toad-eye.dev
```

---

## Что мы украли у каждого

| Источник                 | Что взяли                                   | Как реализуем                  | Цена |
| ------------------------ | ------------------------------------------- | ------------------------------ | ---- |
| **Anthropic** (Mintlify) | llms.txt + llms-full.txt                    | `starlight-llms-txt` plugin    | $0   |
| **Anthropic** (Mintlify) | AI-native docs discoverability              | llms.txt автогенерация         | $0   |
| **Stripe**               | Tabbed code examples по языкам              | Starlight `<Tabs>` component   | $0   |
| **Stripe**               | Copy-paste first approach                   | Expressive Code copy button    | $0   |
| **Tailwind**             | Concise: одно предложение → код → готово    | Editorial discipline           | $0   |
| **Vercel**               | Callout boxes (tip/warning/note)            | Starlight `:::note` syntax     | $0   |
| **OpenTelemetry**        | Sidebar структура для semconv projects      | Starlight sidebar config       | $0   |
| **SigNoz**               | Self-hosted positioning, comparison table   | Custom landing page content    | $0   |
| **Cloudflare**           | Fast global CDN, PR preview deploys         | Cloudflare Pages free tier     | $0   |
| **Hono**                 | Minimal, clean design aesthetic             | Starlight defaults + minor CSS | $0   |
| **Patchstack**           | Auto OG images из page titles               | `astro-og-canvas`              | $0   |
| **Astro**                | Everything else (search, mobile, dark mode) | Starlight out of the box       | $0   |

---

## Полный package list

```bash
# Create project
npm create astro@latest -- --template starlight docs

# Core (installed by template)
# @astrojs/starlight — уже есть

# Plugins
npm install starlight-llms-txt    # AI discoverability
npm install astro-og-canvas       # OG images auto-generation

# Dev (optional, quality of life)
npm install -D @astrojs/check     # Astro type checking
```

**Всего 2 дополнительных пакета.** Остальное — Starlight из коробки.

---

## Чего мы НЕ берём и почему

| Вещь                         | Кто использует      | Почему нет                               |
| ---------------------------- | ------------------- | ---------------------------------------- |
| Mintlify                     | Anthropic, Vercel   | $300/мес, vendor lock-in                 |
| Algolia DocSearch            | большие проекты     | Pagefind достаточно, zero config         |
| Docusaurus                   | OpenTelemetry, Meta | Тяжелее Starlight, React overhead        |
| Nextra                       | Satori              | Привязка к Next.js                       |
| i18n                         | большие проекты     | Нет аудитории, добавим позже если нужно  |
| Versioned docs               | Stripe, Anthropic   | Один version + CHANGELOG достаточно      |
| AI chat widget               | Mintlify Assistant  | $300/мес; llms.txt покрывает AI use case |
| Custom React components      | Vercel              | MDX Starlight components достаточно      |
| Analytics (Plausible/Fathom) | хорошая практика    | Cloudflare Analytics бесплатно, встроено |

---

## Финальная цена жабьего Франкенштейна

| Компонент                | Цена         |
| ------------------------ | ------------ |
| Astro Starlight          | $0           |
| Cloudflare Pages         | $0           |
| GitHub Actions CI/CD     | $0           |
| starlight-llms-txt       | $0           |
| astro-og-canvas          | $0           |
| Pagefind search          | $0           |
| Cloudflare Analytics     | $0           |
| **Домен `toad-eye.dev`** | **~$12/год** |
| **Итого**                | **~$12/год** |

Для сравнения: Anthropic платит Mintlify enterprise план, скорее всего $1000+/мес.

Мы получаем 90% их фич за $1/мес 🐸

---

## Что отличает от Mintlify (честное сравнение)

### У нас лучше:

- Полный контроль над кодом и дизайном
- Pagefind search работает оффлайн (Mintlify — нет)
- Zero vendor lock-in
- Бесплатно навсегда
- Можно PR-ить доки вместе с кодом (монорепо)

### У Mintlify лучше:

- AI Assistant (чат в доках) — но llms.txt покрывает основной AI use case
- Готовые API playground — нам не нужно (не REST API)
- Встроенная аналитика с user insights — Cloudflare Analytics хватит
- Zero setup time — нам нужно ~2 часа на scaffold

### Паритет:

- Design quality (Starlight defaults = чистый и профессиональный)
- Code highlighting (Expressive Code ≥ Mintlify)
- Mobile responsive
- Dark mode
- Search
- OG images (через plugin)
- llms.txt (через plugin)
