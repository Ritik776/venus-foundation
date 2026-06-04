import { createContext } from "react";

/**
 * When true, descendant `useInView` consumers reveal immediately on mount
 * instead of waiting for scroll — used to wrap above-the-fold hero content so
 * it animates in on load and is never left hidden.
 */
export const InstantRevealContext = createContext(false);
