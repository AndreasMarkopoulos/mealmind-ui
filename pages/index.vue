<template>
  <user-info-form @generate="generatePrompt" :submit-disabled="mealPlan!==''"/>
  <div id="meal-plan" ref="mealPlanArea" v-if="mealPlan!==''"
       class="block max-w-4xl mx-auto my-10 p-6 border border-gray-200 rounded-sm bg-glass shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <span class="text-engraved justify-between text-xl flex">
      <span class="flex">
        <p>Week 1 • Daily Meal Plan </p>
        <p style="font-size: 17px" class="text-gray-400 ml-4 font-light">{{ '~' + mealPlan.TotalCalories + 'kcal' }}</p>
      </span>
      <button class="flex items-center" @click="generateShoppingList">
        <img width="18" class="mr-2" src="../assets/images/shopping-list.svg" alt="Make shopping list">
        <span class="text-sm">Make Shopping List</span>
      </button>
    </span>
    <div v-for="meal in mealPlan.Meals" class="flex flex-col sm:flex-row justify-between mt-3 border-t py-5">
      <tt-accordion class="sm:w-1/2 border text-sm border-gray-200">
        <template #accordion-title>
          <div class="flex">
            <p class="text-engraved">{{ meal.name }}</p>
            <p class="text-gray-400 ml-1 font-normal">{{ '~ ' + meal.calories + 'kcal' }}</p>
          </div>
        </template>
        <template #accordion-body>
          <div v-for="food in meal.meal" class="p-2">
            <div class="flex items-center">
              <p>• {{ food.amount + ' ' + food.food }}</p>
              <p class="text-gray-400 text-xs ml-2">{{ food.calories }}kcal</p>
            </div>
          </div>
        </template>
      </tt-accordion>
      <div class="sm:w-1/3 mt-4 sm:mt-0 flex flex-col items-center text-xs mx-auto">
        <p>{{ meal.reasoning }}</p>
        <div class="flex border-l mt-5 sm:mt-10">
          <div class="w-20 flex flex-col items-end mr-2 text-xs font-semibold">
            <p class="h-3.5 mt-2 text-orange-400">PROTEINS</p>
            <p class="h-3.5 mt-2 text-red-400">FAT</p>
            <p class="h-3.5 mt-2 text-green-400">CARBS</p>
          </div>
          <div class="w-32 border-r">
            <div class="h-3.5 mt-2 bg-orange-400 rounded-r" :style="`width:${meal.nutrients.protein}`"></div>
            <div class="h-3.5 mt-2 bg-red-400 rounded-r" :style="`width:${meal.nutrients.fat}`"></div>
            <div class="h-3.5 mt-2 bg-green-400 rounded-r" :style="`width:${meal.nutrients.carbohydrates}`"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Configuration, OpenAIApi} from "openai";
import {white} from "colorette";
import {useGlobalStore} from "~/store/GlobalStore";
import TtAccordion from "~/components/custom/tt-accordion.vue";
import {initAccordions} from "flowbite";

onMounted(() => {
  initAccordions();
  document.body.style.backgroundColor = 'white'
})

