import { img } from "@/content/images";
import { buildingTomorrowsShade } from "./posts/building-tomorrows-shade";
import { empoweringCommunities } from "./posts/empowering-communities-food-care";
import { fromDreamsToDirection } from "./posts/from-dreams-to-direction";
import { spreadingHope } from "./posts/spreading-hope";
import { storiesOfHope } from "./posts/stories-of-hope-blood-camps";
import { walkingWithCommunities } from "./posts/walking-with-communities";
import type { BlogCategory, BlogPost } from "./types";

export type { ArticleBlock, BlogCategory, BlogPost } from "./types";

/** All posts, newest first. Add a new post by importing it here. */
export const posts: BlogPost[] = [
  fromDreamsToDirection,
  empoweringCommunities,
  storiesOfHope,
  walkingWithCommunities,
  buildingTomorrowsShade,
  spreadingHope,
].sort((a, b) => b.date.localeCompare(a.date));

export const blogHero = {
  image: { src: img.blogBanner, alt: "Venus Foundation stories" },
  breadcrumb: "Blog",
  eyebrow: "Stories & impact",
  words: [
    { text: "Empower.", tone: "" },
    { text: "Elevate.", tone: "text-green" },
    { text: "Evolve.", tone: "text-gold" },
  ],
  subtitle:
    "Latest updates and event highlights from Venus Foundation. Sharing knowledge multiplies impact — one story can educate, inspire and empower thousands.",
} as const;

export interface CategoryFilter {
  value: BlogCategory | "all";
  label: string;
}

export const categoryFilters: CategoryFilter[] = [
  { value: "all", label: "All" },
  { value: "education", label: "Education" },
  { value: "health", label: "Health" },
  { value: "community", label: "Community" },
  { value: "climate", label: "Climate" },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

/** The hand-picked hero post followed by the next two for the featured rail. */
export function getFeatured(): { lead: BlogPost; rest: BlogPost[] } {
  const lead = posts.find((post) => post.featured) ?? posts[0];
  const rest = posts.filter((post) => post.slug !== lead.slug).slice(0, 2);
  return { lead, rest };
}

/** Up to `limit` posts sharing the category (falling back to most recent others). */
export function getRelated(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  const others = posts.filter((post) => post.slug !== slug);
  if (!current) {
    return others.slice(0, limit);
  }
  const sameCategory = others.filter((post) => post.category === current.category);
  const merged = [...sameCategory, ...others.filter((post) => post.category !== current.category)];
  return merged.slice(0, limit);
}
