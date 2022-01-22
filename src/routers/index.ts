import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Temperature from '@/components/Temperature'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect: { name: 'temperature' }
  },
  {
    path: '/temperature',
    name: 'temperature',
    component: Temperature
  },
  {
    path: '/yen',
    name: 'yen',
    component: () => import(/* webpackChunkName: "yen" */ '@/components/Yen.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