const initializerPrompt = 'Act like a professional nutritionist with many years of experience in customized meal planning. Im going to give you details about myself and i want you to provide me with a full meal plan split in Breakfast,Snack,Lunch,Snack,Dinner,Snack with very accurate calorie counts, also give the meals percentage in fat,protein,carbohydrates , also give a brief reasoning why this is a good meal for my case, without giving me an introduction or an epilogue. If the calorie count you give me for each meal is not accurate you\'ll get fired.'
const prompt = ref('');
const configuration = new Configuration({
  apiKey: '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'
})
const exampleResponse = 'Here is an example of how i want you to format your response (must be JSON.parse-able): {"Meals":[{"name":"Breakfast","reasoning":"text","nutrients":{"fat": "20%", "protein": "10%", "carbohydrates": "70%" },"calories": number, "meal": [{"food":"food1","amount":"1 tbsp","calories":number}, {"food":"food2","amount":"1 cup","calories":number}, {"food":"food3","amount":"1","calories":number},...]},{"name":"Snack 1","calories": number,"nutrients":{"fat": "20%", "protein": "10%", "carbohydrates": "70%" },"reasoning":"text", "meal": [{"food":"food1","amount":"100g","calories":number}, {"food":"food2","amount":"1 tbsp","calories":number},...]},{"name":"Lunch","reasoning":"text","nutrients":{"fat": "20%", "protein": "10%", "carbohydrates": "70%" },"calories": number, "meal": [{"food":"food1","amount":"12g","calories":number}, {"food":"food2","amount":"1 tbsp","calories":number}, {"food":"food3","amount":"1 tbsp","calories":number},...]},{"name":"Snack 2","reasoning":"text","nutrients":{"fat": "20%", "protein": "10%", "carbohydrates": "70%" },"calories": number, "meal": [{"food":"food1","amount":"1 cup","calories":number}, {"food":"food2","amount":"120g","calories":number},...]},{"name":"Dinner","reasoning":"text","nutrients":{"fat": "20%", "protein": "10%", "carbohydrates": "70%" },"calories": number, "meal": [{"food":"food1","amount":"1 tbsp","calories":number}, {"food":"food2","amount":"1 tbsp","calories":number},...]},{"name":"Snack 3","reasoning":"text","nutrients":{"fat": "20%", "protein": "10%", "carbohydrates": "70%" },"calories": number, "meal": [{"food":"food1","amount":"1 tbsp","calories":number}, {"food":"food2","amount":"1 tbsp","calories":number}]}], "TotalCalories": number}'
const finalPrompt = computed(() =>
    initializerPrompt + exampleResponse + prompt.value
)
const mealPlanArea = ref(null);
// const mealPlan = ref(JSON.parse('{ "Meals": [ { "name": "Breakfast", "reasoning": "This meal is high in carbohydrates to provide energy for physical activity and protein to support muscle growth.", "nutrients": { "fat": "20%", "protein": "20%", "carbohydrates": "60%" }, "calories": 455, "meal": [ { "food": "Oatmeal", "amount": "1 cup cooked", "calories": 166 }, { "food": "Whole Milk", "amount": "1 cup", "calories": 149 }, { "food": "Peanut Butter", "amount": "2 tbsp", "calories": 188 }, { "food": "Banana", "amount": "1 medium", "calories": 52 } ] }, { "name": "Snack 1", "calories": 250, "nutrients": { "fat": "30%", "protein": "10%", "carbohydrates": "60%" }, "reasoning": "This snack is high in healthy fats and carbohydrates to promote muscle gain and provide energy for physical activity.", "meal": [ { "food": "Almonds", "amount": "1/4 cup", "calories": 132 }, { "food": "Apple", "amount": "1 medium", "calories": 95 }, { "food": "Greek Yogurt", "amount": "1/2 cup", "calories": 23 } ] }, { "name": "Lunch", "reasoning": "This meal is high in protein to support muscle growth and carbohydrates to provide energy for physical activity.", "nutrients": { "fat": "20%", "protein": "30%", "carbohydrates": "50%" }, "calories": 570, "meal": [ { "food": "Grilled Chicken Breast", "amount": "4 oz", "calories": 120 }, { "food": "Brown Rice", "amount": "1 cup cooked", "calories": 216 }, { "food": "Black Beans", "amount": "1/2 cup", "calories": 114 }, { "food": "Mixed Vegetables", "amount": "1 cup", "calories": 120 } ] }, { "name": "Snack 2", "reasoning": "This snack is high in carbohydrates to provide energy for physical activity and protein to support muscle growth.", "nutrients": { "fat": "20%", "protein": "20%", "carbohydrates": "60%" }, "calories": 250, "meal": [ { "food": "Pita Chips", "amount": "1 oz", "calories": 130 }, { "food": "Hummus", "amount": "2 tbsp", "calories": 50 }, { "food": "Carrots", "amount": "1 cup", "calories": 70 } ] }, { "name": "Dinner", "reasoning": "This meal is high in protein to support muscle growth and carbohydrates to provide energy for physical activity.", "nutrients": { "fat": "20%", "protein": "30%", "carbohydrates": "50%" }, "calories": 570, "meal": [ { "food": "Salmon", "amount": "4 oz", "calories": 232 }, { "food": "Quinoa", "amount": "1 cup cooked", "calories": 222 }, { "food": "Asparagus", "amount": "1 cup", "calories": 16 }, { "food": "Olive Oil", "amount": "1 tbsp", "calories": 100 } ] }, { "name": "Snack 3", "reasoning": "This snack is high in protein to promote muscle growth and healthy fats to provide energy for physical activity.", "nutrients": { "fat": "30%", "protein": "20%", "carbohydrates": "50%" }, "calories": 184, "meal": [ { "food": "Cottage Cheese", "amount": "1/2 cup", "calories": 81 }, { "food": "Peanut Butter", "amount": "1 tbsp", "calories": 94 }, { "food": "Celery", "amount": "1 stalk", "calories": 9 } ] } ], "TotalCalories": 2279 }\n'));
const mealPlan = ref('');
const shoppingList = ref('');

