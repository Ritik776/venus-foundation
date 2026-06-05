import { useEffect, useState } from "react";
import { type YtVideo, youtubeVideos } from "@/content/generated/youtube";

const CACHE_KEY = "vf-yt-videos";

function readCache(): YtVideo[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) {
        return parsed as YtVideo[];
      }
    }
  } catch {
    /* ignore */
  }
  return null;
}

/**
 * Channel videos with headless-CMS-style behaviour: shows the cached/snapshot
 * list instantly, then revalidates from `/api/videos` (a serverless endpoint
 * that fetches YouTube server-side and is CDN-cached). New uploads appear with
 * no rebuild. Falls back to the committed snapshot when the endpoint is absent
 * (e.g. local `vite dev`) or fails.
 */
export function useYouTubeVideos(): YtVideo[] {
  const [videos, setVideos] = useState<YtVideo[]>(() => readCache() ?? youtubeVideos);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/videos")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const fresh = data?.videos;
        if (cancelled || !Array.isArray(fresh) || fresh.length === 0) {
          return;
        }
        setVideos(fresh);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(fresh));
        } catch {
          /* ignore quota */
        }
      })
      .catch(() => {
        /* keep snapshot */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return videos;
}
