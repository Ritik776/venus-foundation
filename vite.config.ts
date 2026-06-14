import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv, type Plugin } from "vite";

/**
 * Dev-only: serve GET /api/videos locally (mirrors the Vercel function) so the
 * live YouTube fetch works under `npm run dev`. Reads YOUTUBE_API_KEY from .env.
 */
function devYouTubeApi(env: Record<string, string>): Plugin {
  return {
    name: "dev-youtube-api",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/api/videos", async (_req, res) => {
        res.setHeader("Content-Type", "application/json");
        const key = env.YOUTUBE_API_KEY;
        if (!key) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: "YOUTUBE_API_KEY not configured in .env" }));
          return;
        }
        try {
          const helper = new URL("./api/_youtube.mjs", import.meta.url).href;
          const { fetchChannelVideos, DEFAULT_CHANNEL_ID } = await import(helper);
          const videos = await fetchChannelVideos(key, env.YOUTUBE_CHANNEL_ID || DEFAULT_CHANNEL_ID);
          res.end(JSON.stringify({ videos }));
        } catch (err) {
          res.statusCode = 502;
          res.end(JSON.stringify({ error: String((err as Error).message || err) }));
        }
      });
    },
  };
}

/**
 * Dev-only: serve GET /api/instagram locally (mirrors the Vercel function) so
 * the live Instagram fetch works under `npm run dev`. Reads IG_ACCESS_TOKEN
 * from .env.
 */
function devInstagramApi(env: Record<string, string>): Plugin {
  return {
    name: "dev-instagram-api",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/api/instagram", async (_req, res) => {
        res.setHeader("Content-Type", "application/json");
        const token = env.IG_ACCESS_TOKEN;
        if (!token) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: "IG_ACCESS_TOKEN not configured in .env" }));
          return;
        }
        try {
          const helper = new URL("./api/_instagram.mjs", import.meta.url).href;
          const { fetchInstagramMedia } = await import(helper);
          const media = await fetchInstagramMedia(token);
          res.end(JSON.stringify({ media }));
        } catch (err) {
          res.statusCode = 502;
          res.end(JSON.stringify({ error: String((err as Error).message || err) }));
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), tailwindcss(), devYouTubeApi(env), devInstagramApi(env)],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      target: "es2020",
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom", "react-router-dom"],
          },
        },
      },
    },
  };
});
