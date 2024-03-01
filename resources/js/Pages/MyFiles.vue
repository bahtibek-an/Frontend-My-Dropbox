<template>
    <Head :title="pageTitle + '\n'" />
    <authenticated-layout>
        <nav class="flex items-center justify-between mb-2">
            <ol class="inline-flex items-center">
                <li v-for="ans of ancestors.data" :key="ans.id" class="inline-flex items-center">
                    <Link
                        v-if="!ans.parent_id"
                        :href="route('myFiles')"
                        class="inline-flex items-center text-sm gap-2 font-medium text-gray-600 hover:text-indigo-600"
                    >
                        <HomeIcon class="w-4 h-4"/>
                        {{ exploit(ans.name) }}
                    </Link>
                    <div v-else class="flex items-center">

                        <Link :href="route('myFiles', {folder: ans.path})"
                              class="text-sm font-medium text-gray-600 hover:text-indigo-600">
                            <span class="text-gray-600 px-0.5">/</span>{{ ans.name }}
                        </Link>
                    </div>
                </li>
            </ol>
                <div class="flex">
                    <div class="flex gap-x-1">
                
                        <DownloadFilesButton v-if="selectedIds.length > 0"  :all="allSelected" :ids="selectedIds" />
                        <DeleteFilesButton v-if="selectedIds.length > 0"  :delete-all="allSelected" :delete-ids="selectedIds" @delete="onDelete" />
                        <label
                            class="inline-flex items-center px-3 py-2.5 text-sm font-medium border transition-all rounded-md focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                            :class="darkMode === true ? 'text-gray-300 bg-neutral-800 border-neutral-800 hover:bg-neutral-950 hover:text-gray-300' : 'text-gray-800 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700', {'!ring-yellow-400 ring-1 ring-inset border-yellow-400 bg-neutral-900 !text-yellow-400' : onlyFavorites}"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24" fill="currentColor"
                                class="w-4 h-4"
                            >
                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                            </svg>
                            <Checkbox
                                @change="showOnlyFavorites"
                                v-model:checked="onlyFavorites"
                                class="hidden"
                                :class="{'bg-neutral-900 border-neutral-900 shadow-sm shadow-neutral-900' : darkMode}"
                            />
                        </label>
                    </div>
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
                    <th class="text-sm font-medium text-gray-900 px-6 py-4 text-left w-[30px] max-w-[30px] pr-0" :class="{'text-neutral-200' : darkMode}">
                        <Checkbox
                            @change="onSelectAllChange"
                            v-model:checked="allSelected"
                            :class="{'bg-neutral-900 border-neutral-900 shadow-sm shadow-neutral-900' : darkMode}"
                        />
                    </th>
                    <th class="text-sm font-medium text-gray-900 px-6 py-4 text-left" :class="{'text-neutral-200' : darkMode}"></th>
                    <th class="text-sm font-medium text-gray-900 px-6 py-4 text-left" :class="{'text-neutral-200' : darkMode}">File</th>
                    <th class="text-sm font-medium text-gray-900 px-6 py-4 text-left" :class="{'text-neutral-200' : darkMode}">Owner</th>
                    <th class="text-sm font-medium text-gray-900 px-6 py-4 text-left" :class="{'text-neutral-200' : darkMode}">Created Date</th>
                    <th class="text-sm font-medium text-gray-900 px-6 py-4 text-left" :class="{'text-neutral-200' : darkMode}">Size</th>
                    <th class="text-sm font-medium text-gray-900 px-6 py-4 text-left" :class="{'text-neutral-200' : darkMode}">Action</th>

                </tr>
                </thead>
                <tbody>
                <tr
                    @dblclick="openFolder(file)"
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
                    <td
                        class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-[30px] max-w-[30px] pr-0"
                        :class="{'text-neutral-300' : darkMode}"
                    >
                        <Checkbox
                            @change="$event => onSelectCheckboxChange(file)"
                            v-model="selected[file.id]"
                            :checked="selected[file.id] || allSelected"
                            :class="{'bg-neutral-900 border-neutral-900 shadow-sm shadow-neutral-900' : darkMode}"
                        />
                    </td>
                    <td class="px-6 py-4 max-w-[40px] text-sm font-medium text-yellow-500">
                        <div @click.stop.prevent="favoriteToggle(file)">
                            <svg v-if="file.is_favorite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center relative" :class="{'text-neutral-300' : darkMode}">
                        <FileIcon :file="file" />
                        {{file.name}}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" :class="{'text-neutral-300' : darkMode}">{{file.owner}}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" :class="{'text-neutral-300' : darkMode}">{{file.updated_at}}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" :class="{'text-neutral-300' : darkMode}">{{file.size}}</td>
                    <td v-if="file.is_folder !== 1" class="" :class="{'text-neutral-300' : darkMode}">
                        <a :href="route('file.view', { id: file.id })" class="inline-flex items-center px-4 py-2 text-sm font-medium border transition-all rounded-md focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700" target="_blank">View</a>
                        <a href="#" class="inline-flex items-center ml-2 px-4 py-2 text-sm font-medium border transition-all rounded-md focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700" @click="copyLink(file.id)">Copy Link</a>
                    </td>
                    <td v-else class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" :class="{'text-neutral-300' : darkMode}">
                        <!-- You can add some placeholder text or leave it empty based on your design -->
                    </td>
                </tr>
                </tbody>
            </table>

            <div v-if="!allFiles.data.length" class="py-8 text-center text-md text-gray-400">
                It looks quiet in here    🫥
            </div>
            <div ref="loadMoreIntersect">

            </div>
        </div>

    </authenticated-layout>

