<template>
  <div :class="[mainStore.uploadFileModal ? null : 'hidden', 'fixed top-0 left-0 right-0 z-50 w-full p-8 overflow-x-hidden overflow-y-auto md:inset-0 h-modal bg-black/50 md:h-full']">
    <div class="relative w-full h-full max-w-md md:h-auto mx-auto">
      <div class="relative bg-white rounded-lg shadow ">
        <button type="button" @click.prevent="closeModal" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="authentication-modal">
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="px-6 py-6 lg:px-8">
          <h3 class="mb-4 text-xl font-medium text-gray-900">Create new folder</h3>
          <form class="space-y-6" @submit.prevent="submitUpload">
            <div class="flex items-center justify-center w-full">
              <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-34 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                  <p class="mb-2 text-sm text-gray-500" v-if="!createFileName"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                  <p class="mb-2 text-sm text-gray-500" v-else>Upload <span class="font-semibold">{{ createFileName }}</span> file</p>
                </div>
                <input id="dropzone-file" @change="uploadFile" type="file" class="hidden" />
              </label>
            </div>
            <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Upload</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import { useMainStore } from "@/stores/MainStore";
import { ref as storageReference, getStorage, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";
import {useRoute} from "vue-router";

const mainStore = useMainStore();

const route = useRoute();

let createFile = null;
const createFileName = ref("");
const uploadFile = (e) => {
  createFile = e.target.files[0];
  createFileName.value = createFile.name;
};

const storage = getStorage();
const closeModal = () => {
  mainStore.setUploadFileModal(false)
}

const submitUpload = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const file = createFile;
  const upFile = {
    name: file.name,
    userId: user.uid,
    createdAt: new Date(),
    files: [],
  }
  const uploadDirectory = route.params.folderId ? `${upFile.userId}/${route.fullPath}` : upFile.userId;
  const refer = await storageReference(storage, `${uploadDirectory}/${upFile.name}`)
  uploadBytes(refer, file).then(() => {
    mainStore.setSuccess('File uploaded successfully')
    mainStore.setUploadFileModal(false)
    this.$emit('getListAll')
  });
}

</script>