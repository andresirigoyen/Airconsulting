/**
 * i18n for pages/cotizacion.html + locale keys (quote template).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = path.join(root, 'pages', 'cotizacion.html');

const keys = {
  es: {
    'quote.metaTitle': 'Cotización - Servicio Google Play Console',
    'quote.brandTitle': 'Cotización de Servicio',
    'quote.brandSubtitle': 'Publicación & Resolución de Bloqueo',
    'quote.meta.client': 'Cliente:',
    'quote.meta.provider': 'Proveedor:',
    'quote.meta.date': 'Fecha:',
    'quote.s1.title': 'Descripción del Servicio',
    'quote.s1.lead':
      'Servicio integral de revisión, diagnóstico y resolución de bloqueo en Google Play Console, abarcando las siguientes acciones:',
    'quote.s1.i1': 'Acceso y análisis detallado del estado del release en Google Play Console.',
    'quote.s1.i2': 'Identificación de errores de configuración en el flujo de publicación.',
    'quote.s1.i3': 'Creación y configuración de un nuevo release correcto en caso de bloqueo.',
    'quote.s1.i4Html':
      'Subida y validación técnica del archivo en formato <strong>.AAB</strong> (Android App Bundle).',
    'quote.s1.i5': 'Publicación en el track correspondiente (Testing interno/cerrado o Producción).',
    'quote.s1.i6':
      'Seguimiento hasta asegurar el correcto estado final y disponibilidad de la app en la Play Store.',
    'quote.s2.title': 'Entregables',
    'quote.s2.i1': 'Aplicación correctamente publicada o actualizada en Google Play Console.',
    'quote.s2.i2': 'Release sin conflictos de bundle ni bloqueos activos.',
    'quote.s2.i3Html':
      'Confirmación de estado <strong>“Activo”</strong> o <strong>“En revisión”</strong> limpio en el track acordado.',
    'quote.s3.title': 'Plazo de Ejecución',
    'quote.s3.time': 'Hasta 24 horas',
    'quote.s3.lead': 'A partir de la recepción conforme de:',
    'quote.s3.i1': 'Acceso a Google Play Console',
    'quote.s3.i2': 'Archivo .AAB correspondiente',
    'quote.s4.title': 'Valor del Servicio',
    'quote.s4.label': 'Inversión Total',
    'quote.s4.words': 'ciento veinte mil pesos chilenos',
    'quote.s5.title': 'Condiciones de Pago',
    'quote.s5.step1': 'Al inicio del trabajo',
    'quote.s5.step2': 'Al completar publicación',
    'quote.s6.title': 'Observaciones',
    'quote.s6.text':
      'El servicio contratado corresponde exclusivamente a la gestión de publicación y resolución de configuraciones de la plataforma Google Play Console. No incluye labores de desarrollo de software, corrección de bugs, ni modificaciones al código fuente original de la aplicación.',
    'quote.sig.provider': 'Prestador del Servicio',
    'quote.sig.role': 'Consultor & Desarrollador',
    'quote.sig.client': 'Aceptado por el Cliente: _______________________',
    'quote.footer':
      'Documento generado el 27 de mayo de 2026. Vigencia de cotización: 15 días.',
  },
  en: {
    'quote.metaTitle': 'Quote - Google Play Console service',
    'quote.brandTitle': 'Service Quote',
    'quote.brandSubtitle': 'Publishing & Block Resolution',
    'quote.meta.client': 'Client:',
    'quote.meta.provider': 'Provider:',
    'quote.meta.date': 'Date:',
    'quote.s1.title': 'Service Description',
    'quote.s1.lead':
      'End-to-end review, diagnosis and unblock of Google Play Console, covering the following actions:',
    'quote.s1.i1': 'Access and detailed analysis of the release status in Google Play Console.',
    'quote.s1.i2': 'Identification of configuration errors in the publishing flow.',
    'quote.s1.i3': 'Creation and setup of a correct new release if blocked.',
    'quote.s1.i4Html':
      'Upload and technical validation of the <strong>.AAB</strong> file (Android App Bundle).',
    'quote.s1.i5': 'Publishing on the agreed track (internal/closed testing or Production).',
    'quote.s1.i6':
      'Follow-up until the app reaches a correct final state and Play Store availability.',
    'quote.s2.title': 'Deliverables',
    'quote.s2.i1': 'App correctly published or updated in Google Play Console.',
    'quote.s2.i2': 'Release with no bundle conflicts or active blocks.',
    'quote.s2.i3Html':
      'Confirmation of a clean <strong>“Active”</strong> or <strong>“In review”</strong> status on the agreed track.',
    'quote.s3.title': 'Turnaround',
    'quote.s3.time': 'Up to 24 hours',
    'quote.s3.lead': 'Starting from confirmed receipt of:',
    'quote.s3.i1': 'Google Play Console access',
    'quote.s3.i2': 'Corresponding .AAB file',
    'quote.s4.title': 'Service Fee',
    'quote.s4.label': 'Total investment',
    'quote.s4.words': 'one hundred twenty thousand Chilean pesos',
    'quote.s5.title': 'Payment Terms',
    'quote.s5.step1': 'At the start of work',
    'quote.s5.step2': 'Upon completed publication',
    'quote.s6.title': 'Notes',
    'quote.s6.text':
      'This engagement covers only publishing management and Google Play Console configuration issues. It does not include software development, bug fixes, or changes to the app’s original source code.',
    'quote.sig.provider': 'Service Provider',
    'quote.sig.role': 'Consultant & Developer',
    'quote.sig.client': 'Accepted by Client: _______________________',
    'quote.footer':
      'Document issued on 27 May 2026. Quote valid for 15 days.',
  },
  da: {
    'quote.metaTitle': 'Tilbud - Google Play Console-service',
    'quote.brandTitle': 'Servicetilbud',
    'quote.brandSubtitle': 'Publicering & ophævelse af blokering',
    'quote.meta.client': 'Kunde:',
    'quote.meta.provider': 'Leverandør:',
    'quote.meta.date': 'Dato:',
    'quote.s1.title': 'Servicebeskrivelse',
    'quote.s1.lead':
      'Helhedsorienteret gennemgang, diagnose og ophævelse af blokering i Google Play Console, inkl. følgende handlinger:',
    'quote.s1.i1': 'Adgang og detaljeret analyse af release-status i Google Play Console.',
    'quote.s1.i2': 'Identifikation af konfigurationsfejl i publiceringsflowet.',
    'quote.s1.i3': 'Oprettelse og opsætning af en korrekt ny release ved blokering.',
    'quote.s1.i4Html':
      'Upload og teknisk validering af <strong>.AAB</strong>-filen (Android App Bundle).',
    'quote.s1.i5': 'Publicering på det aftalte track (intern/lukket test eller Produktion).',
    'quote.s1.i6':
      'Opfølgning indtil appen har korrekt slutstatus og er tilgængelig i Play Store.',
    'quote.s2.title': 'Leverancer',
    'quote.s2.i1': 'App korrekt publiceret eller opdateret i Google Play Console.',
    'quote.s2.i2': 'Release uden bundle-konflikter eller aktive blokeringer.',
    'quote.s2.i3Html':
      'Bekræftelse af ren status <strong>“Active”</strong> eller <strong>“In review”</strong> på det aftalte track.',
    'quote.s3.title': 'Leveringstid',
    'quote.s3.time': 'Op til 24 timer',
    'quote.s3.lead': 'Fra bekræftet modtagelse af:',
    'quote.s3.i1': 'Adgang til Google Play Console',
    'quote.s3.i2': 'Relevant .AAB-fil',
    'quote.s4.title': 'Pris',
    'quote.s4.label': 'Samlet investering',
    'quote.s4.words': 'hundrede og tyve tusinde chilenske pesos',
    'quote.s5.title': 'Betalingsbetingelser',
    'quote.s5.step1': 'Ved arbejdets start',
    'quote.s5.step2': 'Ved gennemført publicering',
    'quote.s6.title': 'Bemærkninger',
    'quote.s6.text':
      'Ydelsen dækker kun publiceringsstyring og konfiguration i Google Play Console. Den omfatter ikke softwareudvikling, bugfixes eller ændringer i appens originale kildekode.',
    'quote.sig.provider': 'Tjenesteudbyder',
    'quote.sig.role': 'Konsulent & udvikler',
    'quote.sig.client': 'Accepteret af kunden: _______________________',
    'quote.footer':
      'Dokument udstedt 27. maj 2026. Tilbud gyldigt i 15 dage.',
  },
  no: {
    'quote.metaTitle': 'Tilbud - Google Play Console-tjeneste',
    'quote.brandTitle': 'Tjenestetilbud',
    'quote.brandSubtitle': 'Publisering & oppheving av blokkering',
    'quote.meta.client': 'Kunde:',
    'quote.meta.provider': 'Leverandør:',
    'quote.meta.date': 'Dato:',
    'quote.s1.title': 'Tjenestebeskrivelse',
    'quote.s1.lead':
      'Helhetlig gjennomgang, diagnose og oppheving av blokkering i Google Play Console, inkludert følgende handlinger:',
    'quote.s1.i1': 'Tilgang og detaljert analyse av release-status i Google Play Console.',
    'quote.s1.i2': 'Identifisering av konfigurasjonsfeil i publiseringsflyten.',
    'quote.s1.i3': 'Opprettelse og oppsett av en korrekt ny release ved blokkering.',
    'quote.s1.i4Html':
      'Opplasting og teknisk validering av <strong>.AAB</strong>-filen (Android App Bundle).',
    'quote.s1.i5': 'Publisering på avtalt track (intern/lukket testing eller Produksjon).',
    'quote.s1.i6':
      'Oppfølging til appen har korrekt slutstatus og er tilgjengelig i Play Store.',
    'quote.s2.title': 'Leveranser',
    'quote.s2.i1': 'App korrekt publisert eller oppdatert i Google Play Console.',
    'quote.s2.i2': 'Release uten bundle-konflikter eller aktive blokkeringer.',
    'quote.s2.i3Html':
      'Bekreftelse av ren status <strong>“Active”</strong> eller <strong>“In review”</strong> på avtalt track.',
    'quote.s3.title': 'Leveringstid',
    'quote.s3.time': 'Inntil 24 timer',
    'quote.s3.lead': 'Fra bekreftet mottak av:',
    'quote.s3.i1': 'Tilgang til Google Play Console',
    'quote.s3.i2': 'Tilhørende .AAB-fil',
    'quote.s4.title': 'Pris',
    'quote.s4.label': 'Total investering',
    'quote.s4.words': 'hundre og tjue tusen chilenske pesos',
    'quote.s5.title': 'Betalingsvilkår',
    'quote.s5.step1': 'Ved oppstart av arbeidet',
    'quote.s5.step2': 'Ved fullført publisering',
    'quote.s6.title': 'Merknader',
    'quote.s6.text':
      'Tjenesten dekker kun publiseringsstyring og konfigurasjon i Google Play Console. Den inkluderer ikke programvareutvikling, feilretting eller endringer i appens originale kildekode.',
    'quote.sig.provider': 'Tjenesteleverandør',
    'quote.sig.role': 'Konsulent & utvikler',
    'quote.sig.client': 'Akseptert av kunden: _______________________',
    'quote.footer':
      'Dokument utstedt 27. mai 2026. Tilbud gyldig i 15 dager.',
  },
};

// EN interim for remaining langs
for (const lang of ['de', 'fr', 'it', 'pt', 'sv']) {
  keys[lang] = { ...keys.en };
}

for (const [lang, map] of Object.entries(keys)) {
  const localePath = path.join(root, 'locales', `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(localePath, 'utf8'));
  Object.assign(data, map);
  fs.writeFileSync(localePath, `${JSON.stringify(data, null, 2)}\n`);
}

let html = fs.readFileSync(file, 'utf8');

// Ensure html has data-i18n-title and script.js
if (!html.includes('data-i18n-title')) {
  html = html.replace(
    '<html lang="es">',
    '<html lang="es" data-i18n-title="quote.metaTitle">'
  );
}
if (!html.includes('/js/script.js')) {
  html = html.replace(
    '</body>',
    '  <script defer src="/js/script.js"></script>\n</body>'
  );
}
html = html.replace(
  '<title>Cotización - Servicio Google Play Console</title>',
  '<title data-i18n="quote.metaTitle">Cotización - Servicio Google Play Console</title>'
);

const replacements = [
  ['<h1 class="brand-title">Cotización de Servicio</h1>', '<h1 class="brand-title" data-i18n="quote.brandTitle">Cotización de Servicio</h1>'],
  ['<div class="brand-subtitle">Publicación & Resolución de Bloqueo</div>', '<div class="brand-subtitle" data-i18n="quote.brandSubtitle">Publicación & Resolución de Bloqueo</div>'],
  ['<span class="meta-label">Cliente:</span>', '<span class="meta-label" data-i18n="quote.meta.client">Cliente:</span>'],
  ['<span class="meta-label">Proveedor:</span>', '<span class="meta-label" data-i18n="quote.meta.provider">Proveedor:</span>'],
  ['<span class="meta-label">Fecha:</span>', '<span class="meta-label" data-i18n="quote.meta.date">Fecha:</span>'],
];

// Section titles - careful with numbered icons
html = html.replace(
  /Descripción del Servicio\s*<\/h2>/,
  '<span data-i18n="quote.s1.title">Descripción del Servicio</span>\n        </h2>'
);
// Fix if we broke structure - read after

fs.writeFileSync(file, html);
console.log('Locale keys written. HTML lightly patched — applying structured body patch…');

// Full structured rewrite of body text nodes via one targeted template
html = fs.readFileSync(file, 'utf8');

const bodyMain = `    <header>
      <div>
        <h1 class="brand-title" data-i18n="quote.brandTitle">Cotización de Servicio</h1>
        <div class="brand-subtitle" data-i18n="quote.brandSubtitle">Publicación & Resolución de Bloqueo</div>
      </div>
      <div class="meta-box">
        <div class="meta-row">
          <span class="meta-label" data-i18n="quote.meta.client">Cliente:</span>
          <span class="meta-value">Redibuk Chile</span>
        </div>
        <div class="meta-row">
          <span class="meta-label" data-i18n="quote.meta.provider">Proveedor:</span>
          <span class="meta-value">Andrés I.</span>
        </div>
        <div class="meta-row">
          <span class="meta-label" data-i18n="quote.meta.date">Fecha:</span>
          <span class="meta-value">27-05-2026</span>
        </div>
      </div>
    </header>

    <main>
      <!-- Section 1: Descripción -->
      <section>
        <h2 class="section-title">
          <span class="section-icon">1</span>
          <span data-i18n="quote.s1.title">Descripción del Servicio</span>
        </h2>
        <div style="margin-left: 36px;">
          <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 12px; font-weight: 500;" data-i18n="quote.s1.lead">
            Servicio integral de revisión, diagnóstico y resolución de bloqueo en Google Play Console, abarcando las siguientes acciones:
          </p>
          <ul class="list-items">
            <li class="list-item" data-i18n="quote.s1.i1">Acceso y análisis detallado del estado del release en Google Play Console.</li>
            <li class="list-item" data-i18n="quote.s1.i2">Identificación de errores de configuración en el flujo de publicación.</li>
            <li class="list-item" data-i18n="quote.s1.i3">Creación y configuración de un nuevo release correcto en caso de bloqueo.</li>
            <li class="list-item" data-i18n-html="quote.s1.i4Html">Subida y validación técnica del archivo en formato <strong>.AAB</strong> (Android App Bundle).</li>
            <li class="list-item" data-i18n="quote.s1.i5">Publicación en el track correspondiente (Testing interno/cerrado o Producción).</li>
            <li class="list-item" data-i18n="quote.s1.i6">Seguimiento hasta asegurar el correcto estado final y disponibilidad de la app en la Play Store.</li>
          </ul>
        </div>
      </section>

      <!-- Section 2 & 3: Entregables & Plazo -->
      <div class="grid-2">
        <section style="margin-bottom: 0;">
          <h2 class="section-title">
            <span class="section-icon">2</span>
            <span data-i18n="quote.s2.title">Entregables</span>
          </h2>
          <div class="card" style="height: calc(100% - 44px);">
            <ul class="list-items">
              <li class="list-item" data-i18n="quote.s2.i1">Aplicación correctamente publicada o actualizada en Google Play Console.</li>
              <li class="list-item" data-i18n="quote.s2.i2">Release sin conflictos de bundle ni bloqueos activos.</li>
              <li class="list-item" data-i18n-html="quote.s2.i3Html">Confirmación de estado <strong>“Activo”</strong> o <strong>“En revisión”</strong> limpio en el track acordado.</li>
            </ul>
          </div>
        </section>

        <section style="margin-bottom: 0;">
          <h2 class="section-title">
            <span class="section-icon">3</span>
            <span data-i18n="quote.s3.title">Plazo de Ejecución</span>
          </h2>
          <div class="card" style="height: calc(100% - 44px); display: flex; flex-direction: column; justify-content: center; background-color: #f0f7ff; border-color: #bfdbfe;">
            <p style="font-size: 20px; font-weight: 800; color: var(--accent); margin-bottom: 8px;" data-i18n="quote.s3.time">Hasta 24 horas</p>
            <p style="font-size: 13px; color: var(--text-muted); font-weight: 500;" data-i18n="quote.s3.lead">
              A partir de la recepción conforme de:
            </p>
            <ul class="list-items" style="margin-top: 8px;">
              <li class="list-item" style="font-size: 13px;" data-i18n="quote.s3.i1">Acceso a Google Play Console</li>
              <li class="list-item" style="font-size: 13px;" data-i18n="quote.s3.i2">Archivo .AAB correspondiente</li>
            </ul>
          </div>
        </section>
      </div>

      <!-- Section 4 & 5: Valor & Condiciones -->
      <div class="grid-2">
        <section style="margin-bottom: 0;">
          <h2 class="section-title">
            <span class="section-icon">4</span>
            <span data-i18n="quote.s4.title">Valor del Servicio</span>
          </h2>
          <div class="price-card" style="height: calc(100% - 44px);">
            <span class="price-label" data-i18n="quote.s4.label">Inversión Total</span>
            <span class="price-value">$120.000 CLP</span>
            <span class="price-detail" data-i18n="quote.s4.words">ciento veinte mil pesos chilenos</span>
          </div>
        </section>

        <section style="margin-bottom: 0;">
          <h2 class="section-title">
            <span class="section-icon">5</span>
            <span data-i18n="quote.s5.title">Condiciones de Pago</span>
          </h2>
          <div class="card" style="height: calc(100% - 44px); display: flex; flex-direction: column; justify-content: center;">
            <div class="payment-steps">
              <div class="payment-step">
                <span class="step-badge">50%</span>
                <span class="step-text" data-i18n="quote.s5.step1">Al inicio del trabajo</span>
                <span class="step-amount">$60.000 CLP</span>
              </div>
              <div class="payment-step">
                <span class="step-badge" style="background-color: var(--success);">50%</span>
                <span class="step-text" data-i18n="quote.s5.step2">Al completar publicación</span>
                <span class="step-amount">$60.000 CLP</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Section 6: Observaciones -->
      <section style="margin-top: 30px; margin-bottom: 0;">
        <h2 class="section-title">
          <span class="section-icon">6</span>
          <span data-i18n="quote.s6.title">Observaciones</span>
        </h2>
        <div class="info-callout">
          <span class="info-icon">ℹ</span>
          <p class="info-text" data-i18n="quote.s6.text">
            El servicio contratado corresponde exclusivamente a la gestión de publicación y resolución de configuraciones de la plataforma Google Play Console. No incluye labores de desarrollo de software, corrección de bugs, ni modificaciones al código fuente original de la aplicación.
          </p>
        </div>
      </section>
    </main>`;

const start = html.indexOf('<header>');
const end = html.indexOf('<!-- Sign-off -->');
if (start === -1 || end === -1) {
  console.error('Could not locate header/sign-off markers');
  process.exit(1);
}

let sig = html.slice(end);
sig = sig
  .replace(
    '<span class="sig-title">Prestador del Servicio</span>',
    '<span class="sig-title" data-i18n="quote.sig.provider">Prestador del Servicio</span>'
  )
  .replace(
    '<span class="sig-role">Consultor & Desarrollador</span>',
    '<span class="sig-role" data-i18n="quote.sig.role">Consultor & Desarrollador</span>'
  )
  .replace(
    'Aceptado por el Cliente: _______________________',
    '<span data-i18n="quote.sig.client">Aceptado por el Cliente: _______________________</span>'
  )
  .replace(
    /<footer class="footer-note">[\s\S]*?<\/footer>/,
    '<footer class="footer-note" data-i18n="quote.footer">Documento generado el 27 de mayo de 2026. Vigencia de cotización: 15 días.</footer>'
  );

html = html.slice(0, start) + bodyMain + '\n\n    ' + sig;
fs.writeFileSync(file, html);
console.log('cotizacion.html i18n wired');
