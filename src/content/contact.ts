import type { IconName } from "@/components/primitives/Icon";
import { site } from "./site";

export interface InfoCard {
  icon: IconName;
  iconTone: "green" | "red" | "gold" | "sky";
  title: string;
  lines: string[];
  link?: { label: string; href: string; arrow?: boolean };
}

export interface Faq {
  question: string;
  answer: string;
}

export const contactContent = {
  hero: {
    breadcrumb: "Contact",
    eyebrow: "Let's connect",
    title: "Reach out to us.",
  },

  info: [
    {
      icon: "location",
      iconTone: "green",
      title: "Office",
      lines: [site.contact.address],
      link: { label: "Get directions", href: site.contact.mapsLink, arrow: true },
    },
    {
      icon: "mail",
      iconTone: "red",
      title: "Email",
      lines: [],
      link: { label: site.contact.email, href: `mailto:${site.contact.email}` },
    },
    {
      icon: "phone",
      iconTone: "gold",
      title: "Phone",
      lines: ["Call us anytime!"],
      link: { label: site.contact.phone, href: `tel:${site.contact.phone}` },
    },
    {
      icon: "clock",
      iconTone: "sky",
      title: "Hours",
      lines: [site.contact.hours],
    },
  ] satisfies InfoCard[],

  form: {
    title: "Send us a message",
    intro: "We'd love to hear how you'd like to grow change with us.",
    intents: [
      "Volunteer with Venus Foundation",
      "Make a donation",
      "Partner / collaborate",
      "Something else",
    ],
    note: "By submitting you agree to be contacted by Venus Foundation.",
    success: {
      title: "Thank you! 🌱",
      body: "Your message has been planted. We'll be in touch within two working days.",
    },
  },

  faq: {
    eyebrow: "FAQs",
    title: "Answers to your most common questions.",
    items: [
      {
        question: "What is Venus Foundation?",
        answer:
          "Venus Foundation is a CSR initiative by Venus Remedies, committed to giving back to society. We focus on creating meaningful impact across the environment, children's welfare, education, hunger, women's empowerment and equality.",
      },
      {
        question: "How can I become a part of the Venus Foundation?",
        answer:
          "There are many ways to join hands with us. Reach out or write to us, sharing how you'd like to contribute — through volunteering, collaboration, or offering your skills. We'll connect with you and guide you through the next steps.",
      },
      {
        question: "Where does the Venus Foundation operate?",
        answer:
          "Our headquarters is in Panchkula, Haryana. We also run various project sites across different regions, collaborating with local partners to address real needs on the ground.",
      },
      {
        question: "How can I support or contribute to your work?",
        answer:
          "Our initiatives focus on underserved communities across India. You can support us by volunteering, donating, partnering, or amplifying our stories. Every act of kindness helps plant the next seed of change.",
      },
      {
        question: "What causes does the Venus Foundation focus on?",
        answer:
          "We plant the seeds of change through nine core focus areas: Poverty, Hunger, Climate Care, Life on Land, Gender Equality, Education, Health & Wellness, Clean Water, and Partnerships — each reflecting our vision for a kinder, more equal world.",
      },
    ] satisfies Faq[],
  },

  closing: {
    eyebrow: "Have more questions?",
    title: "Let's grow change together.",
    body: "We'd love to hear from you — whether you want to volunteer, donate or partner with us.",
  },
} as const;
