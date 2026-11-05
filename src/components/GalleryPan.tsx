import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

// Wide screens with a mouse: the section pins and vertical scroll pans the strip sideways.
// Touch, narrow screens and reduced motion keep the native swipe with snap points from tsuba.css.
export default function GalleryPan({ head, children }: { head?: ReactNode; children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    // Same value in both layouts: the track is as wide as its content either way, the pin as wide as the viewport.
    const measure = () => setDist(mq.matches ? Math.max(0, track.current!.scrollWidth - pin.current!.clientWidth) : 0);
    const ro = new ResizeObserver(measure);
    ro.observe(pin.current!);
    mq.addEventListener("change", measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 160, damping: 34, mass: 0.4 });
  const x = useTransform(smooth, (v) => -v * dist);
  const pan = dist > 0;

  return (
    <div ref={outer} className="ts-pan" data-pan={pan ? "" : undefined} style={pan ? { height: `calc(100vh + ${dist}px)` } : undefined}>
      <div ref={pin} className="ts-pan-pin">
        {head}
        <motion.div ref={track} className="ts-pan-track" style={{ x }}>
          {children}
        </motion.div>
      </div>
    </div>
  );
}
