// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// Definimos la colección 'blog'
const blogCollection = defineCollection({
  type: 'content', // significa archivos .md o .mdx
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string().default("Marco A. Portillo"), // Valor por defecto
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }).optional(), // La imagen completa es opcional
    tags: z.array(z.string()).optional(), // Lista de tags es opcional
    draft: z.boolean().optional(), // Para marcar posts como borradores (opcional)
    // No necesitamos 'slug' aquí, Astro lo genera del nombre de archivo
  }),
});

// Exportamos la colección para que Astro la use
export const collections = {
  'blog': blogCollection,
};