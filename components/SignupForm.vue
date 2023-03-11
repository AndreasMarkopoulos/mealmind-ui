<template>
  <section class="bg-gray-50">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
        <img class="w-32"
             src="../assets/images/logo_transparent_sm.png"
             alt="logo">
      </a>
      <div
          class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Create an account
          </h1>
          <div class="space-y-4 md:space-y-6">
            <div>
              <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
              <input type="text" name="username" id="username"
                     v-model="username"
                     :class="isUsernameError ? invalidInputClass : neutralInputClass"
                     placeholder="Masterbetter123" required="">
              <p v-if="isUsernameError" class="text-red-500 text-xs ml-1">Username is not available</p>
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
              <input type="email" name="email" id="email"
                     v-model="email"
                     :class="isEmailError ? invalidInputClass : neutralInputClass"
                     placeholder="master@better.com" required="">
              <p v-if="isEmailError" class="text-red-500 text-xs ml-1">There is already an account registered to this
                email</p>
            </div>
            <div>
              <label for="password"
                     class="block mb-2 text-sm font-medium text-gray-900">Password</label>
              <input type="password" name="password" id="password" placeholder="••••••••"
                     v-model="password"
                     :class="neutralInputClass"
                     required="">
            </div>
            <div>
              <label for="confirm-password"
                     class="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
              <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••"
                     v-model="passwordConfirm"
                     :class="isPasswordConfirmError ? invalidInputClass : neutralInputClass"
                     required="">
            </div>
            <button data-tooltip-target="tooltip-default" data-tooltip-placement="bottom" type="button" :disabled="!isSignupAllowed"
                    @click="signUp"
                    :class="isSignupAllowed ? enabledClass : disabledClass">Sign up</button>
            <div v-if="password.length < 8" id="tooltip-default" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-600 rounded-md shadow-sm opacity-0 tooltip">
              Password must be at least 8 characters long
              <div class="tooltip-arrow" data-popper-arrow></div>
            </div>
            <div v-else-if="passwordConfirm !== password" id="tooltip-default" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-600 rounded-md shadow-sm opacity-0 tooltip">
              Passwords don't match
              <div class="tooltip-arrow" data-popper-arrow></div>
            </div>
            <div v-else id="tooltip-default"></div>
            <p class="text-sm font-light text-gray-500">
              Already have an account?
              <nuxt-link
                  to="/"
                  class="font-medium text-primary-600 hover:underline"
              >Sign in
              </nuxt-link
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {initTooltips} from "flowbite";
import PocketBase from 'pocketbase';
onUpdated(() => {
  initTooltips();
})
onMounted(() => {
  initTooltips();
})
//styles
const enabledClass = 'w-full text-white bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center';
const disabledClass = 'w-full text-white bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center';

const neutralInputClass = "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5";
// const validInputClass = "w-full px-4 py-2 text-green-900 placeholder-green-700 border border-green-500 rounded outline-none focus:ring-green-500 focus:border-green-500 focus:ring-1";
const invalidInputClass = "w-full px-4 py-2 text-red-900 placeholder-red-700 border border-red-500 rounded outline-none focus:ring-red-500 focus:border-red-500 focus:ring-1";

//user input
const username = ref("");
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");

//booleans
const isSignupAllowed = computed(() => {
    return password.value.length > 7 && passwordConfirm.value === password.value
})
const isEmailError = ref(false);
const isUsernameError = ref(false);
const isPasswordConfirmError = ref(false);

async function signUp() {
  isEmailError.value = false;
  isUsernameError.value = false;
  isPasswordConfirmError.value = false;
  if (password.value !== passwordConfirm.value) {
    isPasswordConfirmError.value = true;
  }
  try {
    const pb = new PocketBase('http://127.0.0.1:8090');
    await pb.collection('users').create({
      "username": username.value,
      "email": email.value,
      "emailVisibility": true,
      "password": password.value,
      "passwordConfirm": passwordConfirm.value
    });
  } catch (error: any) {
    if (Object.keys(error.data.data).includes('email')) {
      isEmailError.value = true;
    }
    if (Object.keys(error.data.data).includes('username')) {
      isUsernameError.value = true;
    }
  }
}
</script>

<style scoped>

</style>