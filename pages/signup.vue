<template>
  <signup-form/>
</template>

<script setup>
import {useUserStore} from "~/store/UserStore";

if(useUserStore().loggedIn) {
  navigateTo('/')
}
</script>

<style scoped>

</style>