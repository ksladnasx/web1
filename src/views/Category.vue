<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useWebsiteStore } from '../stores/website'
import WebsiteCard from '../components/WebsiteCard.vue'

const route = useRoute()
const store = useWebsiteStore()

const sortOptions = ref([
  { id: 'latest', name: '最新添加' },
  { id: 'popular', name: '最热' },
  { id: 'rating', name: '评分' }
])
const selectedSort = ref('latest')

const currentCategory = computed(() => {
  return store.categories.find(cat => cat.id === route.params.id)
})

const websites = computed(() => {
  const categoryWebsites = store.getWebsitesByCategory(route.params.id as string)
  
  switch (selectedSort.value) {
    case 'popular':
      return [...categoryWebsites].sort((a, b) => b.views - a.views)
    case 'rating':
      return [...categoryWebsites].sort((a, b) => b.rating - a.rating)
    default:
      return categoryWebsites
  }
})
</script>

<template>
  <div class="category-container">
    <div class="header-section">
      <h1 class="category-title">{{ currentCategory?.name }}</h1>
    
      <p class="category-description">发现优质{{ currentCategory?.name }}网站</p>
    </div>

    <div class="sort-control">
      <select
        v-model="selectedSort"
        class="sort-select"
      >
        <option
          v-for="option in sortOptions"
          :key="option.id"
          :value="option.id"
        >
          {{ option.name }}
        </option>
      </select>
    </div>

    <div class="websites-grid">
      <WebsiteCard
        v-for="website in websites"
        :key="website.id"
        :website="website"
        class="website-card"
      />
    </div>
  </div>
</template>

<style scoped>
.category-container {
  background-color: #1c212f;
  width:80%;
  color: white;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 100vh;
}

.header-section {
  margin-bottom: 2rem;
  position: relative;
  padding-left: 1.25rem;
}

.category-title {
  font-size: 2rem;
  font-weight: 600;
  position: relative;
  margin-bottom: 0.5rem;
}

.category-title::before {
  content: "";
  position: absolute;
  left: -1.25rem;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 1.5rem;
  background: #3b82f6;
  border-radius: 2px;
}

.category-description {
  color: #9ca3af;
  font-size: 1rem;
}

.sort-control {
  position: relative;
  margin: 2rem 0;
  display: flex;
  justify-content: flex-end;
}

.sort-select {
  width: 160px;
  height: 40px;
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 6px;
  padding: 0 1rem;
  color: #f3f4f6;
  font-size: 0.875rem;
  appearance: none;
  cursor: pointer;
  transition: all 0.2s ease;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%239CA3AF" width="18" height="18"><path d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 12px center;
}

.sort-select:hover {
  background: #374151;
  border-color: #4b5563;
}

.sort-select:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.sort-select option {
  background: #1f2937;
  color: #f3f4f6;
  padding: 0.5rem;
}

.websites-grid {
  display: grid;
  gap: 5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.website-card {
  background: #1f2937;
  border-radius: 0.75rem;
  transition: all 0.2s ease;
  overflow: hidden;
}

.website-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

/* 覆盖卡片内部样式 */
.website-card :deep(.card-title) {
  color: #f3f4f6;
  font-size: 1.1rem;
}

.website-card :deep(.card-description) {
  color: #9ca3af;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .header-section {
    padding-left: 1rem;
  }

  .category-title {
    font-size: 1.5rem;
  }

  .category-title::before {
    left: -1rem;
    height: 1.25rem;
  }

  .sort-control {
    justify-content: flex-start;
  }

  .websites-grid {
    grid-template-columns: 1fr;
  }
}
</style>
