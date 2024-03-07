import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import metaTextmateGrammar from "./schemas/meta.textmate.json";
import tailwind from "@astrojs/tailwind";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), tailwind()],
  site: "https://meta-lang.com",
  output: "server",
  markdown: {
    shikiConfig: {
      langs: [metaTextmateGrammar]
    }
  },
	base: "/",
	compressHTML: true,
	trailingSlash: "never",
  adapter: node({
    mode: "middleware"
  })
});