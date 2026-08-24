import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({ pages: "dist", assets: "dist" }),
    csp: {
      mode: "auto",
      directives: {
        "default-src": ["self"],
        "script-src": ["self"],
        "style-src": ["self"],
        "img-src": ["self", "data:"],
        "connect-src": ["self", "ws://127.0.0.1:*"],
        "object-src": ["none"],
        "base-uri": ["self"],
      },
    },
    files: { assets: "public" },
    paths: { relative: true },
  },
};
