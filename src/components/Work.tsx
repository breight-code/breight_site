import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import type { Project } from "../content/site";

const ease = [0.23, 1, 0.32, 1] as const;

function SiteFrag() {
  return (
    <div className="frag f-site" data-ui>
      <div className="browser-bar"><i /><i /><i /><span>breight-code.it</span></div>
      <div className="mini-hero">
        <div className="display"><span>br(e)ight</span><span>code</span></div>
        <p>Custom software: apps, backends and tools.</p>
      </div>
      <motion.div className="mini-band" initial={{ y: "100%" }} whileInView={{ y: "0%" }} transition={{ duration: 0.9, ease, delay: 0.2 }}>
        <div className="display">Apps Backends Tools</div>
      </motion.div>
    </div>
  );
}

const CALLS = [
  { m: "GET", p: "/api/v1/projects", s: "200", t: "84ms" },
  { m: "POST", p: "/api/v1/auth/token", s: "201", t: "132ms" },
  { m: "GET", p: "/api/v1/user/me", s: "200", t: "41ms" },
  { m: "PUT", p: "/api/v1/settings", s: "204", t: "96ms" },
  { m: "GET", p: "/api/v1/feed?page=2", s: "500", t: "310ms" },
  { m: "GET", p: "/api/v1/packages", s: "200", t: "58ms" },
  { m: "DELETE", p: "/api/v1/session", s: "204", t: "22ms" },
];

