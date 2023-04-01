<template>
  <div :id="accordionId" class="h-full">
    <h2 :id="headingId" >
      <div type="button" @click.self="toggleAccordion" class="flex items-center justify-between w-full p-1.5 font-medium bg-purple-50 text-left text-gray-500 border-gray-200">
        <span @click="toggleAccordion">
        <span v-if="props.title">{{ props.title }}</span>
        <slot v-else name="accordion-title"></slot>
          </span>
        <span class="flex shrink-0" id="league-options">
<!--          <standings-svg id="standings-svg" @click.stop="" class="w-5 mt-0.5 mr-2 h-5 rounded hover:bg-gray-100 "></standings-svg>-->
<!--        <svg data-accordion-icon class="w-6 fill-gray-500 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>-->
<!--          <svg @click.self="toggleAccordion" xmlns="http://www.w3.org/2000/svg" width="15px" viewBox="0 0 1024 1024" :class="!isOpen ? '-rotate-90' : ''" class="fill-gray-500 mr-1 h-4 shrink-0" fill="currentColor" version="1.1"><path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#000000"/></svg>-->
        </span>
      </div>
    </h2>
    <div :id="bodyId" v-if="isOpen" class="shadow">
      <slot name="accordion-body"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import {initAccordions} from "flowbite";
import StandingsSvg from "~/components/svg/StandingsSvg.vue";
onMounted(()=>{
  initAccordions()
})
onUpdated(()=>{
  initAccordions()
})

defineEmits(['openStandings'])


const accordionId = ref(`__TTID__acc__${Math.floor(Math.random() * 1200)}`)
const headingId = ref(`__TTID__acc-heading__${Math.floor(Math.random() * 1200)}`)
const bodyId = ref(`__TTID__acc-body__${Math.floor(Math.random() * 1200)}`)
const isChecked = ref(false)
const isOpen = ref(true);

function toggleAccordion() {
  // isOpen.value = !isOpen.value;
}

const props = defineProps({
  alwaysOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: null
  }
})

</script>

<style scoped>
@media (max-width: 400px) {
  .hide-below-400px {
    display: none;
  }
  .show-below-400px {
    display: block;
  }
}


</style>