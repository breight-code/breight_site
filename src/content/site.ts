export type Lang = "it" | "en";

export const links = {
  github: "https://github.com/breight-code",
  pub: "https://pub.dev/publishers/breight-code.it/packages",
  email: "br8st99@gmail.com",
  site: "https://breight-code.it",
};

export const developerCode = `class Developer {
  String name = 'Marco Brotto';
  List<String> expertise = [
    'Flutter', 'Dart',
    'Node.js', 'TypeScript',
    'Swift', 'Sequelize'
  ];
}`;

export type Project = {
  slug: string;
  title: string;
  kind: string;
  status: string;
  description: string;
  stack: string[];
  live?: string;
  code?: string;
};

export type Lane = { word: string; title: string; text: string; tags: string[] };

type Copy = {
  meta: { title: string; description: string };
  nav: { skills: string; work: string; contact: string; hire: string; other: string };
  hero: { lines: [string, string]; h1: string; sentence: string; primary: string; secondary: string };
  intro: { lead: string };
  skills: { title: string; text: string; lanes: Lane[] };
  terminal: { title: string; text: string; hint: string; welcome: string };
  work: { title: string; text: string; live: string; code: string; privateCode: string; items: Project[] };
  contact: { title: string; text: string; rows: { label: string; value: string; href?: string }[]; mailSubject: string };
  footer: { note: string; place: string; top: string };
};

const projectsEn: Project[] = [
  { slug: "tsuba", title: "Tsuba", kind: "macOS app", status: "Version 0.8", description: "The native Git client for Mac. Commit graph, line staging, interactive rebase and 3-way merge in one fast window, with AI commit messages that stay on device.", stack: ["Swift", "SwiftUI", "Git", "Apple Intelligence"] },
  { slug: "flutter-showcase", title: "Flutter Showcase", kind: "Mobile apps", status: "Upcoming", description: "A collection of Flutter screens and patterns: complex animations, state management with BLoC, real API integrations. One app to try them all.", stack: ["Flutter", "Dart", "Animations", "Firebase"] },
  { slug: "breight-code", title: "br(e)ight-code.it", kind: "Website", status: "Live", description: "This site. Static HTML from Astro, React islands for the interactive parts, animations with Motion. The source is public.", stack: ["Astro", "React", "TypeScript", "Motion"], live: links.site, code: "https://github.com/breight-code/breight_site" },
  { slug: "dio-shaker", title: "Dio Shaker Interceptor", kind: "Flutter package", status: "Published on pub.dev", description: "A Flutter package for the Dio HTTP client: shake the device to open a debugger with every request and response.", stack: ["Flutter", "Dart", "Networking", "Debugging"], live: "https://pub.dev/packages/dio_shaker_interceptor", code: links.github },
];

const projectsIt: Project[] = [
  { ...projectsEn[0], kind: "App macOS", status: "Versione 0.8", description: "Il client Git nativo per Mac. Grafo dei commit, staging per riga, rebase interattivo e merge a tre vie in una finestra veloce, con messaggi di commit AI che restano sul dispositivo." },
  { ...projectsEn[1], kind: "App mobile", status: "In arrivo", description: "Una raccolta di schermate e pattern Flutter: animazioni complesse, gestione dello stato con BLoC, integrazioni API reali. Un'app sola per provarli tutti." },
  { ...projectsEn[2], kind: "Sito web", status: "Online", description: "Questo sito. HTML statico generato con Astro, isole React per le parti interattive, animazioni con Motion. Il sorgente è pubblico." },
  { ...projectsEn[3], kind: "Package Flutter", status: "Pubblicato su pub.dev", description: "Un package Flutter per il client HTTP Dio: scuoti il device e si apre un debugger con ogni richiesta e risposta." },
];

const lanesEn: Lane[] = [
  { word: "Mobile", title: "Mobile development", text: "One Flutter codebase for iOS and Android, state handled with BLoC or Provider, data synced through Firebase or REST.", tags: ["Flutter", "Dart", "BLoC", "Provider", "Firebase", "REST API"] },
  { word: "Backend", title: "Backend development", text: "REST and GraphQL APIs in Node.js and TypeScript, built on Express, with types from the database to the client.", tags: ["Node.js", "Express", "TypeScript", "RESTful APIs", "GraphQL"] },
  { word: "Data", title: "Databases", text: "Schemas, migrations and queries with Sequelize on PostgreSQL or MySQL. MongoDB and Firebase when the data fits them better.", tags: ["Sequelize", "PostgreSQL", "MySQL", "MongoDB", "Firebase"] },
  { word: "UI/UX", title: "UI and UX design", text: "Interfaces designed before they are coded: prototypes, layouts that adapt to every screen, motion that shows what changed.", tags: ["Material Design", "Responsive Design", "Animations", "Prototyping"] },
  { word: "Polyglot", title: "Other languages", text: "Kotlin and Swift when a feature needs the native platform, Java and JavaScript when a project already speaks them.", tags: ["JavaScript", "Kotlin", "Swift", "Java", "HTML/CSS"] },
  { word: "Tooling", title: "Tools and practices", text: "Git, tests written first, CI/CD pipelines and Docker, so every release can be repeated. AWS for hosting.", tags: ["Git", "CI/CD", "TDD", "Agile", "Docker", "AWS"] },
];

