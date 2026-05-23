#!/usr/bin/env python3
"""Generate locale pack files from en.json with professional machine translation."""
import json
import re
import time
from pathlib import Path

from deep_translator import GoogleTranslator

DIR = Path(__file__).parent
EN_PATH = DIR / "en.json"
PARTIAL_DE = DIR / "de.json"

LANGS = {
    "de": "de",
    "da": "da",
    "no": "no",
    "sv": "sv",
}

# Preserve tokens during translation
PLACEHOLDERS = [
    ("TheBeeBaby", "⟦TB⟧"),
    ("Thebeebaby", "⟦TB⟧"),
    ("thebeebaby.com", "⟦URL⟧"),
    ("Dahuss Homes", "⟦DH⟧"),
    ("Dahuss", "⟦DH⟧"),
    ("Retórica", "⟦RT⟧"),
    ("Retorica", "⟦RT⟧"),
    ("Florería El Nuevo Pensamiento", "⟦FL⟧"),
    ("Floreria El Nuevo Pensamiento", "⟦FL⟧"),
    ("Andrés Irigoyen", "⟦AI⟧"),
    ("Andres Irigoyen", "⟦AI⟧"),
    ("María López", "⟦ML⟧"),
    ("Carlos Ramírez", "⟦CR⟧"),
    ("andresirigoyen", "⟦HANDLE⟧"),
    ("IrigoyenDev", "⟦ID⟧"),
    ("FEST", "⟦FEST⟧"),
    ("SOCIAL", "⟦SOCIAL⟧"),
    ("PROM", "⟦PROM⟧"),
    ("NODO", "⟦NODO⟧"),
    ("VENUES", "⟦VENUES⟧"),
    ("WhatsApp", "⟦WA⟧"),
    ("Google Maps", "⟦GM⟧"),
    ("Open Graph", "⟦OG⟧"),
    ("ES/EN", "⟦ESEN⟧"),
    ("Astro", "⟦ASTRO⟧"),
    ("Tailwind", "⟦TW⟧"),
    ("JavaScript", "⟦JS⟧"),
    ("Vanilla JavaScript", "⟦VJS⟧"),
    ("Stack", "⟦STACK⟧"),
    ("CDN", "⟦CDN⟧"),
    ("SEO", "⟦SEO⟧"),
    ("NAP", "⟦NAP⟧"),
    ("FAQ", "⟦FAQ⟧"),
    ("Instagram", "⟦IG⟧"),
    ("Valparaíso", "⟦VAL⟧"),
    ("$1,500 - $3,000 USD", "⟦B2⟧"),
    ("$3,000 - $10,000 USD", "⟦B3⟧"),
    ("More than $10,000 USD", "⟦B4⟧"),
    ("Full-Stack Developer", "⟦FSD⟧"),
    ("Full-Stack", "⟦FS⟧"),
    ("Full-stack", "⟦FSL⟧"),
    ("🗓️", "⟦CAL⟧"),
]

RESTORE = {v: k for k, v in PLACEHOLDERS}

