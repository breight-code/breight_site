import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import type { CommitCopy } from "../content/tsuba";

// The staged hunk of Store.swift from the demo repository: [old line, new line, code, added].
const hunk: [string, string, string, boolean][] = [
  ["9", "9", "    notes.sort { $0.updatedAt > $1.updatedAt }", false],
  ["10", "10", "}", false],
  ["", "11", "", true],
  ["", "12", "func delete(_ id: Note.ID) {", true],
  ["", "13", "    notes.removeAll { $0.id == id }", true],
  ["", "14", "}", true],
];

const spark = (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M8 1.5 9.4 6.6 14.5 8 9.4 9.4 8 14.5 6.6 9.4 1.5 8 6.6 6.6Z" fill="currentColor" />
  </svg>
);

// The commit box of Local Changes: a short writing beat, then summary and body type themselves from the staged diff.
// The figure around it carries a text description; this mock is hidden from assistive tech.
export default function CommitDemo({ t }: { t: CommitCopy }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.5 });
  const total = t.summary.length + t.body.length;
  // -1 idle, 0 writing, then the number of characters typed.
  const [n, setN] = useState(-1);

  useEffect(() => {
    if (!seen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(total);
    setN(0);
    let typed = 0;
    let id = 0;
    const wait = window.setTimeout(() => {
      id = window.setInterval(() => {
        typed = Math.min(total, typed + 2);
        setN(typed);
        if (typed === total) window.clearInterval(id);
      }, 24);
    }, 900);
    return () => {
      window.clearTimeout(wait);
      window.clearInterval(id);
    };
  }, [seen, total]);

  const typed = Math.max(0, n);
  const summary = t.summary.slice(0, typed);
  const body = t.body.slice(0, Math.max(0, typed - t.summary.length));
  const writing = n >= 0 && n < total;
  const caret = <i className="cm-caret" />;

  return (
    <div ref={ref} className="cm" aria-hidden="true">
      <div className="cm-file">
        <span className="cm-st">M</span>
        <span className="cm-path">Sources/Notes/Store.swift</span>
        <span className="cm-staged">{t.staged}</span>
      </div>
      <div className="cm-diff">
        {hunk.map(([a, b, code, add], i) => (
          <div key={i} className={add ? "add" : undefined}>
            <span className="n">{a}</span>
            <span className="n">{b}</span>
            <span>{code}</span>
          </div>
        ))}
      </div>
      <div className="cm-box">
        <div className="cm-user">
          <span className="cm-av">LB</span>
          <b>Luca Bianchi</b>
          <span>luca@aurora.dev</span>
        </div>
        <div className="cm-field">
          <span className="cm-text">
            {summary ? summary : <span className="ph">{n === 0 ? t.writing : t.placeholder[0]}</span>}
            {writing && n > 0 && typed <= t.summary.length && caret}
          </span>
          <span className="cm-count">{summary.length}/72</span>
          <span className={writing ? "cm-spark busy" : "cm-spark"}>{spark}</span>
        </div>
        <div className="cm-field cm-body">
          <span className="cm-reserve">{t.body}</span>
          <span className="cm-text">
            {body || <span className="ph">{t.placeholder[1]}</span>}
            {writing && typed > t.summary.length && caret}
          </span>
        </div>
        <div className="cm-actions">
          <span className="cm-amend">
            <i />
            {t.amend}
          </span>
          <span className={n === total ? "cm-commit on" : "cm-commit"}>{t.commit}</span>
        </div>
      </div>
    </div>
  );
}
