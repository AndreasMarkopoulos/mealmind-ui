<template>
  <div id="meal-plan" class="block overflow-hidden max-w-4xl mx-auto my-10 px-6 pt-10 pb-0 border border-gray-200 rounded-lg bg-glass shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h1 class="text-engraved text-2xl text-center font-semibold">Healthy Eating Made Easy with Personalized Meal Plans</h1>
    <p class="pt-10 leading-7">Welcome to MealMind, the personalized meal planning service powered by advanced AI technology. Our intelligent algorithms take into account your bodyweight, height, age, activity level, and dietary restrictions to create a customized meal plan that's tailored specifically to your needs. Our AI-generated meal plans are not only informed, but they're also designed to make healthy eating easy and convenient. With our service, you'll have everything you need to eat delicious, nutritious meals that fuel your body and make you feel your best. Sign up now and experience the power of AI for healthy eating!</p>
    <nuxt-link to="/generate-mealplan" class="ml- relative top-10 text-white bg-[#7E3AF2] hover:bg-[#662EC6] focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Get a free weekly meal plan!</nuxt-link>
    <img style="width: 40rem;transform: translate(28%,23%) rotate(-25deg)" src="../assets/images/mealplan_screenshot1.png" alt="">
  </div>
  <div id="meal-plan" class="block overflow-hidden max-w-4xl mx-auto my-5 p-6 border border-gray-200 rounded-lg bg-glass shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h1 class="text-engraved text-xl text-center font-semibold">AI-Powered Meal Plans Tailored to You</h1>
    <p class="pt-5 leading-7">Our AI-powered meal plan generator creates custom meal plans tailored to your unique body type, health goals, and dietary preferences. Our advanced algorithms analyze your input and generate meal plans that are both delicious and optimized for your specific needs. Our users have seen significant results in achieving their health goals, from weight loss to muscle gain and improved overall well-being.</p>
    <img style="" class="object rounded-lg mt-5 w-full opacity-80" src="../assets/images/personalization_image.png" alt="">
    <div class="border-t shadow-purple-100 shadow"></div>
    <h1 class="text-engraved text-xl mt-10 text-center font-semibold">Automated Shopping List for Easy Meal Prep</h1>
    <p class="pt-5 leading-7">Our automated shopping list feature generates a list of ingredients needed to prepare your meals for the week, making grocery shopping quick and easy. We ensure that our ingredient lists are accurate and comprehensive, so you never have to worry about forgetting a key ingredient or wasting food. Plus, our AI-generated meal plans are designed to help you save money on groceries by optimizing ingredient use and minimizing waste.</p>
    <nuxt-link to="/generate-mealplan" class="md:mr-20 md:relative my-5 sm:my-0 top-40 float-right text-white bg-[#7E3AF2] hover:bg-[#662EC6] focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-md px-5 py-2.5 md:py-5 text-center">Get a free meal plan!</nuxt-link>
    <img style="width: 40rem;transform: translate(-10%,27%) rotate(55deg)" class="object rounded-lg mt-5 opacity-80" src="../assets/images/shoppinglist_image.png" alt="">
    <!--    <button class="mt-2 float-right text-white bg-[#7E3AF2] hover:bg-[#662EC6] focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-md px-5 py-2.5 text-center">Get a free weekly meal plan!</button>-->
  </div>
</template>

<script setup>
</script>

<style scoped>

</style>