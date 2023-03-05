<script setup>
import { onMounted, onUnmounted, watch, ref } from 'vue';

const bsModal = ref(null);
const bsModalElem = ref(null);

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['closeModal', 'saveModal']);

const showModal = () => {
    if (bsModal.value) {
        bsModal.value.show();
    }
};

const hideModal = () => {
    if (bsModal.value) {
        //console.log('hide modal');
        bsModal.value.hide();
    }
};

defineExpose({
    showModal,
    hideModal
});

watch(
    () => props.show,
    () => {
        if (props.show) {
            showModal();
        } else {
            hideModal();
        }
    }
);

const save = () => {
    emit('saveModal');
};

onMounted(() => {
    //console.log('user note modal mounted');
    bsModal.value = new bootstrap.Modal('#user-note-modal', {
        keyboard: false,
        backdrop: 'static'
    });
    
    bsModalElem.value = document.getElementById('user-note-modal');
    
    bsModalElem.value.addEventListener('hidden.bs.modal', event => {
        //console.log('modal was hidden');
        if (props.show) {
            //console.log('emit close event');
            emit('closeModal');
        }
    });
});

onUnmounted(() => {
    //console.log('user note modal unmounted');
    bsModal.value.hide();
});
</script>

<template>
    <teleport to="body">
        <div id="user-note-modal" class="modal fade" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Note</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <slot />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="save">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>
