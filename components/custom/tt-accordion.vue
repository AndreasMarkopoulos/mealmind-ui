<template>
  <div :id="accordionId">
    <h2 :id="headingId" >
      <button type="button" @click.self="toggleAccordion" class="flex items-center justify-between w-full p-1 font-medium  text-left text-gray-500 border-gray-200">
        <span @click="toggleAccordion">
        <span v-if="props.title">{{ props.title }}</span>
        <slot v-else name="accordion-title"></slot>
          </span>
        <span class="flex shrink-0" id="league-options">
          <label id="show-stats-button" v-if="isOpen" class="relative items-center flex cursor-pointer mr-4">
            <standings-svg :fill-class="!isChecked ? 'fill-gray-400' : 'fill-green-400'" class="h-3 hidden show-below-400px"></standings-svg>
            <p v-if="!isChecked" class="text-xs hide-below-400px my-auto text-gray-300 text-end px-2">SHOW DETAILS</p>
            <p v-else class="text-xs my-auto hide-below-400px text-gray-300 text-end text-green-400 px-2" >HIDE DETAILS</p>
            <input v-model="isChecked" @click="$emit('openStandings',!isChecked)" type="checkbox" value="" class="sr-only underlinde peer hide-below-400px mt-4 h-1">
            <div class="hide-below-400px w-5 my-auto h-2.5 bg-gray-200 outline-none ring-gray-200 peer-focus:ring-green-400 rounded-full peer peer-checked:after:translate-x-full  after:border-gray-400 after:content-[''] after:absolute after:top-[3px] after:border after:bg-white after:rounded-full after:h-2.5 after:w-2.5 after:transition-all peer-checked:bg-green-400"></div>
          </label>
<!--          <standings-svg id="standings-svg" @click.stop="" class="w-5 mt-0.5 mr-2 h-5 rounded hover:bg-gray-100 "></standings-svg>-->
<!--        <svg data-accordion-icon class="w-6 fill-gray-500 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>-->
          <svg @click.self="toggleAccordion" xmlns="http://www.w3.org/2000/svg" width="15px" viewBox="0 0 1024 1024" :class="!isOpen ? '-rotate-90' : ''" class="fill-gray-500 mr-1 h-4 shrink-0" fill="currentColor" version="1.1"><path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#000000"/></svg>
        </span>
      </button>
    </h2>
    <div :id="bodyId" v-if="isOpen">
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
const isOpen = ref(false);

function toggleAccordion() {
  isOpen.value = !isOpen.value;
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