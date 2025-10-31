// astro.config.mjs
import { defineConfig } from 'astro/config';
import satori from 'astro-satori'; // 1. IMPORTAR LA INTEGRACIÓN

export default defineConfig({
  site: 'https://pixelartestudio.art',
  // output: 'static', // 'static' es el modo por defecto, no es necesario declararlo.
  trailingSlash: 'always',
  
  // 2. ACTIVAR LA INTEGRACIÓN
  integrations: [
    satori() 
  ]
});