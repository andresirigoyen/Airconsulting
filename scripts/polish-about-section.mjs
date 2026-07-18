import fs from 'node:fs';

const patches = {
  es: {
    'about.eyebrow': 'Sobre IrigoyenDev',
    'about.title2': 'Quiénes somos',
    'about.bio':
      'IrigoyenDev es un estudio de producto digital y comercialización. Unimos desarrollo full stack, SEO/GEO y acompañamiento comercial para convertir negocios tradicionales en plataformas rentables: software escalable, márgenes más claros y operaciones que dejan de depender del caos diario.',
    'about.founderLabel': 'Andrés Irigoyen — Fundador',
    'about.bioAndres':
      'Lidero la arquitectura y la entrega técnica: tiendas online, landings de conversión y plataformas a medida. Mi criterio es simple — velocidad de carga, SEO técnico sólido y resultados que se puedan medir. Trabajo con marcas en Chile, España, Dinamarca y en remoto, junto a Esteban Morote en la vertiente comercial.',
    'about.videoNote': 'Presentación en español',
    'about.videoHint': 'Activa el sonido en el video para escuchar la presentación.',
    'about.card.title': 'Fundador · Desarrollo full stack',
    'about.card.play': 'Ver presentación · ES',
    'about.card.playAria': 'Reproducir presentación en español',
    'about.card.videoAria': 'Presentación de Andrés Irigoyen en español',
    'team.andres.role': 'Fundador · Desarrollo full stack',
    'team.andres.bio':
      'Arquitectura, desarrollo y lanzamiento de e-commerce, landings y plataformas. Foco en velocidad, SEO técnico y resultados medibles.',
  },
  en: {
    'about.eyebrow': 'About IrigoyenDev',
    'about.title2': 'Who we are',
    'about.bio':
      'IrigoyenDev is a digital product and commercial studio. We combine full-stack development, SEO/GEO, and commercial partnership to turn traditional businesses into profitable platforms: scalable software, clearer margins, and operations that no longer depend on daily chaos.',
    'about.founderLabel': 'Andrés Irigoyen — Founder',
    'about.bioAndres':
      'I lead architecture and technical delivery: online stores, conversion landings, and custom platforms. My bar is simple — fast load times, solid technical SEO, and outcomes you can measure. I work with brands in Chile, Spain, Denmark, and remotely, alongside Esteban Morote on the commercial side.',
    'about.videoNote': 'Presentation in Spanish',
    'about.videoHint': 'Unmute the video to hear the presentation.',
    'about.card.title': 'Founder · Full-stack development',
    'about.card.play': 'Watch presentation · ES',
    'about.card.playAria': 'Play presentation in Spanish',
    'about.card.videoAria': 'Presentation by Andrés Irigoyen in Spanish',
    'team.andres.role': 'Founder · Full-stack development',
    'team.andres.bio':
      'Architecture, development, and launch of e-commerce, landings, and platforms. Focused on speed, technical SEO, and measurable outcomes.',
  },
  da: {
    'about.eyebrow': 'Om IrigoyenDev',
    'about.title2': 'Hvem vi er',
    'about.bio':
      'IrigoyenDev er et digitalt produkt- og kommercielt studie. Vi kombinerer full-stack udvikling, SEO/GEO og kommerciel sparring for at forvandle traditionelle virksomheder til profitable platforme: skalerbar software, klarere marginer og drift, der ikke længere afhænger af dagligt kaos.',
    'about.founderLabel': 'Andrés Irigoyen — Stifter',
    'about.bioAndres':
      'Jeg leder arkitektur og teknisk leverance: webshops, konverteringslandings og skræddersyede platforme. Min standard er enkel — hurtig indlæsning, solid teknisk SEO og resultater, I kan måle. Jeg arbejder med brands i Chile, Spanien, Danmark og remote, sammen med Esteban Morote på den kommercielle side.',
    'about.videoNote': 'Præsentation på spansk',
    'about.videoHint': 'Slå lyden til på videoen for at høre præsentationen.',
    'about.card.title': 'Stifter · Full-stack udvikling',
    'about.card.play': 'Se præsentation · ES',
    'about.card.playAria': 'Afspil præsentation på spansk',
    'about.card.videoAria': 'Præsentation af Andrés Irigoyen på spansk',
    'team.andres.role': 'Stifter · Full-stack udvikling',
    'team.andres.bio':
      'Arkitektur, udvikling og lancering af e-commerce, landings og platforme. Fokus på hastighed, teknisk SEO og målbare resultater.',
  },
  de: {
    'about.eyebrow': 'Über IrigoyenDev',
    'about.title2': 'Wer wir sind',
    'about.bio':
      'IrigoyenDev ist ein Studio für digitales Produkt und Commercial. Wir verbinden Full-Stack-Entwicklung, SEO/GEO und kommerzielle Begleitung, um traditionelle Unternehmen in profitable Plattformen zu verwandeln: skalierbare Software, klarere Margen und Abläufe, die nicht mehr vom täglichen Chaos abhängen.',
    'about.founderLabel': 'Andrés Irigoyen — Gründer',
    'about.bioAndres':
      'Ich verantworte Architektur und technische Umsetzung: Online-Shops, Conversion-Landings und maßgeschneiderte Plattformen. Mein Maßstab ist klar — schnelle Ladezeiten, solides technisches SEO und Ergebnisse, die messbar sind. Ich arbeite mit Marken in Chile, Spanien, Dänemark und remote, gemeinsam mit Esteban Morote auf der Commercial-Seite.',
    'about.videoNote': 'Präsentation auf Spanisch',
    'about.videoHint': 'Ton im Video aktivieren, um die Präsentation zu hören.',
    'about.card.title': 'Gründer · Full-Stack-Entwicklung',
    'about.card.play': 'Präsentation ansehen · ES',
    'about.card.playAria': 'Präsentation auf Spanisch abspielen',
    'about.card.videoAria': 'Präsentation von Andrés Irigoyen auf Spanisch',
    'team.andres.role': 'Gründer · Full-Stack-Entwicklung',
    'team.andres.bio':
      'Architektur, Entwicklung und Launch von E-Commerce, Landings und Plattformen. Fokus auf Geschwindigkeit, technisches SEO und messbare Ergebnisse.',
  },
  fr: {
    'about.eyebrow': 'À propos d’IrigoyenDev',
    'about.title2': 'Qui nous sommes',
    'about.bio':
      'IrigoyenDev est un studio de produit digital et de commercialisation. Nous unissons développement full stack, SEO/GEO et accompagnement commercial pour transformer des entreprises traditionnelles en plateformes rentables : logiciel évolutif, marges plus claires et opérations qui ne dépendent plus du chaos quotidien.',
    'about.founderLabel': 'Andrés Irigoyen — Fondateur',
    'about.bioAndres':
      'Je dirige l’architecture et la livraison technique : boutiques en ligne, landings de conversion et plateformes sur mesure. Mon exigence est simple — vitesse de chargement, SEO technique solide et résultats mesurables. J’accompagne des marques au Chili, en Espagne, au Danemark et à distance, avec Esteban Morote sur le volet commercial.',
    'about.videoNote': 'Présentation en espagnol',
    'about.videoHint': 'Activez le son de la vidéo pour écouter la présentation.',
    'about.card.title': 'Fondateur · Développement full stack',
    'about.card.play': 'Voir la présentation · ES',
    'about.card.playAria': 'Lire la présentation en espagnol',
    'about.card.videoAria': 'Présentation d’Andrés Irigoyen en espagnol',
    'team.andres.role': 'Fondateur · Développement full stack',
    'team.andres.bio':
      'Architecture, développement et lancement d’e-commerce, landings et plateformes. Focus sur la vitesse, le SEO technique et des résultats mesurables.',
  },
  it: {
    'about.eyebrow': 'Su IrigoyenDev',
    'about.title2': 'Chi siamo',
    'about.bio':
      'IrigoyenDev è uno studio di prodotto digitale e commercializzazione. Uniamo sviluppo full stack, SEO/GEO e accompagnamento commerciale per trasformare aziende tradizionali in piattaforme redditizie: software scalabile, margini più chiari e operazioni che non dipendono più dal caos quotidiano.',
    'about.founderLabel': 'Andrés Irigoyen — Fondatore',
    'about.bioAndres':
      'Guido l’architettura e la consegna tecnica: e-commerce, landing di conversione e piattaforme su misura. Il mio criterio è semplice — velocità di caricamento, SEO tecnico solido e risultati misurabili. Lavoro con brand in Cile, Spagna, Danimarca e da remoto, insieme a Esteban Morote sul fronte commerciale.',
    'about.videoNote': 'Presentazione in spagnolo',
    'about.videoHint': 'Attiva l’audio del video per ascoltare la presentazione.',
    'about.card.title': 'Fondatore · Sviluppo full stack',
    'about.card.play': 'Guarda la presentazione · ES',
    'about.card.playAria': 'Riproduci presentazione in spagnolo',
    'about.card.videoAria': 'Presentazione di Andrés Irigoyen in spagnolo',
    'team.andres.role': 'Fondatore · Sviluppo full stack',
    'team.andres.bio':
      'Architettura, sviluppo e lancio di e-commerce, landing e piattaforme. Focus su velocità, SEO tecnico e risultati misurabili.',
  },
  no: {
    'about.eyebrow': 'Om IrigoyenDev',
    'about.title2': 'Hvem vi er',
    'about.bio':
      'IrigoyenDev er et studio for digitalt produkt og kommersialisering. Vi kombinerer fullstack-utvikling, SEO/GEO og kommersiell oppfølging for å gjøre tradisjonelle virksomheter om til lønnsomme plattformer: skalerbar programvare, klarere marginer og drift som ikke lenger avhenger av daglig kaos.',
    'about.founderLabel': 'Andrés Irigoyen — Grunnlegger',
    'about.bioAndres':
      'Jeg leder arkitektur og teknisk leveranse: nettbutikker, konverteringslandinger og skreddersydde plattformer. Standarden min er enkel — rask lasting, solid teknisk SEO og resultater dere kan måle. Jeg jobber med merkevarer i Chile, Spania, Danmark og remote, sammen med Esteban Morote på den kommersielle siden.',
    'about.videoNote': 'Presentasjon på spansk',
    'about.videoHint': 'Slå på lyden i videoen for å høre presentasjonen.',
    'about.card.title': 'Grunnlegger · Fullstack-utvikling',
    'about.card.play': 'Se presentasjon · ES',
    'about.card.playAria': 'Spill av presentasjon på spansk',
    'about.card.videoAria': 'Presentasjon av Andrés Irigoyen på spansk',
    'team.andres.role': 'Grunnlegger · Fullstack-utvikling',
    'team.andres.bio':
      'Arkitektur, utvikling og lansering av e-handel, landinger og plattformer. Fokus på hastighet, teknisk SEO og målbare resultater.',
  },
  pt: {
    'about.eyebrow': 'Sobre a IrigoyenDev',
    'about.title2': 'Quem somos',
    'about.bio':
      'A IrigoyenDev é um estúdio de produto digital e comercialização. Unimos desenvolvimento full stack, SEO/GEO e acompanhamento comercial para transformar negócios tradicionais em plataformas rentáveis: software escalável, margens mais claras e operações que deixam de depender do caos diário.',
    'about.founderLabel': 'Andrés Irigoyen — Fundador',
    'about.bioAndres':
      'Lidero a arquitetura e a entrega técnica: lojas online, landings de conversão e plataformas à medida. O meu critério é simples — velocidade de carregamento, SEO técnico sólido e resultados mensuráveis. Trabalho com marcas no Chile, Espanha, Dinamarca e de forma remota, com Esteban Morote no lado comercial.',
    'about.videoNote': 'Apresentação em espanhol',
    'about.videoHint': 'Ative o som do vídeo para ouvir a apresentação.',
    'about.card.title': 'Fundador · Desenvolvimento full stack',
    'about.card.play': 'Ver apresentação · ES',
    'about.card.playAria': 'Reproduzir apresentação em espanhol',
    'about.card.videoAria': 'Apresentação de Andrés Irigoyen em espanhol',
    'team.andres.role': 'Fundador · Desenvolvimento full stack',
    'team.andres.bio':
      'Arquitetura, desenvolvimento e lançamento de e-commerce, landings e plataformas. Foco em velocidade, SEO técnico e resultados mensuráveis.',
  },
  sv: {
    'about.eyebrow': 'Om IrigoyenDev',
    'about.title2': 'Vilka vi är',
    'about.bio':
      'IrigoyenDev är en studio för digital produkt och kommersialisering. Vi kombinerar fullstack-utveckling, SEO/GEO och kommersiell vägledning för att omsätta traditionella verksamheter till lönsamma plattformar: skalbar mjukvara, tydligare marginaler och drift som inte längre beror på dagligt kaos.',
    'about.founderLabel': 'Andrés Irigoyen — Grundare',
    'about.bioAndres':
      'Jag leder arkitektur och teknisk leverans: webbutiker, konverteringslandningar och skräddarsydda plattformar. Min ribba är enkel — snabb laddning, solid teknisk SEO och resultat ni kan mäta. Jag arbetar med varumärken i Chile, Spanien, Danmark och remote, tillsammans med Esteban Morote på den kommersiella sidan.',
    'about.videoNote': 'Presentation på spanska',
    'about.videoHint': 'Slå på ljudet i videon för att höra presentationen.',
    'about.card.title': 'Grundare · Fullstack-utveckling',
    'about.card.play': 'Se presentation · ES',
    'about.card.playAria': 'Spela upp presentation på spanska',
    'about.card.videoAria': 'Presentation av Andrés Irigoyen på spanska',
    'team.andres.role': 'Grundare · Fullstack-utveckling',
    'team.andres.bio':
      'Arkitektur, utveckling och lansering av e-handel, landningar och plattformar. Fokus på hastighet, teknisk SEO och mätbara resultat.',
  },
};

for (const [code, map] of Object.entries(patches)) {
  const path = `locales/${code}.json`;
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  for (const [k, v] of Object.entries(map)) data[k] = v;
  fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
  console.log(code, Object.keys(map).length);
}
