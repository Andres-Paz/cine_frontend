// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules:[
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  devServer: {
    port: 3001,
  },
  postcss: {
    plugins: {
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },

  compatibilityDate: '2025-04-23'
})