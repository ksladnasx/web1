<!-- 这个用于主页的网站展示 -->
<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Website } from '../types/types'

const props = defineProps<{
  website: Website
}>()

const router = useRouter()

const goToDetail = () => {
  router.push(`/website/${props.website.id}`)
}
</script>

<template>
  <div 
    @click="goToDetail"
    class="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 cursor-pointer transform hover:-translate-y-1"
  >
    <div class="flex items-center space-x-3 mb-3">
      <div class="w-10 h-10 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50 border border-gray-100">
       <img
          :src="website.logo"
          :alt="website.name"
          class="w-full h-full object-contain p-1.5"
        />
      </div>
      <div class="flex-1 min-w-0">
        
        <h3 class="text-base font-semibold text-gray-900 truncate">{{ website.name }}</h3>
        <div class="flex flex-wrap gap-1.5 mt-1">
          <span
            v-for="tag in website.tags.slice(0, 2)"
            :key="tag"
            class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
          >
            {{ tag }}
          </span>
          <!-- <span 
            v-if="website.tags.length > 2" 
            class="text-xs text-gray-500"
          >
            +{{ website.tags.length - 2 }}
          </span> -->
        </div>
      </div>
    </div>
    <!-- <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ website.description }}</p> -->
    <div class="flex justify-between items-center text-xs text-gray-500">
      <div class="flex items-center space-x-1">
        <span class="text-yellow-400">⭐</span>
        <span>{{ website.rating.toFixed(1) }}</span>
      </div>
      <div class="flex items-center space-x-1">
        <span class="text-blue-400">👁️</span>
        <span>{{ website.views.toLocaleString() }}</span>
      </div>
    </div>
  </div>
</template>


<style scoped>
*{
  flex: auto;
}
img{
  object-fit: cover;
  width:10% ;
  height: 100%;
  border-radius: 5px;
  transition: transform 0.3s ease;
  filter: brightness(90%);
  transform: scale(1);
}
</style>