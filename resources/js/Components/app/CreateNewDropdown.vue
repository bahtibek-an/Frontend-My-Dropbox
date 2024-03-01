<template>
    <Menu as="div" class="relative block text-left">
        <MenuButton
            class="flex w-full justify-center gap-x-1.5 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-500"
            :class="{'!text-gray-300 !ring-neutral-800 shadow-neutral-800 !bg-neutral-950' : darkMode}"
        >
            Create New

        </MenuButton>

        <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >
            <MenuItems
                class="absolute right-0 mt-2 w-full origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                :class="{'!divide-neutral-800 !bg-neutral-900' : darkMode}"
            >
                <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }">
                        <a
                            @click.prevent="showCreateFolderModal"
                            class="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                            :class="{'text-neutral-400' : darkMode}"
                        >
                           Create Folder
                        </a>
                    </MenuItem>
                </div>
                <div class="px-1 py-1">
                    <FileUploadMenuItem />
                    <FolderUploadMenuItem />
                </div>
            </MenuItems>
        </transition>
    </Menu>
    <CreateFolderModal v-model="createFolderModal" />
</template>

<script setup>
    import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/vue";
    import CreateFolderModal from "@/Components/app/CreateFolderModal.vue";
    import {onMounted, ref} from "vue";
    import FileUploadMenuItem from "@/Components/app/FileUploadMenuItem.vue";
    import FolderUploadMenuItem from "@/Components/app/FolderUploadMenuItem.vue";
    import {DISPLAY_MODE, emitter} from "@/event-bus.js";

    const createFolderModal = ref(false)

    const darkMode = ref(localStorage.getItem('darkMode') === 'true');

    function showCreateFolderModal()
    {
        createFolderModal.value = true
    }

    onMounted(() => {
        emitter.on(DISPLAY_MODE, (newDarkMode) => {
            darkMode.value = newDarkMode
        })
    })
</script>

<style scoped>

</style>
