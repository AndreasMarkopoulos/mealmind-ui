<template>
  <div class="block h-full bg-glass max-w-7xl mx-auto mb-10 mt-28 p-6 border border-gray-200 rounded-md shadow">
    <div class="float-right flex">
      <p v-if="isIncomplete" class="mr-4 mt-1.5 text-red-400">Please fill out all the details</p>
      <button v-if="!isEdit" @click="toggleIsEdit" class="min-w-15 mt-10 sm:mt-0 float-right bg-[#7E3AF2] border-2 border-[#7E3AF2] hover:bg-[#662EC6] focus:ring-4 focus:ring-purple-300 focus:outline-none rounded-md text-white px-3 py-1.5 text-center">
        <span class="flex">
          <img src="../assets/images/edit-profile.svg" class="w-5" alt="">
          <p class="ml-1.5 hidden sm:block">Edit</p>
        </span>
      </button>
      <button v-else @click="toggleIsEdit" class="w-15 float-right border-2 text-purple-600 font-semibold bg-white border-[#7E3AF2] hover:text-[#662EC6] focus:ring-4 focus:ring-purple-300 focus:outline-none rounded-md px-3 py-1.5 text-center">Save</button>
    </div>
    <button class="border-2 group border-gray-300 bg-purple-100 w-40 overflow-hidden" style="border-radius: 100%; position: absolute; left:50%; transform:translate(-50%,-63%)">
      <img src="../assets/images/user-female.svg" class="w-40 group-hover:bg-gray-300 group-hover:opacity-20">
      <img src="../assets/images/edit-profile.svg" class="w-10 hidden group-hover:block" style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%)">
    </button>
    <div class="mt-24">
  <div class="">
    <div class="flex flex-col items-center md:flex-row mb-5 justify-between mx-auto">
      <div class="">
        <label for="age" class="ml-1 font-semibold text-sm">Age :</label>
        <vue-number-input :disabled="!isEdit" v-model="age" controls center :min="14" :max="80" placeholder="14" class="w-48 mt-1 mb-4" id="age"></vue-number-input>
