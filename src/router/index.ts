import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { h, resolveComponent } from 'vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'three' }
  },
  {
    path: '/three',
    name: 'three',
    component: { render: () => h(resolveComponent('router-view')) },
    redirect: { name: 'globe' },
    children: [
      {
        path: 'solar',
        name: 'solar',
        meta: {
          parent: 'three'
        },
        component: () => import('@/views/solar-system/SolarSystem.vue')
      },
      {
        path: 'globe',
        name: 'globe',
        meta: {
          parent: 'three'
        },
        component: () => import('@/views/globe/globe.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
