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
import { useYouTubeVideos } from "@/hooks/useYouTubeVideos";

const CHANNEL_URL = "https://www.youtube.com/@FoundationVenus";

export function MediaPage() {
  useDocumentMeta({
    title: "Media & Updates",
    description:
      "Films, photos and press from Venus Foundation. Watch our story across YouTube, Instagram, Facebook and LinkedIn — all in one place.",
  });

  const { open } = useLightbox();
  const { hero } = mediaContent;
  const { videos } = useYouTubeVideos();
  const film = videos.find((v) => !v.short) ?? videos[0];

  const playHero = () => {
    if (film) {
      open({ kind: "youtube", id: film.id, short: film.short });
    } else {
      window.open(CHANNEL_URL, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <InnerHero
        image={hero.image}
        breadcrumb={hero.breadcrumb}
        eyebrow={hero.eyebrow}
        words={hero.words}
        subtitle={hero.subtitle}
        onPlay={playHero}
      />
      <NetflixBrowser videos={videos} />
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
