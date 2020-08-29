import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

Vue.use(Router)

Vue.prototype.$axios = axios

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'lv0',
      component: () => import('../views/lv0')
    },
    {
      path: '/lv1',
      name: 'lv1',
      component: () => import('../views/lv1')
    },
    {
      path: '/lv2',
      name: 'lv2',
      component: () => import('../views/lv2')
    },
    {
      path: '/lv3',
      name: 'lv3',
      component: () => import('../views/lv3')
    },
    {
      path: '/user',
      name: '사용자',
      component: () => import('../views/user')
    },
    {
      path: '/page',
      name: '페이지',
      component: () => import('../views/page')
    },
    {
      path: '/block',
      name: '차단',
      component: () => import('../views/block')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/test')
    },
    {
      path: '/sign',
      name: '로그인',
      component: () => import('../views/sign')
    },
    {
      path: '*',
      name: 'e404',
      component: () => import('../views/e404')
    }
  ]
})
