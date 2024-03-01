<template>
    <button
        @click="onDeleteClick"
        class="inline-flex items-center px-4 py-2 text-sm font-medium border transition-all rounded-md focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
        :class="darkMode === true ? 'text-gray-300 bg-neutral-800 border-neutral-800 hover:bg-neutral-950 hover:text-gray-300' : 'text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700'"
    >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="w-4 h-4 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
        </svg>
        Clean
    </button>
    <ConfirmationDialog
        :show="showDeleteDialog"
        message="The selected files will be sent to the trash, are you sure?"
        @cancel="onDeleteCancel"
        @confirm="onDeleteConfirm"
    />
    <span class="absolute bottom-5 right-7 text-sm bg-white border shadow-lg py-2 px-4 rounded-lg" v-if="deleteIds.length > 0">{{deleteIds.length}} item selected</span>
</template>

<script setup>

    import ConfirmationDialog from "@/Components/ConfirmationDialog.vue";
    import {onMounted, ref} from "vue";
    import {useForm, usePage} from "@inertiajs/vue3";
    import {DISPLAY_MODE, emitter, showErrorDialog, showSuccessNotification} from "@/event-bus.js";

    const page = usePage()
    const deleteFilesForm = useForm({
        all: null,
        ids: [],
        parent_id: null
    })

    const darkMode = ref(localStorage.getItem('darkMode') === 'true');

    const showDeleteDialog = ref(false)

    const props = defineProps({
        deleteAll: {
            type: Boolean,
            required: false,
            default: false
        },
        deleteIds: {
            type: Array,
            required: false
        }
    })

    const emit = defineEmits(['delete'])

    function onDeleteClick ()
    {
        if (!props.deleteAll && !props.deleteIds.length) {
            showErrorDialog('You must select at least one item for this process 😃')
            return

        }
        showDeleteDialog.value = true
    }

    function onDeleteCancel ()
    {
        showDeleteDialog.value = false
    }

    function onDeleteConfirm ()
    {
        deleteFilesForm.parent_id = page.props.folder.id
        if (props.deleteAll) {
            deleteFilesForm.all = true
        } else {
            deleteFilesForm.ids = props.deleteIds
        }

        deleteFilesForm.delete(route('file.delete'), {
            onSuccess: () => {
                showDeleteDialog.value = false
                emit('delete')
                if (props.deleteAll) {
                    showSuccessNotification('All files in this folder have been deleted')
                } else {
                    showSuccessNotification(`${props.deleteIds.length} number of files were deleted`)
                }
            }
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
