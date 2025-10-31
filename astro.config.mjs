// astro.config.mjs
import { defineConfig } from 'astro/config';

// NO importamos 'satori'
// NO importamos 'netlify' (usaremos el modo estático)

export default defineConfig({
  site: 'https://pixelartestudio.art',
  // output: 'static', // 'static' es el modo por defecto, no es necesario declararlo.
  trailingSlash: 'always',
  
  // Eliminamos el array de 'integrations' que contenía satori()
});