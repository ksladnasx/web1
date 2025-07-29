<script setup lang="ts">
import layout from './components/layout.vue';
import { RouterView, useRouter } from 'vue-router'
import { useAuthStore } from './stores/authStore';
import { computed } from 'vue';
import { FloatingBubble } from 'vant';
const router = useRouter();
const store = useAuthStore();                               

// 三元表达式，用于判断登录状态的store.$state.isAuthenticated值为true的话就显示'退出登录' 
// 使用 computed 属性来动态计算 title使得它是响应式的
const title = computed(() => {
  return store.$state.isAuthenticated ? '退出登录' : '登录';
});

const handleclick = async () => {
  if (store.$state.isAuthenticated == true) {
    try {
      await store.logout();
      alert('已退出登录'); // 退出成功后弹出提示
      router.push('/'); // 登录成功后跳转到主页
    } catch (error) {
      alert('退出登录失败');
    }
  } else {
    // 如果没登陆点击的话就到登录页面
    router.push('/login');
  }

};

// let snowScript: HTMLScriptElement | null = null;
// onMounted(() => {
//     // 动态加载雪花脚本
//     snowScript = document.createElement('script');
//     snowScript.type = 'text/javascript';
//     snowScript.src = 'https://api.vvhan.com/api/script/snow';
//     snowScript.defer = true;

//     // 将脚本插入到页面
//     document.head.appendChild(snowScript);
// });

// onUnmounted(() => {
//     // 卸载组件时移除脚本
//     if (snowScript) {
//         document.head.removeChild(snowScript);
//     }
// });

// 根据路由名称判断是否展示侧边栏
const shouldShowSidebar = () => {
  const currentRouteName = router.currentRoute.value.name
  const publicRoutes = ['homepage'] // 这里为实际的路由的组件名称（“name:”部分）
  
  // 如果当前路由名称存在且在公共路由列表中，则不显示侧边栏
  return !(currentRouteName && publicRoutes.includes(currentRouteName as string))
}


</script>

<template>
  <div class="app-container">
    
     <layout v-if="shouldShowSidebar()" />
    <main class="app-main">
      <router-view />
    </main>
     
  </div>
 

</template>

<style scoped>
/* 全局字体 */
.app-container {
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}

/* 主内容区 */
.app-main {
  background: #1a2330;
  min-height: 100vh;
  padding: 1rem;
}

@media (max-width: 768px) {
  .app-main {
    padding: 1.5rem;
  }
}
</style>