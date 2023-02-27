<script setup>
import { computed } from 'vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

const props = defineProps({
    status: String,
});

const form = useForm({});

const submit = () => {
    form.post(route('verification.send'));
};

const verificationLinkSent = computed(() => props.status === 'verification-link-sent');
</script>

<template>
    <GuestLayout>
        <Head title="Email Verification" />
        
        <div class="card mx-auto" style="max-width: 400px;">
            <div class="card-body">

                <div class="mb-3">
                    Thanks for signing up! Before getting started, could you verify your email address by clicking on the link
                    we just emailed to you? If you didn't receive the email, we will gladly send you another.
                </div>

                <div class="mb-3" v-if="verificationLinkSent">
                    A new verification link has been sent to the email address you provided during registration.
                </div>

                <form @submit.prevent="submit">
                    <div class="mb-3">
                        <PrimaryButton class="w-100" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                            Resend Verification Email
                        </PrimaryButton>
                    </div>
                    <div class="mb-3">
                        <Link
                            :href="route('logout')"
                            method="post"
                            as="button"
                            class="btn btn-secondaryy w-100"
                            >Log Out</Link
                        >
                    </div>
                </form>
            </div>
        </div>
    </GuestLayout>
</template>
