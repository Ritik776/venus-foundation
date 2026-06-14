import type { Cta, DidYouKnow, HeroPill, ImageRef } from "@/types/content";
import { img } from "./images";

/** One ordered copy block within a feature — a normal paragraph or a pull quote. */
export interface FeatureBlock {
  text: string;
  pull?: boolean;
}

export interface EduStep {
  badge: string;
  label: string;
  icon: string;
  title: string;
  paragraphs: string[];
}

export interface Feature {
  id: string;
  no: string;
  kicker: string;
  title: string;
  lead: string;
  /** Body copy after the lead, in order (paragraphs + optional pull quote). */
  blocks?: FeatureBlock[];
  tags?: string[];
  image: ImageRef;
  stat?: { value: string; label: string };
  /** Image sits on the left, copy on the right. */
  reversed?: boolean;
  /** Text-heavy treatment: sticky art + flowing copy. */
  story?: boolean;
  /** cream-2 alternating background. */
  alt?: boolean;
  /** Medallion accent colour. */
  accent: "navy" | "brown" | "sky" | "green";
  eduSteps?: EduStep[];
}

export interface SeedCard {
  no: string;
  title: string;
  body: string;
  image: string;
}

export const seedsContent = {
  hero: {
    image: { src: img.seedsTop, alt: "Our work" },
    breadcrumb: "Our Seeds",
    eyebrow: "Our Seeds",
    title: "The seeds we're growing.",
    subtitle:
      "Each initiative is a seed — planted with intention, nurtured with care, and grown alongside the communities we serve.",
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

  features: [
    {
      id: "clean-safe-school",
      no: "01",
      kicker: "Sanitation & Dignity",
      title: "Clean & Safe School Initiative",
      lead: "What began with the transformation of a single government school has grown into a larger mission — that every child has access to the basic facilities they need to learn, grow, and thrive.",
      blocks: [
        {
          text: "For many children, going to school means overcoming challenges far beyond the classroom. A lack of clean toilets and safe drinking water turns attending school into a daily struggle.",
        },
        {
          text: "No child should have to choose between their education and their basic needs.",
          pull: true,
        },
        {
          text: "So we improve sanitation, promote access to safe drinking water, and encourage better hygiene — removing the everyday obstacles that hold children back.",
        },
      ],
      tags: ["Started with 1 school", "Clean toilets & safe water", "Better hygiene"],
      image: { src: img.waterLife, alt: "Clean water and sanitation" },
      stat: { value: "1", label: "school transformed" },
      story: true,
      alt: true,
      accent: "navy",
    },
    {
      id: "edupath",
      no: "02",
      kicker: "Learning & Guidance",
      title: "EduPath",
      lead: "What started as a simple conversation about choosing the right stream has evolved into a journey of guiding students through some of life's most important decisions.",
      blocks: [
        {
          text: "From a child's first joyful steps in learning to a young adult's leap into higher education, EduPath walks beside students at every stage — in partnership with Physics Wallah, so a student's future is shaped by their potential, not their circumstances.",
        },
      ],
      image: { src: img.eduPath, alt: "EduPath guidance session" },
      stat: { value: "3", label: "programmes, every age" },
      reversed: true,
      accent: "brown",
      eduSteps: [
        {
          badge: "A",
          label: "Little Steps",
          icon: "🧸",
          title: "EduPath — Little Steps",
          paragraphs: [
            "A joyful learning initiative for children in Anganwadis, Balwadis and primary schools. Through play-based activities, stories and interactive sessions, children are introduced to concepts and experiences that go beyond classroom learning.",
            "Led by members of the Nayi Shuruaat team, the programme supports the holistic development of young learners in a fun, nurturing environment. Every day, these bright young minds surprise us with their curiosity, creativity and kindness.",
          ],
        },
        {
          badge: "B",
          label: "Disha",
          icon: "🧭",
          title: "EduPath — Disha",
          paragraphs: [
            "For many students, choosing a stream after Class 10 is one of the first major decisions about their future — yet many are unaware of the academic, vocational and skill-based pathways open to them, often relying on limited information.",
            "Designed for Classes 9 and 10, Disha introduces young minds to the diverse opportunities ahead — academic streams, vocational education, skill development and emerging careers. With Physics Wallah, we make quality guidance accessible to all.",
          ],
        },
        {
          badge: "C",
          label: "Beyond Streams",
          icon: "🚀",
          title: "EduPath — Beyond Streams",
          paragraphs: [
            "For students after Class 12, the transition to higher education can feel overwhelming — often made with limited information about the courses, universities and careers available.",
            "Beyond Streams bridges that gap through interactive sessions, university visits, expert interactions and real-world exposure, giving students the knowledge and confidence to make informed decisions. In partnership with Physics Wallah.",
          ],
        },
      ],
    },
    {
      id: "pehli-udaan",
      no: "03",
      kicker: "First Flight",
      title: "Pehli Udaan",
      lead: "Pehli Udaan began with a simple yet powerful observation. During our work at a government school, we discovered that what was once a Bachpanshala had become a locked, neglected room filled with broken furniture and junk — a space meant for young children to learn and grow, left behind.",
      blocks: [
        {
          text: "At Venus Foundation, we chose to reimagine it — transforming the space into a vibrant, child-friendly environment where little ones could learn, play and feel at home.",
        },
        { text: "The joy it brought the children inspired a larger mission.", pull: true },
        {
          text: "Through Pehli Udaan, we are reviving Anganwadis into colourful, safe and engaging spaces that nurture curiosity and creativity — improving infrastructure and creating interactive learning environments so every child gets a positive start to their educational journey.",
        },
      ],
      tags: ["Reviving Anganwadis", "Child-friendly spaces"],
      image: { src: img.educationImg, alt: "A revived Bachpanshala learning space" },
      story: true,
      accent: "sky",
    },
    {
      id: "health",
      no: "04",
      kicker: "Care & Camps",
      title: "Good Health & Well-being",
      lead: "Good health is the foundation of a happy, productive life — yet millions across India, especially in rural and underserved areas, still lack access to essential healthcare.",
      blocks: [
        {
          text: "Access to healthcare isn't just about hospitals and doctors. For us, it's about reaching people where they live, understanding their unique challenges, and empowering them to stay healthy.",
        },
      ],
      image: { src: img.careAction, alt: "Health camp" },
      stat: { value: "6 mo", label: "return visits" },
      story: true,
      reversed: true,
      accent: "green",
      eduSteps: [
        {
          badge: "+",
          label: "Medical Camps",
          icon: "🩺",
          title: "Medical Camps",
          paragraphs: [
            "We focus on practical, long-lasting healthcare solutions that meet the needs of local communities — taking doctors, nurses and medicines directly to remote villages where care is hard to reach.",
            "Our regular camps offer free consultations, ECGs, eye and dental care, ENT and urology screenings, pulmonary and BMD tests, maternal health services, vaccinations, and early disease detection. By returning to the same communities every six months, we build lasting relationships and ensure continuity of care.",
          ],
        },
        {
          badge: "♀",
          label: "Her Health",
          icon: "🌸",
          title: "Her Health",
          paragraphs: [
            "Her Health ensures every girl and woman can manage her health with confidence, dignity and the right resources. Through school-based awareness programmes we work with adolescent girls to break menstrual myths, promote healthy hygiene, and create safe spaces for open conversations — while improving access to girl-friendly sanitation so schools become places girls can learn without barriers.",
            "In many rural communities, particularly in Himachal Pradesh, a lack of organised waste management leaves women with unsafe disposal options. Through Her Health we are installing accessible sanitary waste incinerators across villages — a safe, hygienic and environmentally responsible solution for menstrual waste.",
          ],
        },
      ],
    },
    {
      id: "nayi-shuruaat",
      no: "05",
      kicker: "New Beginnings",
      title: "Nayi Shuruaat",
      lead: "New beginnings for women — skills, support and confidence that turn dependence into livelihood, and livelihood into leadership.",
      tags: ["20 women supported", "Skill & livelihood support"],
      image: { src: img.freedomThrive, alt: "Women empowerment" },
      stat: { value: "20", label: "women supported" },
      alt: true,
      accent: "green",
    },
  ] satisfies Feature[],

  cta: {
    image: { src: img.seedsCta, alt: "" },
    title: "Walk with us on the ground.",
    body: "Join a drive, mentor a student, or bring your organisation's CSR to life through a partnership that lasts.",
    actions: [
      { label: "Get involved", to: "/contact", variant: "gold" },
      {
        label: "Partner with us",
        href: "mailto:info@venusfoundation.in",
        variant: "ghost",
        onDark: true,
      },
    ] satisfies Cta[],
  },
} as const;

/** Curated six-card rail (kept for any future homepage rail). */
export const seedPreview = {
  eyebrow: "Our Seeds",
  title: "The seeds we're growing across India.",
  cta: { label: "See all initiatives", to: "/our-seeds", variant: "gold" } satisfies Cta,
  cards: [
    {
      no: "01",
      title: "Clean & Safe Schools",
      body: "Clean toilets and safe drinking water so no child has to choose between education and basic needs.",
      image: img.waterLife,
    },
    {
      no: "02",
      title: "EduPath",
      body: "Guidance at every stage, from first steps to higher education — with Physics Wallah.",
      image: img.eduPath,
    },
    {
      no: "03",
      title: "Pehli Udaan",
      body: "Reviving Anganwadis into colourful, child-friendly spaces.",
      image: img.educationImg,
    },
    {
      no: "04",
      title: "Health & Well-being",
      body: "Medical camps and Her Health, reaching people where they live.",
      image: img.careAction,
    },
    {
      no: "05",
      title: "Nayi Shuruaat",
      body: "New beginnings for women — skills, support and confidence.",
      image: img.freedomThrive,
    },
  ] satisfies SeedCard[],
} as const;
