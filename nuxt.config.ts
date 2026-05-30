// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["nuxt-codemirror", "@pinia/nuxt", "@nuxt/eslint"],
  devtools: { enabled: true },
  compatibilityDate: "2025-07-15",
  vite: {
    optimizeDeps: {
      include: [
        "@codemirror/autocomplete",
        "@codemirror/commands",
        "@codemirror/lang-javascript",
        "@codemirror/lang-python",
        "@codemirror/language",
        "@codemirror/lint",
        "@codemirror/search",
        "@codemirror/state",
        "@codemirror/theme-one-dark",
        "@lezer/highlight",
        "@codemirror/view",
        "@replit/codemirror-vim",
        "@vue/devtools-core",
        "@vue/devtools-kit",
      ],
    },
  },
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        semi: true,
        quotes: "double",
        commaDangle: "always-multiline",
      },
    },
  },
});
