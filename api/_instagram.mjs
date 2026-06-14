/**
 * Shared Instagram fetch used by both the Vercel serverless function
 * (api/instagram.js) and the Vite dev middleware. Underscore prefix => Vercel
 * does not expose this file as an endpoint.
 *
 * Uses the Instagram Graph API ("Instagram API with Instagram Login"):
 *   GET https://graph.instagram.com/v21.0/me/media
 * authenticated with a long-lived Instagram User access token (server-side
 * only). The token resolves the account itself via `me`, so no user id needed.
 *
 * Requires an Instagram Business/Creator account + a Meta app. The long-lived
 * token is valid ~60 days; call refreshInstagramToken() within the window to
 * extend it another 60 days.
 */
const BASE = "https://graph.instagram.com";
const API = `${BASE}/v21.0`;

const FIELDS = [
  "id",
  "caption",
  "media_type", // IMAGE | VIDEO | CAROUSEL_ALBUM
  "media_product_type", // FEED | REELS | STORY | AD
  "media_url",
  "thumbnail_url",
  "permalink",
  "timestamp",
  "like_count",
  "comments_count",
  "children{media_url,media_type}",
].join(",");

/** Best display image: videos/reels expose a poster via thumbnail_url. */
function pickImage(item) {
  if (item.thumbnail_url) {
    return item.thumbnail_url;
  }
  if (item.media_url) {
    return item.media_url;
  }
  const child = item.children?.data?.find((c) => c.media_url);
  return child?.media_url || "";
}

export async function fetchInstagramMedia(token, limit = 24) {
  const url = new URL(`${API}/me/media`);
  url.searchParams.set("fields", FIELDS);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("access_token", token);

  const res = await fetch(url);
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error?.message || `instagram ${res.status}`);
  }

  return (json.data || [])
    .map((it) => {
      const isReel = it.media_product_type === "REELS";
      return {
        id: it.id,
        type: isReel ? "reel" : "post",
        image: pickImage(it),
        caption: (it.caption || "").trim(),
        permalink: it.permalink || "",
        likes: typeof it.like_count === "number" ? it.like_count : null,
        comments: typeof it.comments_count === "number" ? it.comments_count : null,
        timestamp: it.timestamp || "",
        isVideo: it.media_type === "VIDEO" || isReel,
      };
    })
    .filter((media) => media.image);
}

/**
 * Refresh a long-lived Instagram token (extends validity another 60 days).
 * Returns { access_token, token_type, expires_in }. Persisting the new token
 * is the caller's job (update the host env var).
 */
export async function refreshInstagramToken(token) {
  const url = new URL(`${BASE}/refresh_access_token`);
  url.searchParams.set("grant_type", "ig_refresh_token");
  url.searchParams.set("access_token", token);
  const res = await fetch(url);
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error?.message || `refresh ${res.status}`);
  }
  return json;
}
