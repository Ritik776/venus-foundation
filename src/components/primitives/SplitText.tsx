import { createElement, type ElementType, Fragment } from "react";
import { useInView } from "@/hooks/useInView";

interface SplitTextProps {
  as?: ElementType;
  text: string;
  className?: string;
}

/**
 * Word-by-word reveal. Splits `text` into spans that stagger in once the
 * heading scrolls into view. A dedicated `.split-gap` span sits between words
 * so the inter-word space never collapses between the inline-block words.
 */
export function SplitText({ as = "h2", text, className }: SplitTextProps) {
  const [ref, inView] = useInView<HTMLElement>();
  const words = text.trim().split(/\s+/);
  const classes = [className, inView ? "in" : null].filter(Boolean).join(" ");

  return createElement(
    as,
    { ref, className: classes || undefined },
    <span className="split-line">
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="split-word">
            <span className="sp" style={{ transitionDelay: `${i * 0.04}s` }}>
              {word}
            </span>
          </span>
          {i < words.length - 1 ? <span className="split-gap"> </span> : null}
        </Fragment>
      ))}
    </span>,
  );
}
