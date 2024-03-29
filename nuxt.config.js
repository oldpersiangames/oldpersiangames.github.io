// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  linkChecker: { enabled: false },
  ogImage: { enabled: false },
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
    trailingSlash: true,
    identity: {
      type: "Organization",
    },
  },
  runtimeConfig: {
    public: {
      trailingSlash: true,
    },
  },
  image: {
    domains: ["backend.oldpersiangames.org"],
    alias: {
      gamePhotos: "https://backend.oldpersiangames.org/storage/gamePhotos",
      "item-photos": "https://backend.oldpersiangames.org/storage/item-photos",
    },
  },
  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@nuxtjs/seo",
    "@nuxt/content",
  ],
  colorMode: { classSuffix: "" },
  content: {
    // https://content.nuxtjs.org/api/configuration
  },
  ui: {
    icons: ["emojione", "logos"],
  },
  i18n: {
    vueI18n: "./i18n.config.ts", // if you are using custom path, default
    detectBrowserLanguage: false,
    locales: [
      {
        code: "fa",
        iso: "fa-IR",
        dir: "rtl",
        icon: "i-emojione-flag-for-iran",
        name: "فارسی",
      },
      {
        code: "en",
        iso: "en-US",
        dir: "ltr",
        icon: "i-emojione-flag-for-united-states",
        name: "English",
      },
    ],
    trailingSlash: true,
    strategy: "prefix_except_default",
    defaultLocale: "fa",
    defaultDirection: "rtl",
  },
  css: ["vazirmatn/Vazirmatn-font-face.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      "postcss-rtlcss": {},
    },
  },
});
