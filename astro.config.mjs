// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://pixelartestudio.art', // <-- ESTA LÍNEA REPARA EL ERROR
  // output: 'static', (es el modo por defecto)
  trailingSlash: 'always',
  // Eliminamos 'integrations' y 'adapter' (esto es correcto)
});