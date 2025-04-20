<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { useAuthStore } from './stores/authStore';
import { computed, onMounted, onUnmounted } from 'vue';
import Homepage from './views/Homepage.vue';
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

let snowScript: HTMLScriptElement | null = null;
onMounted(() => {
    // 动态加载雪花脚本
    snowScript = document.createElement('script');
    snowScript.type = 'text/javascript';
    snowScript.src = 'https://api.vvhan.com/api/script/snow';
    snowScript.defer = true;

    // 将脚本插入到页面
    document.head.appendChild(snowScript);
});

onUnmounted(() => {
    // 卸载组件时移除脚本
    if (snowScript) {
        document.head.removeChild(snowScript);
    }
});

// 判断当前路由是否需要显示侧边栏
const shouldShowSidebar = () => {
  const publicRoutes = ['home' ];
  return !publicRoutes.includes(router.currentRoute.value.name as string);
};

</script>

<template>
  <div v-if="!shouldShowSidebar()">
    <Homepage />
  </div>
  <div class="menu" v-if="shouldShowSidebar()">
    <nav class="bg-white ">
      <div class="max-w-7xl mx-auto px-4 ">
        <div class="flex justify-between h-16 items-center">
          <div class="flex items-center">
            <router-link to="/homepage" class="flex items-center">
              <button>🏠 主页</button>
            </router-link>
            <router-link to="/" class="flex items-center">
              <button>🔍 搜索</button>
            </router-link>
          </div>
          <div class="flex items-center space-x-4">
            <router-link to="/music" class="text-gray-600 "><button>🎵 音乐</button></router-link>
            <router-link to="/star-map" class="text-gray-600"><button>⭐ 学习星图</button></router-link>
            <router-link to="/submit" class="text-gray-600 "><button>🙋‍♂️ 自定义网站</button></router-link>
            <router-link to="/profile" class="text-gray-600 "><button>👤 个人中心</button></router-link>
            <router-link to="/about" ><button>🎈 关于</button></router-link>
            <div><button style="" @click="handleclick" class="transition-colors duration-300 hover:bg-red-500 hover:text-white">{{ title }}</button></div>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bgc" >
      <router-view v-if="$route.meta.keepAlive" keep-alive></router-view>
      <router-view v-else></router-view>
    </main>
  </div>
</template>


<style scoped>
* {
  font-family: 'Courier New', Courier, monospace;
  color: aliceblue;
  transition: all 0.3s ease; /* 添加全局过渡效果 */
}

a.router-link:hover {
  transform: scale(1.05); /* 鼠标悬停时稍微放大 */
  color: #c3ff00; /* 鼠标悬停时文本颜色变化 */
}

button {
  background-color: transparent; 
}

button:hover {
  transform: scale(1.05); /* 鼠标悬停时稍微放大 */
  background-color: #14b6f1; /* 鼠标悬停时背景颜色变化 */
  color: rgb(255, 204, 0); /* 鼠标悬停时文本颜色变化 */
}

.min-h-screen {
  min-height: 100vh;
  /* 使元素最小高度为视口高度 */
}

main {
  min-height: 100vh;
}

.bgc {
  background-color: #1c212f;
}

.max-w-7xl {
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.h-16 {
  height: 4rem;
}

.flex {
  display: flex;
}

.justify-between {
  justify-content: space-between;
}

.items-center {
  /* 蓝黑渐变背景 */
 
  align-items: center;
}

.space-x-4 > :not([hidden]) ~ :not([hidden]) {
  margin-left: 1rem;
}

.text-gray-600 {
  color: #6b7280;
}

.bg-white {
  background: linear-gradient(to bottom, rgb(28, 33, 47), #000000);
  background: linear-gradient(50deg, rgb(28, 33, 47), #000000);
}
</style>