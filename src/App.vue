<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { useAuthStore } from './stores/authStore';
import { computed } from 'vue';
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
    <nav class="app-nav" v-if="shouldShowSidebar()">
      <div class="nav-container">
        <div class="nav-content">
          <div class="nav-start">
            <router-link to="/home">
              <button class="nav-btn">🏠 主页</button>
            </router-link>
            <router-link to="/">
              <button class="nav-btn">🔍 搜索</button>
            </router-link>
          </div>
          <div class="nav-end">
            <router-link to="/music"><button class="nav-btn">🎵 音乐</button></router-link>
            <router-link to="/star-map"><button class="nav-btn">⭐ 学习星图</button></router-link>
            <router-link to="/submit"><button class="nav-btn">🙋‍♂️ 提交网站</button></router-link>
            <router-link to="/profile"><button class="nav-btn">👤 个人中心</button></router-link>
            <router-link to="/about"><button class="nav-btn">🎈 关于</button></router-link>
            <!-- <router-link to="/test"><button class="nav-btn">🎈 测试</button></router-link> -->
            <button 
              @click="handleclick" 
              class="auth-btn"
              :class="{ 'logout-btn': store.$state.isAuthenticated }"
            >
              {{ title }}
            </button>
          </div>
        </div>
      </div>
    </nav>

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

/* 导航栏样式 */
.app-nav {
  background: linear-gradient(135deg, #1a2330 0%, #121820 100%);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid #2d3a4a;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-container {
  width: 96%;
  margin: 0 0rem;
  padding: 0 0rem;
}

.nav-content {
  height: 4.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 导航按钮样式 */
.nav-btn {
  color: #9ab8d9;
  padding: 0.6rem 1.2rem;
  margin: 0 0.5rem;
  border-radius: 6px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-btn:hover {
  background: rgba(74, 144, 226, 0.15);
  transform: translateY(-1px);
  color: #c8d6e5;
  box-shadow: 0 2px 8px rgba(74, 144, 226, 0.2);
}

/* 认证按钮 */
.auth-btn {
  background: linear-gradient(135deg, #4a90e2 0%, #3b7fc1 100%);
  color: white;
  padding: 0.6rem 1.5rem;
  border-radius: 25px;
  margin-left: 1.5rem;
}

.logout-btn {
  background: linear-gradient(135deg, #ff5a5f 0%, #e0494e 100%);
}

/* 主内容区 */
.app-main {
  background: #1a2330;
  min-height: 100vh;
  padding: 1rem;
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .nav-content {
    flex-wrap: wrap;
    height: auto;
    padding: 1rem 0;
  }
  
  .nav-end {
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 1rem;
  }
  
  .nav-btn {
    margin: 0.3rem;
    padding: 0.5rem 1rem;
  }
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
  }
  
  .app-main {
    padding: 1.5rem;
  }
}
</style>