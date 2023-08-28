import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
} from 'vue-router'

/* c8 ignore start */
const homeBody = () => import('./views/home/home.vue')
/* c8 ignore stop */

export const siteRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: homeBody,
    name: 'home',
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: siteRoutes,
})

export default router
