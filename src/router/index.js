import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/repos/:name/commits',
      name: 'commits',
      component: () => import('@/views/CommitsView.vue')
    }
  ]
})

export default router
