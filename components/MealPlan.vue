<template>
  <div id="meal-plan" ref="mealPlanArea" @click.self="closeShoppingList" v-if="mealPlan!==null"
       class="block mx-auto overflow-hidden p-6 border border-gray-200 bg-glass shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <!-- drawer component -->
    <div id="shopping-list-drawer" class="fixed border-r h-full shadow-lg top-0 left-0 z-40 p-4 overflow-y-auto transition-transform -translate-x-full bg-purple-50 w-80 dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-label">
      <h5 id="drawer-label" class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"><svg class="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
        Shopping List
        <p class="text-sm text-gray-400 font-light tracking-wider ml-2 spacing">{{ generatedDate }}</p>
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
        <p class="mr-2">{{ generatedDate }}</p>
        <p> • Daily Meal Plan </p>
        <p style="font-size: 17px" class="text-gray-400 ml-4 font-light">{{ '~' + mealPlan.totalCalories + 'kcal' }}</p>
      </span>
      <button class="flex mt-4 sm:mt-0 items-center" @click="openShoppingList">
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

import {useGlobalStore} from "~/store/GlobalStore";
import TtAccordion from "~/components/custom/tt-accordion.vue";
import {Drawer, initAccordions, initDrawers} from "flowbite";
import {MealPlan, UserDietInput} from "~/model/Interfaces";
import axios from "axios";
import {useUserStore} from "~/store/UserStore";
import {PropType} from "@vue/runtime-core";

onMounted(() => {
  initAccordions();
  initDrawers();
  document.body.style.backgroundColor = 'white'
})

const props = defineProps({
  mealPlanRecord: {
    type: Object,
    default: null,
  },
})

const mealPlan = ref<MealPlan | null>(props.mealPlanRecord?.meal_plan_json)
const shoppingList = ref(props.mealPlanRecord?.shopping_list)
const mealPlanArea = ref<HTMLElement | null>(null)
const generatedDate = computed(()=>formatDate(props.mealPlanRecord?.created).split(' ')[0])
async function requestMealplan(input: UserDietInput) {
  useGlobalStore().startLoading();
  const userId = await useUserStore().userDetails.id;
  const response = await axios.get('https://mm-api.vercel.app/generate-meal-plan', {input:input, userId:userId},  {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  shoppingList.value = response.data.shoppingList
  mealPlan.value = response.data.mealplan
  console.log(response.data)
  setTimeout(() => {
    mealPlanArea.value?.scrollIntoView();
    useGlobalStore().stopLoading();
  }, 500)
}
async function openShoppingList() {
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
</script>

<style scoped>

</style>