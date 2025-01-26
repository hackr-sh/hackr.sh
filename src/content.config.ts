import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blogs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/blogs" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
  }),
});

export const collections = { blogs };
