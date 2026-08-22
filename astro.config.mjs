// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind'; // <--- OJO AQUÍ: Ya no usa @tailwindcss/vite

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://pixelartestudio.art',
  trailingSlash: 'always',
  
  // AHORA DEBE ESTAR EN INTEGRATIONS, NO EN VITE:
  integrations: [tailwind(), sitemap()], 
});