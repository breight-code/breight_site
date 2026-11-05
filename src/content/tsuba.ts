import { links, type Lang } from "./site";

export const tsubaLinks = {
  download: "https://github.com/breight-code/tsuba-releases/releases/latest/download/Tsuba.zip",
  releases: "https://github.com/breight-code/tsuba-releases/releases",
};

export const tsubaPaths = {
  home: { it: "/tsuba/", en: "/en/tsuba/" },
  privacy: { it: "/tsuba/privacy/", en: "/en/tsuba/privacy/" },
};

export const homePaths = { it: "/", en: "/en/" };

export type Item = { title: string; text: string };
export type Faq = { q: string; a: string };

export type MergeCopy = {
  heading: string;
  lead: string;
  title: string;
  left: string;
  result: string;
  right: string;
  accept: string;
  ignore: string;
  resolved: string;
  remaining: string;
  reset: string;
  apply: string;
  all: string;
  auto: string;
  jev: string;
  mark: string;
  of: string;
};

export type PrivacyCopy = {
  h1: string;
  intro: string;
  netHeading: string;
  table: { head: [string, string, string]; rows: [string, string, string][] };
  telemetry: string;
  stayHeading: string;
  stay: string[];
  offHeading: string;
  off: string[];
  checkHeading: string;
  check: string;
};

// Screenshot file names in src/assets/tsuba/{it,en}/.
export type Shot = "history" | "changes" | "reflog" | "merge" | "compare" | "conflicts" | "merge-banner" | "stats" | "quick-launch";
export type Step = { cmd: string; title: string; text: string; tags: string[]; shot: Shot };

export type CommitCopy = {
  label: string;
  staged: string;
  summary: string;
  body: string;
  placeholder: [string, string];
  writing: string;
  amend: string;
  commit: string;
};

export type TsubaCopy = {
  meta: { title: string; description: string };
  privacyMeta: { title: string; description: string };
  nav: { features: string; merge: string; themes: string; download: string; faq: string; other: string; home: string; by: string; pill: string; back: string };
  hero: { h1: string; lead: string; primary: string; secondary: string; req: string };
  story: { heading: string; text: string; steps: Step[]; more: Item[] };
  gallery: { heading: string; text: string; items: (Item & { shot: Shot })[] };
  merge: MergeCopy;
  ai: { heading: string; lead: string; items: Item[] };
  commit: CommitCopy;
  native: { heading: string; items: Item[]; privacy: string };
  themes: { heading: string; lead: string; label: string };
  download: { heading: string; lead: string; button: string; busy: string; done: string; noteCheck: string; noteNot: string; noteGithub: string; noteSteps: string; req: string; steps: string[]; command: string; sparkle: string; releases: string };
  faq: { heading: string; items: Faq[] };
  footer: { note: string; privacy: string; releases: string };
  // Alt text of each screenshot, describing the UI language of that page.
  shots: Record<Shot, string>;
  privacy: PrivacyCopy;
};

