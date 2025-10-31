// src/pages/api/og/[slug].png.ts
import type { APIRoute } from 'astro';
import { getCollection, getEntryBySlug } from 'astro:content';
import { satori } from 'astro:satori'; // Este import AHORA SÍ funcionará
import { html } from 'satori-html';
import sharp from 'sharp';
import BlogOGImage from '../../../components/BlogOGImage.astro';

import { readFileSync } from 'fs';
import { resolve } from 'path';

export const prerender = true; // <-- AÑADIDO

// 1. getStaticPaths: Le dice a Astro qué imágenes generar en el build
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.slug },
  }));
}

function readFont(fontName: string): ArrayBuffer {
  const fontPath = resolve(process.cwd(), `public/fonts/${fontName}`);
  return readFileSync(fontPath);
}

// 2. La función GET ahora se ejecuta en el build para cada slug
export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug;
  if (!slug) {
    return new Response('Slug no encontrado', { status: 404 });
  }

  const post = await getEntryBySlug('blog', slug);
  if (!post) {
    return new Response(`Post no encontrado: ${slug}`, { status: 404 });
  }

  const playfairData = readFont('PlayfairDisplay-Bold.ttf');
  const interData = readFont('Inter-Regular.ttf');

  const markup = html((await BlogOGImage({ title: post.data.title })).toString());

  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Playfair Display', data: playfairData, weight: 700, style: 'normal' },
      { name: 'Inter', data: interData, weight: 400, style: 'normal' },
    ],
  });

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=604800, immutable',
    },
  });
};