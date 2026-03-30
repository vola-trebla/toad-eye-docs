import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightLlmsTxt from "starlight-llms-txt";

export default defineConfig({
  site: "https://docs.toad-eye.dev",
  integrations: [
    starlight({
      title: "toad-eye",
      description:
        "OpenTelemetry-based observability for MCP servers and LLM applications",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/vola-trebla/toad-eye",
        },
      ],
      editLink: {
        baseUrl: "https://github.com/vola-trebla/toad-eye-docs/edit/main/",
      },
      routeMiddleware: "./src/routeData.ts",
      plugins: [
        starlightLlmsTxt({
          projectName: "toad-eye",
          description:
            "OpenTelemetry-based observability for MCP servers and LLM applications",
          promote: ["getting-started/*"],
          demote: ["compatibility/*"],
        }),
      ],
      sidebar: [
        {
          label: "Getting Started",
          items: [
            { slug: "getting-started/introduction" },
            { slug: "getting-started/quick-start-mcp" },
            { slug: "getting-started/quick-start-llm" },
            { slug: "getting-started/installation" },
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
      lastUpdated: true,
      pagination: true,
    }),
  ],
});
