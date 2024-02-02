<template>
    <transition
        enter-active-class="ease-out duration-300"
        enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0 sm:scale-100"
        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
        <div
            v-if="show"
            class="fixed bottom-4 left-4 text-white text-sm dark:text-neutral-300 py-2 px-4 rounded-lg shadow-md w-auto"
            :class="{
                'bg-emerald-500 dark:bg-emerald-800': type === 'success',
                'bg-red-500 dark:bg-red-800': type === 'error'
            }"
        >
            {{ message }}
        </div>
    </transition>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {emitter, SHOW_NOTIFICATION} from "@/event-bus.js";

const show = ref(false)
const type = ref('success')
const message = ref('')

function close()
{
    show.value = false;
    type.value = ''
    type.value = ''
}

onMounted(() => {
    let timeout
    emitter.on(SHOW_NOTIFICATION, ({type: t, message :msg}) => {
        show.value = true
        type.value = t
        message.value = msg
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            close()
        }, 2000)
    })
})

</script>

<style scoped>

</style>
