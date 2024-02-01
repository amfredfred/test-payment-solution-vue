<script setup lang="ts">
import InputLabel from '@/components/InputLabel.vue';
import TextInput from '@/components/TextInput.vue';
import { useMutation } from '@tanstack/vue-query';
import { ref, watchEffect } from 'vue';
import axios from 'axios'
import { endpoints } from '../../constants'
import InputError from '@/components/InputError.vue';
import type { AuthResponse } from 'interfaces'

import { useAuthStore } from '@/stores/auth'
const { updateProfile } = useAuthStore()


const formView = ref<'register' | 'login'>('login')

const name = ref()
const email = ref()
const password = ref()
const password_confirmation = ref()

const authRequest = useMutation({
    mutationKey: ['auth'],
    mutationFn: async (data) => await axios<AuthResponse>({
        method: "POST",
        baseURL: endpoints?.[formView.value],
        data,
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        }
    })
})

watchEffect(() => {
    if (authRequest?.isSuccess?.value)
        updateProfile({
            profile: authRequest?.data?.value?.data.profile,
            message: authRequest?.data?.value?.data.message,
            token: authRequest?.data?.value?.data.token,
            isAuthenticated: authRequest?.isSuccess?.value
        })
})

</script>

<template>
    {{ authRequest?.failureReason?.value?.response?.data }}
    <div class=" min-h-dvh flex  bg-zinc-200 p-1">
        <div class=" bg-white w-96 m-auto  shadow-sm overflow-hidden" style="border-radius: 10px;">
            <div class="flex justify-between p-3">
                <button @click="formView = 'login'"
                    :class="{ 'bg-teal-300': formView == 'login', 'py-2': true, 'px-4': true }">Login</button>
                <button @click="formView = 'register'"
                    :class="{ 'bg-teal-300': formView == 'register', 'py-2': true, 'px-4': true }">Register</button>
            </div>
            <div class="auth-forms w-full bg-gray-50 p-3">
                <div v-if="formView === 'login'" class="login-form">
                    <div class="mt-4">
                        <InputLabel for="email" value="Email" />
                        <TextInput id="email" type="email" class="mt-1 block w-full" v-model="email" required autofocus
                            autocomplete="username" />
                        <InputError class="mt-2"
                            :message="authRequest?.failureReason?.value?.response?.data?.errors?.email?.[0]" />
                    </div>

                    <div class="mt-4">
                        <InputLabel for="password" value="Password" />
                        <TextInput id="password" type="password" class="mt-1 block w-full" v-model="password" required
                            autocomplete="current-password" />
                        <InputError class="mt-2"
                            :message="authRequest?.failureReason?.value?.response?.data?.errors?.password?.[0]" />
                    </div>
                </div>


                <div v-if="formView === 'register'" class="register-form">
                   
                     <div class="mt-4">
                            <InputLabel for="name" value="Name" />
                            <TextInput id="name" type="name" class="mt-1 block w-full" v-model="name" required autofocus
                                autocomplete="name" />
                            <InputError class="mt-2"
                                :message="authRequest?.failureReason?.value?.response?.data?.errors?.name?.[0]" />
                        </div>
                   
                    <div class="mt-4">
                        <InputLabel for="email" value="Email" />
                        <TextInput id="email" type="email" class="mt-1 block w-full" v-model="email" required autofocus
                            autocomplete="email" />
                        <InputError class="mt-2"
                            :message="authRequest?.failureReason?.value?.response?.data?.errors?.email?.[0]" />
                    </div>

                    <div class="mt-4">
                        <InputLabel for="password" value="Password" />
                        <TextInput id="password" type="password" class="mt-1 block w-full" v-model="password" required
                            autocomplete="current-password" />
                        <InputError class="mt-2"
                            :message="authRequest?.failureReason?.value?.response?.data?.errors?.password?.[0]" />
                    </div>
                    <div class="mt-4">
                        <InputLabel for="password_confirmation" value="Confirm password" />
                        <TextInput id="password_confirmation" type="password" class="mt-1 block w-full"
                            v-model="password_confirmation" required autocomplete="confirm-password" />
                        <InputError class="mt-2"
                            :message="authRequest?.failureReason?.value?.response?.data?.errors?.password_confirmation?.[0]" />
                    </div>
                </div>
                <button @click="authRequest.mutate({ email, password, password_confirmation, name } as any)"
                    :disabled="authRequest.isPending.value" style="text-transform: uppercase;"
                    class=" bg-green-500 w-full mt-3 py-2">
                    {{ formView }}
                </button>
            </div>
        </div>
    </div>
</template>