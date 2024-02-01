<script setup lang="ts" >
import { ref, watchEffect } from 'vue';
import { useAuthStore } from '@/stores/auth'
import DropdownElement from '@/components/DropdownElement.vue';
import DropdownLink from '@/components/DropdownLink.vue';

const authStore = useAuthStore()
const user = ref(authStore.user)

watchEffect(() => user.value = authStore.user)

</script>

<template>
   <header class="bg-red h-14 shadow bg-white  flex justify-between ">
      <div class="flex justify-between  m-auto container ">
         <h1 class=" text-fuchsia-400 my-auto">
            PAYMENT SOLUTION
         </h1>
         <div class="ms-3 relative w-4/5 flex flex-wrap ">

            <DropdownElement align="right" width="48">
               <template #trigger>
                  <span class="inline-flex rounded-md">
                     <button type="button"
                        class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150">
                        {{ user?.profile?.name }}
                        <svg class="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                           fill="currentColor">
                           <path fill-rule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clip-rule="evenodd" />
                        </svg>
                     </button>
                  </span>
               </template>

               <template #content>
                  <DropdownLink :href="'/dashboard'"> Dashboard </DropdownLink>
                  <DropdownLink :href="'/create-wallet'"> Create Wallet </DropdownLink>
                  <button  @click="authStore.logout"  class=" px-4 text-sm text-red-600">
                     Log Out
                  </button>
               </template>
            </DropdownElement>
         </div>
      </div>
   </header>
   <div class=" w-full bg-slate-50">
      <slot />
   </div>
</template>