import { img } from "@/content/images";
import { parveen } from "../authors";
import type { BlogPost } from "../types";

export const buildingTomorrowsShade: BlogPost = {
  slug: "building-tomorrows-shade",
  title: "Building Tomorrow's Shade With Our Plantation Drives",
  excerpt:
    "Combating climate change through plantation drives that restore green cover and protect communities.",
  subtitle:
    "The best time to plant a tree was twenty years ago. The second best time is the next drive we run together.",
  category: "climate",
  categoryLabel: "Climate",
  categoryTone: "sky",
  author: parveen,
  date: "2025-11-07",
  dateLabel: "November 7, 2025",
  updatedLabel: "Nov 7, 2025",
  readMinutes: 4,
  image: { src: img.treePlantation, alt: "Tree plantation drive" },
  body: [
    {
      type: "lead",
      id: "intro",
      tocLabel: "Roots for the future",
      text: "Every sapling we plant is a promise to a generation we may never meet — cleaner air, cooler streets and a little more shade for someone's afternoon.",
    },
    {
      type: "p",
      text: "Our plantation drives bring together students, volunteers and local residents to restore green cover where it has thinned, choosing native species that thrive long after the cameras leave.",
    },
    {
      type: "stat",
      value: 200,
      suffix: "+",
      label: "trees planted and nurtured across our drives",
    },
    {
      type: "h2",
      id: "beyond",
      tocLabel: "Beyond planting day",
      text: "The work after the photo",
    },
    {
      type: "p",
      text: "Planting is the easy part. We pair each drive with care plans and community guardianship so saplings survive their first fragile years and grow into real canopy.",
    },
    {
      type: "takeaways",
      id: "takeaways",
      tocLabel: "Key takeaways",
      items: [
        "Native species outlast quick-win greenery.",
        "Survival depends on care, not just planting.",
        "Local guardianship keeps every tree accountable to someone.",
      ],
    },
  ],
};
