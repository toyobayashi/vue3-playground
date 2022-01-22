import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { defineAsyncComponent } from 'vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect: { name: 'jsx' }
  },
  {
    path: '/jsx',
    name: 'jsx',
    component: defineAsyncComponent(() => import(/* webpackChunkName: "jsx" */ '@/components/JSX'))
  },
  {
    path: '/sfc',
    name: 'sfc',
    component: () => import(/* webpackChunkName: "sfc" */ '@/components/SFC.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
