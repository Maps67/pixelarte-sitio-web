// src/content/config.ts (RECONSTRUIDO)

// 1. Importar las utilidades necesarias de Astro
import { defineCollection, z } from 'astro:content';

// 2. Definir la colección 'blog'
const blogCollection = defineCollection({
  type: 'content', // tipo 'content' es para .md o .mdx
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('Marco A. Portillo'), // Asignamos un autor por defecto
    
    // Definimos 'image' como un objeto con 'url' y 'alt'
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    
    // Definimos 'tags' como un array de strings
    tags: z.array(z.string()),
  }),
});

// 3. Exportar las colecciones
export const collections = {
  'blog': blogCollection,
};