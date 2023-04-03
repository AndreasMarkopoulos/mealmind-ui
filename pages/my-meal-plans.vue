<template>
  <div class="min-h-screen h-full block bg-glass max-w-6xl mx-auto my-10 p-6 border border-gray-200 rounded-md shadow">
    <div class="w-full h-10">
      <button @click="fetchUserMealplans(false)" :class="isRefreshing ? 'rotate' : ''" class="p-0 float-right mb-6">
        <img src="../assets/images/refresh.svg" class="w-7" alt="">
      </button>
    </div>
    <div class=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-[5em] sm:gap-y-15 md:gap-y-5">
    <button @click="showConfirmationModal" class="h-[350px]">
    <div class="hover:bg-purple-50 group hover:child:w-10 shadow shadow-lg bg-purple-50 hover:border max-w-[15em] mx-auto m-1 min-w-[10em] py-5 px-6">
      <div class="flex mb-30">
      </div>
      <meal-mind-logo color="#7E3AF2" stacked class="w-[80%] mx-auto"></meal-mind-logo>
      <div class="flex flex-col mt-0 items-center justify-center">
        <p class="text-engraved font-bold hidden group-hover:block">NEW MEAL PLAN</p>
        <img src="../assets/images/add-circle.svg" class="h-16 group-hover:h-12 group-hover:my-6 mb-4" alt="">
      </div>
    </div>
    </button>
    <button class="h-[350px]" @click="setOpenedMealplan(mealplanRecord)" v-for="mealplanRecord in userMealPlanRecords">
      <div :class="mealplanRecord.generation_completed ? 'hover:bg-purple-50 hover:border' : 'opacity-50 hover:bg-glass cursor-default'" class=" max-w-[15em] min-h-[300px] group mx-auto m-1 bg-glass min-w-[10em] py-5 px-6">
          <div v-if="mealplanRecord.generation_completed" class="hidden group-hover:flex mb-5 justify-between">
            <p class="text-right text-sm font-bold text-gray-600">{{mealplanRecord.user_data_input.weight}}kg</p>
            <p class="text-sm">{{mealplanRecord.total_calories}} kcal</p>
          </div>
          <div v-else class="flex">
            <spinner color="purple"></spinner>
            <p class="text-sm ml-2 font-semibold text-engraved">Generating...</p>
          </div>
        <meal-mind-logo color="#7E3AF2" stacked class="w-[80%] mx-auto"></meal-mind-logo>
        <div class="flex justify-center my-2 gap-x-2 hidden group-hover:block">
          <p class="text-engraved">{{mealplanRecord.user_data_input.goal}}</p>
        </div>
        <div class="flex justify-between">
          <p class="text-right text-sm font-bold text-gray-400">{{formatDate(mealplanRecord.created).split(' ')[1]}}</p>
          <p class="text-right text-sm font-bold text-[#7E3AF2]">{{formatDate(mealplanRecord.created).split(' ')[0]}}</p>
        </div>
      </div>
    </button>
  </div>
  <div>
  </div>
  </div>
    <mm-mealplan-modal :class="isDeletionModal ? 'opacity-95' : ''" id="modal" size="6xl" v-if="isShowModal" @close="closeModal">
      <template #header>
        <button @click="openDeletionModal" class="ml-2 mt-1">
          <img class="h-6" src="../assets/images/delete.svg" alt="">
        </button>
      </template>
      <template #body>
        <meal-plan id="meal-plan-area" v-if="openedMealplan" ref="mealPlanModal" :meal-plan-record="openedMealplan"></meal-plan>
      </template>
    </mm-mealplan-modal>
  <mm-confirmation-modal id="confirm-generation" size="4xl" v-if="isConfirmationModal" @close="closeConfirmationModal">
    <template #header>
      <div class="flex items-center text-engraved font-semibold text-xl">
        Confirm meal plan generation
      </div>
    </template>
    <template #body>
      <p class="font-semibold mb-4">The meal plan will be generated based on this information, make sure its up to date :</p>
      <div class="grid grid-cols-2 gap-4">
        <p class="mb-2 border-l-2 border-purple-200 pl-2 text-engraved"><p class="font-semibold text-gray-700">Activity Level: </p>{{activityLevelText[userProfileInfo.activityLevel]}}</p>
        <p class="mb-2 border-l-2 border-purple-200 pl-2 text-engraved"><p class="font-semibold text-gray-700">Weight: </p>{{userProfileInfo.weight}}</p>
        <p class="mb-2 border-l-2 border-purple-200 pl-2 text-engraved"><p class="font-semibold text-gray-700">Height: </p>{{userProfileInfo.height}}</p>
        <p class="mb-2 border-l-2 border-purple-200 pl-2 text-engraved"><p class="font-semibold text-gray-700">Goal: </p>{{userProfileInfo.goal}}</p>
        <p class="mb-2 border-l-2 border-purple-200 pl-2 text-engraved"><p class="font-semibold text-gray-700">Gender: </p>{{userProfileInfo.gender}}</p>
        <p class="mb-2 border-l-2 border-purple-200 pl-2 text-engraved"><p class="font-semibold text-gray-700">Age: </p>{{userProfileInfo.age}}</p>
      </div>
      <div class="mt-4 border-l-2 border-purple-200 pl-2">
        <p class="font-semibold text-gray-700">Diet Restrictions: </p>
        <div v-if="userProfileInfo.dietRestrictions.length > 0" class="flex">
          <p v-for="restriction in userProfileInfo.dietRestrictions" class="mb-2 mr-3 rounded-lg text-engraved">{{restriction}},</p>
        </div>
        <div v-else class=" mr-3 rounded-lg text-engraved">None</div>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <div class="">
          <button @click="closeConfirmationModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
            Cancel
          </button>
          <nuxt-link to="/profile" class="text-gray-500 bg-purple-50 hover:bg-pruple-100 focus:ring-4 ml-2 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">Edit my profile</nuxt-link>
        </div>
        <div class="flex items-center">
          <p>Your Generation Tokens:</p>
          <p class="ml-2 text-engraved font-bold">{{userTokens}}</p>
        </div>
        <button v-if="userTokens" :disabled="!userTokens" @click="requestMealplan" :class="!userTokens ? 'bg-gray-300' : 'bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300'" type="button" class="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
          Generate
        </button>
        <nuxt-link to="/pricing" v-else type="button" class="bg-white border-2 border-purple-400 focus:ring-4 focus:outline-none focus:ring-purple-300 text-purple-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
          Get Tokens
        </nuxt-link>
      </div>
    </template>
  </mm-confirmation-modal>
  <mm-confirmation-modal id="delete-meal-plan" size="2xl" v-if="isDeletionModal" @close="closeDeletionModal">
    <template #header>
      <div class="flex items-center text-engraved font-semibold text-xl">
        Are you sure you want to delete this meal plan?
      </div>
    </template>
    <template #body>
      Once you delete this meal plan it can not be retrieved
    </template>
    <template #footer>
      <div class="flex justify-between">
        <button @click="closeDeletionModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
          Cancel
        </button>
        <button @click="deleteMealplan" type="button" class="text-white font-medium bg-red-400 rounded-sm text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
          Delete
        </button>
      </div>
    </template>
  </mm-confirmation-modal>
