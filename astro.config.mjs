import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import metaTextmateGrammar from "./schemas/meta.textmate.json";
import mlispTextmateGemmar from "./schemas/mlisp.tmLanguage.json";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";
import { remarkWikiLink } from '@portaljs/remark-wiki-link';
import pageInsight from "astro-page-insight";
import remarkCodeTabs from "./src/lib/remarkTabs"
import mdx from "@astrojs/mdx";
const pageUrlPathPrefix = "docs/";


// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), tailwind(), pageInsight(), mdx()],
  site: "https://meta-lang.com",
  output: "server",
  markdown: {
    remarkPlugins: [[remarkWikiLink, {
      pathFormat: "obsidian-absolute",
      wikiLinkResolver: slug => {
        pageUrlPathPrefix + slug;
      }
    }],remarkCodeTabs],
    shikiConfig: {
      langs: [metaTextmateGrammar, mlispTextmateGemmar, "js", "python", "asm", "cpp", "c", "lisp", "json"]
    }
  },
  base: "/",
  compressHTML: true,
  trailingSlash: "never",
  adapter: node({
    mode: "middleware"
  })
});