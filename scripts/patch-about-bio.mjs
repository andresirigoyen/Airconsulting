import fs from 'node:fs';

const patches = {
  es: {
    'about.bio':
      'IrigoyenDev es un equipo de producto y comercialización: desarrollo full stack, SEO y acompañamiento comercial. Convertimos negocios tradicionales en plataformas digitales rentables, con rigor técnico y visión de negocio para software escalable que mejora márgenes y resuelve problemas operativos reales.',
    'about.bioAndres':
      'Soy Andrés Irigoyen, fundador de IrigoyenDev. Lidero la arquitectura y el desarrollo full stack — tiendas online, landings de conversión y plataformas a medida — con foco en velocidad, SEO técnico y resultados medibles. Trabajo con marcas en Chile, España, Dinamarca y de forma remota.',
    'about.videoNote': 'La presentación en video está en español.',
    'about.card.title': 'Fundador · Desarrollo full stack',
    'about.card.play': 'Reproducir presentación (español)',
  },
  en: {
    'about.bio':
      'IrigoyenDev is a product and commercial team: full-stack development, SEO, and client partnership. We turn traditional businesses into profitable digital platforms — technical rigor plus business vision, so you get scalable software that improves margins and solves real operational problems.',
    'about.bioAndres':
      "I'm Andrés Irigoyen, founder of IrigoyenDev. I lead architecture and full-stack delivery — online stores, conversion landings, and custom platforms — focused on speed, technical SEO, and measurable outcomes. I work with brands in Chile, Spain, Denmark, and remotely.",
    'about.videoNote': 'The video presentation is in Spanish.',
    'about.card.title': 'Founder · Full-stack development',
    'about.card.play': 'Play presentation (Spanish)',
  },
  da: {
    'about.bio':
      'IrigoyenDev er et produkt- og kommercielt team: full-stack udvikling, SEO og kommerciel sparring. Vi forvandler traditionelle virksomheder til profitable digitale platforme — teknisk stringens og forretningsblik, så I får skalerbar software, der forbedrer marginer og løser reelle driftsproblemer.',
    'about.bioAndres':
      'Jeg er Andrés Irigoyen, stifter af IrigoyenDev. Jeg leder arkitektur og full-stack leverance — webshops, konverteringslandings og skræddersyede platforme — med fokus på hastighed, teknisk SEO og målbare resultater. Jeg arbejder med brands i Chile, Spanien, Danmark og remote.',
    'about.videoNote': 'Videopræsentationen er på spansk.',
    'about.card.title': 'Stifter · Full-stack udvikling',
    'about.card.play': 'Afspil præsentation (spansk)',
  },
  de: {
    'about.bio':
      'IrigoyenDev ist ein Produkt- und Commercial-Team: Full-Stack-Entwicklung, SEO und kommerzielle Begleitung. Wir verwandeln traditionelle Unternehmen in profitable digitale Plattformen — technische Präzision plus Business-Blick, für skalierbare Software, die Margen verbessert und echte Betriebsprobleme löst.',
    'about.bioAndres':
      'Ich bin Andrés Irigoyen, Gründer von IrigoyenDev. Ich verantworte Architektur und Full-Stack-Umsetzung — Online-Shops, Conversion-Landings und maßgeschneiderte Plattformen — mit Fokus auf Geschwindigkeit, technisches SEO und messbare Ergebnisse. Ich arbeite mit Marken in Chile, Spanien, Dänemark und remote.',
    'about.videoNote': 'Die Videopräsentation ist auf Spanisch.',
    'about.card.title': 'Gründer · Full-Stack-Entwicklung',
    'about.card.play': 'Präsentation abspielen (Spanisch)',
  },
  fr: {
    'about.bio':
      "IrigoyenDev est une équipe produit et commerciale : développement full stack, SEO et accompagnement business. Nous transformons des entreprises traditionnelles en plateformes numériques rentables — rigueur technique et vision business, pour un logiciel évolutif qui améliore les marges et résout de vrais problèmes opérationnels.",
    'about.bioAndres':
      "Je suis Andrés Irigoyen, fondateur d'IrigoyenDev. Je dirige l'architecture et la livraison full stack — boutiques en ligne, landings de conversion et plateformes sur mesure — avec un focus sur la vitesse, le SEO technique et des résultats mesurables. J'accompagne des marques au Chili, en Espagne, au Danemark et à distance.",
    'about.videoNote': 'La présentation vidéo est en espagnol.',
    'about.card.title': 'Fondateur · Développement full stack',
    'about.card.play': 'Lire la présentation (espagnol)',
  },
  it: {
    'about.bio':
      'IrigoyenDev è un team di prodotto e commerciale: sviluppo full stack, SEO e accompagnamento business. Trasformiamo aziende tradizionali in piattaforme digitali redditizie — rigore tecnico e visione di business, per software scalabile che migliora i margini e risolve problemi operativi reali.',
    'about.bioAndres':
      "Sono Andrés Irigoyen, fondatore di IrigoyenDev. Guidol'architettura e lo sviluppo full stack — e-commerce, landing di conversione e piattaforme su misura — con focus su velocità, SEO tecnico e risultati misurabili. Lavoro con brand in Cile, Spagna, Danimarca e da remoto.",
    'about.videoNote': 'La presentazione video è in spagnolo.',
    'about.card.title': 'Fondatore · Sviluppo full stack',
    'about.card.play': 'Riproduci presentazione (spagnolo)',
  },
  no: {
    'about.bio':
      'IrigoyenDev er et produkt- og kommersielt team: fullstack-utvikling, SEO og kommersiell oppfølging. Vi gjør tradisjonelle virksomheter om til lønnsomme digitale plattformer — teknisk stringens og forretningsblikk, så dere får skalerbar programvare som forbedrer marginer og løser reelle driftsproblemer.',
    'about.bioAndres':
      'Jeg er Andrés Irigoyen, grunnlegger av IrigoyenDev. Jeg leder arkitektur og fullstack-leveranse — nettbutikker, konverteringslandinger og skreddersydde plattformer — med fokus på hastighet, teknisk SEO og målbare resultater. Jeg jobber med merkevarer i Chile, Spania, Danmark og remote.',
    'about.videoNote': 'Videopresentasjonen er på spansk.',
    'about.card.title': 'Grunnlegger · Fullstack-utvikling',
    'about.card.play': 'Spill av presentasjon (spansk)',
  },
  pt: {
    'about.bio':
      'A IrigoyenDev é uma equipa de produto e comercialização: desenvolvimento full stack, SEO e acompanhamento comercial. Transformamos negócios tradicionais em plataformas digitais rentáveis — rigor técnico e visão de negócio, para software escalável que melhora margens e resolve problemas operacionais reais.',
    'about.bioAndres':
      'Sou Andrés Irigoyen, fundador da IrigoyenDev. Lidero a arquitetura e o desenvolvimento full stack — lojas online, landings de conversão e plataformas à medida — com foco em velocidade, SEO técnico e resultados mensuráveis. Trabalho com marcas no Chile, Espanha, Dinamarca e de forma remota.',
    'about.videoNote': 'A apresentação em vídeo está em espanhol.',
    'about.card.title': 'Fundador · Desenvolvimento full stack',
    'about.card.play': 'Reproduzir apresentação (espanhol)',
  },
  sv: {
    'about.bio':
      'IrigoyenDev är ett produkt- och kommersiellt team: fullstack-utveckling, SEO och kommersiell vägledning. Vi omsätter traditionella verksamheter till lönsamma digitala plattformar — teknisk stringens och affärsöga, så ni får skalbar mjukvara som förbättrar marginaler och löser verkliga driftsproblem.',
    'about.bioAndres':
      'Jag är Andrés Irigoyen, grundare av IrigoyenDev. Jag leder arkitektur och fullstack-leverans — webbutiker, konverteringslandningar och skräddarsydda plattformar — med fokus på hastighet, teknisk SEO och mätbara resultat. Jag arbetar med varumärken i Chile, Spanien, Danmark och remote.',
    'about.videoNote': 'Videopresentationen är på spanska.',
    'about.card.title': 'Grundare · Fullstack-utveckling',
    'about.card.play': 'Spela upp presentation (spanska)',
  },
};

// Fix Italian typo: Guidol'architettura -> Guido l'architettura
patches.it['about.bioAndres'] =
  "Sono Andrés Irigoyen, fondatore di IrigoyenDev. Guido l'architettura e lo sviluppo full stack — e-commerce, landing di conversione e piattaforme su misura — con focus su velocità, SEO tecnico e risultati misurabili. Lavoro con brand in Cile, Spagna, Danimarca e da remoto.";

for (const [code, map] of Object.entries(patches)) {
  const path = `locales/${code}.json`;
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  for (const [k, v] of Object.entries(map)) data[k] = v;
  fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
  console.log('ok', code);
}
