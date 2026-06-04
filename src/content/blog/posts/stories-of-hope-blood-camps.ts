import { img } from "@/content/images";
import { parveen } from "../authors";
import type { BlogPost } from "../types";

export const storiesOfHope: BlogPost = {
  slug: "stories-of-hope-blood-camps",
  title: "Stories of Hope Flowing Through Our Blood Camps",
  excerpt:
    "From PGI Chandigarh to Panchkula, our blood donation camps spread awareness and save lives.",
  subtitle:
    "Every unit donated is a stranger choosing hope on someone else's behalf — the purest form of community.",
  category: "health",
  categoryLabel: "Health",
  categoryTone: "red",
  author: parveen,
  date: "2025-11-07",
  dateLabel: "November 7, 2025",
  updatedLabel: "Nov 7, 2025",
  readMinutes: 4,
  image: { src: img.bloodDonation, alt: "Blood donation camp" },
  body: [
    {
      type: "lead",
      id: "intro",
      tocLabel: "A gift that asks for nothing",
      text: "Blood cannot be manufactured — it can only be given. Our donation camps turn that simple truth into a recurring act of collective generosity.",
    },
    {
      type: "p",
      text: "Working alongside hospitals and medical partners, we organise camps that make donating easy, safe and even joyful — pairing each drive with awareness sessions that dissolve fear and myth.",
    },
    {
      type: "h2",
      id: "impact",
      tocLabel: "The ripple of one unit",
      text: "The ripple of one unit",
    },
    {
      type: "p",
      text: "A single donation can support multiple patients. Multiply that by a hall full of first-time donors and you begin to see how a quiet afternoon becomes a lifeline for families we will never meet.",
    },
    {
      type: "takeaways",
      id: "takeaways",
      tocLabel: "Key takeaways",
      items: [
        "Awareness removes the fear that keeps first-time donors away.",
        "Hospital partnerships ensure every unit is used where it matters.",
        "Generosity, once experienced, tends to repeat.",
      ],
    },
  ],
};
