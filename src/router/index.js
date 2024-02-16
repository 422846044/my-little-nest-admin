import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'

const routes = [
  {
    path: '/home',
    component: Home,
    meta: {
      needLogin: true
    }
  },
  {
    path: '/',
    redirect: '/home',
    meta: {
      needLogin: true
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      needLogin: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router