const lanesIt: Lane[] = [
  { ...lanesEn[0], title: "Sviluppo mobile", text: "Un solo codebase Flutter per iOS e Android, stato gestito con BLoC o Provider, dati sincronizzati con Firebase o REST." },
  { ...lanesEn[1], title: "Sviluppo backend", text: "API REST e GraphQL in Node.js e TypeScript, su Express, con i tipi che vanno dal database al client." },
  { ...lanesEn[2], word: "Dati", title: "Database", text: "Schemi, migrazioni e query con Sequelize su PostgreSQL o MySQL. MongoDB e Firebase quando i dati ci stanno meglio." },
  { ...lanesEn[3], title: "Design UI e UX", text: "Interfacce progettate prima di essere scritte: prototipi, layout che si adattano a ogni schermo, animazioni che mostrano cosa è cambiato." },
  { ...lanesEn[4], word: "Poliglotta", title: "Altri linguaggi", text: "Kotlin e Swift quando una funzione chiede la piattaforma nativa, Java e JavaScript quando il progetto li parla già." },
  { ...lanesEn[5], title: "Strumenti e pratiche", text: "Git, test scritti prima del codice, pipeline CI/CD e Docker, perché ogni rilascio si possa ripetere. AWS per l'hosting." },
];

export const copy: Record<Lang, Copy> = {
  en: {
    meta: {
      title: "br(e)ight-code · Software development: apps, backends and tools",
      description: "br(e)ight-code, custom software development from Montebelluna, Italy: mobile apps with Flutter, backends with Node.js and TypeScript, native Mac tools in Swift. Available for freelance work.",
    },
    nav: { skills: "What I do", work: "Projects", contact: "Contact", hire: "Write me", other: "Italiano" },
    hero: {
      lines: ["br(e)ight", "code"],
      h1: "br(e)ight-code: software development, apps, backends and tools",
      sentence: "Custom software development: mobile apps with Flutter, backends with Node.js and TypeScript, native tools for Mac.",
      primary: "Tell me about your project",
      secondary: "See the projects",
    },
    intro: {
      lead: "Behind br(e)ight-code there is one developer: the person who answers your email is the person who writes the code. I design the app, the backend behind it and the tools I need to work better.",
    },
    skills: { title: "What I do", text: "The tools I use every day, grouped by area.", lanes: lanesEn },
    terminal: {
      title: "Try the terminal",
      text: "The same site as a command line. Type help or tap a command.",
      hint: "Type a command",
      welcome: "breight-code shell. Type help to list commands.",
    },
    work: { title: "Projects", text: "Products I build and maintain myself, from a Git client for Mac to Flutter packages.", live: "Live demo", code: "GitHub", privateCode: "Code private", items: projectsEn },
    contact: {
      title: "Let's talk",
      text: "Describe the project in a few lines: what it should do, who it is for, when you need it. I answer personally.",
      rows: [
        { label: "Email", value: links.email, href: `mailto:${links.email}` },
        { label: "GitHub", value: "github.com/breight-code", href: links.github },
        { label: "Pub.dev", value: "pub.dev/breight-code.it", href: links.pub },
        { label: "Location", value: "Montebelluna, Italy" },
      ],
      mailSubject: "New project with br(e)ight-code",
    },
    footer: { note: "Custom software development. Available for freelance work.", place: "Montebelluna, IT", top: "Back to top" },
  },
  it: {
    meta: {
      title: "br(e)ight-code · Sviluppo software: app, backend e tool",
      description: "br(e)ight-code, sviluppo software su misura a Montebelluna (TV): app mobile con Flutter, backend con Node.js e TypeScript, tool nativi per Mac in Swift. Disponibile per lavori freelance.",
    },
    nav: { skills: "Cosa faccio", work: "Progetti", contact: "Contatti", hire: "Scrivimi", other: "English" },
    hero: {
      lines: ["br(e)ight", "code"],
      h1: "br(e)ight-code: sviluppo software, app, backend e tool",
      sentence: "Sviluppo software su misura: app mobile con Flutter, backend con Node.js e TypeScript, tool nativi per Mac.",
      primary: "Raccontami il progetto",
      secondary: "Guarda i progetti",
    },
    intro: {
      lead: "Dietro br(e)ight-code c'è uno sviluppatore solo: chi risponde alla tua mail è chi scrive il codice. Progetto l'app, il backend che la regge e i tool che mi servono per lavorare meglio.",
    },
    skills: { title: "Cosa faccio", text: "Gli strumenti che uso ogni giorno, divisi per area.", lanes: lanesIt },
    terminal: {
      title: "Prova il terminale",
      text: "Lo stesso sito, in versione riga di comando. Scrivi help o tocca un comando.",
      hint: "Scrivi un comando",
      welcome: "breight-code shell. Scrivi help per la lista dei comandi.",
    },
    work: { title: "Progetti", text: "Prodotti che sviluppo e mantengo io, dal client Git per Mac ai package Flutter.", live: "Demo live", code: "GitHub", privateCode: "Codice privato", items: projectsIt },
    contact: {
      title: "Parliamone",
      text: "Descrivi il progetto in due righe: cosa deve fare, per chi, entro quando. Rispondo io, personalmente.",
      rows: [
        { label: "Email", value: links.email, href: `mailto:${links.email}` },
        { label: "GitHub", value: "github.com/breight-code", href: links.github },
        { label: "Pub.dev", value: "pub.dev/breight-code.it", href: links.pub },
        { label: "Base", value: "Montebelluna, Italia" },
      ],
      mailSubject: "Nuovo progetto con br(e)ight-code",
    },
    footer: { note: "Sviluppo software su misura. Disponibile per lavori freelance.", place: "Montebelluna, IT", top: "Torna su" },
  },
};
