import type { ChipTone } from "@/components/primitives/Chip";
import type { Cta, DidYouKnow, HeroPill } from "@/types/content";
import { img } from "./images";

export interface Program {
  no: string;
  sdg: string;
  tone: ChipTone;
  title: string;
  body: string;
  thumb: string;
}

export interface SeedCard {
  no: string;
  title: string;
  body: string;
  image: string;
}

export const seedsContent = {
  hero: {
    image: { src: img.seedsTop, alt: "Our seeds" },
    breadcrumb: "Our Seeds",
    eyebrow: "Seeds of change",
    title: "Together, we uplift communities & ignite transformation.",
    subtitle:
      "Nine focus areas. One belief — that targeted initiatives can transform entire ecosystems, and every project has the potential to leave a lasting mark.",
    pills: [
      { value: "200+", label: "trees planted" },
      { value: "2", label: "school toilets built" },
      { value: "20", label: "women supported" },
    ] satisfies HeroPill[],
  },

  didYouKnow: {
    label: "💡 Did you know?",
    text: "Targeted initiatives can transform entire ecosystems. Every project has the potential to leave a lasting mark.",
  } satisfies DidYouKnow,

  intro: {
    eyebrow: "Our journey so far",
    title: "A glimpse into our previous & ongoing endeavours.",
  },

  programs: [
    {
      no: "01",
      sdg: "SDG 1",
      tone: "green",
      title: "Eradicating Poverty",
      body: "Creating pathways out of poverty for sustainable futures.",
      thumb: img.liftingLives,
    },
    {
      no: "02",
      sdg: "SDG 2",
      tone: "red",
      title: "Zero Hunger",
      body: "Fresh meals for children in need, so no one is left behind.",
      thumb: img.foodDistribution,
    },
    {
      no: "03",
      sdg: "SDG 5",
      tone: "gold",
      title: "Gender Equality",
      body: "Ensuring equal rights and opportunities for everyone.",
      thumb: img.freedomThrive,
    },
    {
      no: "04",
      sdg: "SDG 13",
      tone: "sky",
      title: "Climate Care",
      body: "Taking action today for a sustainable planet.",
      thumb: img.climateChampions,
    },
    {
      no: "05",
      sdg: "SDG 4",
      tone: "green",
      title: "Quality Education",
      body: "Fostering learning opportunities for every child.",
      thumb: img.educationImg,
    },
    {
      no: "06",
      sdg: "SDG 3",
      tone: "red",
      title: "Good Health & Well-being",
      body: "Delivering healthcare solutions where they're needed most.",
      thumb: img.careAction,
    },
    {
      no: "07",
      sdg: "SDG 6",
      tone: "sky",
      title: "Clean Water & Sanitation",
      body: "Providing clean and safe water for healthy communities.",
      thumb: img.waterLife,
    },
    {
      no: "08",
      sdg: "SDG 15",
      tone: "green",
      title: "Life on Land",
      body: "Restoring green cover through plantation drives.",
      thumb: img.treePlantation,
    },
    {
      no: "09",
      sdg: "SDG 17",
      tone: "gold",
      title: "Meaningful Partnerships",
      body: "Stronger together — building connections for impactful change.",
      thumb: img.strongerTogether,
    },
  ] satisfies Program[],

  cta: {
    image: { src: img.seedsCta, alt: "" },
    title: "Explore the impact of our initiatives.",
    body: "Join us in making a difference by exploring our projects and finding ways to contribute.",
    actions: [
      { label: "Become a volunteer", to: "/contact", variant: "gold" },
      {
        label: "Partner with us",
        href: "mailto:info@venusfoundation.in",
        variant: "ghost",
        onDark: true,
      },
    ] satisfies Cta[],
  },
} as const;

/** Curated six-card rail shown on the homepage. */
export const seedPreview = {
  eyebrow: "Our Seeds",
  title: "Nine seeds we're growing across India.",
  cta: { label: "See all initiatives", to: "/our-seeds", variant: "gold" } satisfies Cta,
  cards: [
    {
      no: "01",
      title: "Eradicating Poverty",
      body: "Creating pathways out of poverty for sustainable futures.",
      image: img.liftingLives,
    },
    {
      no: "02",
      title: "Gender Equality",
      body: "Ensuring equal rights and opportunities for everyone.",
      image: img.freedomThrive,
    },
    {
      no: "03",
      title: "Climate Care",
      body: "Taking action today for a sustainable planet.",
      image: img.climateChampions,
    },
    {
      no: "04",
      title: "Quality Education",
      body: "Fostering learning opportunities for every child.",
      image: img.educationImg,
    },
    {
      no: "05",
      title: "Health & Wellbeing",
      body: "Delivering healthcare where it's needed most.",
      image: img.careAction,
    },
    {
      no: "06",
      title: "Clean Water",
      body: "Safe water for healthy communities.",
      image: img.waterLife,
    },
  ] satisfies SeedCard[],
} as const;
