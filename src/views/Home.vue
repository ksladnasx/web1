<script setup lang="ts">
import { ref } from 'vue'
import { useWebsiteStore } from '../stores/website';
import SearchBar from '../components/SearchBar.vue'
import CategoryGrid from '../components/CategoryGrid.vue'
import WebsiteexpressCard from '../components/WebsiteexpressCard.vue';


const store = useWebsiteStore()
const searchQuery = ref('')

</script>

<template >           
  <div class="mainpage">
    <center><h1 class="">学术网站导航</h1></center>
    <br>
    <SearchBar v-model="searchQuery"  />

    <section class="header">
      <h2 class="text-2xl font-semibold mb-6 fl">热门分类</h2>
      <CategoryGrid :categories="store.categories" />
    </section>

    <section class="recommend-websites">
      <h2 class="section-title">推荐网站</h2>
      <div class="cards-container">
        <WebsiteexpressCard v-for="website in store.websites.slice(0, 6)" :key="website.id" :website="website"
          class="website-card" />
      </div>
    </section>
    <br>
    <br>
    <br>
   

    <section class="popular-section">
      <h2 class="section-title">热门榜单</h2>
      <div class="ranking-container">
        <ol class="ranking-list">
          <li v-for="(website, index) in store.getPopularWebsites()" :key="website.id" class="ranking-item">
            <a :href=website.url>
              <div class="rank-number">{{ index + 1 }}</div>
              <div class="website-info">
                <h3 class="website-name">{{ website.name }}</h3>
                <p class="website-description">{{ website.description }}</p>
              </div>
            </a>
          </li>
        </ol>
      </div>
    </section>


    
  </div>
</template>

<style scoped>
.mainpage{  
  width: 80%;
  margin: 0 auto;
  padding: 2rem 0;
  display: flex;
  
  flex-direction: column;
  
}
.header{
  position: relative;
  align-items: center;
  display: flex;
  flex-direction: column;
}
.recommend-websites {
  margin-bottom: 3rem;
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

.cards-container {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.website-card {
  background: #1f2937;
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.website-card:hover {
  background: #374151;
  transform: translateY(-4px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.website-card::before {
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

.website-card:hover::before {
  opacity: 1;
}

/* 覆盖卡片内部样式 */
.website-card :deep(.card-title) {
  color: #f3f4f6;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.website-card :deep(.card-description) {
  color: #9ca3af;
  font-size: 0.875rem;
  line-height: 1.5;
}

.popular-section {
  margin-top: 3rem;
  padding: 0 1rem;
}

.section-title {
  color: #f3f4f6;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  position: relative;
  padding-left: 1rem;
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

.ranking-container {
  background: #1f2937;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.ranking-list {
  position: relative;
}

.ranking-list::before {
  content: "";
  position: absolute;
  left: 2.5rem;
  top: 0;
  bottom: 0;
  width: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.ranking-item {
  display: flex;
  align-items: center;
  padding: 1rem 0;
  position: relative;
  transition: all 0.2s ease;
}

.ranking-item:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateX(8px);
}

.ranking-item:not(:last-child)::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 2.5rem;
  right: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.05);
}

.rank-number {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #374151;
  border-radius: 0.5rem;
  color: #9ca3af;
  font-weight: 600;
  margin-right: 1.5rem;
  position: relative;
  z-index: 1;
}

.website-info {
  flex: 1;
}

.website-name {
  color: #f3f4f6;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.website-description {
  color: #9ca3af;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

/* 前3名特殊样式 */
.ranking-item:nth-child(-n+3) .rank-number {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
