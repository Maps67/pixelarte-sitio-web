// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  trailingSlash: 'always',

  // ===== INICIO DE LA REPARACIÓN CRÍTICA (FINAL) =====
  // Le decimos a Astro que incluya explícitamente estas páginas,
  // ya que no puede descubrirlas siguiendo los enlaces <a>.
  // Esto soluciona el 404 de las páginas huérfanas.
  vite: {
    build: {
      rollupOptions: {
        input: [
          '/src/pages/aplicar.astro',
          '/src/pages/gracias.astro'
        ]
      }
    }
  }
  // ===== FIN DE LA REPARACIÓN CRÍTICA =====
});