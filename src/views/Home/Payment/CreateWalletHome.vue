<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import InputError from '@/components/InputError.vue';
import InputLabel from '@/components/InputLabel.vue';
import TextInput from '@/components/TextInput.vue';
import AuthenticatedLayout from '@/views/Layouts/AuthenticatedLayout.vue';
import { useMutation, useQuery } from '@tanstack/vue-query';
import type { WalletCreateDataResponse, WalletCreatedResponse } from '@/interfaces'
import axios from 'axios';
import { endpoints } from '@/constants';
import { useAuthStore } from '@/stores/auth';
import PreLoading from '@/components/PreLoading.vue';

const authStore = useAuthStore()
const user = ref(authStore.user)
watchEffect(() => user.value = authStore.user)

const walletCreateOptions = useQuery({
    queryFn: async () => await axios<WalletCreateDataResponse>({
        baseURL: endpoints.createWalletPage,
        method: "GET",
        headers: { Authorization: `Bearer ${user?.value?.token}` }
    }),
    queryKey: ['walletCreateDateResponse'],
    retry: 2
})


const walletCreateMutator = useMutation({
    mutationFn: async (data: any) => await axios<WalletCreatedResponse>({
        baseURL: endpoints.storeUserWallet,
        method: "POST",
        data,
        headers: { Authorization: `Bearer ${user?.value?.token}` }
    }),
    mutationKey: ['walletCreateMutation'],
    onSuccess: () => walletCreateOptions.refetch()
})

const initial_balance = ref()
const slug = ref()

</script>

<style>
.form-container {
    padding: 10px;
    box-shadow: 0 0 1px inset black;
    background: white;
    border-radius: 5px;
    margin-top: 30px;
    max-width: 500px;
}
</style>
 

<template>
    <AuthenticatedLayout>
        <div class="py-12">
            <div v-if="walletCreateOptions?.isLoading.value" class="w-full flex  justify-center">
                <PreLoading />
            </div>

            <InputError v-else-if="walletCreateOptions?.isError.value" class="mt-2"
                :message="walletCreateOptions?.failureReason?.value?.message" />

            <div v-else class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden flex shadow-sm sm:rounded-lg">
                    <div class=" py-3 px-3">
                        Create New Wallet ==== ==== ====
                    </div>
                </div>

                <div class="form-container ">
                    <InputError class="mt-2" :message="walletCreateMutator?.data?.value?.data?.error" />
                    <span v-if="walletCreateMutator?.data?.value?.data?.message" style="padding:20px; color: green;">
                        {{ walletCreateMutator?.data?.value?.data?.message }}
                    </span>

                    <div class=" flex gap-3">
                        <div class="col-xl-6 mb-3 flex-grow">
                            <InputLabel for="slug" value="Select Wallet Denomination" />
                            <select name="slug" id="slug" v-model="slug">
                                <option value="" selected="true">Choose Currency</option>
                                <option v-for="currency in walletCreateOptions?.data?.value?.data?.currencies"
                                    :value="currency.slug" :key="currency.slug">
                                    {{ currency.name }}
                                </option>
                            </select>
                            <InputError class="mt-2"
                                :message="walletCreateMutator?.failureReason?.value?.response?.data?.errors?.slug?.[0]" />
                        </div>

                        <div class="col-xl-6 mb-3 flex-grow">
                            <InputLabel for="initial_balance" value="Initial balance" />
                            <TextInput :placeholder="`${slug ?? ''} 0.00`" v-model="initial_balance" type="number" id="initial_balance" />
                            <InputError class="mt-2"
                                :message="walletCreateMutator?.failureReason?.value?.response?.data?.errors?.initial_balance?.[0]" />
                        </div>
                    </div>

                    <div class="col-xl-12">
                        <button class="" :disabled="walletCreateMutator?.isPending?.value"
                            @click="walletCreateMutator?.mutate({ slug, initial_balance })"
                            style="padding: 10px 40px; background: green; border-radius: 5px;color:white; margin-left:auto; width:100%">
                            <PreLoading v-if="walletCreateMutator?.isPending.value" />
                            <span v-else>Create Wawllet</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>