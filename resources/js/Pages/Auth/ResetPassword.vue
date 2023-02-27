<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, useForm } from '@inertiajs/vue3';

const props = defineProps({
    email: String,
    token: String,
});

const form = useForm({
    token: props.token,
    email: props.email,
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('password.store'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <GuestLayout>
        <Head title="Reset Password" />

        <div class="card mx-auto" style="max-width: 400px;">
            <div class="card-body">

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

                    <div class="mb-3">
                        <InputLabel for="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            class=""
                            v-model="form.password"
                            required
                            autocomplete="new-password"
                        />

                        <InputError :message="form.errors.password" />
                    </div>

                    <div class="mb-3">
                        <InputLabel for="password_confirmation" value="Confirm Password" />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            class=""
                            v-model="form.password_confirmation"
                            required
                            autocomplete="new-password"
                        />

                        <InputError :message="form.errors.password_confirmation" />
                    </div>

                    <PrimaryButton class="w-100" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                        Reset Password
                    </PrimaryButton>
                </form>
            </div>
        </div>
    </GuestLayout>
</template>
