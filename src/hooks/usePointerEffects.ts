import { type RefObject, useCallback, useEffect, useRef, useState } from "react";

function canHover(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Magnetic pull: the element drifts toward the cursor while hovered.
 * Returns a ref to attach to the target element.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.3): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canHover()) {
      return;
    }
    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const onLeave = () => {
      el.style.transform = "";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return ref;
}

/** 3D tilt-on-hover for cards. */
export function useTilt<T extends HTMLElement>(amount = 7): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canHover()) {
      return;
    }
    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(800px) rotateY(${px * amount}deg) rotateX(${-py * amount}deg) translateY(-6px)`;
    };
    const onLeave = () => {
      el.style.transform = "";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [amount]);

  return ref;
}

interface RailControls {
  atStart: boolean;
  atEnd: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
}

/** Prev/next controls for a horizontal rail, with edge-aware disabled state. */
export function useRailControls(railRef: RefObject<HTMLElement | null>): RailControls {
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) {
      return;
    }
    const update = () => {
      const max = rail.scrollWidth - rail.clientWidth - 2;
      setAtStart(rail.scrollLeft <= 2);
      setAtEnd(rail.scrollLeft >= max);
    };
    update();
    rail.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      rail.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [railRef]);

  const scrollByCards = useCallback(
    (direction: number) => {
      const rail = railRef.current;
      if (!rail) {
        return;
      }
      const card = rail.firstElementChild as HTMLElement | null;
      const styles = getComputedStyle(rail);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "24") || 24;
      const step = card ? card.getBoundingClientRect().width + gap : rail.clientWidth * 0.8;
      const max = rail.scrollWidth - rail.clientWidth;
      const target = Math.max(0, Math.min(rail.scrollLeft + direction * step, max));
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      rail.scrollTo({ left: target, behavior: reduce ? "auto" : "smooth" });
    },
    [railRef],
  );

  return {
    atStart,
    atEnd,
    scrollPrev: useCallback(() => scrollByCards(-1), [scrollByCards]),
    scrollNext: useCallback(() => scrollByCards(1), [scrollByCards]),
  };
}

/** Pointer drag-to-scroll for horizontal rails. */
export function useDragScroll<T extends HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const rail = ref.current;
    if (!rail) {
      return;
    }
    let down = false;
    let startX = 0;
    let startScroll = 0;

    const onDown = (event: PointerEvent) => {
      down = true;
      startX = event.pageX;
      startScroll = rail.scrollLeft;
      rail.classList.add("dragging");
    };
    const onUp = () => {
      down = false;
      rail.classList.remove("dragging");
    };
    const onMove = (event: PointerEvent) => {
      if (!down) {
        return;
      }
      event.preventDefault();
      rail.scrollLeft = startScroll - (event.pageX - startX) * 1.4;
    };

    rail.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    rail.addEventListener("pointermove", onMove);
    return () => {
      rail.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      rail.removeEventListener("pointermove", onMove);
    };
  }, []);

  return ref;
}
