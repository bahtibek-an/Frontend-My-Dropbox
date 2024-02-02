<template>
    <Head title="welcome to" />
    <div
        class="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-center bg-gray-50 bg-dots-darker selection:bg-gray-200 selection:text-gray-800"
    >
        <div v-if="canLogin" class="sm:fixed sm:top-0 sm:right-0 p-6 text-right">
            <Link
                v-if="$page.props.auth.user"
                :href="route('myFiles')"
                class="px-3 py-2 rounded-md bg-neutral-800 text-gray-100 font-semibold hover:text-gray-200 focus:outline focus:outline-2 focus:rounded-sm focus:outline-gray-400"
            >
                Go to Panel
            </Link>
            <template v-else>
                <Link
                    :href="route('login')"
                    class="font-semibold text-gray-600 hover:text-gray-900 focus:outline focus:outline-2 focus:rounded-sm focus:outline-gray-400"
                >
                    Login
                </Link>

                <Link
                    v-if="canRegister"
                    :href="route('register')"
                    class="ml-4 font-semibold text-gray-600 hover:text-gray-900 focus:outline focus:outline-2 focus:rounded-sm focus:outline-gray-400"
                >
                    Register
                </Link>
            </template>
        </div>

        <div class="max-w-7xl mx-auto p-6 lg:p-8">
            <div class="flex justify-center">
                <ApplicationLogo
                    class="sm:max-w-lg md:w-2/3 lg:w-1/3 fill-gray-700 hover:fill-black transition-all"
                />
            </div>

            <div class="mt-16">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    <div class="scale-100 p-6 bg-white from-gray-700/50 via-transparent rounded-lg shadow-2xl shadow-gray-500/20 flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-gray-400">
                        <div>
                            <h2 class="mt-3 text-xl font-semibold text-gray-900">As Fast as You</h2>

                            <p class="mt-4 text-gray-500 text-sm leading-relaxed">
                                It does not impose any limitations on hosting space, number of users, size and number of files uploaded at a time. You have the right to freely determine all these values ​​to the extent that your server meets them.
                            </p>
                        </div>
                    </div>

                    <div
                        class="scale-100 p-6 bg-white from-gray-700/50 via-transparent rounded-lg shadow-2xl shadow-gray-500/20 flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-gray-400"
                    >
                        <div>
                            <h2 class="mt-3 text-xl font-semibold text-gray-900">Fast and Advanced Infrastructure Support</h2>

                            <p class="mt-4 text-gray-500 text-sm leading-relaxed">
                               It is an API-based file hosting and sharing service developed using Laravel, Vue.Js and Inertia technologies. Optimization results <a href="#" class="hover:text-gray-700 underline">from here</a> you can review.
                            </p>
                        </div>
                    </div>

                    <div
                        class="scale-100 p-6 bg-white from-gray-700/50 via-transparent rounded-lg shadow-2xl shadow-gray-500/20 flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-gray-400"
                    >
                        <div>
                            <h2 class="mt-3 text-xl font-semibold text-gray-900">Suitable for Teamwork</h2>

                            <p class="mt-4 text-gray-500 text-sm leading-relaxed">
                                Create or upload files, folders and share them with your teammates and create collaborative workspaces.
                            </p>
                        </div>
                    </div>

                    <div
                        class="scale-100 p-6 bg-white from-gray-700/50 via-transparent rounded-lg shadow-2xl shadow-gray-500/20 flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-gray-400"
                    >
                        <div>
                            <h2 class="mt-3 text-xl font-semibold text-gray-900">We Continue to Improve</h2>

                            <p class="mt-4 text-gray-500 text-sm leading-relaxed">
                                We continue to continuously improve the application by focusing on our own calendar and the feedback we receive from you!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-center mt-16 px-6 sm:items-center sm:justify-between">
                <div class="text-center text-sm text-gray-500 sm:text-left">
                    <div class="flex items-center gap-4">
                        <a
                            href="https://simurg.de"
                            class="group inline-flex items-center hover:text-gray-700 focus:outline focus:outline-2 focus:rounded-sm focus:outline-gray-400"
                        >
                            <ApplicationLogo class="h-5 fill-gray-500 hover:fill-gray-700" />
                        </a>
                    </div>
                </div>

                <div class="ml-4 text-center text-sm text-gray-500 sm:text-right sm:ml-0">
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {Head, Link, usePage} from '@inertiajs/vue3';
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import {onMounted} from "vue";

defineProps({
    canLogin: {
        type: Boolean
    },
    canRegister: {
        type: Boolean
    },
    appVersion: {
        type: String,
        required: true
    }
})

onMounted(() => {
    const page = usePage()
    if (page.props.isAuthenticated) {
        Inertia.location('myFiles')
    }
})
</script>

<style>
.bg-dots-darker {
    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
}
@media (prefers-color-scheme: dark) {
    .dark\:bg-dots-lighter {
        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
    }
}
</style>
