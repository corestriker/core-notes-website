// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://core-notes.de",
  build: {
    // Keine Inline-Styles, damit die Content-Security-Policy ohne 'unsafe-inline' auskommt.
    inlineStylesheets: "never",
  },
});
