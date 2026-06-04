import { useLightbox } from "@/components/layout/LightboxContext";
import { PhotoMasonry, ScrubSequence, VideoStoriesRail } from "@/components/sections/MediaSections";
import { Cta2Band, InnerHero } from "@/components/sections/Shared";
import { mediaContent } from "@/content/media";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export function MediaPage() {
  useDocumentMeta({
    title: "Media & Updates",
    description:
      "Films, photos and press from Venus Foundation. Visual stories of care, kindness and everyday acts that connect communities across Panchkula and Haryana.",
  });

  const { open } = useLightbox();
  const { hero } = mediaContent;
  return (
    <>
      <InnerHero
        image={hero.image}
        breadcrumb={hero.breadcrumb}
        eyebrow={hero.eyebrow}
        words={hero.words}
        subtitle={hero.subtitle}
        onPlay={() => open(hero.videoId)}
      />
      <VideoStoriesRail />
      <ScrubSequence />
      <PhotoMasonry />
      <Cta2Band data={mediaContent.cta} />
    </>
  );
}
