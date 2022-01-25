import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


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
    component: () => import('../views/Rummage.vue')
  },
  {
    path: '/ur-stock',
    name: 'UrStock',
    component: () => import('../views/News.vue')
  },
  {
    path: '/ur-table',
    name: 'UrTable',
    component: () => import('../views/Direction.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/User.vue')
  },
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
