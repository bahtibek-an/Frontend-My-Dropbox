<template>
    <div v-if="form.progress" class="absolute bottom-5 right-7 text-sm bg-white border shadow-lg py-2 px-4 rounded-lg">
        <div class="text-xs mb-2">{{ form.files.length }} adet dosya yükleniyor..</div>
        <div class="h-2 bg-gray-100 rounded">
            <div class="h-full bg-gray-700 rounded transition-all" :style="{width: form.progress.percentage+'%'}"></div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    form: Object
})
</script>


<style scoped>

</style>
