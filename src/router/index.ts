import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/Home/DashboardView.vue'
import CreateWalletHome from '@/views/Home/Payment/CreateWalletHome.vue'
import TransferHome from '@/views/Home/Payment/TransferHome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DashboardView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: DashboardView
    },
    {
      path: '/create-wallet',
      name: 'create-wallet',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: CreateWalletHome
    }
    ,
    {
      path: '/payment',
      name: 'make-a-payment',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: TransferHome
    }
  ]
})

export default router
