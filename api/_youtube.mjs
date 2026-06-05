/**
 * Shared YouTube channel fetch used by both the Vercel serverless function
 * (api/videos.js) and the Vite dev middleware. Underscore prefix => Vercel does
 * not expose this as an endpoint.
 */
const API = "https://www.googleapis.com/youtube/v3";
export const DEFAULT_CHANNEL_ID = "UCoybgRV1udX2-d3jjuuigMw";
const SHORT_MAX_SECONDS = 180;

function isoToSeconds(iso) {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) {
    return 0;
  }
  return Number(m[1] || 0) * 3600 + Number(m[2] || 0) * 60 + Number(m[3] || 0);
}

async function getJson(path, params, key) {
  const url = new URL(`${API}/${path}`);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }
  url.searchParams.set("key", key);
  const res = await fetch(url);
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error?.message || `${path} ${res.status}`);
  }
  return json;
}

export async function fetchChannelVideos(key, channelId = DEFAULT_CHANNEL_ID) {
  const uploads = `UU${channelId.slice(2)}`;
  const items = [];
  let pageToken = "";
  do {
    const page = await getJson(
      "playlistItems",
      {
        part: "snippet,contentDetails",
        playlistId: uploads,
        maxResults: "50",
        ...(pageToken ? { pageToken } : {}),
      },
      key,
    );
    for (const it of page.items) {
      items.push({ id: it.contentDetails.videoId, title: it.snippet.title.trim() });
    }
    pageToken = page.nextPageToken || "";
  } while (pageToken);

  const titleById = new Map(items.map((v) => [v.id, v.title]));
  const out = [];
  for (let i = 0; i < items.length; i += 50) {
    const ids = items
      .slice(i, i + 50)
      .map((v) => v.id)
      .join(",");
    const det = await getJson("videos", { part: "contentDetails", id: ids }, key);
    for (const v of det.items) {
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
