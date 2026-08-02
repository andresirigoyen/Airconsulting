# Geo pages — master config

## Dónde vive la verdad

| Archivo | Rol |
|---------|-----|
| **`data/geo-config.json`** | **Configuración maestra** (única fuente para el template) |
| `scripts/lib/geo-config.mjs` | Loader + validación + `getGeoBySlug` / 404 de slug |
| `scripts/build-geo-pages.mjs` | **Plantilla** (Factory): genera HTML estático |
| `scripts/sync-geo-config.mjs` | Opcional: regenera geo-config desde JSON legacy |

## Esto no es Next.js

El sitio es HTML estático en Vercel. El equivalente a `app/[slug]/page.tsx` es:

```text
geo-config.json  →  build-geo-pages.mjs  →  *.html en CDN
```

- **Performance:** el JSON se lee **una vez en build** (constante en memoria del script). Cero consultas en request → TTFB = CDN.
- **Canonical + LocalBusiness:** inyectados por entrada en el `<head>` (`geo`, `areaServed`, `telephone`, `priceRange`, Offer catalog).
- **NAP único:** `scripts/lib/entity-nap.mjs` — mismo nombre/teléfono/email en schema y FAQs (alinear con Google Business Profile).
- **FAQs + temas semánticos:** `npm run enrich:geo` escribe packs únicos por comuna/región (sin keyword stuffing).
- **Breadcrumbs:** HTML visible + `BreadcrumbList` JSON-LD (silo Home → Chile → Santiago → comuna).
- **Slug inválido:** no se genera HTML → Vercel responde **`404.html`** (no página en blanco).

## Mercado

**Solo Chile (`es-CL`).** No hay markets NO/ES/DK. Hubs `/en`, `/da`, `/es` y presence ES/DK redirigen a `/` o `/chile`.

## Campos obligatorios por entrada

`slug`, `city`, `region`, `countryCode`, `type`, `metaTitle`, `metaDescription`, `h1Title`, `contentSummary`, `localBusinessSchema`

**No uses `content.lead`** — está prohibido (usa solo `contentSummary`). El build aborta con `GEO_DEPRECATED_LEAD` si aparece.

Para **comuna** y **región**: `latitude`/`longitude`, `telephone`, `priceRange`, `addressLocality`/`addressRegion`/`addressCountry` (= `countryCode`), y `content.faq` con ≥3 Q&As únicas.

También validados: `type`, `countryCode` ∈ `markets[]`, `parentSlug` mismo país, hubPath del market si hay páginas.

**Keyword aliases (CL comunas):** `build:geo` escribe rewrites en `vercel.json` para:

- `/desarrollo-web-en-{slug}` → `/santiago/{slug}`
- `/agencia-web-en-{slug}` → `/santiago/{slug}`

La canónica y el sitemap siguen siendo el silo `/santiago/...`. No dupliques HTML a mano.

## Comandos

```bash
# Normalizar NAP + FAQs/temas únicos (opcional pero recomendado tras editar packs)
npm run enrich:geo

# Fuente de verdad = data/geo-config.json (recomendado)
npm run build:geo
npm run build:sitemap
npm run audit:geo

# Solo si migras desde data/locations + data/regions (pisa geo-config)
npm run sync:geo
npm run build:geo:from-legacy
```

**Importante:** `build:geo` **no** ejecuta sync. Así Oslo/Moss en `geo-config.json` no se borran en cada deploy.

## Autoridad externa (manual)

1. Google Business Profile: mismo NAP que `entity-nap.mjs`; enlace al sitio y fotos/actualizaciones.
2. Backlinks locales (cámaras, prensa, partners Santiago/Oslo) como votos de confianza.
3. Tras cada build: `npm run audit:geo`.
