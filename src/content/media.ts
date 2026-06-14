import type { Cta, ImageRef } from "@/types/content";
import { img } from "./images";

const YT = "https://www.youtube.com/@FoundationVenus";
const IG = "https://www.instagram.com/venus.foundation";
const FB = "https://www.facebook.com/foundationvenus/";
const LI = "https://www.linkedin.com/company/foundationvenus/";
const IG_HANDLE = "venus.foundation";

/** Compact Netflix-style rail card (Instagram reels, LinkedIn). */
export interface RailCard {
  image: string;
  title: string;
  tags?: readonly string[];
  badge?: string;
  /** Permalink to open in the lightbox (live cards); falls back to a placeholder. */
  url?: string;
}

/** Instagram feed post card (full IG-style UI). */
export interface IgFeedPost {
  image: string;
  /** Line shown under the username (location or context). */
  sub: string;
  likes: number;
  caption: string;
  comments: number;
  time: string;
  url: string;
}

/** Facebook feed post card (full FB-style UI). */
export interface FbFeedPost {
  image: string;
  text: string;
  video?: boolean;
  reactions: readonly ("like" | "love" | "care")[];
  count: number;
  comments: number;
  time: string;
  url: string;
}

export interface FootageVideo {
  poster: string;
  src: string;
  chip: string;
  title: string;
  body: string;
  tag: string;
}

export interface WallCard {
  platform: "youtube" | "instagram" | "facebook" | "linkedin";
  image: string;
  ratio: string;
  handle: string;
  caption: string;
  /** For YouTube. */
  videoId?: string;
  /** For IG/FB/LI embeds. */
  url?: string;
  fbVideo?: boolean;
}

const SAMPLE_MP4 = "https://www.w3schools.com/html/mov_bbb.mp4";

