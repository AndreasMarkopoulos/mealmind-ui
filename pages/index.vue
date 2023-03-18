<template>
  <user-info-form @generate="generatePrompt" />
  <div id="meal-plan" v-if="mealPlan!==''" class="block max-w-4xl mx-auto my-10 p-6 border border-gray-200 rounded-sm bg-glass shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <span class="text-engraved text-xl">Week 1</span>
   <div v-for="meal in mealPlan.Meals" class="flex justify-between mt-3 border-t py-5">
      <tt-accordion class="w-1/2 border text-sm border-gray-200">
        <template #accordion-title>
          <div class="flex">
            <p class="text-engraved">{{ meal.name }}</p>
            <p class="text-gray-400 ml-1 font-normal">{{ '~ ' + meal.calories + 'kcal' }}</p>
          </div>
        </template>
        <template #accordion-body>
          <div v-for="food in meal.meal" class="p-2">
              <div class="flex items-center">
                <p>• {{ food.amount +' '+ food.food}}</p>
                <p class="text-gray-400 text-xs ml-2">{{food.calories}}kcal</p>
              </div>
          </div>
        </template>
      </tt-accordion>
     <div class="w-1/3 flex flex-col items-center text-xs mx-auto">
       <p>{{ meal.reasoning }}</p>
       <div class="flex border-l mt-5">
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

onMounted(()=>{
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
    initializerPrompt+exampleResponse+prompt.value
)


const mealPlan = ref('')
function generatePrompt(input: object) {
  prompt.value = `Generate a personalized meal plan with food quantities for a ${input.age}-year-old, ${input.height}-cm-tall, ${input.weight}-kg ${input.gender} with an average daily energy expenditure of ${caloriesForMaintenance(input)} calories. My goal is to ${input.goal} weight. ${input.dietPreference==='none' ? '' : 'It needs to be a ' + input.dietPreference +' diet' }`
  sendPrompt()
}
async function sendPrompt() {
  try {
    useGlobalStore().startLoading();
    const openai = new OpenAIApi(configuration);
    console.log(finalPrompt.value)
    const completion = await openai.createChatCompletion({
      model:'gpt-3.5-turbo',
      messages: [{role: "user", content:finalPrompt.value}],
    });
    mealPlan.value = parseMealPlan(completion.data.choices[0].message.content);
    useGlobalStore().stopLoading();
    navigateTo('#meal-plan')
  }
  catch (error: any) {
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
  console.log(amrMultiplier)
  if(input.gender === 'male') {
    const bmr = 66.47 + (13.75 * input.weight) + (5.003 * input.height) - (6.755 * input.age);
    return Math.floor(bmr * amrMultiplier[input.activityLevel])
  }
  else if(input.gender === 'female') {
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
</script>

<style scoped>

</style>