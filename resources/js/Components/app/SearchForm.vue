<template>
    
</template>

<script setup>
    import TextInput from "@/Components/TextInput.vue";
    import {useForm} from "@inertiajs/vue3";
    import {onMounted, ref} from "vue";
    import {DISPLAY_MODE, emitter} from "@/event-bus.js";

    const darkMode = ref(localStorage.getItem('darkMode') === 'true');

    const form = useForm({
        search: ''
    })

    onMounted(() => {
        emitter.on(DISPLAY_MODE, (newDarkMode) => {
            darkMode.value = newDarkMode
        })
    })
</script>

<style scoped>

</style>
