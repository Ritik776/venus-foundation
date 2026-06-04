import type { Cta, ImageRef } from "@/types/content";
import { img } from "./images";

export interface VideoStory {
  image: string;
  meta: string;
  title: string;
  videoId: string;
}

export interface ScrubFrame {
  image?: string;
  /** Dim overlay-only frame (no image). */
  veil?: boolean;
}

export const mediaContent = {
  hero: {
    image: { src: img.mediaTop, alt: "Life at Venus Foundation" },
    breadcrumb: "Media",
    eyebrow: "Our film · 2025",
    words: [
      { text: "Empower.", tone: "" },
      { text: "Elevate.", tone: "" },
      { text: "Evolve.", tone: "" },
    ],
    subtitle:
      "Visual stories travel faster than words — a single film can spark awareness worldwide. Watch how change happens, heart to heart.",
    videoId: "demo",
  },

  stories: {
    eyebrow: "Video stories",
    title: "Short films from the ground, in your hand.",
    items: [
      {
        image: img.treePlantation,
        meta: "Climate · 0:48",
        title: "Planting Tomorrow's Shade",
        videoId: "demo",
      },
      {
        image: img.foodDistribution,
        meta: "Hunger · 1:12",
        title: "Meals That Mean More",
        videoId: "demo",
      },
      {
        image: img.bloodDonation,
        meta: "Health · 0:55",
        title: "Hope, One Donor at a Time",
        videoId: "demo",
      },
      {
        image: img.communities,
        meta: "Community · 1:30",
        title: "Listening Before Leading",
        videoId: "demo",
      },
      {
        image: img.planting,
        meta: "Education · 0:40",
        title: "Seeds of a Classroom",
        videoId: "demo",
      },
    ] satisfies VideoStory[],
  },

  scrub: {
    frames: [
      { image: img.communities },
      { image: img.treePlantation },
      { image: img.foodDistribution },
      { image: img.mediaTop },
    ] satisfies ScrubFrame[],
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

  cta: {
    image: { src: img.seedsCta, alt: "" },
    title: "Got a story worth sharing?",
    body: "Follow our journey on social media, or reach out to feature your collaboration with Venus Foundation.",
    actions: [
      {
        label: "Watch on YouTube",
        href: "https://www.youtube.com/@FoundationVenus",
        variant: "gold",
      },
      { label: "Get in touch", to: "/contact", variant: "ghost", onDark: true },
    ] satisfies Cta[],
  },
} as const;
