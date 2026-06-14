import { FeaturesSection } from "@/components/sections/SeedsSections";
import { Cta2Band, PageHero } from "@/components/sections/Shared";
import { seedsContent } from "@/content/seeds";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export function SeedsPage() {
  useDocumentMeta({
    title: "Our Seeds",
    description:
      "Explore Venus Foundation's initiatives — the Clean & Safe School Initiative, EduPath, Pehli Udaan, Good Health & Well-being and Nayi Shuruaat.",
  });

  const { hero } = seedsContent;
  return (
    <>
      <PageHero
        breadcrumb={hero.breadcrumb}
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.subtitle}
        image={hero.image}
      />
      <FeaturesSection />
      <Cta2Band data={seedsContent.cta} />
    </>
  );
}
