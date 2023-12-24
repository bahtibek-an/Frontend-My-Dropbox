<template>
  <div :class="[mainStore.createFolderModal ? null : 'hidden', 'fixed top-0 left-0 right-0 z-40 w-full p-8 overflow-x-hidden overflow-y-auto md:inset-0 h-modal bg-black/50 md:h-full']">
    <div class="relative w-full h-full max-w-md md:h-auto mx-auto">
      <div class="relative bg-white rounded-lg shadow ">
        <button type="button" @click.prevent="closeModal" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="authentication-modal">
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="px-6 py-6 lg:px-8">
          <h3 class="mb-4 text-xl font-medium text-gray-900">Create new folder</h3>
          <form class="space-y-6" @submit.prevent="createFolder">
            <div>
              <label for="folderName" class="block mb-2 text-sm font-medium text-gray-900">Folder name</label>
              <input type="text" name="folderName" id="folderName" v-model="folderName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="My folder" required>
            </div>
            <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMainStore } from "@/stores/MainStore";
import { ref as storageReference, getStorage, uploadBytes } from 'firebase/storage'
import { getAuth } from "firebase/auth";
import {useRoute} from "vue-router";

const mainStore = useMainStore();

const folderName = ref("");

const auth = getAuth();
const route = useRoute();
const createFolder = async () => {

  const storage = getStorage();
  if (folderName.value) {
    if (folderName.value.length > 3) {
      const user = auth.currentUser;
      const folderId = route.params.folderId ? route.fullPath : false;
      const thisDirectory = folderId ? `${user.uid}/${folderId}` : user.uid;
      const folder = {
        name: folderName.value,
        userId: user.uid,
        createdAt: new Date(),
        files: [],
      }
      const refer = await storageReference(storage, `${thisDirectory}/${folder.name}/.file`)
      await uploadBytes(refer, new Blob()).then(() => {
        mainStore.setSuccess(`${folder.name} - folder created successfully`)
        mainStore.setCreateFolderModal(false)
      }).catch(() => {
        mainStore.setError('Something went wrong')
      });
    } else {
      mainStore.setError('Folder name must be at least 3 characters')
    }
  } else {
    mainStore.setError('Folder name can not be empty')
  }
}

const closeModal = () => {
  mainStore.setCreateFolderModal(false)
}
</script>