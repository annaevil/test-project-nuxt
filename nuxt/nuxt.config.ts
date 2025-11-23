import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  srcDir: 'app',
  css: ['normalize.css', 'assets/scss/style.scss'],
  alias: {
    '@': '/workspase/app',
    '@server': '/workspase/server',
  },
  pages: true,
  typescript: {
    typeCheck: true,
  },
})
