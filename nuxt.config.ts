// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  linkChecker: { enabled: false },
  sitemap: {
    exclude: [
      "/games/allgames",
      "/en/games/allgames",
      "/misc/allitems",
      "/en/misc/allitems",
    ],
  },
  site: {
    url: "https://oldpersiangames.org",
    name: "Old Persian Games",
    description: "بایگانی و آرشیو بازی های ویدئویی فارسی",
    defaultLocale: "fa",
    identity: {
      type: "Organization",
    },
  },
  image: {
    domains: ["localhost:8000", "backend.oldpersiangames.org"],
  },
  extends: ["@nuxt/ui-pro"],
  modules: ["@nuxt/ui", "@nuxt/image", "@nuxtjs/i18n", "@nuxtjs/seo",
    "@nuxt/content", "@nuxt/fonts"],
  i18n: {
    detectBrowserLanguage: false,
    strategy: "prefix_except_default",
    defaultLocale: "fa",
    locales: [
      {
        code: "fa",
        name: "فارسی",
        dir: "rtl",
        iso: "fa-IR",
      },
      {
        code: "en",
        name: "English",
        dir: "ltr",
        iso: "en-US",
      },
    ],
  },
  ui: {
    icons: ["simple-icons", "emojione", "iconoir"],
  },
});