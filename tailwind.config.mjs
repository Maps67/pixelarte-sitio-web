/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './src/pages/*.{astro,js,ts}' // RUTA REFORZADA
  ],
  // ESTO ES LA SOLUCIÓN NUCLEAR:
  safelist: [
    'bg-slate-900',
    'bg-slate-50',
    'text-white',
    'text-slate-900',
    'text-slate-300',
    'w-12',
    'h-12',
    'p-8',
    'grid',
    'md:grid-cols-3'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}