<template>
    <div
        class="flex w-full gap-4 bg-gray-50 bg-dots-darker"
        :class="{
            'h-screen': page.url !== '/profile',
            '!bg-neutral-900 !bg-dots-lighter' : darkMode
        }"
    >

        <Navigation
            class="bg-white ring-1 ring-inset rounded-md ml-2 my-2 ring-white"
            :class="{
                '!bg-neutral-950 !ring-black' : darkMode
            }"
        />

        <main
            @drop.prevent="handleDrop"
            @dragover.prevent="onDragOver"
            @dragleave.prevent="onDragLeave"
            class="flex flex-col flex-1 pr-4 overflow-hidden"
            :class="dragOver ? 'dropzone' : ''"
        >
            <template v-if="dragOver" class="text-gray-600 text-center py-6 text-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 mb-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
                Dosyaları yüklemek için buraya bırakın
            </template>
            <template v-else>
                <div
                    class="flex items-center justify-between w-full rounded-md my-2 px-6 ring-1 ring-inset bg-white ring-white"
                    :class="{
                        '!ring-black !bg-neutral-950' : darkMode
                    }"
                >
                    
                    <div class="flex gap-x-4 m-2">
                        <div
                            class="dark-mode-switch mt-2"
                            :class="{'dark' : darkMode}"
                            @click="toggleDarkMode"
                        >
                            <div class="inner">
                                <div class="bg"></div>
                                <div class="circle"></div>
                            </div>
                            <div class="rays">
                                <div class="ray"></div>
                                <div class="ray"></div>
                                <div class="ray"></div>
                                <div class="ray"></div>
                                <div class="ray"></div>
                                <div class="ray"></div>
                                <div class="ray"></div>
                                <div class="ray"></div>
                            </div>
                        </div>
                        <UserSettingsDropdown/>
                    </div>
                </div>
                <div
                    class="flex flex-1 flex-col overflow-hidden rounded-md p-6 mb-2 ring-1 ring-inset"
                    :class="darkMode === true ? 'ring-black bg-neutral-950' : 'ring-white bg-white'"
                >
                    <slot/>
                </div>
            </template>
        </main>
    </div>
    <ErrorDialog/>
    <FormProgress :form="fileUploadForm"/>
    <Notification/>
</template>

<script setup>
import Navigation from "@/Components/app/Navigation.vue";
import SearchForm from "@/Components/app/SearchForm.vue";
import UserSettingsDropdown from "@/Components/app/UserSettingsDropdown.vue";
import {onMounted, ref} from "vue";
import {DISPLAY_MODE, emitter, FILE_UPLOAD_STARTED, showErrorDialog, showSuccessNotification} from "@/event-bus.js";
import {useForm, usePage} from "@inertiajs/vue3";
import FormProgress from "@/Components/app/FormProgress.vue";
import ErrorDialog from "@/Components/ErrorDialog.vue";
import Notification from "@/Components/Notification.vue";

const page = usePage();

const fileUploadForm = useForm({
    files: [],
    relative_paths: [],
    parent_id: null
})

const dragOver = ref(false)

function onDragOver() {
    dragOver.value = true
}

function onDragLeave() {
    dragOver.value = false
}

function handleDrop(ev) {
    dragOver.value = false
    const files = ev.dataTransfer.files
    console.log(files)
    if (!files.length) {
        return
    }

    uploadFiles(files)
}

function uploadFiles(files) {
    fileUploadForm.parent_id = page.props.folder.id
    fileUploadForm.files = files
    fileUploadForm.relative_paths = [...files].map(f => f.webkitRelativePath)

    fileUploadForm.post(route('file.store'), {
        preserveScroll: true,
        onSuccess: () => {
            showSuccessNotification(`${files.length} yeni dosya eklendi!`)
        },
        onError: errors => {
            let message = '';

            if (Object.keys(errors).length > 0) {
                message = errors[Object.keys(errors)[0]]
            } else {
                message = 'Dosya yüklenirken bir hata oldu 😓 lütfen tekrar deneyin.'
            }
            showErrorDialog(message)
        },
        onFinish: () => {
            fileUploadForm.clearErrors()
            fileUploadForm.reset()
        }
    })
}

const darkMode = ref(localStorage.getItem('darkMode') === 'true');

const toggleDarkMode = () => {
    darkMode.value = !darkMode.value;
    localStorage.setItem('darkMode', darkMode.value.toString());
    emitter.emit(DISPLAY_MODE, darkMode.value);
};

onMounted(() => {
    const darkModeSwitch = document.querySelector('.dark-mode-switch');

    darkModeSwitch.addEventListener('click', () => {
        document.body.classList.toggle('switching', true);
        setTimeout(() => {
            document.body.classList.toggle('switching', false);
        }, 200);
    });

    emitter.on(FILE_UPLOAD_STARTED, uploadFiles)
    emitter.on(DISPLAY_MODE, (newDarkMode) => {
        darkMode.value = newDarkMode
    })
})
</script>

