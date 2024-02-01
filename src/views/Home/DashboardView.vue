<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import InputLabel from '../../components/InputLabel.vue';
import QrCode from '../../components/QrCode.vue';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout.vue';
import axios from 'axios';
import { endpoints } from '@/constants';
import { useAuthStore } from '@/stores/auth';
import { watchEffect, ref } from 'vue'
import type { DashResponse } from '../../../interfaces'
import PreLoading from '@/components/PreLoading.vue';


const authStore = useAuthStore()
const user = ref(authStore.user)
watchEffect(() => user.value = authStore.user)

const dashData = useQuery({
    queryKey: ['dashData'],
    queryFn: async () => await axios<DashResponse>({
        method: 'GET',
        baseURL: endpoints?.dashboard,
        headers: { Authorization: `Bearer ${user?.value?.token}` }
    }),
    refetchInterval: 2000
})

</script>

<style>
.qr-code-container {
    width: 200px;
    aspect-ratio: 1;
    background: red;
    display: flex;
    padding: 5px;
    flex-direction: column;
}
</style>

<template>
    <AuthenticatedLayout>
        <template>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>
        </template>


        <div class="py-12">
            <div v-if="dashData?.isLoading.value" class="w-full flex  justify-center">
                <PreLoading />
            </div>
            <div v-else class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white bg-danger overflow-hidden shadow-sm sm:rounded-lg" style="display: flex;">
                    <div class="row" style="padding: 20px; display: flex; gap: 10px; flex-direction: column; flex-grow: 1;">
                        <div style="display: flex;flex-direction: row;align-items: center;  gap: 10px;">
                            <a style="padding: 10px 20px; background: green; border-radius: 50px;"
                                href="/transfer">Transfer</a>
                            <a style="padding: 10px 20px; background: orangered; border-radius: 50px;"
                                href="create-wallet">Create Wallet</a>

                            <span>{{ dashData?.data?.value?.data?.pay_link }}</span>

                        </div>

                        <div class=" col-xl-12" style="  display: flex; gap: 10px;align-items: center;width: 100%;">
                            <div class="col-xl-4" v-for="wallet in dashData?.data?.value?.data?.wallets" :key="wallet.slug"
                                style="box-shadow: 0 0 2px black inset;background: whitesmoke;padding: 10px 20px;border-radius: 5px;">
                                {{ wallet['slug'].concat(' ' + wallet['balance'] as any) }}
                            </div>
                        </div>
                    </div>

                    <div class="qr-code-container">
                        <InputLabel value="Scan to Pay"
                            style="color: white; font-size: 24px; padding: 4px; text-transform: uppercase;" />
                        <QrCode :value="dashData?.data?.value?.data?.pay_link" />
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
