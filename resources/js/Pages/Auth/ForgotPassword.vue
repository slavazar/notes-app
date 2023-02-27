<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, useForm } from '@inertiajs/vue3';

defineProps({
    status: String,
});

const form = useForm({
    email: '',
});

const submit = () => {
    form.post(route('password.email'));
};
</script>

<template>
    <GuestLayout>
        <Head title="Forgot Password" />
        
        <div class="card mx-auto" style="max-width: 400px;">
            <div class="card-body">

                <div class="mb-4 text-sm text-gray-600">
                    Forgot your password? No problem. Just let us know your email address and we will email you a password reset
                    link that will allow you to choose a new one.
                </div>

                <div v-if="status" class="text-success">
                    {{ status }}
                </div>

                <form @submit.prevent="submit">
                    <div class="mb-3">
                        <InputLabel for="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            class=""
                            v-model="form.email"
                            required
                            autofocus
                            autocomplete="username"
                        />

                        <InputError :message="form.errors.email" />
                    </div>

                    <PrimaryButton class="w-100" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                        Email Password Reset Link
                    </PrimaryButton>
                </form>
            </div>
        </div>
    </GuestLayout>
</template>
