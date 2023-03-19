export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt'
    ],
    app: {
        head: {
            title: "MealMind",
            script: [
            ],
            link: [
                {
                    rel:'stylesheet',
                    href:'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap'
                }
            ]
        }
    }
})