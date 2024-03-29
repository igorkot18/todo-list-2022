import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/MainLayout'),
    children: [
      {
        path: '/',
        name: 'login',
        meta: { auth: false },
        component: () => import('../components/pages/loginForm/LoginForm.vue')
      },
      {
        path: '/posts',
        name: 'posts',
        meta: { auth: true },
        props: true,
        component: () => import('../components/pages/posts/PostsComponent.vue'),
      },
      {
        path: '/post/:id',
        meta: { auth: true },
        props: true,
        component: () => import('../components/pages/posts/PostPage.vue')
      },
      {
        path: '/todos',
        name: 'todos',
        meta: { auth: true },
        component: () => import('../components/pages/todos/TodosComponent')
      },
      {
        path: '/users',
        name: 'users',
        meta: { auth: true },
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

router.beforeEach((to, from, next) => {
  const isAuth = store.getters.getLoginData.isAuth;
  const requireAuth = to.matched.some(record => record.meta.auth);

  if (requireAuth && !isAuth) {
    next('/')
  } else {
    next()
  }
})

export default router
