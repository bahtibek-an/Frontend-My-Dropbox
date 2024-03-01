<template>
    <button
        @click="download"
        class="inline-flex items-center px-4 py-2 text-sm font-medium border transition-all rounded-md focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
        :class="darkMode === true ? 'text-gray-300 bg-neutral-800 border-neutral-800 hover:bg-neutral-950 hover:text-gray-300' : 'text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700'"
    >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="w-4 h-4 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>
        </svg>
        Download
    </button>
</template>

<script setup>
    import {usePage} from "@inertiajs/vue3";
    import {httpGet} from "@/Helper/http-helper.js";
    import {onMounted, ref} from "vue";
    import {DISPLAY_MODE, emitter} from "@/event-bus.js";

    const page = usePage()

    const darkMode = ref(localStorage.getItem('darkMode') === 'true');

    const props = defineProps({
        all: {
            type: Boolean,
            required: false,
            default: false
        },
        ids: {
            type: Array,
            required: false
        }
    })

    function download ()
    {
        if (!props.all && props.ids.length === 0) {
            return
        }

        const p = new URLSearchParams()
        p.append('parent_id', page.props.folder.id)
        if (props.all) {
            p.append('all', props.all ? 1 : 0)
        } else {
            for (let id of props.ids) {
                p.append('ids[]', id)
            }
        }

        httpGet(route('file.download')+'?'+p.toString())
            .then(res => {
                if (!res.url) return;

                const a = document.createElement('a')
                a.download = res.filename
                a.href = res.url
                a.click()
            })
    }

    onMounted(() => {
        emitter.on(DISPLAY_MODE, (newDarkMode) => {
            darkMode.value = newDarkMode
        })
    })
</script>

<style scoped>

</style>