<!--        <div v-else class="w-48 align-middle text-center rounded-md mt-1 mb-3.5 h-[40px] bg-white pt-2 pb-1 border">{{age}}</div>-->
      </div>
      <div class="">
        <label for="height" class="ml-1 font-semibold text-sm">Height (cm) :</label>
        <vue-number-input :disabled="!isEdit" v-model="height" controls center :min="100" :max="290" placeholder="100" class="w-48 mt-1 mb-4" id="height"></vue-number-input>
      </div>
      <div class="w-48">
        <label for="weight" class="font-semibold text-sm">Weight (kg) :</label>
        <vue-number-input :disabled="!isEdit" v-model="weight" controls center :min="30" :max="300" placeholder="30" class="w-48 mt-1 mb-4" id="weight"></vue-number-input>
      </div>
    </div>
  </div>
  <label for="gender" class="ml-1 font-semibold text-sm">Gender :</label>
  <ul id="gender" class="items-center mt-1 mb-5 w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r sm:border-b dark:border-gray-600">
      <div class="flex items-center pl-3" :class="!isEdit ? 'bg-[#f8f8f8]' : ''" >
        <input :disabled="!isEdit" :class="!isEdit ? 'text-gray-500' : 'text-purple-600'" v-model="gender" value="male" id="radio-male" type="radio" name="gender-select" class="w-4 h-4 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
        <label for="radio-male" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>
      </div>
    </li>
    <li class="w-full dark:border-gray-600">
      <div class="flex items-center pl-3 " :class="!isEdit ? 'bg-[#f8f8f8]' : ''"  >
        <input :disabled="!isEdit" :class="!isEdit ? 'text-gray-500' : 'text-purple-600'" v-model="gender" value="female" id="radio-female" type="radio" name="gender-select" class="w-4 h-4 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
        <label for="radio-female" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>
      </div>
    </li>
  </ul>
  <label for="goal" class="ml-1 font-semibold text-sm">Goal :</label>
  <ul id="goal" class="items-center mt-1 mb-7 w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:grid grid-cols-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r sm:border-b dark:border-gray-600">
      <div class="flex items-center pl-3" :class="!isEdit ? 'bg-[#f8f8f8]' : ''">
        <input :disabled="!isEdit" :class="!isEdit ? 'text-gray-500' : 'text-purple-600'" v-model="goal" id="radio-loose" type="radio" value="Loose weight" name="goal-options" class="w-4 h-4 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
        <label for="radio-loose" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Loose Weight</label>
      </div>
    </li>
    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r sm:border-b dark:border-gray-600">
      <div class="flex items-center pl-3" :class="!isEdit ? 'bg-[#f8f8f8]' : ''">
        <input :disabled="!isEdit" :class="!isEdit ? 'text-gray-500' : 'text-purple-600'" v-model="goal" id="radio-maintain" type="radio" value="Stay fit" name="goal-options" class="w-4 h-4 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
        <label for="radio-maintain" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Stay Fit</label>
      </div>
    </li>
    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r sm:border-b dark:border-gray-600">
      <div class="flex items-center pl-3" :class="!isEdit ? 'bg-[#f8f8f8]' : ''">
        <input :disabled="!isEdit" :class="!isEdit ? 'text-gray-500' : 'text-purple-600'" v-model="goal" id="radio-build-muscle" type="radio" value="Build muscle" name="goal-options" class="w-4 h-4 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
        <label for="radio-build-muscle" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Build Muscle</label>
      </div>
    </li>
    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r sm:border-b dark:border-gray-600">
      <div class="flex items-center pl-3" :class="!isEdit ? 'bg-[#f8f8f8]' : ''">
        <input :disabled="!isEdit" :class="!isEdit ? 'text-gray-500' : 'text-purple-600'" v-model="goal" id="radio-gain" type="radio" value="Gain weight" name="goal-options" class="w-4 h-4 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
        <label for="radio-gain" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Gain weight</label>
      </div>
    </li>
    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r sm:border-b dark:border-gray-600">
      <div class="flex items-center pl-3" :class="!isEdit ? 'bg-[#f8f8f8]' : ''">
        <input :disabled="!isEdit" :class="!isEdit ? 'text-gray-500' : 'text-purple-600'" v-model="goal" id="radio-improve-athletic" type="radio" value="Improve athletic performance" name="goal-options" class="w-4 h-4 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
        <label for="radio-improve-athletic" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Improve athletic performance</label>
      </div>
    </li>
    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r sm:border-b dark:border-gray-600">
      <div class="flex items-center pl-3" :class="!isEdit ? 'bg-[#f8f8f8]' : ''">
        <input :disabled="!isEdit" :class="!isEdit ? 'text-gray-500' : 'text-purple-600'" v-model="goal" id="radio-improve-health" type="radio" value="Improve overall health" name="goal-options" class="w-4 h-4 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
        <label for="radio-improve-health" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Improve overall health</label>
      </div>
    </li>
    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r sm:border-b dark:border-gray-600">
      <div class="flex items-center pl-3" :class="!isEdit ? 'bg-[#f8f8f8]' : ''">
        <input :disabled="!isEdit" :class="!isEdit ? 'text-gray-500' : 'text-purple-600'" v-model="goal" id="radio-reduce-stress" type="radio" value="Reduce stress and anxiety" name="goal-options" class="w-4 h-4 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
        <label for="radio-reduce-stress" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Reduce stress and anxiety</label>
      </div>
    </li>
    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r sm:border-b dark:border-gray-600">
      <div class="flex items-center pl-3" :class="!isEdit ? 'bg-[#f8f8f8]' : ''">
        <input :disabled="!isEdit" :class="!isEdit ? 'text-gray-500' : 'text-purple-600'" v-model="goal" id="radio-increase-energy" type="radio" value="Increase energy levels" name="goal-options" class="w-4 h-4 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
        <label for="radio-reduce-stress" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Increase energy levels</label>
      </div>
    </li>
  </ul>
  <label for="steps-range" class="block mb-2 ml-1 text-sm font-medium text-gray-900 dark:text-white">How active are you? </label>
  <input :disabled="!isEdit" v-model="activityLevel" id="steps-range" type="range" min="0" max="4" step="1" class="w-full h-2 mb-4 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
  <p class="text-xs text-gray-500 mb-5 ml-1">{{ activityLevelText[activityLevel] }}</p>
  <label class="ml-1 font-semibold text-sm" for="">Dietary restrictions :</label>
  <input :readonly="!isEdit" @change="onChange" name='tags' class="custom-tag-input" placeholder="Eg. Diabetic, Vegan..." autocomplete>
    </div>
  </div>
</template>

<script setup lang="ts">
import VueNumberInput from '@chenfengyuan/vue-number-input'
import Tagify from '@yaireo/tagify'
import '@yaireo/tagify/dist/tagify.css';
import {useGlobalStore} from "~/store/GlobalStore";
import PocketBase from "pocketbase";
import {useUserStore} from "~/store/UserStore";
import tagify from "@yaireo/tagify/dist/tagify.vue";

