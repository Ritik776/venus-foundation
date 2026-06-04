import type { ReactNode } from "react";
import { InstantRevealContext } from "@/hooks/instantReveal";

/** Wrap hero content so its reveals/split-text animate in on load (not on scroll). */
export function InstantReveal({ children }: { children: ReactNode }) {
  return <InstantRevealContext.Provider value={true}>{children}</InstantRevealContext.Provider>;
}
