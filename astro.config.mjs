// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://pixelartestudio.art',
  // 'static' es el modo por defecto.
  trailingSlash: 'always',
  // Eliminamos 'integrations' y 'adapter'
});