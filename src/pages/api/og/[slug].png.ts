// src/pages/api/og/[slug].png.ts
import type { APIRoute } from 'astro';
import { getEntryBySlug } from 'astro:content';
import { satori } from 'astro:satori';
import { html } from 'satori-html';
import sharp from 'sharp';
import BlogOGImage from '../../../components/BlogOGImage.astro';

// ===== INICIO DE LA CORRECCIÓN v3 (Síncrono) =====
import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * Lee un archivo de fuente desde la carpeta /public/ de forma síncrona.
 * Resuelve la ruta desde la raíz del proyecto.
 */
function readFont(fontName: string): ArrayBuffer {
  // process.cwd() nos da la raíz del proyecto
  const fontPath = resolve(process.cwd(), `public/fonts/${fontName}`);
  return readFileSync(fontPath);
}
// ===== FIN DE LA CORRECCIÓN v3 =====

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug;
  if (!slug) {
    return new Response('Slug no encontrado', { status: 404 });
  }

  const post = await getEntryBySlug('blog', slug);
  if (!post) {
    return new Response(`Post no encontrado: ${slug}`, { status: 404 });
  }

  // Cargar fuentes usando la función SÍNCRONA (ya no se usa await/Promise.all)
  const playfairData = readFont('PlayfairDisplay-Bold.ttf');
  const interData = readFont('Inter-Regular.ttf');

  // Renderizar componente a HTML
  const markup = html((await BlogOGImage({ title: post.data.title })).toString());

  // Generar SVG
  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Playfair Display', data: playfairData, weight: 700, style: 'normal' },
      { name: 'Inter', data: interData, weight: 400, style: 'normal' },
    ],
  });

  // Convertir SVG a PNG
  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  // Devolver la imagen PNG
  return new Response(png, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=604800, immutable', // Cache por 1 semana
    },
  });
};