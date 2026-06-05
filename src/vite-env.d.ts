/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Optional YouTube Data API key for LIVE fetching of the channel on the
   * client. When set, the media page auto-syncs new uploads; when absent, it
   * uses the committed snapshot (refreshed via `npm run sync:shorts`).
   * NOTE: this is bundled into client JS — restrict it by HTTP referrer.
   */
  readonly VITE_YOUTUBE_API_KEY?: string;
}