</template>

<script setup lang="ts">
import PocketBase, {Record} from 'pocketbase';
import {useUserStore} from "~/store/UserStore";
import { Spinner } from 'flowbite-vue'
import MealMindLogo from "~/components/svg/MealMindLogo.vue";
import {initModals} from "flowbite";
import {activityLevelText, formatDate} from "~/utils/genericUtils";
import {useGlobalStore} from "~/store/GlobalStore";
import axios from "axios";
import MmMealplanModal from "~/components/custom/MmMealplanModal.vue";
import MmConfirmationModal from "~/components/custom/MmConfirmationModal.vue";

if(!useUserStore().loggedIn) {
  navigateTo('/login')
}
onMounted(()=>{
  initModals();
  fetchUserMealplans();
  fetchUserDetails();
})
const isConfirmationModal = ref(false);
const isShowModal = ref(false);
const isDeletionModal = ref(false);
const userProfileInfo = ref();
const userTokens = ref(0);
function closeModal() {
  isShowModal.value = false
}
function showModal() {
  isShowModal.value = true
}
function closeConfirmationModal() {
  isConfirmationModal.value = false
}
function closeDeletionModal() {
  isDeletionModal.value = false
}
function openDeletionModal() {
  isDeletionModal.value = true
}
async function showConfirmationModal() {
  useGlobalStore().startLoading();
  await fetchUserDetails()
  isConfirmationModal.value = true;
  useGlobalStore().stopLoading();
}
async function requestMealplan() {
  closeConfirmationModal();
    const userId = await useUserStore().userDetails.id;
    try {
      refreshAfterOneSecond();
      const response = await axios.post('https://mm-api.vercel.app/generate-meal-plan', {"input":{
          "activityLevel": 1,
          "age": 30,
          "dietRestrictions": [],
          "gender": "male",
          "goal": "Loose weight",
          "height": 180,
          "weight": 65
        },
        "userId":"gkqf6c8bxv0iww3"})
      await fetchUserMealplans(false);
    }
    catch {
      console.log('Server error')
    }
}
async function deleteMealplan() {
  closeDeletionModal();
  try {
    // const deleteResponse = await axios.get(`http://localhost:3001/delete/${openedMealplan.value?.id}`);
    refreshAfterOneSecond();

  }
  catch(error) {
    console.log(error)
  }
}
async function refreshAfterOneSecond() {
  await new Promise(resolve => setTimeout(resolve, 500));
  await fetchUserMealplans(false); // Second call to fetchUserMealplans after 1 second delay
}

