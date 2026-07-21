# Regional landings (Chile)

**Source of truth:** `data/geo-config.json` (not this folder alone). Legacy JSON may still exist for sync.

## Add a region

1. Append an entry to `data/geo-config.json` with unique `path`, coords, NAP, ≥3 FAQs.
2. Optionally extend packs in `scripts/enrich-geo-entities.mjs`.
3. `npm run enrich:geo` (optional) → `npm run build:geo` → `npm run build:sitemap` → `npm run audit:geo`

## Google Business Profile (manual — not code)

For passive local discovery without inventing fake offices:

1. Open Google Business Profile → set business as **Service-area business** (no storefront required).
2. Add service areas: Región Metropolitana, Valparaíso, Biobío, Antofagasta (and others as you grow).
3. Categories: e.g. “Software company” / “Website designer” as appropriate.
4. Link website to https://www.irigoyendev.com and regional landings in description/posts.
5. Keep NAP **identical** to `scripts/lib/entity-nap.mjs`: IrigoyenDev · +45 50 24 98 55 · andres@irigoyendev.com.

Do **not** publish a street address in a city where you do not operate a real office.
