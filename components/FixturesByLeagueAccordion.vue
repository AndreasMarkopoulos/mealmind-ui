<template>
  <div v-if="fixtures.length" class="block overflow-hidden mx-auto sm:max-w-2xl lg:max-w-4xl bg-gray-50 border-b border-gray-200 shadow ">
    <tt-accordion @open-standings="(arg)=>openStandings(arg)" :id="props.leagueId" always-open >
      <template #accordion-title>
        <div class="flex items-center h-7 ">
          <img class="mx-2 w-5 h-5" style="border-radius: 25%" :src="leagueData.flag">
          <p class="text-xs flex mr-2 text-gray-400 truncate text-ellipsis">{{leagueData.country}}<p class="text-xs text-gray-600 ml-1 flex my-auto text-ellipsis truncate">
          {{leagueData.name}}
          <p class="ml-1 text-gray-400 max-w-[48px] truncate text-ellipsis">({{ fixtures.length }})</p></p>
          </p>
        </div>
      </template>
        <!-- <spinner v-if="loading" class="spinner-centered" color="yellow" size="8" /> -->
      <template #accordion-body>
      <div v-for="fixture in fixtures" :key="fixture"
         :class="loading ? 'opacity-20' : ''" class="block border-t bg-white flex hover:bg-gray-50 ">
        <div class="m-auto pl-3 text-xs font-semibold">{{toLocaleDate(fixture.fixture.date, 'time')}} </div>
        <span class="basis-full ml-2 ">
        <div class="flex px-2 pt-2 pb-1 items-center">
              <p v-if="showStandings" :class="highLowClass[fixture.teams.home.rank]" class="text-xs flex border text-center justify-center items-center font-semibold h-4 w-6 mr-2"> <p class="text-gray-400 font-light">#</p>{{ fixture.teams.home.rank }} </p>
            <div class="basis-0 grow flex w-0">
              <img class="w-5 mr-2 self-center" alt="home-logo" :src="fixture.teams.home.logo">
                <p class="text-xs w-full font-semibold text-ellipsis truncate">{{ fixture.teams.home.name }}</p>
            </div>
            <div v-if="showStandings" class="flex justify-start">
              <div class="text-lime-400 bg-white justify-center w-5 sm:w-8 border rounded-md flex mr-0.5 text-xs">
                <p class="hidden sm:block">W:</p>
                <p>{{fixture.teams.home.stats.win}}</p>
              </div>
              <div class="text-gray-400 bg-white justify-center w-5 sm:w-8 border rounded-md flex mr-0.5 text-xs">
                <p class="hidden sm:block">D:</p>
                <p>{{fixture.teams.home.stats.draw}}</p>
              </div>
              <div class="text-red-400 bg-white justify-center w-5 sm:w-8 border rounded-md flex mr-0.5 text-xs">
                <p class="hidden sm:block">L:</p>
                <p>{{fixture.teams.home.stats.lose}}</p>
              </div>
            </div>
          <p class="w-8 text-xs pr-2 font-bold text-right">{{ fixture.goals.home ?? '-' }}</p>
          </div>
          <div class="flex px-2 pb-2 items-center">
              <p v-if="showStandings" :class="highLowClass[fixture.teams.away.rank]" class="text-xs my-auto flex text-center border justify-center items-center font-semibold h-4 w-6 mr-2"> <p class="text-gray-400 font-light">#</p> {{ fixture.teams.away.rank }} </p>
            <div class="basis-0 grow flex w-0">
              <img class="w-5 mr-2 self-center" alt="home-logo" :src="fixture.teams.away.logo">
                <p class="text-xs w-full font-semibold text-ellipsis truncate">{{ fixture.teams.away.name }}</p>
            </div>
            <div v-if="showStandings" class="flex">
              <div class="text-lime-400 bg-white justify-center w-5 sm:w-8 border rounded-md flex mr-0.5 text-xs">
                <p class="hidden sm:block">W:</p>
                <p>{{fixture.teams.away.stats.win}}</p>
              </div>
              <div class="text-gray-400 bg-white justify-center w-5 sm:w-8 border rounded-md flex mr-0.5 text-xs">
                <p class="hidden sm:block">D:</p>
                <p>{{fixture.teams.away.stats.draw}}</p>
              </div>
              <div class="text-red-400 bg-white justify-center w-5 sm:w-8 border rounded-md flex mr-0.5 text-xs">
                <p class="hidden sm:block">L:</p>
                <p>{{fixture.teams.away.stats.lose}}</p>
              </div>
          </div>
          <p class="w-8 text-xs pr-2 font-bold text-right">{{ fixture.goals.away ?? '-' }}</p>
          </div>
          </span>
        </div>
      </template>
    </tt-accordion>
  </div>
