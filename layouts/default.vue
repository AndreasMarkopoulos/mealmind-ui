<template>
<navbar/>
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