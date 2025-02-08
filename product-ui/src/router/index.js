import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductListView from '../views/ProductListView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import SearchView from '../views/SearchView.vue'
import CompareView from '../views/CompareView.vue'
import FAQView from '../views/FAQView.vue'
import AdminView from '../views/AdminView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/productList',
    name: 'productList',
    component: ProductListView
  },
  {
    path: '/product/:id',
    name: 'productDetail',
    component: ProductDetailView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView
  },
  {
    path: '/compare',
    name: 'compare',
    component: CompareView
  },
  {
    path: '/faq',
    name: 'faq',
    component: FAQView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
