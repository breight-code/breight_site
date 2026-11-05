import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

type Token = { text: string; cls?: string };

// Small Dart highlighter: keywords, strings, types. Enough for one fixed snippet.
function tokenize(code: string): Token[] {
  const re = /('[^']*')|\b(class|async|await|return)\b|\b(String|List|Future|App)\b/g;
  const out: Token[] = [];
  let last = 0;
  for (const m of code.matchAll(re)) {
    if (m.index > last) out.push({ text: code.slice(last, m.index) });
    out.push({ text: m[0], cls: m[1] ? "s" : m[2] ? "k" : "t" });
    last = m.index + m[0].length;
  }
  out.push({ text: code.slice(last) });
  return out;
}

export default function CodeType({ code }: { code: string }) {
  const reduce = useReducedMotion();
  const tokens = tokenize(code);
  const [n, setN] = useState(code.length);

  useEffect(() => {
    if (reduce) return;
    setN(0);
    let i = 0;
    let id = 0;
    const start = window.setTimeout(() => {
      id = window.setInterval(() => {
        i += code[i] === " " ? 3 : 1;
        setN(Math.min(i, code.length));
        if (i >= code.length) window.clearInterval(id);
      }, 22);
    }, 900);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(id);
    };
  }, [code, reduce]);

  let left = n;
  return (
    <motion.div
      className="code-card"
      data-ui
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="term-head" aria-hidden="true"><i /><i /><i /><span>developer.dart</span></div>
      <pre><code>
        {tokens.map((tk, i) => {
          if (left <= 0) return null;
          const text = tk.text.slice(0, left);
          left -= tk.text.length;
          return tk.cls ? <span key={i} className={tk.cls}>{text}</span> : text;
        })}
        <span className="caret" aria-hidden="true" />
      </code></pre>
    </motion.div>
  );
}
