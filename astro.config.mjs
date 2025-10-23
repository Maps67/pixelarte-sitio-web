// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // ===== INICIO DE LA REPARACIÓN CRÍTICA (FINAL) =====
  // Le decimos a Astro que SIEMPRE use una barra al final
  // Esto alinea Astro con el comportamiento de Netlify "Pretty URLs"
  trailingSlash: 'always'
  // ===== FIN DE LA REPARACIÓN CRÍTICA =====
});