// astro.config.mjs
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// Esta es la configuración estable y final
export default defineConfig({
  site: 'https://pixelartestudio.art',
  trailingSlash: 'always',

  vite: {
    plugins: [tailwindcss()],
  },
});