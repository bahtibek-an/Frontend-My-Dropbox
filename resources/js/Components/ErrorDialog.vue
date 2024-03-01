<template>
    <Modal :show="show" max-width="xl">
        <div class="p-6 flex items-center justify-between">
            <p>{{message}}</p>
            <PrimaryButton @click="close">Ok</PrimaryButton>
        </div>
    </Modal>
</template>

<script setup>
    import PrimaryButton from "@/Components/PrimaryButton.vue";
    import Modal from "@/Components/Modal.vue";
    import {onMounted, ref} from "vue";
    import {emitter, SHOW_ERROR_DIALOG} from "@/event-bus.js";

    const show = ref(false)
    const message = ref('')

    const emit = defineEmits(['close'])
    function close () {
        show.value = false
        message.value = ''
    }

    onMounted(() => {
        emitter.on(SHOW_ERROR_DIALOG, ({message: msg}) => {
            show.value = true
            message.value = msg
        })
    })
</script>


<style scoped>

</style>
