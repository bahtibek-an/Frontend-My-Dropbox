<template>
    <Link :href="href" class="font-bold" :class="classes">
        <slot />
    </Link>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue';
import { Link } from '@inertiajs/vue3';
import {DISPLAY_MODE, emitter} from "@/event-bus.js";

const props = defineProps({
    href: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
    },
});

const classes = computed(() => {
    return darkMode.value
        ? props.active
            ? 'flex items-center justify-center px-5 py-2 rounded-lg border-gray-600 text-sm font-medium leading-5 bg-neutral-700 dark:text-gray-200 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out'
            : 'flex items-center justify-center px-5 py-2 rounded-lg border-transparent text-sm font-medium leading-5 text-gray-400 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out'
        : props.active
            ? 'flex items-center justify-center px-5 py-2 rounded-lg border-indigo-400 text-sm font-medium leading-5 text-indigo-700 bg-indigo-100 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out'
            : 'flex items-center justify-center px-5 py-2 rounded-lg border-transparent text-sm font-medium leading-5 text-gray-700 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out';
});

const darkMode = ref(localStorage.getItem('darkMode') === 'true');

onMounted(() => {
    emitter.on(DISPLAY_MODE, (newDarkMode) => {
        darkMode.value = newDarkMode
    })
})
</script>
