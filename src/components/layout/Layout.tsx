import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useParallax } from "@/hooks/useScrollScenes";
import { LightboxProvider } from "./LightboxContext";
import { ScrollProgress } from "./ScrollProgress";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

/** Resets scroll position on every route change. */
function useScrollReset() {
  const { pathname } = useLocation();
  // biome-ignore lint/correctness/useExhaustiveDependencies: reset scroll position on every navigation.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
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
