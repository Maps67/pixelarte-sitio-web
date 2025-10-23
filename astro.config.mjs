// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // ===== INICIO DE LA REPARACIÓN CRÍTICA =====
  // Esta línea soluciona el error fatal de /aplicar
  trailingSlash: 'never'
  // ===== FIN DE LA REPARACIÓN CRÍTICA =====
});