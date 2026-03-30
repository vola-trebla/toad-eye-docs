---
title: Quick Start — LLM Calls
description: Auto-instrument OpenAI, Anthropic, Gemini, and Vercel AI SDK with zero wrappers.
---

Auto-instrument LLM SDK calls — zero wrappers:

```typescript
import { initObservability } from "toad-eye";

initObservability({
  serviceName: "my-app",
  instrument: ["openai", "anthropic"],
});

// Every SDK call is auto-traced — including streaming.
```

:::note
This page is under construction. Full content coming soon.
:::
