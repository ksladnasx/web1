<!-- 这个用于个人中心页的网站卡片展示 -->
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
  <!-- 图片部分 -->
  <div @click="goToDetail" class="website-card group">
    <img :src="website.logo" :alt="website.name" />
    <div class="content">
      <h3>{{ website.name }}</h3>
      <span v-for="tag in website.tags.slice(0, 2)" :key="tag"
        class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
        {{ tag }}
      </span>

      <!-- 内容部分 -->
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
h3{
  font-size: 1.5em;
  
}
.content{
  position: relative;
  bottom: 1em;
}
.website-card { 
  margin-top: 10px;
  background-color: #1c212f;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px rgba(156, 156, 156, 0.1);
  cursor: pointer;
  overflow: hidden;
}

.website-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  background: #1f323c;
}

.website-card:hover img {
  transform: scale(1.05);
  filter: brightness(1.1);
}

img{
  width: 10%;
  object-fit: cover;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}



.delete-btn {
  background: rgba(239, 68, 68, 0.9);
  position: relative;left: 40%;bottom: 6em;
  /* border-radius: 100%; */
  transition: all 0.2s ease;
  transform: translateY(-10px);
}

.delete-btn:hover {
  background: rgba(220, 38, 38, 0.9);
  transform: scale(1.1);
}



.website-card:hover .delete-btn {
  opacity: 1;
  transform: translateY(0);
}


</style>