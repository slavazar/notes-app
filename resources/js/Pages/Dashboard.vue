<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="">Dashboard</h2>
        </template>
        <div class="row">
            <div class="col">
                <div class="">You're logged in!</div>
            </div>
        </div>

    </AuthenticatedLayout>
</template>
