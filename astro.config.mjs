// astro.config.mjs
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import satori from 'astro-satori'; // <-- 1. IMPORTAR LA INTEGRACIÓN

export default defineConfig({
  site: 'https://pixelartestudio.art',
  output: 'server', 
  adapter: netlify(),
  trailingSlash: 'always',
  
  // ===== INICIO DE LA REPARACIÓN DEFINITIVA =====
  integrations: [
    satori() // <-- 2. ACTIVAR LA INTEGRACIÓN
  ]
  // ===== FIN DE LA REPARACIÓN DEFINITIVA =====
});