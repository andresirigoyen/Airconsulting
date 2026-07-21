/**
 * Blog factory — informational SEO content from data/blog/posts.json
 * All article copy lives in JSON (no hardcoded post bodies here).
 *
 * Run: node scripts/build-blog.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SITE,
  escapeHtml,
  escapeAttr,
  buildHead,
  renderPage,
} from './lib/page-chrome.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataFile = path.join(root, 'data', 'blog', 'posts.json');

/**
 * @param {object} block
 */
function renderBlock(block) {
  if (block.type === 'h2') return `<h2>${escapeHtml(block.text)}</h2>`;
  if (block.type === 'p') return `<p>${escapeHtml(block.text)}</p>`;
  if (block.type === 'ul' && Array.isArray(block.items)) {
    return `<ul class="project-results-list">${block.items.map((i) => `<li>${escapeHtml(i)}</li>`).join('')}</ul>`;
  }
  return '';
}

function main() {
  const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  const outDir = path.join(root, 'blog');
  fs.mkdirSync(outDir, { recursive: true });

  const hub = data.hub;
  const cards = data.posts
    .map(
      (p) => `
            <article class="location-card">
                <p class="location-card__eyebrow"><time datetime="${escapeAttr(p.date)}">${escapeHtml(p.date)}</time></p>
                <h3><a href="/blog/${escapeAttr(p.slug)}">${escapeHtml(p.content.title)}</a></h3>
                <p>${escapeHtml(p.content.excerpt)}</p>
                <a href="/blog/${escapeAttr(p.slug)}" class="project-link">Leer artículo →</a>
            </article>`
    )
    .join('\n');

  const hubMain = `
    <main id="main-content">
    <header class="project-header container fade-in">
        <a href="/chile" class="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span>Chile</span>
        </a>
        <p class="project-eyebrow">${escapeHtml(hub.content.eyebrow)}</p>
        <h1>${escapeHtml(hub.content.h1)}</h1>
        <p class="project-lead">${escapeHtml(hub.content.lead)}</p>
    </header>
    <div class="container">
        <section class="project-section fade-in">
            <div class="location-grid">${cards}</div>
        </section>
    </div>
    </main>`;

  const hubHead = buildHead({
    title: hub.seo.metaTitle,
    description: hub.seo.metaDescription,
    ogTitle: hub.seo.ogTitle,
    ogDescription: hub.seo.ogDescription,
    canonicalPath: '/blog',
    hreflang: 'es-CL',
    geoRegion: 'CL',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: hub.seo.metaTitle,
        url: `${SITE}/blog`,
        description: hub.seo.metaDescription,
        publisher: { '@id': `${SITE}/#business` },
      },
    ],
  });

  // /blog → blog.html at root works with cleanUrls; also write blog/index.html for folder URLs
  const hubHtml = renderPage({ headHtml: hubHead, mainHtml: hubMain });
  fs.writeFileSync(path.join(root, 'blog.html'), hubHtml, 'utf8');
  fs.writeFileSync(path.join(outDir, 'index.html'), hubHtml, 'utf8');
  console.log('Wrote blog.html + blog/index.html');

  for (const post of data.posts) {
    const body = (post.content.body || []).map(renderBlock).join('\n            ');
    const main = `
    <main id="main-content">
    <article class="container">
    <header class="project-header fade-in">
        <a href="/blog" class="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span>Blog</span>
        </a>
        <p class="project-eyebrow"><time datetime="${escapeAttr(post.date)}">${escapeHtml(post.date)}</time>
          ${(post.content.regions || []).map((r) => ` · ${escapeHtml(r)}`).join('')}</p>
        <h1>${escapeHtml(post.content.title)}</h1>
        <p class="project-lead">${escapeHtml(post.content.excerpt)}</p>
    </header>
    <div class="project-section content-block fade-in blog-article">
            ${body}
            <p class="location-outro" style="margin-top:2rem">
                <a href="${escapeAttr(post.content.ctaHref)}">${escapeHtml(post.content.ctaLabel)}</a>
                ·
                <a href="/#contact">Solicitar plan de proyecto</a>
            </p>
    </div>
    </article>
    </main>`;

    const head = buildHead({
      title: post.seo.metaTitle,
      description: post.seo.metaDescription,
      ogTitle: post.seo.ogTitle,
      ogDescription: post.seo.ogDescription,
      canonicalPath: `/blog/${post.slug}`,
      hreflang: 'es-CL',
      geoRegion: 'CL',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.content.title,
          datePublished: post.date,
          description: post.seo.metaDescription,
          url: `${SITE}/blog/${post.slug}`,
          author: { '@id': `${SITE}/#person` },
          publisher: { '@id': `${SITE}/#business` },
          mainEntityOfPage: `${SITE}/blog/${post.slug}`,
        },
      ],
    });

    fs.writeFileSync(
      path.join(outDir, `${post.slug}.html`),
      renderPage({ headHtml: head, mainHtml: main }),
      'utf8'
    );
    console.log('Wrote', `blog/${post.slug}.html`);
  }
}

main();
