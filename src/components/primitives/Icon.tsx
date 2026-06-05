import type { ReactNode, SVGProps } from "react";

export type IconName =
  | "arrow-right"
  | "arrow-left"
  | "arrow-up"
  | "chevron-left"
  | "chevron-right"
  | "expand"
  | "video"
  | "heart-fill"
  | "comment"
  | "circle"
  | "play"
  | "heart"
  | "users"
  | "partner"
  | "share"
  | "phone"
  | "mail"
  | "location"
  | "clock"
  | "check"
  | "bulb"
  | "facebook"
  | "instagram"
  | "x"
  | "linkedin"
  | "youtube";

type PathSpec = {
  /** Stroked paths (fill:none, stroke:currentColor). */
  stroke?: string[];
  /** Filled paths (fill:currentColor). */
  fill?: string[];
  /** Extra elements rendered verbatim for stroked icons. */
  extra?: () => ReactNode;
};

const ICONS: Record<IconName, PathSpec> = {
  "arrow-right": { stroke: ["M5 12h14M13 6l6 6-6 6"] },
  "arrow-left": { stroke: ["M19 12H5M11 18l-6-6 6-6"] },
  "arrow-up": { stroke: ["M12 19V5M5 12l7-7 7 7"] },
  "chevron-left": { stroke: ["M15 18l-6-6 6-6"] },
  "chevron-right": { stroke: ["M9 6l6 6-6 6"] },
  expand: { stroke: ["M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"] },
  video: {
    stroke: ["M0 0"],
    extra: () => (
      <>
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </>
    ),
  },
  "heart-fill": { fill: ["M12 21s-8-5-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 6-8 11-8 11z"] },
  comment: { fill: ["M21 11.5a8.5 8.5 0 01-12 7.7L3 21l1.8-6A8.5 8.5 0 1121 11.5z"] },
  circle: { fill: ["M12 2a10 10 0 100 20 10 10 0 000-20z"] },
  play: { fill: ["M8 5v14l11-7z"] },
  heart: {
    stroke: [
      "M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 10-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 000-7.8z",
    ],
  },
  users: {
    stroke: [
      "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2",
      "M23 21v-2a4 4 0 00-3-3.87M16 3.13A4 4 0 0119 7a4 4 0 01-3 3.87",
    ],
    extra: () => <circle cx="9" cy="7" r="4" />,
  },
  partner: { stroke: ["M16 3h5v5M21 3l-7 7M8 21H3v-5M3 21l7-7"] },
  share: {
    stroke: ["M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"],
    extra: () => (
      <>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
      </>
    ),
  },
  phone: {
    stroke: [
      "M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.6A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.4-1.2a2 2 0 012.1-.5c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z",
    ],
  },
  mail: {
    stroke: ["M3 7l9 6 9-6"],
    extra: () => <rect x="3" y="5" width="18" height="14" rx="2" />,
  },
  location: {
    stroke: ["M12 21s-7-5.7-7-11a7 7 0 1114 0c0 5.3-7 11-7 11z"],
    extra: () => <circle cx="12" cy="10" r="2.5" />,
  },
  clock: { stroke: ["M12 6v6l4 2"], extra: () => <circle cx="12" cy="12" r="10" /> },
  check: { stroke: ["M20 6L9 17l-5-5"] },
  bulb: { stroke: ["M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z", "M9 21h6M10 17v4M14 17v4"] },
  facebook: { fill: ["M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9z"] },
  instagram: {
    stroke: ["M0 0"],
    extra: () => (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </>
    ),
  },
  x: { fill: ["M18 3h3l-7 8 8 10h-6l-5-6-5 6H3l8-9L3 3h6l4 5 5-5z"] },
  linkedin: {
    fill: [
      "M4.98 3.5a2 2 0 11-.02 4 2 2 0 01.02-4zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z",
    ],
  },
  youtube: {
    fill: [
      "M23 12s0-3.3-.4-4.8c-.2-.9-.9-1.5-1.7-1.7C19.3 5 12 5 12 5s-7.3 0-8.9.5c-.8.2-1.5.8-1.7 1.7C1 8.7 1 12 1 12s0 3.3.4 4.8c.2.9.9 1.5 1.7 1.7C4.7 19 12 19 12 19s7.3 0 8.9-.5c.8-.2 1.5-.8 1.7-1.7.4-1.5.4-4.8.4-4.8zM10 15V9l5 3z",
    ],
  },
};

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
};

/** Inline SVG icon. Filled icons paint with currentColor; stroked icons use a 2px stroke. */
export function Icon({ name, ...rest }: IconProps) {
  const spec = ICONS[name];
  const isFilled = Boolean(spec.fill);
  const hasOnlyExtra = !spec.fill && spec.stroke?.length === 1 && spec.stroke[0] === "M0 0";

  return (
    <svg
      viewBox="0 0 24 24"
      fill={isFilled ? "currentColor" : "none"}
      stroke={isFilled ? undefined : "currentColor"}
      strokeWidth={isFilled ? undefined : 2}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {spec.fill?.map((d) => (
        <path key={d} d={d} />
      ))}
      {!hasOnlyExtra && spec.stroke?.map((d) => <path key={d} d={d} />)}
      {spec.extra?.()}
    </svg>
  );
}
