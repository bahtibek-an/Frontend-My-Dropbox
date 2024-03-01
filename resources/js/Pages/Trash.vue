<template>
    <Head title="Trash - " />
    <authenticated-layout>
        <nav class="flex items-center justify-between p-1 mb-3">
            <p
                class="inline-flex items-center text-md gap-2 font-bold text-lg text-gray-700 hover:text-indigo-600 cursor-pointer"
                :class="{'!text-gray-200' : darkMode}"
            >
                Trash
            </p>
            <div v-if="selectedIds.length > 0" class="flex gap-x-1">
                <DeleteForeverButton :all-selected="allSelected" :selected-ids="selectedIds" @delete="resetForm" />
                <RestoreFilesButton :all-selected="allSelected" :selected-ids="selectedIds" @restore="resetForm" />
            </div>
        </nav>
        <div class="flex-1 overflow-auto rounded-lg">
            <table class="min-w-full">
                <thead
                    class="border-b"
                    :class="{
                        'bg-neutral-800 border-b-neutral-900' : darkMode,
                        'bg-gray-100' : !darkMode
                    }"
                >
                <tr>
                    <th class="text-sm font-medium text-gray-900 px-6 py-4 text-left w-[30px] max-w-[30px]  pr-0" :class="{'text-neutral-200' : darkMode}">
                        <Checkbox
                            @change="onSelectAllChange"
                            v-model:checked="allSelected"
                            :class="{'bg-neutral-900 border-neutral-900 shadow-sm shadow-neutral-900' : darkMode}"
                        />
                    </th>
                    <th class="text-sm font-medium text-gray-900 px-6 py-4 text-left" :class="{'text-neutral-200' : darkMode}">File</th>
                    <th class="text-sm font-medium text-gray-900 px-6 py-4 text-left" :class="{'text-neutral-200' : darkMode}">Path</th>
                    <th class="text-sm font-medium text-gray-900 px-6 py-4 text-left" :class="{'text-neutral-200' : darkMode}">Created Date</th>
                    <th class="text-sm font-medium text-gray-900 px-6 py-4 text-left" :class="{'text-neutral-200' : darkMode}">Size</th>
                </tr>
                </thead>
                <tbody>
                <tr
                    @click="$event => toggleFileSelect(file)"
                    v-for="file of allFiles.data"
                    :key="file.id"
                    class="border-b transition duration-300 ease-in-out cursor-pointer"
                    :class="
                        selected[file.id] || allSelected
                          ? darkMode
                            ? 'bg-blue-800 hover:bg-blue-600 border-b-blue-900'
                            : 'bg-blue-200 hover:bg-blue-300 border-b-blue-300'
                          : darkMode
                            ? 'bg-neutral-800 hover:bg-neutral-700 border-b-neutral-950'
                            : 'bg-white hover:bg-gray-100'
                    "
                >
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-[30px] max-w-[30px] pr-0">
                        <Checkbox
                            @change="$event => onSelectCheckboxChange(file)"
                            v-model="selected[file.id]"
                            :checked="selected[file.id] || allSelected"
                            :class="{'bg-neutral-900 border-neutral-900 shadow-sm shadow-neutral-900' : darkMode}"
                        />
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center" :class="{'text-neutral-300' : darkMode}">
                        <FileIcon :file="file" class="dark:text-neutral-100" />
                        {{file.name}}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" :class="{'text-neutral-300' : darkMode}">{{file.path === file.name ? '/' : file.path}}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" :class="{'text-neutral-300' : darkMode}">{{file.updated_at}}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" :class="{'text-neutral-300' : darkMode}">{{file.size}}</td>
                </tr>
                </tbody>
            </table>

            <div v-if="!allFiles.data.length" class="py-8 text-center text-md text-gray-400">
                It seems quiet in here 🫥
            </div>
            <div ref="loadMoreIntersect">

            </div>
        </div>

    </authenticated-layout>

</template>

<script setup>
    import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
    import {Head} from "@inertiajs/vue3";
    import FileIcon from "@/Components/app/FileIcon.vue";
    import {computed, onMounted, onUpdated, ref} from "vue";
    import {httpGet} from "@/Helper/http-helper.js";
    import Checkbox from "@/Components/Checkbox.vue";
    import DeleteFilesButton from "@/Components/app/DeleteFilesButton.vue";
    import DownloadFilesButton from "@/Components/app/DownloadFilesButton.vue";
    import RestoreFilesButton from "@/Components/app/RestoreFilesButton.vue";
    import DeleteForeverButton from "@/Components/app/DeleteForeverButton.vue";
    import {DISPLAY_MODE, emitter} from "@/event-bus.js";

    const allSelected = ref(false)
    const selected = ref({})
    const loadMoreIntersect = ref(null)
    const allFiles = ref({
        data: props.files.data,
        next: props.files.links.next
    })

    const props = defineProps({
        files: Object,
        folder: Object,
        ancestors: Object
    })

    const selectedIds = computed(() => Object.entries(selected.value).filter(a => a[1]).map(a => a[0]))

    const darkMode = ref(localStorage.getItem('darkMode') === 'true');

    function loadMore ()
    {
        if (allFiles.value.next === null) {
            return
        }

        httpGet(allFiles.value.next)
            .then(res => {
                allFiles.value.data = [...allFiles.value.data, ...res.data]
                allFiles.value.next = res.links.next
            })
    }

    function onSelectAllChange () {
        allFiles.value.data.forEach(f => {
            selected.value[f.id] = allSelected.value
        })
    }

    function toggleFileSelect (file)
    {
        selected.value[file.id] = !selected.value[file.id]
        onSelectCheckboxChange(file)
    }

    function onSelectCheckboxChange (file)
    {
        if (!selected.value[file.id]) {
            allSelected.value = false;
        } else {
            let checked = true;
            for (let file of allFiles.value.data) {
                if (!selected.value[file.id]) {
                    checked = false
                    break
                }
            }
            allSelected.value = checked
        }
    }

    function resetForm ()
    {
        allSelected.value = false
        selected.value = {}
    }

    onUpdated(() => {
        allFiles.value = {
            data: props.files.data,
            next: props.files.links.next
        }
    })

    onMounted(() => {
        const observer = new IntersectionObserver((entries) =>  entries.forEach(entry => entry.isIntersecting && loadMore()),{
            rootMargin: '-250px 0px 0px 0px'
        })

        observer.observe(loadMoreIntersect.value)
    })

    onMounted(() => {
        emitter.on(DISPLAY_MODE, (newDarkMode) => {
            darkMode.value = newDarkMode
        })
    })
</script>

<style scoped>

</style>
