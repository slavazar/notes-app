<script setup>
import { onMounted, onUnmounted, watch, ref } from 'vue';

const bsModal = ref(null);
const bsModalElem = ref(null);

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        default: null,
    },
});

const emit = defineEmits(['closeAppModal', 'submitAppModal']);

function showModal() {
    if (bsModal.value) {
        bsModal.value.show();
    }
}

function hideModal() {
    if (bsModal.value) {
        //console.log('hide modal');
        bsModal.value.hide();
    }
}

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

defineExpose({
    showModal,
    hideModal
});

const submit = () => {
    emit('submitAppModal');
};

onMounted(() => {
    //console.log('alert modal mounted');
    bsModal.value = new bootstrap.Modal('#app-modal', {
        keyboard: false,
        backdrop: 'static'
    });
    
    bsModalElem.value = document.getElementById('app-modal');
    
    bsModalElem.value.addEventListener('hidden.bs.modal', event => {
        //console.log('modal was hidden; emit close event');
        emit('closeAppModal');
    });
});

onUnmounted(() => {
    //console.log('alert modal unmounted');
    bsModal.value.hide();
});
</script>

<template>
    <teleport to="body">
        <div id="app-modal" class="modal fade" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ title }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <slot />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary d-none" @click="submit">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>
