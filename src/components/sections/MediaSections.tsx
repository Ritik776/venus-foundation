import { Fragment, useRef, useState } from "react";
import { useLightbox } from "@/components/layout/LightboxContext";
import { Chip } from "@/components/primitives/Chip";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Icon } from "@/components/primitives/Icon";
import { Reveal, type RevealDelay } from "@/components/primitives/Reveal";
import { SplitText } from "@/components/primitives/SplitText";
import type { YtVideo } from "@/content/generated/youtube";
import { mediaContent, type NfCard, type NfRow, type WallCard } from "@/content/media";
import { useDragScroll, useRailControls } from "@/hooks/usePointerEffects";
import { useScrub } from "@/hooks/useScrollScenes";
import { useYouTubeVideos } from "@/hooks/useYouTubeVideos";

const m = mediaContent;

const PROFILE = {
  youtube: "https://www.youtube.com/@FoundationVenus",
  instagram: "https://www.instagram.com/venus.foundation",
  facebook: "https://www.facebook.com/foundationvenus/",
  linkedin: "https://www.linkedin.com/company/foundationvenus/",
} as const;

/* ============================================================
   NETFLIX-STYLE BROWSER
   ============================================================ */
function NfCardView({ card }: { card: NfCard }) {
  const { open } = useLightbox();
  return (
    <button
      type="button"
      className="nf-card"
      aria-label={card.title ? `Play ${card.title}` : "Play video"}
      onClick={() => open({ kind: "youtube", id: card.videoId, short: card.short })}
    >
      {card.badge ? <span className="nf-badge-top">{card.badge}</span> : null}
      <img src={card.image} alt="" loading="lazy" />
      <span className="nf-play-mini">
        <Icon name="play" />
      </span>
      {card.title ? (
        <div className="nf-card-info">
          <h4>{card.title}</h4>
          {card.tags ? (
            <div className="nf-card-tags">
              {card.tags.map((tag, i) =>
                i === 0 ? (
                  <span className="match" key={tag}>
                    {tag}
                  </span>
                ) : (
                  <Fragment key={tag}>
                    <span className="dotsep" />
                    <span>{tag}</span>
                  </Fragment>
                ),
              )}
            </div>
          ) : null}
        </div>
      ) : null}
    </button>
  );
}

function NfRailRow({ row }: { row: NfRow }) {
  const railRef = useDragScroll<HTMLDivElement>();
  const { atStart, atEnd, scrollPrev, scrollNext } = useRailControls(railRef);
  return (
    <Reveal className="nf-row">
      <div className="wrap">
        <div className="nf-row-head">
          <h3 className="nf-row-title">{row.title}</h3>
          {row.explore ? <span className="nf-explore">Explore all ›</span> : null}
        </div>
      </div>
      <div className="nf-rail-wrap">
        <button
          type="button"
          className="nf-arrow nf-prev"
          aria-label="Previous"
          disabled={atStart}
          onClick={scrollPrev}
        >
          <Icon name="chevron-left" strokeWidth={2.5} />
        </button>
        <div
          className={`nf-rail${row.top10 ? " nf-top10" : ""}${row.shorts ? " nf-shorts" : ""}`}
          id={row.id}
          ref={railRef}
        >
          {row.top10
            ? row.cards.map((card, i) => (
                <div className="nf-rank" key={card.videoId}>
                  <span className="nf-rank-num">{i + 1}</span>
                  <NfCardView card={card} />
                </div>
              ))
            : row.cards.map((card) => <NfCardView card={card} key={card.videoId} />)}
        </div>
        <button
          type="button"
          className="nf-arrow nf-next"
          aria-label="Next"
          disabled={atEnd}
          onClick={scrollNext}
        >
          <Icon name="chevron-right" strokeWidth={2.5} />
        </button>
      </div>
    </Reveal>
  );
}

const fmtDuration = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

