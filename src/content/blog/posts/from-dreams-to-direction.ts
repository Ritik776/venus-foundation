import { img } from "@/content/images";
import { parveen } from "../authors";
import type { BlogPost } from "../types";

export const fromDreamsToDirection: BlogPost = {
  slug: "from-dreams-to-direction",
  title: "From Dreams to Direction: Supporting Students Beyond Marks",
  excerpt:
    "Helping high school students navigate stream choices beyond marks, peer pressure and limited guidance.",
  subtitle:
    "Why a report card should be a starting line, not a ceiling — and how mentorship turns uncertainty into direction.",
  category: "education",
  categoryLabel: "Education",
  categoryTone: "green",
  author: parveen,
  date: "2026-03-11",
  dateLabel: "March 11, 2026",
  updatedLabel: "Mar 11, 2026",
  readMinutes: 6,
  image: { src: img.eduPath, alt: "Students choosing their path" },
  featured: true,
  body: [
    {
      type: "lead",
      id: "intro",
      tocLabel: "A crossroads no one prepared them for",
      text: "Every year, millions of Indian students reach a crossroads they were never prepared for — choosing between science, commerce and arts. Too often, that choice is made for them.",
    },
    {
      type: "p",
      text: "Often influenced by limited career guidance, parental input, peer pressure and the marks they scored, many high school students face deep uncertainty when choosing their stream. The decision feels enormous, irreversible and lonely. At Venus Foundation, we believe no young person should have to navigate it alone.",
    },
    {
      type: "h2",
      id: "access",
      tocLabel: "The problem isn't ambition",
      text: "The problem isn't ambition — it's access",
    },
    {
      type: "p",
      text: "Talk to students in under-resourced schools and you'll rarely find a lack of dreams. What's missing is access to the people, information and confidence that turn a dream into a direction. A student who has never met an engineer, a designer or an entrepreneur cannot easily imagine becoming one.",
    },
    { type: "quote", text: "Marks measure a moment. Mentorship shapes a lifetime." },
    {
      type: "p",
      text: "Our career-guidance circles bring working professionals into classrooms — not to lecture, but to listen. Students ask the questions they were too afraid to ask at home, and discover that there are many more paths than the three written on a report card.",
    },
    {
      type: "callout",
      rich: [
        { text: "Did you know? ", bold: true },
        {
          text: "Studies show students with even one consistent mentor are significantly more likely to stay in education and pursue higher studies.",
        },
      ],
    },
    {
      type: "figure",
      image: { src: img.communities, alt: "Mentorship session" },
      caption: "Career-guidance circles in partner schools across Panchkula and Haryana.",
    },
    {
      type: "h2",
      id: "how",
      tocLabel: "What we do, step by step",
      text: "What we do, step by step",
    },
    {
      type: "p",
      text: "Direction doesn't come from a single talk. It's built through steady, practical support that meets students where they are:",
    },
    {
      type: "list",
      items: [
        "One-on-one aptitude and interest conversations that go beyond test scores.",
        "Exposure visits to workplaces, colleges and labs to make futures feel real.",
        "A volunteer mentor network that stays in touch long after the first session.",
        "Scholarship and resource navigation for families who need it most.",
      ],
    },
    {
      type: "stat",
      value: 750,
      suffix: "+",
      label: "students reached through our education & guidance programs",
    },
    {
      type: "h2",
      id: "direction",
      tocLabel: "Direction, not pressure",
      text: "Direction, not pressure",
    },
    {
      type: "p",
      text: 'Our goal is never to push a student toward a "better" career. It is to widen the field of what feels possible, then walk beside them as they choose. Because when a young person chooses their own path with clarity and support, they don\'t just build a career — they build confidence that ripples through an entire family.',
    },
    {
      type: "p",
      text: "That is the seed we plant: not an answer, but a sense of direction.",
    },
    {
      type: "takeaways",
      id: "takeaways",
      tocLabel: "Key takeaways",
      items: [
        "Access to mentors — not ambition — is the real gap for most students.",
        "Real exposure to careers makes futures feel possible, not abstract.",
        "Lasting change comes from walking beside students, long-term.",
      ],
    },
  ],
};
