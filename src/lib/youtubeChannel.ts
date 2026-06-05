import type { YtVideo } from "@/content/generated/youtube";

/** Live YouTube Data API fetch (browser-side) for the channel's videos. */
const API = "https://www.googleapis.com/youtube/v3";
const SHORT_MAX_SECONDS = 180;

function isoToSeconds(iso: string): number {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) {
    return 0;
  }
  return Number(m[1] || 0) * 3600 + Number(m[2] || 0) * 60 + Number(m[3] || 0);
}

interface PlaylistItem {
  contentDetails: { videoId: string };
  snippet: { title: string };
}
interface VideoDetail {
  id: string;
  contentDetails: { duration: string };
}

/**
 * Fetch every uploaded video for `channelId` and classify Shorts by duration.
 * The uploads playlist id is the channel id with the `UC` prefix swapped to `UU`.
 */
export async function fetchChannelVideos(apiKey: string, channelId: string): Promise<YtVideo[]> {
  const uploads = `UU${channelId.slice(2)}`;
  const items: { id: string; title: string }[] = [];
  let pageToken = "";

  do {
    const url = new URL(`${API}/playlistItems`);
    url.searchParams.set("part", "snippet,contentDetails");
    url.searchParams.set("playlistId", uploads);
    url.searchParams.set("maxResults", "50");
    url.searchParams.set("key", apiKey);
    if (pageToken) {
      url.searchParams.set("pageToken", pageToken);
    }
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`playlistItems ${res.status}`);
    }
    const json = await res.json();
    for (const it of json.items as PlaylistItem[]) {
      items.push({ id: it.contentDetails.videoId, title: it.snippet.title.trim() });
    }
    pageToken = json.nextPageToken || "";
  } while (pageToken);

  const titleById = new Map(items.map((v) => [v.id, v.title]));
  const out: YtVideo[] = [];
  for (let i = 0; i < items.length; i += 50) {
    const batch = items.slice(i, i + 50).map((v) => v.id);
    const url = new URL(`${API}/videos`);
    url.searchParams.set("part", "contentDetails");
    url.searchParams.set("id", batch.join(","));
    url.searchParams.set("key", apiKey);
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`videos ${res.status}`);
    }
    const json = await res.json();
    for (const v of json.items as VideoDetail[]) {
      const seconds = isoToSeconds(v.contentDetails.duration);
      out.push({
        id: v.id,
        title: titleById.get(v.id) || "",
        thumb: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
        seconds,
        short: seconds > 0 && seconds <= SHORT_MAX_SECONDS,
      });
    }
  }
  return out;
}