function ShakerFrag({ live }: { live: boolean }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(4);
  useEffect(() => {
    if (!live || reduce) return;
    const id = setInterval(() => setN((v) => v + 1), 1300);
    return () => clearInterval(id);
  }, [live, reduce]);
  const items = Array.from({ length: 5 }, (_, i) => ({ ...CALLS[(n - i + CALLS.length * 10) % CALLS.length], id: n - i }));
  return (
    <div className="frag f-shaker" data-ui>
      <motion.div className="phone" animate={live && !reduce ? { rotate: [0, -3, 3, -2, 2, 0] } : undefined} transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 3.4 }}>
        <div className="phone-screen">
          <div className="phone-notch" />
          <div className="app-head">Network <small>{n + 8} calls</small></div>
          <ul className="log">
            <AnimatePresence initial={false}>
              {items.map((c) => (
                <motion.li key={c.id} layout initial={{ opacity: 0, y: -14, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease }}>
                  <span className="m">{c.m}</span>
                  <span className="p">{c.p}</span>
                  <span className={`s${c.s === "500" ? " err" : ""}`}>{c.s} · {c.t}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          <div className="shake-hint"><span>Shake to inspect</span><b>dio_shaker</b></div>
        </div>
      </motion.div>
    </div>
  );
}

function ShowFrag({ live }: { live: boolean }) {
  const reduce = useReducedMotion();
  const loop = live && !reduce;
  const heights = [40, 70, 55, 90, 65, 100, 80];
  return (
    <div className="frag f-show" data-ui>
      <div className="phone">
        <div className="phone-screen">
          <div className="phone-notch" />
          <div className="app-head">Showcase <small>12 patterns</small></div>
          <div className="widgets">
            <div className="wide">
              <b>Weekly builds</b>
              <div className="bars">
                {heights.map((h, i) => (
                  <motion.span key={i} style={{ height: `${h}%` }} animate={loop ? { scaleY: [1, 0.55, 1] } : undefined} transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }} />
                ))}
              </div>
            </div>
            <div>
              <b>Coverage</b>
              <svg className="ring" viewBox="0 0 40 40" aria-hidden="true">
                <circle cx="20" cy="20" r="16" fill="none" stroke="#d8ddd2" strokeWidth="6" />
                <motion.circle cx="20" cy="20" r="16" fill="none" stroke="#0a0c0a" strokeWidth="6" strokeLinecap="round" pathLength={1} transform="rotate(-90 20 20)" initial={{ pathLength: 0 }} animate={live ? { pathLength: 0.86 } : undefined} transition={{ duration: 1.4, ease }} />
              </svg>
            </div>
            <div className="accent">
              <b>Dark mode</b>
              <div className="toggle"><motion.i animate={loop ? { x: [0, 16, 16, 0, 0] } : undefined} transition={{ duration: 3, repeat: Infinity, times: [0, 0.15, 0.5, 0.65, 1] }} /></div>
            </div>
            <div className="wide">
              <b>Hero transition</b>
              <motion.div style={{ height: 8, borderRadius: 4, background: "#58f36a", transformOrigin: "left" }} animate={loop ? { scaleX: [0.1, 1, 0.1] } : undefined} transition={{ duration: 2.6, repeat: Infinity, ease: [0.77, 0, 0.175, 1] }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const COMMITS = [
  { msg: "Add 3-way merge view", lane: 0, ref: "main", who: "2m" },
  { msg: "Stage single lines from the diff", lane: 1, who: "1h" },
  { msg: "Interactive rebase: reorder commits", lane: 1, who: "3h" },
  { msg: "Merge branch 'feature/graph'", lane: 0, merge: true, who: "5h" },
  { msg: "Commit message from staged diff", lane: 2, ref: "ai", who: "1d" },
  { msg: "Quick Launch fuzzy switcher", lane: 0, who: "1d" },
  { msg: "Reflog browser and undo", lane: 1, who: "2d" },
  { msg: "Multi-repo workspace log", lane: 0, who: "3d" },
];

function TsubaFrag({ live }: { live: boolean }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!live || reduce) return;
    const id = setInterval(() => setN((v) => v + 1), 1800);
    return () => clearInterval(id);
  }, [live, reduce]);
  const rows = Array.from({ length: 8 }, (_, i) => ({ ...COMMITS[(i - n + COMMITS.length * 100) % COMMITS.length], id: i - n }));
  return (
    <div className="frag f-tsuba" data-ui>
      <div className="mac">
        <div className="mac-bar"><i /><i /><i /><span>tsuba — main</span></div>
        <div className="mac-body">
          <div className="mac-side">
            <b>Branches</b>
            <span className="on">main</span>
            <span>feature/graph</span>
            <span>ai/commit-message</span>
            <b>Remotes</b>
            <span>origin</span>
            <b>Stashes</b>
            <span>wip: merge view</span>
          </div>
          <ul className="graph">
            <AnimatePresence initial={false}>
              {rows.map((c) => (
                <motion.li key={c.id} layout initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease }}>
                  <svg viewBox="0 0 44 26" aria-hidden="true">
                    {[0, 1, 2].map((l) => <line key={l} x1={8 + l * 14} y1={-4} x2={8 + l * 14} y2={30} stroke={l === 0 ? "#0a0c0a" : "#9aa497"} strokeWidth="2" />)}
                    {c.merge && <path d="M22 0 C22 10 8 10 8 13" fill="none" stroke="#9aa497" strokeWidth="2" />}
                    <circle cx={8 + c.lane * 14} cy="13" r="5" fill={c.lane === 0 ? "#58f36a" : "#0a0c0a"} stroke="#0a0c0a" strokeWidth="2" />
                  </svg>
                  <span className="msg">{c.ref && <span className="ref">{c.ref}</span>} {c.msg}</span>
                  <span className="who">{c.who}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Fragment({ slug, live }: { slug: string; live: boolean }) {
  if (slug === "tsuba") return <TsubaFrag live={live} />;
  if (slug === "dio-shaker") return <ShakerFrag live={live} />;
  if (slug === "flutter-showcase") return <ShowFrag live={live} />;
  return <SiteFrag />;
}

function ProjectBlock({ p, labels, active, onActive }: { p: Project; labels: { live: string; code: string; privateCode: string }; active: boolean; onActive: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.55 });
  useEffect(() => { if (inView) onActive(); }, [inView, onActive]);
  return (
    <article ref={ref} className="project" data-active={active}>
      <h3 className="display">{p.title}</h3>
      <p className="desc" data-reveal>{p.description}</p>
      <p className="status" data-reveal style={{ ["--i" as string]: 1 }}>{p.kind}, {p.status.toLowerCase()}</p>
      <ul className="tags" data-reveal style={{ ["--i" as string]: 2 }}>{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
      <div className="actions" data-reveal style={{ ["--i" as string]: 3 }}>
        {p.live && (
          <a className="btn" href={p.live} target="_blank" rel="noreferrer">
            {labels.live}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
          </a>
        )}
        {p.code && <a className="link" href={p.code} target="_blank" rel="noreferrer">{labels.code}</a>}
        {!p.code && <span className="private">{labels.privateCode}</span>}
      </div>
      <div className="frag-inline"><Fragment slug={p.slug} live={inView} /></div>
    </article>
  );
}

export default function Work({ items, labels }: { items: Project[]; labels: { live: string; code: string; privateCode: string } }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = items[active];
  return (
    <div className="work-grid">
      <div>
        {items.map((p, i) => (
          <ProjectBlock key={p.slug} p={p} labels={labels} active={active === i} onActive={() => setActive(i)} />
        ))}
      </div>
      <div className="stage" aria-hidden="true">
        <div className="stage-inner">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={current.slug}
              style={{ position: "absolute", inset: 0 }}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 60, rotate: 3, scale: 0.94, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, rotate: 0, scale: 1, filter: "blur(0px)" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -40, rotate: -2, scale: 0.96, filter: "blur(6px)" }}
              transition={{ duration: 0.6, ease }}
            >
              <Fragment slug={current.slug} live />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
