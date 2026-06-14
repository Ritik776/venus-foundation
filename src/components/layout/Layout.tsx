import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useParallax } from "@/hooks/useScrollScenes";
import { LightboxProvider } from "./LightboxContext";
import { ScrollProgress } from "./ScrollProgress";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

/** Resets scroll on route change, or scrolls to the `#anchor` section when present. */
function useScrollReset() {
  const { pathname, hash } = useLocation();
  // biome-ignore lint/correctness/useExhaustiveDependencies: re-run on every navigation (path or hash).
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      // Wait a frame so the destination page has rendered before scrolling.
      const raf = requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return () => cancelAnimationFrame(raf);
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);
}

export function Layout() {
  const mainRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  useScrollReset();
  useParallax(mainRef, pathname);

  return (
    <LightboxProvider>
      <ScrollProgress />
      <SiteHeader />
      <main ref={mainRef} id="top">
        <Outlet />
      </main>
      <SiteFooter />
    </LightboxProvider>
  );
}
