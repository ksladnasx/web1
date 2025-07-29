import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import { useAuthStore } from './stores/authStore'
import Vant from 'vant';


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(Vant);
app.mount('#app')

// 初始化用户
useAuthStore().initUser()
