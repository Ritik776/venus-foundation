import { Reveal } from "./Reveal";

interface EyebrowProps {
  children: string;
  onDark?: boolean;
  center?: boolean;
  className?: string;
}

/** The small kicker label above section headings. */
export function Eyebrow({ children, onDark = false, center = false, className }: EyebrowProps) {
  const classes = ["eyebrow", onDark ? "on-dark" : null, center ? "mx-auto" : null, className]
    .filter(Boolean)
    .join(" ");
  return (
    <Reveal as="span" className={classes} style={center ? { justifyContent: "center" } : undefined}>
      {children}
    </Reveal>
  );
}
