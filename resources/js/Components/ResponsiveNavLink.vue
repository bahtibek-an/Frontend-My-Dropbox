<template>
    <Link :href="href" :class="classes">
        <slot />
    </Link>
</template>

<script setup>
    import { computed } from 'vue';
    import { Link } from '@inertiajs/vue3';

    import {onMounted, ref} from "vue";
    import {DISPLAY_MODE, emitter} from "@/event-bus.js";

    const darkMode = ref(localStorage.getItem('darkMode') === 'true');

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
                ? 'block w-full pl-3 pr-4 py-2 text-left text-sm font-medium bg-indigo-900 text-indigo-200 focus:outline-none focus:bg-indigo-800 focus:text-indigo-200 rounded-md mb-1 focus:border-indigo-700 transition duration-150 ease-in-out'
                : 'block w-full pl-3 pr-4 py-2 text-left text-sm font-medium text-gray-300 hover:text-gray-300 rounded-md hover:bg-neutral-800 hover:border-gray-300 focus:outline-none focus:bg-neutral-900 focus:text-neutral-300 focus:bg-gray-50 focus focus:border-gray-300 transition duration-150 ease-in-out'
            : props.active
                ? 'block w-full pl-3 pr-4 py-2 text-left text-sm font-medium text-blue-400 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 rounded-md mb-1 focus:border-indigo-700 transition duration-150 ease-in-out'
                : 'block w-full pl-3 pr-4 py-2 text-left text-sm font-medium text-gray-800 hover:text-gray-800 rounded-md hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out';
    });

    onMounted(() => {
        emitter.on(DISPLAY_MODE, (newDarkMode) => {
            darkMode.value = newDarkMode
        })
    })
</script>
