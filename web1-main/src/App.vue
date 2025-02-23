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
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex items-center">
            <router-link to="/home" class="flex items-center">
              <span class="text-xl font-bold">🏠 主页</span>
            </router-link>
          </div>
          <div class="flex items-center space-x-4">
            <router-link to="/submit" class="text-gray-600 hover:text-gray-900"><span>🙋‍♂️ 提交网站</span></router-link>
            <router-link to="/profile" class="text-gray-600 hover:text-gray-900"><span>👤 个人中心</span></router-link>
            <router-link to="/about" class="text-gray-600 hover:text-gray-900"><span>🎈 关于</span></router-link>
            <div><button style="padding: 5px;" @click="logout">{{ title }}</button></div>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <RouterView />
    </main>
  </div>
</template>


<style scoped>
* {
  font-family: 'Courier New', Courier, monospace;
  color: aliceblue;
}

.min-h-screen {
  min-height: 100vh; /* 使元素最小高度为视口高度 */
}

.max-w-7xl {
  max-width: 80rem;
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

.space-x-4 > :not([hidden])~ :not([hidden]) {
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