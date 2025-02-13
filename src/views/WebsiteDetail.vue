<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWebsiteStore } from '../stores/website'

const route = useRoute()
const router = useRouter()
const store = useWebsiteStore()

const website = computed(() => {
  return store.websites.find(site => site.id === route.params.id)
})

const relatedWebsites = computed(() => {
  if (!website.value) return []
  return store.websites
    .filter(site =>
      site.id !== website.value?.id &&
      (site.category === website.value?.category ||
        site.tags.some(tag => website.value?.tags.includes(tag)))
    )
    .slice(0, 3)
})

const goToWebsite = (url: string) => {
  window.open(url, '_blank')
}

const categoryName = computed(() => {
  if (!website.value) return ''
  return store.categories.find(cat => cat.category === website.value?.category)?.name || ''
})
</script>

<template>
  <div class="website-detail-container" v-if="website">
    <div class="back">
      <button class="back-btn" @click="router.back()">
     ◀  返回
      </button>
    </div>
    <div>
      -----------------------------------------------------------------------------------------------------------------------
    </div>
    <div class="main-card">
      <!-- 保持原有卡片结构不变 -->
      <div class="card-header">
        <div class="header-content">
          <div class="logo-wrapper">
            <img :src="website.logo" :alt="website.name" class="logo-exp" />
          </div>
          <div class="title-section">
            <div class="title-row">
              <h1>{{ website.name }}</h1>
              <span class="category-badge">{{ categoryName }}</span>
            </div>
            <div class="stats-row">
              <div class="stat-item">
                <span class="star-icon">⭐</span>
                {{ website.rating.toFixed(1) }}
              </div>
              <div class="stat-item">
                <span class="eye-icon">👁️</span>
                {{ website.views.toLocaleString() }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card-body">
        <section class="tags-section">
          <h2>标签</h2>
          <div class="tags-container">
            <span v-for="tag in website.tags" :key="tag" class="tag">
              {{ tag }},
            </span>
          </div>
        </section>

        <section class="description-section">
          <h2>网站介绍</h2>
          <p>{{ website.description }}</p>
        </section>

        <section class="usage-info">
          <h2>使用信息</h2>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">付费情况💰:{{ website.isPaid ? '付费' : '免费' }}</div>
            </div>
            <!-- 其他info-item保持相同结构 -->
          </div>
        </section>

        <button class="visit-btn" @click="goToWebsite(website.url)">
          访问网站🔗
        </button>
      </div>
    </div>

    <section class="related-section">
      <h2 class="section-title">相关推荐</h2>
      <div class="recommendation-grid">
        <div v-for="site in relatedWebsites" :key="site.id" @click="router.push(`/website/${site.id}`)"
          class="recommendation-card">
          <div class="card-content">
            <div class="logo-container">
              <img :src="site.logo" :alt="site.name" class="site-logo" />
            </div>
            <div class="text-content">
              <h3 class="site-name">{{ site.name }}</h3>
              <p class="site-description">{{ site.tags[0] }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.related-section {
  margin-top: 3rem;
  padding: 0 1rem;
}

.section-title {
  color: #f3f4f6;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  position: relative;
  padding-left: 1.25rem;
}

.section-title::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 1.25rem;
  background: #3b82f6;
  border-radius: 2px;
}

.recommendation-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.recommendation-card {
  background: #1f2937;
  border-radius: 0.75rem;
  padding: 1.25rem;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.recommendation-card:hover {
  background: #374151;
  transform: translateY(-4px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.recommendation-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: #3b82f6;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.recommendation-card:hover::before {
  opacity: 1;
}

.card-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* 图标样式 */
.logo-exp {
  width: 100px;
}

.site-logo {
  width: 60px;
  object-fit: contain;
  /* padding-bottom: 5rem; */
  /* padding: auto; */
  margin-bottom: 20px;
}

/* 返回按钮的样式 */
.back{
  width: 90px;
  margin-bottom: 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
  padding-right: 1rem;
  border-radius: 0.5rem;
}
.back-btn{
  padding: 0.5rem 1rem;
  background-color: #383a42;
  border: none;
  color: #ffffff;
  text-decoration: none;
  border-radius: 0.5rem;
  cursor: pointer;
}
.back-btn:hover{
  background-color: #3b82f6;
}

.text-content {
  flex: 1;
  min-width: 0;
}

.site-name {
  color: #f3f4f6;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.site-description {
  color: #9ca3af;
  font-size: 0.875rem;
  line-height: 1.25rem;
  display: -webkit-box;
  /* -webkit-line-clamp: 2; */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .recommendation-grid {
    grid-template-columns: 1fr;
  }
}
</style>
