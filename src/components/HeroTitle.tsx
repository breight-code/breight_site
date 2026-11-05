import { useEffect, useRef, useState } from "react";
import { motion, motionValue, useReducedMotion, useSpring, type MotionValue } from "motion/react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}<>/=+*#";

function Char({ char, stretch, delay, decode }: { char: string; stretch: MotionValue<number>; delay: number; decode: boolean }) {
  const scaleY = useSpring(stretch, { stiffness: 260, damping: 18, mass: 0.6 });
  const [shown, setShown] = useState(char);

  useEffect(() => {
    if (!decode || char === " ") return;
    let frame = 0;
    const settleAt = 6 + Math.round(delay / 45);
    const id = window.setInterval(() => {
      frame++;
      if (frame >= settleAt) {
        setShown(char);
        window.clearInterval(id);
      } else {
        setShown(GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);
      }
    }, 45);
    return () => window.clearInterval(id);
  }, [char, delay, decode]);

  return (
    <motion.span className="ch" style={{ scaleY }}>
      {char === " " ? " " : shown}
    </motion.span>
  );
}

// Each letter stretches toward the pointer: the headline itself is the moving part.
export default function HeroTitle({ lines, label }: { lines: [string, string]; label: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const chars = lines.flatMap((line, li) => [...line].map((c, ci) => ({ c, li, key: `${li}-${ci}` })));
  // One motion value per letter, created once for the fixed headline.
  const values = useRef<MotionValue<number>[]>([]);
  if (values.current.length === 0) values.current = chars.map(() => motionValue(1));
  const [decode, setDecode] = useState(false);

  useEffect(() => {
    if (reduce) return;
    setDecode(true);
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>(".ch"));
    let rects = spans.map((s) => s.getBoundingClientRect());
    const measure = () => (rects = spans.map((s) => s.getBoundingClientRect()));
    const onMove = (e: PointerEvent) => {
      rects.forEach((r, i) => {
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy * 0.6);
        values.current[i].set(1 + Math.max(0, 1 - d / 260) * 0.28);
      });
    };
    const onLeave = () => values.current.forEach((v) => v.set(1));
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, [reduce]);

  let index = -1;
  return (
    <h1 ref={ref} className="display" style={{ ["--chars" as string]: Math.max(...lines.map((l) => l.length)) }}>
      <span className="sr-only">{label}</span>
      {lines.map((line, li) => (
        <motion.span
          key={li}
          aria-hidden="true"
          className={`l l${li + 1}`}
          initial={reduce ? false : { opacity: 0, y: "40%" }}
          animate={{ opacity: 1, y: "0%" }}
          transition={{ duration: 0.9, delay: 0.1 + li * 0.14, ease: [0.23, 1, 0.32, 1] }}
        >
          {[...line].map((c) => {
            index++;
            const i = index;
            return <Char key={chars[i].key} char={c} stretch={values.current[i]} delay={i * 35} decode={decode} />;
          })}
          {li === 1 && <span className="cursor" />}
        </motion.span>
      ))}
    </h1>
  );
}
