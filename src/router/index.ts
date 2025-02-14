import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Category from '../views/Category.vue'
import WebsiteDetail from '../views/WebsiteDetail.vue'
import Submit from '../views/Submit.vue'
import Profile from '../views/Profile.vue'
import About from '../views/About.vue'
import SearchResults from '../views/SearchResults.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/category/:id',
      name: 'category',
      component: Category
    },
    {
      path: '/website/:id',
      name: 'website-detail',
      component: WebsiteDetail
    },
    {
      path: '/submit',
      name: 'submit',
      component: Submit
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/search',
      name: 'search',
      component: SearchResults
    }
  ]
})

export default router