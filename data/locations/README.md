# Location pages (geo / comunas)

**Source of truth:** JSON files in this folder — never hardcode comuna copy in HTML or React components.

## Add a comuna (Santiago)

1. Edit `santiago.json` → push a new object into `comunas[]`.
2. Required fields: `slug`, `name`, `seo.metaTitle`, `seo.metaDescription`, `content.h1`, `content.lead`, `content.localAngle`.
3. Write **unique** `h1` / `lead` / `localAngle` (duplicate titles fail the build validator).
4. Run:

```bash
npm run build:seo
npm run audit:locations
```

## Add a new city (e.g. Valparaíso)

1. Copy `santiago.json` → `valparaiso.json`.
2. Change `city.slug`, names, geo, hub copy, and comunas.
3. Run `npm run build:seo` — the factory discovers every `*.json` here.

## URL shape

| Data | Output file | Public URL |
|------|-------------|------------|
| `city.slug: santiago` | `santiago.html` | `/santiago` |
| `comunas[].slug: las-condes` | `santiago/las-condes.html` | `/santiago/las-condes` |

HTML is generated at **build time** (static on the CDN) so location data does not affect TTFB.
