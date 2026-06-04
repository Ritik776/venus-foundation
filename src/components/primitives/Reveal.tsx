import {
  type ComponentPropsWithoutRef,
  createElement,
  type ElementType,
  type ReactNode,
} from "react";
import { useInView } from "@/hooks/useInView";

export type RevealVariant = "up" | "left" | "right" | "scale" | "clip";
export type RevealDelay = 1 | 2 | 3 | 4 | 5 | 6;

type RevealOwnProps = {
  variant?: RevealVariant;
  delay?: RevealDelay;
  children?: ReactNode;
  className?: string;
};

type RevealProps<T extends ElementType> = RevealOwnProps & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof RevealOwnProps | "as">;

/**
 * Scroll-reveal wrapper. Renders any element (`as`) with the `data-reveal`
 * contract and toggles `.in` when it scrolls into view, reusing the shared CSS.
 */
export function Reveal<T extends ElementType = "div">({
  as,
  variant = "up",
  delay,
  className,
  children,
  ...rest
}: RevealProps<T>) {
  const [ref, inView] = useInView<HTMLElement>();
  const tag = (as ?? "div") as ElementType;
  const classes = [className, inView ? "in" : null].filter(Boolean).join(" ");

  return createElement(
    tag,
    {
      ref,
      className: classes || undefined,
      "data-reveal": variant === "up" ? "" : variant,
      "data-delay": delay,
      ...rest,
    },
    children,
  );
}
