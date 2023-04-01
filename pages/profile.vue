<template>
  <profile-info></profile-info>
</template>

<script setup>
import {useUserStore} from "~/store/UserStore";

if(!useUserStore().loggedIn) {
  navigateTo('/login')
}
</script>

<style scoped>

</style>