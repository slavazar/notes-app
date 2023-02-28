<script setup>
import { computed, onMounted, onUnmounted, watch, ref } from 'vue';

const userModal = ref(null);

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    formErrors: {
        type: Object,
        default: null,
    },
});

const emit = defineEmits(['closeModal', 'saveModal']);

watch(
    () => props.show,
    () => {
        if (props.show) {
            userModal.value.show();
        } else {
            userModal.value.hide();
        }
    }
);

watch(
    () => props.formErrors,
    () => {
        if (props.formErrors) {
        }
    }
);

const close = () => {
    emit('closeModal');
};

const save = () => {
    emit('saveModal');
};

onMounted(() => {
    userModal.value = new bootstrap.Modal('#user-note-modal', {
        keyboard: false,
        backdrop: false
    });
    
    const userModalElem = document.getElementById('user-note-modal');
    
    userModalElem.addEventListener('hidden.bs.modal', event => {
        close();
    });
});

onUnmounted(() => {
    userModal.value.dispose();
});
</script>

<template>
    <teleport to="body">
        <div id="user-note-modal" class="modal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Note</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <template v-if="formErrors">
                            <div class="alert alert-danger">
                                <div v-for="error in formErrors">
                                    {{ error }}
                                </div>
                            </div>
                        </template>
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
