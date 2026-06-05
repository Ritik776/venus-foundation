import { useEffect, useState } from "react";

export interface YtVideo {
  id: string;
  title: string;
  thumb: string;
  seconds: number;
  short: boolean;
}

/**
 * Live channel videos from the `/api/videos` serverless endpoint (which reads
 * the channel server-side using YOUTUBE_API_KEY). No snapshot, no fallback:
 * if the key isn't configured the endpoint returns nothing and the page shows
 * no videos. New uploads appear automatically on the next load — no rebuild.
 */
export function useYouTubeVideos(): { videos: YtVideo[]; loading: boolean } {
  const [videos, setVideos] = useState<YtVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/videos")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled) {
          return;
        }
        const list = data?.videos;
        if (Array.isArray(list)) {
          setVideos(list as YtVideo[]);
        }
      })
      .catch(() => {
        /* no key / endpoint unavailable → stays empty */
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

  return { videos, loading };
}
