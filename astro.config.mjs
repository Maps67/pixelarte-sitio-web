// astro.config.mjs
import { defineConfig } from 'astro/config';

// NO MÁS satori, NO MÁS adapter
export default defineConfig({
  // Esta es la única línea que necesitamos para el layout
  site: 'https://pixelartestudio.art',
  trailingSlash: 'always',
});