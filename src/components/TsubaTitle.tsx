import { useEffect, useState, type CSSProperties } from "react";

const HEX = "0123456789abcdef";

// The name resolves out of a commit hash: every letter cycles through hex digits, then settles from left to right.
// The rise is plain CSS (tsuba.css), so the word shows without script and the decode only starts once hydrated.
export default function TsubaTitle({ word, label }: { word: string; label: string }) {
  const [shown, setShown] = useState(word);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let tick = 0;
    const id = window.setInterval(() => {
      tick++;
      const settled = Math.floor(tick / 2) - 3;
      setShown([...word].map((c, i) => (i < settled ? c : HEX[Math.floor(Math.random() * HEX.length)])).join(""));
      if (settled >= word.length) window.clearInterval(id);
    }, 45);
    return () => {
      window.clearInterval(id);
      setShown(word);
    };
  }, [word]);

  return (
    <h1 className="ts-title">
      <span className="sr-only">{label}</span>
      <span className="ts-word" aria-hidden="true">
        {[...word].map((c, i) => (
          // The hidden final letter holds the width, so the line does not jitter while digits cycle.
          <span key={i} className="ch" style={{ "--i": i } as CSSProperties}>
            <span className="ghost">{c}</span>
            <span className={shown[i] === c ? undefined : "hex"}>{shown[i]}</span>
          </span>
        ))}
      </span>
    </h1>
  );
}
