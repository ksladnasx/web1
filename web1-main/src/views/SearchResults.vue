<script setup lang="ts">
import {computed } from 'vue'
import { useRoute } from 'vue-router'
import { useWebsiteStore } from '../stores/website'
import WebsiteCard from '../components/WebsiteCard.vue'

const route = useRoute()
const store = useWebsiteStore()
const query = computed(() => route.query.q as string)

const searchResults = computed(() => {
  if (!query.value) return []
  
  const searchTerms = query.value.toLowerCase().split(' ')
  return store.websites.filter(website => {
    const searchableText = [
      website.name,
      website.description,
      ...website.tags,
      website.category
    ].join(' ').toLowerCase()
    
    return searchTerms.every(term => searchableText.includes(term))
  })
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">搜索结果</h1>
        <p class="text-gray-600">
          关键词 "{{ query }}" 的搜索结果 ({{ searchResults.length }} 个)
        </p>
        <div>
      -----------------------------------------------------------------------------------------------------------------------
    </div>
      </div>

      <div v-if="searchResults.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <WebsiteCard
          v-for="website in searchResults"
          :key="website.id"
          :website="website"
        />
      </div>
      
      <div v-else class="text-center py-16">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-xl font-medium text-gray-900 mb-2">未找到相关结果</h3>
        <p class="text-gray-600">
          试试其他关键词，或者
          <router-link to="/submit" class="text-blue-600 hover:text-blue-800">
            提交一个新网站
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}

.bg-gray-50 {
  background-color: #222222;
}

.text-gray-900 {
  color: aliceblue;
}

.text-gray-600 {
  color: #999;
}

.text-blue-600 {
  color: #60a5fa;
}

.text-blue-600:hover {
  color: #93c5fd;
}
</style>