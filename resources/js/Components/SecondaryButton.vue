<template>
    <button
        :type="type"
        class="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs uppercase text-gray-700 tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150"
        :class="{'dark:bg-neutral-800 dark:hover:bg-neutral-950 dark:border-neutral-800 dark:text-gray-200' : darkMode}"
    >
        <slot />
    </button>
</template>

<script setup>
    import {onMounted, ref} from "vue";
    import {DISPLAY_MODE, emitter} from "@/event-bus.js";

    const darkMode = ref(localStorage.getItem('darkMode') === 'true');

    defineProps({
        type: {
            type: String,
            default: 'button',
        },
    });

    onMounted(() => {
        emitter.on(DISPLAY_MODE, (newDarkMode) => {
            darkMode.value = newDarkMode
        })
    })
</script>
