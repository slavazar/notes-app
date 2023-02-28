<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from "@inertiajs/vue3";
import { Link } from "@inertiajs/vue3";
import UserNoteModal from '@/Pages/User/Note/Components/Modal.vue';
import { useForm } from '@inertiajs/vue3';

import { nextTick, ref } from 'vue';

const showModalWindow = ref(false);
const modalWindowErrors = ref(null);

const userNoteForm = useForm({
    title: null,
    description: null
});


const props = defineProps({
    user_notes: {
        type: Object,
    },
});

const openModalWindow = () => {
    showModalWindow.value = true;
};

const closeModalWindow = () => {
    showModalWindow.value = false;
    modalWindowErrors.value = null;

    userNoteForm.reset();
};

const storeUserNote = () => {

    const url = route("account.notes.store");

    window.axios.post(url, {
        title: userNoteForm.title,
        description: userNoteForm.description,
    }).then((response) => {
        //console.log(response);
        //console.log(response.data);

        if (response.data.errors) {
            modalWindowErrors.value = response.data.errors;

            return;
        }
        
        closeModalWindow();
    });
};
</script>

<template>
    <Head title="Notes - Account" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="page-title">Notes</h2>
        </template>
        <div class="row mb-3">
            <div class="col">
                <a href="#" @click.prevent="openModalWindow" class="btn btn-primary">Add a note</a>
            </div>
        </div>
        <div class="row items">
            <div v-if="user_notes.data.length == 0" class="col-12">
                <div class="fst-italic mt-3">No items</div>
            </div>
            <div v-for="user_note in user_notes.data" :id="`user_note-${user_note.id}`" class="col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="item">
                    <div class="data data-id">
                        <div class="title">ID:</div>
                        <div class="value">{{ user_note.id }}</div>
                    </div>
                    <div class="data">
                        <div class="title">Title</div>
                        <div class="value">{{ user_note.title }}</div>
                    </div>
                    <div class="actions">
                    </div>
                </div>
            </div>
        </div>
        <UserNoteModal :show="showModalWindow" :formErrors="modalWindowErrors" @closeModal="closeModalWindow" @saveModal="storeUserNote">
            <div class="mb-3">
                <label class="form-label">Title</label>
                <input type="text" class="form-control" v-model="userNoteForm.title">
            </div>
            <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea class="form-control" rows="3" v-model="userNoteForm.description"></textarea>
            </div>
        </UserNoteModal>
        
    </AuthenticatedLayout>
</template>
