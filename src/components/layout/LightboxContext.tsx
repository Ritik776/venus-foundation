import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { Icon, type IconName } from "@/components/primitives/Icon";
import { youtubeId } from "@/lib/youtube";

/** A piece of media the lightbox can play/embed. */
export type LightboxMedia =
  | { kind: "youtube"; id: string; short?: boolean }
  | { kind: "instagram"; url: string }
  | { kind: "facebook"; url: string; fbVideo?: boolean }
  | { kind: "linkedin"; url: string };

interface LightboxContextValue {
  open: (media: LightboxMedia) => void;
}

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function useLightbox(): LightboxContextValue {
  const ctx = useContext(LightboxContext);
  if (!ctx) {
    throw new Error("useLightbox must be used within <LightboxProvider>");
  }
  return ctx;
}

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [media, setMedia] = useState<LightboxMedia | null>(null);

  const open = useCallback((next: LightboxMedia) => {
    setMedia(next);
    document.body.style.overflow = "hidden";
  }, []);

  const close = useCallback(() => {
    setMedia(null);
    document.body.style.overflow = "";
  }, []);

  const value = useMemo<LightboxContextValue>(() => ({ open }), [open]);

  return (
    <LightboxContext.Provider value={value}>
      {children}
      <Lightbox media={media} onClose={close} />
    </LightboxContext.Provider>
  );
}

const PROFILE: Record<string, { label: string; icon: IconName; url: string }> = {
  instagram: {
    label: "Instagram",
    icon: "instagram",
    url: "https://www.instagram.com/venus.foundation",
  },
  facebook: {
    label: "Facebook",
    icon: "facebook",
    url: "https://www.facebook.com/foundationvenus/",
  },
  linkedin: {
    label: "LinkedIn",
    icon: "linkedin",
    url: "https://www.linkedin.com/company/foundationvenus/",
  },
};

/** Sizing class for the lightbox frame based on the media kind. */
function sizeClass(media: LightboxMedia): string {
  if (media.kind === "youtube") {
    return media.short ? "lb-short" : "";
  }
  if (media.kind === "facebook" && media.fbVideo) {
    return "lb-wide";
  }
  return "lb-portrait";
}

function isDemo(media: LightboxMedia): boolean {
  if (media.kind === "youtube") {
    return !media.id || media.id === "demo";
  }
  return !media.url || media.url === "demo";
}

function Placeholder({ media }: { media: LightboxMedia }) {
  if (media.kind === "youtube") {
    return (
      <div className="lb-placeholder">
        <div className="lb-ph-play">
          <Icon name="play" />
        </div>
        <h3>Film coming soon</h3>
        <p>Connect your Venus Foundation YouTube link here to play it inline.</p>
        <a
          href="https://www.youtube.com/@FoundationVenus"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit our YouTube channel →
        </a>
      </div>
    );
  }
  const p = PROFILE[media.kind];
  return (
    <div className="lb-placeholder">
      <div className="lb-ph-play">
        <Icon name={p.icon} />
      </div>
      <h3>{p.label} post</h3>
      <p>Paste this post's link in the content to play it right here on the page.</p>
      <a href={p.url} target="_blank" rel="noopener noreferrer">
        Open our {p.label} →
      </a>
    </div>
  );
}

function Embed({ media }: { media: LightboxMedia }) {
  switch (media.kind) {
    case "youtube":
      return (
        <iframe
          title="Venus Foundation video"
          src={`https://www.youtube.com/embed/${youtubeId(media.id)}?autoplay=1&rel=0&playsinline=1`}
          allow="autoplay; fullscreen; encrypted-media"
          allowFullScreen
        />
      );
    case "instagram":
      return (
        <iframe
          title="Instagram post"
          src={`${media.url.replace(/\/?$/, "/")}embed`}
          scrolling="no"
          allowFullScreen
        />
      );
    case "facebook": {
      const plugin = media.fbVideo ? "video.php" : "post.php";
      return (
        <iframe
          title="Facebook post"
          src={`https://www.facebook.com/plugins/${plugin}?href=${encodeURIComponent(media.url)}&show_text=true&width=500`}
          scrolling={media.fbVideo ? "no" : "yes"}
          allow="autoplay; encrypted-media; clipboard-write; picture-in-picture"
          allowFullScreen
        />
      );
    }
    case "linkedin":
      return <iframe title="LinkedIn post" src={media.url} allowFullScreen />;
    default:
      return null;
  }
}

interface LightboxProps {
  media: LightboxMedia | null;
  onClose: () => void;
}

function Lightbox({ media, onClose }: LightboxProps) {
  const isOpen = media !== null;
  const classes = ["lightbox", isOpen ? "open" : null, media ? sizeClass(media) : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classes}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Media player"
      aria-hidden={!isOpen}
    >
      <button type="button" className="lb-close" aria-label="Close" onClick={onClose}>
        &times;
      </button>
      <div className="lb-frame">
        {media ? isDemo(media) ? <Placeholder media={media} /> : <Embed media={media} /> : null}
      </div>
    </div>
  );
}
