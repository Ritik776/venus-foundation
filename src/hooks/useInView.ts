import { type RefObject, useContext, useEffect, useRef, useState } from "react";
import { InstantRevealContext } from "./instantReveal";

interface InViewOptions {
  threshold?: number;
  /** Margin around the root. Defaults to firing ~8% before the element's top reaches the bottom edge. */
  rootMargin?: string;
  /** Keep observing after the first intersection (re-toggles). Defaults to `false` (reveal once). */
  repeat?: boolean;
}

/**
 * Observe an element and report when it enters the viewport.
 * Falls back to "always visible" when IntersectionObserver is unavailable.
 */
export function useInView<T extends HTMLElement>(
  options: InViewOptions = {},
): readonly [RefObject<T | null>, boolean] {
  const { threshold = 0, rootMargin = "0px 0px -8% 0px", repeat = false } = options;
  const instant = useContext(InstantRevealContext);
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Hero content reveals on the next frame regardless of scroll position.
    if (instant) {
      const raf = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(raf);
    }
    const el = ref.current;
    if (!el) {
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (!repeat) {
              observer.disconnect();
            }
          } else if (repeat) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, repeat, instant]);

  return [ref, inView] as const;
}
