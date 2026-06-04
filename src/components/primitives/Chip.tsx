import type { ReactNode } from "react";

export type ChipTone = "green" | "red" | "gold" | "sky";

interface ChipProps {
  children: ReactNode;
  tone?: ChipTone;
  className?: string;
}

const TONE_CLASS: Record<ChipTone, string> = {
  green: "",
  red: "red",
  gold: "gold",
  sky: "sky",
};

/** Small uppercase category label. */
export function Chip({ children, tone = "green", className }: ChipProps) {
  const classes = ["chip", TONE_CLASS[tone], className].filter(Boolean).join(" ");
  return <span className={classes}>{children}</span>;
}
