import type { ChipTone } from "@/components/primitives/Chip";
import type { ImageRef, RichLine } from "@/types/content";

export type BlogCategory = "education" | "health" | "community" | "climate" | "impact";

/** A single rendered block within an article body. */
export type ArticleBlock =
  | { type: "lead"; id?: string; tocLabel?: string; text: string }
  | { type: "p"; id?: string; tocLabel?: string; text: string }
  | { type: "h2"; id: string; tocLabel?: string; text: string }
  | { type: "quote"; text: string }
  | { type: "callout"; rich: RichLine }
  | { type: "figure"; image: ImageRef; caption: string }
  | { type: "list"; items: string[] }
  | { type: "stat"; value: number; suffix?: string; label: string }
  | { type: "takeaways"; id: string; tocLabel?: string; items: string[] };

export interface Author {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  /** Card + meta summary. */
  excerpt: string;
  /** Longer dek shown on the article hero. */
  subtitle: string;
  category: BlogCategory;
  categoryLabel: string;
  categoryTone: ChipTone;
  author: Author;
  /** ISO date for sorting. */
  date: string;
  dateLabel: string;
  updatedLabel: string;
  readMinutes: number;
  image: ImageRef;
  featured?: boolean;
  body: ArticleBlock[];
}
