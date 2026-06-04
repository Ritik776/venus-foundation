import { useRef } from "react";
import { useLightbox } from "@/components/layout/LightboxContext";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Icon } from "@/components/primitives/Icon";
import { Reveal } from "@/components/primitives/Reveal";
import { SplitText } from "@/components/primitives/SplitText";
import { mediaContent } from "@/content/media";
import { useDragScroll } from "@/hooks/usePointerEffects";
import { useScrub } from "@/hooks/useScrollScenes";

const m = mediaContent;

export function VideoStoriesRail() {
  const { stories } = m;
  const railRef = useDragScroll<HTMLDivElement>();
  const { open } = useLightbox();

  return (
    <section className="pad surface-deep grain">
      <div className="wrap" style={{ marginBottom: "clamp(30px,4vw,48px)" }}>
        <Eyebrow onDark>{stories.eyebrow}</Eyebrow>
        <SplitText as="h2" className="h1" text={stories.title} />
      </div>
      <div className="vstory-rail" ref={railRef}>
        {stories.items.map((story, i) => (
          <Reveal
            key={story.title}
            className="vstory"
            delay={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5}
            role="button"
            tabIndex={0}
            aria-label={`Play ${story.title}`}
            onClick={() => open(story.videoId)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                open(story.videoId);
              }
            }}
          >
            <img src={story.image} alt="" loading="lazy" />
            <span className="mini-play">
              <Icon name="play" />
            </span>
            <div className="vstory-info">
              <span>{story.meta}</span>
              <h4>{story.title}</h4>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="rail-hint wrap">← Drag or swipe to explore →</Reveal>
    </section>
  );
}

export function ScrubSequence() {
  const { scrub } = m;
  const sceneRef = useRef<HTMLDivElement>(null);
  const index = useScrub(sceneRef, scrub.frames.length);

  return (
    <section className="scrub" ref={sceneRef}>
      <div className="scrub-sticky grain">
        {scrub.frames.map((frame, i) => (
          <div
            className="scrub-frame"
            key={frame.image}
            style={{
              opacity: i === index ? 1 : 0,
              transform: `scale(${i === index ? 1.04 : 1.12})`,
            }}
          >
            <img src={frame.image} alt="" />
          </div>
        ))}
        {scrub.texts.map((text, i) => (
          <div
            className="scrub-text"
            key={text}
            style={{
              opacity: i === index ? 1 : 0,
              transform: `translateY(${i === index ? 0 : 24}px)`,
            }}
          >
            {i === 0 ? (
              <Eyebrow onDark center>
                Scroll the story
              </Eyebrow>
            ) : null}
            <h2 className="display" style={{ color: "#fff" }}>
              {text}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PhotoMasonry() {
  const { gallery } = m;
  return (
    <section className="pad surface-cream">
      <div className="wrap" style={{ marginBottom: "clamp(30px,4vw,48px)" }}>
        <Eyebrow>{gallery.eyebrow}</Eyebrow>
        <SplitText as="h2" className="h1" text={gallery.title} />
      </div>
      <div className="wrap">
        <div className="masonry">
          {gallery.photos.map((photo, i) => (
            <Reveal as="figure" key={photo.src} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <figcaption>{photo.alt}</figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
