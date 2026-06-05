import type { NavLink, SocialLink } from "@/types/content";

const CDN = "https://cdn.prod.website-files.com";

/** Brand identity, navigation, footer and contact details — the site-wide chrome. */
export const site = {
  name: "Venus Foundation",
  tagline: "Planting Seeds of Change",
  logo: {
    dark: `${CDN}/686a42bf95a654b62506d2e5/686fa93a101af483ddc4eb80_Venus%20Foundation%20logo-02%202.svg`,
    light: `${CDN}/686a42bf95a654b62506d2e5/6892e8d5783ad7d6016843a6_Venus%20Foundation%20logo-%20white.svg`,
  },
  blurb:
    "Nurturing growth through education, nourishment and care — building an inclusive India where everyone can thrive.",
  contact: {
    address: "Plot No: 51, 52, Industrial Area Phase 1, Panchkula, Haryana 134113",
    addressShort: "Plot No: 51, 52, Industrial Area Phase 1, Panchkula",
    phone: "0172-293-3094",
    email: "info@venusfoundation.in",
    hours: "Mon – Sat · 9:30 AM to 6:00 PM",
    mapsLink: "https://maps.app.goo.gl/W5fAtER4CCvu9XqK8",
    mapsEmbed:
      "https://www.google.com/maps?q=Industrial+Area+Phase+1,+Panchkula,+Haryana+134113&output=embed",
  },
  copyright: "© 2025 Venus Foundation · A CSR initiative by Venus Remedies.",
} as const;

export const navLinks: NavLink[] = [
  { label: "Home", to: "/", dataNav: "home" },
  { label: "About", to: "/about", dataNav: "about" },
  { label: "Our Seeds", to: "/our-seeds", dataNav: "seeds" },
  {
    label: "Media & Stories",
    to: "/blog",
    dataNav: "media",
    dropdown: [
      { label: "Blog", description: "Stories, CSR & impact", to: "/blog" },
      { label: "Media & Updates", description: "Films, photos & press", to: "/media" },
    ],
  },
  { label: "Contact", to: "/contact", dataNav: "contact" },
];

/** Expanded list for the mobile menu (Media & Stories splits into Blog + Media). */
export const mobileNavLinks: { no: string; label: string; to: string; dataNav: string }[] = [
  { no: "01", label: "Home", to: "/", dataNav: "home" },
  { no: "02", label: "About Us", to: "/about", dataNav: "about" },
  { no: "03", label: "Our Seeds", to: "/our-seeds", dataNav: "seeds" },
  { no: "04", label: "Blog", to: "/blog", dataNav: "blog" },
  { no: "05", label: "Media & Updates", to: "/media", dataNav: "media" },
  { no: "06", label: "Contact", to: "/contact", dataNav: "contact" },
];

export const socials: SocialLink[] = [
  { label: "Facebook", href: "https://www.facebook.com/foundationvenus/", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/venus.foundation", icon: "instagram" },
  { label: "X", href: "https://x.com/foundationvenus", icon: "x" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/foundationvenus/",
    icon: "linkedin",
  },
  { label: "YouTube", href: "https://www.youtube.com/@FoundationVenus", icon: "youtube" },
];

export const footerColumns = [
  {
    title: "Explore",
    links: [
      { label: "Home", to: "/" },
      { label: "About Us", to: "/about" },
      { label: "Our Seeds", to: "/our-seeds" },
      { label: "Blog", to: "/blog" },
      { label: "Media & Updates", to: "/media" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Get involved",
    links: [
      { label: "Volunteer", to: "/contact" },
      { label: "Partner with us", href: "mailto:info@venusfoundation.in" },
      { label: "Spread the word", to: "/media" },
      { label: "Our programs", to: "/our-seeds" },
      { label: "Watch our films", to: "/media" },
    ],
  },
] as const;
