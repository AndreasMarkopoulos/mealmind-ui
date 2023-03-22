<template>
  <section>
    <div class="flex flex-col items-center mt-10 px-6 py-8 mx-auto md:h-full lg:py-0">
      <a href="#" class="flex items-center text-2xl font-semibold text-gray-900">
        <meal-mind-logo stacked style="width: 180px!important;" color="#7E3AF2"/>
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
                  class="bg-white custom-input border border-purple-300 text-gray-900 sm:text-sm rounded-md block w-full p-2.5"
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
                  class="bg-white custom-input border border-purple-300 text-gray-900 sm:text-sm rounded-md block w-full p-2.5"
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
                :class="usernameOrEmail && password ? enabledClass : disabledClass"
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
import MealMindLogo from "~/components/svg/MealMindLogo.vue";

const isInputInvalid = ref(false);
const usernameOrEmail = ref("");
const password = ref("");
const globalStore = useGlobalStore();
const userStore = useUserStore();
const enabledClass = 'w-full text-white bg-[#7E3AF2] hover:bg-[#662EC6] focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center';
const disabledClass = 'w-full text-white bg-purple-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center';
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

<style>
.custom-input:focus {
  border: 1px solid #7e3af2;
}
</style>
