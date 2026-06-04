import { img } from "@/content/images";
import { parveen } from "../authors";
import type { BlogPost } from "../types";

export const walkingWithCommunities: BlogPost = {
  slug: "walking-with-communities",
  title: "Walking with Communities: Listening Before Leading",
  excerpt:
    "We co-create solutions in schools, public spaces and healthcare — ensuring sustainable change through trust.",
  subtitle:
    "Sustainable change is never delivered to a community. It is grown with one, at the pace of trust.",
  category: "community",
  categoryLabel: "Community",
  categoryTone: "green",
  author: parveen,
  date: "2025-11-07",
  dateLabel: "November 7, 2025",
  updatedLabel: "Nov 7, 2025",
  readMinutes: 5,
  image: { src: img.communities, alt: "Community gathering" },
  body: [
    {
      type: "lead",
      id: "intro",
      tocLabel: "Listening first",
      text: "Before we plant a single programme, we sit and listen. The people closest to a problem almost always hold the seeds of its solution.",
    },
    {
      type: "p",
      text: "Our approach is deliberately slow at the start — community conversations, local partnerships and shared decision-making — so that what we build together actually lasts long after a project ends.",
    },
    {
      type: "h2",
      id: "trust",
      tocLabel: "Building on trust",
      text: "Change at the pace of trust",
    },
    {
      type: "p",
      text: "When people help shape a solution, they protect it. That sense of ownership is what turns a one-off intervention into a self-sustaining habit of care.",
    },
    {
      type: "quote",
      text: "Walk with communities — not ahead of them.",
    },
    {
      type: "takeaways",
      id: "takeaways",
      tocLabel: "Key takeaways",
      items: [
        "Communities are partners, not beneficiaries.",
        "Shared ownership makes change durable.",
        "Trust is slow to build and worth every minute.",
      ],
    },
  ],
};
