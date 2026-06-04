import type { ChipTone } from "@/components/primitives/Chip";
import type { IconName } from "@/components/primitives/Icon";
import type { Cta, DidYouKnow, HeroPill, ImageRef, RichLine, Stat } from "@/types/content";
import { img } from "./images";

export interface JourneyChapter {
  no: string;
  tag: string;
  tone: ChipTone;
  title: string;
  body: string;
  image: ImageRef;
  reversed?: boolean;
}

export interface Voice {
  quote: string;
  name: string;
  role: string;
  image: string;
  accent?: boolean;
}

export interface InvolveCard {
  no: string;
  icon: IconName;
  title: string;
  body: string;
  cta: Cta;
  image: string;
}

export interface HappyImage extends ImageRef {
  span?: "tall" | "wide";
}

export const homeContent = {
  immersiveHero: {
    eyebrow: "NGO · Panchkula, India · Since 2025",
    title: "Planting Seeds of Change",
    subtitle:
      "We nurture growth through education, nourishment and care — turning small acts of kindness into brighter futures for communities across India.",
    actions: [
      { label: "Get involved", to: "/contact", variant: "primary", arrow: true },
      { label: "Explore our work", to: "/our-seeds", variant: "ghost", onDark: true },
    ] satisfies Cta[],
    pills: [
      { value: "200+", label: "trees planted" },
      { value: "750+", label: "students reached" },
      { value: "20", label: "women supported" },
    ] satisfies HeroPill[],
    slides: [
      { src: img.foodDistribution, alt: "Food distribution drive" },
      { src: img.treePlantation, alt: "Tree plantation drive" },
      { src: img.communities, alt: "Community gathering" },
    ] satisfies ImageRef[],
  },

  welcome: {
    eyebrow: "Welcome to Venus Foundation",
    title: "Small acts, big impact.",
    actions: [
      { label: "Explore our work", to: "/our-seeds", variant: "navy", arrow: true },
      { label: "Become a volunteer", to: "/contact", variant: "ghost" },
    ] satisfies Cta[],
    trust: {
      avatars: [img.ekta, img.rakesh, img.sonika],
      text: "750+ students & 20 women supported across Haryana",
    },
    collage: {
      images: [
        { src: img.planting, alt: "Hands planting a seedling" },
        { src: img.foodDistribution, alt: "Food distribution drive" },
        { src: img.topImg, alt: "Community portrait" },
      ] satisfies ImageRef[],
      badgeNumber: "750+",
      badgeLabel: "students reached",
    },
  },

  marquee: [
    "Education",
    "Nourishment",
    "Clean Water",
    "Health & Wellbeing",
    "Gender Equality",
    "Climate Care",
  ],

  didYouKnow: {
    label: "💡 Did you know?",
    text: "Small actions can spark global change. What starts in your community can transform lives, economies and ecosystems far beyond your reach.",
  } satisfies DidYouKnow,

  journey: {
    eyebrow: "How change grows",
    title: "From a single seed to a flourishing community.",
    body: "Every transformation follows a journey. Here's how a small act of care takes root and blooms into lasting impact.",
    chapters: [
      {
        no: "01",
        tag: "Plant",
        tone: "green",
        title: "We plant the first seed.",
        body: "It starts small — a meal shared, a classroom opened, a sapling pressed into the soil. Each act is an intention to nurture something greater.",
        image: { src: img.planting, alt: "Planting a seed" },
      },
      {
        no: "02",
        tag: "Nourish",
        tone: "red",
        title: "We nourish what we start.",
        body: "Growth needs care. Nutritious food, clean water, healthcare and mentorship keep our seeds strong through every season of need.",
        image: { src: img.foodDistribution, alt: "Nourishing communities" },
        reversed: true,
      },
      {
        no: "03",
        tag: "Grow",
        tone: "gold",
        title: "Communities grow together.",
        body: "One supported family lifts another. Knowledge spreads, confidence builds, and entire neighbourhoods begin to thrive — together.",
        image: { src: img.communities, alt: "Communities growing together" },
      },
      {
        no: "04",
        tag: "Bloom",
        tone: "sky",
        title: "And the change blooms.",
        body: "What began as one quiet act becomes a forest of opportunity — brighter futures rooted in dignity, hope and lasting impact.",
        image: { src: img.treePlantation, alt: "A flourishing future" },
        reversed: true,
      },
    ] satisfies JourneyChapter[],
  },

  stats: {
    title: "Be a part of our journey & make an impact.",
    body: "Every number here is a life touched, a tree rooted, a future widened. This is only the beginning.",
    items: [
      { value: 200, suffix: "+", label: "Trees planted", tone: "text-green" },
      { value: 2, label: "Toilets built in schools", tone: "text-gold" },
      { value: 750, label: "Students reached", tone: "text-sky" },
      { value: 20, label: "Women actively supported", tone: "text-red" },
    ] satisfies Stat[],
  },

  video: {
    eyebrow: "Together, we're creating brighter futures",
    title: "Every moment tells a story. Watch how change happens.",
    image: { src: img.blogSlider, alt: "Spreading hope" },
    chip: "Our Film",
    caption: "Seeds of Change — 2025",
    videoId: "demo",
  },

  principles: {
    head: {
      eyebrow: "Our principles",
      title: "The promises we keep — and the lines we won't cross.",
      body: "Integrity shapes every decision we make. Here's what guides us, and what we will never compromise on.",
    },
    stand: {
      heading: "What we stand for",
      items: [
        [
          { text: "Create sustainable impact", bold: true },
          { text: " through long-term programs in health, education and empowerment." },
        ],
        [
          { text: "Believe in " },
          { text: "empowering with dignity", bold: true },
          { text: ", supporting without creating dependence." },
        ],
        [
          { text: "Ensure " },
          { text: "transparency in every step", bold: true },
          { text: " with honest, accountable actions." },
        ],
        [
          { text: "We value " },
          { text: "compassionate collaboration", bold: true },
          { text: " with local change makers for real impact." },
        ],
      ] satisfies RichLine[],
    },
    refuse: {
      heading: "What we refuse",
      items: [
        [
          { text: "Using aid for self-gain", bold: true },
          { text: " — we never treat social work as a tool for publicity." },
        ],
        [
          { text: "Discrimination in any form", bold: true },
          { text: " — we include all, regardless of background." },
        ],
        [
          { text: "Cutting ethical corners", bold: true },
          { text: " — integrity always comes first." },
        ],
        [
          { text: "We refuse " },
          { text: "silencing community voices", bold: true },
          { text: " and always listen before acting." },
        ],
      ] satisfies RichLine[],
    },
  },

  happyWall: {
    eyebrow: "Happy Wall",
    title: "These smiles are the true measure of our work.",
    images: [
      { src: img.foodDistribution, alt: "Food distribution", span: "tall" },
      { src: img.treePlantation, alt: "Tree plantation" },
      { src: img.communities, alt: "Community" },
      { src: img.bloodDonation, alt: "Blood donation camp", span: "tall" },
      { src: img.blogSlider, alt: "Spreading hope", span: "wide" },
    ] satisfies HappyImage[],
  },

  voices: {
    eyebrow: "Voices of change",
    title: "The people behind every seed we plant.",
    items: [
      {
        quote:
          "Giving back to society is a responsibility I hold close to my heart. With Venus Foundation, that feeling finally became meaningful action.",
        name: "Rakesh Thakur",
        role: "Relationship Manager",
        image: img.rakesh,
      },
      {
        quote:
          "Even small actions, done with the right intention and heart, can ripple far beyond what we imagine. That belief is the heart of everything we do.",
        name: "Ekta S. Chaudhary",
        role: "Chairperson",
        image: img.ekta,
        accent: true,
      },
      {
        quote:
          "We listen before we lead. Walking with communities — not ahead of them — is how real, lasting change takes root.",
        name: "Sonika",
        role: "Admin",
        image: img.sonika,
      },
    ] satisfies Voice[],
  },

  involve: {
    eyebrow: "Get involved",
    title: "Three simple ways to grow change with us.",
    cards: [
      {
        no: "01",
        icon: "share",
        title: "Spread the Word",
        body: "Share our stories and amplify our mission — your voice helps a seed reach further.",
        cta: { label: "Follow & share", to: "/media" },
        image: img.foodDistribution,
      },
      {
        no: "02",
        icon: "users",
        title: "Volunteer",
        body: "Give your time and skills on the ground — at drives, classrooms and camps.",
        cta: { label: "Join the team", to: "/contact" },
        image: img.communities,
      },
      {
        no: "03",
        icon: "partner",
        title: "Partner",
        body: "Bring your organisation's CSR to life through a collaboration that lasts.",
        cta: { label: "Partner with us", to: "/contact" },
        image: img.treePlantation,
      },
    ] satisfies InvolveCard[],
  },

  cta: {
    title: "Walk with us.",
    body: "Come along on a journey rooted in kindness, hope and lasting impact. Your time, voice or skills plant the next seed of change.",
    actions: [
      { label: "Volunteer with us", to: "/contact", variant: "gold", arrow: true },
      {
        label: "Partner with us",
        href: "mailto:info@venusfoundation.in",
        variant: "ghost",
        onDark: true,
      },
    ] satisfies Cta[],
  },
} as const;
