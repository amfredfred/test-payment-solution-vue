<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import InputError from '@/components/InputError.vue';
import TextInput from '@/components/TextInput.vue';
import AuthenticatedLayout from '@/views/Layouts/AuthenticatedLayout.vue';
import { useMutation, useQuery } from '@tanstack/vue-query';
import type { TransferCreatedResponse, TransferCreateDataRresponse } from '@/interfaces'
import axios from 'axios';
import { endpoints } from '@/constants';
import { useAuthStore } from '@/stores/auth';
import PreLoading from '@/components/PreLoading.vue';

const authStore = useAuthStore()
const user = ref(authStore.user)
watchEffect(() => user.value = authStore.user)

const transferCreateOptions = useQuery({
    queryFn: async () => await axios<TransferCreateDataRresponse>({
        baseURL: endpoints.createTransferPage,
        method: "GET",
        headers: { Authorization: `Bearer ${user?.value?.token}` }
    }),
    queryKey: ['tansferCreateOptionsDataResponse'],
    refetchInterval:2000
})


const transferCreateMutator = useMutation({
    mutationFn: async (data: any) => await axios<TransferCreatedResponse>({
        baseURL: endpoints.storeUserTransfer,
        method: "POST",
        data,
        headers: { Authorization: `Bearer ${user?.value?.token}` }
    }),
    mutationKey: ['transferCreateMutation'],
    onSuccess: () => transferCreateOptions.refetch()
})

const recipient_id = ref()
const wallet_slug = ref()
const amount = ref()
</script>

<style>
.blance-container {
    padding-inline: 25px;
    padding-bottom: 20px;
    border-radius: 20px;
    width: 320px;
}

.form-container {
    width: 100%;
    padding: 10px;
    box-shadow: 0 0 1px inset black;
    background: white;
    border-radius: 5px;
    margin-top: 30px;
}
</style>
 

<template>
    <AuthenticatedLayout>
        <div class="py-12">
            <div v-if="transferCreateOptions?.isLoading.value" class="w-full flex  justify-center">
                <PreLoading />
            </div>

            <InputError v-else-if="transferCreateOptions?.isError.value"  class="mt-2" :message="transferCreateOptions?.failureReason?.value?.message" />

            <div v-else class="max-w-7xl mx-auto sm:px-6 lg:px-8">
               <div class="bg-white overflow-hidden flex shadow-sm sm:rounded-lg">
                        <div class=" py-3 px-3">
                            Transfer Funds ==== ==== ====
                        </div>
                    </div>
                <div class="form-container">
                    <InputError class="mt-2"
                        :message="transferCreateMutator?.failureReason?.value?.response?.data?.errors?.default" />

                    <div :style="'display:flex; flex-wrap:wrap; gap:10px'">
                        <div class="row"
                            style="display: flex;align-items: flex-end;justify-content: space-between; gap: 10px;">
                            <div class="col-xl-4" style="display: flex;flex-direction: column;">
                                <InputError
                                    :message="transferCreateMutator?.failureReason?.value?.response?.data?.errors?.amount?.[0]" />
                                <TextInput :placeholder="`${wallet_slug ?? ''} 0.00`" type="number" v-model="amount" />
                            </div>
                            <div class="col-xl-4" style="display: flex;flex-direction: column;">
                                <InputError
                                    :message="transferCreateMutator?.failureReason?.value?.response?.data?.errors?.wallet_slug?.[0]" />
                                <select v-model="wallet_slug"  class="py-2 px-4  bg-orange-200 " style="border-radius: 5px;">
                                    <option value="" selected>Choose Wallet</option>
                                    <option v-for=" wallet  in  transferCreateOptions?.data?.value?.data?.wallets"
                                        :key="wallet.slug" :value="wallet.slug">
                                        {{ wallet.slug.concat(' ' + wallet.balance as any) }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-xl-4" style="display: flex;flex-direction: column;">
                                <InputError
                                    :message="transferCreateMutator?.failureReason?.value?.response?.data?.errors?.recipient_id?.[0]" />
                                <!-- <span v-if="recipient_id" style="margin: auto;">
                                    send to <strong style="color: green;">{{
                                        transferCreateOptions?.data?.value?.data?.users[recipient_id] }}</strong>
                                </span> -->
                                <select v-model="recipient_id"  class="py-2 px-4  bg-orange-200 " style="border-radius: 5px;">
                                    <option value='' selected>Choose Recipeint</option>
                                    <option v-for=" (name, index)  in  transferCreateOptions?.data?.value?.data?.users "
                                        :key="index" :value="index">{{ name }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-xl-12">
                            <button class="" :disabled="transferCreateMutator?.isPending?.value"
                                @click="transferCreateMutator?.mutate({ wallet_slug, amount, recipient_id })"
                                style="padding: 10px 40px; background: green; border-radius: 5px;color:white; margin-left:auto; width:100%">
                                <PreLoading v-if="transferCreateMutator?.isPending.value" />
                                <span v-else>Send</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
@/interfaces