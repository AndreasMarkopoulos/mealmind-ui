<template>
  <login-form/>
</template>

<script setup lang="ts">
import {useUserStore} from "~/store/UserStore";

if(useUserStore().loggedIn) {
  navigateTo('/')
}
</script>

<style scoped>

</style>