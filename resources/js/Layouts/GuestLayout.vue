<script setup>
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="mt-3 mb-3 mx-auto" style="max-width: 400px;">
                    <div class="mx-auto" style="width: 5rem;">
                        <Link href="/">
                            <ApplicationLogo />
                        </Link>
                    </div>
                </div>

                <div class="">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>
