import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Category from '../views/Category.vue'
import WebsiteDetail from '../views/WebsiteDetail.vue'
import Submit from '../views/Submit.vue'
import Profile from '../views/Profile.vue'
import About from '../views/About.vue'
import SearchResults from '../views/SearchResults.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue';
import StarMap from '../views/StarMap.vue'
import Music from "../views/Music.vue"
import Test from "../views/test.vue"
import Homepage from '../views/Homepage.vue'  



// 配置首位路由
import { useAuthStore } from '../stores/authStore';

const routes = [
  {
    path: '/',
    name: 'homepage',
    component: Homepage
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
  // {
  //   path: '/profile',
  //   name: 'profile',
  //   component: Profile
  // },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/search',
    name: 'search',
    component: SearchResults
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/star-map',
    component: StarMap
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/music',
    name: 'music',
    component: Music
  },
  {
    path:"/test",
    name:"test",
    component:Test
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('../views/test.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  }

  
]

// 创建并导出 Vue Router 实例
const router = createRouter({
  history: createWebHistory(),
  routes,
  
})

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();   
  }
});

export default router