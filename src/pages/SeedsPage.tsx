import { ProgramsSection } from "@/components/sections/SeedsSections";
import { Cta2Band, DidYouKnowBand, InnerHero } from "@/components/sections/Shared";
import { seedsContent } from "@/content/seeds";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export function SeedsPage() {
  useDocumentMeta({
    title: "Our Seeds",
    description:
      "Explore Venus Foundation's nine seeds of change — poverty, hunger, gender equality, climate, education, health, clean water, life on land and partnerships.",
  });

  const { hero } = seedsContent;
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
      <DidYouKnowBand data={seedsContent.didYouKnow} />
      <ProgramsSection />
      <Cta2Band data={seedsContent.cta} />
    </>
  );
}
