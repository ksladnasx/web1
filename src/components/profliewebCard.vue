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
  <div @click="goToDetail" class="profile-card">
    <img :src="website.logo" :alt="website.name" class="card-logo">
    <div class="card-body">
      <h3 class="card-title">{{ website.name }}</h3>
      
      <div class="tag-group">
        <span v-for="tag in website.tags.slice(0, 2)" 
              :key="tag"
              class="tag">
          {{ tag }}
        </span>
      </div>

      <div class="metric-group">
        <div class="metric-item">
          <span class="metric-icon">⭐</span>
          <span class="metric-value">{{ website.rating.toFixed(1) }}</span>
        </div>
        <div class="metric-item">
          <span class="metric-icon">👁️</span>
          <span class="metric-value">{{ website.views.toLocaleString() }}</span>
        </div>
      </div>

      <button 
        @click.stop="$emit('remove')"
        class="remove-btn"
        title="取消收藏">
        ×
      </button>
    </div>
  </div>
</template>

<style scoped>
.profile-card {
  background: #212c38;
  border: 1px solid #2d3a4a;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
}

.profile-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.card-logo {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  border: 2px solid #364456;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
}

.profile-card:hover .card-logo {
  transform: scale(1.08);
}

.card-body {
  position: relative;
}

.card-title {
  color: #c8d6e5;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
}

.tag-group {
  display: flex;
  gap: 0.6rem;
  margin-bottom: 1.2rem;
}

.tag {
  background: rgba(74, 144, 226, 0.15);
  color: #4a90e2;
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  border: 1px solid rgba(74, 144, 226, 0.3);
}

.metric-group {
  display: flex;
  gap: 1.5rem;
}

.metric-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.metric-icon {
  color: #4a90e2;
  filter: drop-shadow(0 2px 4px rgba(74, 144, 226, 0.2));
}

.metric-value {
  color: #9ab8d9;
  font-size: 0.95rem;
}

.remove-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, #ff5a5f 0%, #e0494e 100%);
  color: white;
  width: 38px;
  height: 38px;
  /* border-radius: 100%; */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.remove-btn:hover {
  transform: scale(1.15);
}

@media (max-width: 768px) {
  .profile-card {
    padding: 1rem;
  }
  
  .card-logo {
    width: 48px;
    height: 48px;
  }
  
  .card-title {
    font-size: 1.1rem;
  }
}
</style>