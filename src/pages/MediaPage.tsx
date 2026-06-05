import { useLightbox } from "@/components/layout/LightboxContext";
import {
  FacebookFeed,
  FieldFootage,
  FollowStrip,
  InstagramFeed,
  LinkedInFeed,
  NetflixBrowser,
  PhotoMasonry,
  ScrubSequence,
  SocialWall,
} from "@/components/sections/MediaSections";
import { Cta2Band, InnerHero } from "@/components/sections/Shared";
import { mediaContent } from "@/content/media";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export function MediaPage() {
  useDocumentMeta({
    title: "Media & Updates",
    description:
      "Films, photos and press from Venus Foundation. Watch our story across YouTube, Instagram, Facebook and LinkedIn — all in one place.",
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
        onPlay={() => open({ kind: "youtube", id: hero.videoId })}
      />
      <NetflixBrowser />
      <FieldFootage />
      <InstagramFeed />
      <FacebookFeed />
      <LinkedInFeed />
      <SocialWall />
      <ScrubSequence />
      <PhotoMasonry />
      <FollowStrip />
      <Cta2Band data={mediaContent.cta} />
    </>
  );
}
