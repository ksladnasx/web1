<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWebsiteStore } from '../stores/website'
import { useFavoritesStore } from '../stores/favorites'
import { useAuthStore } from '../stores/authStore'
import test from './test.vue'

const route = useRoute()
const router = useRouter()
const store = useWebsiteStore()
const favoritesStore = useFavoritesStore()
const authstore = useAuthStore()

const website = computed(() => {
  return store.websites.find(site => site.id === route.params.id)
})

const isFavorite = computed(() => {
  if (!website.value) return false
  return favoritesStore.isFavorite(website.value.id)
})

const toggleFavorite = () => {
  if (authstore.isAuthenticated == false) {
    // 没登陆要先登录
    alert('请先登录')
    router.push('/');
    return
  } else {
    if (!website.value) return
    if (isFavorite.value) {
      favoritesStore.removeFavorite(website.value.id)
    } else {
      favoritesStore.addFavorite(website.value)
    }
  }
}

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
  return store.categories.find(cat => cat.id === website.value?.category)?.name || ''
})

onMounted(() => {
  
})
</script>

<template>
  <div class="back">
    <button class="back-btn" @click="router.back()">
      ◀ 返回
    </button>
  </div>

  <div class="website-detail-container" v-if="website">

    <div class="card-header">
      <div class="logo-wrapper">
        <img :src="website.logo" :alt="website.name" class="logo-exp" />
      </div>

      <div class="title-section">
        <div class="title">
          <h1>{{ website.name }}</h1>
          <!-- <h3>{{ website._id }}</h3> -->
          <span class="category-badge">{{ categoryName }}</span>
        </div>

        <div class="tag_content">
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
          
          <div class="tag_item">
            <h5>标签</h5>
            <span v-for="tag in website.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
            <br>
            <span class="tag2">{{ website.isPaid ? '付费' : '免费' }}</span>
            <span class="tag2">{{ website.language[0] }}</span>
            <span class="tag2">{{ website.accessSpeed }}</span>
          </div>
<div class="stat-item">
            <div><button @click="toggleFavorite" class="love-btn" :class="{ 'text-red-500': isFavorite }">
                <span class="text-2xl">{{ isFavorite ? '❤️' : '🤍' }}</span>
              </button></div>
          </div>
        </div>
      </div>
    </div>


    <div class="info_container">
      <div class="webdescription_container">
        <!-- <h2>网站介绍</h2> -->
        <section class="description-section">
          {{ website.description }}
        </section>
      </div>


    </div>


    <div class="action-menu">
      <button class="visit-btn" @click="goToWebsite(website.url)">
        访问网站🔗
      </button>
      <!-- <button class="report-btn">
        这啥按钮
      </button> -->
      <!-- <button>
          更多详细信息，问问AI?
        </button> -->
    </div>

    <div class="comment_container">
      <test :webid="website._id" />
    </div>

    <div class="related-section">
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
    </div>

  </div>
</template>

<style scoped>
.website-detail-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 60%;
  position: relative;
  left: 20%;
}

/* 基础样式 */
.back {
  width: 90px;
  margin-bottom: 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  z-index: 1;
  padding-right: 1rem;
}

.back-btn {
  padding: 0.5rem 1rem;
  background-color: #383a42;
  border: none;
  color: #ffffff;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* 标题区域 */
.title h1 {
  font-size: 2.25rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  margin-bottom: 0.5rem;
}

.category-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 1rem;
  font-size: 0.875rem;
}

/* 标签区域 */
.tag_content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.stats-row {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 500;
}



.tag_item h5 {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.05);
  margin: 0.4vh;
}

.tag2 {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  background: rgba(168, 209, 243, 0.05);
  margin: 0.4vh;
}

.tag2:hover {
  background-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 2px 4px rgb(101, 138, 158);
  transition: all 0.3s ease;
  cursor: pointer;
  color: aqua;
}

.tag:hover {
  padding: 0.25rem 1.5rem;
  background-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 2px 4px rgb(101, 138, 158);
  transition: all 0.3s ease;
  cursor: pointer;
  color: aqua;
}

/* 信息容器布局 */
.info_container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 2rem;
}

/* 按钮样式 */
.visit-btn {
  padding: 0.75rem 2rem;
  background: #3b82f6;
  border-radius: 2rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(230, 233, 237, 0.2);
}

.report-btn {
  padding: 0.5rem 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 2rem;
  transition: all 0.3s ease;
}

.webdescription_container {
  margin-top: 3rem;
}

/* 悬停效果 */
.back-btn:hover {

  background-color: #3b82f6;
}

.visit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(243, 241, 241, 0.3);
}

.report-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* 响应式布局 */
@media (max-width: 800px) {
  .info_container {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }

  .tag_content {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }

  .action-menu {
    flex-direction: column;
    align-items: center;
  }

  .title h1 {
    font-size: 1.75rem;
  }
}

.action-menu {

  margin-top: 10vh;
}

/* 卡片动画 */
.recommendation-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.recommendation-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(248, 244, 244, 0.3);
}

/* 装饰性元素 */
.title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 2px;
  background: #3b82f6;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  padding-left: 1rem;
  position: relative;
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

/* 图片样式 */
.logo-exp {
  width: 120px;
  height: 120px;
  object-fit: contain;
  border-radius: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.site-logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 12px;
}


/* 卡片容器样式 */
.card-header,
.webdescription_container,
.related-section {
  background: rgba(40, 42, 54, 0.8);
  border-radius: 20px;
  padding: 2rem;
  margin: 1.5rem 0;
  box-shadow: 0 8px 32px rgba(238, 234, 234, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: cardEntrance 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  transition: all 0.3s ease;
}

/* 卡片悬停效果 */
.card-header:hover,
.webdescription_container:hover,
.recommendation-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(238, 236, 236, 0.2);
  border-color: rgba(59, 130, 246, 0.3);
}

/* 卡片入场动画 */
@keyframes cardEntrance {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 内容区域微调 */
.webdescription_container {
  background: linear-gradient(145deg, rgba(40, 42, 54, 0.9), rgba(50, 52, 65, 0.9));
  line-height: 1.8;
  text-align: justify;
  position: relative;
  overflow: hidden;
}

/* 流光边框效果 */
.webdescription_container::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg,
      rgba(59, 130, 246, 0.2),
      rgba(255, 255, 255, 0.1),
      rgba(59, 130, 246, 0.2));
  z-index: -1;
  border-radius: 22px;
  animation: borderFlow 6s linear infinite;
}

@keyframes borderFlow {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

/* 优化按钮卡片效果 */


/* 响应式调整 */
@media (max-width: 768px) {

  .card-header,
  .webdescription_container {
    padding: 1.5rem;
    border-radius: 16px;
  }

  .webdescription_container::before {
    animation-duration: 8s;
  }
}
</style>
