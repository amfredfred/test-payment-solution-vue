<script setup lang="ts">
import { RouterView } from 'vue-router'
import AuthenticationView from './views/Guest/AuthenticationVue.vue';
import { useAuthStore, } from '@/stores/auth'
import { ref, watchEffect } from 'vue'
import type { AuthResponse } from 'interfaces';

const authStore = useAuthStore()
const user = ref<AuthResponse & { isAuthenticated: boolean } | null>(authStore.user);


watchEffect(() => {
  user.value = authStore.user
});

</script>

<template>
  <div class="app">
    <div class="" v-if="!user?.isAuthenticated">
      <AuthenticationView />
    </div>
    <RouterView v-else />
  </div>
</template> @/interfaces