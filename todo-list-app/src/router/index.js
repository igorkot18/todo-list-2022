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
        name: 'login-form',
        component: () => import('../components/mainComponents/loginForm/LoginForm')
      },
      {
        path: '/posts',
        name: 'posts',
        meta: {auth: true},
        component: () => import('../components/mainComponents/posts/PostsComponent')
      },
      {
        path: '/todos',
        name: 'todos',
        meta: {auth: true},
        component: () => import('../components/mainComponents/todos/TodosComponent')
      },
      {
        path: '/users',
        name: 'users',
        meta: {auth: true},
        component: () => import('../components/mainComponents/users/UsersComponent')
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
