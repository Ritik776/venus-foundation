import type { Cta, ImageRef, Stat } from "@/types/content";
import { img } from "./images";

export interface SparkCard {
  date: string;
  title: string;
  body: string;
  image: string;
}

const trust = {
  avatars: [img.ekta, img.rakesh, img.sonika],
} as const;

export const homeContent = {
  /* Full-bleed Careons-style slideshow hero */
  immersiveHero: {
    eyebrow: "Welcome to Venus Foundation",
    title: "Small acts,\nbig impact.",
    subtitle:
      "Venus Foundation is shaping brighter futures — nurturing growth through education, nourishment and care, one act of kindness at a time.",
    action: {
      label: "Explore our work",
      to: "/our-seeds",
      variant: "navy",
      arrow: true,
    } satisfies Cta,
    trust,
    slides: [
      { src: "/assets/img/hero-1.png", alt: "Children celebrating at a Venus Foundation school" },
      { src: "/assets/img/hero-2.png", alt: "Venus Foundation team welcomed by schoolchildren" },
      { src: "/assets/img/hero-3.png", alt: "Volunteers repainting a school classroom" },
    ] satisfies ImageRef[],
  },

  /* Preserved collage hero, now a section below the immersive hero */
  welcome: {
    eyebrow: "Welcome to Venus Foundation",
    title: "Small acts, big impact.",
    action: {
      label: "Explore our work",
      to: "/our-seeds",
      variant: "navy",
      arrow: true,
    } satisfies Cta,
    trust,
    collage: {
      images: [
        { src: img.communities, alt: "Children celebrating" },
        { src: img.foodDistribution, alt: "Food distribution drive" },
        { src: img.topImg, alt: "Community portrait" },
      ] satisfies ImageRef[],
      badgeNumber: "750+",
      badgeLabel: "students reached",
    },
  },

  /* Careon-style sticky split storytelling timeline */
  spark: {
    eyebrow: "How change grows",
    title: "From a single seed to a flourishing community.",
    sub: "Every transformation follows a journey — how a small act of care takes root and blooms into lasting impact.",
    cards: [
      {
        date: "April 2025",
        title: "The First Seed",
        body: "Venus Foundation was born with one belief: small acts of care can grow into lasting change.",
        image: img.planting,
      },
      {
        date: "May 2025",
        title: "A Place to Dream",
        body: "Our journey began by transforming a government school in Sec 19 Panchkula and creating our first BachpanShala from a forgotten classroom.",
        image: img.educationImg,
      },
      {
        date: "October 2025",
        title: "Care That Reaches",
        body: "Healthcare reached communities where access is limited, bringing care closer to those who need it most.",
        image: img.careAction,
      },
      {
        date: "November 2025",
        title: "Opening New Doors",
        body: "Launched Nayi Shuruaat and EduPath to empower women and guide students towards brighter futures.",
        image: img.freedomThrive,
      },
      {
        date: "January 2026",
        title: "Building Better Schools",
        body: "Launched the Clean & Safe School Initiative with a mission to ensure every student has access to clean toilets and safe drinking water.",
        image: img.waterLife,
      },
      {
        date: "January 2026",
        title: "Growing with Care",
        body: "Partnered with the District Administration, Hamirpur to improve care and opportunities for children in Child Care Institutions.",
        image: img.communities,
      },
      {
        date: "June 2026",
        title: "Investing in Potential",
        body: "Signed an MoU with PhysicsWallah to provide students with access to quality coaching and the support they deserve.",
        image: img.eduPath,
      },
    ] satisfies SparkCard[],
    endNote:
      "Every milestone strengthens our commitment to creating brighter futures for children, women, and communities.",
  },

  /* Merged impact stats + film panel */
  impact: {
    eyebrow: "Together, we're creating brighter futures",
    title: "Be a part of our journey & make an impact.",
    body: "Every number here is a life touched, a tree rooted, a future widened — and every story behind it is worth watching.",
    stats: [
      { value: 200, suffix: "+", label: "Trees planted" },
      { value: 2, label: "Toilets built in schools" },
      { value: 750, label: "Students reached" },
      { value: 20, label: "Women actively supported" },
    ] satisfies Stat[],
    video: {
      image: { src: img.blogSlider, alt: "Spreading hope" } satisfies ImageRef,
      chip: "Our Film",
      caption: "Seeds of Change — 2025",
      videoId: "hzO1_QvvUfw",
    },
  },

  /* Dual-row marquee gallery */
  happyWall: {
    eyebrow: "Happy Wall",
    title: "These smiles are the true measure of our work.",
    rows: [
      [
        { src: img.foodDistribution, alt: "Food distribution" },
        { src: img.treePlantation, alt: "Tree plantation" },
        { src: img.communities, alt: "Community" },
        { src: img.bloodDonation, alt: "Blood donation camp" },
        { src: img.blogSlider, alt: "Spreading hope" },
      ],
      [
        { src: img.topImg, alt: "Walking with communities" },
        { src: img.planting, alt: "Planting a seedling" },
        { src: img.mediaTop, alt: "Together for change" },
        { src: img.communities, alt: "Community gathering" },
        { src: img.foodDistribution, alt: "Meal drive" },
      ],
    ] satisfies ImageRef[][],
  },

  /* Rounded contained CTA card */
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
