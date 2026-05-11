import { cp, mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
const dist = join(root, "dist");
const baseUrl = "https://fixreumung.at";
const phone = "+43 676 5055437";
const phoneHref = "tel:+436765055437";
const email = "office@fixreumung.at";
const whatsapp = "https://wa.me/436765055437";

const company = {
  name: "FIXREUMUNG GmbH",
  legalName: "VIPROTECT GmbH",
  street: "Heiligenstädter Str. 32/303",
  postal: "1190",
  city: "Wien",
  country: "AT",
  vat: "ATU79015815",
  register: "FN 590214 m",
  court: "Handelsgericht Wien",
  chamber: "Wirtschaftskammer Wien",
  authority: "Magistratisches Bezirksamt des 10. Bezirks",
  subject: "Transportunternehmen",
  manager: "Martin Wagner"
};

const forbiddenTerms = [
  "Sicherheitskontrollen",
  "Personenschutz",
  "Veranstaltungsschutz",
  "Detektei",
  "Baustellenbewachung",
  "Videoüberwachung",
  "Werttransport",
  "Portierdienst",
  "Chauffeurdienst",
  "Wachdienste",
  "Security"
];

const trust = [
  "Kostenlose Besichtigung",
  "Fixpreis-Angebot",
  "Besenreine Übergabe",
  "Kurzfristige Termine",
  "Diskrete Abwicklung",
  "Fachgerechte Entsorgung"
];

const imageMap = {
  wohnung: ["__ASSET__/images/wohnungsraeumung.webp", "Wohnungsräumung durch FIXREUMUNG in Wien"],
  keller: ["__ASSET__/images/kellerraeumung.webp", "Kellerräumung und Entrümpelung in Wien"],
  verlassenschaft: ["__ASSET__/images/verlassenschaft.webp", "Verlassenschaftsräumung in Wien und Österreich"],
  messie: ["__ASSET__/images/messie-raeumung.webp", "Diskrete Messie-Räumung in Wien"],
  buero: ["__ASSET__/images/bueroraeumung.webp", "Büroräumung und Gewerberäumung in Wien"],
  garage: ["__ASSET__/images/garagenraeumung.webp", "Garagenräumung in Wien und Umgebung"],
  dachboden: ["__ASSET__/images/dachbodenentruempelung.webp", "Dachbodenentrümpelung in Wien"],
  geschaeft: ["__ASSET__/images/geschaeftsaufloesung.webp", "Geschäftsauflösung in Wien"],
  logo: ["__ASSET__/images/logo.webp", "FIXREUMUNG GmbH Logo"]
};

const services = [
  {
    name: "Wohnungsräumung",
    slug: "/wohnungsraeumung-wien/",
    keyword: "Wohnungsräumung Wien",
    image: "wohnung",
    short: "Wohnungen jeder Größe zuverlässig räumen und besenrein übergeben.",
    intro: "Bei einer Wohnungsräumung zählt ein klarer Ablauf, ein respektvoller Umgang mit dem Bestand und eine saubere Übergabe. FIXREUMUNG übernimmt Wohnungen in Altbau, Neubau, Gemeindebau, Eigentum und Mietobjekten in Wien und darüber hinaus."
  },
  {
    name: "Kellerräumung",
    slug: "/kellerraeumung-wien/",
    keyword: "Kellerräumung Wien",
    image: "keller",
    short: "Kellerabteile, Lagerräume und Nebenräume rasch wieder nutzbar machen.",
    intro: "Keller sammeln über Jahre Möbel, Kartons, Geräte und Dinge, die niemand mehr braucht. FIXREUMUNG räumt Kellerabteile, Waschküchenbereiche und Lagerräume mit System, sauberer Trennung und fachgerechter Entsorgung."
  },
  {
    name: "Verlassenschaftsräumung",
    slug: "/verlassenschaftsraeumung-wien/",
    keyword: "Verlassenschaftsräumung Wien",
    image: "verlassenschaft",
    short: "Einfühlsame Räumung bei Verlassenschaften mit klarer Abstimmung.",
    intro: "Eine Verlassenschaftsräumung ist oft zeitlich und emotional anspruchsvoll. FIXREUMUNG arbeitet ruhig, diskret und sorgfältig, damit Angehörige, Hausverwaltungen und Eigentümer eine verlässliche Lösung haben."
  },
  {
    name: "Messie-Räumung",
    slug: "/messie-raeumung-wien/",
    keyword: "Messie Räumung Wien",
    image: "messie",
    short: "Diskrete Hilfe bei stark belasteten Wohnungen und Häusern.",
    intro: "Bei einer Messie-Räumung braucht es Erfahrung, Struktur und Diskretion. FIXREUMUNG hilft bei belasteten Räumen, plant den Ablauf realistisch und sorgt Schritt für Schritt für eine ordentliche Übergabe."
  },
  {
    name: "Büroräumung",
    slug: "/bueroraeumung-wien/",
    keyword: "Büroräumung Wien",
    image: "buero",
    short: "Büros, Praxen, Lager und Gewerbeflächen termintreu räumen.",
    intro: "Bei einer Büroräumung sind Termine, Zugänge und die Übergabe an Vermieter oder Nachmieter wichtig. FIXREUMUNG räumt Arbeitsplätze, Aktenmöbel, Nebenräume und Lagerflächen zuverlässig."
  },
  {
    name: "Garagenräumung",
    slug: "/garagenraeumung-wien/",
    keyword: "Garagenräumung Wien",
    image: "garage",
    short: "Garagen, Schuppen und Nebenräume geordnet entrümpeln.",
    intro: "Garagen werden schnell zum Lager für Reifen, Möbel, Werkzeuge und alte Geräte. FIXREUMUNG schafft Platz, trennt verwertbare Materialien und übergibt die Garage sauber nutzbar."
  },
  {
    name: "Dachbodenentrümpelung",
    slug: "/dachbodenentruempelung-wien/",
    keyword: "Dachbodenentrümpelung Wien",
    image: "dachboden",
    short: "Dachböden sicher räumen, tragen und fachgerecht entsorgen.",
    intro: "Dachböden haben oft enge Zugänge, viel Staub und gemischten Hausrat. FIXREUMUNG übernimmt Dachbodenentrümpelungen mit guter Vorbereitung und sauberem Abtransport."
  },
  {
    name: "Geschäftsauflösung",
    slug: "/geschaeftsaufloesung-wien/",
    keyword: "Geschäftsauflösung Wien",
    image: "geschaeft",
    short: "Geschäftslokale und Betriebsflächen ordentlich übergeben.",
    intro: "Bei einer Geschäftsauflösung müssen Möbel, Regale, Lagerware und Nebenräume zügig entfernt werden. FIXREUMUNG sorgt für Planbarkeit, Fixpreis und eine ordentliche Übergabe."
  },
  {
    name: "Haushaltsauflösung",
    slug: "/haushaltsaufloesung-wien/",
    keyword: "Haushaltsauflösung Wien",
    image: "wohnung",
    short: "Komplette Haushalte strukturiert auflösen und besenrein übergeben.",
    intro: "Eine Haushaltsauflösung umfasst Möbel, Hausrat, Keller, Dachboden und oft viele Erinnerungsstücke. FIXREUMUNG verbindet Organisation mit Feingefühl und klarer Kommunikation."
  },
  {
    name: "Firmenauflösung",
    slug: "/firmenaufloesung-wien/",
    keyword: "Firmenauflösung Wien",
    image: "buero",
    short: "Betriebsflächen, Büros und Lager professionell räumen.",
    intro: "Firmenauflösungen brauchen eine saubere Planung, damit Betriebsflächen, Lager und Büros termingerecht frei werden. FIXREUMUNG stimmt Umfang, Zugang und Übergabe klar ab."
  }
];

const regions = [
  ["Wien", "/entruempelung-wien/", "Entrümpelung Wien", "Wiener Wohnungen, Zinshäuser, Kellerabteile und Geschäftslokale brauchen Räumungen, die mit kurzen Wegen und guter Abstimmung funktionieren."],
  ["Niederösterreich", "/entruempelung-niederoesterreich/", "Entrümpelung Niederösterreich", "In Niederösterreich betreut FIXREUMUNG Wohnungen, Häuser, Keller, Verlassenschaften und Gewerbeflächen in Stadt und Land."],
  ["Burgenland", "/entruempelung-burgenland/", "Entrümpelung Burgenland", "Im Burgenland sind planbare Termine, klare Preise und eine fachgerechte Entsorgung besonders wichtig, wenn Häuser oder Wohnungen frei werden sollen."],
  ["Oberösterreich", "/entruempelung-oberoesterreich/", "Entrümpelung Oberösterreich", "Für Oberösterreich bietet FIXREUMUNG Räumungen und Haushaltsauflösungen mit Fixpreis, sauberer Übergabe und verlässlicher Kommunikation."],
  ["Steiermark", "/entruempelung-steiermark/", "Entrümpelung Steiermark", "In der Steiermark unterstützt FIXREUMUNG bei Wohnungsräumungen, Keller- und Dachbodenentrümpelungen sowie Verlassenschaftsräumungen."],
  ["Salzburg", "/entruempelung-salzburg/", "Entrümpelung Salzburg", "Für Salzburg plant FIXREUMUNG Entrümpelungen mit kostenloser Besichtigung, fairem Fixpreis und besenreiner Übergabe."],
  ["Kärnten", "/entruempelung-kaernten/", "Entrümpelung Kärnten", "In Kärnten räumt FIXREUMUNG Wohnungen, Häuser, Keller, Garagen und Gewerbeflächen diskret und fachgerecht."],
  ["Tirol", "/entruempelung-tirol/", "Entrümpelung Tirol", "In Tirol zählen gute Vorbereitung und klare Terminfenster. FIXREUMUNG übernimmt Räumungen mit strukturierter Planung."],
  ["Vorarlberg", "/entruempelung-vorarlberg/", "Entrümpelung Vorarlberg", "Für Vorarlberg bietet FIXREUMUNG Entrümpelung, Haushaltsauflösung und besenreine Übergabe aus einer Hand."]
];

const districtNames = {
  "1010": "Innere Stadt",
  "1020": "Leopoldstadt",
  "1030": "Landstraße",
  "1040": "Wieden",
  "1050": "Margareten",
  "1060": "Mariahilf",
  "1070": "Neubau",
  "1080": "Josefstadt",
  "1090": "Alsergrund",
  "1100": "Favoriten",
  "1110": "Simmering",
  "1120": "Meidling",
  "1130": "Hietzing",
  "1140": "Penzing",
  "1150": "Rudolfsheim-Fünfhaus",
  "1160": "Ottakring",
  "1170": "Hernals",
  "1180": "Währing",
  "1190": "Döbling",
  "1200": "Brigittenau",
  "1210": "Floridsdorf",
  "1220": "Donaustadt",
  "1230": "Liesing"
};

const districts = Object.entries(districtNames).map(([code, name]) => ({
  code,
  name,
  slug: `/entruempelung-${code}-wien/`
}));

const commonFaq = [
  ["Was kostet eine Entrümpelung?", "Die Kosten hängen von Menge, Lage, Zugänglichkeit, Demontage und Entsorgungsaufwand ab. Nach der kostenlosen Besichtigung erhalten Sie ein klares Fixpreis-Angebot."],
  ["Ist die Besichtigung kostenlos?", "Ja. Die Besichtigung ist kostenlos und unverbindlich. Danach wissen Sie genau, welcher Aufwand entsteht und welcher Fixpreis gilt."],
  ["Wie schnell ist ein Termin möglich?", "Kurzfristige Termine sind oft möglich. Am schnellsten geht die Abstimmung telefonisch oder per WhatsApp Anfrage."],
  ["Wird besenrein übergeben?", "Ja. Nach der Räumung werden Wohnung, Keller, Büro, Garage oder Geschäftsfläche besenrein übergeben."],
  ["Entsorgt ihr fachgerecht?", "Ja. FIXREUMUNG achtet auf fachgerechte Entsorgung, sinnvolle Trennung und sauberen Abtransport."]
];

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}

