import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface CounterProps {
  to: number;
  suffix?: string;
  durationMs?: number;
  className?: string;
}

/** Counts up to `to` once it scrolls into view (instant when reduced motion is on). */
export function Counter({ to, suffix = "", durationMs = 1600, className }: CounterProps) {
  const [ref, inView] = useInView<HTMLSpanElement>();
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) {
      return;
    }
    if (reduced) {
      setValue(to);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const tick = (now: number) => {
      if (start === null) {
        start = now;
      }
      const p = Math.min((now - start) / durationMs, 1);
      const eased = 1 - (1 - p) ** 3;
      setValue(to * eased);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, to, durationMs]);

  const display = Number.isInteger(to) ? Math.round(value) : value.toFixed(1);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
