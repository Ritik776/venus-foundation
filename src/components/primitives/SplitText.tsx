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
  // A literal "\n" in the text forces a hard line break (stagger keeps running across it).
  const lines = text.trim().split("\n");
  const classes = [className, inView ? "in" : null].filter(Boolean).join(" ");
  let wordIndex = 0;

  return createElement(
    as,
    { ref, className: classes || undefined },
    <span className="split-line">
      {lines.map((line, li) => {
        const words = line.trim().split(/\s+/);
        return (
          <Fragment key={`line-${li}`}>
            {li > 0 ? <br /> : null}
            {words.map((word, i) => {
              const delay = wordIndex * 0.04;
              wordIndex += 1;
              return (
                <Fragment key={`${word}-${li}-${i}`}>
                  <span className="split-word">
                    <span className="sp" style={{ transitionDelay: `${delay}s` }}>
                      {word}
                    </span>
                  </span>
                  {i < words.length - 1 ? <span className="split-gap"> </span> : null}
                </Fragment>
              );
            })}
          </Fragment>
        );
      })}
    </span>,
  );
}
