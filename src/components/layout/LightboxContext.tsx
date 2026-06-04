import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from "react";

interface LightboxContextValue {
  /** Open the video lightbox. Pass a YouTube id, or "demo" for the placeholder. */
  open: (videoId: string) => void;
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
  const [videoId, setVideoId] = useState<string | null>(null);

  const open = useCallback((id: string) => {
    setVideoId(id);
    document.body.style.overflow = "hidden";
  }, []);

  const close = useCallback(() => {
    setVideoId(null);
    document.body.style.overflow = "";
  }, []);

  const value = useMemo<LightboxContextValue>(() => ({ open }), [open]);

  return (
    <LightboxContext.Provider value={value}>
      {children}
      <Lightbox videoId={videoId} onClose={close} />
    </LightboxContext.Provider>
  );
}

interface LightboxProps {
  videoId: string | null;
  onClose: () => void;
}

function Lightbox({ videoId, onClose }: LightboxProps) {
  const isOpen = videoId !== null;
  const isPlaceholder = !videoId || videoId === "demo";

  return (
    <div
      className={`lightbox${isOpen ? " open" : ""}`}
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
      aria-label="Video player"
      aria-hidden={!isOpen}
    >
      <button type="button" className="lb-close" aria-label="Close" onClick={onClose}>
        &times;
      </button>
      <div className="lb-frame">
        {isOpen &&
          (isPlaceholder ? (
            <div className="lb-placeholder">
              <div className="lb-ph-play">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
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
          ) : (
            <iframe
              title="Venus Foundation film"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              allow="autoplay; fullscreen; encrypted-media"
              allowFullScreen
            />
          ))}
      </div>
    </div>
  );
}
