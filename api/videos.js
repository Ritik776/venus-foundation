/**
 * Serverless endpoint: GET /api/videos
 * Fetches the YouTube channel server-side (key hidden), CDN-cached. The site
 * fetches this at runtime, so new uploads appear with no rebuild.
 * Set YOUTUBE_API_KEY (and optionally YOUTUBE_CHANNEL_ID) in the host's env.
 */
import { DEFAULT_CHANNEL_ID, fetchChannelVideos } from "./_youtube.mjs";

export default async function handler(_req, res) {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) {
    res.status(500).json({ error: "YOUTUBE_API_KEY not configured" });
    return;
  }
  try {
    const videos = await fetchChannelVideos(key, process.env.YOUTUBE_CHANNEL_ID || DEFAULT_CHANNEL_ID);
    res.setHeader("Cache-Control", "public, s-maxage=21600, stale-while-revalidate=86400");
    res.status(200).json({ videos });
  } catch (err) {
    res.status(502).json({ error: String(err.message || err) });
  }
}
