<script setup>
import { ref } from 'vue';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import NavLink from '@/Components/NavLink.vue';
import { Link } from '@inertiajs/vue3';

const showingNavigationDropdown = ref(false);
</script>

<template>
    <nav class="navbar navbar-expand-md bg-light">
        <div class="container">
            <Link class="navbar-brand" :href="route('account.dashboard')">
                My notes
            </Link>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav-bar" aria-controls="nav-bar" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="nav-bar">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <NavLink :href="route('account.dashboard')" :active="route().current('account.dashboard')">
                                Dashboard
                            </NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink :href="route('account.notes.index')" :active="route().current('account.notes.*')">
                                Notes
                            </NavLink>
                        </li>
                    </ul>
                    <div class="navbar-text">
                        <span class="me-3">
                            Hi, {{ $page.props.auth.user.name }}
                        </span>

                        <Link :href="route('profile.edit')" class="me-3">Profile</Link>
                        <Link class="btn btn-secondary" :href="route('logout')" method="post" as="button">
                            Log Out
                        </Link>
                    </div>
            </div>
        </div>
    </nav>    
    <!-- Page Content -->
    <div class="container">
        <header class="mb-3" v-if="$slots.header">
            <slot name="header" />
        </header>
        <main>
            <slot />
        </main>
    </div>
</template>
