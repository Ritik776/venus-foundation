/**
 * Extract the 11-character YouTube video id from any common URL form
 * (watch?v=, youtu.be/, /shorts/, /embed/) or return a bare id unchanged.
 * Shorts are ordinary videos, so the id embeds inline like any other.
 */
export function youtubeId(input: string): string {
  if (!input) {
    return "";
  }
  if (/^[\w-]{11}$/.test(input)) {
    return input;
  }
  const patterns = [
    /[?&]v=([\w-]{11})/,
    /youtu\.be\/([\w-]{11})/,
    /\/shorts\/([\w-]{11})/,
    /\/embed\/([\w-]{11})/,
  ];
  for (const re of patterns) {
    const match = input.match(re);
    if (match) {
      return match[1];
    }
  }
  return input;
}

/** Public thumbnail for a video/short id (no API needed). */
export function youtubeThumb(id: string): string {
  return `https://i.ytimg.com/vi/${youtubeId(id)}/hqdefault.jpg`;
}
