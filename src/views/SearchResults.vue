<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useWebsiteStore } from '../stores/website'
import WebsiteexpressCard from '../components/WebsiteexpressCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
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

// 返回上一次的路由
const goBack = () => {
  router.back() // 显式调用路由返回
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">搜索结果</h1>
        <p class="text-gray-600">
          关键词 "{{ query }}" 的搜索结果 ({{ searchResults.length }} 个)<span @click="goBack"><a href="#" style="font-size: 14px;padding-left: 20px;">返回?</a></span>
        </p>
        <div>
         
        </div>
      </div>

      <div v-if="searchResults.length > 0" class="grid">
        <WebsiteexpressCard v-for="website in searchResults" :key="website.id" :website="website" style="margin-bottom: 20px;"/>
      </div>

      <div v-else class="text-center py-16">
        
        <h3 class="text-xl font-medium text-gray-900 mb-2">🔍未找到相关结果</h3>
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
/* 深度适配评论区色彩体系 */
.min-h-screen {
  background: #1a2330;
  width: 100%;
  padding-left: 0;
}

/* 容器优化 */
.max-w-7xl {
  padding: 2rem 1rem;
}

/* 标题系统 */
.mb-8 h1 {
  color: #c8d6e5;
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.mb-8 p {
  color: #9ab8d9;
  font-size: 0.95rem;
}

/* 分隔线优化 */
.mb-8 div {
  border-top: 1px solid #2d3a4a;
  margin: 1.5rem 0;
  opacity: 0.6;
}

/* 卡片栅格布局 */
.grid {
  width: 80%;
  /* gap: 1.5rem; */
  padding: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-self: center;
  align-self:stretch;
}

/* 未找到结果样式 */
.text-center {
  background: #212c38;
  border-radius: 12px;
  padding: 3rem;
  margin: 2rem 0;
  border: 1px solid #2d3a4a;
}

.text-center h3 {
  color: #c8d6e5;
  margin: 1rem 0;
}

.text-center p {
  color: #9ab8d9;
}

/* 链接样式 */
.text-blue-600 {
  background: linear-gradient(135deg, #4a90e2 0%, #3b7fc1 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 500;
  position: relative;
}

.text-blue-600::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(135deg, #4a90e2 0%, #3b7fc1 100%);
}

/* 响应式优化 */
@media (max-width: 768px) {
  .max-w-7xl {
    padding: 1.5rem;
  }

  .grid {
    grid-template-columns: 1fr;
  }

  .text-center {
    padding: 2rem 1rem;
  }
}
</style>