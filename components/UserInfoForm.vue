<template>
  <div class="block bg-glass max-w-4xl mx-auto my-10 p-6 border border-gray-200 rounded-md shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 class="mb-10 text-2xl font-bold tracking-tight text-purple-600 dark:text-white text-center text-engraved">Get your personalized meal plan now!</h5>
    <div class="flex flex-col items-center sm:flex-row justify-between mx-auto">
      <div class="">
        <label for="age" class="ml-1 font-semibold text-sm">Age* :</label>
        <vue-number-input v-model="age" controls center :min="14" :max="80" placeholder="14" class="w-48 mt-1 mb-4" id="age"></vue-number-input>
      </div>
      <div class="">
        <label for="height" class="ml-1 font-semibold text-sm">Height (cm)* :</label>
        <vue-number-input v-model="height" controls center :min="100" :max="290" placeholder="180" class="w-48 mt-1 mb-4" id="height"></vue-number-input>
      </div>
      <div class="">
      <label for="weight" class="ml-1 font-semibold text-sm">Weight (kg)* :</label>
      <vue-number-input v-model="weight" controls center :min="30" :max="300" placeholder="65" class="w-48 mt-1 mb-4" id="weight"></vue-number-input>
      </div>
    </div>
    <label for="gender" class="ml-1 font-semibold text-sm">Gender* :</label>
    <ul id="gender" class="items-center mt-1 mb-4 w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
        <div class="flex items-center pl-3">
          <input v-model="gender" value="male" id="radio-male" type="radio" name="gender-select" class="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
          <label for="radio-male" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>
        </div>
      </li>
      <li class="w-full dark:border-gray-600">
        <div class="flex items-center pl-3">
          <input v-model="gender" value="female" id="radio-female" type="radio" name="gender-select" class="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
          <label for="radio-female" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>
        </div>
      </li>
    </ul>
    <label for="gender" class="ml-1 font-semibold text-sm">Goal* :</label>
    <ul id="gender" class="items-center mt-1 mb-4 w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
        <div class="flex items-center pl-3">
          <input v-model="goal" id="radio-loose" type="radio" value="loose" name="goal-options" class="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
          <label for="radio-loose" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Loose Weight</label>
        </div>
      </li>
      <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
        <div class="flex items-center pl-3">
          <input v-model="goal" id="radio-maintain" type="radio" value="maintain" name="goal-options" class="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
          <label for="radio-maintain" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Maintain Weight </label>
        </div>
      </li>
      <li class="w-full dark:border-gray-600">
        <div class="flex items-center pl-3">
          <input v-model="goal" id="radio-gain" type="radio" value="gain" name="goal-options" class="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
          <label for="radio-gain" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Gain Weight</label>
        </div>
      </li>
    </ul>
    <label for="steps-range" class="block mb-2 ml-1 text-sm font-medium text-gray-900 dark:text-white">How active are you? </label>
    <input v-model="activityLevel" id="steps-range" type="range" min="0" max="4" step="1" class="w-full h-2 mb-4 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
    <p class="text-xs text-gray-500 mb-5 ml-1">{{ activityLevelText[activityLevel] }}</p>
    <label class="ml-1 font-semibold text-sm" for="">Dietary restrictions :</label>
    <input @change="onChange" name='tags' class="custom-tag-input" placeholder="Eg. Diabetic, Vegan..." autocomplete>
    <button @click="submit" :disabled="!canSubmit || props.submitDisabled" :class="(!canSubmit || props.submitDisabled) ? 'bg-gray-400' : 'bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300'" type="button" class="focus:outline-none w-full text-white  font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mt-4 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Get your meal plan!</button>
  </div>
</template>

<script setup>
import VueNumberInput from '@chenfengyuan/vue-number-input'
import Tagify from '@yaireo/tagify'
import '@yaireo/tagify/dist/tagify.css';

const props = defineProps({
  submitDisabled: {
    type: Boolean,
    default: false
  }
})

onMounted(()=>{
  let input = document.querySelector('input[name=tags]');

// initialize Tagify on the above input node reference
  new Tagify(input, {
    whitelist : ['Diabetic', 'Lactose Intolerant', 'Gluten Intolerant', 'Cholesterol Restricted','Vegan','Vegetarian','Halal','Celiac Disease','Hypertension'],
    dropdown : {
      classname: "tagify-dropdown",
      enabled: 0,              // show the dropdown immediately on focus
      maxItems: 5,
      position: "text",         // place the dropdown near the typed text
      closeOnSelect: false,          // keep the dropdown open after selecting a suggestion
      highlightFirst: true
    }
    })
})

const weight = ref(65);
const age = ref(30);
const height = ref(180);
const gender = ref();
const goal = ref();
const activityLevel = ref(1);
const dietPreference = ref('none');
const activityLevelText = {
  0: "Sedentary (little or no exercise)",
  1: "Lightly active (exercise 1–3 days/week)",
  2: "Moderately active (exercise 3–5 days/week)",
  3: "Active (exercise 6–7 days/week)",
  4: "Very active (hard exercise 6–7 days/week)"
};
const dietRestrictions = ref('')
const emit = defineEmits(['generate'])
const canSubmit = computed(() => weight.value && age.value && height.value && gender.value && goal.value)
function submit() {
  if(weight.value && age.value && height.value && gender.value && goal.value) {
    emit('generate',{weight:weight.value,age:age.value,height:height.value,gender:gender.value,goal:goal.value,activityLevel:activityLevel.value,dietRestrictions:dietRestrictions.value})
  }
  else console.log('Please fill in all inputs')
}
function onChange(e){
  if(e.target.value) {
    dietRestrictions.value = JSON.parse(e.target.value).map(obj => obj.value);
  }
}

</script>

<style>
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: none;
  border-radius: 50%;
  background: #7e3af2;
}
/*.bg-radial-pattern {*/
/*  background-color: #e5e5f7;*/
/*  background-image:  repeating-radial-gradient( circle at 0 0, transparent 0, #e5e5f7 29px ), repeating-linear-gradient( #7e3af255, #7e3af2 );*/
/*}*/
.bg-glass {
  background: rgba( 255, 255, 255, 0.5 );
  box-shadow: 0 8px 22px 0 rgba( 31, 38, 135, 0.1 );
  backdrop-filter: blur( 3px );
  -webkit-backdrop-filter: blur( 4px );
}
.text-engraved {
  color: transparent;
  /*background: #666666;*/
  background: #7e3af2;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  text-shadow: 0px 3px 3px rgba(255,255,255,0.2);
}
html {
  scroll-behavior: smooth;
}
body {
  font-family: 'Plus Jakarta Sans', sans-serif!important;
  word-spacing: 2px;
}
.custom-tag-input {
  --tags-border-color: #7E3AF2;
  border-radius: 8px;
  width: 100%;
  margin-top: 0.5rem;
}

.tagify-dropdown .tagify__dropdown__item--active{
  background: #7E3AF2;
}

.tagify__dropdown__wrapper {
  margin-top: 7px;
  padding: 1px;
  border-radius: 2px;
  border: 1px solid #7E3AF2;;
}
.tagify-dropdown .tagify__dropdown__item:hover {
  background: #7E3AF2;
}
</style>