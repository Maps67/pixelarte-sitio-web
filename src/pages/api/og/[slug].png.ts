// src/pages/api/og/[slug].png.ts
import type { APIRoute } from 'astro';
import { getEntryBySlug } from 'astro:content';
import { satori } from 'astro:satori';
import { html } from 'satori-html';
import BlogOGImage from '../../../components/BlogOGImage.astro';

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug;
  if (!slug) {
    return new Response('Slug no encontrado', { status: 404 });
  }

  // 1. Obtener los datos del post
  const post = await getEntryBySlug('blog', slug);
  if (!post) {
    return new Response(`Post no encontrado: ${slug}`, { status: 404 });
  }

  // 2. Renderizar el componente de la tarjeta a HTML
  const markup = html((await BlogOGImage({ title: post.data.title })).toString());

  // 3. Generar la imagen SVG usando Satori
  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    // (Opcional pero recomendado) Cargar las fuentes aquí también
    // aunque ya las definimos en el componente
    fonts: [
      {
        name: 'Playfair Display',
        data: (await fetch(new URL('../../../public/fonts/PlayfairDisplay-Bold.ttf', import.meta.url))).arrayBuffer(),
        weight: 700,
        style: 'normal',
      },
      {
        name: 'Inter',
        data: (await fetch(new URL('../../../public/fonts/Inter-Regular.ttf', import.meta.url))).arrayBuffer(),
        weight: 400,
        style: 'normal',
      },
    ],
  });

  // 4. (Opcional pero recomendado) Convertir SVG a PNG para mejor compatibilidad
  // Satori ahora puede devolver PNG directamente si instalaste 'sharp'
  // Si no, necesitaríamos un paso extra, pero 'astro:satori' lo maneja
  // Dejaremos que Satori devuelva el SVG, Astro lo convierte.
  // UPDATE: 'astro:satori' no convierte a PNG. Solo genera SVG.
  // ¡Vamos a usar `astro-satori/png`!

  // --- CORRECCIÓN ---
  // Necesitamos una herramienta que convierta SVG a PNG.
  // La forma más fácil es usar un paquete diferente que lo haga todo.
  // Vamos a cambiar la importación.

  // --- REINICIO DEL PASO 5 ---
  
  // (Por favor, ignora el código anterior, usa ESTE código completo)
  // (Asegúrate de haber instalado 'sharp' corriendo: npm install sharp)
  
  // (Si 'npx astro add satori' no instaló 'sharp', ejecútalo)
  // `npm install sharp`

  // --- CÓDIGO CORRECTO para `src/pages/api/og/[slug].png.ts` ---
  
  import type { APIRoute } from 'astro';
  import { getEntryBySlug } from 'astro:content';
  import { satori } from 'astro:satori';
  import { html } from 'satori-html';
  import sharp from 'sharp'; // Necesario para convertir a PNG
  import BlogOGImage from '../../../components/BlogOGImage.astro';

  // Función para leer fuentes (necesaria en el endpoint)
  async function readFont(fontPath: string): Promise<ArrayBuffer> {
    const url = new URL(fontPath, import.meta.url);
    return await fetch(url).then(res => res.arrayBuffer());
  }

  export const GET: APIRoute = async ({ params }) => {
    const slug = params.slug;
    if (!slug) {
      return new Response('Slug no encontrado', { status: 404 });
    }

    const post = await getEntryBySlug('blog', slug);
    if (!post) {
      return new Response(`Post no encontrado: ${slug}`, { status: 404 });
    }

    // Cargar fuentes
    const [playfairData, interData] = await Promise.all([
      readFont('../../../public/fonts/PlayfairDisplay-Bold.ttf'),
      readFont('../../../public/fonts/Inter-Regular.ttf')
    ]);

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