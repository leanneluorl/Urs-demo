import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
import cookie from 'vue-cookies'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: Login
  // },
  {
    path: '/recipe',
    name: 'Recipe',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Recipe.vue')
  },
  {
    path: '/recipe_catalog',
    name: 'RecipeCatalog',
    component: () => import('../views/RecipeCatalog.vue')
  },
  {
    path: '/recipe/:recipeID',
    name: 'RecipeContent',
    component: () => import('@/components/recipe/RecipeContent.vue')
  },
  {
    path: '/rummage',
    name: 'Rummage',
    meta: { requiresAuth: true },
    component: () => import('../views/Rummage.vue')
  },
  {
    path: '/ur-stock',
    name: 'UrStock',
    meta: { requiresAuth: true },
    component: () => import('../views/UrStock.vue')
  },
  {
    path: '/ur-table',
    name: 'UrTable',
    meta: { requiresAuth: true },
    component: () => import('../views/Direction.vue')
  },
  {
    path: '/user',
    name: 'User',
    meta: { requiresAuth: true },
    component: () => import('@/views/User.vue')
  },
]

const router = new VueRouter({
  mode: 'hash',
  routes
})


router.beforeEach( (to, from, next) => {
  const userIsLogined = store.getters['User/userIsLogin'];
  const requiresAuth = to.matched.some((route) => route.meta && route.meta.requiresAuth);

  if (!userIsLogined && requiresAuth) {
    store.dispatch('User/getLoginPOP', true, { root: true })
    cookie.set('redirection', to.path)
    next(false);
    // this.redirectToLogin(to);
  }else {
    store.dispatch('User/getLoginPOP', false, { root: true })
    next();
  }
})

export default router
