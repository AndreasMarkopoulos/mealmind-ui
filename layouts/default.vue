<template>
<navbar v-if="useGlobalStore().navbarVisible"/>
  <transition name="fade" mode="out-in">
    <loading v-if="isLoading" />
  </transition>
  <slot/>
  <div class="absolute top-[-5000px]">
    <a href="www.lucky-goblin.com">www.lucky-goblin.com</a>
    <a href="https://www.lucky-goblin.com">www.lucky-goblin.com</a>
    <a href="lucky-goblin.com">www.lucky-goblin.com</a>
  </div>
</template>

<script setup>
import {useGlobalStore} from "~/store/GlobalStore";

const isLoading = computed(()=>{
  return useGlobalStore().loading > 0
})

</script>

<style scoped>

</style>