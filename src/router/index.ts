import { createRouter, createWebHistory, useRouter } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/components/Home.vue')
    },
    {
      path: '/setup',
      name: 'Setup',
      component: () => import('@/components/Setup.vue')
    },
    {
      path: '/play',
      name: 'Play',
      component: () => import('@/components/Play.vue')
    }
  ],
})

export default router