</template>

<script setup lang="ts">
import TtAccordion from "~/components/custom/tt-accordion.vue";
import axios from "axios";
import { Spinner } from "flowbite-vue";
import load from "unplugin/dist/webpack/loaders/load";
const props = defineProps({
  leagueId: {
    type: [String,Number],
    required: true,
  },
})

async function openStandings(isChecked) {
  if(isChecked) {
  getFootballStandings(props.leagueId);
  }
  else {
    loading.value = false;
    showStandings.value = isChecked;
  }
}

onMounted(() => {
  getFootballMatches(props.leagueId,);
})

function getTailwindClasses(numbers: number) {
  const classes = [];
  const nums = Array.from({length: numbers}, (_, i) => i + 1);

  nums.forEach(number => {
    if(number<=3) {
      classes.push('text-green-400');
    }
    else if(number < 10) {
      classes.push('text-lime-400');
    }
    else if(number < 15) {
      classes.push('text-yellow-400');
    }
    else {
      classes.push('text-red-400');
    }
  });
  
  return classes;
}
const showStandings = ref(false);
const fixtures = ref([]);
const leagueData = ref([]);
const standings = ref([]);
const highLowClass = ref([]);
const loading = ref(false)
function toLocaleDate(date: string, format: string = '') {
  const utcDate = new Date(date);

  if (format === 'date') {
    return utcDate.toLocaleDateString();
  } else if (format === 'time') {
    return utcDate.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
  } else {
    return utcDate.toLocaleString();
  }
}
async function getFootballMatches(leagueId:string) {
  const date = new Date().toISOString().replace(/T.*/,'').split('-').join('-');
  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
    params: {date: date, league: leagueId, season: '2022'},
    headers: {
      'X-RapidAPI-Key': '90555505ebmshf5c58df86118d82p108901jsn95f1d833ea58',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  };
  axios.request(options).then(function (response) {
    fixtures.value = response.data.response;
    leagueData.value = response.data.response[0] ? response.data.response[0].league : {}
  }).catch(function (error) {
    console.error(error);
  });
}

async function getFootballStandings(leagueId: string) {
  loading.value=true;
  if(standings.value.length > 0) {
    showStandings.value = true;
    loading.value=false;
    return;
  }
  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/standings',
    params: {season: '2022', league: leagueId},
    headers: {
      'X-RapidAPI-Key': '90555505ebmshf5c58df86118d82p108901jsn95f1d833ea58',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  };
  axios.request(options).then(function (response) {
    const teamStandingList = response.data.response[0].league.standings[0].map( (standing: any) => ({team:standing.team,stats:standing.all} ))
    standings.value = teamStandingList;
    highLowClass.value = getTailwindClasses(standings.value.length+1)
    const teamRankings = {}
for (let i = 0; i < standings.value.length; i++) {
  const teamId = standings.value[i].team.id
  teamRankings[teamId] = {rank:i + 1, stats: standings.value[i].stats}
}

// Now we'll iterate through the fixtures and add the team rankings to the home and away fields
for (let i = 0; i < fixtures.value.length; i++) {
  const fixture = fixtures.value[i]
  fixture.teams.home.rank = teamRankings[fixture.teams.home.id].rank
  fixture.teams.home.stats = teamRankings[fixture.teams.home.id].stats
  fixture.teams.away.rank = teamRankings[fixture.teams.away.id].rank
  fixture.teams.away.stats = teamRankings[fixture.teams.away.id].stats
}
showStandings.value = true;
loading.value=false;
  }).catch(function (error) {
    loading.value=false;
    console.error(error);
  });
}
</script>

<style scoped>
.spinner-centered {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 1031;
  width: 2rem;
  height: 2rem;
}
</style>