export const tsuba: Record<Lang, TsubaCopy> = {
  it: {
    meta: {
      title: "Tsuba · Il client Git nativo per Mac | br(e)ight-code",
      description: "Tsuba è un client Git nativo per macOS: grafo dei commit, staging per riga, rebase interattivo, merge a tre vie, workspace multi-repo e messaggi di commit scritti dall'AI sul tuo Mac.",
    },
    privacyMeta: {
      title: "Privacy di Tsuba: cosa esce dal Mac",
      description: "Ogni connessione di rete di Tsuba, il client Git per Mac: cosa resta sul Mac, cosa va a Claude o Jev e come spegnere tutto il cloud.",
    },
    nav: { features: "Funzioni", merge: "Merge", themes: "Temi", download: "Scarica", faq: "FAQ", other: "English", home: "br(e)ight-code", by: "di br(e)ight-code", pill: "Scarica", back: "← Tsuba" },
    hero: {
      h1: "Tsuba, il client Git nativo per Mac",
      lead: "Tsuba è il client Git nativo per Mac. Grafo, staging per riga, rebase e merge a tre vie in una finestra veloce, con l'AI che resta sul tuo Mac quando può.",
      primary: "Scarica per macOS",
      secondary: "Prova il merge",
      req: "macOS 14 Sonoma o successivo, Apple silicon e Intel. Richiede git installato.",
    },
    story: {
      heading: "Tutto git, senza terminale",
      text: "Le operazioni che useresti dal terminale, con il grafo sempre davanti.",
      steps: [
        { cmd: "git log --graph", title: "Leggi la cronologia", text: "Ref, tag e stash stanno sul grafo. Cerchi per messaggio, autore o codice con -S, e i rami già uniti si richiudono dal punto di merge.", tags: ["Ref", "Tag", "Stash", "Search -S", "Blame"], shot: "history" },
        { cmd: "git add -p", title: "Metti in stage solo quello che vuoi", text: "Un file, un hunk o una sola riga, e scarti allo stesso modo. Il commit prende esattamente quello che hai scelto.", tags: ["File", "Hunk", "Line", "Discard"], shot: "changes" },
        { cmd: "git reflog", title: "Torna indietro", text: "Un reset, un merge o un rebase andati storti: ⌘⇧Z annulla l'ultima operazione. Il reflog è sempre a un clic, e gli stash persi si recuperano.", tags: ["⌘⇧Z", "Reflog", "Stash persi"], shot: "reflog" },
        { cmd: "git merge", title: "Risolvi i conflitti a tre vie", text: "Quando un merge si ferma, un banner dice cosa manca. L'editor di merge mette i due rami e il risultato fianco a fianco, blocco per blocco.", tags: ["Accetta sinistra", "Accetta destra", "Ignora", "Risolvi automaticamente"], shot: "merge" },
      ],
      more: [
        { title: "Rebase interattivo", text: "Pick, reword, squash, fixup, drop. Riordini trascinando." },
        { title: "Bisect guidato", text: "Buono, cattivo, salta. Tsuba conta le revisioni rimaste e ti mostra il primo commit rotto." },
      ],
    },
    gallery: {
      heading: "Dentro l'app",
      text: "Finestre vere di Tsuba, catturate con un repository di prova.",
      items: [
        { shot: "compare", title: "Confronta due ref", text: "Qualsiasi ramo, tag o commit contro un altro o contro la copia di lavoro, con avanti e indietro." },
        { shot: "conflicts", title: "Conflitti", text: "Scegli un lato per ogni file, oppure aprilo nell'editor di merge." },
        { shot: "merge-banner", title: "Merge in corso", text: "Un banner sopra il grafo dice cosa manca: risolvi, segna il file, continua." },
        { shot: "stats", title: "Statistiche", text: "Commit per settimana e le persone che li hanno scritti." },
        { shot: "quick-launch", title: "Avvio rapido", text: "⌘K apre, clona o crea un repository senza togliere le mani dalla tastiera." },
      ],
    },
    merge: {
      heading: "Il merge a tre vie, blocco per blocco",
      lead: "A sinistra le modifiche di un ramo, a destra quelle dell'altro, al centro il risultato. Accetti o ignori ogni blocco, applichi in un colpo quelli senza conflitti.",
      title: "Merge di Sources/Accounts/OAuth.swift",
      left: "Modifiche da main",
      result: "Risultato",
      right: "Modifiche da feature/oauth",
      accept: "Accetta",
      ignore: "Ignora",
      resolved: "Conflitti risolti",
      remaining: "conflitti rimasti",
      reset: "Annulla l'ultima scelta",
      apply: "Applica senza conflitti:",
      all: "Tutti",
      auto: "Risolvi automaticamente",
      jev: "Risolvi con Jev",
      mark: "Segna come risolto",
      of: "di",
    },
    ai: {
      heading: "L'AI resta sul tuo Mac",
      lead: "Il messaggio di commit nasce dal diff in stage con Apple Intelligence, sul dispositivo. Claude interviene solo se lo scegli tu, con la tua chiave.",
      items: [
        { title: "Messaggi di commit", text: "Apple Intelligence su macOS 26, sul Mac. Claude come alternativa." },
        { title: "Revisione del codice", text: "Una seconda lettura del diff prima del push, con Claude." },
        { title: "Conflitti risolti da Jev", text: "Jev sceglie un lato per ogni blocco solo con fiducia almeno 0,8. Consenso per repository, chiave nel Portachiavi." },
      ],
    },
    commit: {
      label: "Esempio: dal diff in stage di Store.swift, Tsuba scrive il riepilogo «Aggiungi l'eliminazione allo store delle note».",
      staged: "In stage",
      summary: "Aggiungi l'eliminazione allo store delle note",
      body: "Ora una nota si elimina per id. Lo store mantiene l'ordine per data.",
      placeholder: ["Riepilogo (obbligatorio)", "Descrizione (facoltativa)"],
      writing: "Scrittura con Apple Intelligence…",
      amend: "Amend",
      commit: "Commit di 1 file",
    },
    native: {
      heading: "Nativo, niente di nascosto",
      items: [
        { title: "SwiftUI", text: "Scritto per macOS, con schede e finestre di sistema." },
        { title: "Il tuo git", text: "Tsuba usa la riga di comando git che hai già: nessun motore nascosto, nessun formato proprietario." },
        { title: "Portachiavi", text: "Token e chiavi restano nel Portachiavi di macOS." },
        { title: "AI sul dispositivo", text: "Apple Intelligence gira sul Mac. I servizi cloud partono solo se li attivi." },
      ],
      privacy: "Cosa esce dal Mac",
    },
    themes: {
      heading: "Dieci temi, ognuno con un gemello chiaro",
      lead: "Tsuba ha dieci temi di colore. Ognuno ha una versione scura e una chiara, e macOS sceglie quale mostrare. Provane uno su questa pagina: gli screenshot restano in Akagane, il tema predefinito.",
      label: "Temi di Tsuba",
    },
    download: {
      heading: "Scarica Tsuba",
      lead: "Un archivio ZIP con l'app universale, per Mac Apple silicon e Intel. Pochi passaggi al primo avvio.",
      button: "Scarica per macOS",
      busy: "Avvio download…",
      done: "Download avviato",
      noteCheck: "Controlla i download del browser.",
      noteNot: "Non parte?",
      noteGithub: "Scaricalo da GitHub",
      noteSteps: "Come aprirlo la prima volta",
      req: "Richiede macOS 14 Sonoma o successivo e git installato. I messaggi di commit con Apple Intelligence richiedono macOS 26.",
      steps: [
        "Decomprimi <code>Tsuba.zip</code> e sposta <code>Tsuba.app</code> in Applicazioni.",
        "Apri Tsuba, premi <b>Fine</b> sull'avviso, poi vai in Impostazioni di Sistema › Privacy e sicurezza e clicca <b>Apri comunque</b>.",
        "In alternativa, da Terminale:",
      ],
      command: "xattr -dr com.apple.quarantine /Applications/Tsuba.app",
      sparkle: "Gli aggiornamenti successivi arrivano dall'app (Sparkle) senza questo passaggio.",
      releases: "Tutte le versioni",
    },
    faq: {
      heading: "Domande",
      items: [
        { q: "Mi serve git installato?", a: "Sì. Tsuba usa il git della riga di comando, così hook, configurazione e credenziali restano quelli che usi già." },
        { q: "Il mio codice viene inviato a qualcuno?", a: "No, a meno che tu non lo scelga. I messaggi di commit usano Apple Intelligence sul Mac. Claude e Jev si attivano solo con la tua chiave e, per Jev, con il consenso per ogni repository." },
        { q: "Funziona con GitHub, GitLab, Gitea e Bitbucket?", a: "Sì. Accedi con OAuth a github.com, gitlab.com e bitbucket.org, oppure con un token per server self-hosted e GitHub Enterprise." },
        { q: "Che versione di macOS serve?", a: "macOS 14 Sonoma o successivo. I messaggi di commit con Apple Intelligence richiedono macOS 26." },
        { q: "Posso lavorare su più repository insieme?", a: "Sì. Un workspace tiene aperti più repository come schede nella stessa finestra, e ⌘K apre quelli recenti dalla tastiera." },
        { q: "Segue la modalità chiara e scura?", a: "Sì. Ognuno dei dieci temi ha una versione scura e una chiara, e Tsuba mostra quella che corrisponde a macOS." },
      ],
    },
    footer: {
      note: "Tsuba è la guardia della spada giapponese: sta tra la mano e la lama.",
      privacy: "Privacy",
      releases: "Versioni su GitHub",
    },
    shots: {
      history: "La cronologia di Tsuba: il grafo dei commit di un repository di prova con le etichette di rami e remoti, e sotto il diff del commit selezionato.",
      changes: "Le modifiche locali in Tsuba: file in stage e non in stage, il diff di un file Swift con i pulsanti per mettere in stage o scartare l'hunk, e il riquadro del messaggio di commit.",
      reflog: "Il foglio Reflog di Tsuba: ogni spostamento di HEAD, con i pulsanti per fare checkout, creare un ramo o riportare il ramo corrente a quel punto.",
      merge: "L'editor di merge a tre vie di Tsuba: a sinistra le modifiche da main, a destra quelle da feature/oauth, al centro il risultato, con un blocco in conflitto evidenziato.",
      compare: "Il foglio Confronta di Tsuba: main contro feature/offline-queue dalla base di merge, con il diff di un file nuovo.",
      conflicts: "Il foglio Conflitti di Tsuba: un file modificato da entrambi i lati, con i pulsanti per accettare un lato o aprire il merge.",
      "merge-banner": "Un repository in Tsuba con il banner Merge in corso sopra il grafo dei commit, e i pulsanti Risolvi, Annulla e Continua.",
      stats: "Le statistiche di Tsuba: i commit per settimana in un grafico a barre e gli autori più attivi del repository.",
      "quick-launch": "La finestra Avvio rapido di Tsuba: le azioni per aprire, clonare o creare un repository e i repository recenti.",
    },
    privacy: {
      h1: "Cosa esce dal Mac",
      intro: "Tsuba esegue il <code>git</code> installato sul Mac. Hook, <code>git config</code>, credential helper e chiavi SSH funzionano come nel terminale. Token e chiavi API stanno nel Portachiavi di macOS.",
      netHeading: "Connessioni di rete",
      table: {
        head: ["Quando", "Verso", "Cosa parte"],
        rows: [
          ["Fetch, pull, push, clone", "I tuoi server Git", "Quello che manda git (vedi Log dei comandi git)"],
          ["Account e pull request", "api.github.com, gitlab.com o il tuo GitLab, il tuo Gitea, api.bitbucket.org, il tuo GitHub Enterprise", "Le chiamate per elencare, aprire e creare pull request"],
          ["All'avvio e ogni 4 ore", "github.com (breight-code/tsuba-releases, feed degli aggiornamenti di Sparkle)", "La versione di Tsuba; gli aggiornamenti sono firmati EdDSA"],
          ["Messaggio di commit con Claude, sempre con chiave Anthropic e AI cloud attiva: (a) se Apple Intelligence non è disponibile e confermi nella finestra, o lo hai già consentito per quel repository; (b) se Apple Intelligence fallisce su quel diff e hai già consentito Claude per quel repository", "api.anthropic.com", "Il diff in stage, al massimo 200.000 caratteri"],
          ["Revisione AI, solo quando la chiedi, con chiave Anthropic e AI cloud attiva", "api.anthropic.com", "Il diff che stai rivedendo, al massimo 600.000 caratteri"],
          ['"Risolvi con Jev", solo con chiave TypeSafe, AI cloud attiva e consenso per quel repository', "api.typesafe.ai", "Per ogni conflitto: le due versioni, la versione comune, il percorso del file, i nomi dei rami e 3 righe prima e dopo"],
        ],
      },
      telemetry: "Nessuna telemetria e nessuna analisi d'uso.",
      stayHeading: "Cosa resta sul Mac",
      stay: [
        "Messaggi di commit con Apple Intelligence (macOS 26), finché il modello risponde; se fallisce su un diff e hai già consentito Claude per quel repository, il diff va a Claude (vedi tabella). Senza consenso, il fallback è il messaggio offline.",
        '"Risolvi automaticamente" nel merge a tre vie: unisce solo i conflitti in cui i due rami cambiano parole diverse, senza AI.',
        "Il messaggio di commit offline, scritto dai nomi e dallo stato dei file.",
      ],
      offHeading: "Spegnere tutto il cloud",
      off: [
        'Impostazioni → AI → "Consenti l\'AI cloud (Claude, Jev)". Spenta, nessun codice o diff viene inviato ai servizi AI (Anthropic, TypeSafe).',
        "Per un'organizzazione: un profilo di configurazione che imposta <code>cloudAIEnabled</code> a <code>false</code> nel dominio <code>it.igsolutions.tsuba</code> blocca l'interruttore.",
      ],
      checkHeading: "Verificalo da solo",
      check: "Menu File → Log dei comandi git mostra ogni comando git eseguito. <code>nettop -p Tsuba</code> mostra le connessioni.",
    },
  },
  en: {
    meta: {
      title: "Tsuba · The native Git client for Mac | br(e)ight-code",
      description: "Tsuba is a native Git client for macOS: commit graph, line-level staging, interactive rebase, 3-way merge, multi-repo workspaces and AI commit messages written on your Mac.",
    },
    privacyMeta: {
      title: "Tsuba privacy: what leaves your Mac",
      description: "Every network connection Tsuba, the Git client for Mac, makes: what stays on your Mac, what goes to Claude or Jev, and how to turn all cloud features off.",
    },
    nav: { features: "Features", merge: "Merge", themes: "Themes", download: "Download", faq: "FAQ", other: "Italiano", home: "br(e)ight-code", by: "by br(e)ight-code", pill: "Download", back: "← Tsuba" },
    hero: {
      h1: "Tsuba, the native Git client for Mac",
      lead: "Tsuba is the native Git client for Mac. Graph, line staging, rebase and 3-way merge in one fast window, with AI that stays on your Mac when it can.",
      primary: "Download for macOS",
      secondary: "Try the merge",
      req: "macOS 14 Sonoma or later, Apple silicon and Intel. Requires git installed.",
    },
    story: {
      heading: "All of git, no terminal",
      text: "The operations you would type in a terminal, with the graph always in view.",
      steps: [
        { cmd: "git log --graph", title: "Read the history", text: "Refs, tags and stashes sit on the graph. Search by message, author or code with -S, and merged branches fold from the merge dot.", tags: ["Ref", "Tag", "Stash", "Search -S", "Blame"], shot: "history" },
        { cmd: "git add -p", title: "Stage only what you want", text: "A file, a hunk or a single line, and discard the same way. The commit takes exactly what you picked.", tags: ["File", "Hunk", "Line", "Discard"], shot: "changes" },
        { cmd: "git reflog", title: "Go back", text: "A reset, merge or rebase gone wrong: ⌘⇧Z undoes the last operation. The reflog is one click away, and lost stashes come back.", tags: ["⌘⇧Z", "Reflog", "Lost stashes"], shot: "reflog" },
        { cmd: "git merge", title: "Resolve conflicts three ways", text: "When a merge stops, a banner says what is left. The merge editor puts both branches and the result side by side, chunk by chunk.", tags: ["Accept left", "Accept right", "Ignore", "Resolve automatically"], shot: "merge" },
      ],
      more: [
        { title: "Interactive rebase", text: "Pick, reword, squash, fixup, drop. Reorder by dragging." },
        { title: "Guided bisect", text: "Good, bad, skip. Tsuba counts the revisions left and shows the first bad commit." },
      ],
    },
    gallery: {
      heading: "Inside the app",
      text: "Real Tsuba windows, captured with a demo repository.",
      items: [
        { shot: "compare", title: "Compare two refs", text: "Any branch, tag or commit against another or against the working copy, with ahead and behind." },
        { shot: "conflicts", title: "Conflicts", text: "Pick a side for each file, or open it in the merge editor." },
        { shot: "merge-banner", title: "Merge in progress", text: "A banner above the graph says what is left: resolve, mark the file, continue." },
        { shot: "stats", title: "Statistics", text: "Commits per week and the people who wrote them." },
        { shot: "quick-launch", title: "Quick Launch", text: "⌘K opens, clones or creates a repository without leaving the keyboard." },
      ],
    },
    merge: {
      heading: "Three-way merge, chunk by chunk",
      lead: "One branch on the left, the other on the right, the result in the middle. Accept or ignore each chunk, apply every non-conflicting one at once.",
      title: "Merge Sources/Accounts/OAuth.swift",
      left: "Changes from main",
      result: "Result",
      right: "Changes from feature/oauth",
      accept: "Accept",
      ignore: "Ignore",
      resolved: "Conflicts resolved",
      remaining: "conflicts left",
      reset: "Undo last choice",
      apply: "Apply non-conflicting:",
      all: "All",
      auto: "Resolve automatically",
      jev: "Resolve with Jev",
      mark: "Mark resolved",
      of: "of",
    },
    ai: {
      heading: "AI that stays on your Mac",
      lead: "The commit message comes from the staged diff with Apple Intelligence, on device. Claude steps in only if you choose it, with your own key.",
      items: [
        { title: "Commit messages", text: "Apple Intelligence on macOS 26, on your Mac. Claude as the fallback." },
        { title: "Code review", text: "A second read of the diff before you push, with Claude." },
        { title: "Conflicts solved by Jev", text: "Jev picks a side per chunk only at confidence 0.8 or higher. Consent per repository, key in Keychain." },
      ],
    },
    commit: {
      label: "Example: from the staged diff of Store.swift, Tsuba writes the summary “Add delete to the note store”.",
      staged: "Staged",
      summary: "Add delete to the note store",
      body: "A note can now be removed by id. The store keeps its date order.",
      placeholder: ["Summary (required)", "Description (optional)"],
      writing: "Writing with Apple Intelligence…",
      amend: "Amend",
      commit: "Commit 1 File",
    },
    native: {
      heading: "Native, nothing hidden",
      items: [
        { title: "SwiftUI", text: "Built for macOS, with native tabs and system controls." },
        { title: "Your git", text: "Tsuba runs the git command line you already have: no hidden engine, no proprietary format." },
        { title: "Keychain", text: "Tokens and keys stay in the macOS Keychain." },
        { title: "On-device AI", text: "Apple Intelligence runs on the Mac. Cloud services start only when you turn them on." },
      ],
      privacy: "What leaves your Mac",
    },
    themes: {
      heading: "Ten themes, each with a light twin",
      lead: "Tsuba ships ten colour themes. Each has a dark set and a light twin, and macOS picks which one shows. Try one on this page: the screenshots stay in Akagane, the default.",
      label: "Tsuba themes",
    },
    download: {
      heading: "Download Tsuba",
      lead: "A ZIP with the universal app, for Apple silicon and Intel Macs. A few steps on first launch.",
      button: "Download for macOS",
      busy: "Starting download…",
      done: "Download started",
      noteCheck: "Check your browser's downloads.",
      noteNot: "Not starting?",
      noteGithub: "Get it from GitHub",
      noteSteps: "How to open it the first time",
      req: "Requires macOS 14 Sonoma or later and git installed. Apple Intelligence commit messages need macOS 26.",
      steps: [
        "Unzip <code>Tsuba.zip</code> and move <code>Tsuba.app</code> to Applications.",
        "Open Tsuba, press <b>Done</b> on the alert, then go to System Settings › Privacy & Security and click <b>Open Anyway</b>.",
        "Or, from Terminal:",
      ],
      command: "xattr -dr com.apple.quarantine /Applications/Tsuba.app",
      sparkle: "Later updates arrive from inside the app (Sparkle) without this step.",
      releases: "All releases",
    },
    faq: {
      heading: "Questions",
      items: [
        { q: "Do I need git installed?", a: "Yes. Tsuba runs the git command line, so your hooks, config and credentials stay the ones you already use." },
        { q: "Is my code sent anywhere?", a: "Not unless you choose to. Commit messages use Apple Intelligence on the Mac. Claude and Jev run only with your key and, for Jev, with consent per repository." },
        { q: "Does it work with GitHub, GitLab, Gitea and Bitbucket?", a: "Yes. Sign in with OAuth to github.com, gitlab.com and bitbucket.org, or use a token for self-hosted servers and GitHub Enterprise." },
        { q: "Which macOS version do I need?", a: "macOS 14 Sonoma or later. Apple Intelligence commit messages need macOS 26." },
        { q: "Can I work on several repositories at once?", a: "Yes. A workspace keeps several repositories open as tabs in one window, and ⌘K opens recent ones from the keyboard." },
        { q: "Does it follow light and dark mode?", a: "Yes. Each of the ten themes has a dark set and a light twin, and Tsuba shows the one that matches macOS." },
      ],
    },
    footer: {
      note: "A tsuba is the guard of a Japanese sword: it sits between the hand and the blade.",
      privacy: "Privacy",
      releases: "Releases on GitHub",
    },
    shots: {
      history: "Tsuba's history view: the commit graph of a demo repository with branch and remote labels, and below it the diff of the selected commit.",
      changes: "Local Changes in Tsuba: unstaged and staged files, a Swift diff with Stage Hunk and Discard Hunk buttons, and the commit message box.",
      reflog: "The Reflog sheet in Tsuba: every move of HEAD, with buttons to check out, create a branch or reset the current branch there.",
      merge: "Tsuba's three-way merge editor: changes from main on the left, from feature/oauth on the right, the result in the middle, with one conflicting chunk highlighted.",
      compare: "The Compare sheet in Tsuba: main against feature/offline-queue from the merge base, with the diff of a new file.",
      conflicts: "The Conflicts sheet in Tsuba: one file modified on both sides, with Accept Yours, Accept Theirs and Merge buttons.",
      "merge-banner": "A repository in Tsuba with a Merge in progress banner above the commit graph, and Resolve, Abort and Continue buttons.",
      stats: "Tsuba's Statistics view: commits per week as a bar chart and the top authors of the repository.",
      "quick-launch": "Tsuba's Quick Launch window: actions to open, clone or create a repository, and the recent repositories.",
    },
    privacy: {
      h1: "What leaves your Mac",
      intro: "Tsuba runs the <code>git</code> installed on your Mac. Hooks, <code>git config</code>, credential helpers and SSH keys work as in the terminal. Tokens and API keys live in the macOS Keychain.",
      netHeading: "Network connections",
      table: {
        head: ["When", "To", "What is sent"],
        rows: [
          ["Fetch, pull, push, clone", "Your Git servers", "What git sends (see Git Command Log)"],
          ["Accounts and pull requests", "api.github.com, gitlab.com or your GitLab, your Gitea, api.bitbucket.org, your GitHub Enterprise", "Calls that list, open and create pull requests"],
          ["At launch and every 4 hours", "github.com (breight-code/tsuba-releases, the Sparkle update feed)", "The Tsuba version; updates are EdDSA-signed"],
          ["Commit message with Claude, always with an Anthropic key and cloud AI on: (a) if Apple Intelligence is unavailable and you confirm in the dialog, or already allowed it for that repository; (b) if Apple Intelligence fails on that diff and you already allowed Claude for that repository", "api.anthropic.com", "The staged diff, up to 200,000 characters"],
          ["AI review, only when you ask, with an Anthropic key and cloud AI on", "api.anthropic.com", "The diff you are reviewing, up to 600,000 characters"],
          ['"Resolve with Jev", only with a TypeSafe key, cloud AI on and consent for that repository', "api.typesafe.ai", "For each conflict: the two versions, the common version, the file path, the branch names and 3 lines before and after"],
        ],
      },
      telemetry: "No telemetry and no usage analytics.",
      stayHeading: "What stays on your Mac",
      stay: [
        "Commit messages with Apple Intelligence (macOS 26), as long as the model responds; if it fails on a diff and you already allowed Claude for that repository, the diff goes to Claude (see table). Without consent, the fallback is the offline message.",
        '"Resolve Automatically" in the three-way merge: merges only conflicts where the two branches change different words, with no AI.',
        "The offline commit message, written from file names and status.",
      ],
      offHeading: "Turn off all cloud features",
      off: [
        'Settings → AI → "Allow cloud AI (Claude, Jev)". When off, no code or diff is sent to AI services (Anthropic, TypeSafe).',
        "For an organization: a configuration profile that sets <code>cloudAIEnabled</code> to <code>false</code> in the <code>it.igsolutions.tsuba</code> domain locks the switch.",
      ],
      checkHeading: "Check it yourself",
      check: "File menu → Git Command Log lists every git command Tsuba ran. <code>nettop -p Tsuba</code> shows its connections.",
    },
  },
};