# Manual overrides for German (preserve good partial strings + tone fixes)
DE_OVERRIDES = {
    "nav.projects": "Kundenergebnisse",
    "nav.contact": "Angebot anfordern",
    "hero.title": "Ich entwickle Webprodukte, die Besucher zu zahlenden Kunden machen.",
    "hero.desc": "Full-Stack-Partner für Marken, die E-Commerce, verkaufsstarke Landing Pages und Business-Plattformen brauchen—schnell geliefert, skalierbar und umsatzbereit. Entdecken Sie unten echte Projekte und messbare Ergebnisse.",
    "about.title": "Warum Unternehmen mich beauftragen",
    "about.desc": "Ich entwickle digitale Produkte, die als Wachstumsmotoren funktionieren. Ich liefere nicht nur Code—ich baue Technologie mit Fokus auf messbare Ergebnisse. Von Online-Shops bis zu komplexen Managementsystemen—jedes Projekt verfolgt drei klare Ziele: mehr Umsatz, automatisierte Abläufe und geringere Kosten.",
    "tools.title": "Enterprise-Stack. Startup-Geschwindigkeit am Markt.",
    "projects.title": "Echte Projekte. Echte Geschäftsergebnisse.",
    "projects.subtitle": "E-Commerce, Plattformen und Landing Pages—entwickelt für Umsatzwachstum und Lead-Generierung.",
    "project.view": "Geschäftlichen Impact ansehen",
    "contact.title": "Bereit, Ihr Geschäft online zu skalieren?",
    "contact.desc": "Beschreiben Sie Ihr Projekt und erhalten Sie innerhalb von 48 Stunden einen klaren Plan, Zeitrahmen und Kostenschätzung. Neue Kundenprojekte willkommen.",
    "footer": "© 2026 IrigoyenDev. Webprodukte, die performen und konvertieren.",
    "form.message": "Erzählen Sie mir von Ihrem Projekt",
    "form.emailPh": "sie@unternehmen.de",
    "form.messagePh": "Was möchten Sie bauen? Ziele, Zeitrahmen, Budgetrahmen...",
    "form.submit": "Projektplan anfordern",
    "form.error": "Etwas ist schiefgelaufen. Bitte erneut versuchen oder schreiben Sie mir direkt per E-Mail.",
    "form.success": "Nachricht erhalten. Ich melde mich innerhalb von 48 Stunden.",
    "common.role": "Rolle: Full-Stack-Entwickler",
    "common.back": "Zurück zu Projekten",
    "cta.inline": "Ähnliche Ergebnisse für Ihr Unternehmen? Angebot anfordern →",
    "cta.more": "Weitere Kundenergebnisse ansehen",
    "about.card.status": "Verfügbar für Projekte",
    "about.card.btn": "Kontakt aufnehmen",
    "cta.calendly": "Kurzes Gespräch buchen (15 Min.) 🗓️",
}


def load_en_order():
    raw = EN_PATH.read_text(encoding="utf-8")
    order = re.findall(r'^\s*"([^"]+)":', raw, re.MULTILINE)
    data = json.loads(raw)
    return order, data


def shield(text: str) -> str:
    out = text
    for orig, ph in PLACEHOLDERS:
        out = out.replace(orig, ph)
    return out


def unshield(text: str) -> str:
    out = text
    for ph, orig in RESTORE.items():
        out = out.replace(ph, orig)
    return out


def translate_text(text: str, target: str, retries: int = 4) -> str:
    if not text.strip():
        return text
    shielded = shield(text)
    for attempt in range(retries):
        try:
            result = GoogleTranslator(source="en", target=target).translate(shielded)
            if result:
                return unshield(result)
        except Exception as exc:
            if attempt == retries - 1:
                raise exc
            time.sleep(1.5 * (attempt + 1))
    return text


def build_pack(lang_code: str, target: str, en_data: dict, order: list) -> dict:
    overrides = DE_OVERRIDES if lang_code == "de" else {}
    pack = {}
    translator_cache = {}

    for i, key in enumerate(order):
        if key in overrides:
            pack[key] = overrides[key]
            continue
        src = en_data[key]
        if src in translator_cache:
            pack[key] = translator_cache[src]
            continue
        translated = translate_text(src, target)
        translator_cache[src] = translated
        pack[key] = translated
        if (i + 1) % 10 == 0:
            print(f"  {lang_code}: {i + 1}/{len(order)}")
            time.sleep(0.15)

    return pack


def main():
    order, en_data = load_en_order()
    print(f"Source keys: {len(order)}")

    for lang_code, target in LANGS.items():
        print(f"Translating {lang_code}...")
        pack = build_pack(lang_code, target, en_data, order)
        out = DIR / f"_pack-{lang_code}.json"
        out.write_text(json.dumps(pack, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"Wrote {out} ({len(pack)} keys)")

    print("Done.")


if __name__ == "__main__":
    main()
