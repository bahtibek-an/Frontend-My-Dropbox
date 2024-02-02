<template>
    <MenuItem v-slot="{ active }">
        <a
            class="text-gray-700 block px-4 py-2 text-sm relative"
            :class="{'!text-neutral-400' : darkMode}"
        >
            Upload Folder
            <input
                @change="onChange"
                type="file"
                multiple
                class="absolute left-0 top-0 bottom-0 right-0 cursor-pointer opacity-0"
                directory webkitdirectory
            >
        </a>
    </MenuItem>
</template>

<script setup>
    import {MenuItem} from "@headlessui/vue";
    import {DISPLAY_MODE, emitter, FILE_UPLOAD_STARTED} from "@/event-bus.js";
    import {onMounted, ref} from "vue";

    const darkMode = ref(localStorage.getItem('darkMode') === 'true');

    function onChange (ev)
    {
        emitter.emit(FILE_UPLOAD_STARTED, ev.target.files)
    }

    onMounted(() => {
        emitter.on(DISPLAY_MODE, (newDarkMode) => {
            darkMode.value = newDarkMode
        })
    })
</script>

<style scoped>

</style>
