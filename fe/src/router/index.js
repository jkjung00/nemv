import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/user')
  },
  {
    path: '/sign',
    name: 'sign',
    component: () => import('../views/sign')
  },
  {
    path: '/block',
    name: 'block',
    component: () => import('../views/block')
  },
  {
    path: '/header',
    name: 'header',
    component: () => import('../views/header'),
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('token')) return next('block')
      next()
    }
  },
  {
    path: '*',
    name: 'e404',
    component: () => import('../views/e404')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
