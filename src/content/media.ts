import type { Cta, ImageRef } from "@/types/content";
import { img } from "./images";

const YT = "https://www.youtube.com/@FoundationVenus";
const IG = "https://www.instagram.com/venus.foundation";
const FB = "https://www.facebook.com/foundationvenus/";
const LI = "https://www.linkedin.com/company/foundationvenus/";
const IG_HANDLE = "@venus.foundation";

export interface NfCard {
  image: string;
  title?: string;
  tags?: readonly string[];
  badge?: string;
  /** YouTube id/URL (incl. /shorts/ links), or "demo" for placeholder. */
  videoId: string;
  /** Vertical Short — plays in a portrait 9:16 frame. */
  short?: boolean;
}
export interface NfRow {
  id: string;
  title: string;
  explore?: boolean;
  top10?: boolean;
  /** Render vertical (9:16) cards for a Shorts rail. */
  shorts?: boolean;
  cards: readonly NfCard[];
}

export interface FootageVideo {
  poster: string;
  src: string;
  chip: string;
  title: string;
  body: string;
  tag: string;
}

export interface IgPost {
  image: string;
  type: "photo" | "reel";
  likes: number;
  comments: number;
  caption: string;
  url: string;
}

export interface FbPost {
  image: string;
  caption: string;
  when: string;
  fbVideo?: boolean;
  url: string;
}

export interface LiPost {
  text: string;
  bold: string;
  rest: string;
  tags: string;
  image: string;
  reactions: readonly ("like" | "clap" | "heart")[];
  count: number;
  time: string;
  url: string;
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

  netflix: {
    badge: "Venus Originals",
    title: "Browse our world of stories.",
    subscribeUrl: YT,
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

  instagram: {
    handle: IG_HANDLE,
    name: "Moments from our feed",
    profileUrl: IG,
    posts: [
      {
        image: img.foodDistribution,
        type: "photo",
        likes: 482,
        comments: 36,
        caption: "Warm meals, warmer hearts. Today's drive reached 120 children 🧡",
        url: "demo",
      },
      {
        image: img.treePlantation,
        type: "reel",
        likes: 763,
        comments: 58,
        caption: "Reel: 200 saplings, one green morning 🌱",
        url: "demo",
      },
      {
        image: img.bloodDonation,
        type: "photo",
        likes: 391,
        comments: 24,
        caption: "Every drop counts. Thank you to our 60+ donors today.",
        url: "demo",
      },
      {
        image: img.communities,
        type: "photo",
        likes: 528,
        comments: 41,
        caption: "Listening before leading — community first, always.",
        url: "demo",
      },
    ] satisfies IgPost[],
  },

  facebook: {
    title: "Photos & moments from our page.",
    pageUrl: FB,
    posts: [
      {
        image: img.foodDistribution,
        caption: "Meal drive — watch the highlights",
        when: "Video · 2 weeks ago",
        fbVideo: true,
        url: "demo",
      },
      {
        image: img.communities,
        caption: "Walking with communities, together",
        when: "Photo · 3 weeks ago",
        url: "demo",
      },
      {
        image: img.treePlantation,
        caption: "200 saplings planted this season",
        when: "Photo · 1 month ago",
        url: "demo",
      },
    ] satisfies FbPost[],
  },

  linkedin: {
    title: "Updates for our partners & supporters.",
    pageUrl: LI,
    posts: [
      {
        text: "Proud to share that our plantation drive crossed ",
        bold: "200 trees",
        rest: " this season. ",
        tags: "#SustainableFuture #CSR",
        image: img.treePlantation,
        reactions: ["like", "clap", "heart"],
        count: 128,
        time: "2w",
        url: LI,
      },
      {
        text: "Our blood donation camp with PGI Chandigarh welcomed ",
        bold: "60+ donors",
        rest: ". Gratitude to every volunteer. ",
        tags: "#CommunityHealth",
        image: img.bloodDonation,
        reactions: ["like", "heart"],
        count: 94,
        time: "1mo",
        url: LI,
      },
      {
        text: "From dreams to direction — our career-guidance circles reached ",
        bold: "5 schools",
        rest: " this term. ",
        tags: "#Education #YouthEmpowerment",
        image: img.communities,
        reactions: ["like", "clap"],
        count: 156,
        time: "1mo",
        url: LI,
      },
    ] satisfies LiPost[],
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
        handle: IG_HANDLE,
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
        handle: IG_HANDLE,
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
        handle: IG_HANDLE,
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
