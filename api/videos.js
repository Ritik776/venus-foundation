/**
 * Serverless endpoint: GET /api/videos
 * Fetches the Venus Foundation YouTube channel server-side (key hidden) and
 * returns the video list as JSON, cached on the CDN so it's fast and uses
 * almost no API quota regardless of traffic. The site fetches this at runtime,
 * so new uploads appear with no rebuild — like a headless CMS.
 *
 * Set YOUTUBE_API_KEY in the host's environment variables (server-side secret).
 */
const API = "https://www.googleapis.com/youtube/v3";
const CHANNEL_ID = "UCoybgRV1udX2-d3jjuuigMw";
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

async function fetchAll(key) {
  const uploads = `UU${CHANNEL_ID.slice(2)}`;
  const items = [];
  let pageToken = "";
  do {
    const page = await getJson(
      "playlistItems",
      { part: "snippet,contentDetails", playlistId: uploads, maxResults: "50", ...(pageToken ? { pageToken } : {}) },
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
    const ids = items.slice(i, i + 50).map((v) => v.id).join(",");
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

export default async function handler(_req, res) {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) {
    res.status(500).json({ error: "YOUTUBE_API_KEY not configured" });
    return;
  }
  try {
    const videos = await fetchAll(key);
    // Fresh for 6h; serve stale up to a day while revalidating in the background.
    res.setHeader("Cache-Control", "public, s-maxage=21600, stale-while-revalidate=86400");
    res.status(200).json({ videos });
  } catch (err) {
    res.status(502).json({ error: String(err.message || err) });
  }
}
