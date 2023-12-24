import { defineStore } from "pinia";

export const useMainStore = defineStore('mainStore', {
  state: () => ({
    rootFolder: {
      name: 'Root',
      id: null,
      path: []
    },
    user: null,
    toast: false,
    toastCode: "",
    toastContent: "",
    createFolderModal: false,
    uploadFileModal: false,
    currentFolder: null,
    userFolders: [],
    userFiles: []
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    setError(content) {
      this.toast = true;
      this.toastCode = 'error'
      this.toastContent = content;
      setTimeout(() => {
        this.toast = false
      }, 5000)
    },
    setSuccess(content) {
      this.toast = true;
      this.toastCode = 'success'
      this.toastContent = content;
      setTimeout(() => {
        this.toast = false
      }, 5000)
    },
    closeToast() {
      this.toast = false
    },
    setCreateFolderModal(status) {
      this.createFolderModal = status
    },
    setUploadFileModal(status) {
      this.uploadFileModal = status
    },
    // app logic
    setCurrentFolder(folder) {
      this.currentFolder = folder
    },
    setUserFolders(folders) {
        this.userFolders = folders
    },
    setUserFiles(files) {
        this.userFiles = files
    }
  },
  getters: {
    getToast() {
      return this.toast
    },
    getCurrentFolder() {
      return this.currentFolder
    }
  }
})