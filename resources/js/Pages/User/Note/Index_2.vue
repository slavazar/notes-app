<script setup>
import { Head } from "@inertiajs/vue3";
import { Link } from "@inertiajs/vue3";
import { useForm, router } from '@inertiajs/vue3';
import { watch, ref } from 'vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import UserNoteModal from '@/Pages/User/Note/Components/Modal.vue';
import Pagination from '@/Shared/Pagination.vue';

const showModalWindow = ref(false);
const formErrors = ref(null);

const props = defineProps({
    user_notes: {
        type: Object,
    },
    search_text: {
        type: String
    },
});

const delayTimer = ref(null);

async function getSearchResults(event) {
    let value = event.target.value;
    
    clearTimeout(delayTimer.value);
    
    delayTimer.value = setTimeout(function() {
        //console.log('Searching: ' + value);
        router.get(route("account.notes.index"), {
            search: value
        }, {
            preserveState: true,
            preserveScroll: true
        });
    }, 500);
}

const userNoteForm = useForm({
    id: null,
    title: null,
    description: null
});

const resetPage = () => {
    router.get(route("account.notes.index"), {}, {
        preserveState: false,
        preserveScroll: false
    });
};

const reloadPage = () => {
    router.reload({
        preserveState: false,
        preserveScroll: false
    });
};

function truncateString(str, n) {
    return (str.length > n) ? str.slice(0, n-1) + ' &hellip;' : str;
};

const openModalWindow = () => {
    showModalWindow.value = true;
};

function closeModalWindow() {
    showModalWindow.value = false;
    formErrors.value = null;

    userNoteForm.reset();
};

const createUserNote = () => {
    openModalWindow();
};

const storeUserNote = () => {
    const url = route("account.notes.store");
    
    window.axios.post(url, {
        title: userNoteForm.title,
        description: userNoteForm.description,
    }).then((response) => {
        if (response.data.error) {
            if (response.data.error.code == 406) {
                formErrors.value = [];
                let errors = response.data.error.errors;
                Object.entries(errors).forEach(entry => {
                    let [key, messages] = entry;
                    formErrors.value = formErrors.value.concat(messages);
                });
            } else {
                formErrors.value = [response.data.error.message];
            }

            return;
        }

        closeModalWindow();
        resetPage();
    });
};

const editUserNote = (id) => {
    const url = route("account.notes.item", {id: id});
    
    window.axios.get(url)
        .then((response) => {
            if (response.data.error) {
                alert(response.data.error.message);
                return;
            }
            
            userNoteForm.id = response.data.payload.user_note.id;
            userNoteForm.title = response.data.payload.user_note.title;
            userNoteForm.description = response.data.payload.user_note.description;
            
            openModalWindow();
        });
};

const updateUserNote = (id) => {
    const url = route("account.notes.update", {id: id});
    
    window.axios.put(url, {
        title: userNoteForm.title,
        description: userNoteForm.description,
    }).then((response) => {
        if (response.data.error) {
            if (response.data.error.code == 406) {
                formErrors.value = [];
                let errors = response.data.error.errors;
                Object.entries(errors).forEach(entry => {
                    let [key, messages] = entry;
                    formErrors.value = formErrors.value.concat(messages);
                });
            } else {
                formErrors.value = [response.data.error.message];
            }

            return;
        }
        
        closeModalWindow();
        reloadPage();
    });
};

const saveUserNote = () => {
    if (userNoteForm.id) {
        updateUserNote(userNoteForm.id);
    } else {
        storeUserNote();
    }
};

function destroyUserNote(id) {
    var confirmation = confirm('Are you sure to delete the note?');
    if (confirmation) {
        router.delete(route("account.notes.destroy", {id: id}));
    }
}

</script>

<template>
    <Head title="Notes - Account" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="page-title">Notes</h2>
        </template>
        <div class="row mb-3">
            <div class="col">
                <a href="#" @click.prevent="createUserNote" class="btn btn-primary">Add a note</a>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-md-6">
                <div class="row">
                    <div class="col-md-2">
                        <label class="form-label">Search</label>
                    </div>
                    <div class="col-md-10">
                        <input type="text" class="form-control" :value="search_text" v-on:input="getSearchResults">
                    </div>
                </div>
            </div>
        </div>
        <div class="row items mb-3">
            <div v-if="user_notes.data.length == 0" class="col-12">
                <div class="fst-italic mt-3">No items</div>
            </div>
            <div v-for="user_note in user_notes.data" :id="`user_note-${user_note.id}`" class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{{ user_note.title }}</h5>
                        <div class="card-text mb-3" v-html="truncateString(user_note.description, 50)"></div>
                        <div class="actions">
                            <a href="#" @click.prevent="editUserNote(user_note.id)" class="btn btn-primary me-2">View</a>
                            <a href="#" @click.prevent="destroyUserNote(user_note.id)" class="btn btn-danger">Delete</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Pagination :links="user_notes.links" />
        <UserNoteModal :show="showModalWindow" @close-modal="closeModalWindow" @save-modal="saveUserNote">
            <template v-if="formErrors">
                <div class="alert alert-danger">
                    <div v-for="error in formErrors">
                        {{ error }}
                    </div>
                </div>
            </template>
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
