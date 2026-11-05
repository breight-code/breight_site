import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { copy, links, type Lang } from "../content/site";

type Line = { kind: "cmd" | "out" | "ok"; text: string; href?: string };

const COMMANDS = ["help", "whoami", "skills", "projects", "hire", "contact", "github", "lang", "clear"] as const;

function run(input: string, lang: Lang): Line[] | "clear" {
  const t = copy[lang];
  const it = lang === "it";
  const [cmd] = input.trim().toLowerCase().split(/\s+/);
  switch (cmd) {
    case "":
      return [];
    case "help":
      return [
        { kind: "out", text: it ? "Comandi disponibili:" : "Available commands:" },
        ...COMMANDS.map((c) => ({ kind: "out" as const, text: `  ${c}` })),
      ];
    case "whoami":
      return [{ kind: "ok", text: "br(e)ight-code · software developer" }, { kind: "out", text: t.intro.lead }];
    case "skills":
    case "stack":
      return t.skills.lanes.flatMap((l) => [
        { kind: "ok" as const, text: `${l.word.toLowerCase()}/  ${l.title}` },
        { kind: "out" as const, text: `  ${l.tags.join(", ")}` },
      ]);
    case "projects":
    case "ls":
      return t.work.items.flatMap((p) => [
        { kind: "ok" as const, text: `${p.slug}  (${p.kind})` },
        { kind: "out" as const, text: `  ${p.description}` },
        ...(p.live ? [{ kind: "out" as const, text: `  ${p.live}`, href: p.live }] : []),
      ]);
    case "contact":
      return [
        { kind: "out", text: `email   ${links.email}`, href: `mailto:${links.email}` },
        { kind: "out", text: `github  ${links.github}`, href: links.github },
        { kind: "out", text: `pub     ${links.pub}`, href: links.pub },
      ];
    case "hire":
      return [
        { kind: "ok", text: it ? "Disponibile per lavori freelance." : "Available for freelance work." },
        { kind: "out", text: `mailto:${links.email}`, href: `mailto:${links.email}?subject=${encodeURIComponent(t.contact.mailSubject)}` },
      ];
    case "github":
      return [{ kind: "ok", text: links.github, href: links.github }];
    case "lang":
      return [{ kind: "out", text: it ? "Switching to English…" : "Passo all'italiano…" }];
    case "sudo":
      return [{ kind: "out", text: it ? "Permesso negato. Bel tentativo." : "Permission denied. Nice try." }];
    case "clear":
      return "clear";
    default:
      return [{ kind: "out", text: it ? `comando non trovato: ${cmd}. Prova help.` : `command not found: ${cmd}. Try help.` }];
  }
}

export default function Terminal({ lang }: { lang: Lang }) {
  const t = copy[lang].terminal;
  const reduce = useReducedMotion();
  const [lines, setLines] = useState<Line[]>([{ kind: "out", text: t.welcome }]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const [busy, setBusy] = useState(false);
  const body = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { once: true, margin: "-20% 0px" });
  const booted = useRef(false);

  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight });
  }, [lines]);

  // Types a command character by character, then prints its output.
  const exec = async (cmd: string, typed: boolean) => {
    if (busy) return;
    setBusy(true);
    if (typed && !reduce) {
      for (let i = 1; i <= cmd.length; i++) {
        setValue(cmd.slice(0, i));
        await new Promise((r) => setTimeout(r, 55));
      }
      await new Promise((r) => setTimeout(r, 160));
    }
    setValue("");
    const result = run(cmd, lang);
    if (result === "clear") setLines([]);
    else setLines((prev) => [...prev, { kind: "cmd", text: cmd }, ...result]);
    if (cmd.trim()) setHistory((h) => [cmd, ...h]);
    setCursor(-1);
    setBusy(false);
    if (cmd.trim().toLowerCase() === "lang") {
      setTimeout(() => (window.location.href = lang === "it" ? "/en/#terminal" : "/#terminal"), 500);
    }
  };

  useEffect(() => {
    if (inView && !booted.current) {
      booted.current = true;
      exec("whoami", true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    exec(value, false);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const next = Math.min(cursor + 1, history.length - 1);
      setCursor(next);
      setValue(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = cursor - 1;
      setCursor(next);
      setValue(next < 0 ? "" : history[next]);
    }
  };

  return (
    <div ref={root} data-ui>
      <div className="term">
        <div className="term-head" aria-hidden="true">
          <i /><i /><i />
          <span>~/breight-code — zsh</span>
        </div>
        <div ref={body} className="term-body" role="log" aria-live="polite" aria-label="Terminal output">
          {lines.map((l, i) => (
            <motion.div
              key={i}
              className={`term-line ${l.kind}`}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: l.kind === "cmd" ? 0 : Math.min(i, 12) * 0.012 }}
            >
              {l.href ? <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{l.text}</a> : l.text}
            </motion.div>
          ))}
        </div>
        <form className="term-form" onSubmit={onSubmit}>
          <label htmlFor="term-input" aria-hidden="true">❯</label>
          <input
            id="term-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKey}
            aria-label={t.hint}
            placeholder={t.hint}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            readOnly={busy}
          />
        </form>
      </div>
      <div className="chips">
        {COMMANDS.map((c) => (
          <button key={c} type="button" onClick={() => exec(c, true)} disabled={busy}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
