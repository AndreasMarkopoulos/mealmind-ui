<template>
  <div class="h-10"></div>
  <div class="border mx-auto sm:max-w-2xl lg:max-w-4xl">
    <games-by-league-accordion v-for="id in leagueIds" :league-id="id"></games-by-league-accordion>
  </div>
</template>

<script setup lang="ts">
import GamesByLeagueAccordion from "~/components/GamesByLeagueAccordion.vue";
const leagueIds = ref([39,78,140,135,197,2,3,848,61,94]);
</script>

<style scoped>

</style>