import {
  HappyWall,
  HomeCta,
  ImmersiveHero,
  InvolveSection,
  JourneySection,
  PrinciplesSection,
  SeedsPreviewRail,
  StatsSection,
  VideoShowcase,
  VoicesSection,
  WelcomeHero,
} from "@/components/sections/HomeSections";
import { DidYouKnowBand, MarqueeBand } from "@/components/sections/Shared";
import { homeContent } from "@/content/home";
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
      <WelcomeHero />
      <MarqueeBand items={homeContent.marquee} />
      <DidYouKnowBand data={homeContent.didYouKnow} />
      <JourneySection />
      <StatsSection />
      <VideoShowcase />
      <PrinciplesSection />
      <SeedsPreviewRail />
      <HappyWall />
      <VoicesSection />
      <InvolveSection />
      <HomeCta />
    </>
  );
}
