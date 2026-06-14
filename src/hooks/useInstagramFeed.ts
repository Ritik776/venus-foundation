import { useEffect, useState } from "react";

export interface IgMedia {
  id: string;
  type: "reel" | "post";
  image: string;
  caption: string;
  permalink: string;
  likes: number | null;
  comments: number | null;
  timestamp: string;
  isVideo: boolean;
}

/**
 * Live Instagram feed from the `/api/instagram` serverless endpoint (which
 * reads the account server-side using IG_ACCESS_TOKEN). If the token isn't
 * configured the endpoint returns nothing and the Media page falls back to the
 * curated demo cards. New posts appear automatically on the next load — no
 * rebuild.
 */
export function useInstagramFeed(): { media: IgMedia[]; loading: boolean } {
  const [media, setMedia] = useState<IgMedia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/instagram")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled) {
          return;
        }
        const list = data?.media;
        if (Array.isArray(list)) {
          setMedia(list as IgMedia[]);
        }
      })
      .catch(() => {
        /* no token / endpoint unavailable → stays empty, demo cards show */
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { media, loading };
}
