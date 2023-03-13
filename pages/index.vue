<template>
  <div class="h-10"></div>
  <div class="border mx-auto sm:max-w-2xl lg:max-w-4xl">
    <fixtures-by-league-accordion v-for="id in leagueIds" :league-id="id"></fixtures-by-league-accordion>
  </div>
</template>

<script setup lang="ts">
import FixturesByLeagueAccordion from "~/components/FixturesByLeagueAccordion.vue";
const leagueIds = ref([39,78,140,135,197,2,3,848,61,94,233
]);
// const leagueIds = ref([233,518]);
</script>

<style scoped>

</style>