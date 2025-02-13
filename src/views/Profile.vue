<script setup lang="ts">
import { ref } from 'vue'
import { useWebsiteStore } from '../stores/website'

const store = useWebsiteStore()
const activeTab = ref('favorites')

// Mock data for demonstration
const favorites = ref([
  // Would normally come from backend
])

const submissions = ref([
  // Would normally come from backend
])
</script>

<template>
  
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex">
          <button
            v-for="tab in [
              { id: 'favorites', name: '收藏夹' },
              { id: 'submissions', name: '提交记录' },
              { id: 'settings', name: '基础设置' }
            ]"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm'
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <div class="p-6">
        <div v-if="activeTab === 'favorites'">
          <div v-if="favorites.length === 0" class="text-center py-12">
            <p class="text-gray-500">暂无收藏的网站</p>
          </div>
          <div v-else class="grid grid-cols-1 gap-4">
            <!-- Favorites list -->
          </div>
        </div>

        <div v-if="activeTab === 'submissions'">
          <div v-if="submissions.length === 0" class="text-center py-12">
            <p class="text-gray-500">暂无提交记录</p>
          </div>
          <div v-else class="grid grid-cols-1 gap-4">
            <!-- Submissions list -->
          </div>
        </div>

        <div v-if="activeTab === 'settings'" class="max-w-md mx-auto">
          <form class="space-y-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                邮箱
              </label>
              <input
                type="email"
                id="email"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">
                修改密码
              </label>
              <input
                type="password"
                id="password"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              保存设置
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>