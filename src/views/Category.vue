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

    <div>
      <select
        v-model="selectedSort"
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
  width: 80%;
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
}
</style>
