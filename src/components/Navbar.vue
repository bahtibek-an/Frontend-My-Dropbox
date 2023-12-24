<template>
  <Disclosure as="nav" class="bg-white shadow-xs border-b border-b-gray-300" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center">
          <div class="flex-shrink-0 text-black flex items-center gap-3">
            <svg width="30" height="25" viewBox="0 0 30 25" fill="#0061fe" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.70076 0.320312L0.478516 4.91332L7.70076 9.50633L14.9242 4.91332L22.1465 9.50633L29.3687 4.91332L22.1465 0.320312L14.9242 4.91332L7.70076 0.320312Z"></path>
              <path d="M7.70076 18.6925L0.478516 14.0994L7.70076 9.50633L14.9242 14.0994L7.70076 18.6925Z"></path>
              <path d="M14.9242 14.0994L22.1465 9.50633L29.3687 14.0994L22.1465 18.6925L14.9242 14.0994Z"></path>
              <path d="M14.9242 24.8164L7.70077 20.2234L14.9242 15.6304L22.1465 20.2234L14.9242 24.8164Z"></path>
            </svg>
            <h1 class="text-2xl font-bold">Dropbox</h1>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton class="flex max-w-xs items-center rounded-full bg-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-blue-500">
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full" src="data:image/webp;base64,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" alt="" />
                </MenuButton>
              </div>
              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem v-slot="{active}">
                    <router-link to="/profile" :class="[active ? 'bg-gray-200' : '', 'block px-4 py-2 text-sm text-gray-700 flex items-center justify-between']">
                      Profile
                      <UserCircleIcon class="h-4 w-4 " /></router-link>
                  </MenuItem>
                  <hr>
                  <MenuItem v-slot="{active}">
                    <button :class="[active ? 'bg-red-600 text-white' : '', 'block w-full px-4 py-2 text-sm text-gray-700 flex items-center justify-between']" @click.prevent="signOutUser">
                      Log out
                      <ArrowRightOnRectangleIcon class="h-4 w-4 " /></button>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
        <div class="-mr-2 flex md:hidden">
          <!-- Mobile menu button -->
          <a class="hover:bg-red-700 hover:text-white py-2 px-3 flex items-center justify-center gap-2">
            <ArrowRightOnRectangleIcon class="h-6 w-6" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  </Disclosure>
</template>

<script setup>
import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ArrowRightOnRectangleIcon, UserCircleIcon } from '@heroicons/vue/24/outline'
import { getAuth, signOut } from 'firebase/auth'
import router from "@/router";

const auth = getAuth();
const signOutUser = () => {
  signOut(auth).then(() => {
    router.push('/login');
  })
}
</script>