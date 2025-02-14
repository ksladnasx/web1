<script setup lang="ts">
import { ref } from 'vue'
// import { useWebsiteStore } from '../stores/website'
import { useFavoritesStore } from '../stores/favorites'
import WebsiteCard from '../components/WebsiteCard.vue'

// const store = useWebsiteStore()
const favoritesStore = useFavoritesStore()
const activeTab = ref('favorites')

// Mock data for demonstration
const submissions = ref([
  // Would normally come from backend
])
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <!-- 头部 -->
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex">
          <button v-for="tab in [
            { id: 'favorites', name: '收藏夹' },
            { id: 'submissions', name: '提交记录' },
            { id: 'settings', name: '基础设置' }
          ]" :key="tab.id" @click="activeTab = tab.id" :class="[
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm'
            ]">
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- 分割线 -->
      <div>
        -----------------------------------------------------------------------------------------------------------------------
      </div>

      <!-- 基础设置功能实现 -->

      <!-- 收藏夹功能实现 -->
      <div class="p-6">
        <div v-if="activeTab === 'favorites'">
          <div v-if="favoritesStore.favorites.length === 0" class="text-center py-12">
            <div class="text-6xl mb-4">🤍</div>
            <h3 class="text-xl font-medium text-gray-900 mb-2">暂无收藏的网站</h3>
            <p class="text-gray-600">
              浏览网站时点击心形图标即可收藏喜欢的网站
            </p>
          </div>
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <WebsiteCard v-for="website in favoritesStore.favorites" :key="website.id" :website="website" />
          </div>
        </div>

        <!-- 提交记录功能实现 -->
        <div v-if="activeTab === 'submissions'">
          <div v-if="submissions.length === 0" class="text-center py-12">
            <div class="text-6xl mb-4">📝</div>
            <h3 class="text-xl font-medium text-gray-900 mb-2">暂无提交记录</h3>
            <p class="text-gray-600">
              还没有提交过网站？
              <router-link to="/submit" class="text-blue-600 hover:text-blue-800">
                去提交
              </router-link>
            </p>
          </div>
        </div>

        <!-- 基础设置功能实现 -->
        <div v-if="activeTab === 'settings'" class="max-w-md mx-auto">
          <form class="space-y-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                邮箱
              </label>
              <input type="email" id="email"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">
                修改密码
              </label>
              <input type="password" id="password"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>

            <button type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              保存设置
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-white {
  background-color: #333;
}

.text-gray-900 {
  color: aliceblue;
}

.text-gray-600 {
  color: #999;
}

.text-gray-500 {
  color: #888;
}

.hover\:text-gray-700:hover {
  color: #ccc;
}

.border-gray-200 {
  border-color: #444;
}

.text-blue-600 {
  color: #60a5fa;
}

.border-blue-500 {
  border-color: #3b82f6;
}

.bg-blue-600 {
  background-color: #2563eb;
}

.hover\:bg-blue-700:hover {
  background-color: #1d4ed8;
}

input {
  background-color: #444;
  color: white;
  border-color: #555;
}

input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}
</style>