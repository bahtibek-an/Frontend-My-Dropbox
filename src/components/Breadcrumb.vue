<template>
  <nav class="flex justify-between mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-2">
      <li class="inline-flex items-center" v-for="item in pages">
        <router-link :to="item.link" v-if="item.link" class="inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-500">
          {{ item.name }}
          <svg class="w-6 h-6 ml-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
        </router-link>
        <span v-else class="text-sm font-medium text-gray-500 md:ml-2 flex items-center">
          {{ item.name }}
        </span>
      </li>
    </ol>
    <div class="flex gap-2">
      <button type="button" @click.prevent="openUploadFileModal" class="flex items-center gap-2 py-2 px-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        <ArrowUpTrayIcon class="w-5 h-5" />
      </button>
      <button type="button" @click.prevent="openCreateFolderModal" class="flex items-center gap-2 py-2 px-2 bg-gray-400/50 text-black rounded-md hover:bg-blue-700 hover:text-white">
        <FolderPlusIcon class="w-5 h-5" />
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ArrowUpTrayIcon, FolderPlusIcon } from "@heroicons/vue/24/outline";
import {useMainStore} from "@/stores/MainStore";

defineProps({
  pages: Array
})

const mainStore = useMainStore()

const openCreateFolderModal = () => {
  mainStore.setCreateFolderModal(true)
}

const openUploadFileModal = () => {
  mainStore.setUploadFileModal(true)
}
</script>