</template>

<script setup>
    import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue"
    import {router, Link, Head, usePage} from "@inertiajs/vue3"
    import {HomeIcon} from '@heroicons/vue/20/solid'
    import FileIcon from "@/Components/app/FileIcon.vue"
    import {computed, onMounted, onUpdated, ref} from "vue"
    import {httpGet, httpPost} from "@/Helper/http-helper.js"
    import Checkbox from "@/Components/Checkbox.vue"
    import DeleteFilesButton from "@/Components/app/DeleteFilesButton.vue"
    import DownloadFilesButton from "@/Components/app/DownloadFilesButton.vue"
    import ViewFileButton from "@/Components/app/ViewFileButton.vue"
    import {DISPLAY_MODE, emitter, showSuccessNotification} from "@/event-bus.js"

    const page = usePage()
    const allSelected = ref(false)
    const onlyFavorites = ref(false)
    const selected = ref({})
    const loadMoreIntersect = ref(null)

    const allFiles = ref({
        data: props.files.data,
        next: props.files.links.next
    })

    let params = null

    const ancestors = props.ancestors

    const pageTitle = computed(() => {
        return ancestors.data.map(ans => exploit(ans.name) + '/').join('')
    });

    function copyLink(fileId) {
        const link = route('file.view', { id: fileId });
        navigator.clipboard.writeText(link).then(() => {
            window.alert('Link Copied!');
            console.log('Link copied to clipboard: ' + link);
        }).catch((error) => {
            console.error('Unable to copy link to clipboard', error);
        });
    }

    const darkMode = ref(localStorage.getItem('darkMode') === 'true');

    const props = defineProps({
        files: Object,
        folder: Object,
        ancestors: Object
    })

    const selectedIds = computed(() => Object.entries(selected.value).filter(a => a[1]).map(a => a[0]))

    function openFolder (file)
    {
        if (!file.is_folder)
        {
            return;
        }
        router.visit(route('myFiles', {folder: file.path}))
    }

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

    function onDelete ()
    {
        allSelected.value = false
        selected.value = {}
    }

    function favoriteToggle (file)
    {
        httpPost(route('file.star'), {id: file.id})
            .then(() => {
                file.is_favorite = !file.is_favorite
                showSuccessNotification('"' + file.name + '" added to favorites.')
            })
            .catch(async (er) => {
                console.log(er.error.message)
            })
    }

    function exploit (name)
    {
        const term = name.split('@')
        return term[0]
    }

    function showOnlyFavorites ()
    {
        if (onlyFavorites.value) {
            params.set('favorites', 1)
        } else {
            params.delete('favorites', 1)
        }
        router.get(window.location.pathname+'?'+params.toString())
    }

    onUpdated(() => {
        allFiles.value = {
            data: props.files.data,
            next: props.files.links.next
        }
    })

    onMounted(() => {
        params = new URLSearchParams(window.location.search)
        onlyFavorites.value = params.get('favorites') == '1'

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
