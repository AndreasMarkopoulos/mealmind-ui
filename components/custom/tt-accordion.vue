<template>
  <div id="accordion-collapse" :data-accordion=" props.alwaysOpen ? 'collapse' : 'open'">
    <h2 id="accordion-collapse-heading-2">
      <button type="button" class="flex items-center justify-between w-full p-2 border font-medium text-left text-gray-500 border-gray-200" data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2">
        <span>{{ props.title }}</span>
        <svg data-accordion-icon class="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
      </button>
    </h2>
    <div id="accordion-collapse-body-2" class="hidden" aria-labelledby="accordion-collapse-heading-2">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import {initAccordions} from "flowbite";
onMounted(()=>{
  initAccordions()
})
onUpdated(()=>{
  initAccordions()
})

const props = defineProps({
  alwaysOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: "Accordion Title"
  }
})
</script>

<style scoped>

</style>