import {
  ChairpersonLeader,
  PartnersGrid,
  TeamGrid,
  ValuesGrid,
  VisionSplit,
} from "@/components/sections/AboutSections";
import { Cta2Band, DidYouKnowBand, InnerHero } from "@/components/sections/Shared";
import { aboutContent } from "@/content/about";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export function AboutPage() {
  useDocumentMeta({
    title: "About Us",
    description:
      "Venus Foundation is a non-profit working to build an inclusive India — access to nutritious food, clean water, healthcare, education and equal opportunity for all.",
  });

  const { hero } = aboutContent;
  return (
    <>
      <InnerHero
        image={hero.image}
        breadcrumb={hero.breadcrumb}
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        pills={hero.pills}
      />
      <DidYouKnowBand data={aboutContent.didYouKnow} />
      <VisionSplit />
      <ValuesGrid />
      <ChairpersonLeader />
      <TeamGrid />
      <PartnersGrid />
      <Cta2Band data={aboutContent.cta} />
    </>
  );
}
