<script setup>
import Checkbox from '@/Components/Checkbox.vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

defineProps({
    canResetPassword: Boolean,
    status: String,
});

const form = useForm({
    email: 'user12345@example.com',
    password: 'password12345',
    remember: false,
});

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <GuestLayout>
        <Head title="Log in" />

        <div class="card mx-auto" style="max-width: 400px;">
            <div class="card-body">
                <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
                    {{ status }}
                </div>

                <form @submit.prevent="submit">
                    <div class="mb-3">
                        <InputLabel for="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            :class="{'is-invalid': form.errors.email}"
                            v-model="form.email"
                            required
                            autofocus
                            autocomplete="username"
                            placeholder="user12345@example.com"
                        />

                        <InputError class="" :message="form.errors.email" />
                    </div>

                    <div class="mb-3">
                        <InputLabel for="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            :class="{'is-invalid': form.errors.password}"
                            v-model="form.password"
                            required
                            autocomplete="current-password"
                            placeholder="password12345"
                        />

                        <InputError class="mt-2" :message="form.errors.password" />
                    </div>

                    <div class="mb-3 form-check">
                        <Checkbox name="remember" v-model:checked="form.remember" />
                        <label class="form-check-label">Remember me</label>
                    </div>

                    <div class="mb-3">
                        <Link
                            v-if="canResetPassword"
                            :href="route('password.request')"
                            class=""
                        >
                            Forgot your password?
                        </Link>
                    </div>

                    <PrimaryButton class="w-100" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                        Log in
                    </PrimaryButton>
                </form>
            </div>
        </div>
    </GuestLayout>
</template>
