<template>
<navbar/>
  <div class="w-full h-full top-0 fixed bg-radial-pattern" style="z-index: -1; opacity: 0.07"></div>
  <transition name="fade" mode="out-in">
    <loading v-if="isLoading" />
  </transition>
  <slot/>

</template>

<script setup>
import {useGlobalStore} from "~/store/GlobalStore";

const isLoading = computed(()=>{
  return useGlobalStore().loading > 0
})

</script>

<style scoped>

</style>