<script setup>
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';

const props = defineProps(['href', 'active']);

const classes = computed(() =>
    props.active
        ? ''
        : ''
);
</script>

<template>
    <Link :href="href" :class="classes">
        <slot />
    </Link>
</template>
