import {
  HappyWall,
  HomeCta,
  ImmersiveHero,
  ImpactSection,
  SparkJourney,
  // WelcomeHero,
} from "@/components/sections/HomeSections";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export function HomePage() {
  useDocumentMeta({
    title: "Venus Foundation — Planting Seeds of Change",
    description:
      "Venus Foundation, an NGO in Panchkula, nurtures growth through education, nourishment and care. Walk with us on a journey rooted in kindness, hope and lasting impact.",
  });

  return (
    <>
      <ImmersiveHero />
      {/* <WelcomeHero /> */}
      <SparkJourney />
      <ImpactSection />
      <HappyWall />
      <HomeCta />
    </>
  );
}
