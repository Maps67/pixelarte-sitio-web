// astro.config.mjs
import { defineConfig } from 'astro/config';
import satori from 'astro-satori'; // 1. IMPORTAR LA INTEGRACIÓN

export default defineConfig({
  site: 'https://pixelartestudio.art',
  // output: 'static', // 'static' es el modo por defecto. Lo dejamos así.
  trailingSlash: 'always',
  
  // 2. ACTIVAR LA INTEGRACIÓN (Esto es lo que falta)
  integrations: [
    satori() 
  ]
});