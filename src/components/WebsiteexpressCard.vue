<!-- 这个用于搜索结果的网站卡片展示 -->
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
  <div @click="goToDetail" class="website-card group">
    <img :src="website.logo" :alt="website.name" class="website-logo" />
    <div class="content">
      <h3 class="website-title">{{ website.name }}</h3>
      
      <div class="tag-container">
        <span 
          v-for="tag in website.tags.slice(0, 2)" 
          :key="tag"
          class="website-tag"
        >
          {{ tag }}
        </span>
      </div>

      <div class="metric-grid">
        <div class="metric-item">
          <span class="metric-icon">⭐</span>
          <span class="metric-value">{{ website.rating.toFixed(1) }}</span>
        </div>
        <div class="metric-item">
          <span class="metric-icon">👁️</span>
          <span class="metric-value">{{ website.views.toLocaleString() }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.website-card {
  background: #212c38;
  border: 1px solid #2d3a4a;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  overflow: hidden;
  padding: 1.5rem;
}

.website-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  border-color: #364456;
}

.website-logo {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  margin-bottom: 1.2rem;
  border: 2px solid #364456;
  transition: all 0.3s ease;
}

.website-card:hover .website-logo {
  transform: scale(1.08);
  filter: brightness(1.15);
}

.website-title {
  color: #c8d6e5;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  letter-spacing: 0.3px;
}

.tag-container {
  display: flex;
  gap: 0.6rem;
  margin-bottom: 1.2rem;
}

.website-tag {
  background: rgba(74, 144, 226, 0.15);
  color: #4a90e2;
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid rgba(74, 144, 226, 0.3);
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.metric-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem;
  background: #2d3a4a;
  border-radius: 8px;
}

.metric-icon {
  color: #4a90e2;
  filter: drop-shadow(0 2px 4px rgba(74, 144, 226, 0.2));
}

.metric-value {
  color: #9ab8d9;
  font-size: 0.95rem;
  font-weight: 500;
}

/* 响应式优化 */
@media (max-width: 768px) {
  .website-card {
    padding: 1rem;
  }

  .website-logo {
    width: 48px;
    height: 48px;
  }

  .website-title {
    font-size: 1.1rem;
  }

  .website-tag {
    font-size: 0.8rem;
  }
}
</style>