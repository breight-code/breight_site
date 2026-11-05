import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://breight-code.it",
  trailingSlash: "always",
  integrations: [
    react(),
    sitemap({ i18n: { defaultLocale: "it", locales: { it: "it-IT", en: "en-US" } } }),
  ],
});
