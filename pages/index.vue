<template>
  <div id="meal-plan" class="block overflow-hidden lg:max-w-6l max-w-4xl mx-auto my-10 px-6 pt-10 pb-0 border border-gray-200 rounded-lg bg-glass shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h1 class="text-engraved text-4xl mb-4 text-center font-semibold">Welcome to MealMind!</h1>
    <h1 class="text-gray-600 text-2xl text-center font-semibold">Healthy Eating Made Easy with Personalized Meal Plans</h1>
    <p class="pt-10 leading-7">Welcome to MealMind, the personalized meal planning service powered by advanced AI technology.
      Our intelligent algorithms take into account your bodyweight, height, age, activity level, dietary restrictions and more to create a customized meal plan that's tailored specifically to your needs. Our AI-generated meal plans are not only informed, but they're also designed to make healthy eating easy and convenient. With our service, you'll have everything you need to eat delicious, nutritious meals that fuel your body and make you feel your best. Sign up now and experience the power of AI for healthy eating!</p>
    <div class="overflow-hidden">
      <div class="" id="mealplan-img-1"></div>
    </div>
  </div>
  <div id="meal-plan" class="block overflow-hidden max-w-4xl mx-auto my-5 p-6 border border-gray-200 rounded-lg bg-glass shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h1 class="text-engraved text-xl text-center font-semibold">AI-Powered Meal Plans Tailored to You</h1>
    <p class="pt-5 leading-7">Our AI-powered meal plan generator creates custom meal plans tailored to your unique body type, health goals, and dietary preferences. Our advanced algorithms analyze your input and generate meal plans that are both delicious and optimized for your specific needs. Our users have seen significant results in achieving their health goals, from weight loss to muscle gain and improved overall well-being.</p>
    <div class="" id="mealplan-img-2"></div>
    <h1 class="text-engraved text-xl mt-16 text-center font-semibold">Automated Shopping List for Easy Meal Prep</h1>
    <p class="pt-5 leading-7">Our automated shopping list feature generates a list of ingredients needed to prepare your meals for the week, making grocery shopping quick and easy. We ensure that our ingredient lists are accurate and comprehensive, so you never have to worry about forgetting a key ingredient or wasting food. Plus, our AI-generated meal plans are designed to help you save money on groceries by optimizing ingredient use and minimizing waste.</p>
<!--    <nuxt-link to="/generate-mealplan" class="md:mr-20 md:relative my-5 sm:my-0 top-40 float-right text-white border-2 border-white bg-[#7E3AF2] hover:bg-[#662EC6] focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-md px-5 py-2.5 md:py-5 text-center">Get a free meal plan!</nuxt-link>-->
    <div class="">
      <div class="" id="mealplan-img-3"></div>
    </div>

    <!--    <button class="mt-2 float-right text-white bg-[#7E3AF2] hover:bg-[#662EC6] focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-md px-5 py-2.5 text-center">Get a free weekly meal plan!</button>-->
  </div>
</template>

<script setup>
</script>

<style scoped>
#mealplan-img-1 {
  background-image: url("./assets/images/Screenshot_9.png");
  /*-webkit-background-size: cover;*/
  border-radius: 5px;
  width: 100%;
  height: 40em;
  margin-bottom: 2.5rem;
  margin-top: 1.5rem;
  /* you need to match the shadow color to your background or image border for the desired effect*/
  box-shadow: 0 0 5px 5px #fcfcfc inset;
}
#mealplan-img-2 {
  background-image: url("./assets/images/meal_plan_3.png");
  /*-webkit-background-size: cover;*/
  /*border-radius: 5px;*/
  width: 100%;
  height: 25em;
  margin-bottom: 2.5rem;
  margin-top: 1.5rem;
  /* you need to match the shadow color to your background or image border for the desired effect*/
  box-shadow: 0 0 5px 5px #fcfcfc inset;
}
#mealplan-img-3 {
  background-image: url("./assets/images/Screenshot_8.png");
  /*-webkit-background-size: cover;*/
  /*border-radius: 5px;*/
  width: 100%;
  height: 37em;
  margin-top: 1.5rem;
  /* you need to match the shadow color to your background or image border for the desired effect*/
  box-shadow: 0 0 5px 5px #fcfcfc inset;
}
</style>