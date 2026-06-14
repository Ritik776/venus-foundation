import {
  ChairpersonLeader,
  PartnersGrid,
  TeamGrid,
  VisionSplit,
} from "@/components/sections/AboutSections";
import { Cta2Band, PageHero } from "@/components/sections/Shared";
import { aboutContent } from "@/content/about";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export function AboutPage() {
  useDocumentMeta({
    title: "Our Story",
    description:
      "Venus Foundation's story — who we are, the changemakers who carry the work forward, and the partners who grow alongside us.",
  });

  const { hero } = aboutContent;
  return (
    <>
      <PageHero
        breadcrumb={hero.breadcrumb}
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.subtitle}
        image={hero.image}
      />
      <VisionSplit />
      <ChairpersonLeader />
      <TeamGrid />
      <PartnersGrid />
      <Cta2Band data={aboutContent.cta} />
    </>
  );
}
