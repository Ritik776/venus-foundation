/**
 * Serverless endpoint: GET /api/instagram
 * Fetches the Instagram feed server-side (token hidden), CDN-cached. The site
 * fetches this at runtime, so new posts/reels appear with no rebuild.
 * Set IG_ACCESS_TOKEN (long-lived Instagram User token) in the host's env.
 *
 * Without it, the Media page falls back to the curated demo cards.
 */
import { fetchInstagramMedia } from "./_instagram.mjs";

export default async function handler(_req, res) {
  const token = process.env.IG_ACCESS_TOKEN;
  if (!token) {
    res.status(500).json({ error: "IG_ACCESS_TOKEN not configured" });
    return;
  }
  try {
    const media = await fetchInstagramMedia(token);
    res.setHeader("Cache-Control", "public, s-maxage=21600, stale-while-revalidate=86400");
    res.status(200).json({ media });
  } catch (err) {
    res.status(502).json({ error: String(err.message || err) });
  }
}
