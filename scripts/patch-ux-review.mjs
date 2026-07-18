import fs from 'node:fs';

const patches = {
  es: {
    'hero.ctaPrimary': 'Iniciar mi proyecto',
    'team.desc':
      'Conoce a las personas detrás del producto: unimos criterio técnico y comercial para construir tu próxima plataforma y acompañarte después del lanzamiento.',
    'about.bioLead':
      'Somos un estudio de <strong>producto digital</strong> y comercialización. Unimos desarrollo full stack, <strong>SEO/GEO</strong> y acompañamiento comercial para convertir negocios tradicionales en <strong>plataformas rentables</strong>.',
    'about.bioLi1': '<strong>Software escalable</strong> pensado para crecer contigo',
    'about.bioLi2': '<strong>Márgenes más claros</strong> con productos que venden y operan',
    'about.bioLi3': '<strong>Operaciones estables</strong> sin depender del caos diario',
    'about.bioAndres':
      'Lidero la arquitectura y la entrega técnica: tiendas online, landings de conversión y plataformas a medida. Mi criterio es simple — <strong>velocidad de carga</strong>, <strong>SEO técnico</strong> sólido y resultados medibles. Trabajo con marcas en Chile, España, Dinamarca y en remoto, junto a Esteban Morote en la vertiente comercial.',
  },
  en: {
    'hero.ctaPrimary': 'Start my project',
    'team.desc':
      'Meet the people behind the product: we combine technical and commercial judgment to build your next platform and support you after launch.',
    'about.bioLead':
      'We are a <strong>digital product</strong> and commercial studio. We combine full-stack development, <strong>SEO/GEO</strong>, and commercial partnership to turn traditional businesses into <strong>profitable platforms</strong>.',
    'about.bioLi1': '<strong>Scalable software</strong> designed to grow with you',
    'about.bioLi2': '<strong>Clearer margins</strong> with products that sell and operate',
    'about.bioLi3': '<strong>Stable operations</strong> that no longer depend on daily chaos',
    'about.bioAndres':
      'I lead architecture and technical delivery: online stores, conversion landings, and custom platforms. My bar is simple — <strong>fast load times</strong>, solid <strong>technical SEO</strong>, and measurable outcomes. I work with brands in Chile, Spain, Denmark, and remotely, alongside Esteban Morote on the commercial side.',
  },
  da: {
    'hero.ctaPrimary': 'Start mit projekt',
    'team.desc':
      'Mød dem bag produktet: vi kombinerer teknisk og kommerciel dømmekraft for at bygge jeres næste platform og følge jer efter lanceringen.',
    'about.bioLead':
      'Vi er et studie for <strong>digitalt produkt</strong> og kommercialisering. Vi kombinerer full-stack udvikling, <strong>SEO/GEO</strong> og kommerciel sparring for at forvandle traditionelle virksomheder til <strong>profitable platforme</strong>.',
    'about.bioLi1': '<strong>Skalerbar software</strong> bygget til at vokse med jer',
    'about.bioLi2': '<strong>Klarere marginer</strong> med produkter der sælger og driftsikkerhed',
    'about.bioLi3': '<strong>Stabil drift</strong> uden dagligt kaos',
    'about.bioAndres':
      'Jeg leder arkitektur og teknisk leverance: webshops, konverteringslandings og skræddersyede platforme. Min standard er enkel — <strong>hurtig indlæsning</strong>, solid <strong>teknisk SEO</strong> og målbare resultater. Jeg arbejder med brands i Chile, Spanien, Danmark og remote, sammen med Esteban Morote på den kommercielle side.',
  },
  de: {
    'hero.ctaPrimary': 'Projekt starten',
    'team.desc':
      'Lernen Sie die Menschen hinter dem Produkt kennen: Wir verbinden technisches und kommerzielles Urteil, um Ihre nächste Plattform zu bauen und Sie nach dem Launch zu begleiten.',
    'about.bioLead':
      'Wir sind ein Studio für <strong>digitales Produkt</strong> und Commercial. Wir verbinden Full-Stack-Entwicklung, <strong>SEO/GEO</strong> und kommerzielle Begleitung, um traditionelle Unternehmen in <strong>profitable Plattformen</strong> zu verwandeln.',
    'about.bioLi1': '<strong>Skalierbare Software</strong>, die mit Ihnen wächst',
    'about.bioLi2': '<strong>Klarere Margen</strong> mit Produkten, die verkaufen und laufen',
    'about.bioLi3': '<strong>Stabile Abläufe</strong> ohne tägliches Chaos',
    'about.bioAndres':
      'Ich verantworte Architektur und technische Umsetzung: Online-Shops, Conversion-Landings und maßgeschneiderte Plattformen. Mein Maßstab ist klar — <strong>schnelle Ladezeiten</strong>, solides <strong>technisches SEO</strong> und messbare Ergebnisse. Ich arbeite mit Marken in Chile, Spanien, Dänemark und remote, gemeinsam mit Esteban Morote auf der Commercial-Seite.',
  },
  fr: {
    'hero.ctaPrimary': 'Lancer mon projet',
    'team.desc':
      'Découvrez les personnes derrière le produit : nous unissons jugement technique et commercial pour construire votre prochaine plateforme et vous accompagner après le lancement.',
    'about.bioLead':
      'Nous sommes un studio de <strong>produit digital</strong> et de commercialisation. Nous unissons développement full stack, <strong>SEO/GEO</strong> et accompagnement commercial pour transformer des entreprises traditionnelles en <strong>plateformes rentables</strong>.',
    'about.bioLi1': '<strong>Logiciel évolutif</strong> pensé pour grandir avec vous',
    'about.bioLi2': '<strong>Marges plus claires</strong> avec des produits qui vendent et opèrent',
    'about.bioLi3': '<strong>Opérations stables</strong> sans dépendre du chaos quotidien',
    'about.bioAndres':
      'Je dirige l’architecture et la livraison technique : boutiques en ligne, landings de conversion et plateformes sur mesure. Mon exigence est simple — <strong>vitesse de chargement</strong>, <strong>SEO technique</strong> solide et résultats mesurables. J’accompagne des marques au Chili, en Espagne, au Danemark et à distance, avec Esteban Morote sur le volet commercial.',
  },
  it: {
    'hero.ctaPrimary': 'Avvia il mio progetto',
    'team.desc':
      'Incontra le persone dietro il prodotto: uniamo giudizio tecnico e commerciale per costruire la tua prossima piattaforma e accompagnarti dopo il lancio.',
    'about.bioLead':
      'Siamo uno studio di <strong>prodotto digitale</strong> e commercializzazione. Uniamo sviluppo full stack, <strong>SEO/GEO</strong> e accompagnamento commerciale per trasformare aziende tradizionali in <strong>piattaforme redditizie</strong>.',
    'about.bioLi1': '<strong>Software scalabile</strong> pensato per crescere con te',
    'about.bioLi2': '<strong>Margini più chiari</strong> con prodotti che vendono e operano',
    'about.bioLi3': '<strong>Operazioni stabili</strong> senza dipendere dal caos quotidiano',
    'about.bioAndres':
      'Guido l’architettura e la consegna tecnica: e-commerce, landing di conversione e piattaforme su misura. Il mio criterio è semplice — <strong>velocità di caricamento</strong>, <strong>SEO tecnico</strong> solido e risultati misurabili. Lavoro con brand in Cile, Spagna, Danimarca e da remoto, insieme a Esteban Morote sul fronte commerciale.',
  },
  no: {
    'hero.ctaPrimary': 'Start mitt prosjekt',
    'team.desc':
      'Møt menneskene bak produktet: vi kombinerer teknisk og kommersiell dømmekraft for å bygge deres neste plattform og følge dere etter lansering.',
    'about.bioLead':
      'Vi er et studio for <strong>digitalt produkt</strong> og kommersialisering. Vi kombinerer fullstack-utvikling, <strong>SEO/GEO</strong> og kommersiell oppfølging for å gjøre tradisjonelle virksomheter om til <strong>lønnsomme plattformer</strong>.',
    'about.bioLi1': '<strong>Skalerbar programvare</strong> bygget for å vokse med dere',
    'about.bioLi2': '<strong>Klarere marginer</strong> med produkter som selger og drifter',
    'about.bioLi3': '<strong>Stabil drift</strong> uten daglig kaos',
    'about.bioAndres':
      'Jeg leder arkitektur og teknisk leveranse: nettbutikker, konverteringslandinger og skreddersydde plattformer. Standarden min er enkel — <strong>rask lasting</strong>, solid <strong>teknisk SEO</strong> og målbare resultater. Jeg jobber med merkevarer i Chile, Spania, Danmark og remote, sammen med Esteban Morote på den kommersielle siden.',
  },
  pt: {
    'hero.ctaPrimary': 'Iniciar o meu projeto',
    'team.desc':
      'Conheça as pessoas por trás do produto: unimos critério técnico e comercial para construir a sua próxima plataforma e acompanhá-lo após o lançamento.',
    'about.bioLead':
      'Somos um estúdio de <strong>produto digital</strong> e comercialização. Unimos desenvolvimento full stack, <strong>SEO/GEO</strong> e acompanhamento comercial para transformar negócios tradicionais em <strong>plataformas rentáveis</strong>.',
    'about.bioLi1': '<strong>Software escalável</strong> pensado para crescer consigo',
    'about.bioLi2': '<strong>Margens mais claras</strong> com produtos que vendem e operam',
    'about.bioLi3': '<strong>Operações estáveis</strong> sem depender do caos diário',
    'about.bioAndres':
      'Lidero a arquitetura e a entrega técnica: lojas online, landings de conversão e plataformas à medida. O meu critério é simples — <strong>velocidade de carregamento</strong>, <strong>SEO técnico</strong> sólido e resultados mensuráveis. Trabalho com marcas no Chile, Espanha, Dinamarca e de forma remota, com Esteban Morote no lado comercial.',
  },
  sv: {
    'hero.ctaPrimary': 'Starta mitt projekt',
    'team.desc':
      'Möt personerna bakom produkten: vi kombinerar tekniskt och kommersiellt omdöme för att bygga er nästa plattform och stötta er efter lanseringen.',
    'about.bioLead':
      'Vi är en studio för <strong>digital produkt</strong> och kommersialisering. Vi kombinerar fullstack-utveckling, <strong>SEO/GEO</strong> och kommersiell vägledning för att omsätta traditionella verksamheter till <strong>lönsamma plattformar</strong>.',
    'about.bioLi1': '<strong>Skalbar mjukvara</strong> byggd för att växa med er',
    'about.bioLi2': '<strong>Tydligare marginaler</strong> med produkter som säljer och driftar',
    'about.bioLi3': '<strong>Stabil drift</strong> utan dagligt kaos',
    'about.bioAndres':
      'Jag leder arkitektur och teknisk leverans: webbutiker, konverteringslandningar och skräddarsydda plattformar. Min ribba är enkel — <strong>snabb laddning</strong>, solid <strong>teknisk SEO</strong> och mätbara resultat. Jag arbetar med varumärken i Chile, Spanien, Danmark och remote, tillsammans med Esteban Morote på den kommersiella sidan.',
  },
};

for (const [code, map] of Object.entries(patches)) {
  const path = `locales/${code}.json`;
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  for (const [k, v] of Object.entries(map)) data[k] = v;
  fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
  console.log(code, 'ok');
}
