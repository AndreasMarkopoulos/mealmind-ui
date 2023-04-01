<template>
  <nav       :class="{ 'navbar--hidden': !showNavbar }"
             style="z-index: 999"
             class="bg-white border-gray-200 px-2 shadow-md sticky top-0 sm:px-4 py-2.5 rounded dark:bg-gray-900 ">
    <div class="container flex flex-wrap items-center h-16 justify-between mx-auto">
      <nuxt-link to="/" class="flex items-center">
        <meal-mind-logo color="#7E3AF2" class="w-48 h-10"/>
<!--        <img src="../assets/images/MealMindLogos/mealmind_logo.svg" style="height: 65px;position: absolute" alt="Top-tipster Logo" />-->
      </nuxt-link>
      <div class="flex items-center md:order-2">
        <div class="flex lg:w-[192px] justify-end">
          <button type="button" class="flex mr-3 sm:ml-125 text-sm rounded-full md:mr-0 focus:shadow-purple focus:shadow-lg focus:ring-purple-200 focus:ring-2 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" :data-dropdown-toggle="isLoggedIn ? 'user-dropdown' : undefined" data-dropdown-placement="bottom">
            <span class="sr-only ">Open user menu</span>
            <img v-if="isLoggedIn" class="w-10 h-10 shadow shadow-purple-500/50 border-purple-300 rounded-full" src="../assets/images/user-female.svg " alt="user photo">
            <nuxt-link v-else to="/login">
<!--              <img class="w-8 h-8 rounded-full" src="../assets/images/user-female.svg" alt="user photo">-->
              <button class="text-purple-600 text font-bold hover:bg-purple-50 text-md border-2 border-purple-500 py-1 rounded-md px-2">Login</button>
            </nuxt-link>
          </button>
        </div>
        <!-- Dropdown menu -->
        <div v-if="isLoggedIn" class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
          <div class="px-4 py-3">
            <span class="block text-sm text-gray-900 dark:text-white">{{ userStore.userDetails.username }}</span>
            <span class="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{{ userStore.userDetails.email }}</span>
          </div>
          <ul class="py-2" aria-labelledby="user-menu-button">
            <li>
              <nuxt-link active-class="text-purple-500" to="/my-meal-plans" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">My Meal Plans</nuxt-link>
            </li>
            <li>
              <nuxt-link active-class="text-purple-500" to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/" @click="logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</nuxt-link>
            </li>
          </ul>
        </div>
        <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        </button>
      </div>
      <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
        <ul class="flex items-center flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <nuxt-link to="/" active-class="text-purple-500" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purple md:p-0">Home</nuxt-link>
          </li>
<!--          <li>-->
<!--            <nuxt-link to="/about" active-class="text-purple-500" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purple md:p-0">About</nuxt-link>-->
<!--          </li>-->
<!--          <li>-->
<!--            <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>-->
<!--          </li>-->
          <li>
            <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Pricing</a>
          </li>
          <li>
            <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
          </li>
          <li>
            <nuxt-link to="/generate-mealplan" active-class="ring-4 ring-purple-300" class="w-full tracking-tight text-white text-xs bg-[#7E3AF2] hover:bg-[#662EC6] focus:ring-4 focus:ring-purple-300 focus:outline-none font-medium rounded-lg text-sm px-3 py-2.5 text-center">Get your meal plan!</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import {initCollapses, initDropdowns} from "flowbite";
import {useUserStore} from "~/store/UserStore";
import MealMindLogo from "~/components/svg/MealMindLogo.vue";
onMounted(()=>{
  initCollapses();
  initDropdowns();
  window.addEventListener('scroll', onScroll)
})
onUpdated(()=>{
  initCollapses();
  initDropdowns();
})
onBeforeUnmount(()=>{
  window.removeEventListener('scroll', onScroll)
})

function onScroll() {
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
  if (currentScrollPosition < 0) {
    return
  }
  // Stop executing this function if the difference between
  // current scroll position and last scroll position is less than some offset
  if (Math.abs(currentScrollPosition - lastScrollPosition.value) < 60) {
    return
  }
  showNavbar.value = currentScrollPosition < lastScrollPosition.value
  lastScrollPosition.value= currentScrollPosition
}
const showNavbar = ref(true);
const lastScrollPosition = ref(0);
const userStore = useUserStore()
const isLoggedIn = computed(() => userStore.loggedIn)
function logout() {
  userStore.logout();
}
function goToLogin() {
  navigateTo("/")
}
</script>

<style scoped>
@media screen and (min-width: 500px) {
  sm\:ml-125 {
    margin-left: 125px
  }
}
.navbar--hidden {
  box-shadow: none;
  transform: translate3d(0, -100%, 0);
  transition: all 0.3s ease-in-out; /* add this line */
}
</style>