<template>
  <Navbar />
  <div class="bg-gray-200">
    <Breadcrumb :pages="pages" />
  </div>
  <div class="flex flex-row flex-wrap gap-3 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
    <div class="flex flex-row items-center gap-1 bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-lg" v-for="folder in userFolders" v-if="userFolders.length > 0">
      <router-link :to="`${$route.fullPath}/${folder}`" class="flex flex-row items-center">
        <svg viewBox="0 0 40 40" fill="none" role="img" class="dig-ContentIcon dig-ContentIcon--small" focusable="false" width="55" height="55" data-testid="FolderBaseDefaultSmall"><path d="M15.002 7.004c.552.018.993.252 1.295.7l.785 2.12c.145.298.363.576.561.779.252.257.633.4 1.156.4H35.5l-.002 18c-.027.976-.3 1.594-.836 2.142-.565.577-1.383.858-2.41.858H8.748c-1.026 0-1.844-.28-2.409-.858-.564-.577-.838-1.415-.838-2.465V7.003h9.502Z" fill="#8AA8CA"></path><path d="M15.002 7.001c.552.018.993.252 1.295.7l.785 2.12c.145.298.363.576.561.779.252.257.633.4 1.156.4H35.5l-.002 16.84c-.027.976-.3 1.754-.836 2.302-.565.577-1.383.858-2.41.858H8.748c-1.026 0-1.844-.28-2.409-.858-.564-.577-.838-1.415-.838-2.465V7l9.502.001Z" fill="#A1C9F7"></path></svg>
        <span class="text-sm font-medium text-gray-500">{{ folder }}</span>
      </router-link>
    </div>
    <div class="flex flex-row items-center bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-lg" v-for="file in userFiles">
      <a class="flex flex-row items-center gap-1" v-if="file.name !== '.file'" :href="file.urlPath[0]" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="40px" height="40px"><path fill="#90CAF9" d="M40 45L8 45 8 3 30 3 40 13z"></path><path fill="#E1F5FE" d="M38.5 14L29 14 29 4.5z"></path></svg>
        <span class="text-sm font-medium text-gray-500">{{ file.name }}</span>
      </a>
    </div>
    <div class="flex w-full justify-center" v-if="!userFolders || userFiles > 1 ? userFiles[0].name === '.file' : false">
      <div class="text-lg flex flex-row items-center justify-center text-center bg-gray-300/50 p-5 w-1/2 rounded-xl">Folder is empty!</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref as fireStoreRef, listAll, getDownloadURL } from "firebase/storage";
import Navbar from "@/components/Navbar.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import { useMainStore } from "@/stores/MainStore";
import {useRoute} from "vue-router";

const mainStore = useMainStore();

const route = useRoute();
const userFolders = ref([]);
const userFiles = ref([]);

let folderId = '';

typeof route.params.folderId === 'string' ? folderId += route.params.folderId :
    route.params.folderId.forEach((folder) => {
      folderId += folder});


console.log(folderId)

const pages = [
  {
    name: 'Home',
    link: '/'
  },
]

typeof route.params.folderId === 'string' ? pages[1] = {
      name: route.params.folderId,
      link: false
    } :
    route.params.folderId.forEach((folder) => {
      pages.push({
        name: folder,
        link: `/${folder}`
      })
      if (folder === route.params.folderId[route.params.folderId.length - 1]) {
        pages[pages.length - 1].link = false
      }
    });

const storage = getStorage();

const isLoggedIn = ref(false);

let auth = getAuth();
onMounted(() => {
  document.title = 'Home | My Dropbox'
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false
    }
  })
  getListAll()
})

const openDirectory = folderId ? `${auth.currentUser.uid}/${route.fullPath}` : auth.currentUser.uid;
const listRef = fireStoreRef(storage, `${openDirectory}`);

const getListAll = () => {
  listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          const allFiles = folderRef.fullPath.split('/').splice(-1)
          userFolders.value.push(allFiles[0])
        });
        console.log(userFolders)
        res.items.forEach((itemRef) => {
          const storage = getStorage();
          const filePath = fireStoreRef(storage, itemRef.fullPath)

          getDownloadURL(filePath).then((...url) => {
            let fileDate = {
              name: itemRef.name,
              urlPath: url,
            }
            userFiles.value.push(fileDate)
          })
        });

      }).catch((error) => {
    mainStore.setError(error.message)
  });
}

</script>