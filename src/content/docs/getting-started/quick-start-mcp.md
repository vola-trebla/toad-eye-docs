---
title: Quick Start — MCP Server
description: Add observability to any MCP server in 2 lines of code.
---

Add observability to any MCP server in 2 lines:

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { initObservability } from "toad-eye";
import { toadEyeMiddleware } from "toad-eye/mcp";

initObservability({ serviceName: "my-mcp-server" });

const server = new McpServer({ name: "my-server", version: "1.0.0" });
toadEyeMiddleware(server);

// Every tool call, resource read, and prompt is now traced.
```

:::note
This page is under construction. Full content coming soon.
:::
