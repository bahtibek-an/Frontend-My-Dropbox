<template>
    <span class="w-6 h-6 inline-flex items-center justify-center mr-2">
        <FolderIcon
            class="max-w-full text-gray-800"
            :class="{'!text-gray-300' : darkMode}"
            v-if="file.is_folder"
        />
        <template v-else>
            <img class="max-w-full" v-if="isAudio(file)" alt="MP-3 Icon" :src="`/images/icons/mp3.png`">
            <img class="max-w-full" v-else-if="isImage(file)" alt="Image Icon" :src="`/images/icons/image.png`">
            <img class="max-w-full" v-else-if="isPDF(file)" alt="PDF Icon" :src="`/images/icons/pdf.png`">
            <img class="max-w-full" v-else-if="isText(file)" alt="Text File Icon" :src="`/images/icons/txt.png`">
            <img class="max-w-full" v-else-if="isVideo(file)" alt="Video Icon" :src="`/images/icons/video.png`">
            <img class="max-w-full" v-else-if="isZip(file)" alt="Zip File" :src="`/images/icons/zip.png`">
            <img class="max-w-full" v-else="isWord(file)" alt="Word File" :src="`/images/icons/txt.png`">
        </template>
    </span>
</template>

<script setup>
    import {FolderIcon} from "@heroicons/vue/20/solid/index.js";
    import {isAudio, isImage, isPDF, isText, isVideo, isWord, isZip} from "@/Helper/file-helper.js";
    import {onMounted, ref} from "vue";
    import {DISPLAY_MODE, emitter} from "@/event-bus.js";

    const {file} = defineProps({
        file: Object
    })

    const darkMode = ref(localStorage.getItem('darkMode') === 'true');

    onMounted(() => {
        emitter.on(DISPLAY_MODE, (newDarkMode) => {
            darkMode.value = newDarkMode
        })
    })
</script>

<style scoped>

</style>
