<template>
  <section class="bg-gray-50">
    <div
        class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
        <img class="w-32"
             src="../assets/images/logo_transparent_sm.png"
             alt="logo">
      </a>
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
              class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
          >
            Sign in to your account
          </h1>
          <div class="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900"
              >Username or Email</label
              >
              <input
                  v-model="usernameOrEmail"
                  id="email"
                  type="email"
                  name="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required=""
              />
              <p v-if="isInputInvalid" class="text-red-500 text-xs ml-1">Invalid Username/Email and Password combination</p>
            </div>
            <div>
              <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900"
              >Password</label
              >
              <input
                  id="password"
                  v-model="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required=""
              />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                      required=""
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-gray-500"
                  >Remember me</label
                  >
                </div>
              </div>
              <a
                  href="#"
                  class="text-sm font-medium text-primary-600 hover:underline"
              >Forgot password?</a
              >
            </div>
            <button
                @click="login"
                type="submit"
                class="w-full text-white bg-amber-500 hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign in
            </button>
            <p class="text-sm font-light text-gray-500">
              Don’t have an account yet?
              <nuxt-link
                  to="signup"
                  class="font-medium text-primary-600 hover:underline"
              >Sign up
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
import PocketBase from "pocketbase";
import {useUserStore} from "~/store/UserStore";
import {useGlobalStore} from "~/store/GlobalStore";

const isInputInvalid = ref(false);
const usernameOrEmail = ref("");
const password = ref("");
const globalStore = useGlobalStore();
const userStore = useUserStore();

async function login() {
  try {
    globalStore.startLoading();
    isInputInvalid.value = false;
    const pb = new PocketBase('http://127.0.0.1:8090');
    const authData = await pb.collection('users').authWithPassword(
        usernameOrEmail.value,
        password.value,
    );
    const authedUserData = {
      avatar: authData.record.avatar,
      created: authData.record.created,
      email: authData.record.email,
      emailVisibility: authData.record.emailVisibility,
      id: authData.record.id,
      updated: authData.record.updated,
      username: authData.record.username,
      verified: authData.record.verified,
      isNew: authData.record.isNew,
    }
    userStore.login(authedUserData,authData.token);
    navigateTo("/");
    globalStore.stopLoading();
  }
  catch (error: any) {
    globalStore.stopLoading();
    isInputInvalid.value = true;
  }

}

</script>
