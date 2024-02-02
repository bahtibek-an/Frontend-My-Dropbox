<template>
    <Menu as="div" class="relative inline-block text-left">
        <div>
            <MenuButton
                class="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-800 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                :class="{'!text-gray-400' : darkMode}"
            >
                {{ $page.props.auth.user.name }}
                <ChevronDownIcon
                    class="ml-2 -mr-1 h-5 w-5 text-gray-800 hover:text-violet-300"
                    :class="{'!text-gray-400 hover:text-gray-500' : darkMode}"
                    aria-hidden="true"
                />
            </MenuButton>
        </div>

        <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >
            <MenuItems
                class="absolute right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                :class="{'!bg-neutral-900' : darkMode}"
            >
                <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }">
                        <ResponsiveNavLink
                            :href="route('profile.edit')"
                            :active="$page.url === '/profile'"
                            class="text-gray-700"
                            :class="{'!text-gray-300' : darkMode}"
                        >
                            Profile
                        </ResponsiveNavLink>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                        <ResponsiveNavLink
                            :href="route('logout')"
                            method="post" as="button"
                            class="text-gray-700"
                            :class="{'!text-gray-300' : darkMode}"
                        >
                            Logout
                        </ResponsiveNavLink>
                    </MenuItem>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>

<script setup>
    import {Menu, MenuButton, MenuItems, MenuItem} from '@headlessui/vue'
    import {ChevronDownIcon} from '@heroicons/vue/20/solid'
    import ResponsiveNavLink from "@/Components/ResponsiveNavLink.vue";
    import {onMounted, ref} from "vue";
    import {DISPLAY_MODE, emitter} from "@/event-bus.js";

    const darkMode = ref(localStorage.getItem('darkMode') === 'true');

    onMounted(() => {
        emitter.on(DISPLAY_MODE, (newDarkMode) => {
            darkMode.value = newDarkMode
        })
    })
</script>