function generatePrompt(input: object) {
  prompt.value = `Generate a personalized meal plan with food quantities for a ${input.age}-year-old, ${input.height}-cm-tall, ${input.weight}-kg ${input.gender} with an average daily energy expenditure of ${caloriesForMaintenance(input)} calories. My goal is to ${input.goal} weight. ${input.dietRestrictions === '' ? '' : `My dietary restrictions are: ${input.dietRestrictions}`}`
  sendPrompt()
}

async function sendPrompt() {
  try {
    useGlobalStore().startLoading();
    const openai = new OpenAIApi(configuration);
    // console.log(finalPrompt.value)
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{role: "user", content: finalPrompt.value}],
    });
    mealPlan.value = parseMealPlan(completion.data.choices[0].message.content);
    useGlobalStore().stopLoading();
    setTimeout(() => {
      mealPlanArea.value.scrollIntoView();
    }, 500)
    console.log(mealPlan.value)
  } catch (error: any) {
    console.log(error)
    useGlobalStore().stopLoading();
  }
}

function caloriesForMaintenance(input: any) {
  const amrMultiplier = {
    0: 1.2,
    1: 1.375,
    2: 1.55,
    3: 1.725,
    4: 1.9
  };
  if (input.gender === 'male') {
    const bmr = 66.47 + (13.75 * input.weight) + (5.003 * input.height) - (6.755 * input.age);
    return Math.floor(bmr * amrMultiplier[input.activityLevel])
  } else if (input.gender === 'female') {
    const bmr = 655.1 + (9.563 * input.weight) + (1.850 * input.height) - (4.676 * input.age);
    return Math.floor(bmr * amrMultiplier[input.activityLevel])
  }

}

function parseMealPlan(input: string) {
  const jsonStart = input.indexOf('{');
  const jsonEnd = input.lastIndexOf('}');
  const jsonString = input.slice(jsonStart, jsonEnd + 1);
  const mealPlan = JSON.parse(jsonString);
  return mealPlan;
}

function extractFoodAndAmount(meals: object) {
  const foodAndAmount = [];

  meals.forEach(meal => {
    meal.meal.forEach(item => {
      foodAndAmount.push({
        food: item.food,
        amount: item.amount
      });
    });
  });
  return JSON.stringify(foodAndAmount);
}


async function generateShoppingList() {
  try {
    useGlobalStore().startLoading();
    const openai = new OpenAIApi(configuration);
    // console.log(finalPrompt.value)
    const introPrompt = 'This is what i will consume daily for the next 7 days. Can you make me a shopping list that includes quantities according to that? Keep in mind i cant buy any quantity i want at the supermarket so round it to the closest commonly sold packaging size'
    const exampleResponse = 'Here is an example of how you should format the shopping list: - Oatmeal: 1 canister (18 oz)\n' +
        '- Whole Milk: 1 gallon\n' +
        '- Peanut Butter: 1 jar (16 oz)\n' +
        '- Banana: 7 medium\n' +
        '- Almonds: 1 bag (8 oz)\n' +
        '- Apple: 7 medium\n' +
        '- Greek Yogurt: 1 container (32 oz)\n' +
        '- Grilled Chicken Breast: 1 package (16 oz)\n' +
        '- Brown Rice: 1 bag (2 lb)\n' +
        '- Black Beans: 1 can (15 oz)\n' +
        '- Mixed Vegetables: 1 bag (12 oz) of frozen veggies\n' +
        '- Pita Chips: 1 bag (6 oz)\n' +
        '- Hummus: 1 container (8 oz)\n' +
        '- Carrots: 1 bag (1 lb)\n' +
        '- Salmon: 1 package (16 oz)\n' +
        '- Quinoa: 1 bag (12 oz)\n' +
        '- Asparagus: 1 bunch (1 lb)\n' +
        '- Olive Oil: 1 bottle (16 oz)\n' +
        '- Cottage Cheese: 1 container (16 oz)\n' +
        '- Peanut Butter: same jar as before (16 oz)\n' +
        '- Celery: 1 bunch (1 lb)\n '
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{role: "user", content: introPrompt + exampleResponse + extractFoodAndAmount(mealPlan.value.Meals)}],
    });
    console.log(introPrompt + extractFoodAndAmount(mealPlan.value.Meals))
    shoppingList.value = completion.data.choices[0].message.content;
    useGlobalStore().stopLoading();
    downloadString(shoppingList.value, "text", "ShoppingList_mealmind.txt")
    console.log(shoppingList.value)
  } catch (error: any) {
    console.log(error)
    useGlobalStore().stopLoading();
  }
}

function downloadString(text, fileType, fileName) {
  var blob = new Blob([text], {type: fileType});

  var a = document.createElement('a');
  a.download = fileName;
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function () {
    URL.revokeObjectURL(a.href);
  }, 1500);
}
</script>

<style scoped>

</style>