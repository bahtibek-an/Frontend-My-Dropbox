<template>
  <section class="bg-gray-100">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center gap-3 mb-6 text-2xl font-bold text-gray-900">
        <svg width="35" height="30" viewBox="0 0 30 25" fill="#0061fe" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.70076 0.320312L0.478516 4.91332L7.70076 9.50633L14.9242 4.91332L22.1465 9.50633L29.3687 4.91332L22.1465 0.320312L14.9242 4.91332L7.70076 0.320312Z"></path>
          <path d="M7.70076 18.6925L0.478516 14.0994L7.70076 9.50633L14.9242 14.0994L7.70076 18.6925Z"></path>
          <path d="M14.9242 14.0994L22.1465 9.50633L29.3687 14.0994L22.1465 18.6925L14.9242 14.0994Z"></path>
          <path d="M14.9242 24.8164L7.70077 20.2234L14.9242 15.6304L22.1465 20.2234L14.9242 24.8164Z"></path>
        </svg>
        Dropbox
      </a>
      <div class="w-full bg-white rounded-lg shadow-md md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Login to your account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="loginUser">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
              <input type="email" v-model="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="name@company.com" required="">
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
              <input type="password" v-model="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" required="">
            </div>
            <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
            <p class="text-sm font-light text-gray-500">
              Don’t have an account yet? <router-link to="/register" class="font-medium text-blue-600 hover:underline">Register</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {onMounted, ref} from "vue";
import router from "@/router";
import { useMainStore } from "@/stores/MainStore";

import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

const email = ref('')
const password = ref('')

const mainStore = useMainStore()

const loginUser = () => {
  if (email.value && password.value) {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
      .then(() => {
        mainStore.setSuccess('Authorized successful')
        router.push('/')
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            mainStore.setError('Invalid email');
            break;
          case 'auth/user-not-found':
            mainStore.setError('No account with that email was found');
            break;
          case 'auth/invalid-password':
            mainStore.setError('Password is wrong');
            break;
          default:
            mainStore.setError('Email or Password was incorrect');
            break;
        }
      });
  }
}

onMounted(() => {
  document.title = 'Login | My Dropbox'
})
</script>