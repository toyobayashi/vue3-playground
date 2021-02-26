import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import AppJsx from './app'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'jsx',
    component: AppJsx
  },
  {
    path: '/sfc',
    name: 'sfc',
    component: () => import(/* webpackChunkName: "sfc" */ './App.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
