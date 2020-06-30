import Vue from 'vue'
import VueRouter from 'vue-router'
import Base from "@/views/Base";
import LoginBase from "@/views/LoginBase";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Base,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/home/Dashboard.vue')
      },
      {
        path: 'devices',
        name: 'devices-list',
        component: () => import('@/views/device/DeviceList.vue')
      }
    ],
    meta: {
      auth: true,
    },
  },
  {
    path: '/auth',
    name: 'auth',
    component: LoginBase,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/login/Login.vue')
      }
    ]

  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

Vue.router = router;

export default router
