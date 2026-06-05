import { useEffect, useState } from "react";
import { type YtVideo, youtubeVideos } from "@/content/generated/youtube";
import { fetchChannelVideos } from "@/lib/youtubeChannel";

/** Venus Foundation channel id (public). */
const CHANNEL_ID = "UCoybgRV1udX2-d3jjuuigMw";
const CACHE_KEY = "vf-yt-videos";
const TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

interface Cache {
  t: number;
  v: YtVideo[];
}

/**
 * Returns the channel's videos. Starts from the committed snapshot, then — if
 * `VITE_YOUTUBE_API_KEY` is set — refreshes live from the YouTube API (cached
 * in localStorage for 6h). Falls back silently to the snapshot on any failure.
 */
export function useYouTubeVideos(): YtVideo[] {
  const [videos, setVideos] = useState<YtVideo[]>(youtubeVideos);

  useEffect(() => {
    const key = import.meta.env.VITE_YOUTUBE_API_KEY;
    if (!key) {
      return;
    }

    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const cache = JSON.parse(raw) as Cache;
        if (Date.now() - cache.t < TTL_MS && Array.isArray(cache.v) && cache.v.length) {
          setVideos(cache.v);
          return;
        }
      }
    } catch {
      /* ignore cache errors */
    }

    let cancelled = false;
    fetchChannelVideos(key, CHANNEL_ID)
      .then((fresh) => {
        if (cancelled || fresh.length === 0) {
          return;
        }
        setVideos(fresh);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), v: fresh }));
        } catch {
          /* ignore quota errors */
        }
      })
      .catch(() => {
        /* keep snapshot on failure */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return videos;
}
