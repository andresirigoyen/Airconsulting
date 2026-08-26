/**
 * Vercel Edge Middleware — Accept: text/markdown content negotiation (acceptmarkdown.com).
 * Serves /agent/*.md with Content-Type text/markdown and Vary: Accept.
 */
import { next } from '@vercel/edge';

const MD_MAP = {
  '/': 'home.md',
  '/index': 'home.md',
  '/precios': 'precios.md',
  '/servicios': 'servicios.md',
  '/crear-tienda-online': 'crear-tienda-online.md',
  '/landing-pages': 'landing-pages.md',
  '/tiendas': 'crear-tienda-online.md',
  '/about': 'about.md',
  '/santiago/las-condes': 'las-condes.md',
  '/contacto': 'contact.md',
  '/contact': 'contact.md',
  '/privacy': 'privacy.md',
  '/privacidad': 'privacy.md',
};

const STATIC_EXT =
  /\.(?:js|css|png|jpe?g|webp|gif|svg|ico|woff2?|ttf|map|xml|txt|json|webmanifest|mp4|webm|md)$/i;

function wantsMarkdown(accept) {
  if (!accept || !/\btext\/markdown\b/i.test(accept)) return false;
  const mdMatch = accept.match(/text\/markdown\s*(?:;\s*q=([0-9.]+))?/i);
  const htmlMatch = accept.match(/text\/html\s*(?:;\s*q=([0-9.]+))?/i);
  const mdQ = mdMatch ? (mdMatch[1] !== undefined ? Number(mdMatch[1]) : 1) : 0;
  const htmlQ = htmlMatch ? (htmlMatch[1] !== undefined ? Number(htmlMatch[1]) : 1) : 0;
  if (htmlMatch && htmlQ > mdQ) return false;
  return true;
}

function markdownResponse(body, status = 200) {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Vary: 'Accept, Accept-Encoding',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

export default async function middleware(request) {
  const url = new URL(request.url);
  const { pathname } = url;

  if (
    STATIC_EXT.test(pathname) ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/agent/')
  ) {
    return next();
  }

  const accept = request.headers.get('accept') || '';
  if (!wantsMarkdown(accept)) {
    const res = next();
    res.headers.set('Vary', 'Accept, Accept-Encoding');
    return res;
  }

  const key = pathname.replace(/\/$/, '') || '/';
  const file = MD_MAP[key];
  const origin = url.origin;

  if (file) {
    try {
      const res = await fetch(`${origin}/agent/${file}`);
      if (res.ok) return markdownResponse(await res.text(), 200);
    } catch {
      /* fall through */
    }
  }

  try {
    const res = await fetch(`${origin}/agent/404.md`);
    if (res.ok) return markdownResponse(await res.text(), 404);
  } catch {
    /* ignore */
  }

  return markdownResponse(
    `# 404 — IrigoyenDev\n\nPath not found.\n\n- [llms.txt](${origin}/llms.txt)\n- [Sitemap](${origin}/sitemap.xml)\n- [Home](${origin}/)\n`,
    404
  );
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/|css/|js/|locales/).*)'],
};
