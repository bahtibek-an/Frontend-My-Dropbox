<!-- ViewFileButton.vue -->

<template>
  <button
    @click="onViewClick"
    class="inline-flex items-center px-4 py-2 text-sm font-medium border transition-all rounded-md focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
    :class="darkMode === true ? 'text-gray-300 bg-neutral-800 border-neutral-800 hover:bg-neutral-950 hover:text-gray-300' : 'text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700'"
  >
    View
  </button>
</template>

<script setup>
  import { usePage } from "@inertiajs/vue3";
  import { computed, ref } from "vue";

  const page = usePage();

  const darkMode = ref(localStorage.getItem("darkMode") === "true");

  const props = defineProps({
    file: Object,
  });

  const isFolder = computed(() => props.file.is_folder);

  function onViewClick() {
      window.location.href = route("file.view", { id: props.file.id });
  }
</script>

<style scoped>
  /* Add your styling if needed */
</style>
