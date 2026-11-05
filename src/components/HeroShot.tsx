import type { ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

// The window starts tilted back and straightens while the first screen scrolls away.
// Reduced motion keeps it flat from tsuba.css, which overrides the inline transform.
export default function HeroShot({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll();
  const span = typeof window === "undefined" ? 600 : window.innerHeight * 0.6;
  const progress = useSpring(useTransform(scrollY, [0, span], [0, 1]), { stiffness: 170, damping: 32, mass: 0.4 });
  const rotateX = useTransform(progress, [0, 1], [16, 0]);
  const scale = useTransform(progress, [0, 1], [0.9, 1]);
  const y = useTransform(progress, [0, 1], [40, 0]);

  return (
    <motion.div className="ts-shot" style={{ rotateX, scale, y }}>
      {children}
    </motion.div>
  );
}
