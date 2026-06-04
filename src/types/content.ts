import type { ButtonVariant } from "@/components/primitives/Button";
import type { ChipTone } from "@/components/primitives/Chip";
import type { IconName } from "@/components/primitives/Icon";

/** A call-to-action button definition used throughout page content. */
export interface Cta {
  label: string;
  /** Internal route. */
  to?: string;
  /** External / mailto / tel link. */
  href?: string;
  variant?: ButtonVariant;
  onDark?: boolean;
  arrow?: boolean;
}

export interface NavLink {
  label: string;
  to: string;
  /** Key used for the active-state CSS (`data-nav`). */
  dataNav?: string;
  /** Optional dropdown entries (e.g. Media & Stories). */
  dropdown?: { label: string; description: string; to: string }[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconName;
}

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
  /** Number colour class, e.g. "text-green". */
  tone?: string;
}

/** A chip + heading + copy pill used by the immersive heroes. */
export interface HeroPill {
  value: string;
  label: string;
}

export interface ImageRef {
  src: string;
  alt: string;
}

export interface DidYouKnow {
  label: string;
  text: string;
}

export interface SectionIntro {
  eyebrow?: string;
  title: string;
  body?: string;
}

/** A run of text with optional bold emphasis — used for inline-emphasised list items. */
export interface RichSegment {
  text: string;
  bold?: boolean;
}
export type RichLine = RichSegment[];

export interface TaggedItem {
  tone?: ChipTone;
  tag: string;
  title: string;
  body?: string;
  image?: ImageRef;
}
