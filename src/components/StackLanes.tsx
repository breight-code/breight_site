import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import type { Lane } from "../content/site";

// One giant line of the six areas slides with the scroll; the detail sits below in a quiet grid.
export default function StackLanes({ lanes }: { lanes: Lane[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], ["5%", "-55%"]);
  const words = lanes.map((l) => l.word).join(" / ");

  return (
    <div ref={ref}>
      <motion.span aria-hidden="true" className="giant display" style={reduce ? undefined : { x }}>
        {words}
      </motion.span>
      <ul className="skill-grid">
        {lanes.map((l, i) => (
          <li key={l.word} data-reveal style={{ ["--i" as string]: i % 3 }}>
            <h3>{l.title}</h3>
            <p>{l.text}</p>
            <p className="skill-tags">{l.tags.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
