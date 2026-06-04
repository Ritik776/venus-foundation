import { img } from "@/content/images";
import { parveen } from "../authors";
import type { BlogPost } from "../types";

export const empoweringCommunities: BlogPost = {
  slug: "empowering-communities-food-care",
  title: "Empowering Communities Through Food and Care",
  excerpt:
    "Fighting hunger with compassion — fresh meals for children in need, ensuring no one is left behind.",
  subtitle:
    "A warm meal is rarely just a meal. It is dignity, attendance, attention and the quiet message that someone cares.",
  category: "community",
  categoryLabel: "Community",
  categoryTone: "green",
  author: parveen,
  date: "2025-11-07",
  dateLabel: "November 7, 2025",
  updatedLabel: "Nov 7, 2025",
  readMinutes: 5,
  image: { src: img.foodDistribution, alt: "Food distribution drive" },
  body: [
    {
      type: "lead",
      id: "intro",
      tocLabel: "More than a meal",
      text: "When a child arrives at school hungry, learning is the first thing to suffer. Our food drives begin with a simple belief: no one should have to choose between an empty stomach and a full day.",
    },
    {
      type: "p",
      text: "Across Panchkula and the wider Haryana region, our volunteers serve fresh, nutritious meals at schools, community spaces and during outreach drives — meeting families where they already are.",
    },
    {
      type: "h2",
      id: "how",
      tocLabel: "How we serve",
      text: "Care that travels the last mile",
    },
    {
      type: "p",
      text: "We work hand in hand with local kitchens, donors and schoolteachers so that food reaches the children who need it most, consistently and with dignity — never as charity handed down, but as care shared across.",
    },
    {
      type: "quote",
      text: "Feed a child today, and you free their mind to dream tomorrow.",
    },
    {
      type: "takeaways",
      id: "takeaways",
      tocLabel: "Key takeaways",
      items: [
        "Nutrition is the foundation that makes education possible.",
        "Local partnerships keep meals fresh, regular and dignified.",
        "Small, consistent acts of care compound into lasting trust.",
      ],
    },
  ],
};
