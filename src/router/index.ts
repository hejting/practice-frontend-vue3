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
    redirect: { name: 'solar' },
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
  },
  {
    path: '/map',
    name: 'map',
    component: { render: () => h(resolveComponent('router-view')) },
    redirect: { name: 'baiduMap' },
    children: [
      {
        path: 'baiduMap',
        name: 'baiduMap',
        meta: {
          parent: 'map'
        },
        component: () => import('@/views/map/BaiduMap.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
