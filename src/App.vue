<script setup lang="ts">
import layout from './components/layout.vue';
import { RouterView, useRouter } from 'vue-router'

const router = useRouter();

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