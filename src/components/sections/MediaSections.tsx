import { Fragment, type ReactNode, useRef, useState } from "react";
import { useLightbox } from "@/components/layout/LightboxContext";
import { Chip } from "@/components/primitives/Chip";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Icon, type IconName } from "@/components/primitives/Icon";
import { Reveal, type RevealDelay } from "@/components/primitives/Reveal";
import { SplitText } from "@/components/primitives/SplitText";
import {
  type FbFeedPost,
  type IgFeedPost,
  mediaContent,
  type RailCard,
  type WallCard,
} from "@/content/media";
import { useInstagramFeed } from "@/hooks/useInstagramFeed";
import { useDragScroll, useRailControls } from "@/hooks/usePointerEffects";
import { useScrub } from "@/hooks/useScrollScenes";
import type { YtVideo } from "@/hooks/useYouTubeVideos";

const m = mediaContent;

const LOGO =
  "https://cdn.prod.website-files.com/686a42bf95a654b62506d2e5/686fa93a101af483ddc4eb80_Venus%20Foundation%20logo-02%202.svg";

/* ============================================================
   WATCH & FOLLOW — one section, every channel as a platform rail
   ============================================================ */

/** Generic horizontal rail with a platform-labelled head + edge arrows. */
function Rail({
  plat,
  icon,
  title,
  exploreHref,
  exploreLabel,
  railClass,
  children,
}: {
  plat: "yt" | "ig" | "fb" | "li";
  icon: IconName;
  title: string;
  exploreHref: string;
  exploreLabel: string;
  railClass?: string;
  children: ReactNode;
}) {
  const railRef = useDragScroll<HTMLDivElement>();
  const { atStart, atEnd, scrollPrev, scrollNext } = useRailControls(railRef);
  return (
    <Reveal className="nf-row">
      <div className="wrap">
        <div className="nf-row-head">
          <span className={`nf-plat ${plat}`}>
            <Icon name={icon} />
          </span>
          <h3 className="nf-row-title">{title}</h3>
          <a className="nf-explore" href={exploreHref} target="_blank" rel="noopener noreferrer">
            {exploreLabel}
          </a>
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
        <div className={`nf-rail${railClass ? ` ${railClass}` : ""}`} ref={railRef}>
          {children}
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

/** Compact thumbnail card used by YouTube, Instagram Reels and LinkedIn rails. */
function NfCardView({
  image,
  title,
  tags,
  badge,
  playIcon = "play",
  onOpen,
}: {
  image: string;
  title?: string;
  tags?: readonly string[];
  badge?: string;
  playIcon?: IconName;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      className="nf-card"
      aria-label={title ? `Open ${title}` : "Open media"}
      onClick={onOpen}
    >
      {badge ? <span className="nf-badge-top">{badge}</span> : null}
      <img src={image} alt="" loading="lazy" />
      <span className="nf-play-mini">
        <Icon name={playIcon} />
      </span>
      {title ? (
        <div className="nf-card-info">
          <h4>{title}</h4>
          {tags ? (
            <div className="nf-card-tags">
              {tags.map((tag, i) => (
                <Fragment key={tag}>
                  {i > 0 ? <span className="dotsep" /> : null}
                  <span>{tag}</span>
                </Fragment>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </button>
  );
}

const fmtDuration = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

/** First line of a caption, trimmed to a card-friendly length. */
function firstLine(caption: string): string {
  const line = caption.split("\n")[0].trim();
  return line.length > 48 ? `${line.slice(0, 47)}…` : line;
}

/** Coarse "x days/weeks ago" from an ISO timestamp. */
function relTime(iso: string): string {
  if (!iso) {
    return "";
  }
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) {
    return "Today";
  }
  if (days < 7) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  }
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  }
  const months = Math.floor(days / 30);
  return months === 1 ? "1 month ago" : `${months} months ago`;
}

/** Instagram feed post card (full IG-style UI). */
function IgPostCard({ post, handle }: { post: IgFeedPost; handle: string }) {
  const { open } = useLightbox();
  return (
    <button
      type="button"
      className="nf-postcard ig"
      onClick={() => open({ kind: "instagram", url: post.url || "demo" })}
    >
      <div className="pc-head">
        <span className="pc-avatar ring">
          <img src={LOGO} alt="" />
        </span>
        <span className="pc-id">
          <b>{handle}</b>
          <span>{post.sub}</span>
        </span>
        <span className="pc-plat">
          <Icon name="instagram" />
        </span>
      </div>
      <div className="pc-media">
        <img src={post.image} alt="" loading="lazy" />
        <span className="pc-play">
          <Icon name="play" />
        </span>
      </div>
      <div className="pc-actions">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path d="M12 21s-8-5-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 6-8 11-8 11z" />
        </svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path d="M21 11.5a8.5 8.5 0 01-12 7.7L3 21l1.8-6A8.5 8.5 0 1121 11.5z" />
        </svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
        </svg>
        <svg
          className="pc-save"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
        </svg>
      </div>
      <div className="pc-body">
        <div className="pc-likes">{post.likes} likes</div>
        <div className="pc-cap">
          <b>{handle}</b> {post.caption}
        </div>
        <div className="pc-cmts">View all {post.comments} comments</div>
        <div className="pc-time">{post.time}</div>
      </div>
    </button>
  );
}

const FB_EMOJI: Record<string, string> = { like: "👍", love: "❤", care: "🤗" };

/** Facebook feed post card (full FB-style UI). */
function FbPostCard({ post }: { post: FbFeedPost }) {
  const { open } = useLightbox();
  return (
    <button
      type="button"
      className="nf-postcard fb"
      onClick={() => open({ kind: "facebook", url: post.url, fbVideo: post.video })}
    >
      <div className="pc-head">
        <span className="pc-avatar">
          <img src={LOGO} alt="" />
        </span>
        <span className="pc-id">
          <b>Venus Foundation</b>
          <span>
            {post.time} · <Icon name="circle" />
          </span>
        </span>
        <span className="pc-plat" style={{ color: "#1877f2" }}>
          <Icon name="facebook" />
        </span>
      </div>
      <div className="pc-fbtext">{post.text}</div>
      <div className="pc-media">
        <img src={post.image} alt="" loading="lazy" />
        {post.video ? (
          <span className="pc-badge">
            <Icon name="play" />
            Video
          </span>
        ) : null}
        <span className="pc-play">
          <Icon name={post.video ? "play" : "expand"} />
        </span>
      </div>
      <div className="pc-react">
        <span className="pc-emojis">
          {post.reactions.map((r) => (
            <span className={`e-${r}`} key={r}>
              {FB_EMOJI[r]}
            </span>
          ))}
        </span>
        <span>{post.count}</span>
        <span className="pc-cmtcount">{post.comments} comments</span>
      </div>
      <div className="pc-bar">
        <span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path d="M7 11v9H4a1 1 0 01-1-1v-7a1 1 0 011-1zm0 0l4-8a2 2 0 012 2v3h4.5a2 2 0 012 2.3l-1.2 6A2 2 0 0117.3 20H7" />
          </svg>
          Like
        </span>
        <span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path d="M21 11.5a8.5 8.5 0 01-12 7.7L3 21l1.8-6A8.5 8.5 0 1121 11.5z" />
          </svg>
          Comment
        </span>
        <span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M16 6l-4-4-4 4M12 2v13" />
          </svg>
          Share
        </span>
      </div>
    </button>
  );
}

export function WatchAndFollow({ videos }: { videos: YtVideo[] }) {
  const { watch } = m;
  const { open } = useLightbox();
  const { media: igMedia } = useInstagramFeed();
  const shorts = videos.filter((v) => v.short);
  const films = videos.filter((v) => !v.short);

  // Live Instagram → rail cards, falling back to the curated demo content when
  // no token is configured (or the account has no posts of that kind yet).
  const liveReels = igMedia.filter((media) => media.type === "reel");
  const livePosts = igMedia.filter((media) => media.type === "post");

  const reelCards: RailCard[] = liveReels.length
    ? liveReels.map((media, i) => ({
        image: media.image,
        title: firstLine(media.caption) || "Instagram reel",
        tags: [media.likes != null ? `Reel · ${media.likes} likes` : "Reel"],
        badge: i === 0 ? "Reel" : undefined,
        url: media.permalink,
      }))
    : [...watch.igReels];

  const postCards: IgFeedPost[] = livePosts.length
    ? livePosts.map((media) => ({
        image: media.image,
        sub: "", // API has no location; the timestamp shows at the card foot
        likes: media.likes ?? 0,
        caption: media.caption,
        comments: media.comments ?? 0,
        time: relTime(media.timestamp),
        url: media.permalink,
      }))
    : [...watch.igPosts];

  const ytCard = (v: YtVideo) => (
    <NfCardView
      key={v.id}
      image={v.thumb}
      title={v.title}
      tags={[v.short ? "Short" : "Film", fmtDuration(v.seconds)]}
      onOpen={() => open({ kind: "youtube", id: v.id, short: v.short })}
    />
  );

  return (
    <section className="pad nf-surface grain" id="watch">
      <div className="wrap">
        <div className="nf-intro">
          <div className="chan-intro">
            <Eyebrow onDark>{watch.eyebrow}</Eyebrow>
            <SplitText as="h2" className="h1" text={watch.title} />
          </div>
        </div>
      </div>

      {shorts.length > 0 ? (
        <Rail
          plat="yt"
          icon="youtube"
          title="YouTube Shorts"
          exploreHref={watch.channels.youtube}
          exploreLabel="Open YouTube ›"
          railClass="tall"
        >
          {shorts.map(ytCard)}
        </Rail>
      ) : null}

      {films.length > 0 ? (
        <Rail
          plat="yt"
          icon="youtube"
          title="YouTube Videos"
          exploreHref={watch.channels.youtube}
          exploreLabel="Open YouTube ›"
        >
          {films.map(ytCard)}
        </Rail>
      ) : null}

      {videos.length === 0 ? (
        <div className="wrap">
          <p style={{ color: "#b3aa99", marginTop: 8 }}>Connect the channel to load videos.</p>
        </div>
      ) : null}

      <Rail
        plat="ig"
        icon="instagram"
        title="Instagram Reels"
        exploreHref={watch.channels.instagram}
        exploreLabel="Open Instagram ›"
        railClass="tall"
      >
        {reelCards.map((card, i) => (
          <NfCardView
            key={card.url || `reel-${i}`}
            image={card.image}
            title={card.title}
            tags={card.tags}
            badge={card.badge}
            onOpen={() => open({ kind: "instagram", url: card.url || "demo" })}
          />
        ))}
      </Rail>

      <Rail
        plat="ig"
        icon="instagram"
        title="Instagram Posts"
        exploreHref={watch.channels.instagram}
        exploreLabel="Open Instagram ›"
        railClass="feed"
      >
        {postCards.map((post, i) => (
          <IgPostCard
            key={post.url && post.url !== "demo" ? post.url : `post-${i}`}
            post={post}
            handle={watch.handle}
          />
        ))}
      </Rail>

      <Rail
        plat="fb"
        icon="facebook"
        title="Facebook"
        exploreHref={watch.channels.facebook}
        exploreLabel="Open Facebook ›"
        railClass="feed"
      >
        {watch.fbPosts.map((post) => (
          <FbPostCard key={post.text} post={post} />
        ))}
      </Rail>

      <Rail
        plat="li"
        icon="linkedin"
        title="LinkedIn"
        exploreHref={watch.channels.linkedin}
        exploreLabel="Open LinkedIn ›"
      >
        {watch.liCards.map((card: RailCard) => (
          <NfCardView
            key={card.title}
            image={card.image}
            title={card.title}
            tags={card.tags}
            playIcon="expand"
            onOpen={() => open({ kind: "linkedin", url: "demo" })}
          />
        ))}
      </Rail>
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

const PROFILE = {
  youtube: m.watch.channels.youtube,
  instagram: m.watch.channels.instagram,
  facebook: m.watch.channels.facebook,
  linkedin: m.watch.channels.linkedin,
} as const;

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
   SCROLL-SCRUBBED SEQUENCE
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
