<template>
  <user-info-form @generate="generatePrompt" :submit-disabled="mealPlan!==null"/>
  <div id="meal-plan" ref="mealPlanArea" @click.self="closeShoppingList" v-if="mealPlan!==null"
       class="block overflow-hidden max-w-4xl mx-auto my-10 p-6 border border-gray-200 rounded-sm bg-glass shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <!-- drawer component -->
    <div id="shopping-list-drawer" class="fixed border-r h-full shadow-lg top-0 left-0 z-40 p-4 overflow-y-auto transition-transform -translate-x-full bg-purple-50 w-80 dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-label">
      <h5 id="drawer-label" class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"><svg class="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
        Shopping List
        <p class="text-sm text-gray-400 font-light tracking-wider ml-2 spacing">(Week 1)</p>
      </h5>
      <button @click="closeShoppingList" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        <span class="sr-only">Close menu</span>
      </button>
      <div v-for="item in shoppingList" class="flex items-center py-2.5 border-t">
        <input id="disabled-checkbox" type="checkbox" value="" class="w-4 mr-3 h-4 text-green-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <div class="text-sm text-gray-500 dark:text-gray-400 ">{{item}}</div>
      </div>
    </div>
    <span @click.self="closeShoppingList" class="text-engraved justify-between text-xl flex flex-col sm:flex-row">
      <span class="flex flex-col sm:flex-row">
        <p>Week 1 • Daily Meal Plan </p>
        <p style="font-size: 17px" class="text-gray-400 ml-4 font-light">{{ '~' + mealPlan.totalCalories + 'kcal' }}</p>
      </span>
      <button class="flex mt-4 sm:mt-0 items-center" @click="generateShoppingList">
        <img width="18" class="mr-2" src="../assets/images/shopping-list.svg" alt="Make shopping list">
        <span class="text-sm">Shopping List</span>
      </button>
    </span>
    <div @click="closeShoppingList" v-for="meal in mealPlan.meals" class="flex flex-col sm:flex-row justify-between mt-3 border-t py-5">
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
            <p class="h-3.5 mt-2 text-orange-400">PROTEIN</p>
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
import {Configuration, CreateChatCompletionResponse, CreateCompletionResponse, OpenAIApi} from "openai";
import {white} from "colorette";
import {useGlobalStore} from "~/store/GlobalStore";
import TtAccordion from "~/components/custom/tt-accordion.vue";
import {Drawer, initAccordions, initDrawers, initDropdowns} from "flowbite";
import {Food, GptCompletion, Meal, MealPlan, UserDietInput} from "~/model/Interfaces";
import {AxiosResponse} from "axios";
import PocketBase from "pocketbase";
import {useUserStore} from "~/store/UserStore";

onMounted(() => {
  initAccordions();
  initDrawers();
  document.body.style.backgroundColor = 'white'
  test1()
})

