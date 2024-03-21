<template>
  <router-view />
  <ToastNotification />
  <CreateFolderModal />
  <UploadFileModal />
</template>

<script setup>
import {onMounted} from "vue";
import ToastNotification from "@/components/ToastNotification.vue";
import CreateFolderModal from "@/components/CreateFolderModal.vue";
import UploadFileModal from "@/components/UploadFileModal.vue"

onMounted(() => {
  document.title = 'Home | My Dropbox'
})
</script>