function wordCount(html) {
  return html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
}

function slugPath(pathname) {
  return pathname === "/" ? "index.html" : join(pathname.replace(/^\/|\/$/g, ""), "index.html");
}

function jsonLd(data) {
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function schemas({ path, h1, faq = commonFaq, serviceType = "Entrümpelung und Räumung" }) {
  const url = `${baseUrl}${path}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": company.name,
      "url": baseUrl,
      "telephone": phone,
      "email": email,
      "vatID": company.vat,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": company.street,
        "postalCode": company.postal,
        "addressLocality": company.city,
        "addressCountry": company.country
      },
      "areaServed": regions.map((region) => region[0]),
      "priceRange": "€€"
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": serviceType,
      "provider": { "@type": "LocalBusiness", "name": company.name },
      "areaServed": regions.map((region) => region[0])
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Startseite", "item": baseUrl },
        { "@type": "ListItem", "position": 2, "name": h1, "item": url }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faq.map(([q, a]) => ({
        "@type": "Question",
        "name": q,
        "acceptedAnswer": { "@type": "Answer", "text": a }
      }))
    }
  ];
}

function layout({ title, description, path, h1, intro, body, imageKey = "wohnung", serviceType }) {
  const url = `${baseUrl}${path}`;
  const [image, alt] = imageMap[imageKey] || imageMap.wohnung;
  const assetBase = path === "/" ? "assets" : "../assets";
  return `<!doctype html>
<html lang="de-AT">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${url}">
  <meta name="robots" content="index, follow">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${baseUrl}${image.replace("__ASSET__", "/assets")}">
  <link rel="preload" href="__ASSET__/styles.css" as="style">
  <link rel="stylesheet" href="__ASSET__/styles.css">
  ${schemas({ path, h1, serviceType }).map(jsonLd).join("\n  ")}
</head>
<body>
  <a class="skip-link" href="#inhalt">Zum Inhalt springen</a>
  ${header()}
  <main id="inhalt">
    ${path === "/" ? body : breadcrumb(h1) + pageHero(h1, intro, image, alt) + body}
  </main>
  ${footer()}
</body>
</html>`.replaceAll("__ASSET__", assetBase);
}

function header() {
  return `<header class="site-header">
  <nav class="nav" aria-label="Hauptnavigation">
    <a class="brand" href="/" aria-label="FIXREUMUNG Startseite"><img src="/assets/images/logo.webp" alt="FIXREUMUNG GmbH Logo" width="42" height="42"><span>FIXREUMUNG GmbH</span></a>
    <div class="nav-links">
      <a href="/leistungen/">Leistungen</a>
      <a href="/entruempelung-wien/">Wien</a>
      <a href="/entruempelung-niederoesterreich/">Niederösterreich</a>
      <a href="/entruempelung-oesterreich/">Österreich</a>
      <a href="/kontakt/">Kontakt</a>
    </div>
    <a class="nav-cta" href="${phoneHref}">Jetzt anrufen</a>
  </nav>
</header>`;
}

function breadcrumb(name) {
  return `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Startseite</a> / ${esc(name)}</nav>`;
}

function pageHero(h1, intro, image, alt) {
  return `<section class="page-hero">
  <div class="page-hero-copy">
    <span class="eyebrow">Kostenlose Besichtigung und Fixpreis</span>
    <h1>${esc(h1)}</h1>
    <p class="lead">${esc(intro)}</p>
    ${ctaRow()}
  </div>
  <img class="page-hero-image" src="${image}" alt="${esc(alt)}" width="740" height="750" loading="eager">
</section>`;
}

function ctaRow() {
  return `<div class="hero-actions">
    <a class="button primary" href="${phoneHref}">Jetzt anrufen</a>
    <a class="button blue" href="${whatsapp}">WhatsApp Anfrage</a>
    <a class="button" href="/kontakt/">Kostenlose Besichtigung</a>
  </div>`;
}

function trustBar() {
  return `<section class="trust" aria-label="Vorteile"><div class="trust-list">${trust.map((item) => `<div class="trust-item"><span class="check">✓</span><span>${esc(item)}</span></div>`).join("")}</div></section>`;
}

function serviceCards(limit = services.length) {
  return `<div class="grid cards">${services.slice(0, limit).map((service) => {
    const [img, alt] = imageMap[service.image];
    return `<a class="card service-card" href="${service.slug}">
      <img src="${img}" alt="${esc(alt)}" width="370" height="375" loading="lazy">
      <div><h3>${esc(service.name)}</h3><p>${esc(service.short)}</p></div>
    </a>`;
  }).join("")}</div>`;
}

function faqSection() {
  return `<section class="section">
  <div class="section-head">
    <h2>Häufige Fragen</h2>
    <p>Die wichtigsten Antworten zu Kosten, Ablauf, Terminen und Übergabe.</p>
  </div>
  <div class="faq-list">${commonFaq.map(([q, a]) => `<article class="faq-item"><h3>${esc(q)}</h3><p>${esc(a)}</p></article>`).join("")}</div>
</section>`;
}

function contactForm() {
  return `<form class="form" action="/kontaktformular.php" method="post" novalidate>
  <input class="hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
  <div class="field-grid">
    <label>Name<input name="name" autocomplete="name" required minlength="2"></label>
    <label>Telefon<input name="telefon" autocomplete="tel" required></label>
    <label>E-Mail<input type="email" name="email" autocomplete="email" required></label>
    <label>Ort<input name="ort" autocomplete="address-level2" required></label>
  </div>
  <label>Art der Räumung
    <select name="art" required>
      ${services.map((service) => `<option>${esc(service.name)}</option>`).join("")}
      <option>Umzug/Räumungsservice</option>
    </select>
  </label>
  <label>Nachricht<textarea name="nachricht" required minlength="10" placeholder="Worum geht es? Ort, Objektart, Größe, gewünschter Zeitraum ..."></textarea></label>
  <label class="checkbox"><input type="checkbox" name="datenschutz" value="1" required> <span>Ich stimme zu, dass meine Angaben zur Bearbeitung der Anfrage verwendet werden. Hinweise stehen in der <a href="/datenschutz/">Datenschutzerklärung</a>.</span></label>
  <button class="button primary" type="submit">Kostenlose Besichtigung anfragen</button>
</form>`;
}

function contactSection() {
  return `<section class="section" id="kontakt">
  <div class="section-head">
    <h2>Kostenlose Besichtigung anfragen</h2>
    <p>Rufen Sie direkt an, schreiben Sie per WhatsApp oder senden Sie die wichtigsten Eckdaten zur Räumung.</p>
  </div>
  <div class="contact-grid">
    <aside class="contact-panel">
      <h3>${company.name}</h3>
      <div class="contact-list">
        <p>${company.street}, A-${company.postal} ${company.city}</p>
        <p>Telefon: <a href="${phoneHref}">${phone}</a></p>
        <p>E-Mail: <a href="mailto:${email}">${email}</a></p>
        <p>WhatsApp: <a href="${whatsapp}">Anfrage senden</a></p>
      </div>
      ${ctaRow()}
    </aside>
    ${contactForm()}
  </div>
</section>`;
}

function internalLinks() {
  return `<div class="link-cloud">
    ${services.map((service) => `<a href="${service.slug}">${esc(service.name)}</a>`).join("")}
    ${regions.map(([name, slug]) => `<a href="${slug}">Entrümpelung ${esc(name)}</a>`).join("")}
  </div>`;
}

function footer() {
  return `<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-grid">
      <div>
        <a class="brand" href="/"><img src="/assets/images/logo.webp" alt="FIXREUMUNG GmbH Logo" width="42" height="42"><span>${company.name}</span></a>
        <p class="muted">${company.street}, A-${company.postal} ${company.city}</p>
        <p class="muted">Telefon: <a href="${phoneHref}">${phone}</a><br>E-Mail: <a href="mailto:${email}">${email}</a></p>
      </div>
      <div class="footer-links">
        <strong>Leistungen</strong>
        ${services.slice(0, 8).map((service) => `<a href="${service.slug}">${esc(service.name)}</a>`).join("")}
      </div>
      <div class="footer-links">
        <strong>Links</strong>
        <a href="/impressum/">Impressum</a>
        <a href="/datenschutz/">Datenschutz</a>
        <a href="/kontakt/">Kontakt</a>
      </div>
    </div>
    <div class="districts" aria-label="Wiener Bezirke">${districts.map((district) => `<a href="${district.slug}">${district.code}</a>`).join("")}</div>
    <p class="copyright">© 2026 ${company.name}. Entrümpelung, Räumung, Haushaltsauflösung und besenreine Übergabe in Österreich.</p>
  </div>
</footer>`;
}

function processSection() {
  const steps = ["Anfrage senden", "Kostenlose Besichtigung", "Fixpreis-Angebot erhalten", "Räumung durchführen", "Besenreine Übergabe"];
  return `<section class="band"><div class="section">
  <div class="section-head"><h2>Ablauf</h2><p>Transparent vom ersten Kontakt bis zur sauberen Übergabe.</p></div>
  <div class="grid steps">${steps.map((step) => `<article class="step"><h3>${step}</h3><p>Wir halten Sie klar informiert und stimmen Termine, Umfang und Übergabe nachvollziehbar ab.</p></article>`).join("")}</div>
</div></section>`;
}

function home() {
  const body = `<section class="hero">
  <div class="hero-copy">
    <span class="eyebrow">Räumung und Entrümpelung in Österreich</span>
    <h1>Entrümpelung Wien & Österreich zum Fixpreis</h1>
    <p class="lead">FIXREUMUNG ist Ihr zuverlässiger Partner für Räumungen, Entrümpelungen, Wohnungsauflösungen, Verlassenschaftsräumungen und Messie-Räumungen in Wien und ganz Österreich.</p>
    ${ctaRow()}
  </div>
  <div class="hero-panel">
    <img src="/assets/images/wohnungsraeumung.webp" alt="Wohnungsräumung und besenreine Übergabe durch FIXREUMUNG GmbH" width="740" height="750" loading="eager">
    <div class="hero-card"><strong>Kostenlose Besichtigung</strong><span class="muted">Danach erhalten Sie ein klares Fixpreis-Angebot.</span></div>
  </div>
</section>
${trustBar()}
<section class="section">
  <div class="section-head"><h2>Leistungen für Räumung und Entrümpelung</h2><p>Von der einzelnen Kellerräumung bis zur kompletten Firmenauflösung: FIXREUMUNG übernimmt Planung, Tragen, Abtransport, fachgerechte Entsorgung und besenreine Übergabe.</p></div>
  ${serviceCards()}
</section>
${processSection()}
<section class="section">
  <div class="section-head"><h2>Entrümpelung in Wien und ganz Österreich</h2><p>Lokale Seiten für Bundesländer und Wiener Bezirke helfen Ihnen schnell zur passenden Information.</p></div>
  <div class="grid areas">${regions.map(([name, slug]) => `<a class="area-link" href="${slug}">Entrümpelung ${esc(name)}</a>`).join("")}</div>
  <div class="section tight"><div class="districts">${districts.map((district) => `<a href="${district.slug}">${district.code} ${esc(district.name)}</a>`).join("")}</div></div>
</section>
${faqSection()}
${contactSection()}`;
  return layout({
    title: "Entrümpelung Wien & Österreich | FIXREUMUNG GmbH",
    description: "Professionelle Entrümpelung in Wien und Österreich. Kostenlose Besichtigung, Fixpreis-Angebot, diskrete Abwicklung und besenreine Übergabe.",
    path: "/",
    h1: "Entrümpelung Wien & Österreich zum Fixpreis",
    intro: "",
    body,
    imageKey: "wohnung"
  });
}

function servicesIndex() {
  const body = `<section class="section">
  <div class="section-head"><h2>Alle Leistungen</h2><p>Jede Räumung beginnt mit einer kostenlosen Besichtigung und einem klaren Fixpreis-Angebot.</p></div>
  ${serviceCards()}
</section>${processSection()}${contactSection()}`;
  return layout({
    title: "Leistungen für Entrümpelung & Räumung | FIXREUMUNG GmbH",
    description: "Wohnungsräumung, Kellerräumung, Verlassenschaftsräumung, Messie-Räumung, Büroräumung, Garagenräumung und Haushaltsauflösung.",
    path: "/leistungen/",
    h1: "Leistungen für Entrümpelung und Räumung",
    intro: "FIXREUMUNG übernimmt Räumungen, Entrümpelungen, Haushaltsauflösungen und Gewerberäumungen mit Fixpreis und besenreiner Übergabe.",
    body,
    imageKey: "geschaeft"
  });
}

function serviceLongText(service) {
  return `<section class="section content-split">
  <div class="text-block">
    <h2>${esc(service.keyword)} mit klarer Planung</h2>
    <p>${esc(service.intro)}</p>
    <p>Am Anfang steht immer die kostenlose Besichtigung. Vor Ort sehen wir, welche Räume betroffen sind, wie der Zugang funktioniert, ob ein Lift vorhanden ist, welche Gegenstände demontiert werden müssen und welche Materialien fachgerecht entsorgt werden. Dadurch entsteht kein Ratespiel, sondern ein nachvollziehbares Fixpreis-Angebot. Für Kundinnen und Kunden ist das besonders wichtig, weil eine Räumung oft unter Zeitdruck stattfindet: Mietende, Verkauf, Übergabe an eine Hausverwaltung, Neuvermietung, Sanierung oder familiäre Veränderungen geben den Rahmen vor.</p>
    <p>FIXREUMUNG arbeitet diskret, freundlich und lösungsorientiert. Das Team achtet darauf, Stiegenhäuser, Liftbereiche und Allgemeinflächen sauber zu halten. Möbel, Hausrat, Kartons, Elektrogeräte, Textilien und Sperrgut werden geordnet getragen und verladen. Wo es sinnvoll ist, werden Materialien getrennt. Ziel ist eine fachgerechte Entsorgung und eine besenreine Übergabe, damit die Fläche anschließend wieder nutzbar, übergabefähig oder bereit für Renovierung und Verkauf ist.</p>
    <h2>Typische Situationen</h2>
    <p>${esc(service.name)} wird häufig benötigt, wenn eine Wohnung aufgegeben wird, ein Keller vollgestellt ist, eine Verlassenschaft geregelt werden muss, eine Immobilie verkauft wird oder ein Betrieb seine Fläche wechselt. Auch kurzfristige Termine sind oft möglich. Wichtig ist, dass Sie frühzeitig Fotos, Adresse, Stockwerk, Zugang und den gewünschten Zeitraum nennen. Je genauer die Angaben sind, desto schneller lässt sich die Besichtigung vorbereiten.</p>
    <p>Bei großen Objekten erstellen wir eine sinnvolle Reihenfolge: zuerst Sichtung, dann Demontage, danach Tragen und Abtransport, zum Schluss Kontrolle und Besenreinigung. Bei kleineren Räumungen reicht oft ein kompakter Termin. In beiden Fällen bleibt der Ablauf transparent. Sie wissen vor Beginn, was erledigt wird, welche Kosten entstehen und wann die Übergabe stattfinden kann.</p>
    <h2>Vorteile mit FIXREUMUNG</h2>
    <p>Der größte Vorteil liegt in der Kombination aus kostenloser Besichtigung, Fixpreis-Angebot und vollständiger Durchführung. Sie müssen keine Transporter organisieren, keine Helfer suchen und keine Entsorgungswege koordinieren. FIXREUMUNG bringt Erfahrung aus Wohnungsräumung Wien, Kellerräumung Wien, Haushaltsauflösung Wien, Verlassenschaftsräumung Wien und Messie Räumung Wien mit. Dadurch können unterschiedliche Objektarten sauber eingeschätzt werden.</p>
    <p>Besonders wichtig ist die besenreine Übergabe. Eine Fläche soll nicht nur leer sein, sondern ordentlich zurückbleiben. Deshalb wird nach der Räumung kontrolliert, ob vereinbarte Bereiche erledigt sind. Bei Übergaben an Vermieter, Eigentümer oder Hausverwaltungen ist diese Sorgfalt ein echter Unterschied. Sie sparen Zeit, vermeiden unnötige Rückfragen und haben eine klare Dokumentation des vereinbarten Leistungsumfangs.</p>
    <h2>Lokale Erfahrung und faire Kommunikation</h2>
    <p>In Wien kennt FIXREUMUNG die typischen Herausforderungen: enge Altbau-Stiegenhäuser, Innenhöfe, Kurzparkzonen, hohe Stockwerke, kleine Kellerabteile und dichte Terminpläne. In Niederösterreich, Burgenland, Oberösterreich und den weiteren Bundesländern geht es oft um Häuser, Nebengebäude, Garagen, Dachböden oder größere Flächen. Jede Situation braucht eine passende Vorbereitung. Genau deshalb ist die Besichtigung kostenlos und unverbindlich.</p>
    <p>Die Kommunikation bleibt einfach: Sie rufen an, senden eine WhatsApp Anfrage oder nutzen das Formular. Danach wird ein Besichtigungstermin abgestimmt. Sie erhalten ein Fixpreis-Angebot und entscheiden in Ruhe. Wenn Sie zustimmen, wird die Räumung terminiert und durchgeführt. Dieser klare Ablauf macht ${esc(service.keyword)} planbar, seriös und stressarm.</p>
    <h2>Interne Links und passende Leistungen</h2>
    <p>Oft hängt ${esc(service.name)} mit weiteren Leistungen zusammen. Eine Wohnungsräumung umfasst häufig auch Keller und Dachboden. Eine Verlassenschaft kann eine Haushaltsauflösung, Garagenräumung oder Geschäftsauflösung berühren. Eine Büroräumung kann Nebenlager oder Aktenräume betreffen. Deshalb finden Sie hier direkte Links zu passenden Leistungen und Standortseiten.</p>
    ${internalLinks()}
  </div>
  <aside class="side-box">
    <h3>Direkt anfragen</h3>
    <p>Schicken Sie Fotos und Ort per WhatsApp oder vereinbaren Sie telefonisch die kostenlose Besichtigung.</p>
    ${ctaRow()}
  </aside>
</section>`;
}

function servicePage(service) {
  const body = `${trustBar()}${serviceLongText(service)}${processSection()}${faqSection()}${contactSection()}`;
  return layout({
    title: `${service.keyword} | FIXREUMUNG GmbH`,
    description: `${service.keyword}: kostenlose Besichtigung, Fixpreis-Angebot, fachgerechte Entsorgung und besenreine Übergabe. Jetzt anfragen.`,
    path: service.slug,
    h1: `${service.keyword} zum Fixpreis`,
    intro: service.intro,
    body,
    imageKey: service.image,
    serviceType: service.name
  });
}

function regionLongText(name, headline, intro) {
  return `<section class="section content-split">
  <div class="text-block">
    <h2>${esc(headline)} mit Fixpreis-Angebot</h2>
    <p>${esc(intro)}</p>
    <p>FIXREUMUNG unterstützt private Haushalte, Angehörige, Eigentümer, Hausverwaltungen und Unternehmen bei Räumungen in ${esc(name)}. Dazu zählen Wohnungsräumung, Räumung Wien und Österreich, Kellerräumung, Dachbodenentrümpelung, Verlassenschaftsräumung, Messie-Räumung, Garagenräumung, Büroräumung, Haushaltsauflösung, Firmenauflösung und Geschäftsauflösung. Jede Anfrage beginnt mit einer kostenlosen Besichtigung, damit Aufwand, Menge, Zugang und Entsorgung realistisch eingeschätzt werden können.</p>
    <p>Gerade bei lokalen Räumungen ist Vertrauen entscheidend. Kundinnen und Kunden möchten wissen, wer kommt, was passiert und welche Kosten entstehen. Deshalb arbeitet FIXREUMUNG mit einem klaren Fixpreis-Angebot. Vor Beginn wird besprochen, welche Räume geräumt werden, welche Gegenstände bleiben sollen, welche Bereiche besonders zu behandeln sind und wie die besenreine Übergabe aussehen soll. Dadurch bleibt die Entrümpelung in ${esc(name)} planbar und nachvollziehbar.</p>
    <h2>Leistungen in ${esc(name)}</h2>
    <p>Eine typische Entrümpelung kann sehr unterschiedlich aussehen. In Stadtlagen geht es oft um Wohnungen, Kellerabteile, Dachböden und Geschäftslokale. In ländlicheren Bereichen kommen Häuser, Garagen, Nebengebäude, Lagerflächen oder größere Haushaltsauflösungen dazu. FIXREUMUNG übernimmt das Sortieren, Demontieren, Tragen, Verladen und die fachgerechte Entsorgung. Das Ziel ist immer dasselbe: Die Räume sollen leer, ordentlich und besenrein übergeben werden.</p>
    <p>Besonders häufig gefragt sind Wohnungsräumung Wien, Entrümpelung Österreich, Haushaltsauflösung Wien, Kellerräumung Wien, Verlassenschaftsräumung Wien und Messie Räumung Wien. Diese Erfahrungen helfen auch bei Aufträgen in ${esc(name)}, weil ähnliche Anforderungen auftreten: knappe Fristen, sensible Situationen, schwer zugängliche Räume, volle Keller, gemischter Hausrat und der Wunsch nach einer schnellen, diskreten Lösung.</p>
    <h2>Ablauf vor Ort</h2>
    <p>Der Ablauf ist bewusst einfach gehalten. Sie senden eine Anfrage mit Ort, Objektart und gewünschtem Zeitraum. Danach wird eine kostenlose Besichtigung vereinbart. Vor Ort prüft FIXREUMUNG Zugänge, Menge, Stockwerk, Lift, Haltemöglichkeiten und Entsorgungsaufwand. Anschließend erhalten Sie ein Fixpreis-Angebot. Wenn Sie zustimmen, wird der Termin fixiert und die Räumung durchgeführt. Am Ende steht die besenreine Übergabe.</p>
    <p>Für Verlassenschaften und Haushaltsauflösungen wird besonders sorgfältig abgestimmt, welche Gegenstände bleiben sollen und welche Bereiche vollständig geräumt werden. Bei Messie-Räumungen steht Diskretion im Mittelpunkt. Bei Büro- und Geschäftsflächen sind Termine und Übergabezustand wichtig. Bei Keller, Garage und Dachboden geht es oft um enge Zugänge, Staub und unterschiedliche Materialien. FIXREUMUNG bringt dafür Routine und die passende Organisation mit.</p>
    <h2>Warum FIXREUMUNG in ${esc(name)}?</h2>
    <p>Die Vorteile sind kostenlose Besichtigung, Fixpreis-Angebot, kurzfristige Termine, diskrete Abwicklung, fachgerechte Entsorgung und besenreine Übergabe. Sie erhalten eine direkte Ansprechperson, klare Kommunikation und eine Lösung, die auf Ihr Objekt abgestimmt ist. So wird aus einer belastenden Aufgabe ein geordneter Ablauf.</p>
    <p>Wenn eine Immobilie verkauft, übergeben, saniert oder neu vermietet werden soll, zählt Verlässlichkeit. Eine Räumung darf nicht zur Dauerbaustelle werden. FIXREUMUNG arbeitet strukturiert, hält Absprachen ein und sorgt dafür, dass die Fläche nach der Entrümpelung wieder nutzbar ist. Das gilt für kleine Keller genauso wie für ganze Wohnungen, Häuser, Büros oder Geschäftslokale.</p>
    <h2>Weitere Informationen</h2>
    <p>Nutzen Sie die internen Links zu den Leistungen, wenn Sie eine bestimmte Räumungsart suchen. Die Standortseiten führen zu anderen Bundesländern und Wiener Bezirken. So finden Sie schnell die passende Information für Entrümpelung Wien, Entrümpelung Niederösterreich, Entrümpelung Burgenland, Entrümpelung Oberösterreich, Entrümpelung Steiermark, Entrümpelung Salzburg, Entrümpelung Kärnten, Entrümpelung Tirol und Entrümpelung Vorarlberg.</p>
    ${internalLinks()}
  </div>
  <aside class="side-box">
    <h3>Besichtigung in ${esc(name)}</h3>
    <p>Rufen Sie an oder senden Sie Fotos per WhatsApp. FIXREUMUNG meldet sich zur Terminabstimmung.</p>
    ${ctaRow()}
  </aside>
</section>`;
}

function regionPage([name, slug, headline, intro]) {
  const body = `${trustBar()}${regionLongText(name, headline, intro)}${serviceCards(6)}${processSection()}${faqSection()}${contactSection()}`;
  return layout({
    title: `${headline} | Räumung & Fixpreis | FIXREUMUNG GmbH`,
    description: `${headline}: kostenlose Besichtigung, Fixpreis-Angebot, diskrete Räumung, fachgerechte Entsorgung und besenreine Übergabe.`,
    path: slug,
    h1: `${headline} zum Fixpreis`,
    intro,
    body,
    imageKey: "wohnung"
  });
}

function districtText(district) {
  return `<section class="section content-split">
  <div class="text-block">
    <h2>Entrümpelung im ${district.code}. Bezirk ${esc(district.name)}</h2>
    <p>FIXREUMUNG übernimmt Entrümpelung in ${district.code} Wien für Wohnungen, Keller, Dachböden, Garagen, Verlassenschaften und Gewerbeflächen. Der ${district.code}. Bezirk hat je nach Lage unterschiedliche Anforderungen: Altbau, Neubau, enge Stiegenhäuser, kleine Kellerabteile, Zufahrten, Liftbenutzung und kurze Übergabefristen. Genau deshalb beginnt jede Räumung mit einer kostenlosen Besichtigung.</p>
    <p>Bei der Wohnungsräumung in ${district.name} geht es um Möbel, Hausrat, Elektrogeräte, Textilien, Kartons und Sperrgut. Das Team von FIXREUMUNG plant den Ablauf so, dass Stiegenhaus und Allgemeinflächen sauber bleiben. Wenn ein Lift vorhanden ist, wird die Nutzung abgestimmt. Wenn der Zugang enger ist, wird die Räumung entsprechend vorbereitet. Nach Abschluss wird besenrein übergeben.</p>
    <p>Keller- und Dachbodenräumung sind im Wiener Bezirk besonders häufig gefragt. Viele Kellerabteile wurden jahrelang nicht sortiert und enthalten gemischte Gegenstände. Dachböden sind oft staubig, schwer zugänglich oder nur über schmale Wege erreichbar. FIXREUMUNG räumt diese Bereiche strukturiert, trägt alles ab und achtet auf fachgerechte Entsorgung.</p>
    <p>Auch Verlassenschaftsräumungen im ${district.code}. Bezirk werden diskret und mit Feingefühl durchgeführt. Angehörige, Eigentümer oder Verwaltungen erhalten eine klare Abstimmung darüber, welche Bereiche geräumt werden und was bleiben soll. Bei Messie-Räumungen ist Diskretion besonders wichtig. FIXREUMUNG arbeitet ruhig, respektvoll und lösungsorientiert, damit belastete Räume wieder nutzbar werden.</p>
    <p>Der Ablauf ist einfach: Anfrage senden, kostenlose Besichtigung vereinbaren, Fixpreis-Angebot erhalten, Räumung durchführen lassen und besenreine Übergabe kontrollieren. Kurzfristige Termine sind oft möglich, vor allem wenn Fotos, Adresse, Stockwerk, Liftangabe und gewünschter Zeitraum bereits bei der Anfrage mitgeschickt werden.</p>
    <p>Für Entrümpelung Wien, Räumung Wien, Wohnungsräumung Wien, Kellerräumung Wien, Verlassenschaftsräumung Wien, Messie Räumung Wien und Haushaltsauflösung Wien bietet FIXREUMUNG lokale Erfahrung und klare Kommunikation. So wird aus einer unübersichtlichen Aufgabe ein verlässlicher Ablauf mit Fixpreis und sauberem Ergebnis.</p>
    ${internalLinks()}
  </div>
  <aside class="side-box"><h3>Termin in ${district.code} Wien</h3><p>Kurzfristige Besichtigungen sind oft möglich. Senden Sie Fotos per WhatsApp oder rufen Sie direkt an.</p>${ctaRow()}</aside>
</section>`;
}

function districtPage(district) {
  const body = `${trustBar()}${districtText(district)}${serviceCards(6)}${processSection()}${faqSection()}${contactSection()}`;
  return layout({
    title: `Entrümpelung ${district.code} Wien ${district.name} | FIXREUMUNG GmbH`,
    description: `Entrümpelung in ${district.code} Wien ${district.name}: kostenlose Besichtigung, Fixpreis, kurzfristige Termine und besenreine Übergabe.`,
    path: district.slug,
    h1: `Entrümpelung ${district.code} Wien ${district.name}`,
    intro: `Schnelle, diskrete und besenreine Räumung im ${district.code}. Bezirk mit kostenloser Besichtigung und Fixpreis-Angebot.`,
    body,
    imageKey: "keller"
  });
}

function austriaPage() {
  const body = `${trustBar()}${regionLongText("Österreich", "Entrümpelung Österreich", "FIXREUMUNG ist Ihr Ansprechpartner für Entrümpelung, Räumung, Haushaltsauflösung und besenreine Übergabe in ganz Österreich.")}${serviceCards()}${processSection()}${faqSection()}${contactSection()}`;
  return layout({
    title: "Entrümpelung Österreich | FIXREUMUNG GmbH",
    description: "Entrümpelung in Österreich: kostenlose Besichtigung, Fixpreis-Angebot, fachgerechte Entsorgung und besenreine Übergabe.",
    path: "/entruempelung-oesterreich/",
    h1: "Entrümpelung Österreich zum Fixpreis",
    intro: "Räumungen, Entrümpelungen, Haushaltsauflösungen und Verlassenschaftsräumungen in Österreich mit klarer Planung.",
    body,
    imageKey: "wohnung"
  });
}

function contactPage() {
  return layout({
    title: "Kontakt | FIXREUMUNG GmbH",
    description: "FIXREUMUNG GmbH kontaktieren: Telefon, WhatsApp, E-Mail und Formular für kostenlose Besichtigung in Wien und Österreich.",
    path: "/kontakt/",
    h1: "Kontakt zu FIXREUMUNG GmbH",
    intro: "Fragen Sie Ihre kostenlose Besichtigung für Entrümpelung, Räumung oder Haushaltsauflösung an.",
    body: contactSection(),
    imageKey: "geschaeft"
  });
}

function imprintPage() {
  const body = `<section class="section content-split">
  <div class="text-block">
    <h2>Angaben gemäß Impressumspflicht</h2>
    <p>Firmenname: ${company.legalName}</p>
    <p>Adresse: ${company.street}, A-${company.postal} ${company.city}</p>
    <p>E-Mail: <a href="mailto:${email}">${email}</a></p>
    <p>Telefon: <a href="${phoneHref}">${phone}</a></p>
    <p>Umsatzsteuer-Identifikationsnummer: ${company.vat}</p>
    <p>Firmenbuchnummer: ${company.register}</p>
    <p>Firmenbuchgericht: ${company.court}</p>
    <p>Mitglied der ${company.chamber}</p>
    <p>Aufsichtsbehörde: ${company.authority}</p>
    <p>Unternehmensgegenstand: ${company.subject}</p>
    <p>Geschäftsführer: ${company.manager}</p>
  </div>
  <aside class="side-box"><h3>Kontakt</h3><p>Für Anfragen zu Räumung und Entrümpelung erreichen Sie uns telefonisch, per E-Mail oder WhatsApp.</p>${ctaRow()}</aside>
</section>
<section class="section tight">
  <div class="section-head">
    <h2>Leistungen von FIXREUMUNG</h2>
    <p>Ein kurzer Eindruck aus den Bereichen Wohnungsräumung, Verlassenschaftsräumung, Kellerräumung und Geschäftsauflösung.</p>
  </div>
  <div class="grid cards">
    ${["wohnung", "verlassenschaft", "keller", "geschaeft"].map((key) => {
      const [src, alt] = imageMap[key];
      return `<figure class="image-tile"><img src="${src}" alt="${esc(alt)}" width="370" height="375" loading="lazy"><figcaption>${esc(alt)}</figcaption></figure>`;
    }).join("")}
  </div>
</section>`;
  return layout({
    title: "Impressum | FIXREUMUNG GmbH",
    description: "Impressum der FIXREUMUNG GmbH mit Adresse, Kontakt, Firmenbuchnummer und Unternehmensdaten.",
    path: "/impressum/",
    h1: "Impressum",
    intro: "Rechtliche Angaben zur FIXREUMUNG GmbH.",
    body,
    imageKey: "logo"
  });
}

function privacyPage() {
  const body = `<section class="section">
  <div class="text-block privacy">
    <h2>Datenschutzerklärung</h2>
    <p>Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bearbeitung Ihrer Anfrage, zur Terminabstimmung und zur Durchführung von Räumungs- und Entrümpelungsleistungen erforderlich ist. Dazu zählen insbesondere Name, Telefonnummer, E-Mail-Adresse, Ort, Art der Räumung und Ihre Nachricht.</p>
    <p>Die Übermittlung über das Kontaktformular erfolgt auf Grundlage Ihrer Einwilligung. Ihre Daten werden nicht für fremde Werbung verkauft und nicht unnötig weitergegeben. Eine Weitergabe kann nur erforderlich sein, wenn dies zur Vertragserfüllung, gesetzlichen Erfüllung oder technischen Bereitstellung notwendig ist.</p>
    <p>Sie haben Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung und Widerspruch im Rahmen der gesetzlichen Vorgaben. Kontaktieren Sie uns dazu unter <a href="mailto:${email}">${email}</a>.</p>
  </div>
</section>${contactSection()}`;
  return layout({
    title: "Datenschutz | FIXREUMUNG GmbH",
    description: "Datenschutzhinweise der FIXREUMUNG GmbH zur Bearbeitung von Kontaktanfragen.",
    path: "/datenschutz/",
    h1: "Datenschutz",
    intro: "Hinweise zur Verarbeitung von Kontakt- und Anfragedaten.",
    body,
    imageKey: "logo"
  });
}

function contactPhp() {
  return `<?php
declare(strict_types=1);
function clean_text(string $value, int $max): string {
  $value = trim(str_replace(["\\r", "\\n"], " ", $value));
  $value = strip_tags($value);
  return function_exists('mb_substr') ? mb_substr($value, 0, $max) : substr($value, 0, $max);
}
function text_len(string $value): int {
  return function_exists('mb_strlen') ? mb_strlen($value) : strlen($value);
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  exit('Methode nicht erlaubt');
}
if (!empty($_POST['website'] ?? '')) {
  http_response_code(200);
  exit('Danke.');
}
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = sys_get_temp_dir() . '/fixreumung_' . hash('sha256', $ip) . '.txt';
$now = time();
if (is_file($rateFile) && ($now - (int)file_get_contents($rateFile)) < 60) {
  http_response_code(429);
  exit('Bitte warten Sie kurz, bevor Sie erneut senden.');
}
file_put_contents($rateFile, (string)$now, LOCK_EX);
$name = clean_text($_POST['name'] ?? '', 120);
$telefon = clean_text($_POST['telefon'] ?? '', 80);
$email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
$ort = clean_text($_POST['ort'] ?? '', 120);
$art = clean_text($_POST['art'] ?? '', 120);
$nachricht = trim(strip_tags($_POST['nachricht'] ?? ''));
$datenschutz = ($_POST['datenschutz'] ?? '') === '1';
if (text_len($name) < 2 || text_len($telefon) < 5 || !$email || text_len($ort) < 2 || text_len($nachricht) < 10 || !$datenschutz) {
  http_response_code(400);
  exit('Bitte füllen Sie alle Pflichtfelder korrekt aus.');
}
$nachricht = function_exists('mb_substr') ? mb_substr($nachricht, 0, 3000) : substr($nachricht, 0, 3000);
$body = "Neue Anfrage von fixreumung.at\\n\\nName: $name\\nTelefon: $telefon\\nE-Mail: $email\\nOrt: $ort\\nArt: $art\\n\\nNachricht:\\n$nachricht\\n";
$headers = [
  'From: FIXREUMUNG Website <${email}>',
  'Reply-To: ' . $email,
  'Content-Type: text/plain; charset=UTF-8'
];
mail('${email}', 'Kostenlose Besichtigung Anfrage', $body, implode("\\r\\n", $headers));
header('Location: /kontakt/?gesendet=1', true, 303);
exit;
`;
}

function htaccess() {
  return `RewriteEngine On
RewriteCond %{HTTPS} !=on
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

Header always set Content-Security-Policy "default-src 'self'; img-src 'self' data: https://fixreumung.at; style-src 'self' 'unsafe-inline'; form-action 'self'; base-uri 'self'; frame-ancestors 'none'"
Header always set X-Frame-Options "DENY"
Header always set X-Content-Type-Options "nosniff"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"

<FilesMatch "\\.(css|js|svg|webp)$">
  Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>
<FilesMatch "\\.(html|xml|txt)$">
  Header set Cache-Control "public, max-age=300"
</FilesMatch>
`;
}

async function writePage(path, html) {
  const file = join(dist, slugPath(path));
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}

async function main() {
  await mkdir(join(dist, "assets"), { recursive: true });
  await cp(join(root, "src", "assets", "images"), join(dist, "assets", "images"), { recursive: true });
  await cp(join(root, "src", "styles.css"), join(dist, "assets", "styles.css"));

  const pages = [
    ["/", home()],
    ["/leistungen/", servicesIndex()],
    ["/entruempelung-oesterreich/", austriaPage()],
    ["/kontakt/", contactPage()],
    ["/impressum/", imprintPage()],
    ["/datenschutz/", privacyPage()],
    ...services.map((service) => [service.slug, servicePage(service)]),
    ...regions.map((region) => [region[1], regionPage(region)]),
    ...districts.map((district) => [district.slug, districtPage(district)])
  ];

  for (const [path, html] of pages) {
    for (const term of forbiddenTerms) {
      if (html.includes(term)) throw new Error(`Forbidden visible term "${term}" in ${path}`);
    }
    await writePage(path, html);
  }

  await writeFile(join(dist, "kontaktformular.php"), contactPhp());
  await writeFile(join(dist, ".htaccess"), htaccess());
  await writeFile(join(dist, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml\n`);
  await writeFile(join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(([path]) => `  <url><loc>${baseUrl}${path}</loc></url>`).join("\n")}\n</urlset>\n`);

  const serviceCounts = services.map((service) => [service.slug, wordCount(servicePage(service))]);
  const shortService = serviceCounts.filter(([, count]) => count < 900);
  if (shortService.length) throw new Error(`Service page too short: ${JSON.stringify(shortService)}`);
  const regionCounts = regions.map((region) => [region[1], wordCount(regionPage(region))]);
  const shortRegions = regionCounts.filter(([, count]) => count < 800);
  if (shortRegions.length) throw new Error(`Region page too short: ${JSON.stringify(shortRegions)}`);
}

main();
