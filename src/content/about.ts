import type { Cta, DidYouKnow, HeroPill, ImageRef } from "@/types/content";
import { img } from "./images";

export type AccentToken = "sky" | "red" | "gold" | "green";

export interface ValueCard {
  emoji: string;
  title: string;
  body: string;
  accent: AccentToken;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export const aboutContent = {
  hero: {
    image: { src: img.topImg, alt: "Venus Foundation community" },
    breadcrumb: "About Us",
    eyebrow: "Who we are",
    title: "Hope begins with equal access for all.",
    subtitle:
      "We are a non-profit organization working to build an inclusive India by ensuring access to nutritious food, clean water, healthcare, education and equal opportunities for all.",
    pills: [
      { value: "9", label: "seeds of change" },
      { value: "750+", label: "students reached" },
      { value: "2025", label: "established" },
    ] satisfies HeroPill[],
  },

  didYouKnow: {
    label: "💡 Did you know?",
    text: "Supporting a local business can generate twice the economic value in your city. Small ventures create massive ripples.",
  } satisfies DidYouKnow,

  vision: {
    eyebrow: "Our Vision",
    title: "An empowered, inclusive India where everyone can thrive.",
    body: "Build an empowered and inclusive India, where every individual has access to nutritious food, clean water, quality healthcare, education, equal opportunities, and the means to thrive — regardless of their background.",
    image: { src: img.aboutImg, alt: "Children learning" } satisfies ImageRef,
  },

  values: {
    eyebrow: "Our Values",
    title: "The seven roots that ground everything we do.",
    cards: [
      {
        emoji: "💎",
        title: "Authenticity",
        body: "We believe in being genuine, transparent and true to ourselves and those we serve.",
        accent: "sky",
      },
      {
        emoji: "💖",
        title: "Compassion",
        body: "We approach with empathy, embracing kindness as a powerful force.",
        accent: "red",
      },
      {
        emoji: "🤝",
        title: "Community",
        body: "Together we are stronger. We uplift one another and foster a spirit of belonging.",
        accent: "gold",
      },
      {
        emoji: "🌍",
        title: "Contribution",
        body: "We are driven by a desire to give back and leave the world better than we found it.",
        accent: "green",
      },
      {
        emoji: "🎯",
        title: "Determination",
        body: "Challenges don't stop us — they fuel our resolve. We tackle obstacles with resilience.",
        accent: "red",
      },
      {
        emoji: "🌸",
        title: "Meaningful Work",
        body: "We pursue purpose, striving to make every action count toward lasting, positive impact.",
        accent: "sky",
      },
      {
        emoji: "🛡️",
        title: "Responsibility",
        body: "We hold ourselves accountable. Lasting change starts with the courage to take ownership.",
        accent: "gold",
      },
    ] satisfies ValueCard[],
    mission: {
      title: "Our Mission",
      body: "Create meaningful impact through initiatives that uplift people, protect the planet, and inspire others to act.",
    },
  },

  chairperson: {
    eyebrow: "A word from our Chairperson",
    title: "Shaping a stronger tomorrow, together.",
    image: { src: img.ekta, alt: "Ekta S. Chaudhary" },
    quote:
      "I've always felt a deep desire to make a difference and to help people in ways that truly matter. Through my experiences, I've learned that even small actions, done with the right intention and heart, can ripple far beyond what we imagine. With Venus Foundation, we're bringing all of this together.",
    name: "Ekta S. Chaudhary",
    role: "Chairperson",
  },

  team: {
    eyebrow: "Our People",
    title: "A team united by compassion, building a better tomorrow.",
    members: [
      {
        name: "Ekta S. Chaudhary",
        role: "Chairperson",
        bio: "Leading initiatives that empower communities and foster sustainable development.",
        image: img.ekta,
      },
      {
        name: "Rakesh Thakur",
        role: "Relationship Manager",
        bio: "Giving back to society is a responsibility I hold close to my heart — transforming feeling into meaningful action.",
        image: img.rakesh,
      },
      {
        name: "Sonika",
        role: "Admin",
        bio: "Providing empathetic leadership and guiding initiatives that uplift lives.",
        image: img.sonika,
      },
      {
        name: "Gisha Chaudhary",
        role: "Trustee",
        bio: "Connecting with local organizations to amplify our impact and reach.",
        image: img.gisha,
      },
      {
        name: "Neha Kodan",
        role: "Compliance Officer",
        bio: "Ensuring our resources are allocated efficiently to maximize our philanthropic efforts.",
        image: img.neha,
      },
      {
        name: "Swarali D. Jadhav",
        role: "Executive Officer",
        bio: "Coordinates CSR activities, contributing to initiatives that create lasting value for communities.",
        image: img.swarali,
      },
    ] satisfies TeamMember[],
  },

  partners: {
    eyebrow: "Key Partnerships",
    title: "Committed to global welfare, together since 2025.",
    logos: [
      { src: img.partnerVenus, alt: "Venus" },
      { src: img.partnerReset, alt: "Reset" },
      { src: img.partnerSterloc, alt: "Sterloc" },
      { src: img.partnerIndia, alt: "India Sterlocked" },
    ] satisfies ImageRef[],
  },

  cta: {
    image: { src: img.seedsCta, alt: "" },
    title: "Partner with us to plant the next seed.",
    body: "Whether through volunteering, collaboration or offering your skills — we'd love to connect and grow change together.",
    actions: [
      { label: "Partner with us", href: "mailto:info@venusfoundation.in", variant: "gold" },
      { label: "Become a volunteer", to: "/contact", variant: "ghost", onDark: true },
    ] satisfies Cta[],
  },
} as const;