export const mediaContent = {
  hero: {
    image: { src: img.mediaTop, alt: "Life at Venus Foundation" },
    breadcrumb: "Media",
    eyebrow: "Our film · 2025",
    words: [{ text: "Empower." }, { text: "Elevate." }, { text: "Evolve." }],
    subtitle:
      "Visual stories travel faster than words — a single film can spark awareness worldwide. Watch how change happens, heart to heart.",
  },

  /* ---------- WATCH & FOLLOW: every channel, one section ---------- */
  watch: {
    eyebrow: "Watch & follow",
    title: "Every story, on every channel.",
    handle: IG_HANDLE,
    channels: { youtube: YT, instagram: IG, facebook: FB, linkedin: LI },

    /*
     * Curated Instagram content (used until IG_ACCESS_TOKEN is configured —
     * then the live /api/instagram feed overrides all of this automatically).
     *
     * To make a card open the REAL post/reel, paste its permalink into `url`,
     * e.g. url: "https://www.instagram.com/reel/ABC123/". The card's image &
     * caption below are what shows on the rail; clicking embeds the live post.
     * Leave url: "" to show the branded "post coming soon" placeholder.
     */

    /* Instagram Reels — vertical cards (real permalinks; labels are curated). */
    igReels: [
      {
        image: img.foodDistribution,
        title: "Warm meals, warmer hearts",
        tags: ["Reel"],
        badge: "Reel",
        url: "https://www.instagram.com/reel/DY4MbIWBMbt/",
      },
      {
        image: img.treePlantation,
        title: "200 saplings, one morning",
        tags: ["Reel"],
        url: "https://www.instagram.com/reel/DYxEAC-hmxR/",
      },
      {
        image: img.planting,
        title: "Seeds of a classroom",
        tags: ["Reel"],
        url: "https://www.instagram.com/reel/DYCWpEkB0sk/",
      },
      {
        image: img.bloodDonation,
        title: "Every drop counts",
        tags: ["Reel"],
        url: "https://www.instagram.com/reel/DX1YQTQBll6/",
      },
      {
        image: img.communities,
        title: "Community first",
        tags: ["Reel"],
        url: "https://www.instagram.com/reel/DXeULnJgeO5/",
      },
      {
        image: img.topImg,
        title: "Little moments",
        tags: ["Reel"],
        url: "https://www.instagram.com/reel/DXJpXRFAXIc/",
      },
      {
        image: img.blogSlider,
        title: "Spreading hope",
        tags: ["Reel"],
        url: "https://www.instagram.com/reel/DWyhtnsAfWy/",
      },
      {
        image: img.mediaTop,
        title: "Smiles that say it all",
        tags: ["Reel"],
        url: "https://www.instagram.com/reel/DWjFPcIAaQq/",
      },
      {
        image: img.foodDistribution,
        title: "A plate full of hope",
        tags: ["Reel"],
        url: "https://www.instagram.com/reel/DWWFbcYAWJG/",
      },
      {
        image: img.treePlantation,
        title: "One sapling at a time",
        tags: ["Reel"],
        url: "https://www.instagram.com/reel/DWOaem3AQdT/",
      },
      {
        image: img.communities,
        title: "Together for change",
        tags: ["Reel"],
        url: "https://www.instagram.com/reel/DVvuJ_GhT2u/",
      },
    ] satisfies RailCard[],

    /* Instagram Posts — full feed cards. */
    igPosts: [
      {
        image: img.foodDistribution,
        sub: "Panchkula, India",
        likes: 482,
        caption:
          "Warm meals, warmer hearts. Today's drive reached 120 children across Panchkula 🧡",
        comments: 36,
        time: "2 days ago",
        url: "https://www.instagram.com/p/DVlaVK-Bl1f/",
      },
      {
        image: img.treePlantation,
        sub: "Tree plantation drive",
        likes: 763,
        caption: "200 saplings, one green morning. Here's to a greener tomorrow 🌱",
        comments: 58,
        time: "5 days ago",
        url: "",
      },
      {
        image: img.bloodDonation,
        sub: "Blood donation camp",
        likes: 391,
        caption: "Every drop counts. Thank you to our 60+ donors today 🩸",
        comments: 24,
        time: "1 week ago",
        url: "",
      },
      {
        image: img.communities,
        sub: "Community first",
        likes: 528,
        caption: "Listening before leading — community always comes first.",
        comments: 41,
        time: "2 weeks ago",
        url: "",
      },
      {
        image: img.blogSlider,
        sub: "Spreading hope",
        likes: 350,
        caption: "Small moments of care that connect us all 💫",
        comments: 19,
        time: "3 weeks ago",
        url: "",
      },
    ] satisfies IgFeedPost[],

    /* Facebook — full feed cards. */
    fbPosts: [
      {
        image: img.foodDistribution,
        text: "Watch the highlights from today's meal drive — 120 children served with a smile. 🧡",
        video: true,
        reactions: ["like", "love", "care"],
        count: 214,
        comments: 32,
        time: "2w",
        url: "demo",
      },
      {
        image: img.communities,
        text: "Walking with communities, together. Every conversation begins with listening. 🤝",
        reactions: ["like", "love"],
        count: 168,
        comments: 21,
        time: "3w",
        url: "demo",
      },
      {
        image: img.treePlantation,
        text: "200 saplings planted this season 🌳 Thank you to every volunteer who showed up for the planet.",
        reactions: ["like", "care"],
        count: 302,
        comments: 47,
        time: "1mo",
        url: "demo",
      },
      {
        image: img.bloodDonation,
        text: "Our blood donation camp with PGI Chandigarh welcomed 60+ donors. Heroes, every one of you. 🩸",
        reactions: ["like", "love", "care"],
        count: 189,
        comments: 28,
        time: "1mo",
        url: "demo",
      },
      {
        image: img.topImg,
        text: "A day in service — captured. This is what showing up looks like. 🎬",
        video: true,
        reactions: ["like", "love"],
        count: 256,
        comments: 39,
        time: "1mo",
        url: "demo",
      },
    ] satisfies FbFeedPost[],

    /* LinkedIn — compact cards. */
    liCards: [
      { image: img.treePlantation, title: "200 trees this season · #CSR", tags: ["128 reactions"] },
      { image: img.bloodDonation, title: "60+ donors at our camp", tags: ["94 reactions"] },
      {
        image: img.communities,
        title: "Career circles reached 5 schools",
        tags: ["156 reactions"],
      },
      { image: img.blogSlider, title: "Our impact report 2025", tags: ["210 reactions"] },
      { image: img.mediaTop, title: "Partnering for change", tags: ["88 reactions"] },
    ] satisfies RailCard[],
  },

  footage: {
    badge: "Our footage",
    title: "Raw moments, straight from the field.",
    body: "Unedited clips captured by our volunteers — the real texture of a day in service.",
    videos: [
      {
        poster: img.foodDistribution,
        src: SAMPLE_MP4,
        chip: "Zero Hunger",
        title: "A morning at the meal drive",
        body: "Volunteers serving fresh, warm meals to children across Panchkula.",
        tag: "Filmed Nov 2025 · 0:48",
      },
      {
        poster: img.treePlantation,
        src: SAMPLE_MP4,
        chip: "Life on Land",
        title: "200 saplings in one afternoon",
        body: "Our plantation drive, captured as it happened — every hand counts.",
        tag: "Filmed Oct 2025 · 1:05",
      },
    ] satisfies FootageVideo[],
  },

  wall: {
    eyebrow: "All our socials",
    title: "One feed. Every story.",
    body: "Everything we post across YouTube, Instagram, Facebook and LinkedIn — in one place, playing right here.",
    cards: [
      {
        platform: "instagram",
        image: img.foodDistribution,
        ratio: "9/14",
        handle: `@${IG_HANDLE}`,
        caption: "Warm meals, warmer hearts 🧡",
        url: "demo",
      },
      {
        platform: "youtube",
        image: img.mediaTop,
        ratio: "16/9",
        handle: "Venus Foundation",
        caption: "Seeds of Change — 2025 film",
        videoId: "demo",
      },
      {
        platform: "facebook",
        image: img.communities,
        ratio: "4/3",
        handle: "Venus Foundation",
        caption: "Walking with communities",
        url: "demo",
      },
      {
        platform: "linkedin",
        image: img.treePlantation,
        ratio: "4/5",
        handle: "Venus Foundation",
        caption: "200 trees this season · #CSR",
        url: LI,
      },
      {
        platform: "instagram",
        image: img.bloodDonation,
        ratio: "1/1",
        handle: `@${IG_HANDLE}`,
        caption: "60+ donors today 🩸",
        url: "demo",
      },
      {
        platform: "youtube",
        image: img.treePlantation,
        ratio: "16/9",
        handle: "Venus Foundation",
        caption: "Planting Tomorrow's Shade",
        videoId: "demo",
      },
      {
        platform: "facebook",
        image: img.topImg,
        ratio: "4/5",
        handle: "Venus Foundation",
        caption: "A day in service — watch",
        fbVideo: true,
        url: "demo",
      },
      {
        platform: "instagram",
        image: img.planting,
        ratio: "9/14",
        handle: `@${IG_HANDLE}`,
        caption: "Reel: seeds of a classroom 🌱",
        url: "demo",
      },
      {
        platform: "linkedin",
        image: img.blogSlider,
        ratio: "4/3",
        handle: "Venus Foundation",
        caption: "Career circles reached 5 schools",
        url: LI,
      },
    ] satisfies WallCard[],
  },

  scrub: {
    frames: [
      { image: img.communities },
      { image: img.treePlantation },
      { image: img.foodDistribution },
      { image: img.mediaTop },
    ],
    texts: [
      "Every smile we share,",
      "every seed we plant,",
      "every meal we serve —",
      "is a story worth telling.",
    ],
  },

  gallery: {
    eyebrow: "Life at Venus Foundation",
    title: "Moments of care, small steps of kindness, everyday acts that connect us.",
    photos: [
      { src: img.foodDistribution, alt: "Food distribution drive" },
      { src: img.planting, alt: "Planting saplings" },
      { src: img.communities, alt: "Community gathering" },
      { src: img.bloodDonation, alt: "Blood donation camp" },
      { src: img.treePlantation, alt: "Plantation drive" },
      { src: img.mediaTop, alt: "Smiles that say it all" },
      { src: img.blogSlider, alt: "Spreading hope" },
      { src: img.topImg, alt: "Walking with communities" },
    ] satisfies ImageRef[],
  },

  follow: [
    { platform: "yt", label: "YouTube", url: YT, icon: "youtube" as const },
    { platform: "ig", label: "Instagram", url: IG, icon: "instagram" as const },
    { platform: "li", label: "LinkedIn", url: LI, icon: "linkedin" as const },
    { platform: "fb", label: "Facebook", url: FB, icon: "facebook" as const },
  ],

  cta: {
    image: { src: img.seedsCta, alt: "" },
    title: "Got a story worth sharing?",
    body: "Follow our journey on social media, or reach out to feature your collaboration with Venus Foundation.",
    actions: [
      { label: "Watch on YouTube", href: YT, variant: "gold" },
      { label: "Get in touch", to: "/contact", variant: "ghost", onDark: true },
    ] satisfies Cta[],
  },
} as const;
