<script setup>
defineProps(['value']);
</script>

<template>
    <label class="form-label">
        <template v-if="value">{{ value }}</template>
        <template v-else><slot /></template>
    </label>
</template>
