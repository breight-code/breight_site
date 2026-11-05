import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { MergeCopy } from "../content/tsuba";

type Side = "left" | "right";
type Pick = Side | "none" | null;

// Two conflicting chunks inside one function, as in the Tsuba merge editor.
const before = "func signIn(_ account: Account) async throws {";
const after = "}";
const chunks = [
  { left: "    let token = try await keychain.token(for: account)", right: "    let token = try await oauth.refresh(account)" },
  { left: "    try await session.open(token)", right: "    try await session.open(token, scopes: [.repo])" },
];
const ease = [0.23, 1, 0.32, 1] as const;

export default function MergeDemo({ t }: { t: MergeCopy }) {
  const [picks, setPicks] = useState<Pick[]>(chunks.map(() => null));
  const [marked, setMarked] = useState(false);
  const open = picks.filter((p) => p === null).length;
  const pick = (i: number, s: Side | "none") => setPicks((p) => p.map((v, j) => (j === i ? s : v)));
  const reset = () => {
    setPicks(chunks.map(() => null));
    setMarked(false);
  };

  const pane = (side: Side) => (
    <div className="mg-code mono">
      <div className="mg-l">{before}</div>
      {chunks.map((c, i) => (
        <div
          key={i}
          className={`mg-l${picks[i] === null ? " mg-chunk" : ""}${picks[i] === side ? " taken" : ""}${picks[i] === "none" ? " ignored" : ""}`}
        >
          {c[side]}
        </div>
      ))}
      <div className="mg-l">{after}</div>
    </div>
  );

  const gutter = (side: Side) => (
    <div className="mg-gutter">
      <div className="mg-l" />
      {chunks.map((c, i) => (
        <div key={i} className="mg-l">
          {picks[i] === null && (
            <>
              {side === "left" && (
                <button type="button" onClick={() => pick(i, "none")} aria-label={`${t.ignore}: ${c.left.trim()}`} className="mg-gb mute">
                  ×
                </button>
              )}
              <button type="button" onClick={() => pick(i, side)} aria-label={`${t.accept}: ${c[side].trim()}`} className="mg-gb">
                {side === "left" ? "»" : "«"}
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="mg">
      <div className="mg-bar">
        <b className="mg-title">{t.title}</b>
        <span className="mg-tools">
          <span className="mg-count">{`${chunks.length - open} ${t.of} ${chunks.length}`}</span>
          <span className="mg-meta mg-hide">{t.apply}</span>
          <span className="mg-meta mg-hide">{t.all}</span>
          <span className="mg-meta mg-hide">✦ {t.auto}</span>
          <button type="button" className="mg-tool" onClick={reset}>
            <span aria-hidden="true">↺</span> {t.reset}
          </button>
          <span className="mg-meta mg-hide mg-jev">✦ {t.jev}</span>
        </span>
      </div>
      <div className="mg-scroll">
        <div className="mg-inner">
          <div className="mg-row mg-heads">
            <span>{t.left}</span>
            <span />
            <span>{t.result}</span>
            <span />
            <span>{t.right}</span>
          </div>
          <div className="mg-row mg-cols">
            {pane("left")}
            {gutter("left")}
            <div className="mg-code mono mg-result">
              <div className="mg-l">{before}</div>
              {chunks.map((_, i) => {
                const p = picks[i];
                return (
                  <AnimatePresence key={i} mode="popLayout" initial={false}>
                    {p === "left" || p === "right" ? (
                      <motion.div
                        key={p}
                        className="mg-l resolved"
                        initial={{ opacity: 0, x: p === "left" ? -14 : 14 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.22, ease }}
                      >
                        {chunks[i][p]}
                      </motion.div>
                    ) : p === "none" ? (
                      <motion.div key="none" className="mg-l ignored" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        {chunks[i].left}
                      </motion.div>
                    ) : (
                      <motion.div key="gap" className="mg-l mg-chunk" exit={{ opacity: 0 }} />
                    )}
                  </AnimatePresence>
                );
              })}
              <div className="mg-l">{after}</div>
            </div>
            {gutter("right")}
            {pane("right")}
          </div>
        </div>
      </div>
      <div className="mg-foot">
        <span aria-live="polite" className={open === 0 ? "mg-ok" : "mg-warn"}>
          {open === 0 ? t.resolved : `${open} ${t.remaining}`}
        </span>
        <button type="button" className="ts-btn mg-btn" disabled={open > 0} onClick={() => setMarked(true)}>
          {marked ? "✓ " : ""}
          {t.mark}
        </button>
      </div>
    </div>
  );
}
