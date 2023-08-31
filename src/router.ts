import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
} from 'vue-router'

/* c8 ignore start */
const homeBody = () => import('./views/home/home.vue')
const appEditorBody = () => import('./views/appEditor/appEditor.vue')
/* c8 ignore stop */

export const siteRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: homeBody,
    name: 'home',
  },
  {
    path: '/edit-app',
    component: appEditorBody,
    name: 'appEditor',
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: siteRoutes,
})

export default router