<style scoped>
.dropzone {
    width: 80%;
    height: 70%;
    margin-top: 5vh;
    border-radius: 1.5rem;
    color: #8D8D8D;
    border: 2px dashed #808080FF;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: none;
}
</style>
<style>
    .bg-dots-darker {
        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
    }
    @media (prefers-color-scheme: dark) {
        .dark\:bg-dots-lighter {
            background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
        }
    }

    body.switching * {
        transition: all 0.2s;
    }
    .dark-mode-switch {
        position: relative;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        cursor: pointer;
    }
    .dark-mode-switch:hover .circle {
        margin-left: 11px;
        margin-top: -23px;
    }
    .dark-mode-switch .inner {
        width: 20px;
        height: 20px;
        border-radius: 10px;
        overflow: hidden;
    }
    .dark-mode-switch .bg {
        width: 20px;
        height: 20px;
        background-color: #202020;
        border: 1px solid #f0f0f0;
        border-radius: 10px;
        transition: all 0s;
    }
    .dark-mode-switch .circle {
        margin-left: 8px;
        margin-top: -22px;
        width: 20px;
        height: 20px;
        background-color: #f0f0f0;
        border: 2px solid transparent;
        border-radius: 10px;
        transition: all 0.2s;
    }
    .dark-mode-switch .rays {
        position: absolute;
        left: 0;
        top: 0;
    }
    .dark-mode-switch .rays .ray {
        position: absolute;
        left: 9px;
        top: 11px;
        width: 1.25px;
        height: 3px;
        background-color: #fbc02d;
        transform-origin: 1px 0;
        opacity: 0;
    }
    .dark-mode-switch .rays .ray:nth-child(1) {
        transform: rotate(-180deg) translateY(15px);
        transition: all 0.2s;
    }
    .dark-mode-switch .rays .ray:nth-child(2) {
        transform: rotate(-225deg) translateY(15px);
        transition: all 0.2s;
    }
    .dark-mode-switch .rays .ray:nth-child(3) {
        transform: rotate(-270deg) translateY(15px);
        transition: all 0.2s;
    }
    .dark-mode-switch .rays .ray:nth-child(4) {
        transform: rotate(-315deg) translateY(15px);
        transition: all 0.2s;
    }
    .dark-mode-switch .rays .ray:nth-child(5) {
        transform: rotate(-360deg) translateY(15px);
        transition: all 0.2s;
    }
    .dark-mode-switch .rays .ray:nth-child(6) {
        transform: rotate(-405deg) translateY(15px);
        transition: all 0.2s;
    }
    .dark-mode-switch .rays .ray:nth-child(7) {
        transform: rotate(-450deg) translateY(15px);
        transition: all 0.2s;
    }
    .dark-mode-switch .rays .ray:nth-child(8) {
        transform: rotate(-495deg) translateY(15px);
        transition: all 0.2s;
    }
    .dark-mode-switch.dark:hover .rays .ray:nth-child(1) {
        transform: rotate(-180deg) translateY(18px);
    }
    .dark-mode-switch.dark:hover .rays .ray:nth-child(2) {
        transform: rotate(-225deg) translateY(18px);
    }
    .dark-mode-switch.dark:hover .rays .ray:nth-child(3) {
        transform: rotate(-270deg) translateY(18px);
    }
    .dark-mode-switch.dark:hover .rays .ray:nth-child(4) {
        transform: rotate(-315deg) translateY(18px);
    }
    .dark-mode-switch.dark:hover .rays .ray:nth-child(5) {
        transform: rotate(-360deg) translateY(18px);
    }
    .dark-mode-switch.dark:hover .rays .ray:nth-child(6) {
        transform: rotate(-405deg) translateY(18px);
    }
    .dark-mode-switch.dark:hover .rays .ray:nth-child(7) {
        transform: rotate(-450deg) translateY(18px);
    }
    .dark-mode-switch.dark:hover .rays .ray:nth-child(8) {
        transform: rotate(-495deg) translateY(18px);
    }
    .dark-mode-switch.dark .circle {
        margin-left: 0;
        margin-top: -20px;
        background-color: #fbc02d;
        border-color: #f9a825;
    }
    .dark-mode-switch.dark .rays .ray {
        opacity: 1;
    }
    .dark-mode-switch.dark .rays .ray:nth-child(1) {
        transform: rotate(-180deg) translateY(15px);
        transition: all 0.4s;
    }
    .dark-mode-switch.dark .rays .ray:nth-child(2) {
        transform: rotate(-225deg) translateY(15px);
        transition: all 0.6s;
    }
    .dark-mode-switch.dark .rays .ray:nth-child(3) {
        transform: rotate(-270deg) translateY(15px);
        transition: all 0.8s;
    }
    .dark-mode-switch.dark .rays .ray:nth-child(4) {
        transform: rotate(-315deg) translateY(15px);
        transition: all 1s;
    }
    .dark-mode-switch.dark .rays .ray:nth-child(5) {
        transform: rotate(-360deg) translateY(15px);
        transition: all 1.2s;
    }
    .dark-mode-switch.dark .rays .ray:nth-child(6) {
        transform: rotate(-405deg) translateY(15px);
        transition: all 1.4s;
    }
    .dark-mode-switch.dark .rays .ray:nth-child(7) {
        transform: rotate(-450deg) translateY(15px);
        transition: all 1.6s;
    }
    .dark-mode-switch.dark .rays .ray:nth-child(8) {
        transform: rotate(-495deg) translateY(15px);
        transition: all 1.8s;
    }
</style>
