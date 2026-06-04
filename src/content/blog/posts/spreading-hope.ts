import { img } from "@/content/images";
import { parveen } from "../authors";
import type { BlogPost } from "../types";

export const spreadingHope: BlogPost = {
  slug: "spreading-hope",
  title: "Spreading Hope in a World Full of Struggles: How We Help",
  excerpt:
    "Education, food security, health, gender equality and climate action — creating sustainable change with dignity.",
  subtitle:
    "Hope is not a slogan. It is a method — small, repeated, accountable acts across the causes that decide a life.",
  category: "impact",
  categoryLabel: "Impact",
  categoryTone: "gold",
  author: parveen,
  date: "2025-08-20",
  dateLabel: "August 20, 2025",
  updatedLabel: "Aug 20, 2025",
  readMinutes: 6,
  image: { src: img.blogSlider, alt: "Spreading hope" },
  body: [
    {
      type: "lead",
      id: "intro",
      tocLabel: "Hope as a method",
      text: "It is easy to feel that the world's problems are too vast to touch. We have found the opposite: that focused, consistent care across a few causes changes everything for the people in front of us.",
    },
    {
      type: "p",
      text: "From classrooms to kitchens, blood banks to plantation grounds, our work spans nine focus areas — but it is held together by one thread: the dignity of the person we are walking beside.",
    },
    {
      type: "h2",
      id: "causes",
      tocLabel: "Where we focus",
      text: "Many causes, one principle",
    },
    {
      type: "list",
      items: [
        "Education and mentorship that widen what feels possible.",
        "Food security that protects attention and health.",
        "Healthcare access where it is hardest to reach.",
        "Gender equality and climate action for a fairer, greener future.",
      ],
    },
    {
      type: "quote",
      text: "Small actions, done with heart, ripple far beyond what we imagine.",
    },
    {
      type: "takeaways",
      id: "takeaways",
      tocLabel: "Key takeaways",
      items: [
        "Focus beats scale when resources are limited.",
        "Dignity is the constant across every programme.",
        "Consistency is what turns help into hope.",
      ],
    },
  ],
};
