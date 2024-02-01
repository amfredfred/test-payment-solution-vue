'use strict'

import { getItem, setItem } from '@/storage'
import type { AuthResponse } from '@/interfaces'
import { defineStore } from 'pinia'
import { ref, onBeforeMount } from 'vue'



export const useAuthStore = defineStore('auth', () => {
    const user = ref<AuthResponse & { isAuthenticated: boolean } | null>(null)

    const logout = () => {
        setItem('TPS', 'user', null)
        user.value = null
    }

    const updateProfile = (profile?: AuthResponse & { isAuthenticated: boolean }) => {
        setItem('TPS', 'user', profile)
        user.value = profile ?? null
    }

    onBeforeMount(() => {
        const TPS = getItem('TPS')
        user.value = TPS?.['user']
    })

    return { user, logout, updateProfile }
})
