<template>
    <nav class="min-w-[200px]">
        <Link
            :href="route('myFiles')"
            class="h-[80px] px-3 flex items-center gap-3"
        >
            <div
                class="block w-auto text-2xl font-bold"
                :class="{
                    'text-white fill-gray-900': darkMode,
                    'text-gray-900 fill-gray-200': !darkMode,
                }"
                style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5)"
            >
                Dropbox
            </div>
        </Link>
        <div class="px-3">
            <CreateNewDropdown />

            <div class="py-3">
                <NavLink
                    :href="route('myFiles')"
                    :active="$page.url === '/home'"
                    >My files</NavLink
                >
                <NavLink :href="route('trash')" :active="$page.url === '/trash'"
                    >Trash</NavLink
                >
            </div>
        </div>
    </nav>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import CreateNewDropdown from "@/Components/app/CreateNewDropdown.vue";
import NavLink from "@/Components/NavLink.vue";
import { onMounted, ref } from "vue";
import { DISPLAY_MODE, emitter } from "@/event-bus.js";

const darkMode = ref(localStorage.getItem("darkMode") === "true");

onMounted(() => {
    emitter.on(DISPLAY_MODE, (newDarkMode) => {
        darkMode.value = newDarkMode;
    });
});
</script>

<style scoped></style>
