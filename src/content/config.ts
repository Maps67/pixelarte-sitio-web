// src/content/config.ts (VERSIÓN 100% VERIFICADA)
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Usamos z.coerce.date() para convertir el string "YYYY-MM-DD" en un objeto Date
    pubDate: z.coerce.date(),
    author: z.string().default('Marco A. Portillo'),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  'blog': blogCollection,
};