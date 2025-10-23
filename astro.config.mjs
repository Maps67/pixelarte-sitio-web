// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  // El adaptador de Netlify gestiona esto.
  // Es posible que el instalador haya añadido "output: 'server'" o "output: 'hybrid'", 
  // lo cual es correcto. Si no, el adaptador lo manejará.
  output: 'server', 
  
  // El adaptador oficial que repara las rutas 404
  adapter: netlify(),

  // Mantenemos esta regla para consistencia
  trailingSlash: 'always',
});