<script setup>
import { Head, Link } from '@inertiajs/vue3';

defineProps({
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String,
});
</script>

<template>
    <Head title="Welcome" />
    <nav class="navbar navbar-expand-md bg-light">
        <div class="container">
            <a class="navbar-brand" href="#">My notes</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav-bar" aria-controls="nav-bar" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="nav-bar">
                <div class=" d-flex flex-row justify-content-md-end w-100">
                    <div v-if="canLogin" class=""> 
                        <Link
                        v-if="$page.props.auth.user"
                        :href="route('account.dashboard')"
                        class=""
                        >Dashboard</Link
                        >

                        <template v-else>
                            <Link :href="route('login')" class="me-3" >Log in</Link>

                            <Link
                            v-if="canRegister"
                            :href="route('register')"
                            class=""
                            >Register</Link
                            >
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </nav>    

    <div class="container mt-3">
        <div class="row">
            <div class="col">

                <div class="text-center">
                    Laravel v{{ laravelVersion }} (PHP v{{ phpVersion }})
                </div>
            </div>
        </div>
    </div>
</template>

<style>
</style>
