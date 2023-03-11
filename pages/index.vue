<template>
  <div class="block max-w-4xl mx-auto bg-white border border-gray-200 mt-5 shadow hover:bg-gray-100">
    <tt-accordion always-open title="Premier League">
      <a v-for="fixture in fixtures" :key="fixture" href="#"
         class="block md:flex shadow border-gray-200  hover:bg-gray-100">
          <div class="flex px-2 pt-2 pb-1 items-center">
            <div class="w-5/12 flex">
              <img class="w-5 sm:w-4 mr-2 self-center" alt="home-logo" :src="fixture.teams.home.logo">
              <div class="flex flex-col">
                <p class="text-xs font-semibold">{{ fixture.teams.home.name }}</p>
              </div>
            </div>
            <div class="w-5/12 flex justify-end items-center"></div>
          <p class="w-1/6 text-xs pr-2 sm:text-sm font-bold text-right">{{ fixture.goals.home ?? '-' }}</p>
          </div>
          <div class="flex px-2 pb-2 items-center">
            <div class="w-5/12 flex">
              <img class="w-5 sm:w-6 mr-2 self-center" alt="home-logo" :src="fixture.teams.away.logo">
              <div class="flex flex-col">
                <p class="text-xs font-semibold">{{ fixture.teams.away.name }}</p>
              </div>
            </div>
            <div class="w-5/12 flex justify-end items-center"></div>
          <p class="w-1/6 text-xs pr-2 sm:text-sm font-bold text-right">{{ fixture.goals.away ?? '-' }}</p>
          </div>
      </a>
    </tt-accordion>
  </div>
</template>

<script setup lang="ts">
import TtAccordion from "~/components/custom/tt-accordion.vue";
import axios from "axios";

onMounted(() => {
  getFootballMatches()
})
const fixtures = ref([]);

async function getFootballMatches() {
  const response = await axios.get('schedule_test.json');
  fixtures.value = response.data.response;
  console.log(fixtures.value[0])
}
</script>

<style scoped>

</style>