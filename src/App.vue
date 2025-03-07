<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { useAuthStore } from './stores/authStore';
import { computed, onMounted, onUnmounted } from 'vue';
const router = useRouter();
const store = useAuthStore();                               

// 三元表达式，用于判断登录状态的store.$state.isAuthenticated值为true的话就显示'退出登录' 
// 使用 computed 属性来动态计算 title使得它是响应式的
const title = computed(() => {
  return store.$state.isAuthenticated ? '退出登录' : '登录';
});

const logout = async () => {
  if (store.$state.isAuthenticated == true) {
    try {
      await store.logout();
      alert('已退出登录'); // 退出成功后弹出提示
      router.push('/home'); // 登录成功后跳转到主页
    } catch (error) {
      alert('退出登录失败');
    }
  } else {
    // 如果没登陆点击的话就到登录页面
    router.push('/');
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



// 灯笼

// let newyearScript: HTMLScriptElement | null = null;
// onMounted(() => {
//     newyearScript = document.createElement('script');
//     newyearScript.type = 'text/javascript';
//     newyearScript.src = 'https://api.vvhan.com/api/script/denglong';
//     newyearScript.defer = true;

//     // 将脚本插入到页面
//     document.head.appendChild(newyearScript);
// });

// onUnmounted(() => {
//     // 卸载组件时移除脚本
//     if (snowScript) {
//         document.head.removeChild(snowScript);
//     }
// });
</script>

<template>
  <div class="menu">
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex items-center">
            <router-link to="/home" class="flex items-center">
              <button>🏠 主页</button>
            </router-link>
          </div>
          <div class="flex items-center space-x-4">
            <router-link to="/music" class="text-gray-600 hover:text-red-500 transition-colors duration-300 hover:scale-105"><button>🎵 音乐</button></router-link>
            <router-link to="/star-map" class="text-gray-600 hover:text-blue-600 transition-colors duration-300 hover:scale-105"><button>⭐ 学习星图</button></router-link>
            <router-link to="/submit" class="text-gray-600 hover:text-green-500 transition-colors duration-300 hover:scale-105"><button>🙋‍♂️ 提交网站</button></router-link>
            <router-link to="/profile" class="text-gray-600 hover:text-purple-500 transition-colors duration-300 hover:scale-105"><button>👤 个人中心</button></router-link>
            <router-link to="/about" ><button>🎈 关于</button></router-link>
            <div><button style="padding: 5px;" @click="logout" class="transition-colors duration-300 hover:bg-red-500 hover:text-white">{{ title }}</button></div>
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
  
/* ... 其他现有样式 ... */

a.router-link:hover {
  transform: scale(1.05); /* 鼠标悬停时稍微放大 */
  color: #c3ff00; /* 鼠标悬停时文本颜色变化 */
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

.bgc{
  background-color: #1c212f;
}
.max-w-7xl {
  
  max-width: 1280px;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.sm\:px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.lg\:px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
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
  align-items: center;
}

.space-x-4> :not([hidden])~ :not([hidden]) {
  margin-left: 1rem;
}

.text-gray-600 {
  color: #6b7280;
}

.hover\:text-gray-900:hover {
  color: #374151;
}

.bg-gray-50 {
  background-color: #222222;
}

.bg-white {
  background-color: #000000;
}

.shadow {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}
</style>