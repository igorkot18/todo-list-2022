import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/MainLayout'),
    children: [
      {
        path: '/',
        name: 'login',
        component: () => import('../components/pages/loginForm/LoginForm.vue')
      },
      {
        path: '/posts',
        name: 'posts',
        meta: {auth: true},
        component: () => import('../components/pages/posts/PostsComponent.vue')
      },
      {
        path: '/todos',
        name: 'todos',
        meta: {auth: true},
        component: () => import('../components/pages/todos/TodosComponent')
      },
      {
        path: '/users',
        name: 'users',
        meta: {auth: true},
        component: () => import('../components/pages/users/UsersComponent')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {

// })

export default router
