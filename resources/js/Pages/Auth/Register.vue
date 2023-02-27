<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <GuestLayout>
        <Head title="Register" />

        <div class="card mx-auto" style="max-width: 400px;">
            <div class="card-body">

                <form @submit.prevent="submit">
                    <div class="mb-3">
                        <InputLabel for="name" value="Name" />

                        <TextInput
                            id="name"
                            type="text"
                            class=""
                            v-model="form.name"
                            required
                            autofocus
                            autocomplete="name"
                        />

                        <InputError :message="form.errors.name" />
                    </div>

                    <div class="mb-3">
                        <InputLabel for="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            class=""
                            v-model="form.email"
                            required
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

                    <div class="mb-3">
                        <Link
                            :href="route('login')"
                            class=""
                        >
                            Already registered?
                        </Link>
                    </div>

                    <PrimaryButton class="w-100" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                        Register
                    </PrimaryButton>
                </form>
            </div>
        </div>
    </GuestLayout>
</template>