const initializerPrompt = 'Act like a professional nutritionist with many years of experience in customized meal planning. Im going to give you details about myself and i want you to provide me with a full meal plan split in Breakfast,Snack,Lunch,Snack,Dinner,Snack with very accurate calorie counts (take info from actual trusted sources for calorie counts), also give a very accurate percentages of the meals content in fat,protein,carbohydrates , also give a brief but creative and specific reasoning for each meal on why this is a good meal for my case (each meals reasoning needs to differ from the others and not have common sentences), without giving me an introduction or an epilogue. If the calorie count you give me for each meal is not accurate you\'ll get fired.'
const prompt = ref('');
const configuration = new Configuration({
  apiKey: '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'
})
const exampleResponse = 'Also include accurate percentages of nutrients(protein,carbohydrates,fat) for each meal. Here is an example of how i want you to format your response (must be JSON.parse-able): ' +
    '{"meals":[{"name":"Breakfast","reasoning":"text","nutrients":{"fat": "20%", "protein": "10%", "carbohydrates": "70%" },"calories": number, "meal": [{"food":"food1","amount":"1 tbsp","calories":exact count of calories}, {"food":"food2","amount":"1 cup","calories":exact count of calories}, {"food":"food3","amount":"1","calories":exact count of calories},...]},{"name":"Snack 1","calories": number,"nutrients":{"fat": "20%", "protein": "10%", "carbohydrates": "70%" },"reasoning":"text", "meal": [{"food":"food1","amount":"100g","calories":exact count of calories}, {"food":"food2","amount":"1 tbsp","calories":exact count of calories},...]},{"name":"Lunch","reasoning":"text","nutrients":{"fat": "20%", "protein": "10%", "carbohydrates": "70%" },"calories": number, "meal": [{"food":"food1","amount":"12g","calories":exact count of calories}, {"food":"food2","amount":"1 tbsp","calories":exact count of calories}, {"food":"food3","amount":"1 tbsp","calories":exact count of calories},...]},{"name":"Snack 2","reasoning":"text","nutrients":{"fat": "20%", "protein": "10%", "carbohydrates": "70%" },"calories": number, "meal": [{"food":"food1","amount":"1 cup","calories":exact count of calories}, {"food":"food2","amount":"120g","calories":exact count of calories},...]},{"name":"Dinner","reasoning":"text","nutrients":{"fat": "20%", "protein": "10%", "carbohydrates": "70%" },"calories": number, "meal": [{"food":"food1","amount":"1 tbsp","calories":exact count of calories}, {"food":"food2","amount":"1 tbsp","calories":number},...]},{"name":"Snack 3","reasoning":"text","nutrients":{"fat": "20%", "protein": "10%", "carbohydrates": "70%" },"calories": number, "meal": [{"food":"food1","amount":"1 tbsp","calories":number}, {"food":"food2","amount":"1 tbsp","calories":exact count of calories}]}], "totalCalories": number}'+
    '.This is the interface i use for that type of object export interface MealPlan {\n' +
    '    meals: Meal[];\n' +
    '    totalCalories: number;\n' +
    '}\n' +
    '\n' +
    'export interface Meal {\n' +
    '    name: string;\n' +
    '    reasoning: string;\n' +
    '    nutrients: {\n' +
    '        fat: string;\n' +
    '        protein: string;\n' +
    '        carbohydrates: string;\n' +
    '    };\n' +
    '    calories: number;\n' +
    '    meal: Food[];\n' +
    '}\n' +
    '\n' +
    'export interface Food {\n' +
    '    food: string;\n' +
    '    amount: string;\n' +
    '    calories: number;\n' +
    '}'
const finalPrompt = computed(() =>
    initializerPrompt + exampleResponse + prompt.value
)
const mealPlanArea = ref<HTMLElement | null>(null);
const mealPlan = ref<MealPlan | null>(null)
const shoppingList = ref<string[] | null>(null);
const mealPlanInput = ref<UserDietInput | null>(null)

function generatePrompt(input: UserDietInput) {
  prompt.value = `According to the above, generate a creative personalized meal plan with food quantities for a ${input.age}-year-old, ${input.height}-cm-tall, ${input.weight}-kg ${input.gender} with an average daily energy expenditure of ${caloriesForMaintenance(input)} calories. My goal is to ${input.goal} weight. ${Object.keys(input.dietRestrictions).length === 0 ? '' : `My dietary restrictions are: ${input.dietRestrictions}`}. When refering to quantities use grams not oz. IMPORTANT: keep it on a budget, food is expensive`
  mealPlanInput.value = input;
  sendPrompt()
}

