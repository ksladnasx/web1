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
/* 深度适配评论区的色彩体系 */
.category-container {
  background: #1a2330;
  width: 100%;
  /* max-width: 1400px; */
  padding: 2rem;
  align-self: center;
}

/* 头部样式优化 */
.header-section {
  margin-bottom: 3rem;
  padding-left: 2rem;
  border-bottom: 1px solid #2d3a4a;
  padding-bottom: 1.5rem;
}

.category-title {
  color: #c8d6e5;
  font-size: 2.2rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.category-title::before {
  background: linear-gradient(180deg, #4a90e2 0%, #3b7fc1 100%);
  height: 2rem;
  width: 5px;
  border-radius: 4px;
}

.category-description {
  color: #9ab8d9;
  font-size: 1.1rem;
}

/* 排序控件优化 */
.sort-control {
  margin: 3.5rem 0;
  display: flex;
  justify-content: flex-end;
  margin-right: 4.5rem;
}

.sort-select {
  background: #212c38;
  border: 1px solid #2d3a4a;
  border-radius: 8px;
  color: #c8d6e5;
  padding: 0.6rem 2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background-image: url('data:image/svg+xml;utf8,<svg ... fill="%239ab8d9" ...></svg>');
}

.sort-select:hover {
  background: #2d3a4a;
  border-color: #364456;
  box-shadow: 0 2px 8px rgba(74, 144, 226, 0.1);
}

.sort-select:focus {
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.3);
}

.sort-select option {
  background: #5a87b7;
}

.websites-grid {
  display: grid;
  gap: 5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 450px));
  padding-right: 3rem;
  padding-left: 3rem;
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
    justify-content: flex-end;
  }

  .websites-grid {
    grid-template-columns: 1fr;
  }
}
</style>
