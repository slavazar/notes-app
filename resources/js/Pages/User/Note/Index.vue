<template>
    <Head title="Cards - Account" />

    <AuthenticatedLayout>
        <template #header>
            <h1 class="page-title">Cards</h1>
        </template>
        <div class="row items">
            <div v-if="user_notes.data.length == 0" class="col-12">
                <div class="fst-italic mt-3">No cards</div>
            </div>
            <div v-for="card in user_notes.data" :id="`card-${card.id}`" class="item-block col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="item">
                    <div class="data data-id">
                        <div class="title">ID:</div>
                        <div class="value">{{ card.id }}</div>
                    </div>
                    <div class="data">
                        <div class="title">Title</div>
                        <div class="value">{{ card.title }}</div>
                    </div>
                    <div class="actions">
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
<script>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from "@inertiajs/vue3";
import { Link } from "@inertiajs/vue3";

export default {
modalWindow: null,
    components: {
        AuthenticatedLayout,
        Head,
        Link,
    },
    props: {
        user_notes: Object, 
    },
    setup(props) {
    },
    mounted() {
    },
    methods: {
    },
};
</script>