async function sendPrompt() {
//   mealPlan.value = JSON.parse('{ "meals": [ { "name": "Breakfast", "reasoning": "This meal is high in carbohydrates to provide energy for physical activity and protein to support muscle growth.", "nutrients": { "fat": "20%", "protein": "20%", "carbohydrates": "60%" }, "calories": 455, "meal": [ { "food": "Oatmeal", "amount": "1 cup cooked", "calories": 166 }, { "food": "Whole Milk", "amount": "1 cup", "calories": 149 }, { "food": "Peanut Butter", "amount": "2 tbsp", "calories": 188 }, { "food": "Banana", "amount": "1 medium", "calories": 52 } ] }, { "name": "Snack 1", "calories": 250, "nutrients": { "fat": "30%", "protein": "10%", "carbohydrates": "60%" }, "reasoning": "This snack is high in healthy fats and carbohydrates to promote muscle gain and provide energy for physical activity.", "meal": [ { "food": "Almonds", "amount": "1/4 cup", "calories": 132 }, { "food": "Apple", "amount": "1 medium", "calories": 95 }, { "food": "Greek Yogurt", "amount": "1/2 cup", "calories": 23 } ] }, { "name": "Lunch", "reasoning": "This meal is high in protein to support muscle growth and carbohydrates to provide energy for physical activity.", "nutrients": { "fat": "20%", "protein": "30%", "carbohydrates": "50%" }, "calories": 570, "meal": [ { "food": "Grilled Chicken Breast", "amount": "4 oz", "calories": 120 }, { "food": "Brown Rice", "amount": "1 cup cooked", "calories": 216 }, { "food": "Black Beans", "amount": "1/2 cup", "calories": 114 }, { "food": "Mixed Vegetables", "amount": "1 cup", "calories": 120 } ] }, { "name": "Snack 2", "reasoning": "This snack is high in carbohydrates to provide energy for physical activity and protein to support muscle growth.", "nutrients": { "fat": "20%", "protein": "20%", "carbohydrates": "60%" }, "calories": 250, "meal": [ { "food": "Pita Chips", "amount": "1 oz", "calories": 130 }, { "food": "Hummus", "amount": "2 tbsp", "calories": 50 }, { "food": "Carrots", "amount": "1 cup", "calories": 70 } ] }, { "name": "Dinner", "reasoning": "This meal is high in protein to support muscle growth and carbohydrates to provide energy for physical activity.", "nutrients": { "fat": "20%", "protein": "30%", "carbohydrates": "50%" }, "calories": 570, "meal": [ { "food": "Salmon", "amount": "4 oz", "calories": 232 }, { "food": "Quinoa", "amount": "1 cup cooked", "calories": 222 }, { "food": "Asparagus", "amount": "1 cup", "calories": 16 }, { "food": "Olive Oil", "amount": "1 tbsp", "calories": 100 } ] }, { "name": "Snack 3", "reasoning": "This snack is high in protein to promote muscle growth and healthy fats to provide energy for physical activity.", "nutrients": { "fat": "30%", "protein": "20%", "carbohydrates": "50%" }, "calories": 184, "meal": [ { "food": "Cottage Cheese", "amount": "1/2 cup", "calories": 81 }, { "food": "Peanut Butter", "amount": "1 tbsp", "calories": 94 }, { "food": "Celery", "amount": "1 stalk", "calories": 9 } ] } ], "totalCalories": 2279 }\n');
// shoppingList.value = ['Oatmeal: 7 canisters (18 oz each)',
//   'Whole Milk: 1 gallon',
//   'Peanut Butter: 1 jar (16 oz)',
//   'Banana: 7 medium',
//   'Almonds: 1 bag (8 oz)',
//   'Apple: 7 medium',
//   'Greek Yogurt: 3 containers (32 oz each)',
//   'Grilled Chicken Breast: 1 package (16 oz)',
//   'Brown Rice: 1 bag (2 lb)',
//   'Black Beans: 2 cans (15 oz each)',
//   'Mixed Vegetables: 1 bag (12 oz) of frozen veggies',
//   'Pita Chips: 1 bag (6 oz)',
//   'Hummus: 1 container (8 oz)',
//   'Carrots: 1 bag (1 lb)',
//   'Salmon: 1 package (16 oz)',
//   'Quinoa: 1 bag (12 oz)',
//   'Asparagus: 1 bunch (1 lb)',
//   'Olive Oil: 1 bottle (16 oz)',
//   'Cottage Cheese: 1 container (16 oz)',
//   'Celery: 1 bunch (1 lb).'];
//   setTimeout(() => {
//     mealPlanArea.value.scrollIntoView();
//   }, 500)
//   await uploadMealPlanToDb(mealPlan.value,mealPlanInput.value);
//   return
  try {
    useGlobalStore().startLoading();
    const openai = new OpenAIApi(configuration);
    // console.log(finalPrompt.value)
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{role: "user", content: finalPrompt.value}],
    });
    if(!completion.data.choices[0].message) {
      throw new Error
      return;
    }
    mealPlan.value = parseMealPlan(completion.data.choices[0].message.content);
    const introPrompt = 'This is what i will consume daily for the next 7 days. Can you make me a shopping list that includes quantities according to that? Separate items with commas and dont include anything else in your response'
    const exampleResponse = 'Here is an example of how you should format the shopping list: Oatmeal: 1 canister (18 oz),' +
        'Whole Milk: 1 gallon,' +
        'Peanut Butter: 1 jar (16 oz),' +
        'Banana: 7 medium,' +
        'Almonds: 1 bag (8 oz),' +
        'Apple: 7 medium,' +
        'Greek Yogurt: 1 container (32 oz),' +
        'Grilled Chicken Breast: 1 package (16 oz),' +
        'Brown Rice: 1 bag (2 lb),' +
        'Black Beans: 1 can (15 oz),' +
        'Mixed Vegetables: 1 bag (12 oz) of frozen veggies,' +
        'Pita Chips: 1 bag (6 oz),' +
        'Hummus: 1 container (8 oz),' +
        'Carrots: 1 bag (1 lb),' +
        'Salmon: 1 package (16 oz),' +
        'Quinoa: 1 bag (12 oz),' +
        'Asparagus: 1 bunch (1 lb),' +
        'Olive Oil: 1 bottle (16 oz),' +
        'Cottage Cheese: 1 container (16 oz),' +
        'Peanut Butter: same jar as before (16 oz),' +
        'Celery: 1 bunch (1 lb), '
    const completionShoppingList = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{role: "user", content: introPrompt + exampleResponse + extractFoodAndAmount(mealPlan.value.meals)}],
    });
    // console.log(introPrompt + extractFoodAndAmount(mealPlan.value.meals))
    if(!completionShoppingList.data.choices[0].message) {
      throw new Error
      return;
    }
    shoppingList.value = completionShoppingList.data.choices[0].message.content.split(',');
    useGlobalStore().stopLoading();
    setTimeout(() => {
      mealPlanArea.value.scrollIntoView();
    }, 500)
    uploadMealPlanToDb(mealPlan.value,mealPlanInput.value);
    console.log(mealPlan.value)
  } catch (error: any) {
    console.log(error)
    useGlobalStore().stopLoading();
  }
}