onMounted(()=>{
  fetchUserInfo();
  let input = document.querySelector('input[name=tags]');

// initialize Tagify on the above input node reference
  tagifyInput.value = new Tagify(input, {
    whitelist : ['Diabetic', 'Lactose Intolerant', 'Gluten Intolerant', 'Cholesterol Restricted','Vegan','Vegetarian','Halal','Celiac Disease','Hypertension'],
    dropdown : {
      classname: "tagify-dropdown",
      enabled: 0,              // show the dropdown immediately on focus
      maxItems: 5,
      position: "text",         // place the dropdown near the typed text
      closeOnSelect: false,          // keep the dropdown open after selecting a suggestion
      highlightFirst: true,
    }
  })
})

const weight = ref(65);
const age = ref(30);
const height = ref(180);
const gender = ref('male');
const goal = ref('Loose weight');
const activityLevel = ref(1);
const activityLevelText = {
  0: "Sedentary (little or no exercise)",
  1: "Lightly active (exercise 1–3 days/week)",
  2: "Moderately active (exercise 3–5 days/week)",
  3: "Active (exercise 6–7 days/week)",
  4: "Very active (hard exercise 6–7 days/week)"
};
// const isLoggedIn = computed(()=>useUserStore().loggedIn)
const isLoggedIn = true
const dietRestrictions = ref([])
const emit = defineEmits(['generate'])
const isEdit = ref(false)
const tagifyInput = ref();
const isIncomplete = ref(false);
function submit() {
  if(weight.value && age.value && height.value && gender.value && goal.value && activityLevel.value && dietRestrictions.value) {
    emit('generate',{weight:weight.value,age:age.value,height:height.value,gender:gender.value,goal:goal.value,activityLevel:activityLevel.value,dietRestrictions:dietRestrictions.value})
  }
  else console.log('Please fill in all inputs')
}
function toggleIsEdit() {
  if(isEdit.value) {
    if(weight.value && age.value && height.value && gender.value && goal.value && activityLevel.value && dietRestrictions.value) {
      isIncomplete.value = false;
      updateUserInfo();
    }
    else {
      isIncomplete.value = true;
      return
    }
  }
  isEdit.value = !isEdit.value;
  tagifyInput.value.setReadonly(!isEdit.value)
}
async function fetchUserInfo() {
  useGlobalStore().startLoading();
  try {
    const pb = new PocketBase('https://mealmind-pocketbase.fly.dev');
    const authData = await pb.admins.authWithPassword('and.markopoulos@gmail.com', 'Eisaimagas101?');
    const userId = useUserStore().userDetails.id
    const resultList = await pb.collection('users').getOne(userId)
    const profile_info = resultList.profile_info;
    gender.value = profile_info.gender;
    age.value = profile_info.age;
    goal.value = profile_info.goal;
    weight.value = profile_info.weight;
    dietRestrictions.value = profile_info.dietRestrictions
    tagifyInput.value.addTags(profile_info.dietRestrictions)
    console.log(dietRestrictions.value)
    height.value = profile_info.height;
    activityLevel.value = profile_info.activityLevel;
    useGlobalStore().stopLoading();
  }
  catch {
    useGlobalStore().stopLoading();
  }
}
function onChange(e: any){
  if(e.target.value) {
    dietRestrictions.value = JSON.parse(e.target.value).map((obj) => obj.value);
  }
  else {
    dietRestrictions.value = [];
  }
}

async function updateUserInfo() {
  try {
    console.log({weight:weight.value,age:age.value,height:height.value,gender:gender.value,goal:goal.value,activityLevel:activityLevel.value,dietRestrictions:dietRestrictions.value})
    useGlobalStore().startLoading();
    const pb = new PocketBase('https://mealmind-pocketbase.fly.dev');
    const userId = useUserStore().userDetails.id
    const data = {
      "profile_info": {weight:weight.value,age:age.value,height:height.value,gender:gender.value,goal:goal.value,activityLevel:activityLevel.value,dietRestrictions:dietRestrictions.value}
    };
    const record = await pb.collection('users').update(userId, data);
    useGlobalStore().stopLoading();
  }
  catch (error) {
    useGlobalStore().stopLoading();
    console.log(error)
  }
}
</script>

<style>
/*.tagify__input{*/
/*  display:none!important;*/
/*}*/

</style>