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
            Create and account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="registerUser">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
              <input type="email" id="email" v-model="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="name@company.com" required="">
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
              <input type="password" id="password" v-model="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" required="">
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
              <input type="password" id="password" v-model="passwordConfirm" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" required="">
            </div>
            <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
            <p class="text-sm font-light text-gray-500">
              Already have an account? <router-link to="/login" class="font-medium text-blue-600 hover:underline">Login here</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {onMounted, ref} from "vue";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import {useMainStore} from "@/stores/MainStore";
import router from "@/router";

const mainStore = useMainStore()

const email = ref("");
const password = ref("");
const passwordConfirm = ref("");

const registerUser = () => {
  if (!email.value || !password.value || !passwordConfirm.value) {
    mainStore.setError("Please fill in all fields")
  }
  if (password.value !== passwordConfirm.value) {
    mainStore.setError("Passwords don't match")
  }
  if (password.value === passwordConfirm.value) {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
      .then(() => {
        mainStore.setSuccess('Authorized successful')
        router.push('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/email-already-in-use') {
          mainStore.setError('Email already in use')
        }
      });
  }
}

onMounted(() => {
  document.title = 'Register | My Dropbox'
})
</script>