const userMealPlanRecords = ref<Record[]>();
const openedMealplan = ref<Record>();
const isRefreshing = ref(false);
async function fetchUserMealplans(enabledLoading = true) {
  isRefreshing.value = true;
  if(enabledLoading) {
  useGlobalStore().startLoading();
  }
  try {
    const pb = new PocketBase('https://mealmind-pocketbase.fly.dev');
    const authData = await pb.admins.authWithPassword('and.markopoulos@gmail.com', 'Eisaimagas101?');
    const userId = useUserStore().userDetails.id
    const resultList = await pb.collection('meal_plans').getList(1, 50, {
      sort: '-created',
      filter: `user_id="${userId}"`,
    });
    userMealPlanRecords.value = resultList.items;
    if(enabledLoading) {
      useGlobalStore().stopLoading();
    }
    isRefreshing.value = false;
  }
  catch {
    if(enabledLoading) {
    useGlobalStore().stopLoading();
    }
    isRefreshing.value = false;
  }
}
function setOpenedMealplan(mealPlanRecord: Record) {
  if(mealPlanRecord.generation_completed) {
    openedMealplan.value = mealPlanRecord;
    showModal()
  }
  else return
}

async function fetchUserDetails() {
  const userId = useUserStore().userDetails.id;
  const pb = new PocketBase('https://mealmind-pocketbase.fly.dev');
  const profileInfo = await pb.collection('users').getOne(userId,{ fields: ['profile_info'] });
  userProfileInfo.value = profileInfo.profile_info;
  userTokens.value = profileInfo.generation_tokens;
}
</script>

<style>
.overflow-y-auto.overflow-x-hidden.fixed.top-0.right-0.left-0.z-50.w-full.h-modal {
  /*top:5em!important;*/
}
/*@media screen and (max-width: 767px) {*/

/*  .overflow-y-auto.overflow-x-hidden.fixed.top-0.right-0.left-0.z-50.w-full.h-modal {*/
/*    top:4.5em!important;*/
/*  }*/

/*}*/

  .overflow-y-auto.overflow-x-hidden.fixed.top-0.right-0.left-0.z-50.w-full.h-modal {}
.rotate {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>