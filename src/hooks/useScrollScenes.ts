import { type RefObject, useEffect, useRef, useState } from "react";

function prefersReduced(): boolean {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Applies subtle vertical parallax to every `[data-parallax]` element within `scopeRef`.
 * Pass a changing `rescanKey` (e.g. the route path) to re-query after navigation.
 */
export function useParallax(scopeRef: RefObject<HTMLElement | null>, rescanKey?: string): void {
  // biome-ignore lint/correctness/useExhaustiveDependencies: rescanKey intentionally re-runs the scan after navigation.
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope || prefersReduced()) {
      return;
    }
    const els = Array.from(scope.querySelectorAll<HTMLElement>("[data-parallax]"));
    if (els.length === 0) {
      return;
    }
    let ticking = false;

    const apply = () => {
      const vh = window.innerHeight;
      for (const el of els) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) {
          continue;
        }
        const speed = Number.parseFloat(el.dataset.parallax ?? "0.15") || 0.15;
        const center = rect.top + rect.height / 2 - vh / 2;
        el.style.transform = `translate3d(0, ${-center * speed}px, 0)`;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", apply);
    };
  }, [scopeRef, rescanKey]);
}

/** Fills the vertical journey line as the track scrolls through the viewport. */
export function useJourneyLine(
  trackRef: RefObject<HTMLElement | null>,
  fillRef: RefObject<HTMLElement | null>,
): void {
  useEffect(() => {
    const track = trackRef.current;
    const fill = fillRef.current;
    if (!track || !fill) {
      return;
    }
    const update = () => {
      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.4;
      let p = (start - rect.top) / (rect.height - (vh - end));
      p = Math.min(Math.max(p, 0), 1);
      fill.style.transform = `scaleY(${p})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [trackRef, fillRef]);
}

/** Drives a scroll-scrubbed frame sequence; returns the active frame index. */
export function useScrub(sceneRef: RefObject<HTMLElement | null>, frameCount: number): number {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || frameCount === 0) {
      return;
    }
    const update = () => {
      const rect = scene.getBoundingClientRect();
      const total = scene.offsetHeight - window.innerHeight;
      const p = Math.min(Math.max(-rect.top / total, 0), 1);
      // Weight the final beat so the closing line lingers instead of flashing past.
      const idx = p < 0.24 ? 0 : p < 0.48 ? 1 : p < 0.7 ? 2 : frameCount - 1;
      setIndex(Math.min(idx, frameCount - 1));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sceneRef, frameCount]);

  return index;
}

interface TocState {
  activeId: string;
  progress: number;
}

/** Scroll-spy for the article table of contents plus a reading-progress ratio (0–1). */
export function useTableOfContents(
  articleRef: RefObject<HTMLElement | null>,
  ids: string[],
): TocState {
  const [state, setState] = useState<TocState>({ activeId: ids[0] ?? "", progress: 0 });

  useEffect(() => {
    const article = articleRef.current;
    if (!article) {
      return;
    }
    const spy = () => {
      const pos = window.scrollY + 140;
      let active = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= pos) {
          active = id;
        }
      }
      const total = article.offsetHeight - window.innerHeight * 0.6;
      const ratio = Math.min(Math.max((window.scrollY - (article.offsetTop - 120)) / total, 0), 1);
      setState({ activeId: active, progress: ratio });
    };
    spy();
    window.addEventListener("scroll", spy, { passive: true });
    window.addEventListener("resize", spy);
    return () => {
      window.removeEventListener("scroll", spy);
      window.removeEventListener("resize", spy);
    };
  }, [articleRef, ids]);

  return state;
}

/** Auto-advancing hero slideshow index with manual override support. */
export function useHeroSlides(count: number, intervalMs = 5200) {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (count < 2 || prefersReduced()) {
      return;
    }
    timer.current = setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, intervalMs);
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [count, intervalMs]);

  const goTo = (next: number) => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    setIndex(((next % count) + count) % count);
    if (count >= 2 && !prefersReduced()) {
      timer.current = setInterval(() => {
        setIndex((current) => (current + 1) % count);
      }, intervalMs);
    }
  };

  return { index, goTo };
}