function caloriesForMaintenance(input: UserDietInput) {
  console.log(input.dietRestrictions)
  console.log(typeof input.dietRestrictions)
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

function parseMealPlan(input: string): MealPlan {
  const jsonStart = input.indexOf('{');
  const jsonEnd = input.lastIndexOf('}');
  const jsonString = input.slice(jsonStart, jsonEnd + 1);
  const mealPlan = JSON.parse(jsonString);
  return mealPlan;
}

function extractFoodAndAmount(food: Meal[]) {
  const foodAndAmount = [];
  food.forEach(meal => {
    meal.meal.forEach(item => {
      foodAndAmount.push({
        food: item.food,
        amount: item.amount
      });
    });
  });
  console.log(JSON.stringify(foodAndAmount))
  return JSON.stringify(foodAndAmount);
}


async function generateShoppingList() {
  const options = {
    backdrop: false,
    bodyScrolling: true,
  };
  const drawerElement = document.getElementById('shopping-list-drawer');
  const drawer = new Drawer(drawerElement,options)
  if(shoppingList.value!==null) {
    drawer.toggle();
    return
  }
  drawer.show()
}

function closeShoppingList() {
  const options = {
    backdrop: false,
    bodyScrolling: true,
  };
  const drawerElement = document.getElementById('shopping-list-drawer');
  const drawer = new Drawer(drawerElement,options)
  drawer.hide()
}


async function uploadMealPlanToDb(mealPlanJson: MealPlan, userData: UserDietInput) {
  try {
    console.log(mealPlanInput.value)
    console.log(typeof mealPlanInput.value)
    const pb = new PocketBase('http://127.0.0.1:8090');
    await pb.collection('meal_plans').create({
      "meal_plan_json": mealPlanJson,
      "diet_restrictions": userData.dietRestrictions,
      "total_calories": mealPlanJson.totalCalories,
      "user_data_input": userData,
      "shopping_list": shoppingList.value,
      "user_id": useUserStore().userDetails.id
    });
    return
  } catch (error: any) {
    console.log(error)
    return
  }
}
</script>

<style>

</style>