function toCard(v: YtVideo): NfCard {
  return {
    image: v.thumb,
    title: v.title,
    tags: [v.short ? "Short" : "Film", fmtDuration(v.seconds)],
    videoId: v.id,
    short: v.short,
  };
}

/** Build the browse rows from the (live or snapshot) video list. */
function buildRows(videos: YtVideo[]): NfRow[] {
  const cards = videos.map(toCard);
  const shorts = cards.filter((c) => c.short);
  return [
    { id: "nf-shorts", title: "Shorts", shorts: true, explore: true, cards: shorts },
    { id: "nf-row1", title: "Trending now", explore: true, cards: cards.slice(0, 10) },
    { id: "nf-row2", title: "Top 10 this month", top10: true, cards: shorts.slice(0, 10) },
    { id: "nf-row3", title: "Stories by cause", explore: true, cards: cards.slice(8) },
  ];
}

export function NetflixBrowser() {
  const { netflix: nf } = m;
  const rows = buildRows(useYouTubeVideos());
  return (
    <section className="pad nf-surface grain" id="watch">
      <div className="wrap">
        <div className="nf-intro">
          <div className="chan-intro">
            <span className="chan-badge yt">
              <Icon name="youtube" />
              {nf.badge}
            </span>
            <SplitText as="h2" className="h1" text={nf.title} />
          </div>
          <a
            href={nf.subscribeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="chan-follow yt"
          >
            <Icon name="youtube" />
            Subscribe
          </a>
        </div>
      </div>
      {rows.map((row) => (
        <NfRailRow row={row} key={row.id} />
      ))}
    </section>
  );
}

/* ============================================================
   FIELD FOOTAGE — native video players
   ============================================================ */
export function FieldFootage() {
  const { footage: f } = m;
  return (
    <section className="pad surface-cream" id="films">
      <div className="wrap">
        <div className="chan-head">
          <div className="chan-intro">
            <span className="chan-badge mv">
              <Icon name="video" />
              {f.badge}
            </span>
            <SplitText as="h2" className="h1" text={f.title} />
            <Reveal as="p" delay={2} className="lead" style={{ marginTop: ".6em" }}>
              {f.body}
            </Reveal>
          </div>
        </div>
        <div className="mv-grid">
          {f.videos.map((video, i) => (
            <Reveal
              as="article"
              className="mv-card"
              key={video.title}
              delay={(i + 1) as RevealDelay}
            >
              <div className="mv-player">
                {/* biome-ignore lint/a11y/useMediaCaption: community footage has no caption track yet. */}
                <video controls preload="none" playsInline poster={video.poster}>
                  <source src={video.src} type="video/mp4" />
                </video>
              </div>
              <div className="mv-body">
                <Chip>{video.chip}</Chip>
                <h3>{video.title}</h3>
                <p>{video.body}</p>
                <span className="mv-tag">
                  <Icon name="clock" />
                  {video.tag}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   INSTAGRAM
   ============================================================ */
export function InstagramFeed() {
  const { instagram: ig } = m;
  const { open } = useLightbox();
  return (
    <section className="pad surface-cream" id="instagram" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="chan-head">
          <div className="ig-profile">
            <span className="ig-avatar">
              <img
                src="https://cdn.prod.website-files.com/686a42bf95a654b62506d2e5/686fa93a101af483ddc4eb80_Venus%20Foundation%20logo-02%202.svg"
                alt="Venus Foundation"
              />
            </span>
            <div>
              <div className="ig-handle">{ig.handle}</div>
              <div className="ig-name">{ig.name}</div>
            </div>
          </div>
          <a
            href={ig.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="chan-follow ig"
          >
            <Icon name="instagram" />
            Follow
          </a>
        </div>
        <div className="ig-grid">
          {ig.posts.map((post, i) => (
            <Reveal
              as="button"
              type="button"
              className="ig-post"
              key={post.caption}
              delay={(i + 1) as RevealDelay}
              onClick={() => open({ kind: "instagram", url: post.url })}
            >
              <span className="ig-type">
                <Icon name={post.type === "reel" ? "video" : "instagram"} />
              </span>
              <img src={post.image} alt="" loading="lazy" />
              <span className="ig-ov">
                <span className="ig-stats">
                  <span>
                    <Icon name="heart-fill" />
                    {post.likes}
                  </span>
                  <span>
                    <Icon name="comment" />
                    {post.comments}
                  </span>
                </span>
                <span className="ig-cap">{post.caption}</span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FACEBOOK
   ============================================================ */
export function FacebookFeed() {
  const { facebook: fb } = m;
  const { open } = useLightbox();
  return (
    <section className="pad surface-cream" id="facebook" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="chan-head">
          <div className="chan-intro">
            <span
              className="chan-badge fb"
              style={{ background: "rgba(24,119,242,.12)", color: "#1877f2" }}
            >
              <Icon name="facebook" />
              Facebook
            </span>
            <SplitText as="h2" className="h1" text={fb.title} />
          </div>
          <a
            href={fb.pageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="chan-follow"
            style={{ background: "#1877f2", color: "#fff" }}
          >
            <Icon name="facebook" />
            Follow
          </a>
        </div>
        <div className="fb-grid">
          {fb.posts.map((post) => (
            <button
              type="button"
              className="fb-card"
              key={post.caption}
              onClick={() => open({ kind: "facebook", url: post.url, fbVideo: post.fbVideo })}
            >
              <div className="fb-media">
                <img src={post.image} alt="" loading="lazy" />
                <span className="fb-badge2">
                  <Icon name="facebook" />
                </span>
                <span className="fb-zoom">
                  <Icon name={post.fbVideo ? "play" : "expand"} />
                </span>
              </div>
              <div className="fb-cap">
                {post.caption}
                <span className="fb-when">{post.when}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   LINKEDIN
   ============================================================ */
const LI_EMOJI: Record<string, string> = { like: "👍", clap: "👏", heart: "❤" };

export function LinkedInFeed() {
  const { linkedin: li } = m;
  return (
    <section className="pad surface-cream" id="linkedin" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="chan-head">
          <div className="chan-intro">
            <span className="chan-badge li">
              <Icon name="linkedin" />
              LinkedIn
            </span>
            <SplitText as="h2" className="h1" text={li.title} />
          </div>
          <a href={li.pageUrl} target="_blank" rel="noopener noreferrer" className="chan-follow li">
            <Icon name="linkedin" />
            Follow
          </a>
        </div>
        <div className="li-grid">
          {li.posts.map((post, i) => (
            <Reveal
              as="a"
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="li-card"
              key={post.bold}
              delay={(i + 1) as RevealDelay}
            >
              <div className="li-top">
                <img
                  className="li-logo"
                  src="https://cdn.prod.website-files.com/686a42bf95a654b62506d2e5/686fa93a101af483ddc4eb80_Venus%20Foundation%20logo-02%202.svg"
                  alt=""
                />
                <div>
                  <div className="li-org">Venus Foundation</div>
                  <div className="li-sub">
                    2,400 followers · {post.time} · <Icon name="circle" />
                  </div>
                </div>
                <span className="li-in">
                  <Icon name="linkedin" />
                </span>
              </div>
              <p className="li-text">
                {post.text}
                <b>{post.bold}</b>
                {post.rest}
                <span className="li-tags">{post.tags}</span>
              </p>
              <div className="li-media">
                <img src={post.image} alt="" loading="lazy" />
              </div>
              <div className="li-react">
                <span className="li-emojis">
                  {post.reactions.map((r) => (
                    <span className={`e-${r}`} key={r}>
                      {LI_EMOJI[r]}
                    </span>
                  ))}
                </span>
                <span className="li-count">{post.count}</span>
                <span className="li-cta">
                  Read on LinkedIn <Icon name="arrow-right" />
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SOCIAL WALL — unified, filterable feed
   ============================================================ */
const WALL_FILTERS = [
  { value: "all", label: "All", icon: null },
  { value: "youtube", label: "YouTube", icon: "youtube" as const },
  { value: "instagram", label: "Instagram", icon: "instagram" as const },
  { value: "facebook", label: "Facebook", icon: "facebook" as const },
  { value: "linkedin", label: "LinkedIn", icon: "linkedin" as const },
] as const;

const PLAT_CLASS: Record<WallCard["platform"], string> = {
  youtube: "yt",
  instagram: "ig",
  facebook: "fb",
  linkedin: "li",
};

function WallCardView({ card }: { card: WallCard }) {
  const { open } = useLightbox();
  const onOpen = () => {
    if (card.platform === "youtube") {
      open({ kind: "youtube", id: card.videoId ?? "demo" });
    } else if (card.platform === "instagram") {
      open({ kind: "instagram", url: card.url ?? "demo" });
    } else if (card.platform === "facebook") {
      open({ kind: "facebook", url: card.url ?? "demo", fbVideo: card.fbVideo });
    } else {
      open({ kind: "linkedin", url: card.url ?? "demo" });
    }
  };
  return (
    <a
      href={PROFILE[card.platform]}
      target="_blank"
      rel="noopener noreferrer"
      className="wall-card"
      onClick={(event) => {
        event.preventDefault();
        onOpen();
      }}
    >
      <div className="wall-media" style={{ aspectRatio: card.ratio }}>
        <img src={card.image} alt="" loading="lazy" />
      </div>
      <span className={`wall-plat ${PLAT_CLASS[card.platform]}`}>
        <Icon name={card.platform} />
      </span>
      <span className="wall-go">
        <Icon name={card.platform === "youtube" || card.fbVideo ? "play" : "expand"} />
      </span>
      <div className="wall-foot">
        <span className="wall-handle">{card.handle}</span>
        <p>{card.caption}</p>
      </div>
    </a>
  );
}

export function SocialWall() {
  const { wall } = m;
  const [active, setActive] = useState<string>("all");
  const visible = active === "all" ? wall.cards : wall.cards.filter((c) => c.platform === active);

  return (
    <section className="pad nf-surface grain" id="social-wall">
      <div className="wrap">
        <div className="center" style={{ marginBottom: 8 }}>
          <Eyebrow onDark center>
            {wall.eyebrow}
          </Eyebrow>
          <SplitText as="h2" className="h1" text={wall.title} />
          <Reveal
            as="p"
            delay={2}
            className="lead mx-auto"
            style={{ maxWidth: "48ch", marginTop: ".7em", color: "#b3aa99" }}
          >
            {wall.body}
          </Reveal>
        </div>
        <Reveal className="wall-filters">
          {WALL_FILTERS.map((f) => (
            <button
              type="button"
              key={f.value}
              className={`wall-pill${active === f.value ? " active" : ""}`}
              onClick={() => setActive(f.value)}
            >
              {f.icon ? <Icon name={f.icon} /> : null}
              {f.label}
            </button>
          ))}
        </Reveal>
        <div className="wall-grid">
          {visible.map((card) => (
            <WallCardView card={card} key={`${card.platform}-${card.caption}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SCROLL-SCRUBBED SEQUENCE (unchanged behaviour)
   ============================================================ */
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
            <Reveal as="figure" key={photo.src} delay={((i % 3) + 1) as RevealDelay}>
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <figcaption>{photo.alt}</figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FollowStrip() {
  return (
    <section className="pad surface-cream" style={{ paddingTop: 0 }}>
      <div className="wrap center">
        <Eyebrow center>Stay connected</Eyebrow>
        <SplitText as="h2" className="h2" text="Follow our journey, everywhere." />
        <Reveal delay={2} className="follow-strip" style={{ marginTop: ".9em" }}>
          {m.follow.map((f) => (
            <a
              key={f.platform}
              href={f.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`follow-chip ${f.platform}`}
            >
              <Icon name={f.icon} />
              {f.label}
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
