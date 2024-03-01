<template>
    <Modal :show="show" max-width="md">
        <div class="p-6">
            <h4 class="text-xl mb-2 font-semibold">Are you sure?</h4>
            <p>{{message}}</p>

            <div class="mt-6 flex justify-end">
                <SecondaryButton @click="$event => emit('cancel')">
                   Cancel
                </SecondaryButton>

                <DangerButton class="ml-2" @click="$event => emit('confirm')">
                    I am sure!
                </DangerButton>
            </div>
        </div>
    </Modal>
</template>

<script setup>
    import Modal from "@/Components/Modal.vue";
    import SecondaryButton from "@/Components/SecondaryButton.vue";
    import DangerButton from "@/Components/DangerButton.vue";

    const props = defineProps({
        show: Boolean,
        message: String
    })
    const emit = defineEmits(['cancel', 'confirm'])
</script>

<style scoped>

</style>
