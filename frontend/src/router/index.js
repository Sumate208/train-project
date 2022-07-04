import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/TestSyntax.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