// Structured data for the Tsuba pages. The app page carries the FAQ; the privacy page only the breadcrumb.
export function tsubaSchema(lang: Lang, page: "home" | "privacy"): object[] {
  const t = tsuba[lang];
  const url = `${links.site}${tsubaPaths[page][lang]}`;
  const crumbs = [
    { "@type": "ListItem", position: 1, name: t.nav.home, item: `${links.site}${homePaths[lang]}` },
    { "@type": "ListItem", position: 2, name: "Tsuba", item: `${links.site}${tsubaPaths.home[lang]}` },
  ];
  const breadcrumb = { "@type": "BreadcrumbList", itemListElement: page === "privacy" ? [...crumbs, { "@type": "ListItem", position: 3, name: t.footer.privacy, item: url }] : crumbs };
  if (page === "privacy") return [breadcrumb];
  return [
    {
      "@type": "SoftwareApplication",
      "@id": `${links.site}/tsuba/#app`,
      name: "Tsuba",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "macOS 14",
      softwareRequirements: "git",
      description: t.meta.description,
      url,
      image: `${links.site}/tsuba/icon.png`,
      downloadUrl: tsubaLinks.download,
      inLanguage: lang === "it" ? "it-IT" : "en-US",
      author: { "@id": `${links.site}/#person` },
    },
    {
      "@type": "FAQPage",
      mainEntity: t.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    breadcrumb,
  ];
}

// The app's ten themes, from Sources/TsubaCore/Domain/Palette.swift. Order of each set: see paletteKeys.
export const paletteKeys = ["bg", "surface", "raised", "border", "text", "muted", "accent", "added", "removed", "conflict"];
export type Palette = { id: string; name: Record<Lang, string>; dark: string[]; light: string[]; lanes: string[] };
const pal = (id: string, name: string, dark: string, light: string, lanes: string, it = name): Palette => {
  const hex = (list: string) => list.split(" ").map((c) => `#${c}`);
  return { id, name: { it, en: name }, dark: hex(dark), light: hex(light), lanes: hex(lanes) };
};
export const palettes: Palette[] = [
  pal("akagane", "Akagane", "121314 18191B 222326 2C2E31 EDE7E2 9C948D CF8A5E 8DBF6A E2626B E3B048", "F3F1EC FAF9F6 FFFFFF DCD7CD 1F1D1A 67615A 9A4E22", "CF8A5E 8DBF6A 6FA8C7 B79BD6 E2626B D9C27A 9CCFC0 E0A0B8 8FA3BF B7B0A4"),
  pal("tetsu", "Tetsu", "121314 18191B 222326 2C2E31 ECE8E1 9A958C C9A45C 8DBF6A E0675A E39B48", "F3F1EC FAF9F6 FFFFFF DCD7CD 1F1D1A 67615A 7A5A16", "C9A45C 8DBF6A 6FA8C7 C98BB0 E0675A 8FA3BF E3C27A D19A6A 9CCFC0 B7B0A4"),
  pal("urushi", "Urushi", "0C0C0D 121213 1C1C1E 28282B EEEAE8 9A9493 D2575E 86C47A F08A6C E6B04F", "F2F1F0 FAFAF9 FFFFFF D9D6D4 1C1A1A 625C5B A8252E", "D2575E 86C47A E6B04F 7FA9D6 B996D8 6FCFC0 F0D78A E59A7A 9FB5E8 B7B0A4"),
  pal("shakudo", "Shakudō", "131214 19181B 232226 2E2C31 ECE8EF 9B95A0 A78BD4 86C47A E46C78 E3A651", "F3F1F4 FAF9FB FFFFFF DAD5DE 1E1A22 655D6B 6440A6", "A78BD4 86C47A E3A651 6FB0C9 E46C78 D9C27A 8FD6C0 E59AC8 93A8E6 B7B0A4"),
  pal("rokusho", "Rokushō", "121314 18191B 222326 2C2E31 E7EAE6 949A94 7EB5A2 B5CC6A E0675A E3A048", "F0F2F0 F8FAF8 FFFFFF D4DBD6 1A1F1C 5C665F 2F6E58", "7EB5A2 B5CC6A E3A048 9EA8DA E0675A C9B98A 6FB8C9 D69CC0 E3C27A A9B0A4"),
  pal("hagane", "Hagane", "111213 171819 212224 2C2D30 E9EBE6 959891 C5D16A 6FCB97 E66A6A E7A44C", "EFF0EE F8F9F7 FFFFFF D6D8D3 1A1C18 5E625A 5A6312", "C5D16A 6FCB97 E7A44C 8FA6E0 E66A6A C895CF 6FC6D6 E3C27A A0D48A B0B3AC"),
  pal("ishi", "Ishi", "1A1918 201F1D 2A2826 363431 ECE7E0 A39D94 79A8B8 9AC27A DE6E62 E2B254", "F2F0EC FAF8F5 FFFFFF DDD8D0 211F1C 66605A 2E6475", "79A8B8 9AC27A D9A86A C495B5 DE6E62 B5B09F 8FC7B0 A9A0D9 E3C27A D9907A"),
  pal("graphite", "Graphite", "1C1C1E 232325 2C2C2E 38383A F5F5F7 98989D 3B95FF 30D158 FF453A FF9F0A", "ECECEC F6F6F6 FFFFFF D1D1D6 1D1D1F 636366 0060C9", "3B95FF 30D158 FF9F0A BF5AF2 FF375F 64D2FF FFD60A 63E6E2 7D7AFF AC8E68", "Grafite"),
  pal("ink", "Ink", "000000 0A0A0A 141414 262626 FFFFFF A3A3A3 FFD60A 32D74B FF453A FF9F0A", "FFFFFF FFFFFF F5F5F5 DEDEDE 000000 575757 6E5300", "FFD60A 32D74B 40C8E0 BF5AF2 FF453A 409CFF FF9F0A FF6EC7 66E0C2 C7F464", "Inchiostro"),
  pal("mono", "Monochrome", "161617 1A1A1C 242426 2F2F32 F2F2F2 8E8E93 E6E6E6 6CCB8A F07178 E5B567", "F2F2F2 FAFAFA FFFFFF DADADA 161616 666666 1A1A1A", "E6E6E6 6CCB8A E5B567 82AAFF F07178 89DDFF F7D774 C792EA FF9CAC A6ACCD", "Monocromo"),
];
