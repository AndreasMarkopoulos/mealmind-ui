export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt'
    ],
    app: {
        head: {
            title: "Top-tipster",
            script: [
            ]
        }
    }
})