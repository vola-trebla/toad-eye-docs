import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";

const entries = await getCollection("docs");
const pages = Object.fromEntries(entries.map(({ data, id }) => [id, { data }]));

export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  param: "slug",
  getImageOptions: (_id, page: (typeof pages)[number]) => {
    return {
      title: page.data.title,
      description: page.data.description,
      bgGradient: [[24, 24, 27]] as const,
      border: { color: [34, 197, 94] as const, width: 20 },
      padding: 120,
    };
  },
});
