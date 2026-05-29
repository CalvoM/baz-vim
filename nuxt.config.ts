// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['nuxt-codemirror', '@pinia/nuxt'],
  vite: {
    optimizeDeps: {
      include: [
         '@codemirror/autocomplete',
        '@codemirror/commands',
        '@codemirror/lang-javascript',
        '@codemirror/lang-python',
        '@codemirror/language',
        '@codemirror/lint',
        '@codemirror/search',
        '@codemirror/state',
        '@codemirror/theme-one-dark',
        '@lezer/highlight',
        '@codemirror/view',
        '@replit/codemirror-vim',
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ]
    }
  }
})